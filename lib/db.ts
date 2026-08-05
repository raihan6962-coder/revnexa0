import { PGlite } from '@electric-sql/pglite';
import { BLOG_SEED_SQL } from '@/lib/blog-seed';

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  app_name TEXT,
  message TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'email',
  status TEXT NOT NULL DEFAULT 'new',
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  app_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('client', 'admin')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_label TEXT NOT NULL,
  country TEXT,
  app_category TEXT,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  proof_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_views (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  path TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  device_type TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const SEED_SQL = `
INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number', ''),
  ('telegram_username', ''),
  ('contact_email', 'hello@revnexa.com'),
  ('discord_url', ''),
  ('reply_time_text', 'We typically reply within 3-5 minutes'),
  ('default_meta_title', 'Revnexa - Google Play Store Review Service'),
  ('default_meta_description', 'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.'),
  ('site_name', 'Revnexa'),
  ('telegram_bot_token', ''),
  ('telegram_chat_id', '')
ON CONFLICT (key) DO NOTHING;

INSERT INTO faqs (question, answer, category, sort_order, is_published) VALUES
  ('What is a Google Play Store review service?', 'A Google Play Store review service helps app developers grow their app''s visibility and credibility through authentic user engagement and rating improvement strategies. We focus on generating genuine feedback from real users to support your app''s organic growth.', 'General', 1, true),
  ('How does Revnexa work?', 'The process is simple: reach out to us via WhatsApp, Telegram, or email, tell us about your app and goals, and we''ll discuss a tailored approach. Once details are confirmed, we deliver the service and provide ongoing support.', 'General', 2, true),
  ('Which countries do you serve?', 'We work with clients worldwide, with a primary focus on the US, UK, Canada, and Australia markets. However, we can accommodate requests from other regions as well.', 'General', 3, true),
  ('How long does it take to see results?', 'Timelines vary depending on your app''s current standing and goals. During our initial conversation, we''ll provide a realistic timeline based on your specific situation.', 'Process', 4, true),
  ('Is my app information kept confidential?', 'Absolutely. We treat all client information with strict confidentiality. Your app details, strategy discussions, and our working relationship are never shared with third parties.', 'Safety', 5, true),
  ('Are the reviews from real users?', 'We focus on authentic user engagement and verified feedback acquisition. Our approach prioritizes genuine interactions that align with platform guidelines.', 'Safety', 6, true),
  ('Will this affect my Google Play developer account?', 'Our approach is designed to be safe and sustainable. We prioritize methods that support organic growth without putting your developer account at risk.', 'Safety', 7, true),
  ('How do I get started?', 'Simply reach out via our contact page, WhatsApp, Telegram, or email. Share your app details and goals, and we''ll take it from there. We typically reply within 3-5 minutes.', 'Support', 8, true),
  ('Do you offer ongoing support?', 'Yes, we provide ongoing support throughout and after the service delivery. If you have questions or need adjustments, our team is available to help.', 'Support', 9, true),
  ('Can you help with negative reviews?', 'Yes, we can help you develop a strategy for managing and responding to negative reviews on Google Play, as part of a broader rating improvement approach.', 'Process', 10, true)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (client_label, country, app_category, review_text, rating, is_published, sort_order) VALUES
  ('Alex M.', 'United States', 'Productivity', 'Revnexa helped our productivity app climb from a 3.2 to 4.6 rating in just a few weeks. The process was smooth and the team was always available to answer questions.', 5, true, 1),
  ('Priya S.', 'United Kingdom', 'Education', 'Professional and discreet. They understood our app''s needs and delivered exactly what was discussed. Highly recommend for any developer serious about growth.', 5, true, 2),
  ('James K.', 'Canada', 'Finance', 'Our finance app was struggling with visibility. After working with Revnexa, we saw a noticeable improvement in both ratings and downloads. Great service.', 5, true, 3),
  ('Sarah L.', 'Australia', 'Health & Fitness', 'The team at Revnexa is responsive and knowledgeable. They helped us build credibility through genuine user engagement. Worth every moment.', 5, true, 4),
  ('Daniel R.', 'United States', 'Games', 'I was skeptical at first, but the results speak for themselves. Our game''s rating improved significantly and the reviews feel authentic.', 5, true, 5),
  ('Emma T.', 'United Kingdom', 'Lifestyle', 'Revnexa provided a clear, honest process from start to finish. No vague promises, just real results. Our lifestyle app is finally getting the attention it deserves.', 5, true, 6)
ON CONFLICT DO NOTHING;
`;

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite('idb://revnexa-db');
    await db.exec(SCHEMA_SQL);
    await db.exec(SEED_SQL);
    await db.exec(BLOG_SEED_SQL);
    dbInstance = db;
    return db;
  })();

  return initPromise;
}
