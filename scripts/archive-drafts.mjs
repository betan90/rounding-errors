#!/usr/bin/env node
// Archives what each drafter run was given and what it wrote, from Claude Code's transcripts, into reports/NNN-slug/drafting/.
//
// The drafter's whole input is the brief the main session writes for it, and
// the repo kept none of them: the brief lived in the spawn prompt and a temp
// file, the draft lived at the repo root until the site-builder deleted it,
// and the transcripts that held both are deleted after 30 days. Per run, in
// reports/NNN-slug/drafting/<date>-<run>/:
//   prompt.md    the message the main session sent the drafter
//   brief.md     the brief file the prompt pointed to, as the drafter read it
//   draft-N.md   every version of the exhibit file the drafter wrote, in order
//   report.md    what the drafter reported back when it finished
//   run.json     model, effort, Claude Code version, and every file it opened
// Source texts the drafter read are not copied: they are other publishers'
// work, gitignored for the same reason under reports/*/sources/.
//
// Two ways to run it:
//   as a Claude Code SubagentStop hook on the exhibit-drafter (--hook): archives
//     the run that just ended, and never blocks it.
//   node scripts/archive-drafts.mjs --backfill: every drafter run still on disk.
// Comparison runs (task starting "Compare:") are skipped; compare-drafts.mjs
// keeps those with their comparison.

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT = path.join(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), '.claude'), 'projects', ROOT.replace(/[^A-Za-z0-9]/g, '-'));
const EXHIBIT_FILE = /^exhibit-(\d{3})-(.+)\.md$/;

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

const rel = (p) => {
  const r = path.relative(ROOT, p);
  return r.startsWith('..') || path.isAbsolute(r) ? p : r.replaceAll('\\', '/');
};

// Everything 1 drafter run did, in order, from its transcript.
export function readRun(sessionDir, file) {
  const dir = path.join(sessionDir, 'subagents');
  const metaFile = path.join(dir, file.replace(/\.jsonl$/, '.meta.json'));
  const meta = existsSync(metaFile) ? JSON.parse(readFileSync(metaFile, 'utf8')) : {};
  const r = readTranscript(path.join(dir, file));
  return { meta, ...r, run: r.turns[0]?.agentId ?? file.replace(/^agent-|\.jsonl$/g, '') };
}

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 12);

// The same, for any transcript: an agent run's, or a headless session's
// (claude -p), which has no .meta.json.
export function readTranscript(file) {
  const lines = jsonl(file);
  const turns = lines.filter((x) => x.type === 'assistant' && x.message?.model && x.message.model !== '<synthetic>');
  const first = lines.find((x) => x.type === 'user');
  const prompt = typeof first?.message?.content === 'string' ? first.message.content : (first?.message?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
  const calls = [];
  const seen = new Set();
  for (const x of turns) {
    for (const c of x.message.content ?? []) {
      if (c.type === 'tool_use' && !seen.has(c.id)) {
        seen.add(c.id);
        calls.push(c);
      }
    }
  }
  // What each Read returned, keyed by tool call: the raw text, and whether the
  // read covered the whole file.
  const reads = new Map();
  for (const x of lines) {
    const f = x.toolUseResult?.file;
    const id = Array.isArray(x.message?.content) ? x.message.content.find((c) => c.type === 'tool_result')?.tool_use_id : null;
    if (f && id) reads.set(id, { content: f.content, whole: (f.startLine ?? 1) === 1 && f.numLines === f.totalLines });
  }
  // The model the run was told it was (its system prompt), and the model its
  // requests named. Both are recorded because they can differ from each other
  // and from the model that answered.
  const told = [...new Set(lines.filter((x) => x.attachment?.type === 'model').map((x) => x.attachment.identity?.modelId).filter(Boolean))];
  const requested = [...new Set(lines.filter((x) => x.type === 'api-request').map((x) => x.params?.model).filter(Boolean))];
  // What the run was handed besides its prompt, as hashes: Claude Code adds
  // the CLAUDE.md and memory index of the folder the session runs in, whatever
  // checkout the prompt points to, and the system prompt comes from the agent file.
  const handed = lines.find((x) => x.attachment?.type === 'instructions')?.attachment.files ?? [];
  const system = lines.find((x) => x.attachment?.type === 'prompt_snapshot')?.attachment.systemPrompt ?? [];
  const context = {
    claudeCode: turns[0]?.version ?? null,
    instructions: handed.map((f) => ({ type: f.type, file: path.basename(f.path), sha256: sha(f.content) })),
    systemPrompt: system.length ? sha(system.join('\n')) : null,
  };
  return { turns, prompt, calls, reads, told, requested, context };
}

// Every version of the exhibit file, in order: each Write is a version, and
// the Edits after it are folded into the next one.
export function versions(calls) {
  const out = [];
  let current = null;
  let edited = false;
  const notApplied = [];
  for (const c of calls) {
    const name = path.basename(c.input?.file_path ?? '');
    if (!EXHIBIT_FILE.test(name)) continue;
    if (c.name === 'Write') {
      if (edited) out.push({ name, content: current });
      current = c.input.content;
      out.push({ name, content: current });
      edited = false;
    } else if (c.name === 'Edit' && current !== null) {
      const { old_string: from, new_string: to, replace_all: all } = c.input;
      if (!current.includes(from)) notApplied.push(from.slice(0, 80));
      else {
        current = all ? current.split(from).join(to) : current.replace(from, () => to);
        edited = true;
      }
    }
  }
  if (edited) out.push({ name: out.at(-1).name, content: current });
  return { drafts: out, notApplied };
}

function archive(sessionDir, file) {
  const r = readRun(sessionDir, file);
  const task = r.meta.description ?? '';
  if (task.startsWith('Compare:')) return `skipped ${r.run}: a comparison run`;
  if (!r.turns.length) return `skipped ${r.run}: no served turn yet`;
  const { drafts, notApplied } = versions(r.calls);
  const num = drafts[0]?.name.match(EXHIBIT_FILE)?.[1] ?? task.match(/\b(0\d\d)\b/)?.[1];
  if (!num) return `skipped ${r.run}: no exhibit number in "${task}"`;
  const reports = path.join(ROOT, 'reports');
  const folder = drafts[0]
    ? `${num}-${drafts[0].name.match(EXHIBIT_FILE)[2]}`
    : readdirSync(reports).find((d) => d.startsWith(`${num}-`));
  if (!folder) return `skipped ${r.run}: no reports/ folder for exhibit ${num} and no draft to name one`;
  const date = r.turns[0].timestamp.slice(0, 10);
  const out = path.join(reports, folder, 'drafting', `${date}-${r.run}`);
  mkdirSync(out, { recursive: true });

  writeFileSync(path.join(out, 'prompt.md'), r.prompt.endsWith('\n') ? r.prompt : `${r.prompt}\n`);
  let brief = null;
  for (const c of r.calls) {
    if (c.name !== 'Read' || !/brief/i.test(path.basename(c.input?.file_path ?? ''))) continue;
    const got = r.reads.get(c.id);
    if (!got) continue;
    writeFileSync(path.join(out, 'brief.md'), got.content.endsWith('\n') ? got.content : `${got.content}\n`);
    brief = { from: rel(c.input.file_path), whole: got.whole };
  }
  drafts.forEach((d, i) => writeFileSync(path.join(out, `draft-${i + 1}.md`), d.content.endsWith('\n') ? d.content : `${d.content}\n`));
  const report = r.calls.find((c) => c.name === 'SubagentHandback')?.input?.message;
  if (report) writeFileSync(path.join(out, 'report.md'), report.endsWith('\n') ? report : `${report}\n`);

  const info = {
    run: r.run,
    date,
    task,
    models: [...new Set(r.turns.map((x) => x.message.model))],
    effort: [...new Set(r.turns.map((x) => x.effort).filter(Boolean))],
    claudeCode: r.turns[0].version ?? null,
    brief,
    drafts: drafts.length,
    editsNotApplied: notApplied,
    opened: r.calls.filter((c) => c.name === 'Read').map((c) => rel(c.input.file_path)),
    searched: r.calls.filter((c) => c.name === 'Glob' || c.name === 'Grep').map((c) => `${c.name} ${c.input.pattern}`),
    wrote: r.calls.filter((c) => c.name === 'Write' || c.name === 'Edit').map((c) => `${c.name} ${rel(c.input.file_path)}`),
  };
  writeFileSync(path.join(out, 'run.json'), `${JSON.stringify(info, null, 2)}\n`);
  return `archived ${r.run} to ${rel(out)}: prompt, ${brief ? 'brief, ' : ''}${drafts.length} draft version(s)`;
}

const drafterRuns = (sessionDir) => {
  const dir = path.join(sessionDir, 'subagents');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.meta.json'))
    .filter((f) => JSON.parse(readFileSync(path.join(dir, f), 'utf8')).agentType === 'exhibit-drafter')
    .map((f) => f.replace(/\.meta\.json$/, '.jsonl'))
    .filter((f) => existsSync(path.join(dir, f)));
};

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--hook')) {
    // Never fail the drafter over its archive; the next backfill fills the gap.
    try {
      const input = JSON.parse((await readStdin()) || '{}');
      if (input.agent_type === 'exhibit-drafter') {
        const tp = input.transcript_path ?? '';
        const sessionDir = path.join(path.dirname(tp), path.basename(tp, '.jsonl'));
        const file = drafterRuns(sessionDir).find((f) => f === `agent-${input.agent_id}.jsonl` || f === `${input.agent_id}.jsonl`);
        if (file) archive(sessionDir, file);
      }
    } catch (err) {
      console.error(`archive-drafts: ${err.message}`);
    }
  } else if (process.argv.includes('--backfill')) {
    const sessions = existsSync(PROJECT) ? readdirSync(PROJECT).filter((d) => existsSync(path.join(PROJECT, d, 'subagents'))) : [];
    for (const s of sessions) for (const f of drafterRuns(path.join(PROJECT, s))) console.log(archive(path.join(PROJECT, s), f));
  } else {
    console.log('usage: node scripts/archive-drafts.mjs --backfill | --hook (stdin: SubagentStop hook input)');
  }
}
