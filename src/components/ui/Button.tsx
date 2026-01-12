import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  showArrow = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 font-heading font-semibold transition-all duration-300';

  const variants = {
    primary: 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg hover:shadow-accent/20',
    secondary: 'bg-white hover:bg-g100 text-carbon border border-g200',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base',
    lg: 'px-6 py-3 md:px-8 md:py-4 text-base',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const arrow = showArrow && (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 256 256"
      fill="none"
      className="ml-1"
    >
      <path
        fill="currentColor"
        d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
      />
    </svg>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={combinedStyles} style={{ borderRadius: '6px' }}>
        {children}
        {arrow}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      style={{ borderRadius: '6px' }}
    >
      {children}
      {arrow}
    </button>
  );
}
