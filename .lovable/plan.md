## The Jungle — full rebuild as an editorial founder ecosystem

Replace everything currently at `/` (landing, dashboard preview, view-switcher) and rework `/apply` from the 14-question screener into the reflective "Join the Jungle" story-form. The site reads like a magazine, not a SaaS page.

---

### 1. Global rebrand — white-canvas editorial

Rewrite `src/styles.css` tokens:

- `--background` pure white `oklch(1 0 0)`
- `--foreground` midnight blue `oklch(0.20 0.09 265)` (≈ `#031C4D`)
- `--primary` same midnight blue
- `--muted` warm off-white `oklch(0.985 0.004 90)` for section bands
- `--border` hairline `oklch(0.90 0.005 260)`
- Accent tokens used sparsely, one per section max:
  - `--accent-green` muted sage `oklch(0.55 0.06 155)`
  - `--accent-gold` `oklch(0.72 0.12 80)`
  - `--accent-red` deep bordeaux `oklch(0.42 0.14 25)`
  - `--accent-royal` royal blue `oklch(0.45 0.16 260)`
- Retire gradient utilities (`bg-canopy-gradient`, `bg-ember-gradient`). Replace with hairline dividers and generous whitespace.

Typography via `@fontsource/inter-tight` (display) + `@fontsource/inter` (body), imported in `src/router.tsx` bootstrap. Display sizes are large (clamp 48–96px on hero), line-height loose, tracking tight. Body 17–19px, generous leading, max-width ~62ch.

Layout system: 12-column editorial grid, asymmetric — headings sit in cols 2–7, body flows cols 4–9, botanical marks anchor cols 8–12. Section vertical rhythm 160–240px.

### 2. Bespoke botanical illustration system

New `src/components/jungle/botanicals/` with hand-authored inline SVGs:
- `PalmFrond.tsx`, `MarulaBranch.tsx`, `Protea.tsx`, `RootSystem.tsx`, `LeafSprig.tsx`, `Vine.tsx`
- Single-stroke ink style, `stroke-current` at 1.25px, no fills, viewBox tuned so each can render 200–900px cleanly
- Wrapper `DrawOnView.tsx` uses `IntersectionObserver` + `stroke-dasharray` / `stroke-dashoffset` animated over 1.6–2.4s ease-out when the element enters the viewport; `prefers-reduced-motion` disables it

### 3. Route + page structure

- **Delete**: `src/components/jungle/ViewSwitcher.tsx`, `src/components/jungle/dashboard/`, `src/components/jungle/landing/`, `src/components/jungle/apply/OrganicLines.tsx`
- **Rewrite** `src/routes/index.tsx` — no more view switcher. Single scrolling editorial page composed of section components under `src/components/jungle/sections/`:
  - `SiteHeader.tsx` — thin, white, wordmark left + anchor nav (Why · How · Network · Join) + subtle "Join the Jungle" text link right. Fades between sections via IntersectionObserver highlighting active anchor.
  - `Hero.tsx` — asymmetric split. Right ~40% holds a large `PalmFrond` + `Protea` composition that draws itself on load. Left: "Where startups grow." (display, ~88px), subheading, body paragraph, two CTAs (`Join the Jungle` filled midnight, `How it works` text link with arrow).
  - `WhyExists.tsx` — full-bleed white, single column, editorial paragraph. Small `LeafSprig` in top-right corner.
  - `Partnership.tsx` — two-column: pull-quote left ("We build alongside founders."), paragraph right. Muted sage hairline divider.
  - `HowItWorks.tsx` — six numbered steps (Discover · Diagnose · Understand · Partner · Invest · Build · Grow) laid out as a horizontal editorial timeline on desktop (scroll-snap, no carousel arrows), vertical stack on mobile. Each step: numeral in gold, short heading, one sentence. `Vine.tsx` runs across the top connecting nodes, drawing on scroll.
  - `WhyEquityMatters.tsx` — short manifesto section, single centered column, deep-red accent word.
  - `Network.tsx` — heading "No founder builds alone." followed by a two-column list of expertise areas (Law · Finance · Marketing · Sales · Operations · Technology · Product · Strategy · Leadership) rendered as editorial list, not cards. `RootSystem.tsx` illustration underneath.
  - `AreYouAFit.tsx` — heading + body + reflective checklist (6 items). Checkboxes are custom ink-style ticks. Purely reflective — no state posted, just self-assessment. Ends with a text CTA to `/apply`.
  - `JoinCta.tsx` — large closing spread. `MarulaBranch` illustration, single "Join the Jungle" button routing to `/apply`.
  - `SiteFooter.tsx` — wordmark, "A curated founder ecosystem by Alice Lane Capital.", minimal links.
- **Rewrite** `src/routes/apply.tsx` — new reflective story-form (see §4). Discard the 14-question screener UI and outcome engine.

### 4. `/apply` — reflective Join form

Editorial, single-page, one question per screen with soft slide transitions. Seven prompts from the brief:
1. Tell us about your business.
2. What problem are you solving?
3. What inspired you to start it?
4. What progress have you made so far?
5. What challenge keeps you awake at night?
6. Why do you believe The Jungle is the right place for your business?
7. If we partnered with you, what would success look like in three years?

Plus a short identity block at the end (founder name, business name, email). Progress rendered as a hairline that fills across the top — no "3 / 7" chrome. Continue is a text button with an ink underline; Back is subtle.

Submission: replace `src/lib/applications.functions.ts` with a new `submitApplication` server fn that Zod-validates and inserts into a redesigned table via a fresh migration:

```
applications
  id uuid pk
  founder_name text not null
  business_name text not null
  contact_email text not null
  responses jsonb not null   -- { q1..q7 }
  status text default 'submitted'
  created_at timestamptz default now()
```

Drop the old `outcome` / `outcome_reasons` / `derived` columns and the 14-question schema (migration drops and recreates the table). RLS: anon INSERT, authenticated SELECT where `user_id = auth.uid()` — kept nullable for future account use. GRANTs to anon (INSERT), authenticated, service_role.

Outcome screen is a quiet thank-you spread, not a Green/Amber/Red verdict. "We read every submission. If there's alignment, we'll be in touch." Botanical mark, single link back home.

### 5. Head metadata & motion

- Update root `head()` in `src/routes/__root.tsx`: title "The Jungle — A curated founder ecosystem", matching description, og tags. Remove the stale preview screenshot og:image (leave og:image off the root; add per-route on `/apply` only if we have a real image).
- Nav link fades: `opacity` transition on active section change.
- Buttons: no scale, no shadow — 1px underline reveal or midnight fill on hover, 180ms ease.
- Respect `prefers-reduced-motion` everywhere.

---

### Files

**New**
- `src/components/jungle/botanicals/{PalmFrond,MarulaBranch,Protea,RootSystem,LeafSprig,Vine}.tsx`
- `src/components/jungle/botanicals/DrawOnView.tsx`
- `src/components/jungle/sections/{SiteHeader,Hero,WhyExists,Partnership,HowItWorks,WhyEquityMatters,Network,AreYouAFit,JoinCta,SiteFooter}.tsx`
- `src/components/jungle/apply/{ApplyShell,ReflectiveQuestion,IdentityBlock,ThankYou}.tsx`
- `supabase/migrations/<ts>_reset_applications.sql` (drop + recreate + GRANTs + RLS + policies)

**Rewritten**
- `src/styles.css`, `src/routes/index.tsx`, `src/routes/apply.tsx`, `src/routes/__root.tsx`, `src/lib/applications.functions.ts`, `src/lib/jungle/questions.ts` (becomes the 7-prompt config)

**Deleted**
- `src/components/jungle/ViewSwitcher.tsx`, `src/components/jungle/landing/`, `src/components/jungle/dashboard/`, `src/components/jungle/apply/OrganicLines.tsx`, `src/routes/apply.result.$id.tsx` (if present)

### Out of scope
- Email delivery (no scaffolded email templates yet — submissions land in the DB; wire Lovable Emails in a follow-up)
- Auth / founder accounts
- Admin review UI
