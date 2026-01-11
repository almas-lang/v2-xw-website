import Button from '@/components/ui/Button';

const comparisonData = [
  { courses: 'Same for everyone', mentorship: 'Curated for your gaps' },
  { courses: 'Pre-recorded videos', mentorship: 'Live 1:1 Sessions' },
  { courses: 'No accountability', mentorship: 'Frequent check-ins' },
  { courses: 'No feedback', mentorship: 'Reviews until ready' },
  { courses: 'Certificates', mentorship: 'Actual interview preparation' },
  { courses: "You're on your own", mentorship: 'Support until you achieve your goals' },
];

export default function MentorshipComparison() {
  return (
    <section className="bg-g50 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-3">
            How 1:1 Mentorship Fixes This
          </h2>
          <p className="font-body text-lg md:text-xl text-g600">
            Everything courses get wrong, we get right.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl border border-g200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-2">
              <div className="px-6 py-4 md:px-8 md:py-5 border-b border-r border-g200 bg-white">
                <span className="font-heading text-xs md:text-sm font-bold text-carbon uppercase tracking-wider">
                  Courses
                </span>
              </div>
              <div className="px-6 py-4 md:px-8 md:py-5 border-b border-alice-border bg-alice">
                <span className="font-heading text-xs md:text-sm font-bold text-carbon uppercase tracking-wider">
                  1:1 Mentorship
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 ${
                  index !== comparisonData.length - 1 ? 'border-b border-g200' : ''
                }`}
              >
                {/* Courses Column */}
                <div className="px-6 py-4 md:px-8 md:py-5 border-r border-g200">
                  <span className="font-body text-sm md:text-base text-g600">
                    {row.courses}
                  </span>
                </div>
                {/* Mentorship Column */}
                <div className="px-6 py-4 md:px-8 md:py-5 bg-alice-light">
                  <span className="font-body text-sm md:text-base text-carbon font-medium">
                    {row.mentorship}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div
          className="max-w-4xl mx-auto rounded-xl py-5 px-6 md:px-8 mb-8"
          style={{
            background: 'linear-gradient(90deg, rgba(220,238,255,0.3) 0%, rgba(220,238,255,0.9) 50%, rgba(220,238,255,0.3) 100%)',
          }}
        >
          <p className="font-heading text-base md:text-lg font-semibold text-carbon text-center">
            This is why 80% of our mentees achieve their goals.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button href="#book-call" size="sm">
            Book strategy call
          </Button>
        </div>
      </div>
    </section>
  );
}
