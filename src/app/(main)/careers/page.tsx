import { getOpenJobs } from '@/data/jobs';
import CareersHero from '@/components/careers/CareersHero';
import CultureSection from '@/components/careers/CultureSection';
import OpenRoles from '@/components/careers/OpenRoles';

export default function CareersPage() {
  const jobs = getOpenJobs();
  return (
    <>
      <CareersHero openCount={jobs.length} />
      <CultureSection />
      <OpenRoles jobs={jobs} />
    </>
  );
}
