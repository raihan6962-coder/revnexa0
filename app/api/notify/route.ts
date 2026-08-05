import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, app_name, message, channel } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ ok: false, reason: 'Telegram not configured' });
    }

    const text = [
      '🔔 New Revnexa Inquiry',
      '',
      `👤 Name: ${full_name}`,
      `📧 Email: ${email}`,
      app_name ? `📱 App: ${app_name}` : '',
      `💬 Channel: ${channel || 'chat'}`,
      '',
      `💬 Message: ${message}`,
    ].filter(Boolean).join('\n');

    const result = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await result.json();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Telegram notification error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to send notification' }, { status: 500 });
  }
}
