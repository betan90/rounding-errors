I've written the draft for exhibit 019, and the house-rules hook raised nothing blocking on the final version.

**Path:** C:\Users\betan\OneDrive\Desktop\rounding-errors\exhibit-019-japan-wage-survey.md

**Title:** "A full count of 1,464 establishments, taken from 491"

**Word count and checks:** I had no shell in this run, so I could not run `node scripts/check-house-rules.mjs` myself; please run it once by hand. The PostToolUse hook ran it on each Write. The first draft failed it at 510 body words. On the rewrite it reported no blocking violation, so the body is now at or under 500, about 495 by my count. It printed no warnings either. That includes the chart-wiring warning you expected, which I can't explain.

**The five-line summary:**
1. **Category:** "the census was a sample", which is new as you specified. It is flat, and the body supplies the twist. Country is Japan and tags are ["asia"] only.
2. **Chart:** none drawn, and there is no `chartNote`. The site-builder needs to build the chart of the monthly regular-pay gap from 2012 to October 2018, marking January 2018. The fact sheet source says its Attachment 1 supports the chart.
3. **Who lied:** answered only through the record. The first report found a breach of Articles 9 and 11 but no Article 60 act. The supplementary report found false statements made knowingly in 2015 and 2016, and no organised concealment as it defined it. The only Japanese quotes are 真実に反することを認識しながら and 極めて遺憾, each with the brief's translation beside it. Everything else is paraphrased without quotation marks.
4. **Ledger and verdict:** the ledger has 9 rows, with `gap: true` only on 1,464 / 491. The verdict rows are Fraud detected, Rules broken and Usefulness of the headline figure.
5. **Left out, and why:**
   - The 3.3% June 2018 figure, and the June 2018 release it comes from: it's a trap and not needed.
   - All benefit lines except employment insurance, and any combined total: MHLW publishes no total, and the `ledgerNote` says so and that the 19 million are person-cases.
   - Everything in the CUT section.
   - The minister's voluntary salary return: no room.
   - The residual 0.3 to 0.4% gap in 2018: the brief says not to explain it.

**Judgment calls to check:**
- **The 16 former officials.** The brief says 1 of the 16 was on secondment and would be disciplined on return. So I did not write "16 had already left", and the ledger label says "serving / former". The body says those who had retired could not be disciplined, so those judged to deserve a pay cut were asked to return the money voluntarily. Your suggested line ("16 of the 22 had already left") would have been slightly wrong for that 1 person.
- **Who was reprimanded.** I dropped a draft line calling the administrative vice-minister "the most senior" reprimanded. The brief lists 2 vice-ministers reprimanded, so ranking them was my inference.
- **The 2018 break.** The body puts "From January 2018 the tabulation reweighted Tokyo. It was not announced." next to MIC noticing a break between 2017 and 2018, without saying one caused the other. The fact sheet does not state the cause.
- **The 1 official.** I left out the first report's "no intent to conceal" finding about 1 official, to stay under 500 words. The organised-concealment finding covers the point.
- **The verdict note.** It closes on the Statistics Commission's first demand (do the full count of Tokyo's 500+ establishments as soon as possible), then the unannounced January 2018 reweighting, then the June 2019 apology, paraphrased. The apology's Japanese text is in that source's entry.
- **Sources.** There are 8. The 5 MHLW and inspection-committee documents from 2019 use Wayback URLs, and each entry says the original now returns 404. The 2019 fact sheet is linked as its archived PDF, and the dead original page URL is named in the source text. The disclosure covers AI drafting, my translations, and the Wayback reading.

**Schema:** the frontmatter keys, nesting and types match 015 and 011; I found no mismatch between CLAUDE.md and the live files. `date` is 2026-11-03. Nothing was written to `src/content/` and nothing was committed.
