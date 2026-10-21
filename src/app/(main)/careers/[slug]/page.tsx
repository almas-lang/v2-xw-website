import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob, getOpenJobs } from '@/data/jobs';
import { SITE_URL, SITE_NAME, ogImageUrl } from '@/lib/seo';
import Breadcrumb from '@/components/careers/Breadcrumb';
import JobMeta from '@/components/careers/JobMeta';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getOpenJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) {
    return { title: { absolute: 'Role Not Found' }, robots: { index: false, follow: false } };
  }
  const title = `${job.title} (${job.type}, ${job.location}) | ${SITE_NAME}`;
  const url = `${SITE_URL}/careers/${job.slug}`;
  const image = ogImageUrl('/careers');
  return {
    title: { absolute: title },
    description: job.summary,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title,
      description: job.summary,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: job.summary, images: [image] },
  };
}

function ApplyButton({ slug, className = '' }: { slug: string; className?: string }) {
  return (
    <Link
      href={`/careers/${slug}/apply`}
      className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4A853] hover:bg-[#D4A853]/90 text-white font-heading font-bold text-base transition-all duration-300 hover:gap-4 group ${className}`}
      style={{ borderRadius: '12px' }}
    >
      Apply for this role
      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const posted = new Date(job.postedAt);
  const validThrough = new Date(posted);
  validThrough.setDate(validThrough.getDate() + 90);

  const jobPosting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: [...job.intro, ...job.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.items ?? [])])].join(' '),
    datePosted: job.postedAt,
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Part-time' ? 'PART_TIME' : job.type === 'Internship' ? 'INTERN' : 'CONTRACTOR',
    hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL, logo: `${SITE_URL}/favicon.ico` },
    jobLocationType: job.location.toLowerCase().startsWith('remote') ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: { '@type': 'Country', name: 'India' },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN', addressLocality: 'Bangalore' } },
    directApply: true,
    url: `${SITE_URL}/careers/${job.slug}`,
  };

  const detailRows: { label: string; value: string }[] = [
    { label: 'Team', value: job.team },
    { label: 'Location', value: job.location },
    { label: 'Type', value: job.type },
  ];
  if (job.hours) detailRows.push({ label: 'Hours', value: job.hours });
  if (job.pay) detailRows.push({ label: 'Pay', value: job.pay });
  detailRows.push({
    label: 'Posted',
    value: posted.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} />

      {/* Header band */}
      <section className="relative overflow-hidden bg-[#0A0A0A]">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212, 168, 83, 0.10) 0%, transparent 60%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-12 md:pb-16">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label: job.title }]}
            className="mb-10 animate-hero-fade-in"
          />
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4A853] mb-4 animate-hero-fade-in" style={{ animationDelay: '50ms' }}>
            {job.team}
          </p>
          <h1
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5 animate-hero-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            {job.title}
          </h1>
          <JobMeta job={job} className="mb-8 animate-hero-fade-in" />
          <div className="animate-hero-fade-in" style={{ animationDelay: '200ms' }}>
            <ApplyButton slug={job.slug} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-16">
          <article className="max-w-3xl">
            <div className="space-y-4 mb-10">
              {job.intro.map((paragraph) => (
                <p key={paragraph} className="text-g700 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {job.sections.map((section) => (
              <div key={section.heading} className="mb-10">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-4">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-g700 text-base md:text-lg leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-g700 text-base md:text-lg leading-relaxed">
                        <span className="mt-[11px] w-1.5 h-1.5 shrink-0 bg-[#D4A853]" style={{ borderRadius: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="border-t border-g200 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
              <ApplyButton slug={job.slug} />
              <Link href="/careers" className="text-g500 hover:text-carbon text-sm underline underline-offset-2 transition-colors">
                Back to all roles
              </Link>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-g50 border border-g200 p-6 md:p-7" style={{ borderRadius: '16px' }}>
              <h2 className="font-heading text-lg font-bold text-carbon mb-5">Role at a glance</h2>
              <dl className="space-y-4 mb-6">
                {detailRows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs uppercase tracking-wider text-g400 mb-0.5">{row.label}</dt>
                    <dd className="text-carbon text-sm font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <ApplyButton slug={job.slug} className="w-full" />
              <p className="text-g400 text-xs mt-4 leading-relaxed">
                Takes about five minutes. We reply to every application, usually within five working days.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
