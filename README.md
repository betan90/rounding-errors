# Rounding Errors

**Live:** [betan90.github.io/rounding-errors](https://betan90.github.io/rounding-errors/)

A museum of statistical discrepancies. One country per exhibit. The recurring question is always the same: whose number do you believe, and can you prove it?

**Exhibit 001 — Ireland.** The economy that grew 26% while everyone was at lunch, and the second economy Ireland had to invent to explain the first.

## Method

Every figure is checked against a primary source (statistics offices, central banks, official forecasts) before it goes up. Sources are listed at the bottom of each exhibit. Where a number has been revised across releases, that instability is treated as content, not error, because it usually is the story.

Built openly with AI: the research sweeps, data extraction, and first drafts are done with Claude. The editorial voice, the opinions, and any surviving mistakes are mine. No newsroom, no funding, no agenda beyond finding the funny in a footnote.

## Build

Astro static site, deployed to GitHub Pages via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`). Each exhibit is a markdown content entry under `src/content/exhibits/`, with structured data (the ledger, verdict scoreboard, sources) in frontmatter and the narrative prose as the body. Charts are hand-built inline SVG, no charting library.

```
npm install
npm run dev       # local dev server
npm run build     # static build to dist/
npm run preview   # preview the production build
```

## Status

- [x] Exhibit 001 — Ireland (live)
- [x] Exhibit 002 — Argentina (the IMF's only censure for statistics)
- [x] Exhibit 003 — China (thirty-one provinces vs. the national GDP total)
- [ ] Revision tracker — the same official number, as reported over time
