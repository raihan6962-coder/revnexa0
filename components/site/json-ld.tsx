interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Revnexa',
  url: 'https://revnexa.com',
  description:
    'Professional Google Play Store review service helping apps grow through authentic user engagement and rating improvement support.',
  areaServed: ['US', 'GB', 'CA', 'AU'],
};

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Google Play Store Review Service',
    provider: {
      '@type': 'Organization',
      name: 'Revnexa',
      url: 'https://revnexa.com',
    },
    serviceType: 'Google Play Store Review Service',
    areaServed: 'Worldwide',
    description:
      'Professional review growth support for Google Play Store apps, including authentic user engagement, rating improvement, and review management strategies.',
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://revnexa.com${item.url}`,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Revnexa',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Revnexa',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://revnexa.com/blog/${post.slug}`,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
