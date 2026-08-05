'use client';

import { supabase } from './supabase';
import type { Conversation, Message, MessageSender } from './types';

export async function createConversation(data: {
  client_name: string;
  client_email: string;
  app_name?: string | null;
}): Promise<{ id: string }> {
  const { data: conv, error } = await supabase
    .from('chat_conversations')
    .insert({
      client_name: data.client_name,
      client_email: data.client_email,
      app_name: data.app_name || null,
      status: 'active',
    })
    .select('id')
    .single();

  if (error) throw error;
  return { id: conv.id };
}

export async function getConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('chat_conversations')
    .select('*')
    .order('last_message_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function sendMessage(data: {
  conversation_id: string;
  sender: MessageSender;
  content: string;
  file_url?: string | null;
  file_type?: string | null;
  file_name?: string | null;
}): Promise<{ id: string }> {
  const { data: msg, error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: data.conversation_id,
      sender: data.sender,
      content: data.content,
      file_url: data.file_url || null,
      file_type: data.file_type || null,
      file_name: data.file_name || null,
    })
    .select('id')
    .single();

  if (error) throw error;

  await supabase
    .from('chat_conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', data.conversation_id);

  return { id: msg.id };
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function closeConversation(id: string): Promise<void> {
  await supabase
    .from('chat_conversations')
    .update({ status: 'closed' })
    .eq('id', id);
}

export async function deleteConversation(id: string): Promise<void> {
  await supabase
    .from('chat_messages')
    .delete()
    .eq('conversation_id', id);

  await supabase
    .from('chat_conversations')
    .delete()
    .eq('id', id);
}

export async function conversationExists(id: string): Promise<boolean> {
  const { data } = await supabase
    .from('chat_conversations')
    .select('id')
    .eq('id', id)
    .single();
  return !!data;
}

export async function uploadChatFile(
  file: File,
  conversationId: string
): Promise<{ url: string; type: string; name: string }> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `chat/${conversationId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('chat-files')
    .upload(path, file, { contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from('chat-files').getPublicUrl(path);

  return {
    url: data.publicUrl,
    type: file.type,
    name: file.name,
  };
}

export async function uploadTestimonialImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `testimonials/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('chat-files').upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from('chat-files').getPublicUrl(path);
  return data.publicUrl;
}
