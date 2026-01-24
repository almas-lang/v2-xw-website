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
  { name: 'Figma', logo: '/images/logos/Figma-Logo.png' },
  { name: 'Survey Monkey', logo: '/images/logos/SurveyMonkey/SurveyMonkey_id_VusMEEN_0.svg' },
  { name: 'Microsoft Clarity', logo: '/images/logos/microsoft clarity.png' },
  { name: 'Google Analytics', logo: '/images/logos/GA.png' },
  { name: 'ChatGPT', logo: '/images/logos/ChatGPT/ChatGPT_Logo_0.svg' },
  { name: 'Miro', logo: '/images/logos/Miro/Miro_Miro_Logo_0.svg' },
  { name: 'Optimal Workshop', logo: '/images/logos/Optimal Workshop/Optimal Workshop_idymY4Wohb_0.png' },
  { name: 'Google Workspace', logo: '/images/logos/google workspace.png' },
  { name: 'Axure', logo: '/images/logos/Axure/Axure_idfodY-hiR_0.svg' },
  { name: 'Flaticons', logo: '/images/logos/Flaticon.png' },
  { name: 'Asana', logo: '/images/logos/asana.png', size: 'large' },
  { name: 'Claude', logo: '/images/logos/Claude/Claude_Logo_0.svg' },
  { name: 'Google Trends', logo: '/images/logos/google trends.png', size: 'large' },
  { name: 'Wix', logo: '/images/logos/Wix/Wix_idgFeSp_TO_0.svg' },
  { name: 'Loom', logo: '/images/logos/Loom/Loom_idPBQ1EdVH_0.svg' },
  { name: 'Brevo', logo: '/images/logos/Brevo/Brevo_idgQGSgZ6E_0.svg' },
  { name: 'Pitch', logo: '/images/logos/Pitch/Pitch_idJXbApN3u_0.svg' },
  { name: 'Buffer', logo: '/images/logos/Buffer/Buffer_Logo_0.svg' },
  { name: 'Notion', logo: '/images/logos/Notion/Notion_Logo_0.svg' },
  { name: 'Similarweb', logo: '/images/logos/SimilarWeb/SimilarWeb_idYIZV_-P8_0.svg' },
  { name: 'Uizard', logo: '/images/logos/Uizard.png' },
  { name: 'Canva', logo: '/images/logos/Canva/Canva_Logo_0.svg' },
  { name: 'Lyssna', logo: '/images/logos/Lyssna/Lyssna_idfVm9sb4y_0.png' },
];
