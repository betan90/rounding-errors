---
title: "1 brief, 11 drafts, the same wrong count 8 times"
date: 2026-10-30
teaser: "Method · exhibit 017 drafted at 11 model and effort settings: what each cost, how long it took, and how alike the drafts came out"
disclosure: "Drafted with AI (Claude, in Claude Code), from the repository's own comparison files: reports/comparisons/017-model-effort/ (plan.json, prompts/, drafts/, results.json), reports/017-illegal-gdp/drafting/ and reports/model-log.jsonl, built by scripts/compare-drafts.mjs, scripts/archive-drafts.mjs and scripts/log-models.mjs from Claude Code's transcripts on 29 October 2026. The tables were generated from results.json, and every figure in this note was checked against those files. Costs are estimates at Anthropic's API list prices, not a bill. Editorial voice and errors are mine."
---

## The setup

On 29 October the brief for exhibit 017 went back to the drafter 11 times. Each run got the same prompt, apart from where to save the file, the same 2 example exhibits, and a checkout of this repository at commit 642dcbe, from before 017 shipped, so no run could read the published version. Only the model and the effort level changed.

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

## By model

| Model | Price in / out | Drafts | Cost | Shared |
|---|---|---|---|---|
| Fable 5.1 | $10 / $50 | 0 (2 asked) | n/a | n/a |
| Opus 5.5 | $4 / $20 | 8 | $0.33 to $5.48 | 24% to 28% |
| Sonnet 5.5 | $2 / $10 | 1 | $0.24 | 20% |
| Haiku 5.5 | $0.10 / $0.50 | 2 | $0.03 to $0.13 | 17% to 19% |

Prices are Anthropic's API list prices per million tokens. On Opus, low to max took a draft from $0.33 to $5.48, from 52 seconds to 21 minutes 43 seconds, and from 4 tool calls to 25. Length did not move. Every body landed between 454 and 491 words.

## How alike

| Pairs of drafts | Pairs | 3-word phrases shared |
|---|---|---|
| Same setting, run again | 4 | 26% to 31% |
| Different settings | 51 | 15% to 41% |
| Opus at high, xhigh and max, with each other | 3 | 34% to 41% |
| Each draft with the original drafter's first version | 11 | 18% to 32% |

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

The 11 drafts came to an estimated $11.69, of which $5.48 was the 1 run at max. The most expensive draft cost 172 times the cheapest and repeated the brief's count. The cheapest left it out.
