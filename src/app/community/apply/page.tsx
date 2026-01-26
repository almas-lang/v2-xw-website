'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const professionOptions = [
  'Designer',
  'Engineer',
  'Founder',
  'Product Manager',
  'Researcher',
  'Consultant',
  'Educator',
  'Other',
];

const hearAboutOptions = [
  'WhatsApp Community',
  'LinkedIn',
  'Instagram',
  'Friend/Colleague',
  'Attended Before',
  'Other',
];

const countryCodes = [
  { code: '+91', country: 'IN' },
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'AE' },
  { code: '+65', country: 'SG' },
  { code: '+61', country: 'AU' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+81', country: 'JP' },
  { code: '+86', country: 'CN' },
  { code: '+82', country: 'KR' },
  { code: '+31', country: 'NL' },
  { code: '+46', country: 'SE' },
  { code: '+41', country: 'CH' },
  { code: '+353', country: 'IE' },
  { code: '+64', country: 'NZ' },
  { code: '+966', country: 'SA' },
  { code: '+974', country: 'QA' },
  { code: '+60', country: 'MY' },
  { code: '+63', country: 'PH' },
];

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  linkedin: string;
  profession: string;
  company: string;
  topic: string;
  bio: string;
  hearAbout: string;
  consent: boolean;
}

export default function SpeakerApplyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    linkedin: '',
    profession: '',
    company: '',
    topic: '',
    bio: '',
    hearAbout: '',
    consent: false,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/speaker-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          linkedin: formData.linkedin,
          profession: formData.profession,
          company: formData.company,
          topic: formData.topic,
          bio: formData.bio,
          hearAbout: formData.hearAbout,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.scrollTo(0, 0);
        setIsSuccess(true);
      } else {
        alert(data.error || 'Application failed. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  // Success State
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#0a0118] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-[600px] mx-auto px-5 pt-24 pb-12 md:py-32">
          <div
            className="text-center"
            style={{
              opacity: 1,
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            {/* Success icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center animate-bounce-once">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-heading text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              Application Received!
            </h1>

            <p className="font-body text-base md:text-lg text-white/70 mb-6">
              Thank you for your interest in speaking at WaveMakers Connect.
            </p>

            {/* Info card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 mb-6 text-left">
              <h3 className="font-heading font-semibold text-white mb-3">What happens next?</h3>
              <ul className="space-y-3 text-white/70 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <span>Our team will review your application within 3-5 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span>If selected, we&apos;ll reach out to discuss your topic and session format</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span>We&apos;ll coordinate on the event date and preparation</span>
                </li>
              </ul>
            </div>

            <p className="font-body text-sm md:text-base text-white/60 mb-6">
              We&apos;ve sent a confirmation to your email. Keep an eye on your inbox!
            </p>

            {/* Action buttons */}
            <div className="space-y-3">
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold rounded-xl transition-all"
              >
                Back to Community
              </Link>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: 'Speak at WaveMakers Connect',
                    text: 'I just applied to speak at WaveMakers Connect! Join this amazing community of designers and tech enthusiasts in Bangalore.',
                    url: window.location.origin + '/community',
                  }).catch(() => {});
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-heading font-semibold rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share with a Friend
              </button>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce-once {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce-once {
            animation: bounce-once 0.5s ease-out 0.3s;
          }
        `}</style>
      </main>
    );
  }

  // Application Form
  return (
    <main className="min-h-screen bg-[#0a0118] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28">
        <nav
          className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
          aria-label="Breadcrumb"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease-out',
          }}
        >
          <Link href="/" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <Link href="/community" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
            Community
          </Link>
          <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-white font-medium">Apply to Speak</span>
        </nav>
      </div>

      {/* Form container */}
      <div className="relative z-10 max-w-[600px] mx-auto px-5 pt-8 md:pt-0 pb-8 md:pb-20">
        {/* Header */}
        <div
          className="text-center mb-6 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.1s',
          }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Apply to Speak
          </h1>
          <p className="font-heading text-lg text-indigo-300 mb-2">WaveMakers Connect</p>
          <p className="text-white/60">
            Share your expertise with our community of designers, engineers, and founders
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Full Name <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email <span className="text-indigo-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@email.com"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Phone & LinkedIn row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0">
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone <span className="text-indigo-400">*</span>
              </label>
              <div className="flex gap-2 min-w-0">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-[90px] shrink-0 pl-3 pr-7 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 6px center',
                    backgroundSize: '16px',
                  }}
                >
                  {countryCodes.map(({ code }) => (
                    <option key={code} value={code} className="bg-[#1a1a2e] text-white">
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="98765 43210"
                  className="flex-1 min-w-0 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-white/80 mb-2">
                LinkedIn <span className="text-indigo-400">*</span>
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                required
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Profession & Company row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-white/80 mb-2">
                Profession / Role <span className="text-indigo-400">*</span>
              </label>
              <select
                id="profession"
                name="profession"
                required
                value={formData.profession}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                }}
              >
                <option value="" disabled className="bg-[#1a1a2e] text-white/50">Select your role</option>
                {professionOptions.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                Company <span className="text-white/40">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-white/80 mb-2">
              Topic you&apos;d like to speak on <span className="text-indigo-400">*</span>
            </label>
            <textarea
              id="topic"
              name="topic"
              required
              rows={3}
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="What would you like to share with our community? (e.g., Design systems at scale, Building AI products, Career transitions in tech)"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-white/80 mb-2">
              Brief bio / Why you? <span className="text-indigo-400">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              required
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself and your expertise. What makes you the right person to speak on this topic?"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          {/* How did you hear about us */}
          <div>
            <label htmlFor="hearAbout" className="block text-sm font-medium text-white/80 mb-2">
              How did you hear about us? <span className="text-white/40">(optional)</span>
            </label>
            <select
              id="hearAbout"
              name="hearAbout"
              value={formData.hearAbout}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '20px',
              }}
            >
              <option value="" className="bg-[#1a1a2e] text-white/50">Select an option</option>
              {hearAboutOptions.map(option => (
                <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
              ))}
            </select>
          </div>

          {/* Consent */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
              />
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                I agree to be contacted about speaking opportunities and accept the{' '}
                <Link href="/terms" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
                  Terms of Use
                </Link>
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-heading font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Discard link */}
          <div className="text-center pt-2">
            <Link
              href="/community"
              className="text-white/50 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              Discard
            </Link>
          </div>
        </form>

        {/* Footer note */}
        <p
          className="text-center text-white/40 text-xs mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.4s',
          }}
        >
          Your information is safe with us. We only use it to contact you about speaking opportunities.
        </p>
      </div>
    </main>
  );
}
