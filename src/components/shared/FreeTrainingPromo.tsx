import Image from "next/image";
import Link from "next/link";

type Variant = "card" | "strip" | "split";

interface FreeTrainingPromoProps {
  variant: Variant;
  source: string;
}

const buildHref = (source: string) =>
  `/freetraining?utm_source=organic&utm_medium=inline_promo&utm_campaign=${encodeURIComponent(source)}`;

const TRUST = "Free · 20 min · 830+ designers trained";

export function FreeTrainingPromo({ variant, source }: FreeTrainingPromoProps) {
  const href = buildHref(source);

  if (variant === "strip") {
    return (
      <div className="font-body border-l-4 border-ft-purple-cta bg-transparent pl-4 py-3 my-6">
        <p className="font-heading text-[16px] md:text-[17px] font-semibold text-ft-dark-surface leading-snug">
          Free 20-min training: the roadmap to a senior UX role{" "}
          <Link
            href={href}
            className="text-ft-purple-cta underline underline-offset-2 hover:text-ft-purple whitespace-nowrap"
          >
            Watch now →
          </Link>
        </p>
        <p className="text-[13px] text-g500 mt-1">{TRUST}</p>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <Link
        href={href}
        className="font-body group block my-6 rounded-xl overflow-hidden bg-ft-card-bg shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Mobile layout */}
        <div className="md:hidden p-5">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 w-[76px] h-[76px] rounded-xl overflow-hidden bg-ft-dark">
              <Image src="/images/Murad.png" alt="Shaik Murad" width={76} height={76} className="w-full h-full object-cover scale-x-[-1]" />
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-ft-purple-cta flex items-center justify-center shadow-md">
                <svg className="w-3 h-3 text-white ml-[1px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-[17px] font-bold text-ft-dark-surface leading-tight">
                Land a senior UX role in 90 days.
              </h3>
              <p className="text-[13px] text-g600 leading-snug mt-1.5">
                Training by Shaik Murad — 13 yrs in design, VP in 3.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-ft-purple-cta">
              830+ mentored
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-ft-purple-cta">
              38% salary uplift
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center h-11 rounded-lg bg-ft-purple-cta text-white font-semibold text-[14px] whitespace-nowrap group-hover:opacity-90">
            Watch the training →
          </div>
          <p className="mt-2.5 text-[12px] text-g500 text-center">{TRUST}</p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex">
          <div className="relative w-2/5 bg-ft-dark">
            <Image
              src="/images/Murad.png"
              alt="Shaik Murad — host of the free training"
              width={300}
              height={300}
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-ft-purple-cta flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-3/5 p-6 flex flex-col justify-center">
            <h3 className="font-heading text-[20px] font-bold text-ft-dark-surface leading-snug mb-1">
              Land a senior UX role in 90 days.
            </h3>
            <p className="text-[15px] text-g600 mb-3">
              Training by Shaik Murad (13 yrs in design, VP in 3).
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-white text-ft-purple-cta">
                830+ mentored
              </span>
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-white text-ft-purple-cta">
                38% salary uplift
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-ft-purple-cta text-white font-semibold text-[14px] whitespace-nowrap group-hover:opacity-90">
                Watch the training →
              </span>
              <span className="text-[12px] text-g500">{TRUST}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="font-body group block my-6 rounded-xl bg-ft-card-bg p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/images/Murad.png"
          alt="Shaik Murad"
          width={72}
          height={72}
          className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full object-cover shrink-0 scale-x-[-1]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-[16px] md:text-[18px] font-bold text-ft-dark-surface leading-snug">
            Not ready to commit? Start with the training.
          </h3>
          <p className="text-[13px] md:text-[14px] text-g600 mt-1 line-clamp-2">
            20-minute walkthrough of the exact roadmap 830+ designers used to land senior UX roles.
          </p>
          <div className="mt-2.5 flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center h-8 px-3.5 rounded-full bg-ft-purple-cta text-white font-semibold text-[13px] group-hover:opacity-90">
              Watch the training →
            </span>
            <span className="text-[12px] text-g500">{TRUST}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
