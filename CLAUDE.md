# CLAUDE.md — Rounding Errors house rules

This is a museum of statistical discrepancies: cases where institutions published numbers that disagree, and what happened next. Every exhibit follows these rules. Read this file before drafting, editing, building, or reviewing any exhibit.

## Voice

- Register: tight deadpan. Short controlled sentences. Aside beats are allowed ("Also: planes."). No em dashes, ever. No dramatic echo fragments ("Not over a decade. In one year."). No run-on spirals.
- Terminally serious delivery. Never wink. The funniest available line is usually the most literal one ("indistinguishable from nothing" is the accurate statistical description). If a line is trying to be funny, it fails.
- Every clause names something, quantifies something, or lands a joke. Hedged winks and unquantified asides get cut: say Apple, not "a certain fruit-themed company". A parenthetical must carry a figure to live.
- When compressing, kill whole beats rather than miniaturizing them.

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
- `verdict`: array of `{ key, value, long? }` — the scoreboard. Always exactly three rows: `Fraud detected`, `Rules broken`, `Usefulness of headline metric` (or `...claimed figure`, match the exhibit's phrasing). Set `long: true` on any row whose value runs past a few words.
- `verdictNote`: string, the closing paragraph that follows the scoreboard.
- `chartNote` (optional): use only when there is deliberately no chart (see exhibit 003); renders a `ChartPending` note instead of a chart component.
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

Structural categories describe the gap's shape: "nobody lied" (001), "the IMF's only censure" (002), "the parts exceeded the whole" (003), "the summer did it" (004), "the evidence was a highlight reel" (005), "indistinguishable from nothing" (006).

Evidence-failure taxonomy. Diagnostic: go looking for the source and see what you find.
1. trust me, bro: no source was ever offered; pure confident assertion.
2. parroting: a source exists, nobody checked, and it is embarrassing.
3. citation needed: everyone assumes a source exists; none has ever been produced.
4. the evidence was a highlight reel: a source exists, looks authoritative, collapses on inspection.

## Tags (reuse ruthlessly, no near-duplicates)

Cross-cutting threads: correlation-someone-believed, outlived-the-evidence.
Domain tags: healthcare, crime, education, epidemiology, gdp, national-accounts, inflation, imf, provincial-data.
Region tags: europe, asia, latin-america.
Country is its own frontmatter field and is never a tag. This list is the live vocabulary as of exhibit 006; before inventing a tag, check what the existing exhibits actually use (`grep "^tags:" src/content/exhibits/*.md`), because a near-duplicate of a live tag (eu next to europe) is worse than no tag.

## Build conventions

- Static Astro site, GitHub Pages via Actions, base path configured in astro.config.mjs.
- Each exhibit's chart is a small Astro component with inline SVG, wired by the frontmatter chart key. Match the existing components' style.
- Exhibit prose is never altered during build. Schema mismatches get flagged, not silently fixed.
- Publishing is always gated by a human. Nothing auto-deploys.
