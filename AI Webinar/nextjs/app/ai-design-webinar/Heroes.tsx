import { IconArrowRight, IconPlayerPlayFilled, IconPlus } from '@tabler/icons-react';
import { WEBINAR } from './config';
import styles from './webinar.module.css';

const TRUST_ITEMS = [
  '830+ designers moved into senior & leadership roles',
  '₹18–28 LPA outcomes',
  'Many in under 90 days',
  'Hosted by Shaik Murad',
];

/*
 * The host video is a styled placeholder for now.
 * When the real 45–60s video lands, lazy-load it (facade pattern:
 * keep this thumbnail, swap in the player on click) and give the
 * poster the alt text: "Shaik Murad explaining the two faces of AI in design".
 */
function VideoOverlay() {
  return (
    <div className={styles.videoScrim}>
      <span className={styles.videoBadge} aria-hidden>
        SM
      </span>
      <div style={{ lineHeight: 1.3 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Shaik Murad · 52 sec</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.78)' }}>
          &ldquo;The one thing I&rsquo;ll show you on Saturday.&rdquo;
        </div>
      </div>
    </div>
  );
}

function PlayButton() {
  return (
    <div className={styles.heroAVideoCenter}>
      <span className={styles.playBtn}>
        <IconPlayerPlayFilled size={30} style={{ marginLeft: 3 }} aria-hidden />
      </span>
    </div>
  );
}

/** The H1 carries the SEO keyword phrase as a visually-hidden prefix. */
function HeroHeading({ className, accent }: { className: string; accent?: boolean }) {
  return (
    <h1 className={className}>
      <span className={styles.srOnly}>{WEBINAR.name}: </span>
      Every month you use AI the wrong way,{' '}
      {accent ? <em>another designer gets the promotion you wanted.</em> : 'another designer gets the promotion you wanted.'}
    </h1>
  );
}

/** Direction A — calm editorial split, video framed right. */
export function HeroEditorial() {
  return (
    <section className={styles.heroA} aria-label="Webinar introduction">
      <div className={`${styles.container} ${styles.heroAGrid}`}>
        <div>
          <p className={styles.heroEyebrow}>Free live workshop for UX, UI &amp; product designers</p>
          <HeroHeading className={styles.heroAH1} accent />
          <p className={styles.heroSub}>
            There are two faces of AI in design. One makes you faster — and easier to replace. The other makes you
            senior — and impossible to ignore. In this free live session, I&rsquo;ll show you the second face, and the
            exact shift from stuck-at-mid-level to in-the-room-where-decisions-get-made — before the rest of the field
            catches on.
          </p>
          <a href="#register" className={`${styles.btnPrimary} ${styles.btnHero}`}>
            Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
          </a>
          <p className={styles.microcopy}>Free · Live · No recording shared · {WEBINAR.seatsTotal} seats only</p>
          <ul className={styles.heroATrust} style={{ listStyle: 'none', margin: 0 }}>
            {TRUST_ITEMS.map((item) => (
              <li key={item} className={styles.trustItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.heroAMedia}>
          <div
            className={styles.heroAVideo}
            role="img"
            aria-label="Shaik Murad explaining the two faces of AI in design"
          >
            <PlayButton />
            <VideoOverlay />
            <span className={styles.heroAVideoTag}>Host video</span>
          </div>
          <p className={styles.heroAVideoNote}>45–60 sec · framed half-body talking head</p>
        </div>
      </div>
    </section>
  );
}

/** Direction B — bold centered stage, wide video below with "+" corners. */
export function HeroCentered() {
  return (
    <section className={styles.heroB} aria-label="Webinar introduction">
      <div className={styles.heroBInner}>
        <p className={styles.heroEyebrow}>Free live workshop for UX, UI &amp; product designers</p>
        <HeroHeading className={styles.heroBH1} />
        <p className={styles.heroBSub}>
          There are two faces of AI in design. One makes you faster — and easier to replace. The other makes you senior
          — and impossible to ignore. In this free live session, I&rsquo;ll show you the second face — and the exact
          shift before the rest of the field catches on.
        </p>
        <a href="#register" className={`${styles.btnPrimary} ${styles.btnHero}`}>
          Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
        </a>
        <p className={styles.microcopy}>Free · Live · No recording shared · {WEBINAR.seatsTotal} seats only</p>

        <div className={styles.heroBStage}>
          {/* "+" registration corners — Konfom brand language, marketing surfaces only */}
          <IconPlus size={14} className={styles.crosshair} aria-hidden />
          <IconPlus size={14} className={styles.crosshair} aria-hidden />
          <IconPlus size={14} className={styles.crosshair} aria-hidden />
          <IconPlus size={14} className={styles.crosshair} aria-hidden />
          <div
            className={styles.heroBVideo}
            role="img"
            aria-label="Shaik Murad explaining the two faces of AI in design"
          >
            <PlayButton />
            <VideoOverlay />
          </div>
        </div>

        <ul className={styles.heroBTrust} style={{ listStyle: 'none', margin: '28px 0 0', padding: 0 }}>
          {['830+ into senior & leadership roles', '₹18–28 LPA outcomes', 'Many in under 90 days', 'Hosted by Shaik Murad'].map(
            (item) => (
              <li key={item} className={styles.trustChip}>
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
