'use client';

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { trackPageView, trackConversionAPI, trackGA4 } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftContent } from "@/lib/freetraining/content";
import { BunnyPlayer } from "@/components/freetraining/BunnyPlayer";

const CONGRATS_VIDEO_ID = process.env.NEXT_PUBLIC_CONGRATS_BUNNY_VIDEO_ID || '';
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_FT_BUNNY_LIBRARY_ID || '';

/* ─── SVG Icon Components ─── */

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function VideoCameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.68 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.289 0-2.449-.637-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.68 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.289 0-2.449-.637-2.917-1.179z" />
    </svg>
  );
}

/* ─── FAQ Accordion Item ─── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-150"
        aria-expanded={open}
      >
        <span className="text-[15px] md:text-[16px] font-semibold text-ft-dark-surface">{question}</span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 md:px-5 pb-4 text-[15px] md:text-[16px] text-gray-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

function CongratulationsContent() {
  const searchParams = useSearchParams();
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const bookingDate = searchParams.get("date") || "";
  const bookingTime = searchParams.get("time") || "";
  const meetLink = searchParams.get("meet_link") || searchParams.get("meetLink") || "";
  const emailFromParams = searchParams.get("email") || "";

  const leadEmail = emailFromParams || getStorageJSON<{ email: string }>("lead_data")?.email || "";

  useEffect(() => {
    trackPageView("/freetraining/congratulations", "Call Confirmed");

    if (leadEmail) {
      const leadData = getStorageJSON<{ leadId: string }>("lead_data");
      trackConversionAPI("Schedule", leadEmail, undefined, {
        content_name: "Strategy Call Booked",
        status: "confirmed",
        lead_id: leadData?.leadId,
      });
    }
    trackGA4("schedule_appointment", {
      appointment_type: "strategy_call",
      booking_date: bookingDate,
    });
  }, [bookingDate, leadEmail]);

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeError("");
    if (file.size > 10 * 1024 * 1024) {
      setResumeError("File is too large. Maximum size is 10MB.");
      e.target.value = '';
      return;
    }
    setResumeFile(file);
    setSubmitStatus('idle');
  };

  const handleSubmit = async () => {
    if ((!portfolioUrl && !resumeFile) || submitStatus === 'submitting') return;
    setSubmitStatus('submitting');

    if (!leadEmail) { setSubmitStatus('error'); return; }

    try {
      const webhookPayload: Record<string, string> = { email: leadEmail };

      if (portfolioUrl) {
        const normalizedUrl = portfolioUrl.match(/^https?:\/\//) ? portfolioUrl : `https://${portfolioUrl}`;
        webhookPayload.portfolio_url = normalizedUrl;
        trackGA4("portfolio_shared", { url: normalizedUrl });
      }

      if (resumeFile) {
        trackGA4("resume_uploaded", { file_name: resumeFile.name });
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('email', leadEmail);
        const res = await fetch("/freetraining/api/upload-resume", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success && data.url) {
          webhookPayload.resume_url = data.url;
        } else {
          setSubmitStatus('error');
          return;
        }
      }

      const webhookRes = await fetch("/freetraining/api/saleshub/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });
      if (!webhookRes.ok) {
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('done');
    } catch {
      setSubmitStatus('error');
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!bookingDate || !bookingTime) return "#";
    const title = "Design Career Strategy Call - Xperience Wave";
    const details = meetLink
      ? `Google Meet: ${meetLink}\n\nPrepare:\n1. Your #1 career goal for the next 90 days\n2. Have LinkedIn profile open`
      : "Prepare:\n1. Your #1 career goal for the next 90 days\n2. Have LinkedIn profile open";
    const location = "Google Meet";
    const startDate = bookingDate.replace(/-/g, '') + 'T' + (bookingTime.replace(/:/g, '') || '110000');
    const endHour = bookingTime ? parseInt(bookingTime.split(':')[0]) : 11;
    const endMin = bookingTime ? parseInt(bookingTime.split(':')[1] || '0') + 45 : 45;
    const endDate = bookingDate.replace(/-/g, '') + 'T' + String(endHour + Math.floor(endMin / 60)).padStart(2, '0') + String(endMin % 60).padStart(2, '0') + '00';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&ctz=Asia/Kolkata`;
  };

  const downloadICS = () => {
    const title = "Design Career Strategy Call - Xperience Wave";
    const start = bookingDate ? bookingDate.replace(/-/g, '') + 'T' + (bookingTime?.replace(/:/g, '') || '1100') + '00' : '';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Asia/Kolkata:${start}`,
      `SUMMARY:${title}`,
      meetLink ? `LOCATION:${meetLink}` : '',
      `DESCRIPTION:Prepare: 1. Your #1 career goal 2. LinkedIn profile open`,
      'DURATION:PT45M',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strategy-call.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/40 via-white to-white">
      <div className="max-w-[700px] lg:max-w-[1000px] mx-auto px-5 py-8 md:py-14 lg:py-20">

        {/* ── Section 1: Murad's Video ── */}
        <section className="mb-8 md:mb-12">
          {CONGRATS_VIDEO_ID && BUNNY_LIBRARY_ID ? (
            <BunnyPlayer videoId={CONGRATS_VIDEO_ID} libraryId={BUNNY_LIBRARY_ID} />
          ) : (
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <Image
                src="/images/Murad.png"
                alt="Shaik Murad - Personal message"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-lg transition-transform duration-200 hover:scale-105">
                    <PlayIcon className="w-7 h-7 text-ft-purple-cta ml-0.5" />
                  </div>
                  <p className="text-[15px] md:text-[16px] text-white/90 font-medium drop-shadow-md">Personal message from Shaik Murad</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Section 2: Booking Confirmation ── */}
        <section className="mb-8 md:mb-12">
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 md:p-8 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-[24px] md:text-[32px] font-bold text-ft-dark-surface mb-1 tracking-tight">
              You&apos;re booked!
            </h1>
            {bookingDate ? (
              <>
                <p className="text-[15px] md:text-[16px] text-gray-500 mb-5">Your strategy call is confirmed for:</p>
                <div className="bg-gray-50 rounded-xl p-4 md:p-5 mb-5 max-w-[420px] mx-auto">
                  <div className="flex items-center justify-center gap-5 text-[16px] md:text-[17px] font-semibold text-ft-dark-surface mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon className="w-4.5 h-4.5 text-ft-purple-cta" />
                      {bookingDate}
                    </span>
                    {bookingTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="w-4.5 h-4.5 text-ft-purple-cta" />
                        {bookingTime} IST
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[15px] md:text-[16px] text-gray-500 mb-1">
                    <VideoCameraIcon className="w-4 h-4 text-gray-400" />
                    <span>Google Meet</span>
                  </div>
                  {meetLink && (
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] md:text-[16px] text-ft-purple-cta hover:underline break-all cursor-pointer transition-colors duration-200"
                    >
                      {meetLink}
                    </a>
                  )}
                </div>
              </>
            ) : (
              <p className="text-[15px] md:text-[16px] text-gray-500 mb-5">
                Your strategy call is confirmed. Check your email and WhatsApp for the date, time, and meeting link.
              </p>
            )}

            <p className="text-[14px] text-gray-400 mb-5">
              Save this — you&apos;ll also receive it via email and WhatsApp
            </p>

            {bookingDate && (
              <div className="flex items-center justify-center gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGA4("calendar_added_google")}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-ft-purple-cta bg-ft-purple-cta/5 border border-ft-purple-cta/20 rounded-lg px-4 py-2.5 hover:bg-ft-purple-cta/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Google Calendar
                </a>
                <button
                  onClick={() => {
                    trackGA4("calendar_added_apple");
                    downloadICS();
                  }}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-ft-purple-cta bg-ft-purple-cta/5 border border-ft-purple-cta/20 rounded-lg px-4 py-2.5 hover:bg-ft-purple-cta/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Apple Calendar
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Section 3: Homework ── */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-ft-dark-surface mb-4 md:mb-5">Before your call, do these 2 things:</h2>
          <div className="space-y-3 md:space-y-4">
            {ftContent.congratulations.homework.map((task, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-ft-purple-cta/10 text-ft-purple-cta text-[14px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] md:text-[16px] font-semibold text-ft-dark-surface mb-1 leading-snug">
                      {task.title}
                    </p>
                    <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed">{task.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Help Us Prepare ── */}
        <section className="mb-8 md:mb-12">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-7 shadow-sm">
            <div className="mb-4">
              <h2 className="text-[20px] md:text-[24px] font-bold text-ft-dark-surface">Help us prepare for YOUR call</h2>
              <p className="text-[14px] text-gray-400 mt-0.5">Optional but recommended</p>
            </div>
            <p className="text-[15px] md:text-[16px] text-gray-500 mb-5 leading-relaxed">
              Your LinkedIn is already shared — we&apos;ll review it before the call.
            </p>

            <div className="space-y-4 md:space-y-5">
              {/* Portfolio URL */}
              <div>
                <label htmlFor="portfolio-url" className="block text-[15px] md:text-[16px] font-medium text-gray-700 mb-1.5">
                  Got a portfolio? Share the link:
                </label>
                <input
                  id="portfolio-url"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => { setPortfolioUrl(e.target.value); setSubmitStatus('idle'); }}
                  placeholder="https://your-portfolio.com"
                  className="w-full px-3 py-2.5 md:py-3 text-[14px] rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-ft-purple-cta focus:ring-2 focus:ring-ft-purple-cta/20 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Resume select */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-medium text-gray-700 mb-1.5">Got an updated resume?</label>
                {resumeFile ? (
                  <div className="inline-flex items-center gap-2 px-4 py-3 bg-ft-purple-cta/5 border border-ft-purple-cta/20 rounded-lg">
                    <CheckIcon className="w-4 h-4 text-ft-purple-cta" />
                    <span className="text-[14px] text-gray-700 font-medium truncate max-w-[200px]">{resumeFile.name}</span>
                    <button
                      type="button"
                      onClick={() => { setResumeFile(null); setSubmitStatus('idle'); }}
                      className="ml-1 p-0.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                      aria-label="Remove file"
                    >
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2.5 px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-ft-purple-cta/40 hover:bg-ft-purple-cta/[0.02] active:scale-[0.99] transition-all duration-200">
                    <UploadIcon className="w-4.5 h-4.5 text-gray-400" />
                    <span className="text-[14px] text-gray-500">Upload PDF or DOCX (max 10MB)</span>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={handleResumeSelect}
                      aria-label="Upload resume file"
                    />
                  </label>
                )}
                {resumeError && (
                  <p className="text-[13px] text-red-500 mt-1">{resumeError}</p>
                )}
              </div>

              {/* Submit button */}
              {submitStatus === 'done' ? (
                <div className="inline-flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span className="text-[14px] text-green-700 font-medium">Submitted successfully</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={(!portfolioUrl && !resumeFile) || submitStatus === 'submitting'}
                    className="w-full py-3 bg-ft-purple-cta text-white text-[15px] font-semibold rounded-lg hover:bg-[#5B53E6] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : submitStatus === 'error' ? (
                      'Try again'
                    ) : (
                      'Submit'
                    )}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-[13px] text-red-500 mt-1">Something went wrong. Please check your connection and try again.</p>
                  )}
                </>
              )}
            </div>

            <p className="text-[14px] text-gray-400 mt-4 leading-relaxed">
              The more we know about you beforehand, the faster we get to actionable advice.
            </p>
          </div>
        </section>

        {/* ── Section 5: Call Structure ── */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-ft-dark-surface mb-4 md:mb-5">What happens on the call:</h2>
          <div className="space-y-1">
            {ftContent.congratulations.callBreakdown.map((step, i) => (
              <div key={step.time} className="flex items-start gap-4 py-3 md:py-4">
                <div className="flex flex-col items-center flex-shrink-0 w-[72px] md:w-[84px]">
                  <span className="text-[12px] md:text-[13px] font-bold text-ft-purple-cta uppercase tracking-wide leading-tight text-right w-full">
                    {step.time}
                  </span>
                </div>
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-ft-purple-cta" />
                  {i < ftContent.congratulations.callBreakdown.length - 1 && (
                    <div className="w-px flex-1 bg-ft-purple-cta/20 mt-1 min-h-[28px]" />
                  )}
                </div>
                <div className="pb-1">
                  <p className="text-[15px] md:text-[16px] font-semibold text-ft-dark-surface leading-snug">{step.label}</p>
                  <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 6: What We Offer ── */}
        <section className="mb-8 md:mb-12">
          <div className="bg-ft-purple-cta/[0.03] rounded-2xl border border-ft-purple-cta/10 p-5 md:p-7">
            <h2 className="text-[20px] md:text-[24px] font-bold text-ft-dark-surface mb-2">What we offer:</h2>
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-4">
              Xperience Wave runs 1:1 mentorship programs (not courses) tailored to your career stage. On the strategy call, if we think we can help, we&apos;ll walk you through which program fits your situation and what the investment looks like.
            </p>
            <Link
              href="/programs"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-[15px] md:text-[16px] font-semibold text-ft-purple-cta hover:underline cursor-pointer transition-colors duration-200"
            >
              Explore our programs
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── Section 7: Call Testimonials ── */}
        <section className="mb-8 md:mb-12">
          <div className="space-y-3 md:space-y-4">
            {ftContent.congratulations.callTestimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <QuoteIcon className="w-6 h-6 text-ft-purple-cta/20 mb-2" />
                <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-3">
                  {t.quote}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-ft-purple-cta/30" />
                  <p className="text-[14px] font-semibold text-ft-dark-surface">{t.name}, <span className="font-normal text-gray-500">{t.role}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 8: FAQ ── */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-ft-dark-surface mb-1">Have questions before the call?</h2>
          <p className="text-[15px] md:text-[16px] text-gray-500 mb-5">
            <a
              href="https://wa.me/919380506841"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ft-purple-cta hover:underline font-medium cursor-pointer transition-colors duration-200"
            >
              <svg className="inline w-4 h-4 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.818-6.297-2.187a.5.5 0 00-.42-.084l-3.162 1.06 1.06-3.162a.5.5 0 00-.083-.42A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              WhatsApp us at +91 93805 06841
            </a>
            {' '}— we typically respond within 2 hours.
          </p>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {ftContent.congratulations.callFaqs.map((faq) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default function CongratulationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-green-50/40 via-white to-white" />}>
      <CongratulationsContent />
    </Suspense>
  );
}
