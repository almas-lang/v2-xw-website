'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { LinkItem } from '@/types/links';

// --- UTM helper ---
function utm(url: string, campaign: string, content: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=instagram&utm_medium=link_in_bio&utm_campaign=${campaign}&utm_content=${content}`;
}

// --- GA4 event helper ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fireEvent(eventName: string, params: Record<string, string>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('event', eventName, params);
    }
  } catch {
    // analytics failure should never break the page
  }
}

// --- Lead magnet inline email capture ---
function LeadMagnetCapture({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, leadType: 'salary-negotiation-gpt' }),
      });

      if (res.ok) {
        setStatus('success');
        fireEvent('bio_email_captured', { magnet_name: 'river_framework' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-2 p-3 bg-success/10 border border-success/20 rounded-xl text-center">
        <p className="text-success text-sm font-medium">Check your email for the download link!</p>
        <button onClick={onClose} className="text-xs text-g500 mt-1 hover:text-carbon dark:hover:text-g300 transition-colors">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-3 py-2.5 bg-white dark:bg-white/10 border border-g200 dark:border-white/20 rounded-lg text-carbon dark:text-white placeholder:text-g400 text-sm focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? '...' : 'Send'}
      </button>
    </form>
  );
}

// --- Social icon SVGs by platform name ---
function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (n.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (n.includes('youtube')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (n.includes('twitter') || n.includes('x /') || n === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
}

// --- Chevron arrow for cards ---
const ChevronRight = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-g300 flex-shrink-0">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function LinksPageClient() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  useEffect(() => {
    fetch('/api/admin/links')
      .then((res) => res.json())
      .then((data) => {
        setLinks(data.links || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    fireEvent('bio_page_view', {
      referrer: document.referrer,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
    });
  }, []);

  // Group links by type
  const ctaLinks = links.filter((l) => l.style === 'cta-red' || l.style === 'cta-dark');
  const cardLinks = links.filter((l) => l.style === 'card');
  const communityLinks = links.filter((l) => l.style === 'community');
  const socialLinks = links.filter((l) => l.style === 'social');

  function renderLink(link: LinkItem, globalIndex: number) {
    const slug = link.title.toLowerCase().replace(/\s+/g, '_').slice(0, 20);
    const pos = `pos_${globalIndex}`;

    // CTA Red
    if (link.style === 'cta-red') {
      return (
        <a
          key={link.id}
          href={utm(link.url, slug, pos)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => fireEvent('bio_link_click', { link_name: link.title, link_position: pos, link_url: link.url })}
          className="flex items-center gap-3 w-full rounded-xl px-5 py-4 bg-accent hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          style={{ minHeight: '44px' }}
        >
          <div className="flex-1">
            <div className="font-heading text-base font-semibold text-white">
              {link.title}
            </div>
            {link.subtitle && (
              <div className="font-heading text-sm text-white/85 mt-0.5">
                {link.subtitle}
              </div>
            )}
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      );
    }

    // CTA Dark (lead magnet with email capture)
    if (link.style === 'cta-dark') {
      return (
        <div key={link.id}>
          <button
            onClick={() => {
              setShowEmailCapture(!showEmailCapture);
              fireEvent('bio_link_click', { link_name: link.title, link_position: pos, link_url: link.url });
              fireEvent('bio_lead_magnet_open', { magnet_name: slug });
            }}
            className="flex items-center gap-3 w-full rounded-xl px-5 py-4 bg-carbon dark:bg-white text-left transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ minHeight: '44px' }}
          >
            <div className="flex-1">
              <div className="font-heading text-base font-semibold text-white dark:text-carbon">
                {link.title}
              </div>
              {link.subtitle && (
                <div className="font-heading text-sm text-white/85 dark:text-carbon/70 mt-0.5">
                  {link.subtitle}
                </div>
              )}
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 dark:text-carbon/50 flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          {showEmailCapture && (
            <LeadMagnetCapture onClose={() => setShowEmailCapture(false)} />
          )}
        </div>
      );
    }

    // Community (dashed border)
    if (link.style === 'community') {
      return (
        <a
          key={link.id}
          href={utm(link.url, slug, pos)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => fireEvent('bio_link_click', { link_name: link.title, link_position: pos, link_url: link.url })}
          className="flex items-center gap-3 w-full rounded-xl px-4 py-3.5 bg-transparent border border-dashed border-g300 dark:border-[#444] transition-all duration-200 hover:border-g400 dark:hover:border-g500 active:scale-[0.98]"
          style={{ minHeight: '44px' }}
        >
          <span className="text-lg flex-shrink-0">{link.icon}</span>
          <div className="flex-1 min-w-0">
            <span className="font-heading text-[15px] font-medium text-carbon dark:text-white block truncate">
              {link.title}
            </span>
            {link.subtitle && (
              <span className="font-heading text-[13px] text-g500 dark:text-g400">
                {link.subtitle}
              </span>
            )}
          </div>
          {ChevronRight}
        </a>
      );
    }

    // Card (default white card)
    return (
      <a
        key={link.id}
        href={utm(link.url, slug, pos)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => fireEvent('bio_link_click', { link_name: link.title, link_position: pos, link_url: link.url })}
        className="flex items-center gap-3 w-full rounded-xl px-4 py-3.5 bg-white dark:bg-[#242424] border border-[#E5E5E5] dark:border-[#333] transition-all duration-200 hover:shadow-sm hover:border-g300 dark:hover:border-g600 active:scale-[0.98]"
        style={{ minHeight: '44px' }}
      >
        <span className="text-lg flex-shrink-0">{link.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="font-heading text-[15px] font-medium text-carbon dark:text-white block truncate">
            {link.title}
          </span>
          {link.subtitle && (
            <span className="font-heading text-[13px] text-g500 dark:text-g400">
              {link.subtitle}
            </span>
          )}
        </div>
        {ChevronRight}
      </a>
    );
  }

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#1A1A1A] transition-colors">
      <div className="max-w-[400px] mx-auto px-5 pt-6 pb-8">

        {/* ========== PROFILE HEADER ========== */}
        <div className="text-center mb-6">
          <div className="w-[72px] h-[72px] mx-auto mb-3 rounded-full overflow-hidden">
            <Image
              src="/images/xw-logo-insta.png"
              alt="Xperience Wave"
              width={72}
              height={72}
              className="object-cover"
              priority
            />
          </div>

          <h1 className="font-heading text-xl font-bold text-carbon dark:text-white">
            Xperience Wave
          </h1>

          <p className="font-heading text-base font-medium text-carbon dark:text-white mt-1">
            Better designers. Better products.
          </p>
          <p className="font-heading text-[13px] text-g500 dark:text-g400 mt-1.5 leading-relaxed">
            1:1 Mentorship | Design services: Hiring, Design, and Development | Bangalore, India
          </p>
        </div>

        {/* ========== LOADING STATE ========== */}
        {!loaded ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-g200 dark:bg-[#242424] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* ========== SECTION: TAKE ACTION ========== */}
            {ctaLinks.length > 0 && (
              <>
                <div className="mb-2">
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-wider text-g400">
                    Take Action
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {ctaLinks.map((link) => renderLink(link, globalIndex++))}
                </div>
              </>
            )}

            {/* ========== SECTION: EXPLORE ========== */}
            {cardLinks.length > 0 && (
              <>
                <div className="mb-2 mt-5">
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-wider text-g400">
                    Explore
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {cardLinks.map((link) => renderLink(link, globalIndex++))}
                </div>
              </>
            )}

            {/* ========== SECTION: COMMUNITY ========== */}
            {communityLinks.length > 0 && (
              <>
                <div className="mb-2 mt-5">
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-wider text-g400">
                    Community
                  </span>
                </div>
                <div className="space-y-2">
                  {communityLinks.map((link) => renderLink(link, globalIndex++))}
                </div>
              </>
            )}

            {/* ========== SOCIAL ICONS ========== */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={utm(social.url, social.title.toLowerCase().replace(/\s+/g, '_'), 'social')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => fireEvent('bio_social_click', { platform_name: social.title })}
                    className="w-9 h-9 rounded-full bg-g100 dark:bg-[#2A2A2A] border border-g200 dark:border-[#333] flex items-center justify-center text-g500 dark:text-g400 hover:text-carbon dark:hover:text-white hover:border-g400 dark:hover:border-g500 transition-all duration-200"
                    aria-label={social.title}
                  >
                    <SocialIcon name={social.title} />
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        {/* ========== FOOTER ========== */}
        <div className="text-center mt-6">
          <a
            href="https://xperiencewave.com"
            className="font-heading text-[13px] text-g400 hover:text-g600 dark:hover:text-g300 transition-colors"
          >
            xperiencewave.com
          </a>
        </div>
      </div>
    </div>
  );
}
