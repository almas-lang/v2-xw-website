type SchemaType =
  | 'Article'
  | 'BlogPosting'
  | 'Product'
  | 'Service'
  | 'FAQPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'VideoObject'
  | 'PodcastSeries'
  | 'PodcastEpisode'
  | 'Review'
  | 'Person'
  | 'Event';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ReviewItem {
  author: string;
  rating: number;
  body: string;
  date?: string;
}

interface ArticleData {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
}

interface ProductData {
  name: string;
  description: string;
  image?: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
}

interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format (e.g., "PT1M30S")
  embedUrl?: string;
}

interface PodcastData {
  name: string;
  description: string;
  image?: string;
  author?: string;
  episodes?: {
    name: string;
    description: string;
    datePublished: string;
    duration?: string;
    url: string;
  }[];
}

interface PersonData {
  name: string;
  jobTitle?: string;
  image?: string;
  description?: string;
  sameAs?: string[];
}

interface PageSchemaProps {
  type: SchemaType;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  reviews?: ReviewItem[];
  article?: ArticleData;
  product?: ProductData;
  video?: VideoData;
  podcast?: PodcastData;
  person?: PersonData;
  pageUrl: string;
  pageName: string;
  pageDescription?: string;
}

const BASE_URL = 'https://xperiencewave.com';

export default function PageSchema({
  type,
  breadcrumbs,
  faqs,
  reviews,
  article,
  product,
  video,
  podcast,
  person,
  pageUrl,
  pageName,
  pageDescription,
}: PageSchemaProps) {
  const schemas: object[] = [];

  // Breadcrumb Schema (always include if provided)
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        ...breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
      ],
    });
  }

  // WebPage Schema (always include)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': type === 'Article' || type === 'BlogPosting' ? type : 'WebPage',
    '@id': `${BASE_URL}${pageUrl}#webpage`,
    url: `${BASE_URL}${pageUrl}`,
    name: pageName,
    description: pageDescription,
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
  });

  // FAQ Schema (can be added to any page type)
  if (faqs && faqs.length > 0) {
    schemas.push({
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
    });
  }

  // Article/BlogPosting Schema
  if ((type === 'Article' || type === 'BlogPosting') && article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': type,
      headline: article.title,
      description: article.description,
      image: article.image ? `${BASE_URL}${article.image}` : undefined,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Person',
        name: article.author.name,
        url: article.author.url,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}${pageUrl}`,
      },
    });
  }

  // Product Schema
  if (type === 'Product' && product) {
    const productSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image ? `${BASE_URL}${product.image}` : undefined,
      brand: {
        '@type': 'Brand',
        name: 'Xperience Wave',
      },
    };

    if (product.price) {
      productSchema.offers = {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency || 'INR',
        availability: `https://schema.org/${product.availability || 'InStock'}`,
      };
    }

    if (product.rating) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.rating.value.toString(),
        ratingCount: product.rating.count.toString(),
        bestRating: '5',
        worstRating: '1',
      };
    }

    schemas.push(productSchema);
  }

  // Reviews Schema (can be added to any page)
  if (reviews && reviews.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: pageName,
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
          bestRating: '5',
        },
        reviewBody: review.body,
        datePublished: review.date,
      })),
    });
  }

  // Video Schema
  if (type === 'VideoObject' && video) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl.startsWith('http')
        ? video.thumbnailUrl
        : `${BASE_URL}${video.thumbnailUrl}`,
      uploadDate: video.uploadDate,
      duration: video.duration,
      embedUrl: video.embedUrl,
      publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
      },
    });
  }

  // Podcast Schema
  if ((type === 'PodcastSeries' || type === 'PodcastEpisode') && podcast) {
    const podcastSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      name: podcast.name,
      description: podcast.description,
      image: podcast.image ? `${BASE_URL}${podcast.image}` : undefined,
      author: podcast.author
        ? {
            '@type': 'Person',
            name: podcast.author,
          }
        : undefined,
      publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
      },
    };

    if (podcast.episodes && podcast.episodes.length > 0) {
      podcastSchema.episode = podcast.episodes.map((ep) => ({
        '@type': 'PodcastEpisode',
        name: ep.name,
        description: ep.description,
        datePublished: ep.datePublished,
        duration: ep.duration,
        url: ep.url.startsWith('http') ? ep.url : `${BASE_URL}${ep.url}`,
      }));
    }

    schemas.push(podcastSchema);
  }

  // Person Schema
  if (type === 'Person' && person) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      image: person.image ? `${BASE_URL}${person.image}` : undefined,
      description: person.description,
      sameAs: person.sameAs,
      worksFor: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
      },
    });
  }

  // AboutPage Schema
  if (type === 'AboutPage') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_URL}${pageUrl}#aboutpage`,
      url: `${BASE_URL}${pageUrl}`,
      name: pageName,
      description: pageDescription,
      mainEntity: {
        '@id': `${BASE_URL}/#organization`,
      },
    });
  }

  // Service Schema
  if (type === 'Service') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageName,
      description: pageDescription,
      provider: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
      },
      serviceType: 'UX Design Mentorship',
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
