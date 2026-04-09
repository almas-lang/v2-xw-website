'use client';

/**
 * OPTION C: "Form in Hero"
 * Copy left, lead capture form right (desktop).
 * No separate scroll — the form IS in the first fold.
 * Maximum conversion intent. Mobile: copy → video → form stacked.
 */
export function HeroOptionC({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 0% 20%, rgba(255,0,35,0.08) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 100% 80%, rgba(108,99,255,0.05) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left — Copy + Video */}
          <div className="lg:col-span-7">
            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[20px] font-heading font-bold text-white">4.8</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-[12px] text-white/40">from 1,823 ratings</span>
            </div>

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-full max-w-[360px]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[11px] text-white/80 font-medium leading-snug">
                  For UX/UI/Product Designers with 2-8 Years Who Keep Getting Passed Over For Senior Roles
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-white leading-[1.12] tracking-tight text-[28px] sm:text-[36px] md:text-[42px] mb-5">
              Still Getting Overlooked For <span className="text-accent font-bold">Senior Roles</span> –{' '}
              <span className="text-g500 italic font-normal">Despite Being Better Than Half The People Getting Promoted?</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-[15px] md:text-[17px] text-[#BFBFCC] leading-[175%] mb-3 max-w-[520px]">
              Watch this free 28-min training where Shaik Murad breaks down why this keeps happening – and how 830+ designers landed senior &amp; leadership roles paying ₹18-28 LPA in under 90 days.
            </p>

            {/* Without */}
            <p className="text-[12px] text-[#80809B] italic mb-8">
              Without a fancy degree, big-brand resume, or prior team leadership experience.
            </p>

            {/* Video — in-context */}
            <button onClick={onCtaClick} className="relative w-full rounded-xl overflow-hidden border border-white/[0.08] group shadow-xl shadow-black/40" aria-label="Watch free training">
              <img src="/freetraining/video-thumbnail.png" alt="Free training video – Shaik Murad" className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-xl shadow-accent/30 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
          </div>

          {/* Right — Form card (desktop) */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="font-heading text-[18px] md:text-[20px] font-bold text-white mb-1">Get instant access</h2>
              <p className="text-[12px] text-white/40 mb-5">Free. 28 minutes. No spam.</p>

              {/* Name */}
              <div className="mb-3">
                <input type="text" placeholder="Your first name" className="w-full px-4 py-3 text-[14px] bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition" />
              </div>
              {/* Email */}
              <div className="mb-3">
                <input type="email" placeholder="Your email address" className="w-full px-4 py-3 text-[14px] bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition" />
              </div>
              {/* WhatsApp */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg shrink-0">
                    <span className="text-[13px] text-white/50 font-medium">+91</span>
                  </div>
                  <input type="tel" placeholder="WhatsApp number" className="flex-1 px-4 py-3 text-[14px] bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition" />
                </div>
                <p className="mt-1.5 text-[11px] text-white/30">We'll send your training link here</p>
              </div>
              {/* Submit */}
              <button onClick={onCtaClick} className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] rounded-lg transition-colors shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                Watch Free Training
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <p className="mt-3 text-[10px] text-white/25 text-center">By submitting, you agree to receive updates via Email/SMS/WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
