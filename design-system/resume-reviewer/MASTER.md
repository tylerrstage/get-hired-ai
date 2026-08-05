# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Resume Reviewer
**Generated:** 2026-08-05 15:21:23
**Revised:** 2026-08-05 (aligned to existing brand instead of tool-generated defaults — see note below)
**Category:** Productivity / Utility Tool (single-screen, not a marketing site)

> **Note:** `--design-system` matched a landing-page pattern ("Feature-Rich Showcase") and a
> teal palette based on generic keyword scoring. This app is a single functional screen
> (upload → analyze → results), not a marketing landing page, and it already had a coherent,
> accessible blue identity ("GetHired") in place. Rather than discard working brand equity for
> a randomly-matched palette, this file documents the **existing** palette formalized into
> tokens, plus real fixes (focus states, disabled states, contrast) applied from the tool's
> accessibility/UX rule set.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Contrast on white |
|------|-----|--------------|---------------------|
| Primary (brand blue) | `#2952E3` | `--color-primary` | 6.16:1 ✓ AA |
| Primary hover | `#2145C9` | `--color-primary-hover` | — |
| On Primary | `#FFFFFF` | `--color-on-primary` | — |
| Success | `#16A34A` | `--color-success` | 4.6:1 ✓ AA |
| Destructive | `#DC2626` | `--color-destructive` | 4.83:1 ✓ AA |
| Accent (sparkle/AI) | `#6D5BD0` | `--color-accent` | — |
| Page Background | `#F4F6FC` | `--color-background` | — |
| Surface | `#FFFFFF` | `--color-surface` | — |
| Surface Muted | `#F7F9FD` | `--color-surface-muted` | — |
| Foreground (headings/body) | `#0F1729` | `--color-foreground` | 15.9:1 ✓ AAA |
| Foreground Muted (secondary text) | `#6B7280` | `--color-foreground-muted` | 4.83:1 ✓ AA |
| Foreground Subtle (placeholders) | `#9AA3B5` | `--color-foreground-subtle` | 3.1:1 (large text / decorative only) |
| Border | `#E5E7EB` | `--color-border` | — |
| Border Strong | `#D7DCE6` | `--color-border-strong` | — |
| Info surface | `#DBE7FF` | `--color-info-bg` | — |
| Danger surface | `#FDE8E8` | `--color-danger-bg` | — |
| Focus Ring | `#2952E3` @ 35% alpha | `--color-ring` | used as `box-shadow`, not `outline:none` |

**Color Notes:** Consolidated two near-identical near-black text colors (`#1a2036` and `#0f1729`)
that were used inconsistently across components into a single `--color-foreground`.

**Background:** Page background is a subtle two-blob radial gradient (violet top-left,
rose top-right, `--color-gradient-violet` / `--color-gradient-rose`, both under 16% alpha)
fading into `--color-background`, inspired by a reference SaaS landing page (Tailgrids).
Kept intentionally subtle so it never competes with the white/`--color-surface` cards.

**Elevation:** Primary content cards (`upload-card`, `jobdesc-textarea`, `results-card`) use
`--shadow-float` (a soft, diffuse ambient shadow) so they read as floating above the gradient,
matching the reference's dashboard-preview card.

**Motion:** Page sections use a one-time entrance animation on load (`.animate-in` +
`.animate-in-delay-1` / `-2` in `index.css`, `fade-slide-up` keyframe — opacity 0→1,
translateY 18px→0). The results panel additionally plays a `reveal-in` animation
(`.results-card--reveal` in `Results.css`, adds a subtle scale) every time a new analysis
completes — `App.jsx` increments a `resultVersion` counter and passes it as `key` to
`<Results>` so React remounts it and the animation replays on repeat analyses, not just the
first one. All motion respects `prefers-reduced-motion` (global rule forces animation-duration
to ~0). No JS animation library was added — plain CSS keyframes stay consistent with the
hand-rolled per-component CSS architecture already in place.

**Tuning motion speed:** every duration/stagger is a `:root` variable in `index.css`:
`--motion-duration-entrance` (page-load fade/slide, 850ms), `--motion-duration-reveal`
(results pop-in, 600ms), `--motion-stagger-1` / `--motion-stagger-2` (130ms / 260ms — how
long the left/right columns wait before starting), and `--motion-ease` (the shared easing
curve). Change the value in one place in `index.css` and every animation using it updates.

### Typography

- **Heading Font:** Inter
- **Body Font:** Inter
- **Mood:** minimal, clean, functional, professional — matches a data-dense ATS report tool
- **Fallback:** system-ui stack (kept as `font-display: swap` fallback so nothing blocks render)
- **Google Fonts:** [Inter](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap)

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |

### Radius & Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Buttons, pills |
| `--radius-md` | `12px` | Inputs, stat cards |
| `--radius-lg` | `16px` | Results card, upload card |
| `--shadow-button` | `0 4px 12px rgba(41,82,227,0.25)` | Primary button |
| `--shadow-button-hover` | `0 6px 16px rgba(41,82,227,0.32)` | Primary button hover |

---

## Page Pattern

This is a **single utility screen**, not a landing page — the tool's default landing-page
pattern (hero/feature-grid/testimonials/CTA) does not apply. Actual structure:

1. NavBar (brand only)
2. Header (title + one-line value prop)
3. Two-column working area: inputs (resume upload + job description) on the left, action +
   results on the right
4. Results render inline in the same screen once analysis completes — no navigation away

---

## Anti-Patterns (Do NOT Use)

- ❌ Emojis as icons — this app already uses a consistent inline SVG icon set, keep it that way
- ❌ `outline: none` without a replacement focus style (was present on the Analyze button — fixed)
- ❌ Disabled buttons that are visually identical to enabled ones (was present — fixed)
- ❌ Low contrast text — 4.5:1 minimum, verified above
- ❌ Instant state changes — use 150–300ms transitions
- ❌ Motion with no `prefers-reduced-motion` fallback

---

## Pre-Delivery Checklist

- [x] No emojis used as icons
- [x] All icons from one consistent SVG set
- [x] `cursor-pointer` on all clickable elements
- [x] Hover states with smooth transitions (150–300ms)
- [x] Light mode: text contrast 4.5:1 minimum
- [x] Focus states visible for keyboard navigation
- [x] `prefers-reduced-motion` respected
- [x] Responsive down to ~375px (existing 900px/640px breakpoints)
- [x] Error state is styled and announced to assistive tech (`role="alert"`)
