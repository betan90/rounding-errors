---
title: "9 exhibits, 127 figures, 2 of them wrong"
exhibit: "010"
country: "This museum"
status: "open; counted once, across exhibits 001 to 009"
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
    value: "2"
ledgerNote: "The 2 were 2 dates in exhibit 003, both since fixed. Of the remaining 41, 16 were cited sources the fact-checker could not retrieve, most of them 403 responses that turn away scripts rather than readers, 8 had no support in the exhibit's own source list, and 1 was a published URL that returned 404."
verdict:
  - key: "Fraud detected"
    value: "none."
  - key: "Rules broken"
    value: "1 of this museum's own. Every figure must trace to a source listed in the exhibit; at least 8 did not."
    long: true
  - key: "Usefulness of the headline figure"
    value: "84 of 127 cleared on the first pass, and both outright errors were dates rather than amounts."
    long: true
verdictNote: "9 exhibits in, this museum's own scoreboard records fraud twice: Argentina's IMF censure and Liaoning's party disciplinary ruling. The other 7 cases were definitions, base years, baselines, and nobody asking for the source. The tenth case is the museum. Its arithmetic held, 2 errors in 127 claims, none of them in an amount. Its paper trail did not: 16 citations could not be retrieved by its own fact-checker and 8 led nowhere at all. An institution that asks other institutions to produce their sources is subject to the same request, and on the first pass this one could satisfy it 84 times out of 127. The reports are in the repository and they are dated, which is the only reason this exhibit can quote a figure at itself."
sources:
  - name: "Rounding Errors repository, reports/001-ireland through reports/009-nigeria"
    text: "The 9 fact-check-output.json files: 127 claim checks, verdicts 84 SUPPORTED, 29 PARTIALLY SUPPORTED, 14 NOT SUPPORTED, counted by parsing the files directly. checkedAt timestamps are 2026-08-01 for exhibits 001 to 007, 2026-08-12 for 008 and 009. Individual findings quoted in the body: exhibit 001 claims 4 to 10 (no support in any source the exhibit listed; 6 of the 8 such claims verified true by search, 001 claim 8 and 002 claim 7 only plausible) and claim 19 (a published URL returning 404), exhibit 002 claim 7, exhibit 003 claims 9 and 10 (admissions dated January 2018, not within weeks of January 2017), exhibit 007 claim 11 (a Surgeon General attribution with no named source, not supported in August and later sourced in 007 to C. Everett Koop's Shape Up America!, founded 1994). Most retrieval failures are recorded as 403 responses to the fetch tool; report 009 treats such pages as \"presumed accessible to human readers\"."
  - name: "Rounding Errors repository, reports/*/second-opinion.json"
    text: "The DeepSeek verdicts on the same 127 claims, used here only to establish that every claim was reviewed twice. The reviewer was added in commit 23984b4 on 2026-08-01. Where the 2 reviewers disagree is the subject of note 001 and is not reopened here."
  - name: "Rounding Errors repository, git history of src/content/exhibits/"
    text: "First commits: exhibits 001 to 003 on 2026-07-12, 004 on 2026-07-13, 005 on 2026-07-17, 006 on 2026-07-25, 007 on 2026-08-01, 008 and 009 on 2026-08-12. The archived checks for 001 to 006 are dated after those days."
  - name: "Rounding Errors repository, src/data/corrections.ts"
    text: "When this exhibit was published on 2026-10-04, the log held 1 entry: exhibit 006, dated 2026-07-25, a finding attributed to GAO-03-172R that the report does not contain, traced to an uncited Wikipedia sentence and caught by the fact-checker's criterion 6 hostile read. Exhibit 003 had also been corrected, in commit f0c49f4 on 2026-08-03, and had no entry until 2026-10-05. Exhibits 001 and 007 have entries from 2026-11-05."
  - name: "Rounding Errors repository, commit f0c49f4"
    text: "\"Fix fact-checker findings across exhibits 001, 003, 004, 007.\" The fixes were applied after the archived reports were written, which is why 43 describes the text as it stood in August and not the current text."
  - name: "Rounding Errors repository, src/content/exhibits/001-ireland.md through 009-nigeria.md"
    text: "The 9 verdict blocks. \"Fraud detected\" records a finding in 002 (Argentina, no longer disputed by Argentina's own later government) and 003 (Liaoning, confessed on the provincial record and punished by China's party disciplinary body), and records none in the other 7."
correctionNote: "This exhibit was corrected on 2026-10-05, 2026-10-10 and 2026-11-05. Details on the corrections page."
disclosure: "This entry was drafted with AI (Claude did the counting and the first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the primary source, which in this exhibit means the repository's own tracked files rather than an outside institution: the counts come from parsing reports/*/fact-check-output.json and reports/*/second-opinion.json directly, not from recollection of what they said. 1 limitation is load-bearing and is stated in the body. Those reports are dated 2026-08-01 and 2026-08-12, several findings were fixed afterwards, so 43 is a count of the text as it stood in August and this exhibit makes no claim about the error rate of the text currently on the site."
---

## The incident

This museum has published 9 exhibits about institutions whose numbers disagreed with each other. Every exhibit has been checked: a fact-checker pass against each cited source, then a second reviewer on the same claims, with both verdict sets archived under `reports/`. For exhibits 001 to 006 the archived checks came after publishing, on 2026-08-01. Across exhibits 001 to 009 that comes to 127 individual claim checks.

84 came back fully supported. 43 did not.

2 of the 43 were wrong on the facts, both in exhibit 003. It said 2 Chinese provincial admissions followed Liaoning's January 2017 confession within weeks, when both came in January 2018. Both have been fixed.

The other 41 were not arithmetic.

## Who lied

Nobody, and the gap was in the filing rather than the counting.

8 claims had no support in the exhibit's own source list. Exhibit 001 held 7 of them. 6 were confirmed true elsewhere and 2 only plausible. 1 of the 2, that Eurostat signed off on Ireland's revision, has since been narrowed to what Eurostat said: "plausible". 1 published source URL returned 404. 16 further claims were marked partially supported because the fact-checker could not retrieve the cited source, most often a 403 that turns away scripts rather than readers, and were confirmed by search corroboration instead of a quoted passage.

A reader who followed every citation would have found nothing behind 8 claims, 6 of which happened to be correct.

## The bit continues

Of exhibits 001 to 009, 4 have entries on the corrections page. Exhibit 006 attributed a finding to a 2003 GAO report that does not contain it. The claim traced to an uncited sentence on Wikipedia, which the exhibit's own source list had already routed it through, and the fact-checker caught it on a hostile read. Exhibit 003 placed 2 provincial admissions "within weeks" of Liaoning's, when its own source dated them about a year later. Exhibit 001 overstated Eurostat's sign-off. Exhibit 007 credited its 1965 pedometer to the wrong source.

The reports have a vintage problem of their own. 7 were written on 2026-08-01 and 2 on 2026-08-12, and findings in exhibits 001, 003, 004 and 007 were fixed in commit f0c49f4 after the fact. So 43 counts the text as it stood in August, not the text on the site today. Measuring the current exhibits against the August reports would mean splicing 2 vintages, which is the exact error exhibit 003 declined to put in a chart.
