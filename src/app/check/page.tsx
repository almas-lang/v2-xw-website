'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ============================================
// COURSE DATA
// ============================================
const courses = [
  {
    id: 'design-strategy-course',
    title: 'Design Strategy for Product Designers',
    rating: '4.9',
    ratingCount: '1245',
    status: 'New',
    duration: '4 hours',
    originalPrice: '2,999',
    price: '1,999',
    discount: '33',
    learnings: [
      'Position design at the center of business growth',
      'Build strategic frameworks stakeholders buy into',
      'Tie design decisions to revenue and retention',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    id: 'ux-research-course',
    title: 'Mixed Methods UX Research: From Plan to Insights',
    rating: '4.8',
    ratingCount: '3832',
    status: 'New',
    duration: '6 hours',
    originalPrice: '2,499',
    price: '1,499',
    discount: '40',
    learnings: [
      'Combine qualitative and quantitative research effectively',
      'Plan, conduct, and synthesize research in real projects',
      'Present findings that drive product decisions',
    ],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    id: 'portfolio-course',
    title: 'Portfolio That Gets You Hired',
    rating: '4.9',
    ratingCount: '892',
    status: 'Coming soon',
    duration: '3 hours',
    originalPrice: '1,999',
    price: '999',
    discount: '50',
    learnings: [
      'Structure case studies hiring managers actually read',
      'Show impact with metrics (even under NDA)',
      'Avoid the 7 mistakes that kill interview chances',
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
  },
  {
    id: 'design-system-course',
    title: 'Build a Practical Design System (Fast)',
    rating: '4.8',
    ratingCount: '1156',
    status: 'Coming soon',
    duration: '8 hours',
    originalPrice: '2,999',
    price: '1,999',
    discount: '33',
    learnings: [
      'Set up tokens, components, and documentation that scales',
      'Ship consistent UI without slowing down your team',
      'Avoid over-engineering — build only what you need',
    ],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
];

const StarIcon = ({ className = "w-4 h-4 text-yellow-500" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ============================================
// OPTION A - BRUTALIST
// ============================================
function OptionA() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="border-8 border-black mb-8 p-4">
          <span className="font-mono text-xs">SECTION_02</span>
          <h2 className="font-mono text-3xl md:text-4xl font-black uppercase">
            Learn UX Skills.<br />Self-Paced Courses.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border-4 border-black">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className={`border-2 border-black p-0 ${index % 2 === 0 ? 'bg-yellow-300' : 'bg-white'}`}>
                <div className="aspect-video relative border-b-4 border-black">
                  <Image src={course.image} alt={course.title} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                  <span className="absolute top-0 right-0 bg-black text-white font-mono text-xs px-3 py-1 uppercase">
                    {course.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-mono text-lg font-black uppercase mb-2">{course.title}</h3>
                  <div className="font-mono text-xs mb-4 flex gap-4">
                    <span>★ {course.rating}</span>
                    <span>{course.duration}</span>
                  </div>
                  <ul className="font-mono text-xs space-y-1 mb-4">
                    {course.learnings.map((item, i) => (
                      <li key={i}>→ {item}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div className="font-mono">
                      <span className="line-through text-xs">₹{course.originalPrice}</span>
                      <span className="text-xl font-black ml-2">₹{course.price}</span>
                    </div>
                    <button className={`font-mono text-sm font-bold px-4 py-2 border-4 border-black ${isAvailable ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-gray-300'} transition-colors`}>
                      {isAvailable ? 'ENROLL' : 'SOON'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION B - EDITORIAL / MAGAZINE
// ============================================
function OptionB() {
  return (
    <section className="bg-[#FAFAF8] py-24">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-gray-400">Self-Paced Learning</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mt-3 italic">
            Learn UX Skills
          </h2>
          <div className="w-24 h-px bg-gray-300 mx-auto mt-6" />
        </div>

        <div className="space-y-16">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            const isEven = index % 2 === 0;
            return (
              <article key={course.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] relative rounded-sm overflow-hidden">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-sm uppercase tracking-widest">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-xs uppercase tracking-widest text-amber-600">{course.duration} • {course.rating} ★</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mt-2 mb-4">{course.title}</h3>
                  <ul className="space-y-2 text-gray-600 text-sm mb-6">
                    {course.learnings.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-amber-600">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-gray-400 line-through text-sm">₹{course.originalPrice}</span>
                      <span className="text-2xl font-light text-gray-900 ml-2">₹{course.price}</span>
                    </div>
                    <button className={`text-sm uppercase tracking-wider ${isAvailable ? 'text-gray-900 underline underline-offset-4 hover:text-amber-600' : 'text-gray-400'} transition-colors`}>
                      {isAvailable ? 'Enroll Now →' : 'Notify Me'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION C - GLASSMORPHISM / DARK
// ============================================
function OptionC() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs uppercase tracking-widest border border-white/20">
            Self-Paced Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-6">
            Learn UX Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className="group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all">
                <div className="aspect-video relative">
                  <Image src={course.image} alt={course.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${isAvailable ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
                    {course.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/80 text-sm">{course.rating}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60 text-sm">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                  <ul className="space-y-1.5 mb-5">
                    {course.learnings.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/40 line-through text-sm">₹{course.originalPrice}</span>
                      <span className="text-2xl font-bold text-white ml-2">₹{course.price}</span>
                      <span className="text-cyan-400 text-sm ml-2">({course.discount}% off)</span>
                    </div>
                    <button className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isAvailable ? 'bg-cyan-500 text-white hover:bg-cyan-400' : 'bg-white/10 text-white/60'}`}>
                      {isAvailable ? 'Enroll' : 'Notify'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION D - NEO-MINIMALIST
// ============================================
function OptionD() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[800px] mx-auto px-5">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight">
            Self-paced
            <br />
            <span className="font-medium">UX courses</span>
          </h2>
        </div>

        <div className="space-y-0">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className="group py-8 border-t border-gray-200 last:border-b">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex items-start gap-6 flex-1">
                    <span className="text-sm text-gray-400 font-mono pt-1">{String(index + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                        {!isAvailable && <span className="text-xs text-gray-400 uppercase tracking-wider">Soon</span>}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{course.duration} • {course.rating} rating</p>
                      <div className="hidden group-hover:block transition-all">
                        <ul className="space-y-1 text-sm text-gray-600">
                          {course.learnings.map((item, i) => (
                            <li key={i}>· {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="mb-2">
                      <span className="text-gray-400 line-through text-sm">₹{course.originalPrice}</span>
                      <span className="text-xl font-medium text-gray-900 ml-2">₹{course.price}</span>
                    </div>
                    <button className={`text-sm ${isAvailable ? 'text-gray-900 underline underline-offset-4' : 'text-gray-400'}`}>
                      {isAvailable ? 'Enroll →' : 'Notify me'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION E - BENTO GRID
// ============================================
function OptionE() {
  return (
    <section className="bg-[#f5f5f5] py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wider">Courses</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Learn UX Skills</h2>
          </div>
          <p className="text-gray-600 max-w-xs text-right hidden md:block">Self-paced, practical courses to build skills that get you hired</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            const isLarge = index === 0 || index === 3;
            return (
              <div key={course.id} className={`${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''} bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow`}>
                <div className={`relative ${isLarge ? 'aspect-square' : 'aspect-video'}`}>
                  <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${isAvailable ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {course.status}
                    </span>
                    <h3 className={`font-bold text-white ${isLarge ? 'text-2xl' : 'text-lg'}`}>{course.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-white/80 text-sm">
                      <span>★ {course.rating}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
                {isLarge && (
                  <div className="p-6">
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      {course.learnings.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-green-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-400 line-through">₹{course.originalPrice}</span>
                        <span className="text-2xl font-bold text-gray-900 ml-2">₹{course.price}</span>
                      </div>
                      <button className={`px-6 py-3 rounded-xl font-semibold ${isAvailable ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500'} transition-colors`}>
                        {isAvailable ? 'Enroll Now' : 'Coming Soon'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION F - CARDS WITH TABS
// ============================================
function OptionF() {
  const [activeTab, setActiveTab] = useState('all');
  const filteredCourses = activeTab === 'all' ? courses :
    activeTab === 'available' ? courses.filter(c => c.status !== 'Coming soon') :
    courses.filter(c => c.status === 'Coming soon');

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Learn UX Skills</h2>
          <p className="text-slate-600">Self-paced courses to accelerate your design career</p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'available', label: 'Available Now' },
            { id: 'upcoming', label: 'Coming Soon' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all group">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 shrink-0">
                    <div className="aspect-video sm:aspect-square relative h-full">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {course.status}
                      </span>
                      <span className="text-slate-400 text-xs">{course.duration}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                      <StarIcon className="w-4 h-4 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-300">•</span>
                      <span>{course.ratingCount} ratings</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 line-through text-sm">₹{course.originalPrice}</span>
                        <span className="text-xl font-bold text-slate-900 ml-1">₹{course.price}</span>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAvailable ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        {isAvailable ? 'Enroll' : 'Notify'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION G - DARK LUXURY
// ============================================
function OptionG() {
  return (
    <section className="bg-[#0a0a0a] py-24">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-500 text-xs uppercase tracking-[0.4em]">Premium Courses</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Learn UX <span className="text-amber-500 italic">Skills</span>
          </h2>
        </div>

        <div className="space-y-6">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className="group bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 shrink-0 relative">
                    <div className="aspect-video md:aspect-auto md:h-full relative">
                      <Image src={course.image} alt={course.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
                    </div>
                    <span className="absolute top-4 left-4 text-amber-500/60 text-xs uppercase tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-8 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-light text-white">{course.title}</h3>
                      <span className={`px-3 py-1 text-xs uppercase tracking-wider ${isAvailable ? 'text-amber-500 border border-amber-500/30' : 'text-zinc-500 border border-zinc-700'}`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-5">
                      <span className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-amber-500" />
                        {course.rating}
                      </span>
                      <span>{course.ratingCount} reviews</span>
                      <span>{course.duration}</span>
                    </div>
                    <ul className="grid md:grid-cols-3 gap-2 mb-6">
                      {course.learnings.map((item, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-5 border-t border-zinc-800">
                      <div>
                        <span className="text-zinc-600 line-through">₹{course.originalPrice}</span>
                        <span className="text-2xl text-white ml-3">₹{course.price}</span>
                        <span className="text-amber-500 text-sm ml-2">{course.discount}% off</span>
                      </div>
                      <button className={`px-6 py-3 rounded-lg font-medium transition-all ${isAvailable ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {isAvailable ? 'Enroll Now' : 'Coming Soon'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION H - PLAYFUL CARDS
// ============================================
function OptionH() {
  return (
    <section className="bg-gradient-to-b from-violet-50 to-pink-50 py-20 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-violet-100 text-violet-600 rounded-full text-sm font-medium mb-4">🎓 Self-Paced</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Learn UX <span className="text-violet-600">Skills</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            const colors = ['bg-yellow-400', 'bg-cyan-400', 'bg-pink-400', 'bg-green-400'];
            return (
              <div
                key={course.id}
                className={`${colors[index]} rounded-3xl p-1 transform hover:-rotate-1 hover:scale-[1.02] transition-all`}
                style={{ boxShadow: '8px 8px 0 0 rgba(0,0,0,0.1)' }}
              >
                <div className="bg-white rounded-[20px] overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    <div className={`absolute top-4 right-4 ${colors[index]} px-3 py-1 rounded-full text-xs font-bold text-black`}>
                      {course.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(Number(course.rating)) ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{course.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">⏱️ {course.duration}</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">📊 {course.ratingCount} students</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-gray-400 line-through text-sm">₹{course.originalPrice}</span>
                        <span className="text-2xl font-black text-gray-900 ml-2">₹{course.price}</span>
                      </div>
                      <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${isAvailable ? `${colors[index]} text-black hover:brightness-110` : 'bg-gray-200 text-gray-500'}`}>
                        {isAvailable ? 'Enroll! 🚀' : 'Soon ⏰'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION I - INDUSTRIAL
// ============================================
function OptionI() {
  return (
    <section className="bg-[#e8e8e8] py-20">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="border-b-2 border-black pb-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-gray-600">SECT.COURSES</span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-black uppercase">
                Learn UX Skills
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-500">{courses.length} ITEMS</span>
          </div>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => {
            const isAvailable = course.status !== 'Coming soon';
            return (
              <div key={course.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                <div className="flex">
                  <div className="w-20 md:w-32 bg-black text-white flex items-center justify-center font-mono text-2xl font-bold shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="w-48 md:w-64 shrink-0 border-l-2 border-r-2 border-black relative">
                    <div className="aspect-video relative">
                      <Image src={course.image} alt={course.title} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 ${isAvailable ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}`}>
                          {course.status}
                        </span>
                        <h3 className="font-mono text-lg font-bold uppercase mt-2">{course.title}</h3>
                        <p className="font-mono text-xs text-gray-600 mt-1">
                          {course.duration} • ★ {course.rating} ({course.ratingCount})
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">
                          <span className="text-xs line-through text-gray-400">₹{course.originalPrice}</span>
                          <span className="text-xl font-bold ml-2">₹{course.price}</span>
                        </div>
                        <button className={`mt-2 font-mono text-xs px-4 py-2 border-2 border-black ${isAvailable ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-gray-200 text-gray-500'} transition-colors`}>
                          {isAvailable ? 'ENROLL →' : 'NOTIFY'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// OPTION J - SPLIT SCREEN
// ============================================
function OptionJ() {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const course = courses[selectedCourse];
  const isAvailable = course.status !== 'Coming soon';

  return (
    <section className="bg-white min-h-[80vh]">
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Left - Course List */}
        <div className="lg:w-1/2 bg-gray-50 p-8 lg:p-12">
          <div className="mb-8">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Self-Paced</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">UX Courses</h2>
          </div>

          <div className="space-y-3">
            {courses.map((c, index) => (
              <button
                key={c.id}
                onClick={() => setSelectedCourse(index)}
                className={`w-full text-left p-5 rounded-2xl transition-all ${selectedCourse === index ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs uppercase tracking-wider ${selectedCourse === index ? 'text-gray-400' : 'text-gray-500'}`}>
                      {c.status}
                    </span>
                    <h3 className="font-semibold mt-1">{c.title}</h3>
                    <p className={`text-sm mt-1 ${selectedCourse === index ? 'text-gray-400' : 'text-gray-500'}`}>
                      {c.duration} • ★ {c.rating}
                    </p>
                  </div>
                  <span className="text-xl font-bold">₹{c.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Selected Course Detail */}
        <div className="lg:w-1/2 relative">
          <div className="aspect-video lg:aspect-auto lg:absolute lg:inset-0">
            <Image src={course.image} alt={course.title} fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
            <div className="p-8 lg:p-12 text-white">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${isAvailable ? 'bg-green-500' : 'bg-orange-500'}`}>
                {course.status}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h3>
              <ul className="space-y-2 mb-6">
                {course.learnings.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-white/50 line-through">₹{course.originalPrice}</span>
                  <span className="text-3xl font-bold ml-2">₹{course.price}</span>
                  <span className="text-green-400 ml-2">{course.discount}% off</span>
                </div>
                <button className={`px-8 py-4 rounded-xl font-bold transition-all ${isAvailable ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white/20 text-white'}`}>
                  {isAvailable ? 'Enroll Now' : 'Coming Soon'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function CheckPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="bg-carbon text-white py-12 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Short Courses Section - Design Variations</h1>
          <p className="text-white/60">10 distinct aesthetic directions for &quot;Learn UX Skills. Self-Paced Courses&quot;</p>
        </div>
      </div>

      {/* Option A */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option A</span> — Brutalist
          </div>
        </div>
        <OptionA />
      </div>

      {/* Option B */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option B</span> — Editorial / Magazine
          </div>
        </div>
        <OptionB />
      </div>

      {/* Option C */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option C</span> — Glassmorphism / Dark
          </div>
        </div>
        <OptionC />
      </div>

      {/* Option D */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option D</span> — Neo-Minimalist
          </div>
        </div>
        <OptionD />
      </div>

      {/* Option E */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option E</span> — Bento Grid
          </div>
        </div>
        <OptionE />
      </div>

      {/* Option F */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option F</span> — Cards with Tabs
          </div>
        </div>
        <OptionF />
      </div>

      {/* Option G */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option G</span> — Dark Luxury
          </div>
        </div>
        <OptionG />
      </div>

      {/* Option H */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option H</span> — Playful Cards
          </div>
        </div>
        <OptionH />
      </div>

      {/* Option I */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option I</span> — Industrial
          </div>
        </div>
        <OptionI />
      </div>

      {/* Option J */}
      <div className="border-b-8 border-accent">
        <div className="bg-carbon text-white py-4 px-5">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-accent font-bold">Option J</span> — Split Screen Interactive
          </div>
        </div>
        <OptionJ />
      </div>
    </main>
  );
}
