import { Metadata } from 'next';
import PodcastHero from '@/components/podcast/PodcastHero';
import WhatIsVividYellow from '@/components/podcast/WhatIsVividYellow';
import LatestEpisode from '@/components/podcast/LatestEpisode';
import AllEpisodes from '@/components/podcast/AllEpisodes';
import LeadersWhoJoined from '@/components/podcast/LeadersWhoJoined';
import WhatWeTalkAbout from '@/components/podcast/WhatWeTalkAbout';
import NeverMissEpisode from '@/components/podcast/NeverMissEpisode';
import WhatListenersSay from '@/components/podcast/WhatListenersSay';
import PartnerWithUs from '@/components/podcast/PartnerWithUs';
import PodcastFAQ from '@/components/podcast/PodcastFAQ';
import BeAGuest from '@/components/podcast/BeAGuest';

export const metadata: Metadata = {
  title: 'Vivid Yellow | Design Podcast India - UX & Product Conversations',
  description: 'Unfiltered conversations with design leaders in India. Deep dives into UX, product management, and career growth. New episodes bi-weekly on Spotify & YouTube.',
  keywords: [
    'design podcast',
    'design podcast india',
    'ux podcast',
    'product podcast',
    'best design podcasts',
    'best ux podcasts',
    'best product podcasts',
    'vivid yellow',
    'design leadership',
    'product management',
    'career growth',
  ],
  openGraph: {
    title: "Vivid Yellow | India's Design Podcast for UX & Product Leaders",
    description: "Real conversations with designers, product managers, and creative leaders building India's tech future.",
    type: 'website',
    url: 'https://xperiencewave.com/podcast',
    images: [
      {
        url: '/images/podcast-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vivid Yellow - Design Podcast India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vivid Yellow | India's Design Podcast for UX & Product Leaders",
    description: 'Unfiltered conversations with design leaders in India. Deep dives into UX, product management, and career growth.',
  },
  alternates: {
    canonical: '/podcast',
  },
};

const podcastSchema = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'Vivid Yellow',
  description: 'Design podcast featuring conversations with UX, product, and creative leaders in India',
  url: 'https://xperiencewave.com/podcast',
  author: {
    '@type': 'Organization',
    name: 'Xperience Wave',
  },
  inLanguage: 'en',
  genre: ['Design', 'UX', 'Product Management', 'Technology'],
};

export default function PodcastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />
      <PodcastHero />
      <WhatIsVividYellow />
      <LatestEpisode />
      <AllEpisodes />
      <LeadersWhoJoined />
      <WhatWeTalkAbout />
      <NeverMissEpisode />
      <WhatListenersSay />
      <PartnerWithUs />
      <PodcastFAQ />
      <BeAGuest />
    </>
  );
}
