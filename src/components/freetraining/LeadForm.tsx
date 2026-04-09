'use client';

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ftContent } from "@/lib/freetraining/content";
import { getStorageJSON, setStorageJSON } from "@/lib/freetraining/storage";
import {
  trackFormViewed,
  trackFormFieldFocused,
  trackFormFieldCompleted,
  trackFormSubmitted,
  trackLead,
  trackConversionAPI,
} from "@/lib/freetraining/track";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  whatsapp: z
    .string()
    .min(10, "Please enter a valid 10-digit number")
    .max(10, "Please enter a valid 10-digit number")
    .regex(/^\d{10}$/, "Please enter a valid 10-digit number"),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  onSuccess: (leadId: string) => void;
  onError: (message: string) => void;
  variant?: 'default' | 'on-purple';
}

export function LeadForm({ onSuccess, onError, variant = 'default' }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedView = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Track form_viewed when it scrolls into viewport
  useEffect(() => {
    if (!formRef.current || hasTrackedView.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          trackFormViewed();
          hasTrackedView.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const utmParams = getStorageJSON<Record<string, string>>("utm_params") || {};

      // SalesHub webhook — single data destination
      const response = await fetch("/freetraining/api/saleshub/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: "+91" + data.whatsapp,
          utm_source: utmParams.utm_source || "",
          utm_medium: utmParams.utm_medium || "",
          utm_campaign: utmParams.utm_campaign || "",
          utm_content: utmParams.utm_content || "",
          utm_term: utmParams.utm_term || "",
        }),
      });

      const result = await response.json();

      // Track events regardless of webhook response
      trackFormSubmitted({ email: data.email });
      trackLead({ lead_id: result.leadId || 'unknown' });
      trackConversionAPI("Lead", data.email, "+91" + data.whatsapp, {
        content_name: "VSL Webinar Registration",
      });

      // Store lead data locally
      const leadId = result.leadId || `lead_${Date.now()}`;
      setStorageJSON("lead_data", {
        leadId,
        email: data.email,
        timestamp: new Date().toISOString(),
      });
      setStorageJSON("lead_form_data", {
        name: data.name,
        phone: "+91" + data.whatsapp,
      });

      onSuccess(leadId);
    } catch (error: any) {
      console.error("Form submission error:", error);
      onError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPurple = variant === 'on-purple';
  const inputClasses = isPurple
    ? "w-full px-4 py-3.5 text-[15px] rounded-lg border bg-white border-[#D9D7FF] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
    : "w-full px-4 py-3.5 text-[15px] rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ft-purple-cta/30 focus:border-ft-purple-cta transition";

  const errorClasses = isPurple
    ? "border-red-300"
    : "border-red-300 focus:border-red-500 focus:ring-red-200";

  const buttonClasses = isPurple
    ? "w-full max-w-[335px] mx-auto h-[52px] bg-ft-dark-surface text-white font-bold text-[16px] rounded-lg hover:bg-[#252538] transition-colors disabled:opacity-60"
    : "w-full max-w-[335px] mx-auto h-[52px] bg-ft-purple-cta text-white font-bold text-[16px] rounded-lg hover:bg-[#5B53E6] transition-colors disabled:opacity-60";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 max-w-[335px] md:max-w-[400px] mx-auto"
    >
      {/* Name */}
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder={ftContent.form.fields.name.placeholder}
          className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
          aria-invalid={errors.name ? "true" : "false"}
          onFocus={() => trackFormFieldFocused('name')}
          onBlur={(e) => { if (e.target.value) trackFormFieldCompleted('name'); }}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder={ftContent.form.fields.email.placeholder}
          className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
          aria-invalid={errors.email ? "true" : "false"}
          onFocus={() => trackFormFieldFocused('email')}
          onBlur={(e) => { if (e.target.value) trackFormFieldCompleted('email'); }}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <div className="flex gap-2">
          <div className="flex items-center px-3 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-lg shrink-0">
            <svg className="w-4 h-4 mr-1.5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700 font-medium">+91</span>
          </div>
          <input
            {...register("whatsapp")}
            type="tel"
            maxLength={10}
            placeholder={ftContent.form.fields.whatsapp.placeholder}
            className={`flex-1 ${inputClasses} ${errors.whatsapp ? errorClasses : ''}`}
            aria-invalid={errors.whatsapp ? "true" : "false"}
            onFocus={() => trackFormFieldFocused('whatsapp')}
            onBlur={(e) => { if (e.target.value) trackFormFieldCompleted('whatsapp'); }}
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <p className={`mt-1 text-[11px] ${isPurple ? 'text-[#CBC9FF]' : 'text-gray-400'}`}>
          {ftContent.form.fields.whatsapp.helperText}
        </p>
        {errors.whatsapp && <p className="mt-1 text-xs text-red-400">{errors.whatsapp.message}</p>}
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center pt-1">
        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Submitting...
            </span>
          ) : (
            <>
              {ftContent.form.cta}
              <svg className="inline w-4 h-4 ml-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </>
          )}
        </button>
        <p className={`mt-3 text-[11px] text-center ${isPurple ? 'text-[#CBC9FF]' : 'text-[#80808C]'}`}>
          {isPurple ? ftContent.finalCta.trustText : ftContent.form.trustText}
        </p>
      </div>
    </form>
  );
}
