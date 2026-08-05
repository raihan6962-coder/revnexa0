'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Star, ImageIcon, Upload } from 'lucide-react';
import { getAllTestimonials, upsertTestimonial, deleteTestimonial } from '@/lib/data';
import { uploadTestimonialImage } from '@/lib/chat-db';
import type { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadTestimonials(); }, []);

  async function loadTestimonials() {
    const data = await getAllTestimonials();
    setTestimonials(data);
    setLoading(false);
  }

  async function togglePublish(t: Testimonial) {
    await upsertTestimonial({ ...t, is_published: !t.is_published });
    loadTestimonials();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await deleteTestimonial(id);
    loadTestimonials();
  }

  function startNew() {
    setEditing({ id: '', client_label: '', country: '', app_category: '', review_text: '', rating: 5, proof_image: '', is_published: false, sort_order: testimonials.length + 1, created_at: new Date().toISOString() });
    setOpen(true);
  }

  function startEdit(t: Testimonial) {
    setEditing({ ...t });
    setOpen(true);
  }

  async function save() {
    if (!editing) return;
    await upsertTestimonial(editing);
    setOpen(false);
    setEditing(null);
    loadTestimonials();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadTestimonialImage(file);
      setEditing({ ...editing, proof_image: url });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading testimonials...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Testimonials Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
        <Button onClick={startNew} className="gap-2" size="sm"><Plus className="h-4 w-4" /> New Testimonial</Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Star className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-border bg-card p-5 shadow-premium">
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />)}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={t.is_published} onCheckedChange={() => togglePublish(t)} />
                  <Button variant="ghost" size="sm" onClick={() => startEdit(t)}><Edit className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">&ldquo;{t.review_text}&rdquo;</p>
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-sm font-medium text-foreground">{t.client_label}</p>
                <p className="text-xs text-muted-foreground">{[t.country, t.app_category].filter(Boolean).join(' \u00b7 ')}</p>
              </div>
              {t.proof_image ? (
                <div className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.proof_image} alt="Proof" className="rounded-lg border border-border" />
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50"><ImageIcon className="h-4 w-4" /> No proof image</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
            <DialogHeader><DialogTitle>{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label htmlFor="label">Client Label (name or alias)</Label><Input id="label" value={editing.client_label} onChange={(e) => setEditing({ ...editing, client_label: e.target.value })} className="mt-1.5" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="country">Country</Label><Input id="country" value={editing.country || ''} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className="mt-1.5" /></div>
                <div><Label htmlFor="app-cat">App Category</Label><Input id="app-cat" value={editing.app_category || ''} onChange={(e) => setEditing({ ...editing, app_category: e.target.value })} className="mt-1.5" /></div>
              </div>
              <div><Label htmlFor="review">Review Text</Label><Textarea id="review" value={editing.review_text} onChange={(e) => setEditing({ ...editing, review_text: e.target.value })} className="mt-1.5" rows={4} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="rating">Rating (1-5)</Label><Input id="rating" type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} className="mt-1.5" /></div>
                <div><Label htmlFor="order">Sort Order</Label><Input id="order" type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="mt-1.5" /></div>
              </div>
              <div>
                <Label htmlFor="proof">Proof Image (optional)</Label>
                <div className="mt-1.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="proof-file"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm hover:bg-muted/80"
                    >
                      <Upload className="h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Choose file'}
                    </Label>
                    <input
                      id="proof-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
                  </div>
                  {editing.proof_image && (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editing.proof_image} alt="Preview" className="h-32 rounded-lg border border-border object-cover" />
                    </div>
                  )}
                  <Input
                    id="proof"
                    value={editing.proof_image || ''}
                    onChange={(e) => setEditing({ ...editing, proof_image: e.target.value })}
                    placeholder="Or paste image URL..."
                    disabled={uploading}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2"><Switch checked={editing.is_published} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><Label>Published</Label></div>
              <div className="flex justify-end gap-2 pt-4"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>{editing.id ? 'Update' : 'Create'}</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
