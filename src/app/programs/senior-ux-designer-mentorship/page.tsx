import type { Metadata } from 'next';
import ProgramHero from '@/components/programs/ProgramHero';
import ProgramStats from '@/components/programs/ProgramStats';
import ProgramFitCheck from '@/components/programs/ProgramFitCheck';
import ProgramOverview from '@/components/programs/ProgramOverview';
import HowItWorks from '@/components/programs/HowItWorks';
import WhatYoullLearn from '@/components/programs/WhatYoullLearn';
import ToolsSection from '@/components/programs/ToolsSection';
import MeetMentors from '@/components/programs/MeetMentors';
import SuccessStories from '@/components/shared/SuccessStories';
import MenteesWorkAt from '@/components/shared/MenteesWorkAt';
import WhyMentorship from '@/components/programs/WhyMentorship';
import InvestmentSection from '@/components/programs/InvestmentSection';
import FAQ from '@/components/shared/FAQ';
import CTASection from '@/components/shared/CTASection';
import PageSchema from '@/components/seo/PageSchema';
import { sharedProgramSteps, sharedTools } from '@/data/programData';

export const metadata: Metadata = {
  title: 'Current - Senior UX Mentorship Program | 1:1 Mentorship for Mid-Level Designers | Xperience Wave',
  description:
    '1:1 mentorship program for mid-level UX/UI designers (2-5 years) stuck at the same level. Land senior & lead roles. AI-first design approach. Support until you succeed.',
  keywords: [
    'senior ux mentorship program',
    'mid level ux designer mentorship',
    'ux design career growth',
    'land senior ux role',
    'ux designer mentor',
    'current program xperience wave',
  ],
  openGraph: {
    title: 'Current - Senior UX Mentorship Program | 1:1 Mentorship for Mid-Level Designers',
    description:
      '1:1 mentorship program for mid-level UX/UI designers (2-5 years) stuck at the same level. Land senior & lead roles. AI-first design approach.',
    url: 'https://xperiencewave.com/programs/senior-ux-designer-mentorship',
    images: [
      {
        url: '/images/og-current.jpg',
        width: 1200,
        height: 630,
        alt: 'Current Program - Senior UX Mentorship',
      },
    ],
  },
  twitter: {
    title: 'Current - Senior UX Mentorship Program | 1:1 Mentorship for Mid-Level Designers',
    description:
      '1:1 mentorship program for mid-level UX/UI designers (2-5 years) stuck at the same level. Land senior & lead roles.',
  },
  alternates: {
    canonical: '/programs/senior-ux-designer-mentorship',
  },
};

const currentFaqs = [
  {
    question: 'Who is Current for?',
    answer:
      'Mid-level designers with 2-5 years of experience in UX/UI/Product Design who are stuck at the same level and want to break into senior or lead roles.',
  },
  {
    question: 'How is this different from UX courses?',
    answer:
      'Courses teach the same content to everyone. Current gives you a personalized roadmap, 1:1 mentorship with senior designers, and support until you achieve your goal - not just a certificate.',
  },
  {
    question: 'How long is the program?',
    answer:
      '3 months of structured mentorship. Plus conditional support until you reach your goal.',
  },
  {
    question: 'How much time do I need to commit?',
    answer:
      'About 5-6 hours per week.',
  },
  {
    question: "What if I can't attend a session?",
    answer:
      '1:1 sessions are scheduled at your convenience - you can reschedule anytime. Clinics happen regularly, so if you miss one, attend the next.',
  },
  {
    question: 'Is there EMI or payment plan?',
    answer:
      'Yes. We offer EMI with major banks, credit cards, and subscription payment models.',
  },
  {
    question: "What's the guarantee?",
    answer:
      'Stay committed, and we support you until you achieve your goal. Details discussed during strategy call.',
  },
  {
    question: "What if I'm not sure Current is right for me?",
    answer:
      "Book a free strategy call. We'll assess your situation and tell you honestly if this program fits - or recommend something else.",
  },
];

const currentStats = [
  { value: '80%', label: 'achieved their goals' },
  { value: '38%', label: 'avg salary hike' },
  { value: '5 weeks', label: 'Fastest result' },
];

const currentFitCheck = {
  forYou: [
    'You have 2-5 years in UX/UI/Product Design',
    'You are stuck at same level despite doing good work',
    'You want senior, lead, or principal roles',
    "You're willing to put in 5-6 hours/week",
    'You want real mentorship, not courses',
  ],
  notForYou: [
    "You're a fresher or career switcher",
    "You're looking for a quick certificate",
    'You just want to "learn UX"',
    "You're not ready to invest in yourself",
    'You expect results without effort',
  ],
};

const currentLearningModules = [
  {
    title: 'Core Design (STRDV Framework)',
    subtitle: 'The foundations that separate senior designers from the rest.',
    items: [
      'Ecosystem understanding beyond just screens',
      'Strategic design thinking',
      'Research - Qualitative, quantitative, synthesis, insights',
      'From insights to concepts to high-fidelity',
      'Testing, evaluation, iteration',
    ],
  },
  {
    title: 'SVR Foundations',
    subtitle: 'What you need to operate at senior level - not just execute.',
    items: [
      'System thinking and problem architecture',
      'AI-first design approach',
      'Design systems and interface guidelines',
      'Design as a business unit',
      'Stakeholder communication',
    ],
  },
  {
    title: 'Evident Personal Branding',
    subtitle: "Getting the role isn't just about skills. It's about proof.",
    items: [
      'Crafting YOU brand',
      'Portfolio that tells a story, not just shows screens',
      'Resume and LinkedIn that get callbacks',
      'Interview strategy, mock practice, recruiter outreach and pipeline building',
    ],
  },
];

const currentAiModule = {
  title: 'AI-First Design Approach',
  description: "AI isn't a module - it's embedded throughout. You'll learn to think AI-first, use AI tools effectively, and design for AI products.",
};

const currentIncluded = [
  { text: 'Regular 1:1 online mentorship sessions' },
  { text: 'Offline workshop in Bangalore' },
  { text: 'Expert-led online clinics (Core Design, SVR Foundations, Personal Branding)' },
  { text: 'Online exam-based globally recognised certification' },
  { text: 'Access to WaveAcademy - videos, activities, tools, and quizzes' },
  { text: 'WaveMakers Connect community access (2k+ members)' },
];

const currentInvestment = {
  pricing: {
    amount: '₹22,000',
    period: 'month',
    equivalent: 'about ₹5,500/week',
    note: 'Final pricing based on your goals and situation. Discussed during strategy call.',
  },
  roi: {
    stat: '38%',
    description: 'Most mentees make back their investment in less than 2 months of their updated salary',
  },
  guarantee: "We're so confident in this program - we support you until you reach your goal*",
};

const currentOverviewData = {
  subtitle: "This isn't about learning more. It's about becoming undeniable",
  targetRoles: {
    title: 'Target Roles',
    items: ['Sr. Designer', 'Design Lead', 'Principal Designer', 'Staff Designer'],
  },
  salaryGoal: {
    title: 'Salary Goal',
    value: 'Up to 28 LPA (from current 6-12 LPA) as UX Designer or Product Designer',
  },
  timeline: {
    title: 'Timeline',
    value: '3 months + Conditional support',
  },
  abilities: [
    'Drive design decisions using business levers',
    'Handle end-to-end project ownership',
    'Position yourself as an AI-powered design SME',
    'Build a portfolio that gets callbacks',
    'Crack senior-level interviews with confidence',
  ],
};

export default function CurrentProgramPage() {
  return (
    <>
      <PageSchema
        type="Product"
        pageUrl="/programs/senior-ux-designer-mentorship"
        pageName="Current - Senior UX Mentorship Program"
        pageDescription="1:1 mentorship program for mid-level UX/UI designers (2-5 years) stuck at the same level. Land senior & lead roles."
        breadcrumbs={[
          { name: 'Programs', url: '/programs' },
          { name: 'Senior UX Mentorship', url: '/programs/senior-ux-designer-mentorship' },
        ]}
        faqs={currentFaqs}
      />
      <ProgramHero
        programName="Current"
        tagline="Senior Mentorship"
        problemStatement="You've done the work. You know design. But promotions go to others, interviews don't convert, and you're stuck at the same level."
        description="Current is an online 3-month 1:1 design mentorship program that fixes what's actually holding you back - not your skills, but how you position, communicate, and prove your value."
        targetAudience={[
          "You're a mid-level designer (2-5 years) stuck at the same level",
          "Promotions go to others despite your strong work",
          "Interviews don't convert into offers",
          "You want to land senior & lead roles",
        ]}
        duration="3 months"
        accentColor="coral"
        features={['1:1s with a senior design mentor (10+ years experience)', 'AI-first design approach', 'Support until you achieve your goal']}
        badge="Most Popular"
        breadcrumbLabel="Current - Senior Mentorship"
        topBanner="1:1 UX Mentorship for mid-level designers ready to break through to senior & lead roles"
        heroImage="/images/current-hero.jpg"
      />
      <ProgramStats stats={currentStats} accentColor="coral" />
      <ProgramFitCheck
        programName="Current"
        forYou={currentFitCheck.forYou}
        notForYou={currentFitCheck.notForYou}
        accentColor="coral"
      />
      <ProgramOverview
        subtitle={currentOverviewData.subtitle}
        targetRoles={currentOverviewData.targetRoles}
        salaryGoal={currentOverviewData.salaryGoal}
        timeline={currentOverviewData.timeline}
        abilities={currentOverviewData.abilities}
        accentColor="coral"
      />
      <HowItWorks
        programName="Current"
        steps={sharedProgramSteps}
        includedItems={currentIncluded}
        accentColor="coral"
      />
      <WhatYoullLearn
        programName="Current"
        modules={currentLearningModules}
        aiModule={currentAiModule}
        accentColor="coral"
      />
      <ToolsSection tools={sharedTools} />
      <MeetMentors accentColor="coral" />
      <SuccessStories
        title="From Mid-Level to Senior"
        subtitle="Designers who broke through the ceiling"
        accentColor="coral"
      />
      <MenteesWorkAt />
      <WhyMentorship />
      <InvestmentSection
        pricing={currentInvestment.pricing}
        roi={currentInvestment.roi}
        guarantee={currentInvestment.guarantee}
        accentColor="coral"
      />
      <FAQ faqs={currentFaqs} theme="coral" />
      <CTASection
        title={
          <>
            Your Senior/Lead Role is waiting.
            <br />
            Are you ready?
          </>
        }
        subtitle="Book a free strategy call. We'll assess where you are and create a roadmap to your senior role."
      />
    </>
  );
}
