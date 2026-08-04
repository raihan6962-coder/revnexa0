import { PGlite } from '@electric-sql/pglite';

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  app_name TEXT,
  message TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'email',
  status TEXT NOT NULL DEFAULT 'new',
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_label TEXT NOT NULL,
  country TEXT,
  app_category TEXT,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  proof_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_views (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  path TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  device_type TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const SEED_SQL = `
INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number', ''),
  ('telegram_username', ''),
  ('contact_email', 'hello@revnexa.com'),
  ('discord_url', ''),
  ('reply_time_text', 'We typically reply within 3-5 minutes'),
  ('default_meta_title', 'Revnexa - Google Play Store Review Service'),
  ('default_meta_description', 'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.'),
  ('site_name', 'Revnexa'),
  ('telegram_bot_token', ''),
  ('telegram_chat_id', '')
ON CONFLICT (key) DO NOTHING;

INSERT INTO faqs (question, answer, category, sort_order, is_published) VALUES
  ('What is a Google Play Store review service?', 'A Google Play Store review service helps app developers grow their app''s visibility and credibility through authentic user engagement and rating improvement strategies. We focus on generating genuine feedback from real users to support your app''s organic growth.', 'General', 1, true),
  ('How does Revnexa work?', 'The process is simple: reach out to us via WhatsApp, Telegram, or email, tell us about your app and goals, and we''ll discuss a tailored approach. Once details are confirmed, we deliver the service and provide ongoing support.', 'General', 2, true),
  ('Which countries do you serve?', 'We work with clients worldwide, with a primary focus on the US, UK, Canada, and Australia markets. However, we can accommodate requests from other regions as well.', 'General', 3, true),
  ('How long does it take to see results?', 'Timelines vary depending on your app''s current standing and goals. During our initial conversation, we''ll provide a realistic timeline based on your specific situation.', 'Process', 4, true),
  ('Is my app information kept confidential?', 'Absolutely. We treat all client information with strict confidentiality. Your app details, strategy discussions, and our working relationship are never shared with third parties.', 'Safety', 5, true),
  ('Are the reviews from real users?', 'We focus on authentic user engagement and verified feedback acquisition. Our approach prioritizes genuine interactions that align with platform guidelines.', 'Safety', 6, true),
  ('Will this affect my Google Play developer account?', 'Our approach is designed to be safe and sustainable. We prioritize methods that support organic growth without putting your developer account at risk.', 'Safety', 7, true),
  ('How do I get started?', 'Simply reach out via our contact page, WhatsApp, Telegram, or email. Share your app details and goals, and we''ll take it from there. We typically reply within 3-5 minutes.', 'Support', 8, true),
  ('Do you offer ongoing support?', 'Yes, we provide ongoing support throughout and after the service delivery. If you have questions or need adjustments, our team is available to help.', 'Support', 9, true),
  ('Can you help with negative reviews?', 'Yes, we can help you develop a strategy for managing and responding to negative reviews on Google Play, as part of a broader rating improvement approach.', 'Process', 10, true)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (client_label, country, app_category, review_text, rating, is_published, sort_order) VALUES
  ('Alex M.', 'United States', 'Productivity', 'Revnexa helped our productivity app climb from a 3.2 to 4.6 rating in just a few weeks. The process was smooth and the team was always available to answer questions.', 5, true, 1),
  ('Priya S.', 'United Kingdom', 'Education', 'Professional and discreet. They understood our app''s needs and delivered exactly what was discussed. Highly recommend for any developer serious about growth.', 5, true, 2),
  ('James K.', 'Canada', 'Finance', 'Our finance app was struggling with visibility. After working with Revnexa, we saw a noticeable improvement in both ratings and downloads. Great service.', 5, true, 3),
  ('Sarah L.', 'Australia', 'Health & Fitness', 'The team at Revnexa is responsive and knowledgeable. They helped us build credibility through genuine user engagement. Worth every moment.', 5, true, 4),
  ('Daniel R.', 'United States', 'Games', 'I was skeptical at first, but the results speak for themselves. Our game''s rating improved significantly and the reviews feel authentic.', 5, true, 5),
  ('Emma T.', 'United Kingdom', 'Lifestyle', 'Revnexa provided a clear, honest process from start to finish. No vague promises, just real results. Our lifestyle app is finally getting the attention it deserves.', 5, true, 6)
ON CONFLICT DO NOTHING;
`;

export const BLOG_SEED_SQL = `
INSERT INTO blog_posts (slug, title, meta_title, meta_description, content, category, tags, status, published_at) VALUES
('how-to-increase-your-apps-rating-on-google-play-store',
'How to Increase Your App''s Rating on Google Play Store',
'How to Increase App Rating on Google Play Store | Revnexa',
'Learn proven strategies to increase your app''s rating on Google Play Store, improve visibility, and drive more downloads with authentic user engagement.',
'# How to Increase Your App''s Rating on Google Play Store

Your app''s rating on the Google Play Store is one of the most critical factors influencing whether potential users decide to download it. A higher rating builds trust, improves visibility in search results, and ultimately drives more downloads.

## Why Your App Rating Matters

Google Play''s algorithm uses your app''s rating as a key ranking signal. Apps with higher ratings appear more prominently in search results and "recommended" placements. Beyond algorithmic benefits, ratings serve as social proof: users are far more likely to install an app rated 4.5 stars than one rated 3.2.

## Start With a Quality Product

No review strategy can compensate for a poor user experience. Before focusing on ratings, ensure your app loads quickly, has an intuitive interface, and delivers on its promises.

## Encourage Reviews at the Right Moment

Timing is everything. Ask for a review when the user is most likely to have a positive impression — after completing a task, achieving a milestone, or experiencing a "wow" moment.

## Make It Easy to Leave a Review

Use Google''s in-app review API to prompt users without sending them away from your app. Keep the prompt simple and non-intrusive.

## Respond to Reviews Professionally

Responding to reviews — especially negative ones — shows that you care about user feedback. A thoughtful response can turn a frustrated user into a loyal advocate.

## Consider Professional Support

If your app''s rating is holding back its growth, a professional review growth service can help. At Revnexa, we specialize in helping apps build credibility through authentic user engagement.

**Ready to grow your app''s rating?** [Contact Revnexa](/contact) — we typically reply within 3-5 minutes.',
'Rating Growth',
ARRAY['google play rating','app rating','review growth','app store optimization'],
'published',
now() - interval '20 days'),

('why-google-play-reviews-matter-for-app-growth',
'Why Google Play Reviews Matter for App Growth',
'Why Google Play Reviews Matter for App Growth | Revnexa',
'Discover why Google Play reviews are essential for app growth, how they affect rankings, and what developers can do to leverage them effectively.',
'# Why Google Play Reviews Matter for App Growth

Reviews are more than just feedback — they''re a growth engine. On the Google Play Store, reviews influence how your app is discovered, perceived, and ultimately downloaded.

## Reviews as a Ranking Signal

Google Play''s search and recommendation algorithms factor in both the quantity and quality of reviews. Apps with more reviews and higher ratings tend to rank better for relevant searches.

## The Trust Factor

When a user searches for an app, the rating and review count are among the first things they see. Reviews are social proof that your app delivers value.

## Building a Review Strategy

A deliberate approach to reviews includes prompting satisfied users, responding to reviews, tracking trends, and considering professional support.

If you''re ready to turn reviews into a growth lever, [reach out to Revnexa](/contact).',
'Rating Growth',
ARRAY['google play reviews','app growth','aso','app visibility'],
'published',
now() - interval '18 days'),

('ultimate-guide-to-app-store-optimization-aso',
'The Ultimate Guide to App Store Optimization (ASO)',
'Ultimate Guide to App Store Optimization (ASO) | Revnexa',
'A comprehensive guide to App Store Optimization (ASO) for Google Play, covering keywords, visuals, reviews, and strategies to boost your app''s visibility.',
'# The Ultimate Guide to App Store Optimization (ASO)

App Store Optimization is the process of improving your app''s visibility and conversion rate within app stores.

## Keyword Research

Start by identifying the terms your target audience uses. Focus on primary keywords in your app title, secondary keywords in your short description, and long-tail keywords in your full description.

## The Role of Reviews in ASO

Reviews are a critical ASO component. They affect search ranking, conversion rate, and keyword relevance. A strong review profile amplifies every other ASO effort.

## Localization

If your app serves multiple regions, localize your store listing for better visibility.

## Track and Iterate

ASO is not a one-time task. Monitor your keyword rankings, conversion rates, and review trends.

[Contact Revnexa](/contact) for expert ASO support.',
'ASO',
ARRAY['aso','app store optimization','google play ranking','app visibility'],
'published',
now() - interval '15 days'),

('how-user-reviews-impact-android-app-downloads',
'How User Reviews Impact Android App Downloads',
'How User Reviews Impact Android App Downloads | Revnexa',
'Learn exactly how user reviews influence Android app download rates and what you can do to turn reviews into a growth channel.',
'# How User Reviews Impact Android App Downloads

Every review your app receives is a signal — to potential users and to Google Play''s algorithm.

## The Decision-Making Funnel

When a user discovers your app, they evaluate the title, rating, review count, and scan the first few reviews before deciding to install.

## Turning Reviews Into Downloads

Encourage satisfied users to leave reviews, respond to every review, fix issues that generate complaints, and build volume over time.

If your app needs a stronger review profile, [Revnexa can help](/contact).',
'Rating Growth',
ARRAY['app downloads','user reviews','android apps','review impact'],
'published',
now() - interval '12 days'),

('10-proven-ways-to-get-more-5-star-reviews-on-google-play',
'10 Proven Ways to Get More 5-Star Reviews on Google Play',
'10 Proven Ways to Get More 5-Star Reviews on Google Play | Revnexa',
'Ten actionable strategies to increase 5-star reviews on Google Play Store.',
'# 10 Proven Ways to Get More 5-Star Reviews on Google Play

Getting more 5-star reviews is about creating the conditions where happy users are motivated to share their experience.

1. Build an app worth reviewing
2. Time your review prompt perfectly
3. Use Google''s In-App Review API
4. Personalize the ask
5. Respond to every review
6. Fix bugs quickly
7. Leverage email or push notifications
8. Create a feedback loop
9. Run periodic review campaigns
10. Work with a review growth service

[Contact Revnexa](/contact) to learn how we can support your review growth.',
'Rating Growth',
ARRAY['5-star reviews','google play reviews','review strategy','app rating'],
'published',
now() - interval '10 days'),

('google-play-store-ranking-factors-explained',
'Google Play Store Ranking Factors, Explained',
'Google Play Store Ranking Factors, Explained | Revnexa',
'Understand the key ranking factors on Google Play Store and how reviews, ratings, and engagement influence your app''s search visibility.',
'# Google Play Store Ranking Factors, Explained

Google Play''s ranking algorithm determines where your app appears in search results.

## Key Factors

1. App quality and performance
2. Ratings and reviews
3. Download and uninstall trends
4. Relevance (keywords)
5. User engagement
6. Freshness and updates
7. Backlinks and external signals
8. Localization

Reviews sit at the intersection of multiple ranking factors. Investing in review growth is one of the highest-leverage things you can do.

**Want to improve your app''s ranking?** [Reach out to Revnexa](/contact).',
'ASO',
ARRAY['google play ranking','ranking factors','aso','app visibility'],
'published',
now() - interval '8 days'),

('how-to-respond-to-negative-reviews-on-google-play',
'How to Respond to Negative Reviews on Google Play',
'How to Respond to Negative Reviews on Google Play | Revnexa',
'Learn the best practices for responding to negative Google Play reviews.',
'# How to Respond to Negative Reviews on Google Play

Negative reviews are inevitable, but how you respond can make all the difference.

## Stay Professional and Calm

Never respond defensively. Acknowledge the user''s frustration and thank them for the feedback.

## Address the Specific Issue

Reference the specific problem and explain what you''re doing about it.

## Follow Up After Resolution

If you fix the issue in an update, go back and let the user know. Many users will update their review.

[Contact Revnexa](/contact) if you need help managing your review profile.',
'Support',
ARRAY['negative reviews','review management','google play reviews'],
'published',
now() - interval '6 days'),

('app-store-vs-play-store-review-strategy-differences',
'App Store vs Play Store: Review Strategy Differences',
'App Store vs Play Store Review Strategy Differences | Revnexa',
'Compare review strategies for Apple App Store vs Google Play Store.',
'# App Store vs Play Store: Review Strategy Differences

While both major app stores use reviews as a ranking and trust signal, the platforms differ in important ways.

## Key Differences

- Google Play maintains a cumulative rating; Apple resets with each version
- Google Play gives more weight to review volume and velocity
- Both platforms discourage custom review prompts

[Contact Revnexa](/contact) to discuss a review strategy tailored to your platform.',
'ASO',
ARRAY['app store','google play','review strategy','aso'],
'published',
now() - interval '5 days'),

('psychology-behind-app-ratings-and-reviews',
'The Psychology Behind App Ratings and Reviews',
'The Psychology Behind App Ratings and Reviews | Revnexa',
'Explore the psychological factors that drive users to leave app reviews.',
'# The Psychology Behind App Ratings and Reviews

Why do some users leave 5-star reviews while others leave 1-star ones — and why do most leave no review at all?

## The Extremity Bias

Users with extreme experiences are most motivated to review. The silent majority rarely leaves feedback.

## Reciprocity and Social Proof

When users feel they''ve received value, a well-timed prompt can channel this into a positive review.

[Revnexa can help](/contact) — we build review strategies grounded in how users actually behave.',
'Rating Growth',
ARRAY['app psychology','review behavior','user engagement','app ratings'],
'published',
now() - interval '4 days'),

('how-startups-can-build-app-credibility-through-reviews',
'How Startups Can Build App Credibility Through Reviews',
'How Startups Can Build App Credibility Through Reviews | Revnexa',
'A practical guide for startups to build app credibility through authentic reviews.',
'# How Startups Can Build App Credibility Through Reviews

For startups, credibility is everything. Reviews bridge the gap by providing social proof.

## Start Early

Don''t wait until you have thousands of users. Build review prompting into your app from day one.

## Focus on Your First 50 Reviews

The first 50 reviews set the tone and establish your initial rating.

[Contact Revnexa](/contact) to learn how we help startups build credibility.',
'Trust',
ARRAY['startups','app credibility','reviews','app launch'],
'published',
now() - interval '3 days'),

('common-mistakes-that-hurt-your-google-play-rating',
'Common Mistakes That Hurt Your Google Play Rating',
'Common Mistakes That Hurt Your Google Play Rating | Revnexa',
'Avoid these common mistakes that damage your Google Play rating.',
'# Common Mistakes That Hurt Your Google Play Rating

Many developers inadvertently damage their app''s rating through avoidable mistakes.

1. Prompting too early
2. Ignoring negative reviews
3. Releasing buggy updates
4. Over-prompting
5. Not responding to positive reviews
6. Keyword stuffing
7. Ignoring localization
8. Not tracking review trends

[Contact Revnexa](/contact) if you need help turning your review profile around.',
'Rating Growth',
ARRAY['google play rating','app rating mistakes','review management'],
'published',
now() - interval '2 days'),

('how-to-encourage-genuine-users-to-leave-reviews',
'How to Encourage Genuine Users to Leave Reviews',
'How to Encourage Genuine Users to Leave Reviews | Revnexa',
'Practical strategies to encourage genuine, authentic user reviews on Google Play.',
'# How to Encourage Genuine Users to Leave Reviews

The best reviews come from genuine, satisfied users.

## Create Genuine Value

The prerequisite for authentic reviews is an app that genuinely helps users.

## Ask at the Right Time

Prompt for a review after a user achieves something meaningful.

## Be Honest About Why Reviews Matter

Some users don''t realize that reviews help small developers.

[Revnexa can help](/contact) — we support authentic review growth.',
'Rating Growth',
ARRAY['genuine reviews','authentic reviews','user engagement','review strategy'],
'published',
now() - interval '1 day'),

('understanding-your-review-metrics-in-google-play-console',
'Understanding Your Review Metrics in Google Play Console',
'Understanding Your Review Metrics in Google Play Console | Revnexa',
'Learn how to read and act on review metrics in Google Play Console.',
'# Understanding Your Review Metrics in Google Play Console

Google Play Console provides a wealth of data about your reviews.

## Rating Overview

The console shows your overall rating, rating distribution, and trends over time.

## Android Vitals

Crash and ANR data correlate with negative reviews. Fix these to improve your rating.

[Contact Revnexa](/contact) for help interpreting your metrics.',
'Support',
ARRAY['google play console','review metrics','app analytics'],
'published',
now() - interval '20 hours'),

('why-app-rating-matters-more-than-download-count',
'Why App Rating Matters More Than Download Count',
'Why App Rating Matters More Than Download Count | Revnexa',
'Discover why your app rating is a more important metric than download count.',
'# Why App Rating Matters More Than Download Count

Many developers obsess over download counts, but your app rating is the more meaningful metric.

## Downloads Are Vanity, Ratings Are Quality

A million downloads with a 2.5 rating means a million disappointed users. A thousand downloads with a 4.8 rating means a thousand happy ones.

Focus on building a strong rating and the downloads will follow. [Revnexa can help](/contact).',
'Trust',
ARRAY['app rating','download count','app metrics','app growth'],
'published',
now() - interval '18 hours'),

('how-to-recover-from-a-sudden-rating-drop',
'How to Recover From a Sudden Rating Drop',
'How to Recover From a Sudden Rating Drop | Revnexa',
'A step-by-step guide to diagnosing and recovering from a sudden drop in your Google Play app rating.',
'# How to Recover From a Sudden Rating Drop

A sudden rating drop is alarming, but it''s usually fixable.

1. Identify the trigger — check if it coincided with a recent update
2. Fix the root cause quickly
3. Release a fix update
4. Respond to recent negative reviews
5. Encourage positive reviews to balance the negatives
6. Monitor closely

Need help recovering your rating? [Contact Revnexa](/contact).',
'Support',
ARRAY['rating drop','app rating recovery','google play reviews'],
'published',
now() - interval '16 hours'),

('building-trust-through-app-store-optimization',
'Building Trust Through App Store Optimization',
'Building Trust Through App Store Optimization | Revnexa',
'Learn how ASO builds user trust and drives conversions.',
'# Building Trust Through App Store Optimization

Trust is the currency of app stores. ASO is fundamentally about building that trust.

## Your Listing Is Your Storefront

Every element contributes to the first impression. Reviews are the most credible element because they come from other users.

Build trust through ASO and reviews. [Contact Revnexa](/contact) for expert support.',
'Trust',
ARRAY['app trust','aso','app store optimization','user trust'],
'published',
now() - interval '14 hours'),

('role-of-reviews-in-play-store-search-rankings',
'The Role of Reviews in Play Store Search Rankings',
'The Role of Reviews in Play Store Search Rankings | Revnexa',
'Understand how reviews influence Google Play search rankings.',
'# The Role of Reviews in Play Store Search Rankings

Reviews play a multifaceted role in Google Play''s search ranking algorithm.

## Direct Ranking Signal

Your app''s star rating and review count are direct inputs to the ranking algorithm.

## Keyword Relevance

Review text contains keywords that reinforce your app''s relevance for specific searches.

Reviews are a ranking lever you can pull. [Contact Revnexa](/contact).',
'ASO',
ARRAY['search rankings','google play reviews','aso','app visibility'],
'published',
now() - interval '12 hours'),

('turning-happy-users-into-5-star-reviewers',
'Turning Happy Users Into 5-Star Reviewers',
'Turning Happy Users Into 5-Star Reviewers | Revnexa',
'Strategies to convert your satisfied app users into 5-star reviewers.',
'# Turning Happy Users Into 5-Star Reviewers

Most happy users never leave a review. Here''s how to convert that silent satisfaction into visible 5-star reviews.

## Identify Your Happy Users

Use in-app analytics to find users who engage frequently and haven''t reported issues.

## Ask at Peak Satisfaction

Trigger a review prompt right after a user completes a core action.

Turn happy users into advocates. [Contact Revnexa](/contact) for help.',
'Rating Growth',
ARRAY['5-star reviews','user reviews','review strategy','app rating'],
'published',
now() - interval '10 hours'),

('app-marketing-trends-to-watch-this-year',
'App Marketing Trends to Watch This Year',
'App Marketing Trends to Watch This Year | Revnexa',
'Stay ahead with the latest app marketing trends.',
'# App Marketing Trends to Watch This Year

The app marketing landscape evolves rapidly. Here are the trends worth watching.

1. Review-driven growth — reviews are becoming even more critical
2. AI-powered ASO
3. Privacy-first marketing
4. Community-led growth
5. Localization at scale
6. Retention over acquisition
7. Video in store listings

Stay ahead of the trends. [Contact Revnexa](/contact) for strategic support.',
'Trust',
ARRAY['app marketing','app trends','aso','app growth'],
'published',
now() - interval '8 hours'),

('case-study-how-review-growth-impacts-app-visibility',
'Case Study: How Review Growth Impacts App Visibility',
'Case Study: How Review Growth Impacts App Visibility | Revnexa',
'A case study template showing the relationship between review growth and app visibility.',
'# Case Study: How Review Growth Impacts App Visibility

This case study template illustrates the relationship between review growth and app visibility.

## The Challenge

A mid-tier app in a competitive category was struggling with visibility due to a 3.4 rating and low review volume.

## The Results (Template)

- Rating improved from 3.4 to 4.5 over 8 weeks
- Review count increased by 300%
- Search ranking improved for primary keywords
- Organic downloads increased significantly

## Want Similar Results?

[Contact Revnexa](/contact) — we''ll discuss your app''s specific situation.',
'Trust',
ARRAY['case study','review growth','app visibility','app success'],
'published',
now() - interval '6 hours')
ON CONFLICT DO NOTHING;
`;

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite('idb://revnexa-db');
    await db.exec(SCHEMA_SQL);
    await db.exec(SEED_SQL);
    await db.exec(BLOG_SEED_SQL);
    dbInstance = db;
    return db;
  })();

  return initPromise;
}
