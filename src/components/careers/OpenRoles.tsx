import Link from 'next/link';
import type { Job } from '@/data/jobs';
import JobMeta from './JobMeta';

export const GENERAL_APPLICATION_EMAIL = 'hire@xperiencewave.com';

function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group block bg-white border border-g200 hover:border-[#D4A853] hover:shadow-lg transition-all duration-300 p-6 md:p-8"
      style={{ borderRadius: '16px' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">{job.team}</p>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-2 group-hover:text-[#B8860B] transition-colors">
            {job.title}
          </h3>
          <p className="text-g600 text-sm md:text-base leading-relaxed max-w-2xl mb-4">{job.summary}</p>
          <JobMeta job={job} tone="light" />
        </div>
        <span
          className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 bg-carbon text-white font-heading font-semibold text-sm group-hover:bg-[#D4A853] transition-colors"
          style={{ borderRadius: '10px' }}
        >
          View role
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function OpenRoles({ jobs }: { jobs: Job[] }) {
  return (
    <section id="open-roles" className="bg-g50 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-4">Open roles</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
              {jobs.length === 0
                ? 'Nothing open right now'
                : jobs.length === 1
                  ? 'One role open right now'
                  : `${jobs.length} roles open right now`}
            </h2>
          </div>
          <p className="text-g500 text-sm">Every application is read by a founder.</p>
        </div>

        {jobs.length > 0 && (
          <div className="space-y-4 mb-12">
            {jobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        )}

        <div
          className="bg-[#0A0A0A] text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ borderRadius: '20px' }}
        >
          <div className="max-w-xl">
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-2">
              {jobs.length === 0 ? "Don't see a role? Write to us anyway." : "Can't find a role that fits?"}
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Tell us what you do and why you&apos;d want to do it here. Send a short note and your LinkedIn to{' '}
              <a href={`mailto:${GENERAL_APPLICATION_EMAIL}`} className="text-[#D4A853] underline underline-offset-2 hover:text-white transition-colors">
                {GENERAL_APPLICATION_EMAIL}
              </a>{' '}
              and we&apos;ll look into it.
            </p>
          </div>
          <a
            href={`mailto:${GENERAL_APPLICATION_EMAIL}?subject=General%20application`}
            className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3.5 bg-[#D4A853] hover:bg-[#D4A853]/90 text-white font-heading font-bold text-sm transition-colors"
            style={{ borderRadius: '10px' }}
          >
            Email {GENERAL_APPLICATION_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
