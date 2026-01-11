'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const faqs = [
  {
    question: "How is this different from UX courses or bootcamps?",
    answer: "Courses teach the same curriculum to hundreds of people. We assess YOUR specific gaps and build a curated plan just for you. Plus, you get 1:1 mentorship - not just pre-recorded videos and generic feedback.",
  },
  {
    question: "How long does the mentorship take?",
    answer: "The core program is 90 days. Some mentees land roles in 5 weeks, others take 3 months. It depends on your starting point, target role, and how much effort you put in.",
  },
  {
    question: "Do you guarantee I'll get a job?",
    answer: "No one can honestly guarantee jobs - market conditions, individual effort, and timing all play a role. What we guarantee is dedicated mentorship, honest feedback, and a structured path. 80% of our mentees have achieved their career goals.",
  },
  {
    question: "What if I don't achieve my goal in 90 days?",
    answer: "We don't abandon you at day 90. We continue working together based on your progress and needs.",
  },
  {
    question: "How much does it cost?",
    answer: "Pricing depends on the program and your goals. Book a strategy call and we'll discuss what makes sense for your situation.",
  },
  {
    question: "Is this online or offline?",
    answer: "Mentorship is fully online - 1:1 video calls, clinics, reviews, and async support. You can be anywhere.",
  },
  {
    question: "Why should I get this mentorship today, not tomorrow?",
    answer: "Your next promotion cycle, your next job opening, your next opportunity - they won't wait. The sooner you fix your gaps, the sooner you're ready when the right role appears.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-16 md:py-24"
      style={{
        backgroundColor: '#F9F9F9',
        backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="max-w-[800px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-10 md:mb-12">
          Frequently Asked Questions (FAQs)
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border-2 transition-all duration-300 bg-white ${
                openIndex === index
                  ? 'border-alice'
                  : 'border-transparent hover:border-alice'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-heading text-base md:text-lg font-semibold text-carbon pr-4">
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
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="font-body text-base text-g600">Have more questions?</span>
          <Button href="/book-call" size="sm">
            Book strategy call
          </Button>
          <span className="font-body text-base text-g600">and ask us directly</span>
        </div>
      </div>
    </section>
  );
}
