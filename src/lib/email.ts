/**
 * Transactional email via Resend (https://resend.com/docs/api-reference/emails/send-email).
 * Never throws: an email outage must not fail a form submission. Returns
 * false when the key is missing or Resend rejects the message, and logs why.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const CAREERS_FROM = 'Xperience Wave <hire@xperiencewave.com>';
export const TEAM_REPLY_TO = 'team@xperiencewave.com';

export interface SendEmailInput {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set; skipping email:', input.subject);
    return false;
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        reply_to: input.replyTo,
      }),
    });
    if (!response.ok) {
      console.error('Resend failed:', response.status, await response.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (error) {
    console.error('Resend request error:', error);
    return false;
  }
}

/** Escape user-supplied text before interpolating it into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
