import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories | UX Designers Who Transformed Their Careers | Xperience Wave',
  description: 'Real transformations from designers who grew into senior UX, leadership, and product design roles at McKinsey, Siemens, Informatica, and more. Watch video testimonials and read their stories.',
  keywords: [
    'ux designer success stories',
    'ux mentorship testimonials',
    'ux career transition stories',
    'senior ux designer journey',
    'xperience wave reviews',
    'ux mentorship results',
  ],
  openGraph: {
    title: 'Success Stories | UX Designers Who Transformed Their Careers',
    description: 'Real transformations from designers who grew into senior UX, leadership, and product design roles.',
    url: 'https://xperiencewave.com/success-stories',
    type: 'website',
    siteName: 'Xperience Wave',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories | Xperience Wave',
    description: 'Real transformations from designers who grew into senior UX, leadership, and product design roles.',
  },
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
