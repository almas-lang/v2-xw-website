'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LeadForm } from "@/components/freetraining/LeadForm";
import { Toast } from "@/components/freetraining/Toast";
import { HeroOptionA } from "@/components/freetraining/HeroOptionA";
import { ftContent } from "@/lib/freetraining/content";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/resources/BlogCard";
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
      <section className="bg-white py-14 md:py-20 px-5">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[14px] font-bold text-accent uppercase tracking-[3px] mb-3">What you&apos;ll learn</p>
            <h2 className="text-[25px] md:text-[37px] font-heading font-bold text-ft-dark-surface leading-tight">
              {ftContent.discover.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {ftContent.discover.cards.map((card, i) => (
              <div
                key={card.number}
                className="group relative bg-ft-section-bg rounded-2xl p-6 md:p-7 hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300 border border-transparent hover:border-accent/10"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-[49px] md:text-[57px] font-heading font-extrabold text-accent/[0.06] leading-none select-none">
                  {card.number}
                </span>

                {/* Step dot */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    i === 0 ? 'bg-accent' : i === 1 ? 'bg-accent' : 'bg-[#2FB83C]'
                  }`} />
                  <span className="text-[14px] font-bold text-ft-muted uppercase tracking-wider">
                    {card.number}
                  </span>
                </div>

                <h3 className="text-[18px] md:text-[19px] font-bold text-ft-dark-surface mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: LEAD CAPTURE FORM ============ */}
      <section id="get-access" className="relative bg-ft-dark py-14 md:py-20 px-5 overflow-hidden">
        {/* Background glow */}
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

      {/* ============ SECTION 4: RESULTS — Marquee style ============ */}
      <section className="bg-white py-12 md:py-16 px-5">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[14px] font-bold text-accent uppercase tracking-[3px] mb-3">Real results</p>
            <h2 className="text-[21px] md:text-[29px] font-heading font-bold text-ft-dark-surface mb-2">
              {ftContent.results.title}
            </h2>
            <p className="text-[16px] text-gray-500">
              {ftContent.results.statsLine}
            </p>
          </div>

          <div className="space-y-3 max-w-[500px] mx-auto mb-6">
            {ftContent.results.cards.map((card) => {
              const Wrapper = 'linkedin' in card && card.linkedin ? 'a' : 'div';
              const linkProps = 'linkedin' in card && card.linkedin
                ? { href: card.linkedin, target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              return (
                <Wrapper
                  key={card.name}
                  {...linkProps}
                  className={`group flex items-center gap-4 bg-ft-section-bg rounded-xl p-4 border border-transparent hover:border-accent/15 hover:shadow-md hover:shadow-ft-purple-cta/[0.04] transition-all duration-200 ${'linkedin' in card && card.linkedin ? 'cursor-pointer' : ''}`}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100 ring-2 ring-transparent group-hover:ring-ft-purple-cta/15 transition-all">
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-bold text-ft-dark-surface">{card.name}</p>
                    <p className="text-[14px] text-gray-500 leading-snug">{card.role}</p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/[0.06] rounded-md shrink-0">
                    <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] font-bold text-accent">{card.timeline}</span>
                  </div>
                  {'linkedin' in card && card.linkedin && (
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-accent shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </Wrapper>
              );
            })}
          </div>

          <p className="text-center">
            <a
              href={ftContent.results.seeAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline cursor-pointer"
            >
              {ftContent.results.seeAllText}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </p>
        </div>
      </section>

      {/* ============ SECTION 5: QUALIFIER ============ */}
      <section className="bg-ft-section-bg py-8 px-5">
        <div className="max-w-[520px] mx-auto">
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-accent/10 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-accent/[0.08] flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[14px] md:text-[15px] text-ft-dark-surface/70 leading-relaxed">
              {ftContent.qualifier.text}
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: ABOUT MURAD ============ */}
      <section className="bg-white py-12 md:py-16 px-5">
        <div className="max-w-[400px] mx-auto text-center">
          <p className="text-[18px] md:text-[20px] font-heading font-bold text-ft-dark-surface mb-5">
            Your host: Shaik Murad
          </p>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 ring-2 ring-ft-purple-cta/10 ring-offset-4 ring-offset-white mx-auto mb-4">
            <img
              src="/images/Murad.png"
              alt="Shaik Murad"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
          <p className="text-[15px] md:text-[16px] text-gray-600 font-medium mb-1">
            Co-founder &amp; Head of Product and Design at Xperience Wave
          </p>
          <p className="text-[14px] md:text-[15px] text-gray-500">
            13+ years in design leadership | 3000+ career transitions guided | Ex-Credit Saison, Ex-Milaap, Ex-KredX
          </p>
        </div>
      </section>

      {/* ============ SECTION 7: SEO CONTENT ============ */}
      <section className="bg-ft-section-bg py-14 md:py-18 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[21px] md:text-[29px] font-heading font-bold text-ft-dark-surface mb-6">
            {ftContent.seoContent.title}
          </h2>
          {ftContent.seoContent.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[15px] text-gray-600 leading-[160%] mb-4">
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <p className="text-[14px] font-bold text-ft-muted uppercase tracking-wider mb-4">Related reads</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ftContent.seoContent.relatedLinks.map((link, i) => {
                const post = blogPosts.find((p) => p.slug === link.slug);
                if (!post) return null;
                return <BlogCard key={post.slug} post={post} index={i} isVisible />;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: FAQ ============ */}
      <section className="bg-white py-14 md:py-20 px-5">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[14px] font-bold text-ft-muted uppercase tracking-[3px] mb-3">Got questions?</p>
            <h2 className="text-[23px] md:text-[31px] font-heading font-bold text-ft-dark-surface">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {ftContent.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 9: FINAL CTA ============ */}
      <section className="relative bg-ft-dark py-14 md:py-20 px-5 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,35,0.08) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <h2 className="text-[25px] md:text-[41px] font-heading font-bold text-white mb-3 leading-tight">
            {ftContent.finalCta.headline}
          </h2>
          <p className="text-[16px] text-ft-muted-light mb-10">
            {ftContent.finalCta.trustText}
          </p>

          <div className="max-w-[420px] mx-auto bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <LeadForm
              onSuccess={handleLeadSuccess}
              onError={(msg) => setToast({ isVisible: true, message: msg, type: "error" })}
              variant="on-purple"
            />
          </div>
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
    <div className="bg-ft-section-bg rounded-xl overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 p-5 cursor-pointer"
      >
        <span className="text-[16px] md:text-[17px] font-semibold text-ft-dark-surface">{question}</span>
        <span className={`w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-3.5 h-3.5 text-ft-dark-surface"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
