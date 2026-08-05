'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Clock, MessageCircle, Send, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';
import { ContactForm } from '@/components/site/contact-form';
import { getSiteSettings } from '@/lib/chat-db';
import type { SiteSettings } from '@/lib/types';

export default function ContactClient() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const email = settings.contact_email || 'hello@revnexa.com';
  const replyTime = settings.reply_time_text || 'We typically reply within 3-5 minutes';

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ])} />

      <PageHero
        eyebrow="Contact"
        title="Let\u2019s talk about your app"
        description="Tell us about your app and your goals. We\u2019ll get back to you within minutes \u2014 no forms to fill, no waiting."
        variant="dark"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Send us a message
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Fill in your details and choose how you\u2019d like to connect.
                We\u2019ll pre-fill a message so you don\u2019t have to.
              </p>
              <div className="mt-8">
                <ContactForm settings={settings} />
              </div>
            </div>

            {/* Right: Direct Contact + Trust */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Or reach us directly
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Prefer to reach out on your own? Use any of these channels.
                </p>
                <div className="mt-6 space-y-3">
                  {settings.whatsapp_number && (
                    <a
                      href={`https://wa.me/${settings.whatsapp_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">Chat with us instantly</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  {settings.telegram_username && (
                    <a
                      href={`https://t.me/${settings.telegram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Send className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Telegram</p>
                        <p className="text-sm text-muted-foreground">Message us on Telegram</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Trust */}
              <div className="rounded-2xl border border-border bg-muted p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">{replyTime}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Your information is kept strictly confidential. We never share
                    client details with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
