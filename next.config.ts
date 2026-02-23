import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
  async redirects() {
    return [
      // Old WordPress URLs to new URLs
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/resources/blogs', permanent: true },
      { source: '/blogs/', destination: '/resources/blogs', permanent: true },
      { source: '/hire-from-us', destination: '/for-business/hire-ux-designers', permanent: true },
      { source: '/hire-from-us/', destination: '/for-business/hire-ux-designers', permanent: true },
      { source: '/online-ux-design-course', destination: '/programs', permanent: true },
      { source: '/online-ux-design-course/', destination: '/programs', permanent: true },
      { source: '/advanced-ux-program-for-mid-level-designers', destination: '/programs/senior-ux-designer-mentorship', permanent: true },
      { source: '/advanced-ux-program-for-mid-level-designers/', destination: '/programs/senior-ux-designer-mentorship', permanent: true },

      // Old blog posts to new blog section or relevant pages
      { source: '/how-to-build-ux-design-portfolio-one-role', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/how-to-build-ux-design-portfolio-one-role/', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/ux-portfolio-show-business-impact', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/ux-portfolio-show-business-impact/', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/build-ux-design-portfolio-for-recruiters-tips-from-ux-design-trainer', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/build-ux-design-portfolio-for-recruiters-tips-from-ux-design-trainer/', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/ux-design-portfolio-tips-dos-and-donts', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/ux-design-portfolio-tips-dos-and-donts/', destination: '/resources/blogs/portfolio-mistakes-designers-make', permanent: true },
      { source: '/how-midlevel-and-senior-ux-designers-stay-ahead', destination: '/resources/blogs/break-into-senior-ux-roles-2026', permanent: true },
      { source: '/how-midlevel-and-senior-ux-designers-stay-ahead/', destination: '/resources/blogs/break-into-senior-ux-roles-2026', permanent: true },
      { source: '/learn-how-midlevel-and-senior-ux-designers-stay-ahead', destination: '/resources/blogs/break-into-senior-ux-roles-2026', permanent: true },
      { source: '/learn-how-midlevel-and-senior-ux-designers-stay-ahead/', destination: '/resources/blogs/break-into-senior-ux-roles-2026', permanent: true },
      { source: '/ai-in-ux-research-shaping-smarter-early-stage-design-decisions', destination: '/resources/blogs/ai-changing-ux-design', permanent: true },
      { source: '/ai-in-ux-research-shaping-smarter-early-stage-design-decisions/', destination: '/resources/blogs/ai-changing-ux-design', permanent: true },
      { source: '/ux-design-course-using-ux-research-for-smarter-product-decisions', destination: '/resources/blogs/user-research-budget', permanent: true },
      { source: '/ux-design-course-using-ux-research-for-smarter-product-decisions/', destination: '/resources/blogs/user-research-budget', permanent: true },

      // Old WordPress artifacts - redirect to homepage
      { source: '/hello-world', destination: '/', permanent: true },
      { source: '/hello-world/', destination: '/', permanent: true },
      { source: '/product-category/:path*', destination: '/', permanent: true },
      { source: '/product/:path*', destination: '/programs', permanent: true },
      { source: '/author/:path*', destination: '/about', permanent: true },
      { source: '/portfolio-thank-you', destination: '/', permanent: true },
      { source: '/portfolio-thank-you/', destination: '/', permanent: true },

      // Trailing slash normalization for policy pages
      { source: '/refund-policy/', destination: '/refund-policy', permanent: true },
      { source: '/privacy-policy/', destination: '/privacy-policy', permanent: true },

      // Free Training LP legal pages → main site legal pages
      { source: '/freetraining/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/freetraining/terms', destination: '/terms-of-service', permanent: true },
      { source: '/freetraining/refund', destination: '/refund-policy', permanent: true },
    ];
  },
};

export default nextConfig;
