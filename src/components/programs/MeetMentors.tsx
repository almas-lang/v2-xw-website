import TeamGrid from '@/components/shared/TeamGrid';

const leadMentors = [
  {
    name: 'Shaik Murad Ahamed',
    role: 'Co-founder, Head of Design',
    experience: '13',
    companies: 'Credit Saison | Milaap | Yokogawa',
    focus: 'Design leadership & growth-based design',
    linkedin: 'https://linkedin.com/in/shaikmuradahamed',
    website: 'https://shaikmurad.com',
  },
  {
    name: 'Almas Tasneem',
    role: 'CEO & Co-founder',
    experience: '12',
    companies: 'Capgemini | CloudNuro',
    focus: 'Product design & brand strategy',
    linkedin: 'https://linkedin.com/in/almastasneem',
  },
];

const supportMentors = [
  {
    name: 'Rishik Jha',
    role: 'Design Lead',
    initials: 'RJ',
    linkedin: 'https://linkedin.com/in/rishikjha',
  },
  {
    name: 'Fatima Sultana',
    role: 'Agile Coach',
    initials: 'FS',
    linkedin: 'https://linkedin.com/in/fatimasultana',
  },
];

interface MeetMentorsProps {
  accentColor?: 'accent' | 'coral' | 'teal' | 'gold';
}

export default function MeetMentors({ accentColor = 'accent' }: MeetMentorsProps) {
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
        <p className="font-body text-base text-g500">
          + clinic leads and specialists for portfolio critiques, mock interviews, and skill deep-dives
        </p>
      }
      theme="dark"
      accentColor={accentColor}
    />
  );
}
