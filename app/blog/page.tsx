import type { Metadata } from 'next';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: 'Blog | Google Play Reviews & App Growth Insights',
  description:
    'Expert insights on Google Play reviews, app ratings, ASO strategies, and growth tactics to help Android developers succeed.',
  alternates: {
    canonical: 'https://revnexa.com/blog',
  },
  openGraph: {
    title: 'Blog | Google Play Reviews & App Growth Insights',
    description:
      'Expert insights on Google Play reviews, app ratings, ASO strategies, and growth tactics.',
    url: 'https://revnexa.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
