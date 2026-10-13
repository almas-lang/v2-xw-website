import type { Metadata } from 'next';
import Link from 'next/link';
import CareerConversationCheatsheetGate from '@/components/blog/CareerConversationCheatsheetGate';

export const metadata: Metadata = {
  title: 'Career Conversation Cheatsheet | Xperience Wave',
  description:
    'Free one-page cheatsheet for designers who report to non-design managers. Six moves with the exact sentences, goal translation examples from design language to business language, and a 1:1 agenda template for your next career conversation.',
  keywords: [
    'career conversation cheatsheet',
    'designer career growth',
    'non-design manager',
    'design career conversation',
    'designer performance review',
    'design career roadmap',
    'designer 1:1 template',
    'UX career growth India',
  ],
  alternates: {
    canonical: 'https://xperiencewave.com/resources/tools/career-conversation-cheatsheet',
  },
};

const whatsInside = [
  'All six moves with the exact sentences to say: setting goals in their language, making decision-making visible, bringing an evaluable roadmap, tracking work in their metrics, training without calling it training, and learning their language back',
  'Goal translation examples: design language to business language',
  'A 1:1 agenda template you can bring to your next career conversation',
  'One printable page for before every review cycle',
];

export default function CareerConversationCheatsheetPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-5 md:px-8 max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm text-g400">
          <Link href="/resources" className="hover:text-accent transition-colors">Resources</Link>
          <span className="mx-2">/</span>
          <Link href="/resources/tools" className="hover:text-accent transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-g600">Career Conversation Cheatsheet</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 md:w-8 h-[2px] bg-accent" />
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Free Download</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 md:mb-6">
          Career Conversation Cheatsheet
        </h1>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-4">
          Most designers report to someone who doesn&apos;t come from design. Your manager controls your performance review, your promotion timeline, and your project assignments, and they&apos;re working with an incomplete picture of what you actually do.
        </p>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
          This one-page cheatsheet gives you the six moves that translate your work into the language your manager already operates in. Print it and bring it to your next 1:1.
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
        <CareerConversationCheatsheetGate />

        {/* Context link */}
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mt-8">
          Want the full approach behind this cheatsheet? Read{' '}
          <Link href="/resources/blogs/career-conversation-non-design-manager" className="text-accent hover:underline font-medium">
            How to Have a Career Growth Conversation When Your Manager Doesn&apos;t Understand Design
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
