'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CtaBandProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function CtaBand({
  title = 'Ready to grow your app\u2019s rating?',
  description = 'Let\u2019s talk about your app and how we can help. No pressure, no obligation \u2014 just a honest conversation.',
  className,
  variant = 'dark',
}: CtaBandProps) {
  return (
    <section className={cn('px-4 py-16 sm:px-6 lg:px-8', className)}>
      <div
        className={cn(
          'mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16',
          variant === 'dark'
            ? 'bg-navy-gradient text-secondary-foreground'
            : 'bg-muted text-foreground',
        )}
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p
          className={cn(
            'mx-auto mt-4 max-w-xl text-base',
            variant === 'dark'
              ? 'text-secondary-foreground/70'
              : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div
            className={cn(
              'flex items-center gap-2 text-sm',
              variant === 'dark' ? 'text-secondary-foreground/60' : 'text-muted-foreground',
            )}
          >
            <Clock className="h-4 w-4 text-primary" />
            We typically reply within 3-5 minutes
          </div>
        </div>
      </div>
    </section>
  );
}
