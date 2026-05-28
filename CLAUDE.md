# CLAUDE.md — Coaching Client Dashboard

> This file is the project-specific brief. It lives alongside `.claude/CLAUDE.md` (generic coding conventions) and the global `~/.claude/CLAUDE.md` (Noe's personal rules). Read **PRD.md** before doing any feature work — it is the source of truth.

## Project Overview
A web dashboard where 1:1 coaching clients log a short weekly check-in (energy, mood, wins, challenges, focus) and see their own progress trend over time. A single coach (Noe) sees a list of all clients and their latest status. v1 is intentionally small — see PRD.md for what is in and out of scope.

## Tech Stack (per PRD.md recommendation — confirm before building)
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend / DB / Auth:** Supabase (Postgres + magic-link auth + Row-Level Security)
- **Charts:** Recharts
- **Hosting:** Vercel
- **Repo host:** GitHub

If Noe changes any of these in PRD.md "Open Questions," update this file before writing code.

## Working With Noe (important — he is a beginner)
- Talk in plain English. No jargon without a one-line explanation.
- Explain **why** before **how**, in 1–2 sentences, before touching files.
- Smallest possible change per turn. One file by default.
- After any change: tell him exactly how to verify it works (a URL to open, a button to click, what he should see).
- If something is ambiguous, ask — do not guess.
- Never install a package without explicit approval.
- Never deploy or push without explicit approval.

## Coding Style
- camelCase for variables and functions.
- UPPER_SNAKE_CASE for constants.
- ES modules (`import` / `export`) — not CommonJS.
- `async`/`await` — not `.then()` chains.
- Small, single-purpose functions.
- Always handle errors — no silent failures. If something can fail, show a real error message to the user, not a blank screen.
- Comments only when the WHY is non-obvious — never restate the WHAT.
- 2-space indentation.

## Project-Specific Rules
- **Row-Level Security is non-negotiable.** Every Supabase table that holds client data must have RLS enabled and explicit policies before any real client logs in. Clients must never be able to query another client's rows.
- **No client data in `console.log`.** Logs go to a real logger or get removed before commit.
- **Never commit `.env` or `.env.local`.** Supabase URL is okay in client code (it's public); the **service role key** is server-only and must never reach the browser.
- **One feature per branch, one PR at a time.** Match the phase order in PRD.md — don't jump ahead.
- **Read PRD.md before starting a new phase.** If something in PRD.md is unclear, ask Noe before coding around it.

## Data Model (v1, target shape)
Tables in Supabase:
- `profiles` — `id` (uuid, = auth user id), `full_name`, `role` ('client' | 'coach'), `created_at`.
- `check_ins` — `id`, `client_id` (fk → profiles.id), `week_of` (date), `energy` (int 1–10), `mood` (int 1–10), `wins` (text), `challenges` (text), `next_focus` (text), `created_at`.

RLS policies (minimum):
- A client can `select` / `insert` only rows where `client_id = auth.uid()`.
- The coach role can `select` all rows but `insert` only their own profile.

## Definition of Done (per feature)
A task is done when **all** of these are true:
1. Behavior matches what PRD.md describes for that phase.
2. No console or terminal errors in the browser or the Next.js dev server.
3. `/review` has been run and passes.
4. Manually verified in the browser by Noe with the exact steps Claude provided.
5. Changes committed via `/commit`.
Do not report "done" until all five are true.

## Commands Noe Uses
- `/kickoff [feature]` — plan a feature before building.
- `/review` — pre-commit code review.
- `/commit` — create a git commit (do not use raw `git commit`).
- `/deploy` — deploy to Vercel (requires explicit approval).
- `/fix [error]` — diagnose and resolve a specific error.

## Hard Prohibitions
- No features outside the request or PRD.md.
- No multi-file edits without announcing them first.
- No silent error recovery — stop and surface the error.
- No installing packages without approval.
- No pushing to GitHub or deploying to Vercel without approval.
- No assumptions about which check-in fields to use — they are listed in PRD.md.
