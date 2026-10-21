'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FormField, Job } from '@/data/jobs';
import VoiceNoteRecorder from './VoiceNoteRecorder';

const inputClass =
  'w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20 transition-all';

function OtherInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      id={`${id}Other`}
      name={`${id}Other`}
      type="text"
      required
      maxLength={120}
      placeholder="Tell us what kind"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} mt-3`}
      aria-label="Please specify"
    />
  );
}

function Label({ field }: { field: FormField }) {
  return (
    <label htmlFor={field.id} className="block text-sm font-medium text-white/80 mb-2">
      {field.label} {field.required && <span className="text-[#D4A853]">*</span>}
    </label>
  );
}

export default function ApplicationForm({ job }: { job: Job }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const setValue = (id: string, value: string) => setValues((v) => ({ ...v, [id]: value }));
  const setFile = (id: string, file: File | null) => setFiles((f) => ({ ...f, [id]: file }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    for (const field of job.form.fields) {
      if ((field.type === 'file' || field.type === 'voice') && field.required && !files[field.id]) {
        setError(`${field.label} is required.`);
        document.getElementById(`${field.id}-wrapper`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (field.type === 'file' && files[field.id] && files[field.id]!.size > field.maxSizeMb * 1024 * 1024) {
        setError(`${field.label}: file must be under ${field.maxSizeMb}MB.`);
        return;
      }
    }

    const formData = new FormData();
    formData.set('job', job.slug);
    for (const field of job.form.fields) {
      if (field.type === 'file' || field.type === 'voice') {
        const file = files[field.id];
        if (file) formData.set(field.id, file, file.name);
      } else {
        formData.set(field.id, values[field.id] ?? '');
        if ((field.type === 'select' || field.type === 'radio') && field.otherOption && values[field.id] === field.otherOption) {
          formData.set(`${field.id}Other`, values[`${field.id}Other`] ?? '');
        }
      }
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/job-apply', { method: 'POST', body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const firstName = (values.name ?? '').split(' ')[0];
    return (
      <div className="bg-white/5 border border-white/10 p-8 md:p-12 text-center" style={{ borderRadius: '20px' }}>
        <div className="w-16 h-16 mx-auto mb-6 bg-[#D4A853]/20 text-[#D4A853] flex items-center justify-center" style={{ borderRadius: '16px' }}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
          {firstName ? `Thanks, ${firstName}.` : 'Thanks.'} Your application is in.
        </h2>
        <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto mb-8">
          We&apos;ve emailed you a confirmation. A founder reads every application, and you&apos;ll hear from us either way, usually within five working days.
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-sm transition-colors"
          style={{ borderRadius: '10px' }}
        >
          Back to all roles
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="bg-white/5 border border-white/10 p-6 md:p-10" style={{ borderRadius: '20px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {job.form.fields.map((field) => {
          const span = 'half' in field && field.half ? '' : 'md:col-span-2';

          if (field.type === 'textarea') {
            const length = (values[field.id] ?? '').length;
            return (
              <div key={field.id} className={span}>
                <Label field={field} />
                <textarea
                  id={field.id}
                  name={field.id}
                  rows={field.rows ?? 4}
                  required={field.required}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  value={values[field.id] ?? ''}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={`${inputClass} resize-none`}
                />
                {field.maxLength && (
                  <p className="text-right text-xs text-white/30 mt-1">
                    {length}/{field.maxLength}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === 'select') {
            return (
              <div key={field.id} className={span}>
                <Label field={field} />
                <select
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  value={values[field.id] ?? ''}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="bg-carbon">
                    Select one
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option} className="bg-carbon">
                      {option}
                    </option>
                  ))}
                </select>
                {field.otherOption && values[field.id] === field.otherOption && (
                  <OtherInput id={field.id} value={values[`${field.id}Other`] ?? ''} onChange={(v) => setValue(`${field.id}Other`, v)} />
                )}
              </div>
            );
          }

          if (field.type === 'radio') {
            return (
              <fieldset key={field.id} className={span}>
                <legend className="block text-sm font-medium text-white/80 mb-3">
                  {field.label} {field.required && <span className="text-[#D4A853]">*</span>}
                </legend>
                <div className="flex flex-wrap gap-3">
                  {field.options.map((option) => {
                    const checked = values[field.id] === option;
                    return (
                      <label
                        key={option}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-xl cursor-pointer text-sm transition-all ${
                          checked ? 'bg-[#D4A853]/15 border-[#D4A853] text-white' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          required={field.required}
                          checked={checked}
                          onChange={() => setValue(field.id, option)}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${checked ? 'border-[#D4A853]' : 'border-white/30'}`}>
                          {checked && <span className="w-2 h-2 rounded-full bg-[#D4A853]" />}
                        </span>
                        {option}
                      </label>
                    );
                  })}
                </div>
                {field.otherOption && values[field.id] === field.otherOption && (
                  <OtherInput id={field.id} value={values[`${field.id}Other`] ?? ''} onChange={(v) => setValue(`${field.id}Other`, v)} />
                )}
              </fieldset>
            );
          }

          if (field.type === 'file') {
            const file = files[field.id];
            return (
              <div key={field.id} id={`${field.id}-wrapper`} className={span}>
                <Label field={field} />
                <input
                  id={field.id}
                  name={field.id}
                  type="file"
                  accept={field.accept.map((ext) => `.${ext}`).join(',')}
                  required={field.required}
                  onChange={(e) => setFile(field.id, e.target.files?.[0] ?? null)}
                  className={`${inputClass} file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-sm`}
                />
                <p className="text-xs text-white/40 mt-1.5">
                  {file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)` : field.hint ?? `${field.accept.join(', ').toUpperCase()}, up to ${field.maxSizeMb}MB.`}
                </p>
              </div>
            );
          }

          if (field.type === 'voice') {
            return (
              <div key={field.id} id={`${field.id}-wrapper`} className={span}>
                <Label field={field} />
                <p className="text-white/70 text-sm leading-relaxed mb-3 bg-[#D4A853]/10 border border-[#D4A853]/25 rounded-xl px-4 py-3">
                  <span className="text-[#D4A853] font-semibold">Scenario: </span>
                  {field.prompt}
                </p>
                <VoiceNoteRecorder id={field.id} maxSeconds={field.maxSeconds} onChange={(f) => setFile(field.id, f)} />
              </div>
            );
          }

          if (field.type !== 'text' && field.type !== 'email' && field.type !== 'tel' && field.type !== 'url') {
            return null;
          }

          return (
            <div key={field.id} className={span}>
              <Label field={field} />
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.id === 'name' ? 'name' : field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : field.id === 'city' ? 'address-level2' : undefined}
                inputMode={field.type === 'tel' ? 'tel' : field.type === 'url' ? 'url' : undefined}
                value={values[field.id] ?? ''}
                onChange={(e) => setValue(field.id, e.target.value)}
                className={inputClass}
              />
            </div>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="mt-6 text-sm text-[#FF6B6B] bg-[#FF0023]/10 border border-[#FF0023]/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-3 px-8 py-4 bg-[#D4A853] hover:bg-[#D4A853]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold text-base transition-all"
          style={{ borderRadius: '12px' }}
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sending your application…
            </>
          ) : (
            'Submit application'
          )}
        </button>
        <p className="text-white/40 text-xs leading-relaxed">
          By applying you agree to our{' '}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white transition-colors">
            privacy policy
          </Link>
          . We only use this to assess your application.
        </p>
      </div>
    </form>
  );
}
