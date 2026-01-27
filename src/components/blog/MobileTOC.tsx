'use client';

import { useState } from 'react';

interface TOCItem {
  id: string;
  title: string;
}

interface MobileTOCProps {
  items: TOCItem[];
}

export default function MobileTOC({ items }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="lg:hidden">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-carbon text-white rounded-full shadow-lg flex items-center justify-center hover:bg-carbon/90 transition-colors z-40"
        aria-label="Open table of contents"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Slide-up Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[70vh] overflow-auto"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="sticky top-0 bg-white border-b border-g200 p-4 flex items-center justify-between">
              <h3 className="font-bold text-carbon">Table of Contents</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-snow rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-base text-g700 hover:text-accent flex items-start gap-3 py-2 transition-colors"
                    >
                      <span className="text-g400 font-medium">{i + 1}.</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
