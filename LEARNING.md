# LEARNING.md

A running log of which Claude features got used to build this, what they were actually good for, and what I'd do differently. One paragraph per working session. Doubles as the "how this was made" record.

Sessions 2 onward were drafted with Claude from the git history, the archived review files in `reports/`, and the corrections log, then edited by me. Where the record can't say what I thought at the time, the entry says so instead of guessing.

---

## Session 1 — scoping, copy, design, page build (in claude.ai chat + artifacts)

**Features used:** web search (verification), the analysis/file tools (built the page), artifact rendering (previewed the HTML).

**What happened:** Used Claude to sweep for well-documented statistical discrepancies and pressure-test which had the best story-to-effort ratio; Ireland's GDP-vs-GNI\* gap won. Web search did real work here — the CSO's 2025 annual accounts had dropped days earlier, so the entry opens with week-old figures no evergreen listicle can claim. Verified every number against primary sources (CSO releases, EU Commission forecast, central-bank commentary) before writing. Iterated the copy hard on voice: cut it from ~1,100 words to a ~2-minute read, killed em dashes and dramatic-pause fragments, and settled a house rule that the narrator never accuses anyone of lying — institutions on the record (the IMF, Krugman, the FAO) carry every verdict instead. Built the page as one self-contained `index.html` with a hand-coded SVG chart in a ledger/errata visual identity (monospace display, red vs. ink lines, shaded gap).

**What worked:** search-for-freshness was the standout. The tone rules only got right through several rejection rounds — worth capturing them in a CLAUDE.md so they don't have to be relearned per exhibit.

**What I'd change / open:** the 2013–2019 chart values are approximate placeholders; the real single-vintage GNI\* back-series lives only in a CSO spreadsheet and needs a local pull (session 2). *[Resolved 2026-07-25, during a full repo audit: the chart now uses the single-vintage CSO PxStat NA001 series, all 13 years, pulled via the ws.cso.ie API.]*

---

## Session 2 (11 to 14 July) — repo, Astro, deploy (Claude Code)

**Features used:** Claude Code in the terminal, git handled by Claude, GitHub Actions.

**What happened:** Moved from claude.ai into Claude Code and a real repo. Exhibit 001 went in as static HTML, then exhibit 002 (Argentina) with cross-exhibit navigation, then the whole site was migrated to Astro with content collections: exhibits became markdown files with frontmatter, rendered by shared layouts, with country and tag pages generated automatically. The plan said Cloudflare Pages; it shipped on GitHub Pages via an Actions workflow instead. Exhibit 004 (ice cream and polio) followed with its own chart component.

**What worked:** content collections. Once an exhibit is data, adding one stops being a page-building job.

**What I'd change / open:** the deploy workflow triggered on every push, which looked convenient and turned out to be the root of session 4's problem. Open for me to answer: did plan mode get used, and what did the session cost?

---

## Session 3 (17 July) — the agent kit

**Features used:** CLAUDE.md, custom subagents in `.claude/agents/` (researcher, drafter, fact-checker, site-builder, committer).

**What happened:** The house rules from session 1 went into CLAUDE.md, and the workflow was split into 5 agents, each with a narrow job and only the tools it needs (the researcher can't write files; the committer only gets git). Exhibit 005 (Scared Straight) was the first one through the pipeline. The fact-checker caught its first real error: the exhibit called the NIJ CrimeSolutions rating "No Effects" when the clearinghouse says "Ineffective". The same pass swept em dashes out of the page titles.

**What worked:** separation of jobs. A fact-checker that didn't write the draft has no reason to defend it.

**What changed from the plan:** the planned `/new-exhibit` slash command never got built; CLAUDE.md plus the agents took its place. A command runs inside one context with one toolset, and each step here wants a different toolset and a fresh context.

---

## Session 4 (25 July) — the first real failure, and the audit

**Features used:** fact-checker agent, GitHub Actions `workflow_dispatch`.

**What happened:** Exhibit 006 (DARE) was pushed, and the push-triggered deploy put it live. The fact-checker then found the body credited a "boomerang effect" finding to a 2003 GAO report that doesn't contain it; the claim traced only to an uncited Wikipedia sentence. The real source was Rosenbaum and Hanson's 1998 study. The uncorrected page was live for about 4.5 hours. That day: deploys became manual (`workflow_dispatch` only), the site gained a public corrections log, every Wikipedia citation was re-cited to a primary source or cut, and a full audit found the CLAUDE.md template describing a schema the code no longer used.

**What worked:** writing the failure up publicly. The corrections log is now part of the site's argument.

**What I'd change:** 2 lessons. A correct figure can still be pinned to the wrong source, so "X said Y" gets checked separately from "Y is true". And prose docs rot silently; when matching "the existing format", diff against the real schema, not the description of it.

---

## Session 5 (1 to 3 August) — a second opinion from a different model

**Features used:** the Anthropic fact-checker plus a DeepSeek reviewer via API (`scripts/second-opinion.mjs`), Notes collection.

**What happened:** Exhibit 007 (10,000 steps). Added a second reviewer from a different model family that sees only each claim and its quoted passage, and a script that diffs the two verdict sets. A fact-checker sweep fixed findings across 001, 003, 004 and 007; 003 had been live saying "within weeks" for 2 admissions about a year apart. Notes launched, with a first entry on the second-opinion setup.

**What worked:** disagreements between the reviewers are where to look. Agreements tell you little.

**What I'd change:** the second opinion has a known blind spot. It marks a claim unsupported whenever the passage it was given doesn't restate everything, so most of its dissents are about the excerpt, not the facts. Exhibit 013 had 12 such dissents and 0 real ones.

---

## Session 6 (12 to 16 August) — 2 exhibits and a second audit

**Features used:** committer agent with deploy dispatch, `gh run watch`, Explore agent.

**What happened:** Exhibits 008 (Indonesia deforestation) and 009 (Nigeria's GDP rebasing). "Commit and push" became the one human command that also dispatches the deploy and watches it go green; a push from anywhere else still deploys nothing. A second audit fixed a chart-pending component hardcoded to one exhibit, a sort bug on tag pages, and a line in 009 that had been lost in an edit. The `reports/` folder became tracked, because a published note cited files that weren't in the repo.

**What worked:** one sentence as the publishing gate. It's easy to say and impossible to trigger by accident.

---

## Session 7 (4 to 5 October) — the museum audits itself

**Features used:** fact-checker, DeepSeek second opinion, corrections log, PDF extraction.

**What happened:** Exhibit 010 is about this site: 127 claims checked, 84 supported, 3 wrong on the facts. All exhibits were retro-fitted to a numerals-not-words rule. Exhibit 011 (Greece) was published without its fact-check pass, which then found 3 problems, all logged as a correction. That log turned out to be missing the 003 fix from August, so 010's own count of corrections was wrong and got corrected too. Exhibit 012 (Reinhart-Rogoff) took 3 fact-check rounds: the brief quoted an intermediate panel of the erratum's table instead of the final one, and the draft then read another table backwards.

**What worked:** the corrections log catching its own gap. A self-audit that trusts its own log inherits the log's omissions.

**What I'd change:** skipping a pipeline step "because the agent wasn't loaded" is never a good reason; the agent's file can be read and applied directly. With multi-panel tables, brief from the final panel and state which way the table reads.

---

## Session 8 (9 to 10 October) — rules the harness enforces

**Features used:** Claude Code hooks (`PostToolUse`), npm `prebuild`, Node scripts.

**What happened:** Exhibit 013 (8 glasses of water: 0 studies found). The voice rules stopped being requests in CLAUDE.md and became a script that runs automatically after every file Claude writes, and again before every build. Then the template rules were added to the same check, plus a link checker that fetches every source URL before publishing. The link checker's first run claimed 12 dead links; 0 were. They were bot walls, slow servers, and a Node timeout default, and telling those apart from a real 404 was most of the work.

**What worked:** the 2-layer setup. The hook catches a problem the moment it's written; the build catches anything that arrived another way.

**What I'd change / open:** 5 source URLs redirect to new addresses and still need a same-document check before updating.
