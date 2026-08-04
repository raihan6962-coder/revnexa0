'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSiteSettings, insertInquiry, sendTelegramNotification } from '@/lib/data';
import type { SiteSettings } from '@/lib/types';

type Channel = 'whatsapp' | 'telegram' | 'email';

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [appName, setAppName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    getSiteSettings().then(setSettings);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

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
      const contactEmail = settings.contact_email || 'hello@revnexa.com';
      const subject = 'Inquiry about Google Play Store Review Service';
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setFullName('');
      setEmail('');
      setAppName('');
    }, 2500);
  };

  const formValid = fullName.trim() && email.trim();

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
            <div className="flex items-center justify-between bg-navy-gradient px-5 py-4 text-secondary-foreground">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold">R</span>
                <div>
                  <p className="font-heading font-semibold">Revnexa</p>
                  <div className="flex items-center gap-1.5 text-xs text-secondary-foreground/70">
                    <span className="flex h-2 w-2 rounded-full bg-primary" /> Online now
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1.5 text-secondary-foreground/70 transition-colors hover:bg-white/10 hover:text-secondary-foreground" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <p className="font-heading font-semibold text-foreground">Message sent!</p>
                <p className="text-sm text-muted-foreground">We&apos;ll be with you shortly. Check your chat app for our reply.</p>
              </div>
            ) : (
              <div className="space-y-4 px-5 py-5">
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  Hi! Tell us about your app and we&apos;ll get back to you right away.
                </div>
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
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Choose your preferred channel:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {settings.whatsapp_number && (
                      <Button onClick={() => handleSubmit('whatsapp')} disabled={!formValid || submitting} className="w-full justify-start gap-2" size="sm">
                        <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
                      </Button>
                    )}
                    {settings.telegram_username && (
                      <Button onClick={() => handleSubmit('telegram')} disabled={!formValid || submitting} className="w-full justify-start gap-2" size="sm">
                        <Send className="h-4 w-4" /> Continue on Telegram
                      </Button>
                    )}
                    <Button onClick={() => handleSubmit('email')} disabled={!formValid || submitting} variant="outline" className="w-full justify-start gap-2" size="sm">
                      <Mail className="h-4 w-4" /> Send via Email
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
