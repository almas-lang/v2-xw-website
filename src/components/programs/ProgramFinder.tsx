'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// ============================================
// ILLUSTRATIONS - Icon Set 10: Orbit, Hexagon, Trident
// ============================================

const CurrentWaveIllustration = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path d="M24 4L40 14V34L24 44L8 34V14L24 4Z" fill="#6366F1" opacity="0.15" stroke="#6366F1" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 12L32 18V30L24 36L16 30V18L24 12Z" fill="#6366F1" opacity="0.25" />
    <circle cx="24" cy="24" r="4" fill="#6366F1" />
  </svg>
);

const RippleIllustration = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="#4A90A4" strokeWidth="1.5" fill="none" transform="rotate(-30 24 24)" opacity="0.4" />
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="#4A90A4" strokeWidth="1.5" fill="none" transform="rotate(30 24 24)" opacity="0.4" />
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="#4A90A4" strokeWidth="1.5" fill="none" transform="rotate(90 24 24)" opacity="0.4" />
    <circle cx="24" cy="24" r="5" fill="#4A90A4" />
  </svg>
);

const TideIllustration = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path d="M24 44V16" stroke="#FF0023" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 16L24 8L20 4" stroke="#FF0023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 16L24 8L28 4" stroke="#FF0023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 16L20 12" stroke="#FF0023" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M24 16L28 12" stroke="#FF0023" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M16 44H32" stroke="#FF0023" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ============================================
// DATA
// ============================================

const roles = [
  { value: '', label: 'Select role' },
  { value: 'ui-designer', label: 'UI Designer' },
  { value: 'ux-designer', label: 'UX Designer' },
  { value: 'product-designer', label: 'Product Designer' },
  { value: 'visual-designer', label: 'Visual Designer' },
  { value: 'interaction-designer', label: 'Interaction Designer' },
  { value: 'design-lead', label: 'Design Lead' },
  { value: 'other', label: 'Other' },
];

const experienceLevels = [
  { value: '', label: 'Total years of experience' },
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-8', label: '5-8 years' },
  { value: '8+', label: '8+ years' },
];

const goals = [
  { value: '', label: 'Select your goal' },
  { value: 'first-job', label: 'Land my first UX job' },
  { value: 'senior-role', label: 'Get a senior role' },
  { value: 'lead-role', label: 'Become a design lead' },
  { value: 'switch-company', label: 'Switch to a better company' },
  { value: 'salary-hike', label: 'Negotiate a salary hike' },
  { value: 'portfolio', label: 'Build a strong portfolio' },
];

type ProgramType = 'starter' | 'current' | 'accelerator' | null;

interface Program {
  id: ProgramType;
  badge: string;
  name: string;
  description: string;
  href: string;
  illustration: React.ComponentType;
  color: string;
}

const programs: Record<Exclude<ProgramType, null>, Program> = {
  starter: {
    id: 'starter',
    badge: 'RIPPLE',
    name: 'Start your UX/UI Career',
    description: 'For fresh graduates or career switchers from any background',
    href: '/programs/ripple',
    illustration: RippleIllustration,
    color: '#4A90A4',
  },
  current: {
    id: 'current',
    badge: 'CURRENT',
    name: 'Senior Mentorship',
    description: 'For serious mid-level designers ready for senior & lead roles',
    href: '/programs/current',
    illustration: CurrentWaveIllustration,
    color: '#6366F1',
  },
  accelerator: {
    id: 'accelerator',
    badge: 'TIDE',
    name: 'Design Leadership',
    description: 'For the ones ready to lead/manage teams and drive influence',
    href: '/programs/tide',
    illustration: TideIllustration,
    color: '#FF0023',
  },
};

// ============================================
// COMPONENT
// ============================================

export default function ProgramFinder() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendedProgram, setRecommendedProgram] = useState<ProgramType>(null);
  const [showResult, setShowResult] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    setIsVisible(true);
    const savedResult = sessionStorage.getItem('programFinderResult');
    if (savedResult) {
      try {
        const { program, role: savedRole, experience: savedExp, goal: savedGoal } = JSON.parse(savedResult);
        setRecommendedProgram(program);
        setRole(savedRole);
        setExperience(savedExp);
        setGoal(savedGoal);
        setShowResult(true);
      } catch (e) {
        sessionStorage.removeItem('programFinderResult');
      }
    }
  }, []);

  const getRecommendation = (): ProgramType => {
    if (experience === '0-1' || goal === 'first-job') {
      return 'starter';
    }
    if (experience === '5-8' || experience === '8+' || goal === 'lead-role') {
      return 'accelerator';
    }
    return 'current';
  };

  const handleSubmit = () => {
    if (!role || !experience || !goal) return;
    const program = getRecommendation();
    setRecommendedProgram(program);
    setShowResult(true);

    // Save to sessionStorage
    sessionStorage.setItem('programFinderResult', JSON.stringify({
      program,
      role,
      experience,
      goal
    }));
  };

  const handleReset = () => {
    setShowResult(false);
    setRecommendedProgram(null);
    setRole('');
    setExperience('');
    setGoal('');
    sessionStorage.removeItem('programFinderResult');
  };

  const isFormValid = role && experience && goal;

  // ============================================
  // FINDER FORM VIEW
  // ============================================
  if (!showResult) {
    return (
      <section
        id="program-finder"
        className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%)',
        }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e0e0e0 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Accent glow - alice blue */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-[900px] mx-auto px-5">
          {/* Header */}
          <div
            className="text-center mb-10 md:mb-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-alice-dark" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-alice-dark font-medium">Find Your Path</span>
              <div className="w-8 h-[2px] bg-alice-dark" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-tight mb-3">
              Discover the Right Program For You
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg text-g500 max-w-xl mx-auto">
              Answer a few quick questions to find your perfect fit
            </p>
          </div>

          {/* Form Card */}
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-g200"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-8">
              {/* Role Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2.5">
                  I&apos;m a
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none bg-g50 border-2 border-g200 rounded-xl px-4 py-3.5 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-accent focus:bg-white
                               transition-all cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Experience Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2.5">
                  With
                </label>
                <div className="relative">
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full appearance-none bg-g50 border-2 border-g200 rounded-xl px-4 py-3.5 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-accent focus:bg-white
                               transition-all cursor-pointer"
                  >
                    {experienceLevels.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Goal Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2.5">
                  I want to
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full appearance-none bg-g50 border-2 border-g200 rounded-xl px-4 py-3.5 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-accent focus:bg-white
                               transition-all cursor-pointer"
                  >
                    {goals.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-semibold text-base
                           transition-all duration-300 ${
                             isFormValid
                               ? 'bg-accent text-white sm:hover:bg-accent-hover shadow-lg shadow-accent/25 sm:hover:shadow-xl sm:hover:shadow-accent/30 sm:hover:-translate-y-0.5'
                               : 'bg-g200 text-g400 cursor-not-allowed'
                           }`}
              >
                Show my program
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // RESULT VIEW (Replaces Form)
  // ============================================
  const program = programs[recommendedProgram!];
  const Illustration = program.illustration;

  return (
    <section
      id="program-finder"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a1420 0%, #142432 50%, #0a1420 100%)',
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="resultGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#resultGrid)" />
        </svg>
      </div>

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[150px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${program.color}15 0%, transparent 70%)` }}
      />

      {/* Accent glow top - alice blue */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[200px] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-5">
        {/* Header */}
        <div
          className="text-center mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <p className="font-body text-base sm:text-lg text-g400">
            Based on your inputs, we recommend
          </p>
        </div>

        {/* Program Card */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Illustration */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 bg-g50 rounded-2xl flex items-center justify-center overflow-hidden border border-g200"
              >
                <div className="w-full h-full p-4">
                  <Illustration />
                </div>
              </div>
              <span
                className="font-heading text-sm font-bold tracking-wider mt-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${program.color}15`, color: program.color }}
              >
                {program.badge}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-carbon mb-2 leading-tight">
                {program.name}
              </h3>
              <p className="font-body text-sm sm:text-base text-g500 mb-6">
                {program.description}
              </p>
              <Button href={program.href} size="md" variant="alice" showArrow>
                See program details
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          className="flex flex-col items-center justify-center gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          <p className="font-body text-sm sm:text-base text-g400">
            Not sure this is right? Let&apos;s talk.
          </p>
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" size="md" showArrow>
            Book a free call
          </Button>
        </div>
      </div>

      {/* Bottom accent line - alice blue */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(74,144,164,0.3) 50%, transparent 100%)' }}
      />
    </section>
  );
}
