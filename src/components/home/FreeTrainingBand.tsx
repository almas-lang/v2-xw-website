import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/lib/stats";

/**
 * Full-width dark band promoting the free training on the homepage.
 * Replaced the small purple card (Oct 2026), which sat unnoticed between
 * two light sections. Server component: no state, just a link.
 */
export function FreeTrainingBand({ source }: { source: string }) {
  const href = `/freetraining?utm_source=organic&utm_medium=inline_promo&utm_campaign=${encodeURIComponent(source)}`;

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24 px-5">
      {/* Background glow + dot grid, matching the hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 15% 50%, rgba(255,0,35,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 90% 20%, rgba(220,238,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center">
        {/* Video thumbnail */}
        <Link href={href} className="group block" aria-label="Watch the free training">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9),0_8px_24px_-12px_rgba(255,0,35,0.3)]">
            <Image
              src="/freetraining/video-thumbnail.png"
              alt="Free training: how designers move into senior and leadership roles, by Shaik Murad"
              width={1467}
              height={824}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
              Free · 20 min
            </span>
          </div>
        </Link>

        {/* Copy */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Not ready for mentorship?</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-5">
            Start with the free 20-minute training.
          </h2>
          <p className="font-body text-base md:text-lg text-g400 leading-relaxed mb-8 max-w-[520px]">
            Shaik Murad walks through the three reasons talented designers stay stuck at mid-level, and the roadmap {STATS.seniorRolesLanded} designers used to move into senior and leadership roles.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 whitespace-nowrap shrink-0 bg-accent hover:bg-accent-hover text-white font-heading font-semibold text-base md:text-lg rounded-xl transition-colors shadow-[0_0_40px_rgba(255,0,35,0.25)] hover:shadow-[0_0_60px_rgba(255,0,35,0.35)]"
            >
              Watch the training
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="font-body text-sm text-g500">
              {STATS.designersTrained} designers trained · 4.9/5 from 500+ ratings
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/15 shrink-0">
              <Image src="/images/Murad.png" alt="Shaik Murad" fill sizes="40px" className="object-cover object-top scale-x-[-1]" />
            </div>
            <p className="font-body text-sm text-g400">
              <span className="text-white font-semibold">Shaik Murad</span>, Co-founder · 15 years in design
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
