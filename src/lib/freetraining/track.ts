interface TrackingData {
  [key: string]: any;
}

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: any, options?: { eventID?: string }) => void;
    gtag?: (...args: any[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

export const trackFacebookPixel = (event: string, data?: TrackingData, eventID?: string) => {
  if (!isProduction) return;
  if (typeof window !== "undefined" && window.fbq) {
    try {
      if (eventID) {
        window.fbq("track", event, data, { eventID });
      } else {
        window.fbq("track", event, data);
      }
    } catch (error) {
      console.warn("Facebook Pixel tracking failed:", error);
    }
  }
};

// Generate a unique event ID for pixel + CAPI deduplication
export const newEventId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

export const trackGA4 = (eventName: string, parameters?: TrackingData) => {
  if (!isProduction) return;
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", eventName, parameters);
    } catch (error) {
      console.warn("GA4 tracking failed:", error);
    }
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackGA4("page_view", {
    page_path: pagePath,
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
  });
};

export const trackLead = (data?: TrackingData, eventID?: string) => {
  trackFacebookPixel("Lead", {
    content_name: "VSL Webinar Registration",
    content_category: "Lead Generation",
    ...data,
  }, eventID);
  trackGA4("generate_lead", {
    method: "lead_form",
    ...data,
  });
};

export const trackClick = (buttonName: string, data?: TrackingData) => {
  trackGA4("click", {
    button_name: buttonName,
    ...data,
  });
};

// Granular form tracking
export const trackFormViewed = () => {
  trackGA4("form_viewed", { form_name: "ft_lead_form" });
};

export const trackFormFieldFocused = (fieldName: string) => {
  trackGA4("form_field_focused", { field_name: fieldName, form_name: "ft_lead_form" });
};

export const trackFormFieldCompleted = (fieldName: string) => {
  trackGA4(`form_field_completed_${fieldName}`, { form_name: "ft_lead_form" });
};

export const trackFormSubmitted = (data?: TrackingData) => {
  trackGA4("form_submitted", { form_name: "ft_lead_form", ...data });
};

// Video progress tracking
export const trackVideoProgress = (videoId: string, percent: number) => {
  trackGA4(`video_progress_${percent}`, { video_id: videoId });
};

export const trackVideoPaused = (videoId: string, currentTime: number) => {
  trackGA4("video_paused", { video_id: videoId, current_time: currentTime });
};

export const trackConversionAPI = async (
  eventName: string,
  email?: string,
  phone?: string,
  customData?: any,
  eventId?: string
) => {
  if (!isProduction) return;
  try {
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return undefined;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return undefined;
    };

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    const response = await fetch("/freetraining/api/facebook/conversion", {
      keepalive: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        email,
        phone,
        fbp,
        fbc,
        event_source_url: typeof window !== 'undefined' ? window.location.href : '',
        custom_data: customData,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      console.warn(`Conversion API: ${eventName} failed`, result.error);
    }
  } catch (error) {
    console.warn("Conversion API failed:", error);
  }
};

// ───────────────────────────────────────────────────────────────
// Deduped helpers — fire pixel + CAPI with a shared event_id.
// Use these for any Meta standard event going forward.
// ───────────────────────────────────────────────────────────────

export const trackPageViewDedup = (email?: string) => {
  const eventId = newEventId();
  trackFacebookPixel("PageView", undefined, eventId);
  trackConversionAPI("PageView", email, undefined, undefined, eventId);
};

export const trackViewContentVideo = (
  stage: "start" | "complete",
  videoId: string,
  email?: string,
) => {
  const eventId = newEventId();
  const data = {
    content_type: "video",
    content_ids: [videoId],
    ...(stage === "complete" ? { content_name: "VSL Complete" } : {}),
  };
  trackFacebookPixel("ViewContent", data, eventId);
  trackConversionAPI("ViewContent", email, undefined, data, eventId);
  trackGA4(stage === "start" ? "video_start" : "video_complete", { video_id: videoId });
};

export const trackInitiateCheckout = (
  email?: string,
  customData?: TrackingData,
) => {
  const eventId = newEventId();
  const data = { content_name: "Strategy Call Booking", ...customData };
  trackFacebookPixel("InitiateCheckout", data, eventId);
  trackConversionAPI("InitiateCheckout", email, undefined, data, eventId);
};

export const trackSubmitApplication = (
  email?: string,
  customData?: TrackingData,
) => {
  const eventId = newEventId();
  const data = { content_name: "Strategy Call Booked", ...customData };
  trackFacebookPixel("SubmitApplication", data, eventId);
  trackConversionAPI("SubmitApplication", email, undefined, data, eventId);
};
