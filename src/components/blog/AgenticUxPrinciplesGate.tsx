'use client';

import { useState } from 'react';

export default function AgenticUxPrinciplesGate() {
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
        body: JSON.stringify({ email, leadType: 'agentic-ux-principles' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
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
          <p className="text-base text-white/50 max-w-md mx-auto">
            We&apos;ve sent the 10 Principles of Agentic UX reference to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl overflow-hidden" style={{ background: '#030303' }}>
      <div className="p-6 md:p-10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Free Download</span>
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
            The 10 Principles of Agentic UX
          </h3>
          <p className="text-sm text-white/70">
            All 10 principles with the specific design pattern for each, plus the three human involvement levels and when to use each. One page. Printable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            placeholder="Enter your email to get the reference"
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
                Sending...
              </>
            ) : (
              'Get the Principles'
            )}
          </button>
        </form>

        {status === 'error' && errorMsg && (
          <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
        )}

        <p className="mt-4 text-xs text-white/40">
          No spam. Just the principles.
        </p>
      </div>
    </div>
  );
}
