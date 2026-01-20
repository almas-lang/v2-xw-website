'use client';

import { useState, useEffect } from 'react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sponsorshipTypes = [
  'Event Sponsor',
  'F&B Partner',
  'Venue Partner',
  'Media Partner',
  'Other',
];

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sponsorshipType: '',
    message: '',
  });

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      // Reset form after close
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sponsorshipType: '',
        message: '',
      });
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal - Bottom sheet on mobile, centered on desktop */}
      <div
        className={`absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:w-[500px] max-h-[90vh] md:max-h-[85vh]
          bg-white rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${isAnimating
            ? 'translate-y-0 md:opacity-100 md:scale-100'
            : 'translate-y-full md:opacity-0 md:scale-95 md:translate-y-0'
          }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-100">
          {/* Drag indicator - mobile only */}
          <div className="flex justify-center pt-3 pb-2 md:hidden">
            <div className="w-10 h-1 rounded-full bg-neutral-300" />
          </div>

          <div className="flex items-center justify-between px-5 md:px-6 py-3 md:py-4">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-neutral-900">
                {isSuccess ? 'Thank You!' : 'Become a Sponsor'}
              </h2>
              {!isSuccess && (
                <p className="text-sm text-neutral-500 mt-0.5">Partner with WaveMakers Connect</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] md:max-h-[calc(85vh-80px)]">
          {isSuccess ? (
            // Success State
            <div className="px-5 md:px-6 py-10 md:py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                We&apos;ve received your inquiry!
              </h3>
              <p className="text-neutral-500 mb-8 max-w-[280px] mx-auto">
                Our team will review your details and get back to you within 2 business days.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold rounded-xl transition-colors"
              >
                Got it
              </button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="px-5 md:px-6 py-5 md:py-6 space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="sponsor-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Your Name <span className="text-indigo-500">*</span>
                </label>
                <input
                  type="text"
                  id="sponsor-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="sponsor-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email <span className="text-indigo-500">*</span>
                </label>
                <input
                  type="email"
                  id="sponsor-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Phone & Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sponsor-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Phone <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="sponsor-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="sponsor-company" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Company <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="sponsor-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Sponsorship Type */}
              <div>
                <label htmlFor="sponsor-type" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Sponsorship Type <span className="text-indigo-500">*</span>
                </label>
                <select
                  id="sponsor-type"
                  name="sponsorshipType"
                  required
                  value={formData.sponsorshipType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled>Select type</option>
                  {sponsorshipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="sponsor-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Message <span className="text-neutral-400">(optional)</span>
                </label>
                <textarea
                  id="sponsor-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your sponsorship goals or any questions you have..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2 pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-heading font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
