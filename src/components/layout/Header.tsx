'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const programsDropdown = [
  { href: '/programs/senior-ux-designer-mentorship', label: 'Current' },
  { href: '/programs/career-transition-ux-mentorship', label: 'Ripple' },
  { href: '/programs/ux-leadership-mentorship', label: 'Tide' },
  { href: '/programs/free-training', label: 'Free Training' },
];

const businessDropdown = [
  { href: '/talent', label: 'Talent' },
  { href: '/design-services', label: 'Surge' },
];

const resourcesDropdown = [
  { href: '/resources/blogs', label: 'Blog' },
  { href: '/resources/tools', label: 'Tools' },
  { href: '/resources/faq', label: 'FAQs' },
  { href: '/resources/shortcourses', label: 'Short Courses' },
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
  const programsRef = useRef<HTMLLIElement>(null);
  const businessRef = useRef<HTMLLIElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode
        ? 'bg-black/50 backdrop-blur-md border-b border-accent/60'
        : 'bg-white border-b border-g200'
    }`}>
      <nav className="max-w-[1200px] mx-auto px-5 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Xperience Wave Home">
          <Image
            src={isDarkMode ? '/images/xw-logo-light.png' : '/images/xw-logo-dark.png'}
            alt="Xperience Wave"
            width={120}
            height={32}
            className="h-7 md:h-8 w-auto transition-all duration-300"
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
            onMouseEnter={() => setProgramsOpen(true)}
            onMouseLeave={() => setProgramsOpen(false)}
          >
            <Link
              href="/programs"
              className={`font-heading text-sm font-medium transition-colors flex items-center gap-1 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                isProgramActive
                  ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                  : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
              }`}
            >
              Programs
              <svg
                className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-52 transition-all ${
                programsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-xl shadow-lg py-2">
                {programsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 font-heading text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-carbon bg-alice'
                        : 'text-g600 hover:text-carbon hover:bg-alice'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* For Business Dropdown */}
          <li
            className="relative"
            ref={businessRef}
            onMouseEnter={() => setBusinessOpen(true)}
            onMouseLeave={() => setBusinessOpen(false)}
          >
            <Link
              href="/for-business"
              className={`font-heading text-sm font-medium transition-colors flex items-center gap-1 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                isBusinessActive
                  ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                  : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
              }`}
            >
              For Business
              <svg
                className={`w-4 h-4 transition-transform ${businessOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-44 transition-all ${
                businessOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-xl shadow-lg py-2">
                {businessDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 font-heading text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-carbon bg-alice'
                        : 'text-g600 hover:text-carbon hover:bg-alice'
                    }`}
                  >
                    {item.label}
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
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <Link
              href="/resources"
              className={`font-heading text-sm font-medium transition-colors flex items-center gap-1 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all ${
                isResourcesActive
                  ? isDarkMode ? 'text-white after:w-full' : 'text-carbon after:w-full'
                  : isDarkMode ? 'text-g300 hover:text-white after:w-0 hover:after:w-full' : 'text-g600 hover:text-carbon after:w-0 hover:after:w-full'
              }`}
            >
              Resources
              <svg
                className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 w-44 transition-all ${
                resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-white border border-g200 rounded-xl shadow-lg py-2">
                {resourcesDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 font-heading text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-carbon bg-alice'
                        : 'text-g600 hover:text-carbon hover:bg-alice'
                    }`}
                  >
                    {item.label}
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
        className={`lg:hidden bg-white border-t border-g200 transition-all overflow-hidden ${
          mobileMenuOpen ? 'max-h-[800px] py-4' : 'max-h-0'
        }`}
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
            <button
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              className={`w-full flex items-center justify-between font-heading text-base font-medium ${
                isProgramActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
              }`}
            >
              <span className={`inline-flex items-center gap-2 ${isProgramActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                Programs
              </span>
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
            <div
              className={`overflow-hidden transition-all ${
                mobileProgramsOpen ? 'max-h-48 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-4 space-y-3 border-l-2 border-g200">
                {programsDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block font-heading text-sm ${
                        isActive(item.href) ? 'text-carbon font-medium' : 'text-g500 hover:text-carbon'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProgramsOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* For Business with accordion */}
          <li>
            <button
              onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
              className={`w-full flex items-center justify-between font-heading text-base font-medium ${
                isBusinessActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
              }`}
            >
              <span className={`inline-flex items-center gap-2 ${isBusinessActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                For Business
              </span>
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
            <div
              className={`overflow-hidden transition-all ${
                mobileBusinessOpen ? 'max-h-32 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-4 space-y-3 border-l-2 border-g200">
                {businessDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block font-heading text-sm ${
                        isActive(item.href) ? 'text-carbon font-medium' : 'text-g500 hover:text-carbon'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileBusinessOpen(false);
                      }}
                    >
                      {item.label}
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
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className={`w-full flex items-center justify-between font-heading text-base font-medium ${
                isResourcesActive ? 'text-carbon' : 'text-g600 hover:text-carbon'
              }`}
            >
              <span className={`inline-flex items-center gap-2 ${isResourcesActive ? 'border-l-2 border-accent pl-2 -ml-2' : ''}`}>
                Resources
              </span>
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
            <div
              className={`overflow-hidden transition-all ${
                mobileResourcesOpen ? 'max-h-48 mt-2' : 'max-h-0'
              }`}
            >
              <ul className="pl-4 space-y-3 border-l-2 border-g200">
                {resourcesDropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block font-heading text-sm ${
                        isActive(item.href) ? 'text-carbon font-medium' : 'text-g500 hover:text-carbon'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileResourcesOpen(false);
                      }}
                    >
                      {item.label}
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
