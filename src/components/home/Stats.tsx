const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
        <path fill="currentColor" d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
      </svg>
    ),
    value: '3000',
    suffix: '+',
    label: 'designers consulted',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
        <path fill="currentColor" d="M198.24,62.63a8,8,0,0,0-11.29-.61C174.52,73.67,154.29,80,128,80S81.48,73.67,69.05,62a8,8,0,1,0-10.68,11.92A92.82,92.82,0,0,0,88,95.27V128a8,8,0,0,0,16,0V95.27a92.82,92.82,0,0,0,29.63-21.35A92.82,92.82,0,0,0,163.26,95.27V128a8,8,0,0,0,16,0V95.27A92.82,92.82,0,0,0,209,73.92,8,8,0,0,0,198.24,62.63ZM128,24a36,36,0,1,0,36,36A36,36,0,0,0,128,24Zm0,56a20,20,0,1,1,20-20A20,20,0,0,1,128,80Zm104,128a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h4V152a8,8,0,0,1,8-8H76a8,8,0,0,1,8,8v48h24V168a8,8,0,0,1,8-8h24a8,8,0,0,1,8,8v32h24V184a8,8,0,0,1,8-8h36a8,8,0,0,1,8,8v16h4A8,8,0,0,1,232,208Z"/>
      </svg>
    ),
    value: '140',
    suffix: '+',
    label: 'mentored 1:1',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
        <path fill="currentColor" d="M221.87,83.16A104.1,104.1,0,1,1,172.84,34.13,8,8,0,0,1,176,49.21,88.08,88.08,0,1,0,206.79,80,8,8,0,0,1,221.87,83.16ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Zm0-112a8,8,0,0,0,0,16,72.08,72.08,0,0,1,72,72,8,8,0,0,0,16,0A88.1,88.1,0,0,0,128,40Z"/>
      </svg>
    ),
    value: '80',
    suffix: '%',
    label: 'achieved their goals',
  },
];

export default function Stats() {
  return (
    <section className="bg-black py-12 md:py-16 relative overflow-hidden" aria-label="Our impact in numbers">
      {/* X watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[300px] md:text-[400px] text-white/[0.02] pointer-events-none select-none"
        aria-hidden="true"
      >
        X
      </span>

      <div className="max-w-[1000px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                {stat.icon}
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-g400 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
