# The drafting benchmark

1 brief, held fixed, drafted again whenever the models change, so each new model is measured against the ones before it on the same work. The brief is exhibit 017's. The first run of it is `017-model-effort/`, 11 drafts from 29 October 2026, written up in note 002 (`src/content/notes/002-model-and-effort.md`).

The script is `scripts/compare-drafts.mjs`. In Claude Code, `/benchmark` runs the whole procedure below and asks before it spends anything.

## When to run it

- When a model alias starts serving a new model. Agent files name aliases (`opus`, `sonnet`, `haiku`), and an alias moves to the newest model with no commit. The model log (`reports/model-log.jsonl`) records the id behind every agent run, and `node scripts/compare-drafts.mjs history` names any model that has served a run here since the newest comparison but has never been compared.
- When Claude Code changes how agents run. 1 or 2 cheap cells show whether the harness moved.

## What is held fixed

- The brief: exhibit 017's, as the drafter read it on 23 October 2026 (`inputs/brief.md` in each comparison).
- The prompt: the original drafter's prompt, with only its paths changed (`inputs/original-prompt.md`, `prompts/rNN.md`).
- The repository the drafter sees: a plain copy at commit 642dcbe, from before 017 shipped, with that commit's CLAUDE.md, its 2 example exhibits (015 and 016) and its drafter instructions (`inputs/agents.json`). The copy has no `.git`, so nothing later than 642dcbe can be read from it.
- Nothing else reaches the run. The copy sits outside this folder, in the system temp folder, so no CLAUDE.md or Claude Code memory of this project is loaded. `--restricted` and `--strict-mcp-config` keep out settings, hooks and connectors, and the drafter has its own 4 tools: Read, Write, Glob, Grep.
- The measurements: `collect`, the same for every comparison.

## What changes, and is recorded instead

- The model behind an alias. `results.json` records the id that answered every turn (`served.models`), and `history` groups drafts by it. A cell can also name a full id (`claude-opus-5-5`), which still reaches the old model after its alias has moved on, until Anthropic retires it.
- The effort each turn ran at (`served.efforts`). An effort level is not the same budget on 2 models: Anthropic says the token allocation behind each level can change between models. Compare a new model at every level with the old one at every level, not "medium" with "medium" as if it were a fixed amount.
- The Claude Code version (`context.claudeCode`). The harness changes between runs too.
- What the run was handed besides its prompt (`context`): hashes of any CLAUDE.md or memory index, and of the system prompt. For a headless run the list of handed files is empty.
- Prices. `PRICES` in the script lists Anthropic's list price per million tokens for each model id. A new model needs a line there before its drafts can be priced; `collect` says so. Headless runs also record Claude Code's own estimate (`claudeCodeCostUsd`).

## How to run it

1. `node scripts/compare-drafts.mjs history 017`: what has been compared, and what is new.
2. `node scripts/compare-drafts.mjs setup <YYYY-MM-DD>-017 --like <newest comparison> [--cells model:effort,...]`. Without `--cells` it repeats the newest comparison's cells. Put the model being replaced beside its successor by full id, at the same efforts (`opus:medium,claude-opus-5-5:medium`), so old and new run on the same day in the same harness. List 1 cell twice: 2 runs of 1 setting measure the noise.
3. `node scripts/compare-drafts.mjs run <name>`. Each cell runs as its own headless Claude Code session (`claude -p`), 4 at a time, with a cap of $20 per run (`--parallel`, `--max-usd`). Opus at max took 21 minutes 43 seconds on 29 October, so run it in the background.
4. `node scripts/compare-drafts.mjs collect <name>`. It measures every draft and writes `results.json`. Collect within 30 days: Claude Code deletes transcripts after that, and only the drafts can be measured again.
5. `node scripts/compare-drafts.mjs history 017`: every comparison of 017, by the model that answered and the effort it ran at.

Commit the comparison folder (`plan.json`, `inputs/`, `prompts/`, `drafts/`, `runs/`, `results.json`). A write-up for the site is a note, under the same evidence rules as any other.

## How to read it

- Noise first. On 29 October, 2 runs of 1 setting shared 26% to 31% of their 3-word phrases. A gap between settings smaller than the gap between 2 runs of 1 setting is not a difference.
- The known trap. The 017 brief says "probably false" appears 3 times in the 2014 ONS article; it appears 4 times. The `watch` pattern in `plan.json` looks for the count in every draft. A draft that repeats it repeats the brief. A draft that leaves it out may say why in its report (`report` in `results.json`).
- Cost is an estimate from tokens and list prices. Headless sessions write the 1-hour prompt cache, billed at 2 times the input price; the agents of 29 October wrote the 5-minute cache, at 1.25 times. Compare costs within 1 way of running.
- Nothing here says which draft reads best. That needs a blind read.

## The 29 October grid

The first comparison ran another way. The main session launched 11 drafter agents, each pointed at a git worktree at 642dcbe. Claude Code handed every one of them this folder's live CLAUDE.md and the index of its Claude Code memory, whatever checkout it was told to read: `context` in its `results.json` shows the same 2 files, with the same hashes, for all 11. The memory index had a line saying the 016 and 017 briefs had caused 2 caught errors, with the advice to "count on line-joined PDF text". Haiku at max cut the brief's count of "probably false" and gave the reason that it was "counted on line-joined PDF text". The context was the same for all 11, so they compare with each other. Against a headless run they compare with that line noted against them.

## Adding a brief

1 brief is 1 sample. 015 and 016 also have archived briefs in `reports/NNN-slug/drafting/`; 012 to 014 kept none. A new benchmark brief needs a base commit from before its exhibit shipped and at least 1 known trap from its fact-check, written as a `watch` pattern in `plan.json` before collecting: `setup <name> --exhibit 016 --base <commit> --cells ...`.
