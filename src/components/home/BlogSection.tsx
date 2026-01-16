'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getHomepageBlogs, formatDate } from '@/data/blogPosts';

// ============================================
// COMPONENT
// ============================================

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const blogs = getHomepageBlogs();
  const featuredBlog = blogs.find(b => b.featured);
  const otherBlogs = blogs.filter(b => !b.featured);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%)',
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e0e0e0 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-5 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div
            className="mb-10 sm:mb-12 md:mb-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Insights</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-heading text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-carbon leading-tight">
                From Our Blog
              </h2>
              <Link
                href="/resources/blogs"
                className="hidden sm:inline-flex items-center gap-2 font-heading font-semibold text-sm text-carbon hover:text-accent transition-colors"
              >
                See All Wave Blogs
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Blog Grid - Featured + 2 smaller */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8 sm:mb-0">
            {/* Featured Blog - Large Card */}
            {featuredBlog && (
              <Link
                href={`/resources/blogs/${featuredBlog.slug}`}
                className="lg:col-span-7 group block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                }}
              >
                <div className="relative h-full rounded-2xl overflow-hidden bg-carbon border border-g800 sm:hover:border-g700 transition-all duration-500 sm:hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover sm:group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <span className="text-g400 text-xs sm:text-sm">{formatDate(featuredBlog.publishedAt)}</span>
                      <span className="w-1 h-1 bg-g600 rounded-full" />
                      <span className="text-g400 text-xs sm:text-sm">{featuredBlog.readTime}</span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight sm:group-hover:text-accent transition-colors">
                      {featuredBlog.title}
                    </h3>

                    <p className="font-body text-sm sm:text-base text-g400 mb-5 sm:mb-6 line-clamp-2 leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm sm:text-base text-accent sm:group-hover:gap-3 transition-all">
                      Read Article
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Blogs - Stacked */}
            <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
              {otherBlogs.map((blog, index) => (
                <Link
                  key={blog.slug}
                  href={`/resources/blogs/${blog.slug}`}
                  className="group block flex-1"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="relative h-full rounded-xl overflow-hidden bg-white border-2 border-g200 sm:hover:border-accent/40 transition-all duration-300 sm:hover:shadow-lg">
                    <div className="flex flex-col sm:flex-row h-full">
                      {/* Image */}
                      <div className="relative w-full sm:w-40 md:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover sm:group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Read time badge - mobile only */}
                        <div className="absolute bottom-3 right-3 sm:hidden">
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-carbon text-[10px] font-medium rounded">
                            {blog.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center">
                        <div className="hidden sm:flex items-center gap-2 mb-2">
                          <span className="text-g500 text-xs">{formatDate(blog.publishedAt)}</span>
                          <span className="w-1 h-1 bg-g400 rounded-full" />
                          <span className="text-g500 text-xs">{blog.readTime}</span>
                        </div>

                        <h3 className="font-heading text-base sm:text-lg font-bold text-carbon mb-2 leading-snug sm:group-hover:text-accent transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="font-body text-xs sm:text-sm text-g500 mb-3 line-clamp-2 leading-relaxed hidden sm:block">
                          {blog.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-1.5 font-heading font-semibold text-xs sm:text-sm text-accent sm:group-hover:gap-2 transition-all">
                          Read More
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Left accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent/0 sm:group-hover:bg-accent transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div
            className="sm:hidden text-center mt-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
            }}
          >
            <Link
              href="/resources/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-carbon text-white font-heading font-semibold text-sm rounded-lg"
            >
              See All Wave Blogs
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
