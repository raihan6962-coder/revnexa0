import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = 'https://avyozwwgjoprnpjhopog.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2eW96d3dnam9wcm5wamhvcG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDQ3NTMsImV4cCI6MjEwMTQ4MDc1M30.C27zRjxGOAe_hsOHDXvr1BmCnFrr_aQJ2hNoiPcLJdg';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, app_name, message, channel } = body;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: settings } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['telegram_bot_token', 'telegram_chat_id']);

    const settingsMap: Record<string, string> = {};
    if (settings) {
      for (const row of settings) {
        settingsMap[row.key] = row.value;
      }
    }

    const botToken = settingsMap.telegram_bot_token;
    const chatId = settingsMap.telegram_chat_id;

    if (!botToken || !chatId) {
      return NextResponse.json({ ok: false, reason: 'Telegram not configured in settings' });
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
