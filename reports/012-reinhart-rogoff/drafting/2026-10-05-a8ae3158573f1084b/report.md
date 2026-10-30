I drafted exhibit 012, but I wrote it to the repo root, not to the path you asked for. Body word count is about 430 (counted by hand, not by a tool), under the 500 cap. The category is a new one that CLAUDE.md doesn't list yet.

**File:** C:\Users\betan\OneDrive\Desktop\rounding-errors\exhibit-012-reinhart-rogoff.md

**Path:** you asked for src/content/exhibits/012-reinhart-rogoff.md. My drafter instructions say to write the draft to the repo root as exhibit-NNN-slug.md and not to touch src/content/, so I followed those. Moving it in is a single file move. I also left a stray placeholder file, scratchpad\012\noop.txt, which can be deleted.

**Summary of choices:**
1. **Category: "the weighting did the work"** (new; CLAUDE.md's category vocabulary needs it added). I did not use your example "the spreadsheet did the work" because it points at the wrong cause. In HAP's numbers, the dropped years plus equal weighting of countries account for 1.9 points; the spreadsheet and transcription errors account for 0.4. The title, "The spreadsheet error was the small one", sets that up, and the body and verdictNote deliver it. It follows the pattern of 008's "the baseline did the work".
2. **Tags:** gdp, outlived-the-evidence, measurement-definitions. All three are already in use. `country: "20 advanced economies"`, following 010's precedent.
3. **Chart:** there is no chartNote, as you asked. The chart component (HAP Table 3, published vs corrected, 4 buckets) and its line in ExhibitLayout.astro still need building. The ledger shows only the 60 to 90% and 90%+ rows, with `gap: true` on HAP's 2.2%.
4. **Format:** frontmatter copies the shape of 011 and 008 key for key; I found no mismatch with CLAUDE.md. The body has only The incident, Who lied and The fix. The verdict has exactly 3 rows. Every count is a numeral except inside direct quotes ("one percent", "first five countries", "two and a half"). There are no em dashes.
5. **Attribution:** Ryan appears only as HAP reported him, and the disclosure says so. "Who lied" opens "Nobody, on the record." The verdicts rest on HAP's own words (coding errors, selective exclusion, unconventional weighting) and on the erratum's concession. The erratum's postwar figures (mean 0.3%, median 1.9%) are labelled as the authors' own correction.

**Facts I wanted but left out:**
- HAP's own line that the spreadsheet error "compounded with other errors" caused a -0.3 point error (p.4). Using it next to the -0.4 from p.10 would put 2 different spreadsheet-error totals in one exhibit, so I used only the -0.4 that you listed.
- The 4.1/4.2 and 2.8/3.1 rows for the lower debt buckets. They're cut from the ledger to keep it to 4 rows, but the HAP source entry lists them and the chart will show them.
- The US's 4 years at -2.0%, the 25 dropped Belgian years, and the erratum's 0.0 figure from blank-cell clean-up alone. All three are verified; I dropped them for space.
- The erratum's corrected postwar mean for the 60 to 90% bucket (2.5%), to avoid putting a third pair of figures in front of the reader.
- I also cut "from the authors' own spreadsheet" from "HAP recalculated the table", because where HAP got the spreadsheet isn't among the verified facts.
- One figure in the verdictNote is my own comparison, not a quoted pair: 1 year of New Zealand weighed the same as Britain's 19 years. It follows from HAP's description of equal country weighting, but the fact-checker should look at it.
