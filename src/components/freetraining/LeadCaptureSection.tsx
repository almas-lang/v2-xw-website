'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { ftContent } from "@/lib/freetraining/content";
import { ftPath } from "@/lib/freetraining/constants";

/** The #get-access form section: the only part of the landing page that needs state. */
export function LeadCaptureSection() {
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  const handleLeadSuccess = (leadId: string) => {
    setToast({ isVisible: true, message: "Registration successful! Redirecting to training...", type: "success" });
    setTimeout(() => {
      router.push(ftPath(`/watch?lead_id=${leadId}&new_lead=true`));
    }, 1200);
  };

  return (
    <>
      <section id="get-access" className="relative bg-ft-dark py-14 md:py-20 px-5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(108,99,255,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[23px] md:text-[29px] font-heading font-bold text-white">
              {ftContent.form.title}
            </h2>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <LeadForm
              onSuccess={handleLeadSuccess}
              onError={(msg) => setToast({ isVisible: true, message: msg, type: "error" })}
            />
          </div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
