#!/usr/bin/env bash
# Second-opinion review of a fact-checker report, via DeepSeek's chat completions API.
#
# Pipeline:
#   1. In Claude Code: run the fact-checker agent on an exhibit -> writes fact-check-output.json
#   2. bash scripts/second-opinion.sh        -> writes second-opinion.json
#   3. bash scripts/compare-reviews.sh       -> prints the comparison
#
# Usage: scripts/second-opinion.sh [path/to/fact-check-output.json] [path/to/second-opinion.json]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -f "$REPO_ROOT/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$REPO_ROOT/.env"
  set +a
fi

if [ -z "${DEEPSEEK_API_KEY:-}" ]; then
  echo "error: DEEPSEEK_API_KEY is not set. Add it to $REPO_ROOT/.env" >&2
  exit 1
fi

exec node "$SCRIPT_DIR/second-opinion.mjs" "$@"
