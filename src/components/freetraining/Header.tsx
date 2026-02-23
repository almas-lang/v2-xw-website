import Link from 'next/link';
import { ftPath } from '@/lib/freetraining/constants';

export function FTHeader() {
  return (
    <header className="bg-white top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <Link href={ftPath('/')} className="focus:outline-none focus:ring-2 focus:ring-ft-purple rounded">
          <img
            src="/freetraining/logo.png"
            alt="Xperience Wave"
            className="h-12 md:h-16"
          />
        </Link>
      </div>
    </header>
  );
}
