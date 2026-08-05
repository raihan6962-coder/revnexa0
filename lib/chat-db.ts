'use client';

const API_BASE = '/api/chat';

async function apiCall(action: string, data: Record<string, unknown> = {}): Promise<unknown> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...data }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export async function createConversation(data: {
  client_name: string;
  client_email: string;
  app_name?: string | null;
}): Promise<{ id: string }> {
  return apiCall('create_conversation', data) as Promise<{ id: string }>;
}

export async function getConversations(): Promise<any[]> {
  return apiCall('get_conversations') as Promise<any[]>;
}

export async function sendMessage(data: {
  conversation_id: string;
  sender: string;
  content: string;
}): Promise<{ id: string }> {
  return apiCall('send_message', data) as Promise<{ id: string }>;
}

export async function getMessages(conversationId: string): Promise<any[]> {
  return apiCall('get_messages', { conversation_id: conversationId }) as Promise<any[]>;
}
