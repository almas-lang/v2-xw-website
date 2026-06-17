import type { Metadata } from 'next';
import { Inter, Source_Serif_4, Geist } from 'next/font/google';
import './globals.css';

/*
 * Konfom DS font stack, self-hosted via next/font (zero layout shift):
 *  - Inter         → --font-ui       (product UI, 95% of surfaces; weights 400/500/600 only)
 *  - Source Serif 4 → --font-reading (editorial body copy)
 *  - Geist         → --font-brand    (display headlines + wordmark; marketing surfaces only)
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xperiencewave.com'),
  title: {
    default: 'Xperience Wave',
    template: '%s | Xperience Wave',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
