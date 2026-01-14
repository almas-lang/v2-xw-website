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
  title: 'Tide - Design Leadership Program | 1:1 Mentorship for Senior Designers | Xperience Wave',
  description:
    '1:1 mentorship for senior UX designers (5+ years) ready to lead teams and drive influence. Move into Director, VP, and Head of Design roles. Executive personal branding included.',
  keywords: [
    'design leadership program',
    'senior ux to design lead',
    'head of design mentorship',
    'design director coaching',
    'ux design management',
    'design executive coaching',
    'tide program xperience wave',
  ],
  openGraph: {
    title: 'Tide - Design Leadership Program | 1:1 Mentorship for Senior Designers',
    description:
      '1:1 mentorship for senior UX designers (5+ years) ready to lead teams and drive influence. Move into Director, VP, and Head of Design roles.',
    url: 'https://xperiencewave.com/programs/ux-leadership-mentorship',
    images: [
      {
        url: '/images/og-tide.jpg',
        width: 1200,
        height: 630,
        alt: 'Tide Program - Design Leadership',
      },
    ],
  },
  twitter: {
    title: 'Tide - Design Leadership Program | 1:1 Mentorship for Senior Designers',
    description:
      '1:1 mentorship for senior UX designers (5+ years) ready to lead teams. Move into Director, VP, and Head of Design roles.',
  },
  alternates: {
    canonical: '/programs/ux-leadership-mentorship',
  },
};

const tideFaqs = [
  {
    question: 'How is this different from UX design courses?',
    answer:
      'Courses teach generic content. Tide gives you a personalized roadmap, 1:1 mentorship with design leaders, and 6 months of support until you reach your goal.',
  },
  {
    question: 'How long is the program?',
    answer:
      '3 months of structured mentorship + 3 months conditional support until you reach your goal.',
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
      'Stay committed, and we support you until you reach your goal. Details discussed during strategy call.',
  },
];

const tideStats = [
  { value: '86%', label: 'achieved their goals' },
  { value: '38%', label: 'avg salary hike' },
  { value: '2 months', label: 'Fastest result' },
];

const tideFitCheck = {
  forYou: [
    'You have 5+ years in UX/UI/Product Design',
    "You're a Lead, Principal, Staff, or Manager looking to level up",
    'You want Director, VP, or Head of Design roles',
    "You're ready to lead teams and drive cross-functional decisions",
    'You want executive presence and influence',
  ],
  notForYou: [
    'You have less than 5 years experience',
    "You're still figuring out core design skills",
    "You're looking for a quick certificate",
    "You're not ready to invest in yourself",
    'You expect results without effort',
  ],
};

const tideOverviewData = {
  subtitle: "This isn't about learning more. It's about becoming employable",
  targetRoles: {
    title: 'Target Roles',
    items: ['Design Manager', 'Director', 'VP of Design', 'Head of Design'],
  },
  salaryGoal: {
    title: 'Salary Goal',
    value: 'Above 32 LPA (from 20-35 LPA)',
  },
  timeline: {
    title: 'Timeline',
    value: '3 months + 3 months conditional support*',
  },
  abilities: [
    'Drive cross-functional decisions at the leadership table',
    'Set up and scale design infrastructure',
    'Manage design systems and interface standards',
    'Build, hire, and retain high-performing teams',
    'Communicate with executives and influence strategy',
    'Establish design as a business unit',
  ],
};

const tideLearningModules = [
  {
    title: 'Core Design (STRDV Framework)',
    subtitle: 'Strengthen the foundations - even leaders need sharp fundamentals.',
    items: [
      'Strategic design thinking',
      'Research - Qualitative, quantitative, synthesis',
      'From insights to concepts to high-fidelity',
      'Testing, evaluation, iteration',
    ],
  },
  {
    title: 'SVR Mastery',
    subtitle: 'The skills that separate managers from leaders.',
    items: [
      'System thinking and problem architecture',
      'AI-first design approach',
      'Design processes and trends',
      'Design infrastructure and project management',
      'Design systems and interface guidelines',
      'Design maturity and staff scaling',
      'Ethics, accessibility, sustainability',
      'Stakeholder management',
      'Design as a business unit',
      'Executive communication',
      'Training and feedback management',
      'Design Leadership',
    ],
  },
  {
    title: 'Evident Personal Branding',
    subtitle: 'At this level, your reputation opens doors.',
    items: [
      'Position yourself as a design leader',
      'LinkedIn and Industry presence',
      'Speaking, podcasts, and thought leadership',
      'Executive networking and pipeline',
    ],
  },
];

const tideAiModule = {
  title: 'AI-First Design Approach',
  description: "AI isn't a module - it's embedded throughout. You'll learn to think AI-first, use AI tools effectively, and design for AI products.",
};

const tideIncluded = [
  { text: 'Regular 1:1 online mentorship sessions' },
  { text: 'Offline workshop in Bangalore' },
  { text: 'Expert-led online clinics (Core Design, SVR Mastery, Exec. Personal Branding)' },
  { text: 'Program manager support all week' },
  { text: 'Access to WaveAcademy - videos, activities, tools, and quizzes' },
  { text: 'Exam-based globally recognised certification' },
  { text: 'Podcast feature' },
  { text: '1 WaveMakers Connect hosting opportunity' },
];

const tideInvestment = {
  pricing: {
    amount: '₹29,892',
    period: 'month',
    equivalent: 'about ₹6,678/week',
    note: 'Final pricing based on your goals and situation. Discussed during strategy call.',
  },
  roi: {
    stat: '38%',
    description: 'Most mentees make back their investment in less than a month of their updated salary',
  },
  guarantee: "We're so confident in this program - we support you until you reach your goal*",
};

export default function TideProgramPage() {
  return (
    <>
      <PageSchema
        type="Product"
        pageUrl="/programs/ux-leadership-mentorship"
        pageName="Tide - Design Leadership Program"
        pageDescription="1:1 mentorship for senior UX designers (5+ years) ready to lead teams and drive influence. Move into Director, VP, and Head of Design roles."
        breadcrumbs={[
          { name: 'Programs', url: '/programs' },
          { name: 'Design Leadership', url: '/programs/ux-leadership-mentorship' },
        ]}
        faqs={tideFaqs}
      />
      <ProgramHero
        programName="Tide"
        tagline="Design Leadership"
        problemStatement="You've proven yourself as a designer. You lead projects, maybe even people. But the next step feels blocked - fewer roles, more politics, unclear path."
        description="Tide is a 1:1 design mentorship program that prepares you to lead at scale - not just manage work, but drive decisions, build teams, and own outcomes."
        targetAudience={[
          "You're a senior designer (5+ years) ready to lead",
          "You want to move into Director or Head of Design roles",
          "You want to influence at the executive level",
          "You need to build your executive personal brand",
        ]}
        duration="3 months + 3 months support"
        accentColor="gold"
        features={['1:1 mentorship with senior design mentor (10+ years experience)', 'Executive personal branding included', 'Support for 6 months until you reach your goal']}
        breadcrumbLabel="Tide - Design Leadership"
        topBanner="1:1 UX Mentorship for Senior Designers Ready to Lead"
        heroImage="/images/tide-hero.jpg"
      />
      <ProgramStats stats={tideStats} accentColor="gold" />
      <ProgramFitCheck
        programName="Tide UX Mentorship Program"
        forYou={tideFitCheck.forYou}
        notForYou={tideFitCheck.notForYou}
        accentColor="gold"
      />
      <ProgramOverview
        title="What You'll Achieve With 1:1 Design Mentorship"
        subtitle={tideOverviewData.subtitle}
        targetRoles={tideOverviewData.targetRoles}
        salaryGoal={tideOverviewData.salaryGoal}
        timeline={tideOverviewData.timeline}
        abilities={tideOverviewData.abilities}
        accentColor="gold"
      />
      <HowItWorks
        programName="Tide"
        subtitle="A structured 3-month program with additional 3 months of support until you land your role"
        steps={sharedProgramSteps}
        includedItems={tideIncluded}
        accentColor="gold"
      />
      <WhatYoullLearn
        programName="Tide"
        subtitle="A curriculum built from combined 26 years of corporate design experience - not theory from textbooks"
        modules={tideLearningModules}
        aiModule={tideAiModule}
        accentColor="gold"
      />
      <ToolsSection tools={sharedTools} />
      <MeetMentors />
      <SuccessStories
        title="From Designer to Design Leader"
        subtitle="The journey to leading teams"
      />
      <MenteesWorkAt />
      <WhyMentorship />
      <InvestmentSection
        pricing={tideInvestment.pricing}
        roi={tideInvestment.roi}
        guarantee={tideInvestment.guarantee}
        accentColor="gold"
      />
      <FAQ faqs={tideFaqs} />
      <CTASection
        title={
          <>
            Your Leadership Role Is Waiting.
            <br />
            Are You Ready?
          </>
        }
        subtitle="Book a free strategy call. We'll assess where you are, understand your goals, and tell you honestly if Tide is right for you."
      />
    </>
  );
}
