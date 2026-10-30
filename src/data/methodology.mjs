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
  'command:benchmark': {
    role: 'Reruns the drafting benchmark: exhibit 017\'s brief, drafted again at chosen models and efforts, set beside every earlier run, after a cost estimate the human approves.',
    why: 'An alias moves to a new model with no commit. A brief held fixed turns "the new model is better" into numbers next to the old model\'s, and the old model can run the same day by its full id.',
  },
  'hook:SessionStart:audit-due.mjs': {
    role: 'Runs audit-due.mjs at the start of every session.',
    why: 'A hook can\'t launch an agent. It can put the instruction in front of the session that can.',
  },
  'hook:SubagentStop:log-models.mjs': {
    role: 'Runs log-models.mjs each time an agent finishes.',
    why: 'The record is made when the run ends, not rebuilt later from transcripts that may be gone.',
  },
  'hook:SubagentStop:archive-drafts.mjs': {
    role: 'Runs archive-drafts.mjs each time the drafter finishes.',
    why: 'Saved when the run ends, a brief no longer depends on a temp file or on a transcript that is deleted after 30 days.',
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
  'script:log-models.mjs': {
    role: 'Copies the model the API actually served for each agent run, the effort each turn ran at, the task it was given, the Claude Code version, how long the run took and its tool calls by type, from Claude Code\'s transcripts into reports/model-log.jsonl.',
    why: 'An agent file names a model family, and the family moves to its newest model with no commit: the committer went from Haiku 4.5 to Haiku 5.5 between 5 and 10 October 2026. No agent file sets an effort, so effort follows the session; on 29 October a running committer switched from medium to max when the next message arrived. Run time and tool calls came in on 30 October, after a research run took 39 minutes against a usual 2 to 5. The transcripts that record all of it are deleted after 30 days.',
  },
  'script:archive-drafts.mjs': {
    role: 'Saves what each drafter run was given and what it wrote into reports/NNN-slug/drafting/: the prompt, the brief exactly as the drafter read it, and every version of the draft, from Claude Code\'s transcripts.',
    why: 'The brief is the drafter\'s entire input, and it was the 1 input the repo never kept. The 017 brief counted "probably false" 3 times in the ONS article; it appears 4 times, and the fact-checker caught it downstream. Backfilled for exhibits 012 to 017; earlier briefs had already been deleted.',
  },
  'script:compare-drafts.mjs': {
    role: 'Drafts 1 exhibit from its original brief at chosen model and effort settings, each as a headless Claude Code session in a plain copy of the repo from before the exhibit shipped, then measures each draft: what ran, what it was handed besides its prompt, tokens, time, house rules, numbers and links not in the brief, its choices, and how far its prose is from the others. Lines up every comparison of an exhibit by model and effort.',
    why: 'Model and effort are the 2 settings this pipeline changes without noticing. A repeated cell measures the noise, so a difference smaller than 2 runs of 1 setting counts as none. Headless and outside this folder, because agents launched from a session here were handed its CLAUDE.md and memory index, whatever checkout they read.',
  },
  'script:check-links.mjs': {
    role: 'Fetches every source link. A dead link blocks the commit. A redirect or a bot wall is a warning to check in a browser.',
    why: 'Kept out of the build on purpose, so a publisher\'s slow server can\'t stop a deploy.',
  },
  'script:check-methodology.mjs': {
    role: 'Fails the build if this page is missing a tool the repo uses, describes one it no longer uses, or makes a claim its receipt no longer supports.',
    why: 'A hand-written list of tools goes stale the first time someone adds a tool and forgets the list.',
  },
  'script:fetch-sources.mjs': {
    role: 'Fetches the full text of every source an exhibit links to and records what it got in a manifest: fetched, failed, or placed by hand from a browser copy.',
    why: 'The second opinion reads whole sources, not excerpts. The texts stay off the repo because they are other publishers\' work; the manifest, with each text\'s size and hash, is tracked.',
  },
  'script:second-opinion.mjs': {
    role: 'Sends each claim, with the full text of its cited sources, to DeepSeek, a model from a different company. DeepSeek must quote the sentence it relied on, and the script checks the quote is really in the source. A claim whose source could not be fetched falls back to the fact-checker\'s passage.',
    why: '2 models from the same company can share a blind spot. Given only the passage the fact-checker chose, DeepSeek could only check that choice, and through exhibit 017 it never caught an error the fact-checker missed.',
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
  { step: 'Draft', text: 'The drafter writes 1 file. A hook checks the voice and template rules as it lands, and another saves the brief and every version of the draft to reports/.', uses: ['agent:exhibit-drafter', 'hook:PostToolUse:check-house-rules.mjs', 'hook:SubagentStop:archive-drafts.mjs'] },
  { step: 'Check', text: 'The fact-checker checks every claim against every source and writes a JSON report.', uses: ['agent:fact-checker'] },
  { step: 'Second opinion', text: 'The sources are fetched in full, and DeepSeek checks every claim against them, quoting what it relied on. The 2 verdict sets are compared.', uses: ['script:fetch-sources.mjs', 'script:second-opinion.sh', 'script:compare-reviews.sh'] },
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
    role: 'The second-opinion model, deepseek-chat by default. Each report records the model that actually answered: in October 2026 the API served that name as deepseek-flash.',
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
  { name: 'Claude Code transcripts', role: 'Every session and agent run, saved by Claude Code under ~/.claude/projects/ and deleted after 30 days by default. The source of the model log; only model ids, task descriptions and versions are copied out. Runs before 4 October 2026 were already deleted when logging began.' },
  { name: 'Source texts', role: 'The full source texts the second opinion reads, in reports/*/sources/. Gitignored as other publishers\' work; each folder\'s manifest.json records what was fetched, its size and its sha256.' },
  { name: '.claude/settings.local.json', role: 'Per-machine permission settings. Never committed, so never read for this page.' },
  { name: 'curl and headless Chrome', role: 'Used by hand when needed: curl for sites that block the other fetchers, Chrome to check layouts. Not part of the scripted pipeline.' },
];

// How the method got here, oldest first. The array order is the timeline, so
// no dates. `commits` are the receipts, oldest first: check-methodology.mjs
// fails the build if a hash doesn't exist or if any commit isn't an ancestor
// of the next one across all eras. An era with no commits says why in
// `selfReported`. `note` (optional) is the slug of a note in
// src/content/notes/ that tells the longer story.
// A tooling change that alters how exhibits get made adds a row here, or
// extends the latest one, in the commit straight after it, pushed together:
// a row cites the change's commit, and a commit can't contain its own hash.
export const eras = [
  {
    name: 'In a chat window',
    changed: 'Exhibit 001 was researched, written and built in claude.ai chat as 1 HTML file with a hand-coded SVG chart.',
    why: 'The voice rules came out of several rejected drafts here: no em dashes, a 2-minute read, and a narrator who never says anyone lied.',
    commits: [],
    selfReported: 'This happened in claude.ai chat, outside the repo. Its chart used approximate values for 2013 to 2019 until an audit replaced them with the CSO series.',
  },
  {
    name: 'In a repo',
    changed: 'The work moved to Claude Code and git. The site became Astro, and an exhibit became a markdown file with frontmatter. Deploys ran on every push.',
    why: 'Once an exhibit is data, adding one stops being a page-building job.',
    commits: ['14d97cc', '639a858'],
  },
  {
    name: 'The agent kit',
    changed: 'The house rules went into CLAUDE.md, and the work split into 5 agents, each with only the tools its job needs. The researcher can\'t write files. The committer only gets git.',
    why: 'A fact-checker that didn\'t write the draft has no reason to defend it. A planned /new-exhibit slash command was dropped, because each step wants its own tools and a fresh context.',
    commits: ['5c0af29'],
  },
  {
    name: 'The first live error',
    changed: 'Deploys stopped running on push and became manual. The site gained a public corrections log. Every Wikipedia citation was re-cited to a primary source or cut.',
    why: 'Exhibit 006 deployed on push and credited a finding to a 2003 GAO report that doesn\'t contain it. The fix was committed about 4.5 hours after the exhibit.',
    commits: ['d6ac46c', '83af94f', 'fb14631', 'f1bb772'],
  },
  {
    name: 'A second model',
    changed: 'A DeepSeek reviewer reads each claim and its quoted passage, with no memory of who wrote it. A script diffs its verdicts against the fact-checker\'s.',
    why: 'Agreement between 2 reviewers says little. Disagreement says where to look. Most of its dissents turn out to be about the excerpt, not the facts.',
    commits: ['23984b4', '9f33e0a'],
  },
  {
    name: 'One sentence to publish',
    changed: '"Commit and push" became the only command that deploys: the committer pushes, dispatches the workflow and watches it go green. The review reports in reports/ became tracked.',
    why: 'A sentence is easy to say and impossible to trigger by accident. The reports became tracked because a published note cited files that weren\'t in the repo.',
    commits: ['0766f28', '7110404'],
  },
  {
    name: 'The museum audits itself',
    changed: 'Exhibit 010 turned the fact-check record on this site: 127 claims, 84 supported, 3 wrong on the facts. Exhibit 011 shipped without its fact-check pass, which then found 3 problems.',
    why: 'The corrections log was missing the 003 fix, so 010\'s own count was wrong. A self-audit that trusts its own log inherits the log\'s omissions.',
    commits: ['a998be4', '59a0e0a', 'bf727f6'],
  },
  {
    name: 'Rules the harness enforces',
    changed: 'The voice and template rules became scripts: a hook runs them after every file Claude writes, and the build runs them again. The fact-checker moved to Opus. This page started building itself from the repo. Audits run every 4 sessions.',
    why: 'Rules written as requests kept getting broken. The hook catches a problem as it is written; the build catches anything that arrived another way. The fact-checker got the larger model after 006 and 3 rounds on 012.',
    commits: ['d0602ca', '54c5864', 'c66225f', 'c2751cf', '6246d93'],
  },
  {
    name: 'A second opinion that reads the source',
    changed: 'DeepSeek now gets the full text of each cited source, not the passage the fact-checker chose, and must quote the sentence it relied on; a script checks the quote is in the source. The texts are fetched by script and kept off the repo; a tracked manifest records each one.',
    why: 'Given only the fact-checker\'s passage, it could only check that choice, and through exhibit 017 it never caught an error the fact-checker missed. Rerun on 407 claims, it found 1: exhibit 002 dated a charge on the strength of an undated page. It also missed exact sentences in long documents, so its "not supported" is a reason to look, not a verdict.',
    commits: ['59f09ad', 'a8b9567'],
  },
  {
    name: 'A record of what ran',
    changed: 'The agent files keep model aliases, so upgrades arrive without a commit, and a hook now logs the model the API actually served for every agent run, with its task and the Claude Code version.',
    why: 'An alias moves on its own: the committer went from Haiku 4.5 to Haiku 5.5 between 5 and 10 October 2026, and git recorded nothing. The transcripts that did record it are deleted after 30 days; runs before 4 October were already gone.',
    commits: ['0443d5a'],
  },
  {
    name: 'What the settings change',
    changed: 'The model log now records the effort level of every turn, a hook saves each drafter brief with every version of its draft, and a script redrafts an exhibit from its saved brief at chosen model and effort settings, in a checkout from before it shipped, then measures each draft.',
    why: 'No agent file sets an effort, so every agent ran at whatever the session was set to, and the brief was the 1 input the repo never kept. Redrafting 017 at 11 settings changed the cost of a draft 172 times over and the wording far less; 8 of the 11 drafts repeated the brief\'s 1 wrong count, and the 2 runs asked for Fable 5.1 ran on Opus 5.5.',
    commits: ['4fb4f2b'],
    note: '002-model-and-effort',
  },
  {
    name: 'A benchmark that runs outside',
    changed: 'Comparisons now run as headless Claude Code sessions, in a plain copy of the repo at the base commit kept outside this folder, with no settings, hooks, connectors or memory. A cell can name a full model id, so the model being replaced can run beside its successor on the same day. /benchmark reruns the 017 grid when an alias starts serving a new model, and a history view lines every run up by model and effort.',
    why: 'Every agent in the 29 October grid was handed this folder\'s CLAUDE.md and memory index, whatever checkout it read, and 1 memory line about the 017 brief\'s count reached a draft: Haiku at max cited it. Outside this folder, a draft sees only the copy.',
    commits: ['0d263d5'],
    note: '002-model-and-effort',
  },
];

// Shown for a kind of tooling the repo doesn't use yet. When the first one
// arrives, it is discovered automatically and needs an entry above.
export const noneYet = {
  skill: 'None. Project instructions live in CLAUDE.md and the agent files.',
  command: 'None.',
  mcp: 'None.',
  plugin: 'None.',
};
