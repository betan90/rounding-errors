---
title: "An arbitrary assumption, included in GDP"
exhibit: "017"
country: "United Kingdom"
status: "the series is still published; last release 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · drugs and prostitution in GDP, built from assumptions their authors call weak, arbitrary and probably false"
ledgerTitle: "The numbers: illegal drugs and prostitution in UK national accounts"
ledger:
  - label: "Prostitutes in the UK, modelled (ONS, 2014)"
    value: "c. 58,000"
  - label: "Clients per week, assumed (ONS, 2014)"
    value: "20, 25 or 30"
  - label: "Price per client, 2004 (ONS, 2014)"
    value: "£55"
  - label: "Drugs and prostitution, 2010: total / share of GDP (ONS FOI)"
    value: "£9097m / 0.58%"
  - label: "Prostitution in 2010: FOI reply / today's MNC8 series"
    value: "£5.6bn / £4,370m"
    gap: true
  - label: "Holiday factor applied to prostitution estimates (Blue Book 2016)"
    value: "12 weeks a year"
  - label: "Prostitution spending, 2019 / 2020 / 2022 (MNC8)"
    value: "£5,993m / £4,130m / £6,142m"
ledgerNote: "The FOI reply gives £5.6bn as prostitution in household final consumption expenditure, current prices. MNC8 is the same category, current prices. The MNC8 series starts in 1985; ONS's first estimate was published in 2014."
verdict:
  - key: "Fraud detected"
    value: "none. ONS published each assumption and flagged its weakness."
    long: true
  - key: "Rules broken"
    value: "none. ESA95 includes consensual illegal transactions inside the production boundary."
    long: true
  - key: "Usefulness of the headline figure"
    value: "as a level, limited by ONS's own labels: \"weak\", \"arbitrary\", \"probably false\". As a comparison across EU countries, it is what the rule asks for."
    long: true
verdictNote: "The series is published from 1985 to 2024, though its method says \"there is no time series\". The 2010 figure has been published as £5.6bn and as £4,370m. ONS gave the modelled workforce 12 weeks' holiday in 2016 and does not say that this is the whole difference. This site's arithmetic: 4,370 / 5,600 is 0.78, and 40 working weeks of 52 is 0.77. That is a coincidence of 2 ratios, not an ONS statement."
sources:
  - name: "Office for National Statistics"
    text: "Joshua Abramsky and Steve Drew, \"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014. The ONS original URL is dead; this is a mirror on the training site of the UN Statistical Institute for Asia and the Pacific, and the PDF carries the ONS header, authors and date. Supports: the EU budget purpose and the 2012 audit; ESA95 section 1.13 and the footnote on ESA 2010; the prostitution method (7000, 115, c. 58,000, 20, 25 and 30 clients, £55 in 2004, Punternet footnote 12, the male population assumption); the drugs assumptions as quoted; \"probably false\" 3 times and \"arbitrary\" 2 times in the text."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror of the ONS article"
  - name: "Peter Patterson"
    text: "ONS Deputy Chief Economic Adviser, \"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 October 2014: the desk research and the \"up to £10 billion a year\"; the requirement under the European System of Accounts 2010 and the comparability sentence."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "FOI response, \"Illegal Production (N2)\": N2 for 2010 at £9097 million, 0.58% of GDP (drugs 0.24%, prostitution 0.35%); prostitution in COICOP 12.2 in household final consumption expenditure at £5.6bn in current prices, 0.4% of GDP."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI response"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\": the allowance for prostitutes' holiday, with Statistics Netherlands' estimate of 12 weeks a year applied to the UK."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"12.2 Prostitution CP NSA £m\", dataset BB, release of 31 October 2025: every value for 1985 to 2024, including 4,370 in 2010, 5,993 in 2019, 4,130 in 2020 and 6,142 in 2022. The chart plots a modelled series, not an observed one."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, series MNC8"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The ONS 2014 article is cited via a mirror because its original ONS address no longer resolves. Patterson's quotes are reported as his blog's. The 0.78 and 0.77 ratios are this site's arithmetic, not ONS's."
---

## The incident

Gross national income "is used in the calculation of a Member State's contribution to the EU budget". After a 2012 audit, "a number of areas for improvement were identified which Member States have to address by 2014". One was illegal activity. ESA95, section 1.13, says "illegal transactions to which all units involved consent are included within the production boundary". ONS adds: "There are no changes in this area between ESA95 and ESA10."

In May 2014 ONS published how it would count drugs and prostitution. Its authors were Joshua Abramsky and Steve Drew.

For prostitution, the annual volume is P*C*52. Eaves, a charity, estimated approx 7000 off-street prostitutes in London in 2004 "by calling numbers advertised in various media and asking how many prostitutes were in each place". The Metropolitan Police counted 115 on the street at any one time. Scaled by UK population: c. 58,000. Clients per week came from "a Netherlands assumption with some research support": 20, 25 and 30. The price, £55 in 2004, came from Punternet. Footnote 12 for Punternet is "http://en.wikipedia.org/wiki/Punternet".

"As there is no time series, we vary the point estimates in time using the male population." ONS calls this "a weak assumption".

For drugs: "We assume that half of cannabis sold in the UK is imported and half home-grown. This is an arbitrary assumption." And: "The government final consumption expenditure assumption is reasonable because government units are very unlikely to spend money on illegal drugs."

## Who lied

Nobody. The article labels its own inputs. "Probably false" appears 3 times and "arbitrary" 2 times. One drugs assumption reads: "This assumption is probably false, but we have no data to challenge it."

Peter Patterson, ONS Deputy Chief Economic Adviser, wrote on a government blog that "ONS desk research (please note the italics for emphasis!)" yielded spending of "up to £10 billion a year". An ONS FOI reply gives 2010 drugs and prostitution as £9097 million, 0.58% of GDP.

## The bit continues

The Blue Book 2016 revisions article lists a refinement: prostitution estimates were reduced "to reflect the holiday taken by prostitutes". Statistics Netherlands estimated 12 weeks per year, "and the same factor has been applied to the UK estimates".

The FOI reply gives 2010 prostitution as £5.6bn. Today's series gives £4,370m. Those are 2 published figures.

ONS series MNC8 runs from 1985 to 2024. It reads 5,993 in 2019, 4,130 in 2020 and 6,142 in 2022, in £m. The last release was 31 October 2025.
