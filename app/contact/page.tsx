import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Revnexa | Get a Quote for Google Play Reviews',
  description:
    'Contact Revnexa for a custom Google Play review campaign. Reach us via WhatsApp, Telegram, or email. We typically reply within 3-5 minutes.',
  keywords: ['contact revnexa', 'google play review quote', 'app review contact', 'get app reviews'],
  alternates: {
    canonical: 'https://revnexa.site/contact',
  },
  openGraph: {
    title: 'Contact Revnexa | Get a Quote for Google Play Reviews',
    description:
      'Contact Revnexa for a custom Google Play review campaign. We typically reply within 3-5 minutes.',
    url: 'https://revnexa.site/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Revnexa | Get a Quote for Google Play Reviews',
    description:
      'Contact Revnexa for a custom Google Play review campaign. We typically reply within 3-5 minutes.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
