import { Button } from './Button';

interface CTAProps {
  onClick: () => void;
  text?: string;
  variant?: 'primary' | 'secondary';
}

export function CTA({ onClick, text = "Get Started", variant = "primary" }: CTAProps) {
  return (
    <div className="text-center">
      <Button
        onClick={onClick}
        variant={variant}
        size="lg"
        className="shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {text}
      </Button>
    </div>
  );
}
