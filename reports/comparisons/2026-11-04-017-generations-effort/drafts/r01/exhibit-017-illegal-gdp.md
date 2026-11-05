---
title: "This is an arbitrary assumption."
exhibit: "017"
country: "United Kingdom"
status: "the series is still published; the latest release, to 2024, came 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · GDP includes drugs and prostitution, built on assumptions ONS itself calls arbitrary"
ledgerTitle: "The numbers: ONS, illegal drugs and prostitution in UK GDP"
ledger:
  - label: "Estimated number of prostitutes, UK (ONS 2014, scaled from a 2004 London count)"
    value: "c. 58,000"
  - label: "Price per client, 2004 (Punternet, footnoted to Wikipedia)"
    value: "£55"
  - label: "Clients per week, candidate values (a Netherlands assumption)"
    value: "20, 25, or 30"
  - label: "Prostitution in household spending, 2010 (ONS FOI reply, Nov 2015)"
    value: "£5.6bn"
  - label: "Same year, 2010, in today's MNC8 series"
    value: "£4,370m"
    gap: true
  - label: "Prostitution in household spending, 2024 (ONS MNC8)"
    value: "£6,431m"
  - label: "Holiday assumed for prostitutes (Statistics Netherlands figure, applied to the UK)"
    value: "12 weeks a year"
  - label: "Combined effect on the level of UK GDP (Patterson's estimate)"
    value: "around £50 billion a year"
ledgerNote: "4,370 divided by 5,600 is 0.78; 40 working weeks out of 52 is 0.77. That division is this site's arithmetic, not ONS's; ONS never states that the 12-week holiday is the whole difference between the 2 published 2010 figures."
verdict:
  - key: "Fraud detected"
    value: "none. ONS published every assumption, including 3 it labels \"probably false\" and 2 it calls \"arbitrary\"."
    long: true
  - key: "Rules broken"
    value: "none alleged. The production boundary rule is in ESA95 section 1.13; ONS's own footnote says ESA 2010 changed nothing in this area."
    long: true
  - key: "Usefulness of the headline figure"
    value: "limited by design. The series exists because EU reporting rules required a number, not because ONS had the data to measure one."
    long: true
verdictNote: "No institution disputes any of this. The method article says outright that the prostitution estimate rests on assumptions, some of them weak, one of them controversial. The series built from them is still running: MNC8 last updated 31 October 2025, 1985 to 2024. The number gets a chart because it is official and continuous, not because it is observed."
sources:
  - name: "Office for National Statistics (Joshua Abramsky and Steve Drew)"
    text: "\"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014. Cited via a mirror hosted by the UN Statistical Institute for Asia and the Pacific training site; the ONS original URL now returns a 404. Supports the ESA95/ESA2010 footnote, the prostitute count (7,000 off-street in London, Eaves 2004; 115 on-street, Metropolitan Police; scaled to c. 58,000 UK-wide), the £55 2004 price from Punternet footnoted to Wikipedia, the 20/25/30 clients-per-week range, and the drugs assumptions quoted verbatim."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror of the ONS article"
  - name: "Peter Patterson, ONS Deputy Chief Economic Adviser"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 October 2014: illegal drugs and prostitution contributing \"up to £10 billion a year\" to GDP; R&D capitalisation adding \"on average £18 billion a year\"; the combined changes raising the level of GDP \"by around £50 billion a year\"."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "Freedom of Information response, \"Illegal Production (N2)\": N2 (drugs and illegal prostitution) at £9,097m for 2010 against total GDP (Production) of £1,555,548m; prostitution in household final consumption expenditure given as £5.6bn for 2010, 0.4% of GDP."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI: Illegal Production (N2)"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\": the prostitution estimate reduced by a factor reflecting prostitutes' holiday time, using Statistics Netherlands' estimate of 12 weeks a year, applied to the UK figures."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"Prostitution CP NSA\", dataset BB: household final consumption expenditure on prostitution, current prices, £m, annually from 1985 (£1,078m) to 2024 (£6,431m), including 2010 (£4,370m), 2019 (£5,993m), 2020 (£4,130m) and 2022 (£6,142m). Last release 31 October 2025."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, series MNC8"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The 2014 ONS method article is cited via a mirror, because the original ONS URL no longer resolves; the mirror's PDF carries the same ONS header, authors and date as the original."
---

## The incident

Gross national income determines what a country owes the EU budget. In 2012 an EU-wide audit found that member states were not all measuring the same things, and told them to fix it by 2014. One of the fixes, for the UK, was adding illegal drugs and prostitution to GDP. ONS's own account says the rule was never new: the European System of Accounts 1995, section 1.13, already counted any transaction both parties consented to, illegal or not, and a footnote states there was "no changes in this area" when ESA 2010 replaced ESA95.

Having no data, ONS built some. It took a 2004 count of 7,000 off-street prostitutes in London, made by a charity calling phone numbers in classified ads, added 115 the Metropolitan Police counted on the street, and scaled the total by population to get roughly 58,000 prostitutes nationwide. It priced an encounter at £55, a 2004 figure from a review site called Punternet, footnoted in the reference list to the Punternet Wikipedia page. For clients per week it tried 20, 25 and 30, borrowing the range from an assumption used in the Netherlands.

ONS stated its own doubts beside the numbers. "This is a weak assumption." "This is an arbitrary assumption." "This is a controversial assumption." On drugs: "This assumption is probably false, but we have no data to challenge it," used 3 times across the method, and government consumption of illegal drugs was excluded because "government units are very unlikely to spend money on illegal drugs."

## Who lied

Nobody did. ONS published the method, the weaknesses, and the sourcing, Wikipedia footnote included. Peter Patterson, then ONS's Deputy Chief Economic Adviser, wrote that the changes added "around £50 billion a year" to the level of GDP, about 4%, and called this "legally mandated." Whatever the legal mandate covered, it did not require the specific prostitute count, price or client range; those were ONS's own estimates, built because the law demanded a number and the data did not exist to produce one honestly.

## The bit continues

In Blue Book 2016, ONS cut the prostitution estimate further, applying a holiday allowance: Statistics Netherlands estimated prostitutes take 12 weeks off a year, and ONS applied the same factor to the UK figures. An FOI reply had put 2010 prostitution spending at £5.6bn; the current MNC8 series puts the same year at £4,370m. ONS has not said that the holiday accounts for the gap. The series keeps running regardless, £1,078m in 1985 to £6,431m in 2024, falling 31% in 2020 for reasons ONS has not published.
