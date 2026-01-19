'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blogPosts';
import { getCategoryColor, getCategoryLabel, formatDate } from '@/data/blogPosts';
import Button from '@/components/ui/Button';

interface BlogHeroProps {
  featuredPost?: BlogPost;
}

export default function BlogHero({ featuredPost }: BlogHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categoryColor = featuredPost ? getCategoryColor(featuredPost.category) : '#FF0023';
  const categoryLabel = featuredPost ? getCategoryLabel(featuredPost.category) : '';

  return (
    <section className="relative overflow-hidden">
      {/* Dark Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(160deg,
              #0a0a0a 0%,
              #111111 30%,
              #0d0d0d 60%,
              #0a0a0a 100%
            )
          `,
        }}
      />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,0,35,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(220,238,255,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 pt-24 md:pt-28 pb-12 md:pb-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
          aria-label="Breadcrumb"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/" className="text-g400 hover:text-white underline underline-offset-2 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-g500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <Link href="/resources" className="text-g400 hover:text-white underline underline-offset-2 transition-colors">Resources</Link>
          <svg className="w-4 h-4 text-g500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-white font-medium">Blog</span>
        </nav>

        {/* Header */}
        <div
          className="mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            The Blog
          </h1>
          <p className="font-body text-base md:text-lg text-g400 max-w-[600px]">
            Insights on UX design, career growth, and industry trends from designers who&apos;ve been there
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            <Link
              href={`/resources/blogs/${featuredPost.slug}`}
              className="group block"
            >
              <div
                className="bg-white/[0.03] border border-white/10 overflow-hidden
                           hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                style={{ borderRadius: '20px' }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden bg-g800">
                    {featuredPost.image ? (
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-g700 to-g800">
                        <svg className="w-16 h-16 text-g500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    {/* Featured Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-accent">
                        Featured
                      </span>
                      <span className="w-8 h-px bg-g600" />
                      <span
                        className="px-3 py-1 text-xs font-medium uppercase tracking-wide text-white"
                        style={{ backgroundColor: categoryColor, borderRadius: '100px' }}
                      >
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-alice transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-body text-sm md:text-base text-g400 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-g500 mb-6">
                      <span>{featuredPost.author.name}</span>
                      <span className="w-1 h-1 rounded-full bg-g500" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-g500" />
                      <span>{featuredPost.readTime} read</span>
                    </div>

                    {/* CTA */}
                    <div>
                      <span className="inline-flex items-center gap-2 font-heading font-semibold text-accent group-hover:gap-3 transition-all duration-300">
                        Read Article
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
