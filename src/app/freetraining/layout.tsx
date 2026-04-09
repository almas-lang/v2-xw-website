import type { Metadata } from "next";
import { FTHeader } from "@/components/freetraining/Header";
import { FTFooter } from "@/components/freetraining/Footer";
import { FTMetaPixel } from "@/components/freetraining/FTAnalytics";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Free Training: How Designers Break Into Senior UX Roles in 90 Days | Xperience Wave",
    template: "%s | Xperience Wave",
  },
  description:
    "Watch Shaik Murad's free 28-min training on why skilled UX, UI, and Product designers stay stuck at mid-level — and how 830+ designers landed senior & leadership roles paying ₹18-28 LPA in under 90 days.",
  openGraph: {
    title: "Free Training: Break Into Senior UX Roles in 90 Days",
    description:
      "3 uncomfortable truths keeping talented designers stuck — and what designers earning ₹18-28 LPA figured out instead.",
    url: "https://xperiencewave.com/freetraining",
    siteName: "Xperience Wave",
    type: "website",
    // TODO: Add OG image when ready — Murad's face + VSL title
    // images: [{ url: '/freetraining/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://xperiencewave.com/freetraining",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FreeTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      <FTMetaPixel />
      <FTHeader />
      <main>{children}</main>
      <FTFooter />
      <WhatsAppButton />
    </>
  );
}
