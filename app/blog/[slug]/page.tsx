import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/data';
import BlogPostClient from './blog-post-client';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | Revnexa Blog' };
  }
  return {
    title: post.meta_title || `${post.title} | Revnexa Blog`,
    description: post.meta_description || `Read about ${post.title.toLowerCase()} on the Revnexa blog.`,
    keywords: post.tags?.length > 0 ? post.tags : ['google play reviews', 'app ratings', 'aso'],
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || `Read about ${post.title.toLowerCase()}.`,
      url: `https://revnexa.com/blog/${params.slug}`,
      siteName: 'Revnexa',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || `Read about ${post.title.toLowerCase()}.`,
    },
    alternates: {
      canonical: `https://revnexa.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
