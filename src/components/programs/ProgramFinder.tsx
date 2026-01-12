'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Water-themed illustrations - darker version for white backgrounds
const CurrentWaveIllustration = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="currentGradientFinder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="currentGradient2Finder" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path
      d="M-20,100 Q30,60 80,100 T180,100 T280,100"
      fill="none"
      stroke="url(#currentGradientFinder)"
      strokeWidth="3"
    />
    <path
      d="M-20,120 Q30,80 80,120 T180,120 T280,120"
      fill="none"
      stroke="url(#currentGradientFinder)"
      strokeWidth="2.5"
      strokeOpacity="0.7"
    />
    <path
      d="M-20,140 Q30,100 80,140 T180,140 T280,140"
      fill="none"
      stroke="url(#currentGradientFinder)"
      strokeWidth="2"
      strokeOpacity="0.5"
    />
    <path
      d="M0,180 Q50,130 100,150 T200,140 L200,200 L0,200 Z"
      fill="url(#currentGradient2Finder)"
    />
    <circle cx="40" cy="90" r="3" fill="#3B82F6" opacity="0.8" />
    <circle cx="100" cy="110" r="2" fill="#6366F1" opacity="0.7" />
    <circle cx="160" cy="95" r="2.5" fill="#8B5CF6" opacity="0.6" />
  </svg>
);

const RippleIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="rippleGradientFinder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="6" fill="url(#rippleGradientFinder)" />
    <circle cx="60" cy="60" r="18" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.8" />
    <circle cx="60" cy="60" r="32" fill="none" stroke="#6366F1" strokeWidth="1.5" opacity="0.5" />
    <circle cx="60" cy="60" r="46" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
    <circle cx="60" cy="48" r="2" fill="#3B82F6" opacity="0.7" />
    <circle cx="72" cy="55" r="1.5" fill="#6366F1" opacity="0.5" />
  </svg>
);

const TideIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="tideGradientFinder" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <path d="M0,120 L0,70 Q30,60 60,70 T120,65 L120,120 Z" fill="url(#tideGradientFinder)" />
    <path d="M0,75 Q15,65 30,72 T60,68 T90,72 T120,68" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60,50 L60,25" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M52,33 L60,25 L68,33" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    <circle cx="30" cy="58" r="2" fill="#3B82F6" opacity="0.6" />
    <circle cx="90" cy="55" r="1.5" fill="#8B5CF6" opacity="0.5" />
  </svg>
);

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
}

const programs: Record<Exclude<ProgramType, null>, Program> = {
  starter: {
    id: 'starter',
    badge: 'RIPPLE',
    name: 'Start your UX/UI Career',
    description: 'For fresh graduates or career switchers from any background',
    href: '/programs/ripple',
    illustration: RippleIllustration,
  },
  current: {
    id: 'current',
    badge: 'CURRENT',
    name: 'Senior Mentorship',
    description: 'For serious mid-level designers ready for senior & lead roles',
    href: '/programs/current',
    illustration: CurrentWaveIllustration,
  },
  accelerator: {
    id: 'accelerator',
    badge: 'TIDE',
    name: 'Design Leadership',
    description: 'For the ones ready to lead/manage teams and drive influence',
    href: '/programs/tide',
    illustration: TideIllustration,
  },
};

export default function ProgramFinder() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendedProgram, setRecommendedProgram] = useState<ProgramType>(null);
  const [showResult, setShowResult] = useState(false);

  const getRecommendation = (): ProgramType => {
    // Simple logic to determine program based on experience and goals
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

    // Scroll to result
    setTimeout(() => {
      document.getElementById('program-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isFormValid = role && experience && goal;

  return (
    <>
      {/* Program Finder Section */}
      <section
        id="program-finder"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F5F5F0 0%, #FAFAF8 50%, #F0F0EB 100%)',
        }}
      >
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div
            className="absolute top-0 right-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                #18181B 40px,
                #18181B 41px
              )`,
            }}
          />
        </div>

        <div className="max-w-[900px] mx-auto px-5 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-bold text-carbon tracking-tight mb-4">
              Discover the Right Program For You
            </h2>
            <p className="font-body text-base md:text-lg text-g600">
              Answer a few quick questions to find your fit
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-6 md:p-10 shadow-lg border border-g200" style={{ borderRadius: '6px' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              {/* Role Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2">
                  I&apos;m a
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none bg-white border border-g200 px-4 py-3 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-carbon focus:ring-1 focus:ring-carbon
                               transition-all cursor-pointer"
                    style={{ borderRadius: '6px' }}
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Experience Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2">
                  With
                </label>
                <div className="relative">
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full appearance-none bg-white border border-g200 px-4 py-3 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-carbon focus:ring-1 focus:ring-carbon
                               transition-all cursor-pointer"
                    style={{ borderRadius: '6px' }}
                  >
                    {experienceLevels.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Goal Select */}
              <div>
                <label className="block font-heading text-sm font-semibold text-carbon mb-2">
                  I want to
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full appearance-none bg-white border border-g200 px-4 py-3 pr-10 font-body text-base text-carbon
                               focus:outline-none focus:border-carbon focus:ring-1 focus:ring-carbon
                               transition-all cursor-pointer"
                    style={{ borderRadius: '6px' }}
                  >
                    {goals.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g500">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                className={`inline-flex items-center justify-center px-8 py-3.5 font-heading font-semibold text-base
                           transition-all duration-300 ${
                             isFormValid
                               ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30'
                               : 'bg-g200 text-g400 cursor-not-allowed'
                           }`}
                style={{ borderRadius: '6px' }}
              >
                Show my program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {showResult && recommendedProgram && (
        <section
          id="program-result"
          className="relative py-16 md:py-20 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a1f 0%, #2d2d35 50%, #1a1a1f 100%)',
          }}
        >
          {/* Diagonal stripe accent */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, #ffffff 40%, #ffffff 42%, transparent 42%)',
            }}
          />

          <div className="max-w-[800px] mx-auto px-5 relative z-10">
            {/* Label */}
            <p className="font-body text-base text-g400 text-center mb-6">
              Based on your inputs, we recommend
            </p>

            {/* Program Card - White background */}
            <div
              className="bg-white p-6 md:p-8 shadow-2xl border border-g200 mb-8"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Illustration */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 bg-g50 flex items-center justify-center overflow-hidden border border-g200"
                    style={{ borderRadius: '6px' }}
                  >
                    <div className="w-full h-full p-3">
                      {(() => {
                        const Illustration = programs[recommendedProgram].illustration;
                        return <Illustration />;
                      })()}
                    </div>
                  </div>
                  <span className="font-heading text-sm font-bold text-carbon tracking-wider mt-3">
                    {programs[recommendedProgram].badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-2">
                    {programs[recommendedProgram].badge} - {programs[recommendedProgram].name}
                  </h3>
                  <p className="font-body text-base text-g600">
                    {programs[recommendedProgram].description}
                  </p>
                </div>

                {/* CTA */}
                <Button href={programs[recommendedProgram].href} size="sm" showArrow>
                  See program details
                </Button>
              </div>
            </div>

            {/* Alternative CTA */}
            <div className="text-center">
              <p className="font-body text-base text-g400 mb-4">
                Not sure this is right? To discuss your situation
              </p>
              <Button href="#book-call" variant="ghost" size="sm">
                Book a free strategy call
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
