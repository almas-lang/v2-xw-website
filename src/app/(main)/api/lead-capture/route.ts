import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 55; // Same list for all lead captures
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

export type LeadType =
  | 'mentorship-evaluator'
  | 'design-team-systems-audit'
  | 'budget-prep-kit'
  | 'ux-salary-data-sheet'
  | 'workshop-facilitation-cheatsheet'
  | 'designer-mode-assessment'
  | 'agentic-ux-principles'
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
  // Budget Conversation Prep Kit (email-only, no redirect)
  'budget-prep-kit': {
    name: 'Budget Conversation Prep Kit',
    notificationSubject: '📊 New Budget Prep Kit Download',
    notificationText: 'Someone requested the Budget Conversation Prep Kit',
    leadSource: 'Budget Conversation Prep Kit',
  },
  // India UX Salary & Hiring Data Sheet (email-only, no redirect)
  'ux-salary-data-sheet': {
    name: 'India UX Salary & Hiring Data Sheet',
    notificationSubject: '📊 New Salary Data Sheet Download',
    notificationText: 'Someone requested the India UX Salary & Hiring Data Sheet',
    leadSource: 'India UX Salary Data Sheet',
  },
  // Workshop Facilitation Cheatsheet (email-only, no redirect)
  'workshop-facilitation-cheatsheet': {
    name: 'Workshop Facilitation Cheatsheet',
    notificationSubject: '📊 New Workshop Cheatsheet Download',
    notificationText: 'Someone requested the Workshop Facilitation Cheatsheet',
    leadSource: 'Workshop Facilitation Cheatsheet',
  },
  // Designer Mode Assessment (results shown on-screen in the tool)
  'designer-mode-assessment': {
    name: 'Designer Mode Assessment',
    notificationSubject: '📊 New Designer Mode Assessment Start',
    notificationText: 'Someone started the Designer Mode Assessment',
    leadSource: 'Designer Mode Assessment',
  },
  // 10 Principles of Agentic UX reference (email-only, no redirect)
  'agentic-ux-principles': {
    name: 'The 10 Principles of Agentic UX',
    notificationSubject: '📊 New Agentic UX Principles Download',
    notificationText: 'Someone requested the 10 Principles of Agentic UX reference',
    leadSource: 'Agentic UX Principles Reference',
  },
  // Design Team Systems Audit
  'design-team-systems-audit': {
    name: 'Design Team Systems Audit',
    redirectUrl: '/resources/tools/design-team-systems-audit',
    notificationSubject: '📊 New Design Team Systems Audit Request',
    notificationText: 'Someone requested access to the Design Team Systems Audit',
    leadSource: 'Design Team Systems Audit',
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
    redirectUrl: 'https://chatgpt.com/g/g-69cb92908a048191a028bf15615a8f17-salary-negotiation-for-ux-designers-xperience-wave',
    notificationSubject: '🤖 New Salary Negotiation GPT Access',
    notificationText: 'Someone requested access to Salary Negotiation GPT',
    leadSource: 'Salary Negotiation GPT Access',
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
  // Vercel BotID: reject requests not verified as a real human browser
  // session. Bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  try {
    const { email, leadType, name, experience } = await request.json();

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
          ...(typeof name === 'string' && name.trim() ? { FIRSTNAME: name.trim() } : {}),
          ...(typeof experience === 'string' && experience ? { YEARS_EXPERIENCE: experience } : {}),
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
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Evaluator is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    Score any UX mentorship program across 6 weighted categories. 20 questions. 100 points.
                  </p>
                  <a href="https://www.xperiencewave.com/resources/tools/mentorship-evaluator" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Start Scoring &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want to walk through the scorecard together? <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="color: #FF0023; text-decoration: none;">Book a free strategy call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send evaluator confirmation email:', error);
      }
    }

    // Send confirmation email with kit link for budget prep kit
    if (leadType === 'budget-prep-kit') {
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
            subject: 'Your Budget Conversation Prep Kit is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Prep Kit is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    Everything you need to walk into a budget meeting prepared: capacity mapping template, headcount scripts, one-slide investment case, and verified data points.
                  </p>
                  <a href="https://app.xperiencewave.com/budget-conversation-prep-kit" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Download the Kit &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want to walk through the budget conversation with a mentor? <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="color: #FF0023; text-decoration: none;">Book a free training call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send budget prep kit confirmation email:', error);
      }
    }

    // Send confirmation email with sheet link for the salary data sheet
    if (leadType === 'ux-salary-data-sheet') {
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
            subject: 'Your India UX Salary & Hiring Data Sheet is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Data Sheet is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    India UX salary ranges by role, city, and sector. Sector hiring status. AI skill premiums. Interview questions to assess design maturity. Reflects September 2026 market conditions - updated quarterly.
                  </p>
                  <a href="https://docs.google.com/spreadsheets/d/1fxV4NkhZCgTL7CINjxhwdV0Zr8gsLiOXdKyCd5Yu5sI/edit" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Open the Data Sheet &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want an honest assessment of where you stand in this market? <a href="https://app.xperiencewave.com/book/dc-strategy-call" style="color: #FF0023; text-decoration: none;">Book a free strategy call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send salary data sheet confirmation email:', error);
      }
    }

    // Send confirmation email with download link for the agentic UX principles
    if (leadType === 'agentic-ux-principles') {
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
            subject: 'Your 10 Principles of Agentic UX Reference is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Principles Reference is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    All 10 principles of agentic UX with the specific design pattern for each, plus the three human involvement levels and when to use each. Print it and pull it up before your next agentic design review.
                  </p>
                  <a href="https://drive.google.com/file/d/1nxUs1Cd0MbhWke4H7gE6fE2aiV4LBJ5b/view" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Open the Reference &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Working on an agentic project and want to talk through the UX approach? <a href="https://app.xperiencewave.com/book/dc-strategy-call" style="color: #FF0023; text-decoration: none;">Book a free strategy call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send agentic UX principles confirmation email:', error);
      }
    }

    // Send confirmation email with download link for the workshop cheatsheet
    if (leadType === 'workshop-facilitation-cheatsheet') {
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
            subject: 'Your Workshop Facilitation Cheatsheet is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Cheatsheet is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    One page covering before, during, and after the workshop. The five moves, blocker-handling scripts, the summary template, and the three things you close with. Print it and keep it on your desk.
                  </p>
                  <a href="https://drive.google.com/file/d/1bvDER3xbyjh_NgLW1_2LZ94SPeLqN5Y_/view" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Open the Cheatsheet &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want to build your facilitation and leadership skills with a mentor? <a href="https://app.xperiencewave.com/book/dc-strategy-call" style="color: #FF0023; text-decoration: none;">Book a free strategy call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send workshop cheatsheet confirmation email:', error);
      }
    }

    // Send confirmation email with link for design team systems audit
    if (leadType === 'design-team-systems-audit') {
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
            subject: 'Your Design Team Systems Audit is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Audit is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    Score your design team's systems across 5 dimensions. 20 questions. 100 points.
                  </p>
                  <a href="https://www.xperiencewave.com/resources/tools/design-team-systems-audit" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Start Scoring &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want to discuss your results? <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="color: #FF0023; text-decoration: none;">Book a free training call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send audit confirmation email:', error);
      }
    }

    // Send confirmation email with link for salary negotiation GPT
    if (leadType === 'salary-negotiation-gpt') {
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
            subject: 'Your Salary Negotiation GPT is Ready',
            htmlContent: `
              <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');</style>
              <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
                <div style="text-align: center;">
                  <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #1A1A1A; font-size: 24px; font-weight: 700; margin: 0 0 12px;">
                    Your Salary Negotiation GPT is Ready
                  </h1>
                  <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                    Three modes: personalised coaching, script generator, and HR simulator. Built on the RIVER framework.
                  </p>
                  <a href="https://chatgpt.com/g/g-69cb92908a048191a028bf15615a8f17-salary-negotiation-for-ux-designers-xperience-wave" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                    Start Practising &rarr;
                  </a>
                </div>
                <div style="padding-top: 28px; margin-top: 28px; border-top: 1px solid #eee;">
                  <p style="color: #999999; font-size: 13px; line-height: 1.5; text-align: center; margin: 0 0 16px;">
                    Want to talk salary strategy with a mentor? <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="color: #FF0023; text-decoration: none;">Book a free strategy call</a>
                  </p>
                  <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                    Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (error) {
        console.error('Failed to send salary negotiation GPT confirmation email:', error);
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
