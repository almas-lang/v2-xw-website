'use client';

export function FTHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-4 md:py-5 flex items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
          aria-label="Scroll to top"
        >
          {/* Mobile: XW icon only */}
          <img
            src="/images/logos/xw-logo-mobile.svg"
            alt="Xperience Wave"
            className="h-9 md:hidden"
          />
          {/* Desktop: Full XW + Xperience Wave wordmark */}
          <img
            src="/images/logos/xw-logo-light.svg"
            alt="Xperience Wave"
            className="hidden md:block h-9"
          />
        </button>
      </div>
    </header>
  );
}
