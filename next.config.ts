import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'stories.freepiklabs.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async redirects() {
    return [
      // Old WordPress URLs to new URLs
      // (trailing-slash variants removed — Next.js handles them automatically)
      { source: '/home', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/resources/blogs', permanent: true },
      { source: '/hire-from-us', destination: '/for-business/hire-ux-designers', permanent: true },
      { source: '/hire-designers', destination: '/for-business/hire-ux-designers', permanent: true },
      { source: '/xw-ux-workshop', destination: '/for-business/training-for-teams', permanent: true },
      { source: '/online-ux-design-course', destination: '/programs', permanent: true },
      { source: '/advanced-ux-program-for-mid-level-designers', destination: '/programs/senior-ux-designer-mentorship', permanent: true },

      // Old blog posts → published blog pages or blog listing
      { source: '/how-to-build-ux-design-portfolio-one-role', destination: '/resources/blogs/business-driven-ux-portfolio', permanent: true },
      { source: '/ux-portfolio-show-business-impact', destination: '/resources/blogs/business-driven-ux-portfolio', permanent: true },
      { source: '/build-ux-design-portfolio-for-recruiters-tips-from-ux-design-trainer', destination: '/resources/blogs/business-driven-ux-portfolio', permanent: true },
      { source: '/ux-design-portfolio-tips-dos-and-donts', destination: '/resources/blogs/7-second-portfolio-test', permanent: true },
      { source: '/how-midlevel-and-senior-ux-designers-stay-ahead', destination: '/resources/blogs/ai-first-design-senior-ux', permanent: true },
      { source: '/learn-how-midlevel-and-senior-ux-designers-stay-ahead', destination: '/resources/blogs/ai-first-design-senior-ux', permanent: true },
      { source: '/ai-in-ux-research-shaping-smarter-early-stage-design-decisions', destination: '/resources/blogs/ai-first-design-senior-ux', permanent: true },
      { source: '/ux-design-course-using-ux-research-for-smarter-product-decisions', destination: '/resources/blogs', permanent: true },

      // Old WordPress artifacts
      { source: '/hello-world', destination: '/', permanent: true },
      { source: '/product-category/:path*', destination: '/', permanent: true },
      { source: '/product/:path*', destination: '/programs', permanent: true },
      { source: '/author/:path*', destination: '/about', permanent: true },
      { source: '/portfolio-thank-you', destination: '/', permanent: true },

      // Common WordPress URLs that 404 — redirect to relevant pages
      { source: '/feed', destination: '/resources/blogs', permanent: true },
      { source: '/shop', destination: '/programs', permanent: true },
      { source: '/cart', destination: '/programs', permanent: true },
      { source: '/my-account', destination: '/', permanent: true },
      { source: '/checkout', destination: '/programs', permanent: true },
      { source: '/wp-sitemap.xml', destination: '/sitemap.xml', permanent: true },

      // SEO: consolidate /terms to /terms-of-service
      { source: '/terms', destination: '/terms-of-service', permanent: true },

      // Free Training LP legal pages → main site legal pages
      { source: '/freetraining/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/freetraining/terms', destination: '/terms-of-service', permanent: true },
      { source: '/freetraining/refund', destination: '/refund-policy', permanent: true },

      // Free Training funnel redirects (spec April 2026)
      { source: '/freetraining/getstarted', destination: '/freetraining#get-access', permanent: true },

      // Renamed / removed blog slugs (SEO audit Oct 2026: both were soft 404s with ~370 impressions)
      { source: '/resources/blogs/mixed-methods-research-ux-design', destination: '/resources/blogs/mixed-methods-ux-research-guide', permanent: true },
      { source: '/resources/blogs/transitioning-designer-to-design-leader', destination: '/resources/blogs/ic-to-manager-trap-designers', permanent: true },

      // Old landing-page subdomains. These only fire once the subdomain is added
      // to this Vercel project (DNS CNAME -> cname.vercel-dns.com, no domain-level
      // redirect). Specific ld. rules must stay above the ld. catch-all.
      { source: '/terms', has: [{ type: 'host', value: 'ld.xperiencewave.com' }], destination: 'https://xperiencewave.com/terms-of-service', permanent: true },
      { source: '/privacy', has: [{ type: 'host', value: 'ld.xperiencewave.com' }], destination: 'https://xperiencewave.com/privacy-policy', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'ld.xperiencewave.com' }], destination: 'https://xperiencewave.com/freetraining', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'webinar.xperiencewave.com' }], destination: 'https://xperiencewave.com/freetraining', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'uxcareerwebinar.xperiencewave.com' }], destination: 'https://xperiencewave.com/freetraining', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'leadthedesign.xperiencewave.com' }], destination: 'https://xperiencewave.com/programs/ux-leadership-mentorship', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'curve.xperiencewave.com' }], destination: 'https://xperiencewave.com/', permanent: true },
    ];
  },
};

export default withBotId(nextConfig);
