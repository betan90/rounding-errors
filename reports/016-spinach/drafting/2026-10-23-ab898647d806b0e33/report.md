I've written exhibit 016 to the repo root as `C:\Users\betan\OneDrive\Desktop\rounding-errors\exhibit-016-spinach.md`. The body is about 441 words by hand count, under the 500 limit and with no em dashes. I didn't see any output from the house-rules hook when I wrote the file, so it is unconfirmed: run `node scripts/check-house-rules.mjs exhibit-016-spinach.md` before building.

I copied the frontmatter shape from the live 013 and 015 files and found no mismatch with the CLAUDE.md template. The ledger has exactly 1 `gap: true` row, the verdict has exactly the 3 required rows, and there is a `chartNote` with no "pending" and no trailing period. `date` is 2026-10-23.

Five-line summary:
1. **Category and country:** the category is "citation needed" (taxonomy item 3, also used by 013). Country is "United Kingdom", as the brief recommends. The title is "A misplaced decimal point, location unknown".
2. **Tags:** outlived-the-evidence, measurement-definitions (the fresh vs dried spinach angle) and europe. All are live tags, so nothing new.
3. **Chart:** none. The `chartNote` says the original 19th-century measurement has not been traced to a primary document, so there is no original and corrected pair to plot. It adds that the fresh and dried iron figures measure different things and can't stand in for that pair.
4. **Ledger:** the gap row is "Original erroneous measurement located (Sutton 2010, Rekdal 2014): 0". The other rows are Bender's hedge, Hamblin's 0 / 13 citations, the 3 competing years, raw iron (USDA 2.71 mg), dried iron (Jackson 1938 via Sutton, 44.8 mg) and Popeye's 3 July 1932 reason, vitamin A. The `ledgerNote` says the 2 iron rows are not the same quantity.
5. **Excluded:** everything in the brief's CUT section, which includes any original von Wolff figure, Schupan, Kohler, the blog, Reader's Digest, the 33% figure, Dagg, and any BMJ correction. I also left out Coultate's "not picked up until 1937" line, because it leans on the unverified 1937 reanalysis.

Judgment calls:
- **Attribution:** Sections are "The incident", "Who lied" and "The bit continues". "Who lied" opens with "Nobody, on the record available." Bender and Kronick are shown hedging, and Hamblin's version is described as one that "dropped the hedge". The narrator never says he invented it. The email is reported entirely through Sutton ("Sutton reports that Hamblin...").
- **Verdict:** Rekdal's "opposite of what they are preaching" line opens the `verdictNote`. It is followed by 1 comparison line to 013: "Exhibit 013's rule had a candidate origin and no study. This one has a study, of the citations, and no origin."
- **Names:** Sutton appears by surname and title only (Reader in Criminology, Nottingham Trent University). The brief gives only his initial, so I added no first name; Bender likewise has no first name.
- **Spellings:** Sutton's question spells it "von Wolff" and Coultate's version, as Sutton quotes it, spells it "von Wolf". Both are kept as each source has them.
- **Second-hand quotes:** Bender, Kronick and Larsson are quoted as Rekdal reproduces them, and Coultate and Jackson as Sutton reproduces them. The disclosure says so. Larsson is not a separate source entry, because the brief has no URL for it; he is covered inside the Rekdal entry.
- **Sources:** 4 entries: the Hamblin BMJ PDF (with the PMC record mentioned in the text), the Sutton mirror PDF (the text says it is a mirror of the Internet Journal of Criminology paper), Rekdal on PMC, and USDA FoodData Central.
- **Link check:** the USDA URL returns a 301 redirect according to the brief. That will be a warning from `check-links`, not a block.
- **Usefulness row:** reads "none as a measurement, since no one has found it. Considerable as a teaching example, though not of the error it describes." It is meant literally, not as a wink, but it's the line most worth a human read for tone.

I did not touch `src/content/`, build or commit.
