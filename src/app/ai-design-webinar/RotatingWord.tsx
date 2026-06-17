'use client';

import { useEffect, useState } from 'react';
import styles from './webinar.module.css';

/*
 * Rotating headline word — cycles senior → lead → manager → principal in place.
 * All words are stacked in a single CSS-grid cell, so the slot's width is locked
 * to the WIDEST word: the headline never reflows or shifts as the word changes.
 * The current word is centered and crossfades; a subtle underline gives the
 * reserved space a deliberate "fill-in-the-blank" identity instead of dead gap.
 * The first word ships in the SSR markup (SEO / no-JS); rotation pauses under
 * prefers-reduced-motion.
 */
export default function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setShown(false);
      setTimeout(() => {
        setI((p) => (p + 1) % words.length);
        setShown(true);
      }, 240);
    }, 2000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className={styles.rotSlot}>
      {/* hidden copies of every word — the grid cell sizes to the widest one */}
      {words.map((w) => (
        <span key={w} className={styles.rotGhost} aria-hidden>
          {w}
        </span>
      ))}
      <span className={`${styles.rotWord} ${shown ? styles.rotWordIn : styles.rotWordOut}`}>
        {words[i]}
      </span>
    </span>
  );
}
