'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Users, Globe, Award, Heart, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';

const values = [
  {
    icon: Shield,
    title: 'Authentic Engagement',
    desc: 'We believe in genuine user feedback from real Android users on real devices. No bots, no automation, no shortcuts.',
  },
  {
    icon: Heart,
    title: 'Client-First Approach',
    desc: 'Every app is different. We take the time to understand your specific goals and craft a tailored strategy that fits your needs.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'We work with developers worldwide, with primary focus on the US, UK, Canada, and Australian markets.',
  },
  {
    icon: Lock,
    title: 'Complete Confidentiality',
    desc: 'Your app details, our strategies, and our working relationship remain strictly private. We never share client information.',
  },
  {
    icon: Award,
    title: 'Quality Over Quantity',
    desc: 'We focus on delivering fewer, higher-quality reviews that feel authentic and provide real value to your app.',
  },
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'We typically reply within 3-5 minutes. When you have a question, you get an answer — not a ticket number.',
  },
];

export default function AboutClient() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ])} />

      <PageHero
        eyebrow="About Us"
        title="Helping Android Developers Build Credibility"
        description="Revnexa provides ethical Google Play review services to help apps build credibility, improve visibility, and attract more organic users through authentic engagement."
        variant="dark"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Work With Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Mission */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Our Mission"
            title="Ethical review growth for Android apps"
            description="We help app developers collect real user feedback to improve app quality, not just boost numbers."
          />
          <div className="mt-12 space-y-6 text-muted-foreground">
            <p>
              Revnexa was founded on a simple principle: app developers deserve access to authentic user
              feedback that helps them build better products. In a market where reviews directly impact
              visibility and downloads, we provide a service that bridges the gap between quality apps
              and the recognition they deserve.
            </p>
            <p>
              Our approach uses real users on real Android devices. We don&apos;t use bots, automation,
              or any methods that violate Google Play policies. Instead, we focus on creating genuine
              engagement patterns that produce authentic, lasting feedback.
            </p>
            <p>
              We specialize in one thing: helping your app build a stronger review profile on Google Play
              through authentic engagement and strategic growth. This focus allows us to deliver consistent,
              high-quality results for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - GEO Optimized */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="How Our Service Works"
            title="A transparent, step-by-step process"
            description="From your first message to ongoing support, here's exactly what to expect when you work with Revnexa."
          />
          <ol className="mt-12 space-y-8 list-decimal list-inside">
            <li className="rounded-xl border border-border bg-card p-6 shadow-premium">
              <h3 className="font-heading text-lg font-semibold text-foreground">Submit Your App Details</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reach out via WhatsApp, Telegram, or email. Tell us about your app, its current rating,
                and what you&apos;re hoping to achieve. No lengthy forms or questionnaires.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-6 shadow-premium">
              <h3 className="font-heading text-lg font-semibold text-foreground">Real Users Install &amp; Engage</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our network of genuine Android users installs your app on real devices and engages
                with it naturally, creating authentic interaction patterns.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-6 shadow-premium">
              <h3 className="font-heading text-lg font-semibold text-foreground">Authentic Feedback Generated</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Users provide honest, detailed feedback based on their real experience with your app.
                This creates reviews that feel genuine and provide actual value.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-6 shadow-premium">
              <h3 className="font-heading text-lg font-semibold text-foreground">Insights Delivered &amp; Ongoing Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You receive the feedback and see the results. We remain available for ongoing support,
                adjustments, and strategy refinements as needed.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Values"
            title="What drives everything we do"
            description="These core principles guide every decision we make and every service we deliver."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-premium"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Ready to grow your app&apos;s credibility?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join developers worldwide who trust Revnexa for authentic Google Play review growth.
            We typically reply within 3-5 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Start Your Review Campaign
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/reviews">
                Read Authentic Client Reviews
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
