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
  featured?: boolean;
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
    id: '1',
    slug: 'ai-first-design-senior-ux',
    title: 'AI-First Design: What Senior UX Designers Need',
    excerpt: 'Learn how to transform your UX portfolio from a visual showcase into a strategic narrative that lands senior roles.',
    category: 'industry',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-01-15',
    readTime: '6 min',
    featured: true,
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
    title: "Why UX Courses Don't Get You Senior Roles",
    excerpt: "Discover why certificates and courses alone won't land you that senior position, and what actually works.",
    category: 'career-growth',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    author: { name: 'Shaik Murad' },
    publishedAt: '2026-01-10',
    readTime: '6 min',
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

// Get featured post
export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find(post => post.featured);
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

// Get non-featured posts
export const getNonFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => !post.featured);
};

// Get homepage blogs (featured + 2 more)
export const getHomepageBlogs = (): BlogPost[] => {
  const featured = blogPosts.find(post => post.featured);
  const others = blogPosts.filter(post => !post.featured).slice(0, 2);
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
