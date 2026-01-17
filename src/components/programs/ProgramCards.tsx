import ProgramCard, { ProgramCardProps } from '@/components/ui/ProgramCard';

const programs: Omit<ProgramCardProps, 'animationDelay'>[] = [
  {
    id: 'ripple',
    name: 'RIPPLE',
    title: 'Ripple - Career Transition',
    illustration: 'ripple',
    variant: 'light',
    details: [
      { label: 'For', value: 'Fresh graduates or career switchers from any background' },
      { label: 'Experience', value: '0-2 years' },
      { label: 'Goal', value: 'Land your first UX/UI role' },
      { label: 'Target', value: 'Associate, UX/UI/Product Designer L1-L3' },
      { label: 'Duration', value: '3 months' },
    ],
    href: '/programs/ripple',
  },
  {
    id: 'current',
    name: 'CURRENT',
    title: 'Current - Senior Mentorship',
    illustration: 'current',
    variant: 'dark',
    isPopular: true,
    details: [
      { label: 'For', value: 'Mid-level designers stuck at the same level' },
      { label: 'Experience', value: '2-5 years in UX/UI/Product Design' },
      { label: 'Goal', value: 'Land senior & lead roles or get promoted' },
      { label: 'Target', value: 'Sr. Designer, Lead, Principal, Staff' },
      { label: 'Duration', value: '3 months + 1 month support' },
    ],
    href: '/programs/current',
  },
  {
    id: 'tide',
    name: 'TIDE',
    title: 'Tide - Design Leadership',
    illustration: 'tide',
    variant: 'light',
    details: [
      { label: 'For', value: 'Senior designers ready to lead teams and drive influence' },
      { label: 'Experience', value: '5+ years' },
      { label: 'Goal', value: 'Excel into leadership' },
      { label: 'Target', value: 'Manager, Director, VP, Head of Design' },
      { label: 'Duration', value: '3 months + 3 months support*' },
    ],
    href: '/programs/tide',
  },
];

export default function ProgramCards() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-5">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon tracking-tight">
            Our Programs
          </h2>
        </div>

        {/* Program Cards */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.id}
              {...program}
              animationDelay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
