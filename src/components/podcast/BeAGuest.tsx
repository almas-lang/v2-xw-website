'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  roleCompany: string;
  topic: string;
  previousTalks: string;
}

function ApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    linkedin: '',
    roleCompany: '',
    topic: '',
    previousTalks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/podcast-guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      linkedin: '',
      roleCompany: '',
      topic: '',
      previousTalks: '',
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-g100 hover:bg-g200 transition-colors z-10"
        >
          <svg className="w-5 h-5 text-g600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-2">
              Guest Application
            </h3>
            <p className="text-g500">
              Tell us about yourself and what you&apos;d like to discuss.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading text-xl font-bold text-carbon mb-2">Application Submitted!</h4>
              <p className="text-g500 mb-6">We&apos;ll review your application and get back to you soon.</p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-carbon mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-carbon mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-carbon mb-2">
                  LinkedIn URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              {/* Current Role & Company */}
              <div>
                <label htmlFor="roleCompany" className="block text-sm font-medium text-carbon mb-2">
                  Current Role & Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="roleCompany"
                  name="roleCompany"
                  value={formData.roleCompany}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="e.g. Senior Product Designer at Google"
                />
              </div>

              {/* What would you want to talk about? */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-carbon mb-2">
                  What would you want to talk about? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all resize-none"
                  placeholder="Share 2-3 topics or stories you'd like to discuss..."
                />
              </div>

              {/* Link to previous talks */}
              <div>
                <label htmlFor="previousTalks" className="block text-sm font-medium text-carbon mb-2">
                  Link to any previous talks/podcasts <span className="text-g400">(optional)</span>
                </label>
                <input
                  type="url"
                  id="previousTalks"
                  name="previousTalks"
                  value={formData.previousTalks}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-g200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="https://..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/50 text-black font-heading font-semibold rounded-xl transition-all duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BeAGuest() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        style={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        }}
      >
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Be a Guest on <span className="text-yellow-400">Vivid Yellow</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Share your story with designers and product folks across India
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80"
                alt="Be a guest on Vivid Yellow podcast"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Mic icon */}
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <p className="text-white text-base md:text-lg font-medium leading-relaxed mb-4">
                We&apos;re looking for designers, product leaders, founders, and makers with real stories to share. Not polished talks - real experiences about craft, career moves, and building products.
              </p>

              <p className="text-gray-400 text-base md:text-lg mb-8">
                If that sounds like you, tell us about yourself.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/25"
              >
                Submit Application
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
