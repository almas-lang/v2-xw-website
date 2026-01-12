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
      url: "https://xperiencewave.com/images/xw-logo.png",
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

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://xperiencewave.com/#course",
    name: "90-Day UX Accelerator Program",
    description:
      "Personalized 1:1 UX design mentorship program to help mid-level designers break into senior and leadership roles within 90 days.",
    provider: {
      "@type": "EducationalOrganization",
      "@id": "https://xperiencewave.com/#organization",
    },
    educationalLevel: "Professional",
    audience: {
      "@type": "Audience",
      audienceType: "UX/UI/Product Designers with 2+ years experience",
    },
    teaches: [
      "Portfolio Development",
      "Interview Preparation",
      "Salary Negotiation",
      "Design Leadership",
      "AI-first Design Approach",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: [
        {
          "@type": "Person",
          name: "Almas Tasneem",
        },
        {
          "@type": "Person",
          name: "Shaik Murad",
        },
      ],
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://xperiencewave.com/#webpage",
    url: "https://xperiencewave.com/",
    name: "1:1 UX Design Mentorship for Senior & Leadership Roles | Xperience Wave",
    description:
      "Break into senior UX roles in 90 days with personalized 1:1 mentorship. Stop wasting time on generic courses. Get expert guidance on portfolio, interviews & salary negotiation.",
    isPartOf: {
      "@id": "https://xperiencewave.com/#website",
    },
    about: {
      "@id": "https://xperiencewave.com/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://xperiencewave.com/images/og-image.jpg",
    },
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
    potentialAction: {
      "@type": "SearchAction",
      target: "https://xperiencewave.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://xperiencewave.com/",
      },
    ],
  };

  // FAQ Schema - helps with rich snippets in Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is this different from UX design courses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike courses that offer generic pre-recorded content, our 1:1 mentorship is personalized to your specific gaps, experience level, and career goals. You get live sessions, direct feedback on your portfolio, and accountability - not certificates that hiring managers ignore.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this mentorship for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This is for UX/UI/Product designers with 2+ years of experience who feel stuck at the same level, keep getting rejected for senior roles, or want to transition into design leadership. If you've tried courses and they haven't worked, this is your next step.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most of our mentees land their target roles within 90 days. Our 90-Day Accelerator program is specifically designed to get you interview-ready and confident within that timeframe, with 80%+ of participants achieving their goals.",
        },
      },
      {
        "@type": "Question",
        name: "What if I don't get results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer continued support until you achieve your goals. Unlike courses where you're on your own after completion, we stay with you through the job search process, interview preparation, and even salary negotiation.",
        },
      },
      {
        "@type": "Question",
        name: "How do the 1:1 sessions work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sessions are conducted via video call and scheduled based on your availability. Each session is tailored to your current challenges - whether that's portfolio reviews, mock interviews, or strategic career guidance.",
        },
      },
    ],
  };

  // Review/Testimonial Schema - social proof for search results
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Xperience Wave 1:1 UX Mentorship",
    description: "Personalized 1:1 UX design mentorship for senior and leadership roles",
    brand: {
      "@type": "Brand",
      name: "Xperience Wave",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "87",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Pavitra Suji",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: "Landed my dream role as Sr. Designer at McKinsey & Company within 3 months of joining the program.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Kritika Singh",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: "Became Lead Product Designer at a German startup in just 3 months. The personalized approach made all the difference.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Radhakrishna A",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: "Promoted from Lead Designer to Principal Designer at Informatica in 4 months. Highly recommended!",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}
