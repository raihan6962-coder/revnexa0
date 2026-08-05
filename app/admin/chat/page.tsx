'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { MessageCircle, Send, ArrowLeft, User, Paperclip, FileIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getConversations, getMessages, sendMessage, uploadChatFile, closeConversation, deleteConversation } from '@/lib/chat-db';
import type { Conversation, Message } from '@/lib/types';

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadConversations();
    pollRef.current = setInterval(loadConversations, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
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
      const data = await getConversations();
      setConversations(data as Conversation[]);
    } catch {}
  }

  async function loadMessages(conversationId: string) {
    try {
      const data = await getMessages(conversationId);
      setMessages(data as Message[]);
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
      await sendMessage({
        conversation_id: selected.id,
        sender: 'admin',
        content: msgContent,
      });
    } catch {}

    setSending(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;

    setUploading(true);
    try {
      const { url, type, name } = await uploadChatFile(file, selected.id);
      await sendMessage({
        conversation_id: selected.id,
        sender: 'admin',
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

  const handleClose = async () => {
    if (!selected) return;
    try {
      await closeConversation(selected.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === selected.id ? { ...c, status: 'closed' } : c))
      );
      setSelected({ ...selected, status: 'closed' });
    } catch {}
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!confirm('Delete this chat permanently? The user will also lose access to this chat.')) return;
    try {
      await deleteConversation(selected.id);
      setConversations((prev) => prev.filter((c) => c.id !== selected.id));
      if (pollRef.current) clearInterval(pollRef.current);
      setSelected(null);
      setMessages([]);
    } catch {}
  };

  const handleBack = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setSelected(null);
    setMessages([]);
  };

  const renderFileAttachment = (msg: Message) => {
    if (!msg.file_url) return null;

    if (msg.file_type?.startsWith('image/')) {
      return (
        <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="block mt-1">
          <img src={msg.file_url} alt={msg.file_name || 'Image'} className="max-w-[250px] max-h-[200px] rounded-lg object-cover" />
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Live Chat</h1>
          <p className="mt-1 text-sm text-muted-foreground">{conversations.length} total conversations</p>
        </div>
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
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2">
              {selected.status === 'active' && (
                <Button variant="outline" size="sm" onClick={handleClose}>
                  Close
                </Button>
              )}
              <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-1">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
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
                    {msg.content && <p>{msg.content}</p>}
                    {renderFileAttachment(msg)}
                  </div>
                </div>
              ))}
              {uploading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2.5 text-sm">
                    Uploading file...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {selected.status === 'active' && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
