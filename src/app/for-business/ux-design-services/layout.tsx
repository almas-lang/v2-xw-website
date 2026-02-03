import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UX Design Services for Product Teams | Xperience Wave',
  description: 'Outcome-driven UX design for product teams. UX audits, product design, and ongoing support - without full-time hires. Based in Bangalore.',
  keywords: [
    'ux design services',
    'ux design agency',
    'ux audit',
    'product design',
    'ux design bangalore',
    'ux consulting',
    'user experience design',
    'ux design for startups',
    'ux design for product teams',
  ],
  openGraph: {
    title: 'UX Design Services for Product Teams | Xperience Wave',
    description: 'Outcome-driven UX design for product teams. UX audits, product design, and ongoing support - without full-time hires. Based in Bangalore.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UX Design Services for Product Teams | Xperience Wave',
    description: 'Outcome-driven UX design for product teams. UX audits, product design, and ongoing support - without full-time hires. Based in Bangalore.',
  },
};

export default function UXDesignServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
