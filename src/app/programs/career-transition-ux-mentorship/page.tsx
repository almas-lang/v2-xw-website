import type { Metadata } from 'next';
import ProgramHero from '@/components/programs/ProgramHero';
import ProgramStats from '@/components/programs/ProgramStats';
import ProgramFitCheck from '@/components/programs/ProgramFitCheck';
import ProgramOverview from '@/components/programs/ProgramOverview';
import HowItWorks from '@/components/programs/HowItWorks';
import WhatYoullLearn from '@/components/programs/WhatYoullLearn';
import ToolsSection from '@/components/programs/ToolsSection';
import MeetMentors from '@/components/programs/MeetMentors';
import SuccessStories, { QuickWin } from '@/components/shared/SuccessStories';
import MenteesWorkAt from '@/components/shared/MenteesWorkAt';
import WhyMentorship from '@/components/programs/WhyMentorship';
import InvestmentSection from '@/components/programs/InvestmentSection';
import FAQ from '@/components/shared/FAQ';
import CTASection from '@/components/shared/CTASection';
import PageSchema from '@/components/seo/PageSchema';
import { sharedProgramSteps, sharedIncludedItems, sharedTools } from '@/data/programData';

// Ripple-specific Quick Wins - Career Transition stories
const rippleQuickWins: QuickWin[] = [
  {
    achievement: 'Developer to Designer at Montran India',
    duration: 'In 4 months',
    name: 'Maitreyee Kane',
    image: '/images/Maitreyee-kane.jpeg',
    linkedin: 'https://www.linkedin.com/in/maitreyeekane/',
  },
  {
    achievement: 'Interior Designer to UX Designer at SenecaGlobal',
    duration: 'In 5 months',
    name: 'Divya Srinivas',
    image: '/images/Divya.jpeg',
    linkedin: 'https://www.linkedin.com/in/divya-srinivas-designs/',
  },
  {
    achievement: 'UI/UX Design Associate at JLL',
    duration: 'In 5 weeks',
    name: 'Akash Kale',
    image: '/images/Akash.jpeg',
    linkedin: 'https://www.linkedin.com/in/akuxdesigner/',
  },
  {
    achievement: 'UX Designer at Deloitte',
    duration: 'In 5 months',
    name: 'Ramesh Vatti',
    image: '/images/Ramesh.jpeg',
    linkedin: 'https://www.linkedin.com/in/ramesh-v-0631a6289/',
  },
];

export const metadata: Metadata = {
  title: 'Ripple - UX Design Career Transition Program | 1:1 Mentorship for Beginners | Xperience Wave',
  description:
    '1:1 UX mentorship for fresh graduates and career switchers. Land your first UX/UI design role in 3 months. AI-first approach. No prior experience needed. Support until you succeed.',
  keywords: [
    'ux mentorship program',
    'career switch to ux design',
    'ux design for beginners',
    'ui ux mentorship',
    'ux designer mentor',
    'learn ux design',
    'ux design career transition',
  ],
  openGraph: {
    title: 'Ripple - UX Design Career Transition Program | 1:1 Mentorship for Beginners',
    description:
      '1:1 UX mentorship for fresh graduates and career switchers. Land your first UX/UI design role in 3 months. AI-first approach.',
    url: 'https://xperiencewave.com/programs/career-transition-ux-mentorship',
    images: [
      {
        url: '/images/og-ripple.jpg',
        width: 1200,
        height: 630,
        alt: 'Ripple Program - UX Career Transition',
      },
    ],
  },
  twitter: {
    title: 'Ripple - UX Design Career Transition Program | 1:1 Mentorship for Beginners',
    description:
      '1:1 UX mentorship for fresh graduates and career switchers. Land your first UX/UI design role in 3 months.',
  },
  alternates: {
    canonical: '/programs/career-transition-ux-mentorship',
  },
};

const rippleFaqs = [
  {
    question: 'How is this different from UX design courses?',
    answer:
      'Courses teach the same content to everyone. Ripple gives you a personalized roadmap, 1:1 mentorship with senior designers, and support until you land your first role - not just a certificate.',
  },
  {
    question: 'How long is the program?',
    answer:
      '3 months of structured mentorship + 1 month conditional support until you land your first role.',
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
      'Stay committed, and we support you until you land your first role. Details discussed during strategy call.',
  },
];

const rippleStats = [
  { value: '83%', label: 'achieved their goals' },
  { value: '38%', label: 'avg salary hike' },
  { value: '8 weeks', label: 'Fastest result' },
];

const rippleFitCheck = {
  forYou: [
    "You're a fresh graduate or career switcher",
    'You come from - marketing, graphic design, sales, tech or something else',
    'You want your first UX/UI/Product Design role',
    "You're willing to put in 5-6 hours/week",
    'You want real mentorship, not courses',
  ],
  notForYou: [
    'You already have 2+ years in UX/UI',
    "You're looking for a quick certificate",
    'You just want to "learn UX" without landing a job',
    "You're not ready to invest in yourself",
    'You expect results without effort',
  ],
};

const rippleOverviewData = {
  subtitle: "This isn't about learning more. It's about becoming employable",
  targetRoles: {
    title: 'Target Roles',
    items: ['Associate', 'UX Designer / UI Designer / Product Designer L1-L3'],
  },
  salaryGoal: {
    title: 'Salary Goal',
    value: 'Up to 10 LPA (from current 0-7 LPA)',
  },
  timeline: {
    title: 'Timeline',
    value: '3 months + Conditional support',
  },
  abilities: [
    'Handle end-to-end design delivery confidently',
    'Build a portfolio that gets callbacks',
    'Crack interviews and negotiate offers',
    'Perform on the job from day one',
    'Think and communicate like a designer',
  ],
};

const rippleLearningModules = [
  {
    title: 'Core Design (STRDV Framework)',
    subtitle: 'The foundations that make you job ready from day one.',
    items: [
      'Ecosystem understanding beyond just screens',
      'Strategic design thinking',
      'Research - Qualitative, quantitative, synthesis',
      'From insights to concepts to high-fidelity',
      'Testing, evaluation, iteration',
    ],
  },
  {
    title: 'Systemic Foundations',
    subtitle: 'Think beyond screens. Understand how design connects to business.',
    items: [
      'Problem architecture',
      'AI tools, GPTs, and Agents',
      'Design processes that companies actually use',
    ],
  },
  {
    title: 'Evident Personal Branding',
    subtitle: "Getting the role isn't just about skills. It's about proof.",
    items: [
      'Portfolio that tells a story, not just shows screens',
      'Resume and LinkedIn that get callbacks',
      'Interview strategy, mock practice, recruiter outreach and pipeline building',
    ],
  },
];

const rippleAiModule = {
  title: 'AI-First Design Approach',
  description: "AI isn't a module - it's embedded throughout. You'll learn to think AI-first, use AI tools effectively, and design for AI products.",
};

const rippleInvestment = {
  pricing: {
    amount: '₹17,512',
    period: 'month',
    equivalent: 'about ₹4,400/week',
    note: 'Final pricing based on your goals and situation. Discussed during strategy call.',
  },
  roi: {
    stat: '38%',
    description: 'Most mentees make back their investment in less than 2 months of their updated salary',
  },
  guarantee: "We're so confident in this program - we support you until you reach your role*",
};

export default function RippleProgramPage() {
  return (
    <>
      <PageSchema
        type="Product"
        pageUrl="/programs/career-transition-ux-mentorship"
        pageName="Ripple - UX Design Career Transition Program"
        pageDescription="1:1 UX mentorship for fresh graduates and career switchers. Land your first UX/UI design role in 3 months."
        breadcrumbs={[
          { name: 'Programs', url: '/programs' },
          { name: 'Career Transition', url: '/programs/career-transition-ux-mentorship' },
        ]}
        faqs={rippleFaqs}
      />
      <ProgramHero
        programName="Ripple"
        tagline="Career Transition"
        problemStatement="You've seen others break into design. You've done free courses, watched YouTube tutorials, maybe even built a portfolio. But you're still not getting callbacks."
        description="Ripple is a 1:1 design mentorship program that builds you from the ground up - skills, mindset, portfolio, and positioning. So when you land the job, you'll perform like you've been doing this for years."
        targetAudience={[
          "You're a fresh graduate looking to start in UX",
          "You want to switch careers into UX design",
          "You have no prior UX experience but want to learn",
          "You need a portfolio and job-ready skills",
        ]}
        duration="3 months + 1 month support"
        accentColor="teal"
        features={['1:1 mentorship with senior design mentor (10+ years experience)', 'AI-first design approach', 'Support until you land your role']}
        breadcrumbLabel="Ripple - Career Transition"
        topBanner="1:1 UX Mentorship for Fresh Graduates & Career Switchers"
        heroImage="/images/ripple-hero.png"
        imageScale={130}
      />
      <ProgramStats stats={rippleStats} accentColor="teal" />
      <ProgramFitCheck
        programName="Ripple UX Mentorship Program"
        forYou={rippleFitCheck.forYou}
        notForYou={rippleFitCheck.notForYou}
        accentColor="teal"
      />
      <ProgramOverview
        title="What You'll Achieve With 1:1 Design Mentorship"
        subtitle={rippleOverviewData.subtitle}
        targetRoles={rippleOverviewData.targetRoles}
        salaryGoal={rippleOverviewData.salaryGoal}
        timeline={rippleOverviewData.timeline}
        abilities={rippleOverviewData.abilities}
        accentColor="teal"
      />
      <HowItWorks
        programName="Ripple"
        subtitle="A structured 3-month program with support until you land your role"
        steps={sharedProgramSteps}
        includedItems={sharedIncludedItems}
        accentColor="teal"
      />
      <WhatYoullLearn
        programName="Ripple"
        subtitle="A curriculum built from 13 years of corporate design experience - not theory from textbooks"
        modules={rippleLearningModules}
        aiModule={rippleAiModule}
        accentColor="teal"
      />
      <ToolsSection tools={sharedTools} />
      <MeetMentors accentColor="teal" />
      <SuccessStories
        title="Real Transformation, Real People"
        subtitle="Hear from designers who made the shift"
        quickWins={rippleQuickWins}
        accentColor="teal"
      />
      <MenteesWorkAt />
      <WhyMentorship
        blogTitle="Why UX Design Courses Don't Get You Good Roles (And What Actually Works)"
        blogSlug="why-courses-dont-get-good-roles"
        blogImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
      />
      <InvestmentSection
        pricing={rippleInvestment.pricing}
        roi={rippleInvestment.roi}
        guarantee={rippleInvestment.guarantee}
        accentColor="teal"
      />
      <FAQ faqs={rippleFaqs} theme="teal" />
      <CTASection
        title={
          <>
            Your Design Role Is Waiting.
            <br />
            Are You Ready?
          </>
        }
        subtitle="Book a free strategy call. We'll assess where you are, understand your goals, and tell you honestly if Ripple is right for you."
      />
    </>
  );
}
