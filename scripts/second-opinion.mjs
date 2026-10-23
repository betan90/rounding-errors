#!/usr/bin/env node
// Second opinion on a fact-checker report, from DeepSeek, a model from a
// different company. For each claim it asks: does the SOURCE support it?
//
// Full-text mode (the default when scripts/fetch-sources.mjs has run for the
// exhibit): DeepSeek reads the whole text of the cited source, not just the
// passage the fact-checker picked, and must quote the sentence it relied on.
// The script then checks the quote really is in the source, so a supported
// verdict resting on an invented quote is caught.
//   - If all of the exhibit's source texts fit in BUDGET characters, every
//     claim sees every source (and DeepSeek caches the shared prefix).
//   - Otherwise each claim gets the sources whose name, description or URL
//     match the fact-checker's `source` field, cut to fit if still too long.
//   - A claim whose sources couldn't be fetched falls back to passage mode:
//     the claim and the fact-checker's passage, as before. Each result says
//     which mode it used.
//
// Usage: node second-opinion.mjs [input.json] [output.json] [--passage-only]
// Env:   DEEPSEEK_API_KEY (required), DEEPSEEK_MODEL (optional, default deepseek-chat)

import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const PASSAGE_ONLY = process.argv.includes("--passage-only");
const inputPath = path.resolve(REPO_ROOT, args[0] ?? "fact-check-output.json");
const outputPath = path.resolve(REPO_ROOT, args[1] ?? "second-opinion.json");

const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";
const API_KEY = process.env.DEEPSEEK_API_KEY;
const BUDGET = 300000; // characters of source text per request
const CONCURRENCY = 4;

if (!API_KEY) {
  console.error("error: DEEPSEEK_API_KEY is not set in the environment.");
  process.exit(1);
}

const PASSAGE_PROMPT = `You are a strict textual-entailment checker. You will be given a CLAIM and a PASSAGE.
Decide only whether the PASSAGE supports the CLAIM, or merely sits near the topic without actually supporting it.
Do not use outside knowledge. Do not research. Judge only the text given.

Respond in exactly this format, two lines, nothing else:
VERDICT: SUPPORTED
REASONING: one sentence.

VERDICT must be one of: SUPPORTED, NOT SUPPORTED, PARTIALLY SUPPORTED.`;

const FULLTEXT_PROMPT = `You are a strict fact-checker. You will be given the full text of one or more SOURCES, then a CLAIM from an article that cites them.
Decide whether the SOURCES, read as a whole, support the CLAIM. Check every figure, date, name and quotation in the claim against the sources. A claim that quotes a source must match its wording. A claim that adds something the sources do not say is not fully supported.
Do not use outside knowledge. Judge only the text given. Source texts were extracted automatically from web pages and PDFs, so expect broken lines, stray headers and lost symbols.
If the source text is clearly not the full document (a paywall, a landing page or abstract only, a cookie notice), say so on the SOURCE line.

Respond in exactly this format, four lines, nothing else:
VERDICT: SUPPORTED
QUOTE: the exact sentence or phrase from the sources that most directly supports or contradicts the claim, copied character for character, or NONE
SOURCE: COMPLETE
REASONING: one sentence.

VERDICT must be one of: SUPPORTED, NOT SUPPORTED, PARTIALLY SUPPORTED.
SOURCE must be one of: COMPLETE, INCOMPLETE.`;

function parse(text) {
  const verdict = text.match(/VERDICT:\s*(SUPPORTED|NOT SUPPORTED|PARTIALLY SUPPORTED)/i);
  const quote = text.match(/QUOTE:\s*(.+)/i);
  const source = text.match(/SOURCE:\s*(COMPLETE|INCOMPLETE)/i);
  const reasoning = text.match(/REASONING:\s*(.+)/i);
  if (!verdict) return { verdict: "PARSE_ERROR", reasoning: text.trim() };
  return {
    verdict: verdict[1].toUpperCase(),
    quote: quote ? quote[1].trim().replace(/^["']|["']$/g, "") : null,
    sourceComplete: source ? source[1].toUpperCase() === "COMPLETE" : null,
    reasoning: reasoning ? reasoning[1].trim() : "",
  };
}

// Loose enough to survive line breaks, hyphenation, curly quotes and dashes
// from PDF extraction; strict enough that an invented sentence fails.
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[‘’‚′`]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/-\s*\n\s*/g, "")
    .replace(/[^a-z0-9%£$€.,;:'"()\- ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// DeepSeek often stitches fragments together with "..." : each fragment must
// be in the sources, not the stitched whole.
function quoteFound(quote, texts) {
  if (!quote || /^none$/i.test(quote)) return null;
  const parts = quote.split(/\.\.\.|…/).map((p) => normalize(p).replace(/^[.,;: ]+|[.,;: ]+$/g, "")).filter((p) => p.length >= 8);
  if (!parts.length) return null;
  const hay = texts.map(normalize);
  return parts.every((p) => hay.some((t) => t.includes(p)));
}

async function call(system, user) {
  const body = { model: MODEL, messages: [{ role: "system", content: system }, { role: "user", content: user }], temperature: 0, max_tokens: 400 };
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`DeepSeek API ${res.status} ${res.statusText}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
      const data = await res.json();
      return { ...parse(data?.choices?.[0]?.message?.content ?? ""), servedBy: data?.model ?? null, usage: data?.usage ?? null };
    } catch (err) {
      if (attempt >= 3) return { verdict: "ERROR", reasoning: `request failed ${attempt} times: ${err.message}` };
      console.error(`  retrying after error: ${err.message}`);
      await new Promise((r) => setTimeout(r, 3000 * attempt));
    }
  }
}

async function loadSources(exhibit) {
  if (!exhibit) return null;
  const dirs = (await readdir(path.join(REPO_ROOT, "reports"))).filter((d) => d.startsWith(`${exhibit}-`));
  if (!dirs.length) return null;
  const dir = path.join(REPO_ROOT, "reports", dirs[0], "sources");
  if (!existsSync(path.join(dir, "manifest.json"))) return null;
  const manifest = JSON.parse(readFileSync(path.join(dir, "manifest.json"), "utf8"));
  // Every source the exhibit lists, with its text when one was fetched, so a
  // claim citing a source that couldn't be fetched is recognised as such.
  return manifest.sources.map((s) => {
    const file = path.join(dir, `${s.id}.txt`);
    const ok = ["fetched", "kept", "manual"].includes(s.status) && existsSync(file);
    return { ...s, body: ok ? readFileSync(file, "utf8") : null };
  });
}

const STOP = new Set("the and for from with that this into page article report local extraction text fetched live mirror source sources office national statistics also which their".split(" "));
const words = (s) => new Set((s.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []).filter((w) => !STOP.has(w)));

// Which of the exhibit's sources the fact-checker cited for this claim, by
// word overlap between its free-text `source` field and each source's name,
// description and URL. Returns null when nothing matches clearly.
function matchSources(all, claimSource) {
  const want = words(claimSource ?? "");
  const scored = all.map((s) => ({ s, score: [...want].filter((w) => words(`${s.name ?? ""} ${s.text} ${s.url ?? ""}`).has(w)).length }));
  const best = Math.max(0, ...scored.map((x) => x.score));
  if (best < 2) return null;
  return scored.filter((x) => x.score >= Math.max(2, best / 2)).sort((a, b) => b.score - a.score).map((x) => x.s);
}

// The texts to send for 1 claim, or { missing } when every source it cites
// is one that couldn't be fetched (the caller then falls back to the passage).
function pick(all, claimSource, everything) {
  const fetched = all.filter((s) => s.body);
  const matched = matchSources(all, claimSource);
  const missing = (matched ?? []).filter((s) => !s.body).map((s) => s.id);
  // The source that best matches what the fact-checker cited wasn't fetched:
  // judging the claim against the others would only produce false dissents.
  if (matched && !matched[0].body) return { missing };
  let chosen = everything || !matched ? fetched : matched.filter((s) => s.body);
  let truncated = false;
  if (chosen.reduce((n, s) => n + s.body.length, 0) > BUDGET) {
    const share = Math.floor(BUDGET / chosen.length);
    chosen = chosen.map((s) => ({ ...s, body: s.body.slice(0, share) }));
    truncated = true;
  }
  return { chosen, truncated, missing };
}

function sourceBlock(chosen) {
  return chosen.map((s) => `=== SOURCE ${s.id}: ${s.name ?? ""} (${s.url}) ===\n${s.body}`).join("\n\n");
}

async function main() {
  const report = JSON.parse(await readFile(inputPath, "utf8"));
  const claims = report.claims ?? [];
  if (!claims.length) {
    console.error(`no claims found in ${inputPath}`);
    process.exit(1);
  }
  const sources = PASSAGE_ONLY ? null : await loadSources(report.exhibit);
  const fetched = (sources ?? []).filter((s) => s.body);
  const total = fetched.reduce((n, s) => n + s.body.length, 0);
  const everything = fetched.length > 0 && total <= BUDGET;
  if (!fetched.length) console.error(PASSAGE_ONLY ? "passage-only mode" : `no fetched sources for exhibit ${report.exhibit}; run scripts/fetch-sources.mjs first. Falling back to passage mode.`);
  else console.error(`${fetched.length} of ${sources.length} sources fetched, ${total} characters: ${everything ? "every claim sees every fetched source" : "sources matched per claim"}`);

  // --dry-run prints which sources each claim would get, without calling the API.
  if (process.argv.includes("--dry-run")) {
    for (const entry of claims) {
      const p = fetched.length ? pick(sources, entry.source, everything) : { missing: [] };
      console.log(`#${entry.id} ${p.chosen ? "full-text " + p.chosen.map((s) => s.id).join(",") : "passage"}${p.missing?.length ? " (not fetched: " + p.missing.join(",") + ")" : ""} | ${String(entry.source).slice(0, 90)}`);
    }
    return;
  }

  async function viaPassage(entry, extra) {
    const passage = entry.passage && entry.passage.trim() ? entry.passage : "(no passage was retrieved)";
    const r = await call(PASSAGE_PROMPT, `CLAIM: ${entry.claim}\n\nPASSAGE: ${passage}`);
    return { id: entry.id, mode: "passage", ...extra, verdict: r.verdict, reasoning: r.reasoning, servedBy: r.servedBy };
  }

  const results = new Array(claims.length);
  let next = 0;
  async function worker() {
    while (next < claims.length) {
      const i = next++;
      const entry = claims[i];
      console.error(`checking #${entry.id}...`);
      if (!fetched.length) {
        results[i] = await viaPassage(entry, {});
        continue;
      }
      const { chosen, truncated, missing } = pick(sources, entry.source, everything);
      if (!chosen) {
        results[i] = await viaPassage(entry, { notFetched: missing });
        continue;
      }
      const r = await call(FULLTEXT_PROMPT, `${sourceBlock(chosen)}\n\n=== CLAIM ===\n${entry.claim}`);
      results[i] = { id: entry.id, mode: "full-text", sourcesUsed: chosen.map((s) => s.id), notFetched: missing, truncated, verdict: r.verdict, quote: r.quote ?? null, quoteFound: quoteFound(r.quote, chosen.map((s) => s.body)), sourceComplete: r.sourceComplete ?? null, reasoning: r.reasoning, servedBy: r.servedBy };
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const served = [...new Set(results.map((r) => r.servedBy).filter(Boolean))];
  const output = {
    exhibit: report.exhibit ?? null,
    reviewedAt: new Date().toISOString(),
    model: MODEL,
    servedBy: served,
    sourceCharacters: total,
    claims: results,
  };
  await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.error(`wrote ${outputPath}`);
}

main().catch((err) => {
  console.error(`fatal: ${err.message}`);
  process.exit(1);
});
