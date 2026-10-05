import type { Metadata } from 'next';
import Link from 'next/link';
import AgenticUxPrinciplesGate from '@/components/blog/AgenticUxPrinciplesGate';

export const metadata: Metadata = {
  title: 'The 10 Principles of Agentic UX | Xperience Wave',
  description:
    'Free one-page reference for designing AI agents: transparency of reasoning, confidence signaling, the autonomy dial, intent preview, interruptibility, audit trails, handoff design, multi-agent visibility, adaptation visibility, and graceful degradation. Plus the three human involvement levels and when to use each.',
  keywords: [
    'agentic UX principles',
    'AI agent design patterns',
    'agentic AI UX',
    'human in the loop design',
    'autonomy dial UX',
    'AI agent trust design',
    'designing for AI agents',
    'agent handoff design',
  ],
  alternates: {
    canonical: 'https://www.xperiencewave.com/resources/tools/agentic-ux-principles',
  },
};

const whatsInside = [
  'All 10 principles: transparency of reasoning, confidence signaling, the autonomy dial, intent preview, interruptibility, action audit trails, handoff design, multi-agent visibility, adaptation visibility, and graceful degradation',
  'The specific design pattern attached to each principle',
  'The three human involvement levels (in-the-loop, on-the-loop, out-of-the-loop) and when to use each',
  'One printable page you can pull up before any agentic design review',
];

export default function AgenticUxPrinciplesPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-5 md:px-8 max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm text-g400">
          <Link href="/resources" className="hover:text-accent transition-colors">Resources</Link>
          <span className="mx-2">/</span>
          <Link href="/resources/tools" className="hover:text-accent transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-g600">Agentic UX Principles</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 md:w-8 h-[2px] bg-accent" />
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Free Download</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 md:mb-6">
          The 10 Principles of Agentic UX
        </h1>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-4">
          AI agents plan their own steps, make decisions you didn&apos;t approve, and change behaviour over time. Conventional UX practice was built for predictable, human-controlled systems, and it falls short here.
        </p>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
          We distilled the academic and practitioner research into 10 principles with the specific design pattern for each. Print it, pin it to your desk, and pull it up before your next agentic design review.
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
        <AgenticUxPrinciplesGate />

        {/* Context link */}
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mt-8">
          Want the full research behind these principles? Read{' '}
          <Link href="/resources/blogs/agentic-ux-designers-guide" className="text-accent hover:underline font-medium">
            The UX of AI Agents Is Nothing Like What You&apos;ve Been Designing. And That&apos;s the Problem.
          </Link>
        </p>
      </div>
    </main>
  );
}
