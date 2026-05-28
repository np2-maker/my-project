# PRD — Random Quote Page

## Problem
Noe wants a tiny, no-friction source of daily motivation. Opening or refreshing a single web page should surface a fresh motivational quote — no apps to install, no accounts, no clicks.

## Goals
- Show one motivational quote on page load
- Show a different quote when the browser is refreshed
- Be trivially easy to open locally (double-click the HTML file)

## Target Users
- **Primary:** Noe — solopreneur, beginner coder, wants a quick morale boost between tasks.

## Scope

**In scope (v1):**
- Single static HTML page
- A small built-in list of quotes (hardcoded in JS, ~20–30 quotes)
- Randomly pick one quote on each page load
- Basic readable styling (centered text, comfortable font size)

**Out of scope (v1):**
- External quote APIs or network calls
- Database, backend, or hosting
- Authentication, accounts, or user profiles
- Favorites, sharing, or history
- Analytics or tracking
- Build tools, frameworks, or package managers

## Success Criteria
- Opening `index.html` shows a quote within 1 second
- Refreshing the page changes the quote (most of the time — true randomness allows occasional repeats)
- No console errors
- Works offline (no internet required)

## Risks
- Random pick repeats the same quote twice in a row — mitigation: track the last-shown index and reroll if it matches.
- Quote list feels stale after a week — mitigation: keep the list easy to edit (one array in one file).

## Open Questions
- Should the quotes include attribution (author name), or just the quote text?
- Any visual style preference (minimal/dark/light/colorful), or pick something tasteful by default?
