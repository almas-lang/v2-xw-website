# Xperience Wave — Developer Handoff
## Complete Funnel Rebuild Specification

**Last Updated:** April 9, 2026
**Tech Stack:** React (Vite) for landing pages | Next.js for SalesHub (app.xperiencewave.com)
**Domain:** xperiencewave.com

---

## Table of Contents

1. [Site Architecture & URLs](#1-site-architecture--urls)
2. [Page 1: Landing Page](#2-page-1-landing-page)
3. [Page 2: Watch Page](#3-page-2-watch-page)
4. [Page 3: Booking Page](#4-page-3-booking-page)
5. [Page 4: Congratulations Page](#5-page-4-congratulations-page)
6. [Redirects](#6-redirects)
7. [Tracking & Analytics](#7-tracking--analytics)
8. [SalesHub Integration](#8-saleshub-integration)
9. [MSG91 SMS Integration](#9-msg91-sms-integration)
10. [WhatsApp Templates](#10-whatsapp-templates)
11. [SEO Requirements](#11-seo-requirements)
12. [Performance Requirements](#12-performance-requirements)
13. [About Murad Section — Verified Data](#13-about-murad-section--verified-data)

---

## 1. Site Architecture & URLs

### User Flow
```
Meta Ad Click
  → xperiencewave.com/freetraining          (Landing Page)
    → Fill form (Name + Email + WhatsApp)
      → xperiencewave.com/freetraining/watch (Watch Page)
        → Watch VSL (28 min)
          → "Book Strategy Call" (appears at 15-min mark)
            → app.xperiencewave.com/book/design-career-strategy-call (Booking)
              → Select Date → Time → Answer 10 qualifier questions
                → xperiencewave.com/freetraining/congratulations (Confirmation)
```

### URL Map
| URL | Purpose | Index? |
|-----|---------|--------|
| `/freetraining` | Landing page — lead capture | Yes |
| `/freetraining/watch` | VSL watch page | No (noindex) |
| `/freetraining/congratulations` | Post-booking confirmation | No (noindex) |
| `app.xperiencewave.com/book/design-career-strategy-call` | Calendar booking | No (noindex) |

---

## 2. Page 1: Landing Page

**URL:** `xperiencewave.com/freetraining`
**Purpose:** Convert Meta ad clicks into leads who watch the VSL
**Primary design:** Mobile (375px) — 90%+ traffic from Meta ads on phones

### Meta Tags

```html
<title>Free Training: How Designers Break Into Senior UX Roles in 90 Days | Xperience Wave</title>

<meta name="description" content="Watch Shaik Murad's free 28-min training on why skilled UX, UI, and Product designers stay stuck at mid-level — and how 830+ designers landed senior & leadership roles paying ₹18-28 LPA in under 90 days.">

<link rel="canonical" href="https://xperiencewave.com/freetraining">

<meta property="og:title" content="Free Training: Break Into Senior UX Roles in 90 Days">
<meta property="og:description" content="3 uncomfortable truths keeping talented designers stuck — and what designers earning ₹18-28 LPA figured out instead.">
<meta property="og:image" content="[Murad thumbnail image URL]">
<meta property="og:url" content="https://xperiencewave.com/freetraining">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Sections (Top to Bottom)

#### Section 1: Hero
**Background:** Dark (#15152A) | Full width | Content centered

```
Stars: ⭐⭐⭐⭐⭐ 4.8 out of 1,823 ratings
├── Font: 12px, color #999, stars yellow #F59E0B

Qualifier Badge (pill shape, gradient pink→purple bg):
├── "For UX/UI/Product Designers with 2-8 Years Who Keep Getting Passed Over For Senior Roles"
├── Font: 11px, semibold, white, center aligned
├── Max-width: 335px mobile
├── Border-radius: 20px

Headline:
├── "Still Getting Overlooked For Senior Roles — Despite Being Better Than Half The People Getting Promoted?"
├── Font: 26px mobile / 48px desktop, bold (700), white
├── Line-height: 125%
├── Center aligned, max-width: 900px desktop

Sub-headline:
├── "Watch this free 28-min training where Shaik Murad breaks down why this keeps happening — and how 830+ designers landed senior & leadership roles paying ₹18-28 LPA in under 90 days."
├── Font: 14px mobile / 18px desktop, color #BFBFCC
├── Line-height: 165%, center aligned

Without clause:
├── "Without a fancy degree, big-brand resume, or prior team leadership experience."
├── Font: 12px, color #80809B, center aligned

Video Thumbnail:
├── Image: Murad's face + VSL title slide
├── Play button overlay: red circle (#D95858), white triangle
├── Border-radius: 12px, border: 1px #3F3F59
├── BEHAVIOR: Tapping smooth-scrolls to #get-access (form section)
├── Use <button> with scroll behavior, NOT <a>
├── aria-label="Watch free training — scrolls to form"

Micro-text (mobile only):
├── "Tap to watch → scrolls to form below"
├── Font: 10px, color #72727F
```

#### Section 2: What You'll Discover
**Background:** White (#FFFFFF) | Padding: 40px top/bottom, 20px sides mobile

```
Title: "In this training, you'll learn:"
├── Font: 20px mobile / 32px desktop, bold, #1A1A26, center

Card 1:
├── Number: "01" — 20px ExtraBold, #6C63FF at 25% opacity
├── Title: "Why working harder isn't getting you promoted"
├── Desc: "And what the designers getting ahead actually do differently."
├── Card: bg #F6F5FF, radius 12px, padding 20px

Card 2:
├── Number: "02"
├── Title: "Why your best work is invisible to the people who matter"
├── Desc: "And 3 things that change that immediately."

Card 3:
├── Number: "03"
├── Title: "The real cost of waiting"
├── Desc: "The math that makes 'I'll figure it out later' the most expensive career decision you'll make."
```

#### Section 3: Lead Capture Form
**Background:** Light gray (#F6F6F9) | `id="get-access"` (scroll target)

```
Title: "Get instant access"
├── Font: 20px, bold, #1A1A26, center

Form Fields:
├── Name: text, required, placeholder "Your first name"
├── Email: email, required, placeholder "Your email address"
├── WhatsApp: tel, required, placeholder "WhatsApp number"
│   ├── +91 prefix
│   ├── WhatsApp icon (green) before field
│   ├── Helper text below: "We'll send your training link here"
├── All inputs: white bg, 1px #D9D9E0 border, 8px radius, 48px height

CTA Button:
├── Text: "Watch Free Training"
├── Full width (335px mobile), height 52px
├── Background: #6C63FF, white text, 16px bold, radius 8px

Trust text:
├── "Free. 28 minutes. No spam."
├── Font: 11px, #80808C, center
```

**Form Submit Behavior:**
1. Client-side validate all fields
2. POST to SalesHub API → create lead in "VSL Lead Magnet Flow" → "New Lead" stage
3. Fire GA4 `form_submitted` event
4. Fire Meta Pixel `Lead` event
5. Redirect to `/freetraining/watch`
6. SalesHub triggers automated WhatsApp + Email (Sequence 1, Message 1)

**GA4 Form Events to Fire:**
```javascript
// When form section scrolls into viewport
gtag('event', 'form_viewed');

// When user taps into Name field
gtag('event', 'form_field_focused');

// When Name has value and user moves to Email
gtag('event', 'form_field_completed_name');

// When Email is filled
gtag('event', 'form_field_completed_email');

// When WhatsApp is filled
gtag('event', 'form_field_completed_whatsapp');

// On successful form submit
gtag('event', 'form_submitted');
```

Use `IntersectionObserver` for `form_viewed`. Use `blur`/`focus` events for field tracking.

#### Section 4: Results
**Background:** White (#FFFFFF)

```
Title: "Designers who watched this and took action:"
├── Font: 13px, medium weight, #66666E, center

6 Result Cards (2x3 grid on mobile, 6 in a row on desktop):
├── Card style: white bg, 1px #E5E5EA border, 8px radius
├── Name: 12px bold #1A1A26
├── Role + Company: 10px #66666E
├── Timeline: 10px bold #6C63FF
├── NO salary hike percentages on individual cards

Cards:
├── Sheetal P. | Design Lead @ CX100 | in 2 months
├── Kritika S. | Lead UX @ Synduct, Germany | in 3 months
├── Radhakrishna A. | Principal UX @ Informatica | in 3 months
├── Shreekanth | Sr. UX Designer @ Wipro | in 5 weeks
├── Jonah I. | Sr. Lead Designer @ Infosys | in 2 months
├── Maulin R. | Sr. UX @ Augmented.AI | in 90 days

Stats line:
├── "Average 38% salary increase across 140+ mentees"
├── Font: 12px, medium, #4D4D57, center

Link:
├── "See all 87 success stories →"
├── Font: 12px, semibold, #6C63FF
├── Links to Senja testimonials page, opens in new tab
```

#### Section 5: Qualifier
**Background:** Light gray (#F6F6F9) | Padding: 24px top/bottom

```
"This training is for designers with 2+ years experience earning 6+ LPA. Not for students, freshers, or placement seekers."
├── Font: 11px, #72727F, center
```

#### Section 6: About Murad
**Background:** White | Padding: 36px top/bottom

```
Photo: 64px circle, Murad's headshot (same as Meta ads)

Label: "YOUR HOST: SHAIK MURAD"
├── Font: 11px, semibold, #6C63FF, uppercase, letter-spacing 2px

Title: "Co-founder & Head of Product and Design at Xperience Wave"
├── Font: 16px, bold, #1A1A26

Bio: "13+ years in design leadership | 300+ designers trained | 830+ career transitions guided | Host of Vivid Yellow podcast"
├── Font: 12px, #595964, center
```

#### Section 7: Why Designers Stay Stuck (SEO Content)
**Background:** White | Padding: 48px top/bottom
> This section exists for SEO keyword density. It appears BELOW conversion sections.

```
Title: "Why talented designers stay stuck at mid-level"
├── Font: 20px, bold, #1A1A26

Body (15px, #444, line-height 180%, max-width 700px centered):
"Most UX, UI, and Product designers in India hit a ceiling at the 2-5 year mark. They've mastered Figma, built strong portfolios, and consistently deliver great work — but promotions to senior designer, design lead, or design manager roles keep going to someone else.

The problem isn't skill. It's strategy. Senior UX designer roles at companies like McKinsey, Informatica, Wipro, and Infosys don't go to the hardest worker — they go to the designer who plays the right game.

This free training breaks down exactly what that means — in 28 minutes, with real examples from designers who made the transition."

Internal Links (below text):
├── "→ The UX Career Ladder in India: From Junior to CXO"
│   └── href="/resources/blogs/ux-career-ladder-levels-india"
├── "→ Why UX Courses and Certificates Don't Get You Senior Roles"
│   └── href="/resources/blogs/why-courses-dont-work"
├── "→ Salary Negotiation for UX Designers in India (RIVER Framework)"
│   └── href="/resources/blogs/salary-negotiation-ux-designers-india"

Use <a> tags with descriptive anchor text. rel="noopener" if new tab.
```

#### Section 8: FAQ (with Schema Markup)
**Background:** Light gray (#F6F6F9) | Padding: 48px top/bottom

```
Title: "Frequently asked questions"
├── Font: 20px, bold, #1A1A26, center

Q1: "Who is this training for?"
A1: "UX, UI, and Product designers with 2-8 years of experience earning 6+ LPA who want to break into senior and leadership design roles. This is not for freshers, students, or placement seekers."

Q2: "How long is the training?"
A2: "28 minutes. No fluff. Shaik Murad covers 3 specific insights that most design mentors and courses don't teach."

Q3: "Is this really free?"
A3: "Yes. No credit card, no hidden charges. You'll also get the option to book a free 45-minute strategy call after watching."

Q4: "What results have other designers seen?"
A4: "140+ designers have gone through our 1:1 mentorship program. On average, they see a 38% salary increase. Most role transitions happen within 90 days. You can see their stories on our success stories page."

Q5: "What happens after I watch?"
A5: "Below the video, you'll see an option to book a free strategy call with our team. On that call, we'll look at your specific situation and build a 90-day career plan together."
```

**FAQPage Schema (add to `<head>`):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is this training for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UX, UI, and Product designers with 2-8 years of experience earning 6+ LPA who want to break into senior and leadership design roles. This is not for freshers, students, or placement seekers."
      }
    },
    {
      "@type": "Question",
      "name": "How long is the training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "28 minutes. No fluff. Shaik Murad covers 3 specific insights that most design mentors and courses don't teach."
      }
    },
    {
      "@type": "Question",
      "name": "Is this really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. No credit card, no hidden charges. You'll also get the option to book a free 45-minute strategy call after watching."
      }
    },
    {
      "@type": "Question",
      "name": "What results have other designers seen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "140+ designers have gone through our 1:1 mentorship program. On average, they see a 38% salary increase. Most role transitions happen within 90 days."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after I watch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Below the video, you'll see an option to book a free strategy call with our team. On that call, we'll look at your specific situation and build a 90-day career plan together."
      }
    }
  ]
}
```

#### Section 9: Final CTA
**Background:** Purple (#6C63FF) | Padding: 40px top/bottom, 20px sides

```
Headline: "Ready to find out what game you should actually be playing?"
├── Font: 22px mobile / 36px desktop, bold, white, center

Form: Same 3 fields (Name, Email, WhatsApp)
├── White input backgrounds on purple bg
├── Border: 1px #D9D7FF

CTA Button:
├── Text: "Watch Free Training"
├── Dark background (#1A1A26), white text (contrast on purple)

Trust text:
├── "No credit card. Just 28 minutes that could change your career."
├── Font: 11px, #CBC9FF, center
```

#### Section 10: Footer
**Background:** Very dark (#121220) | Padding: 16px top/bottom

```
Line 1: "© Expwave Pvt. Ltd. 2026"
Line 2: "Privacy | Terms | Refund Policy"
├── Font: 10px, #66666E, center
├── Each word links to respective policy page

Logo behavior:
├── Landing page: scrolls to top (keeps user in funnel)
├── Watch page: links to xperiencewave.com
```

---

## 3. Page 2: Watch Page

**URL:** `xperiencewave.com/freetraining/watch`
**Purpose:** Get lead to watch VSL and book a strategy call
**Access:** Only via form submit redirect (not directly accessible from nav)

### Meta Tags
```html
<title>Watch: How Designers Break Into Senior UX Roles in 90 Days | Xperience Wave</title>
<meta name="description" content="Watch Shaik Murad's free training on the 3 uncomfortable truths keeping talented designers stuck — and the career system that gets results in 90 days.">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://xperiencewave.com/freetraining/watch">
```

### Sections

#### Header
```
XW logo — links to xperiencewave.com (user already in funnel, leaving is OK)
No other navigation. No hamburger menu.
Height: 48px, white bg
```

#### Video Player
```
Background: Black (#0D0D14), full width, 16:9 aspect ratio
Video: Self-hosted (Wistia or Vimeo Pro) — NOT YouTube

Requirements:
├── No YouTube branding or suggested videos
├── Watch % tracking (fires events at 25%, 50%, 75%, 100%)
├── Poster frame: Murad's face + VSL title
├── No skip-forward controls (optional — test both)
├── Autoplay: OFF
├── Mobile-responsive (full width, maintains 16:9)
├── Lazy-load the player (don't block page load)
```

**GA4 Video Events:**
```javascript
gtag('event', 'video_play');           // User presses play
gtag('event', 'video_progress_25');    // 25% watched
gtag('event', 'video_progress_50');    // 50% watched
gtag('event', 'video_progress_75');    // 75% watched
gtag('event', 'video_complete');       // 100% watched
gtag('event', 'video_paused');         // User pauses
```

#### Book Call Section (HIDDEN until 15-min mark)
```
CRITICAL: This section is display:none until video reaches 15 minutes or ends.

Reveal logic:
├── Listen to video timeupdate event
├── When currentTime >= 900 (15 min), fade in
├── Also reveal if video ends (ended event)
├── Store state in localStorage (persists on refresh)

Content:
├── "Ready to build your personal career plan?"
│   └── Font: 20px, bold, #1A1A26, center
│
├── CTA Button: "Book Your Free Strategy Call"
│   └── Full width 335px, 52px height, #6C63FF, white text, 8px radius
│   └── Links to: app.xperiencewave.com/book/design-career-strategy-call
│
├── Call Details (13px, #595964, line-height 200%):
│   ├── "On this call, we'll:"
│   ├── • Look at your specific situation and goals
│   ├── • Identify the 2-3 gaps holding you back
│   ├── • Build a 90-day plan you can start immediately
│   ├── • Tell you honestly if we can help
│
├── Guarantee Badge:
│   └── bg #F2FBF5, radius 8px, padding 12px 16px
│   └── "We work with you until you get there."
│   └── Font: 13px, semibold, #27804D, center
│
├── WhatsApp Testimonial Screenshots:
│   └── 2-3 raw WhatsApp screenshots (Shreekanth, Kritika messages)
│   └── Lazy-load images
```

#### Sticky CTA Bar (APPEARS after 50% video watch)
```
Persistent bottom bar, fixed to viewport
├── bg: white, top shadow, height 64px
├── "Ready to take action?" (14px, #333)
├── "Book Free Call →" button (compact, #6C63FF, white text)
├── Dismissible with X button
├── Store dismissed state in localStorage
├── Don't show if user already booked (check via cookie/API)

Trigger: After video_progress_50 event fires
```

#### Footer
Same as landing page footer.

---

## 4. Page 3: Booking Page

**URL:** `app.xperiencewave.com/book/design-career-strategy-call`
**Platform:** SalesHub (Next.js)

### 3-Step Flow: Date → Time → Details

#### Step 1: Date
Calendar showing next 4 days. Mon-Sat only.

#### Step 2: Time
30-min intervals, 11:00 AM – 6:00 PM IST. 45-min call duration.

#### Step 3: Details (11 fields)

| # | Field | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | First Name | text | Yes | |
| 2 | Last Name | text | Yes | |
| 3 | Email | email | Yes | |
| 4 | WhatsApp/Phone | phone (+91) | Yes | |
| 5 | LinkedIn profile link | text | Yes | #1 qualifier + call prep |
| 6 | Current role | text | Yes | Placeholder: "e.g., UX Designer at Flipkart" |
| 7 | Total work experience | radio | Yes | See options + conditional below |
| 8 | Key career challenge | radio | Yes | See options below (aligned to VSL Reframes) |
| 9 | Dream outcome | textarea | Yes | See placeholder below |
| 10 | Readiness to invest | radio | Yes | See options below |
| 11 | Timeline | radio | Yes | See options + conditional below |

**Field 7 Options — Total work experience:**
```
○ Less than 2 years    → CONDITIONAL (see below)
○ 2-4 years
○ 5-8 years
○ 8+ years
```

**Conditional: "Less than 2 years" selected:**
```
Show inline message:
"This strategy call is designed for designers with 2+ years who want to
move into senior & leadership roles. But we have something for you —
our Ripple program is built specifically for designers early in their career."

[Learn about Ripple →]  (links to /programs/career-transition-ux-mentorship, new tab)
[I still want to book — I'm serious about investing in my career]  (continues form)

GA4 events: booking_ripple_redirect | booking_override_continue
```

**Field 8 Options — Career challenge:**
```
○ I'm doing great work but not getting promoted or recognised for it
○ I feel stuck in execution — I want more strategic ownership
○ I'm underpaid compared to my skills and experience
○ I want to move into leadership but don't know how to position myself
○ I'm considering switching companies but don't know how to land a senior role
○ I recently lost my job and need to land a senior role quickly
○ I'm worried AI is changing the game and I'm not prepared
```

**Field 9 — Dream outcome:**
```
Label: "In 2-3 sentences, what would your career look like if this call went perfectly? What's the dream outcome?"
Placeholder: "e.g., 'I'd have a clear path to Design Lead at a product company paying 18+ LPA within 6 months.'"
```

**Field 10 Options — Readiness to invest:**
```
○ I'm ready to invest and take action — let's talk specifics on the call       [HOT]
○ I'm open to it if the plan makes sense for my situation                       [WARM]
○ I'm exploring options and want to understand what's involved first            [COLD]
```
> NO price (₹60-90K) mentioned anywhere in the options.

**Field 11 Options — Timeline:**
```
○ This month — I'm ready to take action                                         [HOT]
○ In the next 1-3 months — I need a little time to prepare                     [WARM]
○ I'm researching options for later this year                                   [COLD → CONDITIONAL]
```

**Conditional: "Researching options" selected:**
```
Show inline message:
"We totally understand. Our strategy call works best for designers ready
to take action soon. In the meantime, here are some free resources:"

[Read: The UX Career Ladder in India →]
[Read: Why UX Courses Don't Work for Senior Roles →]
[Watch more success stories →]
[I'm actually more ready than I think — book the call anyway]  (continues)

GA4 events: booking_explorer_redirect | booking_explorer_override
```

---

## 5. Page 4: Congratulations Page

**URL:** `xperiencewave.com/freetraining/congratulations`

### Meta Tags
```html
<title>Call Confirmed | Xperience Wave</title>
<meta name="robots" content="noindex, nofollow">
```

### Sections

#### Murad's Video (60-90 seconds)
```
Self-hosted video, Murad selfie style
Autoplay: MUTED with play button overlay
Fallback: thumbnail + play button for slow connections
```

#### Booking Confirmation
```
"You're booked!"

Your strategy call is confirmed for:
📅 [Date]  🕐 [Time] IST
📹 Google Meet

Your Google Meet link: [link]
(Save this — you'll also receive it via email and WhatsApp)

[Add to Google Calendar]  [Add to Apple Calendar]
```

**Calendar link format:**
```
Google: https://calendar.google.com/calendar/render?action=TEMPLATE&text=Design+Career+Strategy+Call&dates=[start]/[end]&details=[Meet link]&location=Google+Meet
Apple: .ics file download
```

#### Homework
```
"Before your call, do these 2 things:"

1. Get clear on your #1 career goal for the next 90 days.
   "I want to land a Senior UX role at a product company paying 18+ LPA"
   — that's specific. "I want to grow" — that's not.

2. Have your LinkedIn profile open during the call.
   We'll review it together and show you how to reposition yourself.
```

#### Portfolio/Resume Upload (Optional)
```
"Help us prepare for YOUR call (optional but recommended):"

Your LinkedIn is already shared — we'll review it before the call.

Got a portfolio? [text field for URL]
Got a resume? [file upload — .pdf, .docx, max 10MB]

"The more we know beforehand, the faster we get to actionable advice."

GA4 events: portfolio_shared | resume_uploaded
```

#### Call Structure
```
"What happens on the call:"

First 10 min — We listen. Your goals, your situation.
Next 20 min — We diagnose. The 2-3 gaps holding you back.
Last 15 min — We plan. A 90-day action plan you keep regardless.
```

#### Programs Info
```
"What we offer:"

Xperience Wave runs 1:1 mentorship programs (not courses) tailored to
your career stage. If we think we can help, we'll explain which program
fits and what the investment looks like on the call.

[Explore our programs →]  (links to /programs, new tab)
```

#### Testimonials (Call-Specific)
```
Show 2-3 testimonials specifically about the CALL experience.
Use real quotes from mentees about the strategy call itself.
```

#### FAQ
```
"Have questions before the call?"
WhatsApp us at [number] — we typically respond within 2 hours.

Q: Will I be pressured to buy?
A: No. If we can help, we'll explain. If not, we'll tell you that too.

Q: What if I need to reschedule?
A: Use the link in your confirmation email. 12 hours notice please.

Q: Is this a group call?
A: No. 1:1 with Murad or Almas.
```

---

## 6. Redirects

Set up these 301 permanent redirects:

| From | To |
|------|----|
| `ld.xperiencewave.com/*` | `xperiencewave.com/freetraining` |
| `ld.xperiencewave.com/watch` | `xperiencewave.com/freetraining/watch` |
| `ld.xperiencewave.com/congratulations` | `xperiencewave.com/freetraining/congratulations` |
| `xperiencewave.com/freetraining/getstarted` | `xperiencewave.com/freetraining#get-access` |

---

## 7. Tracking & Analytics

### Tools Already Installed
| Tool | ID | Purpose |
|------|----|---------|
| GA4 | G-2BD0Q6TRDH | Page views, events, funnels |
| Meta Pixel | 1406183214178910 | Ad conversion tracking |
| Microsoft Clarity | ty7y2h36jn | Session recordings, heatmaps |

### Custom GA4 Events (New)

**Landing Page:**
```
form_viewed                    — form section enters viewport
form_field_focused             — user taps into Name field
form_field_completed_name      — Name filled, moves to Email
form_field_completed_email     — Email filled
form_field_completed_whatsapp  — WhatsApp filled
form_submitted                 — successful form submit
```

**Watch Page:**
```
video_play                     — user presses play
video_progress_25              — 25% watched
video_progress_50              — 50% watched
video_progress_75              — 75% watched
video_complete                 — 100% watched
video_paused                   — user pauses
```

**Booking Page:**
```
booking_ripple_redirect        — <2yr user clicks "Learn about Ripple"
booking_override_continue      — <2yr user clicks "I still want to book"
booking_explorer_redirect      — "Researching" user clicks blog links
booking_explorer_override      — "Researching" user clicks "Book anyway"
```

**Congratulations Page:**
```
portfolio_shared               — user submits portfolio URL
resume_uploaded                — user uploads resume file
calendar_added_google          — clicks Google Calendar button
calendar_added_apple           — clicks Apple Calendar button
```

### Meta Pixel Events
```
Lead                           — fire on form submit (landing page)
Schedule                       — fire on booking confirmation
ViewContent                    — fire on watch page load
```

---

## 8. SalesHub Integration

### Form Submit → Lead Creation
```
POST /api/leads (SalesHub API)

Body:
{
  "name": "{{first_name}}",
  "email": "{{email}}",
  "phone": "{{whatsapp}}",
  "source": "vsl_freetraining",
  "funnel": "VSL Lead Magnet Flow",
  "stage": "New Lead"
}

Response: { "leadId": "...", "success": true }
```

### Booking → Stage Update
```
When booking is confirmed:
├── Move lead from "New Lead" to "121 Booked"
├── Stop Sequence 1 (Lead Nurture)
├── Start Sequence 2 (Show-Up)
├── Store booking date/time/meet-link on lead record
```

### Funnel Stages (Updated)
```
New Lead → Contacted → 121 Booked → No-Show → 121 Done → Proposal Sent → Converted → Lost
                                      ↑
                                  NEW STAGE
```

---

## 9. MSG91 SMS Integration

### Purpose
SMS fallback when WhatsApp delivery fails. Fires for 2 messages only.

### Environment Variables
```
MSG91_AUTH_KEY=                    # From MSG91 dashboard
MSG91_TRAINING_TEMPLATE_ID=       # After DLT approval
MSG91_BOOKING_TEMPLATE_ID=        # After DLT approval
MSG91_SENDER_ID=XPWAVE
```

### DLT Templates

**Template 1 — Training Delivery:**
```
Hi {#var#}, your free design career training from Xperience Wave is ready.
Watch here: {#var#}
- Murad
```

**Template 2 — Booking Confirmation:**
```
Your XW strategy call is confirmed: {#var#} at {#var#} IST.
Google Meet: {#var#}
See you there! - Xperience Wave
```

### Fallback Logic
```typescript
// lib/sms/msg91.ts

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_BASE_URL = 'https://control.msg91.com/api/v5';

export async function sendSMS_MSG91(req: {
  templateId: string;
  phone: string;
  vars: Record<string, string>;
}) {
  const recipient: Record<string, string> = { mobiles: req.phone };
  Object.values(req.vars).forEach((value, index) => {
    recipient[`var${index + 1}`] = value;
  });

  const response = await fetch(`${MSG91_BASE_URL}/flow/`, {
    method: 'POST',
    headers: {
      'authkey': MSG91_AUTH_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: req.templateId,
      short_url: '0',
      recipients: [recipient],
    }),
  });

  const data = await response.json();
  if (data.type !== 'success') {
    throw new Error(`MSG91 SMS failed: ${data.message}`);
  }
  return { success: true, requestId: data.request_id };
}
```

### Integration Flow
```
Send WhatsApp → wait 5 min → check delivery status
├── Delivered? → Done
└── Failed? → sendSMS_MSG91() → log event sms_fallback_*
```

---

## 10. WhatsApp Templates

Register these templates with your WhatsApp Business API provider:

| Template Name | Trigger | Type |
|---------------|---------|------|
| `xw_training_ready` | Immediate after form submit | Text |
| `xw_curiosity_nudge` | 30 min after form submit | Text |
| `xw_24hr_nudge` | 24 hours after form submit | Text |
| `xw_72hr_video` | 72 hours after form submit | **Video** (Murad 15-20s selfie) |
| `xw_booking_confirm` | Immediately after booking | Text |
| `xw_24hr_reminder` | 24 hours before call | Text |
| `xw_1hr_reminder` | 1 hour before call | Text |
| `xw_noshow_immediate` | 15 min after missed call | Text |
| `xw_noshow_final` | 48 hours after missed call | Text |

Full message copy for each template is in `XW_Nurture_Sequences_Complete.docx`.

---

## 11. SEO Requirements

### Technical Fixes (Immediate)
- [ ] Fix duplicate title on `/resources/tools` and `/resources/shortcourses`
- [ ] Fix double "Xperience Wave" in titles on `/programs/ux-leadership-mentorship` and `/for-business/ux-design-services`
- [ ] Fix mismatched meta description on AI-first design blog post
- [ ] Set up 301 redirect from `/terms` to `/terms-of-service`
- [ ] Set up redirect from `/blog` to `/resources/blogs`
- [ ] Add alt text to all images site-wide
- [ ] Add FAQPage schema to `/resources/faq` page

### Schema Markup to Add
- FAQPage schema on `/freetraining` (see Section 8 above)
- FAQPage schema on `/resources/faq`
- Article schema on all blog posts (author, datePublished, dateModified)
- Organization schema on homepage and `/about`

### Cross-Links to Add
Add CTA boxes linking to `/freetraining` in these blog posts:

| Blog Post | CTA Text |
|-----------|----------|
| UX Career Ladder in India | "Want a personalized plan to move up the ladder? Watch our free training →" |
| Salary Negotiation (RIVER) | "Before you negotiate, make sure you're positioned for the right role →" |
| Why Courses Don't Work | "If courses failed you, here's what actually works →" |
| AI-First Design | "AI changes the game, but only if you're playing the right one →" |
| IC-to-Manager Transition | "Thinking about the move to management? Start here →" |

Style: Highlight box with XW purple left border. Links to `/freetraining`.

---

## 12. Performance Requirements

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |

### Key Requirements
- Video player must NOT block page load — lazy load on `/watch`
- All images compressed and served in WebP
- Font: System fonts or preloaded (Inter recommended)
- Consider SSR for `/freetraining` route (currently client-only SPA renders nothing until JS loads — Google crawler may not wait)

### Mobile Breakpoints
| Width | Notes |
|-------|-------|
| 375px | Primary design (90%+ traffic). All specs above default to this. |
| 768px | Tablet. Increase heading sizes, content max-width 600px. |
| 1024px+ | Desktop. Increase heading sizes, max-width 900px, horizontal form in hero. |

---

## 13. About Murad Section — Verified Data

Sourced from LinkedIn (linkedin.com/in/shaikmurad/):

```
Full Name: Shaik Ahamed (publicly known as "Shaik Murad" / "Murad")
LinkedIn Headline: Head of Product and Design, Co-founder Xperience Wave |
                   Mentor to Designers | Writer: PPP (Practical Problem Solving
                   Principles) | Host @ Vivid Yellow & Wave Makers Connect (WMC)

Location: Greater Bengaluru Area
Followers: 2,086 | 500+ connections

Experience at Xperience Wave:
├── Head of Product and Design (Aug 2025 – Present)
├── Head of Design (Dec 2023 – Present)
├── Total at XW: 2 yrs 5 mos

Key Achievements (from LinkedIn):
├── Led 3 projects in healthcare and fintech
├── Doubled revenue from product development service
├── Trained 300+ UX design professionals
├── At previous roles: 180% revenue increase, 4.3 Play Store rating in 4 months

Other:
├── Total experience entries: 7 roles
├── Education entries: 3
├── Certifications: 5
├── Skills: 59
├── Languages: 4

Recommended landing page copy:
"Co-founder & Head of Product and Design at Xperience Wave
13+ years in design leadership | 300+ designers trained |
830+ career transitions guided | Host of Vivid Yellow podcast"
```

> **Note:** The "13 years in design" claim should be verified against his full career timeline (LinkedIn only shows 7 experience entries). Ensure claims on the landing page match what someone would find if they checked his LinkedIn.

---

## Reference Documents

| # | Document | Location |
|---|----------|----------|
| 1 | VSL Script v2.1 (3 Reframes + AI) | `XW_VSL_v2.1_With_AI.docx` |
| 2 | Landing Page + Watch Page Spec | `XW_Landing_Watch_Page_Complete_Spec.docx` |
| 3 | Booking + Congratulations Page Spec | `XW_Booking_Congrats_Page_Spec.docx` |
| 4 | Nurture Sequences (Email + WhatsApp + SMS) | `XW_Nurture_Sequences_Complete.docx` |
| 5 | MSG91 SMS Integration | `XW_MSG91_SMS_Integration.docx` |
| 6 | Figma Designs (mobile-first) | Figma file — "v2 - Mobile First (FINAL COPY)" page |
| 7 | This Developer Handoff | `XW_Developer_Handoff.md` |

---

*© Expwave Pvt. Ltd. 2026 — Confidential*
