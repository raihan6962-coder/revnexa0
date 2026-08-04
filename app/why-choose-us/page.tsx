'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, Clock, Award, Eye, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';

const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Authentic Engagement',
    desc: 'We focus on genuine user feedback — not bots, not automation. Every review comes from a real user interaction, building credibility that lasts.',
  },
  {
    icon: Lock,
    title: 'Full Confidentiality',
    desc: 'Your app, your strategy, and our working relationship are completely private. We never share client information with anyone, ever.',
  },
  {
    icon: Clock,
    title: 'Fast Response Times',
    desc: 'We typically reply within 3-5 minutes. When you have a question or need an update, you won\u2019t be left waiting.',
  },
  {
    icon: Award,
    title: 'Quality Over Quantity',
    desc: 'We\u2019d rather deliver fewer reviews that feel authentic and stick, than flood your app with low-quality feedback that gets removed.',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    desc: 'No vague promises or hidden steps. You\u2019ll know exactly what we\u2019re doing, why, and what to expect at each stage.',
  },
  {
    icon: Heart,
    title: 'Personal Service',
    desc: 'You work directly with our team, not a ticket system. We take the time to understand your app and your goals before recommending anything.',
  },
];

const values = [
  { icon: ShieldCheck, title: 'Safety First', desc: 'Your developer account\u2019s safety is our top priority. We never use methods that put it at risk.' },
  { icon: Zap, title: 'Responsive', desc: 'Quick, clear communication at every step. You always know what\u2019s happening.' },
  { icon: Award, title: 'Premium Quality', desc: 'Every aspect of our service reflects the professional standards we hold ourselves to.' },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Why Choose Us', url: '/why-choose-us' },
      ])} />

      <PageHero
        eyebrow="Why Choose Us"
        title="Built on trust, delivered with professionalism"
        description="We\u2019re not a marketplace or a gig site. We\u2019re a focused service provider that treats your app\u2019s reputation with the care it deserves."
        variant="dark"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Start Your Review Campaign
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Differentiators */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What Sets Us Apart"
            title="Six reasons developers choose Revnexa"
            description="Every aspect of our service is designed to deliver real, sustainable results without compromising your app\u2019s integrity."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-premium transition-all hover:shadow-premium-lg hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            description="Three principles that guide every decision we make."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-premium"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-premium">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Promise */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-premium sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Our response time promise
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We know that when you\u2019re working on your app\u2019s growth, you don\u2019t
              want to wait days for a reply. That\u2019s why we typically respond
              within 3-5 minutes during business hours. No ticket queues, no
              auto-responders \u2014 just real people, ready to help.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Reach Out Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
