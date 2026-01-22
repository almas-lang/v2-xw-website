export default function Loading() {
  return (
    <div className="min-h-screen md:hidden">
      {/* Hero Section - Dark bg matching Hero.tsx */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 25%, #0a0a0a 50%, #0a0a0a 75%, #0a0a0a 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="pt-28 pb-12">
            {/* Title skeleton */}
            <div className="space-y-3 mb-6 max-w-[900px]">
              <div className="h-8 bg-white/10 rounded-lg animate-pulse w-full" />
              <div className="h-8 bg-white/10 rounded-lg animate-pulse w-3/4" />
            </div>

            {/* Subheadline skeleton */}
            <div className="h-5 bg-white/5 rounded animate-pulse w-full max-w-[700px] mb-6" />

            {/* Target audience skeleton */}
            <div className="h-4 bg-white/5 rounded animate-pulse w-3/4 max-w-[500px] mb-8" />

            {/* CTA button skeleton */}
            <div className="h-12 w-44 bg-accent/20 rounded-lg animate-pulse" />
          </div>

          {/* Video Section skeleton */}
          <div className="pb-6">
            <div
              className="w-full py-24 rounded-xl animate-pulse"
              style={{
                background: 'rgba(220,238,255,0.04)',
                border: '1px solid rgba(220,238,255,0.1)',
              }}
            >
              {/* Play button skeleton */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse mb-4" />
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-1" />
                <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* AI badge skeleton */}
          <div className="flex justify-center pb-12">
            <div className="h-10 w-64 bg-alice/10 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section - Carbon bg matching Stats.tsx */}
      <section className="bg-[#0A0A0A] py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center min-w-[100px]">
                <div className="h-7 w-16 bg-white/10 rounded animate-pulse mb-1" />
                <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound Familiar Section - g50 bg matching SoundFamiliar.tsx */}
      <section className="bg-g50 py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Title skeleton */}
          <div className="text-center mb-12">
            <div className="h-9 w-56 bg-g200 rounded-lg animate-pulse mx-auto mb-8" />

            {/* Pain points skeleton */}
            <div className="space-y-3 max-w-2xl mx-auto mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-g200 rounded animate-pulse w-full" />
              ))}
            </div>

            <div className="h-5 w-72 bg-g300 rounded animate-pulse mx-auto" />
          </div>

          {/* Dark card skeleton */}
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-t-2xl p-8"
              style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 100%)' }}
            >
              <div className="h-7 w-3/4 bg-white/10 rounded animate-pulse mx-auto mb-8" />
              <div className="space-y-4 max-w-2xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-alice rounded-b-2xl py-4 px-6">
              <div className="h-4 w-80 bg-carbon/20 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Dotted bg matching HowItWorks.tsx */}
      <section
        className="py-16"
        style={{
          backgroundColor: '#F9F9F9',
          backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header skeleton */}
          <div className="mb-12">
            <div className="h-9 w-48 bg-g200 rounded-lg animate-pulse mb-3" />
            <div className="h-5 w-64 bg-g100 rounded animate-pulse" />
          </div>

          {/* Mobile Timeline skeleton */}
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-g200" />
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-white border-[3px] border-g300" />
                  <div className="h-5 w-40 bg-g200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-g100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-g100 rounded animate-pulse mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA skeleton */}
          <div className="mt-12 text-center">
            <div className="h-12 w-44 bg-accent/20 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      {/* Why Courses Failed Section - White bg matching WhyCoursesFailed.tsx */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Title skeleton */}
          <div className="h-9 w-80 bg-g200 rounded-lg animate-pulse mx-auto mb-12" />

          {/* Pain Point Cards - 2x2 grid skeleton */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-md"
                style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 100%)' }}
              >
                <div className="w-12 h-12 bg-accent/20 rounded animate-pulse mb-4" />
                <div className="h-5 w-48 bg-white/15 rounded animate-pulse mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
                  <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Banner skeleton */}
          <div
            className="rounded-xl py-5 px-6 mb-8"
            style={{ background: 'linear-gradient(90deg, rgba(220,238,255,0.3) 0%, rgba(220,238,255,0.9) 50%, rgba(220,238,255,0.3) 100%)' }}
          >
            <div className="h-5 w-full bg-carbon/20 rounded animate-pulse mx-auto" />
          </div>

          {/* Blog card skeleton */}
          <div className="bg-g50 border border-g200 rounded-md overflow-hidden">
            <div className="aspect-[4/3] bg-g100 animate-pulse" />
            <div className="p-6">
              <div className="h-6 w-full bg-g200 rounded animate-pulse mb-2" />
              <div className="h-6 w-3/4 bg-g200 rounded animate-pulse mb-5" />
              <div className="h-4 w-16 bg-g300 rounded animate-pulse mb-2" />
              <div className="h-3 w-20 bg-g100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* MenteesWorkAt Section - Dark matching MenteesWorkAt.tsx */}
      <section
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #0A0A0A 40%, #0A0A0A 70%, #0A0A0A 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="h-8 w-64 bg-white/10 rounded-lg animate-pulse mx-auto mb-10" />
          <div className="flex flex-col gap-4 mb-10">
            {[1, 2].map((row) => (
              <div key={row} className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="px-6 py-3 rounded-lg animate-pulse"
                    style={{ background: 'rgba(74, 144, 164, 0.15)' }}
                  >
                    <div className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="h-4 w-96 max-w-full bg-white/5 rounded animate-pulse mx-auto" />
        </div>
      </section>

      {/* Success Stories Section - White bg */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-72 bg-g100 rounded animate-pulse mx-auto" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl border border-g200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-g200 animate-pulse" />
                  <div>
                    <div className="h-5 w-32 bg-g200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-24 bg-g100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section - Light bg */}
      <section className="bg-g50 py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-56 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 bg-g100 rounded animate-pulse mx-auto" />
          </div>
          <div className="space-y-6">
            {[
              { color: 'rgba(232, 90, 79, 0.2)' },
              { color: 'rgba(74, 144, 164, 0.2)' },
              { color: 'rgba(212, 168, 83, 0.2)' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-g200">
                <div className="h-6 w-24 rounded-full animate-pulse mb-4" style={{ background: item.color }} />
                <div className="h-6 w-3/4 bg-g200 rounded animate-pulse mb-3" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-2/3" />
                </div>
                <div className="h-10 rounded-lg animate-pulse" style={{ background: item.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Dotted bg matching FAQ.tsx */}
      <section
        className="py-16"
        style={{
          backgroundColor: '#F9F9F9',
          backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 bg-g100 rounded animate-pulse mx-auto" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="p-5 rounded-xl bg-white border border-g200">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-g200 rounded animate-pulse flex-1 mr-8" />
                  <div className="w-6 h-6 rounded-full bg-g100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark bg matching CTASection.tsx */}
      <section
        className="relative py-20"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 25%, #0a0a0a 50%, #0a0a0a 75%, #0a0a0a 100%)',
        }}
      >
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <div className="h-9 w-72 bg-white/10 rounded-lg animate-pulse mx-auto mb-2" />
          <div className="h-9 w-40 bg-white/10 rounded-lg animate-pulse mx-auto mb-6" />
          <div className="h-5 w-80 max-w-full bg-white/5 rounded animate-pulse mx-auto mb-8" />
          <div className="h-12 w-44 bg-accent/20 rounded-lg animate-pulse mx-auto mb-10" />
          <div className="flex flex-wrap justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
