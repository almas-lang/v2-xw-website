import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Analytics from "@/components/Analytics";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF0023",
};

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

  // Canonical & Base URL
  metadataBase: new URL("https://xperiencewave.com"),
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
  // OpenGraph - REQUIRED: Create /public/images/og-image.jpg (1200x630px)
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
        url: "/images/og-image.jpg", // TODO: Create this image (1200x630px)
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

  // Icons & Manifest
  // TODO: Create these favicon files:
  // - /public/favicon.ico (main favicon)
  // - /public/images/favicon-16x16.png (16x16px)
  // - /public/images/favicon-32x32.png (32x32px)
  // - /public/images/apple-touch-icon.png (180x180px)
  // Use https://favicon.io or similar tool to generate from logo
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",

  // Verification
  verification: {
    google: "ycs0l8Z41NZYikYMFF4A9cjexZjWCljZ4GuuDaFgfd8", // Add verification code from Google Search Console
    // yandex: "",
    // bing: "",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SchemaOrg />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${plusJakarta.variable} ${inter.variable} antialiased overflow-x-hidden`}>
        <Analytics />
        <ScrollToTop />
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
