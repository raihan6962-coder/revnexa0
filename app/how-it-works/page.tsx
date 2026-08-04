'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare, ClipboardList, CheckCircle2, PackageCheck, Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Reach Out',
    desc: 'Contact us via WhatsApp, Telegram, or email. Tell us you\u2019re interested \u2014 no forms to fill out, no lengthy questionnaires.',
    detail: 'Just a quick message saying hello and mentioning your app. We\u2019ll take it from there.',
  },
  {
    icon: ClipboardList,
    number: '02',
    title: 'Discuss Your App & Goals',
    desc: 'We\u2019ll ask about your app \u2014 what it does, its current rating, and what you\u2019re hoping to achieve. This is a conversation, not an interrogation.',
    detail: 'The more we understand your app and goals, the better we can tailor our approach to your specific situation.',
  },
  {
    icon: CheckCircle2,
    number: '03',
    title: 'Confirm Details',
    desc: 'Once we\u2019ve discussed the approach, we confirm the details together. You\u2019ll know exactly what to expect before anything begins.',
    detail: 'Full transparency. No surprises, no hidden steps, no vague promises.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Delivery',
    desc: 'We deliver the service as discussed. Throughout delivery, we monitor progress and make adjustments as needed.',
    detail: 'You\u2019re kept informed at every stage. If you have questions during delivery, we\u2019re a message away.',
  },
  {
    icon: Headset,
    number: '05',
    title: 'Ongoing Support',
    desc: 'After delivery, we remain available for questions, adjustments, and follow-up support. The relationship doesn\u2019t end when the service does.',
    detail: 'We\u2019re invested in your app\u2019s long-term success, not just a one-time transaction.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'How It Works', url: '/how-it-works' },
      ])} />

      <PageHero
        eyebrow="How It Works"
        title="A simple, transparent process"
        description="From your first message to ongoing support, here\u2019s exactly what to expect when you work with Revnexa."
        variant="dark"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Steps */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative space-y-12">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-border md:block" />

            {steps.map((step) => (
              <div key={step.number} className="relative flex gap-6">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-premium">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-sm font-bold text-primary">
                      Step {step.number}
                    </span>
                  </div>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">{step.desc}</p>
                  <p className="mt-2 text-sm text-muted-foreground/80">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Ready to start?
          </h2>
          <p className="mt-4 text-muted-foreground">
            The first step takes less than a minute. Send us a message and we\u2019ll
            take care of the rest.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              We typically reply within 3-5 minutes
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
