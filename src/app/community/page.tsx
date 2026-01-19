import type { Metadata } from 'next';
import CommunityHero from '@/components/community/CommunityHero';
import CommunityStats from '@/components/community/CommunityStats';
import WhatHappens from '@/components/community/WhatHappens';
import WhosInTheRoom from '@/components/community/WhosInTheRoom';
import UpcomingEdition from '@/components/community/UpcomingEdition';
import PastSpeakers from '@/components/community/PastSpeakers';
import WhatAttendeesSay from '@/components/community/WhatAttendeesSay';
import PastEditions from '@/components/community/PastEditions';
import BackedBy from '@/components/community/BackedBy';
import SaveYourSpot from '@/components/community/SaveYourSpot';

export const metadata: Metadata = {
  title: 'WaveMakers Connect - Where Product, Design, and Tech Meet',
  description: 'Quarterly offline events for 1000+ designers, engineers, and entrepreneurs. Join India\'s premier tech community conference featuring talks, panels, networking, and workshops.',
  openGraph: {
    title: 'WaveMakers Connect - Where Product, Design, and Tech Meet',
    description: 'Quarterly offline events for 1000+ designers, engineers, and entrepreneurs. Join India\'s premier tech community conference.',
    type: 'website',
  },
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <CommunityHero />
      <CommunityStats />
      <WhatHappens />
      <WhosInTheRoom />
      <PastSpeakers />
      <WhatAttendeesSay />
      <PastEditions />
      <UpcomingEdition />
      <BackedBy />
      <SaveYourSpot />
    </main>
  );
}
