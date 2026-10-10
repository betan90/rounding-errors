#!/usr/bin/env node
// Fetches every source URL in the exhibits and notes and reports which still
// resolve. CLAUDE.md only allows a url on a source you have an actual link
// for; this checks the link is still actual.
//
//   node scripts/check-links.mjs            every exhibit and note
//   node scripts/check-links.mjs <files>    just these (the committer runs it
//                                           on the content files it commits)
//
// Results:
//   ok        2xx, same page
//   moved     redirected to a different host or path (WARNING: the source may
//             have been rebranded or the page renamed; update the url once
//             you've confirmed the destination is the same document)
//   refused   401/403/406/429/503 from a server that answers the site's
//             homepage the same way: a bot wall (Cloudflare, Wordfence) or a
//             rate limit, not a dead page (WARNING: open it in a browser)
//   suspect   refused, but the homepage loads: the wall may be page-specific,
//             or the page may be gone behind it (WARNING: check it first)
//   broken    404/410, any other 4xx/5xx, unknown host, or no answer after a
//             retry (FAILURE, exit 1)
//
// Not part of the build on purpose: a slow or flaky publisher's server should
// not be able to block a deploy. It runs before publishing instead.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import yaml from 'js-yaml';

// Node gives each address 250ms to connect before trying the next, then
// fails with ETIMEDOUT. ec.europa.eu takes ~400ms to accept a connection.
net.setDefaultAutoSelectFamilyAttemptTimeout(3000);

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const TIMEOUT_MS = 45000; // Eurostat's PDFs take 20s+ to start
const CONCURRENCY = 6;
const REFUSALS = new Set([401, 403, 406, 429, 503]);
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  Accept: 'text/html,application/pdf,*/*',
  'Accept-Language': 'en-US,en;q=0.9',
};

function contentFiles() {
  return ['exhibits', 'notes'].flatMap((dir) => {
    const d = path.join(ROOT, 'src', 'content', dir);
    return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.md')).map((f) => path.join(d, f)) : [];
  });
}

function linksIn(file) {
  const text = readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const links = [];
  if (m) {
    const data = yaml.load(m[1]) ?? {};
    for (const s of data.sources ?? []) if (s.url) links.push({ url: s.url, where: `source "${s.name ?? s.text.slice(0, 40)}"` });
    for (const [, url] of m[2].matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) links.push({ url, where: 'body link' });
  }
  return links.map((l) => ({ ...l, file: path.basename(file) }));
}

async function probe(url) {
  // GET, not HEAD: plenty of servers answer HEAD with 403/405 and GET with 200.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal, headers: HEADERS });
    res.body?.cancel().catch(() => {});
    return { status: res.status, finalUrl: res.url };
  } catch (e) {
    return { status: 0, error: e.name === 'AbortError' ? `timeout after ${TIMEOUT_MS / 1000}s` : (e.cause?.code ?? e.message) };
  } finally {
    clearTimeout(timer);
  }
}

async function check(url) {
  let r = await probe(url);
  // One retry, after a pause, for the transient cases: a timeout or a dropped
  // connection (ec.europa.eu does this to a different PDF on each run).
  if (r.status === 0 && !/ENOTFOUND|EAI_AGAIN/.test(r.error)) {
    await new Promise((ok) => setTimeout(ok, 5000));
    r = await probe(url);
  }
  const { status, finalUrl, error } = r;
  if (status >= 200 && status < 300) {
    const strip = (u) => u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/$/, '');
    return strip(new URL(url)) === strip(new URL(finalUrl)) ? ['ok', ''] : ['moved', `-> ${finalUrl}`];
  }
  // 429 is "slow down", never "gone"; the homepage test says nothing about it.
  if (status === 429) return ['refused', 'HTTP 429, rate-limited'];
  if (REFUSALS.has(status)) {
    const home = await probe(new URL(url).origin + '/');
    return home.status >= 200 && home.status < 300
      ? ['suspect', `HTTP ${status}, but the homepage answers ${home.status}`]
      : ['refused', `HTTP ${status}; homepage ${home.status || home.error} too, so a site-wide wall`];
  }
  return ['broken', error ?? `HTTP ${status}`];
}

const files = process.argv.length > 2 ? process.argv.slice(2).map((f) => path.resolve(f)) : contentFiles();
const links = files.filter((f) => f.endsWith('.md') && existsSync(f)).flatMap(linksIn);

// One request per distinct URL, however many exhibits cite it. Parallel
// across hosts, one at a time within a host: ec.europa.eu drops concurrent
// connections from the same client.
const byHost = new Map();
for (const url of new Set(links.map((l) => l.url))) {
  const h = new URL(url).hostname;
  byHost.set(h, [...(byHost.get(h) ?? []), url]);
}
const queues = [...byHost.values()];
const results = new Map();
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < queues.length) {
    for (const url of queues[next++]) results.set(url, await check(url));
  }
}));

const counts = { ok: 0, moved: 0, refused: 0, suspect: 0, broken: 0 };
for (const l of links) {
  const [kind, detail] = results.get(l.url);
  counts[kind]++;
  if (kind !== 'ok') console.log(`${kind.toUpperCase().padEnd(7)} ${l.file}  ${l.where}\n        ${l.url}${detail ? `\n        ${detail}` : ''}`);
}
console.log(`\n${links.length} links in ${files.length} files: ${Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(', ')}`);
process.exitCode = counts.broken ? 1 : 0;
