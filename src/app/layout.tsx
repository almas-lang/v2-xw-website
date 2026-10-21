import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted from the @fontsource-variable packages. next/font/google
// fetched them from Google at build time, and Google intermittently returns
// URLs Turbopack can't parse, which failed the 21 Oct 2026 production build.
const plusJakarta = localFont({
  src: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-heading",
  display: "swap",
});

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF0023",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://xperiencewave.com"),
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
