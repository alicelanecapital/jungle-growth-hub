// Shared questionnaire schema, conditional flow, and outcome logic.
// Used by both the client UI and the server `submitApplication` function so the
// server can recompute the outcome and never trust client-supplied values.

export type AnswerValue = string | number | string[] | { value: string; other?: string } | null;
export type Answers = Record<string, AnswerValue>;

export const SECTIONS = [
  { id: "real", label: "Is this business even real?", range: [1, 3] as const },
  { id: "founder", label: "Is this founder worth backing?", range: [4, 9] as const },
  { id: "capital", label: "Is capital actually useful?", range: [10, 14] as const },
];

export const TOTAL_QUESTIONS = 14;

export function sectionForQuestion(n: number) {
  return SECTIONS.find((s) => n >= s.range[0] && n <= s.range[1])!;
}

// ───────── Outcome calculator (mirrored on server) ─────────

export type Outcome = "green" | "amber" | "red";

export interface OutcomeResult {
  outcome: Outcome;
  reasons: string[];
  derived: Record<string, unknown>;
}

const GENERIC_USE_OF_FUNDS = [
  "growing the business",
  "growth",
  "general business needs",
  "scale",
  "scale up",
  "marketing",
  "expansion",
];

export function computeOutcome(a: Answers): OutcomeResult {
  const reasons: string[] = [];
  const derived: Record<string, unknown> = {};

  // Q1 — South Africa fit
  const q1 = (a.q1 as string) ?? "";
  const saFit = q1 === "sa_operate" || q1 === "sa_customers";
  derived.sa_fit = saFit;
  if (q1 === "elsewhere" || !q1) {
    return {
      outcome: "red",
      reasons: ["Outside our South African mandate"],
      derived,
    };
  }

  // Q2 — revenue band
  const q2 = Number(a.q2) || 0;
  derived.revenue = q2;
  let band = "unknown";
  if (q2 > 0 && q2 < 50_000) band = "below";
  else if (q2 <= 2_000_000) band = "sweet_spot";
  else if (q2 <= 10_000_000) band = "above_sweet_spot";
  else band = "very_large";
  derived.revenue_band = band;

  // Q3 — proof of revenue
  const q3 = Array.isArray(a.q3) ? a.q3 : [];
  derived.proof_count = q3.length;
  if (q3.length === 0) {
    return {
      outcome: "red",
      reasons: ["No evidence that customers are actually buying"],
      derived,
    };
  }

  // Q4 — business type
  const q4 = (a.q4 as string) ?? "";
  derived.business_type = q4;

  // Q5 — government revenue
  const q5 = Number(a.q5) || 0;
  derived.gov_pct = q5;

  // Q6 — accountable founder
  const q6 = (a.q6 as string) ?? "";
  const accountable = q6 === "founder" || q6 === "owner_operator";
  derived.accountable = accountable;
  if (!accountable) reasons.push("It's not yet clear who's accountable for decisions");

  // Q7 — past support (non-blocking) + willingness follow-up
  const q7 = Array.isArray(a.q7) ? a.q7 : [];
  const q7Followup = (a.q7_willing as string) ?? "";
  derived.past_support = q7;
  derived.willing_to_improve = q7Followup;

  // Q8 — money separation
  const q8 = (a.q8 as string) ?? "";
  const q8Followup = (a.q8_willing as string) ?? "";
  derived.separation = q8;
  derived.separation_willing = q8Followup;
  const separationOk =
    q8 === "separate" || (q8 !== "" && (q8Followup === "yes" || q8Followup === "need_help"));
  if (!separationOk && q8) reasons.push("Money separation is not yet workable");

  // Q9 — monthly reporting
  const q9 = (a.q9 as string) ?? "";
  derived.reporting = q9;
  if (q9 === "wont_share") {
    return {
      outcome: "red",
      reasons: ["Won't share monthly financial visibility — non-negotiable for partnership"],
      derived,
    };
  }
  if (q9 === "would_struggle") reasons.push("Monthly reporting would be a stretch");

  // Q10 — profitability (informational)
  derived.profit = a.q10 ?? null;

  // Q11 — debts (informational)
  derived.debts = a.q11 ?? "";

  // Q12 — use of funds specificity
  const q12 = String(a.q12 ?? "").trim();
  derived.use_of_funds_chars = q12.length;
  const tooShort = q12.length < 80;
  const tooGeneric = GENERIC_USE_OF_FUNDS.some((g) => q12.toLowerCase() === g) || q12.split(/\s+/).length < 12;
  if (tooShort || tooGeneric) reasons.push("Use of capital isn't yet specific enough to evaluate");

  // Q13 — 12-month improvement
  const q13 = String(a.q13 ?? "").trim();
  derived.improvement_chars = q13.length;
  const diversifies = /diversif|new (customer|client|market|sector)|private sector|reduce|less government/i.test(q13);

  // Q14 — hardest truth (we just want some honesty)
  const q14 = String(a.q14 ?? "").trim();
  derived.hardest_truth_chars = q14.length;
  if (q14.length < 20) reasons.push("Hardest-truth answer feels too brief to read honestly");

  // Auto-RED — gov >80% with no diversity plan
  if (q5 > 80 && !diversifies) {
    return {
      outcome: "red",
      reasons: ["Heavy public-sector dependence (>80%) without a diversification plan"],
      derived,
    };
  }

  if (q5 > 50) reasons.push("Significant public-sector exposure — we'll want to discuss");

  if (band === "below") reasons.push("Revenue is below our typical band — possible but unusual");
  if (band === "very_large") reasons.push("Revenue is above our typical band — possible but unusual");

  // Green criteria
  const green =
    saFit &&
    q3.length > 0 &&
    accountable &&
    separationOk &&
    (q9 === "can_do" || q9 === "need_help_setup") &&
    !tooShort &&
    !tooGeneric &&
    q14.length >= 20 &&
    q5 <= 50;

  if (green) {
    return { outcome: "green", reasons: [], derived };
  }

  return { outcome: "amber", reasons, derived };
}