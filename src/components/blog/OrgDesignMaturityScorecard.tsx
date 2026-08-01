'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface Question {
  id: string;
  title: string;
  prompt: string;
  weight: number;
  options: { score: number; label: string }[];
  whyItMatters: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    title: 'Design Leadership Presence',
    prompt: 'How senior is the most senior design person in this organisation?',
    weight: 0.15,
    options: [
      { score: 1, label: 'No dedicated design role. Founders, PMs, or devs handle design.' },
      { score: 2, label: 'There\'s a designer or two, but no one above "Designer" level.' },
      { score: 3, label: 'There\'s a Design Lead or Senior Designer, but no manager-level role.' },
      { score: 4, label: 'There\'s a Design Manager or Head of Design with a team.' },
      { score: 5, label: 'There\'s a VP/Director of Design or CDO with strategic authority.' },
    ],
    whyItMatters: 'The ceiling for your career at this org is directly tied to the ceiling of the design function. No leadership = no advocate, no budget, no voice in product decisions.',
  },
  {
    id: 'q2',
    title: 'Design\'s Role in Hiring',
    prompt: 'How was design involved in your interview process?',
    weight: 0.10,
    options: [
      { score: 1, label: 'No portfolio review. No design-specific questions. HR-only process.' },
      { score: 2, label: 'They asked for a portfolio link but didn\'t walk through it with me.' },
      { score: 3, label: 'A design person reviewed my portfolio but the conversation stayed surface-level.' },
      { score: 4, label: 'A design leader did a thorough portfolio walkthrough and asked about my process and rationale.' },
      { score: 5, label: 'Multiple design-informed rounds: portfolio deep-dive, design challenge or whiteboard, cross-functional interview with PM/engineering.' },
    ],
    whyItMatters: 'How an org evaluates design talent reveals how it values design work. If they don\'t know how to assess you, they don\'t know how to use you.',
  },
  {
    id: 'q3',
    title: 'Designer Access to Users',
    prompt: 'Will you have direct access to real users in this role?',
    weight: 0.15,
    options: [
      { score: 1, label: 'No. All user insight comes through PMs, business analysts, or support tickets.' },
      { score: 2, label: 'Occasionally - I might sit in on calls that others set up.' },
      { score: 3, label: 'Sometimes - I can request research sessions but need approval and budget.' },
      { score: 4, label: 'Regularly - there\'s a process for user research and designers participate actively.' },
      { score: 5, label: 'It\'s built into the workflow. Designers lead or co-lead research. There\'s budget, tools, and participant access.' },
    ],
    whyItMatters: 'Design without user access is decoration. This single question tells you more about maturity than the company\'s industry, brand, or size.',
  },
  {
    id: 'q4',
    title: 'Design\'s Voice in Product Decisions',
    prompt: 'How are product decisions made - and is design in the room?',
    weight: 0.15,
    options: [
      { score: 1, label: 'Design receives decisions after they\'re made. We execute what\'s been decided.' },
      { score: 2, label: 'Design is consulted sometimes, but only for visual/UI opinions.' },
      { score: 3, label: 'Design has input during planning, but the PM or business lead makes final calls.' },
      { score: 4, label: 'Design is a co-owner of product decisions alongside PM and engineering.' },
      { score: 5, label: 'Design shapes product strategy. We define problems, not just solve them.' },
    ],
    whyItMatters: 'If design isn\'t in the room when priorities are set, every other maturity signal is cosmetic. You\'ll be executing someone else\'s vision regardless of your title.',
  },
  {
    id: 'q5',
    title: 'Process Maturity',
    prompt: 'Is there a defined design process - research, ideation, testing, iteration - or is it ad hoc?',
    weight: 0.10,
    options: [
      { score: 1, label: 'No process. Design starts when someone says "we need screens."' },
      { score: 2, label: 'There\'s an informal process, but it\'s inconsistent - depends on the project or the designer.' },
      { score: 3, label: 'There\'s a defined process, but it\'s often compressed or skipped under pressure.' },
      { score: 4, label: 'There\'s a consistent process that\'s respected by the team. Research, ideation, testing happen on most projects.' },
      { score: 5, label: 'The process is mature, adaptive, and tailored to project needs. The team knows when to go deep and when to go light.' },
    ],
    whyItMatters: 'Process isn\'t bureaucracy. It\'s the infrastructure that determines whether your design decisions are grounded or guesswork.',
  },
  {
    id: 'q6',
    title: 'Design System and Standards',
    prompt: 'Does the org have a design system - and is it maintained?',
    weight: 0.05,
    options: [
      { score: 1, label: 'No design system. No component library. Every project starts from scratch.' },
      { score: 2, label: 'There\'s a Figma library, but it\'s outdated, inconsistent, or barely used.' },
      { score: 3, label: 'There\'s a design system, but it\'s maintained by one person and adoption is uneven.' },
      { score: 4, label: 'There\'s an active design system with clear ownership, versioning, and cross-team adoption.' },
      { score: 5, label: 'The design system is a strategic asset - documented, governed, integrated with code, and continuously improved.' },
    ],
    whyItMatters: 'A design system reflects whether design thinking is embedded in the org or exists in isolated pockets.',
  },
  {
    id: 'q7',
    title: 'Impact Measurement',
    prompt: 'Does the team measure the impact of design work?',
    weight: 0.10,
    options: [
      { score: 1, label: 'No. Design is evaluated on output (screens delivered, deadlines met), not outcomes.' },
      { score: 2, label: 'Sometimes - if a PM shares metrics, we see them, but it\'s not part of the design process.' },
      { score: 3, label: 'We track some metrics post-launch, but it\'s inconsistent and not tied back to design decisions.' },
      { score: 4, label: 'Impact is measured on most projects. Designers are expected to connect their work to metrics.' },
      { score: 5, label: 'Design impact is systematically tracked. Metrics inform the next cycle. Designers own outcomes, not just outputs.' },
    ],
    whyItMatters: 'If design impact isn\'t measured, design investment can\'t be defended. When budgets tighten, unmeasured functions get cut first.',
  },
  {
    id: 'q8',
    title: 'Cross-Functional Collaboration',
    prompt: 'How do designers work with engineering, product, and other teams?',
    weight: 0.10,
    options: [
      { score: 1, label: 'Siloed. Design delivers assets. Engineering builds. We rarely talk.' },
      { score: 2, label: 'We hand off designs and answer questions when asked.' },
      { score: 3, label: 'There\'s some collaboration - joint meetings, shared standups - but it\'s coordination, not co-creation.' },
      { score: 4, label: 'Designers are embedded in cross-functional squads. We collaborate from discovery through delivery.' },
      { score: 5, label: 'True cross-functional partnership. Design, engineering, and product co-own problems and solutions. Shared rituals, shared accountability.' },
    ],
    whyItMatters: 'Cross-functional collaboration is how design moves from service function to strategic partner. Siloed design = limited impact, regardless of maturity elsewhere.',
  },
  {
    id: 'q9',
    title: 'Growth and Development',
    prompt: 'What does career growth look like for designers here?',
    weight: 0.05,
    options: [
      { score: 1, label: 'No clear path. No design career ladder. No mentorship. You figure it out yourself.' },
      { score: 2, label: 'There\'s a vague sense of progression (junior to senior) but no defined framework or support.' },
      { score: 3, label: 'There\'s a career ladder, but it\'s borrowed from engineering or PM - not built for design.' },
      { score: 4, label: 'There\'s a design-specific career ladder with both IC and management tracks. Regular reviews happen.' },
      { score: 5, label: 'Structured growth: defined levels, mentorship, learning budgets, design critiques, conference support, clear promotion criteria.' },
    ],
    whyItMatters: 'If the org hasn\'t thought about how designers grow, they haven\'t thought about design as a long-term investment. You\'re a resource, not a career.',
  },
  {
    id: 'q10',
    title: 'Previous Designer Trajectory',
    prompt: 'What\'s the story of the person who had this role before you?',
    weight: 0.05,
    options: [
      { score: 1, label: 'No one had this role before. Design is brand new here.' },
      { score: 2, label: 'They left within a year. Unclear reasons, or frustration with the role/culture.' },
      { score: 3, label: 'They moved on after a reasonable tenure. Neutral departure.' },
      { score: 4, label: 'They were promoted internally or moved to a more senior role within the org.' },
      { score: 5, label: 'They grew significantly during their time and left for an impressive next step - or they\'re still here and thriving.' },
    ],
    whyItMatters: 'The trajectory of your predecessor is the strongest predictor of your trajectory. If they burned out, ask why before assuming it\'ll be different for you.',
  },
];

interface MaturityLevel {
  level: number;
  label: string;
  headline: string;
  description: string;
  worksFor: string;
  shouldAvoid: string;
  recommendation: string;
  color: string;
}

const maturityLevels: MaturityLevel[] = [
  {
    level: 0, label: 'Absent', color: 'text-red-400',
    headline: 'Design doesn\'t exist here yet. You\'d be building from zero.',
    description: 'This organisation has no real design function. There\'s no dedicated leadership, no process, no research access, and no understanding of what design is supposed to do. The term "UX" might appear in a job title, but the practice doesn\'t exist.',
    worksFor: 'Founding designers who want to build a design practice from scratch. People who are energised by evangelism and can tolerate months of educating stakeholders before doing any real design work.',
    shouldAvoid: 'Anyone who needs mentorship, process, or an existing design culture to do their best work. Mid-career designers who want to deepen their craft - you\'ll spend more time selling design than practising it.',
    recommendation: 'If you take this role, negotiate for authority - not just a title. You need the ability to hire, to set process, and to have a direct line to whoever makes product decisions. Without that, you\'re decoration.',
  },
  {
    level: 1, label: 'Limited', color: 'text-orange-400',
    headline: 'Design exists, but barely. You\'ll be fighting for relevance.',
    description: 'There are one or two designers, but the roles are unclear. UX exists as a concept, but it\'s often visual-first - making things look good rather than solving problems. The hiring process probably didn\'t know what to evaluate in your portfolio. Research access is limited or non-existent.',
    worksFor: 'Generalist designers who enjoy wearing multiple hats and defining workflows. Designers who are good at internal advocacy and can demonstrate quick wins to build credibility.',
    shouldAvoid: 'Specialists who need deep focus. Designers who expect research infrastructure or established process. If you need structure to thrive, this environment will frustrate you.',
    recommendation: 'Before accepting, find out if there\'s at least one senior leader (CPO, CTO, CEO) who genuinely believes in design. If there\'s an internal champion, you have a chance. If not, you\'re pushing a boulder uphill alone.',
  },
  {
    level: 2, label: 'Emerging', color: 'text-yellow-400',
    headline: 'Design is growing here. The foundations are being laid, but they\'re not solid yet.',
    description: 'There\'s a small but growing design team. Some processes exist. Product managers are beginning to understand what UX brings. There might be a design lead or head of design, but they\'re still building credibility internally. Research happens, but inconsistently. The design system exists but isn\'t fully adopted.',
    worksFor: 'Mid-level designers who want to influence without starting from zero. Product designers who enjoy shaping process and contributing to team culture. This is often the sweet spot for career growth - you\'re early enough to shape things, late enough that you\'re not doing it alone.',
    shouldAvoid: 'Designers who need mature process to do their best work. If you thrive in environments where everything is defined and you can focus purely on craft, the growing pains here will slow you down.',
    recommendation: 'Ask about the trajectory. Is the team growing? Is leadership investing? An emerging practice on an upward trajectory is one of the best career accelerators. An emerging practice that\'s been "emerging" for three years is a stalled investment.',
  },
  {
    level: 3, label: 'Integrated', color: 'text-blue-400',
    headline: 'Design is a real function here. It\'s part of how the business operates.',
    description: 'Design is embedded in product and business strategy. Designers sit in cross-functional squads. Research is regular. The design system is active. Impact is measured. There\'s a design leader with actual authority. The hiring process was thorough and design-informed.',
    worksFor: 'Senior designers who want to deepen their craft within a mature environment. Researchers who need infrastructure. Design managers who want a team that\'s already functioning and needs to be elevated further.',
    shouldAvoid: 'Designers who want to build from scratch - the foundations are already laid. Generalists who enjoy chaos and flexibility - the structure here is real and you\'ll need to work within it.',
    recommendation: 'This is a strong environment. The questions to ask are about your specific growth: what\'s the career ladder? What does the next level look like? Who\'s been promoted recently and what did they demonstrate? Make sure your growth path is as mature as the design function.',
  },
  {
    level: 4, label: 'Strategic', color: 'text-emerald-400',
    headline: 'Design drives direction here. This is a design-mature organisation.',
    description: 'Design has leadership representation - VP of Design, CDO, or equivalent. UX doesn\'t just support product strategy; it shapes it. Designers define problems, lead research, influence roadmaps, and own outcomes. The hiring process was rigorous, multi-round, and design-led.',
    worksFor: 'Principal designers, design leads, design managers, and strategists who want to operate at the highest level. Researchers who want to influence product direction. Designers who are ready to be accountable for business outcomes, not just design quality.',
    shouldAvoid: 'Junior or early-career designers who aren\'t ready for the expectations. Designers who prefer execution over strategy. The bar is high and the accountability is real.',
    recommendation: 'This is rare - especially in India. If you find it, the question isn\'t "should I join?" It\'s "am I ready?" Make sure your portfolio, your interview performance, and your thinking demonstrate the strategic level this environment operates at.',
  },
  {
    level: 5, label: 'Visionary', color: 'text-green-400',
    headline: 'Design doesn\'t just have a seat at the table. It built the table.',
    description: 'Design is not a department - it\'s how the company thinks. User experience sits at the core of business strategy. The founder or CEO has a design background, or the company was built on design principles from day one. Think Apple, Airbnb, IDEO, or early Notion.',
    worksFor: 'Design evangelists, experience strategists, creative directors who want to push boundaries and define what\'s possible.',
    shouldAvoid: 'The expectations are extreme. The bar for craft, thinking, and communication is the highest you\'ll encounter. Very few companies in India operate at this level.',
    recommendation: 'If your scorecard genuinely came out at Level 5, verify it. Ask for evidence - design-led product decisions, CEO involvement in design reviews, published case studies of design impact. Most organisations that claim to be visionary are actually Integrated (Level 3) with good marketing.',
  },
];

function getMaturityLevel(score: number): MaturityLevel {
  if (score >= 4.5) return maturityLevels[5];
  if (score >= 3.9) return maturityLevels[4];
  if (score >= 3.2) return maturityLevels[3];
  if (score >= 2.5) return maturityLevels[2];
  if (score >= 1.8) return maturityLevels[1];
  return maturityLevels[0];
}

interface Flag {
  type: 'red' | 'green' | 'contradiction';
  icon: string;
  message: string;
}

function getFlags(answers: Record<string, number>): Flag[] {
  const flags: Flag[] = [];

  // Red flags
  if ((answers.q1 ?? 0) <= 2 && (answers.q4 ?? 0) <= 2) {
    flags.push({ type: 'red', icon: '\u26A0\uFE0F', message: 'No design leadership AND no voice in decisions. This is a high-risk environment. You\'ll spend more time justifying design\'s existence than practising it.' });
  }
  if (answers.q3 === 1) {
    flags.push({ type: 'red', icon: '\u26A0\uFE0F', message: 'No access to users is a dealbreaker for genuine UX practice. Without user access, you\'re designing based on assumptions - no matter how mature the rest of the org looks.' });
  }
  if (answers.q10 === 2) {
    flags.push({ type: 'red', icon: '\u26A0\uFE0F', message: 'The previous designer left within a year. Before accepting, find out exactly why. If the answer is vague, that\'s your answer.' });
  }
  if (answers.q4 === 1 && answers.q7 === 1) {
    flags.push({ type: 'red', icon: '\u26A0\uFE0F', message: 'No decision-making voice AND no impact measurement. Design is a service desk here, not a strategic function. Your work will be evaluated on speed and aesthetics, not outcomes.' });
  }
  if (answers.q2 === 1) {
    flags.push({ type: 'red', icon: '\u26A0\uFE0F', message: 'No design evaluation in the hiring process means they don\'t know how to assess design quality. If they can\'t evaluate your work, they can\'t evaluate your growth.' });
  }

  // Green flags
  if ((answers.q3 ?? 0) >= 4 && (answers.q4 ?? 0) >= 4) {
    flags.push({ type: 'green', icon: '\u2705', message: 'User access + decision-making authority. The two most important foundations for meaningful design work are both present.' });
  }
  if ((answers.q1 ?? 0) >= 4 && (answers.q9 ?? 0) >= 4) {
    flags.push({ type: 'green', icon: '\u2705', message: 'Design leadership + clear growth path. This org invests in designers as careers, not just resources.' });
  }
  if ((answers.q5 ?? 0) >= 4 && (answers.q8 ?? 0) >= 4) {
    flags.push({ type: 'green', icon: '\u2705', message: 'Mature process + strong cross-functional collaboration. You\'ll be able to do rigorous work alongside people who understand what you do.' });
  }

  // Contradictions
  if ((answers.q1 ?? 0) >= 4 && (answers.q3 ?? 0) <= 2) {
    flags.push({ type: 'contradiction', icon: '\uD83D\uDD0D', message: 'Strong design leadership but limited user access is unusual. Ask the design leader directly: how does the team get user insight? There may be access you\'re not seeing - or a gap even leadership hasn\'t fixed.' });
  }
  if ((answers.q5 ?? 0) >= 4 && (answers.q7 ?? 0) <= 2) {
    flags.push({ type: 'contradiction', icon: '\uD83D\uDD0D', message: 'Mature process but no impact measurement is a warning. Process without measurement can become ritual - teams going through the motions without connecting to outcomes.' });
  }
  if ((answers.q6 ?? 0) >= 4 && (answers.q8 ?? 0) <= 2) {
    flags.push({ type: 'contradiction', icon: '\uD83D\uDD0D', message: 'Strong design system but weak cross-functional collaboration. The system might be a design-team asset rather than an organisational one. Check whether engineering actually uses it.' });
  }
  if ((answers.q4 ?? 0) >= 4 && (answers.q1 ?? 0) <= 2) {
    flags.push({ type: 'contradiction', icon: '\uD83D\uDD0D', message: 'Design has decision-making voice but no senior leadership. This is often founder-driven - the CEO values design but hasn\'t hired a design leader yet. High potential, but fragile. If the founder\'s priorities shift, so does design\'s position.' });
  }

  return flags;
}

function calculateScore(answers: Record<string, number>): number {
  let total = 0;
  for (const q of questions) {
    let score = answers[q.id] ?? 0;
    // Special handling: Q10 score of 1 (new role) treated as neutral 3
    if (q.id === 'q10' && score === 1) {
      score = 3;
    }
    total += score * q.weight;
  }
  return Math.round(total * 10) / 10;
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
      setCount(Math.round(eased * target * 10) / 10);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

const calcSteps = [
  'Analysing design leadership...',
  'Evaluating hiring signals...',
  'Measuring user access...',
  'Assessing decision-making voice...',
  'Reviewing process maturity...',
  'Checking design systems...',
  'Measuring impact tracking...',
  'Evaluating collaboration...',
  'Reviewing growth paths...',
  'Detecting flags...',
  'Calculating your maturity score...',
];

const dimensionLabels: Record<string, string> = {
  q1: 'Design Leadership',
  q2: 'Hiring Process',
  q3: 'User Access',
  q4: 'Decision-Making Voice',
  q5: 'Process Maturity',
  q6: 'Design System',
  q7: 'Impact Measurement',
  q8: 'Cross-Functional Collaboration',
  q9: 'Growth & Development',
  q10: 'Previous Designer Trajectory',
};

export default function OrgDesignMaturityScorecard() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('e') || '';
  const topRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notSure, setNotSure] = useState<Record<string, boolean>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState<'questions' | 'calculating' | 'result'>('questions');
  const [calcStep, setCalcStep] = useState(0);
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setNotSure(prev => ({ ...prev, [questionId]: false }));
  };

  const handleNotSure = (questionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: 2 }));
    setNotSure(prev => ({ ...prev, [questionId]: true }));
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const totalScore = allAnswered ? calculateScore(answers) : null;
  const animatedScore = useCountUp(totalScore ?? 0, 1800, scoreRevealed);

  const scrollToTop = () => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const sendScoreEmail = useCallback(async () => {
    if (!userEmail || emailSent || totalScore === null) return;
    setEmailSent(true);
    const maturity = getMaturityLevel(totalScore);
    const breakdown = questions.map(q => {
      const score = answers[q.id] ?? 0;
      return `${dimensionLabels[q.id]}: ${score} / 5`;
    }).join('\n');
    try {
      await fetch('/api/evaluator-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          totalScore,
          label: `Level ${maturity.level}: ${maturity.label}`,
          message: maturity.headline,
          breakdown,
          toolName: 'Organisation Design Maturity Scorecard',
          weakestDimension: getWeakestDimension(),
        }),
      });
    } catch { /* silent */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, emailSent, totalScore, answers]);

  const getWeakestDimension = (): string => {
    let weakest = questions[0];
    let lowestScore = Infinity;
    for (const q of questions) {
      const score = answers[q.id] ?? 0;
      if (score < lowestScore) {
        lowestScore = score;
        weakest = q;
      }
    }
    return dimensionLabels[weakest.id];
  };

  const handleShowResult = () => {
    if (!allAnswered) return;
    setPhase('calculating');
    setCalcStep(0);
    scrollToTop();
  };

  useEffect(() => {
    if (phase !== 'calculating') return;
    if (calcStep < calcSteps.length) {
      const timer = setTimeout(() => setCalcStep(prev => prev + 1), 350);
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
    setAnswers({}); setNotSure({}); setCurrentQuestion(0); setPhase('questions');
    setCalcStep(0); setScoreRevealed(false); setEmailSent(false); setShowDetails(false);
  };

  const currentQ = questions[currentQuestion];

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
    const maturity = getMaturityLevel(totalScore);
    const flags = getFlags(answers);
    const scorePercent = ((totalScore - 1) / 4) * 100;
    const notSureCount = Object.values(notSure).filter(Boolean).length;

    return (
      <div ref={topRef} className="w-full text-center py-6 md:py-8">
        {/* Score circle */}
        <div className={`mb-4 transition-all duration-1000 ${scoreRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#FF0023" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={2 * Math.PI * 90 * (1 - (scorePercent / 100))}
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl md:text-6xl font-heading font-bold text-white tabular-nums tracking-tight leading-none">{animatedScore.toFixed(1)}</p>
              <p className="text-sm text-white/50 mt-1">out of 5.0</p>
            </div>
          </div>
        </div>

        {/* Maturity label */}
        <div className={`transition-all duration-700 delay-500 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className={`text-2xl md:text-3xl font-heading font-bold mb-2 ${maturity.color}`}>
            Level {maturity.level}: {maturity.label}
          </div>
          <p className="text-lg text-white/80 font-medium mb-2">&quot;{maturity.headline}&quot;</p>
          <p className="text-base text-white/60 leading-relaxed max-w-lg mx-auto mb-8">{maturity.description}</p>
        </div>

        {/* Not sure note */}
        {notSureCount > 0 && (
          <div className={`max-w-lg mx-auto mb-6 text-left transition-all duration-700 delay-600 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-white/60">
                For the {notSureCount} question{notSureCount > 1 ? 's' : ''} you marked &quot;Not sure,&quot; we scored conservatively (2/5). If you&apos;re uncertain about something after an interview, that itself is a data point - mature organisations make these things visible.
              </p>
            </div>
          </div>
        )}

        {/* Q10 special note */}
        {answers.q10 === 1 && (
          <div className={`max-w-lg mx-auto mb-6 text-left transition-all duration-700 delay-600 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-white/60">
                This is a new design role - there&apos;s no predecessor to learn from. That means you&apos;re the baseline. Ask: why is this role being created now? What triggered the investment? The answer tells you whether design is being brought in proactively (good) or reactively after something went wrong (risky).
              </p>
            </div>
          </div>
        )}

        {/* Dimension bars */}
        <div className={`transition-all duration-700 delay-700 ${scoreRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-lg mx-auto space-y-3 mb-6 text-left">
            {questions.map(q => {
              const score = answers[q.id] ?? 0;
              const pct = (score / 5) * 100;
              return (
                <div key={q.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">
                      {dimensionLabels[q.id]}
                      {notSure[q.id] && <span className="ml-2 text-[10px] text-white/40 font-medium">Not sure</span>}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-white">{score}</span>
                      <span className="text-white/40"> / 5</span>
                    </p>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flags */}
          {flags.length > 0 && (
            <div className="max-w-lg mx-auto space-y-3 mb-6 text-left">
              {flags.map((flag, i) => (
                <div key={i} className={`rounded-xl p-4 border ${
                  flag.type === 'red' ? 'bg-red-500/5 border-red-500/20' :
                  flag.type === 'green' ? 'bg-green-500/5 border-green-500/20' :
                  'bg-blue-500/5 border-blue-500/20'
                }`}>
                  <p className={`text-sm leading-relaxed ${
                    flag.type === 'red' ? 'text-red-300' :
                    flag.type === 'green' ? 'text-green-300' :
                    'text-blue-300'
                  }`}>
                    <span className="mr-2">{flag.icon}</span>
                    {flag.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Toggle for details */}
          <button onClick={() => setShowDetails(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6">
            <svg className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showDetails ? 'Hide recommendations' : 'View personalised recommendations'}
          </button>

          {showDetails && (
            <div className="max-w-lg mx-auto space-y-4 mb-8 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Who this works for</p>
                <p className="text-sm text-white/70 leading-relaxed">{maturity.worksFor}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">Who should think twice</p>
                <p className="text-sm text-white/70 leading-relaxed">{maturity.shouldAvoid}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Our recommendation</p>
                <p className="text-sm text-white/70 leading-relaxed">{maturity.recommendation}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <p className="text-sm text-white/60 mb-5 max-w-md mx-auto">
            Want to discuss what this means for your career? Book a free Design Career Strategy Call.
          </p>
          <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-xl transition-colors">
            Book a Free Strategy Call
          </a>

          {userEmail && emailSent && (
            <p className="mt-5 text-xs text-white/50">Score sent to {userEmail}</p>
          )}
          <div className="mt-5">
            <button onClick={handleReset} className="text-sm text-white/60 hover:text-white underline transition-colors">Score another organisation</button>
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
          <span className="text-sm text-white/60 font-medium">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-white/60">{Object.keys(answers).length} / {questions.length} answered</span>
        </div>
        <div className="flex gap-1.5">
          {questions.map((q, idx) => (
            <button key={q.id} onClick={() => { if (answers[q.id] !== undefined || idx <= currentQuestion) setCurrentQuestion(idx); setTimeout(scrollToTop, 50); }}
              className={`h-1.5 flex-1 rounded-full transition-all ${answers[q.id] !== undefined ? 'bg-green-500' : idx === currentQuestion ? 'bg-accent' : 'bg-white/10'}`}
              aria-label={`Go to question ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-bold">{currentQuestion + 1}</span>
          <h2 className="font-heading text-lg md:text-xl font-bold text-white">{currentQ.title}</h2>
        </div>
        <p className="text-white/50 text-sm ml-11 mb-2">Weight: {Math.round(currentQ.weight * 100)}%</p>
      </div>

      <div className="border border-white/10 rounded-xl p-5 md:p-6 mb-4">
        <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
          &quot;{currentQ.prompt}&quot;
        </p>
        <div className="space-y-3">
          {currentQ.options.map(opt => (
            <button
              key={opt.score}
              onClick={() => handleAnswer(currentQ.id, opt.score)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                answers[currentQ.id] === opt.score && !notSure[currentQ.id]
                  ? 'bg-accent/10 border-accent/40 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${
                  answers[currentQ.id] === opt.score && !notSure[currentQ.id]
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-white/50'
                }`}>{opt.score}</span>
                <span className="text-sm leading-relaxed">{opt.label}</span>
              </div>
            </button>
          ))}
          {/* Not sure option */}
          <button
            onClick={() => handleNotSure(currentQ.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              notSure[currentQ.id]
                ? 'bg-white/10 border-white/30 text-white'
                : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${
                notSure[currentQ.id] ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'
              }`}>?</span>
              <span className="text-sm leading-relaxed">Not sure</span>
            </div>
          </button>
        </div>
      </div>

      {/* Why it matters */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">Why this matters</p>
        <p className="text-sm text-white/50 leading-relaxed">{currentQ.whyItMatters}</p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-center">
        {currentQuestion > 0 && (
          <button onClick={() => { setCurrentQuestion(prev => prev - 1); setTimeout(scrollToTop, 50); }}
            className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white bg-white/5 border border-white/15 hover:bg-white/10 rounded-xl transition-colors">
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button onClick={() => { if (answers[currentQ.id] !== undefined) { setCurrentQuestion(prev => prev + 1); setTimeout(scrollToTop, 50); } }}
            disabled={answers[currentQ.id] === undefined}
            className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
              answers[currentQ.id] !== undefined
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
  );
}
