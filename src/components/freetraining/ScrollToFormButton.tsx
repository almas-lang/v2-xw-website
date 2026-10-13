'use client';

/** Smooth-scrolls to the #get-access lead form. */
export function scrollToLeadForm() {
  document.getElementById("get-access")?.scrollIntoView({ behavior: "smooth" });
}

export function ScrollToFormButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={scrollToLeadForm} className={className}>
      {children}
    </button>
  );
}
