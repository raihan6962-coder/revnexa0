import type { Metadata } from 'next';
import ServiceClient from './service-client';

export const metadata: Metadata = {
  title: 'Google Play Store Review Service | Real User Feedback',
  description:
    'Professional Google Play Store review service. Get authentic reviews from real Android users to improve your app rating, build credibility, and boost organic downloads.',
  alternates: {
    canonical: 'https://revnexa.com/play-store-review-service',
  },
  openGraph: {
    title: 'Google Play Store Review Service | Real User Feedback',
    description:
      'Professional Google Play Store review service. Get authentic reviews from real Android users to improve your app rating.',
    url: 'https://revnexa.com/play-store-review-service',
  },
};

export default function ServicePage() {
  return <ServiceClient />;
}
