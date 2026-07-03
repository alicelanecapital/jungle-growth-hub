## Rework botanicals into sparse, wild South African flora line drawings

Replace the current geometric/tidy SVG botanicals with looser, hand-drawn South African fynbos illustrations. Keep the same component API and placements so the editorial layout, whitespace, and draw-on-scroll animation continue to work — only the SVG paths change.

### Aesthetic direction
- **Wild + messy**: irregular, hand-drawn Bezier curves rather than mathematical loops/ellipses. Off-centre, asymmetric, some lines overshoot, some paths trail off.
- **Sparse**: fewer strokes per illustration than today (e.g. Protea currently has ~36 ellipses + 22 radial lines — cut to a single expressive bloom with 8–12 bracts and a rough seed cluster). Empty canvas dominates.
- **Ink-sketch weight**: `stroke-width` varied 0.8–1.4 across paths for life; `strokeLinecap="round"`, no fills. Occasional broken/dashed stroke fragments to suggest texture without shading.
- **South African fynbos vocabulary**: king protea, pincushion (leucospermum), restio grass, silver tree leaf, aloe, strelitzia (crane flower). Retire the generic palm frond and marula that read as tropical/anywhere.

### Component changes (same file paths, same exports — drop-in replacements)

- `Protea.tsx` → **King Protea**: single off-centre bloom, ~10 loose petal-bracts drawn as irregular teardrops with wobble, sparse inner filament cluster (8–10 lines of varying length, not radial-perfect), one leaning stem with 2 rough leaves.
- `PalmFrond.tsx` → **Strelitzia (Crane Flower)**: tall angular stem, one bird-of-paradise bloom head with 3–4 spiked bracts fanning asymmetrically, 2 large paddle leaves lower down drawn as single continuous outlines with a few vein hints.
- `MarulaBranch.tsx` → **Silver Tree branch**: diagonal branch with sparse, elongated pointed leaves clustered irregularly (not the current even grid of 16 ellipses). Some leaves as outlines, some as single centre-stroke suggestions.
- `Vine.tsx` → **Restio grass line**: horizontal band of thin vertical grass stalks of varying heights with occasional seed nodes, replacing the current wavy vine + ellipse beads. Reads as a wild savanna horizon.
- `RootSystem.tsx` → **Aloe cluster roots**: keep the rooting metaphor but redraw as an aloe rosette above ground with a few spiky leaves plus wild trailing roots below — asymmetric, one side sparser than the other.
- `LeafSprig.tsx` → **Pincushion sprig**: small leucospermum head (rough spiky ball, ~12 short radiating spines of uneven length) on a bent stem with 2 narrow leaves.

### Shared implementation notes
- Author paths by hand with intentional imperfection: control points offset asymmetrically, endpoints not meeting perfectly, occasional short "sketch stray" strokes near main forms.
- Introduce a tiny helper pattern inside each file (no new shared module) — mix `strokeWidth` values per `<path>` and add 1–2 `stroke-dasharray="2 6"` fragments per illustration for a scratchy ink feel.
- Keep `viewBox` dimensions unchanged where feasible so existing size/position classes in `Hero`, `HowItWorks`, `Network`, `JoinCta`, `WhyExists` don't need edits. Where a new silhouette needs a taller/wider box (likely Strelitzia and Silver Tree), update only the `h-*`/`w-*` utility on the single consuming section.
- `DrawOnView` continues to animate stroke-dashoffset; verify each new SVG's total path length still animates cleanly (round-cap + varied widths are fine).
- Respect `prefers-reduced-motion` (already handled in `DrawOnView`).

### Files
**Rewritten** (SVG contents only, same exports):
- `src/components/jungle/botanicals/Protea.tsx`
- `src/components/jungle/botanicals/PalmFrond.tsx` (now Strelitzia)
- `src/components/jungle/botanicals/MarulaBranch.tsx` (now Silver Tree)
- `src/components/jungle/botanicals/Vine.tsx` (now Restio band)
- `src/components/jungle/botanicals/RootSystem.tsx` (now Aloe + roots)
- `src/components/jungle/botanicals/LeafSprig.tsx` (now Pincushion)

**Touched only if sizing needs a tweak** after swap:
- `src/components/jungle/sections/Hero.tsx`, `HowItWorks.tsx`, `JoinCta.tsx` (adjust `h-*` classes on the illustrations if new viewBoxes change aspect ratio)

### Out of scope
- No layout, copy, palette, typography, or route changes.
- No new dependencies; still pure inline SVG.
- Component/file names stay the same to avoid churn across sections.
