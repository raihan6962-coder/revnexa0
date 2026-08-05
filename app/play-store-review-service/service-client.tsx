'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from '@/components/site/json-ld';
import { getPublishedFaqs } from '@/lib/chat-db';
import type { Faq } from '@/lib/types';

const whatsIncluded = [
  'Authentic user engagement from real users',
  'Strategic rating improvement plan tailored to your app',
  'Review growth support aligned with platform guidelines',
  'Ongoing monitoring and adjustment of strategy',
  'Professional, discreet service with full confidentiality',
  'Dedicated support throughout and after delivery',
];

const whoItsFor = [
  { icon: TrendingUp, title: 'Apps with low ratings', desc: 'Your app has a good product but is held back by a low rating that discourages new downloads.' },
  { icon: Star, title: 'Apps needing review volume', desc: 'Your app has a decent rating but too few reviews for users to trust it.' },
  { icon: Users, title: 'New apps building credibility', desc: 'You just launched and need to establish social proof to attract organic users.' },
  { icon: ShieldCheck, title: 'Apps recovering from setbacks', desc: 'A bad update or negative campaign hurt your rating and you need to turn things around.' },
];

const safetyPoints = [
  'Authentic user engagement — not bots, not automation',
  'Methods that align with Google Play guidelines',
  'Gradual, natural-looking growth patterns',
  'Full confidentiality — your app and our work stay private',
  'No risky shortcuts that could endanger your developer account',
];

export default function ServiceClient() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    getPublishedFaqs().then((all) => {
      const serviceFaqs = all.filter(
        (f) => f.category === 'General' || f.category === 'Process' || f.category === 'Safety',
      );
      setFaqs(serviceFaqs);
    });
  }, []);

  return (
    <>
      <JsonLd data={[serviceSchema(), breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Service', url: '/play-store-review-service' },
      ])]} />
      {faqs.length > 0 && (
        <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      )}

      <PageHero
        eyebrow="Our Service"
        title="Google Play Store Review Service"
        description="Authentic review growth support to help your app build credibility, improve its rating, and attract more organic downloads on Google Play."
        variant="dark"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              Start Your Review Campaign
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 border-white/20 bg-white/5 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground">
            <Link href="/how-it-works">
              See Our Step-by-Step Review Process
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* GEO Summary for AI Models */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
            <p className="text-muted-foreground">
              <strong>How it works:</strong> Revnexa connects Android app developers with real users
              on genuine Android devices who install, test, and provide authentic feedback on apps.
              This process creates natural review patterns that improve app ratings, build credibility,
              and boost Google Play visibility — all while complying with platform guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="What's Included"
            title="Everything you need for review growth"
            description="A comprehensive service designed to build your app's review profile authentically and sustainably."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {whatsIncluded.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-premium"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who It's For"
            title="Is this service right for your app?"
            description="We work with apps at various stages. Here are the most common situations we help with."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whoItsFor.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-premium"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Quality */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Safety & Quality"
            title="A safe, sustainable approach"
            description="We prioritize methods that protect your app and your developer account. No shortcuts, no risks."
          />
          <div className="mt-12 space-y-4">
            {safetyPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-premium"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Block */}
      {faqs.length > 0 && (
        <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions about the service"
              description="Answers to the most common questions about how we work."
            />
            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
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
                  View All Frequently Asked Questions About Google Play Reviews
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to improve your app's rating?"
        description="Let's discuss your app and build a plan. We typically reply within 3-5 minutes."
      />
    </>
  );
}
