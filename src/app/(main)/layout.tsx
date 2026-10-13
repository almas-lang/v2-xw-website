import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  // Page-level title, description, canonical, OG and Twitter come from
  // pageMetadata() in src/lib/seo.ts. Nothing here may set them, or every
  // page without its own metadata inherits the homepage's (the canonical bug
  // that kept 12 pages out of Google's index until Oct 2026).
  title: {
    default: 'UX Mentorship for Senior & Lead Designers | Xperience Wave',
    template: '%s',
  },
  authors: [
    { name: 'Almas Tasneem', url: 'https://www.linkedin.com/in/almas-t/' },
    { name: 'Shaik Murad', url: 'https://www.linkedin.com/in/shaikmurad/' },
  ],
  creator: 'Xperience Wave',
  publisher: 'Xperience Wave',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    site: '@xperiencewave',
    creator: '@xperiencewave',
  },
  verification: {
    google: 'ycs0l8Z41NZYikYMFF4A9cjexZjWCljZ4GuuDaFgfd8',
  },
  applicationName: 'Xperience Wave',
  category: 'education',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <ScrollToTop />
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
