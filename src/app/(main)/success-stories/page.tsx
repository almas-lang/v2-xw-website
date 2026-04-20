'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import TestimonialCarousel from '@/components/shared/TestimonialCarousel';
import WhatsAppWall, { WhatsAppScreenshot } from '@/components/success-stories/WhatsAppWall';
import ReferenceCheckCard from '@/components/success-stories/ReferenceCheckCard';

// ============================================
// DATA
// ============================================

const stats = [
  { value: '3000+', label: 'Designers Trained' },
  { value: '210+', label: 'Hired Through Us' },
  { value: '2x', label: 'Avg. Salary Hike' },
  { value: '90 days', label: 'Avg. Transformation' },
];

interface FeaturedStory {
  name: string;
  role: string;
  company: string;
  youtubeId: string;
}

const featuredStories: FeaturedStory[] = [
  {
    name: 'Pavitra Suji',
    role: 'Sr. Designer',
    company: 'McKinsey & Company',
    youtubeId: 'ozw4zab_gH0',
  },
  {
    name: 'Ashley Alemao',
    role: 'UX Designer',
    company: 'Millipixels',
    youtubeId: '9LurTodWb3Q',
  },
  {
    name: 'Vignesh',
    role: 'Sr. UX Designer',
    company: 'Siemens',
    youtubeId: 'H4R-ZVvCxvQ',
  },
];

const quickWins = [
  {
    achievement: 'Lead Product designer at a German startup',
    duration: 'In 3 months',
    name: 'Kritika Singh',
    image: '/images/Kritika Singh.jpeg',
    linkedin: 'https://www.linkedin.com/in/kritikasinghchauhan/',
  },
  {
    achievement: 'Lead Designer to Principal Designer at Informatica',
    duration: 'In 4 months',
    name: 'Radhakrishna A',
    image: '/images/Radhakrishna Aekbote.jpeg',
    linkedin: 'https://www.linkedin.com/in/radhakrishnaaekbote/',
  },
  {
    achievement: 'Sr. Designer to Design Lead at CX100',
    duration: 'In 2 months',
    name: 'Sheetal P',
    image: '/images/sheetal.png',
    linkedin: 'https://www.linkedin.com/in/sheetalpimparwar/',
  },
  {
    achievement: 'Sr. Lead Designer at Wongdoody',
    duration: 'In 2 months',
    name: 'Jonah Immanuel',
    image: '/images/Jonah_Immanuel.png',
    linkedin: 'https://www.linkedin.com/in/jonahimmanuel/',
  },
  {
    achievement: 'Assistant Manager at Isha Foundation',
    duration: 'In 3 months',
    name: 'Suril Pandya',
    image: '/images/suril.jpeg',
    linkedin: 'https://www.linkedin.com/in/suril-pandya-86964019/',
  },
  {
    achievement: 'Head of UX at Dot and Beyond',
    duration: 'In 4 months',
    name: 'Shahrukh Jamal',
    image: '/images/shah_rukh.jpeg',
    linkedin: 'https://www.linkedin.com/in/shahrukhjkhan/',
  },
  {
    achievement: 'Head of Design at Bob',
    duration: 'In 2 months',
    name: 'Pavan Muthyala',
    image: '/images/Pavan Mutyala.jpeg',
    linkedin: 'https://www.linkedin.com/in/pavan-muthyala/',
  },
  {
    achievement: 'Director at The Thinking Team',
    duration: 'In 3 months',
    name: 'Siva Karthik',
    image: '/images/siva_karthik.jpeg',
    linkedin: 'https://www.linkedin.com/in/sivakarthikvrimi/',
  },
  {
    achievement: 'Developer to Designer at Montran India',
    duration: 'In 4 months',
    name: 'Maitreyee Kane',
    image: '/images/Maitreyee-kane.jpeg',
    linkedin: 'https://www.linkedin.com/in/maitreyeekane/',
  },
  {
    achievement: 'Interior Designer to UX Designer at SenecaGlobal',
    duration: 'In 5 months',
    name: 'Divya Srinivas',
    image: '/images/Divya.jpeg',
    linkedin: 'https://www.linkedin.com/in/divya-srinivas-designs/',
  },
  {
    achievement: 'UI/UX Design Associate at JLL',
    duration: 'In 5 weeks',
    name: 'Akash Kale',
    image: '/images/Akash.jpeg',
    linkedin: 'https://www.linkedin.com/in/akuxdesigner/',
  },
  {
    achievement: 'UX Designer at Deloitte',
    duration: 'In 5 months',
    name: 'Ramesh Vatti',
    image: '/images/Ramesh.jpeg',
    linkedin: 'https://www.linkedin.com/in/ramesh-v-0631a6289/',
  },
];

const menteeWall = [
  { name: 'Suril Pandya', role: 'Assistant Manager at Isha Foundation', image: '/images/suril.jpeg' },
  { name: 'Shahrukh Jamal', role: 'Head of UX at Dot and Beyond', image: '/images/shah_rukh.jpeg' },
  { name: 'Pavan Muthyala', role: 'Head of Design at Bob', image: '/images/Pavan Mutyala.jpeg' },
  { name: 'Siva Karthik', role: 'Director at The Thinking Team', image: '/images/siva_karthik.jpeg' },
  { name: 'Kritika Singh', role: 'Lead Product designer at a German startup', image: '/images/Kritika Singh.jpeg' },
  { name: 'Radhakrishna A', role: 'Principal Designer at Informatica', image: '/images/Radhakrishna Aekbote.jpeg' },
  { name: 'Sheetal P', role: 'Design Lead at CX100', image: '/images/sheetal.png' },
  { name: 'Jonah Immanuel', role: 'Sr. Lead Designer at Wongdoody', image: '/images/Jonah_Immanuel.png' },
  { name: 'Divya Srinivas', role: 'UX Designer at SenecaGlobal', image: '/images/Divya.jpeg' },
  { name: 'Maitreyee Kane', role: 'Designer at Montran India', image: '/images/Maitreyee-kane.jpeg' },
  { name: 'Akash Kale', role: 'UI/UX Design Associate at JLL', image: '/images/Akash.jpeg' },
  { name: 'Ramesh Vatti', role: 'UX Designer at Deloitte', image: '/images/Ramesh.jpeg' },
  { name: 'Ashley', role: 'UX Designer', image: '/images/ashley.png' },
  { name: 'Navisha Fernando', role: 'UX Designer', image: '/images/Navisha Fernando.jpeg' },
  { name: 'Jerin John', role: 'UX Designer', image: '/images/Jerin John.jpeg' },
  { name: 'Sreekanth VK', role: 'UX Designer', image: '/images/Sreekanth VK.jpeg' },
  { name: 'Vikram Rajak', role: 'UX Designer', image: '/images/Vikram Rajak.jpeg' },
  { name: 'Abhishek', role: 'UX Designer', image: '/images/abhishek.jpeg' },
  { name: 'Vignesh', role: 'UX Designer', image: '/images/vignesh.jpeg' },
  { name: 'Shivangini', role: 'UX Designer', image: '/images/shivangini.jpeg' },
  { name: 'Vidhyasagar', role: 'UX Designer', image: '/images/Vidhyasagar.jpeg' },
  { name: 'Maulin Rajput', role: 'UX Designer', image: '/images/Maulin Rajput.jpeg' },
  { name: 'Utkarsh Choudhary', role: 'UX Designer', image: '/images/Utkarsh Choudhary.jpeg' },
  { name: 'Abhipsa Panda', role: 'UX Designer', image: '/images/Abhipsa Panda.jpeg' },
  { name: 'Aditya', role: 'UX Designer', image: '/images/Aditya.jpeg' },
  { name: 'Akshay Bhasme', role: 'UX Designer', image: '/images/Akshay Bhasme.jpeg' },
  { name: 'Anzar', role: 'UX Designer', image: '/images/Anzar .png' },
  { name: 'Arun Raja', role: 'UX Designer', image: '/images/Arun Raja.jpeg' },
  { name: 'Ashutosh Anand', role: 'UX Designer', image: '/images/Ashutosh Anand.jpeg' },
  { name: 'Aswin Kumar', role: 'UX Designer', image: '/images/Aswin kumar.png' },
  { name: 'Bavadharini', role: 'UX Designer', image: '/images/Bavadharini .png' },
  { name: 'Bethi Ravi Kiran', role: 'UX Designer', image: '/images/Bethi ravi kiran.png' },
  { name: 'Bharat Venugopal', role: 'UX Designer', image: '/images/Bharat venugopal.jpeg' },
  { name: 'Bhavana Gupta', role: 'UX Designer', image: '/images/Bhavana Gupta.jpeg' },
  { name: 'Chaitanya', role: 'UX Designer', image: '/images/Chaitanya.jpeg' },
  { name: 'Charusheela Dasari', role: 'UX Designer', image: '/images/Charusheela Dasari.jpeg' },
  { name: 'Eisa Ghaznavi', role: 'UX Designer', image: '/images/Eisa Ghaznavi.jpeg' },
  { name: 'Fatima', role: 'UX Designer', image: '/images/fatima.jpeg' },
  { name: 'Gopicca B R', role: 'UX Designer', image: '/images/Gopicca B R.jpeg' },
  { name: 'Hari Krishnaa S', role: 'UX Designer', image: '/images/Hari Krishnaa S.jpeg' },
  { name: 'Huseini Indorewala', role: 'UX Designer', image: '/images/Huseini Indorewala.jpeg' },
  { name: 'Madhura Gadade', role: 'UX Designer', image: '/images/Madhura Gadade.jpeg' },
  { name: 'Mahantesh Talegar', role: 'UX Designer', image: '/images/Mahantesh Talegar.jpeg' },
  { name: 'Padma', role: 'UX Designer', image: '/images/Padma .jpeg' },
  { name: 'Prasanna Kumar', role: 'UX Designer', image: '/images/Prasanna Kumar.jpeg' },
  { name: 'Pratika Chavan', role: 'UX Designer', image: '/images/Pratika chavan.jpeg' },
  { name: 'Priyanshi Vaishnav', role: 'UX Designer', image: '/images/Priyanshi Vaishnav.jpeg' },
  { name: 'Rahul Narayanswami', role: 'UX Designer', image: '/images/Rahul Narayanswami.png' },
  { name: 'Rajib Dutta', role: 'UX Designer', image: '/images/Rajib Dutta.jpeg' },
  { name: 'Ramya Navasiyam', role: 'UX Designer', image: '/images/Ramya Navasiyam.jpeg' },
  { name: 'Rishabh Tanwar', role: 'UX Designer', image: '/images/Rishabh tanwar.jpeg' },
  { name: 'Rishi Raj Sisodia', role: 'UX Designer', image: '/images/Rishi Raj Sisodia.jpeg' },
  { name: 'Roma Mistry', role: 'UX Designer', image: '/images/Roma Mistry.jpeg' },
  { name: 'Salil Pradhan', role: 'UX Designer', image: '/images/Salil Pradhan.jpeg' },
  { name: 'Sanjana Agarwal', role: 'UX Designer', image: '/images/Sanjana Agarwal.jpeg' },
  { name: 'Savinay', role: 'UX Designer', image: '/images/Savinay .jpeg' },
  { name: 'Shitanshu Mistry', role: 'UX Designer', image: '/images/Shitanshu Mistry.jpeg' },
  { name: 'Sowmya Rajshekar', role: 'UX Designer', image: '/images/Sowmya Rajshekar.jpeg' },
  { name: 'Suhail Yazdan', role: 'UX Designer', image: '/images/Suhail Yazdan.jpeg' },
  { name: 'Suresh', role: 'UX Designer', image: '/images/Suresh.jpeg' },
  { name: 'Sushita', role: 'UX Designer', image: '/images/Sushita.jpeg' },
  { name: 'Tanvi Kale', role: 'UX Designer', image: '/images/Tanvi Kale.jpeg' },
  { name: 'Vijay Sriramdas', role: 'UX Designer', image: '/images/Vijay Sriramdas.png' },
  { name: 'Zaman Bayezid', role: 'UX Designer', image: '/images/Zaman Bayezid.jpeg' },
];

const hiringManagerQuotes = [
  {
    quote: "Our designer from Xperience Wave reduced our checkout drop-off by 23% in their first quarter. They didn't just push pixels - they understood our conversion funnel and prioritized impact over aesthetics.",
    name: 'VP of Product',
    company: 'Series B E-commerce Platform',
  },
  {
    quote: "What impressed me was their ability to translate business metrics into design decisions. They proactively aligned with our OKRs and measured their work against revenue outcomes, not just design deliverables.",
    name: 'Chief Product Officer',
    company: 'Series A Fintech Startup',
  },
  {
    quote: "We needed someone who could influence product strategy, not just execute mockups. The designer we hired now leads cross-functional sprint planning and has become a key voice in our roadmap discussions.",
    name: 'Head of Product',
    company: 'Enterprise SaaS Company',
  },
];

const whatsappScreenshots: WhatsAppScreenshot[] = [
  { src: '/freetraining/testimonials/akash.png', alt: 'WhatsApp message from Akash Kale — got a 32% hike' },
  { src: '/freetraining/testimonials/maitreyee.png', alt: 'WhatsApp message from Maitreyee — offered UI/UX role at Montran' },
  { src: '/freetraining/testimonials/kritika2.png', alt: 'WhatsApp message from Kritika Singh — founding designer at a German AI startup' },
  { src: '/freetraining/testimonials/abhishek.png', alt: 'WhatsApp message from Abhishek Kandulna — UI/UX Designer at Kennect, Mumbai' },
];

// ============================================
// ICONS
// ============================================

const PlayIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
    <path d="M20 16L32 24L20 32V16Z" fill="white" />
  </svg>
);

const LinkedInIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CloseIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ============================================
// AVATAR
// ============================================

function Avatar({ name, image }: { name: string; image: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (imgError || !image) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-g200 to-g300 flex items-center justify-center">
        <span className="font-heading text-2xl font-bold text-g500">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setImgError(true)}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

// ============================================
// PAGE
// ============================================

export default function SuccessStoriesPage() {
  const [playingInline, setPlayingInline] = useState<string | null>(null);
  const setRef = (_id: string) => (_el: HTMLElement | null) => {};
  const fadeIn = (_id: string, _delay = 0) => undefined as React.CSSProperties | undefined;

  return (
    <main>
      {/* ============================================ */}
      {/* HERO + STATS */}
      {/* ============================================ */}
      <section
        ref={setRef('hero')}
        className="relative overflow-hidden bg-carbon text-white"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 30%, rgba(99,102,241,0.15) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 80% 70%, rgba(220,238,255,0.06) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 sm:py-24 md:py-28 lg:py-32 text-center">
          <div className="inline-flex items-center gap-3 mb-6" style={fadeIn('hero', 0)}>
            <div className="w-8 h-[2px] bg-indigo-400" />
            <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-indigo-300">
              Success Stories
            </span>
            <div className="w-8 h-[2px] bg-indigo-400" />
          </div>
          <h1
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
            style={fadeIn('hero', 100)}
          >
            Real transformations. Real careers.
          </h1>
          <p
            className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
            style={fadeIn('hero', 200)}
          >
            Designers who turned senior titles, leadership roles, and dream offers into reality &mdash;
            in their own words.
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto"
            style={fadeIn('hero', 300)}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHATSAPP WALL */}
      {/* ============================================ */}
      <section ref={setRef('whatsapp')} className="relative bg-white">
        <div className="max-w-[1200px] mx-auto px-5 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12 md:mb-16" style={fadeIn('whatsapp', 0)}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#25D366]" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-[#128C7E]">
                Unfiltered Messages
              </span>
              <div className="w-8 h-[2px] bg-[#25D366]" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
              Straight from their WhatsApp
            </h2>
            <p className="font-body text-sm md:text-base text-g500 max-w-xl mx-auto">
              The messages we wake up to &mdash; unedited, unscripted, and shared with permission.
            </p>
          </div>
          <div style={fadeIn('whatsapp', 150)}>
            <ReferenceCheckCard
              part1="/images/Review-part1.jpeg"
              part2="/images/Review-part2.jpeg"
            />
            <WhatsAppWall screenshots={whatsappScreenshots} />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO TESTIMONIALS */}
      {/* ============================================ */}
      <section ref={setRef('videos')} className="relative bg-g100">
        <div className="max-w-[1200px] mx-auto px-5 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12 md:mb-16" style={fadeIn('videos', 0)}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-indigo-500" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-indigo-500">
                Hear It From Them
              </span>
              <div className="w-8 h-[2px] bg-indigo-500" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
              In their own words
            </h2>
            <p className="font-body text-sm md:text-base text-g500 max-w-xl mx-auto">
              The designers who made the leap tell you exactly how it happened.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {featuredStories.map((story, i) => {
              const isPlaying = playingInline === story.name;
              return (
                <div
                  key={story.name}
                  className={`group ${isPlaying ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => !isPlaying && setPlayingInline(story.name)}
                  style={fadeIn('videos', 150 + i * 100)}
                >
                  <div className="relative rounded-2xl overflow-hidden border-2 border-g200 shadow-md transition-all duration-500 sm:hover:border-indigo-500/40 sm:hover:shadow-xl">
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                      {isPlaying ? (
                        <>
                          <iframe
                            src={`https://www.youtube.com/embed/${story.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`Testimonial from ${story.name}`}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingInline(null);
                            }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                            aria-label="Close video"
                          >
                            <CloseIcon className="w-4 h-4 text-white" />
                          </button>
                        </>
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${story.youtubeId}/maxresdefault.jpg`}
                            alt={story.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative sm:group-hover:scale-110 transition-transform duration-300">
                              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                              <PlayIcon size={48} />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                            <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1">
                              {story.name}
                            </h3>
                            <p className="font-body text-sm text-white/90">{story.role}</p>
                            <p className="font-body text-xs sm:text-sm text-white/70">{story.company}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* QUICK WINS */}
      {/* ============================================ */}
      <section ref={setRef('quickwins')} className="relative bg-white">
        <div className="max-w-[1200px] mx-auto px-5 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12 md:mb-16" style={fadeIn('quickwins', 0)}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-accent">
                Quick Wins
              </span>
              <div className="w-8 h-[2px] bg-accent" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
              Promotions and offers in months, not years
            </h2>
            <p className="font-body text-sm md:text-base text-g500 max-w-xl mx-auto">
              Verified wins &mdash; click through to their LinkedIn.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {quickWins.map((win, i) => (
              <a
                key={win.name}
                href={win.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={fadeIn('quickwins', 150 + i * 80)}
              >
                <div className="relative h-full p-5 sm:p-6 rounded-2xl border border-g200 bg-white shadow-sm transition-all duration-300 sm:hover:border-[#0A66C2]/40 sm:hover:shadow-lg">
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1.5 text-xs font-bold rounded-full"
                      style={{
                        color: '#FF0023',
                        backgroundColor: 'rgba(255, 0, 35, 0.1)',
                        border: '1px solid rgba(255, 0, 35, 0.2)',
                      }}
                    >
                      {win.duration}
                    </span>
                  </div>
                  <h4 className="font-heading text-base sm:text-lg font-bold text-carbon mb-5 leading-snug line-clamp-3">
                    {win.achievement}
                  </h4>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-g200 to-g300 ring-2 ring-g200 flex-shrink-0">
                        <img src={win.image} alt={win.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-body text-sm text-g600">{win.name}</span>
                    </div>
                    <div className="text-[#0A66C2] opacity-70 group-hover:opacity-100 transition-opacity">
                      <LinkedInIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MENTEE PHOTO WALL */}
      {/* ============================================ */}
      <section ref={setRef('wall')} className="relative bg-g100">
        <div className="max-w-[1200px] mx-auto px-5 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12 md:mb-16" style={fadeIn('wall', 0)}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-indigo-500" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-indigo-500">
                The Community
              </span>
              <div className="w-8 h-[2px] bg-indigo-500" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
              Faces behind the transformations
            </h2>
            <p className="font-body text-sm md:text-base text-g500 max-w-xl mx-auto">
              A snapshot of designers now shipping at product-led companies across the world.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2">
            {menteeWall.map((m, i) => (
              <div
                key={`${m.name}-${i}`}
                className="group relative rounded-lg overflow-hidden border border-g200 bg-white shadow-sm transition-all duration-300 sm:hover:shadow-md sm:hover:scale-[1.03] sm:hover:z-10"
                style={fadeIn('wall', 40 + i * 12)}
                title={`${m.name} — ${m.role}`}
              >
                <div className="relative aspect-square">
                  <Avatar name={m.name} image={m.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 translate-y-1 opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <p className="font-heading text-[11px] sm:text-xs font-bold text-white leading-tight truncate">{m.name}</p>
                    <p className="font-body text-[10px] text-white/80 leading-tight mt-0.5 line-clamp-1">{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HIRING MANAGER QUOTES */}
      {/* ============================================ */}
      <section ref={setRef('hiring')} className="relative bg-carbon overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-8 md:mb-12" style={fadeIn('hiring', 0)}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-indigo-400" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-indigo-300">
                From The Hiring Side
              </span>
              <div className="w-8 h-[2px] bg-indigo-400" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              What employers say about our designers
            </h2>
            <p className="font-body text-sm md:text-base text-white/60 max-w-xl mx-auto">
              Hiring managers who brought our mentees onto their teams.
            </p>
          </div>
          <div style={fadeIn('hiring', 150)}>
            <TestimonialCarousel testimonials={hiringManagerQuotes} />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section ref={setRef('cta')} className="relative bg-white">
        <div className="max-w-4xl mx-auto px-5 py-20 sm:py-24 md:py-28 text-center">
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-carbon mb-5 leading-tight"
            style={fadeIn('cta', 0)}
          >
            Ready to write your own story?
          </h2>
          <p
            className="font-body text-base sm:text-lg text-g500 max-w-xl mx-auto mb-10"
            style={fadeIn('cta', 100)}
          >
            Book a 15-minute strategy call. We&apos;ll show you exactly how the path looks for you.
          </p>
          <div style={fadeIn('cta', 200)}>
            <Button href="https://app.xperiencewave.com/book/dc-strategy-call" size="lg" showArrow>
              Book strategy call
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
