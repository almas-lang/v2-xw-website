import type { Job } from '@/data/jobs';

function Pin() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function Clock() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function Briefcase() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function Rupee() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 8h12M6 13l8 8M6 13h4a4 4 0 0 0 0-8" />
    </svg>
  );
}

/**
 * Location, type, hours and pay for a role. `tone` picks text colours for a
 * dark or light background.
 */
export default function JobMeta({
  job,
  tone = 'dark',
  showPay = false,
  className = '',
}: {
  job: Job;
  tone?: 'dark' | 'light';
  showPay?: boolean;
  className?: string;
}) {
  const text = tone === 'dark' ? 'text-white/70' : 'text-g600';
  const icon = tone === 'dark' ? 'text-[#D4A853]' : 'text-[#B8860B]';
  const items: { icon: React.ReactNode; label: string }[] = [
    { icon: <Pin />, label: job.location },
    { icon: <Briefcase />, label: job.type },
  ];
  if (job.hours) items.push({ icon: <Clock />, label: job.hours });
  if (showPay && job.pay) items.push({ icon: <Rupee />, label: job.pay });

  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${text} ${className}`}>
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-1.5">
          <span className={icon}>{item.icon}</span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
