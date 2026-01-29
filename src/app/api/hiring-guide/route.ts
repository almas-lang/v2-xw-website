import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 55; // New list for hiring guide leads
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

const PDF_DOWNLOAD_URL = 'https://xperiencewave.com/guides/how-to-hire-ux-designer-from-india.pdf';

// Send the guide email to the subscriber
async function sendGuideEmail(email: string) {
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
        to: [{ email }],
        subject: 'Your Free Guide: How to Hire UX Designers from India',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <img src="https://xperiencewave.com/images/xperience-wave-logo.png" alt="Xperience Wave" style="height: 40px; margin-bottom: 24px;" />

            <h1 style="color: #1A1A1A; font-size: 24px; margin-bottom: 16px;">
              Your Guide is Ready! 🎉
            </h1>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for your interest in hiring UX designers from India. Here's your free guide with everything you need to know about finding, vetting, and hiring top design talent.
            </p>

            <a href="${PDF_DOWNLOAD_URL}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 24px;">
              Download Your Guide →
            </a>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              <strong>What's inside:</strong>
            </p>
            <ul style="color: #666; font-size: 15px; line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
              <li>Why India is a top destination for UX talent</li>
              <li>Red flags to watch out for when hiring</li>
              <li>Interview questions that actually reveal skill</li>
              <li>Salary benchmarks and hiring timelines</li>
              <li>How Xperience Wave can help you hire faster</li>
            </ul>

            <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 24px;">
              <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
                <strong>Need designers now?</strong>
              </p>
              <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                We can share 3-5 handpicked profiles within 48-72 hours. No job postings, no recruiter fees.
              </p>
              <a href="https://xperiencewave.com/for-business/hire-ux-designers/requirements" style="color: #6366f1; font-size: 14px; font-weight: 600; text-decoration: none;">
                Share your requirements →
              </a>
            </div>

            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              Xperience Wave • Trained UX Designers from India
            </p>
          </div>
        `,
      }),
    });
    return true;
  } catch (error) {
    console.error('Failed to send guide email:', error);
    return false;
  }
}

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
        subject: '📥 New Hiring Guide Download',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Hiring Guide Lead</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 12px;">
              Someone downloaded the "How to Hire UX Designers from India" guide:
            </p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <strong style="color: #1A1A1A; font-size: 18px;">${subscriberEmail}</strong>
            </div>
            <p style="color: #999; font-size: 14px;">
              This is a warm lead interested in hiring UX designers.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Add contact to Brevo list
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email: email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: {
          LEAD_SOURCE: 'Hiring Guide Download',
        },
      }),
    });

    // Send the guide email
    const emailSent = await sendGuideEmail(email);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // Send notification to team
    await sendNotificationEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Guide sent to your email!'
    });

  } catch (error) {
    console.error('Hiring guide error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
