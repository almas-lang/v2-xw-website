'use client';

import { useState } from 'react';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
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
 * TODO: wire this to your backend / CRM / WhatsApp automation.
 * Suggested: POST to a route handler (app/api/register/route.ts) that
 * stores the lead and triggers the WhatsApp-group invite + confirmation.
 */
async function submitRegistration(fields: Fields): Promise<void> {
  console.log('register', fields);
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
