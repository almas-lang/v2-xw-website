import type { Metadata } from 'next';
import Image from 'next/image';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandLinkedin,
  IconCheck,
  IconChevronDown,
  IconMap2,
  IconX,
} from '@tabler/icons-react';
import { HERO_VARIANT, WEBINAR } from './config';
import { HeroCentered, HeroEditorial, HeroSplitface } from './Heroes';
import CountdownBar from './CountdownBar';
import RegistrationForm from './RegistrationForm';
import ScrollTop from './ScrollTop';
import styles from './webinar.module.css';

/* ============================================================
   SEO - metadata (evergreen URL: keep /ai-design-webinar across
   cohorts; only config.ts changes per cohort)
   ============================================================ */

export const metadata: Metadata = {
  title: 'The Two Faces of AI in Design - Live Webinar | Xperience Wave',
  description:
    'A live webinar for UX, UI & product designers. Learn the AI shift that moves you from mid-level to senior - not just faster. Only 50 seats.',
  alternates: { canonical: WEBINAR.url },
  keywords: [
    'AI for UX designers',
    'AI in design webinar',
    'Product AI design',
    'become a senior UX designer',
    'AI design career',
    'UX design AI training India',
    'how AI is changing design',
    'will AI replace UX designers',
  ],
  openGraph: {
    title: 'The Two Faces of AI in Design - Live Webinar',
    description:
      'A live webinar for UX, UI & product designers. Learn the AI shift that moves you from mid-level to senior - not just faster. Only 50 seats.',
    url: WEBINAR.url,
    type: 'website',
    images: [{ url: WEBINAR.ogImage, width: 1200, height: 630, alt: 'The Two Faces of AI in Design - Live · 50 seats' }],
  },
  robots: { index: true, follow: true },
};

/* ============================================================
   Content data (v3 copy - Webinar-Landing-Page-Content (1).md)
   ============================================================ */

const PROMISES = [
  {
    num: '01',
    lead: 'Zero doubt about where you stand with AI.',
    rest: ' No more quiet panic. You’ll know what’s real and exactly what to do next.',
  },
  {
    num: '02',
    lead: 'A new way to see what you can design.',
    rest: ' AI as a design material, not a shortcut. Your work won’t look the same again.',
  },
  {
    num: '03',
    lead: 'Which side of AI gets paid more.',
    rest: ' And the precise shift that puts you on it before the field catches up.',
  },
];

const AGENDA = [
  ['The shift that separates faster designers from senior ones', ' - the one distinction that changes everything.'],
  ['AI as a design material', ' - real before/after examples of what’s now possible.'],
  ['Who AI pays more', ' - the designers rising in value, and how to position yourself there.'],
];

const FOR_YOU = [
  'You’re a UX, UI, product, visual or graphic designer with 2+ years.',
  'You’re anxious about AI and tired of not knowing where you stand.',
  'You want senior or lead - and the pay - soon, not “someday.”',
];

const NOT_FOR_YOU = [
  'You just want a list of AI tools for the weekend.',
  'You want a shortcut without doing the work.',
  'You’re not seriously growing your career this year.',
];

const HOST_POINTS = [
  "Heads product & design at India's only private design-education company.",
  'Recruited 1,000+ designers, mentored 10,000+ - he’s sat in the seat that decides who counts as “senior.”',
  'Managed 100+ direct reports across industrial automation, healthcare, fintech and edtech.',
  'Psychologist and technologist by training; author of the weighted design process; co-founder of two AI startups.',
];

/* Real mentees - same source data as the /freetraining success cards
   (src/lib/freetraining/content.ts). All six have photos + LinkedIn. */
const MENTEES = [
  { name: 'Sheetal P.', role: 'Design Lead @ CX100', when: 'in 2 months', image: '/images/sheetal.png', linkedin: 'https://www.linkedin.com/in/sheetalpimparwar/' },
  { name: 'Kritika S.', role: 'Lead UX @ Synduct, Germany', when: 'in 3 months', image: '/images/Kritika Singh.jpeg', linkedin: 'https://www.linkedin.com/in/kritikasinghchauhan/' },
  { name: 'Radhakrishna A.', role: 'Principal UX @ Informatica', when: 'in 3 months', image: '/images/Radhakrishna Aekbote.jpeg', linkedin: 'https://www.linkedin.com/in/radhakrishnaaekbote/' },
  { name: 'Shreekanth', role: 'Sr. UX Designer @ Wipro', when: 'in 5 weeks', image: '/images/Sreekanth VK.jpeg', linkedin: 'https://www.linkedin.com/in/shreekantvk/' },
  { name: 'Jonah I.', role: 'Sr. Lead Designer @ Infosys', when: 'in 2 months', image: '/images/Jonah_Immanuel.png', linkedin: 'https://www.linkedin.com/in/jonahimmanuel/' },
  { name: 'Maulin R.', role: 'Sr. UX @ Augmented.AI', when: 'in 90 days', image: '/images/Maulin Rajput.jpeg', linkedin: 'https://www.linkedin.com/in/maulin-rajput/' },
];

function menteeInitials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const FAQS = [
  {
    q: 'Is there a cost?',
    a: 'No - it’s a no-cost live session. There’s an optional next step we mention at the end; the 90 minutes stand on their own.',
  },
  {
    q: 'When and how long?',
    a: `${WEBINAR.dateLabel}, ${WEBINAR.timeLabel}, live online. ~90–120 minutes with Q&A.`,
  },
  {
    q: 'Will I get a recording?',
    a: 'No - it runs once, live, and isn’t shared. That’s also why seats are limited.',
  },
  {
    q: 'Do I need to know AI tools already?',
    a: 'No. This is about how to think about AI as a designer.',
  },
  {
    q: 'Is this for my level?',
    a: 'Built for designers with 2+ years aiming for senior or lead.',
  },
  {
    q: 'Is this just a sales pitch?',
    a: 'No - it’s a real session. We’ll point to a way to go deeper if you want it; the session stands alone.',
  },
  {
    q: 'What happens after I register?',
    a: 'Confirmation, a WhatsApp group invite, and reminders with your join link.',
  },
  {
    q: 'How many people are you taking?',
    a: 'Max 50, so the room stays useful and Q&A reaches you. Then it closes.',
  },
];

/* ============================================================
   JSON-LD - Event + FAQPage rich results
   ============================================================ */

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: WEBINAR.name,
  description:
    'A live webinar for UX, UI and product designers on the AI shift from mid-level to senior.',
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

      <ScrollTop />

      <CountdownBar />

      {/* Nav */}
      <header className={styles.nav}>
        <div className={`${styles.container} ${styles.navInner}`}>
          <a href="/" className={styles.logo} aria-label="Xperience Wave Home">
            <Image
              src="/images/logos/xw-logo-blue.svg"
              alt="Xperience Wave"
              width={130}
              height={36}
              className={styles.logoMark}
              priority
            />
          </a>
          <a href="#register" className={`${styles.btnPrimary} ${styles.navCta}`}>
            Enroll<span className={styles.navCtaRest}> in the webinar</span>{' '}
            <IconArrowRight size={16} stroke={2} aria-hidden />
          </a>
        </div>
      </header>

      <main>
        {HERO_VARIANT === 'centered' ? (
          <HeroCentered />
        ) : HERO_VARIANT === 'editorial' ? (
          <HeroEditorial />
        ) : (
          <HeroSplitface />
        )}

        {/* 2 · Same skill, two careers */}
        <section className={styles.sectionTint} aria-labelledby="h-gap">
          <div className={styles.container} style={{ maxWidth: 1000 }}>
            <div className={styles.gapHead}>
              <p className={styles.eyebrow}>The gap</p>
              <h2 id="h-gap" className={styles.h2}>
                Same skill. Two very different careers.
              </h2>
            </div>
            <div className={styles.gapGrid}>
              <div className={styles.gapFaster}>
                <span className={`${styles.gapLabel} ${styles.gapLabelMuted}`}>
                  <span className={styles.gapDot} aria-hidden /> The faster half
                </span>
                <p className={styles.gapBody}>
                  Most designers are getting faster at the same deliverables - and quietly turning themselves into the
                  most replaceable person on the team.
                </p>
              </div>
              <div className={styles.gapSenior}>
                <span className={`${styles.gapLabel} ${styles.gapLabelSenior}`}>
                  <IconArrowUpRight size={16} stroke={2.5} aria-hidden /> The senior half
                </span>
                <p className={`${styles.gapBody} ${styles.gapBodySenior}`}>
                  A smaller group uses AI to design what wasn&rsquo;t possible two years ago. They&rsquo;re the ones
                  pulled into strategy rooms, handed the senior title, and paid for it.
                </p>
              </div>
            </div>
            <div className={styles.gapClose}>
              <p className={styles.gapCloseBody}>
                The difference isn&rsquo;t talent. It&rsquo;s one shift - and it compounds every month you wait.
              </p>
              <p className={styles.gapKicker}>This is where you cross over. 90 minutes. Once.</p>
            </div>
          </div>
        </section>

        {/* 3 · Promises */}
        <section className={styles.section} aria-labelledby="h-promises">
          <div className={styles.container}>
            <div className={styles.promiseHead}>
              <p className={styles.eyebrow}>What you&rsquo;ll walk away with</p>
              <h2 id="h-promises" className={styles.h2}>
                Walk away with three things you don&rsquo;t have today
              </h2>
            </div>
            <div className={styles.promiseGrid}>
              {PROMISES.map((p) => (
                <div key={p.num} className={styles.promiseItem}>
                  <div className={styles.promiseNum}>{p.num}</div>
                  <p className={styles.promiseLead}>{p.lead}</p>
                  <p className={styles.promiseRest}>{p.rest.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Agenda */}
        <section className={styles.sectionTint} aria-labelledby="h-agenda">
          <div className={styles.container} style={{ maxWidth: 920 }}>
            <div className={styles.agendaHead}>
              <p className={styles.eyebrow}>The agenda</p>
              <h2 id="h-agenda" className={styles.h2}>
                Inside the 90 minutes
              </h2>
            </div>
            <div className={styles.agendaList}>
              {AGENDA.map(([lead, rest], i) => (
                <div key={lead} className={styles.agendaRow}>
                  <span className={styles.agendaNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={styles.agendaBody}>
                    <b>{lead}</b>
                    {rest}
                  </p>
                </div>
              ))}
              <div className={`${styles.agendaRow} ${styles.agendaRowLive}`}>
                <span className={styles.agendaNum}>Q&amp;A</span>
                <p className={styles.agendaBody}>
                  <b>Live Q&amp;A</b> - bring your situation; I&rsquo;ll answer as many as I can.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · Who this is for */}
        <section className={styles.section} aria-labelledby="h-who">
          <div className={styles.container} style={{ maxWidth: 1000 }}>
            <div className={styles.whoHead}>
              <p className={styles.eyebrow}>Who it&rsquo;s for</p>
              <h2 id="h-who" className={styles.h2}>
                This is for you if&hellip;
              </h2>
            </div>
            <div className={styles.whoGrid}>
              <div className={styles.whoCol}>
                <p className={`${styles.whoLabel} ${styles.whoLabelFor}`}>It&rsquo;s for you if</p>
                <ul className={styles.whoList}>
                  {FOR_YOU.map((item) => (
                    <li key={item} className={`${styles.whoItem} ${styles.whoItemFor}`}>
                      <IconCheck size={19} stroke={2.4} className={styles.whoIconFor} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.whoCol}>
                <p className={`${styles.whoLabel} ${styles.whoLabelNot}`}>It&rsquo;s not for you if</p>
                <ul className={styles.whoList}>
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className={`${styles.whoItem} ${styles.whoItemNot}`}>
                      <IconX size={19} stroke={2.4} className={styles.whoIconNot} aria-hidden />
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
              <div>
                <p className={styles.eyebrow}>Who&rsquo;s running this</p>
                <h2 id="h-host" className={styles.hostName}>
                  Shaik Murad
                </h2>
                <p className={styles.hostYears}>13 years in design</p>
                <ul className={styles.hostList}>
                  {HOST_POINTS.map((point) => (
                    <li key={point} className={styles.hostItem}>
                      {point}
                    </li>
                  ))}
                </ul>
                <blockquote className={styles.hostQuote}>
                  &ldquo;I&rsquo;ve watched, from both the recruiter&rsquo;s chair and the founder&rsquo;s chair,
                  exactly what moves designers up in the AI era. It&rsquo;s not what the internet is selling you.&rdquo;
                </blockquote>
              </div>
              <div className={styles.hostPhoto}>
                <Image
                  src="/images/Murad.png"
                  alt="Shaik Murad, webinar host"
                  fill
                  sizes="(max-width: 860px) 320px, 380px"
                  className={styles.hostImg}
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                <span className={styles.hostPhotoTag}>Host · Shaik Murad</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7 · Proof - real success stories */}
        <section className={styles.section} aria-labelledby="h-proof">
          <div className={styles.container}>
            <div className={styles.proofHead}>
              <div>
                <p className={styles.eyebrow}>Success stories</p>
                <h2 id="h-proof" className={styles.h2}>
                  Designers who took action - and moved up
                </h2>
              </div>
              <p className={styles.proofStat}>
                Average <b>38% salary increase</b> across <b>140+ mentees</b>.
              </p>
            </div>
            <div className={styles.menteeRail}>
              {MENTEES.map((m) => (
                <a
                  key={m.name}
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menteeCard}
                  aria-label={`${m.name}, ${m.role} - view on LinkedIn`}
                >
                  <div className={styles.menteePhoto}>
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={`${m.name}, ${m.role}`}
                        fill
                        sizes="(max-width: 520px) 100vw, (max-width: 860px) 45vw, 170px"
                        className={styles.menteeImg}
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <span className={styles.menteeInitials} aria-hidden>
                        {menteeInitials(m.name)}
                      </span>
                    )}
                    <span className={styles.menteePill}>{m.when}</span>
                  </div>
                  <div className={styles.menteeBody}>
                    <div>
                      <div className={styles.menteeName}>{m.name}</div>
                      <div className={styles.menteeRole}>{m.role}</div>
                    </div>
                    <span className={styles.menteeLink} aria-hidden>
                      <IconBrandLinkedin size={18} stroke={2} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className={styles.proofMore}>
              <a href="/success-stories">See more outcomes →</a>
            </p>
            <p className={styles.proofFootnote}>These are designers who completed our 1:1 mentorship program.</p>
          </div>
        </section>

        {/* 8 · What makes this different + live bonus (two-column) */}
        <section className={styles.sectionTint} aria-labelledby="h-diff">
          <div className={`${styles.container} ${styles.diffInner}`}>
            <div className={styles.diffText}>
              <p className={`${styles.eyebrow} ${styles.eyebrowOchre}`}>Why this is different</p>
              <h2 id="h-diff" className={styles.h2} style={{ marginBottom: 24 }}>
                Why this isn&rsquo;t another &ldquo;AI for designers&rdquo; webinar
              </h2>
              <p className={styles.diffBody}>
                Most AI webinars teach prompts and tools - the faster half. You leave with a list and the same career.
                This is about the half that changes your <b>position</b>: how AI reshapes what you design, and why
                that&rsquo;s what actually gets designers promoted.
              </p>
            </div>
            <div className={styles.bonusCard}>
              <span className={styles.bonusIcon}>
                <IconMap2 size={24} stroke={2} aria-hidden />
              </span>
              <div>
                <p className={styles.bonusEyebrow}>Show up live and you&rsquo;ll also get&hellip;</p>
                <h3 className={styles.bonusTitle}>The AI Design Capability Map + 60-tool scorecard</h3>
                <p className={styles.bonusBody}>
                  The reference our mentees use to decide where AI belongs in their workflow. Shared only with people in
                  the room, live. Not sent to no-shows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10 · FAQ */}
        <section className={styles.sectionTint} aria-labelledby="h-faq">
          <div className={`${styles.container} ${styles.faqInner}`}>
            <div className={styles.faqHead}>
              <p className={styles.eyebrow}>Questions</p>
              <h2 id="h-faq" className={styles.h2}>
                Frequently asked
              </h2>
              <p className={styles.faqHelp}>
                Everything people ask before they register. Still unsure? The session is no-cost and runs once.
              </p>
            </div>
            <div className={styles.faqList}>
              {FAQS.map(({ q, a }, i) => (
                <details key={q} className={styles.faqItem} name="faq" open={i === 0}>
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
        <section id="register" className={`${styles.section} ${styles.sectionRegister}`} aria-labelledby="h-register">
          <div className={styles.container}>
            <div className={styles.registerHead}>
              <h2 id="h-register" className={styles.registerH2}>
                50 seats. Once. Live. Save yours now.
              </h2>
              <p className={styles.registerSub}>
                Every webinar fills, and the next one is weeks away. If you&rsquo;ve read this far, you already know
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
