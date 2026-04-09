import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call Confirmed | Xperience Wave",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CongratulationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
