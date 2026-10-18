import type { Metadata } from 'next';
import { blogPosts, isPostPublished } from '@/data/blogPosts';
import LinksPageClient from './LinksPageClient';

// Re-render hourly so newly published blog posts show up without a redeploy.
export const revalidate = 3600;

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
};

export default function LinksPage() {
  // Only ship title + slug to the client so the linktree stays light.
  const blogs = blogPosts
    .filter(isPostPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((p) => ({ title: p.title, slug: p.slug }));

  return <LinksPageClient blogs={blogs} />;
}
