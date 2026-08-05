import { NextRequest, NextResponse } from 'next/server';
import { PGlite } from '@electric-sql/pglite';

export const dynamic = 'force-dynamic';

const CHAT_SCHEMA = `
CREATE TABLE IF NOT EXISTS chat_conversations (
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
`;

let dbInstance: PGlite | null = null;

async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  const db = new PGlite('idb://revnexa-chat-api');
  await db.exec(CHAT_SCHEMA);
  dbInstance = db;
  return db;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDb();

    if (action === 'create_conversation') {
      const { client_name, client_email, app_name } = body;
      if (!client_name || !client_email) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      }
      const id = crypto.randomUUID();
      await db.query(
        `INSERT INTO chat_conversations (id, client_name, client_email, app_name, status, last_message_at, created_at)
         VALUES ($1, $2, $3, $4, 'active', now(), now())`,
        [id, client_name, client_email, app_name || null]
      );
      return NextResponse.json({ id });
    }

    if (action === 'send_message') {
      const { conversation_id, sender, content } = body;
      if (!conversation_id || !sender || !content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const id = crypto.randomUUID();
      await db.query(
        `INSERT INTO chat_messages (id, conversation_id, sender, content, created_at)
         VALUES ($1, $2, $3, $4, now())`,
        [id, conversation_id, sender, content]
      );
      await db.query(
        `UPDATE chat_conversations SET last_message_at = now() WHERE id = $1`,
        [conversation_id]
      );
      return NextResponse.json({ id });
    }

    if (action === 'get_conversations') {
      const result = await db.query(
        `SELECT * FROM chat_conversations ORDER BY last_message_at DESC`
      );
      return NextResponse.json(result.rows);
    }

    if (action === 'get_messages') {
      const { conversation_id } = body;
      const result = await db.query(
        `SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC`,
        [conversation_id]
      );
      return NextResponse.json(result.rows);
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.query(
      `SELECT * FROM chat_conversations ORDER BY last_message_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
