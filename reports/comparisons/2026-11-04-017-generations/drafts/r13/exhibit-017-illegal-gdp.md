---
title: "£6.4 billion of UK GDP, modelled, not measured"
exhibit: "017"
country: "United Kingdom"
status: "the series is still published; last release 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · a 2004 phone count, scaled by population, inside the UK's legally required GDP"
ledgerTitle: "The numbers: ONS illegal drugs and prostitution in GDP, 2004 to 2024"
ledger:
  - label: "UK prostitutes, scaled from a 2004 London count (ONS, 2014)"
    value: "c. 58,000"
  - label: "Off-street prostitutes in London, Eaves charity phone count, 2004"
    value: "approx 7,000"
  - label: "Price per client, 2004, sourced to Punternet (ONS, 2014)"
    value: "£55"
  - label: "Prostitution in GDP (HHFCE), 2010, FOI response, Nov 2015"
    value: "£5.6bn"
  - label: "Prostitution in GDP (HHFCE), 2010, MNC8 series today"
    value: "£4,370m"
    gap: true
  - label: "Holiday assumed for prostitutes, from a Statistics Netherlands estimate (Blue Book 2016)"
    value: "12 weeks a year"
  - label: "Illegal drugs and prostitution (N2) share of GDP, 2010 (ONS FOI)"
    value: "0.58%"
  - label: "Combined boost to GDP from illegal activities and R&D (Patterson, 2014)"
    value: "around £50bn a year, about 4%"
ledgerNote: "4,370 / 5,600 = 0.78; 40 of 52 working weeks = 0.77. This site's arithmetic, not ONS's; ONS does not state the holiday accounts for the whole gap between the 2 published 2010 figures."
verdict:
  - key: "Fraud detected"
    value: "none alleged. ONS published every assumption, including 3 uses of \"probably false\" and 2 of \"arbitrary\", in the article that introduced the method."
    long: true
  - key: "Rules broken"
    value: "none found. The production boundary rule has stood since ESA95 section 1.13; ONS's own footnote says there are \"no changes in this area\" in ESA 2010."
    long: true
  - key: "Usefulness of the headline figure"
    value: "low as a trend measure. ONS's own method says \"there is no time series\" for prostitutes, so the chart plots a scaled assumption, not an observation."
    long: true
verdictNote: "The method was never hidden. ONS's 2014 article labels its own weak points inside the same document that sets the numbers: a price footnoted to Wikipedia, a volume formula run on a single 2004 count, a holiday borrowed from the Dutch statistics office. The series built on that method, MNC8, is still published, last released 31 October 2025, and still feeds the GDP total the UK reports to the EU and uses to set its own growth figures."
sources:
  - name: "Office for National Statistics (mirror)"
    text: "Joshua Abramsky and Steve Drew, \"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014. Original ons.gov.uk URL is dead; read via a UN Statistical Institute for Asia and the Pacific training-site mirror, which carries the ONS header, authors and date. Source for the ESA95/ESA2010 footnote, the drugs assumptions table, the prostitution method (P*C*52, the 2004 Eaves and Metropolitan Police counts, the 58,000 total, the £55 Punternet price footnoted to Wikipedia), and the self-employment assumption."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror of the 29 May 2014 ONS article"
  - name: "Peter Patterson, ONS"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 October 2014. Source for the £50bn/4% and £10bn figures and the \"legally mandated through the European System of Accounts 2010\" quote."
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "FOI response, \"Illegal Production (N2)\": 2010 N2 total £9,097m against total GDP £1,555,548m, 0.58% of GDP; prostitution in HHFCE for 2010 given as £5.6bn, 0.4% of GDP."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI: Illegal Production (N2)"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\": the refinement reducing the prostitution HHFCE estimate by a factor reflecting a holiday, using Statistics Netherlands' estimate of 12 weeks a year, applied to the UK figures."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions article"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"Prostitution CP NSA\", dataset BB, household final consumption expenditure on prostitution at current prices, £m, 1985 to 2024, last released 31 October 2025. Source for the 2010 figure of £4,370m and the chart series."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, series MNC8/BB"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. The 2014 ONS article is cited via a mirror because the original ons.gov.uk page is dead; the mirror's header, authors and date match the original as described elsewhere. Patterson's quotes are reported as his own blog post, not as ONS's institutional position."
---

## The incident

In 2014 the Office for National Statistics added illegal drugs and prostitution to UK GDP. The change followed a 2012 EU audit: gross national income "is used in the calculation of a Member State's contribution to the EU budget", and member states had to align their methods by 2014. The underlying rule was not new. The European System of National Accounts 1995, section 1.13, already put illegal transactions "to which all units involved consent" inside the production boundary, and ONS's own footnote confirms the successor rule, ESA 2010, is identical: "There are no changes in this area between ESA95 and ESA10."

The article that announced the change, by Joshua Abramsky and Steve Drew, published the method and its weaknesses in the same document. On cannabis: "We assume that half of cannabis sold in the UK is imported and half home-grown. This is an arbitrary assumption." On government spending: "government units are very unlikely to spend money on illegal drugs." On prostitution: "there is no time series", so a formula of prostitutes times clients times 52 weeks runs on a single 2004 estimate, scaled since by the male population. That estimate combined a charity's count of "approx 7000 off-street prostitutes in London", made by phoning numbers advertised in various media, with the Metropolitan Police's count of "115 prostitutes on the street at any one time", scaled to a UK total of "c. 58,000". The price per client, £55 in 2004, came from Punternet, footnoted to a Wikipedia page.

## Who lied

Nobody. ONS published its own weak points beside its numbers. The 2014 article uses "probably false" 3 times and "arbitrary" twice about its own assumptions, including the claim that prostitute numbers "has the same pattern through time as the 16+ male population", which it calls "a weak assumption". Treating all prostitutes and pimps as self-employed is called "a controversial assumption".

Peter Patterson, ONS's deputy chief economic adviser, wrote in an October 2014 blog that illegal activities and R&D together raised GDP "by around £50 billion a year, some 4%", and that the inclusion is "legally mandated through the European System of Accounts 2010". ONS's own 2014 article says otherwise about the rule's history: nothing changed between ESA95 and ESA 2010.

## The bit continues

Blue Book 2016 added a further adjustment: "allowance was made to reduce the estimates made for prostitution... to reflect the holiday taken by prostitutes." Statistics Netherlands had put the total at "12 weeks per year"; ONS applied the same factor to the UK.

Two publications give two figures for the same year. A November 2015 FOI response puts 2010 prostitution in GDP at £5.6bn. The MNC8 series today puts the same year at £4,370m. 4,370 divided by 5,600 is 0.78; 40 of 52 working weeks is 0.77. That arithmetic is this site's, not ONS's; ONS does not say the holiday accounts for the whole gap.

The series is still published. Last release: 31 October 2025. 2024 figure: £6,431m.
