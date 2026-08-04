import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Revnexa | Ethical Google Play Review Service',
  description:
    'Learn about Revnexa — a focused Google Play review service helping Android developers build credibility through authentic user engagement and genuine feedback.',
  alternates: {
    canonical: 'https://revnexa.com/about',
  },
  openGraph: {
    title: 'About Revnexa | Ethical Google Play Review Service',
    description:
      'Learn about Revnexa — a focused Google Play review service helping Android developers build credibility through authentic user engagement.',
    url: 'https://revnexa.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
