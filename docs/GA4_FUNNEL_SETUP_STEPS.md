# GA4 Funnel — Step-by-Step Build Guide

Click-by-click instructions to turn the events we now fire into (a) a full funnel report,
(b) a "which booking question loses people" report, and (c) a video-retention curve.
Property: GA4 measurement ID `G-26R787N9N5`. Companion to `FREETRAINING_FUNNEL_ANALYTICS.md`.

> **Read this first — two things that will bite you otherwise:**
> 1. **Custom dimensions are not retroactive.** GA4 only attaches a parameter (like `question_index`) to events *after* you register it as a custom dimension. Register them today (Part B) so the data starts accumulating. Anything before registration won't have it.
> 2. **Standard reports lag ~24–48h. DebugView & Realtime are instant. Explorations are usually same-day but can lag a few hours.** Don't panic if a brand-new funnel looks empty for a day.

---

## Part A — Confirm the events are actually arriving (10 min, do this first)

1. Go to **analytics.google.com** → pick the property with ID `G-26R787N9N5` (top-left property selector).
2. Left nav → **Admin** (gear, bottom-left) → under *Property* → **DebugView**.
3. On a phone or another browser, open the **live** site `https://xperiencewave.com/freetraining` *(DebugView needs debug mode — easiest: install the "Google Analytics Debugger" Chrome extension and toggle it on, then load the page; or append `?debug_mode=1` if the site forwards it — the extension is the reliable way)*. Scroll down, focus the form, etc.
4. In DebugView you should see, in order: `page_view`, `scroll_depth_25/50/75`, `form_viewed`, `form_field_focused`, `form_field_completed_*`, `form_submitted`. Click any event to see its parameters.
5. Repeat on `/freetraining/watch` (play the video → `video_start`, `video_progress_10`, …) and on `app.xperiencewave.com/book/design-career-strategy-call` (→ `booking_page_viewed`, `booking_date_selected`, `booking_slot_selected`, `booking_question_viewed`, `booking_confirmed`).
6. If something's missing → it's a tracking bug, not a reporting bug. Stop and fix that first. If everything shows → continue.

> **Note on `page_view`:** GA4's "Enhanced measurement" already sends a `page_view` on every page with a built-in `page_location` (full URL) and `page_path` dimension. Our code *also* sends a `page_view` with a `page_path` parameter — harmless, but in the funnel below we'll filter on the **built-in** "Page path and screen class" / "Page location" dimension because it's always populated. Make sure **Admin → Data Streams → [your web stream] → Enhanced measurement** has *Page views* toggled ON.

---

## Part B — Register the custom dimensions you'll need (one-time, 10 min)

Admin → under *Property* → **Custom definitions** → **Custom dimensions** tab → **Create custom dimension**. Do this once for each row below (Scope = **Event** for all of them):

| Dimension name (your label) | Scope | Event parameter |
|---|---|---|
| Question index | Event | `question_index` |
| Question ID | Event | `question_id` |
| Button name | Event | `button_name` |
| Video percent | Event | `percent` |
| Video ID | Event | `video_id` |
| Form field name | Event | `field_name` |
| Had slot (abandon) | Event | `had_slot` |
| Last question index (abandon) | Event | `last_question_index` |
| UTM content (ad) | Event | `utm_content` |
| UTM term (adset) | Event | `utm_term` |

(You don't need a custom dimension for `utm_source` / `utm_medium` / `utm_campaign` — GA4 has built-in "Session source", "Session medium", "Session campaign", "First user campaign" dimensions; use those.)

Save each. Now wait — these populate going forward only.

---

## Part C — (Optional but recommended) Mark key events as conversions

Admin → *Property* → **Events** (or **Key events** in newer GA4). Find these in the list (they appear after they've fired at least once) and toggle **"Mark as key event / conversion"**:
- `form_submitted` (became a lead)
- `book_strategy_call`
- `booking_confirmed`
- `schedule_appointment`

This lets you see conversion counts/rates in standard reports and use them in Google Ads if you ever link the account. Not required for the Exploration funnel, but cheap and useful.

---

## Part D — Build the main Funnel Exploration

1. Left nav → **Explore** → click the **Funnel exploration** template (or "Blank" → in the *Technique* dropdown on the right pick **Funnel exploration**).
2. Rename it: top-left of the canvas, click the title → type **"Free Training — Full Funnel"**.
3. Set the **date range** (top of the *Variables* column, far left): last **28 days** to start. (You'll also create a comparison later.)
4. In the *Tab Settings* column (middle), find **Steps** → click the **pencil icon** to open the step editor.
5. Add steps one at a time. For each: click **+ Add step**, name it, then add a condition (the events listed below). When done, click **Apply** at the bottom.

> **⚠️ GA4 hard limit: a Funnel exploration allows at most 10 steps.** The original 17-step wishlist doesn't fit, so the table below is the consolidated 10-step funnel. The granularity we drop here (per-field form drop-off, video deciles, per-question booking drop-off, post-booking congrats steps) is covered by the separate explorations in **Part G** (booking question drop-off) and **Part H** (video retention curve) — build those too and you've lost nothing. If you ever want a dedicated post-booking funnel, make a *second* Funnel exploration starting at `booking_confirmed`.

**The 10 steps** (name → condition):

| # | Step name | Condition |
|---|---|---|
| 1 | Landed on /freetraining | Event `page_view` **AND** parameter "Page location" *contains* `/freetraining` *(in the step editor: pick `page_view`, then click "+ Add parameter" → `page_location` → contains → `/freetraining`)* |
| 2 | Saw the form | Event `form_viewed` |
| 3 | Submitted — became a lead | Event `form_submitted` |
| 4 | Reached the watch page | Event `page_view` **AND** parameter "Page location" *contains* `/freetraining/watch` |
| 5 | Played the video | Event `video_start` |
| 6 | Watched ≥ 50% | Event `video_progress_50` |
| 7 | Clicked "Book a call" | Event `book_strategy_call` |
| 8 | Opened the booking page | Event `booking_page_viewed` |
| 9 | Picked a time slot | Event `booking_slot_selected` |
| 10 | Confirmed the booking | Event `booking_confirmed` |

> Brand-new / rarely-fired events (`book_strategy_call`, all `booking_*`, `video_progress_90`, etc.) won't appear in the step editor's event dropdown until they've fired at least once in the last 28 days. **Type the exact event name** and select the "use this" option — GA4 accepts it and it starts matching once data flows. If GA4 refuses an event it has truly never seen, use `booking_page_viewed` as the last step for now and swap in the deeper steps after a real booking has gone through.

*(Dropped from the original list, by design — find them in Parts G/H instead: `form_field_focused`, `video_progress_90`, `booking_date_selected`, `booking_question_viewed`, `schedule_appointment` / `/congratulations`, `congrats_video_start`, `portfolio_shared` / `resume_uploaded`.)*

6. **Funnel type:** at the top of the *Tab Settings*, leave **"Make open funnel"** toggled **OFF** for the first read. (Closed funnel = users must hit the steps in order — this is what reveals the single biggest leak. Later, flip it ON to see "how many ever reached step N by any path".)
7. **Visualization:** *Tab Settings* → **Visualization** → choose **Standard funnel** (the horizontal bars). "Trended funnel" is the same data over time — switch to it once you have a few weeks.
8. **Show elapsed time:** *Tab Settings* → toggle **"Show elapsed time"** ON → now each step shows the median time between it and the next. (Tells you e.g. people sit on the watch page 6 minutes before booking, or bounce in 8 seconds.)

You now have the funnel. Each bar shows users at that step, the % of the previous step, and the % of step 1 (overall). The biggest single drop is your priority.

---

## Part E — Add the "where did they come from" breakdown

1. In the *Variables* column (left), under **Dimensions**, click **+** → search and add: **Session source / medium**, **Session campaign**, **First user campaign**, and the custom ones **UTM content (ad)** and **UTM term (adset)**. Click **Import**.
2. In *Tab Settings* → **Breakdown** → drag **Session source / medium** into it.
3. The funnel now splits each step by source — you'll see e.g. Meta vs Google vs direct converting at different rates at each rung. The legend lets you isolate one source.
4. Swap the breakdown to **First user campaign** to compare campaigns, or to **UTM content (ad)** to compare individual ads — but note this only works for traffic that arrived *with* those params (i.e. your paid traffic; organic won't have utm_content).
5. *Tab Settings* → **Breakdown** also has a **"Rows to display"** number — bump it to 10–15 so smaller sources aren't hidden.
6. Add a **second breakdown** if you want: **Device category** (mobile vs desktop drop-off is often dramatic on forms and video).

---

## Part F — Add a comparison (this period vs last)

> **UI note:** newer GA4 has *no* "Comparisons" section in the Variables column. Period-over-period comparison lives **inside the date picker**; segment-vs-segment comparison is the **"Segment comparisons"** slot in the Settings column.

1. **Period vs last (do this):** click the **date-range box** at the top of the *Variables* column → in the calendar, turn ON the **"Compare"** toggle → pick **"Previous period (match day of week)"** → **Apply**. Every funnel bar now shows current value, prior-period value, and the % change — so you can see "form→submit dropped from 28% to 19% after we changed the form" type movements. *(If one period had almost no traffic the % change will be huge/meaningless — that just means the funnel ramped up recently; it settles once you have two full comparable periods.)*
2. **(Optional) segment comparison:** in the Settings column, **SEGMENT COMPARISONS → "Drop or select segment"** → drop in a segment like `Paid traffic` (and/or `Direct traffic`) → the funnel renders one set of bars per segment. Mostly redundant with the channel-group Breakdown from Part E, but handy occasionally.

---

## Part G — The "which booking question loses people" report (separate exploration)

This one is a **Free-form** table, not a funnel, because `question_index` repeats within one session.

1. **Explore** → **Free form** template → rename it **"Booking — Question Drop-off"**.
2. Date range: last 28 days.
3. *Variables* column: add the dimension **Question index** (the custom dimension from Part B); add the metrics **Event count** and **Total users**.
4. *Tab Settings*:
   - **Rows** → drag in **Question index**.
   - **Values** → drag in **Total users** (and Event count if you want).
   - **Filters** → add a filter: **Event name** *exactly matches* — and here's the trick — you'll do this **twice**, once per metric column, or simpler: build it as two side-by-side tables. Easiest single-table version:
     - Add a **second dimension column**? No — instead use a **secondary dimension = Event name**, with rows = Question index, columns/values = Total users, and filter Event name to `booking_question_viewed` OR `booking_question_answered`.
   - Practical recipe: set **Rows** = `Question index`, then **Columns** (drag into the "Columns" slot) = `Event name`, **Values** = `Total users`, **Filter**: Event name *matches regex* `booking_question_viewed|booking_question_answered`.
5. Read it: for each question index you now see how many *saw* it (`booking_question_viewed`) vs how many *answered* it (`booking_question_answered`). The index where "answered" falls off a cliff relative to "viewed" = the question people quit on. Cross-check with the count of `booking_abandoned` events broken down by **Last question index**.
6. **Bonus table:** Rows = `Last question index`, filter Event name = `booking_abandoned`, secondary dimension = `Had slot` → tells you "of people who bailed, how many had already picked a slot" (those are the hottest losses — they were *this close*).

---

## Part H — The video-retention curve (30-second report)

1. **Explore** → **Blank** → set **Technique = Free form** → rename **"VSL Retention Curve"**. Date range: last 28 days (turn the Compare toggle OFF if it carried over).
2. *Variables*: import dimension **Event name** and metric **Total users**. *Settings*: **Rows** = `Event name`; **Values** = `Total users`; **Filters** → `Event name` *matches regex* `video_start|video_progress_\d+|video_complete`.
3. You'll get a list like `video_start` → `video_progress_25` → `video_progress_50` → … → `video_complete` with user counts — that's your retention curve. **The milestone where the count drops sharpest = the spot in the VSL to re-edit.** Two drops to watch: a big early drop (`start → first milestone` — your hook isn't holding; re-cut the opening) and a late drop (`75 → 100` — the close drags or the pitch loses people). Also note the absolute finish rate (`video_complete ÷ video_start`).
   - *If the list only shows coarse milestones (25/50/75/100) and not fine deciles (10/20/30…), the watch-page video may not be firing the finer-grained `video_progress_*` events yet — worth verifying; finer deciles let you pinpoint where inside the first quarter the bleed happens.*
4. **Congrats prep video — add a second tab** (don't overwrite the VSL one): click the **`+`** next to the tab name at the top of the canvas → on the new tab set Technique = Free form, Rows = `Event name`, Values = `Total users`, Filter `Event name` *matches regex* `congrats_video_start|congrats_video_progress_\d+|congrats_video_complete`. Double-click each tab name to label them ("VSL Retention" / "Congrats Video Retention"). Lower priority — congrats-video viewers have already booked.
5. **Line chart? Don't bother.** *Settings → Visualization → Line chart* renders the x-axis in the dimension's sort order, and `Event name` sorts alphabetically (`…_100` before `…_25` before `…_50` before `…_start`) → a meaningless zig-zag, not a descending curve. There's no clean fix in Free-form. Leave it as the **table with the in-cell bar chart** (Cell type = Bar chart) — that already shows the shape. A proper visual retention curve is a Looker Studio job (Part I).

---

## Part I — Save, share, and get it in front of yourself weekly

1. Each exploration auto-saves to your account. To let others see it: top-right of the exploration → **Share** icon → "Share with everyone who has access to this property" (read-only). They'll find it under Explore → "Shared with me" / the explorations list.
2. **Looker Studio version (optional, prettier, linkable):** Looker Studio (lookerstudio.google.com) → Create → Report → add data source → **Google Analytics** → pick this property → add a **"Funnel" chart** (community viz) or just a **bar chart** with the same steps as dimensions. More fiddly than the native Exploration; only do it if you want a clean shareable dashboard URL for stakeholders.
3. **Weekly habit:** GA4 → **Reports** → **Library** → you can also build a simpler "Conversions" overview card from the key events you marked in Part C and pin it to the left nav. Or just open the "Free Training — Full Funnel" exploration every Monday.

---

## What to actually *do* with it (the point of all this)

Look at the funnel and find the **single biggest % drop between two consecutive steps**. That's where to spend effort. Rough playbook:

(Step numbers below refer to the 10-step funnel in Part D.)

| Biggest drop is between… | Likely cause | Where to look / what to change |
|---|---|---|
| 1 → 2 (landed → saw form) | Page above the form is weak, or slow load | Clarity scroll heatmap on `/freetraining`; `scroll_depth_*` numbers; check page speed |
| 2 → 3 (saw form → submitted) | Form too long / wrong ask / a field is scary | `form_field_completed_*` per field — find which field they quit on (usually WhatsApp); Clarity recordings of form_viewed-but-not-submitted |
| 3 → 4 (lead → watch page) | Redirect bug | Test the post-submit redirect; should be near-zero drop |
| 4 → 5 (on watch page → played) | Thumbnail/headline not pulling them in | Rework the area around the video; test a different first frame |
| 5 → 6 (played → watched ≥50%) or `video_progress_X` falls off a cliff in the Part H curve | That moment in the VSL is boring/confusing | Re-edit that section of the video |
| 6 → 7 (watched → clicked book) | The offer/CTA on the watch page isn't landing, or video convinced but the ask feels heavy | Rework the booking section copy; test a softer CTA |
| 7 → 8 (clicked book → opened booking page) | Slow redirect / broken booking page on some devices | Check the booking page loads fast; mobile test |
| 8 → 9 (opened → picked a slot) | Not enough slots / times look inconvenient / calendar UX confusing | Open more availability; simplify the slot picker |
| 9 → 10 (slot → confirmed) | A booking question is too nosy/long, or the final confirm screen has friction | The Part G report tells you the exact question — cut it, make it optional, or move it post-booking |
| `booking_abandoned` with `had_slot = true` is high (Part G bonus table) | People are *one click* from booking and leaving | Reduce friction on the final confirm screen; add reassurance copy there |
| Post-booking (`schedule_appointment`, `congrats_video_start`, `portfolio_shared`/`resume_uploaded`) numbers are low — check via the Events report or a second funnel | Congrats-page asks are optional — low priority | Light nudge at most; don't over-invest here |
