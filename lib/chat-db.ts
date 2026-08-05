'use client';

import type { Conversation, Message, MessageSender } from './types';

const CONV_KEY = 'revnexa_conversations';
const MSG_KEY = 'revnexa_messages';

function getConversationsFromStorage(): Conversation[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CONV_KEY) || '[]');
  } catch {
    return [];
  }
}

function getMessagesFromStorage(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveConversations(convs: Conversation[]) {
  localStorage.setItem(CONV_KEY, JSON.stringify(convs));
}

function saveMessages(msgs: Message[]) {
  localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
}

export async function createConversation(data: {
  client_name: string;
  client_email: string;
  app_name?: string | null;
}): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const convs = getConversationsFromStorage();
  convs.unshift({
    id,
    client_name: data.client_name,
    client_email: data.client_email,
    app_name: data.app_name || null,
    status: 'active',
    last_message_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  });
  saveConversations(convs);
  return { id };
}

export async function getConversations(): Promise<Conversation[]> {
  return getConversationsFromStorage();
}

export async function sendMessage(data: {
  conversation_id: string;
  sender: MessageSender;
  content: string;
}): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const msgs = getMessagesFromStorage();
  msgs.push({
    id,
    conversation_id: data.conversation_id,
    sender: data.sender,
    content: data.content,
    created_at: new Date().toISOString(),
  });
  saveMessages(msgs);

  const convs = getConversationsFromStorage();
  const conv = convs.find((c) => c.id === data.conversation_id);
  if (conv) {
    conv.last_message_at = new Date().toISOString();
    saveConversations(convs);
  }

  return { id };
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  return getMessagesFromStorage().filter(
    (m) => m.conversation_id === conversationId
  );
}
