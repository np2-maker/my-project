# PRD — Coaching Client Dashboard

## Problem
Coaching clients usually share weekly updates over scattered channels (text, email, voice notes), which makes it hard for both client and coach to see real progress over time. A simple dashboard where clients log a weekly check-in and watch their own trend lines build up turns coaching into a visible, accountable loop instead of a memory exercise.

## Goals
- Make logging a weekly check-in take under 2 minutes for a client.
- Give the client a visible "progress over time" view they actually want to open.
- Give the coach (Noe) a quick read on every client's status without chasing them.
- Ship a usable v1 in weeks, not months — beginner-friendly stack.

## Target Users
- **Primary — Coaching client:** Adult, busy, not technical. Logs in once a week, fills a short form, glances at their own charts. Cares about feeling progress, not about features.
- **Secondary — Coach (Noe):** Solopreneur running 1:1 coaching. Wants one screen that shows "who checked in this week, who didn't, and how each client is trending."

## Recommended Stack (v1)

> These are sensible defaults for a no-code-background solopreneur. Each is the lowest-friction option that still scales. Override any of these in **Open Questions** if you have a preference.

- **Frontend:** **Next.js (App Router) + Tailwind CSS** — one framework gives you pages, forms, and an API in the same project; great Vercel integration.
- **Backend / Database / Auth:** **Supabase** — Postgres database + magic-link email login + row-level security in one product. You won't have to wire up auth or a separate DB.
- **Charts:** **Recharts** — simple React chart library; line + bar charts in a few lines.
- **Hosting:** **Vercel** — free tier, deploys on `git push`, zero config for Next.js.
- **Why this combo:** Three vendors total (Supabase + Vercel + GitHub). No servers to manage. Free-tier friendly. Everything has good Claude Code support.

## Scope

**In scope (v1):**
- Email magic-link login (no passwords to manage).
- One coach account; many client accounts. Coach is hardcoded as the owner for v1.
- Client weekly check-in form with a fixed set of fields (see "Check-in Fields" below).
- Client dashboard: their own check-in history + 2–3 trend charts.
- Coach dashboard: list of all clients with last-check-in date and a "view client" link.
- Reminder email if a client hasn't checked in by end of week (optional stretch).

**Out of scope (v1) — deferred:**
- Multiple coaches / coach-team accounts.
- Client-to-client visibility (clients only ever see themselves).
- Coach-customizable check-in templates per client.
- File uploads, video, voice notes.
- Mobile app (web is mobile-responsive — that's enough for v1).
- Payments / billing / scheduling — that's a different product.
- AI summaries of client progress (great v2, not v1).

## Check-in Fields (proposed default template)
A check-in is one weekly form submission per client. Fields:
- **Week of** (auto-set to current week, editable)
- **Energy this week** (1–10 slider)
- **Mood this week** (1–10 slider)
- **Wins** (free text, short)
- **Challenges** (free text, short)
- **One focus for next week** (free text, one line)
- **Goal progress** (0–100% slider on a coach-set goal, OR skip in v1 and add in v2)

This set is intentionally small so a check-in stays under 2 minutes.

## Progress Visualization (what the client sees)
- **Line chart:** Energy + Mood over time (last 12 weeks).
- **Streak counter:** "You've checked in 4 weeks in a row."
- **Timeline:** Last 4 check-ins as cards, newest first, with wins and challenges visible.

## User Flow (happy path)

**Client:**
1. Coach adds client email in coach view.
2. Client gets magic-link email, clicks, lands on their dashboard.
3. Sees a "Log this week's check-in" prompt at the top.
4. Fills the form in under 2 minutes, submits.
5. Sees updated charts and timeline immediately.

**Coach:**
1. Logs in with magic link.
2. Sees a table of all clients: name, last check-in date, mood trend arrow.
3. Clicks a client to see their full history (same view the client sees).

## Success Criteria
- A new client can complete their first check-in in under 2 minutes from clicking the magic link.
- After 4 weeks of use, a client opens the dashboard at least once between check-ins (signal that the progress view is actually motivating).
- Coach can answer "who hasn't checked in this week?" in under 10 seconds.
- Zero passwords stored anywhere (auth is magic-link only).

## Risks
- **Clients forget to check in** — mitigation: weekly reminder email, and a visible streak counter to gamify consistency.
- **Form fatigue** — mitigation: keep v1 to ~6 fields max; resist the urge to ask more.
- **Supabase row-level security misconfigured** (clients seeing each other's data) — mitigation: explicit RLS policies before any client data is entered; test with two test accounts before going live.
- **Beginner overwhelm building it** — mitigation: build in this exact order: auth → check-in form → client chart view → coach list view → reminders. Don't skip ahead.

## Build Order (suggested phases)
1. **Phase 1 — Auth working:** Supabase project + Next.js app + magic-link login. End state: you can log in and see "Hello, you@email.com".
2. **Phase 2 — Check-in form:** Form writes a row to a `check_ins` table. End state: you can submit a check-in and see it in the Supabase table viewer.
3. **Phase 3 — Client dashboard:** Show that client's check-ins as a list, then add charts.
4. **Phase 4 — Coach view:** Table of all clients with last-check-in date.
5. **Phase 5 — Polish:** Reminder emails, streak counter, mobile responsive pass.

## Open Questions
- **Who is the coach in v1 — just you, or are you building this to sell to other coaches?** (Affects whether "coach account" needs to be generic or hardcoded.)
- **Are the check-in fields above right, or do you already use a specific template with clients?** (If you have one, we use yours.)
- **Do clients have a fixed goal you want to track numerically (e.g., weight, revenue, habits-completed), or is goal progress qualitative for now?**
- **Do you want clients to be able to edit a past check-in, or is each one locked once submitted?**
- **Is email magic-link login okay, or do clients expect username/password?** (Magic-link is simpler to build and more secure; recommended.)
- **Stack confirmation:** Are you okay with the Next.js + Supabase + Vercel recommendation above, or do you have a different preference?
