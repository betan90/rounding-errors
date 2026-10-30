#!/usr/bin/env node
// Drafts 1 exhibit from 1 brief at several model and effort settings, then measures what changed.
//
// The question: with the brief held fixed, what does the model change, and
// what does the effort level change? 3 steps:
//   1. node scripts/compare-drafts.mjs setup <name> --exhibit 017 --base 642dcbe --cells opus:low,opus:medium,...
//      Checks the repo out as it was at --base into .worktrees/<name> (before
//      the exhibit existed, so no run can read the published version or its
//      category line in CLAUDE.md), copies the original brief and prompt from
//      reports/NNN-slug/drafting/, and writes 1 prompt per cell to
//      reports/comparisons/<name>/prompts/. The prompt is the original with
//      only its paths changed, the 2 voice exemplars the original drafter read
//      named outright, and 1 line saying which files are in scope. Cells get
//      run ids in shuffled order (r01, r02...), so no prompt or file name says
//      which setting made it. A cell listed twice is a repeat: the gap between
//      2 runs of 1 setting is the noise every other gap is measured against.
//   2. The main session launches 1 exhibit-drafter per cell, naming the cell's
//      model and effort at launch, with the description "Compare: <name> <run>"
//      (log-models.mjs and archive-drafts.mjs recognise that prefix). A script
//      can't launch an agent; plan.json says what to launch.
//   3. node scripts/compare-drafts.mjs collect <name>
//      Reads each run's transcript: the model and effort every turn actually
//      ran at, tokens, time, and every file it opened (a read outside its
//      inputs is flagged). Measures each draft: house rules on its first and
//      last version, body words, numbers and links that aren't in its inputs,
//      its choices (title, category, ledger, verdict), and how far its prose
//      is from every other draft. Writes results.json next to the drafts.

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { readRun, versions } from './archive-drafts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT = path.join(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), '.claude'), 'projects', ROOT.replace(/[^A-Za-z0-9]/g, '-'));
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'];
const MODELS = ['fable', 'opus', 'sonnet', 'haiku'];

// $ per million tokens, Anthropic API list prices as of 6 October 2026. Cache
// writes bill at 1.25x input. Haiku 5.5's cache-read price isn't listed, so it
// takes the usual 0.1x input. An estimate: it prices tokens, not a bill.
const PRICES = {
  fable: { in: 10, out: 50, cacheRead: 0.25 },
  opus: { in: 4, out: 20, cacheRead: 0.2 },
  sonnet: { in: 2, out: 10, cacheRead: 0.2 },
  haiku: { in: 0.1, out: 0.5, cacheRead: 0.01 },
};

const rel = (p) => path.relative(ROOT, p).replaceAll('\\', '/');
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

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
    const info = JSON.parse(readFileSync(path.join(dir, d, 'run.json'), 'utf8'));
    if (info.brief && info.drafts > 0) return { folder, dir: path.join(dir, d), info };
  }
  throw new Error(`no archived drafting run with a brief for ${exhibit}; run scripts/archive-drafts.mjs --backfill`);
}

function setup(name) {
  const exhibit = arg('--exhibit');
  const base = arg('--base');
  const cells = (arg('--cells') ?? '').split(',').filter(Boolean).map((c) => {
    const [model, effort] = c.split(':');
    if (!MODELS.includes(model) || !EFFORTS.includes(effort)) throw new Error(`bad cell "${c}": need model:effort, model one of ${MODELS.join('/')}, effort one of ${EFFORTS.join('/')}`);
    return { model, effort };
  });
  if (!exhibit || !base || !cells.length) throw new Error('usage: setup <name> --exhibit NNN --base <commit> --cells model:effort,...');

  const orig = originalRun(exhibit);
  const draftName = `exhibit-${orig.folder}.md`;
  const published = `src/content/exhibits/${orig.folder}.md`;
  try {
    git('cat-file', '-e', `${base}:${published}`);
    throw new Error(`${base} already contains ${published}; pick a commit from before it shipped`);
  } catch (err) {
    if (err.message.includes('already contains')) throw err;
  }

  const wt = path.join(ROOT, '.worktrees', name);
  if (!existsSync(wt)) git('worktree', 'add', '--detach', wt, base);
  const dir = path.join(ROOT, 'reports', 'comparisons', name);
  for (const d of ['inputs', 'prompts', 'drafts']) mkdirSync(path.join(dir, d), { recursive: true });
  const briefTo = path.join(dir, 'inputs', 'brief.md');
  writeFileSync(briefTo, readFileSync(path.join(orig.dir, 'brief.md'), 'utf8'));
  const original = readFileSync(path.join(orig.dir, 'prompt.md'), 'utf8');
  writeFileSync(path.join(dir, 'inputs', 'original-prompt.md'), original);

  const exemplars = orig.info.opened.filter((f) => f.startsWith('src/content/exhibits/')).map((f) => path.join(wt, f));
  const toWt = (p) => path.join(wt, ...p.split('/'));
  const plan = shuffle(cells).map((c, i) => {
    const run = `r${String(i + 1).padStart(2, '0')}`;
    const out = path.join(dir, 'drafts', run, draftName);
    mkdirSync(path.dirname(out), { recursive: true });
    let p = original.replaceAll(orig.info.brief.from, briefTo);
    p = p.replace(/to the repo root as /g, 'to ');
    p = p.replace(new RegExp(`(?<![\\\\/\\w-])${draftName.replaceAll('.', '\\.')}`, 'g'), out);
    p = p.replace(/(?<![\\/\w.-])((?:src|scripts)\/[\w./-]+)/g, (m) => toWt(m));
    p = p.replace(/(?<![\\/\w.-])CLAUDE\.md/g, path.join(wt, 'CLAUDE.md'));
    p = `${p.trimEnd()}\n\nFiles for this task: the brief above, ${path.join(wt, 'CLAUDE.md')}, and the 2 voice exemplars ${exemplars.join(' and ')}. Anything else you read must be under ${wt}. Write only ${out}.\n`;
    writeFileSync(path.join(dir, 'prompts', `${run}.md`), p);
    return { run, ...c, prompt: rel(path.join(dir, 'prompts', `${run}.md`)), draft: rel(out), description: `Compare: ${name} ${run}` };
  }).sort((a, b) => a.run.localeCompare(b.run));

  const info = { name, exhibit, base, worktree: rel(wt), original: rel(orig.dir), draftName, exemplars: exemplars.map(rel), created: new Date().toISOString(), cells: plan };
  writeFileSync(path.join(dir, 'plan.json'), `${JSON.stringify(info, null, 2)}\n`);
  console.log(`Worktree ${rel(wt)} at ${base}. Launch 1 exhibit-drafter per cell (model and effort named at launch):`);
  for (const c of plan) console.log(`  ${c.run}  ${c.model.padEnd(6)} ${c.effort.padEnd(6)}  description "${c.description}"  prompt ${c.prompt}`);
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
      const meta = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
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
  const t = { input: 0, cacheWrite: 0, cacheRead: 0, output: 0, responses: byId.size };
  for (const u of byId.values()) {
    t.input += u.input_tokens ?? 0;
    t.cacheWrite += u.cache_creation_input_tokens ?? 0;
    t.cacheRead += u.cache_read_input_tokens ?? 0;
    t.output += u.output_tokens ?? 0;
  }
  return t;
}

function cost(t, model) {
  const p = PRICES[model];
  return Number(((t.input * p.in + t.cacheWrite * p.in * 1.25 + t.cacheRead * p.cacheRead + t.output * p.out) / 1e6).toFixed(4));
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
  const dir = path.join(ROOT, 'reports', 'comparisons', name);
  const plan = JSON.parse(readFileSync(path.join(dir, 'plan.json'), 'utf8'));
  const wt = path.join(ROOT, plan.worktree);
  const inputs = readFileSync(path.join(dir, 'inputs', 'brief.md'), 'utf8') + readFileSync(path.join(dir, 'inputs', 'original-prompt.md'), 'utf8');
  const found = findRuns();
  const runs = [];
  for (const c of plan.cells) {
    const r = found.get(c.description);
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
    const family = models.length === 1 ? MODELS.find((f) => models[0].includes(f)) ?? models[0] : 'mixed';
    const effort = efforts.length === 1 ? efforts[0] : 'mixed';
    const report = r.calls.find((x) => x.name === 'SubagentHandback')?.input?.message ?? null;
    const tokens = usage(r.turns);
    const last = r.turns.at(-1).timestamp;
    const { drafts } = versions(r.calls);
    const finalFile = path.join(ROOT, c.draft);
    const finalText = existsSync(finalFile) ? readFileSync(finalFile, 'utf8') : drafts.at(-1)?.content;
    if (!finalText) {
      runs.push({ ...c, status: 'no draft written', served: { models, efforts, held } });
      continue;
    }
    const firstText = drafts[0]?.content ?? finalText;
    const m = measure(finalText, inputs, plan.draftName, plan.watch);
    runs.push({
      ...c,
      ran: { model: family, effort },
      status: 'done',
      report,
      // The prompt the run received is the prompt file, character for character.
      promptMatches: r.prompt.replace(/\r\n/g, '\n').trim() === readFileSync(path.join(ROOT, c.prompt), 'utf8').replace(/\r\n/g, '\n').trim(),
      served: { models, efforts, held, turns: perTurn.length, told: r.told, requested: r.requested },
      toolCalls: r.calls.filter((x) => x.name !== 'SubagentHandback').length,
      tokens,
      costUsd: PRICES[family] ? cost(tokens, family) : null,
      seconds: Math.round((Date.parse(last) - Date.parse(r.turns[0].timestamp)) / 1000),
      versions: drafts.length,
      firstRules: rules(firstText, plan.draftName),
      outside: outside(r, [wt, path.join(dir, 'inputs'), path.join(ROOT, path.dirname(c.draft))]),
      ...m,
    });
  }

  // The original run, as a reference outside the grid: its first version,
  // written before the hook's feedback, like every grid draft.
  const origDir = path.join(ROOT, plan.original);
  const origInfo = JSON.parse(readFileSync(path.join(origDir, 'run.json'), 'utf8'));
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
  const results = { name, exhibit: plan.exhibit, base: plan.base, collected: new Date().toISOString(), prices: PRICES, runs, original, distance: { ids: all.map((r) => r.run), matrix } };
  writeFileSync(path.join(dir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);

  console.log(`run  asked          ran            $est     sec  words  rules(first>last)  new numbers  new links  outside  watched`);
  for (const r of runs) {
    if (r.status !== 'done') {
      console.log(`${r.run}  ${`${r.model} ${r.effort}`.padEnd(13)}  ${r.status}`);
      continue;
    }
    console.log(
      `${r.run}  ${`${r.model} ${r.effort}`.padEnd(13)}  ${`${r.ran.model} ${r.ran.effort}`.padEnd(13)}  ${r.costUsd.toFixed(3).padStart(6)}  ${String(r.seconds).padStart(4)}  ${String(r.words).padStart(5)}  ${String(r.firstRules.blocking.length).padStart(3)} > ${r.rules.blocking.length}           ${String(r.numbersNotInInputs.length).padStart(3)}          ${String(r.linksNotInInputs.length).padStart(3)}      ${String(r.outside.length).padStart(3)}  ${r.watched.map((w) => (w.found ? 'found' : '-')).join(' ')}`,
    );
  }
  console.log(`${done.length} of ${runs.length} runs collected into ${rel(path.join(dir, 'results.json'))}`);
}

const [cmd, name] = process.argv.slice(2);
if (cmd === 'setup' && name) setup(name);
else if (cmd === 'collect' && name) collect(name);
else console.log('usage: node scripts/compare-drafts.mjs setup <name> --exhibit NNN --base <commit> --cells model:effort,... | collect <name>');
