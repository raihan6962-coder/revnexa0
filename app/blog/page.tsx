import type { Metadata } from 'next';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: 'Blog | Google Play Reviews & App Growth Insights',
  description:
    'Expert insights on Google Play reviews, app ratings, ASO strategies, and growth tactics to help Android developers succeed.',
  keywords: ['app review blog', 'google play tips', 'aso blog', 'android app growth'],
  alternates: {
    canonical: 'https://revnexa.site/blog',
  },
  openGraph: {
    title: 'Blog | Google Play Reviews & App Growth Insights',
    description:
      'Expert insights on Google Play reviews, app ratings, ASO strategies, and growth tactics.',
    url: 'https://revnexa.site/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Google Play Reviews & App Growth Insights',
    description:
      'Expert insights on Google Play reviews, app ratings, ASO strategies, and growth tactics.',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
