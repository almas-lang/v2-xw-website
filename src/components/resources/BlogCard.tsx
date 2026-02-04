'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blogPosts';
import { getCategoryColor, getCategoryLabel } from '@/data/blogPosts';

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
      className={`relative overflow-hidden h-full transition-all duration-300 ${
        isUpcoming
          ? 'opacity-75 cursor-default'
          : 'hover:-translate-y-1 hover:shadow-xl'
      }`}
      style={{ borderRadius: '12px' }}
    >
      {/* Background Image */}
      <div className="relative aspect-[4/5] md:aspect-[3/4]">
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
          <div className="absolute inset-0 bg-gradient-to-br from-g200 to-g300" />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Coming Soon Badge */}
        {isUpcoming && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-carbon/90 backdrop-blur-sm rounded-full">
            <span className="text-xs font-medium text-white uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        )}

        {/* Content - Positioned at bottom */}
        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
          {/* Category Tag */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold text-white mb-3 w-fit backdrop-blur-sm"
            style={{
              backgroundColor: isUpcoming ? 'rgba(107, 114, 128, 0.8)' : `${categoryColor}cc`,
              borderRadius: '4px'
            }}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h3 className={`font-heading text-lg md:text-xl font-bold mb-3 line-clamp-3 transition-colors duration-300 ${
            isUpcoming ? 'text-white/70' : 'text-white'
          }`}>
            {post.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-white group-hover:gap-3 transition-all">
              Read
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-white/70">{post.readTime} read</span>
          </div>
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
