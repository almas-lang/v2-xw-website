import { FreeTrainingPromo } from "@/components/shared/FreeTrainingPromo";

export const metadata = {
  title: "Promo Preview",
  robots: { index: false, follow: false },
};

export default function CheckPage() {
  const variants = [
    {
      key: "card" as const,
      label: "Variant A — Card",
      desc: "Soft, testimonial-led. Fits blog posts and long-form resource pages.",
    },
    {
      key: "strip" as const,
      label: "Variant B — Strip",
      desc: "Minimal, link-first. Good for homepage / between hero sections / program pages.",
    },
    {
      key: "split" as const,
      label: "Variant C — Split",
      desc: "Visual, conversion-led. Highest weight — end of blog posts or bottom of program pages.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
          Free Training Promo — Variants
        </h1>
        <p className="text-g600 mb-10">
          Preview of the inline component we want to insert across the site. Pick one.
        </p>

        {variants.map((v) => (
          <section key={v.key} className="mb-14">
            <h2 className="font-heading text-xl font-bold mb-1">{v.label}</h2>
            <p className="text-sm text-g500 mb-5">{v.desc}</p>

            <div className="grid md:grid-cols-[1fr_390px] gap-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-g500 mb-2">Desktop</p>
                <div className="border border-g200 rounded-lg p-4">
                  <FreeTrainingPromo variant={v.key} source={`check_${v.key}`} />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-g500 mb-2">Mobile (390px)</p>
                <div className="border border-g200 rounded-lg p-4 max-w-[390px]">
                  <FreeTrainingPromo variant={v.key} source={`check_${v.key}_m`} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
