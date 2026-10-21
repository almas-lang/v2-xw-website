const values = [
  {
    title: 'Growth-first',
    body: "Every decision gets the same test: does it help a designer get further, faster? If the answer is no, we don't do it.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: 'No BS',
    body: 'Straight feedback, honest numbers, no corporate theatre. We tell people what they need to hear, including each other.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Own your numbers',
    body: "Small team, real responsibility. You'll know what you're accountable for and you'll see the result of your work every week.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 16v-5M12 16V8M16 16v-3" />
      </svg>
    ),
  },
  {
    title: 'Founders in the room',
    body: 'A weekly one-on-one with a founder is standard, not a perk. You learn fast because the people who built this are a message away.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const facts = [
  { value: '3,000+', label: 'designers trained and mentored' },
  { value: '83%', label: 'of 1:1 mentees hit their career goal' },
  { value: '2022', label: 'founded in Bangalore' },
  { value: 'Remote', label: 'friendly, India-based team' },
];

export default function CultureSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-4">How we work</p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-4">
            Small team. Real stakes. Fast feedback.
          </h2>
          <p className="text-g600 text-base md:text-lg leading-relaxed">
            We run lean on purpose. Fewer people, more ownership, and a direct line to the designers whose careers we&apos;re
            changing. Here&apos;s what that looks like day to day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 md:mb-20">
          {values.map((value) => (
            <div key={value.title} className="bg-g50 border border-g200 p-6" style={{ borderRadius: '16px' }}>
              <div
                className="w-11 h-11 flex items-center justify-center bg-[#D4A853]/15 text-[#B8860B] mb-5"
                style={{ borderRadius: '10px' }}
              >
                {value.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-carbon mb-2">{value.title}</h3>
              <p className="text-g600 text-sm leading-relaxed">{value.body}</p>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-g200 pt-10">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-heading text-3xl md:text-4xl font-black text-carbon mb-1">{fact.value}</dt>
              <dd className="text-g500 text-sm">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
