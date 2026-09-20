---
name: Eque
version: 1.0.0
description: >
  UI design rules for Eque. Dark, minimal, modern, high-end interface with a
  pixelated-tech accent language (stepped corners, corner brackets, box-drawing
  glyphs, dot grids). Neon teal is used sparingly on a near-black canvas.
colors:
  primary: "#1FFFC3"
  primary-hover: "#5CFFD3"
  primary-pressed: "#00E0A4"
  on-primary: "#031A14"
  on-background: "#031A14"
  background: "#070A0F"
  surface: "#0D1219"
  surface-raised: "#131A23"
  surface-high: "#1A222D"
  border-subtle: "#1A222D"
  border-default: "#252F3C"
  border-strong: "#384555"
  text-primary: "#E4EAF0"
  text-secondary: "#A9B5C2"
  text-tertiary: "#8F9CAD"
  text-muted: "#718094"
  text-disabled: "#4A5768"
  success: "#5BE37D"
  warning: "#FFB020"
  info: "#4DA3FF"
  error: "#FF6B6B"
  danger: "#FF2D55"
typography:
  display:
    fontFamily: "Spline Sans Mono"
    fontSize: 5rem
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.03em
  h1:
    fontFamily: "Spline Sans Mono"
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: "Spline Sans Mono"
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  h3:
    fontFamily: "Spline Sans Mono"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  h4:
    fontFamily: "Spline Sans Mono"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  h5:
    fontFamily: "Spline Sans Mono"
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.35
  body-lg:
    fontFamily: "Google Sans"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: "Google Sans"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Google Sans"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Google Sans"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Spline Sans Mono"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.02em
  label:
    fontFamily: "Spline Sans Mono"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.04em
rounded:
  none: 0px
  sm: 0.25rem
spacing:
  1: 0.25rem
  2: 0.5rem
  3: 0.75rem
  4: 1rem
  6: 1.5rem
  8: 2rem
  12: 3rem
  16: 4rem
  24: 6rem
  32: 8rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 44px
    padding: 0 24px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 44px
    padding: 0 24px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: 0 16px
---

# Eque Design System

## 1. Overview

**Eque** is a dark, minimal, modern web interface that should feel like a high-end developer tool: precise, quiet, confident. The canvas is near-black; neon teal appears only where the user should look or act. Structure comes from hairline borders and tonal surfaces, not from shadows or color blocks.

The visual signature is a **pixelated-tech accent language**: stepped (notched) corners, corner brackets, box-drawing glyphs, dot grids, and segmented bars. It is applied as modern decoration on top of clean, generous layout. It must never look retro-game or cluttered.

### Design principles

1. **Quiet canvas, one loud thing.** Each viewport gets a single focal point in neon teal. Everything else stays neutral.
2. **Structure is information.** Borders, dividers, and labels exist to group or label content, never as filler.
3. **Sharp by default.** Corners are `0px`, or `0.25rem` at most. No pills, no soft blobs.
4. **Depth through tone, not shadow.** Lighter surface = closer to the user.
5. **Pixel accents are seasoning.** Max 1–2 pixel motifs per viewport; they must not hurt legibility.
6. **Generous space.** Whitespace is a premium signal. When in doubt, add space rather than elements.

---

## 2. Colors

### 2.1 Core palette

| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `primary` | `#1FFFC3` | CTAs, active states, focus ring, key highlights, links on dark |
| On-primary / On-background | `on-primary`, `on-background` | `#031A14` | Ink color placed **on top of** primary/light-teal fills (button labels, badges, icons on primary) |
| Background | `background` | `#070A0F` | Page canvas (layer 0) |
| Surface | `surface` | `#0D1219` | Cards, panels, inputs, sidebar (layer 1) |
| Surface raised | `surface-raised` | `#131A23` | Dropdowns, popovers, hover state of cards (layer 2) |
| Surface high | `surface-high` | `#1A222D` | Modals, tooltips, selected rows (layer 3) |

> **Note on `on-background` (`#031A14`):** this value is kept exactly as specified in the brief. Because it is a near-black teal, it is used as *ink on primary/light fills only*. Never use it as text on the dark background (`#070A0F`). Text on the background uses the `text-*` tokens in 2.4.

### 2.2 Primary tonal scale (lightness ladder, hue 164°)

| Step | Hex | Use |
|---|---|---|
| 50 | `#E6FFF8` | Rare: light inverted sections, illustration highlights |
| 100 | `#CCFFF2` | Text highlight on teal-tinted areas |
| 200 | `#99FFE4` | Soft accents, chart secondary line |
| 300 | `#5CFFD3` | **Hover** for primary fills, link hover |
| **400** | **`#1FFFC3`** | **Brand primary (default)** |
| 500 | `#00E0A4` | **Pressed/active** state, chart series |
| 600 | `#00AD7F` | Icons on tinted surfaces, secondary chart series |
| 700 | `#008561` | Borders on tinted surfaces, dividers with teal tint |
| 800 | `#006147` | Deep accents, progress track fill (inactive) |
| 900 | `#004231` | Teal-tinted panels (solid) |
| 950 | `#00291E` | Darkest teal wash, glow base |

### 2.3 Saturation ladder (fixed lightness 56%, hue 164°)

Use to step the brand color down when neon is too loud (illustrations, charts, disabled-brand states, decorative pixel art).

| Saturation | Hex | Use |
|---|---|---|
| 100% | `#1FFFC3` | Brand primary, focal element only |
| 75% | `#3BE3B6` | Secondary highlights, chart series 1 |
| 50% | `#57C7A9` | Charts series 2, muted icons |
| 25% | `#73AB9C` | Decorative pixel art, subtle illustrations |
| 10% | `#849A94` | Near-neutral teal gray, hint of brand in neutral areas |

### 2.4 Neutral scale and text

Neutrals carry a slight cool-blue tint (hue ~215°) so they sit naturally on `#070A0F`.

| Step | Hex | Token / Use |
|---|---|---|
| 950 | `#070A0F` | `background` |
| 900 | `#0D1219` | `surface` |
| 850 | `#131A23` | `surface-raised` |
| 800 | `#1A222D` | `surface-high`, `border-subtle` |
| 700 | `#252F3C` | `border-default` |
| 600 | `#384555` | `border-strong`, scrollbar thumb |
| 500 | `#718094` | `text-muted` (placeholder, muted icons) |
| 400 | `#8F9CAD` | `text-tertiary` (meta, captions) |
| 300 | `#A9B5C2` | `text-secondary` (supporting paragraphs) |
| 200 | `#CBD4DD` | Emphasis text on surface-high |
| 100 | `#E4EAF0` | `text-primary` (headings, body) |
| 50 | `#F4F7FA` | Hero headline only |

Additional text token: `text-disabled` `#4A5768`.

Approximate contrast on `#070A0F`: `text-primary` ≈ 16:1, `text-secondary` ≈ 9.5:1, `text-tertiary` ≈ 6:1, `text-muted` ≈ 4.5:1, `primary` ≈ 15:1, `on-primary` on `primary` ≈ 14:1.

### 2.5 Primary opacity ladder (for tints, borders, glows on dark)

| Token | Value | Use |
|---|---|---|
| `primary-a100` | `rgba(31,255,195,1.00)` | Solid fills, text |
| `primary-a60` | `rgba(31,255,195,0.60)` | Active borders, selected outlines |
| `primary-a40` | `rgba(31,255,195,0.40)` | Hover borders on cards |
| `primary-a24` | `rgba(31,255,195,0.24)` | Glow (box-shadow blur) |
| `primary-a16` | `rgba(31,255,195,0.16)` | Focus halo, selected row bg |
| `primary-a08` | `rgba(31,255,195,0.08)` | Subtle tinted bg (badges, hover) |
| `primary-a04` | `rgba(31,255,195,0.04)` | Section wash, dot-grid tint |

### 2.6 Status colors

Each status has four steps. Status colors must always be paired with an **icon and a text label**, never color alone.

| Status | 300 (text on dark) | 500 (base) | 700 (pressed) | 900 (solid tint bg) | Tint bg | Tint border |
|---|---|---|---|---|---|---|
| **Success** | `#9BF0B2` | `#5BE37D` | `#22A04A` | `#0F3D20` | `rgba(91,227,125,0.10)` | `rgba(91,227,125,0.32)` |
| **Warning** | `#FFD37A` | `#FFB020` | `#C47F00` | `#4A3000` | `rgba(255,176,32,0.10)` | `rgba(255,176,32,0.32)` |
| **Info** | `#96CBFF` | `#4DA3FF` | `#1F6FCC` | `#0D2C52` | `rgba(77,163,255,0.10)` | `rgba(77,163,255,0.32)` |
| **Error** | `#FFA3A3` | `#FF6B6B` | `#D63A3A` | `#4A1414` | `rgba(255,107,107,0.10)` | `rgba(255,107,107,0.32)` |
| **Danger** | `#FF8AA1` | `#FF2D55` | `#C4123A` | `#4D0A1B` | `rgba(255,45,85,0.10)` | `rgba(255,45,85,0.32)` |

**Semantic differences**

- **Success**: completed or confirmed action. Kept a slightly greener hue than the brand teal so the two never blur together.
- **Warning**: needs attention, but nothing is broken (limits, expiring items).
- **Info**: neutral, helpful notice. Never use primary teal for info.
- **Error**: something failed or input is invalid (form validation, failed request). Shown as text, border, or inline alert.
- **Danger**: destructive or irreversible actions and critical system alerts (delete, revoke, disconnect). Shown as filled buttons and high-severity banners.

**Status text on fills:** use `#1A0505`-style near-black ink on solid status fills (warning, success, info); use `#FFFFFF` on solid `danger`/`error` 700 fills.

### 2.7 Color distribution and rules

- **Ratio per viewport:** ~60% background/surface, ~30% neutrals (text, borders), **≤10% primary**.
- **One primary focal element** per viewport section (usually the main CTA or hero accent).
- Primary teal text is allowed for links, key numbers, and labels at ≥14px. Never for long paragraphs.
- No gradients as decoration. The only allowed gradient is a single hero glow: `radial-gradient(60% 50% at 50% 0%, rgba(31,255,195,0.12), transparent 70%)`.
- Never place primary teal on light backgrounds without switching to step 600–700 for contrast.

---

## 3. Typography

### 3.1 Font families

| Role | Family | Fallback stack | Weights |
|---|---|---|---|
| **Headings / titles / UI labels / buttons / code** | **Spline Sans Mono** | `"Spline Sans Mono", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace` | 400, 500, 600, 700 |
| **Paragraphs / formal body text** | **Google Sans** | `"Google Sans", "Product Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif` | 400, 500, 700 |

> Google Sans is not always freely licensed for self-hosting. If it is unavailable in your deployment, the fallback stack above renders the paragraph role in Inter/system-ui with the same metrics and rules.

### 3.2 Type scale

Desktop values apply at ≥1024px. Mobile values apply below 768px. Use `clamp()` between them for fluid scaling.

| Token | Family | Weight | Desktop | Mobile | Line height | Letter spacing | Use |
|---|---|---|---|---|---|---|---|
| **Display (hero)** | Spline Sans Mono | **700 Bold** | **5rem / 80px** | 2.75rem / 44px | 1.0 | -0.03em | Hero headline only. One per page |
| **H1** | Spline Sans Mono | 700 Bold | 3.5rem / 56px | 2.25rem / 36px | 1.1 | -0.02em | Page titles |
| **H2** | Spline Sans Mono | 600 SemiBold | 2.5rem / 40px | 1.75rem / 28px | 1.15 | -0.02em | Section titles |
| **H3** | Spline Sans Mono | 600 SemiBold | 2rem / 32px | 1.5rem / 24px | 1.2 | -0.01em | Sub-sections, feature titles |
| **H4** | Spline Sans Mono | 600 SemiBold | 1.5rem / 24px | 1.25rem / 20px | 1.3 | 0 | Card titles |
| **H5** | Spline Sans Mono | 500 Medium | 1.25rem / 20px | 1.125rem / 18px | 1.35 | 0 | Small headings, panel titles |
| **Lead** | Google Sans | 400 Regular | 1.25rem / 20px | 1.125rem / 18px | 1.6 | 0 | Hero sub-headline, intro paragraph |
| **Body L** | Google Sans | 400 Regular | 1.125rem / 18px | 1.0625rem / 17px | 1.7 | 0 | Long-form reading |
| **Body M (default)** | Google Sans | **400 Regular** | **1rem / 16px** | 1rem / 16px | 1.6 | 0 | Default paragraph text |
| **Body S** | Google Sans | 400 Regular | 0.875rem / 14px | 0.875rem / 14px | 1.5 | 0 | Secondary text, table cells |
| **Caption** | Google Sans | 400 Regular | 0.75rem / 12px | 0.75rem / 12px | 1.4 | 0.01em | Meta, helper text, timestamps |
| **Emphasis** | Google Sans | 500 Medium | inherits | inherits | inherits | 0 | Inline emphasis inside paragraphs |
| **Strong** | Google Sans | 700 Bold | inherits | inherits | inherits | 0 | Inline strong text |
| **Button** | Spline Sans Mono | 500 Medium | 0.875rem / 14px (lg: 1rem) | same | 1 | 0.02em | Button labels (sentence case) |
| **Label** | Spline Sans Mono | 500 Medium | 0.75rem / 12px | same | 1.4 | 0.04em | Form labels, table headers, eyebrows |
| **Code / data** | Spline Sans Mono | 400 Regular | 0.875rem / 14px | same | 1.6 | 0 | Code, numbers in tables, IDs |

### 3.3 Typography rules

- **Headings are always Spline Sans Mono**; paragraphs are always Google Sans. Never swap.
- **Weights:** headings 600–700; body 400; emphasis 500; strong 700. Do not use weight 300 or lower on dark backgrounds because thin strokes vibrate.
- **Line length:** paragraphs max `65ch` (≈ 40rem). Hero headline max ~`16ch` per line.
- **Case:** headings and buttons use sentence case. Uppercase is reserved for tiny status badges (≤ 11px) and nothing else. Do not add an all-caps eyebrow above every heading.
- **Alignment:** left-align text by default. Center only the hero headline and short CTA blocks (≤ 3 lines). Never justify.
- **Color:** headings `text-primary` (hero `#F4F7FA`); paragraphs `text-secondary`; meta `text-tertiary`.
- **Numbers:** use Spline Sans Mono for metrics, prices, and table numbers so digits align (`font-variant-numeric: tabular-nums`).
- **Links:** `primary` color, no underline by default; underline (1px, offset 4px) on hover. Never style links with a trailing arrow by default.
- **Hero accent:** color a whole phrase or none of the headline. Never highlight a single word for effect.

---

## 4. Layout & Spacing

### 4.1 Grid and breakpoints

| Breakpoint | Range | Columns | Gutter | Page margin |
|---|---|---|---|---|
| Mobile (xs) | 0–479px | 4 | 16px | 20px |
| Mobile (sm) | 480–767px | 4 | 16px | 24px |
| Tablet (md) | 768–1023px | 8 | 24px | 32px |
| Desktop (lg) | 1024–1279px | 12 | 24px | 48px |
| Wide (xl) | 1280–1535px | 12 | 32px | 64px |
| Ultra (2xl) | ≥1536px | 12 | 32px | auto (centered) |

- **Max content width:** `1280px`. Reading-width containers (docs, articles): `720px`.
- Horizontal page padding: `padding-inline: clamp(1.25rem, 4vw, 4rem)`.
- Layout is built on a **4px base unit**. Every margin, padding, and gap must be a multiple of 4px.
- Align elements to the grid. Asymmetric layouts are welcome if they snap to columns.

### 4.2 Spacing scale (4px base)

| Token | rem | px | Typical use |
|---|---|---|---|
| `space-1` | 0.25 | 4 | Icon nudge, badge inner gap |
| `space-2` | 0.5 | 8 | Icon–text gap, label→input gap |
| `space-3` | 0.75 | 12 | Button group gap, list item gap |
| `space-4` | 1 | 16 | Input padding-x, small card gap |
| `space-5` | 1.25 | 20 | Form field gap |
| `space-6` | 1.5 | 24 | Card padding, grid gutter |
| `space-8` | 2 | 32 | Featured card padding, block gap |
| `space-10` | 2.5 | 40 | Compact section padding (mobile) |
| `space-12` | 3 | 48 | Header→content gap (mobile) |
| `space-16` | 4 | 64 | Section padding (mobile), header→content gap (desktop) |
| `space-20` | 5 | 80 | Section padding (tablet), compact section (desktop) |
| `space-24` | 6 | 96 | Section padding (desktop) |
| `space-32` | 8 | 128 | Section padding (wide) |
| `space-40` | 10 | 160 | Hero top padding (wide) |

### 4.3 Section padding and limits

| Section type | Mobile (<768) | Tablet (768–1023) | Desktop (1024–1279) | Wide (≥1280) |
|---|---|---|---|---|
| **Hero** (top / bottom) | 6rem / 4rem | 8rem / 6rem | 10rem / 7rem | 10rem / 8rem |
| **Standard section** (y) | 4rem (64px) | 5rem (80px) | 6rem (96px) | 8rem (128px) |
| **Compact section** (logos, CTA strip) | 2.5rem (40px) | 3rem (48px) | 4rem (64px) | 5rem (80px) |
| **Footer** (top / bottom) | 3rem / 2rem | 4rem / 2.5rem | 5rem / 3rem | 5rem / 3rem |
| **Section header → content** | 3rem | 3rem | 4rem | 4rem |
| **Heading → sub-text** | 1rem | 1rem | 1.5rem | 1.5rem |

**Hard limits**

- Minimum vertical padding between sections: `4rem` (64px). Never go below it on any device.
- Maximum vertical padding: `10rem` (160px), hero top only. Standard sections never exceed `8rem`.
- Section separation is a `1px solid border-subtle` line at the top of the section, or the whitespace alone. Never both a heavy divider and large color change.
- Alternate `background` and `surface` for section bands only when the content needs grouping. Otherwise stay on `background`.
- One `h1`/Display per page. One primary CTA per section.
- Hero: minimum height `min(100svh, 56rem)`; content max-width `56rem`; headline max 3 lines on desktop, 4 on mobile.
- Avoid stacking more than three different section backgrounds on one page.

### 4.4 Component spacing

| Context | Value |
|---|---|
| Card padding | 24px (desktop), 20px (mobile). Featured: 32px |
| Gap between cards | 24px (32px on wide) |
| Label → input | 8px |
| Input → helper/error text | 8px |
| Form field → next field | 20px |
| Button group gap | 12px |
| Icon ↔ text inside button | 8px |
| Heading → paragraph (in card) | 8–12px |
| List item gap | 12px |
| Nav height | 64px (56px mobile) |
| Table row height | 48px (compact 40px) |
| Touch target minimum | 44 × 44px |

### 4.5 Layout patterns

- **Bento/feature grid:** 12-col; mix 4/6/8 spans. All tiles share `0px` radius and 1px borders; vary size, not style.
- **Split hero:** 7/5 columns; text left, visual right. On mobile, text first.
- **Docs/app shell:** fixed 240px sidebar (`surface`), content max `960px`.
- Use borders as the grid: adjoining cards share a single 1px line (use `gap: 1px` on a `border-default` container background) for a crisp, engineered look.

---

## 5. Elevation & Depth

Eque is a dark UI. **Depth is created by lighter surfaces and hairline borders, not by drop shadows.**

### 5.1 Layer stack

| Level | Token | Background | Border | Shadow | Use |
|---|---|---|---|---|---|
| L0 | `background` | `#070A0F` | none | none | Page canvas |
| L1 | `surface` | `#0D1219` | 1px `#1A222D` | none | Cards, panels, inputs, sidebar |
| L2 | `surface-raised` | `#131A23` | 1px `#252F3C` | `0 8px 24px rgba(0,0,0,0.40)` | Dropdowns, popovers, menus |
| L3 | `surface-high` | `#1A222D` | 1px `#252F3C` | `0 16px 48px rgba(0,0,0,0.60)` | Modals, dialogs, command palette |
| Scrim | overlay | `rgba(3,6,10,0.72)` | none | `backdrop-filter: blur(4px)` | Behind modals/drawers |

### 5.2 Accent effects (use sparingly)

| Effect | CSS | When |
|---|---|---|
| **Pixel shadow** (hard offset) | `box-shadow: 4px 4px 0 0 rgba(31,255,195,0.16)` | Hover on featured card; never on every card |
| **Neon glow** | `box-shadow: 0 0 24px rgba(31,255,195,0.24)` | Primary button hover, active focus element. One glow per viewport |
| **Focus halo** | `box-shadow: 0 0 0 3px rgba(31,255,195,0.16)` | Input focus |
| **Hero glow** | `radial-gradient(60% 50% at 50% 0%, rgba(31,255,195,0.12), transparent 70%)` | Hero background only |
| **Glass nav** | `background: rgba(7,10,15,0.80); backdrop-filter: blur(12px)` | Sticky nav only |

### 5.3 Z-index scale

`base 0` · `sticky 100` · `dropdown 200` · `overlay 300` · `modal 400` · `toast 500` · `tooltip 600`

### 5.4 Borders

| Token | Value | Use |
|---|---|---|
| Hairline | `1px solid #1A222D` | Default card and divider |
| Default | `1px solid #252F3C` | Inputs, secondary buttons, table frame |
| Strong | `1px solid #384555` | Hover on neutral elements |
| Accent | `1px solid rgba(31,255,195,0.40)` | Hover/selected state |
| Active | `1px solid #1FFFC3` | Focus, selected input, active tab |

Border width is always `1px`. Use `2px` only for the focus ring and corner brackets.

---

## 6. Shapes & Pixel Language

### 6.1 Border radius

| Token | Value | Use |
|---|---|---|
| `rounded-none` | `0px` | **Default.** Buttons, cards, modals, tables, images, badges, nav |
| `rounded-sm` | `0.25rem` (4px) | Inputs, selects, code blocks, tooltips, small chips |

- Nothing larger than `0.25rem`. No pills, no `rounded-lg`, no fully rounded buttons.
- Only exception: status dots and user avatars may be circular (`50%`).
- Never mix `0px` and `0.25rem` inside the same component.

### 6.2 Pixel decoration toolkit

Pixel motifs are decoration on top of a clean layout. Pick **at most two per viewport**.

**1. Stepped (notched) corners.** For primary buttons and hero panels. A single 4px step per corner:

```css
.pixel-notch {
  --n: 4px;
  clip-path: polygon(
    0 var(--n), var(--n) var(--n), var(--n) 0,
    calc(100% - var(--n)) 0, calc(100% - var(--n)) var(--n), 100% var(--n),
    100% calc(100% - var(--n)), calc(100% - var(--n)) calc(100% - var(--n)), calc(100% - var(--n)) 100%,
    var(--n) 100%, var(--n) calc(100% - var(--n)), 0 calc(100% - var(--n))
  );
}
```

**2. Corner brackets.** For secondary buttons, featured cards, and image frames. Two opposite corners (top-left and bottom-right), `6px` arms, `2px` stroke, `primary` color:

```
╔────────────────╗
│     Button     │
╚────────────────╝
```

```css
.bracket { position: relative; border: 1px solid var(--border-default); }
.bracket::before, .bracket::after {
  content: ""; position: absolute; width: 6px; height: 6px;
  border: 2px solid var(--primary);
}
.bracket::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.bracket::after  { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
```

**3. Dot grid background.** Hero and empty states only:

```css
background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
background-size: 24px 24px;
```
Fade it out with a mask so it never reaches the content edges.

**4. Box-drawing glyphs.** For dividers, tags, and terminal-style labels: `┌ ┐ └ ┘ ─ │ ╔ ╗ ╚ ╝ ▌ █ ░ ▒ ▓ ⎯`. Render in Spline Sans Mono, color `border-strong` or `primary`. Example bracketed label: `[ beta ]`, `┌─ preview ─┐`.

**5. Segmented progress bar.** 8px-wide blocks with 2px gaps; filled blocks `primary`, empty blocks `#1A222D`. No smooth rounded fills.

**6. Block cursor.** A `█` caret (0.6em wide, `primary`) that blinks with `steps(1)` at 1s. Use in one hero element or input at most.

**7. Crosshair marks.** Small `+` (8px, `border-strong`) at grid intersections or section corners.

**8. Scanline overlay.** Opacity ≤ 0.03, hero only, `pointer-events: none`. Optional.

**Rules for decoration:** decoration is ≤ 5% of a screen's visual weight; never place it behind body text; never animate more than one decorative element at once; every decoration should also work in static form.

---

## 7. Components

### 7.1 Buttons

| Property | Small | Medium (default) | Large |
|---|---|---|---|
| Height | 32px | 44px | 56px |
| Padding-x | 12px | 24px | 32px |
| Font | Mono 500, 12px | Mono 500, 14px | Mono 500, 16px |
| Radius | 0 | 0 | 0 |
| Icon size | 16px | 20px | 20px |

**Primary** (solid, stepped corners)

- Default: bg `#1FFFC3`, text `#031A14`, no border, `pixel-notch` corners.
- Hover: bg `#5CFFD3` + glow `0 0 24px rgba(31,255,195,0.24)`.
- Active: bg `#00E0A4`, `transform: translateY(1px)`, no glow.
- Focus-visible: `outline: 2px solid #1FFFC3; outline-offset: 3px`.
- Disabled: bg `#1A222D`, text `#4A5768`, no glow, `cursor: not-allowed`.

**Secondary** (ghost with corner brackets)

```
╔────────────────╗
│     Button     │
╚────────────────╝
```

- Default: transparent bg, `1px solid #252F3C`, text `#1FFFC3`, corner brackets in `#1FFFC3`.
- Hover: bg `rgba(31,255,195,0.08)`, border `rgba(31,255,195,0.40)`.
- Active: bg `rgba(31,255,195,0.16)`.
- Disabled: border `#1A222D`, text and brackets `#4A5768`.

**Tertiary** (text button)

- Text `#E4EAF0`, no border; hover text `#1FFFC3` with `1px` underline offset `4px`. Optional leading glyph `>` or trailing `_` for terminal flavor, used sparingly.

**Danger**

- Solid: bg `#FF2D55`, text `#FFFFFF`, hover `#FF8AA1` tint, pressed `#C4123A`. Only for destructive actions. Requires confirmation.

**Rules:** one primary button per section; label is a verb ("Start building", "Save changes"), and the same action keeps the same name across the flow.

### 7.2 Inputs, selects, textareas

- Height `44px` (textarea min `120px`); padding `0 16px`; radius `0.25rem`.
- Bg `#0D1219`, border `1px solid #252F3C`, text `#E4EAF0` (Google Sans 16px), placeholder `#718094`.
- Label above: Mono 500 12px, `#A9B5C2`, 8px gap. Helper text: Caption, `#8F9CAD`.
- Hover: border `#384555`.
- Focus: border `#1FFFC3` + `box-shadow: 0 0 0 3px rgba(31,255,195,0.16)`.
- Error: border `#FF6B6B`, error message Caption in `#FFA3A3` with an error icon.
- Success: border `#5BE37D` with check icon. Show only after validation.
- Disabled: bg `#0D1219` at 60% opacity, text `#4A5768`.
- Checkbox/radio: 16px square, radius 0 (radio may be circular); checked = `primary` fill with `#031A14` check glyph.
- Toggle: 36 × 20px rectangular track (radius 0), square thumb; on = `primary`.

### 7.3 Cards

- Bg `#0D1219`, border `1px solid #1A222D`, radius `0`, padding `24px`.
- Hover (interactive cards only): border `rgba(31,255,195,0.40)`, bg `#131A23`. Optional pixel shadow on featured cards.
- Featured card: corner brackets (motif 2) and 32px padding.
- Structure: optional Label (Mono 12px, `text-tertiary`) → H4 title → Body S description → action.
- Do not put a shadow on every card. Do not nest cards inside cards.

### 7.4 Navigation

- Sticky top bar, height 64px (56px mobile), bg `rgba(7,10,15,0.80)` + `blur(12px)`, bottom border `1px solid #1A222D`.
- Logo: "eque" in Spline Sans Mono 700, lowercase, `#E4EAF0`; optional block cursor `_` in `primary`.
- Links: Mono 500 14px, `#A9B5C2`; hover `#E4EAF0`; active `#1FFFC3` with a 2px bottom bar (square).
- One primary button max on the right side.
- Mobile: full-screen drawer on `#070A0F`, links at H3 size, 1px dividers.

### 7.5 Tabs, badges, tags

- **Tabs:** underline style; active label `#1FFFC3` with 2px bottom border, inactive `#A9B5C2`; no filled pills.
- **Badge/tag:** height 24px, padding `0 8px`, radius 0, Mono 500 11px, `1px` border. Neutral: border `#252F3C`, text `#A9B5C2`. Brand: bg `rgba(31,255,195,0.08)`, border `rgba(31,255,195,0.32)`, text `#1FFFC3`. Status variants use the tint bg + tint border + 300 text from 2.6.

### 7.6 Alerts, banners, toasts

- Structure: status icon (20px) + title (Body S, 500) + message (Body S, `text-secondary`) + optional dismiss.
- Bg = status tint (10%), border = status tint border (32%) plus a `2px` left border in status 500. Radius `0`.
- Toasts: bottom-right, width 360px, L3 elevation, auto-dismiss 5s (errors persist), z-index 500.
- Copy explains what happened and what to do next. Errors don't apologize.

### 7.7 Tables

- Frame `1px solid #1A222D`, header bg `#0D1219`, header text Label style `#8F9CAD`.
- Row height 48px (compact 40px), bottom border `1px solid #1A222D`, hover bg `rgba(255,255,255,0.02)`, selected bg `rgba(31,255,195,0.08)`.
- Numbers right-aligned in Spline Sans Mono, tabular figures.

### 7.8 Modals, drawers, tooltips

- **Modal:** bg `#1A222D`, border `1px solid #252F3C`, radius 0, padding 32px, width 480 / 640px, L3 shadow, scrim behind. Close button top-right, 32px square.
- **Drawer:** 420px, slides from right, same surface as modal.
- **Tooltip:** bg `#1A222D`, border `1px solid #252F3C`, radius `0.25rem`, Caption text `#E4EAF0`, padding `6px 10px`, delay 300ms.

### 7.9 Icons and imagery

- **Icons:** 24px grid, `1.5px` stroke, **square line caps and miter joins**, sizes 16 / 20 / 24 / 32. Color inherits text; active = `primary`. Recommended sets: Lucide or Phosphor (regular) with square caps enforced.
- **Imagery:** dark-toned, low saturation, or teal duotone. Product screenshots are framed with `1px` border and corner brackets. No stock photos of smiling people; no rounded-corner images.
- **Charts:** series order `#1FFFC3` → `#3BE3B6` → `#57C7A9` → `#73AB9C` → neutral `#718094`. Gridlines `#1A222D`. Square markers, no smoothing beyond linear or step curves.

---

## 8. Motion

| Token | Duration | Easing | Use |
|---|---|---|---|
| Micro | 120ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover, press, color changes |
| Default | 200ms | `cubic-bezier(0.2, 0, 0, 1)` | Tabs, dropdowns, toggles |
| Large | 320ms | `cubic-bezier(0.2, 0, 0, 1)` | Modals, drawers |
| Pixel | 240ms | `steps(4, end)` | Pixel reveal/dissolve on one hero element |
| Blink | 1000ms | `steps(1)` | Block cursor |

- Motion answers user action (hover, open, confirm). Do not fade-slide every section on scroll.
- One orchestrated page-load moment is enough (for example, the hero headline typing or a pixel reveal).
- Respect `prefers-reduced-motion: reduce`: remove transforms, blink, and reveal animations.

---

## 9. Accessibility

- Target **WCAG 2.2 AA** minimum. Body text contrast ≥ 4.5:1; large text and UI components ≥ 3:1.
- Focus is always visible: `outline: 2px solid #1FFFC3; outline-offset: 2px` on every interactive element. Never `outline: none` without a replacement.
- Touch targets ≥ 44 × 44px.
- Status is never color alone: icon + label + color.
- Decorative glyphs (box-drawing, cursor, pixel art) use `aria-hidden="true"`.
- Placeholder text is not a label; every field has a visible label.
- Support keyboard navigation, logical tab order, and visible skip link.

---

## 10. Responsive Behavior

- Mobile-first. Design at 375px, then scale up.
- Stack columns below 768px; hero Display drops to 2.75rem.
- Pixel decoration is reduced on mobile: keep stepped corners and brackets, remove scanlines and dot-grid animations.
- Tables become stacked key-value cards below 640px, or scroll inside their own `overflow-x: auto` container. The page never scrolls horizontally.
- Buttons are full-width in single-column mobile forms.

---

## 11. Do's & Don'ts

### Do

- Keep the canvas near-black (`#070A0F`) and let one neon teal element lead each viewport.
- Use `0px` radius by default and `0.25rem` only for inputs, tooltips, and small chips.
- Build depth with tonal surfaces (L0 → L3) and `1px` borders.
- Use Spline Sans Mono for all headings, buttons, labels, and numbers; Google Sans for paragraphs.
- Use the Display style (Bold 700, 5rem) for the hero headline only.
- Stick to the 4px spacing scale and the section padding limits in 4.3.
- Use stepped corners on primary buttons and corner brackets on secondary buttons and featured cards.
- Pair every status color with an icon and text.
- Keep paragraphs under 65 characters per line and left-aligned.
- Use plain, specific button copy ("Save changes", not "Submit").
- Test contrast whenever primary teal is used on a new background.

### Don't

- Don't use rounded corners above `0.25rem`, pill buttons, or blob shapes.
- Don't add soft grey drop shadows to every card. Don't use heavy shadows on dark surfaces.
- Don't use primary teal for more than ~10% of a screen or for long paragraphs.
- Don't put `#031A14` text on the dark background, or dark text on dark surfaces.
- Don't use gradients as decoration (only the single hero glow).
- Don't use pure `#000000` or pure `#FFFFFF` in the interface (status-fill text excepted).
- Don't use more than two pixel motifs in one viewport or place them behind body text.
- Don't use all-caps labels above every heading, or trailing arrows on every link.
- Don't use font weights below 400 for text on dark backgrounds.
- Don't use primary teal for info; use the info blue.
- Don't stack cards inside cards, or mix radius values inside one component.
- Don't animate on scroll for every section, and don't ignore `prefers-reduced-motion`.
- Don't rely on color alone to communicate status or state.

---

## 12. CSS Tokens (implementation reference)

```css
:root {
  /* Brand */
  --primary: #1FFFC3;
  --primary-hover: #5CFFD3;
  --primary-pressed: #00E0A4;
  --on-primary: #031A14;
  --on-background: #031A14;

  /* Surfaces */
  --background: #070A0F;
  --surface: #0D1219;
  --surface-raised: #131A23;
  --surface-high: #1A222D;

  /* Borders */
  --border-subtle: #1A222D;
  --border-default: #252F3C;
  --border-strong: #384555;
  --border-accent: rgba(31, 255, 195, 0.40);

  /* Text */
  --text-primary: #E4EAF0;
  --text-secondary: #A9B5C2;
  --text-tertiary: #8F9CAD;
  --text-muted: #718094;
  --text-disabled: #4A5768;

  /* Status */
  --success: #5BE37D;  --success-bg: rgba(91, 227, 125, 0.10);  --success-border: rgba(91, 227, 125, 0.32);
  --warning: #FFB020;  --warning-bg: rgba(255, 176, 32, 0.10);  --warning-border: rgba(255, 176, 32, 0.32);
  --info:    #4DA3FF;  --info-bg:    rgba(77, 163, 255, 0.10);   --info-border:    rgba(77, 163, 255, 0.32);
  --error:   #FF6B6B;  --error-bg:   rgba(255, 107, 107, 0.10);  --error-border:   rgba(255, 107, 107, 0.32);
  --danger:  #FF2D55;  --danger-bg:  rgba(255, 45, 85, 0.10);    --danger-border:  rgba(255, 45, 85, 0.32);

  /* Shape */
  --radius-none: 0px;
  --radius-sm: 0.25rem;

  /* Type */
  --font-heading: "Spline Sans Mono", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
  --font-body: "Google Sans", "Product Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif;

  --text-display: clamp(2.75rem, 1.6rem + 5vw, 5rem);
  --text-h1: clamp(2.25rem, 1.5rem + 3vw, 3.5rem);
  --text-h2: clamp(1.75rem, 1.3rem + 2vw, 2.5rem);
  --text-h3: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  --text-h4: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);

  /* Section padding */
  --section-y: clamp(4rem, 2.5rem + 6vw, 8rem);
  --section-y-compact: clamp(2.5rem, 1.5rem + 3vw, 5rem);
  --page-x: clamp(1.25rem, 4vw, 4rem);
  --container: 1280px;

  /* Motion */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur-micro: 120ms;
  --dur-default: 200ms;
  --dur-large: 320ms;
}

html { background: var(--background); color: var(--text-secondary); font-family: var(--font-body); }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); color: var(--text-primary); }
:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```
