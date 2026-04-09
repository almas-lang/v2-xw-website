'use client';

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { HeroOptionA } from "@/components/freetraining/HeroOptionA";
import { HeroOptionB } from "@/components/freetraining/HeroOptionB";
import { HeroOptionC } from "@/components/freetraining/HeroOptionC";
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
  const [heroOption, setHeroOption] = useState<'A' | 'B' | 'C'>('A');

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
      {/* ===== DESIGN OPTION SWITCHER (remove before production) ===== */}
      <div className="fixed top-2 right-2 z-[9999] flex gap-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-1.5 shadow-xl">
        {(['A', 'B', 'C'] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setHeroOption(opt)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              heroOption === opt
                ? 'bg-accent text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {opt}
          </button>
        ))}
        <span className="text-[10px] text-white/40 self-center ml-1">Hero</span>
      </div>

      {/* ============ SECTION 1: HERO (3 options) ============ */}
      {heroOption === 'A' && <HeroOptionA onCtaClick={scrollToForm} />}
      {heroOption === 'B' && <HeroOptionB onCtaClick={scrollToForm} />}
      {heroOption === 'C' && <HeroOptionC onCtaClick={scrollToForm} />}

      {/* ============ SECTION 2: WHAT YOU'LL DISCOVER ============ */}
      <section className="bg-white py-10 md:py-14 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[20px] md:text-[32px] font-bold text-ft-dark-surface text-center mb-8">
            {ftContent.discover.title}
          </h2>
          <div className="space-y-4">
            {ftContent.discover.cards.map((card) => (
              <div key={card.number} className="bg-ft-card-bg rounded-xl p-5">
                <p className="text-[20px] font-extrabold text-ft-purple-cta/25 mb-1">{card.number}</p>
                <h3 className="text-[15px] md:text-lg font-bold text-ft-dark-surface mb-1">{card.title}</h3>
                <p className="text-[13px] md:text-sm text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: LEAD CAPTURE FORM ============ */}
      <section id="get-access" className="bg-ft-section-bg py-10 md:py-14 px-5">
        <div className="max-w-[400px] mx-auto text-center">
          <h2 className="text-[20px] font-bold text-ft-dark-surface mb-6">
            {ftContent.form.title}
          </h2>
          <LeadForm
            onSuccess={handleLeadSuccess}
            onError={(msg) => setToast({ isVisible: true, message: msg, type: "error" })}
          />
        </div>
      </section>

      {/* ============ SECTION 4: RESULTS ============ */}
      <section className="bg-white py-9 md:py-12 px-5">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[13px] font-medium text-[#66666E] text-center mb-6">
            {ftContent.results.title}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {ftContent.results.cards.map((card) => (
              <div key={card.name} className="bg-white border border-[#E5E5EA] rounded-lg p-3">
                <p className="text-[12px] font-bold text-ft-dark-surface">{card.name}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{card.role}</p>
                <p className="text-[10px] font-bold text-ft-purple-cta mt-1">{card.timeline}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] font-medium text-[#4D4D57] text-center mb-3">
            {ftContent.results.statsLine}
          </p>
          <p className="text-center">
            <a
              href={ftContent.results.seeAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-ft-purple-cta hover:underline"
            >
              {ftContent.results.seeAllText}
            </a>
          </p>
        </div>
      </section>

      {/* ============ SECTION 5: QUALIFIER ============ */}
      <section className="bg-ft-section-bg py-6 px-5">
        <p className="text-[11px] text-[#72727F] text-center max-w-[500px] mx-auto">
          {ftContent.qualifier.text}
        </p>
      </section>

      {/* ============ SECTION 6: ABOUT MURAD ============ */}
      <section className="bg-white py-9 px-5">
        <div className="max-w-[400px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 bg-gray-100">
            <img
              src="/freetraining/murad-headshot.png"
              alt="Shaik Murad"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] font-semibold text-ft-purple-cta uppercase tracking-[2px] mb-2">
            {ftContent.aboutMurad.label}
          </p>
          <p className="text-[12px] text-[#595964]">
            {ftContent.aboutMurad.bio}
          </p>
        </div>
      </section>

      {/* ============ SECTION 7: SEO CONTENT ============ */}
      <section className="bg-white py-12 px-5">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[20px] md:text-[28px] font-bold text-ft-dark-surface mb-6">
            {ftContent.seoContent.title}
          </h2>
          {ftContent.seoContent.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[15px] text-[#444] leading-[180%] mb-4">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 space-y-2">
            <p className="text-[13px] font-medium text-gray-500">Related reads:</p>
            {ftContent.seoContent.relatedLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/resources/blogs/${link.slug}`}
                className="block text-[13px] text-ft-purple-cta hover:underline"
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
          <h2 className="text-[20px] md:text-[28px] font-bold text-ft-dark-surface text-center mb-8">
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
      <section className="bg-ft-purple-cta py-10 md:py-14 px-5">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[22px] md:text-[36px] font-bold text-white mb-8 leading-tight">
            {ftContent.finalCta.headline}
          </h2>
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
        <span className="text-[15px] md:text-base font-semibold text-ft-dark-surface">{question}</span>
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
        <p className="mt-3 text-[13px] md:text-sm text-gray-600 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}
