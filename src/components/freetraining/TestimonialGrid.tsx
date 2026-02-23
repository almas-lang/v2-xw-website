import Link from 'next/link';
import { ftPath } from '@/lib/freetraining/constants';

export function TestimonialGrid() {

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
          <div className="w-full max-w-sm">
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
              <img src="/freetraining/testimonials/akash.png" alt="Akash Kale testimonial - Got 32% hike" className="w-full h-auto" style={{ aspectRatio: '9/16', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="w-full max-w-sm">
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
              <img src="/freetraining/testimonials/maitreyee.png" alt="Maitreyee testimonial - UI/UX Designer at Montran" className="w-full h-auto" style={{ aspectRatio: '9/16', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="w-full max-w-sm">
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
              <img src="/freetraining/testimonials/shreekanth.png" alt="Shreekanth testimonial" className="w-full h-auto" style={{ aspectRatio: '9/16', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {[
            { name: "Sheetal Pimparwar", role: "Design lead at CX100", duration: "in 2 months", image: "/freetraining/testimonials/sheetal.png" },
            { name: "Kritika Singh", role: "Lead UX Designer at Synduct, Germany", duration: "in 3 months", image: "/freetraining/testimonials/kritika.png" },
            { name: "Jerin John", role: "Sr. Product Designer at CGI", duration: "in 1.5 months", image: "/freetraining/testimonials/jerin.png" },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 md:h-64 bg-gray-100">
                <img src={t.image} alt={`${t.name} LinkedIn profile`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{t.name}</h3>
                <p className="text-gray-700 text-base md:text-lg mb-1">{t.role}</p>
                <p className="text-ft-red font-semibold text-sm md:text-base">{t.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href={ftPath("/success-stories")} className="text-ft-red hover:text-red-600 font-semibold text-xl inline-flex items-center gap-2">
            See all success stories &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
