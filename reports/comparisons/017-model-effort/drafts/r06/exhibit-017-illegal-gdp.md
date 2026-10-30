---
title: "Sex, drugs and GDP, with 12 weeks' holiday"
exhibit: "017"
country: "United Kingdom"
status: "the series is still published; its latest release is dated 31 October 2025"
category: "the assumptions were the data"
tags: ["gdp", "national-accounts", "measurement-definitions", "europe"]
date: 2026-10-23
teaser: "National accounts · a holiday factor from the Netherlands, applied to UK prostitution spending"
ledgerTitle: "The numbers: UK prostitution in GDP, 2004 to 2024"
ledger:
  - label: "Prostitutes in the UK, scaled from a 2004 London count (ONS, 2014)"
    value: "c. 58,000"
  - label: "Clients per week, calculated on (ONS, 2014)"
    value: "20, 25 and 30"
  - label: "Holiday allowance, from Statistics Netherlands (ONS Blue Book 2016)"
    value: "12 weeks a year"
  - label: "2010 prostitution in household consumption, FOI reply vs current series (MNC8)"
    value: "£5.6bn vs £4,370m"
    gap: true
  - label: "Price assumed in 2004, Punternet (ONS, 2014)"
    value: "£55"
  - label: "Effect on the level of GDP of the 2014 changes (Patterson, 2014)"
    value: "around £50 billion a year, some 4%"
  - label: "Prostitution share of GDP, 2010 (ONS FOI reply)"
    value: "0.35%"
ledgerNote: "Every row is a model output or one of its inputs. The 2 figures for 2010 are both at current prices."
verdict:
  - key: "Fraud detected"
    value: "none alleged. ONS printed its assumptions and labelled the weak ones."
    long: true
  - key: "Rules broken"
    value: "none found. Patterson wrote that the inclusion is \"legally mandated\"."
    long: true
  - key: "Usefulness of the headline figure"
    value: "low as a measurement. ONS says its estimates are \"partly based\" on assumptions, and that this \"applies especially\" to prostitution."
    long: true
verdictNote: "The method is printed in full, and the series is still published, with 2024 its latest year and the last release dated 31 October 2025. Patterson's blog gives the reason for keeping it: \"Comparability between nations dictates that all countries include it in their GDP figures.\" For 2010, ONS has published 2 figures, and they do not match."
sources:
  - name: "Office for National Statistics"
    text: "Joshua Abramsky and Steve Drew, \"Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts\", 29 May 2014. Read through a mirror on the UN Statistical Institute for Asia and the Pacific training site, because the ONS original URL is dead; the mirror PDF carries the ONS header, authors and date. Supports: the EU budget rationale (GNI \"is used in the calculation of a Member State's contribution to the EU budget\"); the ESA95 rule (\"illegal transactions to which all units involved consent\"); the prostitution method (the 2004 London counts, c. 58,000, the male-population variation, clients of 20, 25 and 30, the £55 Punternet price and its Wikipedia footnote); the drug assumptions quoted in the body."
    url: "https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf"
    urlLabel: "unsiap.or.jp, mirror of the ONS PDF"
  - name: "Peter Patterson, ONS Deputy Chief Economic Adviser"
    text: "\"Sex, Drugs and GDP\", Civil Service Quarterly blog, 15 Oct 2014. Reported in the body as his blog post, not as an ONS finding. Supports: spending on these activities \"contributes up to £10 billion a year to the level of GDP\"; the overall effect \"to raise the level of GDP by around £50 billion a year\", some 4%; \"legally mandated\"; \"Comparability between nations dictates that all countries include it in their GDP figures.\""
    url: "https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/"
    urlLabel: "quarterly.blog.gov.uk, 15 Oct 2014"
  - name: "Office for National Statistics"
    text: "FOI response, \"Illegal Production (N2)\". Supports: prostitution in household consumption (COICOP 12.2) at £5.6bn for 2010, current prices, 0.4% of GDP; prostitution at 0.35% of GDP for 2010."
    url: "https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2"
    urlLabel: "ons.gov.uk, FOI response N2"
  - name: "Office for National Statistics"
    text: "\"Revisions to gross domestic product in Blue Book 2016\". Supports: the holiday factor reducing the prostitution estimates (\"by a factor to reflect the holiday taken by prostitutes\"), with Statistics Netherlands' estimate of 12 weeks per year applied to the UK estimates."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016"
    urlLabel: "ons.gov.uk, Blue Book 2016 revisions"
  - name: "Office for National Statistics"
    text: "Time series MNC8, \"12.2 Prostitution CP NSA £m\" (household final consumption expenditure on prostitution, current prices), dataset BB, release 31 October 2025. Supports: the 2010 value (£4,370m); the 1985 start (£1,078m); 2019 (£5,993m); 2020 (£4,130m); the chart. The series is modelled, not observed."
    url: "https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb"
    urlLabel: "ons.gov.uk, MNC8 series page"
disclosure: "This entry was drafted with AI (Claude did the research sweeps and first draft). The editorial voice, the opinions, and any surviving errors are mine. Every figure was checked against the linked primary source before publishing. Provenance: the 2014 ONS article is read through a mirror on the UN Statistical Institute for Asia and the Pacific site, because the ONS original URL is dead; the mirror PDF carries the ONS header, authors and date. The Punternet price, the clients range and the holiday factor are ONS's own inputs, reported as ONS states them. Patterson's figures are reported as his blog post's claims. The comparison of the 2 figures for 2010 and the holiday arithmetic are this site's, not ONS's. ONS's price footnote points to Wikipedia; Wikipedia is not cited as a source here."
---

## The incident

In May 2014 ONS published "Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts", by Joshua Abramsky and Steve Drew. The reason was the EU budget. Gross national income "is used in the calculation of a Member State's contribution to the EU budget", and a 2012 audit had flagged areas to fix by 2014.

The rule was not new. The European System of National Accounts 1995 includes "illegal transactions to which all units involved consent" within the production boundary.

The prostitution estimate starts with a headcount. Eaves, a charity, phoned advertised numbers in 2004 and estimated approx 7000 off-street prostitutes in London. The Metropolitan Police counted 115 on the street at any one time. Adding them and scaling by UK population gives "c. 58,000 prostitutes in the whole country."

The 2004 point estimate is then varied by the male population: "As there is no time series, we vary the point estimates in time using the male population." Clients per week were calculated on 20, 25 and 30, "Following a Netherlands assumption with some research support". The text does not say which was used. The price was £55 in 2004, from Punternet. Footnote 12 for that price links to a Wikipedia page.

The assumption that drug consumption per user stays constant over time: "This assumption is probably false, but we have no data to challenge it." Half of cannabis is assumed imported: "This is an arbitrary assumption." The government assumption is "reasonable because government units are very unlikely to spend money on illegal drugs."

In October 2014 Peter Patterson, ONS's deputy chief economic adviser, wrote on a government blog that spending on these activities "contributes up to £10 billion a year to the level of GDP". The overall effect, he wrote, was "to raise the level of GDP by around £50 billion a year", some 4%.

## Who lied

Nobody. ONS published each assumption and labelled the weak ones. The article calls its own inputs "probably false", "an arbitrary assumption" and "a weak assumption". It says its estimates are "partly based" on assumptions, and that this "applies especially" to prostitution.

## The bit continues

In 2016 the Blue Book revisions added a holiday. ONS reduced the prostitution estimates "by a factor to reflect the holiday taken by prostitutes". Statistics Netherlands had estimated "the total holidays to be 12 weeks per year", and "the same factor has been applied to the UK estimates."

An FOI reply put 2010 prostitution at £5.6bn, at current prices. The current MNC8 series gives £4,370m for the same year. This site's arithmetic: £4,370m is 78% of £5.6bn, and 40 working weeks in 52 is 77%. ONS does not state that the holiday accounts for the whole difference.

The series starts at £1,078m in 1985. Its first estimate was published in 2014, and it is modelled, not observed. It falls to £4,130m in 2020, from £5,993m in 2019.
