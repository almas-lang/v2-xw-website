# Handoff: AI Design Webinar Landing Page (`/ai-design-webinar`)

## Overview
A conversion-first registration landing page for the free live webinar **"The Two Faces of AI in Design"** (Xperience Wave / Shaik Murad), capped at 50 seats. Primary CTA everywhere: **Enroll in the webinar →**. Built on an evergreen URL (`/ai-design-webinar`) so SEO compounds across cohorts — only the date changes per cohort.

## About the Design Files
- `design_reference/AI Design Webinar.dc.html` is a **design reference created in HTML** — a prototype showing the intended look and behavior. It is not production code.
- `nextjs/` is a **ready-to-adapt Next.js (App Router) implementation** of that design, written to drop into a standard `create-next-app` project. Recreate/merge it into your codebase's existing conventions; if you're starting fresh, it runs as-is (see *Getting started* below).

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and copy are final. Recreate pixel-perfectly. All copy is final and must not be reworded — it was written for conversion.

## Getting started (fresh project)

```bash
npx create-next-app@latest xperiencewave --ts --app --no-tailwind --eslint
cd xperiencewave
npm i @tabler/icons-react
# copy nextjs/app/* into app/ (merge layout.tsx + globals.css)
npm run dev
# → http://localhost:3000/ai-design-webinar
```

Files in `nextjs/`:

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — loads Inter / Source Serif 4 / Geist via `next/font` (zero CLS, self-hosted) |
| `app/globals.css` | Konfom design tokens (CSS custom properties) + base reset |
| `app/ai-design-webinar/page.tsx` | The page: SEO `metadata`, JSON-LD (Event + FAQPage), all sections |
| `app/ai-design-webinar/config.ts` | **Single place to update per cohort**: date, seats left, URLs |
| `app/ai-design-webinar/webinar.module.css` | All section styles |
| `app/ai-design-webinar/Heroes.tsx` | Three hero variants (C splitface / A editorial / B centered) |
| `app/ai-design-webinar/CountdownBar.tsx` | Client component — sticky bar with live countdown + seat counter |
| `app/ai-design-webinar/RegistrationForm.tsx` | Client component — validated form shell (submit handler is a TODO) |

### Hero variants
Three directions were designed. Switch in `config.ts`:

```ts
export const HERO_VARIANT: 'splitface' | 'editorial' | 'centered' = 'splitface';
```

- **C · splitface** *(default)* — centered eyebrow + headline, then a bordered card where the torn two-faces image (`public/two-faces.png`) is flanked by "Face one / Face two" copy; subhead + CTA + trust strip below. Matches the client's reference mockup.
- **A · editorial** — calm split layout, host video framed right
- **B · centered** — bold centered stage, wide 16:9 video below with "+" registration-corner brand language

The two-faces image is a transparent PNG (black profiles on transparent) — it sits clean on the white card. Served from `public/two-faces.png` via `next/image` with `priority` (it's above the fold).

## SEO (implemented)
- **Meta title**: `The Two Faces of AI in Design - Free Live Webinar | Xperience Wave`
- **Meta description** (~155 chars), canonical on the evergreen URL, OG tags (`og:type=website`), robots index/follow.
- **JSON-LD `Event`** — `OnlineEventAttendanceMode`, `VirtualLocation`, performer Shaik Murad, free `Offer` with `LimitedAvailability`. Dates read from `config.ts`.
- **JSON-LD `FAQPage`** — all 8 FAQs; the most likely rich-result win.
- **Heading map**: one H1. The keyword phrase "The Two Faces of AI in Design" is inside the H1 as a visually-hidden prefix (`.srOnly`), so the visible gap-led headline stays exactly as written while the H1 carries the target keyword. H2s follow the appendix map ("The AI gap is widening…", "What you'll walk away with", "Inside the 90 minutes", "Who this is for", "Who's running this", "830+ designers…", "FAQ", "Save your seat").
- **og:image**: TODO — supply a branded 1200×630 card (title + "Free · Live · 50 seats") at `public/og/ai-design-webinar.png`; path is already referenced in `page.tsx`.
- Host video placeholder is marked for **lazy-load** — when the real video lands, use `<video preload="none" poster=…>` or a facade pattern (thumbnail → click → load player). Alt text per appendix: *"Shaik Murad explaining the two faces of AI in design"*.
- Remember: link to this page from your homepage and `/freetraining`; keep one canonical, never a per-cohort URL.

## Per-cohort updates (one file)
`config.ts`: `dateLabel`, `startIso` / `endIso` (drives both the countdown and the Event schema), `seatsLeft`. Seat number renders red automatically when `< 15`.

## Screens / Sections (single page, top → bottom)

1. **Announcement bar** — sticky, `#15161A` (brand-ink), 13px Inter 500. "LIVE & FREE" ochre pill (`--ochre-500` fill, dark text, 11px caps 0.1em) · date · "Only 50 seats — N left". Right: live countdown, 4 cells (days/hrs/min/sec), `rgba(255,255,255,.06)` fill, 0.5px `rgba(255,255,255,.1)` border, radius 6px, tabular numerals.
2. **Nav** — white, 68px, 0.5px bottom border `--neutral-200`. Left: 26px blue rounded square + "Xperience Wave" in Geist 600 20px, `-0.02em`, `#15161A`. Right: primary CTA button.
3. **Hero** (variant A or B) — eyebrow 12px caps 0.13em `--blue-600`; H1 Geist 600, clamp(38–56px) A / clamp(42–68px) B, line-height ~1.04, `-0.025em`, `--neutral-900`; the phrase "another designer gets the promotion you wanted." is `--blue-600` in variant A. Subhead Source Serif 4, 19–20px/1.6, `--neutral-700`. CTA + microcopy "Free · Live · No recording shared · 50 seats only" (13px `--neutral-500`). Trust strip: 7px ochre dots + 13px `--neutral-600` items (A: top-hairline row; B: pill chips on `--neutral-50`). Host-video placeholder: A = 4:3 card right; B = 16:9 dark stage in a `--blue-50` frame with four "+" crosshairs (14px, `--neutral-400` at 50%, inset 14px — marketing-only brand language).
4. **The gap** — `--neutral-50` band. Two cards: "The faster half" (white, neutral icon chip) vs "The senior half" (`--blue-50` fill, **1px `--blue-500` border**, blue-900 text — selected-card treatment). Closing: serif paragraph + Geist 600 22px kicker.
5. **Three promises** — 3-col grid of white cards (0.5px `--neutral-200`, radius 12px, 32/28px padding). "01/02/03" in Geist 600 40px `--blue-500`, tabular. Body 16px Inter, bold lead phrases in `--neutral-900` 600.
6. **Inside the 90 minutes** — white card list, rows split by 0.5px hairlines, 22px vertical padding. Numbered 01–05 (Geist 600 15px blue) + Q&A row with `messages` icon in `--ochre-600`. Below: info notice (`--blue-50` bg, 0.5px `--blue-100` border, radius 8px, `pencil` icon) — "This is a working session, not a lecture. Cameras on. Pen and paper ready."
7. **Who this is for** — two cards: "It's for you if" (`--blue-50`/`--blue-100`, `circle-check-filled` icons `--blue-500`, text `--blue-900`) vs "It's not for you if" (white, `circle-x` icons `--neutral-400`).
8. **Host** — 360px / 1fr grid. 4:5 photo placeholder (`--blue-50`, "SM" Geist 96px `--blue-300`) — replace with real photo. Bullets with `point-filled` ochre markers. Pull-quote: Source Serif 4 italic 19px, 2px `--blue-500` left border (square corners on accent side), 20px padding-left.
9. **Proof** — dark stat band `#15161A`, radius 16px, 3 stats (Geist 600 48px white, dividers `rgba(255,255,255,.1)`). 3 testimonial cards, each with an "EXAMPLE" ochre pill (10px caps, `--ochre-50` bg / `--ochre-700` text) — **sample quotes; replace with real VSL stories + photos + LinkedIn links**.
10. **Why this is different** — centered, 720px measure, ochre eyebrow, serif 19px body.
11. **Live bonus** — `--blue-50` card, 1px `--blue-200` border, radius 16px, 44px padding; 60px blue icon chip (`map-2`).
12. **FAQ** — 8 `<details>` cards (white, 0.5px border, radius 8px); summary 16px Inter 600; chevron rotates 180° when open; answer Source Serif 4 16px/1.6 `--neutral-700`. First item open by default.
13. **Final CTA + form** (`#register`) — heading Geist clamp(32–50px); form card `--neutral-50`, 32px padding. Fields: First name + Email (2-col), WhatsApp number, optional role select. Inputs 44px, 1px `--neutral-300`, radius 4px; focus = `--blue-500` border + 2px `--blue-100` ring. Full-width primary button. Microcopy under.
14. **Footer** — `#15161A`, centered: "Xperience Wave" Geist 600 20px white, links row (WhatsApp +91 93805 06841 · Privacy · Terms), disclaimer 12px `rgba(255,255,255,.4)`.

## Interactions & Behavior
- **Countdown**: ticks every second toward `startIso`; renders `00`-padded; **client component** (`'use client'`) so the page itself stays server-rendered for SEO.
- **Seat counter**: red (`#FF6B6B` on dark) when `seatsLeft < 15`, otherwise white 600.
- **CTAs**: smooth-anchor to `#register`. Hover = lightness shift only (`--blue-500` → `--blue-600`), 150ms `cubic-bezier(0.4,0,0.2,1)`. Active → `--blue-700`. **No scale, no shadow-lift.**
- **Cards hover**: border `--neutral-200` → `--neutral-300`. Nothing else.
- **Focus**: 2px `--blue-500` ring, 1px offset, fades in 150ms.
- **Form validation** (client): name required; email regex; WhatsApp ≥ 10 digits; role optional. Errors render 12px `--error-500` under field. On valid submit → confirmation panel (check icon, "You're in — check WhatsApp for your join link…"). **`submitRegistration()` in `RegistrationForm.tsx` is a stub — wire to your API/CRM/WhatsApp flow.**
- **FAQ**: native `<details>` — zero JS, works with JS disabled, SEO-readable.
- **Responsive**: single breakpoint at 860px — grids collapse to 1 column, hero media stacks above text (variant A), countdown wraps under the message. Hit targets ≥ 44px.

## State Management
- `CountdownBar`: `now` (Date, interval-driven).
- `RegistrationForm`: `{ firstName, email, whatsapp, role }`, `errors`, `submitted`.
- Everything else is static server-rendered JSX. No global state, no fetching.

## Design Tokens (Konfom Design System v0.2)
All in `globals.css`. Key values:

- **Blue (action)**: 50 `#EEF1FE` · 100 `#D6DEFC` · 200 `#ADBCF7` · 300 `#7B91F0` · 500 `#1E47E6` (primary) · 600 `#1A3CC8` (hover) · 700 `#1733A8` (active) · 900 `#0E1C66`
- **Ochre (state)**: 50 `#FAF1DD` · 100 `#F0DAA8` · 500 `#B68830` · 600 `#A07825` · 700 `#8B6418` — *blue and ochre never share an affordance: buttons are always blue, status pills always ochre*
- **Neutrals (cool slate)**: 50 `#FAFBFC` · 100 `#F1F5F9` · 200 `#E2E8F0` · 300 `#CBD5E1` · 400 `#94A3B8` · 500 `#64748B` · 600 `#475569` · 700 `#334155` · 900 `#0F172A` (product text)
- **Brand ink** `#15161A` — dark bands/footer/wordmark only, never body text
- **Type**: Inter 400/500/600 (UI — never 700+), Source Serif 4 400/600 (editorial body), Geist 400/500/600 (display headlines + wordmark, marketing only)
- **Spacing**: 4px grid. Section padding 96px. Card padding 28–32px. Container max 1120px, 32px gutters (20px mobile)
- **Radius**: 4 (buttons/inputs) · 8 (notices/FAQ) · 12 (cards) · 16 (bands/bonus) · 999 (pills)
- **Elevation**: borders do the work; `0 1px 2px rgba(15,23,42,.04)` on CTAs only; no other shadows
- **Motion**: 150ms hover / 200ms entry, `cubic-bezier(0.4,0,0.2,1)`; no gradients on surfaces (the only gradient is the scrim over the video thumbnail)

## Assets
- **Icons**: Tabler Icons via `@tabler/icons-react` (outline, 2px stroke). Used: `arrow-right`, `bolt`, `arrow-up-right`, `messages`, `pencil`, `circle-check-filled`, `circle-x`, `point-filled`, `map-2`, `chevron-down`, `player-play-filled`, `plus`, `wave-sine` (logo stand-in), `circle-check`.
- **Logo**: "Xperience Wave" is currently typeset in Geist with a placeholder icon chip — replace with the real logo asset when available.
- **To supply**: host video (45–60s) + poster, host photo (4:5), real testimonials (photos + LinkedIn links), og:image 1200×630, Privacy/Terms URLs.

## Files
- `design_reference/AI Design Webinar.dc.html` — the approved HTML design (both hero variants, switcher bottom-center)
- `nextjs/**` — implementation as listed above
