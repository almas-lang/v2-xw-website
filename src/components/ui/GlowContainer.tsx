import { ReactNode } from 'react';

type GlowColor = 'red' | 'alice' | 'white';

interface GlowContainerProps {
  children: ReactNode;
  color?: GlowColor;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

const colorStyles: Record<GlowColor, { background: string; border: string }> = {
  red: {
    background: 'linear-gradient(135deg, rgba(255,0,35,0.1) 0%, rgba(255,0,35,0.04) 50%, rgba(255,0,35,0.08) 100%)',
    border: '1px solid rgba(255,0,35,0.2)',
  },
  alice: {
    background: 'linear-gradient(135deg, rgba(220,238,255,0.12) 0%, rgba(220,238,255,0.05) 50%, rgba(220,238,255,0.1) 100%)',
    border: '1px solid rgba(220,238,255,0.25)',
  },
  white: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
};

const paddingStyles = {
  sm: 'px-4 py-3 md:px-6 md:py-4',
  md: 'px-6 py-5 md:px-10 md:py-6',
  lg: 'px-8 py-6 md:px-12 md:py-8',
};

export default function GlowContainer({
  children,
  color = 'white',
  className = '',
  padding = 'md',
}: GlowContainerProps) {
  const { background, border } = colorStyles[color];

  return (
    <div
      className={`${paddingStyles[padding]} ${className}`}
      style={{
        background,
        border,
        borderRadius: '6px',
      }}
    >
      {children}
    </div>
  );
}
