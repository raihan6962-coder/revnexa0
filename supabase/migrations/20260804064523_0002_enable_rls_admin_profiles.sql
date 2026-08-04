/*
# Enable RLS on admin_profiles

The initial migration created admin_profiles and policies but RLS was not
properly enabled. This migration enables it.
*/

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
