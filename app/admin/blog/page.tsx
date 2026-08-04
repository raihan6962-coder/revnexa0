'use client';

import { useEffect, useState } from 'react';
import { Plus, FileText, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { getAllBlogPosts, upsertBlogPost, deleteBlogPost } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data = await getAllBlogPosts();
    setPosts(data);
    setLoading(false);
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await upsertBlogPost({ ...post, status: newStatus });
    loadPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    await deleteBlogPost(id);
    loadPosts();
  }

  function startNew() {
    setEditing({
      id: '', slug: '', title: '', meta_title: '', meta_description: '', content: '',
      cover_image: '', category: '', tags: [], status: 'draft', published_at: null,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    });
    setOpen(true);
  }

  function startEdit(post: BlogPost) {
    setEditing({ ...post });
    setOpen(true);
  }

  async function save() {
    if (!editing) return;
    const tags = Array.isArray(editing.tags) ? editing.tags : (typeof editing.tags === 'string' ? (editing.tags as string).split(',').map((t) => t.trim()).filter(Boolean) : []);
    await upsertBlogPost({ ...editing, tags });
    setOpen(false);
    setEditing(null);
    loadPosts();
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading posts...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Blog Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">{posts.length} posts</p>
        </div>
        <Button onClick={startNew} className="gap-2" size="sm"><Plus className="h-4 w-4" /> New Post</Button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">No posts yet. Create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-premium">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{post.status}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">/blog/{post.slug}</p>
                {post.category && <p className="mt-0.5 text-xs text-muted-foreground">{post.category}</p>}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => togglePublish(post)} className="gap-1.5">
                  {post.status === 'published' ? <><EyeOff className="h-3.5 w-3.5" /> Unpublish</> : <><Eye className="h-3.5 w-3.5" /> Publish</>}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => startEdit(post)} className="gap-1.5"><Edit className="h-3.5 w-3.5" /> Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader><DialogTitle>{editing.id ? 'Edit Post' : 'New Post'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="slug">Slug</Label><Input id="slug" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="my-blog-post" className="mt-1.5" /></div>
              <div><Label htmlFor="meta-title">Meta Title</Label><Input id="meta-title" value={editing.meta_title || ''} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="meta-desc">Meta Description</Label><Textarea id="meta-desc" value={editing.meta_description || ''} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className="mt-1.5" rows={2} /></div>
              <div><Label htmlFor="category">Category</Label><Input id="category" value={editing.category || ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="tags">Tags (comma-separated)</Label><Input id="tags" value={Array.isArray(editing.tags) ? editing.tags.join(', ') : editing.tags || ''} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map((t) => t.trim()) })} className="mt-1.5" /></div>
              <div><Label htmlFor="cover">Cover Image URL</Label><Input id="cover" value={editing.cover_image || ''} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="content">Content (Markdown)</Label><Textarea id="content" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="mt-1.5 min-h-[300px] font-mono text-sm" /></div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as 'draft' | 'published' })}>
                  <SelectTrigger id="status" className="mt-1.5 w-40"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={save}>{editing.id ? 'Update' : 'Create'}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
