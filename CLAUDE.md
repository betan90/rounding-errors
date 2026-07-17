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

Frontmatter fields: title, exhibit (number), country, category, tags (array), date, teaser, chart (component key).

Body sections, in order: The numbers (a small table stating the discrepancy raw) · The incident · Who lied (recurring section; the answer varies per exhibit) · The fix (when one exists) · The bit continues (when the story is live) · Verdict (scoreboard: Fraud detected / Rules broken / Usefulness of headline figure, then one closing paragraph).

Below the fold, in order: Chart spec · Sources · Disclosure.

- Body length: 500 words maximum, a two-minute read ending at the verdict.
- Disclosure always includes: drafted with AI (Claude), editorial voice and errors mine, every figure checked against the linked primary source.

## Evidence and chart honesty

- Every figure is verified against a primary source before publishing. Sources are listed with what each one supports.
- Self-reported or unverifiable figures are labeled as such in the body or disclosure. Sometimes the provenance problem is the exhibit.
- Never fabricate or interpolate a data series. If clean chartable data does not exist, the chart section says so and the exhibit runs without one. The missing chart can be the point.

## Category vocabulary (do not blur)

Structural categories describe the gap's shape: "nobody lied" (001), "the IMF's only censure" (002), "the parts exceeded the whole" (003), "the summer did it" (004), "the evidence was a highlight reel" (005), "indistinguishable from nothing" (006).

Evidence-failure taxonomy. Diagnostic: go looking for the source and see what you find.
1. trust me, bro: no source was ever offered; pure confident assertion.
2. parroting: a source exists, nobody checked, and it is embarrassing.
3. citation needed: everyone assumes a source exists; none has ever been produced.
4. the evidence was a highlight reel: a source exists, looks authoritative, collapses on inspection.

## Tags (reuse ruthlessly, no near-duplicates)

Cross-cutting threads: correlation-someone-believed, outlived-the-evidence.
Domain tags: healthcare, crime, education, epidemiology, gdp, national-accounts, inflation, eu.
Country is its own frontmatter field and is never a tag.

## Build conventions

- Static Astro site, GitHub Pages via Actions, base path configured in astro.config.mjs.
- Each exhibit's chart is a small Astro component with inline SVG, wired by the frontmatter chart key. Match the existing components' style.
- Exhibit prose is never altered during build. Schema mismatches get flagged, not silently fixed.
- Publishing is always gated by a human. Nothing auto-deploys.
