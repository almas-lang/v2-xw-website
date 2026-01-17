import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free UX Design Resources — Templates, Tools & Guides',
  description:
    'Download free UX templates, career guides, and AI tools. Built for designers in India who want senior roles. No fluff, just practical resources.',
  keywords: [
    'UX design resources',
    'UX templates',
    'free UX tools',
    'UX career guides',
    'UX portfolio templates',
    'UX interview prep',
    'UX design India',
  ],
  openGraph: {
    title: 'Free UX Design Resources — Templates, Tools & Guides | Xperience Wave',
    description:
      'Download free UX templates, career guides, and AI tools. Built for designers in India who want senior roles. No fluff, just practical resources.',
    url: 'https://xperiencewave.com/resources',
    images: [
      {
        url: '/images/og-resources.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Wave Resources',
      },
    ],
  },
  twitter: {
    title: 'Free UX Design Resources — Templates, Tools & Guides',
    description:
      'Download free UX templates, career guides, and AI tools. Built for designers in India who want senior roles.',
  },
  alternates: {
    canonical: '/resources',
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
