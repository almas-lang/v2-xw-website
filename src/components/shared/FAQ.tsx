'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function FAQ({
  title = 'Frequently Asked Questions (FAQs)',
  faqs,
  showCTA = true,
  ctaText = 'Book strategy call',
  ctaHref = '/book-call',
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
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

      <div className="relative max-w-[800px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-10 md:mb-12">
          {title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 transition-all duration-300 bg-white ${
                openIndex === index
                  ? 'border-alice shadow-lg'
                  : 'border-transparent hover:border-alice hover:shadow-lg'
              }`}
              style={{ borderRadius: '6px' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-heading text-lg md:text-xl font-semibold text-carbon pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-alice hover:bg-[#c5ddf5] text-g600 transition-all duration-300 ${
                    openIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
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

        {/* Bottom CTA */}
        {showCTA && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span className="font-body text-base text-g600">Have more questions?</span>
            <Button href={ctaHref} size="sm">
              {ctaText}
            </Button>
            <span className="font-body text-base text-g600">and ask us directly</span>
          </div>
        )}
      </div>
    </section>
  );
}
