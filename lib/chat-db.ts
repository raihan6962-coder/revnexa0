'use client';

import { getDb } from '@/lib/db';

let initialized = false;

async function ensureTables() {
  if (initialized) return;
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      app_name TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  initialized = true;
}

export async function createConversation(data: {
  client_name: string;
  client_email: string;
  app_name?: string | null;
}): Promise<{ id: string }> {
  await ensureTables();
  const db = await getDb();
  const id = crypto.randomUUID();

  await db.query(
    `INSERT INTO conversations (id, client_name, client_email, app_name, status, last_message_at, created_at)
     VALUES ($1, $2, $3, $4, 'active', now(), now())`,
    [id, data.client_name, data.client_email, data.app_name || null]
  );

  return { id };
}

export async function getConversations(): Promise<any[]> {
  await ensureTables();
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM conversations ORDER BY last_message_at DESC`
  );
  return result.rows;
}

export async function sendMessage(data: {
  conversation_id: string;
  sender: string;
  content: string;
}): Promise<{ id: string }> {
  await ensureTables();
  const db = await getDb();
  const id = crypto.randomUUID();

  await db.query(
    `INSERT INTO chat_messages (id, conversation_id, sender, content, created_at)
     VALUES ($1, $2, $3, $4, now())`,
    [id, data.conversation_id, data.sender, data.content]
  );

  await db.query(
    `UPDATE conversations SET last_message_at = now() WHERE id = $1`,
    [data.conversation_id]
  );

  return { id };
}

export async function getMessages(conversationId: string): Promise<any[]> {
  await ensureTables();
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC`,
    [conversationId]
  );
  return result.rows;
}
