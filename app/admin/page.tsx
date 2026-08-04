'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Inbox, Eye, Globe, ArrowRight, TrendingUp } from 'lucide-react';
import { getAllInquiries, getPageViewStats } from '@/lib/data';
import type { Inquiry } from '@/lib/types';

interface Stats {
  totalViews: number;
  totalInquiries: number;
  newInquiries: number;
  topCountries: { country: string; count: number }[];
  topPages: { path: string; count: number }[];
  recentInquiries: Inquiry[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    totalInquiries: 0,
    newInquiries: 0,
    topCountries: [],
    topPages: [],
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [viewStats, inquiries] = await Promise.all([
        getPageViewStats(),
        getAllInquiries(),
      ]);
      setStats({
        totalViews: viewStats.totalViews,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter((i) => i.status === 'new').length,
        topCountries: viewStats.topCountries,
        topPages: viewStats.topPages,
        recentInquiries: inquiries.slice(0, 5),
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  const cards = [
    { label: 'Total Page Views', value: stats.totalViews, icon: Eye, color: 'text-primary' },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: Inbox, color: 'text-primary' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: TrendingUp, color: 'text-amber' },
    { label: 'Countries Reached', value: stats.topCountries.length, icon: Globe, color: 'text-primary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of your site&apos;s activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-6 shadow-premium">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
          <h2 className="font-heading text-lg font-semibold text-foreground">Top Countries</h2>
          {stats.topCountries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No data yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {stats.topCountries.map((c) => (
                <div key={c.country} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{c.country}</span>
                  <span className="text-sm font-medium text-muted-foreground">{c.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
          <h2 className="font-heading text-lg font-semibold text-foreground">Most Viewed Pages</h2>
          {stats.topPages.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No data yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {stats.topPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between">
                  <Link href={p.path} className="text-sm text-primary hover:underline">{p.path}</Link>
                  <span className="text-sm font-medium text-muted-foreground">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {stats.recentInquiries.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No inquiries yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {stats.recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{inq.full_name}</p>
                  <p className="text-xs text-muted-foreground">{inq.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{inq.status}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
