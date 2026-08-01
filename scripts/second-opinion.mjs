#!/usr/bin/env node
// Posts each (claim, passage) pair from a fact-checker report to DeepSeek and
// asks one narrow question: does the passage support the claim, or merely sit
// near it? Never re-researches, never sees the exhibit or the cited source URL.
//
// Usage: node second-opinion.mjs [input.json] [output.json]
// Env:   DEEPSEEK_API_KEY (required), DEEPSEEK_MODEL (optional, default deepseek-chat)

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");

const inputPath = path.resolve(REPO_ROOT, process.argv[2] ?? "fact-check-output.json");
const outputPath = path.resolve(REPO_ROOT, process.argv[3] ?? "second-opinion.json");

const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
  console.error("error: DEEPSEEK_API_KEY is not set in the environment.");
  process.exit(1);
}

const SYSTEM_PROMPT = `You are a strict textual-entailment checker. You will be given a CLAIM and a PASSAGE.
Decide only whether the PASSAGE supports the CLAIM, or merely sits near the topic without actually supporting it.
Do not use outside knowledge. Do not research. Judge only the text given.

Respond in exactly this format, two lines, nothing else:
VERDICT: SUPPORTED
REASONING: one sentence.

VERDICT must be one of: SUPPORTED, NOT SUPPORTED, PARTIALLY SUPPORTED.`;

function buildUserPrompt(claim, passage) {
  const passageText = passage && passage.trim().length > 0 ? passage : "(no passage was retrieved)";
  return `CLAIM: ${claim}\n\nPASSAGE: ${passageText}`;
}

function parseVerdict(text) {
  const verdictMatch = text.match(/VERDICT:\s*(SUPPORTED|NOT SUPPORTED|PARTIALLY SUPPORTED)/i);
  const reasoningMatch = text.match(/REASONING:\s*(.+)/i);
  if (!verdictMatch) {
    return { verdict: "PARSE_ERROR", reasoning: text.trim() };
  }
  return {
    verdict: verdictMatch[1].toUpperCase(),
    reasoning: reasoningMatch ? reasoningMatch[1].trim() : "",
  };
}

async function callDeepSeek(claim, passage) {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(claim, passage) },
    ],
    temperature: 0,
    max_tokens: 200,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`DeepSeek API ${res.status} ${res.statusText}: ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  return parseVerdict(content);
}

async function callWithRetry(claim, passage) {
  try {
    return await callDeepSeek(claim, passage);
  } catch (err) {
    console.error(`  retrying after error: ${err.message}`);
    try {
      return await callDeepSeek(claim, passage);
    } catch (err2) {
      return { verdict: "ERROR", reasoning: `request failed twice: ${err2.message}` };
    }
  }
}

async function main() {
  const raw = await readFile(inputPath, "utf8");
  const report = JSON.parse(raw);
  const claims = report.claims ?? [];

  if (claims.length === 0) {
    console.error(`no claims found in ${inputPath}`);
    process.exit(1);
  }

  const results = [];
  for (const entry of claims) {
    console.error(`checking #${entry.id}...`);
    const { verdict, reasoning } = await callWithRetry(entry.claim, entry.passage);
    results.push({ id: entry.id, verdict, reasoning });
  }

  const output = {
    exhibit: report.exhibit ?? null,
    reviewedAt: new Date().toISOString(),
    model: MODEL,
    claims: results,
  };

  await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.error(`wrote ${outputPath}`);
}

main().catch((err) => {
  console.error(`fatal: ${err.message}`);
  process.exit(1);
});
