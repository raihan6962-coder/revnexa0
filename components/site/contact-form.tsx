'use client';

import { useState } from 'react';
import { MessageCircle, Send, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { insertInquiry, sendTelegramNotification } from '@/lib/data';
import type { SiteSettings } from '@/lib/types';

type Channel = 'whatsapp' | 'telegram' | 'email';

interface ContactFormProps {
  settings: SiteSettings;
}

export function ContactForm({ settings }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [appName, setAppName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const replyTime = settings.reply_time_text || 'We typically reply within 3-5 minutes';

  const buildMessage = () => {
    const appPart = appName ? ` for my app ${appName}` : '';
    return `Hi Revnexa team, I'm ${fullName} and I found your website. I'd like to learn more about your Google Play Store review service${appPart}. Could you share more details?`;
  };

  const handleSubmit = async (channel: Channel) => {
    if (!fullName || !email) return;
    const message = buildMessage();
    setSubmitting(true);

    insertInquiry({ full_name: fullName, email, app_name: appName || null, message, channel }).catch(() => {});
    sendTelegramNotification({ full_name: fullName, email, app_name: appName || null, message, channel }).catch(() => {});

    if (channel === 'whatsapp' && settings.whatsapp_number) {
      window.open(`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (channel === 'telegram' && settings.telegram_username) {
      window.open(`https://t.me/${settings.telegram_username}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (channel === 'email') {
      const contactEmail = settings.contact_email || 'hello@revnexa.site';
      const subject = 'Inquiry about Google Play Store Review Service';
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const formValid = fullName.trim() && email.trim();

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-premium">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">Message sent!</p>
          <p className="mt-1 text-sm text-muted-foreground">We&apos;ll be with you shortly. Check your chat app or email for our reply.</p>
        </div>
        <Button variant="outline" onClick={() => { setSubmitted(false); setFullName(''); setEmail(''); setAppName(''); }}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-premium sm:p-8">
      <div>
        <Label htmlFor="contact-name">Full Name <span className="text-destructive">*</span></Label>
        <Input id="contact-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="contact-email">Email <span className="text-destructive">*</span></Label>
        <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="contact-app">App Name <span className="text-muted-foreground/60">(optional)</span></Label>
        <Input id="contact-app" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Your app name" className="mt-1.5" />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 text-primary" /> {replyTime}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Choose your preferred channel:</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {settings.whatsapp_number && (
            <Button onClick={() => handleSubmit('whatsapp')} disabled={!formValid || submitting} className="gap-2" size="sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          )}
          {settings.telegram_username && (
            <Button onClick={() => handleSubmit('telegram')} disabled={!formValid || submitting} className="gap-2" size="sm">
              <Send className="h-4 w-4" /> Telegram
            </Button>
          )}
          <Button onClick={() => handleSubmit('email')} disabled={!formValid || submitting} variant="outline" className="gap-2" size="sm">
            <Mail className="h-4 w-4" /> Email
          </Button>
        </div>
      </div>
    </div>
  );
}
