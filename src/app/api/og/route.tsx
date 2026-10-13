import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';
import { SEO, SITE_URL } from '@/lib/seo';

/**
 * Generated OpenGraph image for every static page: /api/og?path=/about
 * One template, brand colours, title + description from src/lib/seo.ts.
 * Blog posts use their own hero image instead (see the [slug] page).
 */

export const runtime = 'nodejs';

const WIDTH = 1200;
const HEIGHT = 630;

let logoDataUrl: string | null = null;
async function getLogo(): Promise<string> {
  if (logoDataUrl) return logoDataUrl;
  const buf = await readFile(path.join(process.cwd(), 'public/images/logos/xw-logo-light.png'));
  logoDataUrl = `data:image/png;base64,${buf.toString('base64')}`;
  return logoDataUrl;
}

// Plus Jakarta Sans 500 + 700, fetched once per server instance. Falls back to
// the built-in sans if Google Fonts is unreachable, so the image never fails.
type FontFile = { name: string; data: ArrayBuffer; weight: 500 | 700; style: 'normal' };
let fontPromise: Promise<FontFile[]> | null = null;
function getFonts(): Promise<FontFile[]> {
  if (!fontPromise) {
    fontPromise = (async () => {
      try {
        const load = async (weight: 500 | 700): Promise<FontFile | null> => {
          const css = await fetch(
            `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}&display=swap`,
            { headers: { 'User-Agent': 'Mozilla/5.0' } },
          ).then((r) => r.text());
          const url = css.match(/src: url\((https:[^)]+\.(?:ttf|woff))\)/)?.[1];
          if (!url) return null;
          const data = await fetch(url).then((r) => r.arrayBuffer());
          return { name: 'Plus Jakarta Sans', data, weight, style: 'normal' };
        };
        const files = await Promise.all([load(500), load(700)]);
        return files.filter((f): f is FontFile => f !== null);
      } catch {
        return [];
      }
    })();
  }
  return fontPromise;
}

/** Strip the "| Xperience Wave" suffix: the logo already says it. */
const stripBrand = (t: string) => t.replace(/\s*\|\s*Xperience Wave\s*$/, '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = searchParams.get('path') ?? '/';
  const entry = SEO[requested] ?? SEO['/'];
  // "About Xperience Wave | 1:1 UX Mentorship, Bangalore" -> title + eyebrow label
  const [title, eyebrow] = stripBrand(entry.title).split(' | ');
  const description = entry.description;

  const [logo, fonts] = await Promise.all([getLogo(), getFonts()]);
  const fontFamily = fonts.length ? 'Plus Jakarta Sans' : 'sans-serif';
  const titleSize = title.length > 48 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background:
            'radial-gradient(ellipse 60% 50% at 20% 15%, rgba(255,0,35,0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 85% 90%, rgba(220,238,255,0.10) 0%, transparent 60%), #0a0a0a',
          color: '#ffffff',
          fontFamily,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={242} height={60} style={{ objectFit: 'contain' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF0023',
                display: 'flex',
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#BFBFCC',
              display: 'flex',
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#8A8A96' }}>
          <div style={{ width: 48, height: 4, background: '#FF0023', display: 'flex' }} />
          <div style={{ display: 'flex' }}>xperiencewave.com</div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex',
      },
    },
  );
}
