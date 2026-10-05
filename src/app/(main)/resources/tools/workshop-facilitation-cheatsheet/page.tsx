import type { Metadata } from 'next';
import Link from 'next/link';
import WorkshopCheatsheetGate from '@/components/blog/WorkshopCheatsheetGate';

export const metadata: Metadata = {
  title: 'Workshop Facilitation Cheatsheet | Xperience Wave',
  description:
    'Free one-page cheatsheet for facilitating design workshops when everyone in the room knows more than you. The five moves, blocker-handling scripts, the summary template, and the three things you close every workshop with.',
  keywords: [
    'workshop facilitation cheatsheet',
    'design workshop facilitation',
    'workshop facilitation techniques',
    'facilitation scripts designers',
    'design sprint facilitation guide',
    'handling workshop blockers',
    'UX facilitation skills',
    'stakeholder workshop guide',
  ],
  alternates: {
    canonical: 'https://www.xperiencewave.com/resources/tools/workshop-facilitation-cheatsheet',
  },
};

const whatsInside = [
  'The before-workshop prep: who to talk to and the three questions to ask them',
  'The five moves for the room: naming your role, making experts the heroes, redirecting solutions, parking blockers, closing with decisions',
  'Word-for-word blocker-handling scripts for "that\'s not feasible" and beyond',
  'The 24-hour summary template: decisions, owners, parking lot',
  'The three things to document before anyone leaves the room',
];

export default function WorkshopCheatsheetPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-5 md:px-8 max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm text-g400">
          <Link href="/resources" className="hover:text-accent transition-colors">Resources</Link>
          <span className="mx-2">/</span>
          <Link href="/resources/tools" className="hover:text-accent transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-g600">Workshop Facilitation Cheatsheet</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 md:w-8 h-[2px] bg-accent" />
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Free Download</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 md:mb-6">
          Workshop Facilitation Cheatsheet
        </h1>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-4">
          You&apos;re running a design workshop where the developer built the system, the PM owns the roadmap, and the domain expert can spot your bad assumptions before you finish stating them. Your job isn&apos;t to out-know them. It&apos;s to direct the room.
        </p>
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
          This one-page cheatsheet covers before, during, and after the workshop. Print it and keep it on your desk.
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
        <WorkshopCheatsheetGate />

        {/* Context link */}
        <p className="font-body text-base md:text-lg text-g600 leading-relaxed mt-8">
          Want the full approach behind this cheatsheet? Read{' '}
          <Link href="/resources/blogs/facilitate-workshop-everyone-knows-more" className="text-accent hover:underline font-medium">
            How to Facilitate a Design Workshop When Everyone in the Room Knows More Than You
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
