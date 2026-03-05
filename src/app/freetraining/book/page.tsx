'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trackPageView, trackConversionAPI } from "@/lib/freetraining/track";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function BookPage() {
  const router = useRouter();
  const [isCalLoaded, setIsCalLoaded] = useState(false);

  useEffect(() => {
    trackPageView("/freetraining/book", "Book Strategy Call");
    const leadData = getStorageJSON<{ email: string; leadId: string }>("lead_data");
    const formData = getStorageJSON<{ name: string; phone: string }>("lead_form_data") || { name: '', phone: '' };

    if (!leadData) {
      router.push(ftPath("/getstarted"));
      return;
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq("track", "ViewContent", { content_name: "Booking Calendar", content_category: "Schedule" });
    }
    if (leadData?.email) {
      trackConversionAPI("ViewContent", leadData.email, undefined, { content_name: "Booking Calendar", content_category: "Schedule" });
    }

    const loadCalEmbed = () => {
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            (api as any).q = (api as any).q || [];
            if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal("init", "design-career-strategy-call-with-xw-team", { origin: "https://app.cal.com" });

      const prefill: any = {};
      if (formData.name) prefill.name = formData.name;
      if (leadData?.email) prefill.email = leadData.email;
      if (formData.phone) prefill.phone = formData.phone;

      window.Cal.ns["design-career-strategy-call-with-xw-team"]("inline", {
        elementOrSelector: "#cal-embed-container",
        config: { layout: "month_view" },
        calLink: "xperience-wave/design-career-strategy-call-with-xw-team?timeFormat=12",
        prefill,
      });

      window.Cal.ns["design-career-strategy-call-with-xw-team"]("ui", { hideEventTypeDetails: false, layout: "month_view" });

      // Intercept Cal.com's redirect by listening for navigation messages before Cal processes them
      window.addEventListener('message', (msg) => {
        if (msg.data?.includes?.('CAL:') || (typeof msg.data === 'object' && msg.data?.type?.startsWith?.('CAL:'))) {
          // Check if this is a redirect/navigation event from Cal.com
          try {
            const parsed = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
            if (parsed?.type === 'CAL:navigationSuccessful' || parsed?.type === 'CAL:linkReady') return;
            if (parsed?.data?.url && parsed.data.url.includes('congratulations')) {
              // Prevent Cal.com from redirecting - we handle it ourselves
              window.location.href = ftPath('/congratulations');
            }
          } catch { /* ignore parse errors */ }
        }
      }, { capture: true });

      window.Cal.ns["design-career-strategy-call-with-xw-team"]("on", {
        action: "bookingSuccessful",
        callback: (e: any) => {
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq("track", "Schedule", { content_name: "Strategy Call Booked", content_category: "Appointment" });
          }
          if (leadData?.email) {
            trackConversionAPI("Schedule", leadData.email, undefined, { content_name: "Strategy Call Booked", booking_data: e.detail });
          }
          updateSheetStage(leadData?.email || '');
          notifySalesHub(leadData?.email || '', formData.name || '', formData.phone || '');
          // Redirect immediately — must beat Cal.com's own redirect
          window.location.href = ftPath('/congratulations');
        },
      });

      setIsCalLoaded(true);
    };

    loadCalEmbed();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  const updateSheetStage = async (email: string) => {
    if (!email) return;
    try {
      await fetch("/freetraining/api/sheets/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", data: { email, stage: "booked", bookedAt: new Date().toISOString() } }),
      });
    } catch (error) {
      console.error("Error updating sheet:", error);
    }
  };

  const notifySalesHub = (email: string, name: string, phone: string) => {
    if (!email) return;
    try {
      fetch("/freetraining/api/saleshub/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || email.split("@")[0],
          email,
          phone,
          call_booked: "yes",
          booked_at: new Date().toISOString(),
        }),
        keepalive: true, // survive page navigation redirect
      });
    } catch (error) {
      console.error("Error notifying SalesHub:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Pick Your Strategy Call Time</h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Choose a time that works best for you. We&apos;ll discuss your career goals and create a personalized roadmap.</p>
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-sm md:text-base font-medium text-green-600">Complete form</span>
              </div>
              <div className="w-8 md:w-12 h-0.5 bg-green-500"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ft-purple text-white flex items-center justify-center text-sm font-semibold">2</div>
                <span className="text-sm md:text-base font-medium text-gray-900">Pick time slot</span>
              </div>
            </div>
          </div>
          <div id="cal-embed-container" className="max-w-4xl mx-auto" style={{ width: "100%", minHeight: "700px", position: "relative" }}>
            {!isCalLoaded && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ft-purple mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
