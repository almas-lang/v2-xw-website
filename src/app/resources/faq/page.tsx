'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { faqCategories, getTotalFAQCount } from '@/data/allFaqs';
import CTASection from '@/components/shared/CTASection';
import PageSchema from '@/components/seo/PageSchema';

// Theme colors for accents
const themeColors: Record<string, { bg: string; bgLight: string; text: string; border: string }> = {
  red: { bg: 'rgba(255, 0, 35, 0.15)', bgLight: 'rgba(255, 0, 35, 0.08)', text: '#FF0023', border: '#FF0023' },
  alice: { bg: '#DCEEFF', bgLight: 'rgba(220, 238, 255, 0.5)', text: '#4A90A4', border: '#4A90A4' },
  teal: { bg: 'rgba(74, 144, 164, 0.2)', bgLight: 'rgba(74, 144, 164, 0.1)', text: '#4A90A4', border: '#4A90A4' },
  coral: { bg: 'rgba(255, 107, 107, 0.2)', bgLight: 'rgba(255, 107, 107, 0.1)', text: '#FF6B6B', border: '#FF6B6B' },
  gold: { bg: 'rgba(245, 158, 11, 0.2)', bgLight: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', border: '#F59E0B' },
};

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap((category) => category.faqs);

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const totalCount = getTotalFAQCount();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get active category and its theme
  const activeCategory = faqCategories.find((cat) => cat.id === activeTab);
  const activeTheme = activeCategory?.theme || 'alice';
  const colors = themeColors[activeTheme];

  // Get FAQs based on active tab
  const tabFilteredFaqs = activeTab === 'all'
    ? allFaqs
    : activeCategory?.faqs || [];

  // Filter FAQs based on search query
  const displayedFaqs = searchQuery.trim()
    ? tabFilteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tabFilteredFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Reset open index when tab or search changes
  useEffect(() => {
    setOpenIndex(displayedFaqs.length > 0 ? 0 : null);
  }, [activeTab, searchQuery, displayedFaqs.length]);

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

      {/* Main Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#F9F9F9',
          backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Alice blue decorative accents */}
        <div
          className="absolute top-0 right-0 w-[250px] h-[250px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle at 100% 0%, #4A90A4 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[200px] h-[200px] opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle at 0% 100%, #4A90A4 0%, transparent 70%)',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 md:right-20 opacity-[0.08]">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2" style={{ borderColor: '#4A90A4' }} />
        </div>
        <div className="absolute bottom-32 left-8 md:left-16 opacity-[0.06]">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border" style={{ borderColor: '#4A90A4' }} />
        </div>

        {/* Main container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-16 md:pb-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-6 md:mb-6"
            aria-label="Breadcrumb"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link href="/" className="text-g500 hover:text-carbon underline underline-offset-2 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-g400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <Link href="/resources" className="text-g500 hover:text-carbon underline underline-offset-2 transition-colors">
              Resources
            </Link>
            <svg className="w-4 h-4 text-g400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-carbon font-medium">FAQ</span>
          </nav>

          {/* Content */}
          <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div
            className="mb-6 md:mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-carbon mb-3 text-center">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="font-body text-sm md:text-base text-g500 text-center">
              {totalCount} questions across {faqCategories.length} categories
            </p>
          </div>

          {/* Search */}
          <div
            className="mb-6 md:mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-g400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search all questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-g200 bg-white font-body text-carbon placeholder:text-g400 focus:outline-none focus:border-alice focus:ring-2 focus:ring-alice/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-g200 hover:bg-g300 flex items-center justify-center text-g500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-g500">
                {displayedFaqs.length} result{displayedFaqs.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Tab Navigation */}
          <div
            className="flex flex-wrap gap-2 mb-8 md:mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 font-body text-sm font-medium rounded-lg transition-all duration-300"
              style={{
                backgroundColor: activeTab === 'all' ? '#DCEEFF' : 'rgba(220, 238, 255, 0.4)',
                color: activeTab === 'all' ? '#4A90A4' : '#4A90A4',
                border: activeTab === 'all' ? '2px solid #4A90A4' : '2px solid transparent',
              }}
            >
              All ({totalCount})
            </button>
            {faqCategories.map((category) => {
              const catColors = themeColors[category.theme];
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className="px-4 py-2 font-body text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? catColors.bg : catColors.bgLight,
                    color: catColors.text,
                    border: isActive ? `2px solid ${catColors.border}` : '2px solid transparent',
                  }}
                >
                  {category.title} ({category.faqs.length})
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div
            className="space-y-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            {displayedFaqs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-g200">
                <svg className="w-12 h-12 text-g300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <p className="font-heading text-lg font-semibold text-carbon mb-1">No questions found</p>
                <p className="font-body text-sm text-g500">Try a different search term or category</p>
              </div>
            )}
            {displayedFaqs.map((faq, index) => (
              <div
                key={index}
                className="border-2 transition-all duration-300 bg-white"
                style={{
                  borderRadius: '6px',
                  borderColor: openIndex === index ? colors.border : 'transparent',
                  boxShadow: openIndex === index ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                >
                  <span className="font-heading text-lg md:text-xl font-semibold text-carbon pr-4">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-g600 transition-all duration-300"
                    style={{
                      backgroundColor: colors.bg,
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 md:px-6 pb-5 md:pb-6 font-body text-sm md:text-base text-g600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
