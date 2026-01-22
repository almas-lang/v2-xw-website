export default function AboutLoading() {
  return (
    <div className="min-h-screen md:hidden">
      {/* AboutHero Section - Split layout matching AboutHero.tsx */}
      <section className="min-h-screen relative">
        <div className="flex flex-col">
          {/* Dark side */}
          <div className="w-full bg-[#0A0A0A] relative flex items-center justify-center p-8 min-h-[70vh]">
            <div className="relative z-10 max-w-[500px] w-full">
              {/* Subtitle skeleton */}
              <div className="h-4 w-40 bg-alice/20 rounded animate-pulse mb-6" />

              {/* Title skeleton */}
              <div className="space-y-3 mb-6">
                <div className="h-9 bg-white/10 rounded-lg animate-pulse w-full" />
                <div className="h-9 bg-white/10 rounded-lg animate-pulse w-3/4" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-5 bg-white/5 rounded animate-pulse w-full" />
                <div className="h-5 bg-white/5 rounded animate-pulse w-full" />
              </div>

              {/* Stat pills skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="h-9 w-32 bg-white/10 rounded-full animate-pulse" />
                <div className="h-9 w-48 bg-white/10 rounded-full animate-pulse" />
                <div className="h-9 w-40 bg-accent/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Light side */}
          <div className="w-full bg-white relative flex items-center justify-center p-8 min-h-[60vh]">
            {/* Image placeholder skeleton */}
            <div className="w-full max-w-[500px] aspect-[3/4] bg-g100 rounded-3xl animate-pulse" />

            {/* Overlapping card skeleton */}
            <div className="absolute bottom-6 left-4 right-4 bg-white shadow-2xl p-5 rounded-xl">
              <div className="h-6 w-48 bg-g200 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-g100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ProblemsSection - Dark matching ProblemsSection.tsx */}
      <section className="bg-[#0A0A0A] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Title skeleton */}
          <div className="h-9 w-72 bg-white/10 rounded-lg animate-pulse mb-4" />
          <div className="h-5 w-48 bg-white/5 rounded animate-pulse mb-12" />

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-28 bg-accent/20 rounded-lg animate-pulse mx-auto mb-2" />
                <div className="h-5 w-32 bg-white/10 rounded animate-pulse mx-auto mb-3" />
                <div className="h-4 w-56 bg-white/5 rounded animate-pulse mx-auto" />
              </div>
            ))}
          </div>

          {/* Connection line skeleton */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px flex-1 bg-g600" />
            <div className="w-3 h-3 rounded-full bg-accent/50 animate-pulse" />
            <div className="h-px flex-1 bg-g600" />
          </div>

          {/* Solution card skeleton */}
          <div
            className="p-6 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="aspect-[4/3] bg-g600 rounded-2xl animate-pulse mb-6" />
            <div className="space-y-4">
              <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-7 w-48 bg-white/15 rounded animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent/50 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OurValues Section - Dark matching OurValues.tsx */}
      <section className="bg-[#0A0A0A] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse mx-auto mb-4" />
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse mx-auto" />
          </div>

          {/* Values grid skeleton - bento style */}
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="h-4 w-8 bg-accent/30 rounded animate-pulse mb-3" />
                <div className="h-6 w-32 bg-white/15 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Bottom tagline skeleton */}
          <div className="mt-12 text-center">
            <div className="h-4 w-72 bg-white/5 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      {/* TheTeam Section - Light matching TheTeam.tsx */}
      <section className="bg-[#FAFBFC] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header skeleton */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-1 bg-accent/50 rounded animate-pulse" />
              <div className="h-3 w-24 bg-accent/30 rounded animate-pulse" />
            </div>
            <div className="h-12 w-40 bg-g200 rounded-lg animate-pulse" />
          </div>

          {/* Founders label skeleton */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-4 w-20 bg-accent/30 rounded animate-pulse" />
            <div className="h-px flex-1 bg-accent/20 max-w-[150px]" />
          </div>

          {/* Founders cards skeleton */}
          <div className="space-y-6 mb-20">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: '1px solid #E8EAED' }}
              >
                <div className="h-1.5 w-full bg-g200 animate-pulse" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-g200 animate-pulse" />
                    <div className="w-10 h-10 rounded-xl bg-g100 animate-pulse" />
                  </div>
                  <div className="h-7 w-40 bg-g200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-g100 rounded animate-pulse mb-6" />
                  <div className="flex gap-3">
                    <div className="h-10 w-28 bg-carbon/20 rounded-xl animate-pulse" />
                    <div className="h-10 w-24 bg-g100 rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advisors label skeleton */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-20 bg-alice/30 rounded animate-pulse" />
            <div className="h-px flex-1 bg-alice/20 max-w-[150px]" />
          </div>

          {/* Advisors cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl"
                style={{ border: '1px solid #E8EAED' }}
              >
                <div className="w-12 h-12 rounded-xl bg-alice/20 animate-pulse mb-4" />
                <div className="h-5 w-32 bg-g200 rounded animate-pulse mb-1" />
                <div className="h-4 w-40 bg-g100 rounded animate-pulse mb-3" />
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-g200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-g100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JoinConversation Section - Light */}
      <section className="bg-g50 py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-56 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* Social cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-g200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-g200 animate-pulse" />
                  <div>
                    <div className="h-5 w-24 bg-g200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-16 bg-g100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-4 w-full bg-g100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ReadyToStart CTA Section - Dark */}
      <section
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 25%, #0a0a0a 50%, #0a0a0a 75%, #0a0a0a 100%)',
        }}
      >
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-5 w-80 max-w-full bg-white/5 rounded animate-pulse mx-auto mb-8" />
          <div className="h-12 w-44 bg-accent/20 rounded-lg animate-pulse mx-auto" />
        </div>
      </section>
    </div>
  );
}
