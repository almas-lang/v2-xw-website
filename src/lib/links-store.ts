import { put, list } from '@vercel/blob';
import type { LinksData, LinkItem } from '@/types/links';

const BLOB_PATH = 'admin/links.json';

const DEFAULT_LINKS: LinksData = {
  links: [
    {
      id: '1',
      title: 'Book your free strategy call',
      subtitle: '15 min — see if 1:1 mentorship is right for you',
      url: 'https://calendly.com/team-xperiencewave/xw-strategy',
      icon: '📞',
      style: 'cta-red',
      active: true,
      order: 0,
    },
    {
      id: '2',
      title: 'Download the RIVER framework',
      subtitle: 'Negotiate your next salary like a senior',
      url: 'https://app.xperiencewave.com/river-framework',
      icon: '📄',
      style: 'cta-dark',
      active: true,
      order: 1,
    },
    {
      id: '3',
      title: 'The UX career ladder nobody explains',
      subtitle: 'Blog — 12 min read',
      url: 'https://xperiencewave.com/resources/blogs/ux-career-ladder-levels-india',
      icon: '📝',
      style: 'card',
      active: true,
      order: 2,
    },
    {
      id: '4',
      title: 'Why you\'re stuck at mid-level',
      subtitle: 'YouTube — 12 min',
      url: 'https://www.youtube.com/@xperiencewave',
      icon: '▶️',
      style: 'card',
      active: true,
      order: 3,
    },
    {
      id: '5',
      title: 'Free UX resources & templates',
      subtitle: 'Design systems, research plans, personas',
      url: 'https://xperiencewave.com/resources',
      icon: '📦',
      style: 'card',
      active: true,
      order: 4,
    },
    {
      id: '6',
      title: 'Join 2,000+ designers on WhatsApp',
      subtitle: 'WaveMakers Connect community',
      url: 'https://chat.whatsapp.com/xperiencewave',
      icon: '💬',
      style: 'community',
      active: true,
      order: 5,
    },
    {
      id: '7',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/company/xperiencewave/',
      icon: '💼',
      style: 'social',
      active: true,
      order: 6,
    },
    {
      id: '8',
      title: 'Instagram',
      url: 'https://www.instagram.com/xperiencewave/',
      icon: '📸',
      style: 'social',
      active: true,
      order: 7,
    },
    {
      id: '9',
      title: 'YouTube',
      url: 'https://www.youtube.com/@xperiencewave',
      icon: '▶️',
      style: 'social',
      active: true,
      order: 8,
    },
    {
      id: '10',
      title: 'X / Twitter',
      url: 'https://twitter.com/xperiencewave',
      icon: '🐦',
      style: 'social',
      active: true,
      order: 9,
    },
  ],
  updatedAt: new Date().toISOString(),
};

export async function getLinks(): Promise<LinksData> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATH });

    if (blobs.length === 0) {
      await saveLinks(DEFAULT_LINKS);
      return DEFAULT_LINKS;
    }

    const response = await fetch(blobs[0].url);
    const data: LinksData = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch links:', error);
    return DEFAULT_LINKS;
  }
}

export async function saveLinks(data: LinksData): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function reorderLinks(links: LinkItem[]): LinkItem[] {
  return links
    .sort((a, b) => a.order - b.order)
    .map((link, index) => ({ ...link, order: index }));
}
