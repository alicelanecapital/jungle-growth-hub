import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  founder_name: z.string().trim().min(1, "Please add your name").max(160),
  business_name: z.string().trim().min(1, "Please add your business name").max(200),
  contact_email: z.string().trim().email("Please enter a valid email").max(255),
  responses: z.record(z.string().trim().max(5000)),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("applications")
      .insert({
        founder_name: data.founder_name,
        business_name: data.business_name,
        contact_email: data.contact_email,
        responses: data.responses as never,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[submitApplication] insert failed", error);
      throw new Error("We couldn't save your submission. Please try again in a moment.");
    }

    return { id: inserted.id as string };
  });