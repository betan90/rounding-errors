# Exhibit 017 research brief: illegal drugs and prostitution in UK GDP

Researcher pass, then the main session read every primary below directly (pdftotext for the ONS PDF, curl for the ONS pages and CSV). Publish date if built today: 2026-10-23. Local text copies are in scratchpad/gdp-dl/ (ons2014-flat.txt, bb2016.txt, foi.txt, patterson.txt, mnc8.csv).

## The shape

An official, legally required figure built from assumptions its own authors label "probably false", "arbitrary" and "weak", with a price source footnoted to Wikipedia. Nobody hid anything: the absurdity is all in the published method. Later, ONS gave the modelled sex workers 12 weeks' holiday, a figure taken from the Netherlands.

Recommended category: new structural line, "the assumptions were the data". (Closest live shape is "the baseline did the work" (008), but the point here is the published assumptions, not a baseline choice. If you prefer reuse, 008's line also works: a 2004 London count scaled to the UK.) A new category must be added to the CLAUDE.md category list at build time.
Tags: gdp, national-accounts, measurement-definitions, europe. Country: "United Kingdom".

## Chart: yes, clean official series

ONS time series MNC8, "12.2 Prostitution CP NSA £m" (household final consumption expenditure on prostitution, current prices, £m), dataset BB, release date 31-10-2025. CSV: https://www.ons.gov.uk/generator?format=csv&uri=/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb ; page: https://www.ons.gov.uk/economy/nationalaccounts/satelliteaccounts/timeseries/mnc8/bb
Full series (£m): 1985 1078, 1986 1136, 1987 1200, 1988 1290, 1989 1409, 1990 1532, 1991 1665, 1992 1740, 1993 1793, 1994 1828, 1995 1894, 1996 1971, 1997 2079, 1998 2193, 1999 2360, 2000 2538, 2001 2733, 2002 2915, 2003 3107, 2004 3302, 2005 3483, 2006 3677, 2007 3901, 2008 4107, 2009 4227, 2010 4370, 2011 4491, 2012 4635, 2013 4761, 2014 4888, 2015 5046, 2016 5329, 2017 5540, 2018 5703, 2019 5993, 2020 4130, 2021 4913, 2022 6142, 2023 6252, 2024 6431.
- The series starts in 1985; ONS's first estimate was published in 2014. ONS's own method (below) says "there is no time series" and varies a 2004 point estimate by the male population and the CPI. So the chart plots the assumptions. Caption must say the series is modelled, not observed.
- 2020: 4,130, down 31% from 5,993 in 2019; 2022: 6,142. No ONS source found explaining the 2020 fall: state the numbers only, no cause.

## VERIFIED

### ONS, "Changes to National Accounts: Inclusion of Illegal Drugs and Prostitution in the UK National Accounts", Joshua Abramsky and Steve Drew, 29 May 2014
Original URL is dead (ons.gov.uk/ons/... 404s). Read via a mirror on the UN Statistical Institute for Asia and the Pacific training site: https://unsiap.or.jp/sites/default/files/pdf/e-learning_el_material_4_eco_4_1_eco_stat_1508_gdp_kor_reference_materialillegal_activities_in_the_uk_national_accounts.pdf (the PDF carries the ONS header, authors and date; source text must say it is a mirror).
- Why: GNI "is used in the calculation of a Member State's contribution to the EU budget"; "In 2012, following a comprehensive audit of the methods used across EU countries, a number of areas for improvement were identified which Member States have to address by 2014."
- The rule is old: "The European System of National Accounts 1995 (ESA95) ... section 1.13 - states that illegal transactions to which all units involved consent are included within the production boundary". Footnote: "This is also the case within ESA95's successor, ESA 2010; see Eurostat (2010), section 1.79. There are no changes in this area between ESA95 and ESA10." (So: do NOT say ESA 2010 introduced it.)
- Exec summary: "significant limitations in the availability of data ... requires a number of assumptions on which the estimates are, therefore, partly based. This applies especially to the estimates of prostitution activity." The article "does not include numerical impacts".
- Prostitution method: annual volume "P*C*52"; "As there is no time series, we vary the point estimates in time using the male population". Number of prostitutes: Eaves (a charity) 2004 "estimated that there were approx 7000 off-street prostitutes in London in that year; this was done by calling numbers advertised in various media and asking how many prostitutes were in each place"; Metropolitan Police "115 prostitutes on the street at any one time in London"; "Adding these and scaling up by UK population ... gives c. 58,000 prostitutes in the whole country."
- Clients per week: "Following a Netherlands assumption with some research support ... we calculate estimates based on 20, 25 and 30." (Which one was used is NOT stated in what was read; do not say 25.)
- Price: "an estimate from Punternet supported by a 2004 journal article. This is £55 in 2004", varied by the CPI for personal services. Footnote 12 for Punternet is "http://en.wikipedia.org/wiki/Punternet" (also in the reference list).
- Assumption 1: "the number of prostitutes has the same pattern through time as the 16+ male population. This is a weak assumption ... It is necessary because we have no time series data for the number of prostitutes."
- Intermediate consumption: "each prostitute spent the equivalent of 125 per year on clothes and 0.50 per client on condoms in 2007" (euro sign lost in extraction; text says values "are converted to £ using the Bank of England annual average spot rate", following de Heij 2007). Do not print a currency symbol unless certain; say "125 euros" only if the fact-checker confirms the euro basis.
- Assumption 3b: "There is no employment in prostitution; all prostitutes and pimps are self-employed. This is a controversial assumption".
- Drugs assumptions (Table 3), verbatim:
  - "We assume that the purity-adjusted amount of drugs consumed by the average user remains constant over time. This assumption is probably false, but we have no data to challenge it."
  - "We assume that half of cannabis sold in the UK is imported and half home-grown. This is an arbitrary assumption."
  - "The government final consumption expenditure assumption is reasonable because government units are very unlikely to spend money on illegal drugs."
  - "We assume that no drugs other than cannabis are produced in the UK. While this is probably false, we do not have any evidence to the contrary."
  - "probably false" appears 3 times in the article (grep count); "arbitrary" 2 times.
  - Cutting drugs is not production: "An analogy would be a retailer selling alcohol that they have illegally diluted - they are still a retailer."

### Peter Patterson, ONS Deputy Chief Economic Adviser, "Sex, Drugs and GDP", Civil Service Quarterly (gov.uk blog), 15 Oct 2014. https://quarterly.blog.gov.uk/2014/10/15/sex-drugs-and-gdp/
- "ONS desk research (please note the italics for emphasis!) into the numbers of prostitutes and the price of drugs yielded the result that spending on these illegal activities in the UK contributes up to £10 billion a year to the level of GDP."
- R&D: "This adds on average £18 billion a year to the level of GDP."
- "the overall effect has been to raise the level of GDP by around £50 billion a year – some 4%." (quote contains an en dash in the original; avoid quoting the dash, paraphrase or cut at "a year")
- "legally mandated through the European System of Accounts 2010"; "Comparability between nations dictates that all countries include it in their GDP figures."

### ONS FOI response "Illegal Production (N2)", https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/illegalproductionn2 (dated 6 Nov 2015 per researcher; confirm date on page)
- "N2 includes drugs and illegal prostitution only. Total N2 for 2010 = £9097 (million). Total GDP (Production) = £1555548 (million). N2 as % of GDP = 0.58% Drugs % of GDP = 0.24% Prostitution % of GDP = 0.35%"
- "Prostitution is accounted for in COICOP 12.2 in HHFCE. The value for 2010 is £5.6bn (current prices), which is 0.4% of GDP."

### ONS, "Revisions to gross domestic product in Blue Book 2016", https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/articles/nationalaccountsarticles/revisionstogrossdomesticproductinbluebook2016
- "As part of addressing a GNI ESA 1995 reservation, improvements were implemented to the measurement of illegal activities in Blue Book 2014 ... As a further refinement, allowance was made to reduce the estimates made for prostitution in household final consumption expenditure by a factor to reflect the holiday taken by prostitutes. Statistics Netherlands have estimated the total holidays to be 12 weeks per year and the same factor has been applied to the UK estimates."
- The refinement is listed in the Blue Book 2016 revisions article (i.e. a 2016 change).

### Derived (main session arithmetic; label as such if used)
- 2010 prostitution: £5.6bn in the Nov 2015 FOI reply; £4,370m in today's MNC8. 4,370 / 5,600 = 0.78. 40/52 working weeks = 0.77. Consistent with the 12-week holiday, but ONS does not state that this is the whole difference: present as 2 published figures, not as a computed cause.

## CUT (unverified)
- £5.3bn prostitution / £4.4bn drugs split for 2009; 60,879; £67.16; "25 clients" as the chosen value; 0.7% of 2009 GDP. Secondary only.
- Italy's figures (ISTAT €15.5bn etc.), Ig Nobel prize: secondary only.
- Eurostat lifting the reservation in 2015; "all 27 included all 3 types": snippet only.
- Any country refusing to include prostitution: not found.
- Ireland CSO shares (verified by researcher, but off-topic; omit for length).
- Cause of the 2020 fall.
- Wikipedia: never cited. (Reporting that ONS's footnote points to Wikipedia is reporting ONS's source, not citing Wikipedia; the source entry is the ONS article.)
