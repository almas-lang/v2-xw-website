# /freetraining Funnel Analytics — Setup & Reference

This is the single source of truth for **every event** tracked across the free-training
funnel and **how to read it as a funnel** in GA4. Last updated: 2026-05-12.

---

## 1. The funnel, end to end

| # | Step | Where it happens | GA4 event(s) | Notes |
|---|------|------------------|--------------|-------|
| 1 | Landed on the page | `/freetraining` | `page_view` (page_path = `/freetraining`) | Traffic source comes from `utm_source` / `utm_medium` / `utm_campaign` (also captured from Meta `hsa_*` params) |
| 2 | Scrolled down the page | `/freetraining` | `scroll_depth_25`, `scroll_depth_50`, `scroll_depth_75`, `scroll_depth_100` | Fired once each per visit. Tells you how far people read before bouncing |
| 3 | Form scrolled into view | `/freetraining` (lead form) | `form_viewed` | The "Get Access" form became visible |
| 4 | Clicked into the form | `/freetraining` | `form_field_focused` (field_name = name / email / whatsapp) | First interaction with the form |
| 4b | Filled a field | `/freetraining` | `form_field_completed_name`, `form_field_completed_email`, `form_field_completed_whatsapp` | Per-field completion — shows which field people abandon on |
| 5 | Submitted the form | `/freetraining` | `form_submitted`, `generate_lead`; Meta: `Lead` (+ CAPI) | A lead is created in SalesHub here |
| 6 | Landed on the watch page | `/freetraining/watch` | `page_view` (page_path = `/freetraining/watch`) | The gap between step 5 and 6 is "submitted but never reached the video" (rare — auto-redirect) |
| 7 | Started the video | `/freetraining/watch` | `video_start`; Meta: `ViewContent` (+ CAPI) | Only fires when the user actively clicks play |
| 8 | Watched X% of the video | `/freetraining/watch` | `video_progress_10` … `video_progress_100` (deciles) | This is "how much of the video did they watch". `video_progress_50` ≈ the halfway point |
| 8b | Paused the video | `/freetraining/watch` | `video_paused` (current_time = seconds in) | Where people drop off mid-video |
| 8c | Finished the video | `/freetraining/watch` | `video_complete`; Meta: `ViewContent` "VSL Complete" (+ CAPI) | |
| 9 | Clicked "Book a call" | `/freetraining/watch` | `click` (button_name = `book_strategy_call`); Meta: `InitiateCheckout` (+ CAPI) | Then redirects to `app.xperiencewave.com/book/...` |
| 9b | Opened the booking page | `app.xperiencewave.com` (SalesHub repo) | `booking_page_viewed` (slug, lead_id) | GA4 ID `G-26R787N9N5` now loaded on `/book/[slug]` |
| 10 | Picked a date | `app.xperiencewave.com` | `booking_date_selected` (date) | |
| 10b | Picked a time slot | `app.xperiencewave.com` | `booking_slot_selected` (date, time) | "selected a date but didn't book" = reached `booking_slot_selected` but not `booking_confirmed` |
| 11 | Saw / answered a booking question | `app.xperiencewave.com` | `booking_question_viewed` (question_index, question_id), `booking_question_answered` (same) | Break the report down by `question_index` → the question people drop off on |
| 11b | Abandoned the booking | `app.xperiencewave.com` | `booking_abandoned` (last_question_index, had_slot) | Fired on tab close/hide if a slot was picked but not confirmed |
| 11c | Confirmed the booking | `app.xperiencewave.com` | `booking_confirmed` (date, time, duration, lead_id) | |
| 12 | Confirmed the call → congrats page | `/freetraining/congratulations` | `page_view`, `schedule_appointment`; Meta: `SubmitApplication` (+ CAPI) | Booking app redirects here with `date`, `time`, `duration`, `meet_link`, `email` params (+ tracking params) |
| 13 | Started the congrats prep video | `/freetraining/congratulations` | `congrats_video_start` | Separate from the VSL — this is the short post-booking video |
| 13b | Watched X% of the congrats video | `/freetraining/congratulations` | `congrats_video_progress_10` … `_100` | |
| 13c | Finished the congrats video | `/freetraining/congratulations` | `congrats_video_complete` | |
| 14 | Added a portfolio link | `/freetraining/congratulations` | `portfolio_shared` (url) | |
| 14b | Uploaded a resume | `/freetraining/congratulations` | `resume_uploaded` (file_name) | |
| 14c | Added the call to their calendar | `/freetraining/congratulations` | `calendar_added_google` / `calendar_added_apple` | |

> **Production only.** All of these events are suppressed in dev/preview builds —
> they only fire on the live site (`NODE_ENV === 'production'`).

---

## 2. Build the funnel report in GA4 (Funnel Exploration)

> **Full click-by-click version: `docs/GA4_FUNNEL_SETUP_STEPS.md`** (DebugView check → register custom dimensions → build the funnel → source breakdown → the question-drop-off report → the video-retention curve → share). The summary below is the short form.

GA4 → **Explore** → blank → **Funnel exploration** technique.

**Steps to add (in order):**

1. **Landed** — Event = `page_view`, then add condition `page_path` = `/freetraining` (use `page_location` contains `/freetraining` if `page_path` isn't set up as a dimension).
2. **Saw the form** — Event = `form_viewed`
3. **Started filling it** — Event = `form_field_focused`
4. **Submitted (became a lead)** — Event = `form_submitted`
5. **Reached the video page** — Event = `page_view` with `page_location` contains `/freetraining/watch`
6. **Played the video** — Event = `video_start`
7. **Watched ≥50%** — Event = `video_progress_50`
8. **Watched ≥90%** — Event = `video_progress_90`
9. **Clicked Book a Call** — Event = `book_strategy_call` *(or `click` with `button_name` = `book_strategy_call`)*
10. **Opened the booking page** — Event = `booking_page_viewed`
11. **Picked a date** — Event = `booking_date_selected`
12. **Picked a time slot** — Event = `booking_slot_selected`
13. **Reached the questions** — Event = `booking_question_viewed`
14. **Confirmed the booking** — Event = `booking_confirmed`
15. **Reached the congrats page** — Event = `schedule_appointment` *(or `page_location` contains `/freetraining/congratulations`)*
16. **Watched the prep video** — Event = `congrats_video_start`
17. **Submitted portfolio/resume** — Event = `portfolio_shared` *(add `resume_uploaded` as an "or")*

> Separate **free-form** report for the question drop-off chart: rows = `booking_question_viewed` and `booking_question_answered`, broken down by `question_index`; metric = event count. The gap between viewed and answered at each index is where people quit.

**Settings:**
- Toggle **"Make open funnel"** OFF first (closed funnel = strict order, best for finding the biggest leak). Turn it ON later to see "reached step N regardless of path".
- Set the **breakdown** dimension to `Session source / medium` or `First user campaign` → now you see *which traffic source* converts best at each step. This answers "from where did they land".
- Add `Device category` as a second breakdown to spot mobile-vs-desktop drop-off.
- Date range: last 28 days (and compare to previous period).

**What each leak tells you:**
- Big drop **step 1 → 2** (landed → saw form): the page above the form isn't compelling, or the page is slow. Check Clarity scroll heatmaps + `scroll_depth_*` events.
- Big drop **3 → 4** (focused → submitted): the form is too long / asking for the wrong thing / has a bug. Check `form_field_completed_*` to see the exact field they quit on (usually WhatsApp).
- Big drop **5 → 6** (lead → video page): redirect bug — investigate.
- Big drop **6 → 7** (on page → played): the video thumbnail / headline isn't pulling them in.
- Steady decay across **`video_progress_*`**: find the % where the curve falls off a cliff — that's the moment in the VSL to re-edit.
- Big drop **7/8 → 9** (watched → booked): the offer / CTA on the watch page isn't landing, OR the video is convincing but the booking ask is too heavy.
- Big drop **9 → 12** (clicked book → confirmed): the booking app is leaking — now visible via `booking_page_viewed → booking_date_selected → booking_slot_selected → booking_question_viewed → booking_confirmed`. Find which rung drops; use `booking_abandoned` (had_slot, last_question_index) for the why.
- Anyone reaching **12** but not **13/14**: the congrats page asks are optional, low priority — but worth a light nudge.

> **Tip:** also build a quick **Free-form** exploration with `video_progress_*` events as rows
> and event count as the metric — that's your "video retention curve" in 30 seconds.
>
> Save the report and **Share** it so it's reusable. Optionally connect the GA4 property to
> **Looker Studio** and drop a Funnel chart on a one-page dashboard for at-a-glance review.

---

## 3. The other three tools — what each is good for

- **GA4** — the funnel itself (counts, conversion %, source breakdown). Primary.
- **Microsoft Clarity** (project `ulzh33d3iv`) — *why* a step leaks. Filter session recordings to people who hit `form_viewed` but not `form_submitted` and watch what they actually do. Use the scroll heatmap on `/freetraining`. Clarity does **not** give you funnel counts — pair it with GA4.
- **Meta Pixel / Conversions API** (pixel `1406183214178910`) — only for ad optimisation & ROAS. The `Lead → InitiateCheckout → SubmitApplication` chain is what Meta optimises delivery against. Not your reporting funnel — GA4 is cleaner for that.
- **SalesHub** — the source of truth for *actual humans* (leads created, calls booked, calls attended, customers). The website can't see "did they show up to the call" or "did they buy" — only SalesHub can. The website-side funnel ends at "confirmed booking"; SalesHub picks up from there.

A complete picture = **GA4 funnel** (website behaviour) + **SalesHub** (lead → booked → attended → closed) joined on the lead's email.

---

## 4. The booking-app steps (10 & 11) — DONE

"Picked a date but didn't book" and "dropped off on question X" happen inside the booking
app at `app.xperiencewave.com/book/[slug]`, which lives in the **separate `saleshub`
repo** — *not* this codebase. As of 2026-05-12 that repo was instrumented:
- GA4 (`G-26R787N9N5`, same property) is loaded on the public `/book/[slug]` route only.
- Events fired: `booking_page_viewed`, `booking_date_selected`, `booking_slot_selected`, `booking_question_viewed` (+ `question_index` / `question_id`), `booking_question_answered`, `booking_abandoned` (+ `had_slot`, `last_question_index`), `booking_confirmed`.
- Data-quality fixes: `/api/bookings` now binds the booking to the originating lead via `lead_id` (UUID) before falling back to email/phone; a 6-hourly cron (`/api/cron/booking-no-show`) flips confirmed bookings >4h past their end time to `no_show`.

So these steps are now in GA4 — see the funnel & free-form report in §2. The
lead→booked→attended→closed view also lives in SalesHub's own analytics dashboard
(`(app)/analytics/*`). The `booking_events` DB table was **deliberately not built** —
GA4 covers the drop-off question; the table would only add a per-contact booking-attempt
timeline inside SalesHub, which nobody's asked for. Additive later if needed.

---

## 5. Where the tracking code lives

| File | What it does |
|------|--------------|
| `src/lib/freetraining/track.ts` | All event-firing helpers (GA4 + Meta Pixel + CAPI) |
| `src/components/Analytics.tsx` | Loads GA4 (`G-26R787N9N5`) + Clarity (`ulzh33d3iv`) site-wide |
| `src/components/freetraining/FTAnalytics.tsx` | Loads Meta Pixel on `/freetraining/*` |
| `src/app/freetraining/page.tsx` | Landing: page_view, UTM capture, `scroll_depth_*` |
| `src/components/freetraining/LeadForm.tsx` | `form_viewed`, `form_field_focused`, `form_field_completed_*`, `form_submitted`, `Lead` |
| `src/app/freetraining/watch/page.tsx` | `video_start`, `video_progress_*` (deciles), `video_paused`, `video_complete`, `book_strategy_call`, `InitiateCheckout` |
| `src/app/freetraining/congratulations/page.tsx` | `schedule_appointment`, `SubmitApplication`, `congrats_video_*`, `portfolio_shared`, `resume_uploaded`, `calendar_added_*` |
| `src/app/freetraining/api/facebook/conversion/route.ts` | Server-side Conversions API endpoint |
| `src/app/freetraining/api/saleshub/webhook/route.ts` | Creates a lead in SalesHub on form submit |
| `src/app/freetraining/api/saleshub/update/route.ts` | Updates the lead with portfolio_url / resume_url |

---

## 6. SalesHub — status & remaining ops checks

SalesHub *is* the booking app — same `saleshub` repo serves `app.xperiencewave.com/book/[slug]`.
Full findings: `docs/SALESHUB_INTEGRATION_AUDIT.md`. State after the 2026-05-12 work:

| Item | Status |
|------|--------|
| Lead webhook (`/api/webhooks/lead-capture`) | ✅ solid — still **reconcile 7-day lead count vs GA4 `form_submitted`** in prod |
| UTM fields stored on contact | ✅ as real columns from the webhook (booking-path UTMs go to `metadata` — minor) |
| Lifecycle: Lead → Booked auto | ✅ |
| Lifecycle: Attended / No-show | ✅ now automated — `/api/cron/booking-no-show` flips bookings >4h past end to `no_show`; staff mark real attendees `completed` first |
| Abandoned bookings | ✅ as GA4 events (`booking_abandoned`); not persisted to a DB table (optional, skipped) |
| Email = join key | ✅ consistent everywhere |
| `lead_id` binds booking to lead | ✅ `/api/bookings` matches by `lead_id` (UUID) before email/phone |
| Portfolio/resume on contact | ✅ stored in `contacts.metadata` (add to CSV export if needed) |
| Pipeline/funnel reporting | ✅ in-app `(app)/analytics/*` + `/api/contacts/export` CSV |
| Booking-flow GA4 events | ✅ `booking_page_viewed/date_selected/slot_selected/question_viewed/question_answered/abandoned/confirmed` on `/book/[slug]` |
| Congrats redirect | ⚠️ widget sends `date/time/duration/meet_link/email` + tracking params; **`first_name` not yet added** to the redirect |

### Remaining ops checks (your side)
- Confirm `CRON_SECRET` is set in the SalesHub Vercel project (the new no-show cron needs it).
- Confirm `SALESHUB_WEBHOOK_SECRET` is set in SalesHub prod **and matches** the value the marketing site sends.
- Confirm the marketing site's Vercel project has `SALESHUB_WEBHOOK_URL` and `SALESHUB_LEAD_UPDATE_URL` (→ `…/api/webhooks/lead-capture/update`).
- View-source `app.xperiencewave.com/book/design-career-strategy-call` in prod → confirm `gtag/js?id=G-26R787N9N5` is present; run a test booking and watch GA4 Realtime/DebugView for the `booking_*` event sequence.
- Reconcile last 7 days: SalesHub `contacts` created vs GA4 `form_submitted` — a persistent gap means the lead webhook call is failing silently.
- (Optional) add `first_name` to the booking widget's post-booking redirect so the congrats page can greet by name without re-reading the form.
