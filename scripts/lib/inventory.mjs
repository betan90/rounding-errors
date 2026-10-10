// Discovers the site's tooling from the files themselves, so /methodology
// can't describe a setup that no longer exists. Used twice:
//   src/pages/methodology.astro   renders it at build time
//   scripts/check-methodology.mjs fails the build if something discovered here
//                                 has no write-up in src/data/methodology.mjs
//
// Every item gets an id of the form "<kind>:<name>". Adding a kind of tooling
// the site doesn't use yet (an MCP server, a skill, a slash command, a plugin)
// needs no change here: those locations are already scanned.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import yaml from 'js-yaml';

const read = (root, rel) => readFileSync(path.join(root, rel), 'utf8');
const exists = (root, rel) => existsSync(path.join(root, rel));
const list = (root, rel) => (exists(root, rel) ? readdirSync(path.join(root, rel)) : []);

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? yaml.load(m[1]) ?? {} : {};
}

// The first comment line under the shebang: each script states its own job.
function headerLine(text) {
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith('#!')) continue;
    const m = line.match(/^\s*(?:\/\/|#)\s?(.*)$/);
    if (m && m[1].trim()) return m[1].trim();
    if (line.trim() && !m) break;
  }
  return '';
}

function agents(root) {
  const dir = '.claude/agents';
  return list(root, dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = frontmatter(read(root, `${dir}/${f}`));
      const name = fm.name ?? f.replace(/\.md$/, '');
      return {
        id: `agent:${name}`,
        kind: 'agent',
        name,
        file: `${dir}/${f}`,
        model: fm.model ?? 'inherit',
        tools: typeof fm.tools === 'string' ? fm.tools.split(',').map((t) => t.trim()) : fm.tools ?? ['all'],
        summary: fm.description ?? '',
      };
    });
}

function skills(root) {
  const dir = '.claude/skills';
  return list(root, dir)
    .filter((d) => exists(root, `${dir}/${d}/SKILL.md`))
    .map((d) => {
      const fm = frontmatter(read(root, `${dir}/${d}/SKILL.md`));
      return { id: `skill:${fm.name ?? d}`, kind: 'skill', name: fm.name ?? d, file: `${dir}/${d}/SKILL.md`, summary: fm.description ?? '' };
    });
}

function commands(root) {
  const dir = '.claude/commands';
  return list(root, dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const name = f.replace(/\.md$/, '');
      const fm = frontmatter(read(root, `${dir}/${f}`));
      return { id: `command:${name}`, kind: 'command', name: `/${name}`, file: `${dir}/${f}`, summary: fm.description ?? '' };
    });
}

// Hooks and plugins from the tracked project settings. settings.local.json is
// per-machine and untracked, so it is deliberately not read.
function settings(root) {
  const rel = '.claude/settings.json';
  if (!exists(root, rel)) return [];
  const s = JSON.parse(read(root, rel));
  const out = [];
  for (const [event, groups] of Object.entries(s.hooks ?? {})) {
    for (const g of groups) {
      for (const h of g.hooks ?? []) {
        const cmd = h.command ?? h.prompt ?? h.url ?? '';
        const script = cmd.match(/scripts\/([\w.-]+)/)?.[1];
        const name = `${event}${g.matcher ? ` ${g.matcher}` : ''} → ${script ?? cmd}`;
        out.push({
          id: `hook:${event}:${script ?? cmd}`,
          kind: 'hook',
          name,
          file: rel,
          event,
          matcher: g.matcher ?? '(every call)',
          command: cmd,
        });
      }
    }
  }
  for (const p of Object.keys(s.enabledPlugins ?? {})) {
    out.push({ id: `plugin:${p}`, kind: 'plugin', name: p, file: rel });
  }
  return out;
}

function mcpServers(root) {
  if (!exists(root, '.mcp.json')) return [];
  const s = JSON.parse(read(root, '.mcp.json'));
  return Object.keys(s.mcpServers ?? {}).map((n) => ({ id: `mcp:${n}`, kind: 'mcp', name: n, file: '.mcp.json' }));
}

function scripts(root) {
  const dir = 'scripts';
  const pkg = JSON.parse(read(root, 'package.json'));
  const npm = Object.entries(pkg.scripts ?? {});
  return list(root, dir)
    .filter((f) => /\.(mjs|js|sh|py)$/.test(f) && statSync(path.join(root, dir, f)).isFile())
    .map((f) => ({
      id: `script:${f}`,
      kind: 'script',
      name: f,
      file: `${dir}/${f}`,
      summary: headerLine(read(root, `${dir}/${f}`)),
      npm: npm.filter(([, cmd]) => cmd.includes(`scripts/${f}`)).map(([k]) => k),
    }));
}

function workflows(root) {
  const dir = '.github/workflows';
  return list(root, dir)
    .filter((f) => /\.ya?ml$/.test(f))
    .map((f) => {
      const wf = yaml.load(read(root, `${dir}/${f}`)) ?? {};
      const on = wf.on ?? wf[true] ?? {};
      const triggers = typeof on === 'string' ? [on] : Array.isArray(on) ? on : Object.keys(on);
      const actions = [...new Set(Object.values(wf.jobs ?? {}).flatMap((j) => (j.steps ?? []).map((s) => s.uses).filter(Boolean)))];
      return { id: `workflow:${f}`, kind: 'workflow', name: wf.name ?? f, file: `${dir}/${f}`, triggers, actions };
    });
}

function dependencies(root) {
  const pkg = JSON.parse(read(root, 'package.json'));
  return [
    ...Object.entries(pkg.dependencies ?? {}).map(([n, v]) => ({ n, v, dev: false })),
    ...Object.entries(pkg.devDependencies ?? {}).map(([n, v]) => ({ n, v, dev: true })),
  ].map(({ n, v, dev }) => ({ id: `dependency:${n}`, kind: 'dependency', name: n, version: v, dev, file: 'package.json' }));
}

export function discover(root = process.cwd()) {
  return [
    ...agents(root),
    ...skills(root),
    ...commands(root),
    ...settings(root),
    ...mcpServers(root),
    ...scripts(root),
    ...workflows(root),
    ...dependencies(root),
  ];
}

// ---- history, from git ----

// The paths whose history is the method's history. Paths that don't exist yet
// (.claude/skills, .mcp.json) are listed so their first commit shows up.
export const TOOLING_PATHS = [
  'CLAUDE.md',
  '.claude/agents',
  '.claude/skills',
  '.claude/commands',
  '.claude/settings.json',
  '.mcp.json',
  'scripts',
  '.github/workflows',
  'package.json',
  'src/data/methodology.mjs',
];

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
}

// A shallow clone has 1 commit of history, which would publish a timeline
// that starts yesterday. Fail loudly instead (deploy.yml sets fetch-depth: 0).
export function assertFullHistory(root = process.cwd()) {
  if (git(root, ['rev-parse', '--is-shallow-repository']).trim() === 'true') {
    throw new Error('/methodology needs full git history; this clone is shallow (set fetch-depth: 0 on actions/checkout)');
  }
}

export function toolingTimeline(root = process.cwd()) {
  const out = git(root, ['log', '--date=short', '--format=@@%ad%x09%h%x09%s', '--name-only', '--', ...TOOLING_PATHS]);
  const commits = [];
  for (const line of out.split(/\r?\n/)) {
    if (line.startsWith('@@')) {
      const [date, hash, subject] = line.slice(2).split('\t');
      commits.push({ date, hash, subject, files: [] });
    } else if (line.trim() && commits.length) {
      const f = line.trim();
      if (TOOLING_PATHS.some((p) => f === p || f.startsWith(`${p}/`))) commits.at(-1).files.push(f);
    }
  }
  return commits;
}

// Every change of an agent's model line, oldest first.
export function modelHistory(root = process.cwd()) {
  const changes = [];
  for (const a of agents(root)) {
    const out = git(root, ['log', '--reverse', '--date=short', '--format=@@%ad%x09%h', '-p', '--unified=0', '--', a.file]);
    let current = null;
    let commit = null;
    for (const line of out.split(/\r?\n/)) {
      if (line.startsWith('@@') && !line.startsWith('@@ ')) {
        const [date, hash] = line.slice(2).split('\t');
        commit = { date, hash };
      } else {
        const m = line.match(/^\+model:\s*(\S+)/);
        if (m && commit && m[1] !== current) {
          changes.push({ agent: a.name, date: commit.date, hash: commit.hash, from: current, to: m[1] });
          current = m[1];
        }
      }
    }
  }
  return changes.sort((x, y) => x.date.localeCompare(y.date) || x.agent.localeCompare(y.agent));
}
