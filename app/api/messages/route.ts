import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversation_id, sender, content } = body;

    if (!conversation_id || !sender || !content) {
      return NextResponse.json({ error: 'conversation_id, sender, and content are required' }, { status: 400 });
    }

    const db = await getDb();
    const id = crypto.randomUUID();

    await db.query(
      `INSERT INTO messages (id, conversation_id, sender, content, created_at)
       VALUES ($1, $2, $3, $4, now())`,
      [id, conversation_id, sender, content]
    );

    await db.query(
      `UPDATE conversations SET last_message_at = now() WHERE id = $1`,
      [conversation_id]
    );

    return NextResponse.json({ id, conversation_id, sender, content });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversation_id');

    if (!conversationId) {
      return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.query(
      `SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC`,
      [conversationId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
