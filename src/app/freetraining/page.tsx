'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { HeroOptionA } from "@/components/freetraining/HeroOptionA";
import FAQ from "@/components/shared/FAQ";
import { ftContent } from "@/lib/freetraining/content";
import { setStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";
import { trackPageView, trackScrollDepth } from "@/lib/freetraining/track";

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

  // Scroll-depth milestones on the landing page — fired once per threshold.
  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 100];
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const t of thresholds) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          trackScrollDepth(t, "/freetraining");
        }
      }
      if (fired.size === thresholds.length) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {/* ============ SECTION 1.5: WHO IT'S FOR / NOT FOR ============ */}
      <section className="bg-ft-section-bg py-14 md:py-20 px-5">
        <div className="max-w-[640px] mx-auto">
          {/* For — lifted white card */}
          <div className="relative bg-white rounded-2xl p-7 md:p-9 border border-gray-200 shadow-[0_12px_40px_-12px_rgba(15,15,20,0.12)]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              For you
            </span>
            <h3 className="text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface mb-6 leading-tight">
              This training is for
            </h3>
            <ul className="space-y-4">
              {[
                'Designers with 2+ years exp earning ₹8–₹25 LPA',
                'People who are seriously considering investing in 1:1 mentorship to accelerate this transition',
                'UX, UI, and Product designers in product or design teams',
              ].map((item) => (
                <li key={item} className="flex gap-3.5 text-[14px] md:text-[15px] text-ft-dark-surface leading-[170%]">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: WHAT YOU'LL LEARN ============ */}
      <section className="bg-white py-14 md:py-20 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[34px] font-heading font-bold text-ft-dark-surface text-center mb-10 md:mb-14">
            {ftContent.discover.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {ftContent.discover.cards.map((card) => (
              <div
                key={card.number}
                className="relative bg-white rounded-xl border border-gray-200 p-6 md:p-7 pl-7 md:pl-8 overflow-hidden hover:shadow-[0_8px_24px_-8px_rgba(255,0,35,0.18)] transition-shadow duration-200"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" aria-hidden />
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-bold tracking-wider uppercase mb-4">
                  Truth {card.number}
                </span>
                <h3 className="text-[20px] md:text-[22px] font-heading font-bold text-ft-dark-surface mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#4D4D57] leading-[180%]">
                  {card.description}
                </p>
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
          <div className="text-center">
            <a
              href={ftContent.results.seeAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-blue-600 hover:underline underline"
            >
              {ftContent.results.seeAllText}
            </a>
            <p className="mt-3 text-[14px] md:text-[15px] text-[#4D4D57]">
              {ftContent.results.seeAllSubtext}
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: ABOUT MURAD ============ */}
      <section className="bg-white py-14 md:py-20 px-5">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr] gap-6 md:gap-10 lg:gap-14">
          {/* Left rail: avatar */}
          <div className="flex md:block">
            <div className="w-24 h-24 md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-200 shrink-0">
              <img
                src="/images/Murad.png"
                alt="Shaik Murad"
                className="w-full h-full object-cover object-[center_top] scale-x-[-1]"
              />
            </div>
          </div>

          {/* Right column: name, role, bio */}
          <div>
            {/* Name & role */}
            <p className="text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface leading-tight">
              {ftContent.aboutMurad.name}
            </p>
            <p className="text-[14px] md:text-[15px] text-[#4D4D57] mt-1 mb-8">
              {ftContent.aboutMurad.role}
            </p>

            {/* Bio */}
            <p className="text-[15px] md:text-[16px] text-[#4D4D57] leading-[180%] mb-10 md:mb-12">
              {ftContent.aboutMurad.bio}
            </p>

            {/* Pull-quote anchor: stats as oversized callout */}
            <div className="border-l-[3px] border-accent pl-5 md:pl-7 py-2 mb-10 md:mb-12">
              <p className="text-[40px] md:text-[56px] lg:text-[64px] font-heading font-bold text-accent leading-none tracking-tight">
                3,000+
              </p>
              <p className="text-[14px] md:text-[15px] text-[#4D4D57] mt-2 max-w-[420px]">
                career conversations with designers · 830+ mentored · 15 years in design
              </p>
            </div>

            {/* Related reads */}
            <p className="text-[13px] md:text-[14px] font-bold text-ft-dark-surface uppercase tracking-wider mb-3">Related reads</p>
            <div className="space-y-2">
              {ftContent.seoContent.relatedLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/resources/blogs/${link.slug}`}
                  className="block text-[15px] text-blue-600 hover:underline underline"
                >
                  → {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: FAQ ============ */}
      <FAQ
        title="Frequently Asked Questions (FAQs)"
        faqs={ftContent.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        showCTA={false}
      />

      {/* ============ SECTION 9: FINAL CTA ============ */}
      <section className="bg-ft-dark-surface py-16 md:py-24 px-5">
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="text-[20px] md:text-[26px] font-bold text-white mb-8 leading-snug">
            {ftContent.finalCta.headline}
          </h2>
          {ftContent.finalCta.subline && (
            <p className="text-[15px] md:text-[16px] text-gray-300 mb-8">
              {ftContent.finalCta.subline}
            </p>
          )}
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] md:text-[17px] rounded-md transition-colors cursor-pointer mb-8 shadow-[0_0_40px_rgba(255,0,35,0.25)]"
          >
            {ftContent.finalCta.cta}
            <span aria-hidden>→</span>
          </button>
          <p className="text-[13px] md:text-[14px] text-gray-400 leading-relaxed max-w-[640px] mx-auto">
            {ftContent.finalCta.trustText}
          </p>
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

