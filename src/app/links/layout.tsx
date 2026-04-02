import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xperience Wave — Links',
  description:
    'Better designers. Better products. 1:1 Mentorship | Design services: Hiring, Design, and Development | Bangalore, India',
  openGraph: {
    title: 'Xperience Wave — Links',
    description:
      'Better designers. Better products. 1:1 Mentorship | Design services: Hiring, Design, and Development | Bangalore, India',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
