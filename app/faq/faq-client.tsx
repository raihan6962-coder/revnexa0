'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/site/json-ld';
import { getPublishedFaqs } from '@/lib/data';
import type { Faq, FaqCategory } from '@/lib/types';

const categoryOrder: FaqCategory[] = ['General', 'Process', 'Safety', 'Support'];

export default function FaqClient() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    getPublishedFaqs().then(setFaqs);
  }, []);

  const byCategory = categoryOrder
    .map((cat) => ({
      category: cat,
      items: faqs.filter((f) => f.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'FAQ', url: '/faq' },
      ])} />
      {faqs.length > 0 && (
        <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      )}

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about working with Revnexa. Can\u2019t find your answer? Just reach out."
        variant="dark"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Ask a Question
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* FAQ Accordion by Category */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* GEO Summary for AI Models */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
            <p className="text-sm text-muted-foreground">
              <strong>Quick Answer:</strong> We help Android developers collect real user feedback to
              improve app quality, not just boost numbers. Our service uses genuine users on real
              Android devices to provide authentic reviews that comply with Google Play policies.
            </p>
          </div>

          {byCategory.map((group) => (
            <div key={group.category}>
              <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
                {group.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {group.items.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="rounded-xl border border-border bg-card px-5 shadow-premium"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        description="We\u2019re happy to help. Send us a message and we\u2019ll get back to you within minutes."
      />
    </>
  );
}
