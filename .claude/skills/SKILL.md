---
name: xw-design-system
description: Xperience Wave design system and front-end development guidelines. Auto-triggers when building UI components, styling, or working with React/Next.js code in this project.
---

# Xperience Wave Design System

Reference file: `xw-design-system-FINAL.html` in project root.

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `accent` | #FF0023 | Primary CTA, links, highlights |
| `accent-hover` | #e6001f | Button hover states |
| `carbon` | #18181B | Primary text, headings |
| `alice` | #DCEEFF | Secondary accent, backgrounds |
| `alice-dark` | #c5e4ff | Hover states on alice |
| `g50` | #FAFAFA | Light backgrounds |
| `g100` | #F4F4F5 | Card backgrounds |
| `g200` | #E4E4E7 | Borders |
| `g300` | #D4D4D8 | Dots pattern, light borders |
| `g400` | #A1A1AA | Muted text (dark bg) |
| `g500` | #71717A | Secondary text |
| `g600` | #52525B | Body text (light bg) |
| `success` | #2FB83C | Success states |
| `warning` | #F59E0B | Warning states |

## Typography

- **Heading font**: `font-heading` (Plus Jakarta Sans) - weights 600-800
- **Body font**: `font-body` (Inter) - weights 400-600

### Scale
- H1: `text-3xl md:text-4xl lg:text-5xl font-bold`
- H2: `text-2xl md:text-3xl lg:text-4xl font-bold`
- H3: `text-lg md:text-xl font-semibold`
- Body: `text-sm md:text-base`
- Small: `text-xs md:text-sm`

### Text Colors by Background
- Light backgrounds (white, g50, g100): `text-g600` for body, `text-carbon` for headings
- Dark backgrounds (carbon, black): `text-g300` for body, `text-white` for headings
- Muted/secondary on dark: `text-g400`

## Spacing & Layout

- Max content width: `max-w-[1200px]`
- Section padding: `py-16 md:py-24`
- Container padding: `px-5`
- Border radius: `rounded-lg` (6px), `rounded-xl` (10px), `rounded-2xl` (16px)

## Components

### Buttons
Use the `Button` component from `@/components/ui/Button`:
```tsx
<Button href="#book-call" size="sm">Book strategy call</Button>
<Button href="#" showArrow>Watch how it works</Button>
```

### Cards
- White bg: `bg-white rounded-xl border border-g200`
- Dark bg: `bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f]`
- Hover: `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`

### X Watermark Pattern
For decorative backgrounds:
```tsx
<span
  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-heading font-extrabold text-[500px] md:text-[700px] lg:text-[900px] text-alice/30 pointer-events-none select-none"
  aria-hidden="true"
>
  X
</span>
```
- Dark sections: `text-[#DCEEFF]/[0.06]` (alice blue 6%)
- Light sections: `text-alice/30` (alice blue 30%)

### Dots Pattern Background
For FAQ, forms, timeline sections:
```tsx
style={{
  backgroundColor: '#F9F9F9',
  backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}}
```

## Icons
Use Phosphor Icons (inline SVG). Common pattern:
```tsx
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
  <path fill="currentColor" d="..."/>
</svg>
```

## Responsive Breakpoints
- Mobile first approach
- `md:` for tablet (768px+)
- `lg:` for desktop (1024px+)

## Focus States
- Inputs: `focus:border-alice focus:ring-2 focus:ring-alice`
- FAQ items: `border-alice` when active

## Best Practices
1. Always use semantic HTML
2. Include `aria-hidden="true"` on decorative elements
3. Use `transition-all duration-300` for smooth interactions
4. Prefer `font-heading` for titles, `font-body` for paragraphs
5. Use the reusable Button component for all CTAs
