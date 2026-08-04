import { NextRequest, NextResponse } from 'next/server';
import { getServerDb } from '@/lib/server-db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, app_name, message, channel } = body;

    const db = getServerDb();
    const settingsResult = await db.query('SELECT key, value FROM site_settings');
    const settings: Record<string, string> = {};
    for (const row of settingsResult.rows as { key: string; value: string }[]) {
      settings[row.key] = row.value;
    }

    const botToken = settings.telegram_bot_token;
    const chatId = settings.telegram_chat_id;

    if (!botToken || !chatId) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const appPart = app_name ? `\n📱 App: ${app_name}` : '';
    const text = [
      '🔔 New Revnexa Chat Inquiry',
      '',
      `👤 Name: ${full_name}`,
      `📧 Email: ${email}`,
      appPart,
      `💬 Channel: ${channel}`,
      '',
      `💬 Message: ${message}`,
    ].filter(Boolean).join('\n');

    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!telegramRes.ok) {
      const err = await telegramRes.text();
      console.error('Telegram error:', err);
      return NextResponse.json({ error: 'Telegram send failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
