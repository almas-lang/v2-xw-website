import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/data/blogPosts';
import { indexableStaticPaths, SITE_URL } from '@/lib/seo';

// Regenerate at most hourly so scheduled posts get indexed without a redeploy
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages come from the SEO map, so a page can't be indexable without
  // metadata, and noindex pages (forms) are left out automatically.
  // No lastModified: we don't track real edit dates for static pages, and a
  // build-time date is worse than none (Google ignores dates that change on
  // every deploy).
  const staticUrls: MetadataRoute.Sitemap = indexableStaticPaths().map((path) => ({
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    changeFrequency: path === '/' || path.startsWith('/programs') || path === '/resources/blogs' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/programs') ? 0.9 : 0.7,
  }));

  // Published blog posts, with their real publish date
  const blogUrls: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${SITE_URL}/resources/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls];
}
