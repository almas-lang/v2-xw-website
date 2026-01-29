import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire Trained UX Designers from India | Xperience Wave',
  description: 'Hire job-ready UX designers we trained ourselves. 48-72 hour profile matching. 60-day replacement guarantee. No moonlighters, no fake case studies.',
  keywords: [
    'hire ux designers',
    'hire ux designers india',
    'hire ui ux designer',
    'ux designer recruitment india',
    'trained ux designers',
    'hire product designers',
    'ux talent india',
    'remote ux designers',
  ],
  openGraph: {
    title: 'Hire Trained UX Designers from India | Xperience Wave',
    description: 'Hire job-ready UX designers we trained ourselves. 48-72 hour profile matching. 60-day replacement guarantee.',
    url: 'https://xperiencewave.com/for-business/hire-ux-designers',
    type: 'website',
    siteName: 'Xperience Wave',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Trained UX Designers from India | Xperience Wave',
    description: 'Hire job-ready UX designers we trained ourselves. 48-72 hour profile matching. 60-day replacement guarantee.',
  },
};

export default function HireUXDesignersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
