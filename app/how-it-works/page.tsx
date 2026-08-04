import type { Metadata } from 'next';
import HowItWorksClient from './how-it-works-client';

export const metadata: Metadata = {
  title: 'How It Works | Google Play Review Process',
  description:
    'Learn how Revnexa delivers authentic Google Play reviews. A simple, transparent 5-step process from your first message to ongoing support.',
  alternates: {
    canonical: 'https://revnexa.com/how-it-works',
  },
  openGraph: {
    title: 'How It Works | Google Play Review Process',
    description:
      'Learn how Revnexa delivers authentic Google Play reviews. A simple, transparent 5-step process.',
    url: 'https://revnexa.com/how-it-works',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
