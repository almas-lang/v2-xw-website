'use client';

import { useState } from 'react';

type BadgeStyle = 'glass-bold' | 'glass' | 'text-accent';
type RatingStyle = 'bold-accent' | 'glass-pill';
type HighlightStyle = 'red-bold' | 'red-bg' | 'gradient-text';

export function HeroOptionB({ onCtaClick }: { onCtaClick: () => void }) {
  const [highlightStyle, setHighlightStyle] = useState<HighlightStyle>('red-bold');
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('glass-bold');
  const [ratingStyle, setRatingStyle] = useState<RatingStyle>('bold-accent');

  const renderHighlight = (text: string) => {
    switch (highlightStyle) {
      case 'red-bold':
        return <span className="text-accent font-bold">{text}</span>;
      case 'red-bg':
        return (
          <span className="relative inline-block">
            <span className="relative z-10 text-white font-bold px-1">{text}</span>
            <span className="absolute inset-0 bg-accent rounded-sm -skew-x-1" />
          </span>
        );
      case 'gradient-text':
        return (
          <span className="font-bold" style={{ background: 'linear-gradient(90deg, #FF0023, #FF4D6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {text}
          </span>
        );
    }
  };

  const renderBadge = () => {
    switch (badgeStyle) {
      case 'glass-bold':
        return (
          <span className="inline-flex items-center gap-3 px-5 py-3.5 bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm rounded-2xl max-w-[400px] shadow-lg shadow-black/20">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-[13px] md:text-[14px] text-white/90 font-semibold leading-snug">
              For <span className="text-accent">UX/UI/Product Designers</span> with 2-8 Years Who Keep Getting Passed Over For Senior Roles
            </span>
          </span>
        );
      case 'glass':
        return (
          <span className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-full max-w-[380px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-[12px] md:text-[13px] text-white/80 font-medium leading-snug">
              For UX/UI/Product Designers with 2-8 Years Who Keep Getting Passed Over For Senior Roles
            </span>
          </span>
        );
      case 'text-accent':
        return (
          <p className="text-[14px] md:text-[15px] text-white/50 font-medium leading-relaxed max-w-[420px]">
            For <span className="text-accent font-semibold">UX/UI/Product Designers</span> with <span className="text-white font-semibold">2-8 Years</span> Who Keep Getting Passed Over For Senior Roles
          </p>
        );
    }
  };

  const renderRating = () => {
    const stars = [1, 2, 3, 4, 5];
    switch (ratingStyle) {
      case 'bold-accent':
        return (
          <div className="flex items-center gap-3">
            <span className="text-[22px] md:text-[26px] font-heading font-bold text-white">4.8</span>
            <div className="flex gap-0.5">
              {stars.map((s) => (
                <svg key={s} className="w-[18px] h-[18px] text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[13px] text-white/40 font-medium">from 1,823 ratings</span>
          </div>
        );
      case 'glass-pill':
        return (
          <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-full">
            <div className="flex gap-0.5">
              {stars.map((s) => (
                <svg key={s} className="w-3.5 h-3.5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[13px] text-white font-semibold">4.8</span>
            <span className="w-px h-3.5 bg-white/10" />
            <span className="text-[12px] text-white/50">1,823 ratings</span>
          </span>
        );
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,0,35,0.07) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 85% 70%, rgba(108,99,255,0.05) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 90%, rgba(255,0,35,0.03) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Style switchers (remove before production) */}
      <div className="fixed top-2 right-20 z-[9998] flex flex-col gap-1">
        <div className="flex gap-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-1">
          {(['red-bold', 'red-bg', 'gradient-text'] as HighlightStyle[]).map((s) => (
            <button key={s} onClick={() => setHighlightStyle(s)} className={`px-2 py-1 text-[9px] font-semibold rounded transition-colors ${highlightStyle === s ? 'bg-accent text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
              {s === 'red-bold' ? 'Bold' : s === 'red-bg' ? 'BG' : 'Grad'}
            </button>
          ))}
          <span className="text-[8px] text-white/20 self-center ml-0.5">HL</span>
        </div>
        <div className="flex gap-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-1">
          {(['glass-bold', 'glass', 'text-accent'] as BadgeStyle[]).map((s) => (
            <button key={s} onClick={() => setBadgeStyle(s)} className={`px-2 py-1 text-[9px] font-semibold rounded transition-colors ${badgeStyle === s ? 'bg-[#6C63FF] text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
              {s === 'glass-bold' ? 'G+' : s === 'glass' ? 'Glass' : 'Text'}
            </button>
          ))}
          <span className="text-[8px] text-white/20 self-center ml-0.5">Badge</span>
        </div>
        <div className="flex gap-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-1">
          {(['bold-accent', 'glass-pill'] as RatingStyle[]).map((s) => (
            <button key={s} onClick={() => setRatingStyle(s)} className={`px-2 py-1 text-[9px] font-semibold rounded transition-colors ${ratingStyle === s ? 'bg-[#F59E0B] text-black' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
              {s === 'bold-accent' ? 'Bold' : 'Pill'}
            </button>
          ))}
          <span className="text-[8px] text-white/20 self-center ml-0.5">Stars</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy column */}
          <div>
            <div className="mb-5 md:mb-6">{renderRating()}</div>
            <div className="mb-6 md:mb-7">{renderBadge()}</div>

            <h1 className="font-heading font-bold text-white leading-[1.12] tracking-tight text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] mb-5 md:mb-6">
              Still Getting Overlooked For {renderHighlight('Senior Roles')} –{' '}
              <span className="text-g500 italic font-normal">
                Despite Being Better Than Half The People Getting Promoted?
              </span>
            </h1>

            <p className="text-[15px] md:text-[17px] text-[#BFBFCC] leading-[175%] mb-3 md:mb-4 max-w-[520px]">
              Watch this free 28-min training where Shaik Murad breaks down why this keeps happening – and how 830+ designers landed senior &amp; leadership roles paying ₹18-28 LPA in under 90 days.
            </p>

            <p className="text-[12px] md:text-[13px] text-[#80809B] italic mb-8 md:mb-0">
              Without a fancy degree, big-brand resume, or prior team leadership experience.
            </p>
          </div>

          {/* Video + CTA column */}
          <div>
            <button onClick={onCtaClick} className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.08] group shadow-2xl shadow-black/50" aria-label="Watch free training – scrolls to form">
              <img src="/freetraining/video-thumbnail.png" alt="Free training video – Shaik Murad" className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                <div className="w-14 h-14 md:w-[68px] md:h-[68px] bg-accent rounded-full flex items-center justify-center shadow-xl shadow-accent/30 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
            <div className="mt-5 md:mt-6">
              <button onClick={onCtaClick} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] md:text-base rounded-lg transition-colors shadow-lg shadow-accent/20">
                Watch free training
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
