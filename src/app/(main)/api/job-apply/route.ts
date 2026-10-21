import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { put } from '@vercel/blob';
import { getJob, type FormField, type Job } from '@/data/jobs';
import { appendToSheet, istTimestamp } from '@/lib/sheets';
import { sendEmail, escapeHtml, CAREERS_FROM, TEAM_REPLY_TO } from '@/lib/email';
import { SITE_URL } from '@/lib/seo';

const NOTIFICATION_EMAILS = ['team@xperiencewave.com', 'murad@xperiencewave.com'];
const MAX_VOICE_BYTES = 15 * 1024 * 1024;
const AUDIO_EXTENSIONS = ['webm', 'mp4', 'm4a', 'mp3', 'wav', 'ogg', 'aac'];

type Answer = { field: FormField; value: string; url?: string };

function fileExtension(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
}

/** Validate every field against the job's form and collect answers in order. */
async function collectAnswers(job: Job, formData: FormData): Promise<{ answers: Answer[]; error?: string }> {
  const answers: Answer[] = [];

  for (const field of job.form.fields) {
    if (field.type === 'file' || field.type === 'voice') {
      const file = formData.get(field.id);
      if (!(file instanceof File) || file.size === 0) {
        if (field.required) return { answers, error: `${field.label} is required` };
        answers.push({ field, value: '' });
        continue;
      }
      const maxBytes = field.type === 'file' ? field.maxSizeMb * 1024 * 1024 : MAX_VOICE_BYTES;
      if (file.size > maxBytes) {
        return { answers, error: `${field.label}: file is too large` };
      }
      const allowed = field.type === 'file' ? field.accept : AUDIO_EXTENSIONS;
      const ext = fileExtension(file.name);
      const isAudioMime = field.type === 'voice' && file.type.startsWith('audio/');
      if (!allowed.includes(ext) && !isAudioMime) {
        return { answers, error: `${field.label}: unsupported file type` };
      }
      answers.push({ field, value: file.name, url: undefined });
      continue;
    }

    const raw = formData.get(field.id);
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (field.required && !value) {
      return { answers, error: `${field.label} is required` };
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { answers, error: 'Please provide a valid email address' };
    }
    if ((field.type === 'select' || field.type === 'radio') && value && !field.options.includes(value)) {
      return { answers, error: `${field.label}: invalid option` };
    }
    if ((field.type === 'select' || field.type === 'radio') && field.otherOption && value === field.otherOption) {
      const otherRaw = formData.get(`${field.id}Other`);
      const other = typeof otherRaw === 'string' ? otherRaw.trim().slice(0, 120) : '';
      if (!other) return { answers, error: `${field.label}: please tell us what kind` };
      answers.push({ field, value: `${value}: ${other}` });
      continue;
    }
    if (field.type === 'textarea' && field.maxLength && value.length > field.maxLength) {
      return { answers, error: `${field.label}: too long` };
    }
    if (value.length > 2000) {
      return { answers, error: `${field.label}: too long` };
    }
    answers.push({ field, value });
  }

  return { answers };
}

/** Upload file and voice answers to Blob and fill in their URLs. */
async function uploadFiles(job: Job, email: string, answers: Answer[], formData: FormData) {
  const stamp = Date.now();
  const folder = `applications/${job.slug}/${stamp}-${safeName(email)}`;
  await Promise.all(
    answers.map(async (answer) => {
      if (answer.field.type !== 'file' && answer.field.type !== 'voice') return;
      const file = formData.get(answer.field.id);
      if (!(file instanceof File) || file.size === 0) return;
      const blob = await put(`${folder}/${answer.field.id}-${safeName(file.name)}`, file, {
        access: 'public',
        contentType: file.type || undefined,
      });
      answer.url = blob.url;
    })
  );
}

function answerText(answer: Answer) {
  return answer.url ?? answer.value;
}

function teamEmailHtml(job: Job, answers: Answer[]) {
  const rows = answers
    .map((a) => {
      const label = escapeHtml(a.field.label);
      let value: string;
      if (a.url) {
        value = `<a href="${escapeHtml(a.url)}" style="color:#B8860B;">${escapeHtml(a.value)}</a>`;
      } else if (a.field.type === 'url' && a.value) {
        value = `<a href="${escapeHtml(a.value)}" style="color:#B8860B;">${escapeHtml(a.value)}</a>`;
      } else {
        value = escapeHtml(a.value || '—').replace(/\n/g, '<br>');
      }
      return `<tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px 12px 10px 0;color:#666;font-size:13px;vertical-align:top;width:220px;">${label}</td>
        <td style="padding:10px 0;color:#1A1A1A;font-size:14px;line-height:1.5;vertical-align:top;">${value}</td>
      </tr>`;
    })
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;">
      <div style="background:#0A0A0A;padding:18px 24px;border-radius:12px 12px 0 0;">
        <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">Xperience Wave <span style="color:#D4A853;font-weight:400;">· Careers</span></p>
      </div>
      <div style="padding:24px;border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;">
      <h2 style="color:#1A1A1A;margin:0 0 6px 0;">New application: ${escapeHtml(job.title)}</h2>
      <p style="color:#666;font-size:14px;margin:0 0 20px 0;">
        ${escapeHtml(job.location)} · ${escapeHtml(job.type)} · ${istTimestamp()} IST
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${rows}</table>
      <p style="color:#999;font-size:12px;">
        Also logged to the "Applications – ${escapeHtml(job.title)}" tab of the Submissions sheet.
        Reply to this email to reach the candidate directly.
      </p>
      </div>
    </div>`;
}

function applicantEmailHtml(job: Job, name: string) {
  const first = escapeHtml(name.split(' ')[0] || 'there');
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#ffffff;padding:36px 30px 40px;border-radius:16px;">
      <p style="margin:0 0 28px 0;font-size:18px;font-weight:700;letter-spacing:-0.3px;">
        <a href="${SITE_URL}" style="color:#ffffff;text-decoration:none;">Xperience Wave</a>
      </p>
      <p style="color:#D4A853;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;">Application received</p>
      <h1 style="color:#ffffff;font-size:26px;margin:0 0 20px 0;">${escapeHtml(job.title)}</h1>
      <p style="color:#d4d4d8;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
        Hi ${first},<br><br>
        Thanks for applying. We've got your application and everything you sent with it.
      </p>
      <div style="background:rgba(212,168,83,0.08);border:1px solid rgba(212,168,83,0.25);border-radius:12px;padding:20px 24px;margin:0 0 24px 0;">
        <p style="color:#D4A853;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px 0;">What happens next</p>
        <ul style="color:#d4d4d8;font-size:14px;line-height:1.8;margin:0;padding-left:18px;">
          <li>We review every application ourselves, usually within 5 working days</li>
          <li>If it's a fit, we'll email you to set up a short call</li>
          <li>If not, we'll still let you know, so you're not left waiting</li>
        </ul>
      </div>
      <p style="color:#a1a1aa;font-size:13px;line-height:1.6;margin:0 0 28px 0;">
        Questions in the meantime? Reply to this email and it reaches the team.
      </p>
      <p style="color:#71717A;font-size:12px;margin:0;border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;">
        Xperience Wave · 328, Ground Floor, AECS Layout, Singasandra, Bangalore 560068<br>
        <a href="${SITE_URL}/careers" style="color:#D4A853;">xperiencewave.com/careers</a>
      </p>
    </div>`;
}

export async function POST(request: NextRequest) {
  // Vercel BotID: bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  try {
    const formData = await request.formData();
    const slug = formData.get('job');
    const job = typeof slug === 'string' ? getJob(slug) : undefined;
    if (!job) {
      return NextResponse.json({ error: 'This role is no longer open.' }, { status: 404 });
    }

    const { answers, error } = await collectAnswers(job, formData);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const name = answers.find((a) => a.field.id === 'name')?.value ?? '';
    const email = answers.find((a) => a.field.id === 'email')?.value ?? '';
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Files first: the email and sheet row both need the Blob URLs.
    await uploadFiles(job, email, answers, formData);

    const row: Record<string, string> = { 'Timestamp (IST)': istTimestamp() };
    for (const a of answers) row[a.field.label] = answerText(a);

    await Promise.all([
      sendEmail({
        from: CAREERS_FROM,
        to: NOTIFICATION_EMAILS,
        replyTo: email,
        subject: `New application: ${job.title} — ${name}`,
        html: teamEmailHtml(job, answers),
      }),
      sendEmail({
        from: CAREERS_FROM,
        to: [email],
        replyTo: TEAM_REPLY_TO,
        subject: `We've received your application for ${job.title}`,
        html: applicantEmailHtml(job, name),
      }),
      appendToSheet(`Applications – ${job.title}`, row),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
