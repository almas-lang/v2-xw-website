'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const programsDropdown = [
  { href: '/programs/senior-ux-designer-mentorship', label: 'Current', tagline: 'For mid-level designers', color: '#E85A4F' },
  { href: '/programs/career-transition-ux-mentorship', label: 'Ripple', tagline: 'Career transition', color: '#4A90A4' },
  { href: '/programs/ux-leadership-mentorship', label: 'Tide', tagline: 'Design leadership', color: '#D4A853' },
];

const businessDropdown = [
  { href: '/talent', label: 'Talent', tagline: 'Hire trained designers', color: '#6366F1' },
  { href: '/design-services', label: 'Surge', tagline: 'Design services', color: '#8B5CF6' },
];

const resourcesDropdown = [
  { href: '/resources/blogs', label: 'Blog', tagline: 'Insights & articles', color: '#4A90A4' },
  { href: '/resources/tools', label: 'Tools', tagline: 'Free AI tools', color: '#E85A4F' },
  { href: '/resources/faq', label: 'FAQs', tagline: 'Common questions', color: '#6366F1' },
  { href: '/resources/shortcourses', label: 'Short Courses', tagline: 'Quick learning', color: '#D4A853' },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/community', label: 'Community' },
];


// Animated Hamburger Icon Component
function HamburgerIcon({ isOpen, isDarkMode }: { isOpen: boolean; isDarkMode: boolean }) {
  return (
    <div className="w-6 h-6 relative flex items-center justify-center">
      <span
        className={`absolute block h-0.5 w-5 transform transition-all duration-300 ease-in-out ${
          isDarkMode ? 'bg-white' : 'bg-carbon'
        } ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
      />
      <span
        className={`absolute block h-0.5 w-5 transition-all duration-300 ease-in-out ${
          isDarkMode ? 'bg-white' : 'bg-carbon'
        } ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      />
      <span
        className={`absolute block h-0.5 w-5 transform transition-all duration-300 ease-in-out ${
          isDarkMode ? 'bg-white' : 'bg-carbon'
        } ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}
      />
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const [hoveredBusiness, setHoveredBusiness] = useState<number | null>(null);
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);
  const programsRef = useRef<HTMLLIElement>(null);
  const businessRef = useRef<HTMLLIElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);

  // Get page-aware accent color
  const getPageAccentColor = () => {
    // Community pages - Indigo
    if (pathname.startsWith('/community')) return '#6366F1';
    // Resources pages - Alice blue
    if (pathname.startsWith('/resources')) return '#4A90A4';
    // Program detail pages - each has its own color
    if (pathname.includes('senior-ux-designer-mentorship')) return '#E85A4F'; // Current - coral
    if (pathname.includes('career-transition-ux-mentorship')) return '#4A90A4'; // Ripple - teal
    if (pathname.includes('ux-leadership-mentorship')) return '#D4A853'; // Tide - gold
    // Default - accent red
    return '#FF0023';
  };
  const pageAccent = getPageAccentColor();

  // Handle scroll to toggle dark/light mode
  useEffect(() => {
    const handleScroll = () => {
      // Switch to light mode after scrolling past hero section (roughly 500px)
      const scrollThreshold = 500;
      setIsDarkMode(window.scrollY < scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Check if current path matches a link
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Check if any program is active
  const isProgramActive = programsDropdown.some((item) => pathname.startsWith(item.href)) || pathname === '/programs';

  // Check if any business item is active
  const isBusinessActive = businessDropdown.some((item) => pathname.startsWith(item.href)) || pathname === '/for-business';

  // Check if any resources item is active
  const isResourcesActive = resourcesDropdown.some((item) => pathname.startsWith(item.href)) || pathname === '/resources';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (programsRef.current && !programsRef.current.contains(event.target as Node)) {
        setProgramsOpen(false);
      }
      if (businessRef.current && !businessRef.current.contains(event.target as Node)) {
        setBusinessOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset mobile accordion states when menu closes
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProgramsOpen(false);
    setMobileBusinessOpen(false);
    setMobileResourcesOpen(false);
  };

  // Accordion toggle - only one open at a time
  const toggleAccordion = (section: 'programs' | 'business' | 'resources') => {
    if (section === 'programs') {
      setMobileProgramsOpen(!mobileProgramsOpen);
      setMobileBusinessOpen(false);
      setMobileResourcesOpen(false);
    } else if (section === 'business') {
      setMobileBusinessOpen(!mobileBusinessOpen);
      setMobileProgramsOpen(false);
      setMobileResourcesOpen(false);
    } else {
      setMobileResourcesOpen(!mobileResourcesOpen);
      setMobileProgramsOpen(false);
      setMobileBusinessOpen(false);
    }
  };

  // Mobile Menu Content
  const MobileMenuContent = () => {
    return (
        <div className="w-full max-w-md mx-auto">
          <nav className="space-y-1">
            {/* Home */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '50ms' : '0ms',
              }}
            >
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`block py-4 px-5 rounded-xl font-heading text-xl font-semibold transition-all ${
                  isActive('/')
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>
            </div>

            {/* Programs Accordion */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '100ms' : '0ms',
              }}
            >
              <div
                className={`flex items-center justify-between py-4 px-5 rounded-xl transition-all ${
                  mobileProgramsOpen || isProgramActive
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <Link
                  href="/programs"
                  onClick={closeMobileMenu}
                  className="font-heading text-xl font-semibold hover:text-white"
                >
                  Programs
                </Link>
                <button
                  onClick={() => toggleAccordion('programs')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Toggle programs submenu"
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileProgramsOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileProgramsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-2 px-3 space-y-1">
                  {programsDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-base font-medium text-white block group-hover:text-white">
                          {item.label}
                        </span>
                        <span className="text-sm text-white/50">
                          {item.tagline}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* For Business Accordion */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '150ms' : '0ms',
              }}
            >
              <div
                className={`flex items-center justify-between py-4 px-5 rounded-xl transition-all ${
                  mobileBusinessOpen || isBusinessActive
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <Link
                  href="/for-business"
                  onClick={closeMobileMenu}
                  className="font-heading text-xl font-semibold hover:text-white"
                >
                  For Business
                </Link>
                <button
                  onClick={() => toggleAccordion('business')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Toggle business submenu"
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileBusinessOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileBusinessOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-2 px-3 space-y-1">
                  {businessDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-base font-medium text-white block">
                          {item.label}
                        </span>
                        <span className="text-sm text-white/50">
                          {item.tagline}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* About */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '200ms' : '0ms',
              }}
            >
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className={`block py-4 px-5 rounded-xl font-heading text-xl font-semibold transition-all ${
                  isActive('/about')
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                About
              </Link>
            </div>

            {/* Podcast */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '250ms' : '0ms',
              }}
            >
              <Link
                href="/podcast"
                onClick={closeMobileMenu}
                className={`block py-4 px-5 rounded-xl font-heading text-xl font-semibold transition-all ${
                  isActive('/podcast')
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                Podcast
              </Link>
            </div>

            {/* Community */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '300ms' : '0ms',
              }}
            >
              <Link
                href="/community"
                onClick={closeMobileMenu}
                className={`block py-4 px-5 rounded-xl font-heading text-xl font-semibold transition-all ${
                  isActive('/community')
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                Community
              </Link>
            </div>

            {/* Resources Accordion */}
            <div
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
                transitionDelay: mobileMenuOpen ? '350ms' : '0ms',
              }}
            >
              <div
                className={`flex items-center justify-between py-4 px-5 rounded-xl transition-all ${
                  mobileResourcesOpen || isResourcesActive
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <Link
                  href="/resources"
                  onClick={closeMobileMenu}
                  className="font-heading text-xl font-semibold hover:text-white"
                >
                  Resources
                </Link>
                <button
                  onClick={() => toggleAccordion('resources')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Toggle resources submenu"
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileResourcesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-2 px-3 space-y-1">
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-base font-medium text-white block">
                          {item.label}
                        </span>
                        <span className="text-sm text-white/50">
                          {item.tagline}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div
            className="mt-8 px-5"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease-out',
              transitionDelay: mobileMenuOpen ? '400ms' : '0ms',
            }}
          >
            <Button
              href="https://calendly.com/team-xperiencewave/xw-strategy"
              size="lg"
              className="w-full justify-center"
              onClick={closeMobileMenu}
            >
              Book strategy call
            </Button>
          </div>
        </div>
      );
  };

  // Option 1: Full-Screen Overlay
  const FullScreenOverlay = () => (
    <div
      className={`lg:hidden fixed top-14 left-0 right-0 bottom-0 z-[100] transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Dark background */}
      <div
        className="absolute inset-0 bg-carbon"
        onClick={closeMobileMenu}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 50%, #0a0a0a 100%)',
        }}
      />

      {/* Decorative X in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-heading font-black text-[280px] leading-none text-white/[0.03]">
          X
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full overflow-y-auto flex flex-col pt-8 pb-8 px-5">
        <MobileMenuContent />
      </div>
    </div>
  );

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        isDarkMode
          ? 'bg-carbon/80'
          : 'bg-white/90'
      }`}
      style={{
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : pageAccent + '30'}`
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-5 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Xperience Wave Home">
          {/* Mobile Logo */}
          <Image
            src="/images/xw-logo-mobile.png"
            alt="Xperience Wave"
            width={32}
            height={32}
            className={`h-6 w-auto lg:hidden transition-all duration-300 ${!isDarkMode ? 'brightness-0' : ''}`}
            priority
          />
          {/* Desktop Logo */}
          <Image
            src="/images/xw-logo-light.png"
            alt="Xperience Wave"
            width={100}
            height={28}
            className={`h-6 w-auto hidden lg:block transition-all duration-300 ${!isDarkMode ? 'brightness-0' : ''}`}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {/* Home */}
          <li>
            <Link
              href="/"
              className={`font-heading text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                isActive('/')
                  ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                  : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
              }`}
            >
              Home
            </Link>
          </li>

          {/* Programs Dropdown */}
          <li
            className="relative"
            ref={programsRef}
            onMouseLeave={() => setProgramsOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/programs"
                className={`font-heading text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                  isProgramActive
                    ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                    : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
                }`}
              >
                Programs
              </Link>
              <button
                onMouseEnter={() => setProgramsOpen(true)}
                onClick={() => setProgramsOpen(!programsOpen)}
                className={`p-1 rounded transition-colors ${
                  isDarkMode ? 'text-g300 hover:text-white hover:bg-white/10' : 'text-g600 hover:text-carbon hover:bg-g100'
                }`}
                aria-label="Toggle programs menu"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-72 transition-all ${
                programsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-2xl shadow-lg p-3 space-y-2">
                {programsDropdown.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: hoveredProgram === index ? `${item.color}08` : 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: hoveredProgram === index ? `${item.color}30` : 'transparent',
                    }}
                    onMouseEnter={() => setHoveredProgram(index)}
                    onMouseLeave={() => setHoveredProgram(null)}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 transition-transform duration-200"
                      style={{
                        backgroundColor: item.color,
                        transform: hoveredProgram === index ? 'scale(1.25)' : 'scale(1)',
                      }}
                    />
                    <div>
                      <span
                        className="font-heading text-sm font-semibold block transition-colors duration-200"
                        style={{ color: hoveredProgram === index ? item.color : '#1a1a1a' }}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-g400">{item.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* For Business Dropdown */}
          <li
            className="relative"
            ref={businessRef}
            onMouseLeave={() => setBusinessOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/for-business"
                className={`font-heading text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                  isBusinessActive
                    ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                    : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
                }`}
              >
                For Business
              </Link>
              <button
                onMouseEnter={() => setBusinessOpen(true)}
                onClick={() => setBusinessOpen(!businessOpen)}
                className={`p-1 rounded transition-colors ${
                  isDarkMode ? 'text-g300 hover:text-white hover:bg-white/10' : 'text-g600 hover:text-carbon hover:bg-g100'
                }`}
                aria-label="Toggle business menu"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${businessOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-72 transition-all ${
                businessOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-2xl shadow-lg p-3 space-y-2">
                {businessDropdown.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: hoveredBusiness === index ? `${item.color}08` : 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: hoveredBusiness === index ? `${item.color}30` : 'transparent',
                    }}
                    onMouseEnter={() => setHoveredBusiness(index)}
                    onMouseLeave={() => setHoveredBusiness(null)}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 transition-transform duration-200"
                      style={{
                        backgroundColor: item.color,
                        transform: hoveredBusiness === index ? 'scale(1.25)' : 'scale(1)',
                      }}
                    />
                    <div>
                      <span
                        className="font-heading text-sm font-semibold block transition-colors duration-200"
                        style={{ color: hoveredBusiness === index ? item.color : '#1a1a1a' }}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-g400">{item.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* About, Podcast, Community */}
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-heading text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                  isActive(link.href)
                    ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                    : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Resources Dropdown */}
          <li
            className="relative"
            ref={resourcesRef}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/resources"
                className={`font-heading text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                  isResourcesActive
                    ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                    : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
                }`}
              >
                Resources
              </Link>
              <button
                onMouseEnter={() => setResourcesOpen(true)}
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`p-1 rounded transition-colors ${
                  isDarkMode ? 'text-g300 hover:text-white hover:bg-white/10' : 'text-g600 hover:text-carbon hover:bg-g100'
                }`}
                aria-label="Toggle resources menu"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-72 transition-all ${
                resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-2xl shadow-lg p-3 space-y-2">
                {resourcesDropdown.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: hoveredResource === index ? `${item.color}08` : 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: hoveredResource === index ? `${item.color}30` : 'transparent',
                    }}
                    onMouseEnter={() => setHoveredResource(index)}
                    onMouseLeave={() => setHoveredResource(null)}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 transition-transform duration-200"
                      style={{
                        backgroundColor: item.color,
                        transform: hoveredResource === index ? 'scale(1.25)' : 'scale(1)',
                      }}
                    />
                    <div>
                      <span
                        className="font-heading text-sm font-semibold block transition-colors duration-200"
                        style={{ color: hoveredResource === index ? item.color : '#1a1a1a' }}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-g400">{item.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" size="sm">
            Book strategy call
          </Button>
        </div>

        {/* Mobile Menu Toggle with Animated Hamburger */}
        <button
          className={`lg:hidden p-2 transition-colors ${isDarkMode ? 'text-white' : 'text-carbon'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <HamburgerIcon isOpen={mobileMenuOpen} isDarkMode={isDarkMode} />
        </button>
      </nav>
    </header>

    {/* Mobile Menu - Full Screen Overlay */}
    <FullScreenOverlay />
    </>
  );
}
