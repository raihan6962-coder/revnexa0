'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, HelpCircle } from 'lucide-react';
import { getAllFaqs, upsertFaq, deleteFaq } from '@/lib/chat-db';
import type { Faq, FaqCategory } from '@/lib/types';
import { FAQ_CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FaqManagerPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => { loadFaqs(); }, []);

  async function loadFaqs() {
    const data = await getAllFaqs();
    setFaqs(data);
    setLoading(false);
  }

  async function togglePublish(faq: Faq) {
    await upsertFaq({ ...faq, is_published: !faq.is_published });
    loadFaqs();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this FAQ?')) return;
    await deleteFaq(id);
    loadFaqs();
  }

  function startNew() {
    setEditing({ id: '', question: '', answer: '', category: 'General', sort_order: faqs.length + 1, is_published: false, created_at: new Date().toISOString() });
    setOpen(true);
  }

  function startEdit(faq: Faq) {
    setEditing({ ...faq });
    setOpen(true);
  }

  async function save() {
    if (!editing) return;
    await upsertFaq(editing);
    setOpen(false);
    setEditing(null);
    loadFaqs();
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading FAQs...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">FAQ Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">{faqs.length} FAQs</p>
        </div>
        <Button onClick={startNew} className="gap-2" size="sm"><Plus className="h-4 w-4" /> New FAQ</Button>
      </div>

      {faqs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">No FAQs yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="flex items-start justify-between rounded-xl border border-border bg-card p-4 shadow-premium">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{faq.question}</p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{faq.category}</span>
                  {faq.is_published && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Published</span>}
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={faq.is_published} onCheckedChange={() => togglePublish(faq)} />
                <Button variant="ghost" size="sm" onClick={() => startEdit(faq)}><Edit className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(faq.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
            <DialogHeader><DialogTitle>{editing.id ? 'Edit FAQ' : 'New FAQ'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label htmlFor="q">Question</Label><Input id="q" value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="a">Answer</Label><Textarea id="a" value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} className="mt-1.5" rows={4} /></div>
              <div>
                <Label htmlFor="cat">Category</Label>
                <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v as FaqCategory })}>
                  <SelectTrigger id="cat" className="mt-1.5 w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>{FAQ_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="order">Sort Order</Label><Input id="order" type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="mt-1.5 w-24" /></div>
              <div className="flex items-center gap-2"><Switch checked={editing.is_published} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><Label>Published</Label></div>
              <div className="flex justify-end gap-2 pt-4"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>{editing.id ? 'Update' : 'Create'}</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
