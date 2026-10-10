// The written half of /methodology. The other half (which agents exist, their
// models and tools, the hooks, scripts, workflows and dependencies) is read
// from the repo at build time by scripts/lib/inventory.mjs, so it can't drift.
//
// scripts/check-methodology.mjs keeps the 2 halves in step, and runs before
// every build:
//   - every discovered tool needs an entry in `entries`, keyed by its id
//   - every entry must name a tool that still exists
//   - every `receipt` must still be true: the file exists and contains the text
//   - pipeline steps may only name ids that exist
//   - house voice applies: no em dashes
//
// Plain .mjs, not .ts, so the check script can import it without a compiler.

export const REPO = 'https://github.com/betan90/rounding-errors';

// One per discovered tool. `role` says what it does, `why` says why it is set
// up that way. Keep both to a sentence or 2.
export const entries = {
  'agent:exhibit-researcher': {
    role: 'Finds the primary sources for a new exhibit and checks each figure against them. Cannot edit the repo.',
    why: 'Research runs before any prose exists, so a figure arrives with its source attached instead of being found later to support a sentence.',
  },
  'agent:exhibit-drafter': {
    role: 'Turns the verified research into 1 draft file at the repo root. Cannot run commands, build, or publish.',
    why: 'Copies the schema from a live exhibit, not from prose docs, because the docs once described a template the code no longer used.',
  },
  'agent:fact-checker': {
    role: 'Starts with no memory of the drafting and checks every figure, date and quote against every listed source. Its only write is a JSON report.',
    why: 'It found a research claim attributed to the wrong report in exhibit 006. The fix is on the corrections page.',
  },
  'agent:site-builder': {
    role: 'Copies an approved draft into the site, builds its chart component, and runs the build. Cannot commit.',
    why: 'Exhibit prose is never altered here. A schema mismatch gets flagged back, not quietly fixed.',
  },
  'agent:committer': {
    role: 'Checks every source link, commits, pushes, then starts the deploy and waits for it to go green.',
    why: 'Runs only when a human says "commit and push". The job is git, not judgment, so it runs on the smallest model.',
  },

  'agent:auditor': {
    role: 'Checks that the repo still agrees with itself: the house rules against the code, each exhibit against its own sources and the corrections log, the About copy against the agents, the deploy against HEAD. Writes a dated report to reports/audits/ and fixes nothing.',
    why: 'The fact-checker checks 1 exhibit before it ships. Drift happens after: a fix that updates the body but not the source line, a doc that describes code since rewritten.',
  },
  'hook:SessionStart:audit-due.mjs': {
    role: 'Runs audit-due.mjs at the start of every session.',
    why: 'A hook can\'t launch an agent. It can put the instruction in front of the session that can.',
  },
  'hook:PostToolUse:check-house-rules.mjs': {
    role: 'Runs check-house-rules.mjs after every file Claude writes or edits, and hands any broken rule back to Claude before it moves on.',
    why: 'A rule caught when the file is written costs 1 edit. The same rule caught at publish time costs a review round.',
  },
  'hook:PostToolUse:check-methodology.mjs': {
    role: 'Runs check-methodology.mjs when Claude writes or edits an agent, skill, hook, script, workflow or package.json, and tells Claude if this page no longer matches.',
    why: 'A warning, not a block: a new tool is written before its entry is. The build blocks if the entry never arrives.',
  },

  'script:check-house-rules.mjs': {
    role: 'Checks the rules a script can judge: no em dashes, a 500-word body, numerals, 3 verdict rows, 1 gap row, the disclosure, a chart or a stated reason for none.',
    why: 'Runs twice: in the hook at write time, and before every build, which catches files that arrived some other way.',
  },
  'script:audit-due.mjs': {
    role: 'Counts new sessions since the last audit report. At 4, if anything was committed since, it tells Claude to launch the auditor in the background.',
    why: 'Counted in sessions, not days, because the site is built in bursts. A run of sessions that committed nothing triggers nothing.',
  },
  'script:check-links.mjs': {
    role: 'Fetches every source link. A dead link blocks the commit. A redirect or a bot wall is a warning to check in a browser.',
    why: 'Kept out of the build on purpose, so a publisher\'s slow server can\'t stop a deploy.',
  },
  'script:check-methodology.mjs': {
    role: 'Fails the build if this page is missing a tool the repo uses, describes one it no longer uses, or makes a claim its receipt no longer supports.',
    why: 'A hand-written list of tools goes stale the first time someone adds a tool and forgets the list.',
  },
  'script:second-opinion.mjs': {
    role: 'Sends each claim, with the source passage the fact-checker matched it to, to DeepSeek, a model from a different company. It answers 1 question: does the passage support the claim.',
    why: '2 models from the same company can share a blind spot. It never sees the exhibit or the source URL, only the pair.',
  },
  'script:second-opinion.sh': {
    role: 'Loads the DeepSeek key from .env and runs second-opinion.mjs.',
    why: 'The key stays out of the repo and out of the agents\' reach.',
  },
  'script:compare-reviews.mjs': {
    role: 'Lines up the fact-checker\'s verdict and DeepSeek\'s verdict for each claim. Agreements print in 1 line, disagreements in full.',
    why: 'A human reads only where the 2 reviewers disagree.',
  },
  'script:compare-reviews.sh': {
    role: 'Shell wrapper that runs compare-reviews.mjs on the 2 default report files.',
    why: 'Same pipeline, 1 command per step.',
  },

  'workflow:deploy.yml': {
    role: 'Builds the site and publishes it to GitHub Pages.',
    why: 'Runs only when started by hand. A push to main publishes nothing on its own, so a human is the last step before anything goes live.',
  },

  'dependency:astro': {
    role: 'Static site generator. Every page, this one included, is built ahead of time.',
    why: 'No server, no database, no runtime to break. Each chart is hand-written SVG with no chart library.',
  },
  'dependency:@astrojs/check': {
    role: 'Type checks the Astro components.',
    why: 'Catches a component reading a field the content schema doesn\'t have.',
  },
  'dependency:typescript': {
    role: 'Types for the content schema, the corrections log, and the components.',
    why: 'The exhibit schema in src/content/config.ts is the template every exhibit must match.',
  },
  'dependency:js-yaml': {
    role: 'Reads exhibit frontmatter, agent files and workflows for the check scripts and for this page.',
    why: 'Listed explicitly, because the scripts used it while it was only installed as a side effect of Astro.',
  },
};

// How an exhibit gets made, in order. `uses` names ids from `entries`.
export const pipeline = [
  { step: 'Pick', text: 'A human picks the topic. Claude can propose one; the decision is the human\'s.', uses: [] },
  { step: 'Research', text: 'The researcher finds primary sources and checks each figure. PDFs it can\'t read are listed for conversion with pdftotext.', uses: ['agent:exhibit-researcher'] },
  { step: 'Draft', text: 'The drafter writes 1 file. A hook checks the voice and template rules as it lands.', uses: ['agent:exhibit-drafter', 'hook:PostToolUse:check-house-rules.mjs'] },
  { step: 'Check', text: 'The fact-checker checks every claim against every source and writes a JSON report.', uses: ['agent:fact-checker'] },
  { step: 'Second opinion', text: 'DeepSeek reviews the same claim and passage pairs. The 2 verdict sets are compared.', uses: ['script:second-opinion.sh', 'script:compare-reviews.sh'] },
  { step: 'Decide', text: 'A human reads the disagreements and decides what changes. Reports are archived in reports/ with each exhibit.', uses: [] },
  { step: 'Build', text: 'The site-builder wires the exhibit and its chart. The build runs every check first and fails on a blocking one.', uses: ['agent:site-builder', 'script:check-house-rules.mjs', 'script:check-methodology.mjs'] },
  { step: 'Publish', text: 'A human says "commit and push". The committer checks links, commits, and starts the deploy.', uses: ['agent:committer', 'script:check-links.mjs', 'workflow:deploy.yml'] },
  { step: 'Audit', text: 'Every 4 sessions, the whole repo is checked against itself. Findings go to a dated report; a human decides what gets fixed, and wrong published claims go to the corrections page.', uses: ['hook:SessionStart:audit-due.mjs', 'agent:auditor'] },
];

// Services and programs the repo depends on but can't discover as files.
// Each receipt is a file in the repo that must still contain the text, or
// the build fails.
export const external = [
  {
    name: 'Claude Code (Anthropic)',
    role: 'Runs every agent above. Every exhibit\'s disclosure says it was drafted with Claude.',
    receipt: { file: 'CLAUDE.md', contains: 'drafted with AI (Claude)' },
  },
  {
    name: 'DeepSeek API',
    role: 'The second-opinion model, deepseek-chat by default.',
    receipt: { file: 'scripts/second-opinion.mjs', contains: '"deepseek-chat"' },
  },
  {
    name: 'GitHub Pages and GitHub Actions',
    role: 'Hosting and the deploy workflow.',
    receipt: { file: '.github/workflows/deploy.yml', contains: 'actions/deploy-pages' },
  },
  {
    name: 'pdftotext',
    role: 'Converts PDF sources to text in the main session, because the agents can\'t read PDFs on this machine.',
    receipt: { file: '.claude/agents/exhibit-researcher.md', contains: 'pdftotext' },
  },
  {
    name: 'Google Fonts',
    role: 'IBM Plex Mono and Source Serif 4.',
    receipt: { file: 'src/layouts/BaseLayout.astro', contains: 'fonts.googleapis.com' },
  },
];

// Part of the method, but not in the repo, so not replicable from it.
export const offRepo = [
  { name: 'Claude Code memory', role: 'Notes Claude keeps between sessions on 1 machine: open audit items, lessons from past mistakes. The public record of the same things is the git history, the corrections page, and reports/.' },
  { name: '.env', role: 'Holds the DeepSeek API key. Never committed.' },
  { name: '.claude/settings.local.json', role: 'Per-machine permission settings. Never committed, so never read for this page.' },
  { name: 'curl and headless Chrome', role: 'Used by hand when needed: curl for sites that block the other fetchers, Chrome to check layouts. Not part of the scripted pipeline.' },
];

// Shown for a kind of tooling the repo doesn't use yet. When the first one
// arrives, it is discovered automatically and needs an entry above.
export const noneYet = {
  skill: 'None. Project instructions live in CLAUDE.md and the agent files.',
  command: 'None.',
  mcp: 'None.',
  plugin: 'None.',
};
