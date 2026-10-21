import localFont from "next/font/local";
import "./webinar.tokens.css";

/*
 * Konfom DS font stack for /ai-design-webinar, self-hosted via next/font
 * (zero layout shift). Scoped to this route only — the rest of the site
 * keeps its Plus Jakarta / Inter stack from the root layout.
 *  - Inter          → --font-ui      (product UI; weights 400/500/600)
 *  - Source Serif 4 → --font-reading (editorial body copy)
 *  - Geist          → --font-brand   (display headlines + wordmark)
 *
 * The .konfom wrapper carries both the next/font CSS variables and the
 * scoped Konfom design tokens (webinar.tokens.css).
 */
// Self-hosted variable fonts (see note in src/app/layout.tsx).
const inter = localFont({
  src: "../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = localFont({
  src: "../../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2",
  weight: "200 900",
  variable: "--font-source-serif",
  display: "swap",
});

const geist = localFont({
  src: "../../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

export default function AiDesignWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${sourceSerif.variable} ${geist.variable} konfom v-bold`}>
      {children}
    </div>
  );
}
