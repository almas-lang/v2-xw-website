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
        And the one that keeps coming back:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;All courses teach the same thing. I almost feel like I know everything I&apos;m supposed to know as a UX designer. But I never found the forum to even check where I was going wrong. I don&apos;t know what happened. Eventually I have a certificate I uploaded to LinkedIn and that&apos;s that.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That last one isn&apos;t a failure of the designer. It&apos;s an indictment of the entire course industry.
      </p>

      <h2 id="curriculum-doesnt-care" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Their Curriculum Doesn&apos;t Care About You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Imagine you came from a graphic design background with 6+ years of experience. You join a cohort. Sitting next to you is a fresh engineering graduate who&apos;s never opened Figma. Next to them is someone from a medical background exploring a career switch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The course treats all three of you exactly the same.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Same modules. Same assignments. Same pace. Same evaluation. Same certificate at the end.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody checked what you already knew. Nobody asked about your learning style. Nobody cared that your 6 years of visual design experience meant you needed strategic depth, not another wireframing tutorial. They just shoved the same outdated curriculum at you, a curriculum that was probably created by someone who stopped tracking where the industry was heading years ago.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They&apos;ll tell you proudly: &quot;We&apos;ve trained 1,000+ designers.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What they won&apos;t tell you is how many of those designers actually landed senior roles, got meaningful salary hikes, or moved into positions where they drive decisions. Because if you check the success ratio honestly, you&apos;d be looking at less than 10%.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        There could be another 10,000 who just wasted their money trying to learn from them. But nobody talks about that number.
      </p>

      <h2 id="certificates-reality" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Those Certificates Actually Gave You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me be direct. A pile of certificates that collects dust.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Salaries didn&apos;t change. Positions didn&apos;t change. The ability to drive decisions didn&apos;t change. The only thing that changed? Imposter syndrome got worse. Because now you had a certificate that was supposed to fix things, and it didn&apos;t.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve seen designers leave jobs after completing a course because they genuinely believed the certificate would automatically attract better offers. Nothing happened. Because the market doesn&apos;t care about what you completed. It cares about what you can do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here&apos;s where courses do the most damage. They set wrong expectations. They teach processes as if every organisation has the budget, time, and resources to run them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A concrete example. Courses teach ethnographic studies as a standard research method. Students learn it, get excited, go back to their organisations, and discover that their company can&apos;t afford or justify an ethnographic study. The designer feels defeated. &quot;I&apos;m not doing what I&apos;m supposed to be doing.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Wrong. That organisation simply can&apos;t benefit from that specific method. Your job as a senior designer isn&apos;t to follow a textbook process. It&apos;s to read the room and adapt. But how do you teach 50-60 people in a batch to read their specific room?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        You don&apos;t. You just tell everyone the same things, set wrong expectations, make them think less constructively, and create wrong drivers of design. Courses have always harmed mid-level designers the most. They&apos;re just seen as an alternative cheap option. Nothing more.
      </p>

      <h2 id="senior-demands" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Senior Roles Actually Demand (That You&apos;re Not Preparing For)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Mid-level designers preparing for senior roles are almost always focused on the wrong things.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They think it&apos;s about having a stronger voice in meetings. Getting more domain knowledge. Talking about accessibility. Building Figma-based design systems.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These are basics. Table stakes. Not differentiators.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        What actually separates a senior UX designer from a mid-level one:
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li><strong>Systemic thinking.</strong> Can you zoom out from the screen you&apos;re designing and see how it connects to a larger product ecosystem, a business strategy, a user&apos;s broader journey? Can you connect dots across teams and timelines that nobody else is connecting?</li>
        <li><strong>Vision beyond design.</strong> Senior designers don&apos;t just execute a design direction. They set it. They articulate a vision bigger than the interface. They drive alignment across product, engineering, and business on why a direction matters.</li>
        <li><strong>Stakeholder mastery.</strong> Not just presenting to stakeholders, managing them. Being someone whose personal brand builds confidence in delivery before you&apos;ve even started working on it. Knowing when to push back, when to reframe, when to bring people along.</li>
        <li><strong>Process ownership.</strong> Team maturity, knowledge management, UX writing, pi-deep knowledge to handle and collaborate with multiple stakeholders across disciplines. These aren&apos;t nice-to-haves. They&apos;re expected.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        No pre-recorded module will develop any of this. And the designers who understand where the industry is heading, especially around <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-first design and what senior UX designers need</Link>, are the ones pulling ahead right now.
      </p>

      <h2 id="savinays-story" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Works: Savinay&apos;s Story
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me tell you about Savinay. 8 years of experience. Knew his craft. But when he walked in, he was confident about core design, strategy, some secondary research, ideation, revisions on top of revisions, and dismissed everything else as unrealistic.
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
        But here&apos;s what shifted. Once we sat down, understood his specific situation, and carved a plan around his gaps, his perception changed completely. Right after the planning stage, he started taking charge. Of processes. Of the people around him. Of stakeholder management. Absolutely stunning transformation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The shift wasn&apos;t about teaching him something new. It was about repositioning what he already knew and unlocking what he&apos;d dismissed as &quot;not for people like us.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That kind of shift only happens when someone spends time understanding your specific situation, not delivering a curriculum designed for the masses.
      </p>

      <h2 id="question-to-ask" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Question You Should Be Asking Yourself
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Forget courses. Forget certificates. Ask yourself one honest question:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Why did you want to learn UX in the first place?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Was it to be part of some cohort? To get another certificate? Or was it to achieve something real, make more money, achieve bigger positions, get renowned, drive decisions that matter?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Because if it&apos;s the latter, then another course isn&apos;t the answer. It never was.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        All those certificates you so nicely pile up are going to build dust. And you won&apos;t have taken a single step closer to your goals.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We&apos;ve worked with designers across experience levels who were stuck in exactly this loop, doing more courses, collecting more certificates, and getting no closer to where they wanted to be. The ones who broke through did it by getting specific about their gaps, not by adding another line to their LinkedIn certifications section.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re earlier in your journey, genuinely transitioning into UX, or if you&apos;re already senior and looking to step into design leadership, those are different playbooks entirely. We&apos;ve written about <Link href="/resources/blogs/designer-to-design-leader" className="text-accent hover:underline font-medium">transitioning from designer to design leader</Link>, worth a read if that&apos;s where you&apos;re headed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But if you&apos;ve done the courses, got the certificates, and nothing&apos;s changed, you already know what isn&apos;t working.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Maybe it&apos;s time to ask different questions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        If any of this hit home, visit <Link href="https://xperiencewave.com" className="text-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">xperiencewave.com</Link> and see if anything there resonates with where you are right now.
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        Almas is the CEO &amp; Staff Trainer at Xperience Wave, a 1:1 UX design mentorship studio based in Bangalore. More at <Link href="https://xperiencewave.com" className="text-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">xperiencewave.com</Link>. For unfiltered design career conversations, listen to the <Link href="/podcast" className="text-accent hover:underline font-medium">Vivid Yellow Podcast</Link>.
      </p>
    </>
  ),
  'business-driven-ux-portfolio': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You spend all that effort understanding your users, building empathy, creating workflows that genuinely tackle their problems. So why is it that when it comes to showcasing your own work, the one thing that&apos;s supposed to open doors, most designers completely botch it?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve reviewed hundreds of portfolios. At Xperience Wave, portfolio restructuring is one of the first things we do with designers who come in stuck. And I can tell you, the work is almost never the problem. The narrative is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your portfolio isn&apos;t a gallery. It&apos;s not a Dribbble showcase. It&apos;s not a timeline of your process from discovery to high-fidelity screens. It&apos;s the single most important document in your senior UX job search. And most designers treat it like a scrapbook.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Let me break down exactly what&apos;s going wrong and what to do about it.
      </p>

      <h2 id="five-portfolio-sins" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Five Portfolio Sins I See Every Week
      </h2>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Password-Protected Portfolios With No Context
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This one kills me. Designers put their entire portfolio behind a password and say &quot;I&apos;m under NDA.&quot; Great. So when a recruiter lands on your site, they see... nothing. A locked door with no reason to knock.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s the thing. Being under NDA doesn&apos;t mean you can&apos;t show your work at all. It means you need to be smarter about how you tell the story. Sanitise the data. Use percentages instead of absolute numbers. Change the brand name if you have to. Show the thinking, the decisions, the impact, without leaking proprietary information.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you absolutely must password-protect a case study, at least give the recruiter enough context on the outside to make them want to request that password. A headline, a summary of the business problem, a hint at the outcome. Give them a reason to reach out.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Beautiful Screens, Zero Narrative
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most common one. Portfolios that look stunning, gorgeous UI, polished mockups, pixel-perfect everything, but tell you absolutely nothing about why any of it matters.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hiring managers at senior levels aren&apos;t evaluating your visual craft. They&apos;re evaluating your thinking. How did you identify the problem? What was your strategy? What trade-offs did you make? Why this solution and not the fifteen others you considered?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        A portfolio full of pretty screens tells a recruiter you can execute. It doesn&apos;t tell them you can think. And at the senior level, thinking is the job.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. The &quot;I Did Everything&quot; Syndrome
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I drove the vision. I led the research. I built the design system. I presented to the CEO. I increased revenue by 200%.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Right. You did all of that. Alone. On every project. Sure.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is what I call the solo-hero portfolio. Every case study reads like a one-person show where the designer personally saved the business. Nobody believes it. Because senior roles are inherently collaborative, and if your portfolio doesn&apos;t show how you worked with product managers, engineers, stakeholders, and researchers, it actually signals the opposite of what you intend. It signals you either can&apos;t collaborate or can&apos;t distinguish your contribution from the team&apos;s.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The flip side is equally bad: &quot;We did this. We achieved that.&quot; Okay, but what did you do? Where was your control? What decisions were yours?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The sweet spot is showing your specific role within a collaborative effort. Not &quot;I did everything&quot; and not &quot;we did everything.&quot; It&apos;s &quot;Here&apos;s the problem the team was solving, here&apos;s where I specifically drove decisions, and here&apos;s how that contributed to the outcome.&quot;
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Ten Case Studies, All Mediocre
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some designers throw everything into their portfolio. Twelve projects. Fifteen. As if more is better.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s what recruiters actually experience: they click on a case study, it turns out to be shallow. They click another one, same thing. By the third click, they&apos;ve closed the tab.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You showcase what&apos;s best. Not everything you&apos;ve ever touched. And if everything you&apos;ve ever done is &quot;best,&quot; then you lack the prioritisation ability to identify what&apos;s actually strongest. That itself is a red flag for a senior role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Two to three case studies. Deep. Intentional. That&apos;s it.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. Complaining Disguised as Context
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &quot;The company culture was toxic.&quot; &quot;We didn&apos;t get enough budget.&quot; &quot;The product manager didn&apos;t understand UX.&quot; &quot;My previous boss was difficult.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Stop. Just stop.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I get it. These are real situations. Most of the designers we work with have lived through exactly this. But your portfolio isn&apos;t a therapy session. It&apos;s a preview of how you&apos;ll operate at your next company.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And guess what? Your next employer probably has some of the same problems. Tight budgets. Stakeholders who don&apos;t get design. Messy cross-functional dynamics. When you complain about these in your portfolio, the hiring manager doesn&apos;t think &quot;wow, they had it tough.&quot; They think &quot;this person will complain about us too.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Instead, show them how you navigated constraints. How you influenced without authority. How you adapted when the textbook process wasn&apos;t possible. That&apos;s what senior designers do.
      </p>

      <h2 id="business-driven-portfolio" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What a Business-Driven Portfolio Actually Looks Like
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Enough about what&apos;s wrong. Let me tell you what works.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A portfolio that lands senior roles does one thing well: it reads like a controlled narrative, showing the recruiter that you had enough command over the situation to steer it towards an outcome.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Not that you followed a textbook. Not that you did all the &quot;right&quot; steps. But that you understood the problem, built a strategy, made deliberate decisions, brought people along, and delivered something that moved the needle.
      </p>

      <h2 id="crisp-framework" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The CRISP Framework
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        At Xperience Wave, we use a framework called CRISP when restructuring portfolios with our mentees. It&apos;s built from how senior and leadership-level designers actually operate, and it maps directly to what hiring managers evaluate in a case study.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        C - Context
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you show a single screen, the recruiter needs to understand: what was the business problem? What was at stake? Who was involved? What were the constraints?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is where most designers rush. They jump straight to &quot;here&apos;s my research&quot; without ever establishing why the research was needed. Context isn&apos;t filler. It&apos;s what makes every decision that follows make sense. A well-set context tells the recruiter: this person understands the landscape they were operating in.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        R - Research &amp; Insights
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        How did you investigate the problem? What did you discover? What surprised you? What confirmed your assumptions and what challenged them?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This isn&apos;t about listing your methods. &quot;We did 8 user interviews and an affinity map.&quot; It&apos;s about showing that your research actually drove decisions. What specific insight changed the direction of the project? What did you learn that nobody else on the team had surfaced? That&apos;s what separates a senior portfolio from a mid-level one.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        I - Ideation &amp; Structure
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s where your actual design thinking lives. How did you move from insights to solutions? What was your information architecture? How did you explore multiple directions before committing?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        But keep this concise. Most portfolios spend 80% of their space here, wireframe after wireframe, iteration after iteration. Senior hiring managers don&apos;t need to see every version. They need to see that you had a clear logic for why you structured the solution the way you did.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        S - Stakeholder Navigation
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the section most portfolios completely miss, and it&apos;s the one senior hiring managers care about most.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        How did you communicate with stakeholders throughout? How did you handle pushback? Did you align a product manager on scope? Did you reframe a business requirement to make it work for the user? Did you restructure the approach mid-project because the data told you something unexpected?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        At the senior level, how you worked matters as much as what you delivered. Your ability to navigate people, decisions, and trade-offs is what gets you hired. Not your wireframes.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        P - Proof of Impact
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        End with what changed because of your work. And be specific.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have hard metrics, conversion rates, task completion time, revenue impact, support ticket reduction, use them. But frame them as a story, not a data dump. &quot;By redesigning the checkout flow, we reduced cart abandonment by 15%&quot; is infinitely more powerful than a table of numbers.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re under NDA, use relative numbers. &quot;Increased by 15%&quot; instead of &quot;increased by &#x20B9;1.2 crore.&quot; Or lean on qualitative impact: &quot;user testing showed a significant reduction in task completion time and confusion around the core workflow.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you have no metrics at all, explain what you would have measured and why. That still shows business thinking. It shows you understand that design exists to move numbers, even when you didn&apos;t have access to those numbers.
      </p>

      <h2 id="success-stories" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Happens When You Get This Right: Hari, Kritika, and Jonah
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me tell you what this looks like in practice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hari, Kritika, and Jonah all came to us with portfolios that looked like what you&apos;d find on Dribbble. Beautifully designed. Visually polished. And completely failing to land callbacks.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The work wasn&apos;t bad. The story was.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Once we restructured their case studies around problem identification, strategic narrative, decision-making under constraints, and clear impact, everything shifted. They didn&apos;t just start getting callbacks. They started building rapport in interviews because the portfolio had already communicated how they think. They negotiated better offers because the portfolio demonstrated business value. When they joined their teams, their new colleagues already understood how they operate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A good portfolio doesn&apos;t just get you a foot in the door. It sets the tone for your entire professional relationship with that company.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Hari, Kritika, and Jonah went from case studies that looked like Dribbble shots to narratives that landed them senior and lead design roles. The work was the same. The story changed everything.
      </p>

      <h2 id="what-portfolio-tells" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Your Portfolio Tells Recruiters One Thing
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        How you solve problems.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s it. Not how many tools you know. Not how pretty your UI is. Not how many projects you&apos;ve worked on.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        It tells them: when this person encounters a messy, ambiguous, real-world problem, how do they operate?
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Do they identify the right problem to begin with?</li>
        <li>Do they build a strategy or just jump to screens?</li>
        <li>Do they collaborate or work in isolation?</li>
        <li>Do they make decisions based on evidence or assumptions?</li>
        <li>Do they communicate with stakeholders or hide in Figma?</li>
        <li>Do they care about business outcomes or just design aesthetics?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Every case study in your portfolio should answer these questions. If it doesn&apos;t, it doesn&apos;t matter how good the work is.
      </p>

      <h2 id="start-with-one" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Start With One
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Don&apos;t overhaul your entire portfolio in one weekend. Pick your strongest project, the one where you had the most control, made the most meaningful decisions, and can articulate the impact.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Rewrite that one case study. Lead with the problem. Show your strategic thinking and the decisions you made. End with what changed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Then get feedback. Not from other designers who&apos;ll comment on your UI. From someone who hires designers, or from a mentor who&apos;s been on that side of the table. Ask them: &quot;Is the business value clear? Do you understand how I think?&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;ve been stuck, applying, interviewing, getting rejected, and you haven&apos;t seriously restructured your portfolio, this is probably where the problem lives. We&apos;ve seen it too many times. The work is there. The story isn&apos;t.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re curious about the other reasons mid-level designers stay stuck, we wrote about <Link href="/resources/blogs/why-courses-dont-work" className="text-accent hover:underline font-medium">why UX design courses don&apos;t get you senior roles</Link>, and what the designers who actually break through do differently. Worth reading alongside this one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And if you want to understand where the industry is heading for senior designers specifically, our piece on <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-first design and what senior UX designers need</Link> covers the skills that are separating candidates right now.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Whatever you do, stop treating your portfolio like a gallery. Start treating it like the most important business case you&apos;ll ever write. Because it is.
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        Shaik Murad is the Head of Product &amp; Design at Xperience Wave, a <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">1:1 UX design mentorship</Link> studio based in Bangalore. More at <Link href="https://xperiencewave.com" className="text-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">xperiencewave.com</Link>. For unfiltered design career conversations, listen to the <Link href="/podcast" className="text-accent hover:underline font-medium">Vivid Yellow Podcast</Link>.
      </p>
    </>
  ),
  'ai-predicts-so-do-you-difference': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        We talk about AI like it&apos;s doing something magical. Predicting outcomes. Generating content. Making decisions at scale.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        But here&apos;s what nobody&apos;s saying: prediction isn&apos;t new. You&apos;ve been doing it your whole life. And understanding this changes how you think about both AI and yourself.
      </p>

      <h2 id="prediction-machine" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        You&apos;re Already A Prediction Machine
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Think about something as simple as taking a shower.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You turn the knob. You don&apos;t know the exact angle for the perfect temperature. You predict, based on the weather outside, how the plumbing&apos;s been behaving lately, what worked yesterday. You test. Too cold. Adjust. Too hot. Adjust again.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Within seconds, you&apos;re there. No manual. No calculations. Just prediction, feedback, correction.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        You do this hundreds of times a day without thinking about it:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>How hard to brake when the car ahead slows down</li>
        <li>How someone will react before you say something</li>
        <li>Whether that meeting will run over</li>
        <li>Whether your kid is about to knock something over before they do it</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Prediction. All of it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Neuroscience has a name for this. The &quot;predictive brain.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Research from the Max Planck Institute describes the brain as a prediction machine, constantly comparing what you sense with what you expect. Your mind works like autocomplete, always guessing what comes next based on patterns from the past.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;The brain is a prediction machine, which continuously compares sensory information that we pick up with internal predictions.&quot; - <a href="https://www.pnas.org/doi/10.1073/pnas.2201968119" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Max Planck Institute for Psycholinguistics, 2022</a>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some researchers go further, arguing that the mind itself can be conceived as an <a href="https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2010.00025/full" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">&quot;anticipatory device.&quot;</a>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        You&apos;re not just reacting to the world. You&apos;re predicting it. Constantly.
      </p>

      <h2 id="ai-does-same" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        AI Does The Same Thing - Sort Of
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s where it gets interesting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI was explicitly designed to mimic this.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Artificial neural networks were built to imitate how the human brain processes information. The whole premise of <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10797599/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">machine learning is pattern recognition and prediction</a> based on past data. This is exactly why <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">understanding AI-first design</Link> matters so much for senior designers right now.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When AI generates text, it&apos;s predicting the most likely next word. When it recognises an image, it&apos;s predicting what the patterns most likely represent. When it makes a recommendation, it&apos;s predicting what you&apos;ll probably want.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The learning loop looks similar to yours:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Input → Process → Output → Feedback → Adjust → Improve
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        So if both you and AI are prediction machines, what&apos;s actually different?
      </p>

      <h2 id="skin-in-the-game" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Difference Is Skin In The Game
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When your prediction is wrong, water&apos;s too hot, you feel it. Immediately. Painfully.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And you adjust without thinking. No committee. No retraining cycle. No waiting for new data. You just move your hand.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You&apos;re a closed loop. Prediction and consequence are fused together.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI doesn&apos;t have that.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI can predict, but it can&apos;t feel the hot water. It doesn&apos;t know it&apos;s wrong until someone flags the error. It can&apos;t course-correct mid-action the way you do. It needs new input, new prompts, new training data to update.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You&apos;re operating in reality. AI is operating on a model of reality.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That&apos;s not the same thing.
      </p>

      <h2 id="predictions-go-wrong" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Happens When Predictions Go Wrong
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where the difference becomes everything.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When your predictions go wrong, you said the wrong thing, you misjudged a situation, you burned yourself, you recover fast. Because the feedback is instant, embodied, and consequential.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You learn not from data, but from pain. From embarrassment. From the immediacy of being wrong in real time. It&apos;s why <Link href="/resources/blogs/why-courses-dont-work" className="text-accent hover:underline font-medium">courses that teach theory without real stakes</Link> rarely produce the growth designers expect.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI doesn&apos;t recover like this. It doesn&apos;t even know it failed unless the failure is flagged, labelled, and fed back into training. And even then, it&apos;s not learning the way you do. It&apos;s pattern-matching on a larger dataset.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Research from Oxford University shows this clearly:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;In artificial neural networks, an external algorithm tries to modify synaptic connections in order to reduce error, whereas the human brain first settles the activity of neurons into an optimal balanced configuration before adjusting synaptic connections.&quot; - <a href="https://www.nature.com/articles/s41593-023-01514-1" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Oxford University, Nature Neuroscience, 2024</a>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is why humans can learn from seeing something once, while AI needs to be trained hundreds or thousands of times on the same information.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One study found that an average child needs 3,000 times fewer words to learn a language than an AI model trained on billions of words.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        You adapt on the fly. AI adapts on delay.
      </p>

      <h2 id="what-this-means" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        So What Does This Mean For You?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI is powerful. It predicts patterns humans can&apos;t see. It processes data at scales we can&apos;t match. It&apos;s useful. I use it every day. And the designers who are <Link href="/resources/blogs/why-courses-dont-get-leadership-roles" className="text-accent hover:underline font-medium">stepping into leadership roles</Link> are the ones who understand both what AI can do and what it fundamentally cannot.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But there&apos;s a fundamental difference between a tool that predicts and a being that predicts with consequences.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You have skin in the game.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every wrong prediction costs you something, time, pain, embarrassment, trust. That&apos;s why you learn fast. That&apos;s why your instincts sharpen over time. That&apos;s why you can walk into a room and <Link href="/resources/blogs/grow-as-solo-designer" className="text-accent hover:underline font-medium">read the mood in two seconds</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI has no skin. No burn. No stakes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        It&apos;s predicting in a vacuum. You&apos;re predicting in a life.
      </p>

      <h2 id="bottom-line" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Bottom Line
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The conversation about AI often misses this point.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We talk about whether AI will replace us. Whether it&apos;s smarter than us. Whether it&apos;s creative or just copying.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the more interesting question is: what makes human prediction different?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And the answer is consequences.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You don&apos;t just predict. You predict with something at stake. Your body, your reputation, your relationships, your time. That&apos;s also why <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">a portfolio built on real decisions and consequences</Link> will always outperform one that just shows screens.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That&apos;s not a small difference. That&apos;s everything.
      </p>

      <h2 id="references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://www.pnas.org/doi/10.1073/pnas.2201968119" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Heilbron, M., et al. (2022). A hierarchy of linguistic predictions during natural language comprehension. PNAS. Max Planck Institute</a></li>
        <li><a href="https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2010.00025/full" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Bubic, A., et al. (2010). Prediction, Cognition and the Brain. Frontiers in Human Neuroscience</a></li>
        <li><a href="https://www.nature.com/articles/s41593-023-01514-1" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Song, Y., et al. (2024). Prospective configuration. Nature Neuroscience. Oxford University</a></li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10797599/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Of artificial intelligence, machine learning, and the human brain. (2024). PMC</a></li>
        <li><a href="https://www.quantamagazine.org/to-be-energy-efficient-brains-predict-their-perceptions-20211115/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">To Be Energy-Efficient, Brains Predict Their Perceptions. (2021). Quanta Magazine</a></li>
      </ul>

      <hr className="border-g200 my-8" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Want to talk about this? I <Link href="/programs" className="text-accent hover:underline font-medium">mentor designers</Link> who are navigating career growth, building strategic thinking skills, and figuring out how to stay relevant in a world that keeps changing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/programs" className="text-accent hover:underline font-medium">Explore mentoring →</Link>
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Head of Product and Design
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

  'mixed-methods-ux-research-guide': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve done the interviews. You&apos;ve pulled the analytics. But when you present to leadership, they pick apart your findings because your qual says one thing and your quant suggests another.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Or worse - you ran five interviews, built a beautiful insight deck, and a stakeholder says: &quot;That&apos;s just five people. How do we know this is real?&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;ve been in UX for more than a couple of years, you&apos;ve hit this wall. The interviews feel rich but unconvincing at scale. The analytics feel definitive but empty of meaning. And somewhere between the two, the actual design decision sits in limbo.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the problem mixed-methods research solves. Not by being fancy, not by doubling your workload, but by being deliberate about when and how you combine qualitative and quantitative data to make decisions that actually stick.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        I want to be clear about something upfront: mixed-methods research is not always needed. I&apos;ll say that again because the textbooks won&apos;t. You don&apos;t need it for every project. You don&apos;t need it for every sprint. But when the question is complex enough, when the stakes are high enough, and when you use it well - it almost always lands business growth like nothing else.
      </p>

      <h2 id="crowdfunding-case-study" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How Mixed Methods Doubled Revenue for a Crowdfunding Platform During COVID
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A few years ago, I was heading research and design at a social crowdfunding platform. We had a team of twelve. The company wanted to expand into tier-2 and rural India, and the leadership question was simple: <em>Can we make this work outside metros, and if so, how?</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Simple question. Not a simple answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We started with a hypothesis. The null hypothesis was that geographic and infrastructure differences wouldn&apos;t significantly affect user behaviour. In other words - what works in Bangalore should work in Raichur.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Phase 1: Qualitative (Interviews)
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We went to users first. In-depth interviews with people across smaller cities and rural areas. And within the first few conversations, something unexpected started happening.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When we introduced ourselves and mentioned the company name, people would say: <em>&quot;Oh yes, the NGO.&quot;</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We&apos;d correct them - it&apos;s not an NGO, it&apos;s a crowdfunding platform. But this kept happening. Interview after interview. Eventually, we stopped correcting them because it was disrupting the flow of the study. But we logged it. This was a pattern, and patterns in qualitative data are signals.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Then came the second signal. When we explained that the platform charges a percentage (3–10%) of funds raised, the response was visceral: <em>&quot;You charge money for helping the poor and needy?&quot;</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Two qualitative signals. One pointing to a brand perception problem. The other pointing to a fundamental business model friction.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Our null hypothesis was dead. Geography wasn&apos;t just a logistical challenge - it was a completely different mental model about what the product was and how it should work.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Phase 2: Quantitative (Survey)
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Now, here&apos;s where most teams stop. They&apos;d take those interview quotes, build a deck, and pitch a redesign. But five or fifteen interviews don&apos;t move stakeholders who control budgets.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        So we built a survey. Four hundred participants across the geographies we&apos;d studied. We quantified exactly how widespread the &quot;NGO perception&quot; was. We measured willingness to pay versus willingness to tip. We got hard numbers on what these users actually expected from a platform like ours.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The data converged on something radical: <strong>make it free. Let people tip if they want.</strong>
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Phase 3: The Stakeholder Problem
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where it gets real. We were proposing to eliminate the company&apos;s primary revenue model - during COVID. The qual-plus-quant evidence was strong, but &quot;make it free&quot; is a terrifying sentence in a boardroom.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We first tested with a small sample. Showed changes in approval, acceptance, and revenue generation. The numbers were encouraging but not enough.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What finally broke through? One of the key stakeholders sat in on a couple of user interviews and usability sessions. Watched real people react to the platform. Heard the confusion, the resistance to fees, the genuine desire to give more when there was no pressure to pay.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That direct observation, combined with the quantitative validation, was what it took. The decision was made to roll it out as a blanket option.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The result: revenue doubled within a quarter.</strong> The free tipping model generated more money than the percentage-based model ever did. And it worked so well that nearly every competitor in the space eventually adopted the same approach.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That&apos;s what mixed methods does when it&apos;s done right. Neither the interviews alone nor the survey alone would have gotten us there. The interviews surfaced the insight. The survey proved it at scale. And the combination convinced stakeholders to make a decision that transformed the business.
      </p>

      <h2 id="when-you-need-mixed-methods" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        When You Actually Need Mixed Methods (And When You Don&apos;t)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s the part most articles won&apos;t tell you: you don&apos;t always need this. Research is expensive - in time, in energy, in political capital. Before you plan a mixed-methods study, ask yourself three questions:
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li>
          <strong>Can the question be answered without spending on research?</strong> Sometimes the answer is already sitting in your analytics, your support tickets, or your last round of usability testing. Don&apos;t re-research what&apos;s already known. Research is only needed when the questions remain unanswered without it.
        </li>
        <li>
          <strong>Do you need both depth AND scale?</strong> If you just need to understand <em>why</em> users are struggling with a flow, five usability tests might be enough. If you just need to know <em>how many</em> users are affected, your analytics dashboard has the answer. Mixed methods is for when you need both - and when the answer from one source would be incomplete or unconvincing on its own.
        </li>
        <li>
          <strong>What&apos;s the cost of being wrong?</strong> If you&apos;re tweaking a button colour, you don&apos;t need a mixed-methods study. If you&apos;re proposing to change the revenue model, you absolutely do. Match the rigour of your research to the stakes of the decision.
        </li>
      </ul>

      <h2 id="spear-framework" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The SPEAR Framework: How We Teach Research at Xperience Wave
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I mentor designers on research, I see the same mistakes over and over. They jump straight to writing interview guides without aligning with stakeholders. They collect beautiful data and then have no idea how to analyse it. They present findings that nobody acts on.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        So we built a framework. We call it <strong>SPEAR</strong>, and we teach it to every mentee who goes through our programs at Xperience Wave. It works for any research - qual, quant, or mixed - but it&apos;s especially powerful for mixed-methods studies because it forces you to think about integration from the start.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        S - Set the Objective
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where most designers go wrong. They sit alone at their desk, write brilliant research objectives, and then struggle to sell them to stakeholders.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Flip it. Go to your stakeholders first. Product managers, engineering leads, business heads - find the gaps they have. The questions they can&apos;t answer. Then position research as the solution to those shared unknowns.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When multiple important stakeholders are asking the same question and nobody has the answer, that&apos;s your research objective. And because they helped define it, they&apos;re already invested in the outcome.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <strong>Bad approach:</strong> &quot;I think we should study the onboarding flow because I noticed some issues.&quot;<br /><br />
        <strong>SPEAR approach:</strong> &quot;Three teams have flagged onboarding as a problem this quarter, but nobody has data on where exactly users drop off or why. I&apos;d like to run a study that answers both.&quot;
      </blockquote>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        P - Prepare
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Preparation is unsexy but critical. This is where you build:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Interview/test guides</strong> - scripted enough to be consistent, flexible enough to follow interesting threads</li>
        <li><strong>Protocols</strong> - how will you record, who takes notes, what&apos;s the observer&apos;s role</li>
        <li><strong>Approvals</strong> - IRB, legal, privacy (especially for B2B or healthcare)</li>
        <li><strong>Participant recruitment</strong> - screeners, incentives, scheduling</li>
        <li><strong>Tools</strong> - recording software, survey platforms, analysis tools</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For mixed methods specifically, this is where you decide your design: Are you starting with qual and then validating with quant (exploratory)? Starting with quant data and then investigating with qual (explanatory)? Or running both in parallel (convergent)?
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        E - Execute
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Execution is about discipline. A few things I drill into every mentee:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>No leading questions.</strong> This is the most common mistake, and experienced designers still make it. Compare these:
      </p>
      <ul className="list-none pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>&#10060; <em>&quot;Did you like using our application?&quot;</em> - This is leading. You&apos;ve already suggested an expected answer.</li>
        <li>&#9989; <em>&quot;How did you feel using this application?&quot;</em> - Open. Neutral. Same intent, completely different data.</li>
        <li>&#10060; <em>&quot;Do you think Instagram is a waste of time?&quot;</em> - Loaded with bias.</li>
        <li>&#9989; <em>&quot;How do you think using Instagram impacts your day and time?&quot;</em> - Exploratory.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The stream of questions matters.</strong> Start with easier questions, then move to harder ones. Ask the most important questions early when attention is highest, less critical ones later. Follow your guide&apos;s structure, but don&apos;t be rigid about chronology when it&apos;s unnecessary - if a participant naturally goes somewhere interesting, follow them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For mixed-methods studies, the execution phase often has two distinct tracks. If you&apos;re doing exploratory design, your qual phase needs to be completed and analysed before you can design the quant instrument. Build that into your timeline.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        A - Analyse
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where the magic happens - and where most designers panic.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>For qualitative data:</strong> Thematic analysis. Code your transcripts, cluster codes into themes, look for patterns across participants. Tools like affinity diagrams, journey maps, or simple spreadsheets work. The key is being systematic, not just cherry-picking quotes that support your hypothesis.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>For quantitative data:</strong> Statistical analysis. Descriptive stats at minimum (means, distributions, percentages). Inferential stats if your sample size supports it (significance testing, correlation, regression).
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>For mixed methods:</strong> This is the critical extra step. You need to actively integrate. Do the numbers support the stories? Do the stories explain the numbers? If there&apos;s a contradiction - and sometimes there is - that&apos;s not a failure. That&apos;s a finding. Go back and dig deeper. This is the kind of nuanced interpretation that separates human insight from surface-level analysis - something we explore further in our piece on <Link href="/resources/blogs/ai-predicts-so-do-you-difference" className="text-accent hover:underline font-medium">the difference between AI prediction and human prediction</Link>.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        R - Report
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Your research is only as good as its communication. A solid research report follows this structure:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Objective</strong> - What question were we answering?</li>
        <li><strong>Procedure</strong> - What methods did we use and why?</li>
        <li><strong>Summary</strong> - Top-line findings (start here - stakeholders are busy)</li>
        <li><strong>Detailed findings</strong> - The evidence, organised by theme or metric</li>
        <li><strong>Recommendations</strong> - What should we do based on this?</li>
        <li><strong>Participant details</strong> - Sample size, demographics, recruitment method</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The report is where mixed methods really shines. You can say: <em>&quot;68% of users in our survey reported confusion at the payment step [quant]. Here&apos;s what that confusion actually looks like and sounds like in practice [qual clips/quotes]. And here&apos;s our recommendation for fixing it.&quot;</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Numbers make stakeholders listen. Stories make them care. Both together make them act.</strong>
      </p>

      <h2 id="practical-tips" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Practical Tips for Teams With Limited Time and Budget
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You&apos;re probably thinking: &quot;This sounds great, but I don&apos;t have time for two separate studies.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Fair. Here are ways to do mixed methods without doubling your workload:
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li>
          <strong>Pair 5 usability tests with 1 short survey.</strong> Run the qual study first, extract themes, then send a quick survey (Google Forms, Typeform) to validate those themes with a larger group. Total extra effort: maybe 3–4 hours.
        </li>
        <li>
          <strong>Use existing data as your quant base.</strong> You probably already have analytics, NPS scores, support tickets, or app store reviews sitting untouched. That&apos;s your quantitative layer. Now go talk to 5–8 users to understand the <em>why</em> behind those numbers.
        </li>
        <li>
          <strong>Embed qual into quant instruments.</strong> Add 2–3 open-ended questions at the end of your next survey. &quot;Why did you give that rating?&quot; or &quot;Describe your biggest frustration with this feature.&quot; You&apos;re now doing mixed methods within a single study.
        </li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you&apos;re the only designer on your team, you have to be especially strategic about this. You can&apos;t do everything, so focus your mixed methods on the highest-stakes decisions - the ones where being wrong costs the most. For everything else, pick the single method that gets you closest to the answer. We talk more about this kind of resourcefulness in our piece on <Link href="/resources/blogs/grow-as-solo-designer" className="text-accent hover:underline font-medium">how to grow when you&apos;re the only designer on the team</Link>.
      </p>

      <h2 id="career-impact" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why This Matters for Your Career
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s the thing about mixed-methods research that nobody talks about in UX articles: it&apos;s a senior skill. It&apos;s what separates designers who contribute to business decisions from designers who just ship screens.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When you can walk into a room and say, &quot;Here&apos;s what the data shows, here&apos;s why it&apos;s happening, and here&apos;s what we should do about it&quot; - backed by both quantitative evidence and qualitative depth - you are operating at a leadership level. That&apos;s the kind of work that lands in <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">portfolios that get you hired for senior and leadership roles</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The crowdfunding story I told earlier? That wasn&apos;t just a research project. It was a career-defining moment for everyone on that team. We didn&apos;t just &quot;do research.&quot; We changed how the business made money. That&apos;s what research looks like when it&apos;s done with intention, rigour, and the right framework.
      </p>

      <h2 id="key-takeaways" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Key Takeaways
      </h2>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li>
          <strong>Mixed methods isn&apos;t always needed</strong> - but when the stakes are high and you need both depth and scale, it&apos;s the most powerful tool in your research toolkit.
        </li>
        <li>
          <strong>Start with stakeholder alignment, not with your interview guide.</strong> Research that nobody asked for is research that nobody acts on.
        </li>
        <li>
          <strong>Use the SPEAR framework to stay disciplined:</strong> Set the objective (with stakeholders), Prepare (guides, protocols, participants), Execute (no leading questions, follow the stream), Analyse (thematic + statistical, then integrate), Report (objective, procedure, summary, findings, recommendations).
        </li>
        <li>
          <strong>The real power is in the integration.</strong> Numbers make stakeholders listen. Stories make them care. Both together make them act.
        </li>
        <li>
          <strong>You don&apos;t need a massive budget.</strong> Even pairing 5 usability tests with one survey, or combining existing analytics with a handful of interviews, counts as mixed methods - and it&apos;s dramatically better than either alone.
        </li>
      </ul>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we teach research end-to-end as part of our <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">1:1 mentorship programs</Link> - not as textbook theory, but as the practical skill that gets you promoted. If you&apos;re a designer who wants to move from shipping screens to driving business decisions, <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">book a free strategy call</Link> and let&apos;s talk about what&apos;s holding you back.
      </p>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Head of Product and Design
      </p>
    </>
  ),
  'why-no-ux-interview-calls': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Here&apos;s a pattern we&apos;ve seen more times than we can count.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer comes to us frustrated. They&apos;ve applied to 80, sometimes 100 roles. Their portfolio looks good - at least compared to what they&apos;ve seen from peers. Some applications lead to a first call. Some of those calls go quiet. Most applications lead to nothing at all.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Their conclusion: the market is harsh. Nobody cares about real UX. It&apos;s all about connections.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Our conclusion, after working through this with 140+ designers: the job was won or lost before they clicked Apply.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That&apos;s the uncomfortable truth at the centre of everything we&apos;re going to cover here. Not to discourage you - but because once you understand it, everything you need to fix becomes clear.
      </p>

      <h2 id="volume-game" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        You&apos;re Playing a Volume Game in a Credibility Market
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The most common job search strategy we see from mid-level designers: find a role on LinkedIn or Naukri, click apply, wait, repeat. Scale that up. Apply to more. Apply faster. Apply wider.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The logic feels sound. More applications = more chances. But here&apos;s what&apos;s actually happening on the other side.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A recruiter shortlisting for a senior UX role isn&apos;t discovering who you are in the moment they open your application. They&apos;re confirming a belief they&apos;ve already formed - or haven&apos;t formed yet. If your name is unfamiliar, your profile has been dormant for months, and your application looks like every other PDF in the pile, there&apos;s nothing to confirm. The application gets a few seconds of attention and moves on.
      </p>

      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <strong>THE HIDDEN JOB MARKET - WHAT RESEARCH SHOWS</strong><br /><br />
        Studies consistently put the figure at 60-70% of positions being filled before they&apos;re ever publicly listed - through referrals, internal moves, and direct outreach to people hiring managers already know. (CareerXRoads, Jobvite, LinkedIn data).<br /><br />
        This doesn&apos;t mean job boards are useless. It means job boards are where you go to compete with everyone. Your network is where you go to be considered before the competition starts.
      </blockquote>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers know this intellectually. Very few act on it. Because building real visibility takes time, and clicking Apply is immediate. So they keep clicking Apply, and keep wondering why nothing changes. If this sounds familiar, you may also be experiencing the <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">senior title without senior influence</Link> problem - they&apos;re deeply connected.
      </p>

      <h2 id="one-year-of-silence" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        One Year of Silence. Three Months to a Top MNC. What Changed.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We worked with a designer - Arun - who had been out of work for over a year when he came to us.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He was getting some calls. Not many. The ones he got often went quiet after the first conversation. For the few that progressed further, he struggled to explain the gap in his career convincingly. He came across as uncertain - and in hiring conversations, uncertainty is expensive. Every word matters.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        His portfolio wasn&apos;t the problem. His UX thinking wasn&apos;t the problem. What was broken was everything around the application - how he was showing up before, during, and after every touchpoint.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What we found when we looked at his full picture</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>His LinkedIn profile existed only to apply for jobs. It had no activity, no posts, no engagement - nothing that would make a hiring manager feel like they already knew something about him before the interview.</li>
        <li>His resume was well-designed but optimised for the wrong thing. It listed responsibilities, not outcomes. Recruiters form first impressions quickly - not in the mythologised &apos;6 seconds,&apos; but fast enough that a wall of text with no clear signal of impact gets bypassed.</li>
        <li>On discovery calls, the story of his gap sounded rehearsed but unconvincing. He hadn&apos;t prepared for the emotional subtext of those questions - only the factual answers.</li>
        <li>He had no presence on the platforms where design hiring actually happens. Not because he lacked opinions - but because he&apos;d never thought of sharing them as part of getting hired.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We worked with him on one fundamental shift: stop treating the job search as a series of applications, and start treating it as a sustained effort to build credibility in the places where hiring decisions actually form. This is what our <Link href="/programs" className="text-accent hover:underline font-medium">1:1 mentorship program</Link> is built around.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He started maintaining a proper pipeline - tracking where each opportunity was across every stage: applied, first call, assignment, whiteboarding, negotiation. When you see the data, you stop guessing. You know exactly where you&apos;re losing people, and you fix that stage specifically.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He started sharing his thinking on LinkedIn - not performatively, but consistently. Not viral posts, just visible ones. Evidence that he was engaged, had opinions, and could communicate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Three months later, he was at a top MNC. Not because his portfolio improved. Because how he was perceived - before anyone reviewed his portfolio - had changed completely.
      </p>

      <h2 id="linkedin-not-job-board" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        LinkedIn Is Not a Job Board. It&apos;s Where Hiring Decisions Happen Before You Apply.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s what most mid-level designers do with LinkedIn: they update it when they need a job, add the Open to Work badge, apply through Easy Apply, and wait.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s what a hiring manager does when they receive your application: they open your profile. They check your activity. They look at when you last posted anything. They look at who you both know. They form an impression of who you are beyond what your resume says.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your profile is static and your activity is zero, that impression forms in your absence - and it&apos;s usually not favourable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>The Open to Work signal - what it actually communicates</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Open to Work badge is a case study in good intentions creating the wrong perception. Making yourself visible to recruiters is smart. The public green banner is worth examining more carefully.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The implicit question a senior hiring manager asks when they see it: if this person is this good, why are they still available? It&apos;s an unfair assumption. But it&apos;s a real one. The badge that&apos;s meant to signal availability can inadvertently signal that others have passed.
      </p>

      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <strong>XW OBSERVATION</strong><br /><br />
        Among the designers we&apos;ve worked with, the ones who get headhunted - who get approached rather than having to apply - almost never have the public Open to Work badge on.<br /><br />
        The setting that actually works: &apos;Open to Work - Recruiters Only.&apos; Visible to the people who can actually hire you, invisible to the network that will form opinions about your availability.
      </blockquote>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What a genuinely activated profile actually looks like</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        It&apos;s not about posting every day or building an audience. It&apos;s about leaving enough evidence that a hiring manager can form a confident opinion before you&apos;ve said a word.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>A headline that communicates what you do and the kind of problems you solve - not just your job title</li>
        <li>Regular engagement: posts, comments, perspectives shared on design and business topics</li>
        <li>Proof of breadth - you can speak to product strategy, business outcomes, not just deliverables</li>
        <li>Specific outcomes in your experience section, not just responsibilities</li>
        <li>Recommendations from people who&apos;ve worked with you - managers, collaborators, clients</li>
        <li>A visible network that signals you&apos;re part of the industry, not observing it from the outside</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who get the best roles - often without applying - are the ones who built this consistently over months. Not when they needed a job. Long before.
      </p>

      <h2 id="desperation-signal" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Desperation Signal - And Why It Follows You Through Every Stage
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We tell every senior designer the same thing: you cannot afford to think of yourself as just another fish in the sea, and getting a job cannot come at the expense of how you carry yourself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Desperation shows up in ways that feel harmless in the moment:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Applying to roles you&apos;re clearly overqualified for, just to get any call</li>
        <li>Commenting &apos;I&apos;m interested&apos; on job posts instead of asking a real question about the role</li>
        <li>Saying yes to everything in early conversations to move the process forward</li>
        <li>Sending the same generic cold message to twenty recruiters in a week</li>
        <li>Dropping your salary expectations early, before you understand the full offer</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Each of these creates the same impression: this person can be overpowered. And once that perception exists, it travels. It affects how the offer gets structured. It affects how negotiations go. It affects whether they feel they need to respect your time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Expressing genuine interest is not the same as signalling that you need any job that will take you. The first builds your position. The second dissolves it.
      </p>

      <h2 id="portfolio-is-strong" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        &quot;My Portfolio Is Strong&quot; - What We Actually Assess
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When designers come to us having applied to dozens of roles with minimal callbacks, and they say &quot;my portfolio is strong&quot; - we don&apos;t immediately agree or disagree. We assess.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What we most commonly find: they&apos;ve learned to wear a surgeon&apos;s gown. They haven&apos;t learned to perform surgery.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The case studies are well-formatted. The presentation is clean. But underneath:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>No business tongue</strong> - design decisions aren&apos;t connected to commercial outcomes, user retention, conversion, cost reduction, or any metric the business actually tracked. This is exactly what a <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">business-driven portfolio</Link> solves.</li>
        <li><strong>Shallow domain knowledge</strong> - they know the tools and the process, but not the industry context their work sat inside</li>
        <li><strong>Blame patterns</strong> - &apos;the culture didn&apos;t value UX,&apos; &apos;the PM never listened,&apos; &apos;they just wanted to ship fast.&apos; These might be true. But they tell a hiring manager something about how you handle constraints.</li>
        <li><strong>A comparison problem</strong> - they&apos;re comparing their portfolio to other designers&apos; portfolios, not to what a hiring manager actually needs to see</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The hardest thing to say - and we say it plainly - is that the ability to <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">build a portfolio that gets you a job</Link> is a completely different skill from the ability to do excellent UX work in the job. Both matter. Most designers only develop one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Beyond the portfolio: we look at the full pipeline. How many applied, how many called back, how many first conversations, how many assignments, how many offers. When you map that funnel, you stop applying the same fix everywhere. Different stages break for different reasons. Apply the wrong fix to the wrong stage and nothing improves.
      </p>

      <h2 id="build-the-funnel" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Build the Funnel. Track the Stages. Fix the Right Thing.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The single most useful thing you can do today: stop counting applications and start tracking a pipeline.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Five stages every designer should be watching:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Applied</strong> - how many applications sent</li>
        <li><strong>Called back</strong> - how many responded at all</li>
        <li><strong>First conversation</strong> - how many became a real discussion</li>
        <li><strong>Assignment / whiteboarding</strong> - how many reached this stage</li>
        <li><strong>Offer / negotiation</strong> - how many converted</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Zero callbacks? The problem is at the top - visibility, positioning, how your profile reads before anyone sees your portfolio. Callbacks dying after round one? The problem is how you&apos;re showing up in conversation, not your case studies. Dying at assignment stage? That&apos;s a different problem again - one we cover in our <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">senior UX mentorship</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers apply the same fix to all five stages simultaneously. Which means nothing actually improves - they just get busier and more exhausted.
      </p>

      <h2 id="mindset-underneath" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Mindset Underneath All of This
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is a marathon, not a sprint. And in a marathon, how you prepare matters more than how hard you push on the day.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who consistently land senior roles - and land them on their own terms - treat their career like a product. They understand who their &apos;users&apos; are: hiring managers, design leads, the people who will vouch for them. They design their touchpoints deliberately. They measure what&apos;s working. They iterate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your portfolio is not the novel of your career. It&apos;s a chapter. And it&apos;s being read by someone who has 200 other chapters to get through.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Make everything you put out work harder. Be someone a hiring manager has already made up their mind about before you walk in the door.
      </p>

      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <strong>ON THE 80% - WHAT WE&apos;VE SEEN AT XW</strong><br /><br />
        Among designers who complete the full Xperience Wave mentorship program, 80% achieve their career goal - a role change, a title jump, or a significant salary increase - within the program duration.<br /><br />
        What separates the ones who do from the ones who don&apos;t is almost never portfolio quality. It&apos;s whether they were willing to build their visibility infrastructure before they needed it, and whether they were honest about where in the funnel they were actually losing.
      </blockquote>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Not getting calls? Let&apos;s find out exactly why.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Book a free 45-minute strategy call with Xperience Wave. We&apos;ll map your full funnel - visibility, positioning, portfolio, pipeline - and give you a specific plan for what to fix first. No obligations. No pitch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/contact" className="text-accent hover:underline font-medium">Book your strategy call</Link>
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">You&apos;re a Senior Designer in Title. You&apos;re Still Being Treated Like a Delivery Person.</Link></li>
        <li><Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">From Pixel-Pusher to Impact-Maker: Building a Business-Driven UX Portfolio</Link></li>
        <li><Link href="/resources/blogs/grow-as-solo-designer" className="text-accent hover:underline font-medium">How To Grow When You&apos;re The Only Designer On The Team</Link></li>
        <li><Link href="/programs" className="text-accent hover:underline font-medium">Explore the Current Mentorship Program</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Head of Product and Design, Xperience Wave
      </p>
    </>
  ),
  'senior-ux-designer-delivery-person': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Something shifts when you get the title. You expect things to change - the conversations you&apos;re invited into, the weight your opinion carries, the problems you&apos;re trusted with. Then Monday comes. Nothing changed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That confusion - between what the title promised and what the work actually looks like - is the thing I want to talk about. Not because you&apos;re doing something wrong. But because nobody told you what the title actually required of you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>The title didn&apos;t change your role. You were supposed to change your role - and nobody told you that.</strong>
      </p>

      <h2 id="diagnostic-sentences" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Sentences That Reveal Everything
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        When I talk to senior designers, certain sentences come up again and again. I&apos;ve started calling them diagnostic sentences - not complaints, but symptoms.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;I count screens. That&apos;s basically my KPI.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;The tech team overrides my decisions - sometimes down to colours.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;I haven&apos;t been in a single sprint planning session this quarter.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;I genuinely don&apos;t know what success looks like for this product - not according to the org.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Each of these describes the same thing: a designer who is executing other people&apos;s ideas without realising it. A mason who is very skilled, but who is not the architect.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you recognise one of those sentences - this is for you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re also not getting interview callbacks despite having the experience, you might find this useful: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls</Link>
      </p>

      <h2 id="data-confirms" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        This Isn&apos;t Just Your Experience. The Data Confirms It.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In 2019, InVision surveyed 2,200 organisations across 77 countries on how design was actually used inside their companies. The finding was hard to ignore: 83% of those organisations kept design at a purely executional level - focused on screens, flows, and handoffs, not on shaping the product strategy that preceded them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey&apos;s research reinforced this from a different angle. Across 300 publicly listed companies, they found that fewer than 5% of senior leaders could make objective design decisions - and over 40% of those companies weren&apos;t even talking to end users during development. Design was present. It just wasn&apos;t influential.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nielsen Norman Group&apos;s maturity data - drawn from over 5,000 organisations - shows that 49% sit at what they call &quot;Emergent&quot; maturity: UX people in formal roles, but design not yet treated as a strategic priority. Only 4% of organisations reach a level where design is genuinely integrated into decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        So when you feel like a delivery person with a senior title, you are not imagining things. You are experiencing what the data describes as the norm.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The same McKinsey study found that companies where design is integrated - where it sits at the strategic level - generated 32 percentage points more revenue growth and 56 percentage points more total returns to shareholders than their peers over five years. The business case for design influence is not philosophical. It is financial.
      </p>

      <h2 id="org-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Org Problem Is Real. It Is Still Your Responsibility.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to be careful here, because I&apos;ve seen this go wrong in both directions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        On one side, designers who carry all the blame themselves - who assume that if they just do better work, get sharper, produce cleaner outputs, the influence will follow. It won&apos;t. Organisational culture, leadership priorities, and power structures shape how design is used far more than the quality of any single designer&apos;s output.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        On the other side, designers who understand the org problem clearly, name it accurately - and stop there. They diagnose the culture and then wait for it to change. That is equally stuck.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The honest position is in the middle. The organisation is contributing to this situation. So are you, in ways you may not yet see. And the reason to address your part - even though the org needs to change too - is simple:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>You cannot control the org. You can control how you show up inside it.</strong>
      </p>

      <h2 id="pie-model" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The PIE Model: Position, Integrate, Evidence
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, working with mid-to-senior designers across India&apos;s product ecosystem, we&apos;ve observed a consistent pattern in how designers move from execution mode to genuine influence. We&apos;ve formalised it into three stages: PIE.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>P - Position: How are you perceived before you enter the room?</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers seek authority inside the org while their positioning outside the org is undefined. Positioning is not self-promotion - it is clarity about what you stand for and what problems you are equipped to solve.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer who is known externally as someone with a clear point of view on a domain - AI-first product design, fintech onboarding, B2B SaaS research - walks into internal conversations differently than one who is only known by their job title. Positioning creates pull. It means stakeholders come to you rather than assigning to you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not about LinkedIn activity. It is about building subject-matter expertise with enough visibility that the people who matter - internally and externally - associate a specific kind of thinking with your name.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If positioning in the AI space is relevant to you, this is a useful read: <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-First Design: What Senior UX Designers Need to Know</Link>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>I - Integrate: Are you speaking the language of the room?</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One of the most common patterns I see: a senior designer presenting work to product and tech stakeholders using design language. Talking about hierarchy, affordance, research insights, user journeys. The room nods politely and overrides the decision anyway.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Influence does not come from having the right answer in the wrong language. It comes from learning to translate your design thinking into the terms that the business actually uses - retention, activation, conversion, development cost, time to market.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Integration also means presence in the right rooms at the right time - sprint planning, product reviews, quarterly strategy conversations. Not to represent design, but to contribute to the shared problem. That distinction matters. Representing design is advocacy. Contributing to the shared problem is influence.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>E - Evidence: Can you show before you ask?</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where &quot;build evidence&quot; becomes concrete. Evidence is not a portfolio. Evidence is a specific claim, linked to a specific outcome, that you made visible before asking for anything.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It sounds like: &quot;That onboarding flow we redesigned last quarter - drop-off at step 3 went from 67% to 41%. Here&apos;s what we changed and why.&quot; Or: &quot;User research I ran three months ago flagged this problem. Here&apos;s what happened when engineering addressed it.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Evidence changes the ask. Instead of &quot;trust design more,&quot; you are saying &quot;here is what happens when you do.&quot; That is a different conversation. Most designers wait until they have authority to build evidence. The designers who gain authority are the ones who build it first.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Knowing how to frame and present research findings as business evidence is its own skill. This goes deep on it: <Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">Mixed-Methods UX Research: When to Use It, How to Do It</Link>
      </p>

      <h2 id="ashwins-story" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What This Looked Like in Practice: Ashwin&apos;s Story
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Ashwin was a senior designer at an AI-first product company. His tech co-founder was overriding UX decisions down to the colour of buttons. His team lead was functioning as a contributor, not a leader. Ashwin had stopped expecting the culture to change.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When we started working together, his instinct was to push for a new title - design lead, head of design, something that would give him the authority he felt he should have. We reframed the goal. Before asking for the title, build what the title is supposed to represent.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Over four months, we worked through PIE in sequence.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Position first.</strong> We built his SME positioning around AI-first product design - a specific, credible, timely domain. LinkedIn content. One conference talk. Three long-form articles published over six weeks. Nothing dramatic, but consistent enough that when his name came up, people could attach a perspective to it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Then integration.</strong> He spent six weeks learning the cross-functional language in his org - what the product team cared about, what the business metrics were, what the tech lead&apos;s constraints actually were. He stopped presenting design as design. He started presenting it as a solution to their problems. Slowly, he was invited into conversations he had previously been excluded from.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Then evidence.</strong> He documented every design decision that had a measurable downstream effect - even small ones. He made those outcomes visible in weekly standups, in Slack, in 1:1s with his manager. He was not boasting. He was creating a record.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Four months in, Ashwin was being positioned alongside the same team lead he had previously reported to. The gates to strategic conversations had opened - not because the culture changed, but because he had changed how the culture perceived him.
      </p>

      <h2 id="unpopular-opinion" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        An Unpopular Opinion About Where Most Designers Look
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve noticed a pattern in what senior designers spend their energy on when they feel stuck. They worry about design systems when the real gap is governance - who decides what gets built. They learn new AI tools when what they need is AI-first thinking - a point of view on what AI means for their product&apos;s users, not proficiency in the tool. They pursue a new designation when what they need is to understand what a designation requires of you before it will work for you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        There are three kinds of people who hold design leadership titles:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The first has the title in name - it was given, not earned through influence.</li>
        <li>The second manages people but has no real strategic voice.</li>
        <li>The third shapes direction, is treated as a peer by product and engineering leadership, and is accountable to business outcomes, not just design outputs.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The title is the same. The role is entirely different.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The PIE Model is about how you move from the first kind to the third - not by waiting for the org to give you a bigger title, but by becoming someone for whom the bigger title is the only accurate description.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re already at senior level and your goal is to move into a Head of Design, Director, or VP role, our <Link href="/programs" className="text-accent hover:underline font-medium">Tide programme</Link> is built specifically for that transition.
      </p>

      <h2 id="one-thing-this-week" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        One Thing to Do This Week
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Don&apos;t start with positioning. Don&apos;t start with integration. Start with evidence - because it requires no permission and no structural change.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Look back at the last 60 days. Find one design decision that had a downstream effect on a metric the business cares about. Write three sentences: what you changed, why you changed it, what happened. Share it in the next forum you have - a standup, a Slack channel, a 1:1.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is it. One data point, made visible. Rome was not built in a day. But Rome was built intentionally, brick by brick, by people who had decided what they were building before anyone else had seen the blueprint.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your influence is built the same way.
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re a senior designer who has the title but not the influence - and you want to understand what stage of PIE you&apos;re at and what to do about it - we run a free 45-minute strategy call at Xperience Wave.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers we speak to are in the right place for our <Link href="/programs" className="text-accent hover:underline font-medium">Current programme</Link> (for mid-to-senior designers) or our Tide programme (for designers ready to lead teams). The strategy call tells us which, or neither.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/contact" className="text-accent hover:underline font-medium">Book your free strategy call</Link>
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Sources</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>InVision, The New Design Frontier (2019). Survey of 2,200+ organisations across 77 countries.</li>
        <li>McKinsey &amp; Company, The Business Value of Design (2018). 300 publicly listed companies, 2M+ data points.</li>
        <li>Nielsen Norman Group, The State of UX Maturity: Data from Our Self-Assessment Quiz (2022). n=5,371.</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas, CEO &amp; Co-founder, Xperience Wave
      </p>
    </>
  ),
  'ai-job-designer-type': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Most designers using AI right now are making a foundational mistake. Not with the tools they&apos;ve chosen. With how they understand what AI actually is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They treat it like a knowledgeable colleague who happens to work very fast. They ask it questions and accept the answers. They use its outputs as a starting point and rarely interrogate whether the starting point is sound. And when AI is wrong - which it regularly is, not randomly but in patterns - they don&apos;t catch it, because they don&apos;t understand the mechanism that produced the error.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI is a predictive model. It generates outputs that are statistically likely given its training data and your prompt. It does not know what is true. It does not know your user. It does not understand your product context. And it delivers every response - the accurate ones and the completely wrong ones - with exactly the same confidence.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a limitation that is going to be patched in the next version. It is structural. A model trained on the wrong corpus, given a skewed prompt, or asked to operate outside its training distribution will produce polished, convincing, systematically flawed output. And a designer who doesn&apos;t understand this will not only miss the errors - they will build decisions on top of them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who are genuinely thriving right now are not the ones who use the most AI tools. They are the ones who understand this well enough to know what AI can be trusted with, what it cannot, and how to structure their thinking around the gap. That understanding is not in any tool tutorial. It comes from going deep enough to see how the model actually works.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That is the starting point. Everything else in this piece builds from it.
      </p>

      <h2 id="work-already-gone" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Work That Is Already Gone
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to be precise here, because the conversation is usually either panic or dismissal. Both are wrong in the same way - neither is specific enough to be useful.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        What AI is replacing is not designers. What it is replacing is a category of output: work that is repeatable, bounded, and does not require genuine contextual judgment to produce. Specifically:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Screen beautification where structure and content are already defined</li>
        <li>Social media creatives built from brand templates</li>
        <li>Interaction patterns for known problem types</li>
        <li>Evaluative research on pre-formed hypotheses - agents now handle sample simulation, behavioral data, and heatmaps at a fraction of the time and cost</li>
        <li>UI copy variations once tone and voice are established</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Figma Make, Lovable, Nanobanana, Adobe Firefly, and CLI tools have largely commoditised these. Not perfectly - but well enough that the version of you defined entirely by producing them is no longer competitively priced.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The industry data is not subtle. UX designer job postings dropped 71% from their 2022 peak. UX researcher postings fell 73% in the same period. These are not economic corrections. They are structural signals about which roles could not demonstrate value above what automation provides.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The researcher cuts are the sharpest illustration of this. Google Cloud eliminated all UX researchers below a certain seniority level - not some, all. Meta, Amazon, and Microsoft followed similar patterns. The teams that survived were the ones whose work was visibly connected to product decisions that moved business outcomes. The ones that got cut produced insights in a silo, slowly, without connecting them to anything the organisation could act on.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The skill of research is not disappearing. The role of researcher as a separate, output-producing silo is. There is a direct line from this to what we covered in the <Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">mixed-methods research guide</Link> - insights that cannot demonstrate business impact become invisible in budget conversations. The same principle applies to every design role right now.
      </p>

      <h2 id="three-types-losing" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Types of Designer Who Are Losing Ground
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I look across the designers I have worked with, placed, and observed over the last two years, I see three recognisable patterns in the ones who are struggling. What is notable is that these patterns are not about skill level. They are about how someone has positioned themselves relative to a landscape that has already changed.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>The Execution Specialist</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Technically strong. One lane. Years of being recognised and rewarded for doing it exceptionally well. The Figma files are immaculate. The component libraries are thorough. The interaction specs are precise.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The problem is not the skill. The problem is that the output of that skill is now reproducible at a fraction of the cost. The immaculate prototype can be generated in fifteen minutes. The component library can be scaffolded from a design system with a prompt. The precision that took years to develop is no longer the differentiator it was.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I hear this regularly from designers with eight, ten, twelve years of experience: &quot;I am comfortable with Figma alone.&quot; In 2025, that is not a skill. That is a ceiling.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Execution Specialist is not at risk because they are unskilled. They are at risk because they have not expanded the frame of what they do - and the frame they are in has become, through no fault of their own, substantially automated.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>The Surface Expander</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the more dangerous pattern, because it genuinely looks like adaptation. The Surface Expander discovered that AI could help them do things they couldn&apos;t before. They couldn&apos;t write SEO content - now they can. They couldn&apos;t code - now they can scaffold a landing page. They couldn&apos;t produce video scripts - now they can. They have expanded their surface area, and they feel capable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But none of it goes deep. The SEO content doesn&apos;t connect to a conversion strategy. The code doesn&apos;t reflect an understanding of what the developer actually needs to maintain it. The video script doesn&apos;t draw on a genuine understanding of narrative or audience psychology. Each capability is real in the narrowest sense - they can produce the output - but there is no depth underneath it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Thinly spreading across capabilities you don&apos;t understand is not the same as building depth across disciplines you do.</strong> One looks productive. The other actually is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Surface Expander is particularly exposed because they feel capable. The tools are producing. The outputs exist. But when a product conversation gets strategic - when the question is what should we build, for whom, and why - the tools don&apos;t answer that. Thinking does. And the Surface Expander has been outsourcing their thinking to AI without building the judgment to evaluate what comes back.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the predictive model problem again, at the career level. They have accepted confident-sounding outputs without the domain depth to know when those outputs are wrong.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>The Refuser</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Refuser has decided that AI is a trend worth waiting out. They have built this into their professional identity - the designer who still creates at a foundational level, who insists that real craft isn&apos;t prompt generation, that the human element cannot be replaced.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some version of this is correct. Craft matters. Judgment matters. The human-centred part of this work is not automatable in any meaningful sense.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the Refuser uses this truth selectively, to justify not engaging at all. And the cost is now visible. Designers who have integrated AI into their process are moving faster, covering more ground, and getting access to more conversations as a result. The Refuser, equally capable on craft, is simply not in those rooms. Not because they were excluded - because they made themselves slower.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have landed the senior title but still feel like a delivery person in practice, this pattern is part of what we examine in the piece on <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">design influence and the PIE model</Link>. The Refuser and the Execution Specialist often end up in the same place - executing without shaping - for different reasons.
      </p>

      <h2 id="kritikas-arc" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Kritika&apos;s Arc - What It Actually Teaches
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Kritika started in fashion design. Not UX, not product, not digital. Fashion.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Over years, she moved into communication design, then visual design, then UI, then product and UX leadership. Each move was not a pivot away from what she knew. It was an extension of it. The aesthetic sensibility she built in fashion carried into visual communication. The systems thinking from visual design carried into interface work. The earlier disciplines did not disappear - they became the foundation everything subsequent was built on.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        By the time she was leading product and UX design, she had genuine depth across multiple disciplines. She could have a real conversation about visual hierarchy because she had spent years in it. A real conversation about research because she had developed the habit of watching how people actually responded to what she made. A real conversation about product strategy because she had been involved in enough different project types to understand what success looked like at the business level - not just the design level.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        She did not become a generalist by collecting surface knowledge. She became one by going deep in multiple directions, one at a time, over time. The breadth is real because each column under it is real.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the pattern I see consistently in designers who are thriving right now. Not broad and shallow. Deep in more than one column. Nielsen Norman Group formalised this in 2025 - AI is driving a return of the UX generalist, and specifically, the generalists who thrive are not people who dabble across disciplines, but people who have genuine cross-domain depth that lets them cross-pollinate insights in ways single-lane specialists cannot.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Kritika&apos;s arc is not a lucky sequence of job changes. It is a deliberate pattern of building adjacent depth - each move grounded in real expertise, each expansion building on what existed rather than replacing it. It is also a pattern that is teachable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Identifying where your genuine depth already sits, and which adjacent discipline would make you significantly harder to replace, is one of the core things we map in the <Link href="/programs" className="text-accent hover:underline font-medium">Current programme</Link>.
      </p>

      <h2 id="ai-first-thinking" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What AI-First Thinking Actually Looks Like in Practice
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is a version of AI literacy that most articles are selling: learn these tools, add them to your resume, ship faster. This is tool adoption. It is not useless. But it is not the thing that separates the designers who are genuinely repositioning themselves from the ones who are keeping up.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI-first thinking is different. It starts with understanding what AI-enabled systems can now do that hardcoded systems could not - and designing around that from the beginning, not as an afterthought.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Specifically: systems can now learn with time and data rather than requiring manual updates. They can make autonomous decisions within defined parameters. Experiences can be meaningfully personalised at scale, not just A/B tested. There are patterns emerging across AI-native products that users are beginning to recognise and expect - and those patterns have design implications that don&apos;t exist in non-AI product work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is also a question every AI-first designer must answer for each product: is AI the driver here, or is it the enabler underneath? Sometimes the technology should be invisible - what matters is what it allows the user to do, not what it is. Getting that call wrong in either direction creates products that feel either gimmicky or opaque.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Understanding this changes how you spend your time. The designer with AI-first thinking stops spending significant effort on detailed wireframes for interactions that will be dynamically generated. They stop producing design systems that are comprehensive component inventories rarely deployed in practice. They stop debating at the pixel level in situations where the system will adapt the output anyway. They get to the questions that actually matter - what should this system learn, what decisions should it make, where does human judgment need to stay in the loop - faster and earlier.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And critically: they bring the predictive model problem into every product conversation. When the team assumes AI will handle a judgment call - who this is shown to, what it recommends, when it intervenes - the AI-first designer is the one asking: trained on what? Evaluated how? What does it get wrong, and what happens to the user when it does?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We go deeper on the product design implications of this in the <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-first design piece for senior UX designers</Link>. The short version: the designers who are building AI-native products well are not the ones who know the most tools. They are the ones who understand the model well enough to design responsibly around its failure modes.
      </p>

      <h2 id="irreplaceable-profile" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Profile of the Designer Who Won&apos;t Be Replaced
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Based on everything above - what I have observed across designers I have worked with, what the data shows, and what the landscape is visibly rewarding - the designer who remains irreplaceable combines three things. Not one. All three.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Deep Generalism</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not shallow breadth. Genuine depth across multiple disciplines - research, interaction design, visual design, strategy, content, product thinking - developed the way Kritika developed it: one real expansion at a time, each built on existing depth rather than surface-level capability collected for the CV.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The bar for each discipline does not need to be specialist-level. But it needs to be deep enough to have a real conversation in it. Deep enough to catch what AI gets wrong in it. Deep enough to see how one discipline informs another in ways a single-lane expert cannot.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Design Centricity</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the ability to hold user needs, business outcomes, technical constraints, and strategic direction simultaneously - and make design decisions that serve all of them at once. Not sequentially. Not by handing off between specialisms. In the same conversation, at the same moment.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design centricity is what makes a designer indispensable rather than just useful. It is what allows someone like Kritika to walk into a product strategy conversation and contribute something that neither the PM nor the engineer could bring - not because she has a different title, but because she has trained herself to see problems through a lens that integrates all of those perspectives into something coherent.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is also the gap between being treated as a delivery person and being treated as a strategic contributor - which we examine directly in the piece on the <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">PIE model and design influence</Link>.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>AI-First Thinking</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not AI tool usage. The distinction matters: tool usage means using AI to do what you were already doing, faster. AI-first thinking means you design products and workflows with a clear understanding of what AI-enabled systems can now do - and what they cannot be trusted to do without human judgment in the loop.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This includes understanding the predictive model problem at the product level. Not just in your own workflow, but in the products you are designing. When the system makes a recommendation, a decision, a personalisation - what is it actually doing, and what happens to the user when it gets it wrong?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designer who can answer that question is not just building products that happen to use AI. They are the person in the room who understands what the system is actually doing. That is a different kind of value from anything that can be replaced by another AI tool.
      </p>

      <h2 id="honest-question" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        One Honest Question for This Week
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Look at the last three months of your work. Be specific.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>What percentage of your output could have been substantially assisted - or replaced - by AI tools that already exist?</li>
        <li>In the conversations where strategic decisions were made about your product or project, were you in the room? Were you shaping the decision, or executing after it was made?</li>
        <li>When AI produced an output in your workflow - a layout suggestion, a research synthesis, a copy variation - did you evaluate it against your understanding of the domain, or accept it because it was polished and confident?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If the first number is high, the second is mostly no, and the third is mostly the latter - you are not at risk from AI. You are at risk from a designer who has answered these questions differently and acted on what they found.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The move from execution-layer designer to deep generalist with AI-first thinking is not a sudden shift. Kritika did not redesign her career in a month. She made adjacent moves, grounded in real depth, over years. The pattern is gradual and intentional - and the time to start is now, while there is still room to build deliberately rather than reactively.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are earlier in the career arc and wondering why the job market feels different than it should - this connects directly to what we covered in the piece on <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">why UX applications stop converting to calls</Link>. The surface-level symptoms (no callbacks, no advancement) often trace back to positioning problems, not capability problems.
      </p>

      <h2 id="what-to-do-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Where You Sit in This - and What to Do Next
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we work with designers who are mid-career and want to build the depth and positioning that makes them harder to replace - by a tool, and by another designer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The <Link href="/programs" className="text-accent hover:underline font-medium">Current programme</Link> is for designers at the 2-6 year mark who are ready to move from execution-layer work to strategic contribution. We map where genuine depth already exists, identify the adjacent discipline that creates the most leverage, and build the AI-first thinking that changes how you show up in product conversations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Tide programme is for designers at or approaching a leadership level, working through what the landscape shift means for how design leadership needs to operate from here.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are not sure which of the three patterns in this piece describes you - or whether you are somewhere between them - the clearest next step is a <Link href="/contact" className="text-accent hover:underline font-medium">free 45-minute strategy call</Link>. We will map where you actually are, what is working, and what to focus on first. No sales pitch. Walk away with clarity either way.
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls (It&apos;s Not Your Portfolio)</Link></li>
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">You&apos;re a Senior Designer in Title. You&apos;re Still Being Treated Like a Delivery Person.</Link></li>
        <li><Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">From Pixel-Pusher to Impact-Maker: Building a Business-Driven UX Portfolio</Link></li>
      </ul>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Research References</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>ROSSUL (2025): How AI Is Changing What It Means to Be a UX Designer</li>
        <li>Nielsen Norman Group (July 2025): The Return of the UX Generalist</li>
        <li>State of User Research Report 2025, User Interviews</li>
        <li>UXPA Salary Survey 2024</li>
        <li>The Voice of User (Oct 2025): Google Cloud&apos;s Cuts and the Bigger Story</li>
        <li>McKinsey State of AI 2025</li>
        <li>PwC 2025 Global AI Jobs Barometer</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Co-founder &amp; Head of Design, Xperience Wave
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
    { id: 'curriculum-doesnt-care', title: 'Their Curriculum Doesn\'t Care About You' },
    { id: 'certificates-reality', title: 'What Those Certificates Actually Gave You' },
    { id: 'senior-demands', title: 'What Senior Roles Actually Demand' },
    { id: 'savinays-story', title: 'What Actually Works: Savinay\'s Story' },
    { id: 'question-to-ask', title: 'The Question You Should Be Asking Yourself' },
  ],
  'business-driven-ux-portfolio': [
    { id: 'five-portfolio-sins', title: 'The Five Portfolio Sins I See Every Week' },
    { id: 'business-driven-portfolio', title: 'What a Business-Driven Portfolio Looks Like' },
    { id: 'crisp-framework', title: 'The CRISP Framework' },
    { id: 'success-stories', title: 'Hari, Kritika, and Jonah' },
    { id: 'what-portfolio-tells', title: 'Your Portfolio Tells Recruiters One Thing' },
    { id: 'start-with-one', title: 'Start With One' },
  ],
  'ai-predicts-so-do-you-difference': [
    { id: 'prediction-machine', title: 'You\'re Already A Prediction Machine' },
    { id: 'ai-does-same', title: 'AI Does The Same Thing - Sort Of' },
    { id: 'skin-in-the-game', title: 'The Difference Is Skin In The Game' },
    { id: 'predictions-go-wrong', title: 'What Happens When Predictions Go Wrong' },
    { id: 'what-this-means', title: 'So What Does This Mean For You?' },
    { id: 'bottom-line', title: 'The Bottom Line' },
    { id: 'references', title: 'References' },
  ],
  'grow-as-solo-designer': [
    { id: 'things-that-didnt-work', title: 'The Things That Didn\'t Work' },
    { id: 'what-actually-clicked', title: 'What Actually Clicked' },
    { id: 'the-advocate', title: 'The Advocate Who Changed Everything' },
    { id: 'what-i-wish', title: 'What I Wish Someone Had Told Me' },
    { id: 'final-thoughts', title: 'Final Thoughts' },
    { id: 'need-help', title: 'Need Help Navigating This?' },
  ],
  'mixed-methods-ux-research-guide': [
    { id: 'crowdfunding-case-study', title: 'How Mixed Methods Doubled Revenue' },
    { id: 'when-you-need-mixed-methods', title: 'When You Actually Need Mixed Methods' },
    { id: 'spear-framework', title: 'The SPEAR Framework' },
    { id: 'practical-tips', title: 'Practical Tips for Limited Time & Budget' },
    { id: 'career-impact', title: 'Why This Matters for Your Career' },
    { id: 'key-takeaways', title: 'Key Takeaways' },
  ],
  'why-no-ux-interview-calls': [
    { id: 'volume-game', title: 'You\'re Playing a Volume Game in a Credibility Market' },
    { id: 'one-year-of-silence', title: 'One Year of Silence. Three Months to a Top MNC.' },
    { id: 'linkedin-not-job-board', title: 'LinkedIn Is Not a Job Board' },
    { id: 'desperation-signal', title: 'The Desperation Signal' },
    { id: 'portfolio-is-strong', title: '"My Portfolio Is Strong" - What We Actually Assess' },
    { id: 'build-the-funnel', title: 'Build the Funnel. Track the Stages. Fix the Right Thing.' },
    { id: 'mindset-underneath', title: 'The Mindset Underneath All of This' },
  ],
  'senior-ux-designer-delivery-person': [
    { id: 'diagnostic-sentences', title: 'The Sentences That Reveal Everything' },
    { id: 'data-confirms', title: 'The Data Confirms It' },
    { id: 'org-problem', title: 'The Org Problem Is Real. It Is Still Your Responsibility.' },
    { id: 'pie-model', title: 'The PIE Model: Position, Integrate, Evidence' },
    { id: 'ashwins-story', title: 'Ashwin\'s Story' },
    { id: 'unpopular-opinion', title: 'An Unpopular Opinion About Where Most Designers Look' },
    { id: 'one-thing-this-week', title: 'One Thing to Do This Week' },
  ],
  'ai-job-designer-type': [
    { id: 'work-already-gone', title: 'The Work That Is Already Gone' },
    { id: 'three-types-losing', title: 'Three Types of Designer Who Are Losing Ground' },
    { id: 'kritikas-arc', title: 'Kritika\'s Arc - What It Actually Teaches' },
    { id: 'ai-first-thinking', title: 'What AI-First Thinking Actually Looks Like' },
    { id: 'irreplaceable-profile', title: 'The Designer Who Won\'t Be Replaced' },
    { id: 'honest-question', title: 'One Honest Question for This Week' },
    { id: 'what-to-do-next', title: 'Where You Sit in This' },
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
  'business-driven-ux-portfolio': {
    title: 'How to Build a Business-Driven UX Portfolio That Lands Senior Roles | Xperience Wave',
    description: 'Your UX portfolio is full of screens and nobody\'s calling back. Here\'s how to rebuild it around business impact, strategic decisions, and the narrative that actually gets you hired.',
    keywords: ['UX portfolio', 'UX case study', 'senior UX designer portfolio', 'UX portfolio tips', 'design impact', 'business-driven design', 'portfolio for senior roles', 'UX career growth', 'UX interview'],
  },
  'ai-predicts-so-do-you-difference': {
    title: 'AI Predicts. So Do You. Here\'s The Difference That Actually Matters.',
    description: 'Both AI and humans are prediction machines. But there\'s one crucial difference - skin in the game. Explore what neuroscience tells us about how we learn vs how machines learn.',
    keywords: ['AI prediction', 'predictive brain', 'neuroscience', 'machine learning', 'human vs AI', 'skin in the game', 'how AI learns', 'design thinking'],
  },
  'grow-as-solo-designer': {
    title: 'How To Grow When You\'re The Only Designer On The Team',
    description: 'A real story about surviving as the solo designer, building trust in hostile environments, finding advocates, and growing into a design leader when nobody cares about design.',
    keywords: ['solo designer', 'only designer on team', 'design leadership', 'growing as a designer', 'UX career growth', 'design advocate', 'stakeholder management'],
  },
  'mixed-methods-ux-research-guide': {
    title: 'Mixed-Methods UX Research: A Practical Guide to Combining Qual & Quant | Xperience Wave',
    description: 'Most designers treat qual and quant as separate tools. Senior designers know how to combine them. Learn the SPEAR framework for mixed-methods research that actually drives business outcomes.',
    keywords: ['mixed methods UX research', 'qualitative quantitative UX research', 'UX research methods', 'combining qual quant UX', 'SPEAR research framework', 'how to combine qualitative and quantitative UX research', 'mixed methods research in UX design', 'UX research for senior designers'],
  },
  'why-no-ux-interview-calls': {
    title: 'Why You\'re Not Getting UX Interview Calls (It\'s Not Your Portfolio) | Xperience Wave',
    description: 'Sending 100 job applications and hearing nothing back? The real problem isn\'t your portfolio - it\'s how you\'re thinking about the entire process. Here\'s what we\'ve learned from 140+ UX mentorships.',
    keywords: ['UX designer not getting interview calls', 'UX job search India 2026', 'senior UX job India', 'UX personal brand designer', 'UX interview tips', 'hidden job market design'],
  },
  'senior-ux-designer-delivery-person': {
    title: 'You\'re a Senior Designer in Title. You\'re Still Being Treated Like a Delivery Person. | Xperience Wave',
    description: 'You have the title. You still feel like a delivery person. Almas, Co-founder at Xperience Wave, breaks down why - and introduces the PIE Model: a three-stage approach to moving from execution to influence.',
    keywords: ['senior UX designer delivery person', 'senior designer not respected at work', 'design leadership India', 'UX influence at work', 'design strategy role', 'PIE model design leadership'],
  },
  'ai-job-designer-type': {
    title: 'AI Isn\'t Taking Your Job. This Type of Designer Will | Xperience Wave',
    description: 'AI isn\'t the threat. A specific type of designer is. Murad breaks down the three archetypes emerging in the AI era - and which one hiring managers are choosing.',
    keywords: ['AI taking UX designer jobs', 'AI replacing UX designers', 'future of UX design India', 'deep generalism designer', 'AI-first UX thinking', 'UX designer career 2025'],
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

  if (!post || post.upcoming) {
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
