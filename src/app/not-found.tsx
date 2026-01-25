import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-carbon flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="relative mb-8">
          <span className="font-heading text-[150px] md:text-[200px] font-black text-white/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-6xl md:text-8xl font-bold text-white">
              4<span className="text-accent">0</span>4
            </span>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-g400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold rounded-lg transition-colors"
          >
            Explore Programs
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-body text-sm text-g500 mb-4">Quick links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="font-body text-sm text-g400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/community" className="font-body text-sm text-g400 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="/resources/blogs" className="font-body text-sm text-g400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/resources/faq" className="font-body text-sm text-g400 hover:text-white transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
