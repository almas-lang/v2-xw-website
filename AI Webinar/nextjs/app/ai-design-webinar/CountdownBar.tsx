'use client';

import { useEffect, useState } from 'react';
import { WEBINAR } from './config';
import styles from './webinar.module.css';

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0');
}

function diffParts(target: Date, now: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

/**
 * Sticky announcement bar with live countdown + seat counter.
 * Client component so the rest of the page stays fully server-rendered.
 * Renders `--:--` placeholders until mounted to avoid hydration mismatch.
 */
export default function CountdownBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = new Date(WEBINAR.startIso);
  const parts = now ? diffParts(target, now) : null;
  const lowSeats = WEBINAR.seatsLeft < 15;

  const cells: Array<[string, string]> = [
    [parts ? pad(parts.days) : '--', 'days'],
    [parts ? pad(parts.hours) : '--', 'hrs'],
    [parts ? pad(parts.mins) : '--', 'min'],
    [parts ? pad(parts.secs) : '--', 'sec'],
  ];

  return (
    <div className={styles.bar}>
      <div className={`${styles.container} ${styles.barInner}`}>
        <p className={styles.barMsg} style={{ margin: 0 }}>
          <span className={styles.livePill}>Live &amp; free</span>
          <span className={styles.barDim}>
            {WEBINAR.dateLabel} · {WEBINAR.timeLabel}
          </span>
          <span className={styles.barDot}>·</span>
          <span className={styles.barDim}>
            Only {WEBINAR.seatsTotal} seats —{' '}
            <span className={lowSeats ? styles.seatsLow : styles.seatsOk}>
              {WEBINAR.seatsLeft} left
            </span>
            . Register today.
          </span>
        </p>
        <div className={styles.countdown} aria-label="Time left until the webinar">
          {cells.map(([value, label]) => (
            <span key={label} className={styles.countCell}>
              <b className={styles.countNum}>{value}</b>
              <i className={styles.countLabel}>{label}</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
