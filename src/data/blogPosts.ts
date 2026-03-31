// ============================================
// BLOG DATA
// ============================================

export type BlogCategory = 'career-growth' | 'design-skills' | 'industry' | 'interviews' | 'resources';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  upcoming?: boolean;
}

export interface CategoryInfo {
  id: string;
  label: string;
  color: string;
}

// Category configuration with colors
export const blogCategories: CategoryInfo[] = [
  { id: 'all', label: 'All', color: '#FF0023' },
  { id: 'career-growth', label: 'Career Growth', color: '#FF0023' },
  { id: 'design-skills', label: 'Design Skills', color: '#4A90A4' },
  { id: 'industry', label: 'Industry', color: '#4A90A4' },
  { id: 'interviews', label: 'Interviews', color: '#FF6B6B' },
  { id: 'resources', label: 'Resources', color: '#F59E0B' },
];

// Get category color
export const getCategoryColor = (category: string): string => {
  const cat = blogCategories.find(c => c.id === category);
  return cat?.color || '#FF0023';
};

// Get category label
export const getCategoryLabel = (category: string): string => {
  const cat = blogCategories.find(c => c.id === category);
  return cat?.label || category;
};

// Sample blog posts with Unsplash images
export const blogPosts: BlogPost[] = [
  {
    id: '35',
    slug: 'hidden-cost-promoting-ic-designer-manager',
    title: 'The Hidden Cost of Promoting Your Best IC Designer to Manager',
    excerpt: 'You did not just get a bad manager. You lost your best designer. That is two losses in one decision. The numbers, the patterns, and what to do instead.',
    category: 'career-growth' as const,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-04-18',
    readTime: '12 min',
  },
  {
    id: '34',
    slug: 'ux-career-ladder-levels-india',
    title: 'Junior to CXO: What Each Level of the UX Career Ladder Actually Demands in India',
    excerpt: 'What does each level of the UX career ladder actually demand in India - not on paper, but in practice? From Associate to CXO, including where Indian designers get stuck at each level.',
    category: 'career-growth' as const,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-31',
    readTime: '12 min',
  },
  {
    id: '33',
    slug: 'inside-look-1-1-ux-mentorship',
    title: 'What Happens in Week 1-12 of a 1:1 UX Mentorship (An Inside Look)',
    excerpt: 'Sheetal became Design Lead in 2 months. Shreekanth landed Wipro in 5 weeks. Kritika landed a Lead role at a German startup in 3 months. This is not what they learned - it is how they were taught.',
    category: 'career-growth' as const,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-04-24',
    readTime: '14 min',
  },
  {
    id: '32',
    slug: 'salary-negotiation-ux-designers-india',
    title: 'Salary Negotiation for UX Designers: Scripts, Data, and What Actually Works in India',
    excerpt: 'Vaibhav was laid off at \u20B917L. One month later: \u20B921L and \u20B924L offers. Same skills. Different negotiation. Verified salary data, the RIVER framework, and word-for-word scripts for UX designers in India.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-04-21',
    readTime: '16 min',
  },
  {
    id: '1',
    slug: 'ai-first-design-senior-ux',
    title: 'AI-First Design: What Senior UX Designers Need',
    excerpt: 'Learn how to transform your UX portfolio from a visual showcase into a strategic narrative that lands senior roles.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-01-15',
    readTime: '6 min',
  },
  {
    id: '2',
    slug: 'designer-to-design-leader',
    title: 'Transitioning from Designer to Design Leader',
    excerpt: 'Moving into design leadership requires more than just great design skills. Learn the mindset shifts needed.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-01-12',
    readTime: '6 min',
    upcoming: true,
  },
  {
    id: '3',
    slug: 'why-courses-dont-work',
    title: "Why UX Design Courses Don't Get You Senior Roles (And What Actually Works)",
    excerpt: "Done with HFI, Designerrs, NextLeap, IIT/NID programs and still stuck? Here's why UX certificates don't land senior roles, and what 140+ designers did differently.",
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-01-10',
    readTime: '7 min',
  },
  {
    id: '12',
    slug: 'why-courses-dont-get-good-roles',
    title: "Why UX Design Courses Don't Get You Good Roles",
    excerpt: "You've completed courses and built projects, but callbacks aren't coming. Here's why courses fail career switchers and what actually works.",
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-01-11',
    readTime: '4 min',
  },
  {
    id: '13',
    slug: 'why-courses-dont-get-leadership-roles',
    title: "Why UX Design Courses Don't Get You Senior & Leadership Roles",
    excerpt: "You've mastered design. But courses won't teach you executive presence, stakeholder management, or how to lead teams. Here's what actually works.",
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-01-13',
    readTime: '4 min',
  },
  {
    id: '24',
    slug: '12l-vs-30l-ux-designer-difference',
    title: 'The Difference Between a \u20B912L and \u20B930L UX Designer (It\u2019s Not Skills)',
    excerpt: 'The gap between a \u20B912L and \u20B930L UX designer in India has nothing to do with skills. Here is what the visibility trap actually is, and what makes a designer legible as valuable.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-19',
    readTime: '8 min',
  },
  {
    id: '27',
    slug: 'conversations-senior-designers-have',
    title: 'The 5 Conversations Senior Designers Have That Mid-Level Designers Don\'t',
    excerpt: 'The gap between mid-level and senior UX designers is not experience or tools. It is five specific conversations, questions senior designers ask before walking into any room. Murad breaks them down.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-28',
    readTime: '9 min',
  },
  {
    id: '26',
    slug: 'what-design-managers-look-for-senior-ux-hiring',
    title: 'What Design Managers Actually Look for When Hiring Senior UX Designers',
    excerpt: 'In a job application, you are the product and the recruiter is the user. Almas breaks down what design managers are actually evaluating at every stage of the senior UX hiring process, and the signals that win and lose candidacies.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-29',
    readTime: '9 min',
  },
  {
    id: '31',
    slug: 'how-to-evaluate-ux-mentorship-program',
    title: 'How to Evaluate a UX Mentorship Program (Before You Waste \u20B950K)',
    excerpt: 'A 100-point framework for evaluating any UX mentorship program before you invest \u20B950K. Six categories, an interactive scoring tool, and the exact questions to ask.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-29',
    readTime: '11 min',
  },
  {
    id: '30',
    slug: 'ic-to-manager-trap-designers',
    title: 'The IC-to-Manager Trap: Why Great Designers Fail as Design Leaders',
    excerpt: '60% of new managers fail within 24 months. 82% were never trained. A designer with 11 years of experience quit in three weeks. Not because he couldn\'t lead - because he was never prepared to. Here is how to prepare before you get the title.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-29',
    readTime: '14 min',
  },
  {
    id: '29',
    slug: 'career-switch-to-ux-india-timeline',
    title: 'The Honest Career Switcher Timeline: From Zero to UX Job Offer in India',
    excerpt: 'Most career switchers land a UX role in 6-9 months with the right structure. Almas gives the honest timeline - the 3+3+3 framework, the shifting skills concept, and the three traps that cost most people months.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-29',
    readTime: '10 min',
  },
  {
    id: '28',
    slug: 'design-thinking-vs-design-strategy',
    title: 'Design Thinking Was Never For Designers. Design Strategy Is.',
    excerpt: 'Design Thinking was built to teach non-designers to think like designers. It was never built to be how designers actually design. Almas explains what Design Thinking actually solved, why the workshop format failed, and what Design Strategy does differently.',
    category: 'design-skills',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-30',
    readTime: '10 min',
  },
  {
    id: '25',
    slug: 'ux-career-ladder-india',
    title: 'The UX Career Ladder Is Broken in India. Here\'s the Path That Actually Works.',
    excerpt: 'The standard UX career ladder was written for the West. Murad breaks down what actually moves designers forward in Indian workplaces, the hierarchy, the politics, and the real career map from 0 to 10+ years.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-30',
    readTime: '10 min',
  },
  {
    id: '23',
    slug: 'ux-designer-product-strategy-table',
    title: 'How to Get a Seat at the Product Strategy Table as a UX Designer',
    excerpt: 'Most UX designers are handed strategy as a brief, not a conversation. Here is what the product strategy table actually is, and the eight specific moves that get you in and keep you there.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-26',
    readTime: '9 min',
  },
  {
    id: '22',
    slug: 'ghosted-after-round-2-ux-interview',
    title: 'Why UX Designers Get Ghosted After Round 2 Interviews',
    excerpt: 'You cleared Round 1. Then nothing. Here are the two specific reasons UX designers get ghosted after Round 2 - the bad salesman problem and the hollow portfolio - and what to do about both.',
    category: 'interviews',
    image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-07',
    readTime: '10 min',
  },
  {
    id: '21',
    slug: 'nda-work-ux-portfolio',
    title: 'Your NDA Isn\'t the Problem. Your Portfolio Strategy Is.',
    excerpt: 'Almost every designer with meaningful experience has NDA constraints. Here are five specific approaches to showing the work - with Krishna\'s story as proof of concept.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-07',
    readTime: '8 min',
  },
  {
    id: '20',
    slug: 'ai-job-designer-type',
    title: 'AI Isn\'t Taking Your Job. But This Type of Designer Will.',
    excerpt: 'AI isn\'t the threat. A specific type of designer is. Here are the three archetypes emerging in the AI era - and which one hiring managers are choosing.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-07',
    readTime: '9 min',
  },
  {
    id: '19',
    slug: 'senior-ux-designer-delivery-person',
    title: 'You\'re a Senior Designer in Title. You\'re Still Being Treated Like a Delivery Person.',
    excerpt: 'You have the title. You still feel like a delivery person. Here\'s why - and the PIE Model: a three-stage approach to moving from execution to influence.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-03-07',
    readTime: '7 min',
  },
  {
    id: '18',
    slug: 'why-no-ux-interview-calls',
    title: 'Why You\'re Not Getting UX Interview Calls (It\'s Not Your Portfolio)',
    excerpt: 'Sending 100 job applications and hearing nothing back? The real problem isn\'t your portfolio - it\'s how you\'re thinking about the entire process. Here\'s what we\'ve learned from 140+ UX mentorships.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-03-03',
    readTime: '7 min',
  },
  {
    id: '17',
    slug: 'mixed-methods-ux-research-guide',
    title: 'Mixed-Methods UX Research: When to Use It, How to Do It, and Why It Doubled Our Revenue',
    excerpt: 'Most designers treat qual and quant as separate tools. Senior designers know how to combine them. Learn the SPEAR framework for mixed-methods research that actually drives business outcomes.',
    category: 'design-skills',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-02-26',
    readTime: '10 min',
  },
  {
    id: '16',
    slug: 'ai-predicts-so-do-you-difference',
    title: 'AI Predicts. So Do You. Here\'s The Difference That Actually Matters.',
    excerpt: 'Both AI and humans are prediction machines. But there\'s one crucial difference - skin in the game. Explore what neuroscience tells us about how we learn vs how machines learn.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-02-23',
    readTime: '7 min',
  },
  {
    id: '15',
    slug: 'business-driven-ux-portfolio',
    title: 'From Pixel-Pusher to Impact-Maker: Your Guide to a Business-Driven UX Portfolio',
    excerpt: 'Your UX portfolio is full of screens and nobody\'s calling back. Here\'s how to rebuild it around business impact, strategic decisions, and the narrative that actually gets you hired.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-02-16',
    readTime: '8 min',
  },
  {
    id: '14',
    slug: 'grow-as-solo-designer',
    title: 'How To Grow When You\'re The Only Designer On The Team',
    excerpt: 'A real story about surviving, building trust, and eventually leading design in environments that didn\'t care about it.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-02-09',
    readTime: '8 min',
  },
  {
    id: '4',
    slug: 'break-into-senior-ux-roles-2026',
    title: 'How to Break Into Senior UX Roles in 2026',
    excerpt: 'The path to senior roles has changed dramatically. Here\'s what hiring managers actually look for and how to position yourself for success in today\'s competitive market.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-01-08',
    readTime: '8 min',
    upcoming: true,
  },
  {
    id: '5',
    slug: 'portfolio-mistakes-designers-make',
    title: '7 Portfolio Mistakes That Cost You the Job',
    excerpt: 'After reviewing 500+ portfolios, these are the patterns I see that immediately disqualify candidates. Avoid these and stand out.',
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-01-05',
    readTime: '6 min',
    upcoming: true,
  },
  {
    id: '6',
    slug: 'design-systems-that-scale',
    title: 'Building Design Systems That Actually Scale',
    excerpt: 'A practical guide to creating design systems that grow with your product and team without becoming a maintenance nightmare.',
    category: 'design-skills',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2026-01-03',
    readTime: '10 min',
    upcoming: true,
  },
  {
    id: '7',
    slug: 'ux-salary-guide-india-2026',
    title: 'UX Salary Guide: India 2026',
    excerpt: 'Comprehensive breakdown of UX salaries across experience levels, cities, and company types. Know your worth before your next negotiation.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2025-12-28',
    readTime: '12 min',
    upcoming: true,
  },
  {
    id: '8',
    slug: 'from-graphic-to-ux-designer',
    title: 'From Graphic Designer to UX Lead: My Journey',
    excerpt: 'How I transitioned from print design to leading a UX team at a Fortune 500 company in just 4 years. The skills that transferred and what I had to unlearn.',
    category: 'interviews',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2025-12-22',
    readTime: '7 min',
    upcoming: true,
  },
  {
    id: '9',
    slug: 'figma-plugins-productivity',
    title: '15 Figma Plugins That 10x Your Productivity',
    excerpt: 'Stop doing repetitive tasks manually. These plugins will save you hours every week and make your design workflow seamless.',
    category: 'resources',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2025-12-18',
    readTime: '5 min',
    upcoming: true,
  },
  {
    id: '10',
    slug: 'ai-changing-ux-design',
    title: 'How AI is Changing UX Design (And What You Should Learn)',
    excerpt: 'AI won\'t replace designers, but designers who use AI will replace those who don\'t. Here\'s how to stay ahead of the curve.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2025-12-15',
    readTime: '9 min',
    upcoming: true,
  },
  {
    id: '11',
    slug: 'user-research-budget',
    title: 'Conducting User Research on a Tight Budget',
    excerpt: 'You don\'t need expensive tools or big budgets to do meaningful research. Here are scrappy techniques that deliver real insights.',
    category: 'design-skills',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    author: { name: 'Almas Tasneem' },
    publishedAt: '2025-12-10',
    readTime: '8 min',
    upcoming: true,
  },
];

// Get published (non-upcoming) posts
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => !post.upcoming);
};

// Get featured post (most recently published)
export const getFeaturedPost = (): BlogPost | undefined => {
  const published = getPublishedPosts();
  return [...published].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  const published = getPublishedPosts();
  const filtered = category === 'all' ? published : published.filter(post => post.category === category);
  return [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Get non-featured posts
export const getNonFeaturedPosts = (): BlogPost[] => {
  const featured = getFeaturedPost();
  return getPublishedPosts()
    .filter(post => post.id !== featured?.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Get homepage blogs (featured + 2 more)
export const getHomepageBlogs = (): BlogPost[] => {
  const featured = getFeaturedPost();
  const others = getPublishedPosts()
    .filter(post => post.id !== featured?.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2);
  return featured ? [featured, ...others] : others;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
