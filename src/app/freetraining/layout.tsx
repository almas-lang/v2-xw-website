import type { Metadata } from "next";
import { FTHeader } from "@/components/freetraining/Header";
import { FTFooter } from "@/components/freetraining/Footer";
import { FTMetaPixel } from "@/components/freetraining/FTAnalytics";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Free Training: Break Into Senior UX Roles in 90 Days | Xperience Wave",
    template: "%s | Xperience Wave Free Training",
  },
  description: "Watch the free training that shows UX/UI designers exactly how to break into senior & leadership positions in 90 days and 2X your salary.",
  openGraph: {
    title: "Free Training: Break Into Senior UX Roles in 90 Days",
    description: "Watch the free training that shows UX/UI designers exactly how to break into senior & leadership positions in 90 days and 2X your salary.",
    url: "https://xperiencewave.com/freetraining",
    siteName: "Xperience Wave",
    type: "website",
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
