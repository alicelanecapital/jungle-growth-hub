
## The Jungle — SME Screening Questionnaire

A 14-question conversational screening at `/apply`, persisted to Lovable Cloud, with an outcome screen and emailed results to your internal team. Existing landing CTAs route into it. The whole site shifts to a lush, layered "jungle" palette drawn from the attached reference.

---

### 1. Global rebrand — lush jungle palette (from reference image)

The reference is deep, layered jungle foliage: saturated emerald and forest greens dominating, with hot flashes of marigold/amber, sunset orange, and small jewel hits of magenta and cobalt peeking through. We keep that energy but tune it for a high-trust, readable interface — saturated accents on a calm, paper-warm canvas, not a neon explosion.

Replace tokens in `src/styles.css` (all `oklch`):

- **Background** `--background`: warm paper `oklch(0.98 0.012 90)` — the "light through canopy" off-white
- **Foreground** `--foreground`: deep canopy `oklch(0.20 0.05 155)` — near-black with green undertone
- **Primary** `--primary`: emerald canopy `oklch(0.45 0.13 155)` — the dominant leaf green
- **Primary-glow** `--primary-glow`: lit-leaf `oklch(0.62 0.16 150)` — backlit highlight
- **Accent** `--accent`: marigold `oklch(0.78 0.16 75)` — the sunlit yellow-orange burst
- **Accent-warm** `--accent-warm`: sunset ember `oklch(0.65 0.18 45)` — for hover/active warmth
- **Secondary** `--secondary`: moss `oklch(0.55 0.07 145)`
- **Muted** `--muted`: pale frond `oklch(0.94 0.02 130)`
- **Border** `--border`: dry-stem `oklch(0.86 0.03 120)`
- **Jewel hits** (used sparsely, for chart states / badges only): magenta `oklch(0.60 0.22 5)`, cobalt `oklch(0.50 0.18 255)`
- Gradients:
  - `--gradient-canopy`: emerald → moss (hero, primary CTAs)
  - `--gradient-sun-through-leaves`: marigold → ember (progress bar, outcome GREEN accent)
- `--shadow-canopy`: soft layered shadow with a faint green tint, mimicking light filtering through layers

Typography stays Inter + Space Grotesk (approachable, not corporate).

**Organic motif system** — `OrganicLines` SVG component renders thin, hand-sketched fronds and curved geometric leaf-ribs in `--primary` and `--accent` at low opacity (8–14%). Used as:
- Fixed background pattern on `/apply` (sparse, top-right + bottom-left only — never busy)
- Section dividers on landing
- A single large frond watermark behind the outcome screen

No photographic jungle imagery and no literal use of the reference image — it's color and energy reference only. The interface stays clean, generous in whitespace, and grounded.

Existing `Logo`, `LandingView`, `DashboardView` continue to work via tokens; a quick visual pass to confirm contrast on the new palette.

---

### 2. Routing & entry points

- New file `src/routes/apply.tsx` → `/apply`, with its own `head()` (title, description, og tags)
- Landing CTAs ("Join The Jungle", hero + pricing buttons) become `<Link to="/apply">`
- Nav adds "Apply" link; sticky view-switcher unchanged (Landing | Member Dashboard)
- `src/routes/apply.result.$id.tsx` for deep-linking a saved outcome (RLS-scoped)

---

### 3. Lovable Cloud schema

Enable Lovable Cloud. Single migration:

```text
applications
  id uuid pk
  user_id uuid null            -- nullable: anonymous submissions allowed
  contact_email text not null
  contact_name text
  answers jsonb not null       -- raw q1..q14
  derived jsonb not null       -- flags: sa_fit, revenue_band, gov_pct, etc.
  outcome text not null check in ('green','amber','red')
  outcome_reasons text[]
  status text default 'submitted'
  created_at timestamptz default now()
```

Plus GRANTs, RLS enabled. Policies:
- `INSERT` allowed to `anon` + `authenticated`
- `SELECT` only to `authenticated` where `user_id = auth.uid()`
- Anonymous result page renders from the in-memory submit response, not a refetch

No login required to apply. Email captured at the end as the contact handle.

---

### 4. Questionnaire UX

Under `src/components/jungle/apply/`:

- `ApplyShell.tsx` — paper background, sparse `OrganicLines` motif, centered card on desktop, edge-to-edge on mobile
- `ProgressHeader.tsx` — "Question 3 of 14" + slim sun-through-leaves gradient progress bar + section label
- `QuestionCard.tsx` — large headline, supporting "why we ask" note, input, primary Continue + ghost Back
- Inputs: `RadioGroup`, `CheckboxGroup`, `CurrencyInputZAR` (comma format, soft note outside R50k–R10m, no block), `PercentSlider` (>50% inline warning), `LongText` (min-length nudge on Q12)
- `ConditionalFollowup.tsx` — inline expansion for Q7, Q8 follow-ups
- `SaveProgressPrompt.tsx` — fires after Q7 if elapsed > 3 min; "Email me a link to continue" writes a draft + emails resume link
- `OutcomeScreen.tsx` — Green / Amber / Red variants with distinct OrganicLines iconography (lit frond / marigold sun / dry stem), clear next steps, print-optimized "Save as PDF" via `window.print()`

State: single `useReducer` in `apply.tsx` holding `answers`, `currentIndex`, `startedAt`. Conditional logic computed from `answers` (Q1 = "elsewhere" jumps to RED; Q7 follow-up only on "Yes" options).

Tone uses the brief's exact copy. Errors are plain ("We need a number here, even a rough one"). No "applicant" language.

---

### 5. Outcome logic (server-side)

`createServerFn` `submitApplication` — Zod-validates, computes outcome, inserts, triggers email, returns `{ id, outcome, reasons }`:

**Auto-RED**: Q1 = "elsewhere"; Q3 empty; Q9 = "won't share"; Q5 > 80% AND Q13 lacks diversification mention; VC-style tech with no revenue evidence.

**AMBER**: Q8 not "completely separate" AND follow-up = "Not sure/No"; Q12 too generic (<80 chars / stopword-only); Q9 = "we'd struggle"; Q5 between 50–80%.

**GREEN**: SA fit + revenue evidence + accountable founder (Q6) + Q8/Q9 acceptable + Q12 specific.

Reasons stored as `text[]` for internal review.

---

### 6. Email delivery

Lovable Emails (built-in). After `email_domain--setup_email_infra` + `scaffold_transactional_email`:

- `application-internal.tsx` → internal address (`JUNGLE_INTAKE_EMAIL` secret), full answers + outcome + reasons + contact
- `application-applicant.tsx` → founder, outcome message (Green/Amber/Red copy from brief) + link back to `/apply/result/$id`
- Idempotency key `application-${id}`

Queued by infra; no spinners.

---

### 7. Mobile-first

- Single column, 17px base, large tap targets
- Sticky bottom bar (Back / Continue) on mobile
- Native `<input type="range">` styled with marigold thumb
- Currency input `inputMode="decimal"`
- Progress bar sticky top, condenses to "3 / 14" on narrow screens

---

### 8. Technical notes

- `src/routes/apply.tsx` — public, SSR on, head() meta
- `src/routes/apply.result.$id.tsx` — public; loader uses `getApplicationOutcome` public server fn returning only `{ outcome, created_at }` via publishable-key client + narrow `TO anon` SELECT on a view; full details only for the owner
- `src/lib/applications.functions.ts` — `submitApplication`, `getApplicationOutcome`
- Zod schema mirrors all 14 questions; server recomputes outcome (never trust client)
- Resume tokens in `application_drafts` with short-lived signed token
- PDF v1: print-optimized stylesheet + `window.print()`; can upgrade to `@react-pdf/renderer` later

---

### Files

**New**
- `src/routes/apply.tsx`, `src/routes/apply.result.$id.tsx`
- `src/components/jungle/apply/` (ApplyShell, ProgressHeader, QuestionCard, OutcomeScreen, OrganicLines, inputs, Q01..Q14)
- `src/components/jungle/apply/logic.ts` (shared flow + outcome calculator)
- `src/lib/applications.functions.ts`
- `src/lib/email-templates/application-internal.tsx`, `application-applicant.tsx`
- Migration: `applications`, `application_drafts`, public view + policies + grants

**Edited**
- `src/styles.css` (jungle palette tokens + gradients + shadow)
- `src/routes/__root.tsx` (nav adds Apply link)
- `src/components/jungle/landing/LandingView.tsx` (CTAs → `/apply`)
- `src/components/jungle/ViewSwitcher.tsx` (verify against new palette)

---

### Out of scope

- Admin review dashboard (later under `_authenticated/admin`)
- Founder login / accounts (anonymous submit; email is the handle)
- Heavy PDF library (print stylesheet for v1)
