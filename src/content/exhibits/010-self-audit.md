---
title: "9 exhibits, 127 figures, 3 of them wrong"
exhibit: "010"
country: "This museum"
status: "open; the audit reruns with every exhibit"
category: "the citations were somewhere else"
tags: ["self-audit"]
date: 2026-10-04
teaser: "Self-audit · the museum's published figures against its own fact-check reports"
ledgerTitle: "The numbers: 127 claim checks across exhibits 001 to 009"
ledger:
  - label: "Claims checked"
    value: "127"
  - label: "Fully supported by the exhibit's own cited sources"
    value: "84"
  - label: "Not fully supported"
    value: "43"
    gap: true
  - label: "Wrong on the facts"
    value: "3"
ledgerNote: "The 3 were 2 dates in exhibit 003 and 1 attribution in 007, all since fixed. Of the remaining 40, 16 were cited sources the fact-checker could not retrieve at all, 8 were figures that were true and cited to nothing in the exhibit's own source list, and 1 was a published URL that returned 404."
verdict:
  - key: "Fraud detected"
    value: "none."
  - key: "Rules broken"
    value: "1 of this museum's own. Every figure must trace to a source listed in the exhibit; 8 did not."
    long: true
  - key: "Usefulness of the headline figure"
    value: "84 of 127 cleared on the first pass, and all 3 outright errors were in a date or an attribution rather than an amount."
    long: true
verdictNote: "9 exhibits in, this museum's own scoreboard records fraud twice: Argentina's IMF censure and Liaoning's party disciplinary ruling. The other 7 cases were definitions, base years, baselines, and nobody asking for the source. The tenth case is the museum. Its arithmetic held, 3 errors in 127 claims, none of them in an amount. Its paper trail did not: 16 citations could not be retrieved and 8 led nowhere at all. An institution that asks other institutions to produce their sources is subject to the same request, and on the first pass this one could satisfy it 84 times out of 127. The reports are in the repository and they are dated, which is the only reason this exhibit can quote a figure at itself."
sources:
  - name: "Rounding Errors repository, reports/001-ireland through reports/009-nigeria"
    text: "The 9 fact-check-output.json files: 127 claim checks, verdicts 84 SUPPORTED, 29 PARTIALLY SUPPORTED, 14 NOT SUPPORTED, counted by parsing the files directly. checkedAt timestamps are 2026-08-01 for exhibits 001 to 007, 2026-08-12 for 008 and 009. Individual findings quoted in the body: exhibit 001 claims 4 to 10 (true, but untraceable to any source the exhibit listed) and claim 19 (a published URL returning 404), exhibit 002 claim 7, exhibit 003 claims 9 and 10 (admissions dated January 2018, not within weeks of January 2017), exhibit 007 claim 11 (the Surgeon General attribution, against a documented 2015 initiative)."
  - name: "Rounding Errors repository, reports/*/second-opinion.json"
    text: "The DeepSeek verdicts on the same 127 claims, used here only to establish that every claim was reviewed twice. Where the 2 reviewers disagree is the subject of note 001 and is not reopened here."
  - name: "Rounding Errors repository, src/data/corrections.ts"
    text: "When this exhibit was published on 2026-10-04, the log held 1 entry: exhibit 006, dated 2026-07-25, a finding attributed to GAO-03-172R that the report does not contain, traced to an uncited Wikipedia sentence and caught by the fact-checker's criterion 6 hostile read. Exhibit 003 had also been corrected, in commit f0c49f4 on 2026-08-03, and had no entry until 2026-10-05. The body counts both."
  - name: "Rounding Errors repository, commit f0c49f4"
    text: "\"Fix fact-checker findings across exhibits 001, 003, 004, 007.\" The fixes were applied after the archived reports were written, which is why 43 describes first drafts and not the current text."
  - name: "Rounding Errors repository, src/content/exhibits/001-ireland.md through 009-nigeria.md"
    text: "The 9 verdict blocks. \"Fraud detected\" records a finding in 002 (Argentina, no longer disputed by Argentina's own later government) and 003 (Liaoning, confessed on the provincial record and punished by China's party disciplinary body), and records none in the other 7."
correctionNote: "This exhibit was corrected on 2026-10-05 and again on 2026-10-10. Details on the corrections page."
disclosure: "This entry was drafted with AI (Claude did the counting and the first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the primary source, which in this exhibit means the repository's own tracked files rather than an outside institution: the counts come from parsing reports/*/fact-check-output.json and reports/*/second-opinion.json directly, not from recollection of what they said. 1 limitation is load-bearing and is stated in the body. Those reports are dated 2026-08-01 and 2026-08-12, several findings were fixed afterwards, so 43 is a first-draft count and this exhibit makes no claim about the error rate of the text currently on the site."
---

## The incident

This museum has published 9 exhibits about institutions whose numbers disagreed with each other. Every exhibit was checked before publishing: a fact-checker pass against each cited source, then a second reviewer on the same claims, with both verdict sets archived under `reports/`. Across exhibits 001 to 009 that comes to 127 individual claim checks.

84 came back fully supported. 43 did not.

3 of the 43 were wrong on the facts. Exhibit 003 said 2 Chinese provincial admissions followed Liaoning's January 2017 confession within weeks, when both came in January 2018. Exhibit 007 credited the American promotion of the 10,000-step figure to a Surgeon General in the 1990s, and the only documented Surgeon General walking initiative dates to 2015. Both have been fixed.

The other 40 were not arithmetic.

## Who lied

Nobody, and the gap was in the filing rather than the counting.

8 claims were true, independently verifiable, and cited to nothing in the exhibit's own source list. Exhibit 001 held 7 of them. 1 published source URL returned 404. 16 further claims were marked partially supported because the cited source could not be retrieved at all, returning 403, 503, a paywall, a corrupted file, or in 1 case carrying no URL to try, and were confirmed by search corroboration instead of a quoted passage.

A reader who followed a citation to the end would have failed to reach the source 16 times, and would have found nothing at all behind 8 claims that happened to be correct.

## The bit continues

2 exhibits have been corrected since publishing. Exhibit 006 attributed a finding to a 2003 GAO report that does not contain it. The claim traced to an uncited sentence on Wikipedia, which the exhibit's own source list had already routed it through, and the fact-checker caught it on a hostile read. Exhibit 003 placed 2 provincial admissions "within weeks" of Liaoning's, when its own source dated them about a year later.

The reports have a vintage problem of their own. 7 were written on 2026-08-01 and 2 on 2026-08-12, and findings in exhibits 001, 003, 004 and 007 were fixed in commit f0c49f4 after the fact. So 43 counts first-draft claims, not the text on the site today. Measuring the current exhibits against the August reports would mean splicing 2 vintages, which is the exact error exhibit 003 declined to put in a chart.
