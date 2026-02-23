'use client';

import { useState } from 'react';
import Link from 'next/link';

// Inquiry type options
type InquiryType = 'hiring' | 'services' | 'training' | 'wavemakers' | 'community-sponsor' | 'podcast-sponsor' | 'general' | '';

const inquiryOptions = [
  { value: 'hiring', label: 'Hire UX Designers' },
  { value: 'services', label: 'Design Services' },
  { value: 'training', label: 'Training for Teams' },
  { value: 'wavemakers', label: 'Register for Wave Makers Connect' },
  { value: 'community-sponsor', label: 'Sponsor Community Events' },
  { value: 'podcast-sponsor', label: 'Sponsor Podcast' },
  { value: 'general', label: 'General Inquiry' },
];

// Dropdown options for Hiring form
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

// Dropdown options for Services form
const roleOptions = [
  'Founder / CEO',
  'Product Manager',
  'Engineering Lead',
  'Design Lead',
  'Marketing Lead',
  'Other',
];

// Dropdown options for Training form
const teamSizes = [
  '2-5 members',
  '6-10 members',
  '11-20 members',
  '21-50 members',
  '50+ members',
];

// Dropdown options for Wave Makers Connect
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

const joiningForOptions = [
  'Networking',
  'Learning',
  'Speaker Sessions',
  'Meet the Community',
  'Hiring/Recruiting',
  'Other',
];

// Dropdown options for General Inquiry
const subjectOptions = [
  'Mentorship Programs',
  'Partnership',
  'General Inquiry',
  'Other',
];

// Dropdown options for Community Sponsorship
const sponsorshipTypes = [
  'Event Sponsor',
  'F&B Partner',
  'Venue Partner',
  'Media Partner',
  'Other',
];

// Shared options
const hearAboutOptions = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Social Media',
  'Industry Event',
  'WhatsApp Community',
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
];

// Form data interface
interface FormData {
  // Common fields
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  company: string;
  // Hiring specific
  designation: string;
  experienceLevel: string;
  engagementType: string;
  designerCount: string;
  timeline: string;
  budgetRange: string;
  roleDescription: string;
  hearAbout: string;
  consent: boolean;
  // Services specific
  productUrl: string;
  role: string;
  whatsNotWorking: string;
  // Training specific
  teamSize: string;
  trainingGoals: string;
  // Wave Makers specific
  linkedin: string;
  profession: string;
  joiningFor: string[];
  // General specific
  subject: string;
  message: string;
  // Sponsorship specific
  sponsorshipType: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  countryCode: '+91',
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
  productUrl: '',
  role: '',
  whatsNotWorking: '',
  teamSize: '',
  trainingGoals: '',
  linkedin: '',
  profession: '',
  joiningFor: [],
  subject: '',
  message: '',
  sponsorshipType: '',
};

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('general');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleInquiryTypeChange = (value: InquiryType) => {
    setInquiryType(value);
    setFormData(initialFormData);
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      let endpoint = '/api/contact';
      let body: Record<string, unknown> = {};

      switch (inquiryType) {
        case 'hiring':
          endpoint = '/api/hiring-requirements';
          body = {
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
          };
          break;
        case 'services':
          endpoint = '/api/services-lead';
          body = {
            name: formData.name,
            email: formData.email,
            productUrl: formData.productUrl,
            role: formData.role,
            whatsNotWorking: formData.whatsNotWorking,
            source: 'contact-page-services',
          };
          break;
        case 'training':
          endpoint = '/api/contact';
          body = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: 'Training for Teams',
            message: `Company: ${formData.company}\nTeam Size: ${formData.teamSize}\n\nTraining Goals:\n${formData.trainingGoals}`,
          };
          break;
        case 'wavemakers':
          endpoint = '/api/event-register';
          body = {
            name: formData.name,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            linkedin: formData.linkedin,
            profession: formData.profession,
            company: formData.company,
            hearAbout: formData.hearAbout,
            joiningFor: formData.joiningFor,
          };
          break;
        case 'community-sponsor':
          endpoint = '/api/sponsor-inquiry';
          body = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            sponsorshipType: formData.sponsorshipType,
            message: formData.message,
          };
          break;
        case 'podcast-sponsor':
          endpoint = '/api/podcast-sponsor';
          body = {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
          };
          break;
        case 'general':
        default:
          endpoint = '/api/contact';
          body = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialFormData);
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

  const getSuccessMessage = () => {
    switch (inquiryType) {
      case 'hiring':
        return {
          title: 'Requirements Received!',
          message: 'Our talent team will review and get back to you within 24-48 hours with matching profiles.',
        };
      case 'services':
        return {
          title: 'Request Received!',
          message: 'Our design team will review your product and reach out within 24-48 hours.',
        };
      case 'training':
        return {
          title: 'Inquiry Received!',
          message: 'Our training team will get back to you within 24-48 hours to discuss your needs.',
        };
      case 'wavemakers':
        return {
          title: "You're In!",
          message: "We'll send event details to your email and add you to our WhatsApp community closer to the date.",
        };
      case 'community-sponsor':
        return {
          title: 'Sponsorship Inquiry Received!',
          message: "Thank you for your interest in sponsoring our community events. We'll reach out within 24-48 hours.",
        };
      case 'podcast-sponsor':
        return {
          title: 'Sponsorship Inquiry Received!',
          message: "Thank you for your interest in sponsoring Vivid Yellow podcast. We'll reach out within 24-48 hours.",
        };
      case 'general':
      default:
        return {
          title: 'Message Sent!',
          message: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
        };
    }
  };

  // Common input class
  const inputClass = "w-full px-3 py-2.5 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors text-base text-white placeholder-g500";
  const selectClass = "w-full px-3 py-2.5 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors text-base text-white appearance-none cursor-pointer";

  // Dropdown arrow style for select elements
  const selectArrowStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
  };

  // Render form fields based on inquiry type
  const renderFormFields = () => {
    switch (inquiryType) {
      case 'hiring':
        return (
          <>
            {/* Contact Info Section */}
            <div className="space-y-4">
              <p className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">Contact Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Work Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Phone <span className="text-accent">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className={`${selectClass} w-[90px] shrink-0`}
                      style={selectArrowStyle}
                    >
                      {countryCodes.map(({ code }) => (
                        <option key={code} value={code} className="bg-[#1a1a1a]">{code}</option>
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
                      className={`${inputClass} flex-1`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Company <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="designation" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Your Designation <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  required
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g. HR Manager, Design Lead"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Hiring Requirements Section */}
            <div className="space-y-4">
              <p className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">Hiring Requirements</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="experienceLevel" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Experience Level <span className="text-accent">*</span>
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    required
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className={selectClass}
                    style={selectArrowStyle}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select level</option>
                    {experienceLevels.map(option => (
                      <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="engagementType" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Engagement Type <span className="text-accent">*</span>
                  </label>
                  <select
                    id="engagementType"
                    name="engagementType"
                    required
                    value={formData.engagementType}
                    onChange={handleInputChange}
                    className={selectClass}
                    style={selectArrowStyle}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select type</option>
                    {engagementTypes.map(option => (
                      <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="designerCount" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    How many designers? <span className="text-accent">*</span>
                  </label>
                  <select
                    id="designerCount"
                    name="designerCount"
                    required
                    value={formData.designerCount}
                    onChange={handleInputChange}
                    className={selectClass}
                    style={selectArrowStyle}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select count</option>
                    {designerCounts.map(option => (
                      <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block font-heading text-sm font-semibold text-white mb-1.5">
                    Hiring Timeline <span className="text-accent">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={selectClass}
                    style={selectArrowStyle}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select timeline</option>
                    {timelines.map(option => (
                      <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="budgetRange" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Budget Range (per annum) <span className="text-g500 text-xs">(optional)</span>
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className={selectClass}
                  style={selectArrowStyle}
                >
                  <option value="" className="bg-[#1a1a1a]">Select budget range</option>
                  {budgetRanges.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="roleDescription" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Role Description <span className="text-g500 text-xs">(optional)</span>
                </label>
                <textarea
                  id="roleDescription"
                  name="roleDescription"
                  value={formData.roleDescription}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe the role, required skills, tools (Figma, etc.), and any specific requirements..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label htmlFor="hearAbout" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  How did you hear about us? <span className="text-g500 text-xs">(optional)</span>
                </label>
                <select
                  id="hearAbout"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleInputChange}
                  className={selectClass}
                  style={selectArrowStyle}
                >
                  <option value="" className="bg-[#1a1a1a]">Select an option</option>
                  {hearAboutOptions.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
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
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-accent checked:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
                />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  I agree to receive communications about matching designer profiles and accept the{' '}
                  <Link href="/privacy-policy" className="text-accent underline underline-offset-2 hover:text-accent/80">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          </>
        );

      case 'services':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="productUrl" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Product URL <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="productUrl"
                name="productUrl"
                required
                value={formData.productUrl}
                onChange={handleInputChange}
                placeholder="https://yourproduct.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="role" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Your Role <span className="text-accent">*</span>
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleInputChange}
                className={selectClass}
                style={selectArrowStyle}
              >
                <option value="" disabled className="bg-[#1a1a1a]">Select your role</option>
                {roleOptions.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="whatsNotWorking" className="block font-heading text-sm font-semibold text-white mb-1.5">
                What&apos;s Not Working? <span className="text-accent">*</span>
              </label>
              <textarea
                id="whatsNotWorking"
                name="whatsNotWorking"
                required
                value={formData.whatsNotWorking}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about the UX challenges you're facing..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        );

      case 'training':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Phone <span className="text-g500 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 12345 67890"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="company" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Company <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="teamSize" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Team Size <span className="text-accent">*</span>
              </label>
              <select
                id="teamSize"
                name="teamSize"
                required
                value={formData.teamSize}
                onChange={handleInputChange}
                className={selectClass}
                style={selectArrowStyle}
              >
                <option value="" disabled className="bg-[#1a1a1a]">Select team size</option>
                {teamSizes.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="trainingGoals" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Training Goals <span className="text-accent">*</span>
              </label>
              <textarea
                id="trainingGoals"
                name="trainingGoals"
                required
                value={formData.trainingGoals}
                onChange={handleInputChange}
                rows={4}
                placeholder="What skills or outcomes are you looking for from this training?"
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        );

      case 'wavemakers':
        return (
          <>
            <div>
              <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Phone <span className="text-accent">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className={`${selectClass} w-[90px] shrink-0`}
                  >
                    {countryCodes.map(({ code }) => (
                      <option key={code} value={code} className="bg-[#1a1a1a]">{code}</option>
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
                    className={`${inputClass} flex-1`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="linkedin" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  LinkedIn <span className="text-g500 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="linkedin.com/in/yourprofile"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profession" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Profession / Role <span className="text-accent">*</span>
                </label>
                <select
                  id="profession"
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleInputChange}
                  className={selectClass}
                  style={selectArrowStyle}
                >
                  <option value="" disabled className="bg-[#1a1a1a]">Select your role</option>
                  {professionOptions.map(option => (
                    <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="company" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Company <span className="text-g500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="hearAbout" className="block font-heading text-sm font-semibold text-white mb-1.5">
                How did you hear about us? <span className="text-g500 text-xs">(optional)</span>
              </label>
              <select
                id="hearAbout"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleInputChange}
                className={selectClass}
                style={selectArrowStyle}
              >
                <option value="" className="bg-[#1a1a1a]">Select an option</option>
                {hearAboutOptions.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-heading text-sm font-semibold text-white mb-2">
                What are you joining for? <span className="text-g500 text-xs">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {joiningForOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleJoiningForChange(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.joiningFor.includes(option)
                        ? 'bg-accent text-white border-2 border-accent'
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
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-accent checked:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
                />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  I agree to join the WaveMakers Connect WhatsApp community and accept the{' '}
                  <Link href="/terms" className="text-accent underline underline-offset-2 hover:text-accent/80">
                    Terms of Use
                  </Link>
                </span>
              </label>
            </div>
          </>
        );

      case 'community-sponsor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Phone <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 12345 67890"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="company" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Company <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="sponsorshipType" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Sponsorship Type <span className="text-accent">*</span>
              </label>
              <select
                id="sponsorshipType"
                name="sponsorshipType"
                required
                value={formData.sponsorshipType}
                onChange={handleInputChange}
                className={selectClass}
                style={selectArrowStyle}
              >
                <option value="" disabled className="bg-[#1a1a1a]">Select sponsorship type</option>
                {sponsorshipTypes.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your sponsorship goals and what you'd like to achieve..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        );

      case 'podcast-sponsor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Company <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your sponsorship goals and what you'd like to achieve..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        );

      case 'general':
        return (
          <>
            <div>
              <label htmlFor="name" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Phone <span className="text-g500 text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 12345 67890"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Subject <span className="text-accent">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className={selectClass}
                style={selectArrowStyle}
              >
                <option value="" disabled className="bg-[#1a1a1a]">Select a topic</option>
                {subjectOptions.map(option => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block font-heading text-sm font-semibold text-white mb-1.5">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you?"
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const successMessage = getSuccessMessage();

  return (
    <main className="bg-[#030303] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 md:pt-28 md:pb-16">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030303 0%, #0a0a1a 100%)' }} />

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

      {/* Separator */}
      <div className="relative max-w-[600px] lg:max-w-[1000px] mx-auto px-4 md:px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Contact Form Section */}
      <section className="relative py-6 md:py-16">
        {/* Background effects */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #030303 100%)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 max-w-[600px] lg:max-w-[1000px] mx-auto px-4 md:px-5">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Form - Shows first on mobile */}
            <div className="lg:col-span-3 lg:order-2">
              {submitStatus === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-green-400 mb-2">{successMessage.title}</h3>
                  <p className="text-green-400/80 text-sm mb-4">
                    {successMessage.message}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setInquiryType('');
                    }}
                    className="text-green-400 font-medium underline hover:no-underline text-sm"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Inquiry Type Selector */}
                  <div>
                    <label htmlFor="inquiryType" className="block font-heading text-sm font-semibold text-white mb-1.5">
                      What are you reaching out for? <span className="text-accent">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      value={inquiryType}
                      onChange={(e) => handleInquiryTypeChange(e.target.value as InquiryType)}
                      required
                      className={selectClass}
                      style={selectArrowStyle}
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Select an option</option>
                      {inquiryOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-[#1a1a1a]">{option.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Form Fields */}
                  {inquiryType && (
                    <>
                      <div className="border-t border-white/10 my-2" />
                      {renderFormFields()}

                      {submitStatus === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2.5 rounded-lg text-sm">
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
                            Submitting...
                          </>
                        ) : (
                          inquiryType === 'wavemakers' ? 'Register' : 'Submit'
                        )}
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>

            {/* Contact Info - Shows second on mobile */}
            <div className="lg:col-span-2 lg:order-1">
              <h2 className="font-heading text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Contact Information</h2>

              {/* Single column on mobile, easier to read */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-white uppercase tracking-wider mb-0.5">Email</h3>
                    <a href="mailto:hello@xperiencewave.com" className="text-sm text-g400 hover:text-accent transition-colors">
                      hello@xperiencewave.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-white uppercase tracking-wider mb-0.5">Phone</h3>
                    <a href="tel:08041325804" className="block text-sm text-g400 hover:text-accent transition-colors">
                      080 4132 5804
                    </a>
                    <a href="tel:8147706841" className="block text-sm text-g400 hover:text-accent transition-colors">
                      814 770 6841
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-white uppercase tracking-wider mb-0.5">Address</h3>
                    <p className="text-sm text-g400">
                      328, Ground Floor, AECS Layout, B Block, Singasandra, Bangalore 560068
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-white uppercase tracking-wider mb-0.5">Hours</h3>
                    <p className="text-sm text-g400">
                      Mon - Fri: 10AM - 7PM<br />
                      Sat: 10AM - 2PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links - Hidden on mobile */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-white/10">
                <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h3>
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
