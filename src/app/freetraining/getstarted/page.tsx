'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { trackPageView, trackConversionAPI } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

export default function GetStartedPage() {
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', handlePageShow);
    trackPageView("/freetraining/getstarted", "Get Started");

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq("track", "InitiateCheckout", { content_name: "VSL Webinar Registration Form", content_category: "Lead Generation" });
    }

    const leadData = getStorageJSON<{ email: string }>("lead_data");
    if (leadData?.email) {
      trackConversionAPI("PageView", leadData.email, undefined, { content_name: "Get Started Page" });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { window.removeEventListener('pageshow', handlePageShow); };
  }, []);

  const handleLeadSuccess = (leadId: string, qualificationResult: { qualified: boolean }) => {
    if (qualificationResult.qualified) {
      setToast({ isVisible: true, message: "Registration successful! Redirecting to training...", type: "success" });
      setTimeout(() => {
        router.push(ftPath(`/watch?lead_id=${leadId}&utm_source=landing&utm_medium=form&new_lead=true`));
      }, 1500);
    } else {
      setToast({ isVisible: true, message: "Thank you for your interest!", type: "info" });
      setTimeout(() => { router.push(ftPath("/disqualified")); }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1 flex items-start md:items-center justify-center px-4 py-6 md:py-8 lg:py-12">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 px-2">
              Watch The Free Training That Shows You Exactly How This Works
            </h1>
            <div className="space-y-2 md:space-y-3 lg:space-y-4 text-left max-w-4xl mx-auto px-2">
              {[
                "Why skilled designers stay stuck (and what senior designers do differently)",
                "The Pi-Design Career System framework that gets results in 90 days",
                "How to position yourself for ₹18-28 LPA roles without leading teams first",
              ].map((text) => (
                <div key={text} className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-700 mt-0.5 md:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" /></svg>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <LeadForm
              onSuccess={handleLeadSuccess}
              onError={(msg) => setToast({ isVisible: true, message: msg, type: "error" })}
              onCancel={() => router.push(ftPath("/"))}
            />
          </div>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
    </div>
  );
}
