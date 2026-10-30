---
title: "UK GDP's prostitution line, scaled up from London"
exhibit: "017"
country: "United Kingdom"
status: "still published; dataset released 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · 2 London counts scaled to the UK, then reduced for 12 weeks' holiday"
ledgerTitle: "The numbers: illegal drugs and prostitution in UK GDP, 2004 to 2016"
ledger:
  - label: "Prostitutes in the whole country, from London counts (ONS, 2014)"
    value: "c. 58,000"
  - label: "Clients a week, in the article's 3 estimates (ONS, 2014)"
    value: "20, 25 and 30"
  - label: "Price in 2004, estimate from Punternet (ONS, 2014)"
    value: "£55"
  - label: "Holiday weeks a year, from Statistics Netherlands (ONS, Blue Book 2016)"
    value: "12"
  - label: "Prostitution, 2010, current prices: FOI reply vs current ONS series (MNC8)"
    value: "£5.6bn vs £4,370m"
    gap: true
  - label: "Drugs and prostitution, added to GDP (Patterson, 2014 blog)"
    value: "up to £10 billion a year"
  - label: "Overall effect on GDP (Patterson, 2014 blog)"
    value: "around £50 billion a year, some 4%"
ledgerNote: "Both 2010 figures are COICOP 12.2 (household final consumption expenditure) at current prices."
verdict:
  - key: "Fraud detected"
    value: "none. The weak assumptions are printed in the article, with their labels."
    long: true
  - key: "Rules broken"
    value: "a GNI ESA 1995 reservation, which the 2014 changes were part of addressing."
    long: true
  - key: "Usefulness of the headline figure"
    value: "low, on ONS's own description: \"significant limitations in the availability of data\"."
    long: true
verdictNote: "Nothing was hidden. The assumptions sit in the article with their labels, and the 12-week holiday is Statistics Netherlands' estimate. The headline effect came from a blog; the method article gives no numerical impacts. The series is still published. It starts from 2004 estimates, varied by the male population and the CPI, and runs from 1985 to 2024."
sources:
  - name: "Office for National Statistics"
    text: "Joshua Abramsky and Steve Drew, \"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014. This is a mirror: the PDF on the UN Statistical Institute for Asia and the Pacific training site carries the ONS header, authors and date, and the ONS original URL returns 404. Supports: the EU budget link (GNI \"is used in the calculation of a Member State's contribution to the EU budget\"); the 2012 audit's \"areas for improvement\" and the \"GNI ESA 1995 reservation\"; ESA95 section 1.13 (\"illegal transactions to which all units involved consent are included within the production boundary\") and the footnote's \"no changes in this area between ESA95 and ESA10\"; \"significant limitations in the availability of data\", \"requires a number of assumptions\" and \"partly based\" estimates; the prostitution method (\"there is no time series\"), the 2004 London counts, the scaling to c. 58,000, the £55 price and its footnote; the labels \"a weak assumption\", \"probably false, but we have no data to challenge it\" and \"an arbitrary assumption\"; \"does not include numerical impacts\"."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror PDF of the ONS article"
  - name: "Peter Patterson, ONS Deputy Chief Economic Adviser"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 October 2014. Supports: \"up to £10 billion a year\" for spending on prostitution and drugs, from ONS desk research into the numbers of prostitutes and the price of drugs; the overall effect of \"around £50 billion a year\" and \"some 4%\" of GDP. These are blog figures; the 2014 method article gives no numerical impacts."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "Freedom of information response, \"Illegal Production (N2)\". Supports: \"N2 includes drugs and illegal prostitution only\"; \"Prostitution is accounted for in COICOP 12.2 in HHFCE\"; the 2010 value of \"£5.6bn (current prices)\"."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI response N2"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\". Supports: \"As a further refinement, allowance was made to reduce the estimates made for prostitution in household final consumption expenditure by a factor to reflect the holiday taken by prostitutes\"; \"Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates\"; the \"As part of addressing a GNI ESA 1995 reservation\" passage on Blue Book 2014 improvements."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions article"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"12.2 Prostitution CP NSA £m\" (household final consumption expenditure on prostitution, current prices, £m), dataset BB, release date 31 October 2025. Supports: the series from 1985 to 2024, including 4,370 (2010), 5,993 (2019), 4,130 (2020) and 6,142 (2022), in £m. The CSV is generated from the same series address."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, MNC8 series page"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The 2014 ONS article is cited via a mirror on the UN Statistical Institute for Asia and the Pacific training site, because the ONS original URL returns 404. The headline effect figures come from Peter Patterson's 2014 blog post; the method article contains no numerical impacts."
---

## The incident

Since Blue Book 2014, UK GDP has included illegal drugs and prostitution. ONS's article on the change gives the reason: GNI "is used in the calculation of a Member State's contribution to the EU budget". A 2012 audit of methods across EU countries found "areas for improvement" that Member States "have to address by 2014". The change was "part of addressing a GNI ESA 1995 reservation". The inclusion rule is older than the change. The European System of National Accounts 1995 (ESA95) says in section 1.13 that "illegal transactions to which all units involved consent are included within the production boundary". ONS says nothing changed on that point between ESA95 and its successor, ESA 2010.

The article concedes "significant limitations in the availability of data", which "requires a number of assumptions". For prostitution, "there is no time series", so ONS varies its 2004 estimates by the male population. Eaves, a charity, estimated about 7,000 off-street prostitutes in London in 2004 by "calling numbers advertised in various media and asking how many prostitutes were in each place". The Metropolitan Police gave "115 prostitutes on the street at any one time in London". Scaling the 2 London counts up to the UK gives "c. 58,000 prostitutes in the whole country."

The price is £55 in 2004, from Punternet, varied by the CPI for personal services. Footnote 12, for Punternet, links to Wikipedia.

## Who lied

Nobody. The article prints its assumptions and labels the weak ones. The link to the male population is "a weak assumption". The assumption that purity-adjusted drug use per user stays constant is "probably false, but we have no data to challenge it". The cannabis import split is "an arbitrary assumption". The government spending assumption is "reasonable because government units are very unlikely to spend money on illegal drugs."

In an October 2014 blog post, ONS's deputy chief economic adviser, Peter Patterson, put the overall effect at "around £50 billion a year", "some 4%" of GDP. The May 2014 article "does not include numerical impacts". The headline effect figures come from the blog.

## The bit continues

The Blue Book 2016 revisions article describes "a further refinement". Prostitution estimates were reduced "by a factor to reflect the holiday taken by prostitutes". The factor: "Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates."

Prostitution spending for 2010 has 2 published figures. An ONS freedom of information reply gave £5.6bn at current prices. The ONS series now gives £4,370m. ONS does not say the holiday factor is the whole difference.

The series, MNC8, starts in 1985, before the 2014 article that introduced the inclusion. It is modelled, not observed. It falls from 5,993 in 2019 to 4,130 in 2020, then reaches 6,142 in 2022. The dataset was released 31 October 2025.
