#!/usr/bin/env bash
# Regenerate resume PDFs from markdown (pandoc + Chrome headless).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PANDOC_BIN="${PANDOC:-$(command -v pandoc || true)}"
if [[ -z "$PANDOC_BIN" && -x /opt/homebrew/bin/pandoc ]]; then
  PANDOC_BIN=/opt/homebrew/bin/pandoc
fi
if [[ -z "$PANDOC_BIN" ]]; then
  echo "pandoc not found. Install: brew install pandoc" >&2
  exit 1
fi

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome not found at: $CHROME" >&2
  echo "Set CHROME to your Chromium/Chrome binary." >&2
  exit 1
fi

CSS="$ROOT/scripts/resume-print.css"

build_pdf() {
  local md_path="$1"
  local md_file="${md_path##*/}"
  local base="${md_file%.md}"
  local html="$ROOT/${base}-print.html"
  local pdf="$ROOT/${base}.pdf"

  echo "Building $pdf from $md_file..."
  "$PANDOC_BIN" "$ROOT/$md_file" -o "$html" --standalone --embed-resources \
    --css="$CSS" --metadata title="Ben Schippers — Resume"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$pdf" "file://$html"
  rm -f "$html"
  echo "Wrote $pdf"
}

cd "$ROOT"
build_pdf resume.md
build_pdf resume-one-page.md
