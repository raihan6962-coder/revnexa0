'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createConversation, sendMessage, getMessages } from '@/lib/chat-db';
import type { Message } from '@/lib/types';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    pollRef.current = setInterval(() => fetchMessages(convId), 2000);
  }, [fetchMessages]);

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

      setConversationId(convId);
      setMessages([{
        id: 'temp-1',
        conversation_id: convId,
        sender: 'client',
        content: initialMessage,
        created_at: new Date().toISOString(),
      }]);
      startPolling(convId);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;
    setSendingMessage(true);

    const msgContent = newMessage;
    setNewMessage('');

    try {
      const { id } = await sendMessage({
        conversation_id: conversationId,
        sender: 'client',
        content: msgContent,
      });

      setMessages((prev) => [...prev, {
        id,
        conversation_id: conversationId,
        sender: 'client',
        content: msgContent,
        created_at: new Date().toISOString(),
      }]);
    } catch {}

    setSendingMessage(false);
  };

  const handleBackToForm = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setConversationId(null);
    setMessages([]);
    setError('');
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

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
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

            {/* Form */}
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
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="border-t border-border px-4 py-3">
                  <div className="flex items-center gap-2">
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
