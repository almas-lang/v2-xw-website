import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Xperience Wave',
  description:
    'Get in touch with Xperience Wave. Questions about UX mentorship programs, corporate training, or design services? We\'re here to help.',
  keywords: [
    'contact xperience wave',
    'ux mentorship contact',
    'design training inquiry',
    'xperience wave support',
  ],
  openGraph: {
    title: 'Contact Us | Xperience Wave',
    description:
      'Get in touch with Xperience Wave. Questions about UX mentorship programs, corporate training, or design services? We\'re here to help.',
    url: 'https://xperiencewave.com/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
