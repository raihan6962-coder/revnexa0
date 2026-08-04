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
  logo: 'https://revnexa.com/logo.png',
  description:
    'Ethical Google Play review and user feedback service for Android apps. Real users, real devices, organic engagement patterns.',
  areaServed: ['US', 'GB', 'CA', 'AU'],
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    availableLanguage: 'English',
  },
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Revnexa',
  url: 'https://revnexa.com',
  description:
    'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.',
  publisher: {
    '@type': 'Organization',
    name: 'Revnexa',
    logo: {
      '@type': 'ImageObject',
      url: 'https://revnexa.com/logo.png',
    },
  },
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
    serviceType: 'Google Play Store Review Generation',
    areaServed: 'Worldwide',
    description:
      'Real users on real Android devices provide authentic feedback and reviews to improve app quality and store ranking. Natural engagement, genuine feedback, and policy-compliant campaigns.',
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://revnexa.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://revnexa.com/blog/${post.slug}`,
    },
  };
}

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Revnexa',
  url: 'https://revnexa.com',
  logo: 'https://revnexa.com/logo.png',
  description:
    'Professional Google Play Store review service helping Android apps grow through authentic user engagement and rating improvement.',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 39.8283,
      longitude: -98.5795,
    },
    geoRadius: '20000 km',
  },
  serviceType: 'Google Play Store Review Service',
  priceRange: '$$',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: 'English',
    email: 'hello@revnexa.com',
  },
};

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
