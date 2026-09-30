import type { Metadata } from 'next';
import Link from 'next/link';
import SalaryDataSheetGate from '@/components/blog/SalaryDataSheetGate';

export const metadata: Metadata = {
  title: 'India UX Salary & Hiring Data Sheet (Sep 2026) | Xperience Wave',
  description:
    'Free downloadable data sheet: current UX salary ranges by experience level, city, and sector in India, sector hiring status, AI skill premium data, and interview questions to assess any company\'s design maturity. Updated quarterly.',
  keywords: [
    'UX designer salary India',
    'UX salary data 2026',
    'UX designer salary by city',
    'fintech UX salary',
    'UX hiring trends India',
    'AI skills salary premium',
    'product designer salary India',
    'UX salary negotiation data',
  ],
  alternates: {
    canonical: 'https://www.xperiencewave.com/resources/tools/ux-salary-data',
  },
};

const whatsInside = [
  'Current UX salary ranges by experience level, city, and sector in India',
  'Which sectors are hiring, which are flat, which are contracting',
  'AI skill requirements by role type and seniority',
  'Salary premium data for AI-fluent designers',
  'The research democratisation trend mapped to specific role changes',
  'Questions to ask in your next interview to assess the real state of the design function',
];

export default function UXSalaryDataPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-5 md:px-8 max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm text-g400">
          <Link href="/resources" className="hover:text-accent transition-colors">Resources</Link>
          <span className="mx-2">/</span>
          <Link href="/resources/tools" className="hover:text-accent transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-g600">Salary Data Sheet</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 md:w-8 h-[2px] bg-accent" />
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Free Download</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 md:mb-6">
          India UX Salary &amp; Hiring Data Sheet
        </h1>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-4">
          The Indian UX job market restructured - job postings fell 71% from the 2022 peak while 82% of design leaders say demand for designers grew. Knowing where you stand in that restructuring starts with knowing the actual numbers.
        </p>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
          We compiled the data behind our market analysis - and more we couldn&apos;t fit - into one sheet, built from Recrew, Glassdoor, AmbitionBox, Lightcast, and our own data from 140+ mentored designers. The version you&apos;ll download reflects September 2026 market conditions, and we update it quarterly.
        </p>

        {/* What's inside */}
        <h2 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-4">
          What&apos;s inside
        </h2>
        <ul className="space-y-3 mb-8">
          {whatsInside.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-base md:text-lg text-g600 leading-relaxed">
              <svg className="w-5 h-5 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Email gate */}
        <SalaryDataSheetGate />

        {/* Context link */}
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mt-8">
          Want the full market analysis behind this data? Read{' '}
          <Link href="/resources/blogs/ux-job-market-india-sep-2026" className="text-accent hover:underline font-medium">
            The UX Job Market in India (Sep 2026): What&apos;s Actually Hiring, What&apos;s Shrinking, and What&apos;s Winning
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
