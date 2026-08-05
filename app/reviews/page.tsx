import type { Metadata } from 'next';
import ReviewsClient from './reviews-client';

export const metadata: Metadata = {
  title: 'Client Reviews | What Developers Say About Revnexa',
  description:
    'Read authentic reviews from Android developers who used Revnexa\'s Google Play review service to improve their app rating and credibility.',
  keywords: ['revnexa reviews', 'app review proof', 'google play review results', 'client feedback'],
  alternates: {
    canonical: 'https://revnexa.site/reviews',
  },
  openGraph: {
    title: 'Client Reviews | What Developers Say About Revnexa',
    description:
      'Read authentic reviews from Android developers who used Revnexa\'s Google Play review service.',
    url: 'https://revnexa.site/reviews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Reviews | What Developers Say About Revnexa',
    description:
      'Read authentic reviews from Android developers who used Revnexa\'s Google Play review service.',
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
