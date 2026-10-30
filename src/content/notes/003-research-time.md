---
title: "Research takes 2 to 5 minutes. This one took 39"
date: 2026-10-30
teaser: "Method · the research for exhibit 018 asked 9 questions at max effort and ran 39 minutes and 166 tool calls. The log can't say which of the 2 mattered more"
disclosure: "Drafted with AI (Claude, in Claude Code), from reports/model-log.jsonl, where scripts/log-models.mjs records each agent run's model, effort, duration and tool calls from Claude Code's transcripts, and from the 018 research run's prompt and report, saved in reports/018-pele-goals/research/. The researcher's fetching rules are in .claude/agents/exhibit-researcher.md, from commit 329bac9. Every figure in this note was checked against those files. Editorial voice and errors are mine."
---

## The run

On 30 October the researcher went looking for Pelé's goal count, for exhibit 018. It took 39 minutes and made 166 tool calls: 59 web searches, 106 page fetches and 1 file read. Partway through, the human asked why it was taking so long. It was then told to stop and report what it had, and its report opens: "Stopped on the coordinator's instruction."

## Every research run so far

| Exhibit | Date | Model | Effort | Minutes | Tool calls | Searches | Fetches |
|---|---|---|---|---|---|---|---|
| 012 | 4 Oct | Opus | medium | 88.1 | 51 | 14 | 36 |
| 012 | 4 Oct | Opus | max | 20.0 | 129 | 31 | 88 |
| 012 | 4 Oct | Sonnet | max | 44.8 | 142 | 32 | 107 |
| 012 | 5 Oct | Sonnet | medium | 1.8 | 24 | 9 | 15 |
| 013 | 9 Oct | Sonnet | medium | 3.1 | 48 | 14 | 34 |
| 014 | 10 Oct | Sonnet | medium | 3.4 | 39 | 14 | 25 |
| 015 | 10 Oct | Sonnet | medium | 3.6 | 42 | 11 | 31 |
| 016 | 23 Oct | Sonnet | medium | 2.9 | 27 | 11 | 16 |
| 017 | 23 Oct | Sonnet | medium | 5.0 | 38 | 15 | 23 |
| 018 | 30 Oct | Sonnet | max | 39.1 | 166 | 59 | 106 |

Minutes run from launch to the last line of the run's transcript. Tool calls include file reads and searches of the repository, which is why some rows add up to more than searches and fetches. The 013 run is logged by its task, "Research 8x8 water exhibit".

On 5 October, between the 4 October runs and the next, the researcher's instructions gained fetching rules (commit 329bac9): prefer a web page to a PDF, hand PDFs to the main session, and give up on a source after 2 attempts. The 6 runs at medium effort since took 1.8 to 5.0 minutes.

## Why this one ran long

2 things were different, and the log cannot say which mattered more.

The prompt asked for 9 things. Its 9 numbered items covered Guinness, FIFA and CONMEBOL, Pelé's own count, RSSSF, Santos, Barcelona, the 1,000th goal, Brazil's goals and any corrections, each "against the counter's own publication where one exists". Most counters' own pages turned the fetcher away. Per its report, FIFA's newer pages came back as empty text, every Santos page it tried answered 403, the Brazilian football confederation's pages failed a certificate check, X answered 402, and the Brazilian government's copy of a law said "Acesso Negado". The rule is 2 attempts per source, then move on. 9 questions with several counters each make a lot of second attempts.

It also ran at max effort. No agent file names an effort, so an agent runs at whatever the session is set to, and this session was set to max. The 2 earlier research runs at max, both for 012, took 20.0 and 44.8 minutes. The 6 at medium since the fetching rules took 1.8 to 5.0. Note 002 found effort works the same way for drafting: on Opus, max took 25 times as long as low and ended with the same verdict and the same wrong count.

## What came back

The report was usable. It listed what it had read on the counters' own pages, and every page it could not reach, with its address, for the main session to fetch directly. Stopping the run lost nothing it had found.

## What changes

Research prompts ask for the facts the exhibit stands on, 4 or 5 of them, not every fact that might help.

The researcher and the drafter are launched at medium effort unless the human asks for more. The other agents follow the session.

Pages that turn the researcher away are fetched by the main session, with curl or a copy saved from a browser, during the check it already makes of every primary source before a brief.

A research run past 10 minutes gets checked and told to report what it has.

The model log now records how long every agent run took and its tool calls by type. The table above comes from it, and the next long run will show up there before anyone has to ask.
