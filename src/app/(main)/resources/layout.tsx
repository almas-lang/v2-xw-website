import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/resources');

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
