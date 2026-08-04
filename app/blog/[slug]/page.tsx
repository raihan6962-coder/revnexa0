'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowRight, ArrowLeft, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema, blogPostingSchema } from '@/components/site/json-ld';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data';
import type { BlogPost } from '@/lib/types';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const found = await getBlogPostBySlug(slug);
        if (!active) return;
        setPost(found);
        if (found) {
          const relatedPosts = await getRelatedBlogPosts(found.slug, found.category, 3);
          if (!active) return;
          setRelated(relatedPosts);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={blogPostingSchema({
        title: post.title,
        description: post.meta_description || post.title,
        publishedAt: post.published_at || post.created_at,
        slug: post.slug,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ])} />

      {/* Article Header */}
      <article className="px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {post.category && (
            <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              {post.category}
            </span>
          )}

          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose-content mt-10"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Inline CTA */}
          <div className="mt-12 rounded-2xl border border-border bg-muted p-6 text-center">
            <p className="font-heading text-lg font-semibold text-foreground">
              Want to grow your app&apos;s rating?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Let&apos;s talk about your app. We typically reply within 3-5 minutes.
            </p>
            <Button asChild className="mt-4 gap-2">
              <Link href="/contact">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Related articles
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
                >
                  {rp.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {rp.category}
                    </span>
                  )}
                  <h3 className="mt-2 font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {rp.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {rp.meta_description || rp.title}
                  </p>
                  <span className="mt-4 text-xs text-muted-foreground">
                    {new Date(rp.published_at || rp.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(- .+)$/gm, '<li>$1</li>')
    .replace(/<li>- /g, '<li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^>/gm, '<blockquote>')
    .split('\n')
    .map((line) => {
      if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('<blockquote') || line.startsWith('<p>') || line.startsWith('</')) {
        return line;
      }
      return line.trim() ? `<p>${line}</p>` : '';
    })
    .join('\n');
}
