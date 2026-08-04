import { NextRequest, NextResponse } from 'next/server';
import { getServerDb } from '@/lib/server-db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_name, client_email, app_name } = body;

    if (!client_name || !client_email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const db = getServerDb();
    const id = crypto.randomUUID();

    await db.query(
      `INSERT INTO conversations (id, client_name, client_email, app_name, status, last_message_at, created_at)
       VALUES ($1, $2, $3, $4, 'active', now(), now())`,
      [id, client_name, client_email, app_name || null]
    );

    return NextResponse.json({ id, client_name, client_email, app_name });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getServerDb();
    const result = await db.query(
      `SELECT * FROM conversations ORDER BY last_message_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
