// Plain data module, not a content collection. Deliberately outside
// src/content/exhibits/ so it structurally cannot surface via
// getCollection('exhibits') on the homepage feed, country pages, or
// tag pages. Rendered only by src/pages/corrections.astro.

export interface Correction {
  exhibit: string;
  dateCorrected: Date;
  whatItSaid: string;
  whatWasWrong: string;
  howItGotHere: string;
  whatItSaysNow: string;
  caughtBy: string;
}

export const corrections: Correction[] = [
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
