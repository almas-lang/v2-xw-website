'use client';

import { useState, useEffect, useRef } from 'react';

type Mode = 'exploratory' | 'evaluative';

interface AssessmentQuestion {
  id: string;
  title: string;
  prompt: string;
  options: { mode: Mode; text: string }[];
}

// Option order follows the assessment spec: the exploratory/evaluative position
// varies per question so people can't pattern-click one side.
const questions: AssessmentQuestion[] = [
  {
    id: 'q1',
    title: 'Project Kickoff',
    prompt: 'You\'ve been assigned a new project in a domain you haven\'t worked in before. The deadline is 8 weeks. What do you do first?',
    options: [
      { mode: 'exploratory', text: 'Spend the first week talking to users, reading documentation, and understanding the problem space before opening any design tool.' },
      { mode: 'evaluative', text: 'Sketch a rough solution based on what you know, build a quick prototype, and test it with 3 users within the first week to learn what you\'re missing.' },
    ],
  },
  {
    id: 'q2',
    title: 'Stakeholder Disagreement',
    prompt: 'Two stakeholders disagree on what the main user problem is. You don\'t have data to settle it. What do you do?',
    options: [
      { mode: 'evaluative', text: 'Pick the more plausible one, design a quick test for it, and let the data from the test settle the disagreement.' },
      { mode: 'exploratory', text: 'Pause, run 5 user interviews to understand the problem space better, and come back with evidence that clarifies which problem is real.' },
    ],
  },
  {
    id: 'q3',
    title: 'The PM Wants It Yesterday',
    prompt: 'The PM says the feature needs to ship this sprint. You haven\'t done any user research on this feature. What do you do?',
    options: [
      { mode: 'exploratory', text: 'Push back. Request at least 3 days for quick research before design begins. Explain the risk of shipping without understanding.' },
      { mode: 'evaluative', text: 'Design based on your best judgment, ship it with analytics tracking enabled, and plan to iterate based on what the data shows post-launch.' },
    ],
  },
  {
    id: 'q4',
    title: 'First Version',
    prompt: 'You\'re designing the first version of a new feature. How much fidelity do you aim for?',
    options: [
      { mode: 'evaluative', text: 'Low fidelity. Get the concept in front of users as fast as possible. Polish comes after validation.' },
      { mode: 'exploratory', text: 'Medium-high fidelity. If users are going to evaluate it, it needs to be realistic enough that their reactions are meaningful.' },
    ],
  },
  {
    id: 'q5',
    title: 'Research Findings',
    prompt: 'Your research revealed something unexpected that contradicts the project brief. What do you do?',
    options: [
      { mode: 'exploratory', text: 'Pause the current direction and dig deeper into the finding. Validate it with more data, and if it holds, go back to the stakeholders and reframe the project.' },
      { mode: 'evaluative', text: 'Note it, adjust the design direction slightly, ship the adjusted version, and use post-launch data to confirm or deny the finding.' },
    ],
  },
  {
    id: 'q6',
    title: 'Competitor Move',
    prompt: 'A competitor just launched a feature similar to what you\'re building. Your version is 60% done. What do you do?',
    options: [
      { mode: 'evaluative', text: 'Accelerate and ship what you have now. Get to market before them and differentiate through iteration speed.' },
      { mode: 'exploratory', text: 'Study the competitor\'s version carefully. Identify where they got it wrong. Use that insight to make your version better, even if it takes longer.' },
    ],
  },
  {
    id: 'q7',
    title: 'Usability Test Results',
    prompt: 'You ran a usability test. 3 out of 5 users completed the task successfully. What\'s your next move?',
    options: [
      { mode: 'exploratory', text: 'Investigate why 2 failed. Dig into the qualitative data. Understand the root cause before redesigning.' },
      { mode: 'evaluative', text: 'Make quick fixes based on what you observed, retest with 5 new users, and see if the success rate improves.' },
    ],
  },
  {
    id: 'q8',
    title: 'Design Review Feedback',
    prompt: 'In a design review, a senior stakeholder says "I think users will find this confusing." You disagree based on your understanding of users. What do you do?',
    options: [
      { mode: 'evaluative', text: 'Ship it as designed but add tracking to measure confusion (error rates, support tickets, drop-off). Let data settle the disagreement.' },
      { mode: 'exploratory', text: 'Run a quick usability test with 3-5 users before shipping. If they\'re not confused, present the evidence to the stakeholder. If they are, redesign.' },
    ],
  },
  {
    id: 'q9',
    title: 'Time Pressure',
    prompt: 'You have 2 weeks left in the project. You\'ve identified 3 usability issues. You only have time to fix 2. How do you decide?',
    options: [
      { mode: 'exploratory', text: 'Assess severity through a structured heuristic evaluation. Fix the two with the highest severity rating and document the third for the next cycle.' },
      { mode: 'evaluative', text: 'Fix the easiest one first to get a quick win, then tackle whichever of the remaining two would affect the most users based on your analytics data.' },
    ],
  },
  {
    id: 'q10',
    title: 'Personal Philosophy',
    prompt: 'Which statement feels more true to you?',
    options: [
      { mode: 'exploratory', text: '"If you spend enough time understanding the problem, the solution becomes obvious and the rework is minimal."' },
      { mode: 'evaluative', text: '"You can\'t fully understand a problem until you\'ve put a solution in front of users. The product teaches you what the research couldn\'t."' },
    ],
  },
];

interface Profile {
  key: string;
  name: string;
  headline: string;
  strengths: string;
  blindSpots: string;
  develop: string;
  bestEnvironment?: string;
  challengeEnvironment?: string;
}

const profiles: Record<string, Profile> = {
  strongExploratory: {
    key: 'strongExploratory',
    name: 'Strong Exploratory Default',
    headline: 'You\'re an explorer. You go deep before you build.',
    strengths: 'You rarely build the wrong thing. Your solutions are grounded in genuine understanding. When you ship, rework is minimal cos you\'ve already accounted for the edge cases, the user context, and the real problem underneath the surface request.',
    blindSpots: 'You can over-research. The 95% confidence you\'re chasing costs disproportionate time, and the last 25% often changes once real users touch the product anyway. In fast-moving markets, your thoroughness can become a competitive disadvantage. Teams waiting on your research may lose patience and make decisions without you.',
    develop: 'Set a hard deadline for when research ends and building begins, even if it feels premature. Ship something at 70% confidence. Track what the remaining 30% actually costs you when you skip it. It\'s usually less than you fear.',
    bestEnvironment: 'Regulated industries (healthcare, finance, aerospace), complex enterprise products, high-stakes decision interfaces, research-heavy organisations.',
    challengeEnvironment: 'Fast-moving startups, consumer products with weekly release cycles, competitive markets where speed-to-market is survival.',
  },
  exploratoryLeaning: {
    key: 'exploratoryLeaning',
    name: 'Exploratory-Leaning',
    headline: 'You lean toward depth but you can flex when pushed.',
    strengths: 'Your default is to understand before building, which produces solid work. But you\'ve shown some comfort with shipping before you feel fully ready. You can operate in evaluative mode when the situation demands it, though it probably doesn\'t feel natural.',
    blindSpots: 'Under pressure, you may compromise your depth without fully committing to the evaluative approach, ending up in a middle ground that has neither the thoroughness of exploration nor the speed of evaluation. Pick a mode and commit.',
    develop: 'Practice the evaluative mode deliberately on low-stakes decisions. Not every design choice needs a research foundation. Build the muscle of shipping and learning from market feedback.',
  },
  balanced: {
    key: 'balanced',
    name: 'Balanced / Context-Switcher',
    headline: 'You read the room and adapt. That\'s senior-level thinking.',
    strengths: 'You don\'t default rigidly to either mode. You assess the situation, the risk, the timeline, the stage, the stakes, and choose your approach based on what the context requires. This is the profile most associated with senior and lead designers.',
    blindSpots: 'Flexibility can become indecisiveness. If you\'re switching modes too frequently within a single project, the team might not know what to expect from you. Make your mode switches explicit: "We\'re going deep on this decision. We\'re going fast on that one."',
    develop: 'Focus on making your switching more deliberate and communicating it clearly to your team. The mode you choose should be visible to everyone, not just running in your head.',
  },
  evaluativeLeaning: {
    key: 'evaluativeLeaning',
    name: 'Evaluative-Leaning',
    headline: 'You lean toward action but you can slow down when the stakes are high.',
    strengths: 'Your default is to ship and learn, which keeps your team moving and generates market intelligence quickly. But you\'ve shown willingness to go deep when the situation calls for it, even if slowing down feels uncomfortable.',
    blindSpots: 'Under pressure, you may default to speed even on high-stakes decisions where depth was needed. Your "ship and learn" instinct might lead you to iterate on the wrong problem rather than stepping back to redefine it.',
    develop: 'Before starting any project, assess: "If I get this wrong on the first try, what\'s the cost?" If the cost is high (safety, regulatory, irreversible), force yourself into exploratory mode for at least the problem definition stage.',
  },
  strongEvaluative: {
    key: 'strongEvaluative',
    name: 'Strong Evaluative Default',
    headline: 'You learn by shipping. The market is your research lab.',
    strengths: 'You generate market intelligence faster than anyone. Your iterative approach produces products that are battle-tested by real users, not just validated by research participants. You keep teams moving when others might stall in analysis.',
    blindSpots: 'You might iterate your way to a beautifully refined solution to the wrong problem. Your speed can make exploratory designers feel dismissed, which creates team friction. And in high-stakes contexts (medical, financial, industrial), your "ship and see" approach can be genuinely dangerous.',
    develop: 'Before your next project, spend two days doing nothing but understanding the problem. Talk to 3 users, talk to customer support, read the last quarter\'s support tickets. Then start building. Those two days will change what you build.',
    bestEnvironment: 'Consumer products, early-stage startups, competitive markets, growth teams, A/B testing-heavy organisations.',
    challengeEnvironment: 'Regulated industries, enterprise products with long sales cycles, high-stakes interfaces where errors are irreversible.',
  },
};

function getProfile(exploratoryScore: number): Profile {
  if (exploratoryScore >= 8) return profiles.strongExploratory;
  if (exploratoryScore >= 6) return profiles.exploratoryLeaning;
  if (exploratoryScore === 5) return profiles.balanced;
  if (exploratoryScore >= 3) return profiles.evaluativeLeaning;
  return profiles.strongEvaluative;
}

const calcSteps = [
  'Reading your instincts...',
  'Mapping your kickoff behaviour...',
  'Weighing research vs shipping choices...',
  'Checking how you handle pressure...',
  'Analysing your philosophy answer...',
  'Placing you on the spectrum...',
];

const experienceOptions = ['0-2 years', '3-5 years', '6-8 years', '9+ years'];

export default function DesignerModeAssessment() {
  const topRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<'gate' | 'questions' | 'calculating' | 'result'>('gate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [gateStatus, setGateStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [gateError, setGateError] = useState('');

  const [answers, setAnswers] = useState<Record<string, Mode>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [calcStep, setCalcStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setGateError('Please enter your name');
      setGateStatus('error');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError('Please enter a valid email address');
      setGateStatus('error');
      return;
    }
    if (!experience) {
      setGateError('Please select your years of experience');
      setGateStatus('error');
      return;
    }
    setGateStatus('loading');
    setGateError('');
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, experience, leadType: 'designer-mode-assessment' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPhase('questions');
        scrollToTop();
      } else {
        setGateError(data.error || 'Something went wrong. Please try again.');
        setGateStatus('error');
      }
    } catch {
      setGateError('Something went wrong. Please try again.');
      setGateStatus('error');
    }
  };

  const handleAnswer = (questionId: string, mode: Mode) => {
    const updated = { ...answers, [questionId]: mode };
    setAnswers(updated);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => { setCurrentQuestion(prev => prev + 1); scrollToTop(); }, 250);
    } else {
      setTimeout(() => { setPhase('calculating'); setCalcStep(0); scrollToTop(); }, 250);
    }
  };

  useEffect(() => {
    if (phase !== 'calculating') return;
    if (calcStep < calcSteps.length) {
      const timer = setTimeout(() => setCalcStep(prev => prev + 1), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => { setPhase('result'); scrollToTop(); }, 400);
    return () => clearTimeout(timer);
  }, [phase, calcStep]);

  const exploratoryScore = Object.values(answers).filter(m => m === 'exploratory').length;
  const evaluativeScore = Object.values(answers).filter(m => m === 'evaluative').length;
  const profile = getProfile(exploratoryScore);

  const handleCopyResult = async () => {
    const text = `I took the Designer Mode Assessment and I'm: ${profile.name}\n\n"${profile.headline}"\n\nExploratory ${exploratoryScore} / Evaluative ${evaluativeScore}\n\nWhich designer are you? Take it here: https://www.xperiencewave.com/resources/tools/designer-mode-assessment`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* clipboard unavailable */ }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setCalcStep(0);
    setCopied(false);
    setPhase('questions');
    scrollToTop();
  };

  // --- GATE ---
  if (phase === 'gate') {
    return (
      <div ref={topRef} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
          Before you start
        </h2>
        <p className="text-sm md:text-base text-white/60 mb-2">
          Ten scenarios. Two options each. Takes about 3 minutes.
        </p>
        <p className="text-sm md:text-base text-white/60 mb-6">
          There are no right or wrong answers. Pick whichever response is closest to your instinct, not what you think you should pick.
        </p>
        <form onSubmit={handleGateSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); if (gateStatus === 'error') setGateStatus('idle'); }}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors text-base"
          />
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); if (gateStatus === 'error') setGateStatus('idle'); }}
            placeholder="Your email"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors text-base"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {experienceOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { setExperience(opt); if (gateStatus === 'error') setGateStatus('idle'); }}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  experience === opt
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={gateStatus === 'loading'}
            className="w-full px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gateStatus === 'loading' ? 'Starting...' : 'Start the Assessment'}
          </button>
        </form>
        {gateStatus === 'error' && gateError && (
          <p className="mt-3 text-sm text-red-400">{gateError}</p>
        )}
        <p className="mt-4 text-xs text-white/40">
          No spam. Your result shows on screen immediately.
        </p>
      </div>
    );
  }

  // --- CALCULATING ---
  if (phase === 'calculating') {
    const progress = Math.min((calcStep / calcSteps.length) * 100, 100);
    return (
      <div ref={topRef} className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-white/70 text-base min-h-[24px]">
          {calcSteps[Math.min(calcStep, calcSteps.length - 1)]}
        </p>
      </div>
    );
  }

  // --- RESULT ---
  if (phase === 'result') {
    const explPercent = (exploratoryScore / questions.length) * 100;
    return (
      <div ref={topRef} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-6">Your Designer Mode</p>

          {/* Spectrum bar */}
          <div className="mb-2 flex justify-between text-xs uppercase tracking-wide text-white/40 font-medium">
            <span>&#9668; Exploratory</span>
            <span>Evaluative &#9658;</span>
          </div>
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-3">
            <div className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-1000" style={{ width: `${explPercent}%` }} />
          </div>
          <p className="text-sm text-white/50 mb-8">
            Exploratory {exploratoryScore} &middot; Evaluative {evaluativeScore}
          </p>

          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            {profile.name}
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto">
            &quot;{profile.headline}&quot;
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Your Strengths</h3>
            <p className="text-base text-white/70 leading-relaxed">{profile.strengths}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Your Blind Spots</h3>
            <p className="text-base text-white/70 leading-relaxed">{profile.blindSpots}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">How to Develop</h3>
            <p className="text-base text-white/70 leading-relaxed">{profile.develop}</p>
          </div>
          {profile.bestEnvironment && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Best Environment for You</h3>
              <p className="text-base text-white/70 leading-relaxed">{profile.bestEnvironment}</p>
            </div>
          )}
          {profile.challengeEnvironment && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Challenge Environment</h3>
              <p className="text-base text-white/70 leading-relaxed">{profile.challengeEnvironment}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 text-center space-y-4">
          <button
            onClick={handleCopyResult}
            className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors"
          >
            {copied ? 'Copied! Paste it in the comments' : 'Copy my result to share'}
          </button>
          <p className="text-sm text-white/50">
            Want to develop the mode you&apos;re weaker in?{' '}
            <a
              href="https://app.xperiencewave.com/book/dc-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              Book a free strategy call
            </a>
          </p>
          <button
            onClick={handleRetake}
            className="text-sm text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors"
          >
            Retake the assessment
          </button>
        </div>
      </div>
    );
  }

  // --- QUESTIONS ---
  const q = questions[currentQuestion];
  return (
    <div ref={topRef}>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-xs text-white/40">{q.title}</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
        {q.prompt}
      </h2>

      <div className="grid gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(q.id, opt.mode)}
            className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-200 ${
              answers[q.id] === opt.mode
                ? 'border-accent bg-accent/10'
                : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/[0.07]'
            }`}
          >
            <span className="text-base text-white/80 leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => { setCurrentQuestion(prev => prev - 1); scrollToTop(); }}
          className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          &larr; Previous question
        </button>
      )}
    </div>
  );
}
