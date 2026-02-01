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
  theme: 'red' | 'alice' | 'teal' | 'coral' | 'gold' | 'indigo' | 'yellow';
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
// UX CAREER FAQs - Alice Theme
// ============================================

const uxCareerFaqs: FAQItem[] = [
  {
    question: 'How do I transition into UX design?',
    answer:
      'Start by learning UX fundamentals through online courses, build a portfolio with personal or volunteer projects, and network with other designers. Focus on understanding user research, information architecture, and interaction design. Consider mentorship for personalized guidance and faster results.',
  },
  {
    question: 'What salary can I expect as a UX designer in India?',
    answer:
      'It depends on experience and company type:\n\n• Entry (0-2 yrs): ₹4-8 LPA\n• Mid (2-5 yrs): ₹8-18 LPA\n• Senior (5-8 yrs): ₹18-28 LPA\n• Lead/Principal (8+ yrs): ₹28-45+ LPA\n\nProduct companies and funded startups pay higher than agencies. Location matters less now with remote roles.',
  },
  {
    question: 'Do I need a degree to become a UX designer?',
    answer:
      "No. Most hiring managers care about your portfolio, problem-solving ability, and communication skills — not your degree. A design or psychology degree can help, but it's not required. What matters is showing you understand users, can think strategically, and can ship real work. Self-taught designers with strong portfolios regularly get hired over candidates with degrees but weak case studies.",
  },
  {
    question: 'How do I build a portfolio with no experience?',
    answer:
      "Three ways:\n\n1. Redesign existing products — Pick an app you use, identify real problems, and design solutions. Document your thinking.\n\n2. Concept projects — Invent a realistic problem (e.g., \"Help first-time investors track expenses\") and design end-to-end.\n\n3. Volunteer or freelance — NGOs, early-stage startups, and small businesses need design help and won't demand years of experience.\n\nFocus on showing your process, not just pretty screens. Hiring managers want to see how you think.",
  },
  {
    question: "What's the difference between UX and UI design?",
    answer:
      "UX (User Experience) is about how a product works — research, flows, information architecture, and making sure users can achieve their goals without friction.\n\nUI (User Interface) is about how it looks — visual design, typography, colors, spacing, and making sure the interface is clear and aesthetically consistent.\n\nIn practice, most product companies expect designers to do both. The titles often overlap. Focus on being good at solving user problems — the labels matter less.",
  },
  {
    question: 'How long does it take to learn UX design?',
    answer:
      "If you're focused and consistent:\n\n• Basics (tools + methods): 2-3 months\n• Portfolio-ready: 4-6 months\n• Job-ready (with feedback + iteration): 6-9 months\n\nSpeed depends on how much time you invest weekly and whether you get feedback from experienced designers. Courses alone won't get you hired — real projects and mentorship accelerate the process.",
  },
];

// ============================================
// HIRING UX DESIGNERS FAQs - Indigo Theme
// ============================================

const hiringFaqs: FAQItem[] = [
  {
    question: 'What design roles can you help us hire?',
    answer:
      'UX Designers, Product Designers, UI Designers, Visual Designers, UX Researchers, UX Writers, Interaction Designers, Design Leads, Design Managers, and Principal Designers.',
  },
  {
    question: 'Which industries do you work with?',
    answer:
      'SaaS, Fintech, EdTech, HealthTech, E-commerce, and Enterprise Software. We work best with funded tech companies scaling their product teams.',
  },
  {
    question: 'How do you handle timezone differences when hiring remote designers?',
    answer:
      "We filter for timezone overlap before sharing profiles. Our designers are available across India, UAE, Singapore, US, UK, and Australia. You'll only see candidates who can work your hours.",
  },
  {
    question: 'How do you ensure communication quality with remote UX designers?',
    answer:
      "Every designer in our pool completed a 90-day mentorship that includes async communication, stakeholder management, and documentation. They've already worked in distributed teams.",
  },
  {
    question: 'How do you prevent moonlighting when hiring designers from India?',
    answer:
      "We only recommend designers actively seeking full-time roles. No passive candidates. No side-hustlers. We've trained them - we know their availability and commitment.",
  },
  {
    question: 'How quickly can you share UX designer profiles?',
    answer:
      'Within 48-72 hours of understanding your requirements.',
  },
  {
    question: "What if the designer doesn't work out after hiring?",
    answer:
      'If they leave within 30 days, we provide a free replacement.',
  },
  {
    question: 'Who employs the designer after placement?',
    answer:
      'You do. They join your payroll directly - full-time, contract, or project-based. We facilitate the match, not the employment.',
  },
];

// ============================================
// VIVID YELLOW PODCAST FAQs - Yellow Theme
// ============================================

const podcastFaqs: FAQItem[] = [
  {
    question: 'What is Vivid Yellow?',
    answer:
      'A design and product podcast by Xperience Wave. We have conversations with designers, product leaders, founders, and makers about the craft, careers, and what it takes to build real products.',
  },
  {
    question: 'Who should listen?',
    answer:
      "Anyone in design, product, or tech who wants real talk over polished advice. Whether you're a designer, PM, founder, or just curious about how products get built.",
  },
  {
    question: 'How often do new episodes come out?',
    answer:
      'Bi-weekly. Subscribe on Spotify, YouTube, or Apple Podcasts to get notified.',
  },
  {
    question: 'How can I be a guest?',
    answer:
      "We're always looking for people with stories worth hearing. Apply through our guest application form.",
  },
  {
    question: 'Where can I listen?',
    answer:
      'Spotify, Apple Podcasts, YouTube, Google Podcasts—or subscribe to our newsletter for episodes in your inbox.',
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
    id: 'ux-career',
    title: 'UX Career',
    description: 'Salary, skills, portfolios, and career growth',
    theme: 'alice',
    icon: 'career',
    faqs: uxCareerFaqs,
  },
  {
    id: 'programs',
    title: 'Programs Overview',
    description: 'Questions about program structure, duration, and support',
    theme: 'teal',
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
  {
    id: 'hiring',
    title: 'Hiring UX Designers',
    description: 'Questions about hiring trained designers for your team',
    theme: 'indigo',
    icon: 'hiring',
    faqs: hiringFaqs,
  },
  {
    id: 'podcast',
    title: 'Vivid Yellow Podcast',
    description: 'Questions about our design and product podcast',
    theme: 'yellow',
    icon: 'podcast',
    faqs: podcastFaqs,
  },
];

// Helper to get total FAQ count
export const getTotalFAQCount = () => {
  return faqCategories.reduce((total, category) => total + category.faqs.length, 0);
};
