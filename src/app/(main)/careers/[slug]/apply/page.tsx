import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJob, getOpenJobs } from '@/data/jobs';
import { SITE_NAME } from '@/lib/seo';
import Breadcrumb from '@/components/careers/Breadcrumb';
import JobMeta from '@/components/careers/JobMeta';
import ApplicationForm from '@/components/careers/ApplicationForm';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getOpenJobs().map((job) => ({ slug: job.slug }));
}

// Form pages are noindex, like the other forms on the site.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  return {
    title: { absolute: job ? `Apply: ${job.title} | ${SITE_NAME}` : 'Role Not Found' },
    description: job?.summary,
    robots: { index: false, follow: job ? true : false },
  };
}

export default async function ApplyPage({ params }: Params) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] min-h-screen">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(212, 168, 83, 0.10) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-20 md:pb-28">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Careers', href: '/careers' },
            { label: job.title, href: `/careers/${job.slug}` },
            { label: 'Apply' },
          ]}
          className="mb-10 animate-hero-fade-in"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4A853] mb-4">Apply</p>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-white leading-[1.1] mb-4">{job.title}</h1>
            <JobMeta job={job} className="mb-6" />
            {job.form.intro && <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">{job.form.intro}</p>}
            <div className="hidden lg:block text-white/70 text-sm leading-relaxed space-y-3">
              <p>Every application is read by a founder. We reply to all of them, usually within five working days.</p>
              <p>
                Trouble with the form? Email{' '}
                <a href="mailto:hire@xperiencewave.com" className="text-[#D4A853] hover:text-white underline underline-offset-2 transition-colors font-medium">
                  hire@xperiencewave.com
                </a>
                .
              </p>
            </div>
          </div>

          <ApplicationForm job={job} />
        </div>
      </div>
    </section>
  );
}
