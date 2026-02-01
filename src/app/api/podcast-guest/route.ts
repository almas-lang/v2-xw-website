import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 59;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

// Send notification email to team
async function sendNotificationEmail(formData: {
  name: string;
  email: string;
  linkedin: string;
  roleCompany: string;
  topic: string;
  previousTalks?: string;
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
        subject: '🎙️ New Podcast Guest Application!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FACC15; margin-bottom: 16px;">New Guest Application - Vivid Yellow</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Someone wants to be a guest on the podcast:
            </p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${formData.email}</p>
              <p style="margin: 0 0 12px 0;"><strong>LinkedIn:</strong> <a href="${formData.linkedin}">${formData.linkedin}</a></p>
              <p style="margin: 0 0 12px 0;"><strong>Role & Company:</strong> ${formData.roleCompany}</p>
              <p style="margin: 0 0 12px 0;"><strong>Topic:</strong></p>
              <p style="margin: 0 0 12px 0; padding: 12px; background: #fff; border-radius: 4px;">${formData.topic}</p>
              ${formData.previousTalks ? `<p style="margin: 0;"><strong>Previous Talks:</strong> <a href="${formData.previousTalks}">${formData.previousTalks}</a></p>` : ''}
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

// Send confirmation email to applicant
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
        subject: 'We received your guest application! 🎙️',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FACC15; margin-bottom: 16px;">Thanks for applying, ${name}!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              We've received your application to be a guest on Vivid Yellow podcast.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Our team will review your application and get back to you soon if we think there's a fit.
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
    const { name, email, linkedin, roleCompany, topic, previousTalks } = formData;

    // Validate required fields
    if (!name || !email || !linkedin || !roleCompany || !topic) {
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
          LINKEDIN: linkedin,
          ROLE_COMPANY: roleCompany,
          TOPIC: topic,
          PREVIOUS_TALKS: previousTalks || '',
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
    console.error('Podcast guest application error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
