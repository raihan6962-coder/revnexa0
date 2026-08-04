'use client';

import { useEffect, useState } from 'react';
import { Inbox, Mail, MessageCircle, Send } from 'lucide-react';
import { getAllInquiries, updateInquiryStatus } from '@/lib/data';
import type { Inquiry, InquiryStatus } from '@/lib/types';
import { INQUIRY_STATUSES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const channelIcons: Record<string, typeof Mail> = {
  whatsapp: MessageCircle,
  telegram: Send,
  email: Mail,
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    const data = await getAllInquiries();
    setInquiries(data);
    setLoading(false);
  }

  async function handleUpdateStatus(id: string, status: InquiryStatus) {
    await updateInquiryStatus(id, status);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  if (loading) {
    return <p className="py-20 text-center text-muted-foreground">Loading inquiries...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Inquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">{inquiries.length} total inquiries</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {INQUIRY_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">No inquiries found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-premium">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">Channel</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Country</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inq) => {
                const ChannelIcon = channelIcons[inq.channel] || Mail;
                return (
                  <tr key={inq.id} className="cursor-pointer transition-colors hover:bg-muted/30" onClick={() => setSelected(inq)}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{inq.full_name}</p>
                      <p className="text-xs text-muted-foreground">{inq.email}</p>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground capitalize">{inq.channel}</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{inq.country || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">{inq.status}</span>
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                      {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(inq); }}>View</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-premium-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{selected.full_name}</h2>
                <p className="text-sm text-muted-foreground">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="mt-6 space-y-4">
              {selected.app_name && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">App Name</p>
                  <p className="mt-1 text-sm text-foreground">{selected.app_name}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Channel</p>
                <p className="mt-1 text-sm capitalize text-foreground">{selected.channel}</p>
              </div>
              {selected.country && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Country</p>
                  <p className="mt-1 text-sm text-foreground">{selected.country}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</p>
                <p className="mt-1 rounded-lg bg-muted p-3 text-sm text-foreground">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</p>
                <p className="mt-1 text-sm text-foreground">{new Date(selected.created_at).toLocaleString('en-US')}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</p>
                <Select value={selected.status} onValueChange={(v) => handleUpdateStatus(selected.id, v as InquiryStatus)}>
                  <SelectTrigger className="mt-1 w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INQUIRY_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button asChild size="sm" className="gap-1.5">
                <a href={`mailto:${selected.email}`}><Mail className="h-3.5 w-3.5" /> Reply via Email</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
