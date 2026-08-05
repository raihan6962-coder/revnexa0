'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle, Send, Clock } from 'lucide-react';
import { getSiteSettings } from '@/lib/chat-db';
import type { SiteSettings } from '@/lib/types';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/play-store-review-service', label: 'Service' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/why-choose-us', label: 'Why Us' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
];

export function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    getSiteSettings().then(setSettings);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  const whatsapp = settings.whatsapp_number;
  const telegram = settings.telegram_username;
  const email = settings.contact_email || 'hello@revnexa.site';
  const replyTime = settings.reply_time_text || 'We typically reply within 3-5 minutes';
  const whatsappMsg = encodeURIComponent('Hi Revnexa team! I found your website and I am interested in your Google Play Store review service. Could you share more details?');
  const telegramMsg = encodeURIComponent('Hi Revnexa team! I found your website and I am interested in your Google Play Store review service. Could you share more details?');

  return (
    <footer className="bg-navy-gradient text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Revnexa"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-secondary-foreground/70">
              Professional Google Play Store review service helping apps grow through authentic user engagement and rating improvement support.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
              {telegram && (
                <a href={`https://t.me/${telegram}?text=${telegramMsg}`} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Telegram">
                  <Send className="h-5 w-5" />
                </a>
              )}
              <a href={`mailto:${email}`} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary-foreground/80">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary-foreground/80">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.slice(7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-secondary-foreground/60">&copy; {new Date().getFullYear()} Revnexa. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
            <Clock className="h-4 w-4 text-primary" /> <span>{replyTime}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
