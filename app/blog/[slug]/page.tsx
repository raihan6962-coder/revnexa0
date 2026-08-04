import type { Metadata } from 'next';
import BlogPostClient from './blog-post-client';

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const title = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} | Revnexa Blog`,
    description: `Read about ${title.toLowerCase()} on the Revnexa blog. Expert insights on Google Play reviews and app growth.`,
    alternates: {
      canonical: `https://revnexa.com/blog/${params.slug}`,
    },
    openGraph: {
      title: `${title} | Revnexa Blog`,
      description: `Read about ${title.toLowerCase()} on the Revnexa blog.`,
      url: `https://revnexa.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
