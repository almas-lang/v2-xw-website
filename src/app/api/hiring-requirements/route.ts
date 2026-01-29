import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const HIRING_LIST_ID = 58; // Create a new list in Brevo for hiring inquiries
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

interface HiringData {
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  experienceLevel: string;
  engagementType: string;
  designerCount: string;
  timeline: string;
  budgetRange?: string;
  roleDescription?: string;
  hearAbout?: string;
}

// Send confirmation email to the hiring contact
async function sendConfirmationEmail(data: HiringData) {
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
        subject: "We've Received Your Hiring Requirements!",
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 28px; margin: 0 0 8px 0;">Requirements Received!</h1>
              <p style="color: #6366f1; font-size: 16px; margin: 0;">Hire UX Designers from Xperience Wave</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                Hi ${data.name.split(' ')[0]},<br><br>
                Thank you for sharing your hiring requirements with us. Our talent team is already reviewing your needs and will get back to you within 24-48 hours with curated designer profiles.
              </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Your Requirements Summary</p>
              <table style="width: 100%; color: #475569; margin-top: 12px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Company</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Experience Level</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.experienceLevel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Engagement Type</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.engagementType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Designers Needed</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.designerCount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Timeline</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1a1a1a;">${data.timeline}</td>
                </tr>
              </table>
            </div>

            <div style="background: #eef2ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="color: #4338ca; font-size: 14px; margin: 0; font-weight: 500;">
                What's Next?
              </p>
              <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 12px 0 0 0; padding-left: 20px;">
                <li>Our team reviews your requirements</li>
                <li>We shortlist matching designers from our talent pool</li>
                <li>You receive curated profiles within 48-72 hours</li>
                <li>Interview and hire with our 60-day replacement guarantee</li>
              </ul>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                Questions? Reply to this email or reach out at <a href="mailto:team@xperiencewave.com" style="color: #6366f1;">team@xperiencewave.com</a>
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
    console.log('Hiring confirmation email response:', response.status, result);
    if (!response.ok) {
      console.error('Hiring confirmation email failed:', result);
    }
  } catch (error) {
    console.error('Failed to send hiring confirmation email:', error);
  }
}

// Send notification email to team
async function sendTeamNotification(data: HiringData) {
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
        subject: `🎯 New Hiring Request: ${data.company} - ${data.designerCount}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Hiring Requirements Submitted</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
              A company has submitted their UX designer hiring requirements:
            </p>

            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px 16px; margin-bottom: 20px;">
              <p style="color: #166534; font-size: 14px; margin: 0; font-weight: 600;">
                Timeline: ${data.timeline}
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 160px;">Contact Name</td>
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
                <td style="padding: 10px 0; color: #666;">Designation</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.designation}</td>
              </tr>
            </table>

            <h3 style="color: #1A1A1A; font-size: 16px; margin-bottom: 12px;">Requirements</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 160px;">Experience Level</td>
                <td style="padding: 10px 0; color: #1A1A1A; font-weight: 600;">${data.experienceLevel}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Engagement Type</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.engagementType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Designers Needed</td>
                <td style="padding: 10px 0; color: #1A1A1A; font-weight: 600;">${data.designerCount}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Timeline</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.timeline}</td>
              </tr>
              ${data.budgetRange ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Budget Range</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.budgetRange}</td>
              </tr>
              ` : ''}
            </table>

            ${data.roleDescription ? `
            <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Role Description</p>
              <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6;">${data.roleDescription}</p>
            </div>
            ` : ''}

            ${data.hearAbout ? `
            <p style="color: #999; font-size: 13px;">
              How they heard about us: ${data.hearAbout}
            </p>
            ` : ''}

            <p style="color: #999; font-size: 13px;">
              This contact has been added to Brevo list #${HIRING_LIST_ID}.
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
  try {
    const data: HiringData = await request.json();

    // Validate required fields
    if (!data.email || !data.name || !data.phone || !data.company || !data.designation ||
        !data.experienceLevel || !data.engagementType || !data.designerCount || !data.timeline) {
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
        listIds: [HIRING_LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0],
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
          COMPANY: data.company,
          SMS: data.phone,
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
        return NextResponse.json({ success: true, message: 'Already submitted' });
      }
      console.error('Brevo error:', responseData);
      return NextResponse.json({ error: responseData.message || 'Submission failed' }, { status: 400 });
    }

    console.error('Brevo unexpected error:', responseData);
    return NextResponse.json(
      { error: 'Failed to submit requirements. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Hiring requirements error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
