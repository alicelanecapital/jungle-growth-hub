import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { computeOutcome, type Answers } from "./jungle/questions";

const submitSchema = z.object({
  contact_name: z.string().trim().max(120).optional().default(""),
  contact_email: z.string().trim().email("Please enter a valid email").max(255),
  business_name: z.string().trim().max(200).optional().default(""),
  answers: z.record(z.unknown()),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    // Server-side recompute — never trust the client's outcome
    const { outcome, reasons, derived } = computeOutcome(data.answers as Answers);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("applications")
      .insert({
        contact_name: data.contact_name || null,
        contact_email: data.contact_email,
        business_name: data.business_name || null,
        answers: data.answers as never,
        derived: derived as never,
        outcome,
        outcome_reasons: reasons,
      })
      .select("id, outcome, outcome_reasons, created_at")
      .single();

    if (error) {
      console.error("[submitApplication] insert failed", error);
      throw new Error("We couldn't save your application. Please try again in a moment.");
    }

    return {
      id: inserted.id as string,
      outcome: inserted.outcome as "green" | "amber" | "red",
      reasons: (inserted.outcome_reasons as string[]) ?? [],
    };
  });