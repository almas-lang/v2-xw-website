/**
 * Site-wide structured data: Organization + WebSite. Rendered on the homepage
 * only. Per-page schema (Course on programs, BlogPosting on posts) lives with
 * the page. Legal pages carry none. The old sitewide Course + Product/Review
 * markup was removed in Oct 2026: Course markup on every page reads as spam to
 * Google, and self-serving review markup is against its guidelines.
 */
export default function SchemaOrg() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://xperiencewave.com/#organization",
    name: "Xperience Wave",
    alternateName: "XW",
    url: "https://xperiencewave.com",
    logo: {
      "@type": "ImageObject",
      url: "https://xperiencewave.com/images/logos/xw-logo-light.png",
      width: 200,
      height: 60,
    },
    description:
      "1:1 UX Design Mentorship helping mid-level designers break into senior and leadership roles in 90 days.",
    foundingDate: "2022",
    founders: [
      {
        "@type": "Person",
        name: "Almas Tasneem",
        jobTitle: "CEO & Co-founder",
        sameAs: [
          "https://www.linkedin.com/in/almas-t/",
          "https://www.instagram.com/almas_tasneem/",
        ],
      },
      {
        "@type": "Person",
        name: "Shaik Murad",
        jobTitle: "Head of Product & Design, Co-founder",
        sameAs: [
          "https://www.linkedin.com/in/shaikmurad/",
          "https://www.instagram.com/shaik_murad_ahamed",
        ],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "328, Ground Floor, AECS Layout, B Block, Singasandra",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560068",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8147706841",
      contactType: "customer service",
      email: "hello@xperiencewave.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/company/xperiencewave/",
      "https://www.instagram.com/xperiencewave/",
      "https://www.youtube.com/@xperiencewave",
      "https://twitter.com/xperiencewave",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://xperiencewave.com/#website",
    url: "https://xperiencewave.com/",
    name: "Xperience Wave",
    description: "1:1 UX Design Mentorship for Senior & Leadership Roles",
    publisher: {
      "@id": "https://xperiencewave.com/#organization",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
