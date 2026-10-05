import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { appendToSheet, istTimestamp } from '@/lib/sheets';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SPEAKER_LIST_ID = 56;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  profession: string;
  company?: string;
  topic: string;
  bio: string;
  hearAbout?: string;
}

function saveToSheet(data: ApplicationData) {
  return appendToSheet('Speaker Applications', {
    'Timestamp (IST)': istTimestamp(),
    'Name': data.name,
    'Email': data.email,
    'Phone': data.phone,
    'LinkedIn': data.linkedin,
    'Profession': data.profession,
    'Company': data.company || '',
    'Heard About': data.hearAbout || '',
    'Proposed Topic': data.topic,
    'Bio': data.bio,
  });
}

// Send confirmation email to applicant
async function sendConfirmationEmail(data: ApplicationData) {
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
        subject: "We've Received Your Speaker Application!",
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0118; color: #ffffff; padding: 40px 30px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px 0;">Application Received!</h1>
              <p style="color: #a5b4fc; font-size: 16px; margin: 0;">WaveMakers Connect Speaker Application</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #c7d2fe; font-size: 15px; line-height: 1.6;">
                Hi ${data.name.split(' ')[0]},<br><br>
                Thank you for your interest in speaking at WaveMakers Connect! We're excited to learn more about your expertise.<br><br>
                <strong style="color: #ffffff;">Your proposed topic:</strong><br>
                <span style="color: #a5b4fc;">"${data.topic}"</span>
              </p>
            </div>

            <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #e0e7ff; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">What's Next?</p>
              <ul style="color: #c7d2fe; font-size: 14px; line-height: 1.8; margin: 12px 0 0 0; padding-left: 20px;">
                <li>Our team will review your application within 3-5 business days</li>
                <li>If selected, we'll reach out to discuss your topic and session format</li>
                <li>We'll coordinate on event date and preparation details</li>
              </ul>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">
                Questions? Reply to this email or reach out on Instagram <a href="https://instagram.com/xperience_wave" style="color: #818cf8;">@xperience_wave</a>
              </p>
              <p style="color: #4b5563; font-size: 12px; margin: 16px 0 0 0;">
                © 2025 Xperience Wave. All rights reserved.
              </p>
            </div>
          </div>
        `,
      }),
    });
    const result = await response.json().catch(() => ({}));
    console.log('Confirmation email response:', response.status, result);
    if (!response.ok) {
      console.error('Confirmation email failed:', result);
    }
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

// Send notification email to team
async function sendTeamNotification(data: ApplicationData) {
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
        subject: `🎤 New Speaker Application: ${data.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Speaker Application</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
              Someone wants to speak at WaveMakers Connect:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 120px;">Name</td>
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
                <td style="padding: 10px 0; color: #666;">LinkedIn</td>
                <td style="padding: 10px 0; color: #1A1A1A;"><a href="${data.linkedin}">${data.linkedin}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Profession</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.profession}</td>
              </tr>
              ${data.company ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Company</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.company}</td>
              </tr>
              ` : ''}
              ${data.hearAbout ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Heard About</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.hearAbout}</td>
              </tr>
              ` : ''}
            </table>

            <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Proposed Topic</p>
              <p style="color: #1A1A1A; font-size: 15px; margin: 0; font-weight: 500;">${data.topic}</p>
            </div>

            <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Bio / Why Them</p>
              <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6;">${data.bio}</p>
            </div>

            <p style="color: #999; font-size: 13px;">
              This contact has been added to Brevo list #${SPEAKER_LIST_ID}.
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
    const data: ApplicationData = await request.json();

    // Validate required fields
    if (!data.email || !data.name || !data.phone || !data.linkedin || !data.profession || !data.topic || !data.bio) {
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
        listIds: [SPEAKER_LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0],
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
        },
      }),
    });

    console.log('Brevo response status:', response.status);
    const responseData = await response.json().catch(() => ({}));
    console.log('Brevo response:', responseData);

    if (response.status === 201 || response.status === 204) {
      // Send emails and log to the submissions sheet in parallel
      await Promise.all([
        sendConfirmationEmail(data),
        sendTeamNotification(data),
        saveToSheet(data),
      ]);
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact
    if (response.status === 400) {
      if (responseData.code === 'duplicate_parameter') {
        // Still send emails for duplicate (they might want to update their application)
        await Promise.all([
          sendConfirmationEmail(data),
          sendTeamNotification(data),
          saveToSheet(data),
        ]);
        return NextResponse.json({ success: true, message: 'Already applied' });
      }
      console.error('Brevo error:', responseData);
      return NextResponse.json({ error: responseData.message || 'Application failed' }, { status: 400 });
    }

    console.error('Brevo unexpected error:', responseData);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Speaker application error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
