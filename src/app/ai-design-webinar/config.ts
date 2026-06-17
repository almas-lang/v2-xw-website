/**
 * Per-cohort configuration - the ONLY file you need to touch between cohorts.
 * The evergreen URL (/ai-design-webinar) never changes; swap the date here
 * so SEO compounds instead of resetting.
 */

export const HERO_VARIANT: 'splitface' | 'editorial' | 'centered' = 'splitface';

export const WEBINAR = {
  name: 'The Two Faces of AI in Design',
  /** Human-readable date shown in the bar / microcopy / FAQ */
  dateLabel: 'Saturday, 20 Jun',
  /** Drives the live countdown AND the Event JSON-LD schema (IST) */
  startIso: '2026-06-20T11:00:00+05:30',
  endIso: '2026-06-20T13:00:00+05:30',
  timeLabel: '11:00 AM IST',
  seatsTotal: 50,
  /** Update as registrations come in; renders red below 15 */
  seatsLeft: 9,
  url: 'https://xperiencewave.com/ai-design-webinar',
  ogImage: '/og/ai-design-webinar.png', // TODO: supply branded 1200×630 card
  whatsapp: '+91 93805 06841',
  /** WhatsApp group invite link (chat.whatsapp.com/…) for webinar updates.
   *  Leave empty to fall back to a 1:1 wa.me chat with the number above. */
  whatsappGroupUrl: 'https://chat.whatsapp.com/FA3CiGTDiFB7togfQNEm9z',
} as const;
