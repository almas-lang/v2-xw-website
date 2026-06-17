import { Inter, Source_Serif_4, Geist } from "next/font/google";
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
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
