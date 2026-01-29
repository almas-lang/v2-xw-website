'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const experienceLevels = [
  'Junior (0-2 years)',
  'Mid-level (2-4 years)',
  'Senior (4-7 years)',
  'Lead/Principal (7+ years)',
  'Multiple levels',
];

const engagementTypes = [
  'Full-time (Permanent)',
  'Full-time (Contract)',
  'Part-time',
  'Project-based',
  'Not sure yet',
];

const designerCounts = [
  '1 designer',
  '2-3 designers',
  '4-5 designers',
  '6+ designers',
];

const timelines = [
  'Immediately',
  'Within 2 weeks',
  'Within a month',
  'Within 2-3 months',
  'Just exploring',
];

const budgetRanges = [
  'Under ₹5 LPA',
  '₹5-8 LPA',
  '₹8-12 LPA',
  '₹12-18 LPA',
  '₹18+ LPA',
  'Flexible / Market rate',
];

const hearAboutOptions = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Social Media',
  'Industry Event',
  'Other',
];

const countryCodes = [
  { code: '+91', country: 'IN' },
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'AE' },
  { code: '+65', country: 'SG' },
  { code: '+61', country: 'AU' },
];

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  designation: string;
  experienceLevel: string;
  engagementType: string;
  designerCount: string;
  timeline: string;
  budgetRange: string;
  roleDescription: string;
  hearAbout: string;
  consent: boolean;
}

export default function RequirementsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    designation: '',
    experienceLevel: '',
    engagementType: '',
    designerCount: '',
    timeline: '',
    budgetRange: '',
    roleDescription: '',
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
      const response = await fetch('/api/hiring-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          company: formData.company,
          designation: formData.designation,
          experienceLevel: formData.experienceLevel,
          engagementType: formData.engagementType,
          designerCount: formData.designerCount,
          timeline: formData.timeline,
          budgetRange: formData.budgetRange,
          roleDescription: formData.roleDescription,
          hearAbout: formData.hearAbout,
        }),
      });

      if (response.ok) {
        window.scrollTo(0, 0);
        setIsSuccess(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Submission failed. Please try again.');
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

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[600px] mx-auto px-5 pt-24 pb-12 md:py-32">
          <div className="text-center" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center animate-bounce-once">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              Requirements Received!
            </h1>

            <p className="font-body text-base md:text-lg text-white/70 mb-6 md:mb-8 max-w-md mx-auto">
              Thank you for sharing your hiring requirements. Our talent team will review and get back to you within 24-48 hours with matching profiles.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6 md:mb-8 text-left">
              <p className="font-heading font-semibold text-white mb-4">What happens next?</p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                  <span>Our team reviews your requirements and shortlists matching designers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
                  <span>You receive curated profiles within 48-72 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
                  <span>Interview and hire with our 60-day replacement guarantee</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="/for-business/hire-ux-designers"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold rounded-xl transition-all"
              >
                Back to Hire UX Designers
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-heading font-semibold rounded-xl transition-all"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti 4s ease-out forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce-once {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-once {
            animation: bounce-once 0.5s ease-out 0.3s;
          }
        `}</style>
      </main>
    );
  }

  // Form
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
          <Link href="/for-business/hire-ux-designers" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
            Hire UX Designers
          </Link>
          <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-white font-medium">Requirements</span>
        </nav>
      </div>

      {/* Form container */}
      <div className="relative z-10 max-w-[600px] mx-auto px-5 pt-8 md:pt-0 pb-8 md:pb-20">
        <div
          className="text-center mb-6 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.1s',
          }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Share Your Requirements
          </h1>
          <p className="text-white/60 max-w-md mx-auto">
            Tell us about your hiring needs and we&apos;ll match you with job-ready UX designers within 48-72 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          {/* Contact Info Section */}
          <div className="space-y-4">
            <p className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">Contact Information</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Work Email <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

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
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code} className="bg-[#1a1a2e] text-white">{code}</option>
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
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  Company <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-white/80 mb-2">
                Your Designation <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                required
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="e.g. HR Manager, Design Lead"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-6" />

          {/* Hiring Requirements Section */}
          <div className="space-y-4">
            <p className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">Hiring Requirements</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-white/80 mb-2">
                  Experience Level <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled className="bg-[#1a1a2e] text-white/50">Select level</option>
                  {experienceLevels.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="engagementType" className="block text-sm font-medium text-white/80 mb-2">
                  Engagement Type <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="engagementType"
                  name="engagementType"
                  required
                  value={formData.engagementType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled className="bg-[#1a1a2e] text-white/50">Select type</option>
                  {engagementTypes.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="designerCount" className="block text-sm font-medium text-white/80 mb-2">
                  How many designers? <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="designerCount"
                  name="designerCount"
                  required
                  value={formData.designerCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled className="bg-[#1a1a2e] text-white/50">Select count</option>
                  {designerCounts.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                  Hiring Timeline <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" disabled className="bg-[#1a1a2e] text-white/50">Select timeline</option>
                  {timelines.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-white/80 mb-2">
                Budget Range (per annum) <span className="text-white/40">(optional)</span>
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                }}
              >
                <option value="" className="bg-[#1a1a2e] text-white/50">Select budget range</option>
                {budgetRanges.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a2e] text-white">{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="roleDescription" className="block text-sm font-medium text-white/80 mb-2">
                Role Description <span className="text-white/40">(optional)</span>
              </label>
              <textarea
                id="roleDescription"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the role, required skills, tools (Figma, etc.), and any specific requirements..."
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>

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
                I agree to receive communications about matching designer profiles and accept the{' '}
                <Link href="/privacy-policy" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit */}
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
                  Submit Requirements
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/for-business/hire-ux-designers"
              className="text-white/50 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              Discard
            </Link>
          </div>
        </form>

        <p
          className="text-center text-white/40 text-xs mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.4s',
          }}
        >
          Your information is secure. We only use it to match you with suitable designers.
        </p>
      </div>
    </main>
  );
}
