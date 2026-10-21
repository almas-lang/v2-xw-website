import { pageMetadata } from '@/lib/seo';

// Only the listing page uses this metadata. Job pages override it in
// generateMetadata; apply pages set noindex.
export const metadata = pageMetadata('/careers');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
