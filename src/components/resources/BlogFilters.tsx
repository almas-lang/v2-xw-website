'use client';

import { blogCategories } from '@/data/blogPosts';

interface BlogFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  postCounts?: Record<string, number>;
}

export default function BlogFilters({ activeCategory, onCategoryChange, postCounts }: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {blogCategories.map((category) => {
        const isActive = activeCategory === category.id;
        const count = postCounts?.[category.id] || 0;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: isActive ? category.color : 'transparent',
              color: isActive ? 'white' : '#71717A',
              border: isActive ? `1px solid ${category.color}` : '1px solid #E4E4E7',
            }}
          >
            {category.label}
            {count > 0 && (
              <span className="ml-1.5 opacity-70">({count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
