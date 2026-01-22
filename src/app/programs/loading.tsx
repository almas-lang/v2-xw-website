export default function ProgramsLoading() {
  return (
    <div className="min-h-screen bg-white md:hidden">
      {/* Hero Section Skeleton */}
      <section className="relative pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-g50">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-alice/20 blur-3xl" />

        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-12 bg-g200 rounded animate-pulse" />
            <div className="h-4 w-2 bg-g200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-g200 rounded animate-pulse" />
          </div>

          <div className="max-w-2xl">
            {/* Title */}
            <div className="h-10 md:h-14 w-full bg-g200 rounded-lg animate-pulse mb-4" />
            <div className="h-10 md:h-14 w-2/3 bg-g200 rounded-lg animate-pulse mb-6" />

            {/* Description */}
            <div className="space-y-2 mb-8">
              <div className="h-5 bg-g100 rounded animate-pulse w-full" />
              <div className="h-5 bg-g100 rounded animate-pulse w-4/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="h-7 w-40 bg-g200 rounded-lg animate-pulse mx-auto mb-3" />
            <div className="h-5 w-72 max-w-full bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* Program cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Current - Coral themed */}
            <div className="rounded-2xl border border-g200 overflow-hidden bg-white">
              <div className="h-2 bg-[#E85A4F]/30 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-28 bg-[#E85A4F]/20 rounded-full animate-pulse mb-4" />
                <div className="h-7 w-3/4 bg-g200 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-1/2 bg-g100 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-2/3" />
                </div>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E85A4F]/20 animate-pulse" />
                      <div className="h-4 bg-g100 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
                <div className="h-11 bg-[#E85A4F]/20 rounded-lg animate-pulse w-full" />
              </div>
            </div>

            {/* Ripple - Teal themed */}
            <div className="rounded-2xl border border-g200 overflow-hidden bg-white">
              <div className="h-2 bg-[#4A90A4]/30 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-28 bg-[#4A90A4]/20 rounded-full animate-pulse mb-4" />
                <div className="h-7 w-3/4 bg-g200 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-1/2 bg-g100 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-2/3" />
                </div>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#4A90A4]/20 animate-pulse" />
                      <div className="h-4 bg-g100 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
                <div className="h-11 bg-[#4A90A4]/20 rounded-lg animate-pulse w-full" />
              </div>
            </div>

            {/* Tide - Gold themed */}
            <div className="rounded-2xl border border-g200 overflow-hidden bg-white">
              <div className="h-2 bg-[#D4A853]/30 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-28 bg-[#D4A853]/20 rounded-full animate-pulse mb-4" />
                <div className="h-7 w-3/4 bg-g200 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-1/2 bg-g100 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-g100 rounded animate-pulse w-2/3" />
                </div>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#D4A853]/20 animate-pulse" />
                      <div className="h-4 bg-g100 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
                <div className="h-11 bg-[#D4A853]/20 rounded-lg animate-pulse w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Skeleton */}
      <section className="py-16 md:py-24 bg-g50">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="h-8 w-56 bg-g200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-5 w-80 max-w-full bg-g100 rounded animate-pulse mx-auto" />
          </div>

          {/* Table skeleton */}
          <div className="bg-white rounded-2xl border border-g200 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-g50 border-b border-g200">
              <div className="h-6 bg-g200 rounded animate-pulse" />
              <div className="h-6 bg-[#E85A4F]/20 rounded animate-pulse" />
              <div className="h-6 bg-[#4A90A4]/20 rounded animate-pulse" />
              <div className="h-6 bg-[#D4A853]/20 rounded animate-pulse" />
            </div>
            {/* Body rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-g100 last:border-0">
                <div className="h-5 bg-g100 rounded animate-pulse" />
                <div className="h-5 bg-g100 rounded animate-pulse" />
                <div className="h-5 bg-g100 rounded animate-pulse" />
                <div className="h-5 bg-g100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <div className="h-8 md:h-10 w-72 bg-white/10 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-5 w-96 max-w-full bg-white/5 rounded animate-pulse mx-auto mb-8" />
          <div className="h-12 w-48 bg-white/20 rounded-lg animate-pulse mx-auto" />
        </div>
      </section>
    </div>
  );
}
