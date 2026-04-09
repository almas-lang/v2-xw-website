'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const BASE_COUNT = 1823;
const BASE_DATE = new Date('2026-04-09').getTime();
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function getRatingCount() {
  const weeksElapsed = Math.floor((Date.now() - BASE_DATE) / MS_PER_WEEK);
  return BASE_COUNT + Math.max(0, weeksElapsed) * 5;
}

export function FTHeader() {
  const pathname = usePathname();
  const isLanding = pathname === '/freetraining' || pathname === '/freetraining/';

  // Landing page: star ratings on dark bg
  if (isLanding) {
    return (
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-5 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-body text-sm text-white font-bold">4.8</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-body text-xs text-white/40">{getRatingCount().toLocaleString('en-IN')} ratings</span>
          </div>
        </div>
      </header>
    );
  }

  // Watch / Congratulations pages: XW logo on white bg (same logo as main site)
  return (
    <header className="bg-white border-b border-g200">
      <div className="max-w-4xl mx-auto px-5 py-4 flex justify-center items-center">
        <Link href="/freetraining" aria-label="Go to free training landing page">
          {/* Mobile logo */}
          <Image
            src="/images/logos/xw-logo-mobile.svg"
            alt="Xperience Wave"
            width={32}
            height={32}
            className="h-9 w-auto lg:hidden"
            priority
          />
          {/* Desktop logo */}
          <Image
            src="/images/logos/xw-logo-dark.svg"
            alt="Xperience Wave"
            width={130}
            height={36}
            className="h-8 w-auto hidden lg:block"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
