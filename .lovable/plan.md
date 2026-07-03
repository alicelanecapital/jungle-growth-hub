# Botanicals as page composition + teal accent

## 1. New accent color: light teal

Sampled from the uploaded swatch: **#ABD7D8** (soft) and **#BFD1D3** (dusty).

In `src/styles.css`:
- Add token `--accent-teal: oklch(0.86 0.035 200);` (≈ #ABD7D8) to `:root`.
- Register in `@theme inline` as `--color-accent-teal: var(--accent-teal);`.
- This exposes `text-accent-teal`, `bg-accent-teal`, `border-accent-teal`.

Use it for **highlighted words inside headings/labels** only — not body copy, not buttons. Replace the current colored spans:
- `Partnership.tsx`: `<span class="text-accent-green">founders.</span>` → `text-accent-teal`
- `WhyEquityMatters.tsx`: `<span class="text-accent-red">accountability</span>` → `text-accent-teal`
- `Hero.tsx`: wrap "grow." in `<span class="text-accent-teal">grow.</span>`
- `AreYouAFit.tsx`: highlight "right for you" in H2 with `text-accent-teal`
- `JoinCta.tsx`: highlight "hear it." in H2 with `text-accent-teal` (on dark bg this reads as a soft mist)
- Section eyebrow numbers ("01 — Why", etc.): change the `01`/`02`/... digits to `text-accent-teal` (small, quiet, ties the labels together)

Retire `accent-green` / `accent-red` usage in these sections (tokens stay defined for now, unused).

## 2. Kill all botanical frames

Remove every container that boxes a botanical: no rounded rectangles, no bordered wrappers, no fixed hero image column, no `overflow-hidden` picture frames. Every `<img>` becomes a free-floating decoration positioned absolutely against the section (or the page), sized generously, cropped by the viewport / section edge, and non-interactive (`pointer-events-none`, `aria-hidden`).

Global rules for every botanical placement:
- `position: absolute` on the section (section stays `relative`), or `fixed` for one page-level piece.
- Anchor to an edge with negative offsets so the art is cropped: e.g. `-top-24 -right-32`, `-bottom-40 -left-20`.
- Size in viewport units so it feels page-scale, not card-scale: `w-[38vw]`, `w-[520px]` etc.
- No borders, no rings, no rounded corners, no shadows, no background fills on the wrapper.
- Low-opacity variants for behind-content usage: `opacity-[0.08]` to `opacity-20`; foreground accents: `opacity-70` to `opacity-95`.
- Keep `DrawOnView` fade-in but drop any wrapper that implied a frame.
- Section wrappers get `overflow-hidden` **only** where needed to crop cleanly at the section edge; otherwise let art bleed between sections.

### Per-section repositioning

- **Hero** — Remove the two-column layout that reserves a right image slot. Text spans full width (or `max-w-3xl` left-aligned). `hero-scene.png` becomes a **single large decoration** anchored `absolute -right-[8vw] -bottom-[6vw] w-[62vw] opacity-90`, cropped by the section, sitting behind the CTA row. A second small `accent-sprig.png` emerges from the top-left corner at `-top-10 -left-8 w-40 opacity-60`.
- **WhyExists** — Remove the right column pincushion frame. Place `accent-protea.png` `absolute -bottom-32 -right-16 w-[28vw] opacity-80`, cropped at section bottom so it bleeds into the next section. Add `divider-fynbos.png` as a background wash `absolute inset-x-0 bottom-0 h-40 w-full object-cover opacity-[0.12]`.
- **Partnership** — Add `accent-aloe.png` emerging from the **left edge** `absolute -left-24 top-20 w-[22vw] opacity-70`, wrapping around the H2. A faint `accent-sprig.png` sits behind the paragraph column at `opacity-[0.09]`.
- **HowItWorks** — Remove the framed vine strip. `divider-fynbos.png` becomes an **overlapping band** `absolute -top-16 left-0 right-0 h-56 object-cover object-bottom opacity-70`, spilling above the section border. Add `accent-pincushion.png` emerging from the **bottom-right** `absolute -bottom-24 -right-20 w-72 opacity-75`.
- **WhyEquityMatters** — Center quote stays clean; add two very faint background botanicals: `accent-protea.png` `absolute -left-40 top-1/2 -translate-y-1/2 w-[36vw] opacity-[0.08]` and `accent-aloe.png` mirrored on the right at the same opacity. Pure atmospheric wash behind typography.
- **Network** — Remove `RootSystem` centered image card. `divider-proteas.png` becomes a **bottom-bleed** `absolute -bottom-20 left-[-4vw] right-[-4vw] h-64 object-cover opacity-85`, cropped by the section bottom. Add `accent-sprig.png` emerging from the top-right `-top-10 right-8 w-40 opacity-70`.
- **AreYouAFit** — Remove the pincushion in the right slot. Reposition `AccentPincushion` `absolute -top-16 -right-24 w-[26vw] opacity-80`. Add `accent-aloe.png` behind the checklist column `absolute -left-32 bottom-10 w-[24vw] opacity-[0.09]`.
- **JoinCta** — Keep the inverted `MarulaBranch` but crop harder: `absolute -right-32 -top-16 w-[46vw] opacity-30`. Add a second inverted `accent-sprig.png` emerging from `-bottom-20 -left-20 w-64 opacity-25`.

### Botanical component tweaks

No visual changes to the `<img>` wrappers themselves — they already carry only className/style. The frames were in the **section files**, so all edits happen there. `DrawOnView` still wraps each placement to keep the fade-and-rise entrance.

## 3. Files touched

- `src/styles.css` — add `--accent-teal` token + mapping.
- `src/components/jungle/sections/Hero.tsx` — restructure to single-column text + edge-cropped background art.
- `src/components/jungle/sections/WhyExists.tsx` — remove right column, add cropped protea + wash divider, teal digit in eyebrow.
- `src/components/jungle/sections/Partnership.tsx` — add edge botanicals, swap `accent-green` → `accent-teal`.
- `src/components/jungle/sections/HowItWorks.tsx` — turn vine into overlapping band, add pincushion, teal digit.
- `src/components/jungle/sections/WhyEquityMatters.tsx` — atmospheric wash botanicals, swap `accent-red` → `accent-teal`.
- `src/components/jungle/sections/Network.tsx` — bottom-bleed divider + corner sprig, teal digit.
- `src/components/jungle/sections/AreYouAFit.tsx` — reposition pincushion, add background aloe, teal highlight in H2.
- `src/components/jungle/sections/JoinCta.tsx` — tighter crop on marula, add second inverted sprig, teal highlight in H2.

## Out of scope

- No new PNG generation — reuses the 7 existing assets.
- No font/layout changes to the apply flow.
- No changes to `botanicals/*.tsx` component internals.
