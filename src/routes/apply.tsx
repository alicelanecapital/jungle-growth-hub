import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Logo } from "@/components/jungle/Logo";
import { OrganicLines } from "@/components/jungle/apply/OrganicLines";
import { computeOutcome, sectionForQuestion, TOTAL_QUESTIONS, type Answers } from "@/lib/jungle/questions";
import { submitApplication } from "@/lib/applications.functions";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — The Jungle" },
      {
        name: "description",
        content:
          "A short, honest screening for South African SMEs. We want to understand whether your business is real, founder-led, and ready for partnership.",
      },
      { property: "og:title", content: "Apply — The Jungle" },
      {
        property: "og:description",
        content:
          "A short, honest screening for South African SMEs. Not a form — a conversation.",
      },
    ],
  }),
  component: ApplyPage,
});

// ───────────────── State ─────────────────

type State = {
  answers: Answers;
  index: number; // 1..14 + 15 contact + 16 outcome
  startedAt: number;
};
type Action =
  | { type: "set"; key: string; value: Answers[string] }
  | { type: "next" }
  | { type: "back" }
  | { type: "reset" };

const STORAGE_KEY = "jungle_apply_draft_v1";

function loadInitial(): State {
  if (typeof window === "undefined") return { answers: {}, index: 1, startedAt: Date.now() };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as State;
      if (parsed && typeof parsed === "object" && parsed.answers) return parsed;
    }
  } catch {}
  return { answers: {}, index: 1, startedAt: Date.now() };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "set":
      return { ...s, answers: { ...s.answers, [a.key]: a.value } };
    case "next":
      return { ...s, index: Math.min(s.index + 1, 16) };
    case "back":
      return { ...s, index: Math.max(s.index - 1, 1) };
    case "reset":
      return { answers: {}, index: 1, startedAt: Date.now() };
  }
}

// ───────────────── Page ─────────────────

function ApplyPage() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", business: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ outcome: "green" | "amber" | "red"; reasons: string[] } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submit = useServerFn(submitApplication);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Auto-RED short-circuit on Q1 = "elsewhere"
  const earlyRed = state.answers.q1 === "elsewhere";

  const progress =
    state.index <= TOTAL_QUESTIONS
      ? state.index / (TOTAL_QUESTIONS + 1)
      : state.index === 15
        ? (TOTAL_QUESTIONS + 0.5) / (TOTAL_QUESTIONS + 1)
        : 1;

  const section = state.index <= TOTAL_QUESTIONS ? sectionForQuestion(state.index) : null;

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submit({
        data: {
          contact_name: contact.name,
          contact_email: contact.email,
          business_name: contact.business,
          answers: state.answers,
        },
      });
      setResult({ outcome: res.outcome, reasons: res.reasons });
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
      dispatch({ type: "next" }); // -> 16
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  // Once Q1=elsewhere is detected, force an immediate RED preview as the outcome
  const previewOutcome = useMemo(() => computeOutcome(state.answers), [state.answers]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background organic motifs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <OrganicLines
          variant="frond"
          className="absolute -right-24 -top-20 h-[520px] w-[360px] text-primary/[0.09]"
        />
        <OrganicLines
          variant="frond"
          className="absolute -left-32 bottom-0 h-[460px] w-[320px] -scale-x-100 text-accent-ember/[0.10]"
        />
        <div
          className="absolute left-1/2 top-[-12%] h-[420px] w-[680px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--accent-gold), transparent 70%)" }}
        />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          {!result && (
            <div className="hidden text-xs text-muted-foreground sm:block">
              We respect your time. About 8 minutes.
            </div>
          )}
        </div>
        {/* progress */}
        {!result && (
          <div className="h-1.5 w-full bg-muted">
            <div
              className="h-full bg-canopy-gradient transition-[width] duration-300"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        )}
      </header>

      <main className="relative mx-auto max-w-3xl px-5 pb-32 pt-10 sm:px-8 sm:pt-14">
        {/* Section header */}
        {!result && section && state.index <= TOTAL_QUESTIONS && (
          <div className="mb-7 flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-widest text-[color:var(--accent-warm)]">
              {section.label}
            </span>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">Question {state.index}</span> of {TOTAL_QUESTIONS}
            </span>
          </div>
        )}

        {/* Question or contact or outcome */}
        {!result && state.index <= TOTAL_QUESTIONS && (
          <QuestionRouter
            index={state.index}
            answers={state.answers}
            set={(key, value) => dispatch({ type: "set", key, value })}
          />
        )}

        {!result && state.index === 15 && (
          <ContactStep
            contact={contact}
            setContact={setContact}
            submitting={submitting}
            error={submitError}
            onSubmit={handleSubmit}
            onBack={() => dispatch({ type: "back" })}
          />
        )}

        {result && (
          <OutcomeView
            result={result}
            onRestart={() => {
              setResult(null);
              dispatch({ type: "reset" });
              setContact({ name: "", email: "", business: "" });
              navigate({ to: "/apply" });
            }}
          />
        )}

        {/* Early auto-RED hint */}
        {!result && earlyRed && state.index <= TOTAL_QUESTIONS && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm">
            <p className="font-medium text-foreground">
              Heads up — we focus on businesses in or serving South Africa.
            </p>
            <p className="mt-1 text-muted-foreground">
              You can keep going if you'd like, but this is likely not the right fit for us right now.
            </p>
          </div>
        )}
      </main>

      {/* Sticky nav for questions */}
      {!result && state.index <= TOTAL_QUESTIONS && (
        <NavBar
          index={state.index}
          canContinue={isAnswered(state.index, state.answers)}
          onBack={() => dispatch({ type: "back" })}
          onNext={() => dispatch({ type: "next" })}
        />
      )}

      {/* Hide preview outcome warning unless useful */}
      {!result && previewOutcome.outcome === "red" && state.index > TOTAL_QUESTIONS && state.index === 15 && (
        <div className="sr-only">red outcome preview</div>
      )}
    </div>
  );
}

// ───────────────── NavBar ─────────────────

function NavBar({
  index,
  canContinue,
  onBack,
  onNext,
}: {
  index: number;
  canContinue: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  const lastQuestion = index === TOTAL_QUESTIONS;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-4">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={onBack}
          disabled={index === 1}
          className="rounded-full px-5"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          disabled={!canContinue}
          className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {lastQuestion ? "Almost done" : "Continue"} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function isAnswered(index: number, a: Answers): boolean {
  switch (index) {
    case 1:
      return Boolean(a.q1);
    case 2:
      return typeof a.q2 === "number" && (a.q2 as number) >= 0;
    case 3:
      return Array.isArray(a.q3) && (a.q3 as string[]).length > 0;
    case 4:
      return Boolean(a.q4);
    case 5:
      return typeof a.q5 === "number";
    case 6:
      return Boolean(a.q6);
    case 7: {
      const sel = (a.q7 as string[]) ?? [];
      if (sel.length === 0) return false;
      const hasYes = sel.some((s) => s !== "never");
      if (hasYes && !a.q7_willing) return false;
      return true;
    }
    case 8: {
      if (!a.q8) return false;
      if (a.q8 !== "separate" && !a.q8_willing) return false;
      return true;
    }
    case 9:
      return Boolean(a.q9);
    case 10:
      return Boolean(a.q10);
    case 11:
      return String(a.q11 ?? "").trim().length > 0;
    case 12:
      return String(a.q12 ?? "").trim().length >= 20;
    case 13:
      return String(a.q13 ?? "").trim().length >= 10;
    case 14:
      return String(a.q14 ?? "").trim().length >= 10;
    default:
      return true;
  }
}

// ───────────────── Question router ─────────────────

function QuestionRouter({
  index,
  answers,
  set,
}: {
  index: number;
  answers: Answers;
  set: (key: string, value: Answers[string]) => void;
}) {
  switch (index) {
    case 1:
      return (
        <QShell
          title="Where is your business?"
          why="The Jungle focuses on businesses operating in or serving South Africa."
        >
          <RadioList
            name="q1"
            value={String(answers.q1 ?? "")}
            onChange={(v) => set("q1", v)}
            options={[
              { v: "sa_operate", label: "We operate in South Africa" },
              { v: "sa_customers", label: "We mainly serve customers in South Africa" },
              { v: "elsewhere", label: "We operate somewhere else" },
            ]}
          />
        </QShell>
      );
    case 2:
      return (
        <QShell
          title="What was your total revenue in the last 12 months?"
          why="We're looking for real revenue, typically up to about R2m. Above is still reviewed."
        >
          <CurrencyInput
            value={(answers.q2 as number) ?? null}
            onChange={(n) => set("q2", n)}
          />
          {typeof answers.q2 === "number" && (answers.q2 as number) > 0 && (
            <BandNote value={answers.q2 as number} />
          )}
        </QShell>
      );
    case 3:
      return (
        <QShell
          title="How do we know customers are actually buying from you right now?"
          why="We don't need perfect records. We just need some way to see that revenue is real."
        >
          <CheckboxList
            value={(answers.q3 as string[]) ?? []}
            onChange={(v) => set("q3", v)}
            options={[
              { v: "bank", label: "Bank statements showing regular deposits" },
              { v: "card", label: "Card payment processor statements (Yoco, PayFast, etc.)" },
              { v: "pos", label: "Till records or point-of-sale data" },
              { v: "cash", label: "Cash sales records or receipts" },
              { v: "invoices", label: "Invoice records from recent customers" },
              { v: "other", label: "Other" },
            ]}
          />
        </QShell>
      );
    case 4:
      return (
        <QShell
          title="What does your business sell?"
          why="We focus on operating businesses, not venture-style tech start-ups. Using tech to run your business is fine — tell us about the actual product or service."
        >
          <RadioList
            name="q4"
            value={String(answers.q4 ?? "")}
            onChange={(v) => set("q4", v)}
            options={[
              { v: "services", label: "Services (cleaning, repairs, consulting, trades, training)" },
              { v: "retail", label: "Retail or local commerce" },
              { v: "food", label: "Food production or distribution" },
              { v: "manufacturing", label: "Light manufacturing" },
              { v: "specialist", label: "Specialist skills or expertise" },
              { v: "other", label: "Other" },
            ]}
          />
        </QShell>
      );
    case 5: {
      const pct = (answers.q5 as number) ?? 0;
      return (
        <QShell
          title="What percentage of your revenue comes from government tenders, municipal contracts or public-sector deals?"
          why="We can work with some public-sector exposure, but heavy dependence creates payment risk."
        >
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-end justify-between">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="font-display text-4xl font-bold text-foreground">{pct}%</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[pct]}
              onValueChange={(v) => set("q5", v[0] ?? 0)}
            />
          </div>
          {pct > 50 && (
            <div className="mt-4 rounded-xl border border-[color:var(--accent-warm)]/40 bg-[color:var(--accent-warm)]/5 p-4 text-sm">
              <span className="font-medium text-foreground">Worth a conversation.</span>{" "}
              <span className="text-muted-foreground">
                Heavy public-sector dependence creates payment-timing risk. We'll want to understand how
                you'd handle it.
              </span>
            </div>
          )}
        </QShell>
      );
    }
    case 6:
      return (
        <QShell
          title="Is this your business, or do you own / manage it?"
          why="We need someone accountable — someone who knows the numbers, the customers, and can make decisions."
        >
          <RadioList
            name="q6"
            value={String(answers.q6 ?? "")}
            onChange={(v) => set("q6", v)}
            options={[
              { v: "founder", label: "I'm the founder and I run it" },
              { v: "owner_operator", label: "I own it and run it day-to-day" },
              { v: "manager", label: "I'm a manager but someone else owns it" },
              { v: "shared", label: "It's unclear / shared ownership" },
              { v: "other", label: "Other" },
            ]}
          />
        </QShell>
      );
    case 7: {
      const sel = (answers.q7 as string[]) ?? [];
      const hasYes = sel.length > 0 && sel.some((s) => s !== "never");
      return (
        <QShell
          title="Have you ever had business mentoring, coaching, training or support?"
          why="No wrong answer here. We're just curious where you've been."
        >
          <CheckboxList
            value={sel}
            onChange={(v) => set("q7", v)}
            options={[
              { v: "never", label: "Never had formal support" },
              { v: "nonprofit", label: "Yes — from a non-profit or charity" },
              { v: "mentor", label: "Yes — from a business mentor or coach" },
              { v: "incubator", label: "Yes — from a business incubator" },
              { v: "bank", label: "Yes — from a bank or finance provider" },
              { v: "other", label: "Other" },
            ]}
          />
          {hasYes && (
            <FollowUp
              label="Would you be open to working with us on improving your financials, reporting and business discipline?"
              name="q7_willing"
              value={String(answers.q7_willing ?? "")}
              onChange={(v) => set("q7_willing", v)}
              options={[
                { v: "yes", label: "Yes" },
                { v: "maybe", label: "Maybe" },
                { v: "no", label: "No" },
              ]}
            />
          )}
        </QShell>
      );
    }
    case 8: {
      const q8 = String(answers.q8 ?? "");
      const needsFollow = q8 && q8 !== "separate";
      return (
        <QShell
          title="Right now, are your personal finances and business money kept separate?"
          why="We can help you set this up. Separation is non-negotiable for partnership."
        >
          <RadioList
            name="q8"
            value={q8}
            onChange={(v) => set("q8", v)}
            options={[
              { v: "separate", label: "Yes, completely separate" },
              { v: "mostly", label: "Mostly separate, but we mix things sometimes" },
              { v: "mixed", label: "No, it's all mixed together" },
              { v: "not_sure", label: "Not sure" },
            ]}
          />
          {needsFollow && (
            <FollowUp
              label="If we invest, you'd need to separate these cleanly. Are you willing to do that?"
              name="q8_willing"
              value={String(answers.q8_willing ?? "")}
              onChange={(v) => set("q8_willing", v)}
              options={[
                { v: "yes", label: "Yes" },
                { v: "need_help", label: "I need help with this" },
                { v: "not_sure", label: "Not sure" },
                { v: "no", label: "No" },
              ]}
            />
          )}
        </QShell>
      );
    }
    case 9:
      return (
        <QShell
          title="If we invest, we'd need bank statements, sales records and a monthly financial summary. Can you provide these?"
          why="This isn't punishment. It protects your business and helps us actually help you."
        >
          <RadioList
            name="q9"
            value={String(answers.q9 ?? "")}
            onChange={(v) => set("q9", v)}
            options={[
              { v: "can_do", label: "Yes, we can do this" },
              { v: "need_help_setup", label: "We're willing to but we'd need help setting it up" },
              { v: "no_records", label: "We don't have records in that form" },
              { v: "would_struggle", label: "We'd struggle to do this every month" },
              { v: "wont_share", label: "No, we won't share that level of detail" },
            ]}
          />
        </QShell>
      );
    case 10:
      return (
        <QShell
          title="After paying all your normal business costs, does the business usually have money left over?"
          why="Be honest. We can work with businesses that aren't yet profitable — we just need to understand the real picture."
        >
          <RadioList
            name="q10"
            value={String(answers.q10 ?? "")}
            onChange={(v) => set("q10", v)}
            options={[
              { v: "regularly", label: "Yes, regularly" },
              { v: "not_every_month", label: "Yes, but not every month" },
              { v: "break_even", label: "We break even most months" },
              { v: "loss", label: "No, we usually run at a loss" },
              { v: "not_sure", label: "I'm not sure" },
            ]}
          />
        </QShell>
      );
    case 11:
      return (
        <QShell
          title="Does the business — or you personally because of the business — owe money?"
          why="Loans, supplier arrears, rent, tax, informal loans. We're not trying to catch you out. We need to know what claims already exist on your business cash."
        >
          <Textarea
            value={String(answers.q11 ?? "")}
            onChange={(e) => set("q11", e.target.value)}
            placeholder="List any debts or obligations. Be specific about amounts where possible."
            rows={6}
            className="rounded-xl border-border bg-card text-base"
          />
        </QShell>
      );
    case 12: {
      const v = String(answers.q12 ?? "");
      const tooShort = v.trim().length > 0 && v.trim().length < 80;
      return (
        <QShell
          title="If we invested R100,000 to R500,000, exactly what would you use it for?"
          why="Specific is better than ambitious. We want to know the exact bottleneck we'd solve."
        >
          <Textarea
            value={v}
            onChange={(e) => set("q12", e.target.value)}
            placeholder="Example: R200k for a delivery vehicle to reach more customers + R100k to hire a delivery driver + R200k for working capital to increase orders."
            rows={7}
            className="rounded-xl border-border bg-card text-base"
          />
          {tooShort && (
            <p className="mt-2 text-xs text-[color:var(--accent-warm)]">
              Try to be a bit more specific — what would actually be bought, hired, or unlocked?
            </p>
          )}
        </QShell>
      );
    }
    case 13:
      return (
        <QShell
          title="What would make your business stronger over the next year?"
          why="This shows us whether you understand what's holding you back."
        >
          <Textarea
            value={String(answers.q13 ?? "")}
            onChange={(e) => set("q13", e.target.value)}
            placeholder="The one or two biggest things that would help — pricing, systems, hiring, location, cash flow, customer mix, etc."
            rows={6}
            className="rounded-xl border-border bg-card text-base"
          />
        </QShell>
      );
    case 14:
      return (
        <QShell
          title="What's the most difficult or embarrassing issue in your business right now?"
          why="Don't polish this. We can't fix problems we don't know about, and honest founders usually know where they're weak."
        >
          <Textarea
            value={String(answers.q14 ?? "")}
            onChange={(e) => set("q14", e.target.value)}
            placeholder="Tell us straight. We've heard it before."
            rows={6}
            className="rounded-xl border-border bg-card text-base"
          />
        </QShell>
      );
    default:
      return null;
  }
}

// ───────────────── Shells & inputs ─────────────────

function QShell({
  title,
  why,
  children,
}: {
  title: string;
  why?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {why && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{why}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

function RadioList({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      {options.map((o) => {
        const checked = value === o.v;
        return (
          <label
            key={o.v}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 transition ${
              checked
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.v}
              checked={checked}
              onChange={() => onChange(o.v)}
              className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
            />
            <span className="text-base text-foreground">{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxList({
  value,
  onChange,
  options,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  options: { v: string; label: string }[];
}) {
  function toggle(v: string) {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  }
  return (
    <div className="space-y-2">
      {options.map((o) => {
        const checked = value.includes(o.v);
        return (
          <label
            key={o.v}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 transition ${
              checked
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/40"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(o.v)}
              className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
            />
            <span className="text-base text-foreground">{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function FollowUp({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; label: string }[];
}) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-primary/30 bg-secondary/40 p-5">
      <p className="mb-3 text-sm font-medium text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.v;
          return (
            <button
              type="button"
              key={o.v}
              onClick={() => onChange(o.v)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {o.label}
            </button>
          );
        })}
        {/* keep name for a11y */}
        <input type="hidden" name={name} value={value} />
      </div>
    </div>
  );
}

function CurrencyInput({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (n: number) => void;
}) {
  const formatted = value == null ? "" : value.toLocaleString("en-ZA");
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl font-semibold text-muted-foreground">R</span>
        <input
          inputMode="numeric"
          value={formatted}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^\d]/g, "");
            onChange(digits ? Number(digits) : 0);
          }}
          placeholder="1,250,000"
          className="w-full bg-transparent font-display text-4xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40"
        />
      </div>
    </div>
  );
}

function BandNote({ value }: { value: number }) {
  if (value < 50_000) {
    return (
      <p className="mt-3 text-sm text-muted-foreground">
        That's on the smaller side for us — possible, but unusual.
      </p>
    );
  }
  if (value > 10_000_000) {
    return (
      <p className="mt-3 text-sm text-muted-foreground">
        That's well above our typical band. We may still review, but our sweet spot is up to about R2m.
      </p>
    );
  }
  if (value > 2_000_000) {
    return (
      <p className="mt-3 text-sm text-muted-foreground">
        Above our typical sweet spot (~R2m), but worth a look.
      </p>
    );
  }
  return (
    <p className="mt-3 text-sm text-[color:var(--primary)]">In our typical range. Good.</p>
  );
}

// ───────────────── Contact step ─────────────────

function ContactStep({
  contact,
  setContact,
  submitting,
  error,
  onSubmit,
  onBack,
}: {
  contact: { name: string; email: string; business: string };
  setContact: (c: { name: string; email: string; business: string }) => void;
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email);
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--primary)]">
          <Sparkles className="h-3.5 w-3.5" /> Last step
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          How do we reach you?
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          We'll send your outcome here and follow up within five working days.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Your name</label>
          <Input
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            placeholder="Thandi Mokoena"
            className="h-12 rounded-xl border-border bg-card text-base"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            inputMode="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="you@yourbusiness.co.za"
            className="h-12 rounded-xl border-border bg-card text-base"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Business name <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            value={contact.business}
            onChange={(e) => setContact({ ...contact, business: e.target.value })}
            placeholder="Mokoena Logistics"
            className="h-12 rounded-xl border-border bg-card text-base"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pb-24 sm:pb-0">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={onBack}
          disabled={submitting}
          className="rounded-full px-5"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          size="lg"
          disabled={!validEmail || submitting}
          onClick={onSubmit}
          className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Send my answers <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ───────────────── Outcome ─────────────────

function OutcomeView({
  result,
  onRestart,
}: {
  result: { outcome: "green" | "amber" | "red"; reasons: string[] };
  onRestart: () => void;
}) {
  const cfg = OUTCOME_CFG[result.outcome];
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -right-10 -top-10 hidden h-72 w-72 text-[color:var(--accent-gold)]/30 sm:block">
        <OrganicLines variant={cfg.motif} className="h-full w-full" />
      </div>

      <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12">
        <div
          className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: cfg.iconBg, color: cfg.iconColor }}
        >
          <Check className="h-6 w-6" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: cfg.accent }}>
          {cfg.tag}
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {cfg.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {cfg.body}
        </p>

        {result.reasons.length > 0 && (
          <div className="mt-7 rounded-2xl border border-border bg-secondary/50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What we noticed
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              {result.reasons.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: cfg.accent }}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            onClick={() => window.print()}
            variant="outline"
            className="rounded-full border-border px-6"
          >
            <Download className="mr-2 h-4 w-4" /> Save as PDF
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
            <Link to="/">Back to The Jungle</Link>
          </Button>
          <button
            onClick={onRestart}
            className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

const OUTCOME_CFG: Record<
  "green" | "amber" | "red",
  {
    tag: string;
    title: string;
    body: string;
    accent: string;
    iconBg: string;
    iconColor: string;
    motif: "frond" | "sun" | "ribs";
  }
> = {
  green: {
    tag: "We're interested",
    title: "Let's talk.",
    body: "What you've shared lines up with the kinds of businesses we back. We'll email you within five working days to set up an introductory conversation. In the meantime, start pulling together your last six months of bank statements and a one-page summary of your business.",
    accent: "var(--primary)",
    iconBg: "color-mix(in oklab, var(--primary) 14%, transparent)",
    iconColor: "var(--primary)",
    motif: "frond",
  },
  amber: {
    tag: "Not right now",
    title: "We see something — let's just not yet.",
    body: "There's real business here, but a few things need to firm up before we'd be useful as a partner. Take six months to tighten the items below, then come back. We'll review again — no penalty for the first round.",
    accent: "var(--accent-warm)",
    iconBg: "color-mix(in oklab, var(--accent-warm) 14%, transparent)",
    iconColor: "var(--accent-warm)",
    motif: "sun",
  },
  red: {
    tag: "Not the right fit",
    title: "Honestly, not for us.",
    body: "Based on what you've shared, your business sits outside what The Jungle is built to support. That isn't a judgement of the business — it just means we'd be the wrong partner. If you want suggestions for funders or programmes better matched to your stage, reply to the email we send and we'll point you somewhere useful.",
    accent: "var(--jewel-magenta)",
    iconBg: "color-mix(in oklab, var(--jewel-magenta) 14%, transparent)",
    iconColor: "var(--jewel-magenta)",
    motif: "ribs",
  },
};