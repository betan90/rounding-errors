#!/usr/bin/env node
// SessionStart hook: counts sessions since the last audit and, once enough
// have passed with something committed in between, tells Claude to launch the
// auditor agent. A hook can't launch an agent itself; it can only put the
// instruction in front of the session that can.
//
// "Last audit" is the newest reports/audits/YYYY-MM-DD.md, which records the
// commit it audited. The session count lives in .claude/audit-state.json
// (gitignored: it's a per-machine counter, not part of the record).
//
// Counts new sessions (startup, /clear), not resumes or compactions.
//
//   node scripts/audit-due.mjs --status   print the counts without changing them

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SESSIONS_BETWEEN_AUDITS = 4;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDITS = path.join(ROOT, 'reports', 'audits');
const STATE = path.join(ROOT, '.claude', 'audit-state.json');

function lastAudit() {
  if (!existsSync(AUDITS)) return null;
  const file = readdirSync(AUDITS).filter((f) => /^\d{4}-\d{2}-\d{2}(-\d+)?\.md$/.test(f)).sort().at(-1);
  if (!file) return null;
  const commit = readFileSync(path.join(AUDITS, file), 'utf8').match(/^Audited commit:\s*([0-9a-f]{7,40})/m)?.[1] ?? null;
  return { file, commit };
}

function commitsSince(commit) {
  try {
    return Number(execFileSync('git', ['rev-list', '--count', commit ? `${commit}..HEAD` : 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim());
  } catch {
    return null; // unknown commit (rewritten history): treat as due
  }
}

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

const audit = lastAudit();
let state = {};
try { state = JSON.parse(readFileSync(STATE, 'utf8')); } catch {}
// A new audit file resets the count.
if (state.lastAudit !== (audit?.file ?? null)) state = { lastAudit: audit?.file ?? null, sessions: 0 };

const status = process.argv.includes('--status');
if (!status) {
  const input = JSON.parse((await readStdin()) || '{}');
  if (['startup', 'clear'].includes(input.source ?? 'startup')) state.sessions += 1;
  writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n');
}

const commits = commitsSince(audit?.commit);
const due = state.sessions >= SESSIONS_BETWEEN_AUDITS && commits !== 0;

if (status) {
  console.log(`last audit: ${audit?.file ?? 'none'} (commit ${audit?.commit ?? 'n/a'})`);
  console.log(`sessions since: ${state.sessions} of ${SESSIONS_BETWEEN_AUDITS}; commits since: ${commits ?? 'unknown'}; due: ${due}`);
} else if (due) {
  const msg = `An audit is due: ${state.sessions} sessions and ${commits ?? 'an unknown number of'} commits since the last audit (${audit?.file ?? 'none yet'}). ` +
    'Per CLAUDE.md, launch the auditor agent now, in the background, then tell the user in 1 line that it is running and carry on with their request. ' +
    'When it finishes, relay its summary and point to the report in reports/audits/. Do not fix its findings without the user\'s go-ahead.';
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: msg } }));
}
