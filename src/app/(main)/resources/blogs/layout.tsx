import { pageMetadata } from '@/lib/seo';

// Re-render the listing at most hourly so scheduled posts appear in the
// prerendered HTML (visitors' browsers already filter live on each load)
export const revalidate = 3600;

export const metadata = pageMetadata('/resources/blogs');

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
