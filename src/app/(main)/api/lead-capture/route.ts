import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 55; // Same list for all lead captures
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

export type LeadType =
  | 'mentorship-evaluator'
  | 'design-strategy-gpt'
  | 'research-synthesis-gpt'
  | 'microcopy-writer-gpt'
  | 'portfolio-feedback-gpt'
  | 'resume-reviewer-gpt'
  | 'salary-negotiation-gpt'
  | 'ux-audit-gpt'
  | 'course-design-strategy'
  | 'course-ux-research'
  | 'course-portfolio'
  | 'course-design-system';

interface LeadConfig {
  name: string;
  redirectUrl?: string; // URL to redirect after capture (for GPT tools)
  notificationSubject: string;
  notificationText: string;
  leadSource: string;
}

const leadConfigs: Record<LeadType, LeadConfig> = {
  // Evaluator Tool
  'mentorship-evaluator': {
    name: 'UX Mentorship Program Evaluator',
    redirectUrl: '/resources/tools/mentorship-evaluator',
    notificationSubject: '📊 New Evaluator Access Request',
    notificationText: 'Someone requested access to the UX Mentorship Program Evaluator',
    leadSource: 'Mentorship Evaluator Tool',
  },
  // GPT Tools
  'design-strategy-gpt': {
    name: 'Design Strategy GPT',
    redirectUrl: 'https://chatgpt.com/g/g-6932501b7b708191bd16ee0ea24f1e24-design-strategy-ai-xperience-wave',
    notificationSubject: '🤖 New GPT Access Request',
    notificationText: 'Someone requested access to Design Strategy GPT',
    leadSource: 'Design Strategy GPT Access',
  },
  'research-synthesis-gpt': {
    name: 'Research Synthesis GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for Research Synthesis GPT',
    leadSource: 'Research Synthesis GPT Waitlist',
  },
  'microcopy-writer-gpt': {
    name: 'UX Microcopy Writer GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for UX Microcopy Writer GPT',
    leadSource: 'UX Microcopy Writer GPT Waitlist',
  },
  'portfolio-feedback-gpt': {
    name: 'Portfolio Feedback GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for Portfolio Feedback GPT',
    leadSource: 'Portfolio Feedback GPT Waitlist',
  },
  'resume-reviewer-gpt': {
    name: 'Resume Reviewer GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for Resume Reviewer GPT',
    leadSource: 'Resume Reviewer GPT Waitlist',
  },
  'salary-negotiation-gpt': {
    name: 'Salary Negotiation GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for Salary Negotiation GPT',
    leadSource: 'Salary Negotiation GPT Waitlist',
  },
  'ux-audit-gpt': {
    name: 'UX Audit GPT',
    notificationSubject: '🤖 New GPT Waitlist Signup',
    notificationText: 'Someone joined the waitlist for UX Audit GPT',
    leadSource: 'UX Audit GPT Waitlist',
  },
  // Courses
  'course-design-strategy': {
    name: 'Design Strategy for Product Designers',
    notificationSubject: '📚 New Course Waitlist Signup',
    notificationText: 'Someone joined the waitlist for "Design Strategy for Product Designers" course',
    leadSource: 'Course Waitlist - Design Strategy',
  },
  'course-ux-research': {
    name: 'Mixed Methods UX Research',
    notificationSubject: '📚 New Course Waitlist Signup',
    notificationText: 'Someone joined the waitlist for "Mixed Methods UX Research" course',
    leadSource: 'Course Waitlist - UX Research',
  },
  'course-portfolio': {
    name: 'Portfolio That Gets You Hired',
    notificationSubject: '📚 New Course Waitlist Signup',
    notificationText: 'Someone joined the waitlist for "Portfolio That Gets You Hired" course',
    leadSource: 'Course Waitlist - Portfolio',
  },
  'course-design-system': {
    name: 'Build a Practical Design System',
    notificationSubject: '📚 New Course Waitlist Signup',
    notificationText: 'Someone joined the waitlist for "Build a Practical Design System" course',
    leadSource: 'Course Waitlist - Design System',
  },
};

// Send notification email to team
async function sendNotificationEmail(subscriberEmail: string, leadType: LeadType) {
  const config = leadConfigs[leadType];

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
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Lead Captured</h2>
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
    const { email, leadType } = await request.json();

    // Validate lead type
    if (!leadType || !leadConfigs[leadType as LeadType]) {
      return NextResponse.json(
        { error: 'Invalid lead type' },
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

    const config = leadConfigs[leadType as LeadType];

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

    // Send notification to team
    await sendNotificationEmail(email, leadType as LeadType);

    // Send confirmation email with link for evaluator
    if (leadType === 'mentorship-evaluator') {
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
            subject: 'Your UX Mentorship Program Evaluator is Ready',
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <img src="https://www.xperiencewave.com/images/xw-logo.png" alt="Xperience Wave" style="height: 40px;" />
                </div>
                <h1 style="color: #1A1A1A; font-size: 24px; margin-bottom: 16px; text-align: center;">
                  Your Evaluator is Ready
                </h1>
                <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  Score any UX mentorship program across 6 weighted categories. 20 questions. 100 points. The calculator is honest enough to score any program - including ours.
                </p>
                <div style="text-align: center; margin-bottom: 32px;">
                  <a href="https://www.xperiencewave.com/resources/tools/mentorship-evaluator" style="display: inline-block; padding: 14px 32px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Open the Evaluator &rarr;
                  </a>
                </div>
                <p style="color: #999; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                  Want to walk through the scorecard together? <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="color: #FF0023;">Book a free strategy call</a> and we'll apply the framework with you.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #bbb; font-size: 12px; text-align: center;">
                  Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                </p>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send evaluator confirmation email:', error);
      }
    }

    return NextResponse.json({
      success: true,
      redirectUrl: config.redirectUrl || null,
      message: config.redirectUrl
        ? 'Access granted! Redirecting...'
        : 'You\'re on the list! We\'ll notify you when it\'s ready.',
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
