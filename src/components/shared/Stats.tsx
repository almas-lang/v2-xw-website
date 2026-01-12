import { ReactNode } from 'react';

interface Stat {
  value: string;
  suffix: string;
  label: string;
  icon?: ReactNode;
}

interface StatsProps {
  stats?: Stat[];
  showWatermark?: boolean;
  maxWidth?: string;
}

const defaultStats: Stat[] = [
  {
    value: '3000',
    suffix: '+',
    label: 'designers consulted',
  },
  {
    value: '140',
    suffix: '+',
    label: 'mentored 1:1',
  },
  {
    value: '80',
    suffix: '%',
    label: 'achieved their goals',
  },
];

export default function Stats({ stats = defaultStats, showWatermark = true, maxWidth = '900px' }: StatsProps) {
  return (
    <section className="bg-carbon py-12 md:py-16 relative overflow-hidden" aria-label="Our impact in numbers">
      {/* X watermark */}
      {showWatermark && (
        <span
          className="absolute top-1/2 right-[-80px] -translate-y-1/2 font-heading font-extrabold text-[300px] md:text-[400px] text-alice/[0.06] pointer-events-none select-none"
          aria-hidden="true"
        >
          X
        </span>
      )}

      <div className="mx-auto px-5 relative z-10" style={{ maxWidth }}>
        <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center min-w-[100px]">
              <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-g500 text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
