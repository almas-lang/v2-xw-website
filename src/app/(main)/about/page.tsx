import { pageMetadata } from '@/lib/seo';
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

export const metadata = pageMetadata('/about');

export default function AboutPage() {
  return (
    <>
      <PageSchema
        type="AboutPage"
        pageUrl="/about"
        pageName="About Xperience Wave | UX Design Mentorship Company"
        pageDescription="Xperience Wave is a UX design mentorship company founded in 2022 by Shaik Murad and Almas Tasneem. 3,000+ designers trained and mentored. 83% of 1:1 mentees hit their career goal. Real mentorship, not courses."
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
