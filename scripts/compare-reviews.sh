#!/usr/bin/env bash
# Compares the fact-checker's per-claim verdicts against DeepSeek's second opinion.
#
# Usage: scripts/compare-reviews.sh [fact-check-output.json] [second-opinion.json]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exec node "$SCRIPT_DIR/compare-reviews.mjs" "$@"
