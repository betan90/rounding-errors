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
