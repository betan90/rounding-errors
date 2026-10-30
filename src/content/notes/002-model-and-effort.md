---
title: "1 brief, 11 drafts, the same wrong count 8 times"
date: 2026-10-30
teaser: "Method · exhibit 017 drafted at 11 model and effort settings: what each cost, how long it took, how alike the drafts came out, and what that suggests"
disclosure: "Drafted with AI (Claude, in Claude Code), from the repository's own comparison files: reports/comparisons/017-model-effort/ (plan.json, prompts/, drafts/, results.json), reports/comparisons/README.md, reports/017-illegal-gdp/drafting/ and reports/model-log.jsonl, built by scripts/compare-drafts.mjs, scripts/archive-drafts.mjs and scripts/log-models.mjs from Claude Code's transcripts on 29 and 30 October 2026. The tables were generated from results.json, and every figure in this note was checked against those files. The memory line quoted under The setup comes from Claude Code's memory, which is not in the repository; results.json records that every run was handed it, and holds the report that cites it. Costs are estimates at Anthropic's API list prices, not a bill. Revised on 30 October, the day it was published: added what else every run was handed, what the results suggest and the plan for the next model, and changed 'the 1 run at max' to 'Opus at max', because Haiku ran at max too. Editorial voice and errors are mine."
---

## The setup

On 29 October the brief for exhibit 017 went back to the drafter 11 times. The drafter is the agent that turns a research brief into an exhibit. Each run was launched with 2 settings: the model, and the effort level, which Anthropic describes as a trade between thoroughness and tokens: low, medium, high, xhigh or max.

Everything else was meant to stay still. Each run got the same prompt, apart from where to save the file, the same 2 example exhibits, and a checkout of this repository at commit 642dcbe, from before 017 shipped, so no run could read the published version. 2 settings ran more than once: Opus at low twice, and Opus at medium 3 times. How far 2 runs of 1 setting land apart is the noise. A gap between settings smaller than that is not a difference.

1 thing did not stay still enough. Claude Code hands every agent it launches the CLAUDE.md and the memory index of the folder the session runs in, whatever checkout the agent is told to read. All 11 runs got this repository's live CLAUDE.md, which already listed 017's category, and the index of my Claude Code memory, which said the 016 and 017 briefs and build prompts had caused 2 caught errors, and advised "count on line-joined PDF text". The brief named the same category. The memory line reached the count: Haiku at max cut the brief's count of "probably false" and gave its reason, that the counts "were counted on line-joined PDF text". The other 2 drafts that left the count out gave no reason. All 11 runs were handed the same 2 files, so they still compare with each other.

## The drafts

| Draft | Setting | Cost | Time | Tokens | Words | Shared | Count |
|---|---|---|---|---|---|---|---|
| r04 | Opus low\* | $0.33 | 52s | 6,211 | 461 | 24% | repeated |
| r08 | Opus low | $0.41 | 1m 12s | 8,986 | 461 | 25% | left out |
| r01 | Opus medium\* | $0.68 | 2m 29s | 17,722 | 475 (561) | 26% | repeated |
| r05 | Opus medium | $0.82 | 3m 12s | 23,041 | 481 (523) | 25% | repeated |
| r11 | Opus medium | $0.59 | 2m 10s | 16,028 | 474 (511) | 26% | repeated |
| r02 | Opus high | $1.12 | 4m 50s | 34,543 | 478 | 28% | repeated |
| r10 | Opus xhigh | $1.85 | 8m 56s | 63,125 | 489 | 27% | repeated |
| r09 | Opus max | $5.48 | 21m 43s | 151,687 | 491 | 26% | repeated |
| r03 | Sonnet medium | $0.24 | 1m 18s | 10,717 | 454 | 20% | repeated |
| r06 | Haiku medium | $0.03 | 2m 47s | 41,198 | 479 | 19% | left out |
| r07 | Haiku max | $0.13 | 12m 05s | 187,134 | 469 | 17% | left out |

\* Asked for Fable 5.1. Both runs were told in their system prompt that they were Fable 5.1. Every request they sent named claude-opus-5-5, and claude-opus-5-5 answered. The transcripts do not say why.

Setting is the model and effort level that ran. Tokens are output tokens, thinking included. Words counts the body; a number in brackets is a first version over the 500-word limit, cut by the same run. Shared is the average share of 3-word phrases a draft has in common with the other 10. Count is whether the draft repeated the brief's figure for how often "probably false" appears in the 2014 ONS article: the brief said 3, the article has 4.

Read down the Opus rows: cost, time and tokens climb with the setting. Words do not.

## By model

| Model | Price in / out | Drafts | Cost | Shared |
|---|---|---|---|---|
| Fable 5.1 | $10 / $50 | 0 (2 asked) | n/a | n/a |
| Opus 5.5 | $4 / $20 | 8 | $0.33 to $5.48 | 24% to 28% |
| Sonnet 5.5 | $2 / $10 | 1 | $0.24 | 20% |
| Haiku 5.5 | $0.10 / $0.50 | 2 | $0.03 to $0.13 | 17% to 19% |

Prices are Anthropic's API list prices per million tokens. On Opus, low to max took a draft from $0.33 to $5.48, from 52 seconds to 21 minutes 43 seconds, and from 4 tool calls to 25. Length did not move. Every body landed between 454 and 491 words. Haiku at max wrote 187,134 output tokens, more than Opus at max, for $0.13. Sonnet at medium cost less than either Opus run at low.

## How alike

| Pairs of drafts | Pairs | 3-word phrases shared |
|---|---|---|
| Same setting, run again | 4 | 26% to 31% |
| Different settings | 51 | 15% to 41% |
| Opus at high, xhigh and max, with each other | 3 | 34% to 41% |
| Each draft with the original drafter's first version | 11 | 18% to 32% |

A 3-word phrase is any 3 words in a row of a draft's body. For 2 drafts, the share is the phrases both contain, divided by the phrases either contains.

2 runs at 1 setting are the noise. The Opus drafts sit inside it or near it. Sonnet and Haiku sit below it: the model moved the wording more than the effort level did. The 3 most alike pairs in the grid are the 3 highest-effort Opus drafts.

## What each draft decided

| Decision | Drafts |
|---|---|
| Repeated the brief's count of "probably false" (3; it is 4) | 8 of 11, and the original |
| Kept Patterson's "legally mandated through the European System of Accounts 2010" | 4: Opus low twice, Opus medium, Haiku medium |
| Printed the FOI reply's date, which the brief marked "confirm date on page" | 1: Opus xhigh |
| Wrote a Rules broken verdict other than none | 1: Haiku max, citing "a GNI ESA 1995 reservation" |
| Added a link the brief did not contain | 0 |
| Failed the house-rules script in its final version | 0 |

No drafter could check the count: none had the source. The fact-checker caught it before 017 shipped. The published 017, after review, quotes the same reservation Haiku put in its verdict at max.

## The bill

The 11 drafts came to an estimated $11.69, of which $5.48 was Opus at max. The most expensive draft cost 172 times the cheapest and repeated the brief's count. The cheapest left it out.

## What it suggests

1 brief, 11 drafts and 1 run for most settings make a small sample. These are leads to test, not findings.

Effort bought time, not a different draft. On Opus, max cost $5.48 against $0.33 at low and took 21 minutes 43 seconds against 52 seconds. Its body came out 30 words longer, with the same verdict and the same wrong count. Medium, the setting the original 017 draft ran at, cost $0.59 to $0.82 and ended where max ended on the count, the verdict and the house rules, after cutting a first version that ran past 500 words.

The brief set the ceiling. 8 of 11 drafts repeated its wrong count, Opus at every setting from medium up among them, and no setting could have caught it: no drafter had the article. The fact-checker had it, and caught it. Effort spent on drafting cannot repair a brief. A check of the brief before drafting would have stopped 1 error before it was copied 8 times.

More effort made the drafts more alike, not more right. The 3 most alike pairs in the grid are Opus at high, xhigh and max, sharing 34% to 41% of their phrases, against 26% to 31% for 2 runs of 1 setting. All 3 repeated the count. More effort was not more caution either: the only draft to print the date the brief said to confirm was Opus at xhigh. For a different draft, change the model. Sonnet and Haiku shared 17% to 20% with the rest.

The most expensive draft did no better on any check than the cheapest. Haiku at medium, for $0.03, left the count out. The only verdict to match the published exhibit came from Haiku at max, for $0.13. None of these checks says which draft reads best, and nobody has read the 11 blind. At 172 times the price, a draft should have to win that reading.

The model asked for is not always the model that runs. Both runs asked for Fable 5.1 were told they were Fable 5.1 and ran on Opus 5.5. A comparison that trusted the request would have credited Fable with 2 Opus drafts and priced them at Fable's rates. Every draft here is placed by the model that answered.

A checkout holds the files still, not the context. The session's CLAUDE.md and memory travel with every agent it launches, and 1 line of memory reached a measured result. A benchmark has to run where neither can follow.

## Next model, same brief

The grid is now a benchmark. When a model alias starts serving a new model, which the model log shows, the brief goes back to the drafter at the same settings. The runs are headless Claude Code sessions in a plain copy of the repository at commit 642dcbe, kept outside this folder: none of this folder's CLAUDE.md or memory, no hooks, no connectors. The model being replaced runs beside its successor on the same day, named by its full id, while Anthropic still serves it. A script lines every run up by the model that answered and its effort, so a change shows up as a number next to these. The procedure is in reports/comparisons/README.md. The 29 October grid stays as the first entry, with the memory line noted against it.
