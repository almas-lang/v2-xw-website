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

**The steps** (name → condition):

| # | Step name | Condition |
|---|---|---|
| 1 | Landed on /freetraining | Event `page_view` **AND** "Page location" *contains* `/freetraining` *(use "Page path and screen class" *contains* `/freetraining` if you prefer; either works)* |
| 2 | Saw the form | Event `form_viewed` |
| 3 | Started filling the form | Event `form_field_focused` |
| 4 | Submitted — became a lead | Event `form_submitted` |
| 5 | Reached the watch page | Event `page_view` **AND** "Page location" *contains* `/freetraining/watch` |
| 6 | Played the video | Event `video_start` |
| 7 | Watched ≥ 50% | Event `video_progress_50` |
| 8 | Watched ≥ 90% | Event `video_progress_90` |
| 9 | Clicked "Book a call" | Event `book_strategy_call` |
| 10 | Opened the booking page | Event `booking_page_viewed` |
| 11 | Picked a date | Event `booking_date_selected` |
| 12 | Picked a time slot | Event `booking_slot_selected` |
| 13 | Reached the questions | Event `booking_question_viewed` |
| 14 | Confirmed the booking | Event `booking_confirmed` |
| 15 | Landed on /congratulations | Event `schedule_appointment` *(or `page_view` AND "Page location" contains `/freetraining/congratulations`)* |
| 16 | Watched the prep video | Event `congrats_video_start` |
| 17 | Submitted portfolio / resume | Event `portfolio_shared` **OR** `resume_uploaded` *(in the step editor, add the first condition, then click "Or" to add the second)* |

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

1. In the *Variables* column, top, find **Comparisons** → click **+** → "Create comparison" → leave it as the default (it'll compare to the previous period of the same length). Or set the date range, then use the second date selector for "compare to".
2. Now every bar shows current vs prior — so you can see "form→submit dropped from 28% to 19% after we changed the form" type movements.

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

1. **Explore** → **Free form** → rename **"VSL Retention Curve"**.
2. *Tab Settings*: **Rows** = **Event name**; **Values** = **Total users**; **Filter**: Event name *matches regex* `video_progress_\d+|video_start|video_complete`.
3. You'll get a list: `video_start`, `video_progress_10`, `video_progress_20`, … `video_progress_100`, `video_complete` with user counts — that's your retention curve. The decile where it drops sharply is the spot in the VSL to re-edit.
4. Same idea for the congrats prep video: filter regex `congrats_video_progress_\d+|congrats_video_start|congrats_video_complete`.
5. To see it as an actual line chart, change **Visualization** to **Line chart** (works once Event name is a categorical ordering — or just eyeball the numbers; the table is honestly fine).

---

## Part I — Save, share, and get it in front of yourself weekly

1. Each exploration auto-saves to your account. To let others see it: top-right of the exploration → **Share** icon → "Share with everyone who has access to this property" (read-only). They'll find it under Explore → "Shared with me" / the explorations list.
2. **Looker Studio version (optional, prettier, linkable):** Looker Studio (lookerstudio.google.com) → Create → Report → add data source → **Google Analytics** → pick this property → add a **"Funnel" chart** (community viz) or just a **bar chart** with the same steps as dimensions. More fiddly than the native Exploration; only do it if you want a clean shareable dashboard URL for stakeholders.
3. **Weekly habit:** GA4 → **Reports** → **Library** → you can also build a simpler "Conversions" overview card from the key events you marked in Part C and pin it to the left nav. Or just open the "Free Training — Full Funnel" exploration every Monday.

---

## What to actually *do* with it (the point of all this)

Look at the funnel and find the **single biggest % drop between two consecutive steps**. That's where to spend effort. Rough playbook:

| Biggest drop is between… | Likely cause | Where to look / what to change |
|---|---|---|
| 1 → 2 (landed → saw form) | Page above the form is weak, or slow load | Clarity scroll heatmap on `/freetraining`; `scroll_depth_*` numbers; check page speed |
| 2 → 3 → 4 (saw form → submitted) | Form too long / wrong ask / a field is scary | `form_field_completed_*` per field — find which field they quit on (usually WhatsApp); Clarity recordings of form_viewed-but-not-submitted |
| 4 → 5 (lead → watch page) | Redirect bug | Test the post-submit redirect; should be near-zero drop |
| 5 → 6 (on watch page → played) | Thumbnail/headline not pulling them in | Rework the area around the video; test a different first frame |
| video_progress_X falls off a cliff | That moment in the VSL is boring/confusing | Re-edit that section of the video |
| 6/8 → 9 (watched → clicked book) | The offer/CTA on the watch page isn't landing, or video convinced but the ask feels heavy | Rework the booking section copy; test a softer CTA |
| 9 → 10 (clicked book → opened booking page) | Slow redirect / broken booking page on some devices | Check the booking page loads fast; mobile test |
| 10 → 12 (opened → picked a slot) | Not enough slots / times look inconvenient / calendar UX confusing | Open more availability; simplify the slot picker |
| 13 → 14 (questions → confirmed) | A specific question is too nosy/long | The Part G report tells you the exact question — cut it, make it optional, or move it post-booking |
| `booking_abandoned` with `had_slot = true` is high | People are *one click* from booking and leaving | Reduce friction on the final confirm screen; add reassurance copy there |
| 14 → 12-congrats spread, or low 16/17 | Congrats-page asks are optional — low priority | Light nudge at most; don't over-invest here |
