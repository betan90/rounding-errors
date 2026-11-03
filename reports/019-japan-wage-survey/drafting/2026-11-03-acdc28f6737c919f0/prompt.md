Draft exhibit 019 from the verified research brief at:
C:\Users\betan\AppData\Local\Temp\claude\C--Users-betan-OneDrive-Desktop-rounding-errors\a8afdc71-b029-45b2-9443-7432c41f1046\scratchpad\exhibit-019-brief.md

Write it to the repo root as exhibit-019-japan-wage-survey.md. Read CLAUDE.md first and follow it exactly; match the frontmatter shape of a recent live exhibit with a chart (src/content/exhibits/015-police-recorded-crime.md).

Constraints:
- Use only the VERIFIED facts in the brief; nothing from the CUT section. Japanese quotes: quote the Japanese with the brief's translation beside it, or paraphrase without quotation marks. Never present a translation as a verbatim quote.
- date: 2026-11-03. This exhibit HAS a chart (the monthly gap between re-tabulated and published regular pay, 2012 to October 2018), built separately by the site-builder, so: no chartNote.
- Category: new, "the census was a sample". Tags: ["asia"]. Country: Japan.
- Voice: tight deadpan, terminally serious. The literal lines are the funny ones: 1,464 planned, 491 surveyed; a fix applied in January 2018 that nobody announced, noticed by another ministry as a break in the series; MHLW had already told Kanagawa, Aichi and Osaka they were next; 16 of the 22 officials disciplined had already left and were asked to return the money voluntarily; about 1,400 yen per person across about 19 million cases. Do not wink. No em dashes. Numerals for all counts. Body max 500 words: ## The incident, ## Who lied, ## The fix (full count resumed with the June 2019 release; re-tabulated values from 2012; benefit top-ups).
- Attribution: the narrator never says MHLW lied. "Who lied" is answered only by the institutional record: the inspection committee's supplementary report found false statements made knowingly in public settings (the 2015 study group, the 2016 plan-change application), and found no organised concealment as it defined it; the first report found a breach of Articles 9 and 11 of the Statistics Act but no intentional falsification under Article 60. Report these as the committee's findings. Roles, never names.
- Traps: the 19 million are person-cases (延べ), not people; do not present a summed total as MHLW's; do not tie the 3.3% June 2018 figure to the reweighting; the gap in the chart data is for regular pay (きまって支給する給与), not total earnings; the 0.6% is an average of the re-tabulated vs published gap.
- Exactly 1 ledger row with gap: true (the 1,464 vs 491). Verdict: exactly 3 rows: Fraud detected, Rules broken, Usefulness of the headline figure.
- Sources: each primary in the brief, with the URL given there (Wayback URLs for MHLW pages that are now 404, saying so in the text). Never Wikipedia.
- Disclosure: drafted with AI (Claude), editorial voice and errors are the author's, every figure checked against the linked primary source; note the Japanese sources were read in Japanese and the translations are the author's, and that MHLW's 2019 pages were read from the Wayback Machine because MHLW has taken them down.

Run node scripts/check-house-rules.mjs exhibit-019-japan-wage-survey.md after writing (the chart rule will warn because the chart isn't wired yet; that's expected). Report: path, word count, the title, and judgment calls.
