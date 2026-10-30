---
title: "1 brief, 11 drafts, the same wrong count 8 times"
date: 2026-10-30
teaser: "Method · what the model and the effort level change in a drafted exhibit, measured on 017"
disclosure: "Drafted with AI (Claude, in Claude Code), from the repository's own comparison files: reports/comparisons/017-model-effort/ (plan.json, prompts/, drafts/, results.json), reports/017-illegal-gdp/drafting/ and reports/model-log.jsonl, built by scripts/compare-drafts.mjs, scripts/archive-drafts.mjs and scripts/log-models.mjs from Claude Code's transcripts on 29 October 2026. Every count, cost, time and percentage in this note was checked against those files. Costs are estimates at Anthropic's API list prices, not a bill. Editorial voice and errors are mine."
---

## The setup

Exhibit 017's drafter brief lived in a temp file and a Claude Code transcript until this week, when it was saved to reports/017-illegal-gdp/drafting/. On 29 October it went back to the drafter 11 times. Each run got the same prompt, apart from where to save the file, the same 2 example exhibits, and a checkout of this repository at commit 642dcbe, from before 017 shipped, so no run could read the published version. Only the model and the effort level changed. The grid asked for Fable 5.1 at low and medium, Opus 5.5 at all 5 levels with medium twice, Sonnet 5.5 at medium, and Haiku 5.5 at medium and max. 2 runs at 1 setting measure the noise that every other gap is judged against.

## The setting that did not run

Both runs that asked for Fable 5.1 were told in their system prompt that they were Fable 5.1. Every request they sent named claude-opus-5-5, and claude-opus-5-5 answered. The transcripts do not say why. Below, they count as 2 more Opus runs, at low and medium.

## What effort changed

On Opus, from low to max, the cost of a draft rose from $0.33 to $5.48, the time from 52 seconds to 21 minutes 43 seconds, output tokens from 6,211 to 151,687, and tool calls from 4 to 25. Length did not move. All 11 bodies landed between 454 and 491 words.

The drafts did not get more original. The 3 most alike pairs in the grid are the high, xhigh and max drafts, which share 34% to 41% of their 3-word phrases. 2 runs at the same setting shared 26% to 31%.

Caution moved both ways. Every run at high or above left out Patterson's "legally mandated through the European System of Accounts 2010", the line most easily read as ESA 2010 introducing the rule. 4 runs at low or medium kept it, attributed to him. The xhigh run was also the only draft to print the date of the ONS FOI reply, which the brief marked "confirm date on page".

Only medium broke a rule. All 3 Opus runs at medium first wrote a body over 500 words, at 561, 523 and 511, and cut it before finishing. No other setting overshot.

## What the model changed

Haiku 5.5 cost $0.03 a draft at medium and $0.13 at max, against $0.59 to $0.82 for Opus at medium. At max it produced 187,134 output tokens, more than Opus at max, and took 12 minutes. The 2 Haiku drafts share 17% and 19% of their phrases with the rest of the grid on average, the Sonnet draft 20%, the Opus drafts 24% to 28%. On this brief the model moved the wording more than the effort level did.

Haiku at max made the 1 verdict no other draft made. Under Rules broken it wrote "a GNI ESA 1995 reservation, which the 2014 changes were part of addressing." The other 10, and the original drafter on 23 October, wrote none. The published 017, after review, quotes the same reservation.

## What no setting changed

The brief said "probably false" appears 3 times in the 2014 ONS article. It appears 4 times. 8 of the 11 drafts repeated the 3, as did the original. The other 3 left the count out. No drafter could check it: none had the source. The fact-checker caught it before 017 shipped.

All 11 drafts used the category and tags the prompt asked for and the same 3 sections, and every Who lied section opens "Nobody." None added a link the brief did not contain. Every final version passed the house-rules script.

## The bill

The 11 drafts came to an estimated $11.69, of which $5.48 was the 1 run at max. The most expensive draft cost 172 times the cheapest and repeated the brief's count. The cheapest left it out.
