#!/bin/bash
set -euo pipefail

# Only relevant for Claude Code on the web/remote sessions -- a local
# developer's own machine manages its own plugin installs.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Both commands are idempotent: they no-op (exit 0) if the marketplace/plugin
# is already present, so this is safe to run on every session start.
claude plugin marketplace add firebase/firebase-tools
claude plugin install firebase@firebase
