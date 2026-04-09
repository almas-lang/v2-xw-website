import Link from 'next/link';

interface FreeTrainingCTAProps {
  text: string;
}

/**
 * Purple left-border CTA box for blog posts, linking to /freetraining.
 * Per spec: stands out from blog text but doesn't feel like a banner ad.
 */
export function FreeTrainingCTA({ text }: FreeTrainingCTAProps) {
  return (
    <div className="my-8 border-l-4 border-[#6C63FF] bg-[#F6F5FF] rounded-r-lg px-5 py-4">
      <Link
        href="/freetraining"
        className="text-[15px] md:text-base font-medium text-[#6C63FF] hover:text-[#5B53E6] transition-colors leading-relaxed"
      >
        {text} →
      </Link>
    </div>
  );
}
