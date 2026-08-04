import type { Metadata } from 'next';
import WhyChooseUsClient from './why-choose-us-client';

export const metadata: Metadata = {
  title: 'Why Choose Revnexa | Trusted Google Play Review Service',
  description:
    'Six reasons developers choose Revnexa for Google Play reviews: authentic engagement, full confidentiality, fast response times, quality over quantity, transparent process, and personal service.',
  alternates: {
    canonical: 'https://revnexa.com/why-choose-us',
  },
  openGraph: {
    title: 'Why Choose Revnexa | Trusted Google Play Review Service',
    description:
      'Six reasons developers choose Revnexa: authentic engagement, confidentiality, fast response, quality, transparency, and personal service.',
    url: 'https://revnexa.com/why-choose-us',
  },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsClient />;
}
