import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showArrow?: boolean;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  showArrow = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 font-heading font-semibold transition-all duration-300 rounded-md';

  const variants = {
    primary: 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg hover:shadow-accent/20',
    secondary: 'bg-white hover:bg-g100 text-carbon border border-g200',
    ghost: 'bg-transparent hover:bg-white/10 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 md:px-8 md:py-4 text-base md:text-lg',
    lg: 'px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl',
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {showArrow && (
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
      )}
    </Link>
  );
}
