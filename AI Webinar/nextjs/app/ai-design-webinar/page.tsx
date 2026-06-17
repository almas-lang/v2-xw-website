import type { Metadata } from 'next';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBolt,
  IconChevronDown,
  IconCircleCheckFilled,
  IconCircleX,
  IconMap2,
  IconMessages,
  IconPencil,
  IconPointFilled,
  IconWaveSine,
} from '@tabler/icons-react';
import { HERO_VARIANT, WEBINAR } from './config';
import { HeroCentered, HeroEditorial } from './Heroes';
import CountdownBar from './CountdownBar';
import RegistrationForm from './RegistrationForm';
import styles from './webinar.module.css';

/* ============================================================
   SEO — metadata (evergreen URL: keep /ai-design-webinar across
   cohorts; only config.ts changes per cohort)
   ============================================================ */

export const metadata: Metadata = {
  title: 'The Two Faces of AI in Design - Free Live Webinar | Xperience Wave',
  description:
    'A free live webinar for UX, UI & product designers. Learn the AI shift that moves you from mid-level to senior - not just faster. Limited to 50 seats.',
  alternates: { canonical: WEBINAR.url },
  keywords: [
    'AI for UX designers',
    'AI in design webinar',
    'Product AI design',
    'become a senior UX designer',
    'AI design career',
    'UX design AI training India',
    'how AI is changing design',
    'AI design skills for designers',
  ],
  openGraph: {
    title: 'The Two Faces of AI in Design - Free Live Webinar',
    description:
      'A free live webinar for UX, UI & product designers. Learn the AI shift that moves you from mid-level to senior - not just faster. Limited to 50 seats.',
    url: WEBINAR.url,
    type: 'website',
    images: [{ url: WEBINAR.ogImage, width: 1200, height: 630, alt: 'The Two Faces of AI in Design — Free · Live · 50 seats' }],
  },
  robots: { index: true, follow: true },
};

/* ============================================================
   Content data
   ============================================================ */

const PROMISES = [
  {
    num: '01',
    lead: 'zero doubt about where you stand with AI.',
    pre: 'You will walk away with ',
    rest: " No more quiet panic, no more pretending it doesn't matter. You'll know exactly what's real, what's hype, and what your very next move is.",
  },
  {
    num: '02',
    lead: 'how AI changed what you can actually design.',
    pre: 'You will see ',
    rest: ' Not how fast you work — what you\u2019re able to create. Once you see AI as a design material instead of a shortcut, your own work never looks the same again.',
  },
  {
    num: '03',
    lead: 'which designers AI is about to pay more',
    pre: 'You will know ',
    rest: ' — and how to become one. There\u2019s a clear line between the designers AI makes more valuable and the ones it quietly retires. You\u2019ll know exactly which side you\u2019re on, and the shift that moves you up.',
  },
];

const AGENDA = [
  ['The two faces of AI in design', ' — the single distinction that decides whether AI makes you faster or makes you senior.'],
  ['AI as a design material', ' — how the best designers are creating experiences that were impossible two years ago (with real before/after examples).'],
  ['The honest map', ' — what AI can actually do for designers right now, so you stop guessing and start deciding.'],
  ['Who AI pays more', ' — the specialists rising in value, the ones falling, and how to position yourself on the right side.'],
  ['Your next 90 days', ' — the path from where you are now to senior/lead, and the first move you make on Monday.'],
];

const FOR_YOU = [
  "You're a UX, UI, product, visual, or graphic designer with 2+ years of experience.",
  "You're good at your craft but feel stuck at mid-level while less-skilled peers move up.",
  "You're anxious about AI and tired of not knowing where you really stand.",
  'You want to reach senior or lead — and be paid like it — in the near future, not \u201csomeday.\u201d',
];

const NOT_FOR_YOU = [
  "You're looking for a list of AI tools to try this weekend.",
  'You want a magic shortcut without doing the work.',
  "You're not seriously planning to grow your career this year.",
];

const HOST_POINTS = [
  "Heads product & design at India's only private design-education company.",
  'Has recruited 1,000+ designers and mentored 10,000+ more — so he\u2019s sat in the exact seat that decides who counts as \u201csenior.\u201d',
  'Managed 100+ direct reports across industrial automation, healthcare, fintech and edtech.',
  'Psychologist and technologist by training; author of the weighted design process; co-founder of two AI startups (Skaeyl, Konfom).',
];

/* Sample testimonials — labeled as examples on the page. Replace with real VSL stories. */
const TESTIMONIALS = [
  {
    quote:
      'Six weeks after the workshop I stopped redoing the same screens faster and started bringing AI-built prototypes into roadmap reviews. I got the senior title I\u2019d been circling for two years.',
    initials: 'AR',
    name: 'Aishwarya R.',
    role: 'Senior Product Designer, fintech',
  },
  {
    quote:
      'I went in AI-anxious and came out with a plan. My next offer nearly doubled my pay — same craft, completely different positioning.',
    initials: 'RM',
    name: 'Rohit M.',
    role: 'Lead UX Designer, healthtech',
  },
  {
    quote:
      'I\u2019d been quietly panicking about being replaced. Now I\u2019m the person my team asks how AI fits the work — and I\u2019m leading a squad.',
    initials: 'NS',
    name: 'Neha S.',
    role: 'Design Lead, SaaS',
  },
];

const FAQS = [
  {
    q: 'Is it really free?',
    a: "Yes — the session is completely free. There's an optional next step we'll mention at the end, but you'll walk away with real value whether or not you take it.",
  },
  {
    q: 'When is it and how long?',
    a: `${WEBINAR.dateLabel} at ${WEBINAR.timeLabel}, live online. Plan for 90–120 minutes including Q&A.`,
  },
  {
    q: 'Will I get a recording?',
    a: "No. This runs once, live, and the recording isn't shared. What you get, you get by being in the room — which is also why seats are limited.",
  },
  {
    q: 'Do I need to already know AI tools?',
    a: "No. Come as you are. This is about how to think about AI as a designer — the part tools can't teach you.",
  },
  {
    q: 'Is this for my experience level?',
    a: "It's built for designers with 2+ years who want to reach senior or lead. If that's you, you're in the right place.",
  },
  {
    q: 'Is this just a sales pitch?',
    a: "No. It's a real working session. We'll point to a way to go deeper if you want it, but the 90 minutes stand on their own.",
  },
  {
    q: 'What happens after I register?',
    a: "You'll get a confirmation, an invite to our WhatsApp group, and reminders with your join link as the date gets closer.",
  },
  {
    q: 'How many people are you taking?',
    a: 'A maximum of 50 designers, so the room stays useful and the Q&A actually reaches you. Once it\u2019s full, registration closes.',
  },
];

/* ============================================================
   JSON-LD — Event + FAQPage rich results
   ============================================================ */

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: WEBINAR.name,
  description:
    'A free live webinar for UX, UI and product designers on the AI shift from mid-level to senior.',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  startDate: WEBINAR.startIso,
  endDate: WEBINAR.endIso,
  location: { '@type': 'VirtualLocation', url: WEBINAR.url },
  organizer: { '@type': 'Organization', name: 'Xperience Wave', url: 'https://xperiencewave.com' },
  performer: { '@type': 'Person', name: 'Shaik Murad' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/LimitedAvailability',
    url: WEBINAR.url,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* ============================================================
   Page
   ============================================================ */

export default function AiDesignWebinarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CountdownBar />

      {/* Nav */}
      <header className={styles.nav}>
        <div className={`${styles.container} ${styles.navInner}`}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoChip}>
              <IconWaveSine size={16} stroke={2} aria-hidden />
            </span>
            <span className={styles.logoText}>Xperience Wave</span>
          </a>
          <a href="#register" className={styles.btnPrimary}>
            Enroll in the webinar <IconArrowRight size={16} stroke={2} aria-hidden />
          </a>
        </div>
      </header>

      <main>
        {HERO_VARIANT === 'centered' ? <HeroCentered /> : <HeroEditorial />}

        {/* 2 · The gap */}
        <section className={styles.sectionTint} aria-labelledby="h-gap">
          <div className={styles.container} style={{ maxWidth: 1000 }}>
            <div className={styles.sectionHead}>
              <p className={`${styles.eyebrow} ${styles.eyebrowOchre}`}>The widening gap</p>
              <h2 id="h-gap" className={styles.h2}>
                The AI gap is widening every week. Which side are you on?
              </h2>
            </div>
            <div className={styles.gapGrid}>
              <div className={`${styles.card} ${styles.gapCard}`}>
                <div className={styles.gapCardHead}>
                  <span className={styles.gapIconChip}>
                    <IconBolt size={20} stroke={2} aria-hidden />
                  </span>
                  The faster half
                </div>
                <p className={styles.gapBody}>
                  Most designers are pouring their energy into the wrong half of AI. They&rsquo;re getting faster at
                  making the same deliverables — and quietly turning themselves into the most replaceable person on the
                  team.
                </p>
              </div>
              <div className={styles.gapCardHot}>
                <div className={`${styles.gapCardHead} ${styles.gapCardHotHead}`}>
                  <span className={`${styles.gapIconChip} ${styles.gapIconChipHot}`}>
                    <IconArrowUpRight size={20} stroke={2} aria-hidden />
                  </span>
                  The senior half
                </div>
                <p className={`${styles.gapBody} ${styles.gapBodyHot}`}>
                  Meanwhile, a smaller group of designers figured out the other half. They&rsquo;re using AI to design
                  experiences that weren&rsquo;t even possible two years ago. They&rsquo;re the ones getting pulled into
                  strategy rooms, handed the senior title, and paid like it.
                </p>
              </div>
            </div>
            <div className={styles.gapClose}>
              <p className={styles.gapCloseBody}>
                The gap between these two groups isn&rsquo;t talent. It isn&rsquo;t years of experience. It&rsquo;s one
                shift in how you see AI — and it compounds. Every month you wait, the designers who made the shift pull
                further ahead, and the climb back gets steeper.
              </p>
              <p className={styles.gapKicker}>
                This session is where you cross to the right side of that gap. In 90 minutes. For free. Once.
              </p>
            </div>
          </div>
        </section>

        {/* 3 · Promises */}
        <section className={styles.section} aria-labelledby="h-promises">
          <div className={styles.container}>
            <div className={styles.sectionHead} style={{ marginBottom: 52 }}>
              <p className={styles.eyebrow}>What you&rsquo;ll walk away with</p>
              <h2 id="h-promises" className={styles.h2}>
                Leave this session with three things you don&rsquo;t have right now
              </h2>
            </div>
            <div className={styles.promiseGrid}>
              {PROMISES.map((p) => (
                <div key={p.num} className={`${styles.card} ${styles.promiseCard}`}>
                  <div className={styles.promiseNum}>{p.num}</div>
                  <p className={styles.promiseBody}>
                    {p.pre}
                    <b>{p.lead}</b>
                    {p.rest}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Agenda */}
        <section className={styles.sectionTint} aria-labelledby="h-agenda">
          <div className={styles.container} style={{ maxWidth: 860 }}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>The agenda</p>
              <h2 id="h-agenda" className={styles.h2}>
                Inside the 90 minutes
              </h2>
            </div>
            <div className={`${styles.card} ${styles.agendaCard}`}>
              {AGENDA.map(([lead, rest], i) => (
                <div key={lead} className={styles.agendaRow}>
                  <span className={styles.agendaNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={styles.agendaBody}>
                    <b>{lead}</b>
                    {rest}
                  </p>
                </div>
              ))}
              <div className={styles.agendaRow}>
                <span className={styles.agendaIcon}>
                  <IconMessages size={18} stroke={2} aria-hidden />
                </span>
                <p className={styles.agendaBody}>
                  <b>Live Q&amp;A</b> — bring your situation; I&rsquo;ll answer as many as I can.
                </p>
              </div>
            </div>
            <div className={styles.agendaNotice}>
              <IconPencil size={20} stroke={2} aria-hidden />
              <p className={styles.agendaNoticeText}>
                This is a working session, not a lecture. Cameras on. Pen and paper ready.
              </p>
            </div>
          </div>
        </section>

        {/* 5 · Who this is for */}
        <section className={styles.section} aria-labelledby="h-who">
          <div className={styles.container} style={{ maxWidth: 1000 }}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Who it&rsquo;s for</p>
              <h2 id="h-who" className={styles.h2}>
                This session is built for you if&hellip;
              </h2>
            </div>
            <div className={styles.whoGrid}>
              <div className={styles.whoCardFor}>
                <div className={`${styles.whoLabel} ${styles.whoLabelFor}`}>It&rsquo;s for you if</div>
                <ul className={styles.whoList}>
                  {FOR_YOU.map((item) => (
                    <li key={item} className={`${styles.whoItem} ${styles.whoItemFor}`}>
                      <IconCircleCheckFilled size={20} className={styles.whoIconFor} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.card} ${styles.whoCardNot}`}>
                <div className={`${styles.whoLabel} ${styles.whoLabelNot}`}>It&rsquo;s not for you if</div>
                <ul className={styles.whoList}>
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className={`${styles.whoItem} ${styles.whoItemNot}`}>
                      <IconCircleX size={20} stroke={2} className={styles.whoIconNot} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · Host */}
        <section className={styles.sectionTint} aria-labelledby="h-host">
          <div className={styles.container} style={{ maxWidth: 1000 }}>
            <div className={styles.hostGrid}>
              <div className={styles.hostPhoto}>
                {/* TODO: replace with real host photo (4:5), alt "Shaik Murad, webinar host" */}
                <span className={styles.hostInitials} aria-hidden>
                  SM
                </span>
                <span className={styles.hostPhotoTag}>Host · Shaik Murad</span>
              </div>
              <div>
                <p className={styles.eyebrow} style={{ marginBottom: 14 }}>
                  Who&rsquo;s running this
                </p>
                <h2 id="h-host" className={styles.hostName}>
                  Shaik Murad
                </h2>
                <p className={styles.hostYears}>13 years in design</p>
                <ul className={styles.hostList}>
                  {HOST_POINTS.map((point) => (
                    <li key={point} className={styles.hostItem}>
                      <IconPointFilled size={16} className={styles.hostBullet} aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
                <blockquote className={styles.hostQuote}>
                  &ldquo;I&rsquo;ve watched, from both the recruiter&rsquo;s chair and the founder&rsquo;s chair,
                  exactly what moves designers up in the AI era. It&rsquo;s not what the internet is selling you.
                  That&rsquo;s what I&rsquo;m going to show you.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* 7 · Proof */}
        <section className={styles.section} aria-labelledby="h-proof">
          <div className={styles.container}>
            <div className={styles.sectionHead} style={{ marginBottom: 44 }}>
              <p className={styles.eyebrow}>Proof</p>
              <h2 id="h-proof" className={styles.h2}>
                830+ designers have already made this shift
              </h2>
            </div>
            <div className={styles.statBand} role="img" aria-label="830+ designers promoted to senior and leadership roles with AI">
              <div className={styles.stat}>
                <div className={styles.statNum}>830+</div>
                <div className={styles.statLabel}>designers moved into senior &amp; leadership roles</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>
                  ₹18–28<span className={styles.statUnit}> LPA</span>
                </div>
                <div className={styles.statLabel}>typical outcome range</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>
                  &lt;90<span className={styles.statUnit}> days</span>
                </div>
                <div className={styles.statLabel}>many made the move in under</div>
              </div>
            </div>
            <div className={styles.quoteGrid}>
              {TESTIMONIALS.map((t) => (
                <figure key={t.initials} className={`${styles.card} ${styles.quoteCard}`} style={{ margin: 0 }}>
                  <span className={styles.examplePill}>Example</span>
                  <blockquote className={styles.quoteBody} style={{ margin: '0 0 22px' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className={styles.quoteWho}>
                    <span className={styles.quoteAvatar} aria-hidden>
                      {t.initials}
                    </span>
                    <div>
                      <div className={styles.quoteName}>{t.name}</div>
                      <div className={styles.quoteRole}>{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.proofFootnote}>
              Sample stories shown as examples — replace with real testimonials (photos + LinkedIn links lift trust
              most).
            </p>
          </div>
        </section>

        {/* 8 · What makes this different */}
        <section className={styles.sectionTint} aria-labelledby="h-diff">
          <div className={`${styles.container} ${styles.diffInner}`}>
            <p className={`${styles.eyebrow} ${styles.eyebrowOchre}`}>Why this is different</p>
            <h2 id="h-diff" className={styles.h2} style={{ marginBottom: 28 }}>
              Why this isn&rsquo;t another &ldquo;AI for designers&rdquo; webinar
            </h2>
            <p className={styles.diffBody}>
              Most AI webinars teach you prompts and tools — the faster half. You leave with a list and the same
              career. This session is about the half that changes your <b>position</b>, not just your speed: how AI
              reshapes what you design, and how that single shift is what actually gets designers promoted. You
              won&rsquo;t find this framing in the usual courses — because almost no one is teaching it yet.
            </p>
          </div>
        </section>

        {/* 9 · Live bonus */}
        <section className={styles.section} aria-labelledby="h-bonus">
          <div className={styles.container}>
            <div className={styles.bonusCard}>
              <span className={styles.bonusIcon}>
                <IconMap2 size={30} stroke={2} aria-hidden />
              </span>
              <div>
                <p className={styles.bonusEyebrow}>Show up live and you&rsquo;ll also get&hellip;</p>
                <h2 id="h-bonus" className={styles.bonusTitle}>
                  The AI Design Capability Map + 60-tool scorecard
                </h2>
                <p className={styles.bonusBody}>
                  The same reference our mentees use to decide where AI belongs in their workflow. Shared only with
                  people in the room, live. Not sent to no-shows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10 · FAQ */}
        <section className={styles.sectionTint} aria-labelledby="h-faq">
          <div className={styles.container}>
            <div className={styles.sectionHead} style={{ marginBottom: 44 }}>
              <p className={styles.eyebrow}>Questions</p>
              <h2 id="h-faq" className={styles.h2}>
                Frequently asked
              </h2>
            </div>
            <div className={styles.faqList}>
              {FAQS.map(({ q, a }, i) => (
                <details key={q} className={styles.faqItem} open={i === 0}>
                  <summary>
                    {q}
                    <IconChevronDown size={18} stroke={2} className={styles.faqChev} aria-hidden />
                  </summary>
                  <p className={styles.faqAnswer}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 11 · Final CTA + form */}
        <section id="register" className={styles.section} aria-labelledby="h-register" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <div className={styles.container}>
            <div className={styles.registerHead}>
              <h2 id="h-register" className={styles.registerH2}>
                50 seats. Once. Live. Save yours now.
              </h2>
              <p className={styles.registerSub}>
                Every cohort fills, and the next one is weeks away. If you&rsquo;ve read this far, you already know
                which side of the AI gap you want to be on. The only thing between you and the room is this form.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>

      {/* 12 · Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span className={styles.footerBrand}>Xperience Wave</span>
          <div className={styles.footerLinks}>
            <span>Expwave Pvt. Ltd.</span>
            <span className={styles.footerSep}>·</span>
            <a href={`https://wa.me/${WEBINAR.whatsapp.replace(/\D/g, '')}`}>WhatsApp: {WEBINAR.whatsapp}</a>
            <span className={styles.footerSep}>·</span>
            <a href="/privacy">Privacy</a>
            <span className={styles.footerSep}>·</span>
            <a href="/terms">Terms</a>
          </div>
          <p className={styles.footerDisclaimer}>
            This is an independent design-career workshop. Results vary by individual effort.
          </p>
        </div>
      </footer>
    </>
  );
}
