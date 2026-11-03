# Exhibit 019 research brief: Japan's Monthly Labour Survey

Researcher pass at medium effort (3 minutes; most MHLW pages returned 404 to it), then the main session downloaded and read every primary below directly on 3 November 2026 (curl; MHLW has taken the 2019 pages down, so they were read from the Wayback Machine's copies, whose URLs are given). Text copies in scratchpad/019/. Publish date if built today: 2026-11-03.

## The shape

Japan's Monthly Labour Survey (毎月勤労統計調査), a "fundamental statistic" under the Statistics Act, was supposed to survey every establishment with 500 or more employees. From 2004, in Tokyo, the Ministry of Health, Labour and Welfare (MHLW) surveyed about a third of them and published the results as a full count. It also skipped the reweighting a sample needs, so published wages came out low from 2004 to 2017. In January 2018 it began reweighting Tokyo without saying so. In December 2018 the Ministry of Internal Affairs and Communications (MIC) noticed a break between 2017 and 2018. Unemployment and workers' compensation benefits are indexed to this survey, so about 19 million benefit cases had been underpaid.

Recommended category: new, "the census was a sample". It describes the gap's shape flatly: the published method was a full count; the actual method was a third. Alternative if the drafter prefers: none in the existing list fits; do not reuse "nobody lied" (the reports found false statements).
Tags: ["asia"] (the vocabulary has no labour tag; do not invent one). Country: "Japan". Slug: 019-japan-wage-survey.
Exemplars: 015 (chart, recent) and 011 (an institution correcting itself).

## VERIFIED

### MHLW, "毎月勤労統計調査において全数調査するとしていたところを一部抽出調査で行っていたことについて", press release, 11 January 2019 (the ministry's own fact sheet)
Page: https://web.archive.org/web/2020/https://www.mhlw.go.jp/stf/newpage_03207.html (original https://www.mhlw.go.jp/stf/newpage_03207.html, now 404)
PDF: https://web.archive.org/web/2019/https://www.mhlw.go.jp/content/10700000/000467631.pdf
- The rule and the practice, verbatim: "「500 人以上規模の事業所」については、調査計画及び公表資料で全数調査することとしていたところ、平成 16 年以降、厚生労働省から東京都に対し、厚生労働省が抽出した事業所名簿を送付し、当該名簿に基づき抽出調査を行うこととしていました。" Translation: For "establishments with 500 or more employees", the survey plan and published materials said they would be surveyed in full, but from 2004 MHLW sent Tokyo a list of establishments it had sampled and had the survey done on that list.
- Verbatim: "東京都における「500 人以上規模の事業所」の平成 30 年の調査対象として抽出した事業所数は、全数調査であれば 1,464 事業所でしたが、実際に平成 30 年 10 月分の調査対象事業所数は概ね３分の１の 491 事業所でした。" Translation: A full count of Tokyo's 500+ establishments for 2018 would have been 1,464; the October 2018 survey covered 491, about a third.
- Verbatim: "平成 30 年６月に、神奈川県、愛知県、大阪府に対し、「500 人以上規模の事業所」について、平成 31 年から抽出調査を行う予定である旨の連絡をしていましたが、既に撤回しました。" Translation: In June 2018 MHLW had told Kanagawa, Aichi and Osaka that it planned to sample their 500+ establishments from 2019; this has been withdrawn.
- No reweighting: Tokyo was sampled while other prefectures were counted in full, but tabulation up to 2017 assumed one sampling rate nationwide, "このため東京都分の復元が行われていませんでした" (so Tokyo's results were not reweighted). Also, for Tokyo's 499-and-under establishments, some reweighting was skipped from 2009 to 2017. Result, verbatim: "平成 16 年から平成 29 年までの調査分の「きまって支給する給与」等の金額が、低めになっているという影響がありました。" Translation: amounts such as "regular pay" for 2004 to 2017 came out low.
- The quiet fix, verbatim note: "（注）なお、平成 30 年１月以降の調査分の集計については、復元されています。" Translation: Note: tabulation from January 2018 onward has been reweighted.
- Also: the number of establishments surveyed was "概ね１割程度少なく" (about 10% fewer) than published, "確認できた範囲では、平成８年以降" (as far as could be confirmed, since 1996).
- How it surfaced, paraphrase: in December 2018 MIC pointed out a discontinuity between 2017 and 2018 in the 500+ establishments; at a 13 December meeting the chair of the Statistics Commission said, in substance, that not doing a full count was a big problem. Verbatim note: "一部の職員は総務省から指摘を受ける前に認識していましたが、これらを組織全体で共有してはいませんでした。" Translation: some staff knew before MIC raised it, but this was not shared across the organisation.
- Re-tabulation: for 2012 onward (where the data needed to reweight still existed) MHLW published "再集計値" (re-tabulated values). Verbatim: "「きまって支給する給与」の「再集計値」の公表値とのかい離は金額ベースでは平均で 0.6％でした。" Translation: re-tabulated regular pay differed from the published values by 0.6% on average. For 2004 to 2011, where the data no longer existed, MHLW made "給付のための推計値" (estimates for benefit purposes) by adding that 0.6% to the 2004 published value and growing it at the published rates.

### MHLW, "雇用保険、労災保険等の追加給付について", press release, 11 January 2019
https://web.archive.org/web/2020/https://www.mhlw.go.jp/stf/newpage_03208.html (original now 404)
- Cause, verbatim: "全数調査するとしていたところを一部抽出調査で行っていたことにより、平成16年以降の同調査における賃金額が低めに出ていたことから...給付額に影響が生じております。" Translation: because a survey meant to be a full count was done as a partial sample, its wages came out low from 2004, affecting benefit amounts.
- Estimates "at this point", verbatim lines and translation:
  - Employment insurance: "一人当たり平均約1,400円、延べ約1,900万人、給付費約280億円" (average about 1,400 yen per person, about 19 million person-cases, about 28 billion yen).
  - Workers' compensation pensions: "一人当たり平均約9万円、延べ約27万人、給付費約240億円" (about 90,000 yen per person, about 270,000 person-cases, about 24 billion yen).
  - Workers' compensation leave benefits: "一人一ヶ月当たり平均約300円、延べ約45万人、給付費約1.5億円" (about 300 yen per person per month, about 450,000 person-cases, about 150 million yen).
  - Seamen's insurance: "一人当たり平均約15万円、約1万人、給付費約16億円" (about 150,000 yen per person, about 10,000 people, about 1.6 billion yen).
  - Employer subsidies: "対象件数延べ30万件、給付費約30億円" (about 300,000 cases, about 3 billion yen).
- Arithmetic: the widely cited "about 19.73 million people, 53.7 billion yen" is the sum of the first 4 lines (person-cases, not distinct people). MHLW's release gives the lines, not that total. If the exhibit uses a total, say it is the sum of MHLW's lines; safer to use the employment insurance line alone.

### MHLW, "毎月勤労統計調査における不適切な事務処理に関する関係者の処分等について", 22 January 2019
https://web.archive.org/web/2021/https://www.mhlw.go.jp/content/10108000/000472513.pdf (original now 404)
- The table lists 22 officials: 6 serving (the administrative vice-minister and the vice-minister for policy coordination, 訓告/reprimand; the director-general for statistics, pay cut of 1/10 for 1 month; 3 others, pay cuts of 1/10 for 3 to 6 months) and 16 former officials judged to deserve the equivalent ("相当"). Verbatim: "退職しているため処分することはできないが減給処分相当の者については、相当する額の自主返納を求める。" Translation: those who have retired cannot be disciplined, but those deserving a pay cut will be asked to return the equivalent amount voluntarily. (1 of the 16 was on secondment, to be disciplined on return.)
- The minister returned 4 months' salary and a bonus voluntarily. Use the role, not the name.

### Special Inspection Committee (毎月勤労統計調査等に関する特別監察委員会), report of 22 January 2019
https://web.archive.org/web/2020/https://www.mhlw.go.jp/content/10108000/000472506.pdf (original now 404)
- Statistics Act: the mismatch between the approved survey plan and the actual method "統計法第９条及び第１１条に違反するものと考えられる" (is considered to violate Articles 9 and 11 of the Statistics Act). On Article 60 (making a fundamental statistic untrue, a crime): reweighting from 2018 was to improve accuracy, so it is "意図的に「基幹統計をして真実に反するものたらしめる行為」...をしたとまでは認められない" (not found to be an intentional act of making a fundamental statistic untrue).
- On concealment, about one official: "隠蔽する意図があるとまでは認められなかった" (an intent to conceal was not found).

### Special Inspection Committee, supplementary report, 27 February 2019
https://web.archive.org/web/2020/https://www.mhlw.go.jp/content/10108000/000483640.pdf (original now 404)
- False statements, verbatim: "平成27年検討会において全数調査である旨の事実と異なる説明をしたこと、平成28年のローテーション・サンプリング方式導入の際の調査計画の変更申請においても事実と異なる全数調査であることを記載したことなど、公的な場で、課（室）の長の判断の下に、真実に反することを認識しながら、事実と異なる虚偽の申述を行った。" Translation: at a 2015 study group it gave an untrue explanation that the survey was a full count, and in the 2016 application to change the survey plan it again wrote, untruly, that it was a full count; in public settings, on the judgment of the head of the division, knowing it was untrue, it made false statements.
- Organised concealment: the committee notes the concept has no settled definition, defines concealment as knowingly and intentionally hiding a violation, and finds that the staff involved saw the problem, subjectively, as statistically harmless or within tolerance, not as a serious wrong; it did not find concealment in that sense. Paraphrase only; the source sentence is long.

### Statistics Commission (統計委員会), opinion to the Minister of Health, Labour and Welfare, 22 January 2019
https://www.soumu.go.jp/main_content/000595715.pdf (live)
- Restates the 1,464 / 491 / "概ね３分の１" figures and the 2004 to 2017 missing reweighting.
- Verbatim: "政策立案の基盤となり多方面に活用される公的統計の信頼に疑念を生じさせたこの事案を、極めて遺憾なことと認識する。" Translation: the Commission regards this case, which raised doubts about the reliability of official statistics that underpin policy-making, as extremely regrettable.
- First demand: "東京都の「500 人以上規模の事業所」の全数調査を可及的速やかに履行すること" (carry out the full count of Tokyo's 500+ establishments as soon as possible).

### MHLW monthly releases
- June 2018 final (8 August... dated 22 August 2018): https://www.mhlw.go.jp/toukei/itiran/roudou/monthly/30/3006r/dl/pdf3006r.pdf (live). Total cash earnings 447,206 yen, "就業形態計では３．３％増" (+3.3% year on year). The same release notes "平成30年から、調査事業所のうち30人以上の抽出方法を変更しています" (from 2018 the sampling method for establishments with 30+ employees changed), and the June 2019 release says 2018 also had a benchmark update. So 2018 growth had several causes; NO primary attributes the 3.3% to the Tokyo reweighting. Do not claim it did. Use the 3.3% only as what was published, if at all.
- Re-tabulation notice (FY2018 final): https://www.mhlw.go.jp/toukei/itiran/roudou/monthly/30/30-2fr/dl/pdf30fr.pdf (live). Verbatim: "平成30年11月分確報から、平成24年以降において東京都の「500人以上規模の事業所」についても再集計した値（再集計値）に変更しており、従来の公表値とは接続しないことに注意。" Translation: from the November 2018 final release, figures for 2012 onward were changed to re-tabulated values that also reweight Tokyo's 500+ establishments, and do not connect to the previously published values.
- The fix: June 2019 final (26 August 2019): https://www.mhlw.go.jp/toukei/itiran/roudou/monthly/r01/0106r/dl/pdf0106r.pdf (live). Verbatim: "令和元年６月分速報から、「500人以上規模の事業所」について全数調査による値（※）に変更しました" (from the June 2019 preliminary release, figures for 500+ establishments are from a full count). Its header also apologises: "国民の皆さま、統計に関わる皆さまにご迷惑をおかけしたことをお詫び申し上げます。"

## CHARTABLE DATA

From the 11 January 2019 fact sheet, 別添1 (Attachment 1): "きまって支給する給与" (regular monthly pay, yen), re-tabulated (再集計値) and as published (公表値), January 2012 to October 2018, 82 months, with the gap (かい離, %) as MHLW printed it. Read from the PDF text; the site-builder should copy these arrays exactly.

Re-tabulated, Jan 2012 to Dec 2014:
260216 262775 264423 265288 261559 263166 262653 261320 261530 262870 262396 262299 258397 260596 262058 265220 261195 262353 261417 260661 261012 262716 262995 262349 259340 260727 263001 266105 262570 263941 263164 261786 262875 263632 263514 263315
Published, Jan 2012 to Dec 2014:
259230 261798 263557 264388 260653 262262 261695 260326 260493 261692 261543 261398 257253 259413 260853 263932 259835 261015 259950 259206 259504 261149 261354 260735 257735 259064 261351 264410 260686 262102 261290 259938 261019 261659 261571 261502
Gap %, Jan 2012 to Dec 2014:
0.4 0.4 0.3 0.3 0.3 0.3 0.4 0.4 0.4 0.5 0.3 0.3 0.4 0.5 0.5 0.5 0.5 0.5 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.7 0.7 0.7 0.7 0.7 0.8 0.7 0.7
Re-tabulated, Jan 2015 to Oct 2018:
258024 258421 260604 264469 259682 261835 261250 259489 260062 261319 260825 260983 257651 259822 262380 264613 259541 262130 261829 259950 260600 261916 261732 262144 259004 260435 262377 265808 261197 263371 263231 261109 262587 262922 262997 263696 261131 261501 264897 267505 264095 265931 265232 263725 263688 265726
Published, Jan 2015 to Oct 2018:
256660 257074 259251 263065 258381 260547 259952 258158 258727 259928 259463 259702 256261 258570 261064 263178 258089 260632 260353 258464 259109 260363 260240 260521 257429 258975 260744 264214 259541 261765 261634 259426 260933 261128 261419 262041 260186 260571 263976 266570 263179 265087 264333 262846 262820 264863
Gap %, Jan 2015 to Oct 2018:
0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.5 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.6 0.7 0.6 0.6 0.4 0.4 0.3 0.4 0.3 0.3 0.3 0.3 0.3 0.3

Note the 2018 gap (0.3 to 0.4%) is smaller but not zero, although Tokyo's 500+ was already reweighted from January 2018. The fact sheet does not explain the residual; do not explain it either. Suggested chart: the monthly gap %, 2012 to October 2018, 1 line or bars, with January 2018 (reweighting starts) marked.

## CUT (do not use)

- "Problems in 22 or 23 of 56 fundamental statistics": not traced to a primary. Cut.
- Any claim that the 3.3% June 2018 growth was caused by the reweighting, or "highest in 21 years": not in a primary. Cut.
- Any total of people or yen presented as MHLW's own total (see arithmetic note).
- Benefit payments made by 2021 (MHLW page newpage_03463): live but edited since; not needed.
- Tokyo Metropolitan Government's report: 404. Cut.
- Names of any official. Roles only.
