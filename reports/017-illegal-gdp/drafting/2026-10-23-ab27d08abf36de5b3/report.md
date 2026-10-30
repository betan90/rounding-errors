I've drafted exhibit 017 at the repo root, but I couldn't run `node scripts/check-house-rules.mjs`: this session has only Read, Write, Glob and Grep, with no shell. No hook output came back after either Write, so the PostToolUse check is unconfirmed too. Please run the script before the site-builder takes the file.

**Path:** C:\Users\betan\OneDrive\Desktop\rounding-errors\exhibit-017-illegal-gdp.md

**Title:** "c. 58,000 prostitutes, minus 12 weeks' holiday"

**Word count:** about 470 by hand, using the script's method (`bodyWordCount`: split on whitespace, headings excluded). That leaves roughly 30 words under the 500 limit. The body has 3 sections: The incident, Who lied ("Nobody."), The bit continues.

**Checked by hand against the rules:**
- No em dashes. The Patterson en-dash quote ("some 4%") is not used.
- All counts are numerals; "twice" is the only count word.
- No chartNote, since the chart is wired separately. The chart rule should only warn in hook mode.
- Exactly 1 ledger row has `gap: true`: "Prostitution spending, 2010: ONS FOI reply / series MNC8 today", £5.6bn / £4,370m.
- Exactly 3 verdict rows: Fraud detected, Rules broken, Usefulness of the headline figure.
- Frontmatter keys, nesting and types match 015 and 016.
- `date: 2026-10-23`.
- All 3 required disclosure statements are there, plus the mirror note.

**Five-line summary of choices:**
1. **Category:** "the assumptions were the data". It describes the shape of the gap, not a moral verdict, so it fits the vocabulary rules. It is new, so CLAUDE.md's category list needs "(017)" added at build time; I did not touch CLAUDE.md.
2. **Tags and country:** tags are gdp, national-accounts, measurement-definitions, europe, all already in the vocabulary. Country is "United Kingdom".
3. **Chart:** yes, built by the site-builder, so no chartNote. The ledgerNote and verdictNote both say MNC8 is modelled, not observed. The verdictNote also notes the series starts in 1985, 29 years before the first estimate was published, and says "The chart above plots it."
4. **Excluded:**
   - Everything in the CUT list, including any cause for the 2020 fall (numbers only).
   - The "125 per year on clothes" figure, because the currency was not confirmed.
   - The diluted-alcohol analogy and Patterson's £18bn R&D and £50bn lines, to stay under the word limit.
   - Wikipedia appears only as what ONS's footnote 12 points to. There is no Wikipedia URL anywhere.
5. **Attribution:**
   - Nobody lied; ONS's own labels ("weak", "controversial", "arbitrary", "probably false") carry the verdicts.
   - The body says the rule was not new and quotes the ESA95-to-ESA10 "no changes" footnote, so it doesn't say ESA 2010 introduced it.
   - Abramsky and Drew appear only as the authors; Patterson is reported as writing on the blog.
   - The £5.6bn vs £4,370m pair is given as 2 published figures, with "ONS does not attribute the difference." The 78% vs 40-of-52-weeks comparison is labelled "This site's arithmetic" in the body and the disclosure.

**Other judgment calls:**
- **FOI date:** I left out the "6 Nov 2015" date because the brief said to confirm it on the page and I couldn't. The body says "An ONS freedom of information reply" and makes no claim about whether it came before or after the 2016 holiday change. The fact-checker should confirm the date and can add it.
- **Clients per week:** shown as "20, 25 and 30", with no claim about which was used.
- **Eaves estimate:** given as "about 7,000" (the source says "approx 7000").
- **Third verdict row:** "Required for comparability regardless", based on Patterson's "legally mandated" and his comparability quote.
- **Teaser format** follows 015/016: "National accounts · …".
