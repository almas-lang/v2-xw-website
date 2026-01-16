import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - UX Design Insights & Career Tips',
  description:
    'Expert insights on UX design, career growth, and industry trends. Learn from designers who have helped 140+ mentees land roles at top companies.',
  keywords: [
    'UX design blog',
    'UX career tips',
    'design industry insights',
    'UX portfolio advice',
    'design career growth',
    'UX mentorship blog',
  ],
  openGraph: {
    title: 'Blog - UX Design Insights & Career Tips | Xperience Wave',
    description:
      'Expert insights on UX design, career growth, and industry trends from designers who have been there.',
    url: 'https://xperiencewave.com/resources/blogs',
    images: [
      {
        url: '/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Wave Blog',
      },
    ],
  },
  twitter: {
    title: 'Blog - UX Design Insights & Career Tips | Xperience Wave',
    description:
      'Expert insights on UX design, career growth, and industry trends.',
  },
  alternates: {
    canonical: '/resources/blogs',
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
