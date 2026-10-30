#!/usr/bin/env node
// Drafts 1 exhibit from 1 brief at several model and effort settings, then measures what changed.
//
// The question: with the brief held fixed, what does the model change, and
// what does the effort level change? And when a new model arrives, what does
// it change against the one before? 4 steps:
//   1. node scripts/compare-drafts.mjs setup <name> --exhibit 017 --base 642dcbe --cells opus:low,opus:medium,...
//      or setup <name> --like <earlier comparison> [--cells ...], which reuses
//      the earlier comparison's exhibit, base commit, watch list and cells.
//      Copies the repo as it was at --base (before the exhibit existed, so no
//      run can read the published version) into a plain folder outside this
//      one, os.tmpdir()/rounding-errors-bench/<name>: no .git, so no history
//      to read, and outside this folder, so no CLAUDE.md or Claude Code memory
//      of this project reaches a run. Copies the original brief and prompt
//      from reports/NNN-slug/drafting/, and writes 1 prompt per cell to
//      reports/comparisons/<name>/prompts/. The prompt is the original with
//      only its paths changed, the 2 voice exemplars the original drafter read
//      named outright, and 1 line saying which files are in scope. Cells get
//      run ids in shuffled order (r01, r02...), so no prompt or file name says
//      which setting made it. A cell listed twice is a repeat: the gap between
//      2 runs of 1 setting is the noise every other gap is measured against.
//      A cell's model is an alias (opus) or a full id (claude-opus-5-5); a
//      full id still reaches the old model after its alias has moved on.
//   2. node scripts/compare-drafts.mjs run <name> [--parallel 4] [--max-usd 20]
//      Runs each cell as its own headless Claude Code session (claude -p) in
//      the copy: the copy's exhibit-drafter as the session's agent, the cell's
//      model and effort, a spending cap, and no settings, hooks or connectors
//      (--restricted, --strict-mcp-config). Session ids go in plan.json.
//   3. node scripts/compare-drafts.mjs collect <name>
//      Reads each run's transcript: the model and effort every turn actually
//      ran at, tokens, time, what it was handed besides its prompt, and every
//      file it opened (a read outside its inputs is flagged). Measures each
//      draft: house rules on its first and last version, body words, numbers
//      and links that aren't in its inputs, its choices (title, category,
//      ledger, verdict), and how far its prose is from every other draft.
//      Writes results.json next to the drafts.
//   4. node scripts/compare-drafts.mjs history [NNN]
//      Lines up every comparison of an exhibit by the model that answered and
//      the effort it ran at, and names any model that has served an agent run
//      here since the newest comparison but has never been compared.
//
// The first comparison, 017-model-effort (29 October 2026), ran another way:
// the main session launched 1 exhibit-drafter per cell, naming its model and
// effort, with the description "Compare: <name> <run>", in a git worktree at
// the base. Claude Code handed each of those agents this folder's CLAUDE.md
// and memory index, whatever checkout it was told to read, which is why runs
// are now headless and copied outside. collect still reads that plan.

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, mkdtempSync, copyFileSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { readRun, readTranscript, versions } from './archive-drafts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS = path.join(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), '.claude'), 'projects');
// Claude Code keeps a folder's transcripts in projects/, under the folder's path.
const projectDir = (folder) => path.join(PROJECTS, folder.replace(/[^A-Za-z0-9]/g, '-'));
const PROJECT = projectDir(ROOT);
const BENCH = path.join(os.tmpdir(), 'rounding-errors-bench');
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'];
const MODELS = ['fable', 'opus', 'sonnet', 'haiku'];

// $ per million tokens, by the model id that answered: Anthropic API list
// prices as of 6 October 2026. Cache writes bill at 1.25x input for the
// 5-minute cache and 2x for the 1-hour cache; agents launched from a session
// wrote the first, headless sessions write the second. Haiku 5.5's cache-read
// price isn't listed, so it takes the usual 0.1x input. A new model needs a
// line here before its drafts can be priced. An estimate: it prices tokens,
// not a bill.
const PRICES = {
  'claude-fable-5-1': { in: 10, out: 50, cacheRead: 0.25 },
  'claude-opus-5-5': { in: 4, out: 20, cacheRead: 0.2 },
  'claude-sonnet-5-5': { in: 2, out: 10, cacheRead: 0.2 },
  'claude-haiku-5-5': { in: 0.1, out: 0.5, cacheRead: 0.01 },
};

const rel = (p) => path.relative(ROOT, p).replaceAll('\\', '/');
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const comparisonDir = (name) => path.join(ROOT, 'reports', 'comparisons', name);
const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'));

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// The archived drafting run that made the exhibit: the first with a brief and a draft.
function originalRun(exhibit) {
  const folder = readdirSync(path.join(ROOT, 'reports')).find((d) => d.startsWith(`${exhibit}-`));
  if (!folder) throw new Error(`no reports/${exhibit}-* folder`);
  const dir = path.join(ROOT, 'reports', folder, 'drafting');
  for (const d of existsSync(dir) ? readdirSync(dir).sort() : []) {
    const info = readJson(path.join(dir, d, 'run.json'));
    if (info.brief && info.drafts > 0) return { folder, dir: path.join(dir, d), info };
  }
  throw new Error(`no archived drafting run with a brief for ${exhibit}; run scripts/archive-drafts.mjs --backfill`);
}

// The drafter as the copy defines it, for claude -p --agents: --restricted
// loads no agents from the folder itself. No model: the cell names it.
function drafterAgent(copy) {
  const { data, body } = split(readFileSync(path.join(copy, '.claude', 'agents', 'exhibit-drafter.md'), 'utf8'));
  const tools = Array.isArray(data.tools) ? data.tools : String(data.tools).split(',').map((t) => t.trim());
  return { [data.name]: { description: data.description, prompt: body.trim(), tools } };
}

function setup(name) {
  const like = arg('--like');
  const prev = like ? readJson(path.join(comparisonDir(like), 'plan.json')) : null;
  const exhibit = arg('--exhibit') ?? prev?.exhibit;
  const base = arg('--base') ?? prev?.base;
  const cells = arg('--cells')
    ? arg('--cells').split(',').filter(Boolean).map((c) => {
        const [model, effort] = c.split(':');
        if (!(MODELS.includes(model) || /^claude-[a-z0-9.-]+$/.test(model)) || !EFFORTS.includes(effort)) {
          throw new Error(`bad cell "${c}": need model:effort, model an alias (${MODELS.join('/')}) or a full id (claude-...), effort one of ${EFFORTS.join('/')}`);
        }
        return { model, effort };
      })
    : (prev?.cells ?? []).map(({ model, effort }) => ({ model, effort }));
  if (!exhibit || !base || !cells.length) throw new Error('usage: setup <name> (--like <comparison> | --exhibit NNN --base <commit>) [--cells model:effort,...]');

  const orig = originalRun(exhibit);
  const draftName = `exhibit-${orig.folder}.md`;
  const published = `src/content/exhibits/${orig.folder}.md`;
  try {
    git('cat-file', '-e', `${base}:${published}`);
    throw new Error(`${base} already contains ${published}; pick a commit from before it shipped`);
  } catch (err) {
    if (err.message.includes('already contains')) throw err;
  }

  const dir = comparisonDir(name);
  if (existsSync(path.join(dir, 'plan.json'))) throw new Error(`reports/comparisons/${name} already has a plan`);
  const copy = path.join(BENCH, name);
  if (existsSync(copy)) throw new Error(`${copy} already exists; remove it first`);
  mkdirSync(copy, { recursive: true });
  // A plain copy, not a worktree: no .git, so nothing later than the base to find.
  execFileSync('tar', ['-x', '-C', copy.replaceAll('\\', '/')], { input: execFileSync('git', ['archive', '--format=tar', base], { cwd: ROOT, maxBuffer: 1 << 30 }) });

  for (const d of ['inputs', 'prompts', 'drafts']) mkdirSync(path.join(dir, d), { recursive: true });
  mkdirSync(path.join(copy, 'inputs'));
  const briefTo = path.join(copy, 'inputs', 'brief.md');
  const brief = readFileSync(path.join(orig.dir, 'brief.md'), 'utf8');
  writeFileSync(briefTo, brief);
  writeFileSync(path.join(dir, 'inputs', 'brief.md'), brief);
  const original = readFileSync(path.join(orig.dir, 'prompt.md'), 'utf8');
  writeFileSync(path.join(dir, 'inputs', 'original-prompt.md'), original);
  writeFileSync(path.join(dir, 'inputs', 'agents.json'), `${JSON.stringify(drafterAgent(copy), null, 2)}\n`);

  const exemplars = orig.info.opened.filter((f) => f.startsWith('src/content/exhibits/')).map((f) => path.join(copy, f));
  const inCopy = (p) => path.join(copy, ...p.split('/'));
  const plan = shuffle(cells).map((c, i) => {
    const run = `r${String(i + 1).padStart(2, '0')}`;
    const out = path.join(copy, 'drafts', run, draftName);
    mkdirSync(path.dirname(out), { recursive: true });
    let p = original.replaceAll(orig.info.brief.from, briefTo);
    p = p.replace(/to the repo root as /g, 'to ');
    p = p.replace(new RegExp(`(?<![\\\\/\\w-])${draftName.replaceAll('.', '\\.')}`, 'g'), out);
    p = p.replace(/(?<![\\/\w.-])((?:src|scripts)\/[\w./-]+)/g, (m) => inCopy(m));
    p = p.replace(/(?<![\\/\w.-])CLAUDE\.md/g, path.join(copy, 'CLAUDE.md'));
    p = `${p.trimEnd()}\n\nFiles for this task: the brief above, ${path.join(copy, 'CLAUDE.md')}, and the 2 voice exemplars ${exemplars.join(' and ')}. Anything else you read must be under ${copy}. Write only ${out}.\n`;
    writeFileSync(path.join(dir, 'prompts', `${run}.md`), p);
    return { run, ...c, prompt: rel(path.join(dir, 'prompts', `${run}.md`)), out, draft: rel(path.join(dir, 'drafts', run, draftName)), session: null };
  }).sort((a, b) => a.run.localeCompare(b.run));

  const info = { name, exhibit, base, method: 'headless', like: like ?? null, copy, original: rel(orig.dir), draftName, exemplars, created: new Date().toISOString(), cells: plan, watch: prev?.watch ?? [] };
  writeFileSync(path.join(dir, 'plan.json'), `${JSON.stringify(info, null, 2)}\n`);
  console.log(`Copied ${base} to ${copy}. ${plan.length} cells:`);
  for (const c of plan) console.log(`  ${c.run}  ${c.model.padEnd(18)} ${c.effort}`);
  if (!info.watch.length) console.log('No watch list: add the brief\'s known traps to plan.json as [{label, pattern, flags}] before collecting.');
  console.log(`Next: node scripts/compare-drafts.mjs run ${name}`);
}

// ---- run ----

function runOne(plan, c, cap) {
  return new Promise((resolve) => {
    const started = Date.now();
    const args = [
      '-p', '--agents', path.join(comparisonDir(plan.name), 'inputs', 'agents.json'), '--agent', 'exhibit-drafter',
      '--model', c.model, '--effort', c.effort, '--session-id', c.session,
      '--restricted', '--strict-mcp-config', '--permission-mode', 'acceptEdits',
      '--max-budget-usd', String(cap), '--output-format', 'json',
    ];
    const child = spawn('claude', args, { cwd: plan.copy, stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', (e) => resolve({ error: e.message }));
    child.on('close', (code) => {
      let json = null;
      try {
        json = JSON.parse(out);
      } catch {}
      resolve({ code, json, err: err.trim(), seconds: Math.round((Date.now() - started) / 1000) });
    });
    child.stdin.end(readFileSync(path.join(ROOT, c.prompt), 'utf8'));
  });
}

async function run(name) {
  const dir = comparisonDir(name);
  const planFile = path.join(dir, 'plan.json');
  const plan = readJson(planFile);
  if (plan.method !== 'headless') throw new Error(`${name} was run by agents the main session launched; run has nothing to do`);
  const cap = Number(arg('--max-usd') ?? 20);
  const parallel = Number(arg('--parallel') ?? 4);
  const again = process.argv.includes('--again');
  const queue = plan.cells.filter((c) => again || !c.session || !existsSync(path.join(projectDir(plan.copy), `${c.session}.jsonl`)));
  mkdirSync(path.join(dir, 'runs'), { recursive: true });
  const save = () => writeFileSync(planFile, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`${queue.length} of ${plan.cells.length} cells to run, ${parallel} at a time, at most $${cap} each.`);
  await Promise.all(
    Array.from({ length: Math.min(parallel, queue.length) }, async () => {
      for (let c = queue.shift(); c; c = queue.shift()) {
        c.session = randomUUID();
        save();
        console.log(`${c.run}  ${c.model} ${c.effort}: started`);
        const r = await runOne(plan, c, cap);
        if (r.json) writeFileSync(path.join(dir, 'runs', `${c.run}.json`), `${JSON.stringify(r.json, null, 2)}\n`);
        const how = r.json
          ? `${r.json.subtype}, ${r.seconds}s, $${(r.json.total_cost_usd ?? 0).toFixed(3)} by Claude Code's estimate`
          : `failed (exit ${r.code ?? '?'}): ${(r.error ?? r.err).slice(0, 200)}`;
        console.log(`${c.run}  ${c.model} ${c.effort}: ${how}`);
      }
    }),
  );
  console.log(`Next: node scripts/compare-drafts.mjs collect ${name}`);
}

// ---- collect ----

// Same count as scripts/check-house-rules.mjs's bodyWordCount (not exported:
// importing that script runs it).
const bodyWords = (body) =>
  body
    .split(/\r?\n/)
    .filter((line) => !/^\s*#/.test(line))
    .join(' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;

function split(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text };
  try {
    return { data: yaml.load(m[1]), body: m[2] };
  } catch {
    return { data: null, body: m[2] };
  }
}

// The house rules, by running check-house-rules.mjs on a copy under an
// exhibits/ folder (so it is checked as an exhibit). The chart rule is left
// out: it reads today's layout, where the published exhibit is already wired.
function rules(text, draftName) {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'compare-'));
  mkdirSync(path.join(tmp, 'exhibits'));
  const f = path.join(tmp, 'exhibits', draftName);
  writeFileSync(f, text);
  let out = '';
  try {
    out = execFileSync('node', [path.join(ROOT, 'scripts', 'check-house-rules.mjs'), f], { encoding: 'utf8' });
  } catch (err) {
    out = err.stdout ?? '';
  }
  const lines = out.split(/\r?\n/);
  return {
    blocking: lines.filter((l) => l.trim().startsWith('BLOCKING')).map((l) => l.trim().replace(/^BLOCKING /, '')),
    checks: lines.filter((l) => l.trim().startsWith('CHECK')).map((l) => l.trim().replace(/^CHECK /, '')),
  };
}

const URL_RE = /https?:\/\/[^\s"'<>)\]]+/g;
const numbersIn = (t) => [...t.replace(URL_RE, ' ').matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0].replace(/,/g, '').replace(/\.$/, ''));
const linksIn = (t) => [...t.matchAll(URL_RE)].map((m) => m[0].replace(/[.,;:]+$/, ''));

// plan.json may list `watch` items, [{label, pattern, flags}]: a known trap in
// the brief to look for in every draft. Each match comes back with its context.
function watched(text, watch) {
  return watch.map((w) => {
    const m = text.match(new RegExp(w.pattern, w.flags ?? 'i'));
    return { label: w.label, found: m ? text.slice(Math.max(0, m.index - 50), m.index + m[0].length + 50).replace(/\s+/g, ' ').trim() : null };
  });
}

function measure(text, inputs, draftName, watch = []) {
  const { data, body } = split(text);
  const d = data ?? {};
  const known = new Set(numbersIn(inputs));
  return {
    watched: watched(text, watch),
    words: bodyWords(body),
    rules: rules(text, draftName),
    numbersNotInInputs: [...new Set(numbersIn(text))].filter((n) => !known.has(n)),
    linksNotInInputs: [...new Set(linksIn(text))].filter((u) => !inputs.includes(u)),
    choices: {
      title: d.title ?? null,
      teaser: d.teaser ?? null,
      category: d.category ?? null,
      tags: d.tags ?? [],
      status: d.status ?? null,
      ledgerTitle: d.ledgerTitle ?? null,
      ledger: (d.ledger ?? []).map((r) => ({ label: r.label, value: r.value, gap: r.gap === true })),
      ledgerNote: d.ledgerNote ?? null,
      verdict: (d.verdict ?? []).map((v) => ({ key: v.key, value: v.value })),
      verdictNote: d.verdictNote ?? null,
      chartNote: d.chartNote ?? null,
      sources: (d.sources ?? []).map((s) => ({ name: s.name ?? null, text: s.text ?? '', url: s.url ?? null })),
      disclosure: d.disclosure ?? null,
    },
    body,
  };
}

const trigrams = (body) => {
  const w = body.toLowerCase().replace(/[^a-z0-9£%'\s]/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 2 < w.length; i++) s.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
  return s;
};
const distance = (a, b) => {
  let shared = 0;
  for (const g of a) if (b.has(g)) shared += 1;
  const union = a.size + b.size - shared;
  return union ? Number((1 - shared / union).toFixed(3)) : 0;
};

// Every comparison run in the transcripts, by description; a relaunch wins.
function findRuns() {
  const found = new Map();
  for (const s of existsSync(PROJECT) ? readdirSync(PROJECT) : []) {
    const dir = path.join(PROJECT, s, 'subagents');
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.meta.json'))) {
      const meta = readJson(path.join(dir, f));
      if (!meta.description?.startsWith('Compare: ')) continue;
      const file = f.replace(/\.meta\.json$/, '.jsonl');
      if (!existsSync(path.join(dir, file))) continue;
      const r = readRun(path.join(PROJECT, s), file);
      const start = r.turns[0]?.timestamp ?? '';
      const prev = found.get(meta.description);
      if (!prev || start > prev.start) found.set(meta.description, { ...r, start, file: path.join(dir, file) });
    }
  }
  return found;
}

function usage(turns) {
  const byId = new Map();
  for (const x of turns) {
    const u = x.message.usage;
    if (!u) continue;
    const prev = byId.get(x.message.id);
    if (!prev || (u.output_tokens ?? 0) >= (prev.output_tokens ?? 0)) byId.set(x.message.id, u);
  }
  const t = { input: 0, cacheWrite: 0, cacheWrite1h: 0, cacheRead: 0, output: 0, responses: byId.size };
  for (const u of byId.values()) {
    t.input += u.input_tokens ?? 0;
    t.cacheWrite += u.cache_creation_input_tokens ?? 0;
    t.cacheWrite1h += u.cache_creation?.ephemeral_1h_input_tokens ?? 0;
    t.cacheRead += u.cache_read_input_tokens ?? 0;
    t.output += u.output_tokens ?? 0;
  }
  return t;
}

function cost(t, p) {
  const writes = (t.cacheWrite - t.cacheWrite1h) * p.in * 1.25 + t.cacheWrite1h * p.in * 2;
  return Number(((t.input * p.in + writes + t.cacheRead * p.cacheRead + t.output * p.out) / 1e6).toFixed(4));
}

// Every file a run opened or searched outside its own inputs.
function outside(r, allowed) {
  const ok = (p) => allowed.some((a) => path.resolve(p).toLowerCase().startsWith(a.toLowerCase()));
  const flags = [];
  for (const c of r.calls) {
    const i = c.input ?? {};
    if (c.name === 'Read' && !ok(i.file_path)) flags.push(`read ${rel(i.file_path)}`);
    if ((c.name === 'Glob' || c.name === 'Grep') && !ok(i.path ?? ROOT)) flags.push(`${c.name} ${i.pattern} in ${i.path ? rel(i.path) : 'the repo root'}`);
    if ((c.name === 'Write' || c.name === 'Edit') && !ok(i.file_path)) flags.push(`${c.name.toLowerCase()} ${rel(i.file_path)}`);
  }
  return flags;
}

function collect(name) {
  const dir = comparisonDir(name);
  const plan = readJson(path.join(dir, 'plan.json'));
  const headless = plan.method === 'headless';
  const inputs = readFileSync(path.join(dir, 'inputs', 'brief.md'), 'utf8') + readFileSync(path.join(dir, 'inputs', 'original-prompt.md'), 'utf8');
  const found = headless ? null : findRuns();
  const unpriced = new Set();
  const runs = [];
  for (const c of plan.cells) {
    let r = null;
    if (headless) {
      const file = c.session ? path.join(projectDir(plan.copy), `${c.session}.jsonl`) : null;
      if (file && existsSync(file)) r = readTranscript(file);
    } else r = found.get(c.description);
    if (!r || !r.turns.length) {
      runs.push({ ...c, status: 'not run yet' });
      continue;
    }
    // What ran can differ from what was asked: on 29 October 2026 Claude Code
    // sent both runs asked for Fable to claude-opus-5-5, while telling them
    // they were Fable 5.1. Results place each draft by what ran.
    const perTurn = r.turns.map((x) => ({ model: x.message.model, effort: x.effort ?? null }));
    const models = [...new Set(perTurn.map((t) => t.model))];
    const efforts = [...new Set(perTurn.map((t) => t.effort))];
    const held = perTurn.every((t) => t.model.includes(c.model) && t.effort === c.effort);
    const id = models.length === 1 ? models[0] : 'mixed';
    const family = models.length === 1 ? MODELS.find((f) => models[0].includes(f)) ?? models[0] : 'mixed';
    const effort = efforts.length === 1 ? efforts[0] : 'mixed';
    const runJsonFile = path.join(dir, 'runs', `${c.run}.json`);
    const runJson = existsSync(runJsonFile) ? readJson(runJsonFile) : null;
    const report = r.calls.find((x) => x.name === 'SubagentHandback')?.input?.message ?? runJson?.result ?? null;
    const tokens = usage(r.turns);
    if (id !== 'mixed' && !PRICES[id]) unpriced.add(id);
    const last = r.turns.at(-1).timestamp;
    const { drafts } = versions(r.calls);
    // A headless run wrote into the copy; its draft is kept with the comparison.
    const finalFile = path.join(ROOT, c.draft);
    if (headless && existsSync(c.out)) {
      mkdirSync(path.dirname(finalFile), { recursive: true });
      copyFileSync(c.out, finalFile);
    }
    const finalText = existsSync(finalFile) ? readFileSync(finalFile, 'utf8') : drafts.at(-1)?.content;
    if (!finalText) {
      runs.push({ ...c, status: 'no draft written', served: { models, efforts, held } });
      continue;
    }
    const firstText = drafts[0]?.content ?? finalText;
    const m = measure(finalText, inputs, plan.draftName, plan.watch);
    const allowed = headless ? [plan.copy] : [path.join(ROOT, plan.worktree), path.join(dir, 'inputs'), path.join(ROOT, path.dirname(c.draft))];
    runs.push({
      ...c,
      ran: { model: family, id, effort },
      status: 'done',
      ended: runJson?.subtype ?? null,
      report,
      // The prompt the run received is the prompt file, character for character.
      promptMatches: r.prompt.replace(/\r\n/g, '\n').trim() === readFileSync(path.join(ROOT, c.prompt), 'utf8').replace(/\r\n/g, '\n').trim(),
      served: { models, efforts, held, turns: perTurn.length, told: r.told, requested: r.requested },
      context: r.context,
      toolCalls: r.calls.filter((x) => x.name !== 'SubagentHandback').length,
      tokens,
      costUsd: PRICES[id] ? cost(tokens, PRICES[id]) : null,
      claudeCodeCostUsd: runJson?.total_cost_usd ?? null,
      seconds: Math.round((Date.parse(last) - Date.parse(r.turns[0].timestamp)) / 1000),
      versions: drafts.length,
      firstRules: rules(firstText, plan.draftName),
      outside: outside(r, allowed),
      ...m,
    });
  }

  // The original run, as a reference outside the grid: its first version,
  // written before the hook's feedback, like every grid draft.
  const origDir = path.join(ROOT, plan.original);
  const origInfo = readJson(path.join(origDir, 'run.json'));
  const original = {
    run: 'original',
    model: origInfo.models.join(', '),
    effort: origInfo.effort.join(', '),
    note: 'The drafter run that made the published exhibit: same brief, its own choice of the second exemplar, CLAUDE.md as of that day, and the hook checking each write. Its first version.',
    ...measure(readFileSync(path.join(origDir, 'draft-1.md'), 'utf8'), inputs, plan.draftName, plan.watch),
  };

  const done = runs.filter((r) => r.status === 'done');
  const all = [...done, original];
  const grams = all.map((r) => trigrams(r.body));
  const matrix = grams.map((a) => grams.map((b) => distance(a, b)));
  const results = { name, exhibit: plan.exhibit, base: plan.base, method: plan.method ?? 'agents', collected: new Date().toISOString(), prices: PRICES, runs, original, distance: { ids: all.map((r) => r.run), matrix } };
  writeFileSync(path.join(dir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);

  console.log(`run  asked               ran                     $est     sec  words  rules(first>last)  new numbers  new links  outside  watched`);
  for (const r of runs) {
    if (r.status !== 'done') {
      console.log(`${r.run}  ${`${r.model} ${r.effort}`.padEnd(18)}  ${r.status}`);
      continue;
    }
    console.log(
      `${r.run}  ${`${r.model} ${r.effort}`.padEnd(18)}  ${`${r.ran.id} ${r.ran.effort}`.padEnd(22)}  ${r.costUsd === null ? '   n/a' : r.costUsd.toFixed(3).padStart(6)}  ${String(r.seconds).padStart(4)}  ${String(r.words).padStart(5)}  ${String(r.firstRules.blocking.length).padStart(3)} > ${r.rules.blocking.length}           ${String(r.numbersNotInInputs.length).padStart(3)}          ${String(r.linksNotInInputs.length).padStart(3)}      ${String(r.outside.length).padStart(3)}  ${r.watched.map((w) => (w.found ? 'found' : '-')).join(' ')}`,
    );
  }
  for (const id of unpriced) console.log(`No price for ${id}: add it to PRICES in scripts/compare-drafts.mjs and collect again.`);
  console.log(`${done.length} of ${runs.length} runs collected into ${rel(path.join(dir, 'results.json'))}`);
}

// ---- history ----

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
const pct = (x) => (x === null ? 'n/a' : `${Math.round(x * 100)}%`);

// Every comparison of 1 exhibit, by the model that answered and the effort it
// ran at, so the same setting at 2 dates sits on adjacent rows.
function history(exhibit) {
  const root = path.join(ROOT, 'reports', 'comparisons');
  const all = readdirSync(root)
    .filter((d) => existsSync(path.join(root, d, 'results.json')))
    .map((d) => ({ name: d, plan: readJson(path.join(root, d, 'plan.json')), results: readJson(path.join(root, d, 'results.json')) }))
    .filter((x) => !exhibit || x.results.exhibit === exhibit)
    .sort((a, b) => a.plan.created.localeCompare(b.plan.created));
  if (!all.length) return console.log(`No collected comparisons${exhibit ? ` of ${exhibit}` : ''} in reports/comparisons/.`);

  const rows = [];
  for (const { name, plan, results } of all) {
    const ids = results.distance.ids;
    const toOriginal = (run) => 1 - results.distance.matrix[ids.indexOf(run)][ids.indexOf('original')];
    const cells = new Map();
    for (const r of results.runs.filter((x) => x.status === 'done')) {
      const id = r.ran.id ?? (r.served.models.length === 1 ? r.served.models[0] : 'mixed');
      const key = `${id} ${r.ran.effort}`;
      cells.set(key, [...(cells.get(key) ?? []), r]);
    }
    for (const [key, rs] of cells) {
      const [id, effort] = key.split(' ');
      const costs = rs.map((r) => r.costUsd).filter((x) => x !== null);
      rows.push({
        exhibit: results.exhibit,
        id,
        effort,
        when: `${plan.created.slice(0, 10)} ${name}${plan.method === 'headless' ? '' : '*'}`,
        n: rs.length,
        cost: costs.length ? `$${mean(costs).toFixed(2)}` : 'n/a',
        time: `${Math.round(mean(rs.map((r) => r.seconds)))}s`,
        tokens: Math.round(mean(rs.map((r) => r.tokens.output))).toLocaleString('en-US'),
        words: Math.round(mean(rs.map((r) => r.words))),
        over: rs.filter((r) => r.firstRules.blocking.length).length,
        failed: rs.filter((r) => r.rules.blocking.length).length,
        trap: rs.filter((r) => r.watched.some((w) => w.found)).length,
        outside: rs.reduce((a, r) => a + r.outside.length, 0),
        shared: pct(mean(rs.map((r) => toOriginal(r.run)))),
        claudeCode: [...new Set(rs.map((r) => r.context?.claudeCode).filter(Boolean))].join(', ') || '?',
      });
    }
  }
  const order = (e) => EFFORTS.indexOf(e);
  rows.sort((a, b) => a.exhibit.localeCompare(b.exhibit) || a.id.localeCompare(b.id) || order(a.effort) - order(b.effort) || a.when.localeCompare(b.when));
  console.log('| Exhibit | Model that answered | Effort | Run | Drafts | Cost | Time | Output tokens | Words | Broke a rule first | Broke a rule last | Repeated a known trap | Reads outside | Phrases shared with the original | Claude Code |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of rows) console.log(`| ${r.exhibit} | ${r.id} | ${r.effort} | ${r.when} | ${r.n} | ${r.cost} | ${r.time} | ${r.tokens} | ${r.words} | ${r.over} | ${r.failed} | ${r.trap} | ${r.outside} | ${r.shared} | ${r.claudeCode} |`);
  console.log('\nCost, time, tokens, words and phrases shared are means over the drafts in the row. The other counts are drafts (reads: total).');
  if (all.some((x) => x.plan.method !== 'headless')) console.log('* Run by agents the main session launched, so every run was also handed this folder\'s CLAUDE.md and Claude Code memory index of that day.');

  // A model that has served an agent run here since the newest comparison,
  // and that no comparison has run: the cue to run the benchmark again.
  const compared = new Set(all.flatMap((x) => x.results.runs.flatMap((r) => r.served?.models ?? [])));
  const newest = all.at(-1).plan.created.slice(0, 10);
  const logFile = path.join(ROOT, 'reports', 'model-log.jsonl');
  const seen = new Map();
  for (const line of existsSync(logFile) ? readFileSync(logFile, 'utf8').split(/\r?\n/).filter(Boolean) : []) {
    const row = JSON.parse(line);
    if (row.comparison) continue;
    for (const m of row.models ?? []) if (row.date >= newest && !compared.has(m)) seen.set(m, [...(seen.get(m) ?? []), row.date]);
  }
  if (!seen.size) console.log(`\nEvery model that has served an agent run since ${newest} has been compared.`);
  for (const [m, dates] of seen) console.log(`\nNot compared yet: ${m}, which served ${dates.length} agent run${dates.length === 1 ? '' : 's'} here from ${dates.sort()[0]}. Run /benchmark.`);
}

const [cmd, name] = process.argv.slice(2);
if (cmd === 'setup' && name) setup(name);
else if (cmd === 'run' && name) await run(name);
else if (cmd === 'collect' && name) collect(name);
else if (cmd === 'history') history(name);
else console.log('usage: node scripts/compare-drafts.mjs setup <name> (--like <comparison> | --exhibit NNN --base <commit>) [--cells model:effort,...] | run <name> [--parallel 4] [--max-usd 20] [--again] | collect <name> | history [NNN]');
