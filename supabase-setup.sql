DROP POLICY IF EXISTS "Allow all on chat_conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Allow all on chat_messages" ON chat_messages;
DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can upload chat files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read chat files" ON storage.objects;

-- Site Settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  app_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('client', 'admin')),
  content TEXT NOT NULL DEFAULT '',
  file_url TEXT,
  file_type TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON chat_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON chat_conversations(status, last_message_at DESC);

-- Enable RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow all on chat_conversations" ON chat_conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-files', 'chat-files', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Anyone can upload chat files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'chat-files');
CREATE POLICY "Anyone can read chat files" ON storage.objects FOR SELECT USING (bucket_id = 'chat-files');

-- Insert Telegram credentials
INSERT INTO site_settings (key, value) VALUES ('telegram_bot_token', '8801902296:AAGGkLeu8-JtiahYr82AjE6Dd7PrNNdIg-I')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO site_settings (key, value) VALUES ('telegram_chat_id', '7740020918')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
