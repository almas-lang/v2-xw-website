import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 54;
const DOI_TEMPLATE_ID = 86; // "Newsletter double opt-in confirmation" in Brevo
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

// Send notification email to team
async function sendNotificationEmail(subscriberEmail: string) {
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Xperience Wave', email: 'team@xperiencewave.com' },
        to: NOTIFICATION_EMAILS.map(email => ({ email })),
        subject: '📬 New Newsletter Signup (pending confirmation)',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Newsletter Signup</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 12px;">
              Someone just signed up for the Xperience Wave newsletter:
            </p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <strong style="color: #1A1A1A; font-size: 18px;">${subscriberEmail}</strong>
            </div>
            <p style="color: #999; font-size: 14px;">
              A confirmation email was sent (double opt-in). They will appear in
              Brevo list #${BREVO_LIST_ID} only after clicking the confirm link,
              so unconfirmed signups here may be bots and can be ignored.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    // Log but don't fail the subscription if notification fails
    console.error('Failed to send notification email:', error);
  }
}

// Per-IP rate limit (in-memory; resets when the serverless instance recycles,
// which is fine — it only needs to blunt bursts, not be a perfect ledger)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  if (submissionsByIp.size > 5000) submissionsByIp.clear();
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const { email, company, elapsedMs } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Bot checks — return a fake success so bots don't retry or adapt.
    // "company" is a hidden honeypot field humans never fill; humans also
    // can't read the page and type an email in under 3 seconds. Browsers
    // always send an Origin header on POST; scripts posting directly
    // usually don't, or send someone else's.
    let originHost = '';
    try {
      originHost = new URL(request.headers.get('origin') || '').hostname;
    } catch {
      originHost = '';
    }
    const allowedOrigin =
      originHost === 'xperiencewave.com' ||
      originHost.endsWith('.xperiencewave.com') ||
      originHost.endsWith('.vercel.app') ||
      originHost === 'localhost';
    const isBot =
      !allowedOrigin ||
      (typeof company === 'string' && company.trim() !== '') ||
      typeof elapsedMs !== 'number' ||
      elapsedMs < 3000;
    if (isBot) {
      return NextResponse.json({ success: true });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: true });
    }

    // Double opt-in: Brevo emails a confirmation link (template 86); the
    // contact only joins the list after clicking it, so bots never get on.
    const response = await fetch(
      'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          email: email,
          includeListIds: [BREVO_LIST_ID],
          templateId: DOI_TEMPLATE_ID,
          redirectionUrl: 'https://www.xperiencewave.com/newsletter-confirmed',
        }),
      }
    );

    if (response.status === 201 || response.status === 204) {
      // Send notification email to team
      await sendNotificationEmail(email);
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact (already subscribed)
    if (response.status === 400) {
      const data = await response.json();
      if (data.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true, message: 'Already subscribed' });
      }
      return NextResponse.json({ error: data.message || 'Subscription failed' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
