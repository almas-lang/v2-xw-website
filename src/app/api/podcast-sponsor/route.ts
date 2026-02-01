import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 60;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

// Send notification email to team
async function sendNotificationEmail(formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}) {
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Vivid Yellow Podcast', email: 'team@xperiencewave.com' },
        to: NOTIFICATION_EMAILS.map(email => ({ email })),
        subject: '💰 New Podcast Sponsor Inquiry!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FACC15; margin-bottom: 16px;">New Sponsor Inquiry - Vivid Yellow</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Someone is interested in sponsoring the podcast:
            </p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${formData.email}</p>
              <p style="margin: 0 0 12px 0;"><strong>Company:</strong> ${formData.company}</p>
              <p style="margin: 0 0 12px 0;"><strong>Message:</strong></p>
              <p style="margin: 0; padding: 12px; background: #fff; border-radius: 4px;">${formData.message}</p>
            </div>
            <p style="color: #999; font-size: 14px;">
              This contact has been added to Brevo list #${BREVO_LIST_ID}.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

// Send confirmation email to sponsor
async function sendConfirmationEmail(name: string, email: string) {
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Vivid Yellow Podcast', email: 'team@xperiencewave.com' },
        to: [{ email, name }],
        subject: 'Thanks for your interest in sponsoring Vivid Yellow! 🎙️',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FACC15; margin-bottom: 16px;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              We've received your sponsorship inquiry for the Vivid Yellow podcast.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Our team will review your message and get back to you within 2-3 business days with partnership options.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              In the meantime, check out our latest episodes on <a href="https://www.youtube.com/@thevividyellow" style="color: #FACC15;">YouTube</a> or <a href="https://open.spotify.com/show/5ULMerqiVi3L2HLHMeynoL" style="color: #FACC15;">Spotify</a>.
            </p>
            <p style="color: #666; font-size: 14px;">
              — The Vivid Yellow Team
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, email, company, message } = formData;

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name.split(' ')[0],
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          COMPANY: company,
          MESSAGE: message,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 204) {
      // Send emails
      await Promise.all([
        sendNotificationEmail(formData),
        sendConfirmationEmail(name, email),
      ]);
      return NextResponse.json({ success: true });
    }

    const data = await response.json();
    return NextResponse.json(
      { error: data.message || 'Submission failed. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Podcast sponsor inquiry error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
