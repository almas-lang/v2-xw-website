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
      { id: '2a', question: 'Does the curriculum go beyond core UX skills (research, wireframing, prototyping) into systemic thinking, stakeholder navigation, and personal brand?', labels: ['Core UX only', 'Some beyond core', 'Full spectrum incl. brand'] },
      { id: '2b', question: 'Is AI integrated as a thinking and building tool throughout the curriculum - not as a standalone module or afterthought?', labels: ['Not covered', 'Separate AI module', 'Integrated throughout'] },
      { id: '2c', question: 'Does the curriculum prepare you for senior-level conversations - strategy, business context, influence - or primarily for senior-level deliverables?', labels: ['Deliverables only', 'Some strategy', 'Full senior preparation'] },
      { id: '2d', question: 'Is the curriculum regularly updated based on what the market and industry actually requires right now?', labels: ['Appears static', 'Updated annually', 'Actively updated'] },
    ],
  },
  {
    id: 'accountability', label: 'Accountability & Drive', maxPoints: 15,
    questions: [
      { id: '3a', question: 'How many 1:1 conversations with a dedicated mentor do you get - not group calls with a slot, but actual individual time?', labels: ['None', '1 per month', 'Multiple per month'] },
      { id: '3b', question: 'Are there regular group sessions - clinics, peer reviews, presentation practice - where you learn by doing in front of others?', labels: ['No group sessions', 'Occasional', '3-4 times per week'] },
      { id: '3c', question: 'When you are stuck, how quickly can you get help - and from a person, not a content library or chatbot?', labels: ['Days or never', 'Within 24hrs', 'Same day, direct access'] },
    ],
  },
  {
    id: 'career', label: 'Career Outcome Support', maxPoints: 15,
    questions: [
      { id: '4a', question: 'Does career support extend beyond the curriculum end date, and does it include active positioning - not just resume review?', labels: ['Ends at curriculum', 'Some post-program', 'Active ongoing positioning'] },
      { id: '4b', question: 'Are you connected to real hiring managers, recruiters, and design leaders through the program\'s network?', labels: ['No network access', 'Some introductions', 'Direct hiring network'] },
      { id: '4c', question: 'Does the program include portfolio and personal brand building as structured work - or is it left entirely to you?', labels: ['Not included', 'Advised, not structured', 'Structured, reviewed'] },
    ],
  },
  {
    id: 'mentor', label: 'Mentor Quality', maxPoints: 15,
    questions: [
      { id: '5a', question: 'Are the mentors active practitioners - currently doing design work in the industry - or primarily educators and former designers?', labels: ['Educators only', 'Mix', 'Active practitioners'] },
      { id: '5b', question: 'How many students is each mentor personally mentoring simultaneously?', labels: ['30+ per mentor', '10-20 per mentor', 'Fewer than 10'] },
      { id: '5c', question: 'Through what medium is mentor access available, and how direct is it?', labels: ['Email/tickets only', 'Group calls with slots', 'Direct calls + async'] },
    ],
  },
  {
    id: 'cert', label: 'Certification Rigour', maxPoints: 15,
    questions: [
      { id: '6a', question: 'Is there a certification at the end - and is it exam-graded with a minimum pass threshold, or is it a participation certificate?', labels: ['Participation only', 'Exam, no threshold', 'Proctored, pass required'] },
      { id: '6b', question: 'What happens if you fail the certification assessment?', labels: ['Everyone passes', 'Auto retry', 'Resit required'] },
      { id: '6c', question: 'Is the certificate backed by named practitioners or employers outside the program that you can independently verify?', labels: ['No validation', 'Informal mentions', 'Named + verified'] },
    ],
  },
];

export function getInterpretation(total: number): { label: string; color: string; message: string } {
  if (total >= 85) return { label: 'Strong program', color: 'text-green-600', message: 'The structure is right. Scrutinise the specifics - mentor availability, curriculum detail, real student outcomes. But the foundations are solid.' };
  if (total >= 70) return { label: 'Good with gaps', color: 'text-blue-600', message: 'Worth considering. Know what you\'re not getting before you commit. Ask specifically about the categories where you scored them low.' };
  if (total >= 55) return { label: 'Partial fit', color: 'text-amber-600', message: 'Will help with specific things but unlikely to transform your trajectory. Fine for a focused skill - not for a career shift.' };
  if (total >= 40) return { label: 'Weak program', color: 'text-orange-600', message: 'The marketing is doing more work than the program. Proceed with significant caution or not at all.' };
  return { label: 'Walk away', color: 'text-red-600', message: 'This program is not built for your outcome. The money is better spent elsewhere.' };
}

export function getCTAMessage(total: number): string {
  if (total >= 70) return 'Want to see how this program compares to others? Book a free call - we\'ll walk through the scorecard together.';
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

  const scrollToTop = () => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const goToCategory = (idx: number) => { setActiveCategory(idx); setTimeout(scrollToTop, 50); };

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
    } catch { /* silent */ }
  }, [userEmail, emailSent, totalScore, categories, answers]);

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
    setCalcStep(0); setShowBreakdown(false); setScoreRevealed(false); setEmailSent(false);
  };

  const currentCat = categories[activeCategory];
  const radioOptions = [0, 1, 2, 3, 4, 5];
  const completedCount = categories.filter(c => isCategoryComplete(c)).length;

  // --- CALCULATING ---
  if (phase === 'calculating') {
    const progress = (calcStep / calcSteps.length) * 100;
    return (
      <div ref={topRef} className="w-full flex flex-col items-center justify-center py-20 md:py-28">
        <div className="relative w-20 h-20 mb-8">
          <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" strokeWidth="4" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#FF0023" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset={220 - (progress / 100) * 220}
              style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-g500">{Math.round(progress)}%</span>
          </div>
        </div>
        <p className="text-base text-g500 font-medium animate-pulse">{calcStep < calcSteps.length ? calcSteps[calcStep] : 'Done!'}</p>
        <div className="w-64 h-1 bg-g200 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-400 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  // --- RESULT ---
  if (phase === 'result' && totalScore !== null) {
    const interp = getInterpretation(totalScore);
    return (
      <div ref={topRef} className="w-full text-center py-6 md:py-8">
        <div className={`mb-4 transition-all duration-1000 ${scoreRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#f0f0f0" strokeWidth="6" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#FF0023" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - (animatedScore / 100))}
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl md:text-7xl font-heading font-bold text-carbon tabular-nums tracking-tight leading-none">{animatedScore}</p>
              <p className="text-sm text-g500 mt-1">out of 100</p>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-500 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className={`text-2xl md:text-3xl font-heading font-bold mb-3 ${interp.color}`}>{interp.label}</div>
          <p className="text-base text-g600 leading-relaxed max-w-lg mx-auto mb-8">{interp.message}</p>
        </div>

        <div className={`transition-all duration-700 delay-700 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button onClick={() => setShowBreakdown(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-g500 hover:text-carbon transition-colors mb-6">
            <svg className={`w-4 h-4 transition-transform duration-200 ${showBreakdown ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showBreakdown ? 'Hide breakdown' : 'View detailed breakdown'}
          </button>

          {showBreakdown && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto text-left">
              {categories.map(cat => {
                const score = calcCategoryScore(cat, answers);
                const pct = score !== null ? (score / cat.maxPoints) * 100 : 0;
                return (
                  <div key={cat.id} className="bg-g100/50 border border-g200 rounded-xl p-4">
                    <p className="text-xs text-g500 mb-1">{cat.label}</p>
                    <p className="text-sm font-bold text-carbon">{score} <span className="text-g400 font-normal">/ {cat.maxPoints}</span></p>
                    <div className="mt-2 h-1.5 bg-g200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-sm text-g500 mb-5 max-w-md mx-auto">{getCTAMessage(totalScore)}</p>
          <a href="https://calendly.com/team-xperiencewave/xw-strategy" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-xl transition-colors">
            Book a Free Strategy Call
          </a>

          {userEmail && emailSent && (
            <p className="mt-5 text-xs text-g400">Score sent to {userEmail}</p>
          )}
          <div className="mt-5">
            <button onClick={handleReset} className="text-sm text-g500 hover:text-carbon underline transition-colors">Score another program</button>
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
          <span className="text-sm text-g500 font-medium">Step {activeCategory + 1} of {categories.length}</span>
          <span className="text-sm text-g500">{completedCount} / {categories.length} complete</span>
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat, idx) => (
            <button key={cat.id} onClick={() => goToCategory(idx)}
              className={`h-1.5 flex-1 rounded-full transition-all ${isCategoryComplete(cat) ? 'bg-green-500' : idx === activeCategory ? 'bg-accent' : 'bg-g200'}`}
              aria-label={`Go to ${cat.label}`} />
          ))}
        </div>
      </div>

      {/* Category header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold">{activeCategory + 1}</span>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-carbon">{currentCat.label}</h2>
        </div>
        <p className="text-sm text-g500 ml-11">{currentCat.maxPoints} points maximum</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentCat.questions.map((q, qIdx) => (
          <div key={q.id} className="border border-g200 rounded-xl p-5 md:p-6">
            <p className="text-base md:text-lg text-carbon leading-relaxed mb-5">
              <span className="text-g400 font-medium mr-2">{qIdx + 1}.</span>{q.question}
            </p>
            <div className="inline-flex flex-col">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                {radioOptions.map(val => (
                  <button key={val} onClick={() => handleAnswer(q.id, val)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all ${
                      answers[q.id] === val
                        ? 'bg-accent text-white shadow-lg shadow-accent/20 scale-105'
                        : 'bg-g100 border border-g200 text-g500 hover:bg-g200 hover:text-carbon'
                    }`}
                    aria-label={`Score ${val} for question ${q.id}`}>{val}</button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-g500">
                <span>{q.labels[0]}</span>
                <span className="text-right">{q.labels[2]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        {isCategoryComplete(currentCat) && (
          <p className="text-sm font-medium text-g600 mb-4 text-center">
            {currentCat.label}: <span className="text-accent font-bold">{calcCategoryScore(currentCat, answers)}</span>
            <span className="text-g400"> / {currentCat.maxPoints}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          {activeCategory > 0 && (
            <button onClick={() => goToCategory(activeCategory - 1)}
              className="px-5 py-2.5 text-sm font-medium text-g600 hover:text-carbon bg-g100 border border-g200 hover:bg-g200 rounded-xl transition-colors">
              Previous
            </button>
          )}
          {activeCategory < categories.length - 1 ? (
            <button onClick={() => goToCategory(activeCategory + 1)}
              disabled={!isCategoryComplete(currentCat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isCategoryComplete(currentCat)
                  ? 'text-white bg-accent hover:bg-accent/90'
                  : 'text-g400 bg-g100 border border-g200 cursor-not-allowed'
              }`}>
              Next
            </button>
          ) : (
            <button onClick={handleShowResult} disabled={!allAnswered}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                allAnswered
                  ? 'text-white bg-accent hover:bg-accent/90'
                  : 'text-g400 bg-g100 border border-g200 cursor-not-allowed'
              }`}>
              See Your Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
