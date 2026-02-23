import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UX Training for Design Teams | Corporate Workshops | Xperience Wave',
  description:
    'Practical UX workshops for design teams. Leadership, research, design systems, AI. Half-day & full-day formats. In-person India or virtual. Custom for your gaps.',
  keywords: [
    'ux training for teams',
    'corporate ux training',
    'design team workshops',
    'ux leadership training',
    'custom ux curriculum',
    'design thinking workshop',
    'ux research training',
    'corporate design training india',
  ],
  openGraph: {
    title: 'UX Training for Design Teams | Corporate Workshops',
    description:
      'Practical UX workshops for design teams. Leadership, research, design systems, AI. Half-day & full-day formats. In-person India or virtual.',
    url: 'https://xperiencewave.com/for-business/training-for-teams',
  },
  alternates: {
    canonical: '/for-business/training-for-teams',
  },
};

export default function TrainingForTeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
