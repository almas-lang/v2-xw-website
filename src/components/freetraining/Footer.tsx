import { ftContent } from '@/lib/freetraining/content';

export function FTFooter() {
  return (
    <footer className="bg-ft-footer-bg py-4">
      <div className="container mx-auto px-4 text-center space-y-1">
        <p className="text-[12px] text-[#66666E]">{ftContent.footer.copyright}</p>
        <div className="flex items-center justify-center gap-2 text-[12px] text-[#66666E]">
          <a href={ftContent.footer.links.privacy} className="hover:text-gray-400 transition-colors">
            Privacy
          </a>
          <span>|</span>
          <a href={ftContent.footer.links.terms} className="hover:text-gray-400 transition-colors">
            Terms
          </a>
          <span>|</span>
          <a href={ftContent.footer.links.refund} className="hover:text-gray-400 transition-colors">
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
