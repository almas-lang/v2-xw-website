import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import MentorshipEvaluator from '@/components/blog/MentorshipEvaluator';

export const metadata: Metadata = {
  title: 'UX Mentorship Program Evaluator | Xperience Wave',
  description: 'Score any UX mentorship program across 6 weighted categories. 20 questions. 100 points. An honest framework to evaluate before you invest.',
  robots: { index: true, follow: true },
};

export default function MentorshipEvaluatorPage() {
  return (
    <main className="min-h-screen" style={{ background: '#030303' }}>
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xs">XW</span>
            </div>
            <span className="text-white/60 text-sm font-medium hidden sm:inline">Xperience Wave</span>
          </Link>
          <Link
            href="/resources/tools"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            &larr; All Tools
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-5 pt-12 pb-6 md:pt-16 md:pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-accent">Free Tool</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
          UX Mentorship Program Evaluator
        </h1>
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          Score any program across 6 weighted categories. 20 questions. 100 points.
        </p>
      </div>

      {/* Evaluator */}
      <div className="max-w-3xl mx-auto px-5 pb-10">
        <Suspense fallback={<div className="text-center py-20 text-white/50">Loading evaluator...</div>}>
          <MentorshipEvaluator />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-5 py-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Xperience Wave
          </p>
        </div>
      </div>
    </main>
  );
}
