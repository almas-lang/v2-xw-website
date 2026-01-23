'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
          <span className="text-carbon font-medium">Terms of Use</span>
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
              Terms of <span className="text-accent">Use</span>
            </h1>
            <p className="font-body text-sm text-g500">
              Expwave Private Limited Terms of Use
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
                <span className="text-accent">1.</span> Acceptance of Terms
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                Welcome to Expwave Private Limited (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website or online services, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">2.</span> Use of Our Services
              </h2>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">2.1. Eligibility:</span> You must be at least 18 years old to use our services. By using our services, you represent and warrant that you are of legal age to form a binding contract.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">2.2. Registration:</span> Some areas of our services may require you to register an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed">
                <span className="text-carbon font-medium">2.3. User Content:</span> You are solely responsible for any content you submit to our services, including text, images, and other materials. You agree not to submit content that is illegal, infringes on the rights of others, or violates these Terms of Use.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">3.</span> Intellectual Property
              </h2>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">3.1. Ownership:</span> All content and materials on our website and services, including text, images, logos, and trademarks, are the property of Expwave OPC Private Limited or its licensors and are protected by Indian and international copyright and trademark laws.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed">
                <span className="text-carbon font-medium">3.2. Limited License:</span> We grant you a limited, non-exclusive, revocable license to access and use our services for personal, non-commercial purposes. You may not reproduce, distribute, or modify our content without our written consent.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">4.</span> Privacy
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                We collect and use your personal information as described in our{' '}
                <Link href="/privacy-policy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                . By using our services, you consent to our data practices.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">5.</span> Termination
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                We reserve the right to terminate or suspend your access to our services at our discretion, without notice, for any violation of these Terms of Use.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">6.</span> Disclaimers
              </h2>

              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                <span className="text-carbon font-medium">6.1.</span> Our services are provided &quot;as-is&quot; and &quot;as available&quot; without any warranties, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
              </p>

              <p className="font-body text-base text-g600 leading-relaxed">
                <span className="text-carbon font-medium">6.2.</span> We do not guarantee the accuracy, completeness, or reliability of the content on our services.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">7.</span> Limitation of Liability
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                To the extent permitted by law, Expwave OPC Private Limited shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">8.</span> Governing Law and Jurisdiction
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, India.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">9.</span> Changes to Terms
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed">
                We reserve the right to modify these Terms of Use at our discretion. Any changes will be posted on our website or communicated through other appropriate means.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-carbon mb-4">
                <span className="text-accent">10.</span> Contact Us
              </h2>
              <p className="font-body text-base text-g600 leading-relaxed mb-4">
                If you have any questions or concerns about these Terms of Use, please contact us at{' '}
                <a href="mailto:contact@xperiencewave.com" className="text-accent hover:underline">
                  contact@xperiencewave.com
                </a>
              </p>
              <p className="font-body text-base text-g600 leading-relaxed">
                By using our services, you agree to these Terms of Use.
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
