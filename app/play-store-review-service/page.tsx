import type { Metadata } from 'next';
import ServiceClient from './service-client';

export const metadata: Metadata = {
  title: 'Google Play Store Review Service | Real User Feedback',
  description:
    'Professional Google Play review service. Get authentic reviews from real Android users to improve ratings and boost downloads.',
  keywords: ['google play store review service', 'android app reviews', 'play store ratings', 'app review service', 'google play feedback'],
  alternates: {
    canonical: 'https://revnexa.com/play-store-review-service',
  },
  openGraph: {
    title: 'Google Play Store Review Service | Real User Feedback',
    description:
      'Professional Google Play review service. Get authentic reviews from real Android users to improve ratings and boost downloads.',
    url: 'https://revnexa.com/play-store-review-service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Play Store Review Service | Real User Feedback',
    description:
      'Professional Google Play review service. Get authentic reviews from real Android users to improve ratings and boost downloads.',
  },
};

export default function ServicePage() {
  return <ServiceClient />;
}
