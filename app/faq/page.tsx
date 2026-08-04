import type { Metadata } from 'next';
import FaqClient from './faq-client';

export const metadata: Metadata = {
  title: 'FAQ | Google Play Review Service Questions Answered',
  description:
    'Get answers to common questions about Revnexa\'s Google Play review service. Learn about our process, safety, pricing, and support.',
  alternates: {
    canonical: 'https://revnexa.com/faq',
  },
  openGraph: {
    title: 'FAQ | Google Play Review Service Questions Answered',
    description:
      'Get answers to common questions about Revnexa\'s Google Play review service.',
    url: 'https://revnexa.com/faq',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
