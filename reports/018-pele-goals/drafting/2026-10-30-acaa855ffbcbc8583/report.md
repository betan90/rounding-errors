I've written exhibit 018 to the repo root, but I couldn't run `node scripts/check-house-rules.mjs exhibit-018-pele-goals.md`: I have no shell tool in this run. If the PostToolUse hook ran on my 2 writes, it showed me nothing. Please run the checker before building. The only warning you should expect is the chart rule, because the chart isn't wired yet.

**Path:** C:\Users\betan\OneDrive\Desktop\rounding-errors\exhibit-018-pele-goals.md

**Title:** "1,279 goals on the record page, 1,283 in the obituary"

**Word count:** I counted the body by hand at about 487 words, headings included, so it is under 500 but close. The checker may split tokens like "1-2" or "nº" differently. If it goes over, cut the FIFA "65,000" sentence first (17 words).

**Frontmatter:** copied from 015: same keys and nesting, the same category, date 2026-10-30, no `chartNote`. The ledger has 8 rows and 1 `gap: true`. The verdict has 3 rows: `Fraud detected`, `Rules broken`, `Usefulness of the headline figure`. There are 14 sources: the 2 Guinness pages, CONMEBOL, the 4 FIFA pages, the 2 FC Barcelona pages, Santos, Gazeta Esportiva, the 2 RSSSF pages and Lei 14.909. The Santos source uses the club's original URL, and its `urlLabel` and text say it was read through Gazeta Esportiva's reproduction. The disclosure has the 3 required statements, plus that note, a line saying the translations from Portuguese are this site's, and a line saying the 1,000 days touring is Santos's own figure. No Wikipedia anywhere.

**Judgment calls:**
1. **Gap row:** I gave it to Guinness's 1,279 against its own 1,283, for the same dates. It is the purest form of the shape. Santos's 1,091 has its own row, with the arithmetic in the value: "643 + 448 = 1,091".
2. **RSSSF's 2 pages:** they disagree on Santos (643 / 1,089 against 644 / 1,093). That went into the ledgerNote, naming each page, and is cut from the body to save words. No sentence mixes the 2 pages' figures.
3. **Portuguese quotes:** each one is in Portuguese with the brief's translation in parentheses beside it. Santos's description of the friendlies (official kits, official rules, a match report) and the more than 1,000 days touring are paraphrased without quotation marks and attributed to the club. Pelé's congratulations are partly paraphrased, with only the Portuguese clause in quotation marks, and are attributed to the statement that quotes them.
4. **Assophis:** the body says the statement was signed by Fernando Ribeiro of Assophis, "an association of Santos historians". I took that wording from Gazeta Esportiva's introduction, and the Gazeta source carries its full sentence verbatim.
5. **The traps:**
   - FIFA's career figure appears only as "1,000-plus", and its 643 in 659 is dated to the 1 January 2020 table.
   - Guinness's "special appearances" appears only as its own verbatim sentence, and nowhere do I say Guinness counts friendlies.
   - The 1959 figures each carry their scope: Guinness's is stated as unstated, FIFA's is "for Santos", RSSSF's is all matches for all teams.
   - RSSSF's official count is described as including army and regional selections.
6. **Verdict wording:** "Rules broken" says "none identified", not "there is no rule", because the brief cut FIFA's "no official list" as press-only. The verdictNote says Guinness's record page does not state its scope, not that Guinness defines nothing anywhere. It ends on the RSSSF 8th-place line.
7. **Teaser format:** I used "Football ·", following the domain-prefix pattern in 015 and 017.

**Excluded:** everything in the CUT section (757, 767, 769, 1,284, FIFA 1,281, the CBF figures, the 37 games), and the 2013 Guinness certificate line, for word count. FIFA's "with 12 minutes remaining" is also out, because the sentence it comes from continues past what the brief verified.
