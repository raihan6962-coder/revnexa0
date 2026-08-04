'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';
import { getPublishedTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/types';

export default function ReviewsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getPublishedTestimonials().then(setTestimonials);
  }, []);

  const categories = Array.from(
    new Set(testimonials.map((t) => t.app_category).filter(Boolean)),
  ).sort() as string[];

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Reviews', url: '/reviews' },
      ])} />

      <PageHero
        eyebrow="Reviews"
        title="What our clients say"
        description="Real feedback from developers who\u2019ve worked with Revnexa to grow their app\u2019s review profile."
        variant="dark"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Become Our Next Success Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Testimonials Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {testimonials.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-premium">
              <p className="text-muted-foreground">
                Testimonials will appear here soon. In the meantime,{' '}
                <Link href="/contact" className="text-primary underline">
                  reach out to us
                </Link>{' '}
                to learn more.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-premium"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">
                    &ldquo;{t.review_text}&rdquo;
                  </p>

                  {/* Proof image placeholder */}
                  {t.proof_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.proof_image}
                      alt={`Review proof from ${t.client_label}`}
                      className="mt-4 rounded-lg border border-border"
                    />
                  ) : (
                    <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 px-4 py-6 text-center">
                      <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
                        <ImageIcon className="h-6 w-6" />
                        <span className="text-xs">Screenshot to be added</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.client_label}</p>
                    <p className="text-xs text-muted-foreground">
                      {[t.country, t.app_category].filter(Boolean).join(' \u00b7 ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Want results like these?"
        description="Let\u2019s talk about your app and how we can help you achieve similar growth."
      />
    </>
  );
}
