import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default function MentorshipEvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: '#030303' }}
    >
      {children}
      <WhatsAppButton />
    </div>
  );
}
