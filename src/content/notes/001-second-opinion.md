---
title: "The second opinion that mostly agreed with an empty string"
date: 2026-08-03
teaser: "Fact-checking · what a second AI reviewer actually caught, once you check its work"
disclosure: "Drafted with Claude (Claude Code), from the repository's own fact-checker and second-opinion JSON reports (reports/*, generated 2026-08-01) and commit f0c49f4. Every count and date in this note was checked directly against those files, not recalled from memory. Editorial framing is mine."
---

## The setup

Every exhibit gets checked twice. A fact-checker subagent verifies each claim against its cited source and writes a structured verdict. A second script sends the same claim, source, and retrieved passage to DeepSeek's API for an independent read, SUPPORTED, NOT SUPPORTED, or PARTIALLY SUPPORTED, with no memory of who wrote the exhibit or why. A third script diffs the two verdicts. Across the first seven exhibits, that produced 67 agreements and 27 disagreements.

## What the disagreements actually were

Twenty-seven sounds like a lot. Most of them were one thing. The fact-checker sometimes verifies a claim through search-engine corroboration or arithmetic it can check itself, without pulling a clean quotable passage, and leaves that field empty. DeepSeek has no search tool of its own. Handed an empty passage and asked whether it supports the claim, it says no, every time. That accounted for roughly twelve of the twenty-seven.

Another chunk came from attribution DeepSeek simply couldn't see: a study credited to Rosenbaum and Hanson, a toolkit credited to the UK College of Policing. The names live in the source field, not the passage, so DeepSeek marked the claim unsupported for lacking a name it was never shown.

## The one it got wrong

One disagreement wasn't noise. Exhibit 003 claims a Tianjin district admitted, within weeks of Liaoning's January 2017 fraud confession, that its GDP was a third smaller than reported. The fact-checker traced the actual admission to January 2018, a year later, and marked the timing NOT SUPPORTED. DeepSeek read the same passage, saw the 33.5% figure matched, and marked it SUPPORTED anyway, noting in its own reasoning that the passage "does not specify the timeframe" and supporting the claim regardless. The timeline error, fixed in the same pass as three other findings, is the one place a second reviewer had a real chance to catch something and didn't.

## What that's worth

Three of the four issues fixed in that pass were things DeepSeek had already agreed were unsupported, so its main contribution was confirmation, not new information. On the one substantive judgment call it made, it was wrong, and looser than the reviewer it was supposed to be checking.

That's not nothing. A second opinion that mostly plays back the first reviewer's own answer, tool limitations included, is still a useful check on the parts that are correct. Whether it earns its keep on the parts it consistently misses is a separate question. For now it stays in the pipeline. It's cheap, and being wrong in a documented, reviewable way is exactly the kind of error this site exists to write down.
