
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL,
  contact_name text,
  contact_email text NOT NULL,
  business_name text,
  answers jsonb NOT NULL,
  derived jsonb NOT NULL DEFAULT '{}'::jsonb,
  outcome text NOT NULL CHECK (outcome IN ('green','amber','red')),
  outcome_reasons text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can submit an application
CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only the owner can read their own application (when signed in)
CREATE POLICY "Owners can read their own application"
  ON public.applications FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());
