import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Revnexa | Get a Quote for Google Play Reviews',
  description:
    'Contact Revnexa for a custom Google Play review campaign. Reach us via WhatsApp, Telegram, or email. We typically reply within 3-5 minutes.',
  alternates: {
    canonical: 'https://revnexa.com/contact',
  },
  openGraph: {
    title: 'Contact Revnexa | Get a Quote for Google Play Reviews',
    description:
      'Contact Revnexa for a custom Google Play review campaign. We typically reply within 3-5 minutes.',
    url: 'https://revnexa.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
