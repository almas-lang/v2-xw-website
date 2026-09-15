import Link from 'next/link';

export const metadata = {
  title: 'Subscription Confirmed | Xperience Wave',
  robots: { index: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#FAFAFA',
        backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="relative z-10 max-w-[520px] mx-auto px-5 py-24 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-carbon mb-4">
          You&apos;re subscribed!
        </h1>
        <p className="font-body text-base text-g600 mb-8">
          Your email is confirmed. Expect sharp insights, practical tips, and
          no-BS updates from the Xperience Wave team — straight to your inbox.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-carbon text-white font-heading font-semibold text-sm rounded-lg hover:bg-carbon/90 transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
