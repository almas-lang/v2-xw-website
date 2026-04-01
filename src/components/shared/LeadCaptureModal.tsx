'use client';

import { useState } from 'react';

export type LeadType =
  | 'design-team-systems-audit'
  | 'design-strategy-gpt'
  | 'research-synthesis-gpt'
  | 'microcopy-writer-gpt'
  | 'portfolio-feedback-gpt'
  | 'resume-reviewer-gpt'
  | 'salary-negotiation-gpt'
  | 'ux-audit-gpt'
  | 'course-design-strategy'
  | 'course-ux-research'
  | 'course-portfolio'
  | 'course-design-system';

interface LeadConfig {
  title: string;
  description: string;
  buttonText: string;
  badgeText: string;
  successMessage: string;
  isWaitlist: boolean;
}

const leadConfigs: Record<LeadType, LeadConfig> = {
  // Audit Tool
  'design-team-systems-audit': {
    title: 'Access Design Team Systems Audit',
    description: 'Score your design team\'s operational systems across 5 dimensions. 20 questions. 100 points.',
    buttonText: 'Get Free Access',
    badgeText: 'Free Tool',
    successMessage: 'Redirecting to the audit...',
    isWaitlist: false,
  },
  // GPT Tools - Available
  'design-strategy-gpt': {
    title: 'Access Design Strategy GPT',
    description: 'Get instant access to our AI tool that helps you position design at the center of business growth.',
    buttonText: 'Get Free Access',
    badgeText: 'Free Tool',
    successMessage: 'Redirecting to the GPT...',
    isWaitlist: false,
  },
  // GPT Tools - Waitlist
  'research-synthesis-gpt': {
    title: 'Research Synthesis GPT',
    description: 'Be the first to know when this tool launches. Turn messy interview notes into clear themes and insights.',
    buttonText: 'Join Waitlist',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'microcopy-writer-gpt': {
    title: 'UX Microcopy Writer GPT',
    description: 'Be the first to know when this tool launches. Generate button labels, error messages, and tooltips.',
    buttonText: 'Join Waitlist',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'portfolio-feedback-gpt': {
    title: 'Portfolio Feedback GPT',
    description: 'Be the first to know when this tool launches. Get your case studies reviewed like a hiring manager would.',
    buttonText: 'Join Waitlist',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'resume-reviewer-gpt': {
    title: 'Resume Reviewer GPT',
    description: 'Be the first to know when this tool launches. Score your UX resume against what recruiters scan for.',
    buttonText: 'Join Waitlist',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'salary-negotiation-gpt': {
    title: 'Access Salary Negotiation GPT',
    description: 'Scripts and tactics for negotiating UX offers in India. Built on the RIVER framework.',
    buttonText: 'Get Free Access',
    badgeText: 'Free Tool',
    successMessage: 'Redirecting to the GPT...',
    isWaitlist: false,
  },
  'ux-audit-gpt': {
    title: 'UX Audit GPT',
    description: 'Be the first to know when this tool launches. Evaluate any screen against usability heuristics.',
    buttonText: 'Join Waitlist',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  // Courses
  'course-design-strategy': {
    title: 'Design Strategy for Product Designers',
    description: 'Be the first to know when this course launches. Learn to position design at the center of business growth.',
    buttonText: 'Notify Me',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'course-ux-research': {
    title: 'Mixed Methods UX Research',
    description: 'Be the first to know when this course launches. Master qualitative and quantitative research methods.',
    buttonText: 'Notify Me',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'course-portfolio': {
    title: 'Portfolio That Gets You Hired',
    description: 'Be the first to know when this course launches. Structure case studies that hiring managers actually read.',
    buttonText: 'Notify Me',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
  'course-design-system': {
    title: 'Build a Practical Design System',
    description: 'Be the first to know when this course launches. Set up tokens, components, and documentation that scales.',
    buttonText: 'Notify Me',
    badgeText: 'Coming Soon',
    successMessage: 'You\'re on the list!',
    isWaitlist: true,
  },
};

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadType: LeadType;
}

export default function LeadCaptureModal({ isOpen, onClose, leadType }: LeadCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const config = leadConfigs[leadType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, leadType }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        if (data.redirectUrl) {
          setRedirectUrl(data.redirectUrl);
          // Redirect after a short delay
          setTimeout(() => {
            window.open(data.redirectUrl, '_blank');
            handleClose();
          }, 1500);
        }
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    setRedirectUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-carbon border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          /* Success State */
          <div className="text-center py-4">
            <div className={`w-16 h-16 ${config.isWaitlist ? 'bg-indigo-500/20' : 'bg-green-500/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-8 h-8 ${config.isWaitlist ? 'text-indigo-400' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {config.isWaitlist ? "You're on the List!" : 'Access Granted!'}
            </h3>
            <p className="text-g300 mb-6">
              {redirectUrl ? (
                <>Opening the tool in a new tab...</>
              ) : (
                <>We&apos;ll notify <span className="text-white font-medium">{email}</span> when it&apos;s ready.</>
              )}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors"
            >
              {redirectUrl ? 'Done' : 'Got it'}
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            <div className="mb-6">
              <span className={`inline-block ${config.isWaitlist ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'} text-xs font-medium px-3 py-1 rounded-full mb-4`}>
                {config.badgeText}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {config.title}
              </h3>
              <p className="text-g300 text-sm md:text-base">
                {config.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-email" className="sr-only">Email address</label>
                <input
                  id="lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-g400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-6 py-3.5 ${config.isWaitlist ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {config.isWaitlist ? 'Joining...' : 'Getting Access...'}
                  </>
                ) : (
                  <>
                    {config.buttonText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-g400 text-xs text-center">
                {config.isWaitlist
                  ? "We'll only email you when it's ready. No spam."
                  : 'Free access, no credit card required.'}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
