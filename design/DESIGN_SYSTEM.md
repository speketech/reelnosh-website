# Reelnosh Design System
Generated from `Reelnosh_Comprehensive_Brand_Guidelines.pdf`. This file is the human-readable companion to `design/tokens.json` (machine-readable) and `tailwind.config.ts` (implementation). If the three ever disagree, `tokens.json` wins — fix the others to match it.

## Color

| Token | Hex | Use for | Never use for |
|---|---|---|---|
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

Neutrals should occupy **70–80% of every screen.** If a page feels colorful, that's a bug, not a style choice.

## Typography

- **Figtree** — system/UI voice. Navigation, buttons, labels, forms, captions, all marketing body copy, microcopy. Weights: 400/500/600/700 only.
- **Lora** — editorial voice. Founder's Note headlines and body, long-form storytelling, brand essays. Weights: 400/500/600 only.
- Never mix both typefaces inside a single block of text.
- Never use Lora for UI chrome (buttons, nav, forms, data).
- Never use Figtree for long-form editorial reading.
- No ExtraBold/Black weights, ever. No condensed styles. No script/hand-drawn fonts. No all-caps paragraphs.

## Text styles (`tokens.json` → `textStyles`)

| Style | Face | Size | Weight | Use |
|---|---|---|---|---|
| `ui-body` | Figtree | 16px | 400 | Main content |
| `ui-label` | Figtree | 13px | 500 | Labels |
| `ui-button` | Figtree | 15px | 600 | CTAs |
| `ui-heading` | Figtree | 22px | 600 | Section headings |
| `editorial-title` | Lora | 36px | 600 | Story/note titles |
| `editorial-subtitle` | Lora | 22px | 500 | Lead-ins |
| `editorial-body` | Lora | 17px | 400 | Long-form body |

## Motion

- Only opacity fades, ≤300ms.
- No bounce, pulse, rotation, or continuous/looping animation — this includes the logo, the sticky nav's background transition, and any button micro-interaction.
- Exception carved out deliberately in the technical guide: a button's **optimistic state change** (e.g. "I'd order this" → "Interested ✓") should feel instant, not animated — a state swap, not a motion effect.

## Imagery

- Documentary, warm, editorial, human. Hands serving food, kitchen environments, steam, movement, preparation, real creator/community moments.
- Never: isolated food on white backgrounds, stock imagery, heavy filters, overly staged shots.
- Any image behind text needs an 80–90% scrim and must preserve WCAG AA contrast. Deep Clay text is never placed directly on food photography.
- "If an image feels timeless, perfect, or reusable anywhere, it's probably not Reelnosh."

## Explicit don'ts (the list Antigravity needs told to it directly, because agents default to these)

- No gradients on any brand color.
- No neon or electric colors, no cool tech blues/purples.
- No drop shadows, glows, or strokes added to the logo.
- No decorative badges or containers around the logo.
- No recoloring the logo for campaigns/seasons.
- No dense tiled background patterns (max 15–35% visual coverage, large motif spacing only, if used at all).

## Governing principle

"Food should be remembered first. The interface should simply create the conditions for it." Every design decision in this system — including every technical shortcut proposed elsewhere in the build — should be checked against this line before it ships.
