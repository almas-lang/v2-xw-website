import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  // Primary SEO
  title: {
    default: "1:1 UX Design Mentorship for Senior & Leadership Roles | Xperience Wave",
    template: "%s | Xperience Wave",
  },
  description:
    "Break into senior UX roles in 90 days with personalized 1:1 mentorship. Stop wasting time on generic courses. Get expert guidance on portfolio, interviews & salary negotiation. 80%+ success rate.",
  keywords: [
    "UX design mentorship",
    "senior UX designer",
    "UX career coaching",
    "design leadership",
    "portfolio review",
    "UX interview prep",
    "salary negotiation",
    "1:1 mentorship",
    "product design mentor",
    "UI/UX career growth",
    "UX bootcamp",
    "design mentor India",
    "UX course online",
  ],
  authors: [
    { name: "Almas Tasneem", url: "https://www.linkedin.com/in/almas-t/" },
    { name: "Shaik Murad", url: "https://www.linkedin.com/in/shaikmurad/" },
  ],
  creator: "Xperience Wave",
  publisher: "Xperience Wave",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    url: "https://xperiencewave.com/",
    title: "1:1 UX Design Mentorship for Senior & Leadership Roles | Xperience Wave",
    description:
      "Break into senior UX roles in 90 days with personalized 1:1 mentorship. 80%+ of our mentees achieve their career goals.",
    siteName: "Xperience Wave",
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xperience Wave - UX Design Mentorship",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@xperiencewave",
    creator: "@xperiencewave",
    title: "1:1 UX Design Mentorship for Senior & Leadership Roles | Xperience Wave",
    description:
      "Break into senior UX roles in 90 days with personalized 1:1 mentorship. 80%+ of our mentees achieve their career goals.",
    images: ["/images/og-image.jpg"],
  },

  // Verification
  verification: {
    google: "ycs0l8Z41NZYikYMFF4A9cjexZjWCljZ4GuuDaFgfd8",
  },

  // App-specific
  applicationName: "Xperience Wave",
  category: "education",
  classification: "UX Design Mentorship",

  // Other
  referrer: "origin-when-cross-origin",
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
      <SchemaOrg />
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
