'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export function FTHeader() {
  const pathname = usePathname();
  const isLanding = pathname === '/freetraining' || pathname === '/freetraining/';

  // Landing page: no header (hero handles its own top spacing)
  if (isLanding) {
    return null;
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
