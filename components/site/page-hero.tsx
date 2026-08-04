import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'dark' | 'light';
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  variant = 'light',
}: PageHeroProps) {
  const isDark = variant === 'dark';
  return (
    <section
      className={cn(
        'relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8',
        isDark ? 'bg-hero-radial text-secondary-foreground' : 'bg-background',
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <span
            className={cn(
              'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
              isDark ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary',
            )}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className={cn(
            'mt-5 font-heading text-4xl font-bold tracking-tight sm:text-5xl',
            isDark ? 'text-secondary-foreground' : 'text-foreground',
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl text-lg',
              isDark ? 'text-secondary-foreground/70' : 'text-muted-foreground',
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
