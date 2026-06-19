# The Jungle — Landing + Dashboard Preview

A single-page experience with a top toggle to switch between the public **Landing Page** and a **Member Dashboard** preview. Premium, minimalist, high-trust aesthetic tailored for South African MSMEs/SMEs.

## Design System

- **Palette:** Midnight Blue primary (`#0B1F3A`), off-white background (`#F7F8FA`), slate text, with a warm **Ember/Gold** accent (`#E8893B` → `#F2B544` gradient) pulled from the logo's circular mark. Used sparingly on CTAs, highlights, and the logo ring.
- **Typography:** Sharp modern sans — `Inter` for body, `Space Grotesk` for headlines. Tight tracking, generous line-height, bold H1/H2.
- **Tokens:** Defined in `src/styles.css` via `@theme` (oklch) — `--primary`, `--accent`, `--accent-soft`, `--surface`, `--border`, plus `--shadow-elegant` and `--gradient-ember` for hero glow and CTA hover.
- **Components:** shadcn `button`, `card`, `tabs`, `badge`. Custom `Logo` component rendering the ember ring + "THE JUNGLE" wordmark in SVG (no raster upload needed — the logo is reference for the visual language).
- **Motion:** Subtle fade/translate on section reveal, smooth hover lift on cards, gradient shift on primary CTA hover.

## Page Structure

Single route `/` with a sticky top **View Switcher** (segmented control: *Landing* | *Member Dashboard*). State held locally; both views fully responsive.

### Landing view
1. **Nav** — Logo · How It Works · The Community · Pricing · `Join the Network` CTA
2. **Hero** — Headline "The Peer Board for Main Street Businesses." + subhead, dual CTA (`Apply to Join` / `See how it works`), soft ember radial glow behind, faint dotted/grid texture.
3. **Core Value Props** — 3-column cards: Micro-Forums, The Blueprint Library, Local Chapters. Each with an outlined icon, title, body copy from brief.
4. **Who is this for?** — 3–4 stage-based personas in clean cards (Solopreneur making first hire · R500k–R2M retail/service optimizer · Established R2M–R5M scaling owner).
5. **How It Works** — 3-step strip (Apply → Get matched into a Micro-Pod → Meet monthly + access tools).
6. **Pricing** — single transparent monthly tier card, centered, accent border, full feature list, "Apply to Join" CTA. Trust line beneath (cancel anytime, ZAR pricing).
7. **Footer** — Logo, brief tagline, columns (Platform / Community / Legal), social icons, copyright.

### Member Dashboard view
- **Sidebar** (collapses to top tabs on mobile): Home · My Micro-Pod · Blueprint Library · Events · Community Feed. Active state in accent.
- **Top bar:** greeting "Welcome back, Thandi" + avatar + notification bell.
- **Main grid:**
  - **Next Forum Meeting** hero card — date, time, member-moderator name + avatar, "Add to calendar" + "Join prep doc" buttons.
  - **Quick-link widget** — downloadable "90-Minute Self-Facilitated Forum Script & Guide" with download icon.
  - **Recent Blueprints Added** — list of 4 clickable template rows (Standard Independent Contractor Agreement.docx, SLA Template, Invoice Workflow, Onboarding Checklist) with file-type chip + download icon.
  - **Micro-Pod snapshot** — small card showing pod members (avatars + first names + business type).
  - **Community Feed teaser** — 2 recent posts.

## Files

- `src/styles.css` — extend tokens (midnight blue primary, ember accent, gradients, shadow).
- `src/routes/__root.tsx` — add `<link>` tags for Inter + Space Grotesk; update default title/meta to "The Jungle — Peer Board for Main Street Businesses".
- `src/routes/index.tsx` — page shell + view switcher state, renders `<LandingView />` or `<DashboardView />`.
- `src/components/jungle/Logo.tsx` — inline SVG logo (ember ring + wordmark, scalable, monochrome variant for footer).
- `src/components/jungle/ViewSwitcher.tsx` — segmented control.
- `src/components/jungle/landing/` — `Nav.tsx`, `Hero.tsx`, `ValueProps.tsx`, `Audience.tsx`, `HowItWorks.tsx`, `Pricing.tsx`, `Footer.tsx`.
- `src/components/jungle/dashboard/` — `Sidebar.tsx`, `Topbar.tsx`, `NextMeetingCard.tsx`, `ScriptWidget.tsx`, `RecentBlueprints.tsx`, `PodSnapshot.tsx`, `FeedTeaser.tsx`.

## Out of scope
No backend, auth, or persistence. Dashboard is a static preview. CTAs are visual only.
