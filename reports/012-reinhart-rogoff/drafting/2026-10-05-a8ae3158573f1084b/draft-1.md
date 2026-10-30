---
title: "The spreadsheet error was the small one"
exhibit: "012"
country: "20 advanced economies"
status: "the authors' erratum corrected the coding error in May 2013 and disputed the rest"
category: "the weighting did the work"
tags: ["gdp", "outlived-the-evidence", "measurement-definitions"]
date: 2026-10-05
teaser: "Public debt and growth · the average above 90%, as published and as replicated"
ledgerTitle: "The numbers: average real GDP growth by public debt/GDP, 1946 to 2009"
ledger:
  - label: "Reinhart and Rogoff 2010, debt 60% to 90% of GDP"
    value: "2.8%"
  - label: "Herndon, Ash and Pollin 2013, debt 60% to 90% of GDP"
    value: "3.2%"
  - label: "Reinhart and Rogoff 2010, debt 90% of GDP and above"
    value: "-0.1%"
  - label: "Herndon, Ash and Pollin 2013, debt 90% of GDP and above"
    value: "2.2%"
    gap: true
ledgerNote: "Same 20 countries, same years. HAP put the real gap between the top 2 buckets at 1.0 point, and the published version's overstatement of it at 2.3, \"a factor of nearly two and a half.\""
verdict:
  - key: "Fraud detected"
    value: "none alleged. HAP describe coding errors, selective exclusion of available data and unconventional weighting; the authors' erratum concedes the coding error."
    long: true
  - key: "Rules broken"
    value: "none on the record. HAP called the weighting \"unconventional\", which describes a choice, not a violation."
    long: true
  - key: "Usefulness of the headline figure"
    value: "-0.1% became 0.3% in the authors' own correction and 2.2% in the replication."
    long: true
verdictNote: "The spreadsheet error is the part that gets remembered, because it dropped 5 countries for being first in the alphabet. Together with a transcription slip it moved the result by 0.4 of a point. Most of the distance came from a decision: average each country, then count each country once, so that 1 year of New Zealand weighed the same as 19 years of Britain. Nobody had to type anything wrong for that to happen. The authors' defence is that their medians were always close to HAP's averages, and the erratum's own table bears it out: 1.9% against 2.2%. The figure that was not close was the mean, and the mean was the one under 0."
sources:
  - name: "Reinhart and Rogoff (2010)"
    text: "\"Growth in a Time of Debt\", American Economic Review Papers and Proceedings 100(2), May 2010, pp. 573-78. Cited for publication details only; its findings and table are quoted here as reproduced in Herndon, Ash and Pollin (2013)."
    url: "https://www.aeaweb.org/articles?id=10.1257/aer.100.2.573"
    urlLabel: "aeaweb.org"
  - name: "Herndon, Ash and Pollin (2013)"
    text: "\"Does High Public Debt Consistently Stifle Economic Growth? A Critique of Reinhart and Rogoff\", PERI Working Paper 322, 15 April 2013: the quoted 2010 finding on medians and means; the published bucket averages of 4.1, 2.8, 2.8 and -0.1 (Table 1) and corrected averages of 4.2, 3.1, 3.2 and 2.2 (Table 3); the averaging of lines 30 to 44 instead of 30 to 49, omitting Australia, Austria, Belgium, Canada and Denmark, \"selected alphabetically\"; the excluded early years for Australia, New Zealand and Canada, and New Zealand's excluded growth rates of 7.7, 11.9, -9.9 and 10.8 percent; New Zealand's single remaining year, 1951, at -7.6 percent, its 14.3 percent weight, and the transcription to -7.9; the UK's 19 years at 2.4 percent; 96 reported, 110 available and 71 used country-years; the 1.9 point effect of exclusion and country weighting and the further 0.4 from spreadsheet and transcription errors; the 1.0 point real gap and 2.3 point overstatement; 76 media features and more than 500 Google Scholar results; and the report that the paper is the only evidence cited on debt and growth in Representative Ryan's \"Path to Prosperity\", with the budget document's words as quoted by HAP. Read as text extracted from the published PDF."
    url: "https://peri.umass.edu/publication/does-high-public-debt-consistently-stifle-economic-growth-a-critique-of-reinhart-and-rogoff/"
    urlLabel: "peri.umass.edu"
  - name: "Reinhart and Rogoff (2013)"
    text: "\"Errata: 'Growth in A Time of Debt'\", 5 May 2013: thanks to HAP \"for pointing out an important correction\"; \"a coding error that causes the first five countries in the alphabet to be omitted\"; HAP's 3 points as listed by the authors; the statement that HAP \"fails to mention that our median estimates for the postwar sample are very close in magnitude to the averages that they present\"; and the coding-corrected postwar figures above 90% of GDP, mean -0.1 to 0.3 and median 1.6 to 1.9. Read as text extracted from the published PDF."
    url: "https://carmenreinhart.com/wp-content/uploads/2020/02/36_data.pdf"
    urlLabel: "carmenreinhart.com"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. Both PDFs were converted to text locally and read directly, not taken from press coverage. The quotation from Representative Ryan's \"Path to Prosperity\" is as reported by Herndon, Ash and Pollin; the budget document itself was not fetched for this exhibit. On attribution: the words coding error, selective exclusion and unconventional weighting are HAP's, and the concession is the authors' own, in their erratum. No figure here rests on any claim about what anyone intended."
---

## The incident

In May 2010 Carmen Reinhart and Kenneth Rogoff published "Growth in a Time of Debt". Covering 20 advanced economies from 1946 to 2009, it found that "median growth rates for countries with public debt over roughly 90 percent of GDP are about one percent lower than otherwise; (mean) growth rates are several percent lower." Its table put average growth above 90% at -0.1%, against 2.8% in the 60% to 90% bucket.

The paper travelled. The authors' website listed 76 high-profile media features. Google Scholar found more than 500 results citing it, excluding the authors' own. Thomas Herndon, Michael Ash and Robert Pollin (HAP) reported in 2013 that it was the only evidence cited on debt and growth in the "Paul Ryan Budget", whose "Path to Prosperity" called it "conclusive empirical evidence" that debt over 90% "has a significant negative effect on economic growth."

HAP reproduced the table from the authors' own spreadsheet. They got 2.2%.

## Who lied

Nobody, on the record. HAP's paper describes 3 problems: coding errors, selective exclusion of available data, and unconventional weighting of summary statistics.

The coding error: a formula averaged lines 30 to 44 instead of 30 to 49, which dropped Australia, Austria, Belgium, Canada and Denmark entirely. "The omitted countries are selected alphabetically."

The exclusion: available early years were left out for Australia, Canada and New Zealand. New Zealand's excluded high-debt years grew 7.7, 11.9, -9.9 and 10.8 percent. What remained was 1 year, 1951, at -7.6%.

The weighting: each country was averaged first, then every country counted equally. Britain contributed 19 years averaging 2.4%. New Zealand contributed its 1 year. With 7 countries in the bucket, that year carried 14.3% of the weight. A transcription error then moved it to -7.9%.

The paper reported 96 country-years above 90%. HAP found 110. The calculation used 71.

Exclusion and weighting together accounted for "a very substantial 1.9 percentage points". The spreadsheet and transcription errors added 0.4. The real gap between the top 2 buckets, HAP concluded, was 1.0 point.

## The fix

On 5 May 2013 the authors published an erratum thanking HAP "for pointing out an important correction". It describes "a coding error that causes the first five countries in the alphabet to be omitted" and corrects it: the postwar mean above 90% moves from -0.1% to 0.3%, the median from 1.6% to 1.9%.

The correction covers the coding error. The erratum lists the exclusion and the weighting as HAP's assertions, notes that HAP is silent on the longer sample back to the 1800s and on emerging markets, and adds that HAP "fails to mention that our median estimates for the postwar sample are very close in magnitude to the averages that they present."
