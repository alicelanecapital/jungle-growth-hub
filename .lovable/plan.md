## Reference-matched botanicals + darker cream + Canela-style typography

### 1. Illustration overhaul — replace SVGs with AI-generated engraved line art

Generate a bespoke set of dense, cross-hatched line drawings in the style of the uploaded reference (fine ink linework on cream, wild but composed). Save to `src/assets/` as PNGs with transparent backgrounds so they sit on any section colour.

Assets to generate (premium quality, `imagegen--generate_image`):

- `hero-scene.png` (1600×1200, transparent) — the full reference scene reimagined: king protea, aloe with kniphofia spike, pincushion, silver tree, sunbird perched, springbok head-and-horns on the right. This becomes the hero right-column feature.
- `divider-fynbos.png` (1920×520, transparent) — wide horizontal band: mixed proteas, pincushions, restio sprays, small blossom clusters. Used behind "How it works" and above the footer.
- `divider-proteas.png` (1920×420, transparent) — three king proteas with foliage, dense linework, sitting on an implied baseline. Used under `Network`.
- `accent-protea.png` (600×800, transparent) — single king protea sprig. Corner mark for `WhyExists` / `Partnership`.
- `accent-pincushion.png` (600×800, transparent) — single leucospermum on a bent stem. Corner mark for `AreYouAFit`.
- `accent-aloe.png` (600×800, transparent) — single aloe rosette with kniphofia. Corner mark for `WhyEquityMatters`.
- `accent-sprig.png` (500×500, transparent) — small foliage cluster with berries. Used inline near section labels.

Prompt spine (shared across generations for consistency):

> Vintage engraved botanical line illustration, fine ink linework, tight cross-hatching for shading, no fills, sepia-black strokes on solid white background, hand-drawn scientific illustration style, dense wild composition with negative space above, no text, no frame, no watermark, style of 19th century botanical plates crossed with a modern editorial hero, ultra-detailed, museum-quality.

After each generation, QA by viewing the PNG and regenerate if strokes look pixelated, colored, or if unwanted text/labels appear.

### 2. Wire the assets into the existing components

Keep the component filenames (`Protea.tsx`, `PalmFrond.tsx`, `MarulaBranch.tsx`, `Vine.tsx`, `RootSystem.tsx`, `LeafSprig.tsx`) so no section imports have to change. Each becomes a thin wrapper that renders an `<img>` of the matching asset with `loading="lazy"` and an `aria-hidden`. The `DrawOnView` wrapper switches from stroke-dashoffset to a fade+rise (opacity 0→1, translateY 12px→0, 900ms ease-out) since PNGs can't be stroke-animated. `prefers-reduced-motion` still short-circuits to instant reveal.

Mapping:
- `Protea.tsx` → `accent-protea.png`
- `PalmFrond.tsx` → `hero-scene.png` (asset now carries the whole hero scene; `Hero.tsx` will drop the separate `Protea` overlay and just render this)
- `MarulaBranch.tsx` → `accent-aloe.png`
- `Vine.tsx` → `divider-fynbos.png`
- `RootSystem.tsx` → `divider-proteas.png`
- `LeafSprig.tsx` → `accent-sprig.png`

New: `AccentPincushion.tsx` (used in `AreYouAFit`) — the plan intentionally adds one new component rather than repurpose an existing one, because pincushion is a distinct silhouette from anything already placed.

Section touch-ups to accommodate real illustration weight:
- `Hero.tsx` — remove the layered PalmFrond+Protea composition; render `hero-scene.png` as a single image filling the right 5-column slot, bleeding to the top and right edge, opacity ~0.92 so it never overpowers the headline.
- `HowItWorks.tsx` — swap the thin Vine for `divider-fynbos.png` above the six steps, height ~140px, `object-cover object-bottom` so only the tops of the plants show.
- `Network.tsx` — replace `RootSystem` with `divider-proteas.png` underneath the expertise list.
- `JoinCta.tsx` — swap the current MarulaBranch (dark section) for a white-inked variant: reuse `accent-aloe.png` with a CSS filter `invert(1) brightness(1.4)` at low opacity so it reads as pale line-art on midnight.

### 3. Cream/section background → #F8F5F1

Update `src/styles.css`:
- `--surface-muted` (or `--muted` if that's the token in play) → `oklch(0.955 0.006 75)` which resolves visually to ~`#F8F5F1` (warmer, slightly deeper than the current off-white).
- `--border` bumped one step darker to hold contrast against the new muted band: `oklch(0.87 0.006 70)`.
- Double-check `bg-surface-muted` / `bg-muted` utility usage across sections — no code changes needed if tokens are already wired.

QA by loading `/` and comparing the `WhyExists`, `HowItWorks`, `Network` bands against the pure-white `Hero`, `Partnership`, `WhyEquityMatters`. The transition should be clearly perceptible but still quiet.

### 4. Typography — Canela look-alike

Canela isn't free. Closest free substitute with the same warm, wide, slightly-flared serif character is **Fraunces** (Google Fonts, variable, has an `opsz` axis that mimics Canela's optical sizes) with **Fraunces** for display and **Inter** kept for body.

- Add `@fontsource-variable/fraunces` via `bun add`.
- In `src/styles.css`, `@import "@fontsource-variable/fraunces";` at the top (with other imports).
- Update `@theme` tokens: `--font-display: "Fraunces Variable", "Fraunces", Georgia, serif;`. Keep `--font-sans: "Inter Variable", "Inter", system-ui, sans-serif;` for body.
- Set Fraunces axes on the display class in `styles.css`: `font-variation-settings: "opsz" 96, "SOFT" 30, "WONK" 0;` for hero-size headings, `"opsz" 24` for smaller display uses — captures Canela's editorial warmth without the license.
- Retire `@fontsource/inter-tight` import and package (`bun remove @fontsource/inter-tight`). Keep `@fontsource-variable/inter` for body.
- Verify every `font-display` usage still reads well; adjust letter-spacing (`tracking-[-0.02em]` may need to relax to `-0.01em` because Fraunces sets wider than Inter Tight).

### Files

**New**
- `src/assets/hero-scene.png`
- `src/assets/divider-fynbos.png`
- `src/assets/divider-proteas.png`
- `src/assets/accent-protea.png`
- `src/assets/accent-pincushion.png`
- `src/assets/accent-aloe.png`
- `src/assets/accent-sprig.png`
- `src/components/jungle/botanicals/AccentPincushion.tsx`

**Rewritten** (thin `<img>` wrappers; same exports)
- `src/components/jungle/botanicals/{Protea,PalmFrond,MarulaBranch,Vine,RootSystem,LeafSprig}.tsx`
- `src/components/jungle/botanicals/DrawOnView.tsx` (fade+rise instead of stroke draw)

**Edited**
- `src/styles.css` (muted/border tokens, Fraunces import, display token, retire Inter Tight)
- `src/components/jungle/sections/{Hero,HowItWorks,Network,JoinCta,AreYouAFit}.tsx` (asset placement + minor tracking tweaks)
- `package.json` / `bun.lock` (add `@fontsource-variable/fraunces`, remove `@fontsource/inter-tight`)

### Out of scope
- Copy, section order, and routing untouched.
- No commercial Canela files — if the user later provides them, swapping the `@font-face` is a one-line change.
- No new content sections or new pages.
