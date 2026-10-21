import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

/** Dark-background breadcrumb used across the careers pages. */
export default function Breadcrumb({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav className={`flex items-center flex-wrap gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !last ? (
              <Link href={item.href} className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!last && (
              <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </span>
        );
      })}
    </nav>
  );
}
