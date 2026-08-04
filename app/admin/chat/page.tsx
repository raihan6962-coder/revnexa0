'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { MessageCircle, Send, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Conversation, Message } from '@/lib/types';

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selected) {
      loadMessages(selected.id);
      startPolling(selected.id);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selected]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadConversations() {
    try {
      const res = await fetch('/api/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch {}
  }

  async function loadMessages(conversationId: string) {
    try {
      const res = await fetch(`/api/messages?conversation_id=${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch {}
  }

  const startPolling = useCallback((conversationId: string) => {
    if (pollRef.current) clearInterval(pollRef.current);
    loadMessages(conversationId);
    pollRef.current = setInterval(() => loadMessages(conversationId), 3000);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selected) return;
    setSending(true);

    const msgContent = newMessage;
    setNewMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: selected.id, sender: 'admin', content: msgContent }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, {
          id: data.id,
          conversation_id: selected.id,
          sender: 'admin',
          content: msgContent,
          created_at: new Date().toISOString(),
        }]);
      }
    } catch {}

    setSending(false);
  };

  const handleBack = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setSelected(null);
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Live Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">{conversations.length} total conversations</p>
      </div>

      {!selected ? (
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <MessageCircle className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">No conversations yet. Waiting for clients to start a chat...</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelected(conv)}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-premium cursor-pointer transition-all hover:shadow-premium-lg hover:border-primary/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{conv.client_name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      conv.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {conv.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.client_email}</p>
                  {conv.app_name && (
                    <p className="text-xs text-primary mt-0.5">App: {conv.app_name}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(conv.last_message_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-premium overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
            <button onClick={handleBack} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{selected.client_name}</p>
              <p className="text-xs text-muted-foreground">{selected.client_email}</p>
            </div>
          </div>

          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">No messages yet</p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'admin'
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
                  placeholder="Type your reply..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={sending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
