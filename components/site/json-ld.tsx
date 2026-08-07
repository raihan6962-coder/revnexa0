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
  url: 'https://revnexa.site',
  logo: 'https://revnexa.site/logo.png',
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
  url: 'https://revnexa.site',
  description:
    'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.',
  publisher: {
    '@type': 'Organization',
    name: 'Revnexa',
    logo: {
      '@type': 'ImageObject',
      url: 'https://revnexa.site/logo.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://revnexa.site/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Revnexa',
  url: 'https://revnexa.site',
  logo: 'https://revnexa.site/logo.png',
  image: 'https://revnexa.site/logo.png',
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
    email: 'hello@revnexa.site',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Google Play Review Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Google Play Store Review Service',
          description: 'Authentic review growth support from real Android users',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'App Rating Improvement',
          description: 'Strategic review growth to improve app ratings',
        },
      },
    ],
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
      url: 'https://revnexa.site',
    },
    serviceType: 'Google Play Store Review Generation',
    areaServed: 'Worldwide',
    description:
      'Real users on real Android devices provide authentic feedback and reviews to improve app quality and store ranking. Natural engagement, genuine feedback, and policy-compliant campaigns.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Review Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Package',
            description: 'Perfect for new apps building initial credibility',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth Package',
            description: 'For apps looking to improve ratings and visibility',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Enterprise Package',
            description: 'Comprehensive review strategy for established apps',
          },
        },
      ],
    },
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
      item: `https://revnexa.site${item.url}`,
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
        url: 'https://revnexa.site/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://revnexa.site/blog/${post.slug}`,
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

export function reviewSchema(reviews: {
  author: string;
  rating: number;
  text: string;
  date: string;
}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Revnexa',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '5.0',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author || 'Revnexa Client',
      },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}
