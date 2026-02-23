'use client';

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TestimonialGrid } from "@/components/freetraining/TestimonialGrid";
import { ftContent } from "@/lib/freetraining/content";
import { setStorageJSON } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

export default function FreeTrainingHome() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FreeTrainingHomeContent />
    </Suspense>
  );
}

function FreeTrainingHomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', handlePageShow);

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

    return () => { window.removeEventListener('pageshow', handlePageShow); };
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      {/* Rating Section */}
      <div className="py-4 md:py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 md:w-7 md:h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl md:text-3xl font-bold text-gray-900">{ftContent.hero.rating.score}</span>
            <span className="text-gray-600 text-sm md:text-base">Out of {ftContent.hero.rating.count.toLocaleString()} ratings</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-0 md:py-0 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="inline-block bg-gradient-to-r from-ft-purple to-ft-red rounded-full px-6 py-3 md:px-8 md:py-4">
              <p className="text-[15px] lg:text-2xl text-white font-bold">{ftContent.hero.qualifier}</p>
            </div>
            <h1 className="text-[25px]/[1.3] md:text-4xl lg:text-[48px]/[1.1] font-bold text-gray-900">{ftContent.hero.headline}</h1>
            <div className="text-sm md:text-xl text-gray-500 px-4 md:px-12">
              <p className="font-semibold md:font-semibold leading-snug md:leading-snug">{ftContent.hero.subheadline1}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl cursor-pointer group" onClick={() => router.push(ftPath('/getstarted'))}>
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/freetraining/video-thumbnail.png"
                  alt="Free training video - How to move beyond Grunt Design Execution to 2X Pay, Influence & Recognition"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-ft-red rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push(ftPath('/getstarted'))}
              className="mt-6 md:mt-8 bg-ft-red hover:bg-red-600 text-white font-semibold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Send me free training
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      <TestimonialGrid />
    </div>
  );
}
