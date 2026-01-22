'use client';

interface ProgramDetailLoadingProps {
  accentColor?: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    light: 'rgba(232, 90, 79, 0.2)',
    glow: 'rgba(232, 90, 79, 0.15)',
  },
  teal: {
    primary: '#4A90A4',
    light: 'rgba(74, 144, 164, 0.2)',
    glow: 'rgba(74, 144, 164, 0.15)',
  },
  gold: {
    primary: '#D4A853',
    light: 'rgba(212, 168, 83, 0.2)',
    glow: 'rgba(212, 168, 83, 0.15)',
  },
};

export default function ProgramDetailLoading({ accentColor = 'coral' }: ProgramDetailLoadingProps) {
  const colors = colorMap[accentColor];

  return (
    <div className="min-h-screen md:hidden">
      {/* Hero Section Skeleton - Dark */}
      <section
        className="relative pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)' }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] blur-3xl"
          style={{ background: colors.glow }}
        />

        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          {/* Top banner skeleton */}
          <div className="h-6 w-80 max-w-full bg-white/10 rounded-full animate-pulse mx-auto mb-8" />

          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-2 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-2 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Program name badge */}
              <div
                className="h-8 w-32 rounded-full animate-pulse mb-4"
                style={{ background: colors.light }}
              />

              {/* Title skeleton */}
              <div className="space-y-3 mb-6">
                <div className="h-10 md:h-14 bg-white/15 rounded-lg animate-pulse w-full" />
                <div className="h-10 md:h-14 bg-white/15 rounded-lg animate-pulse w-3/4" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-8">
                <div className="h-5 bg-white/10 rounded animate-pulse w-full" />
                <div className="h-5 bg-white/10 rounded animate-pulse w-full" />
                <div className="h-5 bg-white/10 rounded animate-pulse w-2/3" />
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full animate-pulse"
                      style={{ background: colors.light }}
                    />
                    <div className="h-4 bg-white/10 rounded animate-pulse flex-1 max-w-xs" />
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div
                className="h-12 w-48 rounded-lg animate-pulse"
                style={{ background: colors.light }}
              />
            </div>

            {/* Hero image placeholder */}
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-white/5 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton - Dark */}
      <section
        className="py-12 md:py-16"
        style={{ background: '#0A0A0A' }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div
                  className="h-12 w-24 rounded-lg animate-pulse mx-auto mb-2"
                  style={{ background: colors.light }}
                />
                <div className="h-4 w-28 bg-white/10 rounded animate-pulse mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit Check Section Skeleton - Light */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-80 max-w-full bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For you card */}
            <div className="p-6 rounded-2xl border border-g200 bg-g50">
              <div className="h-6 w-40 bg-g200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-200 animate-pulse flex-shrink-0 mt-0.5" />
                    <div className="h-5 bg-g200 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Not for you card */}
            <div className="p-6 rounded-2xl border border-g200 bg-g50">
              <div className="h-6 w-48 bg-g200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-alice/50 animate-pulse flex-shrink-0 mt-0.5" />
                    <div className="h-5 bg-g200 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section Skeleton - Dark */}
      <section
        className="py-16 md:py-24"
        style={{ background: '#0A0A0A' }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-96 max-w-full bg-white/15 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-72 bg-white/10 rounded animate-pulse mx-auto" />
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div className="h-5 w-24 bg-white/10 rounded animate-pulse mb-3" />
                <div className="h-7 w-full bg-white/15 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full animate-pulse"
                  style={{ background: colors.light }}
                />
                <div className="h-5 bg-white/10 rounded animate-pulse flex-1 max-w-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section Skeleton - Light */}
      <section className="py-16 md:py-24 bg-g50">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-72 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 max-w-full bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* Carousel placeholder */}
          <div className="rounded-2xl border border-g200 bg-white p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video bg-g100 rounded-xl animate-pulse" />
              <div>
                <div className="h-5 w-16 bg-g200 rounded animate-pulse mb-3" />
                <div className="h-7 w-3/4 bg-g200 rounded-lg animate-pulse mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-2/3" />
                </div>
              </div>
            </div>
          </div>

          {/* What's included grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-g200"
              >
                <div className="w-5 h-5 rounded-full bg-alice/50 animate-pulse" />
                <div className="h-5 bg-g100 rounded animate-pulse flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section Skeleton - Dark */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-80 max-w-full bg-white/15 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 max-w-full bg-white/10 rounded animate-pulse mx-auto" />
          </div>

          {/* Module cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {/* Number watermark placeholder */}
                <div className="h-6 w-8 bg-white/10 rounded animate-pulse mb-4" />
                <div className="h-6 w-3/4 bg-white/15 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse mb-6" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <div className="h-4 bg-white/10 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI module card */}
          <div
            className="p-6 rounded-2xl max-w-lg mx-auto"
            style={{ background: 'rgba(74, 144, 164, 0.15)', border: '1px solid rgba(74, 144, 164, 0.3)' }}
          >
            <div className="h-6 w-48 bg-white/15 rounded animate-pulse mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
              <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section Skeleton - Light */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-72 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 max-w-full bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* Tool marquee placeholder */}
          <div className="space-y-4 overflow-hidden">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-5 py-3 rounded-lg bg-g100 animate-pulse"
                  >
                    <div className="h-5 w-20" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section Skeleton - Dark */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-white/15 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-72 bg-white/10 rounded animate-pulse mx-auto" />
          </div>

          {/* Pricing card */}
          <div
            className="p-8 rounded-2xl mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-baseline gap-2 mb-4">
              <div className="h-8 w-40 bg-white/15 rounded animate-pulse" />
              <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="h-4 w-80 max-w-full bg-white/10 rounded animate-pulse mb-6" />

            {/* ROI section */}
            <div
              className="p-6 rounded-xl flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div
                className="w-20 h-20 rounded-xl animate-pulse"
                style={{ background: colors.light }}
              />
              <div className="flex-1">
                <div className="h-5 w-40 bg-white/15 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Guarantee banner */}
          <div
            className="p-6 rounded-2xl text-center mb-8"
            style={{ background: 'rgba(74, 144, 164, 0.15)', border: '2px dashed rgba(74, 144, 164, 0.3)' }}
          >
            <div className="h-4 w-24 bg-white/20 rounded animate-pulse mx-auto mb-2" />
            <div className="h-5 w-96 max-w-full bg-white/15 rounded animate-pulse mx-auto" />
          </div>

          {/* CTA button */}
          <div className="flex justify-center">
            <div className="h-12 w-48 bg-white/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton - Light */}
      <section
        className="py-16 md:py-24"
        style={{
          backgroundColor: '#F9F9F9',
          backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 max-w-full bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-g200"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-g200 rounded animate-pulse flex-1 mr-8" />
                  <div className="w-6 h-6 rounded-full bg-g100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton - Dark */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)' }}
      >
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <div className="h-10 w-80 max-w-full bg-white/15 rounded-lg animate-pulse mx-auto mb-2" />
          <div className="h-10 w-48 bg-white/15 rounded-lg animate-pulse mx-auto mb-6" />
          <div className="h-5 w-96 max-w-full bg-white/10 rounded animate-pulse mx-auto mb-8" />
          <div className="h-12 w-48 bg-accent/30 rounded-lg animate-pulse mx-auto" />
        </div>
      </section>
    </div>
  );
}
