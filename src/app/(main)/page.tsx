import Hero from "@/components/home/Hero";
import Stats from "@/components/shared/Stats";
import VideoSection from "@/components/home/VideoSection";
import SoundFamiliar from "@/components/home/SoundFamiliar";
import HowItWorks from "@/components/home/HowItWorks";
import Programs from "@/components/home/Programs";
import WhyCoursesFailed from "@/components/home/WhyCoursesFailed";
import MentorshipComparison from "@/components/home/MentorshipComparison";
import MenteesWorkAt from "@/components/shared/MenteesWorkAt";
import SuccessStories from "@/components/shared/SuccessStories";
import JoinConversation from "@/components/shared/JoinConversation";
import FAQ from "@/components/shared/FAQ";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/shared/CTASection";
import { FreeTrainingPromo } from "@/components/shared/FreeTrainingPromo";

const homeFaqs = [
  {
    question: "How is this different from UX courses or bootcamps?",
    answer: "Courses teach the same curriculum to hundreds of people. We assess YOUR specific gaps and build a curated plan just for you. Plus, you get 1:1 mentorship - not just pre-recorded videos and generic feedback.",
  },
  {
    question: "How long does the mentorship take?",
    answer: "The core program is 90 days. Some mentees land roles in 5 weeks, others take 3 months. It depends on your starting point, target role, and how much effort you put in.",
  },
  {
    question: "Do you guarantee I'll get a job?",
    answer: "No one can honestly guarantee jobs - market conditions, individual effort, and timing all play a role. What we guarantee is dedicated mentorship, honest feedback, and a structured path. 80% of our mentees have achieved their career goals.",
  },
  {
    question: "What if I don't achieve my goal in 90 days?",
    answer: "We don't abandon you at day 90. We continue working together based on your progress and needs.",
  },
  {
    question: "How much does it cost?",
    answer: "Pricing depends on the program and your goals. Book a strategy call and we'll discuss what makes sense for your situation.",
  },
  {
    question: "Is this online or offline?",
    answer: "Mentorship is fully online - 1:1 video calls, clinics, reviews, and async support. You can be anywhere.",
  },
  {
    question: "Why should I get this mentorship today, not tomorrow?",
    answer: "Your next promotion cycle, your next job opening, your next opportunity - they won't wait. The sooner you fix your gaps, the sooner you're ready when the right role appears.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats theme="horizontal-light" />
      <VideoSection />
      <SoundFamiliar />
      <HowItWorks />
      <WhyCoursesFailed />
      <MentorshipComparison />
      <MenteesWorkAt />
      <SuccessStories />
      <section className="bg-white py-8 md:py-12 px-5">
        <div className="max-w-3xl mx-auto">
          <FreeTrainingPromo variant="card" source="homepage" />
        </div>
      </section>
      <Programs />
      <JoinConversation heading="Beyond Mentorship" />
      <FAQ faqs={homeFaqs} theme="default" />
      <BlogSection />
      <CTASection />
    </>
  );
}
