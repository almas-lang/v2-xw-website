'use client';

import { useState } from 'react';
import { IconArrowRight, IconCircleCheck, IconBrandWhatsapp } from '@tabler/icons-react';
import { WEBINAR } from './config';
import styles from './webinar.module.css';

type Fields = {
  firstName: string;
  email: string;
  whatsapp: string;
  role: string;
};

const ROLES = ['UX designer', 'UI designer', 'Product designer', 'Visual designer', 'Graphic designer', 'Other'];

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.firstName.trim()) errors.firstName = 'Please enter your first name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = 'Please enter a valid email.';
  if (f.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Please enter a valid WhatsApp number.';
  return errors;
}

/**
 * Forwards the registration to SalesHub via the server route
 * (src/app/ai-design-webinar/api/register/route.ts), which keeps the
 * webhook secret server-side and tags the lead with source "ai-webinar".
 */
async function submitRegistration(fields: Fields): Promise<void> {
  // UTMs from the ad URL (?utm_source=…&utm_campaign=… etc.)
  const q = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const raw = fields.whatsapp.trim();
  const phone = raw.startsWith('+') ? raw : '+91' + raw.replace(/\D/g, '');

  const res = await fetch('/ai-design-webinar/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: fields.firstName,
      email: fields.email,
      phone,
      current_role: fields.role || '',
      utm_source: q.get('utm_source') || '',
      utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || q.get('hsa_cam') || '',
      utm_content: q.get('utm_content') || q.get('hsa_ad') || '',
      utm_term: q.get('utm_term') || q.get('hsa_grp') || '',
    }),
  });
  if (!res.ok) throw new Error('Registration failed');
}

export default function RegistrationForm() {
  const [fields, setFields] = useState<Fields>({ firstName: '', email: '', whatsapp: '', role: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await submitRegistration(fields);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.formCard}>
        <div className={styles.formSuccess}>
          <IconCircleCheck size={44} stroke={2} className={styles.formSuccessIcon} aria-hidden />
          <h3 className={styles.formSuccessTitle}>Your seat is saved</h3>
          <p className={styles.formSuccessBody}>
            Check your email for confirmation. We&rsquo;ll send your join link and reminders on WhatsApp as{' '}
            {WEBINAR.dateLabel} gets closer.
          </p>
          <a
            className={styles.formWhatsapp}
            href={WEBINAR.whatsappGroupUrl || `https://wa.me/${WEBINAR.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp size={20} stroke={2} aria-hidden />
            Join the WhatsApp group for webinar updates
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={onSubmit} noValidate>
      <div className={styles.formRow}>
        <div>
          <label className={styles.formLabel} htmlFor="reg-first-name">
            First name
          </label>
          <input
            id="reg-first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            value={fields.firstName}
            onChange={set('firstName')}
          />
          {errors.firstName && <p className={styles.fieldError}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={styles.formLabel} htmlFor="reg-email">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            value={fields.email}
            onChange={set('email')}
          />
          {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="reg-whatsapp">
          WhatsApp number <span className={styles.formLabelHint}>- so we can send your join link + reminders</span>
        </label>
        <input
          id="reg-whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="+91 00000 00000"
          className={`${styles.input} ${errors.whatsapp ? styles.inputError : ''}`}
          value={fields.whatsapp}
          onChange={set('whatsapp')}
        />
        {errors.whatsapp && <p className={styles.fieldError}>{errors.whatsapp}</p>}
      </div>

      <div className={styles.formFieldLast}>
        <label className={styles.formLabel} htmlFor="reg-role">
          Current role <span className={styles.formLabelHint}>- optional</span>
        </label>
        <select id="reg-role" className={styles.input} value={fields.role} onChange={set('role')}>
          <option value="">Select your role</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={`${styles.btnPrimary} ${styles.btnForm}`}>
        Enroll in the webinar <IconArrowRight size={18} stroke={2} aria-hidden />
      </button>
      <p className={styles.formMicrocopy}>
        Live · {WEBINAR.dateLabel} · 11 AM IST · {WEBINAR.seatsTotal} seats only
      </p>
    </form>
  );
}
