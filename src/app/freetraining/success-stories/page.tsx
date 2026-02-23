'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ftPath } from '@/lib/freetraining/constants';

export default function SuccessStoriesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const linkedInTestimonials = [
    { name: "Sheetal Pimparwar", role: "Design lead at CX100", duration: "in 2 months", image: "/freetraining/testimonials/sheetal.png" },
    { name: "Kritika Singh", role: "Lead UX Designer at Synduct, Germany", duration: "in 3 months", image: "/freetraining/testimonials/kritika.png" },
    { name: "Jerin John", role: "Sr. Product Designer at CGI", duration: "in 1.5 months", image: "/freetraining/testimonials/jerin.png" },
    { name: "Shreekanth", role: "Sr. UX Designer at Wipro", duration: "in 5 weeks", image: "/freetraining/testimonials/shreekanth.png" },
    { name: "Maulin Rajput", role: "Sr.UX Designer at Augmented.Ai", duration: "in 90 days", image: "/freetraining/testimonials/maulin.png" },
    { name: "Jonah Immanuel", role: "Sr. Lead Designer at Infosys", duration: "in 2 months", image: "/freetraining/testimonials/jonah.png" },
  ];

  return (
    <div className="flex-1 bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href={ftPath("/")} className="inline-flex items-center text-ft-purple hover:text-purple-700 font-semibold mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">Success Stories</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">See how designers like you landed senior roles with 2X salary in 90 days</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-items-center">
          {[
            { src: "/freetraining/testimonials/akash.png", alt: "Akash testimonial" },
            { src: "/freetraining/testimonials/maitreyee.png", alt: "Maitreyee testimonial" },
          ].map((img) => (
            <div key={img.alt} className="w-full max-w-sm"><img src={img.src} alt={img.alt} className="w-full h-auto" style={{ aspectRatio: '9/16', objectFit: 'contain' }} /></div>
          ))}
          {[
            { src: "/freetraining/testimonials/kritika2.png", alt: "Kritika testimonial" },
            { src: "/freetraining/testimonials/abhishek.png", alt: "Abhishek testimonial" },
          ].map((img) => (
            <div key={img.alt} className="w-full max-w-sm"><img src={img.src} alt={img.alt} className="w-full h-auto" style={{ aspectRatio: '9/16', objectFit: 'contain' }} /></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {linkedInTestimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gray-100"><img src={t.image} alt={`${t.name} LinkedIn profile`} className="w-full h-full object-cover" /></div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.name}</h3>
                <p className="text-gray-700 text-lg mb-1">{t.role}</p>
                <p className="text-ft-red font-semibold text-base">{t.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
