interface TrackingData {
  [key: string]: any;
}

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: any) => void;
    gtag?: (...args: any[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

export const trackFacebookPixel = (event: string, data?: TrackingData) => {
  if (!isProduction) return;
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", event, data);
    } catch (error) {
      console.warn("Facebook Pixel tracking failed:", error);
    }
  }
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

export const trackLead = (data?: TrackingData) => {
  trackFacebookPixel("Lead", {
    content_name: "VSL Webinar",
    content_category: "Lead Generation",
    ...data,
  });
  trackGA4("generate_lead", {
    method: "lead_form",
    ...data,
  });
};

export const trackVideoView = (videoId: string, data?: TrackingData) => {
  trackFacebookPixel("ViewContent", {
    content_type: "video",
    content_ids: [videoId],
    ...data,
  });
  trackGA4("video_start", {
    video_id: videoId,
    ...data,
  });
};

export const trackCalendlyBooking = (data?: TrackingData) => {
  trackFacebookPixel("Schedule", {
    content_name: "Strategy Call",
    ...data,
  });
  trackGA4("schedule_appointment", {
    appointment_type: "strategy_call",
    ...data,
  });
};

export const trackClick = (buttonName: string, data?: TrackingData) => {
  trackGA4("click", {
    button_name: buttonName,
    ...data,
  });
};

export const trackConversionAPI = async (
  eventName: string,
  email?: string,
  phone?: string,
  customData?: any
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
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
