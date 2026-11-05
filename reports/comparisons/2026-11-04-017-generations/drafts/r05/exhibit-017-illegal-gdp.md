---
title: "This is an arbitrary assumption"
exhibit: "017"
country: "United Kingdom"
status: "still published; the series has run since the 2014 estimate, last Blue Book revision 2016, last MNC8 release 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "GDP · drugs and sex work added by assumption, priced from a page footnoted to Wikipedia"
ledgerTitle: "The numbers: ONS illegal drugs and prostitution in UK GDP, 2014 to 2025"
ledger:
  - label: "Estimated number of prostitutes, UK, scaled from a 2004 London count (ONS 2014)"
    value: "c. 58,000"
  - label: "Price source for sex acts, footnoted by ONS to (ONS 2014)"
    value: "the Wikipedia page for Punternet"
  - label: "Drugs assumptions ONS calls \"probably false\" (ONS 2014, count)"
    value: "3"
  - label: "ONS's own assumptions flagged \"arbitrary\" (ONS 2014, count)"
    value: "2"
  - label: "Prostitution in household spending, 2010: FOI reply (2015) vs today's published series (MNC8)"
    value: "£5.6bn vs £4,370m"
    gap: true
  - label: "Annual holiday given to modelled prostitutes, a Statistics Netherlands figure applied in Blue Book 2016"
    value: "12 weeks"
  - label: "Combined effect of drugs, prostitution and R&D on GDP level, Patterson 2014"
    value: "£50 billion a year, Patterson writes, some 4%"
ledgerNote: "4,370 divided by 5,600 is 0.78; 40 working weeks of 52 is 0.77. That division is this site's arithmetic, not ONS's; ONS does not say the holiday accounts for the whole gap."
verdict:
  - key: "Fraud detected"
    value: "none documented. ONS published the assumptions, including the words \"probably false\" and \"arbitrary\", in the same article that produced the estimates."
    long: true
  - key: "Rules broken"
    value: "none found. ONS's 2014 article says the production boundary has included consenting illegal transactions since ESA95, and that nothing changed in ESA 2010."
    long: true
  - key: "Usefulness of the headline figure"
    value: "low as a measurement, by ONS's own account: \"there is no time series\"; the number is a 2004 estimate carried forward by population and inflation, not observed year to year."
    long: true
verdictNote: "Patterson's 2014 blog post, written for the civil service's own quarterly, called the inclusion \"legally mandated through the European System of Accounts 2010\". ONS's own article, published the same year, says in a footnote that there are no changes in this area between ESA95 and its successor. Neither statement is a lie by the rules this site uses; one is a civil servant's gloss, the other the method document. The gloss is wrong about which rule did the mandating. The method is still running."
sources:
  - name: "Office for National Statistics"
    text: "\"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", Joshua Abramsky and Steve Drew, 29 May 2014. Cited via a mirror (the ONS original URL is dead): the production boundary under ESA95 section 1.13, with the footnote that \"there are no changes in this area between ESA95 and ESA10\"; the method \"P*C*52\" and \"there is no time series, we vary the point estimates in time using the male population\"; the 2004 Eaves and Metropolitan Police counts scaled to \"c. 58,000 prostitutes in the whole country\"; the price from Punternet, footnoted to Wikipedia; the drugs assumptions quoted as \"probably false\" and \"arbitrary\"; \"government units are very unlikely to spend money on illegal drugs\"."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror of the 2014 ONS article"
  - name: "Peter Patterson, ONS Deputy Chief Economic Adviser"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 Oct 2014: drugs and prostitution contributing \"up to £10 billion a year\"; R&D adding \"£18 billion a year\"; the combined effect on the level of GDP of \"around £50 billion a year\", described as \"some 4%\"; the inclusion as \"legally mandated through the European System of Accounts 2010\"."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "FOI response, \"Illegal Production (N2)\": prostitution in household final consumption expenditure for 2010 at \"£5.6bn (current prices), which is 0.4% of GDP\"; total N2 for 2010 of £9,097 million against GDP of £1,555,548 million."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI response"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\": the allowance made \"to reduce the estimates made for prostitution in household final consumption expenditure by a factor to reflect the holiday taken by prostitutes\", following a Statistics Netherlands estimate of 12 weeks a year applied to the UK figures."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions article"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"Prostitution CP NSA £m\", dataset BB: household final consumption expenditure on prostitution, current prices, release of 31 October 2025, giving £4,370m for 2010 and the full 1985 to 2024 run plotted in the chart."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, series MNC8"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The 2014 ONS article is cited via a mirror hosted by the UN Statistical Institute for Asia and the Pacific, because the original ons.gov.uk URL is dead; the PDF carries the ONS header, authors and date."
---

## The incident

Gross national income is used to calculate a member state's contribution to the EU budget. In 2012 an EU-wide audit found areas member states had to fix by 2014. For the UK, that meant putting illegal drugs and prostitution into the national accounts, under a production boundary that ONS says has applied to consenting illegal transactions since ESA95, unchanged in ESA 2010.

ONS's own 2014 article, by Joshua Abramsky and Steve Drew, is unusually candid about what that took. There is no time series for the number of prostitutes in the UK, so the estimate starts from a 2004 count: a charity's call-round of advertised numbers in London, plus a Metropolitan Police street count, scaled up to "c. 58,000 prostitutes in the whole country". Clients per week come from "a Netherlands assumption". The price, £55 in 2004 and inflated forward since, comes from an estimate ONS footnotes to the Wikipedia page for Punternet.

The drugs side is no steadier. "We assume that the purity-adjusted amount of drugs consumed by the average user remains constant over time. This assumption is probably false, but we have no data to challenge it." Half of UK cannabis is assumed imported, half home-grown: "This is an arbitrary assumption." Government spending on illegal drugs is assumed at zero, which ONS calls reasonable, because "government units are very unlikely to spend money on illegal drugs." "Probably false" appears 3 times in the article; "arbitrary", twice.

## Who lied

Nobody. ONS published the method next to the estimate, flaws labelled in its own words.

Patterson's October 2014 post for the civil service's Quarterly put a number on the result: drugs and prostitution worth "up to £10 billion a year", R&D another "£18 billion a year", and the combined effect raising GDP's level by "around £50 billion a year", some 4%. He called the inclusion "legally mandated through the European System of Accounts 2010". ONS's own article, five months earlier, had footnoted that there is no change in this area between ESA95 and ESA 2010. The accounts changed in 2014. The rule did not.

## The bit continues

In Blue Book 2016, ONS cut the prostitution estimate by a holiday factor: 12 weeks a year, borrowed from Statistics Netherlands. A 2015 FOI reply had put 2010 prostitution spending at £5.6bn. The MNC8 series running today puts the same year at £4,370m. Dividing one by the other gets 0.78, close to the 0.77 you'd get from a 40-week working year. ONS does not say the holiday explains the whole gap; it is 2 published figures, 5 years apart.

The series still runs. MNC8 was last released on 31 October 2025, carried forward on the same population and inflation adjustments as in 2014. In 2020 it fell to £4,130m from £5,993m the year before; no ONS source explains why. By 2024 it had reached £6,431m.
