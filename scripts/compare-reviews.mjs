#!/usr/bin/env node
// Joins a fact-checker report and its DeepSeek second opinion by claim id and
// prints agreements briefly, disagreements in full.
//
// Usage: node compare-reviews.mjs [fact-check-output.json] [second-opinion.json]

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");

const factCheckPath = path.resolve(REPO_ROOT, process.argv[2] ?? "fact-check-output.json");
const secondOpinionPath = path.resolve(REPO_ROOT, process.argv[3] ?? "second-opinion.json");

function truncate(text, max = 80) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

async function main() {
  const [factCheckRaw, secondOpinionRaw] = await Promise.all([
    readFile(factCheckPath, "utf8"),
    readFile(secondOpinionPath, "utf8"),
  ]);

  const factCheck = JSON.parse(factCheckRaw);
  const secondOpinion = JSON.parse(secondOpinionRaw);

  const secondOpinionById = new Map(secondOpinion.claims.map((c) => [c.id, c]));

  const agreements = [];
  const disagreements = [];
  const unmatched = [];

  for (const claim of factCheck.claims ?? []) {
    const other = secondOpinionById.get(claim.id);
    if (!other) {
      unmatched.push(claim);
      continue;
    }
    if (other.verdict === claim.verdict) {
      agreements.push({ claim, other });
    } else {
      disagreements.push({ claim, other });
    }
  }

  const exhibit = factCheck.exhibit ?? secondOpinion.exhibit ?? "(unknown)";
  console.log(`Exhibit ${exhibit}: ${agreements.length} agreement(s), ${disagreements.length} disagreement(s)${unmatched.length ? `, ${unmatched.length} unmatched` : ""}\n`);

  if (agreements.length > 0) {
    console.log("Agreements:");
    for (const { claim } of agreements) {
      console.log(`  #${claim.id} [${claim.verdict}] ${truncate(claim.claim)}`);
    }
    console.log("");
  }

  if (disagreements.length > 0) {
    console.log("Disagreements:");
    for (const { claim, other } of disagreements) {
      console.log(`\n  #${claim.id} ${claim.claim}`);
      console.log(`    source:   ${claim.source}`);
      console.log(`    passage:  ${claim.passage || "(none retrieved)"}`);
      console.log(`    fact-checker: ${claim.verdict} — ${claim.notes}`);
      console.log(`    deepseek:     ${other.verdict} — ${other.reasoning}`);
    }
    console.log("");
  }

  if (unmatched.length > 0) {
    console.log(`Unmatched (present in fact-check-output.json, no second opinion found):`);
    for (const claim of unmatched) {
      console.log(`  #${claim.id} ${truncate(claim.claim)}`);
    }
    console.log("");
  }

  if (disagreements.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`fatal: ${err.message}`);
  process.exit(1);
});
