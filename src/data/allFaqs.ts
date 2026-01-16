// ============================================
// CONSOLIDATED FAQ DATA
// All FAQs from across the site, organized by source
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  theme: 'red' | 'alice' | 'teal' | 'coral' | 'gold';
  icon: string; // Icon name for the category
  faqs: FAQItem[];
}

// ============================================
// HOME PAGE FAQs - Red Theme
// ============================================

const homeFaqs: FAQItem[] = [
  {
    question: 'How is this different from UX courses or bootcamps?',
    answer:
      "Courses teach the same curriculum to hundreds of people. We assess YOUR specific gaps and build a curated plan just for you. Plus, you get 1:1 mentorship - not just pre-recorded videos and generic feedback.",
  },
  {
    question: 'How long does the mentorship take?',
    answer:
      'The core program is 90 days. Some mentees land roles in 5 weeks, others take 3 months. It depends on your starting point, target role, and how much effort you put in.',
  },
  {
    question: "Do you guarantee I'll get a job?",
    answer:
      "No one can honestly guarantee jobs - market conditions, individual effort, and timing all play a role. What we guarantee is dedicated mentorship, honest feedback, and a structured path. 80% of our mentees have achieved their career goals.",
  },
  {
    question: "What if I don't achieve my goal in 90 days?",
    answer:
      "We don't abandon you at day 90. We continue working together based on your progress and needs.",
  },
  {
    question: 'How much does it cost?',
    answer:
      "Pricing depends on the program and your goals. Book a strategy call and we'll discuss what makes sense for your situation.",
  },
  {
    question: 'Is this online or offline?',
    answer:
      'Mentorship is fully online - 1:1 video calls, clinics, reviews, and async support. You can be anywhere.',
  },
  {
    question: 'Why should I get this mentorship today, not tomorrow?',
    answer:
      "Your next promotion cycle, your next job opening, your next opportunity - they won't wait. The sooner you fix your gaps, the sooner you're ready when the right role appears.",
  },
];

// ============================================
// PROGRAMS PAGE FAQs - Alice Blue Theme
// ============================================

const programsFaqs: FAQItem[] = [
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
    answer: 'About 5-6 hours per week.',
  },
];

// ============================================
// RIPPLE PROGRAM FAQs - Teal Theme
// ============================================

const rippleFaqs: FAQItem[] = [
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
    answer: 'About 5-6 hours per week.',
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

// ============================================
// CURRENT PROGRAM FAQs - Coral Theme
// ============================================

const currentFaqs: FAQItem[] = [
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
    answer: 'About 5-6 hours per week.',
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

// ============================================
// TIDE PROGRAM FAQs - Gold Theme
// ============================================

const tideFaqs: FAQItem[] = [
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
    answer: 'About 5-6 hours per week.',
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

// ============================================
// CONSOLIDATED CATEGORIES
// ============================================

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Common questions about mentorship and how it works',
    theme: 'red',
    icon: 'home',
    faqs: homeFaqs,
  },
  {
    id: 'programs',
    title: 'Programs Overview',
    description: 'Questions about program structure, duration, and support',
    theme: 'alice',
    icon: 'programs',
    faqs: programsFaqs,
  },
  {
    id: 'ripple',
    title: 'Ripple',
    description: 'Career transition program for beginners',
    theme: 'teal',
    icon: 'ripple',
    faqs: rippleFaqs,
  },
  {
    id: 'current',
    title: 'Current',
    description: 'Senior mentorship for mid-level designers',
    theme: 'coral',
    icon: 'current',
    faqs: currentFaqs,
  },
  {
    id: 'tide',
    title: 'Tide',
    description: 'Leadership program for aspiring design leaders',
    theme: 'gold',
    icon: 'tide',
    faqs: tideFaqs,
  },
];

// Helper to get total FAQ count
export const getTotalFAQCount = () => {
  return faqCategories.reduce((total, category) => total + category.faqs.length, 0);
};
