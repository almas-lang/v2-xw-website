import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SPONSOR_LIST_ID = 57;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

interface SponsorData {
  name: string;
  email: string;
  phone: string;
  company: string;
  sponsorshipType: string;
  message?: string;
}

// Send confirmation email to sponsor
async function sendConfirmationEmail(data: SponsorData) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Xperience Wave', email: 'team@xperiencewave.com' },
        to: [{ email: data.email, name: data.name }],
        subject: "Thanks for Your Interest in Sponsoring WaveMakers Connect!",
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 28px; margin: 0 0 8px 0;">Thanks for Reaching Out!</h1>
              <p style="color: #6366f1; font-size: 16px; margin: 0;">WaveMakers Connect Sponsorship</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                Hi ${data.name.split(' ')[0]},<br><br>
                Thank you for your interest in partnering with WaveMakers Connect! We're excited about the possibility of working together.
              </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Your Inquiry Details</p>
              <table style="width: 100%; color: #475569; margin-top: 12px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Company</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Sponsorship Type</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.sponsorshipType}</td>
                </tr>
              </table>
            </div>

            <div style="background: #eef2ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="color: #4338ca; font-size: 14px; margin: 0; font-weight: 500;">
                What's Next?
              </p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 8px 0 0 0;">
                Our team will review your inquiry and get back to you within 2 business days to discuss partnership opportunities.
              </p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                Questions? Reply to this email or reach out on Instagram <a href="https://instagram.com/xperience_wave" style="color: #6366f1;">@xperience_wave</a>
              </p>
              <p style="color: #d1d5db; font-size: 12px; margin: 16px 0 0 0;">
                © 2025 Xperience Wave. All rights reserved.
              </p>
            </div>
          </div>
        `,
      }),
    });
    const result = await response.json().catch(() => ({}));
    console.log('Sponsor confirmation email response:', response.status, result);
    if (!response.ok) {
      console.error('Sponsor confirmation email failed:', result);
    }
  } catch (error) {
    console.error('Failed to send sponsor confirmation email:', error);
  }
}

// Send notification email to team
async function sendTeamNotification(data: SponsorData) {
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
        subject: `🤝 New Sponsor Inquiry: ${data.company}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Sponsorship Inquiry</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
              A potential sponsor has reached out about partnering with WaveMakers Connect:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 140px;">Name</td>
                <td style="padding: 10px 0; color: #1A1A1A; font-weight: 600;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Email</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Phone</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Company</td>
                <td style="padding: 10px 0; color: #1A1A1A; font-weight: 600;">${data.company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Sponsorship Type</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.sponsorshipType}</td>
              </tr>
            </table>

            ${data.message ? `
            <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6;">${data.message}</p>
            </div>
            ` : ''}

            <p style="color: #999; font-size: 13px;">
              This contact has been added to Brevo list #${SPONSOR_LIST_ID}.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Failed to send team notification:', error);
  }
}

export async function POST(request: NextRequest) {
  // Vercel BotID: reject requests not verified as a real human browser
  // session. Bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  try {
    const data: SponsorData = await request.json();

    // Validate required fields
    if (!data.email || !data.name || !data.phone || !data.company || !data.sponsorshipType) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
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
        email: data.email,
        listIds: [SPONSOR_LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0],
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
          COMPANY: data.company,
        },
      }),
    });

    console.log('Brevo response status:', response.status);
    const responseData = await response.json().catch(() => ({}));
    console.log('Brevo response:', responseData);

    if (response.status === 201 || response.status === 204) {
      // Send emails in parallel
      await Promise.all([
        sendConfirmationEmail(data),
        sendTeamNotification(data),
      ]);
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact
    if (response.status === 400) {
      if (responseData.code === 'duplicate_parameter') {
        // Still send emails for duplicate
        await Promise.all([
          sendConfirmationEmail(data),
          sendTeamNotification(data),
        ]);
        return NextResponse.json({ success: true, message: 'Already inquired' });
      }
      console.error('Brevo error:', responseData);
      return NextResponse.json({ error: responseData.message || 'Submission failed' }, { status: 400 });
    }

    console.error('Brevo unexpected error:', responseData);
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Sponsor inquiry error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
