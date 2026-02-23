import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs - Frequently Asked Questions',
  description:
    'Find answers to common questions about our UX mentorship programs. Get clarity on program duration, pricing, guarantees, and what to expect from 1:1 mentorship.',
  keywords: [
    'UX mentorship FAQ',
    'design mentorship questions',
    'UX program pricing',
    'mentorship guarantee',
    '1:1 coaching FAQ',
    'UX career questions',
  ],
  openGraph: {
    title: 'FAQs - Frequently Asked Questions | Xperience Wave',
    description:
      'Find answers to common questions about our UX mentorship programs. Get clarity on program duration, pricing, guarantees, and more.',
    url: 'https://xperiencewave.com/resources/faq',
    images: [
      {
        url: '/images/og-faqs.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Wave FAQs',
      },
    ],
  },
  twitter: {
    title: 'FAQs - Frequently Asked Questions | Xperience Wave',
    description:
      'Find answers to common questions about our UX mentorship programs.',
  },
  alternates: {
    canonical: '/resources/faq',
  },
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
