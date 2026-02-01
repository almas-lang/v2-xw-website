'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#030303] pt-20 pb-8 md:pt-28 md:pb-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Accent glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] blur-[80px] md:blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255, 0, 35, 0.15) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-[600px] lg:max-w-[1000px] mx-auto px-4 md:px-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 md:mb-14" aria-label="Breadcrumb">
            <Link href="/" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-white font-medium">Contact Us</span>
          </nav>

          <h1 className="font-heading text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
            Get in Touch
          </h1>
          <p className="text-sm md:text-xl text-g400 max-w-xl">
            Have a question about our programs, training, or services? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-6 md:py-16">
        <div className="max-w-[600px] lg:max-w-[1000px] mx-auto px-4 md:px-5">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Form - Shows first on mobile */}
            <div className="lg:col-span-3 lg:order-2">
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 text-sm mb-4">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="text-green-700 font-medium underline hover:no-underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Name - Full width on mobile */}
                  <div>
                    <label htmlFor="name" className="block font-heading text-sm font-semibold text-carbon mb-1.5">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-g300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors text-base"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email - Full width on mobile */}
                  <div>
                    <label htmlFor="email" className="block font-heading text-sm font-semibold text-carbon mb-1.5">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-g300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone - Full width */}
                  <div>
                    <label htmlFor="phone" className="block font-heading text-sm font-semibold text-carbon mb-1.5">
                      Phone <span className="text-g400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-g300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors text-base"
                      placeholder="+91 12345 67890"
                    />
                  </div>

                  {/* Subject - Full width */}
                  <div>
                    <label htmlFor="subject" className="block font-heading text-sm font-semibold text-carbon mb-1.5">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-g300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors bg-white text-base"
                    >
                      <option value="">Select a topic</option>
                      <option value="Mentorship Programs">Mentorship Programs</option>
                      <option value="Training for Teams">Training for Teams</option>
                      <option value="Hire UX Designers">Hire UX Designers</option>
                      <option value="Design Services">Design Services</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-heading text-sm font-semibold text-carbon mb-1.5">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-g300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none text-base"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info - Shows second on mobile */}
            <div className="lg:col-span-2 lg:order-1">
              <h2 className="font-heading text-lg md:text-2xl font-bold text-carbon mb-4 md:mb-6">Contact Information</h2>

              {/* Single column on mobile, easier to read */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-carbon uppercase tracking-wider mb-0.5">Email</h3>
                    <a href="mailto:hello@xperiencewave.com" className="text-sm text-g600 hover:text-accent transition-colors">
                      hello@xperiencewave.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-carbon uppercase tracking-wider mb-0.5">Phone</h3>
                    <a href="tel:08041325804" className="block text-sm text-g600 hover:text-accent transition-colors">
                      080 4132 5804
                    </a>
                    <a href="tel:8147706841" className="block text-sm text-g600 hover:text-accent transition-colors">
                      814 770 6841
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-carbon uppercase tracking-wider mb-0.5">Address</h3>
                    <p className="text-sm text-g600">
                      328, Ground Floor, AECS Layout, B Block, Singasandra, Bangalore 560068
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-carbon uppercase tracking-wider mb-0.5">Hours</h3>
                    <p className="text-sm text-g600">
                      Mon - Fri: 10AM - 7PM<br />
                      Sat: 10AM - 2PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links - Hidden on mobile */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-g200">
                <h3 className="font-heading text-sm font-semibold text-carbon uppercase tracking-wider mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://calendly.com/team-xperiencewave/xw-strategy" target="_blank" className="text-sm text-accent hover:underline">
                      Book a Strategy Call
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/faq" className="text-sm text-accent hover:underline">
                      View FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="text-sm text-accent hover:underline">
                      Explore Programs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
