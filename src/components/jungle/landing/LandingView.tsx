import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";
import {
  ArrowRight,
  Check,
  Users,
  FileText,
  MapPin,
  Sparkles,
  Store,
  Briefcase,
  TrendingUp,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

export function LandingView() {
  return (
    <div className="bg-background">
      <Nav />
      <Hero />
      <ValueProps />
      <Audience />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-[60px] z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground transition">How It Works</a>
          <a href="#community" className="hover:text-foreground transition">The Community</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </nav>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
          Join the Network
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #F08A2A, transparent 70%)" }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--accent-ember)]" />
          Now accepting members for Q3 cohorts
        </div>
        <h1 className="font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
          The Peer Board for{" "}
          <span className="text-ember-gradient">Main Street</span> Businesses.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Stop operating in isolation. Get the advice, operational tools, and local peer
          community to grow your business past the survival stage—without the elite price tag.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-ember-gradient text-white shadow-lg shadow-orange-500/20 hover:opacity-95 hover:shadow-xl rounded-full px-7 text-base transition-all hover:-translate-y-0.5"
          >
            Apply to Join
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-7 text-base text-foreground hover:bg-secondary"
            asChild
          >
            <a href="#how">See how it works</a>
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground/70">
          <span>R200K – R5M annual revenue</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span>South African owned</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span>Non-competing pods</span>
        </div>
      </div>
    </section>
  );
}

const valueProps = [
  {
    icon: Users,
    title: "Micro-Forums",
    body: "A monthly, structured personal board of 6–8 non-competing local business owners to solve your cash flow, hiring, and operational headaches.",
  },
  {
    icon: FileText,
    title: "The Blueprint Library",
    body: "Ready-to-use operational templates: employment contracts, service level agreements, and invoicing workflows.",
  },
  {
    icon: MapPin,
    title: "Local Chapters",
    body: "Quarterly real-world meetups to build deep local networks and swap hyper-local business leads.",
  },
];

function ValueProps() {
  return (
    <section id="community" className="border-y border-border/60 bg-surface-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent-ember)]">
            What you get
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Three things that move the needle.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="group relative rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--accent-ember)]/40 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <vp.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{vp.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{vp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const personas = [
  {
    icon: Briefcase,
    stage: "Stage 01",
    title: "The Solopreneur",
    body: "You're billing solo and looking to make your first hire. You need a sounding board before you commit.",
  },
  {
    icon: Store,
    stage: "Stage 02",
    title: "The R500K – R2M Operator",
    body: "Retail or service business in the optimization phase. Cash flow is tight, but the model is working.",
  },
  {
    icon: TrendingUp,
    stage: "Stage 03",
    title: "The R2M – R5M Scaler",
    body: "You're past survival. Systems, hiring, and delegation are the next mountain.",
  },
];

function Audience() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent-ember)]">
          Who it's for
        </p>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Matched by stage, not just industry.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your pod is built around where you actually are — so the advice you get is the advice you can use this week.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {personas.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-surface p-7 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p.icon className="h-5 w-5 text-[color:var(--accent-ember)]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {p.stage}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Apply", body: "Tell us your stage, location, and what you're stuck on. We review every application." },
  { n: "02", title: "Get matched", body: "Join a Micro-Pod of 6–8 non-competing owners at a similar stage." },
  { n: "03", title: "Meet monthly", body: "Self-facilitated forums, the full template library, and quarterly local meetups." },
];

function HowItWorks() {
  return (
    <section id="how" className="border-y border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent-gold)]">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            From application to your first forum in under three weeks.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-primary-foreground/15 pt-6">
              <div className="font-display text-3xl font-bold text-[color:var(--accent-gold)]">{s.n}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingFeatures = [
  "Monthly Peer Forum Access (6–8 owners)",
  "24/7 Digital Community",
  "Complete Blueprint Library",
  "Quarterly Local Chapter Meetups",
  "Self-facilitated forum scripts & guides",
  "Member-only operational templates",
];

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent-ember)]">
          Pricing
        </p>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          One transparent membership.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          No tiers. No upsells. The same access for every member.
        </p>
      </div>
      <div className="mx-auto max-w-md">
        <div className="relative rounded-3xl border border-border bg-surface p-8 shadow-xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            All-Access Membership
          </div>
          <div className="mt-2 text-center">
            <div className="font-display text-5xl font-bold text-foreground">
              R495
              <span className="text-base font-medium text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Billed monthly. Cancel anytime.</p>
          </div>
          <div className="my-7 h-px bg-border" />
          <ul className="space-y-3">
            {pricingFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            Apply to Join
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Application reviewed within 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A peer network for South African owners building real businesses, in real towns.
          </p>
        </div>
        <FooterCol title="Platform" items={["How it works", "Pricing", "Blueprint Library", "Local Chapters"]} />
        <FooterCol title="Community" items={["Apply", "Member stories", "Events", "Partners"]} />
        <FooterCol title="Legal" items={["Privacy", "Terms", "Code of Conduct", "Contact"]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} The Jungle Network. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-foreground transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-foreground transition">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}