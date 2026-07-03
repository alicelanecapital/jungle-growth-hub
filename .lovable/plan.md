# Typography, teal, and botanical restraint pass

## 1. Display font → Cormorant Garamond

- Replace `@fontsource-variable/fraunces` with `@fontsource/cormorant-garamond` (weights 400/500/600) in `package.json` via `bun add`; remove the fraunces dep.
- In `src/styles.css`:
  - Swap the two fraunces `@import`s for cormorant-garamond weight imports (kept at the top of the file, before `@theme`).
  - Update `--font-display` to `"Cormorant Garamond", Georgia, "Times New Roman", serif`.
  - Remove `font-variation-settings` from `h1..h4` and the `.font-display` utility (Cormorant Garamond is not a variable font — those settings are noise).
  - Keep `letter-spacing: -0.015em` on headings.

## 2. Darker teal accent

- Update `--accent-teal` in `:root` from `oklch(0.86 0.035 200)` to `oklch(0.62 0.07 200)` — a deeper, more saturated teal that reads clearly on white without shouting. Roughly `#4E8A8E`.
- No changes to which elements use `text-accent-teal`; only the token value changes.

## 3. Lighten the botanical illustrations globally

Right now several sections use foreground opacities of `0.7–0.95`, which makes the art dominate. Cap all decorative art at `opacity-30`, and push background washes down to `opacity-[0.06]`. Per-section edits (only `className` opacity values change — no repositioning, no new assets):

- **Hero** (`Hero.tsx`): `PalmFrond` `opacity-90` → `opacity-25`; `LeafSprig` `opacity-60` → `opacity-20`.
- **WhyExists** (`WhyExists.tsx`): `Protea` `opacity-80` → `opacity-20`; `Vine` wash `opacity-[0.12]` → `opacity-[0.06]`.
- **Partnership** (`Partnership.tsx`): `MarulaBranch` `opacity-70` → `opacity-20`; `LeafSprig` `opacity-[0.09]` → `opacity-[0.06]`.
- **HowItWorks** (`HowItWorks.tsx`): `Vine` band `opacity-70` → `opacity-20`; `AccentPincushion` `opacity-75` → `opacity-25`.
- **WhyEquityMatters** (`WhyEquityMatters.tsx`): both botanicals stay at `opacity-[0.06]` (down from `0.08`).
- **Network** (`Network.tsx`): bottom-bleed divider `opacity-85` → `opacity-25`; corner sprig `opacity-70` → `opacity-20`.
- **AreYouAFit** (`AreYouAFit.tsx`): `AccentPincushion` `opacity-80` → `opacity-25`; background aloe stays at `opacity-[0.06]`.
- **JoinCta** (`JoinCta.tsx`): inverted marula `opacity-30` → `opacity-20`; second sprig `opacity-25` → `opacity-15` (already light; dark bg needs restraint).

## 4. Keep text off the line drawings

Audit each section and reposition art so it never overlaps the reading column. Rules:

- Body/heading columns keep their current placement; art moves to margins, gutters, or the section's non-text edge.
- Where a section currently has art crossing the text column, push it further off-screen (increase negative offset) or shrink it so it clears the text bounds.

Concrete adjustments:

- **Hero**: `PalmFrond` currently at `-right-[8vw] -bottom-[6vw] w-[62vw]` overlaps the CTA row and paragraph tail. Move to `-right-[14vw] -bottom-[10vw] w-[46vw]` so it clears the `max-w-3xl` text column entirely (text is left-aligned).
- **WhyExists**: `Protea` at `-bottom-32 -right-16 w-[28vw]` sits under the paragraph on wide screens. Move to `-bottom-40 -right-24 w-[22vw]`; Vine wash stays (it's background, and opacity is now 0.06).
- **Partnership**: `MarulaBranch` from left overlaps the H2. Move to `-left-40 top-8 w-[18vw]` (further out, smaller) and drop the faint `LeafSprig` behind the paragraph column entirely — replace with a bottom-right corner placement `absolute -bottom-16 -right-16 w-[16vw] opacity-[0.06]` so no art sits under the paragraph.
- **HowItWorks**: The `Vine` band spans `-top-16 left-0 right-0` and crosses the eyebrow row. Move to `-top-24` so it sits above the section header rather than through it. `AccentPincushion` at `-bottom-24 -right-20` is fine (clears the step grid on the right edge).
- **WhyEquityMatters**: The two center-anchored botanicals sit directly behind the centered quote. Move both outward so the quote sits in clean whitespace: left protea `-left-[28vw]`, right marula `-right-[28vw]`, and shrink to `w-[26vw]`.
- **Network**: Bottom-bleed divider stays (it's below the text). Corner sprig at `-top-10 right-8 w-40` — move to `-top-14 right-4 w-32` to keep it out of the eyebrow/H2 area.
- **AreYouAFit**: `AccentPincushion` at `-top-16 -right-24 w-[26vw]` currently crosses into the right column of the checklist. Move to `-top-24 -right-32 w-[20vw]`. Background aloe on the left stays behind, opacity 0.06.
- **JoinCta**: Inverted marula `-right-32 -top-16 w-[46vw]` overlaps the H2/CTA on the right side. Move to `-right-[18vw] -top-24 w-[34vw]`. Second sprig at `-bottom-20 -left-20 w-64` — move to `-bottom-24 -left-24 w-52` so it clears the button row.

## 5. Files touched

- `package.json`, `bun.lock` (font dep swap)
- `src/styles.css` (imports, `--font-display`, `--accent-teal`, remove variable-font settings)
- `src/components/jungle/sections/Hero.tsx`
- `src/components/jungle/sections/WhyExists.tsx`
- `src/components/jungle/sections/Partnership.tsx`
- `src/components/jungle/sections/HowItWorks.tsx`
- `src/components/jungle/sections/WhyEquityMatters.tsx`
- `src/components/jungle/sections/Network.tsx`
- `src/components/jungle/sections/AreYouAFit.tsx`
- `src/components/jungle/sections/JoinCta.tsx`

## Out of scope

- No new PNG generation or asset edits.
- No changes to `DrawOnView` or botanical component internals.
- No copy, layout grid, or apply-flow changes.
