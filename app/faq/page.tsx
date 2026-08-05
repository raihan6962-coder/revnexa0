import type { Metadata } from 'next';
import FaqClient from './faq-client';

export const metadata: Metadata = {
  title: 'FAQ | Google Play Review Service Questions Answered',
  description:
    'Get answers to common questions about Revnexa\'s Google Play review service. Learn about our process, safety, pricing, and support.',
  keywords: ['google play review faq', 'app review questions', 'revnexa faq', 'play store review help'],
  alternates: {
    canonical: 'https://revnexa.site/faq',
  },
  openGraph: {
    title: 'FAQ | Google Play Review Service Questions Answered',
    description:
      'Get answers to common questions about Revnexa\'s Google Play review service.',
    url: 'https://revnexa.site/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Google Play Review Service Questions Answered',
    description:
      'Get answers to common questions about Revnexa\'s Google Play review service.',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
