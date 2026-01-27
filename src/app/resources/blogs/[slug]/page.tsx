import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getCategoryLabel, getCategoryColor, formatDate } from '@/data/blogPosts';
import CTASection from '@/components/shared/CTASection';
import MobileTOC from '@/components/blog/MobileTOC';

// Blog content with internal links for SEO
const blogContent: Record<string, React.ReactNode> = {
  'ai-first-design-senior-ux': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        The design industry is undergoing its most significant transformation since the shift from print to digital. AI isn&apos;t just another tool in your toolkit—it&apos;s fundamentally reshaping how we approach design problems, collaborate with stakeholders, and deliver value to organizations.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-8">
        For senior UX designers, this shift presents both a challenge and an unprecedented opportunity. Those who adapt will accelerate their careers; those who don&apos;t risk becoming obsolete. Here&apos;s what you need to know to stay ahead.
      </p>

      <h2 id="ai-first-mindset" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The AI-First Design Mindset
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI-first design isn&apos;t about replacing human creativity—it&apos;s about amplifying it. Senior designers who thrive in this new landscape understand that AI tools like ChatGPT, Claude, and Midjourney are collaborators, not competitors. They use AI to handle repetitive tasks, generate initial concepts, and analyze user research at scale, freeing themselves to focus on strategic thinking and high-impact decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The mindset shift is critical: instead of asking &quot;How do I do this task?&quot; you should ask &quot;What&apos;s the best way to achieve this outcome, and which parts can AI accelerate?&quot; This reframing separates designers who merely use AI tools from those who think AI-first.
      </p>

      <h2 id="core-ai-skills" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Core AI Skills Every Senior Designer Needs
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        To remain competitive in today&apos;s market, senior UX designers must develop proficiency in several key areas:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Prompt Engineering:</strong> The ability to craft precise prompts that generate useful outputs. This is becoming as essential as knowing Figma shortcuts.</li>
        <li><strong>AI-Assisted Research:</strong> Using AI to synthesize user interviews, analyze survey data, and identify patterns across large datasets in minutes rather than days.</li>
        <li><strong>Generative Design Exploration:</strong> Leveraging AI to rapidly explore design directions, generate variations, and break creative blocks.</li>
        <li><strong>AI-Native Prototyping:</strong> Building prototypes that incorporate AI features like personalization, predictive interfaces, and conversational UI.</li>
        <li><strong>Ethical AI Design:</strong> Understanding bias, transparency, and responsible AI principles to design systems that are fair and trustworthy.</li>
      </ul>

      <h2 id="role-changes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How AI Changes the Senior Designer&apos;s Role
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        With AI handling more execution-level work, senior designers are shifting toward higher-value activities. Your role increasingly becomes about:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Strategic Problem Framing:</strong> Defining the right problems to solve—something AI cannot do autonomously.</li>
        <li><strong>Quality Curation:</strong> Evaluating AI outputs, selecting the best directions, and refining them with human judgment.</li>
        <li><strong>Stakeholder Translation:</strong> Bridging the gap between AI capabilities and business needs, explaining what&apos;s possible and what isn&apos;t.</li>
        <li><strong>Design System Governance:</strong> Ensuring AI-generated designs maintain brand consistency and accessibility standards.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This evolution is why <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">senior UX mentorship programs</Link> now emphasize strategic thinking and leadership alongside technical skills.
      </p>

      <h2 id="designing-ai-products" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Designing AI-Powered Products
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Beyond using AI in your workflow, you&apos;ll increasingly design products that incorporate AI features. This requires understanding:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>How to design for uncertainty and probabilistic outputs</li>
        <li>Creating appropriate feedback loops and user control mechanisms</li>
        <li>Balancing automation with human agency</li>
        <li>Communicating AI limitations without eroding user trust</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Companies are actively seeking designers who can navigate these challenges. It&apos;s a key differentiator when competing for senior and lead positions.
      </p>

      <h2 id="ai-first-portfolio" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Building Your AI-First Portfolio
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your portfolio should demonstrate AI fluency in concrete ways:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Include case studies that show AI-assisted research or ideation processes</li>
        <li>Document how you&apos;ve designed AI-powered features with appropriate user controls</li>
        <li>Showcase projects where you balanced AI efficiency with human-centered outcomes</li>
        <li>Demonstrate critical thinking about when AI is and isn&apos;t appropriate</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hiring managers increasingly look for this evidence. A portfolio that shows AI sophistication signals that you&apos;re future-ready.
      </p>

      <h2 id="leadership-advantage" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Leadership Advantage
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For those eyeing <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">design leadership roles</Link>, AI literacy is becoming non-negotiable. Design directors and VPs need to:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Set AI strategy for their design teams</li>
        <li>Evaluate and implement AI tools across workflows</li>
        <li>Navigate the ethical implications of AI-driven design decisions</li>
        <li>Communicate AI&apos;s impact on design capacity and velocity to executives</li>
      </ul>

      <h2 id="taking-action" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Taking Action Today
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who will thrive aren&apos;t waiting for AI to stabilize—they&apos;re experimenting now. Start by integrating AI into one part of your workflow this week. Use it for competitive analysis, user research synthesis, or generating design system documentation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re serious about accelerating your transition to senior roles in this AI-driven landscape, generic courses won&apos;t cut it. You need personalized guidance that accounts for your specific situation, portfolio gaps, and career goals.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        That&apos;s exactly what <Link href="/programs" className="text-accent hover:underline font-medium">our 1:1 mentorship programs</Link> provide—an AI-first curriculum combined with experienced mentors who&apos;ve navigated this transition themselves.
      </p>
    </>
  ),
  'why-courses-dont-get-leadership-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve spent years mastering your craft. You lead projects, mentor juniors, and deliver consistently. Yet the Director and VP roles keep going to others. Here&apos;s the uncomfortable truth about why courses won&apos;t help.
      </p>

      <h2 id="leadership-gap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Leadership Gap Courses Can&apos;t Fill
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At the leadership level, design skills are table stakes. What separates design managers from design executives is an entirely different skillset that no course can teach: executive presence, organizational influence, and the ability to position design as a business driver.
      </p>

      <h2 id="director-requirements" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Director and VP Roles Actually Require
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Companies hiring design leaders look for people who can:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Build and scale high-performing design teams</li>
        <li>Navigate executive politics and influence C-suite decisions</li>
        <li>Translate design impact into business metrics</li>
        <li>Establish design infrastructure and maturity</li>
        <li>Represent design at the leadership table</li>
        <li>Create a vision that aligns design with company strategy</li>
      </ul>

      <h2 id="personal-brand" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Personal Brand Factor
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this level, your reputation precedes you. Executive roles often come through networks, speaking engagements, and industry recognition. Building this presence takes strategic, personalized effort - not generic course content.
      </p>

      <h2 id="why-mentorship" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Mentorship Works for Leadership
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship with someone who has navigated the path to design leadership provides what courses cannot: personalized guidance on your specific situation, organization, and goals. A mentor can help you identify blind spots, build executive presence, and strategically position yourself for the roles you want.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re a senior designer ready to lead at scale, explore our <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">design leadership mentorship program</Link>.
      </p>
    </>
  ),
  'why-courses-dont-get-good-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve watched the YouTube tutorials. Completed Coursera courses. Built portfolio projects. Yet you&apos;re not getting callbacks. Here&apos;s what&apos;s really going on.
      </p>

      <h2 id="course-trap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Course Trap for Career Switchers
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses are designed to teach concepts to thousands of people at once. They don&apos;t know your background, your transferable skills, or what specific gaps are holding you back. For career switchers, this generic approach is particularly harmful because you need guidance on positioning your unique experience.
      </p>

      <h2 id="hiring-managers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Hiring Managers Actually Look For
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When companies hire junior designers, they&apos;re not just looking for Figma skills. They want to see:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Clear design thinking and problem-solving approach</li>
        <li>Ability to communicate design decisions</li>
        <li>Coachability and willingness to learn</li>
        <li>A portfolio that tells stories, not just shows screens</li>
        <li>Understanding of how design connects to business goals</li>
      </ul>

      <h2 id="experience-asset" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Your Previous Experience is an Asset
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Whether you come from marketing, development, sales, or any other field - your background gives you a unique perspective. The key is learning to position it as a strength, not hiding it.
      </p>

      <h2 id="mentorship-difference" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Mentorship Difference
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship addresses what courses cannot. A mentor who has hired designers can tell you exactly what&apos;s missing from your portfolio, how to position your career switch story, and what specific skills to develop based on the roles you&apos;re targeting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re serious about breaking into UX design, check out our <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">career transition mentorship program</Link>.
      </p>
    </>
  ),
  'why-courses-dont-work': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve done everything right. Enrolled in courses, earned certificates, built projects. Yet the callbacks aren&apos;t coming, and senior roles feel out of reach. Here&apos;s why.
      </p>

      <h2 id="course-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Course Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses teach the same content to thousands of people. They don&apos;t know your gaps, don&apos;t review your actual work, and can&apos;t push you forward based on your specific situation. The result? You have knowledge but not the skills that get you hired.
      </p>

      <h2 id="senior-requirements" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Senior Roles Actually Require
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hiring managers for senior positions look beyond technical skills. They want designers who can:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Drive design decisions using business context</li>
        <li>Communicate impact, not just process</li>
        <li>Own projects end-to-end without hand-holding</li>
        <li>Navigate stakeholder dynamics</li>
        <li>Mentor others and scale design quality</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        No course can teach you this because it requires personalized feedback and real-world application specific to your career situation.
      </p>

      <h2 id="alternative-mentorship" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Alternative: Mentorship
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship addresses what courses cannot. A mentor who has been where you want to go can identify your specific gaps, provide targeted feedback on your actual work, and guide you through the nuances of positioning yourself for senior roles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This isn&apos;t about learning more - it&apos;s about becoming undeniable for the roles you want.
      </p>

      <h2 id="ready-to-break" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Ready to Break Through?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re tired of courses that don&apos;t deliver results, explore our <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">senior UX mentorship program</Link> designed specifically for designers at your stage.
      </p>
    </>
  ),
};

// Table of contents for each blog post
const blogTableOfContents: Record<string, { id: string; title: string }[]> = {
  'ai-first-design-senior-ux': [
    { id: 'ai-first-mindset', title: 'The AI-First Design Mindset' },
    { id: 'core-ai-skills', title: 'Core AI Skills Every Senior Designer Needs' },
    { id: 'role-changes', title: 'How AI Changes the Senior Designer\'s Role' },
    { id: 'designing-ai-products', title: 'Designing AI-Powered Products' },
    { id: 'ai-first-portfolio', title: 'Building Your AI-First Portfolio' },
    { id: 'leadership-advantage', title: 'The Leadership Advantage' },
    { id: 'taking-action', title: 'Taking Action Today' },
  ],
  'why-courses-dont-get-leadership-roles': [
    { id: 'leadership-gap', title: 'The Leadership Gap Courses Can\'t Fill' },
    { id: 'director-requirements', title: 'What Director and VP Roles Actually Require' },
    { id: 'personal-brand', title: 'The Personal Brand Factor' },
    { id: 'why-mentorship', title: 'Why Mentorship Works for Leadership' },
  ],
  'why-courses-dont-get-good-roles': [
    { id: 'course-trap', title: 'The Course Trap for Career Switchers' },
    { id: 'hiring-managers', title: 'What Hiring Managers Actually Look For' },
    { id: 'experience-asset', title: 'Your Previous Experience is an Asset' },
    { id: 'mentorship-difference', title: 'The Mentorship Difference' },
  ],
  'why-courses-dont-work': [
    { id: 'course-problem', title: 'The Course Problem' },
    { id: 'senior-requirements', title: 'What Senior Roles Actually Require' },
    { id: 'alternative-mentorship', title: 'The Alternative: Mentorship' },
    { id: 'ready-to-break', title: 'Ready to Break Through?' },
  ],
};

// Author data
const authorData: Record<string, { role: string; bio: string; image: string }> = {
  'Shaik Murad': {
    role: 'Co-founder, Head of Design',
    bio: '13+ years experience at Credit Saison, Milaap & Yokogawa. Specializes in design leadership & growth-based design.',
    image: '/images/Murad.png',
  },
  'Almas Tasneem': {
    role: 'CEO & Co-founder',
    bio: '12+ years experience at Capgemini, CloudNuro & GE. Specializes in product design & brand strategy.',
    image: '/images/almas.png',
  },
};

// Blog-specific metadata for SEO
const blogMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  'ai-first-design-senior-ux': {
    title: 'AI-First Design: What Senior UX Designers Need to Know in 2026',
    description: 'Learn how AI is transforming UX design and what skills senior designers need to stay competitive. Discover prompt engineering, AI-assisted research, and building an AI-first portfolio.',
    keywords: ['AI UX design', 'senior UX designer skills', 'AI design tools', 'UX career growth', 'AI-first design', 'prompt engineering for designers'],
  },
  'why-courses-dont-get-leadership-roles': {
    title: "Why UX Design Courses Don't Get You Leadership Roles",
    description: 'Discover why courses fail senior designers seeking Director and VP roles. Learn what executive positions actually require and how mentorship fills the gap.',
    keywords: ['UX design leadership', 'design director', 'VP of design', 'design management', 'UX career advancement'],
  },
  'why-courses-dont-get-good-roles': {
    title: "Why UX Design Courses Don't Get You Good Roles (And What Actually Works)",
    description: "You've completed courses but callbacks aren't coming. Learn why generic courses fail career switchers and what actually works to land your first UX role.",
    keywords: ['career switch to UX', 'UX design for beginners', 'break into UX design', 'UX portfolio tips', 'UX job hunting'],
  },
  'why-courses-dont-work': {
    title: "Why UX Courses Don't Get You Senior Roles",
    description: "Certificates aren't getting you promoted. Discover why courses fail mid-level designers and what actually works to land senior UX positions.",
    keywords: ['senior UX designer', 'UX career plateau', 'mid-level designer', 'UX promotion', 'design career growth'],
  },
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return { title: 'Blog Post Not Found' };
  }

  const meta = blogMetadata[slug] || {
    title: post.title,
    description: post.excerpt,
    keywords: [],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [post.image],
    },
    alternates: {
      canonical: `/resources/blogs/${slug}`,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = blogContent[slug];
  const categoryColor = getCategoryColor(post.category);
  const categoryLabel = getCategoryLabel(post.category);
  const tableOfContents = blogTableOfContents[slug] || [];
  const author = authorData[post.author.name] || {
    role: 'UX Mentor',
    bio: 'Design mentor at Xperience Wave.',
    image: '',
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Article structured data for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xperience Wave',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xperiencewave.com/images/xw-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://xperiencewave.com/resources/blogs/${slug}`,
    },
  };

  return (
    <>
      {/* Article Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <header className="bg-snow pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-g500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources/blogs" className="hover:text-accent transition-colors">Blog</Link>
          </nav>

          <div className="max-w-[800px]">
            {/* Category */}
            <span
              className="inline-block px-3 py-1 text-xs font-semibold text-white rounded mb-4"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryLabel}
            </span>

            {/* Title (H1) */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-g600">
              <span className="font-medium text-carbon">{post.author.name}</span>
              <span className="w-1 h-1 rounded-full bg-g300" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="w-1 h-1 rounded-full bg-g300" aria-hidden="true" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-8">
        <div className="flex gap-12">
          {/* Article */}
          <main className="flex-1 max-w-[720px]">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>

            {/* Content */}
            <article className="font-body prose prose-lg max-w-none">
              {content || (
                <p className="text-lg text-g600 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Author */}
              <div className="p-6 bg-snow rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-g200">
                    {author.image ? (
                      <Image src={author.image} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-lg font-bold text-g500">{post.author.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-carbon">{post.author.name}</p>
                    <p className="text-sm text-g500">{author.role}</p>
                  </div>
                </div>
                <p className="text-sm text-g600 mb-4">{author.bio}</p>
                <Link
                  href="/programs"
                  className="block w-full py-2 bg-carbon text-white text-sm font-medium rounded-lg hover:bg-carbon/90 text-center transition-colors"
                >
                  View Programs
                </Link>
              </div>

              {/* TOC */}
              {tableOfContents.length > 0 && (
                <div className="p-6 border border-g200 rounded-xl">
                  <h3 className="font-bold text-carbon mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-g600 hover:text-accent flex items-start gap-2 transition-colors"
                        >
                          <span className="text-g400">{i + 1}.</span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related in Sidebar */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-bold text-carbon mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 2).map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/resources/blogs/${relatedPost.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-20 h-14 relative rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-carbon group-hover:text-accent line-clamp-2 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-g500 mt-1">{relatedPost.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles - Full Width */}
      {relatedPosts.length > 0 && (
        <section className="bg-snow py-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/resources/blogs/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-carbon mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <span className="text-sm text-g500">{relatedPost.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        title="Want Personalized Career Advice?"
        subtitle="Reading is great, but 1:1 mentorship accelerates your growth. Book a free strategy call to discuss your specific situation."
        buttonText="Book strategy call"
      />

      {/* Mobile TOC - Floating Button */}
      <MobileTOC items={tableOfContents} />
    </>
  );
}
