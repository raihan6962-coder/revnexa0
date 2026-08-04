/*
# Fix security advisor warnings

1. Fix `handle_updated_at` function search path — set to public explicitly.
2. Restrict `is_admin()` function execution to authenticated role only (revoke from anon).
3. The `inquiries` and `page_views` INSERT policies with WITH CHECK (true) are
   intentional — these are public lead-capture and analytics-beacon inserts.
   The data written is user-provided and does not expose sensitive information.
   These are documented as intentional public writes.
*/

-- Fix handle_updated_at search path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict is_admin() to authenticated only
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
