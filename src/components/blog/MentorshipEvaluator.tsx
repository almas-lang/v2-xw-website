'use client';

import { useState } from 'react';

interface Category {
  id: string;
  label: string;
  maxPoints: number;
  questions: {
    id: string;
    question: string;
    labels: [string, string, string]; // [0 label, 3 label, 5 label]
  }[];
}

const categories: Category[] = [
  {
    id: 'learn',
    label: 'How You Learn',
    maxPoints: 20,
    questions: [
      {
        id: '1a',
        question: 'Does learning happen through doing - real projects, real feedback - or primarily through watching recordings and reading content?',
        labels: ['Mostly watching/reading', 'Mix of both', 'Primarily doing with feedback'],
      },
      {
        id: '1b',
        question: 'Is there a clear structured path (week-by-week, module-by-module) or are you left to navigate a content library on your own schedule?',
        labels: ['No structure, self-navigate', 'Loose structure', 'Clear week-by-week path'],
      },
      {
        id: '1c',
        question: 'Are the projects you work on real briefs with real constraints, or dummy setups designed just for practice?',
        labels: ['Dummy only', 'Simulated real', 'Actual real-world briefs'],
      },
      {
        id: '1d',
        question: 'How quickly is your work reviewed and how specific is the feedback?',
        labels: ['Days later, generic', 'Within 24-48hrs, moderate', 'Same day, specific and actionable'],
      },
    ],
  },
  {
    id: 'curriculum',
    label: 'Curriculum Depth',
    maxPoints: 20,
    questions: [
      {
        id: '2a',
        question: 'Does the curriculum go beyond core UX skills (research, wireframing, prototyping) into systemic thinking, stakeholder navigation, and personal brand?',
        labels: ['Core UX only', 'Some beyond core', 'Full spectrum including maturity + brand'],
      },
      {
        id: '2b',
        question: 'Is AI integrated as a thinking and building tool throughout the curriculum - not as a standalone module or afterthought?',
        labels: ['Not covered', 'Separate AI module', 'Integrated throughout as a thinking tool'],
      },
      {
        id: '2c',
        question: 'Does the curriculum prepare you for senior-level conversations - strategy, business context, influence - or primarily for senior-level deliverables?',
        labels: ['Deliverables only', 'Some strategy coverage', 'Full senior conversation preparation'],
      },
      {
        id: '2d',
        question: 'Is the curriculum regularly updated based on what the market and industry actually requires right now?',
        labels: ['Appears static', 'Updated annually', 'Actively updated by practitioners'],
      },
    ],
  },
  {
    id: 'accountability',
    label: 'Accountability & Drive',
    maxPoints: 15,
    questions: [
      {
        id: '3a',
        question: 'How many 1:1 conversations with a dedicated mentor do you get - not group calls with a slot, but actual individual time?',
        labels: ['None', '1 per month', 'Multiple per month, dedicated'],
      },
      {
        id: '3b',
        question: 'Are there regular group sessions - clinics, peer reviews, presentation practice - where you learn by doing in front of others?',
        labels: ['No group sessions', 'Occasional', '3-4 times per week, structured'],
      },
      {
        id: '3c',
        question: 'When you are stuck, how quickly can you get help - and from a person, not a content library or chatbot?',
        labels: ['Days or never', 'Within 24hrs', 'Same day, direct access to mentor'],
      },
    ],
  },
  {
    id: 'career',
    label: 'Career Outcome Support',
    maxPoints: 15,
    questions: [
      {
        id: '4a',
        question: 'Does career support extend beyond the curriculum end date, and does it include active positioning - not just resume review?',
        labels: ['Ends at curriculum', 'Some post-program support', 'Active ongoing career positioning'],
      },
      {
        id: '4b',
        question: 'Are you connected to real hiring managers, recruiters, and design leaders through the program\'s network?',
        labels: ['No network access', 'Some introductions', 'Direct access to active hiring network'],
      },
      {
        id: '4c',
        question: 'Does the program include portfolio and personal brand building as structured work - or is it left entirely to you?',
        labels: ['Not included', 'Advised but not structured', 'Structured, reviewed, part of curriculum'],
      },
    ],
  },
  {
    id: 'mentor',
    label: 'Mentor Quality',
    maxPoints: 15,
    questions: [
      {
        id: '5a',
        question: 'Are the mentors active practitioners - currently doing design work in the industry - or primarily educators and former designers?',
        labels: ['Educators only', 'Mix', 'Active practitioners, still shipping'],
      },
      {
        id: '5b',
        question: 'How many students is each mentor personally mentoring simultaneously?',
        labels: ['30+ per mentor', '10-20 per mentor', 'Fewer than 10, genuine 1:1 depth'],
      },
      {
        id: '5c',
        question: 'Through what medium is mentor access available, and how direct is it?',
        labels: ['Email/tickets only', 'Group calls with slots', 'Direct access via calls and async channel'],
      },
    ],
  },
  {
    id: 'cert',
    label: 'Certification Rigour',
    maxPoints: 15,
    questions: [
      {
        id: '6a',
        question: 'Is there a certification at the end - and is it exam-graded with a minimum pass threshold, or is it a participation certificate?',
        labels: ['Participation only / none', 'Exam but no threshold', 'Proctored exam, minimum pass threshold'],
      },
      {
        id: '6b',
        question: 'What happens if you fail the certification assessment?',
        labels: ['Everyone passes / no exam', 'Automatic retry, no consequence', 'Resit required, standard is maintained'],
      },
      {
        id: '6c',
        question: 'Is the certificate backed by named practitioners or employers outside the program that you can independently verify?',
        labels: ['No external validation', 'Some informal mentions', 'Named practitioners + employers who hired certified designers'],
      },
    ],
  },
];

function getInterpretation(total: number): { label: string; color: string; message: string } {
  if (total >= 85) return {
    label: 'Strong program',
    color: 'text-green-400',
    message: 'The structure is right. Scrutinise the specifics - mentor availability, curriculum detail, real student outcomes. But the foundations are solid.',
  };
  if (total >= 70) return {
    label: 'Good with gaps',
    color: 'text-blue-400',
    message: 'Worth considering. Know what you\'re not getting before you commit. Ask specifically about the categories where you scored them low.',
  };
  if (total >= 55) return {
    label: 'Partial fit',
    color: 'text-yellow-400',
    message: 'Will help with specific things but unlikely to transform your trajectory. Fine for a focused skill - not for a career shift.',
  };
  if (total >= 40) return {
    label: 'Weak program',
    color: 'text-orange-400',
    message: 'The marketing is doing more work than the program. Proceed with significant caution or not at all.',
  };
  return {
    label: 'Walk away',
    color: 'text-red-400',
    message: 'This program is not built for your outcome. The money is better spent elsewhere.',
  };
}

function getCTAMessage(total: number): string {
  if (total >= 70) return 'Want to see how this program compares to others? Book a free call with Xperience Wave - we\'ll walk through the scorecard together.';
  if (total >= 55) return 'This program may cover some of what you need. If you want to compare, book a free call with us.';
  return 'This score suggests the program may not deliver what you\'re looking for. Book a free strategy call - we\'ll tell you what to look for instead.';
}

export default function MentorshipEvaluator() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calcCategoryScore = (category: Category): number | null => {
    const answered = category.questions.filter(q => answers[q.id] !== undefined);
    if (answered.length === 0) return null;
    if (answered.length < category.questions.length) return null;
    const rawTotal = category.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const maxRaw = category.questions.length * 5;
    return Math.round(((rawTotal / maxRaw) * category.maxPoints) * 10) / 10;
  };

  const allAnswered = categories.every(cat =>
    cat.questions.every(q => answers[q.id] !== undefined)
  );

  const totalScore = allAnswered
    ? Math.round(categories.reduce((sum, cat) => sum + (calcCategoryScore(cat) ?? 0), 0))
    : null;

  const isCategoryComplete = (cat: Category) =>
    cat.questions.every(q => answers[q.id] !== undefined);

  const handleShowResult = () => {
    if (allAnswered) setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setActiveCategory(0);
    setShowResult(false);
  };

  const radioOptions = [0, 1, 2, 3, 4, 5];

  return (
    <div className="my-10 border border-g300/30 rounded-2xl overflow-hidden bg-carbon/50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-g300/20 bg-g100/5">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon">
          UX Mentorship Program Evaluator
        </h3>
        <p className="text-sm text-g500 mt-1">
          Score any program across 6 categories. 20 questions. 100 points total.
        </p>
      </div>

      {!showResult ? (
        <>
          {/* Category tabs */}
          <div className="flex overflow-x-auto border-b border-g300/20 scrollbar-hide">
            {categories.map((cat, idx) => {
              const complete = isCategoryComplete(cat);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeCategory === idx
                      ? 'border-accent text-accent'
                      : complete
                        ? 'border-green-500/50 text-green-500'
                        : 'border-transparent text-g500 hover:text-g700'
                  }`}
                >
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{idx + 1}. {cat.label.split(' ')[0]}</span>
                  {complete && <span className="ml-1.5 text-green-500">&#10003;</span>}
                </button>
              );
            })}
          </div>

          {/* Active category questions */}
          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading text-lg font-bold text-carbon">
                {categories[activeCategory].label}
              </h4>
              <span className="text-sm text-g500 font-medium">
                {categories[activeCategory].maxPoints} pts max
              </span>
            </div>

            <div className="space-y-8">
              {categories[activeCategory].questions.map((q, qIdx) => (
                <div key={q.id}>
                  <p className="text-base text-g600 leading-relaxed mb-3">
                    <span className="text-g500 font-medium mr-2">{qIdx + 1}.</span>
                    {q.question}
                  </p>

                  {/* Radio options */}
                  <div className="flex items-center gap-1 sm:gap-2 mb-2">
                    {radioOptions.map(val => (
                      <button
                        key={val}
                        onClick={() => handleAnswer(q.id, val)}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-sm font-semibold transition-all ${
                          answers[q.id] === val
                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                            : 'bg-g100/10 text-g500 hover:bg-g100/20 hover:text-g700'
                        }`}
                        aria-label={`Score ${val} for question ${q.id}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between text-xs text-g500 px-1">
                    <span>{q.labels[0]}</span>
                    <span className="hidden sm:inline">{q.labels[1]}</span>
                    <span>{q.labels[2]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Category score + navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                {isCategoryComplete(categories[activeCategory]) && (
                  <p className="text-sm font-medium text-g600">
                    {categories[activeCategory].label}:{' '}
                    <span className="text-accent font-bold">
                      {calcCategoryScore(categories[activeCategory])}
                    </span>
                    <span className="text-g500"> / {categories[activeCategory].maxPoints}</span>
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {activeCategory > 0 && (
                  <button
                    onClick={() => setActiveCategory(prev => prev - 1)}
                    className="px-4 py-2 text-sm font-medium text-g600 hover:text-g700 bg-g100/10 hover:bg-g100/20 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                )}
                {activeCategory < categories.length - 1 ? (
                  <button
                    onClick={() => setActiveCategory(prev => prev + 1)}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleShowResult}
                    disabled={!allAnswered}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      allAnswered
                        ? 'text-white bg-accent hover:bg-accent/90'
                        : 'text-g500 bg-g100/10 cursor-not-allowed'
                    }`}
                  >
                    See Result
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Running total */}
          {Object.keys(answers).length > 0 && (
            <div className="px-5 py-3 border-t border-g300/20 bg-g100/5 flex items-center justify-between">
              <p className="text-sm text-g500">
                {Object.keys(answers).length} / 20 questions answered
              </p>
              {!allAnswered && (
                <p className="text-xs text-g500">Complete all questions to see your score</p>
              )}
            </div>
          )}
        </>
      ) : (
        /* Result display */
        <div className="p-6 md:p-8 text-center">
          {totalScore !== null && (() => {
            const interp = getInterpretation(totalScore);
            return (
              <>
                <div className="mb-6">
                  <p className="text-6xl md:text-7xl font-heading font-bold text-carbon mb-2">
                    {totalScore}
                  </p>
                  <p className="text-sm text-g500">out of 100</p>
                </div>

                <div className={`text-xl md:text-2xl font-heading font-bold mb-3 ${interp.color}`}>
                  {interp.label}
                </div>

                <p className="text-base text-g600 leading-relaxed max-w-lg mx-auto mb-8">
                  {interp.message}
                </p>

                {/* Category breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-md mx-auto text-left">
                  {categories.map(cat => {
                    const score = calcCategoryScore(cat);
                    const pct = score !== null ? (score / cat.maxPoints) * 100 : 0;
                    return (
                      <div key={cat.id} className="bg-g100/5 rounded-lg p-3">
                        <p className="text-xs text-g500 mb-1">{cat.label}</p>
                        <p className="text-sm font-bold text-carbon">
                          {score} <span className="text-g500 font-normal">/ {cat.maxPoints}</span>
                        </p>
                        <div className="mt-1.5 h-1.5 bg-g100/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <p className="text-sm text-g600 mb-4 max-w-md mx-auto">
                  {getCTAMessage(totalScore)}
                </p>
                <a
                  href="https://calendly.com/team-xperiencewave/xw-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-lg transition-colors"
                >
                  Book a Free Strategy Call
                </a>

                <div className="mt-6">
                  <button
                    onClick={handleReset}
                    className="text-sm text-g500 hover:text-g700 underline transition-colors"
                  >
                    Score another program
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
