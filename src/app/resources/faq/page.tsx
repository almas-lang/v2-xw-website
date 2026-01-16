'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { faqCategories, getTotalFAQCount } from '@/data/allFaqs';
import FAQSection from '@/components/resources/FAQSection';
import CTASection from '@/components/shared/CTASection';
import PageSchema from '@/components/seo/PageSchema';

// Theme colors for filter chips
const chipColors: Record<string, { bg: string; text: string; activeBg: string; activeText: string }> = {
  red: {
    bg: 'rgba(255, 0, 35, 0.08)',
    text: '#FF0023',
    activeBg: '#FF0023',
    activeText: 'white',
  },
  alice: {
    bg: 'rgba(74, 144, 164, 0.1)',
    text: '#4A90A4',
    activeBg: '#4A90A4',
    activeText: 'white',
  },
  teal: {
    bg: 'rgba(74, 144, 164, 0.1)',
    text: '#4A90A4',
    activeBg: '#4A90A4',
    activeText: 'white',
  },
  coral: {
    bg: 'rgba(255, 107, 107, 0.1)',
    text: '#FF6B6B',
    activeBg: '#FF6B6B',
    activeText: 'white',
  },
  gold: {
    bg: 'rgba(245, 158, 11, 0.1)',
    text: '#F59E0B',
    activeBg: '#F59E0B',
    activeText: 'white',
  },
};

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap((category) => category.faqs);

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isVisible, setIsVisible] = useState(false);
  const totalCount = getTotalFAQCount();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const activeCategory = faqCategories.find((cat) => cat.id === activeTab) || faqCategories[0];

  return (
    <>
      <PageSchema
        type="FAQPage"
        pageUrl="/resources/faq"
        pageName="Frequently Asked Questions"
        pageDescription="Find answers to common questions about our UX mentorship programs. Get clarity on program duration, pricing, guarantees, and what to expect from 1:1 mentorship."
        breadcrumbs={[
          { name: 'Resources', url: '/resources' },
          { name: 'FAQ', url: '/resources/faq' },
        ]}
        faqs={allFaqs}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-snow">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[1300px] mx-auto px-5 md:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-24 pb-8 md:pb-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
            aria-label="Breadcrumb"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link href="/" className="text-g500 hover:text-carbon transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-g400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-g500">Resources</span>
            <svg className="w-4 h-4 text-g400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-carbon font-medium">FAQ</span>
          </nav>

          {/* Header */}
          <div
            className="max-w-[900px] mx-auto text-center transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon tracking-tight mb-3">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-base md:text-lg text-g500 max-w-[600px] mx-auto mb-4">
              Find answers to common questions about our mentorship programs
            </p>
            <p className="font-body text-sm text-g400">
              {totalCount} questions across {faqCategories.length} categories
            </p>
          </div>

          {/* Tab Navigation */}
          <div
            className="max-w-[900px] mx-auto flex flex-wrap justify-center gap-2 mt-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '150ms',
            }}
          >
            {faqCategories.map((category) => {
              const colors = chipColors[category.theme];
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: isActive ? colors.activeBg : colors.bg,
                    color: isActive ? colors.activeText : colors.text,
                    border: `1px solid ${isActive ? colors.activeBg : 'transparent'}`,
                  }}
                >
                  {category.title}
                  <span className="ml-1.5 opacity-60">({category.faqs.length})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-6 md:py-8 bg-snow">
        <div className="max-w-[900px] mx-auto px-5">
          <div
            key={activeCategory.id}
            className="transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <FAQSection
              id={activeCategory.id}
              title={activeCategory.title}
              description={activeCategory.description}
              faqs={activeCategory.faqs}
              theme={activeCategory.theme}
              icon={activeCategory.icon}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Still Have Questions?"
        subtitle="Book a free strategy call. We'll assess where you are, understand your goals, and answer any questions you have."
        buttonText="Book a free call"
      />
    </>
  );
}
