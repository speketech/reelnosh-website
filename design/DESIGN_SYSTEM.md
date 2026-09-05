# Reelnosh Design System

Generated from `Reelnosh_Comprehensive_Brand_Guidelines.pdf`. This file is the human-readable companion to `design/tokens.json` (machine-readable) and `tailwind.config.ts` (implementation). If the three ever disagree, `tokens.json` wins — fix the others to match it.

## Color

| Token | Hex | Use for | Never use for |
| --- | --- | --- | --- |
| `clay` (Deep Clay) | `#8B3A2A` | Logo, primary CTA, major headings, key nav states, high-intent interactions | Large/full-page backgrounds, placement directly beneath food imagery |
| `cocoa` (Spiced Cocoa) | `#5A2418` | Founder Notes framing, footer background, section dividers, background panels | CTAs, logo replacement |
| `warmWhite` | `#FFFEFA` | Primary page background | — |
| `softCream` | `#F7F3ED` | Cards, elevated surfaces | — |
| `lightClay` | `#E7DED5` | Borders, dividers, disabled surfaces | Text |
| `clayGray` | `#6B665F` | Secondary text | Primary text, backgrounds |
| `charcoal` | `#1E1B18` | Primary text | Backgrounds at scale |
| `spicePop` (Accent Energy) | `#F4A11A` | Notification dots, "new" labels, participation badges, small attention moments | CTA background, large backgrounds, anywhere beside the logo |
| `success` (Fresh Basil) | `#5F8B4C` | Success/confirmation states | — |
| `urgency` (Burnt Pepper) | `#B84D1B` | Limited availability, remaining-quantity indicators — text/icon only | Large backgrounds, general alerts |
| `error` (Muted Terracotta) | `#B44C42` | Errors, failed actions, validation | Bright/alarming treatments |
| `palmCream` (seasonal) | `#F4C16D` | Background highlights, empty states, illustrations, onboarding — atmosphere only | Logo, CTA, navigation, primary identity |
| `secondaryCta.border` | `#D8B2A8` | Secondary CTA button border/text | Primary CTA fills |
| `surface.altWarmWhite` | `#FCFAF7` | Alternate near-white panel background, used to separate stacked light sections without a hard edge | Primary page background (use warmWhite for that) |
| `surface.divider` | `#DCCFC4` | Divider lines, subtle section separators | Text, borders on interactive elements (use lightClay) |
| `surface.successTint` | `#EAF3EB` | Pale background behind a success/confirmation state, paired with success text | General backgrounds |

Colors above the line come straight from the brand guideline PDF. The four below the line surfaced once I extracted the actual pixel colors from the redesign's SVG export — they're real, deliberate design decisions the guideline's abridged palette didn't spell out, not new additions I invented. Treat them as canon.

## Layout (measured, not estimated)

Pulled directly from the SVG export's actual coordinates: **1280px page width, 80px side margins, 1120px content max-width**. This is the desktop breakpoint only.
Mobile breakpoint: **402px page width, 20px side margins, 363px content max-width**.

Neutrals should occupy 70–80% of every screen. If a page feels colorful, that's a bug, not a style choice.

## Typography

- **Figtree** — system/UI voice. Navigation, buttons, labels, forms, captions, all marketing body copy, microcopy. Weights: 400/500/600/700 only.
- **Lora** — editorial voice. Section headlines, the Hero H1, Drop step titles, Founder's Note headlines and body. Weights: 400/500/600 only.
- Never mix both typefaces inside a single block of text.
- Never use Lora for UI chrome (buttons, nav, forms, data).
- Never use Figtree for long-form editorial reading.
- No ExtraBold/Black weights, ever. No condensed styles. No script/hand-drawn fonts. No all-caps paragraphs (eyebrow labels are the one intentional uppercase exception, always at 1.2px tracking).

## Text styles (`tokens.json` → `typography.textStyles`)

- `editorial-display`: Lora 48px, weight 600, line-height 1.15 (Hero H1 only)
- `editorial-display-italic-accent`: Lora 48px, weight 500 italic, line-height 1.15 (Hero H1 "becomes meals." in Clay)
- `editorial-title`: Lora 40px, weight 600, line-height 1.2 (Section H2s)
- `editorial-subtitle-small`: Lora 20px, weight 500, line-height 1.4 (Drop step titles)
- `editorial-quote`: Lora 20–32px italic, weight 400, line-height 1.5 (Italic taglines and speech-bubble quotes)
- `ui-body`: Figtree 16px, weight 400, line-height 1.5 (Main paragraph copy)
- `ui-body-small`: Figtree 14px, weight 400, line-height 1.5 (Secondary/supporting copy)
- `ui-caption`: Figtree 13px, weight 400, line-height 1.4 (Attribution lines, small metadata)
- `ui-caption-micro`: Figtree 11px, weight 400, line-height 1.4 (Smallest card metadata)
- `ui-button`: Figtree 14–16px, weight 600, line-height 1.2 (All CTAs)
- `ui-heading-h3`: Figtree 24px, weight 600, line-height 1.3 (Largest meal card title)
- `ui-heading-h5`: Figtree 18px, weight 600, line-height 1.4 (Smaller meal card titles)
- `eyebrow-label`: Figtree 12px, weight 600, uppercase, 1.2px tracking (Section labels: "THE GAP", "FOR CREATORS")

## Shadows
- `elevation1`: `0px 2px 8px rgba(0,0,0,0.06)`
- `elevation2`: `0px 4px 12px rgba(0,0,0,0.08)`

## Motion
- Only opacity fades, ≤300ms.
- No bounce, pulse, rotation, or continuous/looping animation — this includes the logo, the sticky nav's background transition, and any button micro-interaction.
- Exception: button's optimistic state change (e.g. "I'd order this" → "Interested ✓") should feel instant, not animated.

## Imagery
- Documentary, warm, editorial, human. Hands serving food, kitchen environments, steam, movement, preparation, real creator/community moments.
- Never: isolated food on white backgrounds, stock imagery, heavy filters, overly staged shots.
- Scrim: 80–90% scrim behind text when placed over food imagery; WCAG AA contrast preserved.

## Explicit Don'ts
- No gradients on any brand color.
- No neon or electric colors, no cool tech blues/purples.
- No drop shadows, glows, or strokes added to the logo.
- No decorative badges or containers around the logo.
- No recoloring the logo for campaigns/seasons.
- No dense tiled background patterns.

## Governing Principle
"Food should be remembered first. The interface should simply create the conditions for it."
