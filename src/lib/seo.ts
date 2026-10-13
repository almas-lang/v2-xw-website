import type { Metadata } from 'next';

/**
 * Single source of truth for page titles, descriptions and indexing.
 * Source: "SEO fix list - Xperience Wave" workbook, tab "Titles & descriptions"
 * (columns I and K), 13 Oct 2026. Titles <= 60 chars, descriptions <= 155.
 *
 * Every static route under src/app/(main) must call pageMetadata('/its/path').
 * Blog posts use blogSeo[slug] via generateMetadata in the [slug] page.
 */

export const SITE_URL = 'https://xperiencewave.com';
export const SITE_NAME = 'Xperience Wave';

export type SeoEntry = {
  title: string;
  description: string;
  /** robots noindex,follow. Also excluded from the sitemap. */
  noindex?: boolean;
};

export const SEO: Record<string, SeoEntry> = {

  '/': {
    title: 'UX Mentorship for Senior & Lead Designers | Xperience Wave',
    description: '1:1 mentorship for senior and lead UX designers in India. Portfolio, interviews, salary and leadership. 83% of mentees hit their career goal.',
  },
  '/about': {
    title: 'About Xperience Wave | 1:1 UX Mentorship, Bangalore',
    description: 'Founded in 2022 by Shaik Murad and Almas Tasneem. 3,000+ designers trained and mentored. 83% of our 1:1 mentees hit their career goal. Real mentorship.',
  },
  '/community': {
    title: 'Free Design Meetups in Bangalore | WaveMakers Connect',
    description: 'WaveMakers Connect is a free design meetup in Bangalore for designers, engineers and founders. Real speakers, honest talks, no hype. Join 1,370+ members.',
  },
  '/contact': {
    title: 'Contact Us | Xperience Wave',
    description: 'Questions about UX mentorship, corporate training or design services? Get in touch with the Xperience Wave team in Bangalore. We reply within a day.',
  },
  '/for-business/hire-ux-designers': {
    title: 'Hire Trained UX Designers in India | Xperience Wave',
    description: 'Hire job-ready UX designers we trained ourselves. Profiles in 48-72 hours, 60-day replacement guarantee. No moonlighters, no fake case studies.',
  },
  '/for-business/training-for-teams': {
    title: 'UX Training & Workshops for Design Teams | Xperience Wave',
    description: 'Practical UX workshops for design teams: leadership, research, design systems and AI. Half-day or full-day, in person across India or virtual.',
  },
  '/for-business/ux-design-services': {
    title: 'UX Design Services for Product Teams | Xperience Wave',
    description: 'Outcome-driven UX design for product teams. UX audits, product design and ongoing support, without full-time hires. Based in Bangalore.',
  },
  '/freetraining': {
    title: 'Free Training: Go From Mid-Level to Senior UX Designer',
    description: 'Free 20-min training by Shaik Murad: why skilled UX designers stay stuck at mid-level, and how 830+ landed ₹18-28 LPA senior roles in 90 days.',
  },
  '/programs': {
    title: '1:1 UX Design Mentorship Programs in India | Xperience Wave',
    description: '1:1 UX design mentorship in India for every stage: first UX job, mid-level to senior, or senior to design leader. Compare Ripple, Current and Tide.',
  },
  '/programs/career-transition-ux-mentorship': {
    title: 'UX Career Switch Mentorship for Beginners | Xperience Wave',
    description: 'Ripple: 1:1 mentorship for fresh grads and career switchers. Land your first UX/UI role in about 3 months with an AI-first approach. No experience needed.',
  },
  '/programs/senior-ux-designer-mentorship': {
    title: 'Senior UX Designer Mentorship (1:1, India) | Xperience Wave',
    description: 'Current: 1:1 mentorship for mid-level UX designers (2-5 yrs) stuck at the same level. Land senior and lead roles, with support till you get there.',
  },
  '/programs/ux-leadership-mentorship': {
    title: 'Design Leadership Mentorship Program, India | Xperience Wave',
    description: 'Tide: 1:1 mentorship for senior UX designers (5+ yrs) moving into Lead, Director, VP and Head of Design roles. Executive personal branding included.',
  },
  '/resources': {
    title: 'Free UX Templates, Tools & Career Guides | Xperience Wave',
    description: 'Download free UX templates, career guides and AI tools. Built for designers in India who want senior roles. No fluff, just practical resources.',
  },
  '/resources/blogs': {
    title: 'UX Career Blog for Senior Designers | Xperience Wave',
    description: 'Honest writing on UX careers, design leadership and AI for designers in India, from mentors who\'ve worked with 3,000+ designers.',
  },
  '/success-stories': {
    title: 'UX Mentorship Success Stories | Xperience Wave',
    description: 'Real designers, real roles. How Xperience Wave mentees moved from stuck at mid-level into senior, lead and design leadership roles in India and abroad.',
  },
  '/community/apply': {
    title: 'Apply | WaveMakers Connect',
    description: 'Apply to WaveMakers Connect, the free design meetup in Bangalore for designers, engineers and founders.',
    noindex: true,
  },
  '/community/register': {
    title: 'Register | WaveMakers Connect',
    description: 'Register for the next WaveMakers Connect meetup in Bangalore. Free for designers, engineers and founders.',
    noindex: true,
  },
  '/for-business/hire-ux-designers/requirements': {
    title: 'Share Your UX Hiring Requirements | Xperience Wave',
    description: 'Tell us the UX role you\'re hiring for. We\'ll match trained designers in 48-72 hours.',
    noindex: true,
  },
  '/podcast': {
    title: 'Vivid Yellow Podcast | UX & Product Conversations, India',
    description: 'Unfiltered conversations with design leaders in India on UX, product and career growth. New episodes every two weeks on Spotify and YouTube.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Xperience Wave',
    description: 'How Xperience Wave collects, uses and protects your personal data.',
  },
  '/refund-policy': {
    title: 'Refund Policy | Xperience Wave',
    description: 'Refund terms for Xperience Wave mentorship programs and paid services.',
  },
  '/resources/faq': {
    title: 'UX Mentorship FAQs: Fees & Guarantees | Xperience Wave',
    description: 'Straight answers on our 1:1 UX mentorship programs: how long they run, fees, guarantees, and what to expect week to week with your mentor.',
  },
  '/resources/shortcourses': {
    title: 'Free UX Short Courses | Xperience Wave',
    description: 'Free short courses for UX designers in India who want senior roles. Practical, bite-sized lessons on careers, research and AI. No fluff.',
  },
  '/resources/tools': {
    title: 'Free UX Career Tools & Scorecards | Xperience Wave',
    description: 'Free interactive tools for UX designers and design leaders: career scorecards, a mentorship evaluator and team audits. Built for designers in India.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Xperience Wave',
    description: 'Terms that apply when you use the Xperience Wave website and programs.',
  },
};

/** SEO title/description per blog slug. H1 on the page keeps the editorial headline. */
export const blogSeo: Record<string, { title: string; description: string }> = {

  '12l-vs-30l-ux-designer-difference': {
    title: '₹12L vs ₹30L UX Designer: What\'s the Real Difference?',
    description: 'The gap between a ₹12L and ₹30L UX designer in India isn\'t skills. Almas explains the visibility trap and what makes a designer look valuable.',
  },
  '5-things-senior-designers-ai': {
    title: '5 Things Senior Designers Should Do With AI (Not Plugins)',
    description: 'Designers getting ahead with AI in 2026 aren\'t mastering plugins. Five shifts that change how you\'re evaluated, how you lead and what you earn.',
  },
  '7-second-portfolio-test': {
    title: 'The 7-Second UX Portfolio Test Hiring Managers Use',
    description: 'A hiring manager gives your portfolio 7 seconds. The 3 questions they answer, four portfolio archetypes, and a case study structure that works.',
  },
  'ai-as-design-material': {
    title: 'AI as Design Material: What Designers Can Now Build',
    description: 'Ten AI capabilities that make new product experiences designable, and why product AI literacy is the career edge for UX designers this decade.',
  },
  'ai-first-design-senior-ux': {
    title: 'AI-First Design: What Senior UX Designers Need in 2026',
    description: 'How AI is changing UX design and the skills senior designers need now: prompting, AI-assisted research and building an AI-first portfolio.',
  },
  'ai-job-designer-type': {
    title: 'AI Isn\'t Taking Your Job. This Type of Designer Will',
    description: 'AI isn\'t the threat. A specific type of designer is. Murad breaks down the three designer archetypes of the AI era and the one hiring managers pick.',
  },
  'ai-predicts-so-do-you-difference': {
    title: 'AI Predicts. So Do You. The Difference That Matters',
    description: 'Humans and AI are both prediction machines. The gap is skin in the game. What neuroscience says about how we learn versus how machines learn.',
  },
  'ai-replace-designers-wrong-question': {
    title: 'Will AI Replace Designers? Why It\'s the Wrong Question',
    description: 'Designers have split into panic and complacency. Both are wrong. A clear model of what AI can and can\'t do today, applied to your career choices.',
  },
  'ai-will-change-everything-except-what-matters': {
    title: 'AI Will Change Design, Except the Part That Matters',
    description: 'AI makes deliverables faster. It can\'t reach tacit knowledge, stakeholder influence or judgment, the layer where design quality actually lives.',
  },
  'business-driven-ux-portfolio': {
    title: 'Business-Driven UX Portfolio: How to Land Senior Roles',
    description: 'Portfolio full of screens and nobody calling back? Rebuild it around business impact, strategic decisions and a story that gets senior designers hired.',
  },
  'career-switch-to-ux-india-timeline': {
    title: 'Career Switch to UX in India: An Honest Timeline',
    description: 'Most career switchers land a UX role in 6-9 months with structure. Almas shares the 3+3+3 framework and the three traps that cost people months.',
  },
  'conversations-senior-designers-have': {
    title: '5 Conversations Senior Designers Have (Mid-Level Don\'t)',
    description: 'What separates mid-level and senior UX designers? Five conversations seniors have before walking into any room. Murad breaks each one down.',
  },
  'design-leadership-in-turmoil': {
    title: 'Design Leadership Is in Turmoil. No One\'s Talking About It',
    description: 'AI is flattening orgs and budgets are under scrutiny. Design leaders who can\'t show business value are being replaced. What real leadership looks like.',
  },
  'design-team-plateau-10-people': {
    title: 'Why Design Teams Plateau at 10 People (and How to Grow)',
    description: '10 designers, 200 developers, and nobody planned that ratio. Why design teams stall at 10 and the five shifts that get them past it.',
  },
  'design-team-systems-problem': {
    title: 'Your Design Team Has a Systems Problem, Not a Skills One',
    description: 'Capable designers, mediocre output? McKinsey\'s study of 300 companies points at the system, not talent. Five symptoms, five root causes, a free audit.',
  },
  'design-thinking-vs-design-strategy': {
    title: 'Design Thinking vs Design Strategy: What Designers Need',
    description: 'Design Thinking taught non-designers to think like designers. It was never how designers design. Almas on why the workshops failed and what replaces them.',
  },
  'designer-to-product-manager-transition': {
    title: 'Designer to Product Manager: What the Switch Takes',
    description: 'Nearly half the designers we talk to want to move into product. What the switch needs, what guides skip, and how to tell if it\'s right for you.',
  },
  'evaluating-ai-tools-design-leaders-framework': {
    title: 'How Design Leaders Should Evaluate AI Tools: A Framework',
    description: 'Default AI tool criteria miss the key question. A purpose-first framework for design leaders to adopt AI without weakening what the team is good at.',
  },
  'evaluative-vs-exploratory-designer': {
    title: 'Evaluative vs Exploratory Designers: Which One Are You?',
    description: 'One designer ships fast and iterates, the other researches deep and builds once. Where each fails, how AI widens the gap, and a 10-question self-test.',
  },
  'facilitate-workshop-everyone-knows-more': {
    title: 'How to Run a Design Workshop When Everyone Knows More',
    description: 'Devs built the system, the PM owns the roadmap, and you\'re running the room. The director-not-expert reframe and five moves for leading that workshop.',
  },
  'ghosted-after-round-2-ux-interview': {
    title: 'Why UX Designers Get Ghosted After Round 2',
    description: 'Cleared Round 1, then silence? Almas on the two reasons UX designers get ghosted after Round 2: the bad salesman and the hollow portfolio. And the fix.',
  },
  'grow-as-solo-designer': {
    title: 'How to Grow When You\'re the Only Designer on the Team',
    description: 'A real story of surviving as a solo designer: building trust in hostile teams, finding advocates, and growing into a leader when nobody cares about design.',
  },
  'hidden-cost-promoting-ic-designer-manager': {
    title: 'The Hidden Cost of Promoting Your Best Designer to Manager',
    description: 'You promoted your best designer. Now you\'ve got a struggling manager and a gap where your best IC was. What promoting without prep costs, and what to do.',
  },
  'hiring-senior-designers-immature-design-org': {
    title: 'Hiring Senior Designers Into an Immature Design Org',
    description: 'Hire a senior designer with no design function to lift and both sides lose. What leaders and designers should do before that hire happens.',
  },
  'how-to-evaluate-usability-traditionally-and-using-ai': {
    title: 'Usability Evaluation Methods: Traditional and AI-Based',
    description: 'Evaluate usability with heuristic reviews, cognitive walkthroughs and benchmark tests. Where AI helps, and where it\'s only 50-75% accurate.',
  },
  'how-to-evaluate-ux-mentorship-program': {
    title: 'How to Evaluate a UX Mentorship Program (Before ₹50K)',
    description: 'A 100-point framework to evaluate any UX mentorship program before you invest. Six categories, an interactive scoring tool and the questions to ask.',
  },
  'ic-to-manager-trap-designers': {
    title: 'The IC-to-Manager Trap: Why Great Designers Fail as Leads',
    description: '60% of new managers fail within 24 months and 82% were never trained. How designers can prepare for leadership before they get the title.',
  },
  'inside-look-1-1-ux-mentorship': {
    title: 'Inside a 1:1 UX Mentorship: What Happens in Weeks 1-12',
    description: 'Sheetal became Design Lead in 2 months. Kritika landed a Lead role in 3. A week-by-week look at how 1:1 UX mentorship actually works.',
  },
  'mixed-methods-ux-research-guide': {
    title: 'Mixed-Methods UX Research: Combining Qual and Quant',
    description: 'Senior designers combine qual and quant instead of picking one. A practical guide to mixed-methods UX research using the SPEAR framework.',
  },
  'nda-work-ux-portfolio': {
    title: 'NDA Work in Your UX Portfolio: 5 Strategies That Work',
    description: 'Most experienced designers have NDA limits. Murad walks through five ways to show the work anyway, with Krishna\'s story as proof.',
  },
  'personal-ai-workflow-designer': {
    title: 'How to Build a Personal AI Workflow as a Designer',
    description: 'Using AI the same way for every task? The deliverable-vs-outcome filter shows where AI belongs in your design work and where it doesn\'t.',
  },
  'pm-credit-design-work': {
    title: 'Why PMs Get Credit for Your Design Work (and How to Fix It)',
    description: 'The PM gets tagged in the Slack shout-out. You don\'t. Why it happens, where design leadership dropped the ball, and five shifts that fix it.',
  },
  'salary-negotiation-ux-designers-india': {
    title: 'UX Designer Salary Negotiation in India: Scripts & Data',
    description: 'Laid off at ₹17L, Vaibhav had ₹21L and ₹24L offers a month later. Verified salary data, the RIVER framework and word-for-word scripts.',
  },
  'senior-ux-designer-delivery-person': {
    title: 'Senior UX Designer in Title, Delivery Person in Practice?',
    description: 'Senior title, still treated like a delivery person? Almas explains why and shares the PIE Model for moving from execution to influence.',
  },
  'slicing-psds-to-shipping-code-design-handoffs-evolved': {
    title: 'How Design Handoffs Evolved: From PSDs to Shipping Code',
    description: 'From slicing PSDs to AI-built components via MCP, handoffs changed fast. 92% of designers still want better. The principles that shouldn\'t change.',
  },
  'solved-what-you-were-asked-thats-the-problem': {
    title: 'You Solved What You Were Asked. That\'s the Problem.',
    description: 'Good designers, good work, wrong problem. How to find the real problem under the brief, with a 4-part test for whether it\'s worth solving.',
  },
  'stakeholder-management-for-designers': {
    title: 'Stakeholder Management for UX Designers: Scripts & Tips',
    description: 'Stakeholder skills decide if your design shapes decisions or decorates them. Five real scenarios, scripts, and a rhythm that heads off most conflict.',
  },
  'synthetic-users-future-of-ux-research': {
    title: 'Synthetic Users in UX Research: What They Can\'t Do Yet',
    description: 'Synthetic users give 20-40% of the signal at a fraction of the cost. Where they add value, five things they can\'t do, and how to use them well.',
  },
  'ux-career-ladder-india': {
    title: 'The UX Career Ladder in India Is Broken. What Works',
    description: 'The standard UX career ladder was written for the West. Murad on what actually moves designers forward in Indian workplaces, from 0 to 10+ years.',
  },
  'ux-career-ladder-levels-india': {
    title: 'UX Career Levels in India: Junior to CXO, Explained',
    description: 'What each UX career level demands in India, from Associate to CXO. Where designers get stuck at each stage, and the IC vs manager path.',
  },
  'ux-designer-product-strategy-table': {
    title: 'How UX Designers Get a Seat at the Product Strategy Table',
    description: 'Most UX designers get strategy as a brief. Murad explains what the strategy table really is and eight moves that get you in and keep you there.',
  },
  'ux-job-market-changed-strategy-hasnt': {
    title: 'The UX Job Market Changed. Your Job Search Should Too',
    description: '11 things that changed in UX hiring, from portfolio format to AI literacy, and what to do about each. Patterns from 3,000+ designer conversations.',
  },
  'ux-job-market-india-sep-2026': {
    title: 'UX Job Market in India (Sep 2026): What\'s Hiring Now',
    description: 'UX postings are down 71% from 2022 yet 82% of design leaders say demand grew. India salary data by city and sector, and what\'s winning now.',
  },
  'ux-research-never-makes-it-into-roadmap': {
    title: 'Why Your UX Research Never Makes It Into the Roadmap',
    description: 'Research pitched as a design activity gets ignored. Pitch it as a business input. The 5-step Research Integration Blueprint to get it on the roadmap.',
  },
  'visual-graphic-motion-designer-switch-to-ux': {
    title: 'Graphic or Visual Designer to UX: Switch Without Restarting',
    description: 'UI/UX designers earn 30-35% more than graphic designers in India. What transfers, what doesn\'t, the title-only trap, and how to position the move.',
  },
  'what-design-managers-look-for-senior-ux-hiring': {
    title: 'What Design Managers Look for in Senior UX Designers',
    description: 'In a job search, you\'re the product and the recruiter is the user. Almas on what design managers check at each stage of senior UX hiring.',
  },
  'what-should-design-team-look-like-2026': {
    title: 'What Should a Design Team Look Like in 2026?',
    description: 'AI is collapsing the lanes between design roles. A new team structure built on four functions: orchestration, strategy, governance and practice.',
  },
  'which-industry-best-for-designers': {
    title: 'Which Industry Is Best for Designers? Wrong Question',
    description: 'Industry barely predicts design maturity. From 3,000+ designer conversations: what does, how to evaluate any org, and a free interactive scorecard.',
  },
  'why-courses-dont-get-leadership-roles': {
    title: 'Why UX Design Courses Don\'t Get You Leadership Roles',
    description: 'Why courses fail senior designers aiming for Director and VP roles. What executive positions actually require, and how mentorship fills the gap.',
  },
  'why-courses-dont-work': {
    title: 'Why UX Design Courses Don\'t Get You Senior Roles',
    description: 'Done HFI, Designerrs, NextLeap or an IIT/NID course and still stuck? Why certificates don\'t land senior roles, and what 3,000+ designers taught us.',
  },
  'why-no-ux-interview-calls': {
    title: 'Not Getting UX Interview Calls? It\'s Not Your Portfolio',
    description: '100 applications and zero callbacks? The fix starts before your portfolio. What we\'ve learned about the UX job search from 3,000+ designers.',
  },
};

type PageMetadataOptions = {
  /** Absolute or site-relative OG image. Omit when no 1200x630 asset exists. */
  image?: string;
};

/**
 * Build the full Metadata object for a static route. Throws at build time if
 * the path has no SEO entry, so nothing ships with inherited metadata.
 */
export function pageMetadata(path: string, opts: PageMetadataOptions = {}): Metadata {
  const entry = SEO[path];
  if (!entry) {
    throw new Error(`Missing SEO entry for ${path} in src/lib/seo.ts`);
  }
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const images = opts.image ? [{ url: opts.image, width: 1200, height: 630, alt: entry.title }] : undefined;

  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: { canonical: url },
    robots: entry.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: entry.title,
      description: entry.description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: opts.image ? [opts.image] : undefined,
    },
  };
}

/** Indexable static paths, for the sitemap. */
export function indexableStaticPaths(): string[] {
  return Object.entries(SEO)
    .filter(([, e]) => !e.noindex)
    .map(([path]) => path);
}
