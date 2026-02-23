import { ftContent } from '@/lib/freetraining/content';

export function FTFooter() {
  return (
    <footer className="bg-purple-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-gray-900 font-medium">{ftContent.footer.copyright}</p>
          <p className="text-gray-600 text-sm">{ftContent.footer.address}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href={ftContent.footer.links.privacy} className="text-ft-purple hover:text-purple-700 underline">
              Privacy policy
            </a>
            <a href={ftContent.footer.links.terms} className="text-ft-purple hover:text-purple-700 underline">
              Terms of Use
            </a>
            <a href={ftContent.footer.links.refund} className="text-ft-purple hover:text-purple-700 underline">
              Refund policy
            </a>
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <p>
              Write to{' '}
              <a href={`mailto:${ftContent.footer.email}`} className="text-ft-purple hover:text-purple-700 underline">
                {ftContent.footer.email}
              </a>
            </p>
            <p>
              Call{' '}
              <a href={`tel:${ftContent.footer.phone.replace(/\s/g, '')}`} className="text-ft-purple hover:text-purple-700 underline">
                {ftContent.footer.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
