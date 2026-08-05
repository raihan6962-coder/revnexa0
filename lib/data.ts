'use client';

import { getDb } from '@/lib/db';
import type {
  BlogPost,
  Faq,
  Testimonial,
  SiteSettings,
  Inquiry,
  PageView,
} from '@/lib/types';

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const result = await db.query('SELECT key, value FROM site_settings');
  const settings: SiteSettings = {};
  for (const row of result.rows as { key: string; value: string }[]) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function getPublishedFaqs(): Promise<Faq[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM faqs WHERE is_published = true ORDER BY sort_order ASC`
  );
  return result.rows as Faq[];
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM testimonials WHERE is_published = true ORDER BY sort_order ASC`
  );
  return result.rows as Testimonial[];
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`
  );
  return result.rows as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'`,
    [slug]
  );
  const rows = result.rows as BlogPost[];
  return rows[0] || null;
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC LIMIT $1`,
    [limit]
  );
  return result.rows as BlogPost[];
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string | null,
  limit: number = 3,
): Promise<BlogPost[]> {
  const db = await getDb();
  if (category) {
    const result = await db.query(
      `SELECT * FROM blog_posts WHERE status = 'published' AND slug != $1 AND category = $2 LIMIT $3`,
      [currentSlug, category, limit]
    );
    return result.rows as BlogPost[];
  }
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE status = 'published' AND slug != $1 LIMIT $2`,
    [currentSlug, limit]
  );
  return result.rows as BlogPost[];
}

export async function insertInquiry(data: {
  full_name: string;
  email: string;
  app_name?: string | null;
  message: string;
  channel: string;
  country?: string | null;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO inquiries (full_name, email, app_name, message, channel, country)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.full_name, data.email, data.app_name || null, data.message, data.channel, data.country || null]
  );
}

export async function insertPageView(data: {
  path: string;
  referrer?: string | null;
  country?: string | null;
  device_type?: string | null;
  session_id?: string | null;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO page_views (path, referrer, country, device_type, session_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [data.path, data.referrer || null, data.country || null, data.device_type || null, data.session_id || null]
  );
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM inquiries ORDER BY created_at DESC`
  );
  return result.rows as Inquiry[];
}

export async function updateInquiryStatus(id: string, status: string): Promise<void> {
  const db = await getDb();
  await db.query(`UPDATE inquiries SET status = $1 WHERE id = $2`, [status, id]);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts ORDER BY created_at DESC`
  );
  return result.rows as BlogPost[];
}

export async function upsertBlogPost(post: Partial<BlogPost> & { slug: string; title: string; content: string }): Promise<void> {
  const db = await getDb();
  const tags = post.tags || [];
  if (post.id) {
    await db.query(
      `UPDATE blog_posts SET slug = $1, title = $2, meta_title = $3, meta_description = $4,
       content = $5, cover_image = $6, category = $7, tags = $8, status = $9, updated_at = now()
       WHERE id = $10`,
      [post.slug, post.title, post.meta_title || null, post.meta_description || null,
       post.content, post.cover_image || null, post.category || null, tags, post.status || 'draft', post.id]
    );
  } else {
    await db.query(
      `INSERT INTO blog_posts (slug, title, meta_title, meta_description, content, cover_image, category, tags, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CASE WHEN $9 = 'published' THEN now() ELSE NULL END)`,
      [post.slug, post.title, post.meta_title || null, post.meta_description || null,
       post.content, post.cover_image || null, post.category || null, tags, post.status || 'draft']
    );
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
}

export async function getAllFaqs(): Promise<Faq[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM faqs ORDER BY sort_order ASC`
  );
  return result.rows as Faq[];
}

export async function upsertFaq(faq: Partial<Faq> & { question: string; answer: string }): Promise<void> {
  const db = await getDb();
  if (faq.id) {
    await db.query(
      `UPDATE faqs SET question = $1, answer = $2, category = $3, sort_order = $4, is_published = $5
       WHERE id = $6`,
      [faq.question, faq.answer, faq.category || 'General', faq.sort_order || 0, faq.is_published || false, faq.id]
    );
  } else {
    await db.query(
      `INSERT INTO faqs (question, answer, category, sort_order, is_published)
       VALUES ($1, $2, $3, $4, $5)`,
      [faq.question, faq.answer, faq.category || 'General', faq.sort_order || 0, faq.is_published || false]
    );
  }
}

export async function deleteFaq(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM faqs WHERE id = $1`, [id]);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  const result = await db.query(
    `SELECT * FROM testimonials ORDER BY sort_order ASC`
  );
  return result.rows as Testimonial[];
}

export async function upsertTestimonial(t: Partial<Testimonial> & { client_label: string; review_text: string }): Promise<void> {
  const db = await getDb();
  if (t.id) {
    await db.query(
      `UPDATE testimonials SET client_label = $1, country = $2, app_category = $3,
       review_text = $4, rating = $5, proof_image = $6, is_published = $7, sort_order = $8
       WHERE id = $9`,
      [t.client_label, t.country || null, t.app_category || null, t.review_text, t.rating || 5,
       t.proof_image || null, t.is_published || false, t.sort_order || 0, t.id]
    );
  } else {
    await db.query(
      `INSERT INTO testimonials (client_label, country, app_category, review_text, rating, proof_image, is_published, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [t.client_label, t.country || null, t.app_category || null, t.review_text, t.rating || 5,
       t.proof_image || null, t.is_published || false, t.sort_order || 0]
    );
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = await getDb();
  await db.query(`DELETE FROM testimonials WHERE id = $1`, [id]);
}

export async function updateSiteSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  const existing = await db.query(`SELECT key FROM site_settings WHERE key = $1`, [key]);
  if ((existing.rows as unknown[]).length > 0) {
    await db.query(`UPDATE site_settings SET value = $1, updated_at = now() WHERE key = $2`, [value, key]);
  } else {
    await db.query(`INSERT INTO site_settings (key, value) VALUES ($1, $2)`, [key, value]);
  }
}

export async function getPageViewStats(): Promise<{
  totalViews: number;
  topCountries: { country: string; count: number }[];
  topPages: { path: string; count: number }[];
}> {
  const db = await getDb();
  const viewsResult = await db.query(`SELECT COUNT(*) as count FROM page_views`);
  const totalViews = parseInt((viewsResult.rows[0] as { count: string }).count);

  const countriesResult = await db.query(
    `SELECT country, COUNT(*) as count FROM page_views WHERE country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT 5`
  );
  const topCountries = (countriesResult.rows as { country: string; count: string }[]).map((r) => ({
    country: r.country,
    count: parseInt(r.count),
  }));

  const pagesResult = await db.query(
    `SELECT path, COUNT(*) as count FROM page_views GROUP BY path ORDER BY count DESC LIMIT 5`
  );
  const topPages = (pagesResult.rows as { path: string; count: string }[]).map((r) => ({
    path: r.path,
    count: parseInt(r.count),
  }));

  return { totalViews, topCountries, topPages };
}

export async function sendTelegramNotification(data: {
  full_name: string;
  email: string;
  app_name?: string | null;
  message: string;
  channel: string;
}): Promise<void> {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // Non-blocking
  }
}
