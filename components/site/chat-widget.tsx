'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Clock, ArrowLeft, Paperclip, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createConversation, sendMessage, getMessages, uploadChatFile, conversationExists } from '@/lib/chat-db';
import type { Message } from '@/lib/types';

const CHAT_STORAGE_KEY = 'revnexa_active_chat';

async function notifyTelegram(data: { full_name: string; email: string; app_name?: string | null; message: string; channel: string }) {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {}
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [appName, setAppName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const replyTime = 'We typically reply within 3-5 minutes';

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = useCallback(async (convId: string) => {
    try {
      const data = await getMessages(convId);
      setMessages(data as Message[]);
    } catch {}
  }, []);

  const startPolling = useCallback((convId: string) => {
    if (pollRef.current) clearInterval(pollRef.current);
    fetchMessages(convId);
    pollRef.current = setInterval(() => fetchMessages(convId), 3000);
  }, [fetchMessages]);

  const restoreChat = useCallback(async () => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (!saved) return;
      const { conversationId: convId, client_name, client_email } = JSON.parse(saved);
      if (convId && client_name && client_email) {
        const exists = await conversationExists(convId);
        if (!exists) {
          localStorage.removeItem(CHAT_STORAGE_KEY);
          return;
        }
        setConversationId(convId);
        setClientName(client_name);
        setClientEmail(client_email);
        startPolling(convId);
      }
    } catch {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, [startPolling]);

  const saveChat = (convId: string, cname: string, cemail: string) => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({
      conversationId: convId,
      client_name: cname,
      client_email: cemail,
    }));
  };

  const clearSavedChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  if (pathname?.startsWith('/admin')) return null;

  const handleStartChat = async () => {
    if (!fullName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const { id: convId } = await createConversation({
        client_name: fullName.trim(),
        client_email: email.trim(),
        app_name: appName.trim() || null,
      });

      const initialMessage = `Hi Revnexa team, I'm ${fullName.trim()} and I found your website. I'd like to learn more about your Google Play Store review service${appName ? ` for my app ${appName}` : ''}. Could you share more details?`;

      await sendMessage({
        conversation_id: convId,
        sender: 'client',
        content: initialMessage,
      });

      notifyTelegram({
        full_name: fullName.trim(),
        email: email.trim(),
        app_name: appName.trim() || null,
        message: initialMessage,
        channel: 'chat',
      });

      saveChat(convId, fullName.trim(), email.trim());
      setConversationId(convId);
      setMessages([]);
      startPolling(convId);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  const handleOpen = () => {
    setOpen(true);
    restoreChat();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;
    setSendingMessage(true);
    const msgContent = newMessage;
    setNewMessage('');

    try {
      await sendMessage({
        conversation_id: conversationId,
        sender: 'client',
        content: msgContent,
      });
    } catch {}

    setSendingMessage(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !conversationId) return;

    setUploading(true);
    try {
      const { url, type, name } = await uploadChatFile(file, conversationId);
      await sendMessage({
        conversation_id: conversationId,
        sender: 'client',
        content: name,
        file_url: url,
        file_type: type,
        file_name: name,
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBackToForm = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    clearSavedChat();
    setConversationId(null);
    setMessages([]);
    setError('');
    setFullName('');
    setEmail('');
    setAppName('');
  };

  const handleClose = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setOpen(false);
    setConversationId(null);
    setMessages([]);
    setFullName('');
    setEmail('');
    setAppName('');
    setError('');
  };

  const formValid = fullName.trim().length > 0 && email.trim().length > 0;

  const renderFileAttachment = (msg: Message) => {
    if (!msg.file_url) return null;

    if (msg.file_type?.startsWith('image/')) {
      return (
        <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="block mt-1">
          <img src={msg.file_url} alt={msg.file_name || 'Image'} className="max-w-[200px] max-h-[150px] rounded-lg object-cover" />
        </a>
      );
    }

    return (
      <a
        href={msg.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-1 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20 transition-colors"
      >
        <FileIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{msg.file_name || 'File'}</span>
      </a>
    );
  };

  return (
    <>
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-premium-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm animate-scale-in">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-lg">
            {/* Header */}
            <div className="flex items-center justify-between bg-navy-gradient px-5 py-4 text-secondary-foreground">
              <div className="flex items-center gap-3">
                {conversationId && (
                  <button onClick={handleBackToForm} className="rounded-md p-1 text-secondary-foreground/70 hover:text-secondary-foreground" aria-label="Back">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <p className="font-heading font-semibold">Revnexa</p>
                  <div className="flex items-center gap-1.5 text-xs text-secondary-foreground/70">
                    <span className="flex h-2 w-2 rounded-full bg-primary" /> Online now
                  </div>
                </div>
              </div>
              <button onClick={handleClose} className="rounded-md p-1.5 text-secondary-foreground/70 transition-colors hover:bg-white/10 hover:text-secondary-foreground" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form - only show if no active conversation */}
            {!conversationId ? (
              <div className="space-y-4 px-5 py-5">
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  Hi! Tell us about your app and we&apos;ll get back to you right away.
                </div>
                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="chat-name" className="text-xs">Full Name <span className="text-destructive">*</span></Label>
                    <Input id="chat-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="chat-email" className="text-xs">Email <span className="text-destructive">*</span></Label>
                    <Input id="chat-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="chat-app" className="text-xs">App Name <span className="text-muted-foreground/60">(optional)</span></Label>
                    <Input id="chat-app" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Your app name" className="mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {replyTime}
                </div>
                <Button onClick={handleStartChat} disabled={!formValid || submitting} className="w-full gap-2">
                  {submitting ? 'Starting...' : 'Start Chat'}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              /* Chat Interface */
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === 'client'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        }`}
                      >
                        {msg.content && <p>{msg.content}</p>}
                        {renderFileAttachment(msg)}
                      </div>
                    </div>
                  ))}
                  {uploading && (
                    <div className="flex justify-end">
                      <div className="bg-primary/20 text-primary rounded-2xl px-4 py-2.5 text-sm">
                        Uploading file...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="border-t border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      title="Attach file"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={sendingMessage}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sendingMessage}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground text-center">
                    <Clock className="inline h-3 w-3" /> {replyTime}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
