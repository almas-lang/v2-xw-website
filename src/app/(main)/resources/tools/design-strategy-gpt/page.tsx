import type { Metadata } from 'next';
import Link from 'next/link';
import DesignStrategyGptGate from '@/components/blog/DesignStrategyGptGate';

export const metadata: Metadata = {
  title: 'Design Strategy Planning Tool | Xperience Wave',
  description:
    'Free AI-powered tool that walks you through building a design strategy step by step: business context, user understanding, design principles, research planning, success metrics, and governance. With prompts, examples, and customisable templates.',
  keywords: [
    'design strategy tool',
    'design strategy template',
    'UX strategy builder',
    'design strategy GPT',
    'build a design strategy',
    'design strategy framework',
    'UX strategy planning',
    'design strategy components',
  ],
  alternates: {
    canonical: 'https://www.xperiencewave.com/resources/tools/design-strategy-gpt',
  },
};

const whatsInside = [
  'Step-by-step prompts for every section of a design strategy: business context, user understanding, current state, design principles, research plan, implementation plan, success metrics, and governance',
  'Examples from real projects at each step',
  'Templates you can customise to your project type: greenfield, strategic revamp, regulatory, or new product initiative',
  'Research depth guidance proportional to your project\'s risk level',
];

export default function DesignStrategyGptPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-5 md:px-8 max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm text-g400">
          <Link href="/resources" className="hover:text-accent transition-colors">Resources</Link>
          <span className="mx-2">/</span>
          <Link href="/resources/tools" className="hover:text-accent transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-g600">Design Strategy Planning Tool</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 md:w-8 h-[2px] bg-accent" />
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Free Tool</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 md:mb-6">
          Design Strategy Planning Tool
        </h1>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-4">
          Most design teams operate from a backlog of tickets someone else created. A design strategy is the alternative: a plan that connects design decisions to business outcomes, with principles, research, metrics, and governance behind it.
        </p>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
          This AI-powered tool walks you through building one step by step, whether it&apos;s your first strategy or your fiftieth.
        </p>

        {/* What's inside */}
        <h2 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-4">
          What it helps you build
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
        <DesignStrategyGptGate />

        {/* Context link */}
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mt-8">
          Want to understand what goes into a design strategy first? Read{' '}
          <Link href="/resources/blogs/design-strategy-buzzword-until-you-build-one" className="text-accent hover:underline font-medium">
            Design Strategy Sounds Like a Buzzword Until You Actually Build One
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
