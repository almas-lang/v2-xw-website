import Image from 'next/image';
import { IconArrowRight, IconPlayerPlayFilled, IconPlus } from '@tabler/icons-react';
import { WEBINAR } from './config';
import PositionsTicker from './PositionsTicker';
import RotatingWord from './RotatingWord';
import styles from './webinar.module.css';

const TRUST_ITEMS = [
  '140+ mentees',
  'Avg 38% salary jump',
  '₹25 / 35 / 45 LPA outcomes',
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

/** The H1 carries the SEO keyword phrase as a visually-hidden prefix.
 *  "AI" is highlighted (solid blue) and the role word rotates in place inside a
 *  bracketed slot (senior → lead → manager → principal) without reflowing. */
function HeroHeading({ className }: { className: string }) {
  return (
    <h1 className={className}>
      <span className={styles.srOnly}>{WEBINAR.name}: </span>
      Every month you use <em>AI</em> the wrong way,{' '}
      <br className={styles.h1Break} />
      another designer takes the{' '}
      <span className={styles.rotGroup}>
        <span className={styles.rotBrk}>[&nbsp;</span>
        <RotatingWord words={['senior', 'lead', 'manager', 'principal']} />
        <span className={styles.rotBrk}>&nbsp;]</span>
      </span>{' '}
      role - and the pay - you wanted.
    </h1>
  );
}

/** Direction A - calm editorial split, video framed right. */
export function HeroEditorial() {
  return (
    <section className={styles.heroA} aria-label="Webinar introduction">
      <div className={`${styles.container} ${styles.heroAGrid}`}>
        <div>
          <p className={styles.heroEyebrow}>Live webinar · For UX, UI &amp; product designers</p>
          <HeroHeading className={styles.heroAH1} />
          <p className={styles.heroSub}>
            There are two faces of AI in design. One makes you faster - and easier to replace. The other makes you
            senior - and impossible to ignore. In this free live session, I&rsquo;ll show you the second face, and the
            exact shift from stuck-at-mid-level to in-the-room-where-decisions-get-made - before the rest of the field
            catches on.
          </p>
          <a href="#register" className={`${styles.btnPrimary} ${styles.btnHero}`}>
            Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
          </a>
          <p className={styles.microcopy}>No-cost · Live · {WEBINAR.seatsTotal} seats only · No recording shared</p>
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

/** Direction B - bold centered stage, wide video below with "+" corners. */
export function HeroCentered() {
  return (
    <section className={styles.heroB} aria-label="Webinar introduction">
      <div className={styles.heroBInner}>
        <p className={styles.heroEyebrow}>Live webinar · For UX, UI &amp; product designers</p>
        <HeroHeading className={styles.heroBH1} />
        <p className={styles.heroBSub}>
          There are two faces of AI in design. One makes you faster - and easier to replace. The other makes you senior
          - and impossible to ignore. In this free live session, I&rsquo;ll show you the second face - and the exact
          shift before the rest of the field catches on.
        </p>
        <a href="#register" className={`${styles.btnPrimary} ${styles.btnHero}`}>
          Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
        </a>
        <p className={styles.microcopy}>No-cost · Live · {WEBINAR.seatsTotal} seats only · No recording shared</p>

        <div className={styles.heroBStage}>
          {/* "+" registration corners - Konfom brand language, marketing surfaces only */}
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

/**
 * Direction C - split-face (DEFAULT, the client's chosen design).
 * Centered eyebrow + headline, then a bordered card where the torn
 * two-faces image is flanked by "Face one / Face two" copy; subhead +
 * CTA + trust strip below.
 */
export function HeroSplitface() {
  return (
    <section className={styles.heroSplit} aria-label="Webinar introduction">
      {/* Haikei-style mesh-gradient wash (brand blue) */}
      <div className={styles.heroBg} aria-hidden>
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="heroMeshA" cx="16%" cy="14%" r="55%">
              <stop offset="0%" stopColor="#1E47E6" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1E47E6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroMeshB" cx="90%" cy="8%" r="50%">
              <stop offset="0%" stopColor="#4F74FF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#4F74FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroMeshC" cx="70%" cy="95%" r="60%">
              <stop offset="0%" stopColor="#1B3FCC" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1B3FCC" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="700" fill="url(#heroMeshA)" />
          <rect width="1200" height="700" fill="url(#heroMeshB)" />
          <rect width="1200" height="700" fill="url(#heroMeshC)" />
        </svg>
      </div>
      <div className={styles.container}>
        <p className={styles.splitEyebrow}>
          <IconPlus size={12} stroke={2.5} className={`${styles.eyebrowPlus} ${styles.eyebrowPlusTL}`} aria-hidden />
          <IconPlus size={12} stroke={2.5} className={`${styles.eyebrowPlus} ${styles.eyebrowPlusTR}`} aria-hidden />
          <IconPlus size={12} stroke={2.5} className={`${styles.eyebrowPlus} ${styles.eyebrowPlusBL}`} aria-hidden />
          <IconPlus size={12} stroke={2.5} className={`${styles.eyebrowPlus} ${styles.eyebrowPlusBR}`} aria-hidden />
          Live webinar · For UX, UI &amp; product designers
        </p>
        <HeroHeading className={styles.splitH1} />

        <div className={styles.splitCard}>
          <div className={styles.splitGrid}>
            <div className={styles.splitColLeft}>
              <span className={`${styles.faceLabel} ${styles.faceLabelMuted}`}>
                <span className={styles.faceDotMuted} aria-hidden />
                Face one
              </span>
              <p className={styles.splitTextMuted}>One makes you faster, and easier to replace.</p>
            </div>
            <div className={styles.splitImage}>
              <Image
                src="/two-faces.png"
                alt="Two faces in profile - the two faces of AI in design"
                width={2000}
                height={1653}
                sizes="(max-width: 860px) 280px, 300px"
                priority
              />
            </div>
            <div className={styles.splitColRight}>
              <span className={`${styles.faceLabel} ${styles.faceLabelBlue}`}>
                <span className={styles.faceDotBlue} aria-hidden />
                Face two
              </span>
              <p className={styles.splitTextStrong}>
                The other moves you up: senior, lead, principal. And impossible to ignore.
              </p>
            </div>
          </div>
        </div>

        <PositionsTicker />

        <p className={styles.splitSub}>
          I&rsquo;ll show you the second face - and the exact shift from stuck-at-mid-level to
          in-the-room-where-decisions-get-made. Before the rest of the field catches on.
        </p>
        <a href="#register" className={`${styles.btnPrimary} ${styles.btnHero}`}>
          Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
        </a>
        <p className={styles.microcopy}>No-cost · Live · {WEBINAR.seatsTotal} seats only · No recording shared</p>
        <ul className={styles.splitTrust} style={{ listStyle: 'none', margin: '34px 0 0', padding: '28px 0 0' }}>
          {TRUST_ITEMS.map((item) => (
            <li key={item} className={styles.trustItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
