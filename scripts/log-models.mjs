#!/usr/bin/env node
// Records which Claude model actually ran each subagent, from Claude Code's own transcripts.
//
// The agent files name a model by alias (opus, sonnet, haiku), and an alias
// follows the newest model in its family, so the repo alone can't say which
// model checked an exhibit. Claude Code's transcripts can: every turn records
// the model id the API served. They live outside the repo, in
// ~/.claude/projects/<project>/, and are deleted after a retention period
// (cleanupPeriodDays, 30 by default), so this copies the facts that matter
// into a tracked file before they go: reports/model-log.jsonl, 1 run per line.
// Model ids and the spawn description only; no transcript text.
//
// Two ways to run it:
//   as a Claude Code SubagentStop hook (--hook): logs the run that just ended.
//     It never blocks the subagent; a run it can't read yet (the transcript is
//     written asynchronously) is picked up by the next backfill.
//   node scripts/log-models.mjs --backfill: logs every run still on disk that
//     isn't in the log yet. Safe to repeat; runs are keyed by agent id.

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOG = path.join(ROOT, 'reports', 'model-log.jsonl');
// Claude Code names a project's transcript folder after its path, with every
// character that isn't a letter or digit turned into a dash.
const PROJECT = path.join(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), '.claude'), 'projects', ROOT.replace(/[^A-Za-z0-9]/g, '-'));

const jsonl = (f) =>
  readFileSync(f, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .flatMap((l) => {
      try {
        return [JSON.parse(l)];
      } catch {
        return [];
      }
    });

function logged() {
  return existsSync(LOG) ? jsonl(LOG) : [];
}

// The model the spawning session asked for, if it overrode the agent file.
function requested(parentTranscript, toolUseId) {
  if (!toolUseId || !existsSync(parentTranscript)) return null;
  for (const x of jsonl(parentTranscript)) {
    if (x.type !== 'assistant' || !Array.isArray(x.message?.content)) continue;
    const call = x.message.content.find((c) => c.type === 'tool_use' && c.id === toolUseId);
    if (call) return call.input?.model ?? null;
  }
  return null;
}

// 1 row for 1 subagent run, or null if its transcript has no served turn yet.
function row(sessionDir, file) {
  const meta = path.join(sessionDir, 'subagents', file.replace(/\.jsonl$/, '.meta.json'));
  const info = existsSync(meta) ? JSON.parse(readFileSync(meta, 'utf8')) : {};
  const lines = jsonl(path.join(sessionDir, 'subagents', file));
  const turns = lines.filter((x) => x.type === 'assistant' && x.message?.model && x.message.model !== '<synthetic>');
  if (!turns.length) return null;
  const task = info.description ?? '';
  return {
    date: turns[0].timestamp.slice(0, 10),
    agent: info.agentType ?? 'unknown',
    task,
    exhibit: task.match(/\b(0\d\d)\b/)?.[1] ?? null,
    models: [...new Set(turns.map((x) => x.message.model))],
    requested: requested(`${sessionDir}.jsonl`, info.toolUseId),
    claudeCode: turns[0].version ?? null,
    run: turns[0].agentId ?? file.replace(/^agent-|\.jsonl$/g, ''),
  };
}

function runsIn(sessionDir) {
  const dir = path.join(sessionDir, 'subagents');
  return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.jsonl')) : [];
}

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

if (process.argv.includes('--hook')) {
  // Never fail the subagent over a log line: every error ends quietly, and
  // the next backfill fills the gap.
  try {
    const input = JSON.parse((await readStdin()) || '{}');
    const tp = input.transcript_path ?? '';
    const sessionDir = path.join(path.dirname(tp), path.basename(tp, '.jsonl'));
    const id = input.agent_id ?? '';
    const file = runsIn(sessionDir).find((f) => f === `agent-${id}.jsonl` || f === `${id}.jsonl`);
    const r = file && row(sessionDir, file);
    if (r && !logged().some((x) => x.run === r.run)) appendFileSync(LOG, `${JSON.stringify(r)}\n`);
  } catch (err) {
    console.error(`log-models: ${err.message}`);
  }
} else if (process.argv.includes('--backfill')) {
  const have = logged();
  const seen = new Set(have.map((x) => x.run));
  const found = [];
  const sessions = existsSync(PROJECT) ? readdirSync(PROJECT).filter((d) => existsSync(path.join(PROJECT, d, 'subagents'))) : [];
  for (const s of sessions) {
    for (const f of runsIn(path.join(PROJECT, s))) {
      const r = row(path.join(PROJECT, s), f);
      if (r && !seen.has(r.run)) {
        found.push(r);
        seen.add(r.run);
      }
    }
  }
  const all = [...have, ...found].sort((a, b) => a.date.localeCompare(b.date) || a.run.localeCompare(b.run));
  writeFileSync(LOG, all.map((x) => JSON.stringify(x)).join('\n') + (all.length ? '\n' : ''));
  console.log(`${found.length} new run(s) logged, ${all.length} in reports/model-log.jsonl (read from ${PROJECT})`);
} else {
  console.log('usage: node scripts/log-models.mjs --backfill | --hook (stdin: SubagentStop hook input)');
}
