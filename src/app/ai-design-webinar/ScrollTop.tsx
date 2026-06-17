'use client';

import { useEffect } from 'react';

/**
 * Force the landing page to open at the top on every load/refresh.
 * Browsers default to restoring the previous scroll position on reload;
 * for a marketing page we want a clean top-of-page start instead.
 * Setting scrollRestoration to "manual" suppresses the restore (and the
 * flash it would cause) before we explicitly scroll to the top.
 */
export default function ScrollTop() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
