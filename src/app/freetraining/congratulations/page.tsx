'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trackPageView, trackConversionAPI, trackGA4 } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftContent } from "@/lib/freetraining/content";

function CongratulationsContent() {
  const searchParams = useSearchParams();
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // Read booking details from SalesHub redirect query params
  const bookingDate = searchParams.get("date") || "";
  const bookingTime = searchParams.get("time") || "";
  const meetLink = searchParams.get("meet_link") || searchParams.get("meetLink") || "";

  useEffect(() => {
    trackPageView("/freetraining/congratulations", "Call Confirmed");

    const leadData = getStorageJSON<{ email: string; leadId: string }>("lead_data");
    if (leadData?.email) {
      trackConversionAPI("Schedule", leadData.email, undefined, {
        content_name: "Strategy Call Booked",
        status: "confirmed",
        lead_id: leadData.leadId,
      });
    }
    trackGA4("schedule_appointment", {
      appointment_type: "strategy_call",
      booking_date: bookingDate,
    });
  }, [bookingDate]);

  const handlePortfolioShare = () => {
    if (!portfolioUrl) return;
    trackGA4("portfolio_shared", { url: portfolioUrl });
    // Could POST to SalesHub to attach to lead record
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    if (!bookingDate || !bookingTime) return "#";
    const title = "Design Career Strategy Call - Xperience Wave";
    const details = meetLink
      ? `Google Meet: ${meetLink}\n\nPrepare:\n1. Your #1 career goal for the next 90 days\n2. Have LinkedIn profile open`
      : "Prepare:\n1. Your #1 career goal for the next 90 days\n2. Have LinkedIn profile open";
    const location = "Google Meet";
    // Parse date/time — expecting formats like "2026-04-15" and "14:00"
    const startDate = bookingDate.replace(/-/g, '') + 'T' + (bookingTime.replace(/:/g, '') || '110000');
    // 45 min call
    const endHour = bookingTime ? parseInt(bookingTime.split(':')[0]) : 11;
    const endMin = bookingTime ? parseInt(bookingTime.split(':')[1] || '0') + 45 : 45;
    const endDate = bookingDate.replace(/-/g, '') + 'T' + String(endHour + Math.floor(endMin / 60)).padStart(2, '0') + String(endMin % 60).padStart(2, '0') + '00';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&ctz=Asia/Kolkata`;
  };

  // Generate .ics file content for Apple Calendar
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
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-5 py-8 md:py-12">

        {/* Section 1: Murad's Video */}
        <section className="mb-10">
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingBottom: '56.25%' }}>
            {/* TODO: Replace with Murad's 60-90s personal video */}
            <div className="absolute inset-0 flex items-center justify-center bg-ft-dark text-white text-center p-6">
              <div>
                <div className="w-16 h-16 rounded-full bg-ft-purple-cta flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm text-ft-muted-light">Personal message from Shaik Murad</p>
                <p className="text-xs text-ft-muted mt-1">Video coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Booking Confirmation */}
        <section className="mb-10">
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-ft-dark-surface mb-3">You're booked!</h1>
            <p className="text-sm text-gray-600 mb-4">Your strategy call is confirmed for:</p>

            {bookingDate && (
              <div className="flex items-center justify-center gap-4 text-[15px] font-semibold text-ft-dark-surface mb-2">
                <span>📅 {bookingDate}</span>
                {bookingTime && <span>🕐 {bookingTime} IST</span>}
              </div>
            )}
            <p className="text-sm text-gray-500 mb-1">📹 Google Meet</p>
            {meetLink && (
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-sm text-ft-purple-cta hover:underline break-all">
                {meetLink}
              </a>
            )}
            <p className="text-[12px] text-gray-400 mt-3">
              Save this — you'll also receive it via email and WhatsApp
            </p>

            {/* Calendar buttons */}
            {bookingDate && (
              <div className="flex items-center justify-center gap-3 mt-5">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ft-purple-cta border border-ft-purple-cta/30 rounded-lg px-4 py-2 hover:bg-ft-purple-cta/5 transition"
                >
                  Add to Google Calendar
                </a>
                <button
                  onClick={downloadICS}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ft-purple-cta border border-ft-purple-cta/30 rounded-lg px-4 py-2 hover:bg-ft-purple-cta/5 transition"
                >
                  Add to Apple Calendar
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Homework */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-ft-dark-surface mb-4">Before your call, do these 2 things:</h2>
          <div className="space-y-4">
            {ftContent.congratulations.homework.map((task, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <p className="text-[14px] font-semibold text-ft-dark-surface mb-2">
                  {i + 1}. {task.title}
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{task.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Help Us Prepare (Optional) */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-ft-dark-surface mb-1">Help us prepare for YOUR call</h2>
          <p className="text-[12px] text-gray-400 mb-4">Optional but recommended</p>
          <p className="text-[13px] text-gray-600 mb-4">
            Your LinkedIn is already shared — we'll review it before the call.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">Got a portfolio? Share the link:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://your-portfolio.com"
                  className="flex-1 px-3 py-2.5 text-[14px] rounded-lg border-2 border-gray-200 focus:border-ft-purple-cta focus:ring-2 focus:ring-ft-purple-cta/20 focus:outline-none transition"
                />
                <button
                  onClick={handlePortfolioShare}
                  disabled={!portfolioUrl}
                  className="px-4 py-2.5 bg-ft-purple-cta text-white text-[13px] font-medium rounded-lg hover:bg-[#5B53E6] transition disabled:opacity-40"
                >
                  Save
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">Got an updated resume?</label>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-ft-purple-cta/50 transition">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-[13px] text-gray-500">Upload PDF or DOCX (max 10MB)</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      trackGA4("resume_uploaded", { file_name: e.target.files[0].name });
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <p className="text-[12px] text-gray-400 mt-3 leading-relaxed">
            The more we know about you beforehand, the faster we get to actionable advice.
          </p>
        </section>

        {/* Section 5: What Happens on the Call */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-ft-dark-surface mb-4">What happens on the call:</h2>
          <div className="space-y-4">
            {ftContent.congratulations.callBreakdown.map((step) => (
              <div key={step.time} className="flex gap-3">
                <div className="w-20 shrink-0">
                  <p className="text-[12px] font-bold text-ft-purple-cta">{step.time}</p>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-ft-dark-surface">{step.label}</p>
                  <p className="text-[13px] text-gray-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: What We Offer */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-ft-dark-surface mb-3">What we offer:</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
            Xperience Wave runs 1:1 mentorship programs (not courses) tailored to your career stage. On the strategy call, if we think we can help, we'll walk you through which program fits your situation and what the investment looks like.
          </p>
          <Link
            href="/programs"
            target="_blank"
            rel="noopener"
            className="text-[13px] font-semibold text-ft-purple-cta hover:underline"
          >
            Explore our programs →
          </Link>
        </section>

        {/* Section 7: Call Testimonials */}
        <section className="mb-10">
          <div className="space-y-4">
            {ftContent.congratulations.callTestimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-lg p-5">
                <p className="text-[13px] text-gray-700 leading-relaxed italic mb-3">"{t.quote}"</p>
                <p className="text-[12px] font-semibold text-ft-dark-surface">— {t.name}, {t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Questions */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-ft-dark-surface mb-1">Have questions before the call?</h2>
          <p className="text-[13px] text-gray-500 mb-5">
            WhatsApp us — we typically respond within 2 hours.
          </p>
          <div className="space-y-4">
            {ftContent.congratulations.callFaqs.map((faq) => (
              <div key={faq.q}>
                <p className="text-[14px] font-semibold text-ft-dark-surface mb-1">{faq.q}</p>
                <p className="text-[13px] text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
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
