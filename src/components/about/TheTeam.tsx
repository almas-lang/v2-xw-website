import TeamGrid from '@/components/shared/TeamGrid';

const founders = [
  {
    name: 'Almas Tasneem',
    role: 'CEO & Co-founder',
    linkedin: 'https://linkedin.com/in/almastasneem',
    website: 'https://almastasneem.com',
    image: '/images/almas.png',
    imagePosition: 'center 20%',
    color: '#E85A4F', // Coral
  },
  {
    name: 'Shaik Murad',
    role: 'Head of Product & Co-founder',
    linkedin: 'https://linkedin.com/in/shaikmurad',
    website: 'https://shaikmurad.com',
    image: '/images/Murad.png',
    color: '#4A90A4', // Teal
  },
];

const advisors = [
  {
    name: 'Fatima Sultana',
    role: 'Product & Leadership Advisor',
    linkedin: 'https://linkedin.com/in/fatimasultana',
    initials: 'FS',
  },
  {
    name: 'Rishik Jha',
    role: 'Design Consultant',
    linkedin: 'https://linkedin.com/in/rishikjha',
    initials: 'RJ',
  },
  {
    name: 'Ankit Sharma',
    role: 'Tech Consultant',
    linkedin: 'https://linkedin.com/in/ankitsharma',
    initials: 'AS',
  },
];

export default function TheTeam() {
  return (
    <TeamGrid
      subtitle="The People Behind Xperience Wave"
      title={
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          Meet The <span className="text-[#D4A853]">Team</span>
        </h2>
      }
      primaryLabel="Founders"
      primaryMembers={founders}
      secondaryLabel="Advisors"
      secondaryMembers={advisors}
      footer={
        <p className="font-body text-base text-g500">
          We&apos;re a tight-knit team that moves fast and cares deeply.{' '}
          <span className="text-white font-medium">Want to join us?</span>
        </p>
      }
      theme="dark"
      accentColor="gold"
    />
  );
}
