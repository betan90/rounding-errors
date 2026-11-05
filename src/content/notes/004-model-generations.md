---
title: "45 drafts, 9 models, 0 corrections"
date: 2026-11-05
teaser: "Method · exhibit 017 drafted again by 9 models across 4 generations, then by 7 of them at every effort level: what changed in the wording, the voice, the bill and the count"
disclosure: "Drafted with AI (Claude, in Claude Code), from the repository's own comparison files: reports/comparisons/2026-11-04-017-generations/ and reports/comparisons/2026-11-04-017-generations-effort/ (plan.json, prompts/, drafts/, runs/, results.json) and reports/comparisons/README.md, built by scripts/compare-drafts.mjs from Claude Code's transcripts on 4 and 5 November 2026. Every figure in this note was checked against those files. Costs are Claude Code's own estimates at list prices, not a bill. Runs that the usage limit stopped before they finished were run again; their first attempts are not in the files and are not counted. The quoted sentences are copied from the drafts in each comparison's drafts/ folder. Editorial voice and errors are mine."
---

## The setup

Note 002 sent exhibit 017's brief to the drafter 11 times, on 3 models. This time it went to 9 models across 4 generations, 2 drafts each at medium effort, and then to 7 of them at low, high, xhigh and max: 46 runs, 45 drafts.

Every run was a headless Claude Code session in a plain copy of this repository at commit 642dcbe, from before 017 shipped. None of this folder's CLAUDE.md or memory, no hooks, no connectors. Each got the same prompt, brief and 2 example exhibits. The original 017 draft, written by Opus 5.5 at medium, is the reference.

## By model, at medium

| Model | Cost | Time | Mean sentence | Shared with original | Repeated the count |
|---|---|---|---|---|---|
| Opus 5.5 | $0.68 to $0.77 | 2m 37s to 2m 40s | 16.4 to 20.8 | 26% to 30% | 2 of 2 |
| Opus 5 | $1.16 to $1.24 | 3m 52s to 4m 12s | 21.5 to 25.5 | 24% to 27% | 2 of 2 |
| Opus 4.8 | $0.68 to $0.79 | 3m 17s to 3m 32s | 15.3 to 18.0 | 18% to 20% | 2 of 2 |
| Opus 4.5 | $0.40 to $0.45 | 1m 45s to 2m 00s | 19.7 to 21.2 | 16% to 19% | 2 of 2 |
| Sonnet 5.5 | $0.19 to $0.23 | 46s to 58s | 14.4 to 15.8 | 25% | 2 of 2 |
| Sonnet 5 | $0.17 to $0.27 | 1m 09s to 1m 39s | 17.3 to 21.0 | 11% to 12% | 2 of 2 |
| Sonnet 4.5\* | $0.25 to $0.56 | 1m 47s to 5m 24s | 15.1 to 15.5 | 17% to 19% | 2 of 2 |
| Haiku 5.5 | $0.02 to $0.03 | 1m 54s to 2m 18s | 14.9 to 17.5 | 16% to 19% | 0 of 2 |
| Haiku 4.5\* | $0.24 | 3m 52s to 4m 12s | 11.3 to 12.2 | 5% to 6% | 1 of 2 |

\* Ran with no effort level recorded. Claude Code did not apply one.

Mean sentence is words per sentence in the body. Shared with original is the share of 3-word phrases a draft has in common with the original 017 draft. The count is the brief's figure for how often "probably false" appears in the 2014 ONS article: the brief says 3, the article has 4.

## How alike

2 drafts by 1 model share 23.0% of their 3-word phrases on average. 2 drafts by different models share 15.5%. The model leaves a mark in the wording, and 2 runs of 1 model still differ on most of it.

The newest model in each family sits closest to the original: Opus 5.5 at 26% to 30%, Sonnet 5.5 at 25%, Haiku 5.5 at 16% to 19% against Haiku 4.5's 5% to 6%. Sonnet 5 sits below Sonnet 4.5. Opus 5.5 also wrote the original, so part of its lead is a model resembling itself.

## 1 sentence, 45 times

Every draft has a section called Who lied, and every draft answers it in its opening line. The original 017 draft: "Nobody. Every assumption was published, and most arrived labelled." 41 of the 45 drafts open with the same word, "Nobody.", and differ in what comes after it.

By model, at medium, from the lower-numbered of each model's 2 drafts:

| Model | Who lied |
|---|---|
| Opus 5.5 | Nobody. ONS printed every assumption beside its own assessment of it. |
| Opus 5 | Nobody. The assumptions are published, numbered and graded by their authors. |
| Opus 4.8 | Nobody. Every assumption is in the published article, labelled. |
| Opus 4.5 | Nobody. ONS published its method, named its sources, and flagged its weaknesses. |
| Sonnet 5.5 | Nobody. ONS published every assumption, with its own rating. |
| Sonnet 5 | Nobody. ONS published the method next to the estimate, flaws labelled in its own words. |
| Sonnet 4.5 | Nobody. The article lists its assumptions in Table 3. |
| Haiku 5.5 | Nobody. ONS published each assumption, labelled the weak ones, and footnoted its price source. |
| Haiku 4.5 | Nobody. ONS published the method as a peer-reviewed article, naming the assumptions and flagging their limitations. |

Opus 4.5's 2 drafts wrote the same sentence, word for word. No other 2 of the 45 match.

By effort, for 2 models:

| Effort | Opus 5.5 | Sonnet 5.5 |
|---|---|---|
| low | Nobody. Every assumption was printed next to its weakness. | Nobody. ONS published every assumption and said what it thought of it. |
| medium | Nobody. ONS graded its assumptions in print. | Nobody. The article labels its own inputs. |
| high | Nobody. ONS published every assumption and graded several itself: "probably false" 3 times, "arbitrary" twice, also "weak" and "controversial". | Nobody. ONS published every assumption and labelled several itself: "probably false" appears 3 times in the article, "arbitrary" 2 times. |
| xhigh | Nobody. ONS published every assumption and graded several itself. | Nobody. ONS published the assumptions and said what it thought of them. |
| max | Nobody. The executive summary warned of "significant limitations in the availability of data" and estimates "partly based" on assumptions, "especially" for prostitution. | Nobody. The article labels its own assumptions. |

Medium is the second draft of each pair, the one that does not repeat another row. At high, both models put the brief's wrong count into this sentence. At max, Opus 5.5 swapped the paraphrase for 3 quotes from the article. Sonnet 5.5 at max took 22 minutes 7 seconds and $3.16 to land 1 word from its medium draft, which took 46 seconds and $0.19.

## 3 more beats

The title, by model, from the same drafts as the table above. The original: "c. 58,000 prostitutes, minus 12 weeks' holiday".

| Model | Title |
|---|---|
| Opus 5.5 | An official GDP component, footnoted to Wikipedia |
| Opus 5 | Up to £10 billion of GDP, from desk research |
| Opus 4.8 | A legally required GDP line, built from "probably false" |
| Opus 4.5 | Probably false, arbitrary, weak, and mandatory |
| Sonnet 5.5 | Up to £10 billion of GDP, assumptions as published |
| Sonnet 5 | This is an arbitrary assumption |
| Sonnet 4.5 | The price of sex, via Wikipedia |
| Haiku 5.5 | Sex, drugs and GDP |
| Haiku 4.5 | All parties consent: prostitution in the national accounts |

Across all 45, 7 titles mention Wikipedia. 1 title carries the wrong number: Sonnet 5 at high called its draft "£50 billion a year, footnoted to Wikipedia". £50 billion is Patterson's figure for the overall effect of all the 2014 changes, research and development among them. Its own body gives the illegal activities "up to £10 billion a year".

The holiday. ONS's sentence on it runs to 29 words: "As a further refinement, allowance was made to reduce the estimates made for prostitution in household final consumption expenditure by a factor to reflect the holiday taken by prostitutes." Who quoted it from "allowance was made":

| Model | Drafts |
|---|---|
| Opus 4.5 | 5 of 6 |
| Sonnet 4.5 | 2 of 2 |
| Opus 5 | 3 of 6 |
| Sonnet 5 | 2 of 5 |
| Opus 4.8 | 1 of 6 |
| Opus 5.5, Sonnet 5.5, Haiku 5.5 | 0 of 18 |
| Haiku 4.5 | 0 of 2 |

The 5.5 models start the quote at "by a factor" or "to reflect", as the original did, and once at "the holiday". The older models paste.

The Fraud detected verdict. The original: "none. Every assumption was published, most with a grade from its authors". Sonnet 5.5 kept it to 9 to 17 words. Haiku 4.5 ran to 56 in 1 draft, ending "No evidence suggests misrepresentation: the limitations are stated in every release." That is the narrator offering a judgment of its own, which the house rules keep to documented institutional acts.

## The voice

The house voice asks for short sentences, no hedges and no accusations. The counts, across the 18 drafts at medium:

| Habit | Who |
|---|---|
| Hedges ("appears", "appear", "approximately") | Haiku 4.5 only |
| Intensifiers ("entirely") | Haiku 4.5 only, once |
| An accusation by the narrator | Nobody. The 1 hit was Haiku 5.5's "Nobody lied", which is the house answer to Who lied |
| Mean sentence over 21 words | Opus 5 in both drafts; Opus 4.5 in 1 |
| Aside beats ("Also:") | Sonnet 4.5 (4), Opus 5.5 (3), Haiku 4.5 (3); nobody else |
| A pun in the title | Haiku 5.5 ("Sex, drugs and GDP"), Haiku 4.5 ("All parties consent") |
| Over 500 words in the final version | Sonnet 4.5 (558), Sonnet 5.5 (507) |

Haiku 4.5 writes the shortest sentences in the grid and the only hedges. Opus 5 writes the longest. Each model also has its words: Haiku 4.5 used "approximately" 3 times and no other model used it once. Opus 4.8 leans on "FOI" and "reply". Sonnet 5 used "own" 7 times, against 3 in every other draft combined.

## By effort

7 models went on to low, high, xhigh and max: the 4.5-generation Sonnet and Haiku did not, because they took no effort level at medium. Opus 4.5 asked for xhigh or max ran at high, so its 3 runs sit in the high row.

| Effort | Drafts | Repeated the count | Mean cost | Mean time | Mean sentence | Shared with original |
|---|---|---|---|---|---|---|
| low | 7 | 6 | $0.38 | 1m 33s | 18.4 | 18.6% |
| medium | 14 | 12 | $0.51 | 2m 20s | 18.5 | 20.6% |
| high | 9 | 7 | $0.65 | 3m 21s | 20.5 | 20.2% |
| xhigh | 6 | 5 | $1.17 | 6m 49s | 21.7 | 20.7% |
| max | 5 | 4 | $2.32 | 14m 00s | 19.9 | 24.2% |

Max cost 6 times low and took 9 times as long. The count did not move. Sentences grew from about 18 words to about 22 at xhigh. None of the 27 drafts at low, high, xhigh or max failed the house-rules script in its final version.

1 run asked for max produced nothing. Sonnet 5 at max ran for 41 minutes and $2.75, then passed Claude Code's 64,000-token output limit before it wrote a draft.

## The count

37 of 45 drafts repeated the brief's 3. 0 wrote 4. The 8 that left it out did not correct it: none had the article to count in. Haiku 5.5 left it out in 5 of its 6 drafts, at every effort level but high.

No model, generation or effort level checked the brief, because no drafter could. The fact-checker had the article, and caught it before 017 shipped. Note 002 found the same with 11 drafts.

## The bill

The 45 drafts came to $35.43. Sonnet 5's failed max run adds $2.75. The cheapest draft, Haiku 5.5 at medium, cost $0.02 and left the count out. The most expensive, Opus 5.5 at max, cost $3.36, took 15 minutes 34 seconds and repeated it.

## What it suggests

2 drafts per model at medium and 1 per effort level make a small sample. These are leads, not findings.

The model changes the wording. Effort changes the time. Neither changes what the brief got wrong. A newer model drafts closer to the house voice, and Haiku 4.5 is the only one that hedged. Higher effort bought longer sentences and a longer wait. A check of the brief before drafting is still the only step that would have caught the count.

## Choosing a model and an effort level

For drafting from a finished brief, on this evidence:

| If you want | Choose | The evidence |
|---|---|---|
| The house voice | The newest model in a family | Opus 5.5, Sonnet 5.5 and Haiku 5.5 each drafted closest to the original in their family |
| The lowest bill | Haiku 5.5 at low or medium | $0.02 to $0.03 a draft and no rule broken in a final version. It also titled 1 draft "Sex, drugs and GDP" |
| Speed | Sonnet 5.5 at low or medium | 46 seconds to 1 minute 11 seconds. 1 of its 3 drafts at those levels ended over 500 words |
| A different draft | A different model | 2 models share 15.5% of their phrases, 1 model's 2 drafts 23.0%. Sonnet 5.5 at max and at medium opened Who lied 1 word apart |
| Fewer errors | No model and no effort level | 37 of 45 drafts repeated the brief's wrong count |

Effort above medium did not pay for drafting. Max cost 6 times low, took 9 times as long, left the count where it was, and 1 of the 6 runs asked for max ended with nothing. Low cost $0.38 on average, broke no rule, and gave up a little of the original's wording: 18.6% shared, against 20.6% at medium.

The money is better spent before the draft than on it. Every setting copied the brief. The fact-checker, which had the article, caught the count. A check of the brief would have caught it once, before 37 drafts repeated it.

This site's drafter runs on Opus, launched at medium. Nothing here argues for raising it. Sonnet 5.5 at medium cost $0.19 to $0.23 against Opus 5.5's $0.68 to $0.77, and came within 1 to 5 points of its share with the original. That makes it the setting to put in front of a blind read next.

1 brief, 1 exhibit and 1 or 2 drafts per setting is a narrow base. Closeness to the original also favours Opus 5.5, which wrote it.

Nobody has read the 45 blind. Until someone does, none of these numbers says which draft is best.
