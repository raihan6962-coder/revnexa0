'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, ShieldCheck, MessageSquareReply, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustBar } from '@/components/site/trust-bar';
import { SectionHeading } from '@/components/site/section-heading';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, organizationSchema, webSiteSchema } from '@/components/site/json-ld';
import { getPublishedFaqs, getPublishedTestimonials, getRecentBlogPosts } from '@/lib/data';
import type { Faq, Testimonial, BlogPost } from '@/lib/types';

const steps = [
  { icon: MessageSquareReply, title: 'Reach Out', desc: 'Contact us via WhatsApp, Telegram, or email with your app details and goals.' },
  { icon: BarChart3, title: 'Discuss Strategy', desc: 'We review your app\u2019s current standing and discuss a tailored approach.' },
  { icon: ShieldCheck, title: 'Confirm & Deliver', desc: 'Once details are confirmed, we deliver the service with ongoing support.' },
];

export default function HomePage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedFaqs().then(setFaqs);
    getPublishedTestimonials().then(setTestimonials);
    getRecentBlogPosts(3).then(setBlogPosts);
  }, []);

  const faqPreview = faqs.slice(0, 3);
  const testimonialPreview = testimonials.slice(0, 3);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-radial px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" />
            Google Play Store Review Service
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
            Real Google Play Reviews from Authentic Android Users
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-foreground/70">
            Collect authentic user feedback from real Android users. Our platform
            connects you with genuine testers who provide actionable insights to
            boost your app&apos;s quality and Google Play visibility — ethically
            and transparently.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Start Your Review Campaign
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white/20 bg-white/5 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground">
              <Link href="/play-store-review-service">
                Explore Our Ethical App Review Service
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-secondary-foreground/50">
            We typically reply within 3-5 minutes
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Service Summary */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What We Do"
            title="A focused service for Google Play Store apps"
            description="We specialize in one thing: helping your app build a stronger review profile on Google Play through authentic engagement and strategic growth."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: 'Rating Improvement', desc: 'Strategic review growth to move your app\u2019s rating in the right direction.' },
              { icon: ShieldCheck, title: 'Authentic Engagement', desc: 'Genuine user feedback that aligns with platform guidelines and builds real credibility.' },
              { icon: BarChart3, title: 'Visibility Growth', desc: 'Better reviews lead to better rankings, which leads to more organic discovery.' },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/play-store-review-service">
                Learn more about our Google Play review service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Snapshot */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How It Works"
            title="Simple, transparent, and fast"
            description="No complex onboarding. Just reach out, tell us about your app, and we handle the rest."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-premium">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/how-it-works">
                See our step-by-step review process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      {testimonialPreview.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Client Feedback"
              title="What our clients say"
              description="Real feedback from developers who've worked with Revnexa."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonialPreview.map((t) => (
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
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.client_label}</p>
                    <p className="text-xs text-muted-foreground">
                      {[t.country, t.app_category].filter(Boolean).join(' \u00b7 ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/reviews">
                  Read authentic client reviews
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Preview */}
      {faqPreview.length > 0 && (
        <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              description="Quick answers to the questions we hear most often."
            />
            <div className="mt-10 space-y-4">
              {faqPreview.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border border-border bg-card p-6 shadow-premium"
                >
                  <h3 className="font-heading font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/faq">
                  View all frequently asked questions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Blog Preview */}
      {blogPosts.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Blog"
              title="Latest insights"
              description="Articles on app reviews, ratings, and Google Play growth."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
                >
                  <div className="aspect-[16/9] bg-navy-gradient" />
                  <div className="flex flex-1 flex-col p-6">
                    {post.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {post.category}
                      </span>
                    )}
                    <h3 className="mt-2 font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {post.meta_description || post.title}
                    </p>
                    <span className="mt-4 text-xs text-muted-foreground">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/blog">
                  Read our app review insights blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
