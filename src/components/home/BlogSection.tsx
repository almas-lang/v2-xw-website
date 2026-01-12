import Image from 'next/image';
import Link from 'next/link';

const blogs = [
  {
    title: 'AI-First Design: What Senior UX Designers Need',
    excerpt:
      'Learn how to transform your UX portfolio from a visual showcase into a strategic narrative that lands senior roles.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: '6 mins read',
    date: '01 Dec 2024',
    slug: 'ai-first-design-senior-ux',
  },
  {
    title: 'Transitioning from Designer to Design Leader',
    excerpt:
      'Moving into design leadership requires more than just great design skills. Learn the mindset shifts needed.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    readTime: '6 mins read',
    date: '01 Dec 2024',
    slug: 'designer-to-design-leader',
  },
  {
    title: "Why UX Courses Don't Get You Senior Roles",
    excerpt:
      'Discover why certificates and courses alone won\'t land you that senior position, and what actually works.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    readTime: '6 mins read',
    date: '01 Dec 2024',
    slug: 'why-courses-dont-work',
  },
];

export default function BlogSection() {
  return (
    <section className="bg-g100 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon text-center mb-10 md:mb-14">
          From Our Blog
        </h2>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={`/resources/blog/${blog.slug}`}
              className="group bg-white border border-g200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-g300"
              style={{ borderRadius: '6px' }}
            >
              {/* Image */}
              <div className="relative h-[180px] md:h-[200px] bg-g100 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Read Time Badge */}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-carbon text-xs font-medium px-3 py-1.5 rounded-md">
                  {blog.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-3 leading-tight group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>
                <p className="font-body text-sm md:text-base text-g600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="font-body text-sm text-g400">{blog.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Link */}
        <div className="text-center">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 font-heading font-semibold text-carbon hover:text-accent transition-colors underline underline-offset-4"
          >
            See All Wave Blogs
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
