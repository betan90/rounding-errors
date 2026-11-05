// Plain data module, not a content collection. Deliberately outside
// src/content/exhibits/ so it structurally cannot surface via
// getCollection('exhibits') on the homepage feed, country pages, or
// tag pages. Rendered only by src/pages/corrections.astro.

// Each entry names either an exhibit or a note (its 3-digit number), never both.
export interface Correction {
  exhibit?: string;
  note?: string;
  dateCorrected: Date;
  whatItSaid: string;
  whatWasWrong: string;
  howItGotHere: string;
  whatItSaysNow: string;
  caughtBy: string;
}

export const corrections: Correction[] = [
  {
    exhibit: '007',
    dateCorrected: new Date('2026-11-05'),
    whatItSaid:
      "The CBC source entry read: 'walking-behaviour researcher Catrine Tudor-Locke (University of Massachusetts Amherst), on the Manpo-kei origin: 1965, Yamasa Tokei Keiki, a brand name and slogan rather than a tested health threshold.'",
    whatWasWrong:
      "The CBC page does not give 1965 or name Yamasa Tokei Keiki. It says a Japanese company produced the manpo-kei 'at the time of the 1964 Olympics in Tokyo', released with a slogan. The body's facts are right: Popular Science, already in the exhibit's source list, says 'In 1965, Yamasa Tokei Keiki, a Japanese clock and instrument company, released the first consumer pedometer', dubbed the Manpo-kei. The source entry credited them to the wrong source.",
    howItGotHere:
      "The 2026-08-01 fact-check could not fetch the CBC page (403) and marked the claim partially supported on search corroboration from other outlets. Nobody went back to the cited page once it could be read.",
    whatItSaysNow:
      "The CBC entry carries what CBC says: the manpo-kei, released with a slogan at the time of the 1964 Tokyo Olympics, not based in science. The Popular Science entry carries 1965, Yamasa Tokei Keiki and the Manpo-kei, quoted.",
    caughtBy:
      'Checking that the CBC link, which now redirects, still reaches the same article, during the fixes for the repo-wide consistency audit of 2026-11-04 (finding 13). The article was the same; its text did not carry the facts credited to it.',
  },
  {
    exhibit: '010',
    dateCorrected: new Date('2026-11-05'),
    whatItSaid:
      "The title: '9 exhibits, 127 figures, 3 of them wrong'. The body: 'Every exhibit was checked before publishing'; 'Exhibit 007 credited the American promotion of the 10,000-step figure to a Surgeon General in the 1990s, and the only documented Surgeon General walking initiative dates to 2015'; '8 claims were true, independently verifiable, and cited to nothing'; 'A reader who followed a citation to the end would have failed to reach the source 16 times'; '2 exhibits have been corrected since publishing.' The status: 'the audit reruns with every exhibit'.",
    whatWasWrong:
      "6 claims did not hold. The 007 claim was unsourced, not false: 007 now cites C. Everett Koop's Shape Up America!, founded 1994, so the errors are 2, both dates in 003. Exhibits 001 to 006 went live in July and their archived checks are dated 2026-08-01, after publishing; the second reviewer was added that day. Of the 8 claims with no support in their exhibit's source list, 6 were verified true and 2 only plausible, and 1 of those, Eurostat's sign-off in 001, was narrowed. Most of the 16 unretrieved sources were 403 responses to the fact-checker's fetch tool, which a reader in a browser gets past. The count of corrected exhibits had no scope, and commit f0c49f4 had also changed 001, 004 and 007 after publishing. The self-audit has been counted once, not rerun.",
    howItGotHere:
      "The exhibit took the August reports' verdicts as findings: NOT SUPPORTED became wrong, and could not be fetched became could not be reached. It was not itself fact-checked before publishing, and had no archived check until 2026-11-05.",
    whatItSaysNow:
      "'9 exhibits, 127 figures, 2 of them wrong.' The body dates the 001 to 006 checks to after publishing, gives 6 of the 8 unsupported claims as true, says the unretrieved sources mostly turned away scripts rather than readers, and counts 4 of exhibits 001 to 009 on this page: 003, 006, 001 and 007. The status: 'open; counted once, across exhibits 001 to 009'.",
    caughtBy:
      "The repo-wide consistency audit of 2026-11-04 (finding 1, the count; finding 14, no archived check), then the fact-checker run on 010 on 2026-11-05, whose report is archived at reports/010-self-audit/fact-check-output.json. Each of its findings was checked against git before the fix.",
  },
  {
    exhibit: '001',
    dateCorrected: new Date('2026-08-03'),
    whatItSaid:
      "'Nobody. The CSO followed the rulebook exactly, Eurostat checked the maths and signed off, and the output was a number that no serious person ... believed.'",
    whatWasWrong:
      "No source in the exhibit documented a sign-off. Eurostat's statement of 21 July 2016 called the revision \"plausible\" on preliminary CSO information and committed to examining the methodology in more detail, as part of its standard review.",
    howItGotHere:
      'The 2026-08-01 fact-check marked the claim not supported: a plausible institutional fact with no source in the list. The fix in commit f0c49f4 on 2026-08-03 narrowed the sentence and added the Eurostat statement as a source, with no entry on this page.',
    whatItSaysNow:
      "'Eurostat called the revision \"plausible\" and opened its standard methodology review.'",
    caughtBy:
      'The fact-checker, claim 8 of reports/001-ireland/fact-check-output.json. The missing entry was caught by the fact-check of exhibit 010 on 2026-11-05.',
  },
  {
    note: '003',
    dateCorrected: new Date('2026-11-03'),
    whatItSaid:
      "The table listed the first research run for exhibit 012 at 88.1 minutes, 013's at 3.1 and 014's at 3.4. The disclosure, once corrected, said the correction was made 'on 30 October, the day it was published'.",
    whatWasWrong:
      'scripts/log-models.mjs measured each run to the last line of its transcript. The first 012 run stopped responding after 7.0 minutes and kept logging retried requests until it was interrupted by hand, so it was listed at 88.1. 013 ran 3.0 minutes and 014 ran 3.3. The figures were live from 30 October to 3 November. The correction itself was made on 3 November, not on 30 October.',
    howItGotHere:
      'The note took its durations from the model log, and the log measured the wrong end of the run. The disclosure was dated by the note\'s publish day rather than by the commit that corrected it.',
    whatItSaysNow:
      "The table gives 7.0, 3.0 and 3.3 minutes, and says the first 012 run 'stopped responding after 7.0 minutes, never reported back, and was later interrupted by hand.' The disclosure dates the correction to 3 November.",
    caughtBy:
      'The figures were fixed in commit 4505a7f on 3 November, which changed scripts/log-models.mjs to measure each run to its last response; the commit does not record what prompted it. The wrong date and the missing entry on this page were caught by the repo-wide consistency audit of 2026-11-04, finding 2. Archived at reports/audits/2026-11-04.md.',
  },
  {
    exhibit: '010',
    dateCorrected: new Date('2026-10-10'),
    whatItSaid:
      "The source entry for src/data/corrections.ts read: 'The single published correction: exhibit 006, dated 2026-07-25...' The body, corrected on 2026-10-05, said: '2 exhibits have been corrected since publishing.'",
    whatWasWrong:
      'The source entry and the body disagreed on the count. The source entry described the log as it stood on 2026-10-04, when it did hold 1 entry, but it was written as a standing claim, and the body it supports counts 2 corrections, 006 and 003.',
    howItGotHere:
      'The 2026-10-05 correction fixed the count in the body and did not check the source entries that described the same record.',
    whatItSaysNow:
      "'When this exhibit was published on 2026-10-04, the log held 1 entry: exhibit 006... Exhibit 003 had also been corrected, in commit f0c49f4 on 2026-08-03, and had no entry until 2026-10-05. The body counts both.'",
    caughtBy:
      'A repo-wide consistency audit on 2026-10-10, which compared each exhibit\'s body against the text of its own source entries. The audit is archived at reports/audits/2026-10-10.md.',
  },
  {
    exhibit: '010',
    dateCorrected: new Date('2026-10-05'),
    whatItSaid:
      "'1 exhibit has been corrected since publishing. Exhibit 006 attributed a finding to a 2003 GAO report that does not contain it.'",
    whatWasWrong:
      "Exhibit 003 had also been corrected after publishing, in commit f0c49f4 on 2026-08-03, for placing 2 provincial admissions 'within weeks' of Liaoning's when its own source dated them about a year later. That fix had no entry on this page, and exhibit 010 counted the entries on this page rather than the fixes in the repository.",
    howItGotHere:
      "A self-audit that trusted the corrections log as its source of truth inherited the log's omission. The exhibit counted what was filed, which is the same gap between filing and counting that its own Who lied section describes.",
    whatItSaysNow:
      "'2 exhibits have been corrected since publishing.' It names both 006 and 003. The 003 correction now has its own entry below.",
    caughtBy:
      'A review of the About page on 2026-10-05, which checked its claims against the deploy log and the commit history and found the 003 fix missing from this page.',
  },
  {
    exhibit: '011',
    dateCorrected: new Date('2026-10-04'),
    whatItSaid:
      "Two claims had no backing in the exhibit's own source list. The body said '1999, the year assessed against the 3% reference value for euro entry, became 3.4% instead of 1.8%', and the verdict scoreboard said 'the 1999 figure that cleared the 3% reference value for euro entry was restated at 3.4%, 5 years after the decision it supported.' The body also introduced Andreas Georgiou as 'a 20-year IMF official'. Separately, the ledger's 3.7% to 15.4% staircase sat beside a Fraud detected row reading 'deliberate misreporting' with no mention of the other causes the cited report gives.",
    whatWasWrong:
      "None of the 5 listed sources mentions euro entry, the convergence assessment, or which year it was assessed on; the November 2004 Eurostat report discusses the deficit reference value only generically. The claim is true as history and was not checked against the list before publishing. The 20-year IMF tenure is likewise absent from the International Statistical Institute chronology that is cited for Georgiou, and reached the draft from secondary news coverage surfaced during search. The omission was worse than either: COM(2010) 1 final attributes the 2009 revision to 'the impact of the economic crisis, budgetary slippages in an electoral year and accounting decisions', so presenting the full 11.7-point move next to a fraud finding invited a reading the cited source does not support.",
    howItGotHere:
      "The exhibit was published without the fact-check pass CLAUDE.md requires for every exhibit. The pass was skipped on the reasoning that the project-scoped fact-checker agent was not loaded in the working directory, which was true and was not a good reason: the agent definition could have been read and its criteria applied directly, which is what eventually happened. Exhibit 010, published the same day, is specifically about this failure mode, and counted 8 instances of a true figure cited to nothing in its own source list.",
    whatItSaysNow:
      "The body states only the restatement and the threshold, both traceable: '1999 became 3.4% instead of 1.8%, which moved it from inside the Treaty protocol's 3% deficit reference value to outside it', with the 3% figure now resting on the November 2004 report's own sentence specifying the protocol's reference values. The verdict row makes the same narrowed claim. Georgiou is introduced without the IMF tenure, and the IMF connection survives only inside the quoted felony charge, where it is sourced. The incident section now carries the Commission's stated causes for the 2009 revision. A closing sentence asserting that 'No court found the number wrong' was also narrowed to the acquittal that is actually on the record.",
    caughtBy:
      'The fact-check pass, run inline after the reader asked why exhibit 011 did not have one. Criterion 1 (FIGURES) caught both untraceable claims, criterion 7 (hostile read) caught the omission. The pass was not independent, since it was run by the session that wrote the exhibit; the DeepSeek second opinion, which sees only claim and passage, independently returned NOT SUPPORTED on all 3 findings, and flagged the closing sentence that was then narrowed. Archived at reports/011-greece/.',
  },
  {
    exhibit: '003',
    dateCorrected: new Date('2026-08-03'),
    whatItSaid:
      "The body said: 'Liaoning was not unique, it was just the one that confessed on camera. Within weeks, Inner Mongolia admitted its 2016 industrial output had been overstated by 40%, and a district of Tianjin admitted its GDP was a third smaller than reported.' The verdict row read 'Fraud detected: confirmed, confessed to, and punished, by China's own party disciplinary body.'",
    whatWasWrong:
      "The exhibit's own SinoInsider source, published January 2018, dates the Inner Mongolia disclosure to 7 January 2018. Liaoning's admission was January 2017. The gap was about a year, not weeks. Both figures, 40% and a third, were correct.",
    howItGotHere:
      "The timeline compression was not caught at drafting. The fix was made in commit f0c49f4 without an entry here, and this entry was added on 2026-10-05, when a review of the About page found the gap. The same commit also narrowed the verdict row to Liaoning, as a precaution against a hostile read rather than because any fact-check finding called it wrong.",
    whatItSaysNow:
      "'Liaoning was not unique, it was just the one that confessed first. About a year later, in January 2018, Inner Mongolia admitted...' The verdict row is scoped: 'in Liaoning, confirmed, confessed to on the provincial record, and punished by China's own party disciplinary body.'",
    caughtBy:
      'The fact-checker subagent, in the full pass of 2026-08-01, which marked both "within weeks" claims NOT SUPPORTED. The DeepSeek second opinion, which sees only claim and passage, independently returned the Inner Mongolia timing claim as NOT SUPPORTED. Archived at reports/003-china/.',
  },
  {
    exhibit: '006',
    dateCorrected: new Date('2026-07-25'),
    whatItSaid:
      "The body said: 'the General Accounting Office reviewed six long-term evaluations and found no statistically significant differences in illicit drug use between kids who got DARE in fifth or sixth grade and kids who didn't, and noted the program was sometimes counterproductive in some populations, with DARE graduates showing higher rates of drug use, the so-called boomerang effect.'",
    whatWasWrong:
      'GAO-03-172R (2003) contains no such finding, confirmed against four independent fetches across two official mirrors (govinfo.gov and gao.gov). The claim traced only to an uncited sentence on Wikipedia, which the exhibit\'s own sources list had already silently routed it through.',
    howItGotHere:
      'The underlying finding was real, just credited to the wrong source. The original draft compressed two separate research threads, a 2003 GAO review and a 1998 academic study, into one GAO-attributed sentence. That prose was carried over byte-for-byte when the exhibit was migrated into the site\'s content schema.',
    whatItSaysNow:
      "The boomerang finding is now attributed to its actual source: Rosenbaum and Hanson's 1998 six-year randomized study (Journal of Research in Crime and Delinquency 35(4)), confirmed via the journal's own abstract and George Mason University's CEBCP research clearinghouse. The GAO sentence now states only what GAO's report actually says.",
    caughtBy:
      'The fact-checker subagent, criterion 6 (hostile read: would a bad-faith reader screenshot this out of context?). Flagged BLOCKING, verdict DO NOT SHIP. Independently re-verified before the fix was applied.',
  },
];

export function correctionsByDateDesc(): Correction[] {
  return [...corrections].sort(
    (a, b) => b.dateCorrected.valueOf() - a.dateCorrected.valueOf()
  );
}
