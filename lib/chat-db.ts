'use client';

import { supabase } from './supabase';
import type { Conversation, Message, MessageSender, Testimonial, Faq } from './types';

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

// Testimonials
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function upsertTestimonial(t: Partial<Testimonial> & { client_label: string; review_text: string }): Promise<void> {
  if (t.id) {
    await supabase.from('testimonials').update({
      client_label: t.client_label,
      country: t.country || null,
      app_category: t.app_category || null,
      review_text: t.review_text,
      rating: t.rating || 5,
      proof_image: t.proof_image || null,
      is_published: t.is_published || false,
      sort_order: t.sort_order || 0,
    }).eq('id', t.id);
  } else {
    await supabase.from('testimonials').insert({
      client_label: t.client_label,
      country: t.country || null,
      app_category: t.app_category || null,
      review_text: t.review_text,
      rating: t.rating || 5,
      proof_image: t.proof_image || null,
      is_published: t.is_published || false,
      sort_order: t.sort_order || 0,
    });
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  await supabase.from('testimonials').delete().eq('id', id);
}

// FAQs
export async function getPublishedFaqs(): Promise<Faq[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getAllFaqs(): Promise<Faq[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function upsertFaq(faq: Partial<Faq> & { question: string; answer: string }): Promise<void> {
  if (faq.id) {
    await supabase.from('faqs').update({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      sort_order: faq.sort_order || 0,
      is_published: faq.is_published || false,
    }).eq('id', faq.id);
  } else {
    await supabase.from('faqs').insert({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      sort_order: faq.sort_order || 0,
      is_published: faq.is_published || false,
    });
  }
}

export async function deleteFaq(id: string): Promise<void> {
  await supabase.from('faqs').delete().eq('id', id);
}
