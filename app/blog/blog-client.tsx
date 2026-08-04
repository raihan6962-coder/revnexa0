'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';
import { getPublishedBlogPosts } from '@/lib/data';
import { BlogSearch } from '@/components/site/blog-search';
import type { BlogPost } from '@/lib/types';

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedBlogPosts().then(setPosts);
  }, []);

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean)),
  ).sort() as string[];

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
      ])} />

      <PageHero
        eyebrow="Blog"
        title="Insights for app developers"
        description="Articles on Google Play reviews, app ratings, ASO, and growth strategies to help your app succeed."
        variant="dark"
      />

      {/* Featured Post */}
      {featured && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30 md:grid-cols-2"
            >
              <div className="aspect-[16/10] bg-navy-gradient md:aspect-auto md:min-h-[300px]">
                {featured.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                {featured.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Featured \u00b7 {featured.category}
                  </span>
                )}
                <h2 className="mt-3 font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {featured.meta_description || featured.title}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Search + Category Filter + Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogSearch posts={rest} categories={categories} />
        </div>
      </section>
    </>
  );
}
