'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getCategoryLabel, getCategoryColor, formatDate } from '@/data/blogPosts';
import CTASection from '@/components/shared/CTASection';

// Blog content placeholder - in production, this would come from a CMS
const blogContent: Record<string, React.ReactNode> = {
  'why-courses-dont-get-leadership-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve spent years mastering your craft. You lead projects, mentor juniors, and deliver consistently. Yet the Director and VP roles keep going to others. Here&apos;s the uncomfortable truth about why courses won&apos;t help.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Leadership Gap Courses Can&apos;t Fill
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At the leadership level, design skills are table stakes. What separates design managers from design executives is an entirely different skillset that no course can teach: executive presence, organizational influence, and the ability to position design as a business driver.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
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

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Personal Brand Factor
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this level, your reputation precedes you. Executive roles often come through networks, speaking engagements, and industry recognition. Building this presence takes strategic, personalized effort - not generic course content.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Mentorship Works for Leadership
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship with someone who has navigated the path to design leadership provides what courses cannot: personalized guidance on your specific situation, organization, and goals. A mentor can help you identify blind spots, build executive presence, and strategically position yourself for the roles you want.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re a senior designer ready to lead at scale, it&apos;s time for a different approach.
      </p>
    </>
  ),
  'why-courses-dont-get-good-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve watched the YouTube tutorials. Completed Coursera courses. Built portfolio projects. Yet you&apos;re not getting callbacks. Here&apos;s what&apos;s really going on.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Course Trap for Career Switchers
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses are designed to teach concepts to thousands of people at once. They don&apos;t know your background, your transferable skills, or what specific gaps are holding you back. For career switchers, this generic approach is particularly harmful because you need guidance on positioning your unique experience.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
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

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Your Previous Experience is an Asset
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Whether you come from marketing, development, sales, or any other field - your background gives you a unique perspective. The key is learning to position it as a strength, not hiding it.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Mentorship Difference
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship addresses what courses cannot. A mentor who has hired designers can tell you exactly what&apos;s missing from your portfolio, how to position your career switch story, and what specific skills to develop based on the roles you&apos;re targeting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re serious about breaking into UX design, it&apos;s time to stop consuming content and start getting personalized guidance.
      </p>
    </>
  ),
  'why-courses-dont-work': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve done everything right. Enrolled in courses, earned certificates, built projects. Yet the callbacks aren&apos;t coming, and senior roles feel out of reach. Here&apos;s why.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Course Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses teach the same content to thousands of people. They don&apos;t know your gaps, don&apos;t review your actual work, and can&apos;t push you forward based on your specific situation. The result? You have knowledge but not the skills that get you hired.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
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

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Alternative: Mentorship
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship addresses what courses cannot. A mentor who has been where you want to go can identify your specific gaps, provide targeted feedback on your actual work, and guide you through the nuances of positioning yourself for senior roles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This isn&apos;t about learning more - it&apos;s about becoming undeniable for the roles you want.
      </p>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Ready to Break Through?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re tired of courses that don&apos;t deliver results, it might be time for a different approach. Our mentorship programs are designed specifically for designers at your stage - whether you&apos;re just starting out, stuck at mid-level, or ready for leadership.
      </p>
    </>
  ),
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = blogContent[slug];
  const categoryColor = getCategoryColor(post.category);
  const categoryLabel = getCategoryLabel(post.category);

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-white">
        <div className="max-w-[800px] mx-auto px-5 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-g500 mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources/blogs" className="hover:text-accent transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-carbon truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold text-white mb-4"
            style={{ backgroundColor: categoryColor, borderRadius: '4px' }}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-g500 mb-8">
            <span className="font-medium text-carbon">{post.author.name}</span>
            <span className="w-1 h-1 rounded-full bg-g300" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="w-1 h-1 rounded-full bg-g300" />
            <span>{post.readTime} read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[700px] mx-auto px-5 md:px-8">
          <article className="font-body">
            {content || (
              <p className="text-lg text-g600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-snow">
          <div className="max-w-[1000px] mx-auto px-5 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/resources/blogs/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-g100 hover:border-g200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
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
    </>
  );
}
