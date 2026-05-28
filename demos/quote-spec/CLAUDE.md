# CLAUDE.md — Random Quote Page

## Project Overview
A single static HTML page that displays a random motivational quote each time the browser is refreshed. Built for Noe as a tiny morale-boost demo.

## Tech Stack
- **Frontend:** Plain HTML + CSS + vanilla JavaScript (one file, no build step)
- **Backend:** None
- **Database:** None — quotes are a hardcoded JS array
- **Hosting:** None — open `index.html` directly in a browser

## Coding Style
- camelCase for variables and functions
- UPPER_SNAKE_CASE for constants (e.g. `QUOTES`)
- 2-space indentation
- Vanilla JS — no frameworks, no npm packages
- Keep everything in one file (`index.html`) unless it grows past ~100 lines
- Comments only when the WHY is non-obvious

## Project Rules
- Read PRD.md before starting any new feature
- No dependencies, no package.json, no build tools — this stays a single file
- No network calls, no fetch — the quote list lives in the JS itself
- One-file changes by default; announce before multi-file edits
- Run /review before every commit

## Definition of Done
A task is done when:
1. Opening `index.html` shows a random quote
2. Refreshing the page changes the quote
3. No browser console errors
4. /review passes
5. Changes are committed
