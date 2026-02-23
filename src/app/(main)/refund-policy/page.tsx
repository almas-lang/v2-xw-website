'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RefundPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: '#FAFAFA',
        backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Accent gradient glows */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(220,238,255,0.5) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(255,0,35,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Main container */}
      <div className="relative z-10 max-w-[900px] mx-auto px-5 pt-24 md:pt-28 pb-16 md:pb-24">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
          aria-label="Breadcrumb"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/" className="text-g500 hover:text-carbon underline underline-offset-2 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-g400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-carbon font-medium">Refund Policy</span>
        </nav>

        {/* Content Card */}
        <div
          className="bg-white rounded-2xl border border-g200 shadow-sm p-6 sm:p-8 md:p-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-g200">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-carbon mb-4">
              Refund <span className="text-accent">Policy</span>
            </h1>
            <p className="font-body text-sm text-g500">
              Expwave Private Limited No Refund Policy
            </p>
            <p className="font-body text-sm text-g400 mt-2">
              Updated Date: 23 Jan 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">1.</span> Introduction
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                Welcome to Expwave Private Limited (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We value your business and are committed to providing you with high-quality products/services. This No Refund Policy outlines our policy on refunds for purchases made through our platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">2.</span> No Refund Policy
              </h2>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">2.1.</span> Our products/services are provided on an &quot;as-is&quot; basis. We do not provide refunds for any purchases made through our platform, except where required by applicable law.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">2.2.</span> All sales are final. We do not offer refunds or exchanges for any reason, including but not limited to:
              </p>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside space-y-2">
                <li>Change of mind</li>
                <li>Dissatisfaction with the product/service</li>
                <li>Technical issues or compatibility problems</li>
                <li>Cancellation of a subscription or service</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">3.</span> Exceptions
              </h2>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">3.1. Legal Obligations:</span> If we are required by Indian consumer protection laws to provide a refund in specific circumstances, we will comply with those legal obligations.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed">
                <span className="text-carbon font-medium">3.2. Defective or Non-Conforming Products/Services:</span> If you receive a defective or non-conforming product/service, please contact our customer support within 8 days of purchase, and we will work with you to resolve the issue, which may include a refund or replacement as required by law.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">4.</span> Contact Us
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                If you have any questions or concerns about this No Refund Policy, please contact us at{' '}
                <a href="mailto:contact@xperiencewave.com" className="text-accent hover:underline">
                  contact@xperiencewave.com
                </a>
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">5.</span> Changes to this Policy
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                We reserve the right to modify this No Refund Policy at our discretion. Any changes will be posted on our website or communicated through other appropriate means.
              </p>
              <p className="font-body text-base text-g600 leading-relaxed">
                By making a purchase through our platform, you acknowledge and accept the terms of this No Refund Policy.
              </p>
            </section>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-g200">
              <p className="font-body text-base text-carbon font-semibold">Almas Tasneem</p>
              <p className="font-body text-sm text-g500">CEO, Xperience Wave</p>
              <p className="font-body text-sm text-g400 mt-1">23 Jan 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
