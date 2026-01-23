'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
          <span className="text-carbon font-medium">Privacy Policy</span>
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
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="font-body text-sm text-g500">
              Expwave Private Limited Privacy Policy
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
                Welcome to Expwave Private Limited (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you interact with our services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">2.</span> Information We Collect
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                We may collect the following types of personal information from you:
              </p>

              <h3 className="font-heading text-lg font-semibold text-carbon mb-3">2.1. Information you provide directly:</h3>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside mb-4 space-y-2">
                <li>Contact information (e.g., name, email address, phone number)</li>
                <li>Account registration information</li>
                <li>Payment and billing information</li>
                <li>Communications and correspondence with us</li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-carbon mb-3">2.2. Information collected automatically:</h3>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside mb-4 space-y-2">
                <li>Log data (e.g., IP address, browser type, operating system)</li>
                <li>Usage data (e.g., pages visited, actions taken)</li>
                <li>Cookies and similar technologies (please refer to our Cookie Policy for more information)</li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-carbon mb-3">2.3. Information from third-party sources (if applicable):</h3>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside space-y-2">
                <li>Social media platforms and other online services</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">3.</span> How We Use Your Information
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                We may use your personal information for the following purposes:
              </p>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside space-y-2">
                <li>To provide and improve our products and services</li>
                <li>To process transactions and payments</li>
                <li>To communicate with you about our products, services, and promotions</li>
                <li>To personalize your experience and recommend relevant content</li>
                <li>To comply with legal and regulatory obligations</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">4.</span> Disclosure of Your Information
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                We may share your personal information with:
              </p>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside space-y-2">
                <li>Service providers and business partners who assist us in delivering our services</li>
                <li>Legal authorities, when required by law or to protect our rights and safety</li>
                <li>Other parties with your consent</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">5.</span> Your Rights
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="font-body text-base text-g600 leading-relaxed list-disc list-inside space-y-2 mb-4">
                <li><span className="text-carbon font-medium">Access:</span> You can request access to the personal information we hold about you.</li>
                <li><span className="text-carbon font-medium">Rectification:</span> You can request that we correct inaccurate or incomplete information.</li>
                <li><span className="text-carbon font-medium">Erasure:</span> You can request the deletion of your personal information under certain circumstances.</li>
                <li><span className="text-carbon font-medium">Objection:</span> You can object to the processing of your personal information.</li>
              </ul>
              <p className="font-body text-base text-g600 leading-relaxed">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:contact@xperiencewave.com" className="text-accent hover:underline">
                  contact@xperiencewave.com
                </a>
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">6.</span> Security
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                We implement reasonable security measures to protect your personal information. However, no method of transmission or storage is completely secure. We cannot guarantee the security of your data.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">7.</span> Changes to this Privacy Policy
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes via email or through our website.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">8.</span> Contact Us
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{' '}
                <a href="mailto:contact@xperiencewave.com" className="text-accent hover:underline">
                  contact@xperiencewave.com
                </a>
              </p>
              <p className="font-body text-base text-g600 leading-relaxed">
                By using our services, you consent to the terms of this Privacy Policy.
              </p>
            </section>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-g200">
              <p className="font-body text-base text-carbon font-semibold">Almas Tasneem</p>
              <p className="font-body text-sm text-g500">CEO, Xperience Wave</p>
              <p className="font-body text-sm text-g400 mt-1">26 May 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
