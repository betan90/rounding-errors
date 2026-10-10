# CLAUDE.md — Rounding Errors house rules

This is a museum of statistical discrepancies: cases where institutions published numbers that disagree, and what happened next. Every exhibit follows these rules. Read this file before drafting, editing, building, or reviewing any exhibit.

## Voice

- Register: tight deadpan. Short controlled sentences. Aside beats are allowed ("Also: planes."). No em dashes, ever. No dramatic echo fragments ("Not over a decade. In one year."). No run-on spirals.
- Terminally serious delivery. Never wink. The funniest available line is usually the most literal one ("indistinguishable from nothing" is the accurate statistical description). If a line is trying to be funny, it fails.
- Every clause names something, quantifies something, or lands a joke. Hedged winks and unquantified asides get cut: say Apple, not "a certain fruit-themed company". A parenthetical must carry a figure to live.
- When compressing, kill whole beats rather than miniaturizing them.
- Numbers are numerals, never spelled out: 84 not eighty-four, 43 not forty-three, 3 not three. This covers every cardinal count in frontmatter and body, including one that opens a sentence. The exceptions are words that are not counts: the pronoun "this one", the adverb "twice", ordinals ("the tenth case"), and distributive "one per exhibit". Applied retroactively to exhibits 001 to 009 and note 001. Never renumber a verbatim source title or a quoted phrase: 003 cites "two Chinese provinces admit to faking data" and 006 cites "A Six-Year Multilevel Analysis of Project D.A.R.E." because that is what those sources are called. A restyle like this is typography, not a correction, and does not go in src/data/corrections.ts, which is for claims that were wrong.

## Attribution rule (non-negotiable)

- The narrator never says a country or person lied. Accusations appear only as documented institutional acts: the IMF's censure, a party disciplinary ruling, a court filing, Krugman's coinage, a statistics office correcting itself.
- Named individuals appear only with an institutional paper trail, and claims about them are reported ("leaked cables reported him telling..."), never asserted.
- Category lines describe the structure of the gap, never a moral verdict. They stay flat: the header plants, the body delivers the twist.

## Exhibit template

This is the schema `src/content/config.ts` actually enforces. It supersedes any other description of exhibit structure; if a draft doesn't match this, fix the draft, not the schema.

Frontmatter fields (all required unless marked optional):
- `title`, `country`, `status`, `category`, `teaser`: strings.
- `exhibit`: string, zero-padded to match the file name (`"006"`, not `6`).
- `tags`: array of strings, from the vocabulary below.
- `date`: YAML date. Must be the exhibit's actual publish day (the day it's built into the site), not a draft or research date. The homepage and tag/country pages sort newest-first by this field (ties broken by exhibit number, descending), so a stale draft date pushes a newer exhibit below an older one.
- `ledgerTitle`: string, e.g. `"The numbers: West and O'Neal 2004"`.
- `ledger`: array of `{ label, value, gap? }` rows — this is "The numbers" table. Set `gap: true` on the one row that is the discrepancy.
- `ledgerNote` (optional): one line under the table.
- `verdict`: array of `{ key, value, long? }` — the scoreboard. Always exactly three rows: `Fraud detected`, `Rules broken`, and a `Usefulness of ...` row. The usual third key is `Usefulness of the headline figure`; live variants are `...of headline figure` (001, 002, 003), `...of the claimed figure` (005), and `...of headline metric` (006). Match the exhibit's phrasing; prefer `Usefulness of the headline figure` for new exhibits. Set `long: true` on any row whose value runs past a few words.
- `verdictNote`: string, the closing paragraph that follows the scoreboard.
- `chartNote` (optional): use only when there is deliberately no chart (see exhibit 003); any exhibit with a `chartNote` renders a `ChartPending` note in place of a chart component, automatically. The note must state the reason there is no chart, never a TODO ("pending" is a marker the audit greps for).
- `correctionNote` (optional): one line describing a published correction; renders a "Corrected." notice linking to `/corrections/` (see exhibit 006).
- `sources`: array of `{ name?, text, url?, urlLabel? }`. Only set `url`/`urlLabel` for a source you have an actual link for; never fabricate one to fill the field.
- `disclosure`: string. Must state the file was drafted with AI (Claude), that editorial voice and errors are the author's, and that every figure was checked against the linked primary source.

Body (markdown, rendered between the ledger and the verdict), sections in order: `## The incident` · `## Who lied` (recurring; the answer varies per exhibit) · `## The fix` (when one exists) · `## The bit continues` (when the story is live, use instead of The fix). Nothing else goes in the body — no numbers table, no verdict, no chart spec, no sources, no disclosure. Those all live in frontmatter above and render through `Ledger.astro` / `Verdict.astro` / `Receipts.astro`. Body length: 500 words maximum across these sections.

Chart wiring is not a frontmatter field. Each exhibit's chart component (e.g. `src/components/DareChart.astro`) is built separately and switched in by exhibit number inside `src/layouts/ExhibitLayout.astro` (`{data.exhibit === '006' && <DareChart />}`). Adding a new exhibit with a chart means both writing the component and adding that line.

- Body length: 500 words maximum, a two-minute read ending at the verdict.
- Disclosure always includes: drafted with AI (Claude), editorial voice and errors mine, every figure checked against the linked primary source.

## Evidence and chart honesty

- Every figure is verified against a primary source before publishing. Sources are listed with what each one supports.
- Self-reported or unverifiable figures are labeled as such in the body or disclosure. Sometimes the provenance problem is the exhibit.
- Never fabricate or interpolate a data series. If clean chartable data does not exist, the chart section says so and the exhibit runs without one. The missing chart can be the point.
- Wikipedia is never cited as a source. It may be used to find primary sources, which are then verified and cited directly. If a claim cannot be traced to a primary source, the claim is cut.

## Category vocabulary (do not blur)

Structural categories describe the gap's shape: "nobody lied" (001, reused by 009), "the IMF's only censure" (002), "the parts exceeded the whole" (003), "the summer did it" (004), "the evidence was a highlight reel" (005), "indistinguishable from nothing" (006), "parroting" (007, drawn from the taxonomy below), "the baseline did the work" (008), "the citations were somewhere else" (010), "the correction needed a correction" (011), "the errors compounded" (012). Reuse is allowed when the shape genuinely repeats, and a taxonomy item may serve as a category when the evidence failure is the shape.

Evidence-failure taxonomy. Diagnostic: go looking for the source and see what you find.
1. trust me, bro: no source was ever offered; pure confident assertion.
2. parroting: a source exists, nobody checked, and it is embarrassing.
3. citation needed: everyone assumes a source exists; none has ever been produced.
4. the evidence was a highlight reel: a source exists, looks authoritative, collapses on inspection.

## Tags (reuse ruthlessly, no near-duplicates)

Cross-cutting threads: correlation-someone-believed, outlived-the-evidence, measurement-definitions.
Domain tags: healthcare, crime, education, epidemiology, gdp, national-accounts, inflation, imf, provincial-data, environment.
Region tags: europe, asia, latin-america, africa.
Meta tags: self-audit (010, the only exhibit whose subject is this site).
Country is its own frontmatter field and is never a tag. This list is the live vocabulary as of exhibit 013 (mirrored in the `TAGS` set in `scripts/check-house-rules.mjs`); before inventing a tag, check what the existing exhibits actually use (`grep "^tags:" src/content/exhibits/*.md`), because a near-duplicate of a live tag (eu next to europe) is worse than no tag.

## Notes and the review pipeline

- There is a second content collection, `notes` (`src/content/notes/`, schema in `config.ts`: `title`, `date`, `teaser`, optional `disclosure`). Notes are behind-the-scenes entries, rendered at `/notes/`. Same evidence rules as exhibits: if a note cites the repo's own files, those files must be tracked in the repo.
- Every exhibit gets a fact-check pass (fact-checker agent, writes `fact-check-output.json` at the repo root) and a DeepSeek second opinion (`scripts/second-opinion.mjs`, reads that JSON, needs `DEEPSEEK_API_KEY` in `.env`; `scripts/compare-reviews.mjs` diffs the two verdict sets). The root JSON working copies are gitignored; the archived per-exhibit copies under `reports/NNN-slug/` are tracked, because published notes cite them.

## Build conventions

- Static Astro site, GitHub Pages via Actions, base path configured in astro.config.mjs.
- Each exhibit's chart is a small Astro component with inline SVG, wired by the frontmatter chart key. Match the existing components' style.
- Exhibit prose is never altered during build. Schema mismatches get flagged, not silently fixed.
- `scripts/check-house-rules.mjs` enforces the mechanical voice rules: em dashes and an exhibit body over 500 words are blocking; spelled-out numbers are a warning, because verbatim titles and quotes are exempt and only a human can tell. It also enforces the exhibit-template rules zod can't express, all blocking: exactly 3 verdict rows keyed `Fraud detected`, `Rules broken`, `Usefulness of ...`; exactly 1 ledger row with `gap: true`; a 3-digit `exhibit` matching the file name; the disclosure's 3 required statements; a `chartNote` that states a reason (no "pending", no trailing period); and exactly one of a chart wired in `ExhibitLayout.astro` or a `chartNote`. A tag outside the vocabulary is a warning; the script keeps its own copy of the tag list, so a new tag goes in both places. It runs automatically as a PostToolUse hook (`.claude/settings.json`) on every Write or Edit to `src/content/exhibits/`, `src/content/notes/`, or a drafter's root `exhibit-NNN-slug.md`, and again as npm's `prebuild` over every exhibit and note, which catches files that arrived another way (a `cp`, a human edit) and fails the build, locally and in the deploy workflow, on a blocking violation. In hook mode the chart rule is only a warning, because the site-builder writes the exhibit before it wires the chart; prebuild makes it blocking. By hand: `node scripts/check-house-rules.mjs <files>` or `--all`.
- `scripts/check-links.mjs` (`npm run check:links`) fetches every source `url`. A 404, 410, unknown host or other hard failure is blocking. A redirect ("moved") or a bot wall ("refused", e.g. IMF, Bloomberg, FT, JAMA, the Lancet, SAGE all 403 scripts site-wide) is a warning to check in a browser. It is deliberately not in the build, so a publisher's flaky server can't block a deploy; the committer runs it on the content files it is about to publish.
- Drafts live at the repo root as `exhibit-NNN-slug.md` (gitignored). The site-builder copies the draft into `src/content/exhibits/` and deletes the root copy once the build passes, so only one copy exists to edit.
- Publishing is always gated by a human. Nothing auto-deploys: the deploy workflow (`deploy.yml`) is `workflow_dispatch`-only, never triggered by a `push` event, so no commit reaching `main` by any path deploys on its own. The one exception is the human command itself: when a human tells the committer agent "commit and push," that instruction is the gate, and the agent dispatches the deploy workflow as its last step and confirms it goes green. A `git push` from any other source (a person pushing directly, a different agent, CI) does not deploy.
