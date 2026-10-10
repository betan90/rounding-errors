#!/usr/bin/env node
// Mechanical checks for the CLAUDE.md voice rules that a script can judge:
//   1. no em dashes, anywhere in the file (BLOCKING)
//   2. exhibit body 500 words max across its prose sections (BLOCKING)
//   3. counts written as numerals, not words (WARNING: the rule has exceptions
//      a regex can't judge, like verbatim source titles, so a human decides)
//
// Three ways to run it:
//   node scripts/check-house-rules.mjs src/content/exhibits/*.md   (manual audit)
//   node scripts/check-house-rules.mjs --all   (every exhibit and note; runs as
//     npm's prebuild, so a file that reached src/content without Write or Edit,
//     e.g. by cp, still can't build)
//   as a Claude Code PostToolUse hook: reads the hook JSON on stdin, checks the
//   one file just written, and reports back to Claude if a rule broke.
//
// Exit codes: 0 clean or warnings only, 1 blocking failure (CLI mode).

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const CONTENT = /[\\/]src[\\/]content[\\/](exhibits|notes)[\\/][^\\/]+\.md$/;
const MAX_BODY_WORDS = 500;

// Cardinal number words. "one" is left out on purpose: "this one", "one per
// exhibit" and "one origin" are all allowed by CLAUDE.md, and a regex can't
// tell them from a count.
const NUMBER_WORDS = [
  'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand',
];
const NUMBER_RE = new RegExp(`\\b(${NUMBER_WORDS.join('|')})\\b`, 'gi');

// Quoted spans are verbatim source text, which CLAUDE.md says is never
// restyled. Strip them before looking for number words.
// Also strip the shapes that aren't counts: fractions ("three quarters")
// and vague magnitudes ("several hundred million").
function stripQuotes(s) {
  return s
    .replace(/\b\w+ (quarters|thirds|halves|fifths)\b/gi, ' ')
    .replace(/\b(several|a few|many) (hundred|thousand)\b/gi, ' ')
    .replace(/"[^"]*"/g, ' ')
    .replace(/“[^”]*”/g, ' ')
    .replace(/'[^']*'(?!\w)/g, ' ');
}

function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: text };
}

// Every string value in the frontmatter, with the key path it came from.
function frontmatterStrings(fm) {
  const out = [];
  let data;
  try { data = yaml.load(fm) ?? {}; } catch { return out; }
  (function walk(v, path) {
    if (typeof v === 'string') out.push({ path, text: v });
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  })(data, '');
  return out;
}

function bodyWordCount(body) {
  return body
    .split(/\r?\n/)
    .filter((line) => !/^\s*#/.test(line)) // headings are not prose
    .join(' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

export function checkFile(file) {
  const text = readFileSync(file, 'utf8');
  const blocking = [];
  const warnings = [];

  text.split(/\r?\n/).forEach((line, i) => {
    if (line.includes('—')) blocking.push(`line ${i + 1}: em dash: ${line.trim().slice(0, 100)}`);
  });

  const { fm, body } = splitFrontmatter(text);
  const isExhibit = /[\\/]exhibits[\\/]/.test(file);

  if (isExhibit) {
    const words = bodyWordCount(body);
    if (words > MAX_BODY_WORDS) blocking.push(`body is ${words} words; the limit is ${MAX_BODY_WORDS}`);
  }

  const spots = [
    ...frontmatterStrings(fm).filter(({ path }) => !/url$/i.test(path)).map(({ path, text: t }) => ({ where: `frontmatter ${path}`, text: t })),
    ...body.split(/\r?\n/).map((line, i) => ({ where: `body line ${i + 1}`, text: line })),
  ];
  for (const { where, text: t } of spots) {
    const hits = stripQuotes(t).match(NUMBER_RE);
    if (hits) warnings.push(`${where}: spelled-out number "${[...new Set(hits)].join('", "')}" (fine only if it is inside a verbatim title or quote)`);
  }

  return { file, blocking, warnings };
}

function format({ file, blocking, warnings }) {
  const lines = [];
  if (blocking.length) lines.push(`House-rule violations in ${file} (CLAUDE.md):`, ...blocking.map((b) => `  BLOCKING ${b}`));
  if (warnings.length) lines.push(`${blocking.length ? '' : `House-rule warnings in ${file}:\n`}${warnings.map((w) => `  CHECK ${w}`).join('\n')}`);
  return lines.join('\n');
}

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

let args = process.argv.slice(2);
if (args[0] === '--all') {
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
  args = ['exhibits', 'notes'].flatMap((dir) => {
    const d = path.join(root, 'src', 'content', dir);
    return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.md')).map((f) => path.join(d, f)) : [];
  });
}

if (args.length) {
  // CLI mode: audit the files given.
  let failed = false;
  for (const f of args) {
    const r = checkFile(f);
    if (r.blocking.length) failed = true;
    const msg = format(r);
    console.log(msg || `ok  ${f}`);
  }
  process.exitCode = failed ? 1 : 0;
} else {
  // Hook mode: one file, from the PostToolUse payload on stdin. No
  // process.exit() here: on Windows it can cut off stdout before the pipe
  // drains, and Claude would see nothing.
  const input = JSON.parse((await readStdin()) || '{}');
  const file = input.tool_input?.file_path ?? input.tool_response?.filePath ?? '';
  const r = CONTENT.test(file) && existsSync(file) ? checkFile(file) : null;
  const msg = r ? format(r) : '';

  if (msg) {
    // decision "block" on PostToolUse does not undo the write; it hands the
    // reason to Claude as feedback it must deal with before moving on.
    const out = r.blocking.length
      ? { decision: 'block', reason: msg }
      : { hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: msg } };
    process.stdout.write(JSON.stringify(out));
  }
}
