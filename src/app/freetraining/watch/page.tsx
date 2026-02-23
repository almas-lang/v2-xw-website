'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FTYouTubePlayer } from "@/components/freetraining/YouTubePlayer";
import { Button } from "@/components/freetraining/Button";
import { Toast } from "@/components/freetraining/Toast";
import { trackVideoView, trackPageView, trackConversionAPI } from "@/lib/freetraining/track";
import { ftContent } from "@/lib/freetraining/content";
import { getStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

const YOUTUBE_VIDEO_ID = process.env.NEXT_PUBLIC_FT_YOUTUBE_VIDEO_ID || "GVl8_yg_HJM";

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  const leadId = searchParams.get("lead_id");

  useEffect(() => {
    trackPageView("/freetraining/watch", "Watch Webinar");
    const leadData = getStorageJSON<{ email: string }>("lead_data");
    const isNewLead = searchParams.get("new_lead");

    if (isNewLead === "true") {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq("track", "Lead", { content_name: "VSL Webinar Registration", content_category: "Lead Generation", lead_id: leadId, value: 0, currency: "USD" });
      }
      if (leadData?.email) {
        trackConversionAPI("Lead", leadData.email, undefined, { content_name: "VSL Webinar Registration", lead_id: leadId });
      }
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq("track", "ViewContent", { content_name: "Design Career Webinar", content_category: "Video", content_type: "video", content_ids: [YOUTUBE_VIDEO_ID], lead_id: leadId });
    }
    if (leadData?.email) {
      trackConversionAPI("ViewContent", leadData.email, undefined, { content_name: "Design Career Webinar", content_ids: [YOUTUBE_VIDEO_ID] });
    }

    const storedLeadData = getStorageJSON<{ email: string }>("lead_data");
    if (!storedLeadData && !leadId) {
      setToast({ isVisible: true, message: "Please register first to access the training.", type: "info" });
      setTimeout(() => router.push(ftPath("/")), 2000);
    }
  }, [leadId, router, searchParams]);

  const handleVideoPlay = () => {
    if (!hasTrackedView) {
      trackVideoView(YOUTUBE_VIDEO_ID, { lead_id: leadId, utm_source: searchParams.get("utm_source"), utm_medium: searchParams.get("utm_medium") });
      setHasTrackedView(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <FTYouTubePlayer videoId={YOUTUBE_VIDEO_ID} onPlay={handleVideoPlay} onEnd={() => setToast({ isVisible: true, message: "Ready to take the next step? Click the button below to apply!", type: "success" })} />
          </div>
          <div className="text-center">
            <Button
              onClick={() => {
                const leadData = getStorageJSON<{ email: string }>("lead_data");
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq("track", "InitiateCheckout", { content_name: "Application Form CTA", content_category: "Apply", lead_id: leadId });
                }
                if (leadData?.email) {
                  trackConversionAPI("InitiateCheckout", leadData.email, undefined, { content_name: "Application Form CTA", lead_id: leadId });
                }
                router.push(ftPath(`/apply${leadId ? `?lead_id=${leadId}` : ""}`));
              }}
              variant="primary"
              size="lg"
              className="shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {ftContent.watch.cta}
            </Button>
          </div>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ft-purple"></div></div>}>
      <WatchContent />
    </Suspense>
  );
}
