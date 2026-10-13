import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/for-business/training-for-teams');

export default function TrainingForTeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
