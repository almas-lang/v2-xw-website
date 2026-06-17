'use client';

import { useEffect, useState } from 'react';
import styles from './webinar.module.css';

/*
 * Auto-shifting positions+pay line (v3). The role and pay rotate as ONE synced
 * unit inside a fixed-width slot so the line never reflows. Only this sub-line
 * animates - never the H1. The first pair is rendered statically in the DOM so
 * it's present for SEO and with JS disabled.
 */
const POSITIONS = [
  { role: 'Senior', pay: '₹25 LPA' },
  { role: 'Lead', pay: '₹35 LPA' },
  { role: 'Manager', pay: '₹40 LPA' },
  { role: 'Principal', pay: '₹45 LPA' },
];

export default function PositionsTicker() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion - hold the static base value, no cycling.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const t = setInterval(() => {
      setShown(false);
      setTimeout(() => {
        setI((p) => (p + 1) % POSITIONS.length);
        setShown(true);
      }, 220);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const p = POSITIONS[i];

  return (
    <p className={styles.shiftLine}>
      AI is how designers are becoming{' '}
      <span className={styles.shiftSlot}>
        <span className={`${styles.shiftChip} ${shown ? styles.shiftIn : styles.shiftOut}`}>
          {p.role} · {p.pay}
        </span>
      </span>{' '}
      in months, not years.
    </p>
  );
}
