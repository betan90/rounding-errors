---
title: "Probably false, arbitrary, and weak"
exhibit: "017"
country: "United Kingdom"
status: "the series was last updated 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "GDP · modelling drugs and prostitution when no time series exists"
ledgerTitle: "The numbers: ONS illegal activities method, 2014 to 2016"
ledger:
  - label: "Prostitutes in London (Eaves 2004, charity research calling advertised numbers)"
    value: "~7,000 off-street"
  - label: "Prostitutes on street at any one time in London (Metropolitan Police)"
    value: "115"
  - label: "Prostitutes in the UK (ONS, scaling the above by population)"
    value: "~58,000"
  - label: "Price source (ONS footnote)"
    value: "Wikipedia article on Punternet"
  - label: "Time series for the number of prostitutes (ONS)"
    value: "none"
    gap: true
  - label: "Prostitution in HHFCE, 2010 (FOI, Nov 2015)"
    value: "£5.6bn"
  - label: "Prostitution in MNC8, 2010 (current series)"
    value: "£4,370m"
  - label: "Holiday taken by prostitutes, applied in Blue Book 2016 (Statistics Netherlands)"
    value: "12 weeks"
ledgerNote: "The £5.6bn and £4,370m are both ONS figures for 2010 prostitution; this site's arithmetic gives 4,370/5,600 = 0.78. 40 working weeks out of 52 = 0.77. ONS does not state the holiday explains the whole gap."
verdict:
  - key: "Fraud detected"
    value: "none. ONS published every assumption and flagged each weakness."
    long: false
  - key: "Rules broken"
    value: "none. ESA 1995 required illegal transactions; ONS met the deadline."
    long: false
  - key: "Usefulness of the headline figure"
    value: "ONS called its assumptions \"probably false\", \"arbitrary\" and \"weak\". The series exists because the rule required one."
    long: true
verdictNote: "The Deputy Chief Economic Adviser wrote in 2014 that spending on these illegal activities \"contributes up to £10 billion a year to the level of GDP\". The MNC8 series plots household final consumption expenditure on prostitution from 1985 to 2024. ONS's own method says \"there is no time series\"; the chart is a 2004 point estimate varied by the male population and the CPI."
sources:
  - name: "ONS (Abramsky and Drew)"
    text: "\"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014, via UN SIAP mirror (ONS original is dead). The scaling method, the Eaves research, the Metropolitan Police count, the Wikipedia footnote for Punternet, the \"weak assumption\" about population, the \"probably false\" and \"arbitrary\" drug assumptions, the statement that government units \"are very unlikely to spend money on illegal drugs\", the formula P*C*52, the clients-per-week range 20/25/30 from the Netherlands, the intermediate-consumption figures (125 euros on clothes, 0.50 euros per client on condoms), the note that ESA95 and ESA 2010 are unchanged in this area."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror PDF"
  - name: "Peter Patterson"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 Oct 2014. The £10bn figure, the R&D comparison (£18bn), the overall GDP effect (£50bn, some 4%), the note that this is \"legally mandated\"."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "ONS"
    text: "FOI response \"Illegal Production (N2)\", published 6 Nov 2015. The 2010 totals: N2 at £9,097m (0.58% of GDP), drugs at 0.24%, prostitution at 0.35%; prostitution in HHFCE at £5.6bn (0.4% of GDP)."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI page"
  - name: "ONS"
    text: "\"Revisions to gross domestic product in Blue Book 2016\". The 12-week holiday refinement: \"Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates.\""
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions"
  - name: "ONS"
    text: "Time series MNC8, \"12.2 Prostitution CP NSA £m\" (household final consumption expenditure on prostitution, current prices), release date 31 October 2025. The chart data from 1985 to 2024."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, MNC8 series"
disclosure: "This entry was drafted with AI (Claude). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The ONS 2014 article is cited via a UN SIAP mirror because the ONS original URL is dead."
---

## The incident

In 2014 the Office for National Statistics began publishing estimates of illegal drugs and prostitution in GDP. The reason was administrative: gross national income is used to calculate each EU member state's budget contribution, Eurostat had audited the methods, and member states had to address identified gaps by 2014. The rule was not new. ESA 1995 had required illegal transactions to which all parties consent; the 2014 article notes that ESA 2010 makes no change in this area.

The article, by Joshua Abramsky and Steve Drew, reported "significant limitations in the availability of data". The prostitution estimate came from a 2004 count by Eaves, a charity, which "estimated that there were approx 7000 off-street prostitutes in London in that year; this was done by calling numbers advertised in various media and asking how many prostitutes were in each place." The Metropolitan Police gave 115 on the street at any one time. Adding these and scaling by UK population gave about 58,000.

The price came from Punternet, "supported by a 2004 journal article". The footnote for Punternet is "http://en.wikipedia.org/wiki/Punternet".

The formula was P times C times 52: prostitutes times clients times weeks. "As there is no time series, we vary the point estimates in time using the male population." The clients-per-week figure followed a Netherlands assumption, with options of 20, 25 or 30.

For drugs, the article listed its assumptions in a table. "We assume that the purity-adjusted amount of drugs consumed by the average user remains constant over time. This assumption is probably false, but we have no data to challenge it." "We assume that half of cannabis sold in the UK is imported and half home-grown. This is an arbitrary assumption." "The government final consumption expenditure assumption is reasonable because government units are very unlikely to spend money on illegal drugs."

Peter Patterson, the Deputy Chief Economic Adviser, wrote in October 2014 that spending on these illegal activities "contributes up to £10 billion a year to the level of GDP."

## Who lied

Nobody. ONS published every assumption and every caveat. The authors called 1 assumption "weak", 2 "probably false" and 1 "arbitrary". They noted the lack of a time series.

## The bit continues

In Blue Book 2016, ONS refined the prostitution estimate: "Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates."

An FOI response in November 2015 gave 2010 prostitution in household final consumption expenditure as £5.6bn. The current MNC8 series gives 2010 as £4,370m. The series runs from 1985 to 2024. In 2019 it was £5,993m; in 2020, £4,130m; by 2022, £6,142m. The series was last updated 31 October 2025.
