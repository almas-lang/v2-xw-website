'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blogPosts';
import { getCategoryColor, getCategoryLabel, formatDate } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  isVisible?: boolean;
}

export default function BlogCard({ post, index = 0, isVisible = true }: BlogCardProps) {
  const categoryColor = getCategoryColor(post.category);
  const categoryLabel = getCategoryLabel(post.category);
  const isUpcoming = post.upcoming;

  const cardContent = (
    <article
      className={`bg-white border border-g200 overflow-hidden h-full transition-all duration-300 ${
        isUpcoming
          ? 'opacity-75 cursor-default'
          : 'hover:border-accent hover:-translate-y-1 hover:shadow-lg'
      }`}
      style={{ borderRadius: '16px' }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-g100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isUpcoming ? 'grayscale' : 'group-hover:scale-105'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-g100 to-g200">
            <svg className="w-12 h-12 text-g300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Coming Soon Badge */}
        {isUpcoming && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-carbon/90 backdrop-blur-sm rounded-full">
            <span className="text-xs font-medium text-white uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Category Tag */}
        <span
          className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide text-white mb-3"
          style={{ backgroundColor: isUpcoming ? '#6B7280' : categoryColor, borderRadius: '100px' }}
        >
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className={`font-heading text-lg md:text-xl font-bold mb-2 line-clamp-2 transition-colors duration-300 ${
          isUpcoming ? 'text-g500' : 'text-carbon group-hover:text-accent'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-g500 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-g400">
          <span>{isUpcoming ? 'Coming soon' : formatDate(post.publishedAt)}</span>
          <span>{post.readTime} read</span>
        </div>
      </div>
    </article>
  );

  // Render as non-clickable div for upcoming posts
  if (isUpcoming) {
    return (
      <div
        className="block transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/resources/blogs/${post.slug}`}
      className="group block transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {cardContent}
    </Link>
  );
}
