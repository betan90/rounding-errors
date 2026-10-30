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
// Model ids, efforts, the spawn description, how long the run took and how
// many calls it made to each tool; no transcript text.
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

// The model and effort the spawning session named at launch, if it overrode
// the agent file (a model) or the session's own setting (an effort).
function launched(parentTranscript, toolUseId) {
  if (!toolUseId || !existsSync(parentTranscript)) return {};
  for (const x of jsonl(parentTranscript)) {
    if (x.type !== 'assistant' || !Array.isArray(x.message?.content)) continue;
    const call = x.message.content.find((c) => c.type === 'tool_use' && c.id === toolUseId);
    if (call) return { model: call.input?.model ?? null, effort: call.input?.effort ?? null };
  }
  return {};
}

// 1 row for 1 subagent run, or null if its transcript has no served turn yet.
// No agent file sets an effort, so a run follows the session's effort, turn by
// turn; `effort` lists every level its turns ran at, in order of first use.
// Models without an effort setting (Haiku 4.5) record none.
function row(sessionDir, file) {
  const meta = path.join(sessionDir, 'subagents', file.replace(/\.jsonl$/, '.meta.json'));
  const info = existsSync(meta) ? JSON.parse(readFileSync(meta, 'utf8')) : {};
  const lines = jsonl(path.join(sessionDir, 'subagents', file));
  const turns = lines.filter((x) => x.type === 'assistant' && x.message?.model && x.message.model !== '<synthetic>');
  if (!turns.length) return null;
  const task = info.description ?? '';
  const asked = launched(`${sessionDir}.jsonl`, info.toolUseId);
  // How long the run took, launch to last line, and what it spent its turns on.
  const times = lines.map((x) => Date.parse(x.timestamp)).filter(Number.isFinite);
  const tools = {};
  const seen = new Set();
  for (const x of turns) {
    for (const c of x.message.content ?? []) {
      if (c.type !== 'tool_use' || seen.has(c.id) || c.name === 'SubagentHandback') continue;
      seen.add(c.id);
      tools[c.name] = (tools[c.name] ?? 0) + 1;
    }
  }
  return {
    date: turns[0].timestamp.slice(0, 10),
    agent: info.agentType ?? 'unknown',
    task,
    exhibit: task.match(/\b(0\d\d)\b/)?.[1] ?? null,
    // A model-and-effort comparison run (scripts/compare-drafts.mjs), not part
    // of making the exhibit; /methodology leaves these out.
    comparison: task.startsWith('Compare:'),
    models: [...new Set(turns.map((x) => x.message.model))],
    effort: [...new Set(turns.map((x) => x.effort).filter(Boolean))],
    requested: asked.model ?? null,
    requestedEffort: asked.effort ?? null,
    claudeCode: turns[0].version ?? null,
    seconds: Math.round((Math.max(...times) - Math.min(...times)) / 1000),
    tools,
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
  // Every run still on disk is re-read, so a field added to row() reaches old
  // lines too; a line whose transcript has been deleted is kept as it was.
  const byRun = new Map(logged().map((x) => [x.run, x]));
  let added = 0;
  let updated = 0;
  const sessions = existsSync(PROJECT) ? readdirSync(PROJECT).filter((d) => existsSync(path.join(PROJECT, d, 'subagents'))) : [];
  for (const s of sessions) {
    for (const f of runsIn(path.join(PROJECT, s))) {
      const r = row(path.join(PROJECT, s), f);
      if (!r) continue;
      const old = byRun.get(r.run);
      if (!old) added += 1;
      else if (JSON.stringify(old) !== JSON.stringify(r)) updated += 1;
      byRun.set(r.run, r);
    }
  }
  const all = [...byRun.values()].sort((a, b) => a.date.localeCompare(b.date) || a.run.localeCompare(b.run));
  writeFileSync(LOG, all.map((x) => JSON.stringify(x)).join('\n') + (all.length ? '\n' : ''));
  console.log(`${added} new run(s), ${updated} updated, ${all.length} in reports/model-log.jsonl (read from ${PROJECT})`);
} else {
  console.log('usage: node scripts/log-models.mjs --backfill | --hook (stdin: SubagentStop hook input)');
}
