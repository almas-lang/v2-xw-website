import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch: How Designers Break Into Senior UX Roles in 90 Days",
  description:
    "Watch Shaik Murad's free training on the 3 uncomfortable truths keeping talented designers stuck — and the career system that gets results in 90 days.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://xperiencewave.com/freetraining/watch",
  },
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
