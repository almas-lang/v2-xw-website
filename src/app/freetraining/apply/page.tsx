'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApplyForm } from "@/components/freetraining/ApplyForm";
import { trackPageView, trackConversionAPI } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

function ApplyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const leadId = searchParams.get("lead_id");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView("/freetraining/apply", "Apply - Application Form");
    const leadData = getStorageJSON<{ email: string }>("lead_data");

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq("track", "InitiateCheckout", { content_name: "Application Form", content_category: "Apply", lead_id: leadId });
    }
    if (leadData?.email) {
      trackConversionAPI("InitiateCheckout", leadData.email, undefined, { content_name: "Application Form", lead_id: leadId });
      trackConversionAPI("PageView", leadData.email, undefined, { content_name: "Apply Page", lead_id: leadId });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const storedLeadData = getStorageJSON("lead_data");
    if (!storedLeadData && !leadId) {
      setTimeout(() => router.push(ftPath("/getstarted")), 2000);
    }
  }, [leadId, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {error && (
            <div className="max-w-3xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-red-800 mb-1">Application Not Approved</h3>
                  <p className="text-xs md:text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          <ApplyForm onSuccess={() => {}} onError={(msg) => { setError(msg); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ft-purple"></div></div>}>
      <ApplyContent />
    </Suspense>
  );
}
