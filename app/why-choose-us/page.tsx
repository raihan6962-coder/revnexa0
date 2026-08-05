import type { Metadata } from 'next';
import WhyChooseUsClient from './why-choose-us-client';

export const metadata: Metadata = {
  title: 'Why Choose Revnexa | Trusted Google Play Review Service',
  description:
    'Six reasons developers choose Revnexa: authentic engagement, confidentiality, fast response, quality reviews, transparency, and personal service.',
  keywords: ['why choose revnexa', 'best app review service', 'google play review provider', 'trusted app reviews'],
  alternates: {
    canonical: 'https://revnexa.site/why-choose-us',
  },
  openGraph: {
    title: 'Why Choose Revnexa | Trusted Google Play Review Service',
    description:
      'Six reasons developers choose Revnexa: authentic engagement, confidentiality, fast response, quality reviews, transparency, and personal service.',
    url: 'https://revnexa.site/why-choose-us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Revnexa | Trusted Google Play Review Service',
    description:
      'Six reasons developers choose Revnexa: authentic engagement, confidentiality, fast response, quality reviews, transparency, and personal service.',
  },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsClient />;
}
