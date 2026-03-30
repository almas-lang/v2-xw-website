'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  label: string;
  maxPoints: number;
  questions: {
    id: string;
    question: string;
    labels: [string, string, string];
  }[];
}

export const evaluatorCategories: Category[] = [
  {
    id: 'learn', label: 'How You Learn', maxPoints: 20,
    questions: [
      { id: '1a', question: 'Does learning happen through doing - real projects, real feedback - or primarily through watching recordings and reading content?', labels: ['Mostly watching/reading', 'Mix of both', 'Primarily doing with feedback'] },
      { id: '1b', question: 'Is there a clear structured path (week-by-week, module-by-module) or are you left to navigate a content library on your own schedule?', labels: ['No structure, self-navigate', 'Loose structure', 'Clear week-by-week path'] },
      { id: '1c', question: 'Are the projects you work on real briefs with real constraints, or dummy setups designed just for practice?', labels: ['Dummy only', 'Simulated real', 'Actual real-world briefs'] },
      { id: '1d', question: 'How quickly is your work reviewed and how specific is the feedback?', labels: ['Days later, generic', 'Within 24-48hrs, moderate', 'Same day, specific and actionable'] },
    ],
  },
  {
    id: 'curriculum', label: 'Curriculum Depth', maxPoints: 20,
    questions: [
      { id: '2a', question: 'Does the curriculum go beyond core UX skills (research, wireframing, prototyping) into systemic thinking, stakeholder navigation, and personal brand?', labels: ['Core UX only', 'Some beyond core', 'Full spectrum including maturity + brand'] },
      { id: '2b', question: 'Is AI integrated as a thinking and building tool throughout the curriculum - not as a standalone module or afterthought?', labels: ['Not covered', 'Separate AI module', 'Integrated throughout as a thinking tool'] },
      { id: '2c', question: 'Does the curriculum prepare you for senior-level conversations - strategy, business context, influence - or primarily for senior-level deliverables?', labels: ['Deliverables only', 'Some strategy coverage', 'Full senior conversation preparation'] },
      { id: '2d', question: 'Is the curriculum regularly updated based on what the market and industry actually requires right now?', labels: ['Appears static', 'Updated annually', 'Actively updated by practitioners'] },
    ],
  },
  {
    id: 'accountability', label: 'Accountability & Drive', maxPoints: 15,
    questions: [
      { id: '3a', question: 'How many 1:1 conversations with a dedicated mentor do you get - not group calls with a slot, but actual individual time?', labels: ['None', '1 per month', 'Multiple per month, dedicated'] },
      { id: '3b', question: 'Are there regular group sessions - clinics, peer reviews, presentation practice - where you learn by doing in front of others?', labels: ['No group sessions', 'Occasional', '3-4 times per week, structured'] },
      { id: '3c', question: 'When you are stuck, how quickly can you get help - and from a person, not a content library or chatbot?', labels: ['Days or never', 'Within 24hrs', 'Same day, direct access to mentor'] },
    ],
  },
  {
    id: 'career', label: 'Career Outcome Support', maxPoints: 15,
    questions: [
      { id: '4a', question: 'Does career support extend beyond the curriculum end date, and does it include active positioning - not just resume review?', labels: ['Ends at curriculum', 'Some post-program support', 'Active ongoing career positioning'] },
      { id: '4b', question: 'Are you connected to real hiring managers, recruiters, and design leaders through the program\'s network?', labels: ['No network access', 'Some introductions', 'Direct access to active hiring network'] },
      { id: '4c', question: 'Does the program include portfolio and personal brand building as structured work - or is it left entirely to you?', labels: ['Not included', 'Advised but not structured', 'Structured, reviewed, part of curriculum'] },
    ],
  },
  {
    id: 'mentor', label: 'Mentor Quality', maxPoints: 15,
    questions: [
      { id: '5a', question: 'Are the mentors active practitioners - currently doing design work in the industry - or primarily educators and former designers?', labels: ['Educators only', 'Mix', 'Active practitioners, still shipping'] },
      { id: '5b', question: 'How many students is each mentor personally mentoring simultaneously?', labels: ['30+ per mentor', '10-20 per mentor', 'Fewer than 10, genuine 1:1 depth'] },
      { id: '5c', question: 'Through what medium is mentor access available, and how direct is it?', labels: ['Email/tickets only', 'Group calls with slots', 'Direct access via calls and async channel'] },
    ],
  },
  {
    id: 'cert', label: 'Certification Rigour', maxPoints: 15,
    questions: [
      { id: '6a', question: 'Is there a certification at the end - and is it exam-graded with a minimum pass threshold, or is it a participation certificate?', labels: ['Participation only / none', 'Exam but no threshold', 'Proctored exam, minimum pass threshold'] },
      { id: '6b', question: 'What happens if you fail the certification assessment?', labels: ['Everyone passes / no exam', 'Automatic retry, no consequence', 'Resit required, standard is maintained'] },
      { id: '6c', question: 'Is the certificate backed by named practitioners or employers outside the program that you can independently verify?', labels: ['No external validation', 'Some informal mentions', 'Named practitioners + employers who hired certified designers'] },
    ],
  },
];

export function getInterpretation(total: number): { label: string; color: string; message: string } {
  if (total >= 85) return { label: 'Strong program', color: 'text-green-400', message: 'The structure is right. Scrutinise the specifics - mentor availability, curriculum detail, real student outcomes. But the foundations are solid.' };
  if (total >= 70) return { label: 'Good with gaps', color: 'text-blue-400', message: 'Worth considering. Know what you\'re not getting before you commit. Ask specifically about the categories where you scored them low.' };
  if (total >= 55) return { label: 'Partial fit', color: 'text-yellow-400', message: 'Will help with specific things but unlikely to transform your trajectory. Fine for a focused skill - not for a career shift.' };
  if (total >= 40) return { label: 'Weak program', color: 'text-orange-400', message: 'The marketing is doing more work than the program. Proceed with significant caution or not at all.' };
  return { label: 'Walk away', color: 'text-red-400', message: 'This program is not built for your outcome. The money is better spent elsewhere.' };
}

export function getCTAMessage(total: number): string {
  if (total >= 70) return 'Want to see how this program compares to others? Book a free call with Xperience Wave - we\'ll walk through the scorecard together.';
  if (total >= 55) return 'This program may cover some of what you need. If you want to compare, book a free call with us.';
  return 'This score suggests the program may not deliver what you\'re looking for. Book a free strategy call - we\'ll tell you what to look for instead.';
}

export function calcCategoryScore(category: Category, answers: Record<string, number>): number | null {
  const allAnswered = category.questions.every(q => answers[q.id] !== undefined);
  if (!allAnswered) return null;
  const rawTotal = category.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const maxRaw = category.questions.length * 5;
  return Math.round(((rawTotal / maxRaw) * category.maxPoints) * 10) / 10;
}

// Animated count-up hook
function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

// Calculating progress messages
const calcSteps = [
  'Analysing learning methodology...',
  'Evaluating curriculum depth...',
  'Measuring accountability structure...',
  'Assessing career outcome support...',
  'Reviewing mentor quality...',
  'Checking certification rigour...',
  'Calculating your score...',
];

export default function MentorshipEvaluator() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('e') || '';

  const topRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [phase, setPhase] = useState<'questions' | 'calculating' | 'result'>('questions');
  const [calcStep, setCalcStep] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const categories = evaluatorCategories;
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = categories.every(cat => cat.questions.every(q => answers[q.id] !== undefined));
  const isCategoryComplete = (cat: Category) => cat.questions.every(q => answers[q.id] !== undefined);

  const totalScore = allAnswered
    ? Math.round(categories.reduce((sum, cat) => sum + (calcCategoryScore(cat, answers) ?? 0), 0))
    : null;

  const animatedScore = useCountUp(totalScore ?? 0, 1800, scoreRevealed);

  // Send score email
  const sendScoreEmail = useCallback(async () => {
    if (!userEmail || emailSent || totalScore === null) return;
    setEmailSent(true);
    const interp = getInterpretation(totalScore);
    const breakdown = categories.map(cat => {
      const score = calcCategoryScore(cat, answers);
      return `${cat.label}: ${score} / ${cat.maxPoints}`;
    }).join('\n');

    try {
      await fetch('/api/evaluator-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, totalScore, label: interp.label, message: interp.message, breakdown }),
      });
    } catch {
      // Silent fail - non-critical
    }
  }, [userEmail, emailSent, totalScore, categories, answers]);

  // Calculating animation
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
    // All steps done - show result
    const timer = setTimeout(() => {
      setPhase('result');
      setTimeout(() => {
        scrollToTop();
        setScoreRevealed(true);
      }, 300);
    }, 400);
    return () => clearTimeout(timer);
  }, [phase, calcStep]);

  // Send email once score is revealed
  useEffect(() => {
    if (scoreRevealed && !emailSent) sendScoreEmail();
  }, [scoreRevealed, emailSent, sendScoreEmail]);

  const handleReset = () => {
    setAnswers({});
    setActiveCategory(0);
    setPhase('questions');
    setCalcStep(0);
    setShowBreakdown(false);
    setScoreRevealed(false);
    setEmailSent(false);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToCategory = (idx: number) => {
    setActiveCategory(idx);
    setTimeout(scrollToTop, 50);
  };

  const currentCat = categories[activeCategory];
  const radioOptions = [0, 1, 2, 3, 4, 5];
  const completedCount = categories.filter(c => isCategoryComplete(c)).length;

  // --- CALCULATING PHASE ---
  if (phase === 'calculating') {
    const progress = (calcStep / calcSteps.length) * 100;
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 md:py-32">
        {/* Spinning ring */}
        <div className="relative w-20 h-20 mb-8">
          <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#FF0023" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset={220 - (progress / 100) * 220}
              style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white/60">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step text */}
        <p className="text-base text-white/70 font-medium animate-pulse min-h-[1.5rem]">
          {calcStep < calcSteps.length ? calcSteps[calcStep] : 'Done!'}
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-400 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // --- RESULT PHASE ---
  if (phase === 'result' && totalScore !== null) {
    const interp = getInterpretation(totalScore);
    return (
      <div className="w-full text-center py-6 md:py-8">
        {/* Score reveal with circle */}
        <div className={`mb-6 transition-all duration-1000 ${scoreRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle
                cx="100" cy="100" r="90" fill="none" stroke="#FF0023" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - (animatedScore / 100))}
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl md:text-7xl font-heading font-bold text-white tabular-nums tracking-tight leading-none">
                {animatedScore}
              </p>
              <p className="text-sm text-white/70 mt-1">out of 100</p>
            </div>
          </div>
        </div>

        {/* Label reveal */}
        <div className={`transition-all duration-700 delay-500 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className={`text-2xl md:text-3xl font-heading font-bold mb-4 ${interp.color}`}>
            {interp.label}
          </div>
          <p className="text-base text-white/70 leading-relaxed max-w-lg mx-auto mb-8">
            {interp.message}
          </p>
        </div>

        {/* Breakdown toggle */}
        <div className={`transition-all duration-700 delay-700 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => setShowBreakdown(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/70 transition-colors mb-6"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showBreakdown ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showBreakdown ? 'Hide detailed breakdown' : 'View detailed breakdown'}
          </button>

          {showBreakdown && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto text-left animate-in fade-in slide-in-from-top-2 duration-300">
              {categories.map(cat => {
                const score = calcCategoryScore(cat, answers);
                const pct = score !== null ? (score / cat.maxPoints) * 100 : 0;
                return (
                  <div key={cat.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-xs text-white/60 mb-1">{cat.label}</p>
                    <p className="text-sm font-bold text-white">
                      {score} <span className="text-white/70 font-normal">/ {cat.maxPoints}</span>
                    </p>
                    <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <p className="text-sm text-white/60 mb-5 max-w-md mx-auto">{getCTAMessage(totalScore)}</p>
          <a
            href="https://calendly.com/team-xperiencewave/xw-strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-xl transition-colors shadow-lg shadow-accent/20"
          >
            Book a Free Strategy Call
          </a>

          {userEmail && emailSent && (
            <p className="mt-5 text-xs text-white/20">Score sent to {userEmail}</p>
          )}

          <div className="mt-6">
            <button onClick={handleReset} className="text-sm text-white/60 hover:text-white/70 underline transition-colors">
              Score another program
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTIONS PHASE ---
  return (
    <div className="w-full" ref={topRef}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium">Step {activeCategory + 1} of {categories.length}</span>
          <span className="text-sm text-white/70">{completedCount} / {categories.length} complete</span>
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(idx)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                isCategoryComplete(cat) ? 'bg-green-500' : idx === activeCategory ? 'bg-accent' : 'bg-white/10'
              }`}
              aria-label={`Go to ${cat.label}`}
            />
          ))}
        </div>
      </div>

      {/* Category header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold">
            {activeCategory + 1}
          </span>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white">{currentCat.label}</h2>
        </div>
        <p className="text-sm text-white/60 ml-11">{currentCat.maxPoints} points maximum</p>
      </div>

      {/* Questions */}
      <div className="space-y-10">
        {currentCat.questions.map((q, qIdx) => (
          <div key={q.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 md:p-6">
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
              <span className="text-white/60 font-medium mr-2">{qIdx + 1}.</span>
              {q.question}
            </p>
            <div className="inline-flex flex-col">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                {radioOptions.map(val => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all ${
                      answers[q.id] === val
                        ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/70 hover:border-white/20'
                    }`}
                    aria-label={`Score ${val} for question ${q.id}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/70">
                <span>{q.labels[0]}</span>
                <span className="text-right">{q.labels[2]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-10">
        {/* Category score */}
        {isCategoryComplete(currentCat) && (
          <p className="text-sm font-medium text-white/60 mb-4 text-center">
            {currentCat.label}:{' '}
            <span className="text-accent font-bold">{calcCategoryScore(currentCat, answers)}</span>
            <span className="text-white/70"> / {currentCat.maxPoints}</span>
          </p>
        )}

        {/* Buttons */}
        <div className={`flex gap-3 ${activeCategory === 0 ? 'justify-center' : 'justify-center'}`}>
          {activeCategory > 0 && (
            <button
              onClick={() => goToCategory(activeCategory - 1)}
              className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors"
            >
              Previous
            </button>
          )}
          {activeCategory < categories.length - 1 ? (
            <button
              onClick={() => goToCategory(activeCategory + 1)}
              disabled={!isCategoryComplete(currentCat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isCategoryComplete(currentCat)
                  ? 'text-white bg-accent hover:bg-accent/90'
                  : 'text-white/70 bg-white/5 border border-white/10 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleShowResult}
              disabled={!allAnswered}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                allAnswered
                  ? 'text-white bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20'
                  : 'text-white/70 bg-white/5 border border-white/10 cursor-not-allowed'
              }`}
            >
              See Your Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
