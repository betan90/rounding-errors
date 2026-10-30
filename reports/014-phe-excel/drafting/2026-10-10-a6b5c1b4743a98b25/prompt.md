Draft exhibit 014 for Rounding Errors. Write it to the repo root (C:/Users/betan/OneDrive/Desktop/rounding-errors) as exactly `exhibit-014-phe-excel.md`. Read CLAUDE.md and 2 exemplar exhibits first, including src/content/exhibits/013-8-glasses.md (it also runs with a chartNote and no chart). A house-rules hook will check your file when you write it; if it reports BLOCKING problems, fix them.

THE SHAPE: In October 2020, 15,841 positive COVID-19 results in England missed the daily figures. The explanation everybody remembers (an old .xls spreadsheet ran out of rows) reached a parliamentary committee chair's letter as "It is reported that...". The official reply said "The technical issue was not caused by the use of an old format." Hansard records the Health Secretary saying "legacy system" and "maximum file size error", never "Excel"; the word appears in the debate only in an opposition MP's question. The chair's letter nevertheless says the Secretary of State told the House the system "included the use of Microsoft Excel". The official sources also disagree with each other on smaller figures (date range, tracing hours). Nobody disputes the 15,841.

Suggested category: "the file was too big" (new, flat, literally the official explanation; the body delivers that which file and why is the disputed part). You may propose another flat structural category from CLAUDE.md if it fits better, and say why in your summary.
Country: "United Kingdom". Tags (live vocabulary only): epidemiology, healthcare, measurement-definitions, europe. Title: numerals, deadpan, in the style of the others (e.g. "15,841 cases, 1 file size").
date: 2026-10-10.

VERIFIED FACTS (use only these; quotes are verbatim):

[A] PHE, "PHE statement on delayed reporting of COVID-19 cases", gov.uk, published 4 Oct 2020, updated 5 Oct 2020. URL: https://www.gov.uk/government/news/phe-statement-on-delayed-reporting-of-covid-19-cases
- "15,841 cases between 25 September and 2 October were not included in the reported daily COVID-19 cases." (Michael Brodie, Interim Chief Executive, PHE)
- 11,968 (over 75%) related to cases that should have been reported between 30 September and 2 October.
- Identified "overnight on Friday 2 October". "All outstanding cases were immediately transferred to the contact tracing system by 1am on 3 October."
- Cause as stated: "some files containing positive test results exceeded the maximum file size" in the "data load process that transfers COVID-19 positive lab results into reporting dashboards". Mitigation "splits large files". The statement does not use the words Excel, XLS, rows or columns.
- Everyone affected "received their COVID-19 test result as normal".

[B] Hansard, House of Commons, 5 October 2020, "Covid-19 Update", vol 681. URL: https://hansard.parliament.uk/Commons/2020-10-05/debates/3DFBFED6-4B2E-4E70-9658-9D66EFB1E5DF/Covid-19Update
- Health Secretary: "On Friday night, Public Health England identified that over the previous eight days, 15,841 positive test results were not included in the reported daily cases. This was due to a failure in the automated transfer of files from the labs to PHE's data systems."
- "We brought in 6,500 hours of extra contact tracing over the weekend."
- "as of 9 am today, 51% of the cases have now been contacted a second time for contact tracing purposes."
- "The problem emerged in a PHE legacy system. We had already decided in July to replace this system... Contracts were awarded in August"
- "the challenge of a maximum file size error is that it would not necessarily have appeared on that sort of flow chart"
- "This incident should never have happened"
- An opposition MP (Jonathan Ashworth, Leicester South, Lab) asked: "Can the Secretary of State confirm that the data could not be handed over to PHE because of the size of the Excel spreadsheet files?" and "Why are critical databases in a national pandemic being hosted on Excel spreadsheets?" The word "Excel" appears nowhere else in the debate record. (Prefer "an opposition MP" in prose; naming him is allowed only as reported Hansard speech.)

[C] Letter, Rt Hon Greg Clark MP, Chair, Science and Technology Committee, to Baroness Dido Harding, 8 October 2020. URL: https://committees.parliament.uk/publications/2897/documents/28031/default/
- "The Secretary of State for Health and Social Care told the House on Monday 5 October that the issue was related to a Public Health England (PHE) legacy system, which included the use of Microsoft Excel. It is reported that PHE developers used an old format of the software, XLS, which had a set number of rows to log data that was incompatible with the volume of data being generated."
- "On 3 October there was an unexpected increase in the reported number of positive cases. This was accompanied by a message on the Government dashboard that there had been cases missed from previous dates"
- Asked: "What certification took place of the Microsoft Excel-based system..."

[D] Reply, Baroness Harding (Executive Chair (Interim), National Institute for Health Protection), to Greg Clark, 12 October 2020. URL: https://committees.parliament.uk/publications/3065/documents/28783/default/
- "The technical issue was not caused by the use of an old format. Rather, PHE have confirmed that there was a failure in the process for preparing some testing data for uploading onto the central system that stores all test results. Increased testing volumes from Pillar 2 meant that some Excel files used in the transfer process exceeded their file size threshold and so were not uploaded."
- "The delayed reports are all positive cases identified via Pillar 2 testing between 24 September and 1 October." (vs PHE's 25 September to 2 October)
- "we brought in 6,000 hours of extra contact tracing" (vs 6,500 in Hansard)
- "(75% / 11,968)" (vs PHE's "over 75%")
- "As of the morning of 12 October, 79% of people testing positive have been reached and asked for details of their contacts." Context is the delayed cases but the sentence does not say so explicitly; if used, quote it, do not restate it as "79% of the 15,841".
- "A full wash-up of the incident is ongoing." No published wash-up was found.
- "the incident did not affect notifications through the App"

[E] DHSC, "Weekly statistics for NHS Test and Trace (England) and coronavirus testing (UK): 1 October to 7 October", updated 22 Oct 2020. URL: https://www.gov.uk/government/publications/nhs-test-and-trace-england-and-coronavirus-testing-uk-statistics-1-october-to-7-october-2020/weekly-statistics-for-nhs-test-and-trace-england-and-coronavirus-testing-uk-1-october-to-7-october
- "After rapid investigation, 15,841 cases were identified between 25 September and 2 October"; "approximately 11,000 positive test results" that would normally have entered contact tracing 24 to 30 Sep entered the following week. No separate reach rate for the delayed cases is published.

[F] Office for Statistics Regulation blog, "Now, about that Excel spreadsheet...", 15 Oct 2020. URL: https://osr.statisticsauthority.gov.uk/blog/now-about-that-excel-spreadsheet/ — says the error "was not directly part of official statistics production"; launched a review of reproducible analytical pipelines. Gives no figures, does not name PHE.

UNVERIFIABLE (do not use as fact): XLS 65,536-row limit, any row/column mechanism, the "16,384 columns" claim, daily publish-date spike figures (12,872 / 22,961), 48,000 untraced contacts (a Labour estimate), any count of contacts not traced. The press mechanism may appear ONLY as what the chair's letter says "It is reported", and as what the reply denies.

CHART: none. Use a chartNote (no trailing period, no "pending") stating the reason: the as-published daily series that showed the backlog lived on the retired coronavirus.data.gov.uk dashboard, which now redirects to the UKHSA dashboard; the UKHSA series dates every case to its specimen day, so the 15,841 are distributed back onto the days they were tested and the backlog no longer appears in any primary series. Do not chart from press figures.

Verdict: exactly 3 rows: Fraud detected, Rules broken, Usefulness of the headline figure. Attribution rule: the narrator never says anyone lied or misled; let the documents disagree on the record (the chair's letter, the reply, Hansard). Disclosure must state: drafted with AI (Claude), editorial voice and errors are the author's, every figure checked against the linked primary source; note that the press mechanism is reported, not verified. Body 500 words max: ## The incident, ## Who lied, ## The fix.

Return the 5-line summary of choices as instructed in your agent file.
