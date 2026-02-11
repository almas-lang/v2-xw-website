import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getPublishedPosts, getCategoryLabel, getCategoryColor, formatDate } from '@/data/blogPosts';
import CTASection from '@/components/shared/CTASection';
import MobileTOC from '@/components/blog/MobileTOC';

// Blog content with internal links for SEO
const blogContent: Record<string, React.ReactNode> = {
  'ai-first-design-senior-ux': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        The design industry is undergoing its most significant transformation since the shift from print to digital. AI isn&apos;t just another tool in your toolkit. It&apos;s fundamentally reshaping how we approach design problems, collaborate with stakeholders, and deliver value to organizations.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-8">
        For senior UX designers, this shift presents both a challenge and an unprecedented opportunity. Those who adapt will accelerate their careers; those who don&apos;t risk becoming obsolete. Here&apos;s what you need to know to stay ahead.
      </p>

      <h2 id="ai-first-mindset" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The AI-First Design Mindset
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI-first design isn&apos;t about replacing human creativity. It&apos;s about amplifying it. Senior designers who thrive in this new landscape understand that AI tools like ChatGPT, Claude, and Midjourney are collaborators, not competitors. They use AI to handle repetitive tasks, generate initial concepts, and analyze user research at scale, freeing themselves to focus on strategic thinking and high-impact decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The mindset shift is critical: instead of asking &quot;How do I do this task?&quot; you should ask &quot;What&apos;s the best way to achieve this outcome, and which parts can AI accelerate?&quot; This reframing separates designers who merely use AI tools from those who think AI-first.
      </p>

      <h2 id="core-ai-skills" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Core AI Skills Every Senior Designer Needs
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        To remain competitive in today&apos;s market, senior UX designers must develop proficiency in several key areas:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Prompt Engineering:</strong> The ability to craft precise prompts that generate useful outputs. This is becoming as essential as knowing Figma shortcuts.</li>
        <li><strong>AI-Assisted Research:</strong> Using AI to synthesize user interviews, analyze survey data, and identify patterns across large datasets in minutes rather than days.</li>
        <li><strong>Generative Design Exploration:</strong> Leveraging AI to rapidly explore design directions, generate variations, and break creative blocks.</li>
        <li><strong>AI-Native Prototyping:</strong> Building prototypes that incorporate AI features like personalization, predictive interfaces, and conversational UI.</li>
        <li><strong>Ethical AI Design:</strong> Understanding bias, transparency, and responsible AI principles to design systems that are fair and trustworthy.</li>
      </ul>

      <h2 id="role-changes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How AI Changes the Senior Designer&apos;s Role
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        With AI handling more execution-level work, senior designers are shifting toward higher-value activities. Your role increasingly becomes about:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Strategic Problem Framing:</strong> Defining the right problems to solve, something AI cannot do autonomously.</li>
        <li><strong>Quality Curation:</strong> Evaluating AI outputs, selecting the best directions, and refining them with human judgment.</li>
        <li><strong>Stakeholder Translation:</strong> Bridging the gap between AI capabilities and business needs, explaining what&apos;s possible and what isn&apos;t.</li>
        <li><strong>Design System Governance:</strong> Ensuring AI-generated designs maintain brand consistency and accessibility standards.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This evolution is why <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">senior UX mentorship programs</Link> now emphasize strategic thinking and leadership alongside technical skills.
      </p>

      <h2 id="designing-ai-products" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Designing AI-Powered Products
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Beyond using AI in your workflow, you&apos;ll increasingly design products that incorporate AI features. This requires understanding:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>How to design for uncertainty and probabilistic outputs</li>
        <li>Creating appropriate feedback loops and user control mechanisms</li>
        <li>Balancing automation with human agency</li>
        <li>Communicating AI limitations without eroding user trust</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Companies are actively seeking designers who can navigate these challenges. It&apos;s a key differentiator when competing for senior and lead positions.
      </p>

      <h2 id="ai-first-portfolio" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Building Your AI-First Portfolio
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your portfolio should demonstrate AI fluency in concrete ways:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Include case studies that show AI-assisted research or ideation processes</li>
        <li>Document how you&apos;ve designed AI-powered features with appropriate user controls</li>
        <li>Showcase projects where you balanced AI efficiency with human-centered outcomes</li>
        <li>Demonstrate critical thinking about when AI is and isn&apos;t appropriate</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hiring managers increasingly look for this evidence. A portfolio that shows AI sophistication signals that you&apos;re future-ready.
      </p>

      <h2 id="leadership-advantage" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Leadership Advantage
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For those eyeing <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">design leadership roles</Link>, AI literacy is becoming non-negotiable. Design directors and VPs need to:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Set AI strategy for their design teams</li>
        <li>Evaluate and implement AI tools across workflows</li>
        <li>Navigate the ethical implications of AI-driven design decisions</li>
        <li>Communicate AI&apos;s impact on design capacity and velocity to executives</li>
      </ul>

      <h2 id="taking-action" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Taking Action Today
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who will thrive aren&apos;t waiting for AI to stabilize. They&apos;re experimenting now. Start by integrating AI into one part of your workflow this week. Use it for competitive analysis, user research synthesis, or generating design system documentation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re serious about accelerating your transition to senior roles in this AI-driven landscape, generic courses won&apos;t cut it. You need personalized guidance that accounts for your specific situation, portfolio gaps, and career goals.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        That&apos;s exactly what <Link href="/programs" className="text-accent hover:underline font-medium">our 1:1 mentorship programs</Link> provide, an AI-first curriculum combined with experienced mentors who&apos;ve navigated this transition themselves.
      </p>
    </>
  ),
  'why-courses-dont-get-leadership-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve spent years mastering your craft. You lead projects, mentor juniors, and deliver consistently. Yet the Director and VP roles keep going to others. Here&apos;s the uncomfortable truth about why courses won&apos;t help.
      </p>

      <h2 id="leadership-gap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Leadership Gap Courses Can&apos;t Fill
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At the leadership level, design skills are table stakes. What separates design managers from design executives is an entirely different skillset that no course can teach: executive presence, organizational influence, and the ability to position design as a business driver.
      </p>

      <h2 id="director-requirements" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Director and VP Roles Actually Require
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Companies hiring design leaders look for people who can:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Build and scale high-performing design teams</li>
        <li>Navigate executive politics and influence C-suite decisions</li>
        <li>Translate design impact into business metrics</li>
        <li>Establish design infrastructure and maturity</li>
        <li>Represent design at the leadership table</li>
        <li>Create a vision that aligns design with company strategy</li>
      </ul>

      <h2 id="personal-brand" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Personal Brand Factor
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this level, your reputation precedes you. Executive roles often come through networks, speaking engagements, and industry recognition. Building this presence takes strategic, personalized effort - not generic course content.
      </p>

      <h2 id="why-mentorship" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Mentorship Works for Leadership
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship with someone who has navigated the path to design leadership provides what courses cannot: personalized guidance on your specific situation, organization, and goals. A mentor can help you identify blind spots, build executive presence, and strategically position yourself for the roles you want.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re a senior designer ready to lead at scale, explore our <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">design leadership mentorship program</Link>.
      </p>
    </>
  ),
  'why-courses-dont-get-good-roles': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve watched the YouTube tutorials. Completed Coursera courses. Built portfolio projects. Yet you&apos;re not getting callbacks. Here&apos;s what&apos;s really going on.
      </p>

      <h2 id="course-trap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Course Trap for Career Switchers
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses are designed to teach concepts to thousands of people at once. They don&apos;t know your background, your transferable skills, or what specific gaps are holding you back. For career switchers, this generic approach is particularly harmful because you need guidance on positioning your unique experience.
      </p>

      <h2 id="hiring-managers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Hiring Managers Actually Look For
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When companies hire junior designers, they&apos;re not just looking for Figma skills. They want to see:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Clear design thinking and problem-solving approach</li>
        <li>Ability to communicate design decisions</li>
        <li>Coachability and willingness to learn</li>
        <li>A portfolio that tells stories, not just shows screens</li>
        <li>Understanding of how design connects to business goals</li>
      </ul>

      <h2 id="experience-asset" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Your Previous Experience is an Asset
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Whether you come from marketing, development, sales, or any other field - your background gives you a unique perspective. The key is learning to position it as a strength, not hiding it.
      </p>

      <h2 id="mentorship-difference" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Mentorship Difference
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 mentorship addresses what courses cannot. A mentor who has hired designers can tell you exactly what&apos;s missing from your portfolio, how to position your career switch story, and what specific skills to develop based on the roles you&apos;re targeting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        If you&apos;re serious about breaking into UX design, check out our <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">career transition mentorship program</Link>.
      </p>
    </>
  ),
  'why-courses-dont-work': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        I&apos;m going to say something that might sting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That CUA certificate from HFI? That completion badge from Designerrs or NextLeap? That shiny credential from a program partnered with IITs or NIDs?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It&apos;s sitting on your LinkedIn profile doing absolutely nothing for your career.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I know this because I hear it every single week. Designers walk into strategy calls with us and say the same thing in different ways:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;I completed CUA, CXA. I did a full program with Designerrs. I even did a Master&apos;s-level course with an IIT. And I still can&apos;t land a well-paying job.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;Interviewers don&apos;t even consider my certificates relevant for the role I&apos;m applying to.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;I have 5 years of development experience before I moved into UX, and employers still want me to start from a free internship or take an associate role with a massive pay cut.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        And the one that keeps coming back, over and over:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;All courses teach the same thing. I almost feel like I know everything I&apos;m supposed to know. But I still don&apos;t know where I&apos;m going wrong, and I never found the forum to even check.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That last one? That&apos;s the real indictment. Not of the designer. Of the entire course industry.
      </p>

      <h2 id="dirty-secret" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Dirty Secret About UX Design Courses
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s what course providers won&apos;t tell you, because their business model depends on you not realising it:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Their curriculum doesn&apos;t care about you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Think about it. Say you came from a graphic design background with 6+ years of experience. You join a cohort. Sitting next to you is a fresh engineering graduate who&apos;s never opened Figma. Next to them is someone from a medical background exploring a career switch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The course treats all three of you the same.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Same modules. Same assignments. Same pace. Same evaluation. Same certificate at the end.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody checked what you already knew. Nobody asked about your learning style. Nobody cared that your 6 years of visual design experience meant you needed strategic depth, not another wireframing tutorial. They just shoved the same curriculum at you, a curriculum that was probably written by someone who hasn&apos;t updated it to match where the industry is actually heading.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They&apos;ll tell you proudly: &quot;We&apos;ve trained 1,000+ designers.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What they won&apos;t tell you is how many of those designers actually landed senior roles. Because if you check the success ratio honestly, you&apos;d be looking at maybe less than 10%.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The rest? They paid, they attended, they got a certificate they could upload to LinkedIn. And that&apos;s where it ended. Their salaries didn&apos;t change. Their positions didn&apos;t change. Their ability to drive decisions in their organisations didn&apos;t change. The only thing that changed? Their imposter syndrome got worse. Because now they had a certificate that was supposed to fix things, and it didn&apos;t.
      </p>

      <h2 id="certificates-reality" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Those Certificates Actually Gave You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me be direct: a pile of certificates that collects dust.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve seen designers leave jobs after completing a course because they genuinely believed the certificate would automatically attract better offers. It didn&apos;t. Nothing happened. Because the market doesn&apos;t care about what you completed. It cares about what you can do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here&apos;s the tragedy. Courses set wrong expectations. They make you think the problem is knowledge. That if you just learn one more framework, one more methodology, you&apos;ll finally break through.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But knowledge was never the problem. Not for someone with 2, 3, 5+ years of experience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The problem is application. Context. And the gap between what courses teach you should happen and what actually happens inside real organisations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ll give you a concrete example. Courses teach ethnographic studies as though every company has the budget, time, and resources to run them. Students learn it, get excited, go back to their organisations, and discover that their company can&apos;t afford or justify an ethnographic study. The designer feels defeated. &quot;I&apos;m not doing what I&apos;m supposed to be doing.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        No. That organisation simply can&apos;t benefit from that specific method. Your job as a senior designer isn&apos;t to follow a textbook process. It&apos;s to read the room and adapt. But no course teaches you that. Because how do you teach 50–60 people in a batch to read their specific room? You don&apos;t. You just teach everyone the same thing and hope for the best.
      </p>

      <h2 id="senior-demands" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Senior Roles Actually Demand (That You&apos;re Not Preparing For)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I talk to hiring managers regularly. I&apos;ve been in those rooms. And I can tell you, mid-level designers preparing for senior roles are almost always preparing for the wrong things.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They&apos;re focused on building a louder voice in meetings. Getting more domain knowledge. Talking about accessibility. Building Figma-based design systems.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These are basics. Necessary, sure. But they&apos;re table stakes, not differentiators.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        What actually separates a senior UX designer from a mid-level one is far less glamorous and far harder to fake:
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li><strong>Systemic thinking.</strong> Can you zoom out from the screen you&apos;re designing and see how it fits into a larger product ecosystem, a business strategy, a user&apos;s broader journey? Can you connect dots across teams and timelines?</li>
        <li><strong>Vision beyond design.</strong> Senior designers don&apos;t just execute a design direction. They set it. They articulate a vision that&apos;s bigger than the interface. They drive alignment across product, engineering, and business stakeholders on why a direction matters.</li>
        <li><strong>Stakeholder management.</strong> Not just presenting to stakeholders. Managing them. Knowing when to push back, when to compromise, when to reframe the conversation entirely. Being someone whose name alone builds confidence that the work will be delivered well, before you&apos;ve even started.</li>
        <li><strong>Process ownership.</strong> Team maturity, knowledge management, UX writing, pi-deep knowledge across disciplines. These aren&apos;t nice-to-haves at the senior level. They&apos;re expected. And no pre-recorded module will develop them in you.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you&apos;re interested in where the industry is heading on this, especially around <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-first design</Link> and what senior UX designers need, that&apos;s a separate conversation, but an important one. The designers landing the best roles right now aren&apos;t just good at traditional UX. They understand how AI is reshaping what design means.
      </p>

      <h2 id="savinays-story" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Moves the Needle: Savinay&apos;s Story
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me tell you about Savinay. 8 years of experience. Knew his craft. But when he walked in, he was confident about core design, strategy, secondary research, ideation, revisions on top of revisions, and dismissed everything else as unrealistic.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;Primary research doesn&apos;t actually happen, Almas.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;Strategy building? That&apos;s not for people like us.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He wasn&apos;t wrong about what he&apos;d experienced. He&apos;d spent 8 years in environments where that was the reality. And he blamed the culture. Most designers do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But here&apos;s what changed. Once we sat down, understood his specific situation, and started working through a personalised plan, his perception shifted completely. Right after the planning stage, he started taking charge. Of processes. Of the people around him. Of stakeholder management.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The shift wasn&apos;t about teaching him something new. It was about repositioning what he already knew, and unlocking what he&apos;d dismissed as &quot;not for people like us.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Can a course structured for mass delivery do this? A course that runs the same slides for 50 people in a batch, answers questions for 60 minutes, and moves on to the next cohort?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        No way.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This kind of shift happens when someone spends time learning your situation and carves an outlet specifically for you. That&apos;s what <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">1:1 UX design mentorship</Link> is built to do. Not more content. Not another curriculum. A curated intervention.
      </p>

      <h2 id="question-to-ask" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Question You Should Be Asking Yourself
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Forget courses for a second. Forget certificates. Ask yourself one honest question:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Why did you want to learn UX in the first place?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Was it to be part of some cohort? To collect another certificate? Or was it to achieve something real, a bigger position, better pay, the ability to lead, to be recognised, to drive decisions that matter?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Because if it&apos;s the latter, then another course isn&apos;t the answer. It never was.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What you need is clarity on what&apos;s specifically blocking you. Not what&apos;s blocking a generic persona in a curriculum. You.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We&apos;ve worked with 140+ designers 1:1, helping them land roles at JP Morgan, McKinsey, Intel, Deloitte, Siemens. Check out their <Link href="/success-stories" className="text-accent hover:underline font-medium">success stories</Link>. The ones who got there fastest weren&apos;t the most talented. They were the ones who stopped buying courses and started getting honest about their gaps.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re at that point, <Link href="https://calendly.com/team-xperiencewave/xw-strategy" className="text-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">book a free strategy call</Link>. We&apos;ll assess where you are, what&apos;s blocking you, and whether we can help. If we can&apos;t, you&apos;ll still walk away with clarity. No pitch, no obligations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And if you&apos;re earlier in your journey, genuinely transitioning into UX for the first time, a structured program makes sense. Our <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">career transition program (Ripple)</Link> exists for exactly that.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But if you&apos;ve done the courses, got the certificates, and nothing&apos;s changed? You already know what isn&apos;t working. Time to try what does.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re interested in <Link href="/resources/blogs/designer-to-design-leader" className="text-accent hover:underline font-medium">transitioning into design leadership</Link>, that&apos;s an entirely different conversation, one where our <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">design leadership mentorship (Tide)</Link> comes in.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        For more unfiltered conversations about design careers, listen to the <Link href="/podcast" className="text-accent hover:underline font-medium">Vivid Yellow Podcast</Link>. And if you want to connect with 1000+ designers who are past the course phase, join <Link href="/community" className="text-accent hover:underline font-medium">WaveMakers Connect</Link>.
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas, CEO &amp; Staff Trainer, Xperience Wave
      </p>
    </>
  ),
  'grow-as-solo-designer': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        If you&apos;re the only designer on your team right now, I want you to know: I&apos;ve been there. Twice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And the two experiences couldn&apos;t have been more different.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The first time was at a crowdfunding platform. Design was genuinely valued. Founders were involved in design conversations. Experiments moved fast, but everyone, product, engineering, design, worked under one roof with mutual respect. That environment grew naturally. I eventually built a small design team, working alongside product owners who understood what design could bring to the table.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The second time was at an enterprise security company. And that nearly broke me.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The team was stretched between the US and India. It was B2B, enterprise, deeply complex. Product managers maintained massive backlogs and stayed on late-night calls syncing with stakeholders overseas. During the day, they&apos;d push decisions on the Indian team, decisions that often didn&apos;t make sense.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Everyone spoke technology. Everyone thought they owned design. The CPO I reported to didn&apos;t really understand what UX meant. Conversations with him felt like conversations you&apos;d have with a visual designer, &quot;can you make this look better&quot; energy.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I was a showpiece. The designer on the team so investors could feel good about the company caring about experience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That version, not the first one, is what most solo designers actually face.
      </p>

      <h2 id="things-that-didnt-work" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Things That Didn&apos;t Work
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I realized nobody took design seriously, my first instinct was to be nice. Stay in good books. Be helpful. Be agreeable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That backfired fast.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The two product owners I worked with were people who had fought their way through careers that felt like wars. They knew one mode: be louder, push harder, or get ignored. The culture was built around who could yell the most and win.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        My niceness just got used to support their wins.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        So I tried the opposite. I raised my voice. Pushed back. Fought for design&apos;s place in conversations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But I was just a designer going up against VPs and directors. All they saw was someone making noise without the position to back it up. I was a screamer who didn&apos;t make a difference.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Neither approach worked.
      </p>

      <h2 id="what-actually-clicked" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Clicked
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I stopped trying to go through the walls and started going around them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I spoke to individuals across teams. Not to convince them about design, just to understand their problems. I shadowed sales calls with customers. I sat with the technology team and listened to what they thought was broken. I talked to salespeople who&apos;d been in the field for decades.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here&apos;s the important part. I kept the product managers in the loop throughout. Not hiding progress. Not trying to surprise anyone. Not building something in the shadows to reveal later like a &quot;told you so&quot; moment.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Because the one thing I learned quickly is this: don&apos;t act like you know users better than the salesperson who&apos;s been talking to them for 15 years.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Don&apos;t try to outsmart people. You&apos;ll just hurt small egos and create enemies.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Instead, I started speaking their language.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I stopped talking about &quot;<Link href="/resources/tools" className="text-accent hover:underline font-medium">user research</Link>&quot; and started talking about &quot;onboarding time.&quot; I stopped saying &quot;we need to understand user needs&quot; and started saying &quot;we can reduce the time it takes for a new customer to go live by x%.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Everyone listens when you talk about numbers they care about. Not design jargon they don&apos;t.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Did they believe me immediately? No. But as the studies continued and results started showing, trust built. Slowly.
      </p>

      <h2 id="the-advocate" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Advocate Who Changed Everything
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Somewhere during this time, I found an unlikely ally, a business vertical head.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He wasn&apos;t a design person. In the beginning, our conversations were mostly me venting about how nobody cares. And honestly, even with good intentions, he didn&apos;t really know what it takes to drive experience at a leadership level.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But we started working on a project together. Over time, through the work itself, he started seeing how design actually operates. Not the deliverables, but the thinking. The way you approach problems. The way you connect research to decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He started turning up. Showing interest. Asking questions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s when I had a real one-on-one conversation with him. Spoke to my manager. And slowly, we started doing more together, running <Link href="/community" className="text-accent hover:underline font-medium">workshops</Link>, presenting at internal forums, talking about the future of design in the company.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Did he always have time for me? No. Did it happen fast? Definitely not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But it worked.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We ended up growing the design team from just me to 4 designers. And I was leading them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Not in a day. Not even close.
      </p>

      <h2 id="what-i-wish" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What I Wish Someone Had Told Me
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re the solo designer right now, here&apos;s what I want you to hear:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>1. Stop proving design&apos;s value in design language</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody outside of design cares about your process diagrams, your double diamonds, or your research frameworks. They care about their problems. Talk about their problems. In their language. With numbers they recognize.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>2. Don&apos;t hide your work or try to surprise people</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It&apos;s tempting to work in isolation and then reveal something amazing. But that&apos;s a trap. Keep stakeholders in the loop, even the difficult ones. Especially the difficult ones. Surprises create enemies, not allies.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>3. Find your advocate</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It doesn&apos;t have to be a design leader. It can be a business head, a product person, a founder who gets it, someone higher up who can open doors you can&apos;t reach yet. If your organization doesn&apos;t have anyone like that, you either build that relationship from scratch (like I did), or you accept that growth will be painfully slow.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>4. Push for design representation at the <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">leadership</Link> level</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Because until experience has a voice at the top, you&apos;ll always be fighting uphill. My organization wasn&apos;t ready to promote me or hire a design leader. So I found an alternative path through an unlikely ally. But the real fix? Companies recognizing that experience needs to be at the table, not just under it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>5. It takes consistent effort beyond project delivery</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the hardest truth. If you just deliver projects and hope someone notices, you&apos;ll be waiting forever. Growth as a solo designer requires investing time in relationship building, speaking their language, finding allies, and being patient without being passive.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Because if you don&apos;t do that, you end up walking over the same problems again and again. Until the pain just starts feeling normal. Like it&apos;s part of the job. It&apos;s not. And it shouldn&apos;t be.
      </p>

      <h2 id="final-thoughts" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Final Thoughts
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Being the solo designer is one of the hardest positions in a company. You&apos;re often misunderstood, undervalued, and fighting battles that nobody else sees.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But it&apos;s also an incredible opportunity to grow, not just as a designer, but as a strategist, a communicator, and a <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">leader</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The skills you build navigating stakeholder politics, speaking business language, and building trust across teams? Those are the skills that eventually get you to the <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">leadership table</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        You just have to survive long enough to get there.
      </p>

      <h2 id="need-help" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Need Help Navigating This?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re the solo designer right now and feeling stuck, I&apos;ve been exactly where you are.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I <Link href="/programs" className="text-accent hover:underline font-medium">mentor designers</Link> who are trying to grow their careers, build strategic thinking skills, and navigate challenging work environments.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Join our <Link href="/community" className="text-accent hover:underline font-medium">community</Link> of designers navigating similar challenges, or tune into our <Link href="/podcast" className="text-accent hover:underline font-medium">podcast</Link> for more real stories from the field.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/programs" className="text-accent hover:underline font-medium">Explore mentoring at Xperience Wave →</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed">
        Or just reach out. I&apos;m always happy to chat.
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Head of Product and Design
      </p>
    </>
  ),
};

// Table of contents for each blog post
const blogTableOfContents: Record<string, { id: string; title: string }[]> = {
  'ai-first-design-senior-ux': [
    { id: 'ai-first-mindset', title: 'The AI-First Design Mindset' },
    { id: 'core-ai-skills', title: 'Core AI Skills Every Senior Designer Needs' },
    { id: 'role-changes', title: 'How AI Changes the Senior Designer\'s Role' },
    { id: 'designing-ai-products', title: 'Designing AI-Powered Products' },
    { id: 'ai-first-portfolio', title: 'Building Your AI-First Portfolio' },
    { id: 'leadership-advantage', title: 'The Leadership Advantage' },
    { id: 'taking-action', title: 'Taking Action Today' },
  ],
  'why-courses-dont-get-leadership-roles': [
    { id: 'leadership-gap', title: 'The Leadership Gap Courses Can\'t Fill' },
    { id: 'director-requirements', title: 'What Director and VP Roles Actually Require' },
    { id: 'personal-brand', title: 'The Personal Brand Factor' },
    { id: 'why-mentorship', title: 'Why Mentorship Works for Leadership' },
  ],
  'why-courses-dont-get-good-roles': [
    { id: 'course-trap', title: 'The Course Trap for Career Switchers' },
    { id: 'hiring-managers', title: 'What Hiring Managers Actually Look For' },
    { id: 'experience-asset', title: 'Your Previous Experience is an Asset' },
    { id: 'mentorship-difference', title: 'The Mentorship Difference' },
  ],
  'why-courses-dont-work': [
    { id: 'dirty-secret', title: 'The Dirty Secret About UX Design Courses' },
    { id: 'certificates-reality', title: 'What Those Certificates Actually Gave You' },
    { id: 'senior-demands', title: 'What Senior Roles Actually Demand' },
    { id: 'savinays-story', title: 'What Actually Moves the Needle: Savinay\'s Story' },
    { id: 'question-to-ask', title: 'The Question You Should Be Asking Yourself' },
  ],
  'grow-as-solo-designer': [
    { id: 'things-that-didnt-work', title: 'The Things That Didn\'t Work' },
    { id: 'what-actually-clicked', title: 'What Actually Clicked' },
    { id: 'the-advocate', title: 'The Advocate Who Changed Everything' },
    { id: 'what-i-wish', title: 'What I Wish Someone Had Told Me' },
    { id: 'final-thoughts', title: 'Final Thoughts' },
    { id: 'need-help', title: 'Need Help Navigating This?' },
  ],
};

// Author data
const authorData: Record<string, { role: string; bio: string; image: string }> = {
  'Shaik Murad': {
    role: 'Co-founder, Head of Design',
    bio: '13+ years experience at Credit Saison, Milaap & Yokogawa. Specializes in design leadership & growth-based design.',
    image: '/images/Murad.png',
  },
  'Almas Tasneem': {
    role: 'CEO & Co-founder',
    bio: '12+ years experience at Capgemini, CloudNuro & GE. Specializes in product design & brand strategy.',
    image: '/images/almas.png',
  },
};

// Blog-specific metadata for SEO
const blogMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  'ai-first-design-senior-ux': {
    title: 'AI-First Design: What Senior UX Designers Need to Know in 2026',
    description: 'Learn how AI is transforming UX design and what skills senior designers need to stay competitive. Discover prompt engineering, AI-assisted research, and building an AI-first portfolio.',
    keywords: ['AI UX design', 'senior UX designer skills', 'AI design tools', 'UX career growth', 'AI-first design', 'prompt engineering for designers'],
  },
  'why-courses-dont-get-leadership-roles': {
    title: "Why UX Design Courses Don't Get You Leadership Roles",
    description: 'Discover why courses fail senior designers seeking Director and VP roles. Learn what executive positions actually require and how mentorship fills the gap.',
    keywords: ['UX design leadership', 'design director', 'VP of design', 'design management', 'UX career advancement'],
  },
  'why-courses-dont-get-good-roles': {
    title: "Why UX Design Courses Don't Get You Good Roles (And What Actually Works)",
    description: "You've completed courses but callbacks aren't coming. Learn why generic courses fail career switchers and what actually works to land your first UX role.",
    keywords: ['career switch to UX', 'UX design for beginners', 'break into UX design', 'UX portfolio tips', 'UX job hunting'],
  },
  'why-courses-dont-work': {
    title: "Why UX Design Courses Don't Get You Senior Roles | Xperience Wave",
    description: "Done with HFI, Designerrs, NextLeap, IIT/NID programs and still stuck? Here's why UX certificates don't land senior roles - and what 140+ designers did differently.",
    keywords: ['UX design courses', 'senior UX designer', 'UX mentorship', 'UX career growth', 'UX portfolio', 'mid-level to senior designer', 'UX design certification', '1:1 UX mentorship', 'design leadership'],
  },
  'grow-as-solo-designer': {
    title: 'How To Grow When You\'re The Only Designer On The Team',
    description: 'A real story about surviving as the solo designer, building trust in hostile environments, finding advocates, and growing into a design leader when nobody cares about design.',
    keywords: ['solo designer', 'only designer on team', 'design leadership', 'growing as a designer', 'UX career growth', 'design advocate', 'stakeholder management'],
  },
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return { title: 'Blog Post Not Found' };
  }

  const meta = blogMetadata[slug] || {
    title: post.title,
    description: post.excerpt,
    keywords: [],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [post.image],
    },
    alternates: {
      canonical: `/resources/blogs/${slug}`,
    },
  };
}

// Generate static params for published blog posts
export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = blogContent[slug];
  const categoryColor = getCategoryColor(post.category);
  const categoryLabel = getCategoryLabel(post.category);
  const tableOfContents = blogTableOfContents[slug] || [];
  const author = authorData[post.author.name] || {
    role: 'UX Mentor',
    bio: 'Design mentor at Xperience Wave.',
    image: '',
  };

  // Get related posts (same category, excluding current and upcoming)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && !p.upcoming)
    .slice(0, 3);

  // Article structured data for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xperience Wave',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xperiencewave.com/images/logos/xw-logo-light.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://xperiencewave.com/resources/blogs/${slug}`,
    },
  };

  return (
    <>
      {/* Article Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <header className="bg-snow pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-g500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources/blogs" className="hover:text-accent transition-colors">Blog</Link>
          </nav>

          <div className="max-w-[800px]">
            {/* Category */}
            <span
              className="inline-block px-3 py-1 text-xs font-semibold text-white rounded mb-4"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryLabel}
            </span>

            {/* Title (H1) */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-g600">
              <span className="font-medium text-carbon">{post.author.name}</span>
              <span className="w-1 h-1 rounded-full bg-g300" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="w-1 h-1 rounded-full bg-g300" aria-hidden="true" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-8">
        <div className="flex gap-12">
          {/* Article */}
          <main className="flex-1 max-w-[720px]">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>

            {/* Content */}
            <article className="font-body prose prose-lg max-w-none">
              {content || (
                <p className="text-lg text-g600 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Author */}
              <div className="p-6 bg-snow rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-g200">
                    {author.image ? (
                      <Image src={author.image} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-lg font-bold text-g500">{post.author.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-carbon">{post.author.name}</p>
                    <p className="text-sm text-g500">{author.role}</p>
                  </div>
                </div>
                <p className="text-sm text-g600 mb-4">{author.bio}</p>
                <Link
                  href="/programs"
                  className="block w-full py-2 bg-carbon text-white text-sm font-medium rounded-lg hover:bg-carbon/90 text-center transition-colors"
                >
                  View Programs
                </Link>
              </div>

              {/* TOC */}
              {tableOfContents.length > 0 && (
                <div className="p-6 border border-g200 rounded-xl">
                  <h3 className="font-bold text-carbon mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-g600 hover:text-accent flex items-start gap-2 transition-colors"
                        >
                          <span className="text-g400">{i + 1}.</span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related in Sidebar */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-bold text-carbon mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 2).map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/resources/blogs/${relatedPost.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-20 h-14 relative rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-carbon group-hover:text-accent line-clamp-2 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-g500 mt-1">{relatedPost.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles - Full Width */}
      {relatedPosts.length > 0 && (
        <section className="bg-snow py-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/resources/blogs/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-carbon mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <span className="text-sm text-g500">{relatedPost.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        title="Want Personalized Career Advice?"
        subtitle="Reading is great, but 1:1 mentorship accelerates your growth. Book a free strategy call to discuss your specific situation."
        buttonText="Book strategy call"
      />

      {/* Mobile TOC - Floating Button */}
      <MobileTOC items={tableOfContents} />
    </>
  );
}
