'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VENUE_MAPS_URL, WHATSAPP_GROUP_URL } from '@/components/community/venue';

// Event details - can be moved to a config file later
const eventDetails = {
  edition: '#4',
  title: "The Designers We're Becoming",
  date: 'Saturday, Oct 24, 2026',
  time: '10 AM – 1 PM',
  location: 'Bengaluru',
  venue: 'Soul Staje, HSR Layout (opp. NIFT College)',
};

const professionOptions = [
  'Designer',
  'Engineer',
  'Founder',
  'Product Manager',
  'Recruiter',
  'Sales & Business',
  'Investor',
  'Student',
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

const joiningForOptions = [
  'Networking',
  'Learning',
  'Speaker Sessions',
  'Meet the Community',
  'Hiring/Recruiting',
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
  hearAbout: string;
  joiningFor: string[];
  consent: boolean;
}

export default function RegisterPage() {
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
    hearAbout: '',
    joiningFor: [],
    consent: false,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleJoiningForChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      joiningFor: prev.joiningFor.includes(option)
        ? prev.joiningFor.filter(o => o !== option)
        : [...prev.joiningFor, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/event-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          linkedin: formData.linkedin,
          profession: formData.profession,
          company: formData.company,
          hearAbout: formData.hearAbout,
          joiningFor: formData.joiningFor,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.scrollTo(0, 0);
        setIsSuccess(true);

        // Check if already registered
        if (data.message === 'Already registered') {
          // They're still shown success, but we could optionally show different content
        }
      } else {
        alert(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  const generateCalendarUrl = (type: 'google' | 'outlook' | 'apple') => {
    const startDate = '20261024T043000Z'; // Oct 24, 2026 10:00 AM IST
    const endDate = '20261024T073000Z';   // Oct 24, 2026 1:00 PM IST
    const title = encodeURIComponent(`WaveMakers Connect Edition ${eventDetails.edition}`);
    const details = encodeURIComponent(`Join us for WaveMakers Connect - a free design & tech meetup in Bangalore.\n\nVenue: ${eventDetails.venue}`);
    const location = encodeURIComponent(eventDetails.venue);

    if (type === 'google') {
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    }
    if (type === 'outlook') {
      return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=2026-10-24T10:00:00&enddt=2026-10-24T13:00:00&body=${details}&location=${location}`;
    }
    // Apple Calendar - downloads .ics file
    return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${startDate}%0ADTEND:${endDate}%0ASUMMARY:${title}%0ADESCRIPTION:${details}%0ALOCATION:${location}%0AEND:VEVENT%0AEND:VCALENDAR`;
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

        {/* Confetti effect - using deterministic values based on index to avoid hydration mismatch */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${(i * 37) % 100}%`,
                top: '-10px',
                backgroundColor: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8'][i % 5],
                animationDelay: `${(i * 0.06) % 3}s`,
                animationDuration: `${3 + (i % 3) * 0.7}s`,
              }}
            />
          ))}
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
              You&apos;re In!
            </h1>

            <p className="font-body text-base md:text-lg text-white/70 mb-1">
              You&apos;ve successfully registered for
            </p>
            <p className="font-heading text-lg md:text-xl font-semibold text-indigo-400 mb-4 md:mb-6">
              WaveMakers Connect Edition {eventDetails.edition}
            </p>

            {/* Event details card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-white/80 text-sm md:text-base">
                <span>{eventDetails.date}</span>
                <span className="text-white/30">|</span>
                <span>{eventDetails.time}</span>
                <span className="text-white/30">|</span>
                <span>{eventDetails.location}</span>
              </div>
              <a
                href={VENUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-300 hover:text-indigo-200 text-sm mt-3 underline underline-offset-2 transition-colors"
              >
                📍 {eventDetails.venue}
              </a>
            </div>

            <p className="font-body text-sm md:text-base text-white/60 mb-4 md:mb-6">
              We&apos;ve sent the event details to your email. Join our WhatsApp community for updates and to connect with other attendees before the day.
            </p>

            {/* Add to Calendar */}
            <div className="mb-4 md:mb-6">
              <p className="font-heading font-semibold text-white text-sm md:text-base mb-3">Add to your calendar</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={generateCalendarUrl('google')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V9h15v10.5zm0-12h-15v-3h3V6h1.5V4.5h6V6H16.5V4.5h3v3z"/>
                  </svg>
                  Google
                </a>
                <a
                  href={generateCalendarUrl('outlook')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.5 3h-19C1.675 3 1 3.675 1 4.5v15c0 .825.675 1.5 1.5 1.5h19c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zM8 17H4v-4h4v4zm0-5H4V8h4v4zm6 5h-4v-4h4v4zm0-5h-4V8h4v4zm6 5h-4v-4h4v4zm0-5h-4V8h4v4z"/>
                  </svg>
                  Outlook
                </a>
                <a
                  href={generateCalendarUrl('apple')}
                  download="wavemakers-connect.ics"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Apple
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] hover:bg-[#1fba59] text-white font-heading font-semibold rounded-xl transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join WhatsApp Community
              </a>
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold rounded-xl transition-all"
              >
                Back to Community
              </Link>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: 'WaveMakers Connect',
                    text: `I just registered for WaveMakers Connect Edition ${eventDetails.edition}! Join me at this free design & tech meetup in Bangalore.`,
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

  // Registration Form
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

      {/* Breadcrumb - full width container, hidden on mobile */}
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
          <span className="text-white font-medium">Register</span>
        </nav>
      </div>

      {/* Form container - narrower width */}
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
            Register for Edition {eventDetails.edition}
          </h1>
          {eventDetails.title && (
            <p className="font-heading text-lg text-indigo-300 mb-2">{eventDetails.title}</p>
          )}
          <p className="text-white/60">
            {eventDetails.date} · {eventDetails.time} · {eventDetails.location}
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
                  {countryCodes.map(({ code, country }) => (
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
                LinkedIn <span className="text-white/40">(optional)</span>
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
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

          {/* What are you joining for - Multi-select chips */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              What are you joining for? <span className="text-white/40">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {joiningForOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleJoiningForChange(option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.joiningFor.includes(option)
                      ? 'bg-indigo-600 text-white border-2 border-indigo-600'
                      : 'bg-white/5 text-white/70 border-2 border-white/10 hover:border-white/30'
                  }`}
                >
                  {option}
                </button>
              ))}
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
                I agree to join the WaveMakers Connect WhatsApp community and accept the{' '}
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
                  Registering...
                </>
              ) : (
                <>
                  Register
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
          Your information is safe with us. We only use it to send event updates.
        </p>
      </div>
    </main>
  );
}
