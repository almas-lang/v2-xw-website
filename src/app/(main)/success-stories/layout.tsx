import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/success-stories');

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
