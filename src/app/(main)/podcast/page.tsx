import { pageMetadata } from '@/lib/seo';
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

export const metadata = pageMetadata('/podcast', { image: '/images/podcast-hero.jpg' });

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
