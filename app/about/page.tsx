import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Revnexa | Ethical Google Play Review Service',
  description:
    'Learn about Revnexa — a focused Google Play review service helping Android developers build credibility through authentic user engagement and genuine feedback.',
  keywords: ['about revnexa', 'google play review service', 'app review company', 'android app reviews', 'revnexa team'],
  alternates: {
    canonical: 'https://revnexa.com/about',
  },
  openGraph: {
    title: 'About Revnexa | Ethical Google Play Review Service',
    description:
      'Learn about Revnexa — a focused Google Play review service helping Android developers build credibility through authentic user engagement.',
    url: 'https://revnexa.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Revnexa | Ethical Google Play Review Service',
    description:
      'Learn about Revnexa — a focused Google Play review service helping Android developers build credibility through authentic user engagement.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
