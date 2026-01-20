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
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'WaveMakers Connect | Free Design & Tech Events in Bangalore | Xperience Wave',
  description: 'WaveMakers Connect is a free design meetup in Bangalore for designers, engineers, and founders. Real speakers, real conversations, no hype. Join 1370+ members.',
  openGraph: {
    title: 'WaveMakers Connect | Free Design & Tech Events in Bangalore',
    description: 'WaveMakers Connect is a free design meetup in Bangalore for designers, engineers, and founders. Real speakers, real conversations, no hype.',
    type: 'website',
  },
};

export default function CommunityPage() {
  return (
    <>
      <PageSchema
        type="Event"
        pageUrl="/community"
        pageName="WaveMakers Connect | Free Design & Tech Events in Bangalore"
        pageDescription="WaveMakers Connect is a free design meetup in Bangalore for designers, engineers, and founders. Real speakers, real conversations, no hype. Join 1370+ members."
        breadcrumbs={[
          { name: 'Community', url: '/community' },
        ]}
      />
      {/* Organization Schema for WaveMakers Connect */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "WaveMakers Connect",
            "url": "https://xperiencewave.com/community",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Xperience Wave"
            }
          })
        }}
      />
      {/* Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "WaveMakers Connect Edition #4",
            "description": "An in-person event for designers, engineers, and entrepreneurs in Bangalore",
            "startDate": "2025-02-15T11:00:00+05:30",
            "endDate": "2025-02-15T14:00:00+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Its Brown and Roasted",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Singasandra",
                "addressRegion": "Bangalore",
                "addressCountry": "IN"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "Xperience Wave",
              "url": "https://xperiencewave.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/LimitedAvailability"
            },
            "image": "https://xperiencewave.com/images/wmc-event.jpg"
          })
        }}
      />
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
    </>
  );
}
