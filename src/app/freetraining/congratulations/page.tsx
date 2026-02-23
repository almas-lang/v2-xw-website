'use client';

import { useEffect } from "react";
import Link from "next/link";
import { trackConversionAPI, trackPageView } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

export default function CongratulationsPage() {
  useEffect(() => {
    trackPageView("/freetraining/congratulations", "Congratulations");
    const leadData = getStorageJSON<{ email: string; leadId: string }>("lead_data");

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq("track", "SubmitApplication", { content_name: "Strategy Call Booked", content_category: "Appointment", status: "completed", lead_id: leadData?.leadId });
    }
    if (leadData?.email) {
      trackConversionAPI("SubmitApplication", leadData.email, undefined, { content_name: "Strategy Call Booked", status: "completed", lead_id: leadData.leadId });
    }
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Congratulations!</h1>
        <div className="space-y-4 text-lg text-gray-600">
          <p>Your strategy call has been successfully scheduled!</p>
          <p>Check your email for confirmation details and a calendar invite.</p>
          <p className="text-ft-purple font-semibold">We&apos;re excited to help you transform your design career!</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s Next?</h2>
          <ul className="text-left space-y-3 text-gray-700">
            {["You'll receive a confirmation email with all the details", "Add the meeting to your calendar", "Prepare any questions you'd like to discuss", "We'll see you on the call!"].map((item) => (
              <li key={item} className="flex items-start gap-3"><span className="text-ft-red text-xl">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div className="pt-6">
          <Link href={ftPath("/")} className="inline-block bg-ft-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
