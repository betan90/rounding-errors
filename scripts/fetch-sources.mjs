#!/usr/bin/env node
// Fetches the full text of every source an exhibit links to, so the second
// opinion can judge a claim against the whole source rather than the 1
// passage the fact-checker picked.
//
// For each `sources[].url` in the exhibit's frontmatter it writes
//   reports/NNN-slug/sources/NN.txt        the text (gitignored: full articles
//                                          are other people's copyright)
//   reports/NNN-slug/sources/manifest.json what was fetched, when, how big,
//                                          and its sha256 (tracked)
// PDFs go through pdftotext; HTML has scripts, styles and tags stripped.
//
// A source that can't be fetched (a bot wall, a dead link) is recorded as
// failed. If a text file for it is already there, placed by hand from a copy
// a human fetched in a browser, it is kept and recorded as "manual".
//
// Usage: node scripts/fetch-sources.mjs 017        (or 017-illegal-gdp, or --all)

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXHIBITS = path.join(ROOT, 'src', 'content', 'exhibits');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/pdf,application/json;q=0.9,*/*;q=0.8',
};

function exhibitFiles(arg) {
  const all = readdirSync(EXHIBITS).filter((f) => /^\d{3}-.*\.md$/.test(f)).sort();
  if (arg === '--all') return all;
  const hit = all.filter((f) => f.startsWith(arg));
  if (!hit.length) throw new Error(`no exhibit matches '${arg}'`);
  return hit;
}

function frontmatter(file) {
  const m = readFileSync(path.join(EXHIBITS, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? yaml.load(m[1]) ?? {} : {};
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '-', mdash: '-', rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', hellip: '...', pound: '£', euro: '€' };

function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg|nav|footer|header)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(p|div|li|h\d|tr|td|th)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

function pdfToText(buf) {
  const dir = mkdtempSync(path.join(tmpdir(), 'fetch-sources-'));
  try {
    const pdf = path.join(dir, 'in.pdf');
    const txt = path.join(dir, 'out.txt');
    writeFileSync(pdf, buf);
    execFileSync('pdftotext', ['-enc', 'UTF-8', pdf, txt], { stdio: 'ignore' });
    return readFileSync(txt, 'utf8');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function toText(buf, type) {
  if (type.includes('pdf') || buf.subarray(0, 5).toString() === '%PDF-') return { kind: 'pdf', text: pdfToText(buf) };
  const body = buf.toString('utf8');
  if (type.includes('html') || /^\s*</.test(body)) return { kind: 'html', text: htmlToText(body) };
  return { kind: 'text', text: body };
}

async function viaFetch(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return toText(Buffer.from(await res.arrayBuffer()), res.headers.get('content-type') ?? '');
}

// Some servers (PubMed Central, Eurostat) answer Node's fetch with a
// challenge page or a dropped connection but serve curl normally.
function viaCurl(url) {
  const buf = execFileSync('curl', ['-sSL', '--fail', '--max-time', '90', '-A', HEADERS['User-Agent'], url], { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  return toText(buf, '');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  // The Wayback Machine rate-limits bursts.
  if (url.includes('web.archive.org')) await sleep(5000);
  let first;
  try {
    const got = await viaFetch(url);
    if (got.text.trim().length >= 200) return got;
    first = new Error(`only ${got.text.trim().length} characters of text`);
  } catch (err) {
    first = err;
  }
  try {
    const got = viaCurl(url);
    if (got.text.trim().length >= 200) return got;
  } catch {}
  throw first;
}

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

async function run(file) {
  const slug = file.replace(/\.md$/, '');
  const data = frontmatter(file);
  const dir = path.join(ROOT, 'reports', slug, 'sources');
  mkdirSync(dir, { recursive: true });
  const manifestPath = path.join(dir, 'manifest.json');
  const previous = new Map(existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')).sources.map((e) => [e.id, e]) : []);
  const entries = [];
  const sources = data.sources ?? [];
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    const id = String(i + 1).padStart(2, '0');
    const out = path.join(dir, `${id}.txt`);
    const entry = { id, name: s.name ?? null, text: s.text ?? '', url: s.url ?? null };
    if (!s.url) {
      entries.push({ ...entry, status: 'no-url' });
      continue;
    }
    try {
      let { kind, text } = await fetchText(s.url);
      // An ONS time-series page shows no values; its own CSV download does.
      const series = s.url.match(/^https:\/\/www\.ons\.gov\.uk(\/[^?#]*\/timeseries\/[^?#]+)$/);
      if (series) {
        const csv = await fetchText(`https://www.ons.gov.uk/generator?format=csv&uri=${series[1]}`);
        text += `\n\n=== DATA: this series' CSV download from the same page ===\n${csv.text}`;
      }
      // A paywall page is not the source.
      if (text.length < 5000 && /subscribe to read|sign in to continue|to continue reading/i.test(text)) throw new Error('paywall page');
      writeFileSync(out, text);
      entries.push({ ...entry, status: 'fetched', kind, chars: text.length, sha256: sha256(text) });
    } catch (err) {
      if (err.message === 'paywall page') rmSync(out, { force: true });
      if (existsSync(out)) {
        // Fetched on an earlier run ("kept"), or placed by hand from a copy a
        // human opened in a browser ("manual").
        const text = readFileSync(out, 'utf8');
        const was = previous.get(id);
        const status = was && (was.status === 'fetched' || was.status === 'kept') && was.sha256 === sha256(text) ? 'kept' : 'manual';
        entries.push({ ...entry, status, error: err.message, chars: text.length, sha256: sha256(text) });
      } else {
        entries.push({ ...entry, status: 'failed', error: err.message });
      }
    }
  }
  const manifest = { exhibit: data.exhibit ?? slug.slice(0, 3), fetchedAt: new Date().toISOString(), sources: entries };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  const count = (st) => entries.filter((e) => e.status === st).length;
  console.log(`${slug}: ${count('fetched')} fetched, ${count('kept')} kept, ${count('manual')} manual, ${count('failed')} failed, ${count('no-url')} without a url`);
  for (const e of entries.filter((x) => x.status === 'failed')) console.log(`  failed ${e.id} ${e.url}: ${e.error}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error('usage: node scripts/fetch-sources.mjs <NNN | NNN-slug | --all>');
  process.exitCode = 1;
} else {
  for (const f of exhibitFiles(arg)) await run(f);
}
