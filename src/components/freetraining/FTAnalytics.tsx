'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageViewDedup } from '@/lib/freetraining/track';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_FT_META_PIXEL_ID || '1406183214178910';

// Pixel loader — initializes fbq but does NOT fire PageView.
// PageView is fired with a dedup event_id by <FTPageViewTracker />.
export function FTMetaPixel() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script id="ft-meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Fires deduped PageView (pixel + CAPI with shared event_id) on initial
// mount and every Next.js client-side route change under /freetraining/*.
export function FTPageViewTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    let cancelled = false;
    let tries = 0;
    const fire = () => {
      if (cancelled) return;
      if (typeof window !== 'undefined' && window.fbq) {
        trackPageViewDedup();
        return;
      }
      if (tries++ < 40) setTimeout(fire, 100);
    };
    fire();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
