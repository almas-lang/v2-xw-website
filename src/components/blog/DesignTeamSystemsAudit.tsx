'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  label: string;
  symptom: string;
  maxPoints: number;
  questions: {
    id: string;
    question: string;
  }[];
}

export const auditCategories: Category[] = [
  {
    id: 'review', label: 'Design Review Cadence', symptom: 'Inconsistent design quality', maxPoints: 20,
    questions: [
      { id: '1a', question: 'Our design team has a recurring, structured design review session (not ad hoc or optional).' },
      { id: '1b', question: 'Design work is reviewed against explicit criteria (not just "I like it") before being handed to engineering.' },
      { id: '1c', question: 'Peer feedback is a regular part of how designers on our team improve each other\'s work.' },
      { id: '1d', question: 'There is a shared understanding of what "design quality" means on our team - documented, not assumed.' },
    ],
  },
  {
    id: 'stakeholder', label: 'Stakeholder Integration', symptom: 'Designers are not strategic', maxPoints: 20,
    questions: [
      { id: '2a', question: 'Design is involved in defining the problem before briefs are finalised - not just executing after.' },
      { id: '2b', question: 'There is a defined moment in our process where design contributes to scoping and prioritisation.' },
      { id: '2c', question: 'Design has documented authority to question a brief or propose an alternative approach.' },
      { id: '2d', question: 'Joint reviews between design and engineering happen before handoff, not after the build has started.' },
    ],
  },
  {
    id: 'roles', label: 'Role Clarity', symptom: 'Role confusion and accountability gaps', maxPoints: 20,
    questions: [
      { id: '3a', question: 'We have written role definitions for IC, Lead, and Manager that the team has seen and understands.' },
      { id: '3b', question: 'Each person on the design team can clearly state what they own vs. what their lead/manager owns.' },
      { id: '3c', question: 'When a design decision needs a final call, it is clear who has that authority.' },
      { id: '3d', question: 'Our design manager spends the majority of their time on team development, stakeholder management, and strategy - not individual design work.' },
    ],
  },
  {
    id: 'maturity', label: 'Design Maturity Roadmap', symptom: 'Design not taken seriously by leadership', maxPoints: 20,
    questions: [
      { id: '4a', question: 'We have assessed our organisation\'s design maturity level (using a model like NNG\'s or similar).' },
      { id: '4b', question: 'There is a documented plan to improve design maturity over the next 6-12 months.' },
      { id: '4c', question: 'Our research practice informs decisions (exploratory research), not just validates decisions already made.' },
      { id: '4d', question: 'Senior leadership (VP/C-level) can articulate what design contributes beyond visual output.' },
    ],
  },
  {
    id: 'growth', label: 'Feedback & Growth System', symptom: 'Senior designer attrition and stagnation', maxPoints: 20,
    questions: [
      { id: '5a', question: 'Each designer has a documented career progression path with specific criteria for the next level.' },
      { id: '5b', question: 'Development conversations happen at least quarterly and focus on growth - not status updates.' },
      { id: '5c', question: 'There is a competency framework that defines what skills are expected at each seniority level.' },
      { id: '5d', question: 'Designers on our team feel recognised for their contributions through a structured recognition system (not just informal praise).' },
    ],
  },
];

const likertLabels = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

const dimensionRecommendations: Record<string, string> = {
  review: 'Your team\'s quality inconsistency is a review system problem, not a talent problem. Without a structured, recurring design review with explicit criteria, every designer operates as an island. The fix is a 30-45 minute weekly review with rotating presenters and documented quality standards. This is the fastest system to implement and typically shows impact within one sprint cycle.',
  stakeholder: 'Your designers are not being strategic because the system does not ask them to be. Design enters the process after the strategy is decided - there is nothing left to be strategic about. The fix requires moving design upstream: into problem definition, scoping, and prioritisation. This is an organisational change, not a training exercise, and it requires buy-in from product and engineering leadership.',
  roles: 'Your team has accountability gaps because roles are not defined. ICs are doing lead work without the title. Leads are doing IC work because it is comfortable. Managers are pass-throughs. Written role definitions - what each level owns, where responsibilities overlap, and who has the final call - are the foundation. Without them, every other system operates on ambiguity.',
  maturity: 'Design is not being taken seriously because the organisation has no plan for design to mature. The team operates at whatever maturity level the company defaults to - which is usually "make it look good." A maturity assessment followed by a 6-12 month roadmap that addresses research infrastructure, stakeholder education, and process definition will change how leadership perceives design.',
  growth: 'You are losing senior designers because they cannot see a growth path. A career progression framework, quarterly development conversations, and a competency model that defines what each level requires are the minimum. If the system does not develop people, the people will find a system that does.',
};

function getDimensionLabel(score: number): string {
  if (score >= 17) return 'Strong';
  if (score >= 13) return 'Developing';
  if (score >= 9) return 'Fragile';
  return 'Missing';
}

export function getMaturityLabel(total: number): { label: string; color: string; message: string } {
  if (total >= 85) return { label: 'Design-Led', color: 'text-green-400', message: 'Your systems are strong. Focus on scaling and optimising. You are in the top 10% of design organisations.' };
  if (total >= 70) return { label: 'Structured', color: 'text-blue-400', message: 'Most systems exist. Specific gaps need targeted intervention. High ROI from focused training.' };
  if (total >= 55) return { label: 'Emerging', color: 'text-yellow-400', message: 'Some systems in place, but significant gaps. Your team\'s output does not match their talent. This is the most common score.' };
  if (total >= 40) return { label: 'Reactive', color: 'text-orange-400', message: 'Systems are mostly missing. Design operates as a production function, not a strategic partner. The team is likely frustrated and attrition is a risk.' };
  return { label: 'Absent', color: 'text-red-400', message: 'No design systems exist. The team is producing output in a vacuum. Rebuilding requires foundational intervention.' };
}

export function calcCategoryScore(category: Category, answers: Record<string, number>): number | null {
  const allAnswered = category.questions.every(q => answers[q.id] !== undefined);
  if (!allAnswered) return null;
  return category.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

const calcSteps = [
  'Analysing design review cadence...',
  'Evaluating stakeholder integration...',
  'Measuring role clarity...',
  'Assessing design maturity...',
  'Reviewing feedback & growth systems...',
  'Calculating your score...',
];

export default function DesignTeamSystemsAudit() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('e') || '';
  const topRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [phase, setPhase] = useState<'questions' | 'calculating' | 'result'>('questions');
  const [calcStep, setCalcStep] = useState(0);
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const categories = auditCategories;
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = categories.every(cat => cat.questions.every(q => answers[q.id] !== undefined));
  const isCategoryComplete = (cat: Category) => cat.questions.every(q => answers[q.id] !== undefined);
  const totalScore = allAnswered
    ? categories.reduce((sum, cat) => sum + (calcCategoryScore(cat, answers) ?? 0), 0)
    : null;
  const animatedScore = useCountUp(totalScore ?? 0, 1800, scoreRevealed);

  const scrollToTop = () => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const goToCategory = (idx: number) => { setActiveCategory(idx); setTimeout(scrollToTop, 50); };

  // Find weakest dimension
  const getWeakestDimension = () => {
    let weakest = categories[0];
    let lowestScore = Infinity;
    for (const cat of categories) {
      const score = calcCategoryScore(cat, answers) ?? 0;
      if (score < lowestScore) {
        lowestScore = score;
        weakest = cat;
      }
    }
    return weakest;
  };

  const sendScoreEmail = useCallback(async () => {
    if (!userEmail || emailSent || totalScore === null) return;
    setEmailSent(true);
    const maturity = getMaturityLabel(totalScore);
    const weakest = getWeakestDimension();
    const breakdown = categories.map(cat => {
      const score = calcCategoryScore(cat, answers);
      return `${cat.label}: ${score} / ${cat.maxPoints}`;
    }).join('\n');
    try {
      await fetch('/api/evaluator-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          totalScore,
          label: maturity.label,
          message: maturity.message,
          breakdown,
          toolName: 'Design Team Systems Audit',
          weakestDimension: weakest.label,
        }),
      });
    } catch { /* silent */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, emailSent, totalScore, answers]);

  const handleShowResult = () => {
    if (!allAnswered) return;
    setPhase('calculating');
    setCalcStep(0);
    scrollToTop();
  };

  useEffect(() => {
    if (phase !== 'calculating') return;
    if (calcStep < calcSteps.length) {
      const timer = setTimeout(() => setCalcStep(prev => prev + 1), 450);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setPhase('result');
      setTimeout(() => { scrollToTop(); setScoreRevealed(true); }, 300);
    }, 400);
    return () => clearTimeout(timer);
  }, [phase, calcStep]);

  useEffect(() => {
    if (scoreRevealed && !emailSent) sendScoreEmail();
  }, [scoreRevealed, emailSent, sendScoreEmail]);

  const handleReset = () => {
    setAnswers({}); setActiveCategory(0); setPhase('questions');
    setCalcStep(0); setScoreRevealed(false); setEmailSent(false);
  };

  const currentCat = categories[activeCategory];
  const completedCount = categories.filter(c => isCategoryComplete(c)).length;

  // --- CALCULATING ---
  if (phase === 'calculating') {
    const progress = (calcStep / calcSteps.length) * 100;
    return (
      <div ref={topRef} className="w-full flex flex-col items-center justify-center py-20 md:py-28">
        <div className="relative w-20 h-20 mb-8">
          <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#FF0023" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset={220 - (progress / 100) * 220}
              style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white/70">{Math.round(progress)}%</span>
          </div>
        </div>
        <p className="text-base text-white/70 font-medium animate-pulse">{calcStep < calcSteps.length ? calcSteps[calcStep] : 'Done!'}</p>
        <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-400 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  // --- RESULT ---
  if (phase === 'result' && totalScore !== null) {
    const maturity = getMaturityLabel(totalScore);
    const weakest = getWeakestDimension();

    return (
      <div ref={topRef} className="w-full text-center py-6 md:py-8">
        {/* Score circle */}
        <div className={`mb-4 transition-all duration-1000 ${scoreRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#FF0023" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - (animatedScore / 100))}
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl md:text-7xl font-heading font-bold text-white tabular-nums tracking-tight leading-none">{animatedScore}</p>
              <p className="text-sm text-white/50 mt-1">out of 100</p>
            </div>
          </div>
        </div>

        {/* Maturity label */}
        <div className={`transition-all duration-700 delay-500 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className={`text-2xl md:text-3xl font-heading font-bold mb-3 ${maturity.color}`}>{maturity.label}</div>
          <p className="text-base text-white/70 leading-relaxed max-w-lg mx-auto mb-8">{maturity.message}</p>
        </div>

        {/* Dimension bars */}
        <div className={`transition-all duration-700 delay-700 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-lg mx-auto space-y-3 mb-6 text-left">
            {categories.map(cat => {
              const score = calcCategoryScore(cat, answers) ?? 0;
              const pct = (score / cat.maxPoints) * 100;
              const isWeakest = cat.id === weakest.id;
              return (
                <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">
                      {cat.label}
                      {isWeakest && <span className="ml-2 text-[10px] text-accent font-medium">Weakest</span>}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-white">{score}</span>
                      <span className="text-white/40"> / {cat.maxPoints}</span>
                    </p>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toggle for details */}
          <button onClick={() => setShowDetails(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6">
            <svg className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showDetails ? 'Hide details' : 'View detailed breakdown'}
          </button>

          {showDetails && (
            <div className="max-w-lg mx-auto space-y-4 mb-8 text-left">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(cat => {
                  const score = calcCategoryScore(cat, answers) ?? 0;
                  return (
                    <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-xs text-white/60 mb-1">{cat.label}</p>
                      <p className="text-sm font-bold text-white">{getDimensionLabel(score)}</p>
                      <p className="text-xs text-white/40 mt-0.5">{cat.symptom}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Priority: {weakest.label}</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {dimensionRecommendations[weakest.id]}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <p className="text-sm text-white/60 mb-5 max-w-md mx-auto">
            Want to fix this? Book a training call. We&apos;ll review your audit results and recommend a plan.
          </p>
          <a href="https://calendly.com/team-xperiencewave/xw-strategy" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-xl transition-colors">
            Book a Training Call
          </a>

          {userEmail && emailSent && (
            <p className="mt-5 text-xs text-white/50">Score sent to {userEmail}</p>
          )}
          <div className="mt-5">
            <button onClick={handleReset} className="text-sm text-white/60 hover:text-white underline transition-colors">Score another team</button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTIONS ---
  return (
    <div className="w-full" ref={topRef}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60 font-medium">{currentCat.label} - Question {categories.slice(0, activeCategory).reduce((sum, c) => sum + c.questions.length, 0) + 1}-{categories.slice(0, activeCategory + 1).reduce((sum, c) => sum + c.questions.length, 0)} of 20</span>
          <span className="text-sm text-white/60">{completedCount} / {categories.length} complete</span>
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat, idx) => (
            <button key={cat.id} onClick={() => goToCategory(idx)}
              className={`h-1.5 flex-1 rounded-full transition-all ${isCategoryComplete(cat) ? 'bg-green-500' : idx === activeCategory ? 'bg-accent' : 'bg-white/10'}`}
              aria-label={`Go to ${cat.label}`} />
          ))}
        </div>
      </div>

      {/* Category header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-bold">{activeCategory + 1}</span>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white">{currentCat.label}</h2>
        </div>
        <p className="text-sm text-white/50 ml-11">Symptom: {currentCat.symptom}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentCat.questions.map((q, qIdx) => (
          <div key={q.id} className="border border-white/10 rounded-xl p-5 md:p-6">
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-5">
              <span className="text-white/40 font-medium mr-2">{qIdx + 1}.</span>{q.question}
            </p>
            <div className="inline-flex flex-col">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button key={val} onClick={() => handleAnswer(q.id, val)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all ${
                      answers[q.id] === val
                        ? 'bg-accent text-white shadow-lg shadow-accent/25 scale-105'
                        : 'bg-white/5 border border-white/15 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25'
                    }`}
                    aria-label={`${likertLabels[val]}`}>{val}</button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/50 px-1">
                <span>Strongly Disagree</span>
                <span className="text-right">Strongly Agree</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        {isCategoryComplete(currentCat) && (
          <p className="text-sm font-medium text-white/70 mb-4 text-center">
            {currentCat.label}: <span className="text-accent font-bold">{calcCategoryScore(currentCat, answers)}</span>
            <span className="text-white/40"> / {currentCat.maxPoints}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          {activeCategory > 0 && (
            <button onClick={() => goToCategory(activeCategory - 1)}
              className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white bg-white/5 border border-white/15 hover:bg-white/10 rounded-xl transition-colors">
              Previous
            </button>
          )}
          {activeCategory < categories.length - 1 ? (
            <button onClick={() => goToCategory(activeCategory + 1)}
              disabled={!isCategoryComplete(currentCat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isCategoryComplete(currentCat)
                  ? 'text-white bg-accent hover:bg-accent/90'
                  : 'text-white/30 bg-white/5 border border-white/10 cursor-not-allowed'
              }`}>
              Next
            </button>
          ) : (
            <button onClick={handleShowResult} disabled={!allAnswered}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                allAnswered
                  ? 'text-white bg-accent hover:bg-accent/90'
                  : 'text-white/30 bg-white/5 border border-white/10 cursor-not-allowed'
              }`}>
              Get Your Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
