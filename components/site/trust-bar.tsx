import { Shield, Globe, Clock, Users } from 'lucide-react';

const trustItems = [
  { icon: Shield, label: 'Safe & Compliant', desc: 'Platform-friendly approach' },
  { icon: Globe, label: 'Worldwide Service', desc: 'US, UK, Canada, Australia & more' },
  { icon: Clock, label: 'Fast Response', desc: 'Typically 3-5 minute replies' },
  { icon: Users, label: 'Authentic Engagement', desc: 'Genuine user feedback' },
];

export function TrustBar() {
  return (
    <div className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
