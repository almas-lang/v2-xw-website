'use client';

import { useState } from 'react';

const CHATGPT_URL = 'https://chatgpt.com/g/g-69cb92908a048191a028bf15615a8f17-salary-negotiation-for-ux-designers-xperience-wave';

export default function SalaryNegotiationGPTGate() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, leadType: 'salary-negotiation-gpt' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        // Open ChatGPT in new tab after brief delay
        setTimeout(() => {
          window.open(CHATGPT_URL, '_blank');
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="my-10 rounded-2xl overflow-hidden" style={{ background: '#030303' }}>
        <div className="p-8 md:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
            Check your inbox
          </h3>
          <p className="text-base text-white/50 max-w-md mx-auto mb-4">
            We&apos;ve sent you the GPT link. It&apos;s also opening in a new tab now.
          </p>
          <a
            href={CHATGPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            Open GPT manually &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl overflow-hidden" style={{ background: '#030303' }}>
      <div className="p-6 md:p-10">
        {/* Brief headline */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Free Tool</span>
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
            Practise your salary negotiation before the real conversation
          </h3>
          <p className="text-sm text-white/70">
            Custom scripts, HR simulation, and coaching - built on the RIVER framework.
          </p>
        </div>

        {/* Email capture */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            placeholder="Enter your email to get access"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors text-base"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                Getting access...
              </>
            ) : (
              'Get Free Access'
            )}
          </button>
        </form>

        {status === 'error' && errorMsg && (
          <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
        )}

        <p className="mt-4 text-xs text-white/40">
          We&apos;ll send you the tool link + the full RIVER Negotiation Guide as a bonus.
        </p>
      </div>
    </div>
  );
}
