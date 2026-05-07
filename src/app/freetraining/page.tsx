'use client';

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { HeroOptionA } from "@/components/freetraining/HeroOptionA";
import { ftContent } from "@/lib/freetraining/content";
import { setStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";
import { trackPageView } from "@/lib/freetraining/track";

export default function FreeTrainingHome() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ft-dark" />}>
      <FreeTrainingHomeContent />
    </Suspense>
  );
}

function FreeTrainingHomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  useEffect(() => {
    trackPageView("/freetraining", "Free Training Landing");

    const metaCampaign = searchParams.get("hsa_cam") || "";
    const metaAd = searchParams.get("hsa_ad") || "";
    const metaAdSet = searchParams.get("hsa_grp") || "";

    const utmParams = {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || metaCampaign,
      utm_content: searchParams.get("utm_content") || metaAd,
      utm_term: searchParams.get("utm_term") || metaAdSet,
    };

    if (Object.values(utmParams).some((v) => v !== "")) {
      setStorageJSON("utm_params", utmParams);
    }
  }, [searchParams]);

  const scrollToForm = () => {
    document.getElementById("get-access")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLeadSuccess = (leadId: string) => {
    setToast({ isVisible: true, message: "Registration successful! Redirecting to training...", type: "success" });
    setTimeout(() => {
      router.push(ftPath(`/watch?lead_id=${leadId}&new_lead=true`));
    }, 1200);
  };

  return (
    <div className="flex flex-col">
      {/* ============ SECTION 1: HERO ============ */}
      <HeroOptionA onCtaClick={scrollToForm} />

      {/* ============ SECTION 2: WHAT YOU'LL DISCOVER ============ */}
      <section className="bg-white py-10 md:py-14 px-5">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[22px] md:text-[32px] font-bold text-ft-dark-surface text-center mb-8">
            {ftContent.discover.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ftContent.discover.cards.map((card) => (
              <div key={card.number} className="bg-ft-card-bg rounded-xl p-5 md:p-6">
                <p className="text-[22px] font-extrabold text-ft-purple-cta/25 mb-1">{card.number}</p>
                <h3 className="text-[16px] md:text-[18px] font-bold text-ft-dark-surface mb-2">{card.title}</h3>
                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: LEAD CAPTURE FORM ============ */}
      <section id="get-access" className="relative bg-ft-dark py-14 md:py-20 px-5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(108,99,255,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/[0.08] border border-accent/15 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[14px] font-semibold text-accent">Free. 28 minutes.</span>
            </div>
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

      {/* ============ SECTION 4: RESULTS ============ */}
      <section className="bg-white py-10 md:py-14 px-5">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[12px] md:text-[13px] font-semibold text-red-500 uppercase tracking-[2px] text-center mb-2">
            Real Results
          </p>
          <h3 className="text-[20px] md:text-[26px] font-bold text-ft-dark-surface text-center mb-2">
            {ftContent.results.title}
          </h3>
          <p className="text-[14px] md:text-[15px] text-[#4D4D57] text-center mb-8">
            {ftContent.results.statsLine}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            {ftContent.results.cards.map((card) => (
              <div key={card.name} className="bg-white border border-[#E5E5EA] rounded-xl p-4 md:p-5 flex flex-col items-center text-center">
                {/* Photo */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 mb-3 flex-shrink-0 ring-2 ring-gray-100">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                      {card.name.charAt(0)}
                    </div>
                  )}
                </div>
                {/* Name & Role */}
                <p className="text-[15px] md:text-[17px] font-bold text-ft-dark-surface leading-tight">{card.name}</p>
                <p className="text-[13px] md:text-[14px] text-gray-500 leading-snug mt-1">{card.role}</p>
                {/* Timeline badge */}
                <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full bg-red-50 text-red-500 text-[12px] md:text-[13px] font-semibold">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {card.timeline}
                </span>
                {/* LinkedIn */}
                {card.linkedin && (
                  <a
                    href={card.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[#0A66C2] hover:text-[#004182] transition-colors"
                    aria-label={`${card.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="text-center">
            <a
              href={ftContent.results.seeAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-ft-purple-cta hover:underline"
            >
              {ftContent.results.seeAllText}
            </a>
          </p>
        </div>
      </section>

      {/* ============ SECTION 5: QUALIFIER ============ */}
      <section className="bg-ft-section-bg py-8 px-5">
        <p className="text-[14px] md:text-[15px] text-[#555] text-center max-w-[600px] mx-auto font-medium">
          {ftContent.qualifier.text}
        </p>
      </section>

      {/* ============ SECTION 6: ABOUT MURAD ============ */}
      <section className="bg-white py-10 px-5">
        <div className="max-w-[400px] mx-auto text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-2 ring-gray-100">
            <img
              src="/freetraining/murad-headshot.png"
              alt="Shaik Murad"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[12px] md:text-[13px] font-semibold text-ft-purple-cta uppercase tracking-[2px] mb-2">
            {ftContent.aboutMurad.label}
          </p>
          <p className="text-[14px] md:text-[15px] text-[#595964]">
            {ftContent.aboutMurad.bio}
          </p>
        </div>
      </section>

      {/* ============ SECTION 7: SEO CONTENT ============ */}
      <section className="bg-white py-12 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-bold text-ft-dark-surface mb-6">
            {ftContent.seoContent.title}
          </h2>
          {ftContent.seoContent.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[16px] md:text-[17px] text-[#444] leading-[180%] mb-5">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 space-y-3">
            <p className="text-[14px] font-semibold text-gray-600">Related reads:</p>
            {ftContent.seoContent.relatedLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/resources/blogs/${link.slug}`}
                className="block text-[15px] text-ft-purple-cta hover:underline"
              >
                → {link.text}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: FAQ ============ */}
      <section className="bg-ft-section-bg py-12 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[22px] md:text-[30px] font-bold text-ft-dark-surface text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {ftContent.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 9: FINAL CTA ============ */}
      <section className="bg-ft-dark-surface py-12 md:py-16 px-5">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[36px] font-bold text-white mb-3 leading-tight">
            {ftContent.finalCta.headline}
          </h2>
          <p className="text-[14px] md:text-[15px] text-gray-400 mb-8">{ftContent.finalCta.trustText}</p>
          <LeadForm
            onSuccess={handleLeadSuccess}
            onError={(msg) => setToast({ isVisible: true, message: msg, type: "error" })}
            variant="on-purple"
          />
        </div>
      </section>

      {/* FAQPage Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ftContent.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between text-left gap-4"
      >
        <span className="text-[16px] md:text-[17px] font-semibold text-ft-dark-surface">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="mt-3 text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}
