import Link from 'next/link';
import { ArrowRight, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-radial px-4">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-7xl font-bold text-primary sm:text-8xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-secondary-foreground sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-secondary-foreground/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 border-white/20 bg-white/5 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground">
            <Link href="/contact">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
