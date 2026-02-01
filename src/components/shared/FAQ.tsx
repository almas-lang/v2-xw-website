'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export interface FAQItem {
  question: string;
  answer: string;
}

type ThemeType = 'default' | 'coral' | 'teal' | 'gold' | 'indigo';

const themeColors: Record<ThemeType, {
  accent: string;
  accentHover: string;
  accentBg: string;
  accentText: string;
  illustrationFilter: string;
}> = {
  default: {
    accent: '#FF0023',
    accentHover: '#e6001f',
    accentBg: 'bg-accent',
    accentText: 'text-accent',
    illustrationFilter: 'hue-rotate(180deg) saturate(1.8)',
  },
  coral: {
    accent: '#E85A4F',
    accentHover: '#d44a3f',
    accentBg: 'bg-[#E85A4F]',
    accentText: 'text-[#E85A4F]',
    illustrationFilter: 'hue-rotate(185deg) saturate(1.5)',
  },
  teal: {
    accent: '#4A90A4',
    accentHover: '#3a8094',
    accentBg: 'bg-[#4A90A4]',
    accentText: 'text-[#4A90A4]',
    illustrationFilter: 'hue-rotate(0deg) saturate(1.2)',
  },
  gold: {
    accent: '#D4A853',
    accentHover: '#c49843',
    accentBg: 'bg-[#D4A853]',
    accentText: 'text-[#D4A853]',
    illustrationFilter: 'hue-rotate(225deg) saturate(1.6)',
  },
  indigo: {
    accent: '#6366F1',
    accentHover: '#5558e3',
    accentBg: 'bg-[#6366F1]',
    accentText: 'text-[#6366F1]',
    illustrationFilter: 'hue-rotate(200deg) saturate(1.5)',
  },
};

interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  accentHover: string;
  isDark?: boolean;
}

function FAQItemComponent({ faq, isOpen, onToggle, accentColor, accentHover, isDark = false }: FAQItemProps) {
  return (
    <div className={`border-b ${isDark ? 'border-white/10' : 'border-g200'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <h3
          className={`font-heading text-lg md:text-xl font-semibold pr-4 transition-colors ${isDark ? 'text-white' : 'text-carbon'}`}
          style={{
            color: isOpen ? accentColor : undefined,
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.color = accentHover;
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.color = isDark ? '#ffffff' : '';
          }}
        >
          {faq.question}
        </h3>
        <div
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
          style={{
            backgroundColor: isOpen ? accentColor : isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6',
          }}
        >
          <svg
            className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : isDark ? 'text-g400' : 'text-g500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className={`text-base md:text-lg leading-relaxed pr-12 ${isDark ? 'text-g400' : 'text-g600'}`}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  showSeeAllLink?: boolean;
  seeAllHref?: string;
  theme?: ThemeType;
  mode?: 'light' | 'dark';
  illustration?: string;
}

export default function FAQ({
  title = 'Frequently Asked Questions',
  subtitle,
  faqs,
  showCTA = true,
  ctaText = 'Book strategy call',
  ctaHref = 'https://calendly.com/team-xperiencewave/xw-strategy',
  showSeeAllLink = false,
  seeAllHref = '/resources/faq',
  theme = 'default',
  mode = 'light',
  illustration,
}: FAQProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);
  const colors = themeColors[theme];
  const isDark = mode === 'dark';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 md:py-24 lg:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'
      }`}
    >
      {/* Subtle background pattern */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-100' : 'opacity-[0.02]'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`
              : `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Accent glow for dark mode */}
      {isDark && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${colors.accent}20 0%, transparent 70%)` }}
        />
      )}

      {/* Background Illustration */}
      {illustration && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-[0.08] pointer-events-none">
          <Image
            src={illustration}
            alt=""
            fill
            className="object-contain"
            style={{ filter: colors.illustrationFilter }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-[900px] mx-auto px-5">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className={`font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${isDark ? 'text-white' : 'text-carbon'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg mt-4 ${isDark ? 'text-g400' : 'text-g500'}`}>{subtitle}</p>
          )}
        </div>

        {/* FAQ List */}
        <div className="mb-10">
          {faqs.map((faq, index) => (
            <FAQItemComponent
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              accentColor={colors.accent}
              accentHover={colors.accentHover}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          {showSeeAllLink && (
            <Link
              href={seeAllHref}
              className="inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-colors"
              style={{ color: colors.accent }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accentHover}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.accent}
            >
              See All FAQs
            </Link>
          )}

          {showCTA && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <span className={`text-lg ${isDark ? 'text-g400' : 'text-g600'}`}>Still have questions?</span>
              {isDark ? (
                <Link
                  href={ctaHref}
                  {...(ctaHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex px-6 py-3 font-semibold rounded-lg transition-colors text-white"
                  style={{ backgroundColor: colors.accent }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.accent}
                >
                  {ctaText}
                </Link>
              ) : (
                <Button
                  href={ctaHref}
                  size="md"
                >
                  {ctaText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
