#!/usr/bin/env node
// Keeps /methodology true. The page lists the tooling discovered from the repo
// (scripts/lib/inventory.mjs) next to the write-ups in src/data/methodology.mjs;
// this fails when the 2 disagree:
//   1. a discovered tool has no entry (someone added an agent, skill, hook,
//      script, workflow, MCP server, plugin or dependency and didn't say so)
//   2. an entry names a tool that no longer exists
//   3. a receipt no longer holds: its file is gone or lost the quoted text
//   4. a pipeline step names an id that doesn't exist
//   5. the write-ups contain an em dash (house voice)
//   6. an era's history doesn't hold: a commit hash doesn't exist, the
//      commits across all eras aren't in git order, an era with no commits
//      doesn't say why (selfReported), or its note doesn't exist
//
// Two ways to run it:
//   node scripts/check-methodology.mjs   (npm's prebuild: any finding fails the build)
//   as a Claude Code PostToolUse hook: when Claude writes or edits a tooling
//   file, findings come back as context to act on, not a block, because a new
//   tool is written before its entry is.
//
// Exit codes: 0 clean, 1 findings (CLI mode).

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { discover } from './lib/inventory.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = path.join(ROOT, 'src', 'data', 'methodology.mjs');

// Files whose change can change the inventory or the write-ups.
const TOOLING = /(^|[\\/])(\.claude[\\/](agents|skills|commands)[\\/]|\.claude[\\/]settings\.json$|\.mcp\.json$|scripts[\\/]|\.github[\\/]workflows[\\/]|package\.json$|src[\\/]data[\\/]methodology\.mjs$)/;

async function check() {
  // Cache-bust so a hook run sees the registry as just edited.
  const reg = await import(`${pathToFileURL(REGISTRY).href}?t=${Date.now()}`);
  const found = discover(ROOT);
  const ids = new Set(found.map((t) => t.id));
  const problems = [];

  for (const t of found) {
    if (!reg.entries[t.id]) problems.push(`${t.id} (${t.file}) is in the repo but not on /methodology: add an entry for '${t.id}' to src/data/methodology.mjs`);
  }
  for (const id of Object.keys(reg.entries)) {
    if (!ids.has(id)) problems.push(`'${id}' is described in src/data/methodology.mjs but no longer exists in the repo: remove or rename the entry`);
  }
  for (const e of reg.external) {
    const f = path.join(ROOT, e.receipt.file);
    if (!existsSync(f)) problems.push(`receipt for "${e.name}": ${e.receipt.file} does not exist`);
    else if (!readFileSync(f, 'utf8').includes(e.receipt.contains)) problems.push(`receipt for "${e.name}": ${e.receipt.file} no longer contains ${JSON.stringify(e.receipt.contains)}; update the write-up or the receipt`);
  }
  for (const s of reg.pipeline) {
    for (const id of s.uses) if (!ids.has(id)) problems.push(`pipeline step "${s.step}" uses '${id}', which does not exist`);
  }
  problems.push(...checkEras(reg.eras ?? []));
  if (readFileSync(REGISTRY, 'utf8').includes('—')) problems.push('src/data/methodology.mjs contains an em dash');

  return problems;
}

function gitOk(args) {
  try {
    execFileSync('git', args, { cwd: ROOT, stdio: 'ignore' });
    return true;
  } catch (err) {
    // A nonzero git exit means "no". Anything else (git missing, a bug here)
    // must not read as a missing commit.
    if (typeof err.status === 'number') return false;
    throw err;
  }
}

function checkEras(eras) {
  const problems = [];
  let prev = null;
  for (const era of eras) {
    if (!era.commits.length && !era.selfReported) problems.push(`era "${era.name}" has no commits and no selfReported line saying why`);
    if (era.note && !existsSync(path.join(ROOT, 'src', 'content', 'notes', `${era.note}.md`))) problems.push(`era "${era.name}" links note '${era.note}', which does not exist`);
    for (const h of era.commits) {
      if (!gitOk(['cat-file', '-e', `${h}^{commit}`])) {
        problems.push(`era "${era.name}" cites commit ${h}, which does not exist`);
        continue;
      }
      if (prev && !gitOk(['merge-base', '--is-ancestor', prev.hash, h])) problems.push(`era "${era.name}": commit ${h} is not after ${prev.hash} (era "${prev.era}"); eras and their commits go oldest first`);
      prev = { hash: h, era: era.name };
    }
  }
  return problems;
}

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

if (process.argv.includes('--hook')) {
  // No process.exit(): on Windows it can cut off stdout before the pipe drains.
  const input = JSON.parse((await readStdin()) || '{}');
  const file = input.tool_input?.file_path ?? input.tool_response?.filePath ?? '';
  if (TOOLING.test(path.relative(ROOT, path.resolve(file)))) {
    const problems = await check();
    if (problems.length) {
      const msg = `/methodology is out of date (the build will fail until fixed):\n${problems.map((p) => `  - ${p}`).join('\n')}`;
      process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: msg } }));
    }
  }
} else {
  const problems = await check();
  for (const p of problems) console.log(`BLOCKING  ${p}`);
  if (!problems.length) console.log('ok  /methodology matches the repo');
  process.exitCode = problems.length ? 1 : 0;
}
