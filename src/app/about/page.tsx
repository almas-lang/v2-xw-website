import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import ProblemsSection from '@/components/about/ProblemsSection';
import WhatWeDo from '@/components/about/WhatWeDo';
import BuiltDifferent from '@/components/about/BuiltDifferent';
import OurValues from '@/components/about/OurValues';
import TheTeam from '@/components/about/TheTeam';
import Certifications from '@/components/about/Certifications';
import GlobalPresence from '@/components/about/GlobalPresence';
import OurPartners from '@/components/about/OurPartners';
import JoinOurMission from '@/components/about/JoinOurMission';
import WhereToFindUs from '@/components/about/WhereToFindUs';
import ReadyToStart from '@/components/about/ReadyToStart';
import JoinConversation from '@/components/shared/JoinConversation';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'About Xperience Wave | UX Design Mentorship Company | India',
  description:
    'Xperience Wave is a UX design mentorship company founded in 2022. 140+ designers mentored. 95% success rate. Real mentorship, not courses. Based in India with global reach.',
  keywords: [
    'ux design mentorship company',
    'about xperience wave',
    'ux mentor india',
    'design education company',
    'ux mentorship program',
  ],
  openGraph: {
    title: 'About Xperience Wave | UX Design Mentorship Company | India',
    description:
      'Xperience Wave is a UX design mentorship company founded in 2022. 140+ designers mentored. 95% success rate. Real mentorship, not courses.',
    url: 'https://xperiencewave.com/about',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Xperience Wave',
      },
    ],
  },
  twitter: {
    title: 'About Xperience Wave | UX Design Mentorship Company | India',
    description:
      'Xperience Wave is a UX design mentorship company founded in 2022. 140+ designers mentored. 95% success rate. Real mentorship, not courses.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageSchema
        type="AboutPage"
        pageUrl="/about"
        pageName="About Xperience Wave | UX Design Mentorship Company"
        pageDescription="Xperience Wave is a UX design mentorship company founded in 2022. 140+ designers mentored. 95% success rate. Real mentorship, not courses. Based in India with global reach."
        breadcrumbs={[{ name: 'About', url: '/about' }]}
      />
      {/* SEO h1 - visually hidden but accessible to search engines */}
      <h1 className="sr-only">About Xperience Wave</h1>
      <AboutHero />
      <ProblemsSection />
      <WhatWeDo />
      <BuiltDifferent />
      <OurValues />
      <TheTeam />
      <Certifications />
      <GlobalPresence />
      <JoinConversation />
      <OurPartners />
      <JoinOurMission />
      <WhereToFindUs />
      <ReadyToStart />
    </>
  );
}
