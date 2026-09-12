'use client';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

export default function BlogSearch({ value, onChange, resultCount }: BlogSearchProps) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className="max-w-[560px] mx-auto">
      <div className="relative">
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-g400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search articles by topic, title, or keyword..."
          aria-label="Search blog articles"
          autoComplete="off"
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-g200 rounded-full font-body text-sm md:text-base text-carbon
                     placeholder:text-g400 outline-none transition-all duration-300
                     focus:border-accent focus:ring-4 focus:ring-accent-10
                     [&::-webkit-search-cancel-button]:hidden"
        />

        {/* Clear Button */}
        {hasQuery && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center
                       text-g500 hover:text-carbon hover:bg-g100 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count */}
      {hasQuery && typeof resultCount === 'number' && (
        <p className="mt-3 text-center font-body text-sm text-g500" aria-live="polite">
          {resultCount === 0
            ? 'No articles match your search'
            : `${resultCount} article${resultCount === 1 ? '' : 's'} found`}
        </p>
      )}
    </div>
  );
}
