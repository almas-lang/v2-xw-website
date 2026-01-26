import TeamGrid from '@/components/shared/TeamGrid';

const leadMentors = [
  {
    name: 'Shaik Murad Ahamed',
    role: 'Co-founder, Head of Design',
    experience: '13',
    companies: 'Credit Saison | Milaap | Yokogawa',
    focus: 'Design leadership & growth-based design',
    linkedin: 'https://www.linkedin.com/in/shaikmurad/',
    website: 'https://shaikmurad.com',
    image: '/images/Murad.png',
  },
  {
    name: 'Almas Tasneem',
    role: 'CEO & Co-founder',
    experience: '12',
    companies: 'Capgemini | CloudNuro | GE',
    focus: 'Product design & brand strategy',
    linkedin: 'https://www.linkedin.com/in/almas-t/',
    image: '/images/almas.png',
    imagePosition: 'center 20%',
  },
];

const supportMentors = [
  {
    name: 'Rishik Jha',
    role: 'Design Lead',
    initials: 'RJ',
    linkedin: 'https://www.linkedin.com/in/rishik-jha/',
    image: '/images/rishik.jpg',
    imagePosition: 'center 5%',
  },
  {
    name: 'Fatima Sultana',
    role: 'Agile Coach',
    initials: 'FS',
    linkedin: 'https://www.linkedin.com/in/fatima-sultana/',
    image: '/images/fatima.jpeg',
  },
];

interface MeetMentorsProps {
  accentColor?: 'accent' | 'coral' | 'teal' | 'gold';
  theme?: 'dark' | 'dark-teal';
}

export default function MeetMentors({ accentColor = 'accent', theme = 'dark' }: MeetMentorsProps) {
  // Get the accent color hex for the title
  const accentHex = {
    accent: '#FF0023',
    coral: '#E85A4F',
    teal: '#4A90A4',
    gold: '#B8860B',
  }[accentColor];

  return (
    <TeamGrid
      subtitle="15+ Experts. 4 Lead Your Journey"
      title={
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          Meet Your <span style={{ color: accentHex }}>Core</span> Mentors
        </h2>
      }
      primaryLabel="Lead Mentors"
      primaryMembers={leadMentors}
      secondaryLabel="Support Mentors"
      secondaryMembers={supportMentors}
      footer={
        <p className="font-body text-base text-alice/60">
          + clinic leads and specialists for portfolio critiques, mock interviews, and skill deep-dives
        </p>
      }
      theme={theme}
      accentColor={accentColor}
    />
  );
}
