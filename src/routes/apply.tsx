import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Wordmark } from "@/components/jungle/Wordmark";
import { PalmFrond } from "@/components/jungle/botanicals/PalmFrond";
import { DrawOnView } from "@/components/jungle/botanicals/DrawOnView";
import { prompts, TOTAL_PROMPTS } from "@/lib/jungle/questions";
import { submitApplication } from "@/lib/applications.functions";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Join the Jungle" },
      { name: "description", content: "Tell us about your business. We read every submission — carefully, and by people, not filters." },
      { property: "og:title", content: "Join the Jungle" },
      { property: "og:description", content: "Tell us your story. We read every submission." },
    ],
  }),
  component: ApplyPage,
});

const STORAGE_KEY = "jungle_apply_v2";

type Draft = {
  step: number;
  responses: Record<string, string>;
  founder_name: string;
  business_name: string;
  contact_email: string;
};

function loadDraft(): Draft {
  const empty: Draft = {
    step: 0,
    responses: {},
    founder_name: "",
    business_name: "",
    contact_email: "",
  };
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...empty, ...(JSON.parse(raw) as Draft) };
  } catch {}
  return empty;
}

function ApplyPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft>(() => loadDraft());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitApplication);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); } catch {}
  }, [draft]);

  const totalSteps = TOTAL_PROMPTS + 1; // + identity
  const step = Math.min(draft.step, totalSteps);
  const progress = ((step + (done ? 1 : 0)) / totalSteps) * 100;

  const isPromptStep = step < TOTAL_PROMPTS;
  const currentPrompt = isPromptStep ? prompts[step] : null;
  const currentValue = currentPrompt ? draft.responses[currentPrompt.id] ?? "" : "";
  const canAdvance = currentPrompt
    ? currentValue.trim().length >= (currentPrompt.minLength ?? 1)
    : Boolean(draft.founder_name.trim() && draft.business_name.trim() && /.+@.+\..+/.test(draft.contact_email));

  function setResponse(v: string) {
    if (!currentPrompt) return;
    setDraft((d) => ({ ...d, responses: { ...d.responses, [currentPrompt.id]: v } }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submit({
        data: {
          founder_name: draft.founder_name.trim(),
          business_name: draft.business_name.trim(),
          contact_email: draft.contact_email.trim(),
          responses: draft.responses,
        },
      });
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <DrawOnView className="pointer-events-none absolute -right-40 top-20 text-primary/[0.06]">
        <PalmFrond className="h-[720px] w-auto" />
      </DrawOnView>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/"><Wordmark /></Link>
          {!done && (
            <span className="text-xs text-muted-foreground">
              {isPromptStep ? `${step + 1} of ${TOTAL_PROMPTS + 1}` : `${TOTAL_PROMPTS + 1} of ${TOTAL_PROMPTS + 1}`}
            </span>
          )}
        </div>
        {!done && (
          <div className="h-px w-full bg-border">
            <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}
      </header>

      <main className="relative mx-auto max-w-3xl px-6 pb-40 pt-24 sm:px-10 sm:pt-32">
        {done ? (
          <ThankYou onHome={() => navigate({ to: "/" })} />
        ) : isPromptStep && currentPrompt ? (
          <div>
            <p className="mb-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {currentPrompt.eyebrow} &nbsp;— &nbsp; A question for you
            </p>
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              {currentPrompt.question}
            </h1>
            {currentPrompt.helper && (
              <p className="mt-4 text-[15px] italic leading-relaxed text-muted-foreground">
                {currentPrompt.helper}
              </p>
            )}
            <textarea
              key={currentPrompt.id}
              value={currentValue}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={currentPrompt.placeholder ?? "Take your time."}
              rows={7}
              autoFocus
              className="mt-10 w-full resize-none border-b border-border bg-transparent pb-4 font-display text-xl leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
            />
            {currentPrompt.minLength && currentValue.length > 0 && currentValue.trim().length < currentPrompt.minLength && (
              <p className="mt-3 text-xs text-muted-foreground">A little more, if you can.</p>
            )}
          </div>
        ) : (
          <IdentityStep
            draft={draft}
            onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
            error={error}
          />
        )}
      </main>

      {!done && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, step: Math.max(0, d.step - 1) }))}
              disabled={step === 0 || submitting}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!canAdvance || submitting}
              onClick={() => {
                if (isPromptStep) setDraft((d) => ({ ...d, step: d.step + 1 }));
                else void handleSubmit();
              }}
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground transition-opacity disabled:opacity-30"
            >
              {submitting ? "Sending…" : isPromptStep ? "Continue" : "Join the Jungle"}
              <span className="inline-block h-px w-8 bg-current transition-all group-hover:w-14" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

function IdentityStep({
  draft,
  onChange,
  error,
}: {
  draft: Draft;
  onChange: (patch: Partial<Draft>) => void;
  error: string | null;
}) {
  return (
    <div>
      <p className="mb-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Finally &nbsp;— &nbsp; A little about you
      </p>
      <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em]">
        Where should we send our reply?
      </h1>
      <div className="mt-12 space-y-8">
        <Field label="Your name" value={draft.founder_name} onChange={(v) => onChange({ founder_name: v })} />
        <Field label="Your business" value={draft.business_name} onChange={(v) => onChange({ business_name: v })} />
        <Field label="Email" type="email" value={draft.contact_email} onChange={(v) => onChange({ contact_email: v })} />
      </div>
      {error && <p className="mt-6 text-sm text-accent-red">{error}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border-b border-border bg-transparent pb-3 font-display text-2xl text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}

function ThankYou({ onHome }: { onHome: () => void }) {
  return (
    <div className="text-center">
      <p className="mb-10 text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Thank you
      </p>
      <h1 className="mx-auto max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.025em]">
        We've received your story.
      </h1>
      <p className="mx-auto mt-8 max-w-xl text-[17px] leading-[1.75] text-muted-foreground">
        We read every submission — carefully, and by people, not filters. If there is alignment, we'll be in touch.
      </p>
      <button
        type="button"
        onClick={onHome}
        className="group mt-14 inline-flex items-center gap-3 text-sm font-medium text-foreground"
      >
        Return home
        <span className="inline-block h-px w-8 bg-current transition-all group-hover:w-14" />
      </button>
    </div>
  );
}