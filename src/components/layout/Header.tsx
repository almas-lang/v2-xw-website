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

  return (
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
          <Button href="#book-call" size="sm">
            Book strategy call
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isDarkMode ? 'text-white' : 'text-carbon'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
            <path fill="currentColor" d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-xl transition-all overflow-hidden ${
          mobileMenuOpen ? 'max-h-[800px] py-4' : 'max-h-0'
        }`}
        style={{
          borderTop: mobileMenuOpen ? `1px solid ${pageAccent}20` : 'none'
        }}
      >
        <ul className="px-5 space-y-4">
          {/* Home */}
          <li>
            <Link
              href="/"
              className={`block font-heading text-base font-medium ${
                isActive('/') ? 'text-carbon' : 'text-g600 hover:text-carbon'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className={`inline-flex items-center gap-2 ${isActive('/') ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                Home
              </span>
            </Link>
          </li>

          {/* Programs with accordion */}
          <li>
            <div className="flex items-center justify-between">
              <Link
                href="/programs"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-base font-medium ${
                  isProgramActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
                }`}
              >
                <span className={`inline-flex items-center gap-2 ${isProgramActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                  Programs
                </span>
              </Link>
              <button
                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                className="p-2 rounded-lg text-g500 hover:text-carbon hover:bg-g100 transition-colors"
                aria-label="Toggle programs menu"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`}
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
              className={`overflow-hidden transition-all ${
                mobileProgramsOpen ? 'max-h-64 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-2 space-y-1">
                {programsDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-g50 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProgramsOpen(false);
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-sm font-medium text-carbon block">
                          {item.label}
                        </span>
                        <span className="text-xs text-g400">{item.tagline}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* For Business with accordion */}
          <li>
            <div className="flex items-center justify-between">
              <Link
                href="/for-business"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-base font-medium ${
                  isBusinessActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
                }`}
              >
                <span className={`inline-flex items-center gap-2 ${isBusinessActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                  For Business
                </span>
              </Link>
              <button
                onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
                className="p-2 rounded-lg text-g500 hover:text-carbon hover:bg-g100 transition-colors"
                aria-label="Toggle business menu"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${mobileBusinessOpen ? 'rotate-180' : ''}`}
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
              className={`overflow-hidden transition-all ${
                mobileBusinessOpen ? 'max-h-48 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-2 space-y-1">
                {businessDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-g50 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileBusinessOpen(false);
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-sm font-medium text-carbon block">
                          {item.label}
                        </span>
                        <span className="text-xs text-g400">{item.tagline}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* About, Podcast, Community */}
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block font-heading text-base font-medium ${
                  isActive(link.href) ? 'text-carbon' : 'text-g600 hover:text-carbon'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={`inline-flex items-center gap-2 ${isActive(link.href) ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}

          {/* Resources with accordion */}
          <li>
            <div className="flex items-center justify-between">
              <Link
                href="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-base font-medium ${
                  isResourcesActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
                }`}
              >
                <span className={`inline-flex items-center gap-2 ${isResourcesActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                  Resources
                </span>
              </Link>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="p-2 rounded-lg text-g500 hover:text-carbon hover:bg-g100 transition-colors"
                aria-label="Toggle resources menu"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`}
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
              className={`overflow-hidden transition-all ${
                mobileResourcesOpen ? 'max-h-72 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-2 space-y-1">
                {resourcesDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-g50 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileResourcesOpen(false);
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-heading text-sm font-medium text-carbon block">
                          {item.label}
                        </span>
                        <span className="text-xs text-g400">{item.tagline}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <div className="px-5 mt-4">
          <Button href="#book-call" size="sm" className="w-full justify-center">
            Book strategy call
          </Button>
        </div>
      </div>
    </header>
  );
}
