'use client';

import { useState } from 'react';
import type { FAQItem } from '@/data/allFaqs';

// ============================================
// THEME CONFIGURATION
// ============================================

type ThemeType = 'red' | 'alice' | 'teal' | 'coral' | 'gold';

const themeConfig: Record<ThemeType, {
  cardBg: string;
  headerBg: string;
  buttonBg: string;
  buttonHover: string;
  border: string;
  text: string;
  primary: string;
}> = {
  red: {
    cardBg: 'rgba(255, 0, 35, 0.04)',
    headerBg: 'rgba(255, 0, 35, 0.08)',
    buttonBg: '#FF0023',
    buttonHover: '#e6001f',
    border: '#FF0023',
    text: '#FF0023',
    primary: '#FF0023',
  },
  alice: {
    cardBg: 'rgba(220, 238, 255, 0.12)',
    headerBg: 'rgba(220, 238, 255, 0.2)',
    buttonBg: '#4A90A4',
    buttonHover: '#3d7a8c',
    border: '#4A90A4',
    text: '#4A90A4',
    primary: '#4A90A4',
  },
  teal: {
    cardBg: 'rgba(74, 144, 164, 0.06)',
    headerBg: 'rgba(74, 144, 164, 0.12)',
    buttonBg: '#4A90A4',
    buttonHover: '#3d7a8c',
    border: '#4A90A4',
    text: '#4A90A4',
    primary: '#4A90A4',
  },
  coral: {
    cardBg: 'rgba(255, 107, 107, 0.06)',
    headerBg: 'rgba(255, 107, 107, 0.12)',
    buttonBg: '#FF6B6B',
    buttonHover: '#e85555',
    border: '#FF6B6B',
    text: '#FF6B6B',
    primary: '#FF6B6B',
  },
  gold: {
    cardBg: 'rgba(245, 158, 11, 0.06)',
    headerBg: 'rgba(245, 158, 11, 0.12)',
    buttonBg: '#F59E0B',
    buttonHover: '#d97706',
    border: '#F59E0B',
    text: '#F59E0B',
    primary: '#F59E0B',
  },
};

// ============================================
// ICONS
// ============================================

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  programs: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ripple: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
    </svg>
  ),
  current: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tide: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12C2 12 5 8 12 8s10 4 10 4-3 4-10 4S2 12 2 12z" />
      <path d="M12 16v4M8 15l-2 3M16 15l2 3" strokeLinecap="round" />
    </svg>
  ),
};

// ============================================
// COMPONENT PROPS
// ============================================

interface FAQSectionProps {
  id: string;
  title: string;
  description: string;
  faqs: FAQItem[];
  theme: ThemeType;
  icon: string;
}

// ============================================
// COMPONENT
// ============================================

export default function FAQSection({ id, title, description, faqs, theme, icon }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const colors = themeConfig[theme];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className="scroll-mt-24">
      <div
        className="rounded-2xl overflow-hidden border border-g200"
        style={{ backgroundColor: colors.cardBg }}
      >
        {/* Section Header */}
        <div
          className="px-6 py-5 sm:px-8 sm:py-6"
          style={{ backgroundColor: colors.headerBg }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              {icons[icon] || icons.programs}
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon">
                {title}
              </h2>
              <p className="font-body text-sm text-g500 mt-0.5">
                {description} <span style={{ color: colors.text }}>({faqs.length} questions)</span>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-g200">
          {faqs.map((faq, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-start justify-between gap-4 text-left transition-colors duration-200 sm:hover:bg-white/50"
                aria-expanded={openIndex === index}
              >
                <span className="font-heading text-base sm:text-lg font-semibold text-carbon pr-4">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: openIndex === index ? colors.buttonBg : 'transparent',
                    border: openIndex === index ? 'none' : `2px solid ${colors.border}`,
                    color: openIndex === index ? 'white' : colors.text,
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="px-6 pb-5 sm:px-8 sm:pb-6">
                  <p className="font-body text-sm sm:text-base text-g600 leading-relaxed pl-0 sm:pl-0">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
