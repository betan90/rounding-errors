---
description: Rerun the drafting benchmark when a new model arrives, and compare it with every earlier run
argument-hint: "[cells, e.g. opus:medium,claude-opus-5-5:medium]"
---

Rerun the drafting benchmark and compare the result with every earlier run. Read reports/comparisons/README.md first: it says what is held fixed, what is recorded instead, and how to read the numbers.

1. Run `node scripts/compare-drafts.mjs history 017`. Report which models and efforts have been compared, and any model it names as not compared yet.
2. Choose the cells. If the human gave cells ($ARGUMENTS), use them. Otherwise repeat the newest comparison's cells, and put any model being replaced beside its successor by full id at the same efforts (`claude-opus-5-5:medium` beside `opus:medium`), so old and new run on the same day in the same harness. Keep 1 cell listed twice: the gap between 2 runs of 1 setting is the noise.
3. Before running anything, give the human the cells and an estimated cost, from the cost per draft by model and effort in the newest results.json, and wait for a yes. Every cell spends money.
4. `node scripts/compare-drafts.mjs setup <YYYY-MM-DD>-017 --like <newest comparison> [--cells ...]`
5. `node scripts/compare-drafts.mjs run <name>`, in the background: a cell at max effort can take over 20 minutes.
6. `node scripts/compare-drafts.mjs collect <name>`. If it says a model has no price, add the model's list price per million tokens to PRICES in scripts/compare-drafts.mjs, from Anthropic's pricing page, and collect again.
7. `node scripts/compare-drafts.mjs history 017`, then report: at each effort, the new model against the old on cost, time, output tokens, words, rule breaks, the known trap and phrases shared with the original, and whether each gap is bigger than the noise. Name any cell that ran on a different model or effort from the one it asked for.
8. Commit and publish nothing until the human says so. If they want a write-up for the site, it is a note, under the same evidence rules as any note.
