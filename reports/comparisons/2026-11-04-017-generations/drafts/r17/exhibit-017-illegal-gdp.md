---
title: "Probably false, with no data to challenge it"
exhibit: "017"
country: "United Kingdom"
status: "the series is still published; last release 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · illegal drugs and prostitution added to GDP, built from assumptions their authors labeled arbitrary and probably false"
ledgerTitle: "The numbers: ONS prostitution series MNC8, 2004 to 2024"
ledger:
  - label: "Number of prostitutes in UK, modelled (ONS 2014, scaling a 2004 London estimate)"
    value: "c. 58,000"
  - label: "Price per client, 2004 (ONS 2014, citing Punternet via Wikipedia)"
    value: "£55"
  - label: "ONS assumption on drug purity over time (2014 method)"
    value: "\"This assumption is probably false, but we have no data to challenge it.\""
    gap: true
  - label: "ONS assumption on UK cannabis split, imported vs home-grown (2014 method)"
    value: "\"This is an arbitrary assumption.\""
  - label: "Prostitution HHFCE, 2010 (ONS FOI, 6 Nov 2015)"
    value: "£5.6bn"
  - label: "Prostitution HHFCE, 2010 (ONS MNC8 series, current)"
    value: "£4,370m"
  - label: "Holiday allowance applied to prostitution estimates (Blue Book 2016)"
    value: "12 weeks per year"
  - label: "Prostitution HHFCE, 2024 (ONS MNC8)"
    value: "£6,431m"
ledgerNote: "The 2 published 2010 figures differ by roughly the factor of 40 working weeks over 52; ONS states the 12-week holiday factor was applied in Blue Book 2016 but does not state that the holiday accounts for the entire difference."
verdict:
  - key: "Fraud detected"
    value: "none. ONS published every assumption and flagged each weakness. The method article says \"probably false\" 3 times and \"arbitrary\" twice."
    long: true
  - key: "Rules broken"
    value: "none. ESA 1995 required illegal activity inside the production boundary; ESA 2010 kept it. The estimates met a legal deadline for EU budget contributions."
    long: true
  - key: "Usefulness of the headline figure"
    value: "limited as a measurement. The method's own summary: \"significant limitations in the availability of data ... requires a number of assumptions on which the estimates are, therefore, partly based. This applies especially to the estimates of prostitution activity.\""
    long: true
verdictNote: "The series MNC8 plots household final consumption expenditure on prostitution from 1985 to 2024. ONS first published these estimates in 2014. There is no time series of prostitutes or clients, so the chart plots the assumptions: a 2004 London count, scaled to the UK, varied over time by the male population and the CPI. The chart is the method, rendered as data."
sources:
  - name: "ONS"
    text: "\"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", Joshua Abramsky and Steve Drew, 29 May 2014. Supports the ESA 1995 requirement (section 1.13), the footnote that ESA 2010 keeps it unchanged, the EU budget context, the method for counting prostitutes (Eaves 2004 estimate of 7,000 off-street prostitutes in London, Metropolitan Police 115 on the street, scaled by UK population to c. 58,000), the price of £55 in 2004 citing Punternet, the Punternet footnote pointing to Wikipedia, the assumptions quoted in the ledger, and the summary on \"significant limitations\". The ONS original URL is dead; this is a mirror on the UN Statistical Institute for Asia and the Pacific training site."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror PDF"
  - name: "Peter Patterson"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 Oct 2014. Patterson was ONS Deputy Chief Economic Adviser. Supports the £10 billion figure for illegal activities, the R&D addition of £18 billion, and the 4% GDP uplift."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "ONS"
    text: "FOI response \"Illegal Production (N2)\", 6 Nov 2015. Supports the 2010 figures: total illegal production £9,097m (0.58% of GDP), drugs 0.24%, prostitution 0.35%; prostitution in HHFCE £5.6bn (0.4% of GDP)."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI page"
  - name: "ONS"
    text: "\"Revisions to gross domestic product in Blue Book 2016\". Supports the 12-week holiday: \"Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates.\""
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions"
  - name: "ONS"
    text: "Time series MNC8, \"12.2 Prostitution CP NSA £m\", dataset BB, release date 31 Oct 2025. Supports the current 2010 figure of £4,370m and the 2024 figure of £6,431m. The series runs from 1985."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, MNC8 series"
disclosure: "This entry was drafted with AI (Claude). The editorial voice, the opinions, and any surviving errors are the author's. Every figure was checked against the linked primary source before publishing. The ONS 2014 method article is cited via a UN SIAP mirror because the original URL is dead. The observation that the 2 published 2010 figures differ by roughly the holiday factor is this site's arithmetic, not an ONS statement."
---

## The incident

In May 2014 the Office for National Statistics published estimates of illegal drugs and prostitution in UK GDP. The European System of National Accounts 1995 had required it: "illegal transactions to which all units involved consent are included within the production boundary." ESA 2010 kept the rule unchanged. GNI figures feed EU budget contributions. A 2012 Eurostat audit had identified areas for improvement; member states had until 2014 to address them.

ONS's method article, by Joshua Abramsky and Steve Drew, carried the estimates and the caveats. To count prostitutes, ONS used a 2004 Eaves charity estimate of 7,000 off-street prostitutes in London, plus 115 on the street from the Metropolitan Police, scaled to the UK by population: c. 58,000. For the price, £55 in 2004, the article cited Punternet. Its footnote for Punternet: the Wikipedia page.

The assumptions were labeled. On drug purity over time: "This assumption is probably false, but we have no data to challenge it." On the share of cannabis that is imported versus home-grown: "This is an arbitrary assumption." On government drug spending: "The government final consumption expenditure assumption is reasonable because government units are very unlikely to spend money on illegal drugs."

The article says "probably false" 3 times and "arbitrary" twice.

## Who lied

Nobody. ONS published its method, named its sources, and flagged its weaknesses. Peter Patterson, then Deputy Chief Economic Adviser, wrote in a Civil Service blog post that "ONS desk research (please note the italics for emphasis!) into the numbers of prostitutes and the price of drugs" had yielded the estimates. The overall effect of the 2014 changes, including R&D capitalization, raised the level of GDP by around £50 billion a year, some 4%.

The article's summary: "significant limitations in the availability of data ... requires a number of assumptions on which the estimates are, therefore, partly based. This applies especially to the estimates of prostitution activity."

## The bit continues

In Blue Book 2016, ONS revised the prostitution estimates downward. The refinement: "allowance was made to reduce the estimates made for prostitution in household final consumption expenditure by a factor to reflect the holiday taken by prostitutes. Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates."

A 2015 FOI response put 2010 prostitution at £5.6bn. Today's series MNC8 puts 2010 at £4,370m. The 2 published figures differ by roughly 40 weeks over 52. The series still runs: the latest release, 31 October 2025, puts 2024 at £6,431m.
