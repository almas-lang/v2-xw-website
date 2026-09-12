'use client';

import { useState, useEffect, useMemo } from 'react';
import { blogCategories, getFeaturedPost, getPostsByCategory, getPublishedPosts, searchPosts } from '@/data/blogPosts';
import BlogHero from '@/components/resources/BlogHero';
import BlogCard from '@/components/resources/BlogCard';
import BlogFilters from '@/components/resources/BlogFilters';
import BlogSearch from '@/components/resources/BlogSearch';
import CTASection from '@/components/shared/CTASection';

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get featured post
  const featuredPost = getFeaturedPost();

  const isSearching = searchQuery.trim().length > 0;

  // Get filtered posts. The featured post lives in the hero, so it's excluded from
  // the grid unless the user is searching (so it can still be found).
  const filteredPosts = useMemo(() => {
    const posts = searchPosts(getPostsByCategory(activeCategory), searchQuery);
    return isSearching ? posts : posts.filter(post => post.id !== featuredPost?.id);
  }, [activeCategory, searchQuery, isSearching, featuredPost]);

  // Calculate post counts per category (published only, narrowed by search)
  const postCounts = useMemo(() => {
    const published = searchPosts(getPublishedPosts(), searchQuery);
    const counts: Record<string, number> = {};
    blogCategories.forEach(cat => {
      if (cat.id === 'all') {
        counts[cat.id] = published.length;
      } else {
        counts[cat.id] = published.filter(p => p.category === cat.id).length;
      }
    });
    return counts;
  }, [searchQuery]);

  // Reset pagination whenever the category or search query changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisiblePosts(POSTS_PER_PAGE);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisiblePosts(POSTS_PER_PAGE);
  };

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  const loadMore = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  return (
    <>
      {/* Hero with Featured Article */}
      <BlogHero featuredPost={featuredPost} />

      {/* Blog Grid Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-snow">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Search */}
          <div
            className="mb-6 md:mb-8 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '200ms',
            }}
          >
            <BlogSearch
              value={searchQuery}
              onChange={handleSearchChange}
              resultCount={isSearching ? filteredPosts.length : undefined}
            />
          </div>

          {/* Filters */}
          <div
            className="mb-10 md:mb-12 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms',
            }}
          >
            <BlogFilters
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              postCounts={postCounts}
            />
          </div>

          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div
                  className="text-center mt-10 md:mt-14 transition-all duration-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: '500ms',
                  }}
                >
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-white border border-g200 rounded-full font-heading font-semibold text-carbon
                               hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div
              className="text-center py-16 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '400ms',
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-g100 flex items-center justify-center">
                <svg className="w-8 h-8 text-g400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-2">
                {isSearching ? 'No articles found' : 'No articles yet'}
              </h3>
              <p className="font-body text-g500">
                {isSearching
                  ? `Nothing matched "${searchQuery.trim()}"${activeCategory !== 'all' ? ' in this category' : ''}. Try a different keyword.`
                  : 'Check back soon for new content in this category.'}
              </p>
              {isSearching && (
                <button
                  onClick={() => { handleSearchChange(''); setActiveCategory('all'); }}
                  className="mt-6 px-6 py-2.5 bg-white border border-g200 rounded-full font-heading font-semibold text-sm text-carbon
                             hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Want Personalized Career Advice?"
        subtitle="Reading is great, but 1:1 mentorship accelerates your growth. Book a free strategy call to discuss your specific situation."
        buttonText="Book strategy call"
      />
    </>
  );
}
