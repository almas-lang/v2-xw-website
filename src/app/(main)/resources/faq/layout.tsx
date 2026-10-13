import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/resources/faq');

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
