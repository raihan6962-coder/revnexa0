/*
# Create Revnexa Core Schema

## Overview
Creates the full data layer for the Revnexa Google Play Store review service site:
content management (blog, FAQs, testimonials), lead capture (inquiries), analytics
(page views), and site configuration (settings). Admin access is enforced via
Supabase Auth + RLS; public visitors can read published content and submit inquiries.

## New Tables

1. `admin_profiles` — links Supabase Auth users to admin role.
   - id (uuid PK, default auth.uid())
   - email (text, required)
   - role (text: admin, default 'admin')
   - created_at (timestamptz, default now())

2. `inquiries` — lead-capture submissions from the contact/chat widget.
   - id (uuid PK)
   - full_name (text, required)
   - email (text, required)
   - app_name (text, nullable)
   - message (text, required)
   - channel (text: whatsapp | telegram | email)
   - status (text: new | contacted | in_progress | converted | closed)
   - country (text, nullable)
   - created_at (timestamptz, default now())

3. `blog_posts` — blog content for SEO acquisition.
   - id (uuid PK)
   - slug (text, unique, required)
   - title (text, required)
   - meta_title (text, nullable)
   - meta_description (text, nullable)
   - content (text, required)
   - cover_image (text, nullable)
   - category (text, nullable)
   - tags (text[], default '{}')
   - status (text: draft | published)
   - published_at (timestamptz, nullable)
   - created_at (timestamptz, default now())
   - updated_at (timestamptz, default now())

4. `faqs` — categorized FAQ entries with ordering.
   - id (uuid PK)
   - question (text, required)
   - answer (text, required)
   - category (text: General | Process | Safety | Support)
   - sort_order (int, default 0)
   - is_published (boolean, default false)
   - created_at (timestamptz, default now())

5. `testimonials` — client testimonials / proof.
   - id (uuid PK)
   - client_label (text, required)
   - country (text, nullable)
   - app_category (text, nullable)
   - review_text (text, required)
   - rating (int, 1–5, default 5)
   - proof_image (text, nullable)
   - is_published (boolean, default false)
   - sort_order (int, default 0)
   - created_at (timestamptz, default now())

6. `page_views` — lightweight analytics from CDN geo headers.
   - id (uuid PK)
   - path (text, required)
   - referrer (text, nullable)
   - country (text, nullable)
   - device_type (text)
   - session_id (text, nullable)
   - created_at (timestamptz, default now())

7. `site_settings` — key-value store for contact links, reply time, SEO defaults.
   - key (text PK)
   - value (text, required)
   - updated_at (timestamptz, default now())

## Security (RLS)

- `inquiries`: public INSERT (lead form), admin-only SELECT/UPDATE/DELETE.
- `blog_posts`: public SELECT on published, admin full CRUD.
- `faqs`: public SELECT on published, admin full CRUD.
- `testimonials`: public SELECT on published, admin full CRUD.
- `page_views`: public INSERT only, admin-only SELECT.
- `site_settings`: public SELECT, admin INSERT/UPDATE.
- `admin_profiles`: admin-only access.

Admin role determined by: auth.uid() exists in admin_profiles with role='admin'.
Helper function is_admin() checks this and is used in all admin policies.
*/

-- 1. admin_profiles (must exist before is_admin function)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Helper function: returns true if the current auth user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. inquiries
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  app_name text,
  message text NOT NULL,
  channel text NOT NULL DEFAULT 'email',
  status text NOT NULL DEFAULT 'new',
  country text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_inquiries" ON public.inquiries;
CREATE POLICY "public_insert_inquiries" ON public.inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_inquiries" ON public.inquiries;
CREATE POLICY "admin_select_inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admin_update_inquiries" ON public.inquiries;
CREATE POLICY "admin_update_inquiries" ON public.inquiries
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_inquiries" ON public.inquiries;
CREATE POLICY "admin_delete_inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING (public.is_admin());

-- 3. blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_title text,
  meta_description text,
  content text NOT NULL,
  cover_image text,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_published_blog_posts" ON public.blog_posts;
CREATE POLICY "public_select_published_blog_posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_select_blog_posts" ON public.blog_posts;
CREATE POLICY "admin_select_blog_posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admin_insert_blog_posts" ON public.blog_posts;
CREATE POLICY "admin_insert_blog_posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_blog_posts" ON public.blog_posts;
CREATE POLICY "admin_update_blog_posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_blog_posts" ON public.blog_posts;
CREATE POLICY "admin_delete_blog_posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (public.is_admin());

-- 4. faqs
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_published_faqs" ON public.faqs;
CREATE POLICY "public_select_published_faqs" ON public.faqs
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "admin_select_faqs" ON public.faqs;
CREATE POLICY "admin_select_faqs" ON public.faqs
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admin_insert_faqs" ON public.faqs;
CREATE POLICY "admin_insert_faqs" ON public.faqs
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_faqs" ON public.faqs;
CREATE POLICY "admin_update_faqs" ON public.faqs
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_faqs" ON public.faqs;
CREATE POLICY "admin_delete_faqs" ON public.faqs
  FOR DELETE TO authenticated USING (public.is_admin());

-- 5. testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_label text NOT NULL,
  country text,
  app_category text,
  review_text text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  proof_image text,
  is_published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_published_testimonials" ON public.testimonials;
CREATE POLICY "public_select_published_testimonials" ON public.testimonials
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "admin_select_testimonials" ON public.testimonials;
CREATE POLICY "admin_select_testimonials" ON public.testimonials
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admin_insert_testimonials" ON public.testimonials;
CREATE POLICY "admin_insert_testimonials" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_testimonials" ON public.testimonials;
CREATE POLICY "admin_update_testimonials" ON public.testimonials
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_testimonials" ON public.testimonials;
CREATE POLICY "admin_delete_testimonials" ON public.testimonials
  FOR DELETE TO authenticated USING (public.is_admin());

-- 6. page_views
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  country text,
  device_type text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_page_views" ON public.page_views;
CREATE POLICY "public_insert_page_views" ON public.page_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_page_views" ON public.page_views;
CREATE POLICY "admin_select_page_views" ON public.page_views
  FOR SELECT TO authenticated USING (public.is_admin());

-- 7. site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_site_settings" ON public.site_settings;
CREATE POLICY "public_select_site_settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_site_settings" ON public.site_settings;
CREATE POLICY "admin_update_site_settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_insert_site_settings" ON public.site_settings;
CREATE POLICY "admin_insert_site_settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- admin_profiles policies
DROP POLICY IF EXISTS "admin_select_admin_profiles" ON public.admin_profiles;
CREATE POLICY "admin_select_admin_profiles" ON public.admin_profiles
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admin_insert_admin_profiles" ON public.admin_profiles;
CREATE POLICY "admin_insert_admin_profiles" ON public.admin_profiles
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_admin_profiles" ON public.admin_profiles;
CREATE POLICY "admin_update_admin_profiles" ON public.admin_profiles
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_admin_profiles" ON public.admin_profiles;
CREATE POLICY "admin_delete_admin_profiles" ON public.admin_profiles
  FOR DELETE TO authenticated USING (public.is_admin());

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_faqs_category_sort ON public.faqs(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON public.testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
