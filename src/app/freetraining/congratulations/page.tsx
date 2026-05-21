'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  trackPageView,
  trackSubmitApplication,
  trackGA4,
  trackCongratsVideoStart,
  trackCongratsVideoProgress,
  trackCongratsVideoComplete,
} from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftContent } from "@/lib/freetraining/content";
import { BunnyPlayer } from "@/components/freetraining/BunnyPlayer";
import FAQ from "@/components/shared/FAQ";

const CONGRATS_VIDEO_ID = process.env.NEXT_PUBLIC_CONGRATS_BUNNY_VIDEO_ID || '';
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_FT_BUNNY_LIBRARY_ID || '';

const splitName = (fullName: string): { first: string; last: string } => {
  const tokens = fullName.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { first: "", last: "" };
  if (tokens.length === 1) return { first: tokens[0], last: "" };
  const isInitial = /^[A-Za-z]{1,2}\.?$/.test(tokens[0]);
  if (isInitial && tokens.length >= 3) {
    return { first: `${tokens[0]} ${tokens[1]}`, last: tokens.slice(2).join(" ") };
  }
  if (isInitial && tokens.length === 2) {
    return { first: `${tokens[0]} ${tokens[1]}`, last: "" };
  }
  return { first: tokens[0], last: tokens.slice(1).join(" ") };
};

const capitalize = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function CongratulationsContent() {
  const searchParams = useSearchParams();
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [submitError, setSubmitError] = useState("");
  const [firstName, setFirstName] = useState<string>("");

  const bookingDate = searchParams.get("date") || "";
  const bookingTime = searchParams.get("time") || "";
  const durationMinutes = searchParams.get("duration") || "";
  const meetLink = searchParams.get("meet_link") || searchParams.get("meetLink") || "";
  const emailFromParams = searchParams.get("email") || "";
  const firstNameParam = searchParams.get("first_name") || "";

  const formattedDate = bookingDate
    ? new Date(bookingDate + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const formattedTime = bookingTime
    ? new Date(`2000-01-01T${bookingTime}`).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const leadEmail = emailFromParams || getStorageJSON<{ email: string }>("lead_data")?.email || "";

  useEffect(() => {
    const storedName = getStorageJSON<{ name: string }>("lead_form_data")?.name || "";
    const resolved = firstNameParam || (storedName ? splitName(storedName).first : "");
    setFirstName(resolved);
  }, [firstNameParam]);

  const hasFiredConversionRef = useRef(false);
  useEffect(() => {
    if (hasFiredConversionRef.current) return;
    hasFiredConversionRef.current = true;

    trackPageView("/freetraining/congratulations", "Call Confirmed");

    const leadData = getStorageJSON<{ leadId: string }>("lead_data");
    trackSubmitApplication(leadEmail || undefined, {
      status: "confirmed",
      lead_id: leadData?.leadId,
      booking_date: bookingDate,
    });
    trackGA4("schedule_appointment", {
      appointment_type: "strategy_call",
      booking_date: bookingDate,
    });
  }, [leadEmail, bookingDate]);

  // ── Congrats-page video tracking ──────────────────────────────
  const congratsPlayTrackedRef = useRef(false);
  const congratsMilestonesRef = useRef(new Set<number>());

  const handleCongratsPlay = useCallback(() => {
    if (congratsPlayTrackedRef.current) return;
    congratsPlayTrackedRef.current = true;
    trackCongratsVideoStart(CONGRATS_VIDEO_ID);
  }, []);

  const handleCongratsTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (duration <= 0) return;
    const percent = (currentTime / duration) * 100;
    for (const milestone of [10, 25, 50, 75, 90, 100]) {
      if (percent >= milestone && !congratsMilestonesRef.current.has(milestone)) {
        congratsMilestonesRef.current.add(milestone);
        trackCongratsVideoProgress(CONGRATS_VIDEO_ID, milestone);
      }
    }
  }, []);

  const handleCongratsEnded = useCallback(() => {
    trackCongratsVideoComplete(CONGRATS_VIDEO_ID);
  }, []);

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
    setSubmitError("");

    if (!leadEmail) {
      setSubmitError("We couldn't find your email. Please go back and book your call again.");
      setSubmitStatus('error');
      return;
    }

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
          setSubmitError(data.error || "Resume upload failed. Please try a smaller file or different format.");
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
        setSubmitError("Could not save your details. Please check your connection and try again.");
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('done');
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
      setSubmitStatus('error');
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!bookingDate || !bookingTime) return "#";
    const title = "Design Career Strategy Call - Xperience Wave";
    const details = meetLink
      ? `Google Meet: ${meetLink}\n\nPrepare:\n1. Where you feel stuck\n2. Have your LinkedIn profile open`
      : "Prepare:\n1. Where you feel stuck\n2. Have your LinkedIn profile open";
    const location = meetLink || "Google Meet";
    const startTime = (bookingTime ? bookingTime.replace(/:/g, '') : '110000').padEnd(6, '0');
    const startDate = bookingDate.replace(/-/g, '') + 'T' + startTime;
    const dur = parseInt(durationMinutes) || 45;
    const endHour = bookingTime ? parseInt(bookingTime.split(':')[0]) : 11;
    const endMin = bookingTime ? parseInt(bookingTime.split(':')[1] || '0') + dur : dur;
    const endDate = bookingDate.replace(/-/g, '') + 'T' + String(endHour + Math.floor(endMin / 60)).padStart(2, '0') + String(endMin % 60).padStart(2, '0') + '00';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&ctz=Asia/Kolkata`;
  };

  const downloadICS = () => {
    const title = "Design Career Strategy Call - Xperience Wave";
    const start = bookingDate ? bookingDate.replace(/-/g, '') + 'T' + (bookingTime ? bookingTime.replace(/:/g, '') : '1100').padEnd(6, '0') : '';
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Xperience Wave//Strategy Call//EN',
      'BEGIN:VEVENT',
      `UID:${start || Date.now()}-strategy-call@xperiencewave.com`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=Asia/Kolkata:${start}`,
      `SUMMARY:${title}`,
      meetLink ? `LOCATION:${meetLink}` : '',
      `DESCRIPTION:Prepare: 1. Where you feel stuck 2. Have your LinkedIn profile open`,
      `DURATION:PT${parseInt(durationMinutes) || 45}M`,
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

  const displayName = firstName ? capitalize(firstName) : 'there';
  const greetingName = `, ${displayName}`;
  const weekday = bookingDate
    ? new Date(bookingDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long" })
    : '';
  const host = searchParams.get("host") || "Murad or Almas";

  // Compact confirmation line: "Tuesday, 26 May 2026 · 4:30 PM IST · with Murad or Almas"
  const confirmationLine = [
    formattedDate,
    formattedTime ? `${formattedTime} IST` : '',
    `with ${host}`,
  ].filter(Boolean).join(' · ');

  const videoNote = weekday ? `60 seconds. Worth watching before ${weekday}.` : '60 seconds.';
  const signoffLine = weekday ? `See you ${weekday}${greetingName}.` : `See you soon${greetingName}.`;

  return (
    <div className="min-h-screen bg-white">

      {/* ============ SECTION 1: CONFIRMATION BLOCK ============ */}
      <div className="max-w-[820px] mx-auto px-5 pt-10 md:pt-14">
        <section>
          <div className="bg-ft-section-bg rounded-2xl p-6 md:p-10">
            <h1 className="text-[22px] md:text-[28px] font-heading font-bold text-ft-dark-surface mb-6">
              You&apos;re booked{greetingName}.
            </h1>

            <div className="border-l-[3px] border-accent pl-5 md:pl-7 py-2 mb-7">
              <p className="text-[12px] md:text-[13px] font-bold tracking-wider uppercase text-accent mb-2">
                {ftContent.congratulations.confirmedLabel}
              </p>
              {bookingDate ? (
                <p className="text-[18px] md:text-[24px] lg:text-[26px] font-heading font-bold text-ft-dark-surface leading-tight max-w-[700px]">
                  {confirmationLine}
                </p>
              ) : (
                <p className="text-[18px] md:text-[22px] font-heading font-bold text-ft-dark-surface leading-tight max-w-[640px]">
                  {ftContent.congratulations.confirmDetailFallback}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
              <a
                href={bookingDate ? getGoogleCalendarUrl() : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!bookingDate) e.preventDefault();
                  trackGA4("calendar_added_google");
                }}
                aria-disabled={!bookingDate}
                className={`inline-flex items-center justify-center gap-2 text-[14px] md:text-[15px] font-semibold text-white bg-ft-dark-surface rounded-md px-5 py-3 shadow-sm transition-all duration-150 ${bookingDate ? 'hover:opacity-90 hover:shadow active:scale-[0.99] cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" /></svg>
                Add to Google Calendar
              </a>
              <button
                onClick={() => {
                  if (!bookingDate) return;
                  trackGA4("calendar_added_apple");
                  downloadICS();
                }}
                disabled={!bookingDate}
                className={`inline-flex items-center justify-center gap-2 text-[14px] md:text-[15px] font-semibold text-ft-dark-surface bg-white border border-gray-300 rounded-md px-5 py-3 shadow-sm transition-all duration-150 ${bookingDate ? 'hover:bg-gray-50 hover:border-gray-400 hover:shadow active:scale-[0.99] cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" /></svg>
                Add to iCal
              </button>
            </div>

            <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
              {ftContent.congratulations.confirmMicrocopy}
            </p>
          </div>
        </section>
      </div>

      {/* ============ SECTION 2: TESTIMONIALS (moved up) ============ */}
      <section className="bg-white py-14 md:py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface mb-8 md:mb-10">
            {ftContent.congratulations.menteesTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {ftContent.results.cards.map((card) => (
              <div key={card.name} className="bg-white border border-[#E5E5EA] rounded-xl p-4 md:p-5 flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 mb-3 flex-shrink-0 ring-2 ring-gray-100">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                      {card.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="text-[15px] md:text-[17px] font-bold text-ft-dark-surface leading-tight">{card.name}</p>
                <p className="text-[13px] md:text-[14px] text-gray-500 leading-snug mt-1">{card.role}</p>
                <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full bg-red-50 text-red-500 text-[12px] md:text-[13px] font-semibold">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {card.timeline}
                </span>
                {card.linkedin && (
                  <a
                    href={card.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[#0A66C2] hover:text-[#004182] transition-colors"
                    aria-label={`${card.name} on LinkedIn`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <a
              href={ftContent.results.seeAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-blue-600 hover:underline underline"
            >
              {ftContent.congratulations.menteesSeeAll}
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-[820px] mx-auto px-5 pb-4">

        {/* ============ SECTION 3: PRE-CALL VIDEO ============ */}
        <section className="mb-14 md:mb-16">
          <h2 className="text-center text-[18px] md:text-[22px] font-heading font-bold text-ft-dark-surface mb-6 leading-snug max-w-[560px] mx-auto">
            {ftContent.congratulations.videoTitle}
          </h2>
          <div className="max-w-[340px] mx-auto">
            {CONGRATS_VIDEO_ID && BUNNY_LIBRARY_ID ? (
              <BunnyPlayer
                videoId={CONGRATS_VIDEO_ID}
                libraryId={BUNNY_LIBRARY_ID}
                aspectRatio="9/16"
                onPlay={handleCongratsPlay}
                onTimeUpdate={handleCongratsTimeUpdate}
                onEnded={handleCongratsEnded}
              />
            ) : (
              <div className="aspect-[9/16] rounded-xl bg-gray-100 border border-gray-200" />
            )}
          </div>
          <p className="text-center text-[13px] md:text-[14px] text-gray-500 mt-4">
            {videoNote}
          </p>
        </section>

        {/* ============ SECTION 4: TWO THINGS TO PREPARE ============ */}
        <section className="mb-14 md:mb-16">
          <h2 className="text-[22px] md:text-[28px] font-heading font-bold text-ft-dark-surface mb-8">
            {ftContent.congratulations.prepare.title}
          </h2>
          <div className="space-y-8">
            {ftContent.congratulations.prepare.items.map((item) => (
              <div key={item.number}>
                <h3 className="text-[16px] md:text-[18px] font-heading font-bold text-ft-dark-surface mb-2 leading-tight">
                  <span className="text-accent">{item.number}</span>
                  <span className="text-gray-300 mx-2">·</span>
                  {item.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#4D4D57] leading-[180%] max-w-[640px]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ SECTION 5: OPTIONAL UPLOADS ============ */}
        <section className="mb-14 md:mb-16">
          <h2 className="text-[18px] md:text-[20px] font-heading font-bold text-ft-dark-surface mb-1">
            {ftContent.congratulations.optional.title}
          </h2>
          <p className="text-[14px] md:text-[15px] italic text-gray-500 mb-4">
            {ftContent.congratulations.optional.subtext}
          </p>

          {submitStatus === 'done' ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700 font-medium">
              Thanks — we&apos;ve got it. We&apos;ll review it before the call.
            </div>
          ) : (
            <div className="rounded-md border border-gray-300 bg-white">
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => { setPortfolioUrl(e.target.value); setSubmitStatus('idle'); }}
                placeholder={ftContent.congratulations.optional.placeholder}
                className="w-full px-4 py-3 text-[14px] md:text-[15px] text-gray-900 bg-transparent placeholder-gray-400 border-0 rounded-t-md focus:outline-none"
              />
              <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2">
                {resumeFile ? (
                  <div className="flex items-center gap-2 text-[13px] md:text-[14px] text-gray-700">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="truncate max-w-[200px]">{resumeFile.name}</span>
                    <button type="button" onClick={() => { setResumeFile(null); setSubmitStatus('idle'); }} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Remove file">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-1 text-[13px] md:text-[14px] font-medium text-ft-dark-surface hover:text-black cursor-pointer">
                    <span>+ Add files</span>
                    <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleResumeSelect} aria-label="Upload resume file" />
                  </label>
                )}
                <button onClick={handleSubmit} disabled={(!portfolioUrl && !resumeFile) || submitStatus === 'submitting'} className="text-[13px] md:text-[14px] font-semibold text-blue-600 hover:underline underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer">
                  {submitStatus === 'submitting' ? 'Submitting…' : submitStatus === 'error' ? 'Try again' : 'Submit'}
                </button>
              </div>
            </div>
          )}
          {resumeError && <p className="text-[13px] text-red-500 mt-2">{resumeError}</p>}
          {submitStatus === 'error' && submitError && <p className="text-[13px] text-red-500 mt-2">{submitError}</p>}
        </section>

        {/* ============ SECTION 6: RESCHEDULE ============ */}
        <section className="mb-4">
          <h2 className="text-[18px] md:text-[20px] font-heading font-bold text-ft-dark-surface mb-2">
            {ftContent.congratulations.reschedule.title}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#4D4D57] leading-[180%] max-w-[700px]">
            {ftContent.congratulations.reschedule.body}
          </p>
        </section>

      </div>

      {/* ============ SECTION 7: FAQS (full-width) ============ */}
      <FAQ
        title="Frequently Asked Questions (FAQs)"
        faqs={ftContent.congratulations.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        showCTA={false}
        className="!pb-6 md:!pb-8"
      />

      {/* ============ SECTION 8: SIGN-OFF ============ */}
      <section className="bg-white px-5 pt-2 pb-16 md:pb-20">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[15px] md:text-[16px] italic text-ft-dark-surface leading-[180%]">
            {signoffLine}
          </p>
          <p className="text-[15px] md:text-[16px] italic text-gray-500 mt-1">
            {ftContent.congratulations.signoffFrom}
          </p>
        </div>
      </section>

    </div>
  );
}

export default function CongratulationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CongratulationsContent />
    </Suspense>
  );
}
