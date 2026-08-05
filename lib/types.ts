export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';
export type InquiryChannel = 'whatsapp' | 'telegram' | 'email';
export type BlogPostStatus = 'draft' | 'published';
export type FaqCategory = 'General' | 'Process' | 'Safety' | 'Support';
export type ConversationStatus = 'active' | 'closed' | 'archived';
export type MessageSender = 'client' | 'admin';

export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  app_name: string | null;
  message: string;
  channel: InquiryChannel;
  status: InquiryStatus;
  country: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  client_name: string;
  client_email: string;
  app_name: string | null;
  status: ConversationStatus;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: MessageSender;
  content: string;
  file_url: string | null;
  file_type: string | null;
  file_name: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_label: string;
  country: string | null;
  app_category: string | null;
  review_text: string;
  rating: number;
  proof_image: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface PageView {
  id: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device_type: string | null;
  session_id: string | null;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

export type SiteSettings = Record<string, string>;

export const INQUIRY_STATUSES: InquiryStatus[] = [
  'new',
  'contacted',
  'in_progress',
  'converted',
  'closed',
];

export const FAQ_CATEGORIES: FaqCategory[] = [
  'General',
  'Process',
  'Safety',
  'Support',
];
