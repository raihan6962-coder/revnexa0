import type { Metadata } from 'next';
import ReviewsClient from './reviews-client';

export const metadata: Metadata = {
  title: 'Client Reviews | What Developers Say About Revnexa',
  description:
    'Read authentic reviews from Android developers who used Revnexa\'s Google Play review service to improve their app rating and credibility.',
  alternates: {
    canonical: 'https://revnexa.com/reviews',
  },
  openGraph: {
    title: 'Client Reviews | What Developers Say About Revnexa',
    description:
      'Read authentic reviews from Android developers who used Revnexa\'s Google Play review service.',
    url: 'https://revnexa.com/reviews',
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
