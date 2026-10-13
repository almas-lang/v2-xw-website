import { pageMetadata } from "@/lib/seo";
import { FTHeader } from "@/components/freetraining/Header";
import { FTFooter } from "@/components/freetraining/Footer";
import { FTMetaPixel, FTPageViewTracker } from "@/components/freetraining/FTAnalytics";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export const metadata = pageMetadata('/freetraining');

export default function FreeTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      <FTMetaPixel />
      <FTPageViewTracker />
      <FTHeader />
      <main>{children}</main>
      <FTFooter />
      <WhatsAppButton />
    </>
  );
}
