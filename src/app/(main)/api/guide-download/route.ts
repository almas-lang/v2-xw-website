import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 55; // Same list for all guide downloads
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

type GuideType = 'hiring-guide' | 'team-gap-analysis';

interface GuideConfig {
  pdfUrl: string;
  emailSubject: string;
  emailTitle: string;
  emailDescription: string;
  emailBullets: string[];
  ctaText: string;
  ctaUrl: string;
  notificationSubject: string;
  notificationText: string;
  leadSource: string;
}

const guideConfigs: Record<GuideType, GuideConfig> = {
  'hiring-guide': {
    pdfUrl: 'https://xperiencewave.com/guides/how-to-hire-ux-designer-from-india.pdf',
    emailSubject: 'Your Free Guide: How to Hire UX Designers from India',
    emailTitle: 'Your Guide is Ready! 🎉',
    emailDescription: 'Thank you for your interest in hiring UX designers from India. Here\'s your free guide with everything you need to know about finding, vetting, and hiring top design talent.',
    emailBullets: [
      'Why India is a top destination for UX talent',
      'Red flags to watch out for when hiring',
      'Interview questions that actually reveal skill',
      'Salary benchmarks and hiring timelines',
      'How Xperience Wave can help you hire faster',
    ],
    ctaText: 'Need designers now? Share your requirements →',
    ctaUrl: 'https://xperiencewave.com/for-business/hire-ux-designers/requirements',
    notificationSubject: '📥 New Hiring Guide Download',
    notificationText: 'Someone downloaded the "How to Hire UX Designers from India" guide',
    leadSource: 'Hiring Guide Download',
  },
  'team-gap-analysis': {
    pdfUrl: 'https://xperiencewave.com/guides/team-gap-analysis-template.pdf',
    emailSubject: 'Your Team Gap Analysis Template',
    emailTitle: 'Your Template is Ready! 🎉',
    emailDescription: 'Thank you for downloading the Team Gap Analysis Template. Use this to audit your design team\'s skills and identify where training can have the biggest impact.',
    emailBullets: [
      'Skill assessment framework across 8 areas',
      'Scoring guide to identify priority gaps',
      'Suggested next steps based on results',
      'Workshop recommendations for each gap area',
    ],
    ctaText: 'Want us to run the analysis for you? Book a call →',
    ctaUrl: 'https://calendly.com/team-xperiencewave/xw-strategy',
    notificationSubject: '📥 New Team Gap Analysis Download',
    notificationText: 'Someone downloaded the "Team Gap Analysis Template"',
    leadSource: 'Team Gap Analysis Download',
  },
};

// Send the guide email to the subscriber
async function sendGuideEmail(email: string, guideType: GuideType) {
  const config = guideConfigs[guideType];

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
        to: [{ email }],
        subject: config.emailSubject,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <img src="https://xperiencewave.com/images/xperience-wave-logo.png" alt="Xperience Wave" style="height: 40px; margin-bottom: 24px;" />

            <h1 style="color: #1A1A1A; font-size: 24px; margin-bottom: 16px;">
              ${config.emailTitle}
            </h1>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              ${config.emailDescription}
            </p>

            <a href="${config.pdfUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 24px;">
              Download Now →
            </a>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              <strong>What's inside:</strong>
            </p>
            <ul style="color: #666; font-size: 15px; line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
              ${config.emailBullets.map(bullet => `<li>${bullet}</li>`).join('')}
            </ul>

            <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 24px;">
              <a href="${config.ctaUrl}" style="color: #6366f1; font-size: 14px; font-weight: 600; text-decoration: none;">
                ${config.ctaText}
              </a>
            </div>

            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              Xperience Wave • UX Design Training & Talent
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Guide email failed:', errorData);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to send guide email:', error);
    return false;
  }
}

// Send notification email to team
async function sendNotificationEmail(subscriberEmail: string, guideType: GuideType) {
  const config = guideConfigs[guideType];

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
        to: NOTIFICATION_EMAILS.map(email => ({ email })),
        subject: config.notificationSubject,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Guide Download Lead</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 12px;">
              ${config.notificationText}:
            </p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <strong style="color: #1A1A1A; font-size: 18px;">${subscriberEmail}</strong>
            </div>
            <p style="color: #999; font-size: 14px;">
              Lead source: ${config.leadSource}
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notification email failed:', errorData);
    }
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, guideType } = await request.json();

    // Validate guide type
    if (!guideType || !guideConfigs[guideType as GuideType]) {
      return NextResponse.json(
        { error: 'Invalid guide type' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const config = guideConfigs[guideType as GuideType];

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
          LEAD_SOURCE: config.leadSource,
        },
      }),
    });

    // Send the guide email
    const emailSent = await sendGuideEmail(email, guideType as GuideType);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // Send notification to team
    await sendNotificationEmail(email, guideType as GuideType);

    return NextResponse.json({
      success: true,
      message: 'Guide sent to your email!'
    });

  } catch (error) {
    console.error('Guide download error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
