# Rounding Errors

**Live:** [betan90.github.io/rounding-errors](https://betan90.github.io/rounding-errors/)

A museum of statistical discrepancies. One country per exhibit. The recurring question is always the same: whose number do you believe, and can you prove it?

**Exhibit 001 — Ireland.** The economy that grew 26% while everyone was at lunch, and the second economy Ireland had to invent to explain the first.

## Method

Every figure is checked against a primary source (statistics offices, central banks, official forecasts) before it goes up. Sources are listed at the bottom of each exhibit. Where a number has been revised across releases, that instability is treated as content, not error, because it usually is the story.

Built openly with AI: the research sweeps, data extraction, and first drafts are done with Claude. The editorial voice, the opinions, and any surviving mistakes are mine. No newsroom, no funding, no agenda beyond finding the funny in a footnote.

## Build

Static site, no framework, no build step. Each exhibit is a single self-contained HTML file with an inline SVG chart, so it hosts anywhere (currently Cloudflare Pages) and loads on a phone. Data lives in a small array at the bottom of each page; sources are linked inline.

## Status

- [x] Exhibit 001 — Ireland (live)
- [ ] Exhibit 002 — Argentina (the IMF's only censure for statistics)
- [ ] Exhibit 003 — the trade-data mirror problem (nobody's exports match anybody's imports)
- [ ] Revision tracker — the same official number, as reported over time
