// Shared data across all programs

// Common steps for "How It Works" section - same for all programs
export const sharedProgramSteps = [
  {
    title: 'We Assess Where You Are',
    description: 'Your background, strengths, gaps, and goals. We build a personalised roadmap - no two plans are the same.',
    image: '/images/step1.png',
  },
  {
    title: 'Regular 1:1s With Your Success Manager',
    description: 'A design manager (10+ years experience) guides you through activities, reviews your work, and helps you navigate real challenges.',
    image: '/images/step2.png',
  },
  {
    title: 'Expert Clinics To Get Unstuck',
    description: 'Sessions for portfolio critiques, mock interviews, and skill deep-dives. Learn from peers too.',
    image: '/images/step3.png',
  },
  {
    title: 'Ongoing Support Until You Succeed',
    description: "Program manager available 6 days a week. We don't disappear after the sessions end.",
    image: '/images/step4.png',
  },
];

// Common "What's Included" items - same for all programs
export const sharedIncludedItems = [
  { text: 'Regular 1:1 online mentorship sessions' },
  { text: 'Offline workshop in Bangalore' },
  { text: 'Expert-led online clinics (Core Design, Systemic Foundations, Personal Branding)' },
  { text: 'Online exam-based globally recognised certification' },
  { text: 'Access to WaveAcademy - videos, activities, tools, and quizzes' },
  { text: 'WaveMakers Connect community access (2k+ members)' },
];

// Common tools used across all programs
export interface Tool {
  name: string;
  logo?: string;
  size?: 'small' | 'normal' | 'large' | 'xlarge';
}

export const sharedTools: Tool[] = [
  { name: 'Figma', logo: '/images/Figma-Logo.png' },
  { name: 'Survey Monkey', logo: '/images/SurveyMonkey.png' },
  { name: 'Microsoft Clarity', logo: '/images/microsoftclarity.png' },
  { name: 'Google Analytics', logo: '/images/Googleanalytics.png' },
  { name: 'ChatGPT', logo: '/images/ChatGPT.png' },
  { name: 'Miro', logo: '/images/Miro.png' },
  { name: 'Optimal Workshop', logo: '/images/Optimal Workshop.png' },
  { name: 'Google Workspace', logo: '/images/google workspace.png' },
  { name: 'Axure', logo: '/images/Axure.png' },
  { name: 'Flaticon', logo: '/images/Flaticon.png' },
  { name: 'Asana', logo: '/images/asana.png', size: 'large' },
  { name: 'Claude', logo: '/images/Claude.png' },
  { name: 'Google Trends', logo: '/images/google trends.png', size: 'large' },
  { name: 'Wix', logo: '/images/Wix.png' },
  { name: 'Loom', logo: '/images/Loom.png' },
  { name: 'Brevo', logo: '/images/Brevo.png' },
  { name: 'Pitch', logo: '/images/Pitch.png' },
  { name: 'Buffer', logo: '/images/Buffer.png' },
  { name: 'Notion', logo: '/images/Notion.png' },
  { name: 'Similarweb', logo: '/images/SimilarWeb.png' },
  { name: 'Uizard', logo: '/images/Uizard.png' },
  { name: 'Canva', logo: '/images/canva.png' },
  { name: 'Lyssna', logo: '/images/Lyssna.png' },
];
