import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import SoundFamiliar from "@/components/home/SoundFamiliar";
import HowItWorks from "@/components/home/HowItWorks";
import Programs from "@/components/home/Programs";
import WhyCoursesFailed from "@/components/home/WhyCoursesFailed";
import MentorshipComparison from "@/components/home/MentorshipComparison";
import MenteesWorkAt from "@/components/home/MenteesWorkAt";
import SuccessStories from "@/components/home/SuccessStories";
import BeyondMentorship from "@/components/home/BeyondMentorship";
import FAQ from "@/components/home/FAQ";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <SoundFamiliar />
      <HowItWorks />
      <WhyCoursesFailed />
      <MentorshipComparison />
      <MenteesWorkAt />
      <SuccessStories />
      <Programs />
      <BeyondMentorship />
      <FAQ />
      <BlogSection />
      <CTASection />
    </>
  );
}
