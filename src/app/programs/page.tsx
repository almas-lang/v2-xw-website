import type { Metadata } from 'next';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramFinder from '@/components/programs/ProgramFinder';
import ProgramCards from '@/components/programs/ProgramCards';
import Stats from '@/components/shared/Stats';
import HowMentorshipWorks from '@/components/programs/HowMentorshipWorks';
import WhyMentorship from '@/components/programs/WhyMentorship';
import MeetMentors from '@/components/programs/MeetMentors';
import SuccessStories from '@/components/shared/SuccessStories';
import MenteesWorkAt from '@/components/shared/MenteesWorkAt';
import FAQ from '@/components/shared/FAQ';
import CTASection from '@/components/shared/CTASection';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: '1:1 UX Mentorship Programs',
  description:
    'Find the right UX mentorship program for your career stage. Whether you\'re starting out, stuck at mid-level, or ready to lead - we have a success path built for where you are.',
  keywords: [
    'UX mentorship programs',
    'UX design courses',
    'senior UX program',
    'design leadership training',
    '1:1 mentorship',
    'UX career coaching',
    'product design mentorship',
  ],
  openGraph: {
    title: '1:1 UX Mentorship Programs That Actually Get You There | Xperience Wave',
    description:
      'Find the right UX mentorship program for your career stage. 3000+ designers consulted, 140+ mentored 1:1, 80% achieved their goals.',
    url: 'https://xperiencewave.com/programs',
    images: [
      {
        url: '/images/og-programs.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Wave UX Mentorship Programs',
      },
    ],
  },
  twitter: {
    title: '1:1 UX Mentorship Programs That Actually Get You There',
    description:
      'Find the right UX mentorship program for your career stage. 3000+ designers consulted, 80% achieved their goals.',
  },
  alternates: {
    canonical: '/programs',
  },
};

const programStats = [
  { value: '3000', suffix: '+', label: 'designers consulted' },
  { value: '38', suffix: '%', label: 'avg salary hike' },
  { value: '10-15', suffix: ' yrs', label: 'mentor experience' },
];

const programFaqs = [
  {
    question: 'How long is each program?',
    answer:
      'Ripple: 3 months + 1 month conditional support. Current: 3 months. Tide: 3 months + 3 months conditional support.',
  },
  {
    question: "What if I can't attend a session?",
    answer:
      'Sessions are scheduled at your convenience. You can reschedule anytime. Clinics happen regularly - if you miss one, attend the next.',
  },
  {
    question: 'Is there EMI or payment plan?',
    answer:
      'Yes. We offer EMIs with major banks, credit cards, and subscription models.',
  },
  {
    question: 'Do I get a certificate?',
    answer:
      "Yes - an exam-based certificate. But honestly, what's more valuable is you actually achieving your goals.",
  },
  {
    question: "What if I don't achieve my goal?",
    answer:
      "We continue working with you until you do. That's our conditional support guarantee.",
  },
  {
    question: 'How much time do I need to commit weekly?',
    answer:
      'About 5-6 hours per week.',
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageSchema
        type="CollectionPage"
        pageUrl="/programs"
        pageName="1:1 UX Mentorship Programs"
        pageDescription="Find the right UX mentorship program for your career stage. Whether you're starting out, stuck at mid-level, or ready to lead."
        breadcrumbs={[{ name: 'Programs', url: '/programs' }]}
        faqs={programFaqs}
      />
      <ProgramsHero />
      <ProgramFinder />
      <ProgramCards />
      <HowMentorshipWorks />
      <Stats stats={programStats} maxWidth="1200px" theme="alice-light" />
      <WhyMentorship />
      <MeetMentors theme="dark-teal" />
      <SuccessStories />
      <MenteesWorkAt />
      <FAQ faqs={programFaqs} />
      <CTASection
        title="Not Sure Which Program Is Right?"
        subtitle="Book a free strategy call. We'll assess where you are, understand your goals, and recommend the right path."
      />
    </>
  );
}
