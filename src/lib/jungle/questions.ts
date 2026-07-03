export type ReflectivePrompt = {
  id: string;
  eyebrow: string;
  question: string;
  helper?: string;
  placeholder?: string;
  minLength?: number;
};

export const prompts: ReflectivePrompt[] = [
  {
    id: "q1",
    eyebrow: "01",
    question: "Tell us about your business.",
    helper: "In your own words. Where it is, what it does, who it's for.",
    placeholder: "We're building…",
    minLength: 40,
  },
  {
    id: "q2",
    eyebrow: "02",
    question: "What problem are you solving?",
    helper: "The problem, not the product.",
    minLength: 30,
  },
  {
    id: "q3",
    eyebrow: "03",
    question: "What inspired you to start it?",
    helper: "The moment or the observation.",
    minLength: 20,
  },
  {
    id: "q4",
    eyebrow: "04",
    question: "What progress have you made so far?",
    helper: "Customers, revenue, product, team — whatever's real.",
    minLength: 20,
  },
  {
    id: "q5",
    eyebrow: "05",
    question: "What challenge keeps you awake at night?",
    helper: "Be honest. The blind spots are usually where the growth is.",
    minLength: 20,
  },
  {
    id: "q6",
    eyebrow: "06",
    question: "Why do you believe The Jungle is the right place for your business?",
    minLength: 20,
  },
  {
    id: "q7",
    eyebrow: "07",
    question: "If we partnered with you, what would success look like in three years?",
    helper: "Paint the picture.",
    minLength: 20,
  },
];

export const TOTAL_PROMPTS = prompts.length;