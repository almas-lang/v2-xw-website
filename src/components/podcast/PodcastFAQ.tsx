'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What is Vivid Yellow?',
    answer: 'A design and product podcast by Xperience Wave. We have conversations with designers, product leaders, founders, and makers about the craft, careers, and what it takes to build real products.',
  },
  {
    question: 'Who should listen?',
    answer: "Anyone in design, product, or tech who wants real talk over polished advice. Whether you're a designer, PM, founder, or just curious about how products get built.",
  },
  {
    question: 'How often do new episodes come out?',
    answer: 'Bi-weekly. Subscribe on Spotify, YouTube, or Apple Podcasts to get notified.',
  },
  {
    question: 'How can I be a guest?',
    answer: "We're always looking for people with stories worth hearing. Apply through our guest application form.",
  },
  {
    question: 'Where can I listen?',
    answer: 'Spotify, Apple Podcasts, YouTube, Google Podcasts—or subscribe to our newsletter for episodes in your inbox.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-g200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <h3
          className="font-heading text-lg md:text-xl font-semibold pr-4 transition-colors"
          style={{
            color: isOpen ? '#EAB308' : '#1A1A1A',
          }}
        >
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-yellow-400 rotate-180' : 'bg-g100'}`}>
          <svg
            className={`w-4 h-4 transition-colors ${isOpen ? 'text-black' : 'text-g500'}`}
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
        <p className="text-g600 text-base md:text-lg leading-relaxed pr-12">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function PodcastFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

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
      className="relative bg-[#f5f5f5] py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <div className="max-w-[900px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-12 md:mb-16 leading-tight">
          Frequently Asked Questions About<br />
          <span className="text-yellow-500">Vivid Yellow</span>
        </h2>

        {/* FAQ List */}
        <div className="mb-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          <Link
            href="/resources/faq"
            className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-medium underline underline-offset-4 transition-colors"
          >
            See All FAQs
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <span className="text-g600 text-lg">Still have questions?</span>
            <a
              href="mailto:hello@xperiencewave.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold rounded-xl transition-all duration-200"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
