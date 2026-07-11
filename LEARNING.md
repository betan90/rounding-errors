# LEARNING.md

A running log of which Claude features got used to build this, what they were actually good for, and what I'd do differently. One paragraph per working session. Doubles as the "how this was made" record.

---

## Session 1 — scoping, copy, design, page build (in claude.ai chat + artifacts)

**Features used:** web search (verification), the analysis/file tools (built the page), artifact rendering (previewed the HTML).

**What happened:** Used Claude to sweep for well-documented statistical discrepancies and pressure-test which had the best story-to-effort ratio; Ireland's GDP-vs-GNI\* gap won. Web search did real work here — the CSO's 2025 annual accounts had dropped days earlier, so the entry opens with week-old figures no evergreen listicle can claim. Verified every number against primary sources (CSO releases, EU Commission forecast, central-bank commentary) before writing. Iterated the copy hard on voice: cut it from ~1,100 words to a ~2-minute read, killed em dashes and dramatic-pause fragments, and settled a house rule that the narrator never accuses anyone of lying — institutions on the record (the IMF, Krugman, the FAO) carry every verdict instead. Built the page as one self-contained `index.html` with a hand-coded SVG chart in a ledger/errata visual identity (monospace display, red vs. ink lines, shaded gap).

**What worked:** search-for-freshness was the standout. The tone rules only got right through several rejection rounds — worth capturing them in a CLAUDE.md so they don't have to be relearned per exhibit.

**What I'd change / open:** the 2013–2019 chart values are approximate placeholders; the real single-vintage GNI\* back-series lives only in a CSO spreadsheet and needs a local pull (session 2).

---

## Session 2 — repo, deploy, exact data (Claude Code) — UPCOMING

**Planned features:** Claude Code plan mode, git handling, local file/spreadsheet reading, Cloudflare Pages deploy.

**To fill in after:** did plan-mode-before-edit actually reduce mistakes? How clean was letting Claude Code own git? Cost/usage for the session?

---

## Session 3+ — templating (CLAUDE.md, custom /new-exhibit command) — LATER

To fill in when exhibit 002 exists and the workflow gets codified.
