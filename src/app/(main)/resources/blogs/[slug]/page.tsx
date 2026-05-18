import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getPublishedPosts, getCategoryLabel, getCategoryColor, formatDate } from '@/data/blogPosts';
import CTASection from '@/components/shared/CTASection';
import MobileTOC from '@/components/blog/MobileTOC';
import EvaluatorGate from '@/components/blog/EvaluatorGate';
import SalaryNegotiationGPTGate from '@/components/blog/SalaryNegotiationGPTGate';
import SystemsAuditGate from '@/components/blog/SystemsAuditGate';
import BudgetPrepKitGate from '@/components/blog/BudgetPrepKitGate';
import { FreeTrainingCTA } from '@/components/blog/FreeTrainingCTA';

// Blog content with internal links for SEO
const blogContent: Record<string, React.ReactNode> = {
  'personal-ai-workflow-designer': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You have probably tried at least a dozen AI tools in the last year. You have generated layouts from prompts, used ChatGPT to draft research questions, let an AI transcribe your user interviews, maybe even experimented with synthetic users or AI-moderated sessions. Some of it felt useful. Most of it felt like extra work &mdash; learning a new tool, figuring out the right prompts, evaluating whether the output was actually good or just fast.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And if you are being honest, your AI usage is still chaotic. You reach for AI when you remember it exists, not because it is integrated into how you work. You use it for random tasks &mdash; summarising a document here, generating copy there &mdash; without a clear system for when it helps and when it gets in the way. You do not have a workflow. You have a collection of experiments.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is normal. Most designers are in the same place. The problem is not a lack of tools &mdash; the landscape is overwhelming and gets bigger every month. The problem is that nobody has given you a filter for deciding where AI belongs in your specific work and where it does not. This blog gives you that filter, along with a practical approach to building a personal AI workflow that actually sticks.
      </p>

      {/* Inline image 1 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&q=80"
          alt="A designer at a clean workspace with digital tools and notebooks, representing the balance between AI-assisted and manual design work"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="deliverable-vs-outcome" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Filter: Deliverable vs Outcome
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every design activity produces something. A research session produces a transcript. A synthesis workshop produces an affinity diagram. A design exploration produces screens. A stakeholder meeting produces alignment &mdash; or at least it should.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But not all of these outputs serve the same purpose. Some are <strong>deliverables</strong> &mdash; artifacts you hand to someone else or reference later. Others are <strong>outcomes</strong> &mdash; changes in your own understanding, your team&apos;s alignment, or your stakeholders&apos; confidence that happened through the process of doing the work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This distinction is the filter. When the goal of an activity is primarily a deliverable &mdash; something tangible that another person needs &mdash; AI can often produce it faster without meaningful loss. When the goal is primarily an outcome &mdash; something that changes how you or your team thinks, understands, or relates to the problem &mdash; AI can produce the artifact but strip out the learning that was the actual point.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A transcript is a deliverable. Empathy with the user you interviewed is an outcome. AI can produce the first. It cannot produce the second. A competitive analysis document is a deliverable. Your internalised understanding of the competitive landscape &mdash; the kind that lets you make judgment calls in real time during a stakeholder conversation &mdash; is an outcome. AI can produce the document. The understanding only comes from engaging with the material yourself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This does not mean you should never use AI for outcome-oriented activities. It means you should use it differently. For deliverable-oriented work, AI can replace the effort. For outcome-oriented work, AI should augment the effort &mdash; handling the mechanical parts while preserving the thinking, the exposure, and the interpretation that create the outcome.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Most designers&apos; AI usage is chaotic because they have not made this distinction. They use AI the same way for everything &mdash; generate, review, ship &mdash; regardless of whether the activity&apos;s value lies in the artifact or in the process of creating it. Once you internalise the filter, the chaos resolves into a system.
      </p>

      <h2 id="building-the-workflow" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Building the Workflow: Activity by Activity
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The right AI workflow is not one clean process that applies to every day. Your work shifts &mdash; some days you are deep in research, some days you are designing, some days you are in back-to-back stakeholder meetings, some days you are reviewing engineering implementations. The workflow has to be modular, adapting to whatever mode you are operating in. Here is how to think about AI integration across the major modes of design work, using the deliverable-vs-outcome filter.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        When You Are Researching
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI genuinely helps:</strong> Transcription is the most obvious win &mdash; every minute of manual transcription you eliminate is a minute you can spend on interpretation. AI transcription tools (Otter, Fathom, Grain) have crossed the threshold of reliability for most interview contexts. Let AI handle the mechanical capture so you can be fully present during the conversation. Similarly, AI can accelerate desk research &mdash; scanning competitor products, summarising industry reports, pulling relevant data from multiple sources. These are information-gathering tasks where speed helps without undermining understanding, as long as you are reading and evaluating what the AI surfaces, not just accepting the summary as truth.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where to pull back:</strong> The interview itself. The moment you outsource the conversation to an AI moderator, you lose the ability to follow unexpected threads, to notice the hesitation in someone&apos;s voice that signals a deeper issue, to ask the follow-up question that nobody scripted because nobody anticipated the response. AI-moderated interviews have a place &mdash; for scaling validation studies or running quick concept checks &mdash; but they should supplement live interviews, not replace them. The outcome of research is not a transcript or a report. It is the researcher&apos;s internalised understanding of the user. That understanding builds through direct exposure to real people, and no AI summary can replicate the experience of sitting across from a user who says something that reframes everything you assumed about the problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Practical system:</strong> Use AI for capture and initial processing (transcription, highlight tagging, pattern flagging). Do the interpretation yourself. Read the transcripts even after AI has summarised them &mdash; not because the summary is wrong, but because the details the summary left out are often where the most important insights live.
      </p>

      {/* Inline image 2 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80"
          alt="Team synthesis session with sticky notes on a whiteboard representing collaborative design research and analysis"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        When You Are Synthesising
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI genuinely helps:</strong> Processing volume. If you have 20 interview transcripts, AI can surface frequency-based patterns, cluster related quotes, and identify themes faster than manual affinity diagramming. Use it as a first pass &mdash; let AI propose the clusters, then evaluate whether those clusters actually represent the patterns that matter or whether the AI has grouped things by surface-level keyword similarity rather than meaningful conceptual connection. AI is also strong at cross-referencing &mdash; connecting patterns from interviews with patterns from analytics data or support tickets. This kind of multi-source synthesis is genuinely tedious to do manually, and AI handles it well enough to be a useful starting point.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where to pull back:</strong> The debate about what the data means. Synthesis is not just pattern identification &mdash; it is interpretation. It is the conversation where your team argues about whether a pattern is significant or coincidental, whether a finding confirms the hypothesis or contradicts it, whether the data supports the direction the team wants to go or points somewhere uncomfortable. That conversation is where shared understanding gets built, and it cannot be outsourced to a tool. Steve Portigal, author of <em>Interviewing Users</em>, warns about &quot;premature convergence&quot; &mdash; AI clustering themes too neatly and missing the messy, contradictory insights that often lead to breakthroughs. The mess is the point. If synthesis feels clean and easy, something important was probably lost.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Practical system:</strong> Let AI do the first pass on clustering and pattern identification. Then sit with the output as a team and challenge it. What did the AI miss? What did it over-weight? Where are the contradictions that the AI resolved too neatly? Use the AI output as a starting point for discussion, not as a finished analysis.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        When You Are Designing
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI genuinely helps:</strong> This is where AI has made the most legitimate progress. Layout generation, component suggestion, responsive adaptation, design-to-code translation, asset creation &mdash; all mechanical tasks where AI saves meaningful time without replacing your judgment. You are still deciding what to build and why. The tool is accelerating the execution of those decisions. Figma AI for layer management and content rewriting, v0 or Lovable for quick functional prototypes, Midjourney or Firefly for visual exploration &mdash; these tools genuinely reduce the friction between idea and artifact, which means you can explore more directions in less time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where to pull back:</strong> Using AI-generated layouts as final designs without evaluation. A generated layout is a starting point, not a solution. It does not account for the specific user flows your research identified, the edge cases your engineering team flagged, the accessibility requirements your product must meet, or the strategic choices that should differentiate your product from competitors using the same AI tools to generate the same generic patterns. The risk is not that the output is bad. The risk is that it is adequate &mdash; good enough to ship but lacking the intentionality that comes from a designer who understood the problem deeply and made deliberate choices about how to solve it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Practical system:</strong> Use AI for the first 20 percent of exploration &mdash; generating rough directions, creating variations, producing responsive layouts. Then take the most promising direction and develop it manually, applying your understanding of the user, the business context, and the constraints. The AI gets you to the starting line faster. You run the race.
      </p>

      {/* Inline image 3 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&q=80"
          alt="A person presenting to stakeholders in a meeting room, representing the human side of design communication and relationship-building"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        When You Are Communicating with Stakeholders
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI genuinely helps:</strong> Drafting. Status updates, meeting summaries, presentation outlines, research report structures &mdash; AI can produce serviceable first drafts of all of these in minutes, which you then refine with context and tone. This is production work that takes longer than it should, and AI handles it well. Similarly, AI can help you prepare for stakeholder conversations &mdash; generating talking points, anticipating objections, structuring your argument &mdash; without replacing the conversation itself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where to pull back:</strong> The relationship. <Link href="/resources/blogs/stakeholder-management-for-designers" className="text-accent hover:underline font-medium">Stakeholder management</Link> is a human-trust activity. It depends on showing up consistently, reading organisational dynamics, understanding individual motivations, and building credibility through actions over time. No AI tool fixes a broken stakeholder relationship. A polished AI-generated deck presented to a stakeholder who does not trust you will not change their mind. The deck is the deliverable. Trust is the outcome. AI helps with the first. Only you can build the second.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Practical system:</strong> Use AI for production drafts of written communication. Review everything for tone, context, and political sensitivity before sending &mdash; AI does not understand the internal dynamics of your organisation. For verbal communication, use AI to prepare but never to replace your presence in the room.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        When You Are Testing and Validating
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI genuinely helps:</strong> Automated heuristic evaluation and accessibility audits. Tools like Baymard&apos;s UX-Ray and Stark can catch known-pattern violations with documented accuracy that matches or exceeds manual review. Use them as an early filter &mdash; catch the obvious problems before investing in user testing. AI can also accelerate analysis of session recordings by flagging moments of friction, hesitation, or confusion.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where to pull back:</strong> Replacing user testing with automated evaluation. Heuristic tools catch violations of known patterns. They do not catch the user who misunderstands your mental model, the task flow that works in testing but fails in real-world context, or the emotional response that makes someone abandon your product despite being technically able to complete the task. The outcome of testing is not a usability report. It is the team&apos;s understanding of how real people experience the product &mdash; and that understanding comes from watching, not from reading a machine-generated analysis.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Practical system:</strong> Run automated checks first. Then test with real users. Use AI to process the test data (transcription, pattern flagging) but do the interpretation yourself. The findings that matter most are almost always the ones nobody expected.
      </p>

      <h2 id="three-principles" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The System Behind the System: Three Principles
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Once you have applied the filter across your design activities, three principles keep the workflow coherent.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 1: Start with Friction, Not with Tools
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Do not browse Product Hunt looking for AI tools and then try to fit them into your workflow. Instead, identify the tasks that create the most friction in your week &mdash; the ones that take disproportionate time relative to their value, the ones you procrastinate on, the ones that feel mechanical and repetitive. Those are your integration points. Find tools that address those specific friction points and ignore everything else. A senior product designer shared a version of this insight that resonates: the tools that survived in his workflow were not the most impressive ones &mdash; they were the ones that solved friction he had been working around for months. Everything else got uninstalled within a week.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 2: Maintain Your Fundamentals Deliberately
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The risk of a mature AI workflow is capability erosion &mdash; your skills weaken because you stopped practising them. A designer who has not manually coded a transcript in a year cannot tell when an AI summary missed something important. A designer who has not built a layout from scratch in months cannot evaluate whether a generated layout is good or just acceptable. Deliberately do some work without AI, regularly, not because it is efficient but because it keeps your judgment sharp. The goal is to use AI from a position of expertise, not from a position of dependency.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 3: Your Workflow Will Change Every Quarter
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Build for that. AI tools change, improve, get acquired, or get deprecated constantly. The workflow you build today will not be the workflow you use in six months. Build your system around the principles (deliverable vs outcome, friction-first, fundamentals preservation) rather than around specific tools. The principles are stable. The tools are not.
      </p>

      {/* Inline image 4 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&q=80"
          alt="A weekly planner and calendar layout representing the structure and rhythm of a personal AI-integrated design workflow"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="realistic-week" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What a Realistic Week Looks Like
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is not a prescriptive schedule &mdash; it is an illustration of how the filter plays out across a typical week for a mid-to-senior designer working on a product team.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Monday:</strong> Stakeholder kickoff for a new feature. You used AI to draft the meeting agenda and prepare talking points over the weekend. In the meeting, you are fully present &mdash; reading the room, asking clarifying questions, building alignment. After the meeting, you use AI to generate a summary and action items, then review and send. AI handled the production. You handled the relationship.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Tuesday&ndash;Wednesday:</strong> Research sprint. You conduct live interviews &mdash; no AI moderation, because the outcome you need is not a transcript but a deep understanding of how users think about this problem. AI transcribes in real time. Between sessions, you use AI to flag emerging patterns across the first three transcripts. You notice the AI clustered two themes together that you think are actually distinct &mdash; you make a note to explore that in the remaining interviews.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Thursday:</strong> Synthesis and exploration. You spend the morning in a collaborative synthesis session with your PM &mdash; whiteboarding, debating, arguing about what the research means. AI is not involved in this conversation because the outcome is alignment, not an artifact. In the afternoon, you use AI to generate three layout directions based on the problem framing you arrived at in the morning. You evaluate them, pick the most promising direction, and start developing it manually.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Friday:</strong> Design review and async communication. You present rough work to stakeholders &mdash; early, before it is polished, while there is still room to change direction. After the review, you use AI to draft the follow-up email summarising feedback and next steps. You review the draft for tone and political sensitivity, adjust two sentences, and send.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Across the week, AI was used extensively &mdash; for transcription, pattern flagging, layout generation, meeting prep, and written communication. It was deliberately excluded from the activities where the outcome depended on human judgment, direct experience, or relationship-building: the interviews themselves, the synthesis debate, and the stakeholder conversations. That is a workflow. Not a tool list. Not a collection of random experiments. A system with a clear filter for what gets automated and what stays human.
      </p>

      <h2 id="start-here" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Start Here
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are reading this and your AI usage is still chaotic, here is the simplest way to start building a system:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This week, write down every task you do. At the end of each task, mark it <strong>D</strong> (deliverable &mdash; the value is the artifact) or <strong>O</strong> (outcome &mdash; the value is the thinking or relationship that happened while doing it). At the end of the week, look at your D list. That is where AI should live. Look at your O list. That is where you should be deliberate about how much AI you introduce &mdash; and whether you introduce it at all.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That single exercise will give you more clarity than any tool recommendation list. Because the question was never &quot;which AI tools should I use?&quot; The question was always &quot;which parts of my work are about producing things and which parts are about becoming a better designer?&quot; AI is exceptional at the first. The second is still yours.
      </p>

      <FreeTrainingCTA text="At Xperience Wave, AI-native design workflow is embedded throughout our programmes - not as a separate module but as an integrated layer across research, strategy, portfolio, and interview preparation" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 mt-8">
        If you want to build a personal AI system that actually makes you better, not just faster, <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">book a free strategy call</a> and let us look at where your workflow has gaps.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Steve Portigal &mdash; <em>Interviewing Users: How to Uncover Compelling Insights</em>. On premature convergence and the value of messy, contradictory qualitative data during synthesis.</li>
        <li>Baymard Institute &mdash; UX-Ray automated heuristic evaluation tool. Documented accuracy benchmarks for pattern-violation detection in e-commerce UX audits.</li>
        <li>Lyssna &mdash; &quot;2026 UX Research Trends.&quot; 48% of researchers see synthetic users as impactful, but emotional nuance and contextual behaviour remain limitations.</li>
        <li>NNGroup &mdash; &quot;State of UX 2026.&quot; On the evolution of generalist roles and the importance of strategic problem-solving over tool proficiency.</li>
        <li>Xperience Wave &mdash; Direct observation from 140+ mentorship engagements and corporate training programmes with designers integrating AI workflows across research, design, and stakeholder communication.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Product &amp; Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of design leadership experience across fintech, healthtech, and industrial technology. The AI workflow patterns in this blog come from direct observation of how designers at product companies across India are integrating AI into their daily practice &mdash; and where they are struggling to make it stick.
      </p>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-First Design: What Senior UX Designers Need to Know in 2026</Link> &mdash; the broader landscape of AI fluency for senior designers</li>
        <li><Link href="/resources/blogs/evaluating-ai-tools-design-leaders-framework" className="text-accent hover:underline font-medium">A Design Leader&apos;s Framework for Evaluating AI Tools</Link> &mdash; the team-level version of this decision framework, plus a downloadable directory of 60+ tools</li>
        <li><Link href="/resources/blogs/ai-predicts-so-do-you-difference" className="text-accent hover:underline font-medium">AI Predicts. So Do You. Here&apos;s the Difference</Link> &mdash; what human design judgment does that AI cannot replicate</li>
        <li><Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">Which Type of Designer Will AI Replace?</Link> &mdash; an honest assessment of where AI displaces and where it does not</li>
        <li><Link href="/resources/blogs/design-thinking-vs-design-strategy" className="text-accent hover:underline font-medium">Design Thinking Was Never For Designers. Design Strategy Is.</Link> &mdash; the strategic judgment layer that determines whether AI makes you better or just faster</li>
        <li><Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">Mixed-Methods UX Research: A Complete Guide</Link> &mdash; the research fundamentals that AI augments but cannot replace</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Murad, Co-founder &amp; Head of Product &amp; Design, Xperience Wave
      </p>
    </>
  ),
  'what-should-design-team-look-like-2026': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Every design leader I know is stuck on the same question right now, and most are too uncomfortable to say it plainly: should I restructure my team?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The pressure is real. AI tools can generate layouts, write copy, produce prototypes, and synthesise research faster than they could two years ago. Budgets are under scrutiny. Leadership wants more from fewer people. And the uncomfortable noise in the background - from LinkedIn posts, from vendor pitches, from conference talks - keeps saying the same thing: the future is leaner, faster, AI-native. Adapt or get replaced.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Some of that is true. A lot of it is oversimplified. And almost all of it makes the mistake of treating AI as the only lens through which to evaluate a design team&apos;s future. It is not. Some teams&apos; biggest problems have nothing to do with AI - they are struggling with stakeholder alignment, research maturity, basic design infrastructure, or the systemic issues that cause teams to plateau regardless of what tools they use. Layering AI on top of a broken operating model does not fix the operating model. It just makes the broken parts move faster. Before you restructure anything, you need to understand what your team actually needs to do - not what the industry is telling you teams should look like.
      </p>

      {/* Inline image 1 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=800&q=80"
          alt="Abstract futuristic concept representing AI and automation reshaping how design teams work and are structured"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="question-nobody-asking" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Question Nobody Is Asking Honestly
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When AI enables a designer to finish a task in two hours instead of eight, what happens to the other six hours?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The honest answer is that most organisations have not decided. And in the absence of a deliberate decision, the default takes over: the designer gets three more tasks. Output goes up. Throughput increases. Leadership sees more artifacts being produced and concludes the team is more productive. Nobody asks whether the artifacts are better, whether the decisions behind them are stronger, or whether the team is actually learning anything from the work they are doing at speed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a choice anyone makes consciously. Nobody walks into a meeting and says &quot;I want my team to prioritise quantity over quality.&quot; It happens through incentive structures, through how performance is measured, through what gets celebrated in stand-ups and what gets ignored. When a designer ships 40 screens in a week, it looks impressive. When a designer spends that same week on one insight that prevents the team from building the wrong thing for three months, it looks like they did nothing. The system rewards visible output, so visible output is what gets produced - and AI accelerates that dynamic because it makes the visible output easier and faster to create.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The risk is not theoretical. More decisions per day means more opportunities for mistakes - especially when the thinking time that used to be embedded in the production process has been automated away. A designer who spent four hours building a prototype was, often without realising it, using that time to think through edge cases, reconsider assumptions, and notice problems. A designer who generates a prototype in twenty minutes has a functional artifact but has not had the same cognitive processing time. The artifact exists. The thinking behind it may not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Design leaders need to confront this question before they touch the org chart: does your organisation want AI to increase the volume of design work or the quality of design decisions? Both are legitimate directions, but they require fundamentally different team structures, different evaluation criteria, and different investments. And if you do not answer this question deliberately, the organisation will default to volume - because volume is visible, measurable, and easy to report upward.
      </p>

      <h2 id="not-everything-about-ai" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Not Everything Is About AI
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before we go further into team structure, a necessary correction: the conversation about design teams in 2026 has become almost entirely about AI, and that is a distortion.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        AI is one force reshaping design teams. It is not the only force. Design teams are also being shaped by budget pressure that predates AI, by the ongoing challenge of proving design&apos;s value to leadership, by the maturity gap that exists in most organisations, by the difficulty of hiring and retaining senior talent, and by the fundamental question of whether the organisation treats design as a strategic function or a production service. These forces interact with AI but they are not caused by AI, and they will not be solved by AI.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A design team that cannot get research into the roadmap will not fix that problem by adopting AI research tools. A design team whose stakeholders see them as delivery people rather than strategic partners will not change that perception by producing more artifacts faster. A design team that has never figured out how to operate at scale will not solve its coordination problems with better tooling. These are human problems - culture, leadership, influence, trust - and they require human solutions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The point is not that AI does not matter. It does. But evaluating your team structure purely through the AI lens produces distorted conclusions. You end up cutting roles that the team desperately needs because those roles do not seem &quot;AI-relevant,&quot; or you invest heavily in AI tooling while the foundational capabilities that make the tools useful remain undeveloped. The best design teams in 2026 will use AI extensively. They will also be clear-eyed about what AI does not fix.
      </p>

      <h2 id="four-functions" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Four Functions Every Design Team Needs
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The traditional design team was structured around roles: UX designer, UI designer, researcher, visual designer, interaction designer, content designer. Each role had a lane. AI is collapsing those lanes - a single designer with the right tools can now do work that used to require multiple specialists. But this does not mean you need fewer people. It means you need to restructure around functions rather than roles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        There are four functions that every design team needs to perform, regardless of size, regardless of AI adoption level, regardless of industry.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Orchestrators &mdash; the people who get the work done
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Orchestrators are not workflow managers sitting above the work. They are the people with their hands in it - the designers who figure out the best combination of human effort, AI tools, and collaborative input to actually produce the work. They are the ones who know when to prompt an AI agent, when to sketch by hand, when to pull in a specialist, and when to slow down and do the work manually because the thinking matters more than the speed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In a pre-AI team, every designer was essentially an orchestrator of their own work. In a 2026 team, orchestration becomes more complex and more consequential because the options are wider. Should this exploration be done in Figma AI or as a manual sketching session with the PM? Should the research synthesis be run through an AI tool first or built collaboratively in a workshop? Should the prototype be generated from a prompt or built component by component because the design system requires precision the AI cannot reliably deliver? These are judgment calls, and the quality of these calls determines whether AI accelerates the team or creates a mess of disconnected artifacts that look professional but do not hold together as a coherent experience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Whether orchestration is agentic - meaning AI agents autonomously handle parts of the workflow - or entirely human-driven depends on the organisation&apos;s maturity and risk tolerance. Most teams will use a hybrid: AI agents handle routine decisions (generating responsive variants, running accessibility scans, suggesting component matches) while humans handle the judgment calls (which research method to use, whether the design direction is strategically sound, when to push back on a brief that is solving the wrong problem). The orchestrator is the person who makes those boundary decisions - and making them well requires having done the manual work enough times to know what is lost when it is automated.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Strategists &mdash; the people who decide what to build and why
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Strategists connect design decisions to business outcomes. They are in the room when product direction is set, when roadmaps are built, when leadership decides where to invest. They do not just design solutions - they frame the right problems, identify opportunities that product and engineering cannot see on their own, and translate user insight into the language of business metrics and competitive positioning.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This function has always existed in senior design roles, but in 2026 it becomes the primary differentiator between a design team that influences decisions and one that decorates them. As AI handles more execution, the value of design shifts toward the strategic layer - the judgment about what to build, for whom, and why. A team without strategists produces beautiful, fast, well-crafted solutions to problems nobody prioritised. Strategists need deep business fluency - not just design principles but an understanding of the unit economics, the competitive dynamics, and the <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">conversations that happen at the leadership level</Link> where priorities are actually set. They also need the research capability to connect qualitative insight to quantitative validation so their recommendations land with evidence, not just opinion.
      </p>

      {/* Inline image 2 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
          alt="A diverse team collaborating in a modern meeting room, representing the strategic and governance functions of a design team"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Governors &mdash; the people who maintain quality and standards
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Governors ensure consistency, quality, and standards across everything the team produces - whether created by a human, an AI, or a combination. They own the design system, the brand standards, the accessibility requirements, the research protocols, and the criteria by which all design output is evaluated.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This function becomes critical in an AI-augmented team because AI produces volume, and volume without governance is chaos. When multiple designers use different AI tools to generate components, and each tool interprets the design system slightly differently, and nobody checks whether the outputs meet accessibility standards or brand guidelines - the product ends up looking assembled rather than designed. Governors prevent this by maintaining the standards and ensuring the team has clear criteria for what &quot;good enough&quot; means versus what requires manual refinement.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Governors also play an essential role in capability preservation. They determine when AI output must be reviewed manually, when the team should work without AI assistance to maintain craft skills, and how new team members are trained to recognise quality before being allowed to use AI as a shortcut. Without this function, the team&apos;s collective judgment erodes as more work is delegated to tools that produce acceptable output but lack the contextual understanding that distinguishes adequate design from excellent design.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Practitioners &mdash; the people who design
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the function most restructuring conversations forget to account for. Orchestrators, strategists, and governors are coordination and leadership functions. Someone still has to do the actual design work - the research, the exploration, the interaction design, the visual refinement, the prototyping, the testing. The production layer has not disappeared. It has been augmented by AI, which means practitioners work differently than they did two years ago, but the work itself still requires human judgment, taste, and craft.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Practitioners in 2026 are AI-augmented generalists who can operate across the design process - research, design, testing - rather than being confined to a single specialism. They use AI tools fluently but they also know when to set the tools aside and work manually, because they understand that the purpose of some design activities is the thinking, not the deliverable. The best practitioners are not the fastest producers. They are the ones who consistently make good decisions under ambiguity - and that skill comes from experience, not from tooling.
      </p>

      <h2 id="specialist-question" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Specialist Question: Who Is Actually at Risk?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The industry narrative says specialists are at risk. The data says something more nuanced.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        NNGroup&apos;s State of UX 2026 report says generalist roles are recovering faster than specialist ones, and that successful practitioners will be &quot;adaptable generalists who treat UX as strategic problem solving.&quot; But the UX Design Institute&apos;s 2026 report says the opposite - that demand is growing for specialists in UX research, accessibility, AI experience design, and content design. And salary data from IxDF and KORE1 shows that specialists with domain expertise in regulated industries (healthcare, fintech, data security) command significant premiums over generalists - sometimes $25,000 to $40,000 more - because the domain knowledge takes years to acquire and is not interchangeable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The resolution of this apparent contradiction is straightforward once you stop thinking in terms of &quot;specialist vs generalist&quot; and start thinking in terms of what the specialisation is built around.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Specialists who built their identity around a method or a tool are at risk. &quot;I am a wireframing specialist&quot; is at risk because AI generates wireframes from prompts. &quot;I am a usability testing specialist who runs tests and writes reports&quot; is at risk because AI can moderate interviews, transcribe sessions, and generate thematic analyses. These designers defined themselves by the deliverable they produce, and the deliverable has been commoditised.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Specialists who built their expertise around a domain, a context, or a type of thinking are more valuable than ever. &quot;I am a fintech UX specialist who understands how regulatory constraints shape user flows&quot; is not at risk - AI cannot replicate that domain judgment. &quot;I am an accessibility specialist who understands how assistive technologies interact with design patterns&quot; is not at risk - that expertise requires deep knowledge that no AI tool currently provides. &quot;I am a UX strategist who can align research findings with business objectives and present them to executives&quot; is not at risk - that is a strategic and relational skill.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The distinction is between specialists who prematurely created boundaries around narrow skill sets without understanding the broader context those skills serve, and specialists who developed deep expertise in a domain or capability that requires human judgment. The first group is being commoditised. The second group is being promoted.
      </p>

      <h2 id="team-size-structure" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What This Means for Team Size and Structure
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The answer to &quot;how many designers do I need?&quot; depends on which of the four functions your team is currently missing. Not how many heads you have - which functions are covered and which are not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A startup with 2-3 designers needs each person to cover multiple functions. One designer who can orchestrate AI-augmented workflows, think strategically about what to build, and maintain basic quality standards. This is the solo designer challenge amplified by the AI layer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A mid-size team with 5-8 designers should have at least one person whose primary responsibility includes orchestration and one who focuses on governance, with the remaining designers operating as practitioner-strategists - people who do hands-on design work informed by strategic thinking. The biggest risk at this scale is under-investing in governance because it feels like overhead.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        An enterprise team with 15+ designers needs dedicated people in each function, possibly with small teams under each. Orchestration becomes a design ops role. Strategy becomes a principal designer or design director responsibility. Governance becomes a design system lead plus research standards lead. The biggest risk at this scale is over-investing in governance and creating bureaucracy that slows the team without improving quality.
      </p>

      {/* Inline image 3 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=80"
          alt="Abstract architectural structure representing the systematic framework and organisational design needed for modern design teams"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="three-mistakes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Mistakes Leaders Are Making Right Now
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Cutting juniors entirely and going senior-only.</strong> The logic seems sound - AI handles entry-level work. But this creates a pipeline problem that will cripple the team in two to three years. Senior designers develop through years of practice, mentorship, and increasing responsibility. If the industry stops hiring juniors, there will be nobody to hire at senior level in 2028. Jakob Nielsen predicts entry-level hiring will become &quot;more apprenticeship-like&quot; - fewer generalist juniors, more trainees attached to specific domains like accessibility, content, design systems, and research ops. The role changes. The function remains essential.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Restructuring around AI tools instead of around functions.</strong> Some leaders are designing teams around the AI tools they have adopted. This is the equivalent of building a team around &quot;the person who uses Excel.&quot; Tools change. Vendors get acquired. If your team structure depends on a specific tool, a vendor decision you do not control can break your operating model. Structure around the four functions. Let people choose the tools that serve those functions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Treating restructuring as a one-time event.</strong> AI capabilities change quarterly. The leaders who restructured in early 2025 based on the capabilities available then have already had to restructure again. The teams that perform best build continuous adaptation into their operating model - regular reviews of which work is human-only, human-plus-AI, and AI-only, with the expectation that those boundaries shift constantly.
      </p>

      <h2 id="team-that-survives" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Team That Survives Is the Team That Adapts
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The design teams that will thrive are not the smallest or the largest. They are the ones that understood the shift from roles to functions, from headcount to capability, and from output speed to decision quality. They will use AI extensively - but they will also know where their team&apos;s real value lies, and they will protect that value even when the pressure to cut, automate, and accelerate is intense.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The shape of a design team in 2026 is not a smaller version of the 2022 team. It is a fundamentally different structure - built around orchestration, strategy, governance, and practice, with AI handling the mechanical production that used to require most of the headcount. But the human capabilities that remain - judgment, empathy, stakeholder influence, strategic thinking, quality standards - are more important now than they have ever been. Because when the mechanical work is cheap, the strategic work becomes the scarce resource. And scarce resources are what organisations pay a premium for.
      </p>

      <FreeTrainingCTA text="If you are restructuring your design team or building one from scratch, the free training shows how we help leaders build teams around functions, not just roles" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 mt-8">
        At Xperience Wave, we help design leaders navigate this transition through <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">team training programmes</Link> that build capability across all four functions, and design services that model what a modern design function looks like in practice. If you are restructuring your team and unsure where to start, <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">book a strategy call</a> - we will audit your current team against the four functions and help you build a transition plan.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>NNGroup &mdash; &quot;State of UX 2026.&quot; Generalist roles recovering faster than specialist; successful practitioners will be &quot;adaptable generalists who treat UX as strategic problem solving.&quot;</li>
        <li>UX Design Institute &mdash; &quot;2026 UX Design Report.&quot; Growing demand for specialists in UX research, accessibility, AI experience design, and content design.</li>
        <li>IxDF &amp; KORE1 &mdash; 2026 salary data. Domain specialists in regulated industries (healthcare, fintech, data security) command $25,000&ndash;$40,000 premiums over generalists.</li>
        <li>Lyssna &mdash; &quot;2026 UX Research Trends.&quot; 48% of researchers see synthetic users as impactful, but limitations in emotional nuance and contextual behaviour are clear.</li>
        <li>Jakob Nielsen &mdash; Prediction that entry-level design hiring will become &quot;more apprenticeship-like&quot; with trainees attached to specific domains.</li>
        <li>Xperience Wave &mdash; Direct observation from corporate training engagements and team audits with design teams at product companies across India.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Product &amp; Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of design leadership experience across fintech, healthtech, and industrial technology. The team structure patterns in this blog come from direct work with design teams at product companies across India through XW&apos;s mentorship and corporate training programmes.
      </p>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/hiring-senior-designers-immature-design-org" className="text-accent hover:underline font-medium">What Happens When You Hire Senior Designers Into an Immature Design Org</Link> &mdash; the mismatch problem that restructuring without maturity creates</li>
        <li><Link href="/resources/blogs/evaluating-ai-tools-design-leaders-framework" className="text-accent hover:underline font-medium">A Design Leader&apos;s Framework for Evaluating AI Tools</Link> &mdash; how to decide which AI tools your team should adopt and which to avoid</li>
        <li><Link href="/resources/blogs/design-team-plateau-10-people" className="text-accent hover:underline font-medium">Why Most Design Teams Plateau After 10 People</Link> &mdash; structural challenges that become visible at scale</li>
        <li><Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Your Design Team Doesn&apos;t Have a Skills Problem &mdash; They Have a Systems Problem</Link> &mdash; when the issue is infrastructure, not talent</li>
        <li><Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">Which Type of Designer Will AI Replace?</Link> &mdash; an honest assessment of where AI displaces and where it does not</li>
        <li><Link href="/resources/blogs/hidden-cost-promoting-ic-designer-manager" className="text-accent hover:underline font-medium">The Hidden Cost of Promoting Your Best IC Designer to Manager</Link> &mdash; role transitions that restructuring often triggers</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Murad, Co-founder &amp; Head of Product &amp; Design, Xperience Wave
      </p>
    </>
  ),
  'evaluating-ai-tools-design-leaders-framework': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        There is an AI tool for every design activity now. Tools that generate personas. Tools that synthesise interview transcripts. Tools that create UI layouts from prompts. Tools that write copy, build prototypes, run competitive audits, and produce usability reports - all in minutes.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        And design leaders are drowning in the decision of which ones to adopt.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The default evaluation criteria most teams use - time saved, output quality, ease of integration - are not wrong, but they miss the most important question. They measure whether the tool produces the deliverable faster. They do not measure whether it preserves the purpose of the activity that creates the deliverable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That distinction is the difference between a tool that accelerates your team and a tool that hollows it out.
      </p>

      {/* Inline image 1 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
          alt="A design leader reviewing dashboards and analytics on multiple screens, representing the complexity of evaluating AI tool adoption"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="speed-first-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Problem With Speed-First Evaluation
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Take persona creation as an example. A tool can generate a persona in two minutes. Name, photo, demographics, goals, frustrations, a quotable one-liner. It looks indistinguishable from a persona a team spent two weeks building from real interview data. If you evaluate the tool purely on output - did it produce a persona? Yes. Was it fast? Yes. Does it look professional? Yes - then the tool passes every standard evaluation criterion.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the purpose of building a persona was never to produce the document. The purpose was to build empathy. When a team sits with interview transcripts, argues about which patterns matter, clusters behaviours into archetypes, and debates which frustrations are universal versus edge cases - something happens to the people in that room. They start internalising the user&apos;s perspective. They carry that perspective into design decisions, stakeholder conversations, and trade-off discussions for weeks after the workshop. The persona document is a byproduct of that internalisation. It is not the thing itself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        When you outsource that activity to an AI tool, you get the document in two minutes. You did not achieve any empathy. Maybe the AI did - but the AI is not making design decisions for the next three months. Your team is. And your team just skipped the process that was supposed to prepare them to make those decisions well. This is not an argument against using AI in design. It is an argument for evaluating AI tools through a lens that most teams are not using - one that asks whether the tool accelerates the work or amputates the thinking.
      </p>

      <h2 id="purpose-first-framework" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Purpose-First Framework: How to Evaluate AI Tools Across the Design Process
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every design activity exists for a reason that goes beyond its deliverable. The deliverable is the artifact - the thing you can point to, put in a deck, hand to engineering. The purpose is the thinking, learning, alignment, or judgment that the activity was designed to produce. When a tool preserves both, it is genuinely useful. When it produces the deliverable but strips out the purpose, it creates a dangerous illusion of progress - the team feels productive because artifacts are being generated, but the quality of decisions degrades because the thinking that should inform those decisions never happened.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Here is how this lens applies across end-to-end design activities.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Strategy and Problem Framing
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Develop a shared understanding of the problem space, align stakeholders on what success looks like, and identify the constraints and opportunities that should shape the design approach. This is the work that determines whether you are solving the right problem - and it is inherently collaborative, political, and contextual. It requires understanding the business goals, the competitive landscape, the technical constraints, and the stakeholder dynamics - none of which can be outsourced to a tool that does not sit in your organisation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> Competitive analysis and landscape scanning. AI tools can process large volumes of competitor products, market reports, and industry data faster than any team can manually. Use them for the raw input - the data collection and initial pattern recognition. This is time-consuming work that does not require human judgment at the collection stage, and accelerating it gives the team more time for the interpretation and decision-making that does require judgment.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Generating strategy documents, positioning statements, or problem framing outputs from prompts. These artifacts look strategic but lack the organisational context, stakeholder nuance, and business understanding that make strategy useful. A strategy document nobody debated is a document nobody owns - and a document nobody owns will not survive its first encounter with a VP who disagrees with it. If your team is trying to <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">get a seat at the product strategy table</Link>, that seat is earned through the quality of strategic thinking, not the speed at which strategy documents are produced.
      </p>

      {/* Inline image 2 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&q=80"
          alt="A team collaborating on a whiteboard with sticky notes, representing the human judgment required in strategy and research activities"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        User Research
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Build genuine understanding of user behaviour, motivations, and unmet needs. Develop empathy that informs design judgment. Surface insights that challenge assumptions and reveal opportunities the team would not have identified from internal data alone. Research exists to make the team smarter about the people they are designing for - and that learning happens through direct exposure to users, not through reading summaries of that exposure.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> Transcription and initial coding are the most obvious wins. Tools that transcribe interviews, tag themes, and surface repeated patterns across multiple sessions save hours of manual work without stripping out the human judgment. The researcher still reads the transcripts, still interprets the patterns, still decides which themes matter and which are noise. The tool handles the mechanical labour of processing; the human handles the intellectual labour of understanding. Similarly, AI can accelerate survey design by suggesting question structures, identifying potential bias in phrasing, and analysing open-text responses at scale. These are grunt-work tasks where speed genuinely helps without undermining the purpose of the activity.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Synthetic users and AI-generated interview responses. Lyssna&apos;s 2026 research trends report found that 48 percent of researchers see synthetic users as an impactful trend - but the limitations are clear. Synthetic users cannot replicate the emotional nuance, contextual behaviour, or surprising responses that make real user research valuable. The moments that change a product&apos;s direction - the user who says something nobody expected, the workaround nobody anticipated, the emotional reaction that reframes the entire problem - do not come from synthetic data. They come from sitting across from a real person and paying attention. Use synthetic users for early directional input or edge-case stress testing, but never as a replacement for real human contact. The purpose of research is understanding, and understanding requires exposure to the unpredictability of real people.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Data Analysis and Synthesis
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Transform raw data into actionable insight. Identify patterns, contradictions, and opportunities that inform design direction. Synthesis is where the team develops shared understanding - it is the bridge between &quot;we have data&quot; and &quot;we know what to do.&quot; The collaborative nature of synthesis - the debates, the clustering, the &quot;wait, that contradicts what we assumed&quot; moments - is where team alignment and design judgment are built.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> Pattern identification across large datasets. If you have 30 interview transcripts, AI can surface frequency-based patterns faster than a team manually coding affinity diagrams. If you have survey data from 500 respondents, AI can run statistical analyses and flag correlations in seconds. Use it to process volume, surface candidate patterns, and identify outliers. These are tasks where AI&apos;s processing speed adds genuine value without removing the human interpretation layer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Automated insight generation. When a tool tells you &quot;users find the checkout process confusing,&quot; that is not an insight - it is a summary. An insight is the interpretation: why is it confusing, for which users, at which step, and what does that tell us about how users think about the product that we did not previously understand? The synthesis step - where the team looks at the data, argues about what it means, and arrives at a shared interpretation - is where design judgment lives. Skipping it means the team has data and deliverables but no shared understanding of what to do with them. If your team is building <Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">mixed-methods research capability</Link>, the integration of qualitative and quantitative findings is inherently a human judgment activity. No tool can tell you whether the stories explain the numbers or contradict them - only a researcher who understands both can make that call.
      </p>

      {/* Inline image 3 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
          alt="A designer working on UI components and layout variations on screen, representing the intersection of AI tools and design craft"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        UI Design and Prototyping
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Explore solution spaces, make abstract ideas tangible, and create artifacts that can be tested with users and reviewed by stakeholders. Design exploration is where creativity, craft, and judgment intersect - the designer is making hundreds of micro-decisions about hierarchy, flow, interaction patterns, and visual communication, each one informed by their understanding of the user, the business context, and the technical constraints.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> This is where AI tools have made the most legitimate progress. Layout generation from prompts, component suggestion, responsive adaptation, asset creation, and design-to-code conversion are all areas where AI saves meaningful time without undermining the designer&apos;s judgment - because the designer is still making the strategic decisions about what to build, and the tool is accelerating the execution of those decisions. Figma AI, for example, helps with layer renaming, content rewriting, and design variation generation - all mechanical tasks that free the designer to focus on higher-order thinking. Similarly, tools like v0 and Lovable can generate functional prototypes from descriptions, giving teams something to react to and test with users much faster than building from scratch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Using AI-generated layouts as final designs without human evaluation. A generated layout is a starting point, not a solution. It does not account for the specific user flows your research identified, the edge cases your engineering team flagged, or the accessibility requirements your product needs to meet. Design leaders who see AI generating &quot;finished&quot; screens in minutes and conclude that they need fewer designers are making the same mistake as the leader who saw a persona generated in two minutes and concluded that research takes too long. The deliverable looks done. The thinking behind it never happened.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Usability Testing and Validation
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Evaluate whether the design actually works for real users. Identify friction, confusion, and failure points before the product ships. Testing exists to catch the things the team could not anticipate - and the most valuable findings are almost always the ones nobody expected.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> Automated heuristic evaluation, accessibility auditing, and analytics-based friction detection. Tools like Baymard&apos;s UX-Ray can evaluate interfaces against established heuristic guidelines with documented 95 percent accuracy. These tools are excellent for catching known issues - contrast failures, missing labels, inconsistent patterns - at a speed no manual audit can match. Use them as an early filter to catch the obvious problems before investing in user testing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Replacing user testing entirely with automated evaluation. Heuristic tools catch violations of known patterns. They do not catch the user who misunderstands your mental model, the task flow that works in testing but fails in real-world context, or the emotional response that makes a user abandon your product despite technically being able to complete the task. Automated evaluation and human testing answer different questions. Using one as a substitute for the other is not efficiency - it is a blind spot.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Stakeholder Communication
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The purpose:</strong> Build trust, align expectations, and ensure design decisions are understood and supported by the people who need to champion them. <Link href="/resources/blogs/stakeholder-management-for-designers" className="text-accent hover:underline font-medium">Stakeholder management</Link> is fundamentally a human-relationship activity - it depends on reading organisational dynamics, understanding individual motivations, and building credibility through consistent, transparent communication over time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where AI can genuinely help:</strong> Drafting status updates, generating presentation outlines, summarising research findings for non-design audiences, and preparing talking points for stakeholder meetings. These are production tasks where AI saves time on the writing without affecting the quality of the relationship. The content still needs human review and contextualisation, but the first draft can be accelerated significantly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where AI creates a false sense of progress:</strong> Believing that better-formatted stakeholder communication will fix a broken stakeholder relationship. No tool can compensate for the fundamental stakeholder management skills that designers need - early involvement, process transparency, insight-led presentations, and continuous communication. If the relationship is broken, a polished AI-generated deck will not fix it. It will just make the broken relationship look slightly more professional.
      </p>

      <h2 id="evaluation-checklist" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Evaluation Checklist for Design Leaders
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before adopting any AI tool for your design team, run it through these five questions:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>1. What activity does this tool accelerate?</strong> Be specific. Not &quot;design&quot; or &quot;research&quot; - which step, in which phase, for which type of project?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>2. What is the purpose of that activity - beyond the deliverable it produces?</strong> If the activity exists to build empathy, alignment, or judgment within the team, the tool needs to preserve that learning process, not bypass it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>3. Does the tool accelerate the mechanical part of the activity or replace the thinking part?</strong> Transcription is mechanical. Interpretation is thinking. Layout generation is mechanical. Design strategy is thinking. The best AI tools accelerate the mechanical and free up time for the thinking. The worst ones replace the thinking and call it efficiency.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>4. What happens to your team&apos;s capability if you remove this tool in six months?</strong> If the team can still do the work - maybe slower but with the same quality of judgment - the tool was genuinely additive. If the team cannot function without it because they never developed the underlying skill, the tool created a dependency that weakens your design capability.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>5. Does this tool serve your team&apos;s current maturity level?</strong> A team with strong research fundamentals can safely use AI to accelerate synthesis because they know what good synthesis looks like and can evaluate the output. A team that has never done synthesis manually will not know when the AI output is wrong - and will build products on top of flawed interpretations without realising it.
      </p>

      {/* Inline image 4 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
          alt="A team evaluating tools and frameworks on a large screen with charts and data, representing the structured evaluation process for AI tools"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="download-directory" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Download: The Complete AI Design Tools Directory + Evaluation Scorecard
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We built a companion resource for this blog - a spreadsheet with 60+ AI tools categorised across every design activity (strategy, research, synthesis, UI design, testing, stakeholder communication, and design ops), each rated for purpose-risk so you can see at a glance which tools accelerate the mechanical work and which ones risk bypassing the thinking.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        It includes three tabs:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Tab 1: AI Tools Directory</strong> - 60+ tools with what they do, the purpose they serve, a purpose-risk rating (colour-coded), pricing, free tier availability, and the team maturity level required to use them responsibly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Tab 2: Evaluation Scorecard</strong> - a 7-question framework you can fill in for any tool your team is considering. Scores roll up into a clear recommendation: Adopt, Adopt with Guardrails, Pilot Carefully, or Do Not Adopt Yet.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Tab 3: Quick Reference</strong> - a one-page summary of Purpose vs Deliverable for each design activity, including what you actually lose if AI bypasses the activity.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Use it in your next team meeting when someone says &quot;we should adopt this tool.&quot; Pull up the scorecard, walk through the questions together, and make a decision the whole team understands.
      </p>

      <FreeTrainingCTA text="Download the AI Design Tools Directory and Evaluation Scorecard - 60+ tools rated for purpose-risk, plus a scoring framework for your next adoption decision" />

      <h2 id="capability-erosion" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Capability Erosion Risk Nobody Is Talking About
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is a version of this conversation that is not being had in most design leadership meetings, and it should be. When you automate an activity that your team currently performs, you save time. But you also stop practising the skill that activity develops. Over months, that skill atrophies. And if the tool changes, the pricing model shifts, or the company decides to switch platforms - your team can no longer perform the activity without the tool. This is not hypothetical. It is how operational dependency works in every industry, and design is not exempt.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Consider a team that uses AI to synthesise all of its research. After a year, the researchers on that team have not manually coded a transcript, built an affinity diagram from scratch, or sat in a room debating what a pattern means. They have reviewed AI-generated summaries and approved them. Their synthesis muscle has weakened - not because they are bad researchers, but because they have not used it. Now imagine the tool is discontinued, or the company switches to a platform that does not have synthesis features, or a project requires the kind of nuanced cross-study integration that the tool cannot handle. The team is stuck. They have the title of researcher but not the practised capability, and rebuilding that capability takes months of deliberate effort.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Design leaders need to think about AI tools the way athletes think about equipment. Better shoes make you faster, but they do not make you a runner. If you stop training because the shoes are good enough, you lose the conditioning that makes the shoes useful in the first place. The best teams will use AI to go faster while continuing to practise the fundamentals - not because the fundamentals are enjoyable, but because they are the foundation that makes AI output trustworthy. A designer who has never built a persona manually cannot evaluate whether an AI-generated persona is good. A researcher who has never coded transcripts manually cannot tell when the AI missed a pattern. The skill is not just in doing the work - it is in knowing what good looks like, and that knowledge only comes from having done the work yourself, repeatedly, under varied conditions.
      </p>

      {/* Inline image 5 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
          alt="A person training and building skills at a desk with both digital tools and traditional notebooks, representing the balance between AI efficiency and fundamental skill development"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="uncomfortable-truth" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Uncomfortable Truth for Design Leaders
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The hardest part of evaluating AI tools is not the evaluation itself. It is resisting the organisational pressure to adopt them purely because competitors are adopting them, or because leadership sees AI as a blanket cost-reduction strategy, or because &quot;everyone is talking about it.&quot; The decision to adopt a tool should be driven by a specific problem in your workflow that the tool solves without undermining the design capability that makes your team valuable. If you cannot name that problem specifically - if the justification is &quot;we should be using AI&quot; rather than &quot;we need to solve X and this tool addresses X&quot; - you are adopting technology for its own sake, and your team will spend more time integrating and managing the tool than they save by using it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is also a harder version of this conversation, which is about headcount. Some leaders are looking at AI tools and asking whether they can reduce their design team. The answer is nuanced but important: AI can reduce the number of hours needed for mechanical production work, which means fewer people may be needed for pure execution. But the strategic, interpretive, and relational work of design - research, synthesis, stakeholder management, design judgment - is not being replaced by AI in any meaningful way. If anything, the teams that lean heavily into AI execution need stronger strategic capability to ensure the AI output is pointed in the right direction. Cutting the people who provide that strategic direction to save on headcount is how you end up producing more artifacts, faster, that solve the wrong problems. The question of <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">which type of designer AI will replace</Link> is worth reading alongside this - because the answer is not &quot;all of them&quot; or &quot;none of them.&quot; It is specific, and design leaders owe it to their teams to be specific about it too.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The designers who will thrive in the next two years are not the ones who adopt every tool. They are the ones who understand the difference between <Link href="/resources/blogs/design-thinking-vs-design-strategy" className="text-accent hover:underline font-medium">design thinking and design strategy</Link> - and apply that same strategic judgment to their tooling decisions. The best design teams in 2026 will use AI extensively. They will also be very deliberate about where they use it and where they do not. Because the goal was never to produce artifacts faster. The goal was always to make better decisions - and decisions are made by people, not tools.
      </p>

      {/* Inline image 6 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
          alt="A design team in a strategy session with both laptops and physical materials, representing the blend of AI tools and human judgment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we help design teams and leaders navigate the AI transition - not by recommending tools, but by helping them build the strategic judgment to evaluate what their team actually needs. Through our <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">training programmes for teams</Link> and 1:1 programmes for individual designers, we focus on building AI-native design capability without losing the fundamentals that make design valuable. If you are a design leader trying to figure out what your team should adopt, what they should avoid, and how to make that call, <Link href="https://calendly.com/xperiencewave/strategy-call" className="text-accent hover:underline font-medium">book a strategy call</Link> and let us work through it together.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Lyssna - 2026 UX Research Trends Report. 48% of researchers see synthetic users as an impactful trend, with noted limitations around emotional nuance and contextual behaviour.</li>
        <li>Baymard Institute - UX-Ray automated heuristic evaluation tool. Documented 95% accuracy against established UX heuristic guidelines.</li>
        <li>Maze - 2026 Future of User Research Report. 43% of organisations reported increased revenue when research was connected to business strategy, compared to 15% when conducted but rarely used in decisions.</li>
        <li>Figma AI - Layer renaming, content rewriting, and design variation generation features for mechanical design acceleration.</li>
        <li>Xperience Wave - Direct observation from corporate training engagements and 1:1 mentorship programmes with design teams evaluating AI tool adoption.</li>
      </ul>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-First Design: What Senior UX Designers Need to Know in 2026</Link> - the individual designer&apos;s perspective on AI fluency</li>
        <li><Link href="/resources/blogs/ai-predicts-so-do-you-difference" className="text-accent hover:underline font-medium">AI Predicts. So Do You. Here&apos;s the Difference</Link> - what human design judgment does that AI cannot replicate</li>
        <li><Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">Which Type of Designer Will AI Replace?</Link> - an honest assessment of where AI displaces and where it does not</li>
        <li><Link href="/resources/blogs/design-thinking-vs-design-strategy" className="text-accent hover:underline font-medium">Design Thinking Was Never For Designers. Design Strategy Is.</Link> - the strategic judgment layer that applies to tooling decisions</li>
        <li><Link href="/resources/blogs/hiring-senior-designers-immature-design-org" className="text-accent hover:underline font-medium">What Happens When You Hire Senior Designers Into an Immature Design Org</Link> - why tools cannot substitute for organisational maturity</li>
        <li><Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">Mixed-Methods UX Research: A Complete Guide</Link> - the human-judgment activities AI can support but not replace</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Product &amp; Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of experience across enterprise product design, design leadership, and organisational consulting. The Purpose-First Framework described in this article is drawn from direct work with design leaders evaluating AI adoption across teams ranging from early-stage startups to large enterprises.
      </p>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Murad, Co-founder &amp; Head of Product &amp; Design, Xperience Wave
      </p>

      <FreeTrainingCTA text="If you are a design leader navigating the AI transition, the free training shows how we help teams build AI-native capability without losing the fundamentals" />
    </>
  ),
  'hiring-senior-designers-immature-design-org': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        A few years ago, I joined a data security organisation as a Principal Designer. On paper, it was exactly the kind of role that should have worked - a company investing in design by hiring at a senior level, a product space with genuine complexity, and a title that suggested the organisation understood what senior design leadership looks like.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Within weeks, the CPO and the product manager sat me down to discuss my growth plan. Their suggestion: I should learn how to create explainer videos. That was the path they saw for a Principal Designer. Meanwhile, the product owners treated my time as something they could claim and direct - I was essentially a production resource with a senior title. The requirements that came my way were purely UI-driven, the kind of work a mid-level designer could have handled without breaking stride. It became clear, slowly and then all at once, that the organisation had hired a senior designer without knowing what a senior designer actually does.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What made it worse was not the work itself - it was the effect it had on me. When an organisation consistently asks you to operate below your capability, you do not just feel underutilised. You start questioning your own understanding of the role. You begin wondering whether you have been wrong all along about what a UX designer is supposed to do, whether the industry has shifted in ways you missed, whether the expectations you carried from previous roles were inflated. That self-doubt is the hidden damage of this mismatch, and it is far more corrosive than boredom.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        I eventually left. The experience became one of the reasons Almas and I built Xperience Wave - because we saw that this mismatch was not unique to one company. It is systemic, and it damages both sides of the equation.
      </p>

      {/* Inline image 1 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
          alt="A team gathered around a whiteboard in a meeting room, illustrating the gap between organisational expectations and design reality"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="not-rare-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        This Is Not a Rare Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If my story were unusual, it would be an anecdote. It is not. Research from Matej Latin&apos;s annual study on why designers quit found that 77.5 percent of designers rate their organisation&apos;s UX maturity at levels 1 through 3 on a 6-level scale. That means roughly three out of four designers work in organisations that are, by any reasonable definition, design-immature. The same study found that UX maturity and lack of career progression are the primary reasons designers leave their jobs - and the designers leaving are disproportionately experienced ones, departing smaller teams and solo positions at companies that never figured out how to use them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The pattern is consistent enough to be predictable. A company decides it needs &quot;better design.&quot; It hires a senior or principal designer - someone with a strong portfolio, years of experience, credibility from previous roles. The expectation, often unstated, is that this single hire will elevate the design function. What actually happens is that the senior designer arrives and discovers there is no design function to elevate. There is no research practice. There is no design system. There are no established rituals for critique, review, or stakeholder alignment. Requirements arrive as feature requests or, worse, as pre-decided solutions that just need to be &quot;made pretty.&quot; Product owners control the designer&apos;s time and output. The PM sees design as a downstream activity - something that happens after decisions have been made, not something that informs them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The senior designer, who was hired precisely because of their ability to think strategically, lead through ambiguity, and connect design to business outcomes, finds themselves doing none of those things. They are turning screens. And the organisation, which is paying a senior salary, is getting mid-level output - not because the designer lacks capability, but because the environment does not allow that capability to surface.
      </p>

      {/* Inline image 2 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
          alt="A frustrated professional sitting alone at a desk surrounded by empty chairs, representing the isolation of a senior hire in an unsupportive environment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="why-orgs-mistake" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Organisations Make This Mistake
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The root cause is a fundamental misunderstanding of what design maturity means and what it takes to build it. Organisations at low maturity levels tend to believe that design quality is a function of individual talent. If the designs are not good enough, hire a better designer. If the team is not strategic enough, hire a more senior one. The assumption is that a single exceptional hire can compensate for systemic gaps in process, culture, and infrastructure.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This rarely works, for the same reason that hiring a world-class chef does not fix a restaurant with no kitchen. The chef&apos;s skill is real, but it requires an environment where that skill can be applied. Without the right equipment, ingredients, and operating model, even the best chef will produce mediocre food - and will probably leave within a year, frustrated and undervalued. Design works the same way, but organisations are slower to recognise it because design output is more visible than design process. A senior designer can still produce polished screens in an immature org. The screens look fine. Leadership sees them and concludes that the hire is working. What they do not see is everything the designer is not doing - the research that is not happening, the strategic conversations that are not taking place, the business problems that are not being framed through a design lens - because the organisation never created the conditions for that work to exist.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Misha Frolov&apos;s framework for evaluating design hires describes this as a &quot;stage mismatch&quot; - the right designer at the wrong company stage. A designer who thrives in a mature design org with established processes, cross-functional collaboration, and executive buy-in will struggle in a pre-maturity org that needs someone to build all of that from scratch. And a designer who excels at building design culture from zero may be frustrated in a mature org where the systems are already in place and the work is primarily about execution within those systems. The stage has to match, not just the skill.
      </p>

      <h2 id="five-things-wrong" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Five Things That Go Wrong (And How They Compound)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These failures do not happen in isolation. They compound, each one making the others worse, until the mismatch becomes unsalvageable.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. The org expects the designer to produce faster, not think deeper
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The most common expectation gap is speed, not scope. Leadership hired a senior designer expecting higher throughput - more screens, faster turnaround, better visual quality. They did not hire someone to question the product strategy, push back on requirements, or spend a week on research before opening Figma. When the senior designer tries to operate at a strategic level - asking why before jumping to how - they are perceived as slow, difficult, or overcomplicating things. This is the <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">delivery person trap</Link> applied at the organisational level: the company hired a strategic thinker and measured them on tactical output.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Leadership does not give them decision-making authority
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A senior title without decision-making authority is a costume, not a role. In immature orgs, design decisions are often made by product managers, engineering leads, or founders - and the designer is brought in to execute those decisions, not to make them. The senior designer&apos;s judgment, which is the primary thing the company is paying for at that salary level, goes unused. When they try to exercise that judgment - by proposing a different approach, challenging a requirement, or recommending research before building - they run into resistance. Not because the idea is bad, but because the organisational power structure was never set up for a designer to have that kind of influence. The <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">conversations that senior designers need to have</Link> - about business strategy, product direction, and resource allocation - simply do not happen because nobody invited them to the table.
      </p>

      {/* Inline image 3 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
          alt="A professional looking overwhelmed at their desk with multiple screens and sticky notes, representing the impossible expectations placed on a solo senior designer"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. There is no design infrastructure
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        No design system. No research practice. No component library. No established way to document design decisions or share learnings across projects. The senior designer is expected to produce excellent work on top of infrastructure that does not exist - and simultaneously build that infrastructure from scratch, while still meeting the tactical demands of their feature work. This is a job for a team, not a person. But in an immature org, the senior designer is often the only designer, or one of two or three. They are expected to be the <Link href="/resources/blogs/grow-as-solo-designer" className="text-accent hover:underline font-medium">solo designer who does everything</Link> - research, strategy, systems, production, stakeholder management - without the support structure that any of those activities require.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. The designer gets frustrated and starts blaming the org
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After a few months of operating below capacity, the designer starts to feel the friction. They have tried to introduce better practices and been met with indifference. They have proposed research and been told there is no time. They have pushed for a seat at the strategy table and been told that is &quot;not how we work here.&quot; The frustration turns into resentment, and the resentment turns into a narrative: this organisation is not mature enough. The leadership does not get design. The culture is broken. Some of that may be true. But the narrative, once it solidifies, becomes self-fulfilling. The designer stops trying to influence the environment and starts waiting for the environment to change. It does not change. The designer begins to disengage.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. The designer leaves, and the org concludes design does not work
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most damaging outcome - not just for the designer, but for every designer who comes after them. The senior hire leaves within 6 to 12 months. Leadership, having invested a senior salary and seen no transformative results, concludes that the investment was not worth it. &quot;We tried hiring a senior designer and it did not make a difference.&quot; The next hire is more junior. The expectations are lower. Design slips further down the priority list. The org becomes even less mature, making it even harder for the next designer who joins. It is a downward spiral, and it starts with a single hiring decision that mistook individual talent for organisational capability.
      </p>

      {/* Inline image 4 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
          alt="An empty office meeting room with whiteboards full of plans but no people, representing the gap between intention and execution in design orgs"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="what-leaders-should-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Leaders and Founders Should Do Instead
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are a design leader, VP, or founder reading this, the fix is not to stop hiring senior designers. It is to stop hiring them into environments that are structurally unable to utilise them. Here is what that means in practice.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Assess your design maturity honestly before you hire
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you write the job description, answer five questions with uncomfortable honesty. Does design have a seat at the table where product decisions are made, or does it sit downstream of those decisions? Do you have established processes for research, critique, and design review, or does each project start from scratch? Does the person in this role report to someone who understands design, or will they report to an engineering lead or PM who sees design as a service function? Will they have the authority to push back on requirements, or are they expected to execute what they are given? Is there budget and organisational willingness to invest in the infrastructure - tools, research, systems - that a senior designer needs to operate at their level?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If the answer to most of these questions is no, you are not ready for a senior design hire. You are ready for a mid-level designer who can grow into the role as the organisation matures, or you are ready for a design consultant or training partner who can help you build the infrastructure first.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If you do hire senior, give them the mandate to build - not just produce
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The job description should explicitly state that this person&apos;s role is to establish design practices, not just to produce design work. The first 90 days should be dedicated to auditing the current state, building relationships with stakeholders, and proposing a design operating model - not to shipping screens. This is a genuinely difficult thing for many leaders to accept, because it means paying a senior salary for what appears to be no visible output for three months. But the alternative - throwing a senior designer straight into feature work and expecting them to build infrastructure on the side - is how you guarantee the mismatch plays out exactly as described above. The designer drowns in tactical work, the infrastructure never gets built, and three months later you are in the same position you were before the hire, except now you are also dealing with a disengaged employee who is updating their portfolio on weekends.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Be specific about what the mandate includes. &quot;Establish design practices&quot; is vague enough to mean anything - and in an immature org, vague mandates get eaten alive by urgent feature requests. Instead, define concrete deliverables for the first quarter: a design process documentation, a stakeholder alignment plan, a recommendation for tools and systems, and a clear proposal for how design should integrate into the product development workflow. Give the designer authority to say no to tactical work that conflicts with this mandate, and make sure their manager and the broader product leadership team understand and support that authority. Without this protection, the mandate is aspirational at best and meaningless at worst.
      </p>

      {/* Inline image 5 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
          alt="Two professionals having a focused one-on-one conversation at a table, representing the honest assessment leaders need to have before hiring"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Match the seniority to the stage
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not every company needs a Principal Designer. Not every team needs a Design Director. What you need depends on where you are, and mismatching that creates exactly the problems described above. If you are pre-maturity - no design processes, no research practice, no design culture - you need someone who is energised by building from zero. That is a very specific kind of senior designer, not just any senior designer. Many experienced designers thrive in structured environments and struggle in ambiguity. Others thrive in chaos and get bored when the systems are established. Know which one you need before you hire.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Stop treating design hires as a substitute for design maturity
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Hiring a great designer is necessary but not sufficient. Design maturity is an organisational capability, not an individual skill. It requires investment in processes, tools, culture, and - critically - leadership buy-in. BCG&apos;s research on design maturity identifies eight elements that influence it: strategy, culture, measurement, methods, tools, governance, people, and training. Hiring addresses only one of those eight. The other seven require organisational commitment that no individual hire can provide, regardless of how senior they are. This is the same structural failure we see when <Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">design teams have a systems problem, not a skills problem</Link>.
      </p>

      <h2 id="what-designers-should-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Senior Designers Should Do Before Accepting the Role
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are a senior designer considering a role at a company where you will be the first or only design hire, or where the design function is clearly immature, ask these questions in the interview - and pay close attention to how they are answered.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>&quot;What does success look like for this role in the first six months?&quot;</strong> If the answer is about screens shipped or features delivered, the org sees you as a production resource. If the answer involves establishing practices, building culture, or influencing product direction, they might actually understand the role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>&quot;Who does this role report to?&quot;</strong> If you report to an engineering lead or a PM, design is a service function in this organisation. That is not necessarily a dealbreaker, but you need to go in with your eyes open about the influence you will have.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>&quot;What design infrastructure exists today?&quot;</strong> Design system? Research practice? Critique rituals? Past research? If the answer is &quot;nothing, that is what we are hiring you to build,&quot; ask whether you will have the time, budget, and authority to do that in addition to your feature work. If the answer is &quot;we have not thought about that,&quot; you have your answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>&quot;Can I speak with the last designer who was in this role?&quot;</strong> If there was a previous designer and they left quickly, that tells you something. If there was never a designer in this role, that tells you something different - but equally important. The absence of a predecessor means you will be defining the role from scratch, and the organisation may not even know what to expect from you.
      </p>

      {/* Inline image 6 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
          alt="A professional in a thoughtful pose during an interview, representing the diagnostic questions senior designers should ask before accepting a role"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        These are not trick questions. They are diagnostic. A mature organisation will have thoughtful answers. An immature one will fumble - and the way they fumble will tell you exactly what you are walking into.
      </p>

      <h2 id="cost-is-real" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Cost Is Real - For Both Sides
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The cost of this mismatch is not abstract. For the designer, it is months of professional stagnation, self-doubt, and the emotional toll of operating in an environment that does not understand what you do. For the organisation, it is a failed hire, a wasted salary, a reinforced belief that design is not worth investing in, and an increasingly hostile environment for the next designer who tries. Every time this cycle plays out - and it plays out constantly, across industries, across company sizes, across geographies - both sides lose. The designer loses time and confidence. The organisation loses the opportunity to build a design capability that could have transformed how they build products.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The fix is not complicated. It is just uncomfortable: leaders need to be honest about where their organisation actually is on the maturity spectrum, and designers need to be honest about what kind of environment they actually thrive in. When those two assessments match, the hire works. When they do not, everyone pays the price.
      </p>

      {/* Inline image 7 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
          alt="Two hands reaching toward each other across a gap, representing the alignment needed between organisational maturity and designer seniority"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we work with both sides of this equation. For organisations building or scaling design teams, we offer <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">training programmes and design services</Link> that build the infrastructure and maturity needed before - or alongside - senior hires. For individual designers navigating these transitions, our programmes help you assess the environments you are entering and operate effectively regardless of maturity level. If you are a leader struggling with design hiring or a designer stuck in a mismatch, <Link href="https://calendly.com/xperiencewave/strategy-call" className="text-accent hover:underline font-medium">book a free strategy call</Link> and let us dig into what is actually going on.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Matej Latin - Annual study on why designers quit. 77.5% of designers rate their organisation&apos;s UX maturity at levels 1-3 on a 6-level scale. UX maturity and lack of career progression are the primary reasons designers leave.</li>
        <li>Misha Frolov - Framework for evaluating design hires. Describes &quot;stage mismatch&quot; as the right designer at the wrong company stage.</li>
        <li>BCG - Research on design maturity. Identifies eight elements that influence design maturity: strategy, culture, measurement, methods, tools, governance, people, and training.</li>
        <li>Xperience Wave - Direct observation from mentorship and corporate training engagements with design teams and individual designers navigating maturity mismatches.</li>
      </ul>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">A Senior UX Designer Is Not a Delivery Person</Link> - the fundamental misconception about what senior designers are hired to do</li>
        <li><Link href="/resources/blogs/design-team-plateau-10-people" className="text-accent hover:underline font-medium">Why Most Design Teams Plateau After 10 People</Link> - organisational scaling challenges that create maturity gaps</li>
        <li><Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Your Design Team Doesn&apos;t Have a Skills Problem - They Have a Systems Problem</Link> - when the failure is structural, not individual</li>
        <li><Link href="/resources/blogs/hidden-cost-promoting-ic-designer-manager" className="text-accent hover:underline font-medium">The Hidden Cost of Promoting Your Best IC Designer to Manager</Link> - a related mismatch: wrong role, right person</li>
        <li><Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">The Conversations Senior Designers Have That Others Don&apos;t</Link> - what senior designers need from their environment to operate at their level</li>
        <li><Link href="/resources/blogs/grow-as-solo-designer" className="text-accent hover:underline font-medium">How to Grow as a Solo Designer</Link> - surviving and thriving when you are the only designer</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Product &amp; Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of experience across enterprise product design, design leadership, and organisational consulting. The patterns described in this article are drawn from his own career and from direct work with designers and design leaders navigating maturity mismatches at companies ranging from early-stage startups to large enterprises.
      </p>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Murad, Co-founder &amp; Head of Product &amp; Design, Xperience Wave
      </p>

      <FreeTrainingCTA text="If you are a senior designer stuck in a maturity mismatch, the free training shows how we help designers operate at their level regardless of organisational stage" />
    </>
  ),
  'ux-research-never-makes-it-into-roadmap': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        A designer identifies a research opportunity. They conduct interviews, map journeys, synthesise findings. They present a deck. The PM nods. The slides end up in a shared drive. The roadmap does not change.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        The designer concludes that the organisation &quot;is not mature enough for research.&quot;
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        And this is where I disagree.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The organisation is not the bottleneck. The way the designer positioned the research is. They ran a study nobody asked for, framed it in language nobody outside design understands, and then blamed the system for not acting on it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is not a maturity problem. It is a selling problem. And until designers learn to sell research as a business input rather than a design activity, their insights will keep dying in slide decks.
      </p>

      <h2 id="core-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Core Problem: Designers Learn the Process, Not the Purpose
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers are taught research as a step in the design process. Empathise, define, ideate, prototype, test. Research sits in the &quot;empathise&quot; phase &mdash; you do it because the process says to do it. But nobody teaches you when research actually matters, what kind of research to do for what kind of decision, or how to position it so that the people who control the roadmap see it as essential rather than optional. The result is a designer who can technically conduct a study but cannot answer the question a PM will inevitably ask: &quot;Why should we spend two weeks on this instead of building the feature the sales team is asking for?&quot; If your answer to that question is &quot;because good design requires research,&quot; you have already lost. That is a process argument. Roadmaps are not built on process. They are built on evidence of impact.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This disconnect is something we have written about before &mdash; the difference between <Link href="/resources/blogs/design-thinking-vs-design-strategy" className="text-accent hover:underline font-medium">design thinking and design strategy</Link> maps directly onto this problem. Design thinking gives you a process to follow. Design strategy gives you the judgment to know which parts of that process apply to your specific situation. Research suffers from the same gap. Designers learn the mechanics of conducting a study but not the strategic thinking required to decide whether a study is needed, what kind, and how to position the findings so they become impossible to ignore. The mechanics are necessary &mdash; but they are not sufficient. What is missing is the business fluency to connect research to the questions that drive roadmap decisions, and the stakeholder skills to ensure the people making those decisions are invested in the answer before the research even begins.
      </p>

      <h2 id="isolation-trap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why This Keeps Happening: The Isolation Trap
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a theoretical problem. It plays out in design teams everywhere, and the pattern is remarkably consistent. A designer joins an organisation. They notice the team does not do much research. They see an opportunity &mdash; maybe the onboarding flow has issues, maybe support tickets reveal a pattern, maybe a competitor just launched something that changes the landscape. But instead of making the case internally, they go quiet. They work on the research during gaps between tasks, sometimes on weekends. They build a deck nobody asked for. They find real insights &mdash; sometimes genuinely important ones. Then they present it. The PM says it is interesting but the quarter is already planned. The designer is frustrated. Over the next few months, they start saying things like &quot;this company is not ready for design thinking&quot; or &quot;the leadership does not understand UX.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The research was real. The insight might have been valuable. But the designer never sold it to anyone before doing it. They never tied it to a business question the PM was already trying to answer. They never framed it as de-risking a decision the roadmap was about to make. They did it in isolation, from their own conviction, and expected the organisation to reorganise around their output. This is especially common for solo designers working without a team, where there is no design leadership to champion research on your behalf. In that situation, the designer has to be both the researcher and the salesperson &mdash; and most are only trained for the first role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Blaming the system for not being mature enough is an understandable reaction, but it is also a convenient one. It avoids the harder truth: the designer did not know how to make the case for research before conducting it. And in organisations where design teams already struggle with <Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">systemic problems</Link> &mdash; unclear roles, misaligned expectations, poor communication between functions &mdash; adding unsolicited research into the mix without stakeholder buy-in is a recipe for the findings being shelved. The system might genuinely have maturity issues, but operating as if those issues do not exist and then being surprised when they show up is not a strategy.
      </p>

      {/* Inline image 1 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
          alt="A designer presenting research findings to a team in a meeting room with sticky notes and whiteboards"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="what-data-says" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Data Says
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not just an anecdotal observation. The numbers back it up.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Maze&apos;s 2026 Future of User Research report found that when research is used to inform overall business strategy, organisations see 2.7 times better outcomes. 43 percent of organisations reported increased revenue when research was connected to business strategy &mdash; compared to just 15 percent when research was conducted but rarely used in decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Read that again. The research was conducted. The insights existed. But only when those insights were tied to business strategy did they produce measurable impact. The act of doing research is not enough. The connection to decisions is what matters.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The same report found that the role of the researcher is shifting from insight producer to business partner &mdash; and that business acumen, storytelling, and stakeholder management are the most valuable assets for anyone in a research role today.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This tracks with what we have observed working with design teams across industries. The designers whose research consistently influences roadmaps are not the ones with the most sophisticated methodologies. They are the ones who understand the business well enough to position their research as the answer to a question someone with budget authority is already asking.
      </p>

      <h2 id="five-reasons" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Five Reasons Research Dies Before It Reaches the Roadmap
      </h2>

      <h3 id="reason-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. The Research Answered a Question Nobody Was Asking
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You noticed a pattern. You were curious. You investigated. That instinct is good &mdash; but curiosity alone does not justify a research project in a resource-constrained environment.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Roadmap slots are finite. Every week spent on research is a week not spent on building. If the people who allocate those slots did not ask the question your research answers, they have no reason to prioritise the findings.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The fix:</strong> Before you conduct any research, find the open question. Talk to your PM, your engineering lead, your VP. What decision are they struggling with? What bet are they about to make without enough confidence? Position your research as the thing that reduces the risk of that specific bet. Now they need you.
      </p>

      <h3 id="reason-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. The Findings Were Presented in Design Language
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &quot;Users exhibit high cognitive load during the onboarding flow, resulting in elevated drop-off rates correlated with information architecture complexity.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That sentence is accurate. It is also invisible to anyone outside design. Your PM heard jargon. Your VP heard nothing actionable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The fix:</strong> Translate findings into the language of the person who controls the roadmap. &quot;32 percent of users drop off at step 3 of onboarding. The pattern in interviews suggests they cannot distinguish between the two options we present. If we simplify this step, we estimate recovering a meaningful portion of those users before they churn.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Same finding. Different framing. One gets filed. The other gets built.
      </p>

      <h3 id="reason-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. The Research Delivered Observations, Not Recommendations
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Many research presentations end with: &quot;Here is what we found.&quot; And then silence &mdash; or worse, a vague &quot;we recommend further investigation.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Stakeholders do not want findings. They want direction. &quot;Here is what we found&quot; puts the interpretive burden on the PM, who is already managing twelve other inputs. If you do not tell them what to do with the information, they will do what is easiest: nothing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The fix:</strong> Every research readout should end with a clear recommendation tied to a specific action. Not &quot;users struggle with onboarding&quot; but &quot;we recommend splitting step 3 into two screens and running an A/B test &mdash; here is the hypothesis and here is how we measure it.&quot; The specificity matters. It moves the conversation from &quot;interesting&quot; to &quot;let us scope this.&quot;
      </p>

      <h3 id="reason-4" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. The Research Arrived at the Wrong Time
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Research that arrives in the middle of a sprint cannot influence that sprint. Research that arrives after roadmap planning cannot influence that roadmap. Timing is not a detail &mdash; it is the single most important factor in whether research gets used.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If deep research takes four weeks and your roadmap planning cycle is quarterly, you need to start your research six weeks before planning begins &mdash; not the week after planning concludes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The fix:</strong> Map your research calendar to your product&apos;s planning cycle. Understand when roadmap decisions are made, work backwards from that date, and deliver findings with enough lead time for them to be absorbed, discussed, and acted on. Research that arrives on time is more valuable than perfect research that arrives late.
      </p>

      <h3 id="reason-5" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. The Researcher Has No Relationship With the Decision-Maker
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the one nobody wants to talk about. You can have the perfect insight, framed in business language, delivered at the right time &mdash; and it will still be ignored if the person receiving it does not trust you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Trust is not built in the presentation. It is built in the months before the presentation &mdash; through small wins, reliable updates, accurate predictions, and a demonstrated understanding of the business context. If you are invisible until you need something from the roadmap, you are a stranger asking for a favour. This is one of the core differences in how <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">senior designers operate</Link> &mdash; they invest in stakeholder relationships continuously, not transactionally.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>The fix:</strong> Invest in the relationship before you need it. Attend product syncs. Understand the PM&apos;s goals. Share small insights informally &mdash; &quot;I noticed X in the support data, thought you might find it useful.&quot; When the time comes to present a major finding, you are not a stranger with a deck. You are a trusted partner with an insight they have been waiting for.
      </p>

      {/* Inline image 2 */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
          alt="Professionals collaborating on a business strategy document with charts and data visualisations"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="blueprint" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How to Make Research a Roadmap Input: The 5-Step Research Integration Blueprint
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We developed a framework called the Research Integration Blueprint to address exactly this gap. Most research frameworks &mdash; Double Diamond, Lean UX, NNGroup&apos;s ResearchOps model &mdash; assume the organisation already values research. They teach you how to do it well or scale it efficiently. This blueprint starts from a different assumption: that the organisation does not yet see research as essential. And it shows you how to change that.
      </p>

      <h3 id="step-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Step 1: Know What Is Available to You
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you only know how to run interviews, you will try to interview your way out of every problem &mdash; including problems that need quantitative validation, competitive analysis, or analytics review. The full landscape of research spans qualitative and quantitative, attitudinal and behavioural, generative and evaluative, formative and summative. Within those categories sit dozens of methods from ethnographic research and diary studies to A/B testing and correlational analysis.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You do not need to master all of them. But you need to know they exist so you can pick the right tool for the question. This step is table stakes &mdash; if you have two or more years of experience, you likely know most of this. The real skill is in Steps 2 through 5: knowing which method to use given your specific situation.
      </p>

      <h3 id="step-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Step 2: Assess the Reality of Your Project and Culture
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the step that separates designers who get research approved from designers who get research ignored. Before you propose anything, you need to honestly evaluate the environment you are operating in &mdash; not the environment you wish you were in.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Ask yourself five questions:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Project context:</strong> Is this a new build or a revamp? Are you familiar with the domain? How deeply are requirements already frozen? A new project with open requirements gives you room to shape the direction through research. A revamp with frozen requirements and a launch date means you need a fundamentally different approach &mdash; probably rapid validation rather than deep exploration. Proposing a 6-week generative study on a project that ships in 4 weeks is not ambitious. It is tone-deaf.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Team capabilities:</strong> Can you or someone on your team actually run the kind of study you are proposing? Does your team see research as valuable or as waste? If your team has never run a formal study, proposing ethnographic research is setting yourself up to fail. Start with what the team can credibly execute. Build capability through small wins, not through overcommitting on the first project.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Organisational maturity:</strong> Is UX maturity low, medium, or high? Does the org currently collect relevant user data? Is there existing research you can build on? This question alone changes your entire strategy. In a high-maturity org, you can propose research and expect support. In a low-maturity org, you first have to demonstrate that research produces something the business can use &mdash; which means your first study needs to be small, fast, and undeniably tied to a metric someone cares about.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Timeline and involvement:</strong> When was design brought into this project? Are deliverables already decided? If you were brought in after the roadmap was set, your window for influencing direction through research is narrow. You need to work within that constraint, not pretend it does not exist.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Influence and strategic position:</strong> Where do you sit in the decision-making hierarchy? Do people with budget authority know your name? A designer with a seat at the planning table can propose research as part of the project scope. A designer three layers removed from the decision-maker has to build influence before they can propose anything &mdash; and the way you build that influence is through the small, fast wins mentioned above.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Industry data confirms these barriers are real, not imagined: 31 percent of researchers cite organisational structure and bureaucracy as their biggest challenge. 24 percent cite their research tool stack. 20 percent cite budget. 16 percent cite lack of buy-in about the importance of research. And another 16 percent say their research is conducted but simply not applied to decisions. Your proposal has to account for whichever of these barriers exists in your specific situation &mdash; because a proposal that ignores the environment it will land in is a proposal that will be ignored.
      </p>

      <h3 id="step-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Step 3: Identify Your Constraints
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where you get honest about what you actually have to work with.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Time:</strong> Do you have four weeks for a proper study or four days for a guerrilla approach? Both are valid &mdash; but they lead to completely different research designs.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Current capabilities:</strong> What tools does your team have access to? Figma and Google Workspace cover 75 percent of researcher workflows. Miro, Confluence, and Dovetail fill analysis gaps. If you do not have specialised research tools, design your study around what you do have.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Available resources:</strong> Do you have access to users? How does your team currently recruit participants? Can you leverage support tickets, analytics, or sales call recordings as secondary data sources?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Budget:</strong> Research does not have to be expensive. The majority of research studies cost under $500. Gift cards remain the most common incentive at 67 percent, followed by cash equivalents at 38 percent. If budget is zero, desk research, analytics reviews, and internal stakeholder interviews cost nothing and still produce actionable insights.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The point is not to list reasons you cannot do research. It is to design a research approach that works within the constraints you actually have &mdash; rather than proposing an ideal study that gets rejected because it requires resources that do not exist.
      </p>

      <h3 id="step-4" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Step 4: Customise a Research Model That Fits Your Situation
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the core of the blueprint &mdash; and the part that makes it fundamentally different from generic research advice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most frameworks give you a single process: do research this way. But your situation is not generic. The approach that works for a new project with a specialised team and high UX maturity is completely wrong for a revamp with frozen requirements and sceptical stakeholders. Treating them the same is how research proposals get rejected.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We use a combination matrix that maps your answers from Steps 2 and 3 into a specific research strategy. Here is how different situations lead to different approaches:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>New project + specialised team + high UX maturity:</strong> You have full support. Use advanced methodologies &mdash; longitudinal studies, ethnographic research, mixed methods. Go deep. This is the situation most research frameworks are written for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Revamp + existing data + familiar domain:</strong> You do not need to start from scratch. Focus on specific areas that need improvement. Mine existing analytics, support data, and past research first. Supplement with targeted studies where gaps exist.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>New project + some flexibility + existing data sources:</strong> Adapt research as new findings emerge. Leverage what exists and fill gaps with lightweight studies. This is where speed and resourcefulness matter more than methodological purity.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Limited time + low UX maturity + no existing data:</strong> This is the hardest situation &mdash; and the most common one our designers face. You need to conduct basic, credible research quickly. Guerrilla usability testing, analytics reviews, and 5-user interview sprints. The goal is not comprehensive insight. It is one undeniable data point that proves research is worth investing in next time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Revamp + frozen requirements + sceptical stakeholders:</strong> This requires the strongest advocacy. You are not just doing research &mdash; you are building a case for why research should exist at all. You need compelling evidence tied directly to a metric the sceptic already cares about. Anything else will be dismissed as process overhead.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Two things to get right regardless of your situation:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Find objectives that align with other teams&apos; goals.</strong> &quot;How many users dropped off?&quot; is a question the PM already cares about. &quot;Why did they drop off?&quot; is the question research answers. Frame your objectives so that the <em>what</em> connects to the PM&apos;s metrics and the <em>why</em> is your contribution. When your research objective is their business objective, you do not need to sell it &mdash; they are already waiting for the answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Mix and match study models.</strong> Sometimes the right approach is interviews followed by a survey to validate patterns at scale. Sometimes it is the reverse &mdash; a survey to identify the problem area, then interviews to understand the underlying cause. The sequence depends on what you already know and what gap you need to fill. The designers who get this right are not the ones who know the most methods. They are the ones who know which combination fits which situation.
      </p>

      <h3 id="step-5" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Step 5: Present a Business Proposal, Not a Research Plan
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the step that changes everything &mdash; and the one nobody else is teaching.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers present research as a research plan: &quot;I want to run 8 interviews and a survey.&quot; That is a methodology pitch. It tells the PM what you want to do but not why they should care.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Instead, present a business proposal. The structure:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Start with the agreed goal</strong> &mdash; what the team is trying to achieve this quarter. Not your research goal. Their business goal. &quot;The team is targeting a 15 percent improvement in onboarding completion this quarter.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Frame the research as risk mitigation or opportunity identification.</strong> &quot;Before we commit engineering resources to redesigning the flow, I want to identify which specific step is causing the drop-off and why &mdash; so we build the right solution the first time instead of iterating blindly.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Lay out the approach in plain language</strong> &mdash; not methodological jargon. &quot;I will review our analytics to identify the highest-drop-off step, then run 5 short interviews with recent users who abandoned at that point. Timeline: 8 working days. Cost: two $25 gift cards per participant.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Connect the investment directly to the outcome.</strong> &quot;If we identify the root cause before building, we save the team from a potential rebuild cycle &mdash; which based on past sprints would cost approximately 3 weeks of engineering time.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The format shift matters: a research plan asks for permission. A business proposal asks for a decision. The PM is not evaluating whether your methodology is sound &mdash; they are evaluating whether the investment is worth the return. When you present research as &quot;spend X to learn Y, which de-risks Z,&quot; you are speaking the language of the roadmap.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And that is how research stops being optional and starts being a line item.
      </p>

      <h2 id="shift" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Shift That Changes Everything
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers and researchers who consistently get their work into roadmaps share one thing: they do not think of themselves as researchers who need to convince the business. They think of themselves as business partners who happen to use research as a tool. That reframe changes everything &mdash; how you scope studies, how you present findings, how you invest your time between projects. It is the same shift that separates a <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">designer earning 12 LPA from one earning 30 LPA</Link> &mdash; the higher-earning designer does not necessarily have better craft skills, but they operate with a fundamentally different understanding of where they sit in the value chain.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Research is not a right. It is not something you deserve to do because the process says so. It is a tool &mdash; and like any tool, its value is determined by the problem it solves, not by the elegance of how it was used. If your research keeps dying in slide decks, the answer is probably not better research. It is better positioning, better timing, better relationships, and a much clearer understanding of what the people who control the roadmap actually need from you. The designers who figure this out do not just get their research shipped &mdash; they get a seat at the <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">product strategy table</Link>, which is where roadmap decisions are actually made. And once you are in that room, you stop having to sell research altogether &mdash; because you are already part of the conversation where priorities are set.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Research Integration Blueprint is part of what we cover in depth at Xperience Wave &mdash; through our programmes for individual designers and our short course on integrating research into real project workflows. The blog gives you the framework. The course gives you the combination matrix, the templates, and the practice of applying it to real scenarios. If your research keeps getting sidelined, <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">book a free strategy call</a> &mdash; we will dig into what is actually going on.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Maze &mdash; &quot;Future of User Research 2026.&quot; Research connected to business strategy produces 2.7x better outcomes. 43% report revenue increase when research informs strategy vs 15% when research is conducted but unused.</li>
        <li>Nielsen Norman Group &mdash; &quot;State of UX 2026.&quot; Successful practitioners need research, stakeholder management, and leadership alongside design craft.</li>
        <li>Xperience Wave &mdash; direct observation from mentorship and corporate training engagements with design teams at product companies across India.</li>
      </ul>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Your Design Team Doesn&apos;t Have a Skills Problem &mdash; They Have a Systems Problem</Link> &mdash; when research fails because the organisation&apos;s design function is structurally broken</li>
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">A Senior UX Designer Is Not a Delivery Person</Link> &mdash; the shift from executing tasks to influencing decisions</li>
        <li><Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">Mixed-Methods UX Research: A Complete Guide</Link> &mdash; how to combine qualitative and quantitative research for stronger findings</li>
        <li><Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Actually Look For When Hiring Senior UX Designers</Link> &mdash; research and stakeholder skills as hiring criteria</li>
        <li><Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">The Conversations Senior Designers Have That Others Don&apos;t</Link> &mdash; the strategic conversations that shape roadmap influence</li>
        <li><Link href="/resources/blogs/design-team-plateau-10-people" className="text-accent hover:underline font-medium">Why Most Design Teams Plateau After 10 People</Link> &mdash; organisational maturity and its impact on design effectiveness</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Almas is Co-founder and CEO at Xperience Wave, a UX design career development company based in Bangalore. She has 12+ years of experience across consulting, enterprise SaaS, and product design leadership. The Research Integration Blueprint was developed from direct work with designers and design teams navigating the gap between research quality and research influence.
      </p>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Almas, Co-founder &amp; CEO, Xperience Wave
      </p>

      <FreeTrainingCTA text="Research influence is one of the skills that separates mid-level from senior. Watch the free training to see how we build it" />
    </>
  ),
  'stakeholder-management-for-designers': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Let me describe a pattern I have watched play out hundreds of times.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        A designer does solid work. The research is thorough, the solution is grounded, the screens look sharp. They walk into a stakeholder review expecting productive feedback. Instead, the VP fixates on a button colour. The PM says &quot;looks great&quot; and then quietly changes direction two weeks later. The engineering lead asks questions the designer already answered in slide three - but nobody was paying attention by then because the first two slides were a process timeline nobody asked for.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        The designer walks out frustrated, convinced stakeholders &quot;just don&apos;t get design.&quot;
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        But here is the thing. The stakeholders are not the problem. The way the designer managed them is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After mentoring 140+ designers at Xperience Wave and auditing how design functions inside organisations of all sizes, I can tell you: stakeholder management is not a soft skill you pick up along the way. It is the skill that determines whether your design work shapes decisions or decorates them. And in 2026, with design teams getting leaner and expectations getting broader, it has never mattered more.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nielsen Norman Group&apos;s State of UX 2026 report makes this explicit: successful practitioners need research, stakeholder management, and leadership alongside design craft. Not instead of it - alongside it. And Maze&apos;s Future of User Research report found that business acumen, storytelling, and stakeholder management are now the most valuable assets for anyone doing research-informed design work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This blog covers the complete picture - not just &quot;how to present better,&quot; but how to build the kind of stakeholder relationships where your work gets implemented, not just applauded.
      </p>

      <h2 id="why-not-optional" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Stakeholder Management Is Not Optional
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before we get into tactics, let us be clear about what is at stake.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design is not done in isolation. It exists to solve problems that align with business strategy. When that alignment breaks - when design operates as a service function producing screens to spec - the organisation starts to believe design can be replaced. By a smaller team. By an agency. By AI tools. By developers who &quot;also do design.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey&apos;s research on design-led companies found that those with top-quartile design maturity increased revenues and shareholder returns substantially faster than competitors. But the same research found that more than 40 percent of companies surveyed do not talk to their end users during development, and over 50 percent have no system for evaluating the results of project teams.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        That is not a design quality problem. That is a stakeholder management problem. Stakeholder management is essential because it does four things:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>It aligns design and business goals.</strong> When you understand what your stakeholders are trying to achieve - in their language, not yours - you design solutions they can champion, not solutions they have to be convinced of.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>It builds buy-in that reduces pushback.</strong> The more involved stakeholders are in the process, the more ownership they feel over the outcome. People do not push back on decisions they helped make.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>It manages expectations before they become conflicts.</strong> Stakeholders come in with assumptions about what design will produce, how long it will take, and what it will look like. If you do not set expectations early, they will fill the gap with their own - and then hold you to standards you never agreed to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>It builds the trust that lets you influence decisions.</strong> When stakeholders trust you, they stop seeing you as the person who makes the screens and start seeing you as the person who helps them make better decisions. That shift changes everything about your role.
      </p>

      <h2 id="know-your-audience" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Know Who You Are Talking To (And What They Actually Care About)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You already know who your stakeholders are. The mistake is treating them as a monolith. Each type operates with a fundamentally different definition of success - and if you are presenting the same way to your PM, your VP, and your engineering lead, you are failing at least two of them.
      </p>

      <h3 id="product-managers" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Product Managers
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You know what your PM cares about: the roadmap, the timeline, the quarterly goal. What you probably underestimate is how much of their internal credibility depends on the features they ship. When you present to a PM, they are not evaluating your design rationale. They are silently calculating: can engineering build this in time, will it move the metric I committed to, and can I defend this in my next leadership review?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What they need from you:</strong> Evidence that your design solves the problem the roadmap is targeting - not a better problem you found along the way. If you discovered a more important problem during research, frame it as a risk to their goal, not as a redirect you are imposing.
      </p>

      <h3 id="developers" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Developers and Engineering Teams
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Engineers are not your production team. They are your reality check. When you show a beautiful interaction, they are estimating sprint costs. If your design creates architectural headaches you did not anticipate, you will lose their trust fast - and an engineer who does not trust the design will quietly simplify it during implementation without telling you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What they need from you:</strong> Early involvement in decisions that affect architecture. Not sign-off on your mockups - genuine input on feasibility before you commit to a direction in front of the VP.
      </p>

      <h3 id="executives" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Executives (VPs, C-suite, Founders)
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Executives operate at a level of abstraction most designers are not trained for. They do not care about your wireframes. They care about what the design does to the metrics they report to the board. If you cannot draw a line from your design to revenue, retention, or cost reduction, your work is invisible to them - regardless of how good it is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What they need from you:</strong> Not &quot;we improved the checkout flow&quot; but &quot;we expect this change to recover 25 percent of abandoned checkouts, which represents roughly $X in quarterly revenue.&quot; The specificity matters. Vague impact claims sound like guesses. Quantified impact claims sound like strategy.
      </p>

      <h3 id="marketing-sales-support" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Marketing, Sales, and Customer Support Teams
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These teams live with the downstream consequences of every design decision you make. Marketing has to position what you built. Sales has to demo it without worrying about edge cases breaking mid-call. Support has to field the tickets when something confusing ships. They do not approve your designs, but they can make your life significantly harder if you blindside them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What they need from you:</strong> A heads-up before major changes ship. Not approval - awareness. The same feature that delights a user in testing might generate a wave of support tickets if the error states are not handled.
      </p>

      <h3 id="users-and-clients" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        A Note on Users and Clients
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Users and clients are not stakeholders - at least not in the way this blog uses the term. Stakeholders are people inside the organisation who have influence over or a stake in the decisions you make as a builder. Users are who you design for. Stakeholders are who you navigate while designing. Conflating the two weakens your ability to manage either well. Your user research informs your design. Your stakeholder management ensures the design gets shipped.
      </p>

      {/* Inline image 1 - Stakeholder mapping / strategic planning visual */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
          alt="Strategic stakeholder mapping session with sticky notes and framework boards on a wall"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="five-scenarios" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Five Stakeholder Scenarios That Break Designers (And How to Handle Each One)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Generic advice like &quot;communicate clearly&quot; and &quot;know your audience&quot; is true but useless. The real challenge is knowing what to do in specific situations that every designer eventually faces. Here are the five most common ones.
      </p>

      <h3 id="scenario-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Scenario 1: The Stakeholder You Involved Too Late
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most common and most damaging scenario. You disappear for two weeks. You do your research, your synthesis, your exploration. You build something you are proud of. Then you walk into a meeting and unveil it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The stakeholder&apos;s first reaction is not about the design. It is about the gap. Where were you? What were you doing? Why am I only seeing this now?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When stakeholders are surprised by your work, they do not evaluate it - they interrogate it. The reveal model feels dramatic, but it destroys trust. Because trust is built through visibility, not through big presentations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One of our mentees at a well-known fintech company was struggling badly with this. Her design work was strong. Her research was thorough. But stakeholders kept questioning her decisions and asking for changes late in the process.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When we dug into it, the problem was clear. She was doing all the right work in isolation. By the time she presented, stakeholders had no context for her decisions. They had not been part of the journey. So they pushed back - not because the work was bad, but because they had no ownership over it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We changed one thing: she started communicating from day one. Before starting work, she aligned with stakeholders on what exactly she was going to help them achieve. She told them her process in plain language. She shared rough work early. She flagged risks before they became problems.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The transformation happened mid-process. Stakeholders started showing up to check-ins with their own ideas. They started defending her design decisions to other teams. They started saying &quot;our design direction&quot; instead of &quot;what the designer came up with.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What to do:</strong> Before you start any design work, have a 15-minute alignment conversation. Not a presentation - a conversation. Cover three things: what problem are we solving, what does success look like, and what constraints should I know about.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        &quot;Before I start on this, I want to make sure we are aligned on what we are solving for. Can I get 15 minutes to walk through the problem as I understand it? I do not want to go off and build something for two weeks only to find out we were solving different problems.&quot;
      </blockquote>

      <h3 id="scenario-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Scenario 2: The Stakeholder Who Fixates on Pixels
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your VP spends the entire review talking about button colours and font sizes. Meanwhile, the actual design decision - whether to split the checkout into three steps or keep it as one - goes unaddressed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This happens because you gave them nothing else to react to. When you present a polished, pixel-perfect screen, stakeholders cannot evaluate the logic. They can only evaluate what they can see. And what they can see is pixels. So they comment on pixels.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What to do:</strong> Present the thinking before the pixels. Lead with the insight, not the screen. Most designers present like this: &quot;Here is the screen. Here is another screen. Here is the flow.&quot; Instead, present like this: &quot;Here is what we learned. Here is what it means. Here is how the design responds to it.&quot;
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;Before I show you the screens, let me share what we found. When we looked at [data source], [specific finding]. That told us [insight]. Based on that, the design does [specific thing] to address it. Here is what that looks like.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Now the stakeholder evaluates the logic, not the pixels. If they disagree, they disagree with the reasoning - which is a productive conversation. The data does not need to be a 400-person survey. It can be five user interviews. A pattern in support tickets. An analytics screenshot showing a 40 percent drop-off. The point is evidence, not opinion.
      </p>

      <h3 id="scenario-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Scenario 3: The Stakeholder Who Says &quot;Looks Great&quot; Then Reverses
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This might be the most frustrating scenario. You present. Everyone nods. &quot;Looks great.&quot; You move forward. Two weeks later, someone quietly changes direction. Or worse, the same stakeholder who approved the design now wants something completely different.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This happens because they did not actually understand what they approved. They saw the surface and said yes to the surface. They did not understand the structural decisions underneath - because you did not make those decisions visible.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What to do:</strong> Separate approval of direction from approval of execution. Get explicit sign-off on the approach before you design anything. After your alignment conversation, send a short written summary: &quot;Here is my understanding of the problem, the approach I am taking, and the expected output. If this looks right, I will move to the next step.&quot; Get a reply. That reply becomes your anchor if things shift later.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        &quot;I hear the new direction. Before we switch, I want to flag - we aligned on [original approach] on [date] because [reason]. The new direction changes [specific thing]. I am happy to explore it, but I want us to make that call deliberately, not accidentally.&quot;
      </blockquote>

      <h3 id="scenario-4" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Scenario 4: The Stakeholder Who Does Not Believe in Design
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some stakeholders see design as decoration - the team that makes things look nice after the real decisions have been made. They do not actively oppose you. They just do not think about you until they need screens.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is often a UX maturity problem, not a personality problem. In organisations with low design maturity, designers have to constantly evangelise about their work, why it matters, and why they should be allowed to continue doing it. NNGroup&apos;s research found that organisations only performed 22 percent of recommended DesignOps efforts across 500+ companies.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What to do:</strong> Stop trying to convince them with arguments. Convince them with outcomes. Pick one small project. Apply your full process - research, data, design, measurement. Track the result. Then share the result in their language: not &quot;we improved the experience&quot; but &quot;support tickets for this flow dropped 30 percent&quot; or &quot;conversion on this page increased from 2.1 to 3.4 percent.&quot;
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        &quot;I know design sometimes feels like a black box. I would like to run a quick pilot on [specific project] - I will share my process as I go and measure the outcome so we can see what impact it has. If it works, we have a model for how design can contribute. If it does not, I will adjust.&quot;
      </blockquote>

      <h3 id="scenario-5" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Scenario 5: The Cross-Functional Stakeholder Who Blocks Your Work
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A design leader at an enterprise software company described this perfectly: he led a CEO-backed UX redesign, but when the work was introduced to other teams, he encountered severe resistance. Teams who had felt shut out of the process found fault with minor details and actively resisted the roll-out.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is a political problem, not a design problem. And it happens more often than anyone admits. The person blocking your work might not disagree with your design. They might disagree with the fact that they were not consulted. Or they might feel threatened by a project that changes their workflow.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What to do:</strong> Map your stakeholders before you start. Not just the people who need to approve your work, but the people who can block it. Use a simple power-interest matrix: who has high influence and high interest (manage closely), who has high influence but low interest (keep satisfied), who has low influence but high interest (keep informed).
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        &quot;I know this project touches [their area]. Before we go too far, I would love to get your perspective on [specific aspect]. Your team deals with this daily - I want to make sure we are not designing something that creates problems downstream.&quot;
      </blockquote>

      <h2 id="you-are-stakeholder" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Flip Side: You Are a Stakeholder Too
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most content about stakeholder management focuses on managing upwards - your PM, your VP, your client. But designers are also stakeholders to other teams, and understanding this changes how you operate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>To Engineering:</strong> Your designs dictate what engineers build - the features, the flows, the interactions. If you design without understanding technical constraints, you are the difficult stakeholder. If you hand over designs without context, engineers will make assumptions. Those assumptions might break your design. <em>Fix: Include engineering in design decisions early. Not for approval - for feasibility.</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>To Product Management:</strong> Your design expertise ensures the product meets user needs and aligns with the vision. But if you cannot articulate why your design serves the business goal - if you only speak in terms of UX principles - you are a stakeholder they have to manage, not a partner they want to consult. <em>Fix: Learn their language. Understand the metrics they track. Frame your design work in terms of the outcomes they are responsible for.</em>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>To Marketing, Support, and Sales:</strong> These teams live with the consequences of your design decisions every day. Marketing has to sell what you built. Support has to troubleshoot it. Sales has to demo it. <em>Fix: Loop them in on major design changes. A 10-minute heads-up before launch saves weeks of friction afterwards.</em>
      </p>

      <h2 id="challenging-stakeholders" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Handling Challenging Stakeholders
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not every stakeholder is reasonable. Some are difficult - and you need specific strategies for specific types.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The stakeholder with strong opinions and no data:</strong> Empathise with their position first. Then redirect to evidence. &quot;That is a really interesting perspective. Let me show you what we found when we tested something similar - it might change the approach.&quot; If they insist without data, document their feedback and present it alongside the research-backed alternative. Let the evidence compete with the opinion.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The stakeholder who wants to design for you:</strong> They open your Figma file and start moving things around. Or they sketch their solution on a whiteboard and tell you to build it. This is usually about control, not about design. The fix is to acknowledge their idea and then expand the conversation. &quot;I like the thinking behind this. Let me explore a few variations - including this direction - and bring them back with the trade-offs mapped out.&quot; You are giving them credit while retaining control of the design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The stakeholder who goes quiet and then surprises you:</strong> Some stakeholders seem disengaged - they do not attend reviews, they do not give feedback. Then suddenly they appear with a completely different vision. This is a keep-satisfied stakeholder you mistook for a keep-informed one. Proactively send them updates even when they do not ask. Short. Async. &quot;Quick update on [project]. Here is where we are. Flag anything that concerns you.&quot; The goal is to prevent the surprise, not react to it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>The stakeholder who escalates everything:</strong> Some stakeholders bypass you and take feedback directly to your manager or the VP. This is usually a trust problem. They do not believe you will act on their feedback, so they go over your head. The fix is to close the loop visibly. Every piece of feedback should get a documented response: &quot;You said X. Here is what we did about it and why.&quot; When people see their input reflected in the work, they stop escalating.
      </p>

      <h2 id="communication-rhythm" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Building a Communication Rhythm That Prevents Most of These Problems
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The majority of stakeholder conflicts come from one root cause: silence. When a designer goes dark, stakeholders fill the silence with anxiety.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Build a rhythm and stick to it:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Start of project:</strong> Alignment conversation. 15 minutes. Problem, success criteria, constraints.</li>
        <li><strong>Weekly async update:</strong> Takes five minutes to write. &quot;This week I [what you did]. Two things stood out: [finding 1] and [finding 2]. Next step: [what is coming]. One risk I am watching: [risk].&quot;</li>
        <li><strong>Before major decisions:</strong> Quick check-in. &quot;I am about to commit to [direction]. Here is why. Any concerns before I move forward?&quot;</li>
        <li><strong>After completion:</strong> Close the loop. &quot;Here is what we delivered. Here is how it performed against the success criteria we set at the start.&quot;</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This rhythm costs you maybe 30 minutes a week. It prevents 90 percent of stakeholder conflicts. It also quietly builds a paper trail of your contributions - which matters enormously when promotion conversations happen.
      </p>

      {/* Inline image 2 - Team trust / collaborative communication visual */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-10">
        <Image
          src="https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80"
          alt="Team of professionals engaged in a collaborative discussion around a shared workspace"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <h2 id="best-designers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Best Designers Do Differently
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Tom Greever, author of Articulating Design Decisions, puts it well: the goal is not to argue with stakeholders about who is right. It is to create an environment where stakeholders can clearly see your expertise and thought process, so that they want to support you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The best designers I have worked with - the ones who get promoted, who get their designs shipped, who earn that seat at the table - all share three habits:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>They speak business first, design second.</strong> They understand what metrics their stakeholders track and they frame every design decision in terms of those metrics. Not &quot;this improves usability&quot; but &quot;this reduces the support burden on your team by roughly 20 percent.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>They share early, before they are comfortable.</strong> They show rough sketches, unfinished thinking, half-formed ideas. Not because they are unsure, but because they know that early input is cheap and late feedback is expensive.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>They treat every stakeholder interaction as a deposit into a trust account.</strong> Every clear update, every risk flagged early, every time they close the loop on feedback - it builds trust. And trust is the currency that lets you push back when it matters, take creative risks when needed, and be the person stakeholders cannot make decisions without.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That is the shift. From the person who makes the screens to the person who shapes the decisions. And it does not start with a better Figma file. It starts with a 15-minute conversation before you open Figma at all.
      </p>

      <FreeTrainingCTA text="Stakeholder management is one of the core skills we build. Watch the training to see how" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mt-8 mb-6">
        At Xperience Wave, stakeholder communication is one of the core skills we build in our 1:1 mentorship and our short course on stakeholder management for designers. It is not about making you more &quot;political.&quot; It is about making sure your work sees the light of day - and drives the impact it deserves. If your design work keeps getting ignored, overruled, or diluted, <a href="https://app.xperiencewave.com/book/dc-strategy-call" className="text-accent hover:underline font-medium" target="_blank" rel="noopener noreferrer">book a free strategy call</a> and let us dig into what is actually going on.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li>Nielsen Norman Group - State of UX 2026</li>
        <li>Maze - Future of User Research Report</li>
        <li>McKinsey &amp; Company - The Business Value of Design (2018)</li>
        <li>NNGroup - DesignOps Efforts Across 500+ Companies</li>
        <li>Tom Greever - Articulating Design Decisions (O&apos;Reilly Media)</li>
      </ul>

      <h2 id="related-reading" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Related Reading
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">A Senior UX Designer Is Not a Delivery Person</Link> - the fundamental shift from executing to influencing</li>
        <li><Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link> - what happens when stakeholder trust reaches the point where you are part of strategic conversations</li>
        <li><Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Your Design Team Doesn&apos;t Have a Skills Problem - They Have a Systems Problem</Link> - when stakeholder issues are actually systemic design function issues</li>
        <li><Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The 12L vs 30L UX Designer: What&apos;s the Difference?</Link> - how stakeholder management and business fluency directly impact compensation</li>
        <li><Link href="/resources/blogs/mixed-methods-ux-research-guide" className="text-accent hover:underline font-medium">Mixed-Methods UX Research: A Complete Guide</Link> - backing up stakeholder conversations with research that stakeholders cannot ignore</li>
        <li><Link href="/resources/blogs/design-team-plateau-10-people" className="text-accent hover:underline font-medium">Why Most Design Teams Plateau After 10 People</Link> - organisational dynamics that make stakeholder management harder at scale</li>
      </ul>
    </>
  ),
  'ux-career-ladder-levels-india': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        In <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link>, I wrote about why the standard career framework doesn&apos;t work here - the hierarchy, the politics, the gap between what your title says and what you&apos;re actually allowed to do. That blog was about the system.
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        This one is about you inside it. What does each level actually demand of you in practice? What changes? And where do most Indian designers find themselves stuck - not because they aren&apos;t capable, but because nobody told them what was actually required at the next stage?
      </p>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-8">
        I&apos;m going to walk through every level from Associate to CXO. I&apos;ll spend the most time between Year 3 and Year 8, because that&apos;s where the Indian design career diverges most sharply from anything a Western career guide would prepare you for. That&apos;s where careers are made or quietly killed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        One thing upfront: after a certain point in India, your design skill is no longer the primary thing that moves you forward. That shift happens earlier than most people expect. Understanding when it&apos;s coming - and starting to build for it before it arrives - is the whole point of this blog.
      </p>

      <h2 id="year-0-2" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Year 0-2: Associate / Junior UX Designer
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where everyone starts, and it&apos;s the level with the fewest surprises. Which is both reassuring and, if you&apos;re not careful, the beginning of a bad habit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this stage, the work is defined for you. You&apos;re executing tasks within a project someone else is leading. Building wireframes from flows a senior designer mapped. Working inside a design system someone else set up. Sitting in on user research but not yet running it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s correct for this level. The problem is when designers mistake the clarity of defined tasks for a measure of their own competence. You can be very fast, very tidy, and very wrong about how ready you are for the next step.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The one habit that separates the designers who move fast from those who plateau early: asking why.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Not what to design. Why this screen exists. Why this flow was chosen over another.</li>
        <li>Why the business cares about this feature at all right now.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who ask why early become the ones trusted with harder decisions later. The ones who don&apos;t remain very good executors of other people&apos;s thinking - sometimes indefinitely.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Where designers get stuck:</strong> Equating tool speed with design depth. In most Indian bootcamps and junior roles, the visible measure of performance is delivery speed - how fast you turn around a wireframe, how quickly you close tickets. You get faster. You get praised for being faster. And without noticing, you start optimising for speed over thinking. This is one of the hardest habits to unlearn, because the reward system actively reinforces it.
      </p>

      <h2 id="year-2-3" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Year 2-3: UX Designer - and the Title Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After a year or two, you move into proper UX Designer roles. This is also where Indian organisations immediately get confusing with titles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You might be called a UX Designer, Experience Designer, Digital Experience Designer, Product Designer, or just &apos;Designer.&apos; Sometimes this signals a genuine difference in scope. More often, it&apos;s HR convention or internal politics.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The distinction that actually matters: UX Designer versus Product Designer. The IxDF defines it clearly - a UX designer focuses primarily on the user experience: researching behaviour, designing interaction, advocating for the user. A Product Designer guides the full product lifecycle: balancing user needs, business goals, and technical feasibility together. The scope is broader and the business accountability is higher.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In practice, LogRocket puts it honestly: most companies don&apos;t get it right - someone&apos;s actual role may revolve around product strategy but their title still says &apos;UX Designer.&apos; And in India especially, the titles are applied inconsistently enough that the title alone tells you very little.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        What actually matters: does your role expect you to own business outcomes - or just experience outcomes?
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If the answer is business outcomes, you are functionally a Product Designer regardless of your title.</li>
        <li>If it&apos;s experience outcomes only, you are a UX Designer.</li>
        <li>Know which one you actually are. It affects what you need to build next.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some organisations layer these into Level 1, Level 2, Level 3. Here&apos;s what that actually means structurally: each level corresponds to a salary band - a defined minimum and maximum for that grade. Annual increments move you within the band. A level change (L1 to L2) moves you to a slightly higher band, but you&apos;re still inside the same title. The jump in title - from UX Designer to Senior UX Designer - is what changes the band meaningfully.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The honest observation from inside Indian organisations: L1, L2, L3 within the same title are frequently used as salary management tools. They let an organisation give you something that looks like a promotion - a new level number, a modest bump - without the structural change of a title promotion, which would require opening a new band and formally recognising a new scope of responsibility. You feel like you moved. The organisation&apos;s cost structure barely changed.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The jump from L1 to L2 feels significant from inside - you worked for it, your manager acknowledged it. From outside - from a hiring manager at another company - it is invisible. You cannot put &apos;UX Designer L2&apos; on your resume and expect anyone to know or care. The only thing that crosses company boundaries is the title itself. Which means the only promotion that actually builds your market value is a title change, not a level change.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where designers get stuck:</strong> Job-hopping for level bumps without accumulating depth. I&apos;ve reviewed portfolios from designers who&apos;ve been at four companies in three years, each time moving to a higher-sounding level. None of them stayed long enough to see a project through from discovery to post-launch impact. The portfolio has breadth but no depth. When they interview for senior roles at design-mature organisations, the conversation ends early - not because they&apos;re not talented, but because nothing in their work goes below the surface.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you&apos;re in this phase and already thinking about how to get interviews: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls</Link>
      </p>

      <h2 id="year-3-5" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Year 3-5: Senior UX Designer - Where the Game Changes
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        On paper, a Senior Designer handles complexity independently. You can foresee how a full design process should unfold, make confident trade-off decisions, run research and translate findings into direction. That&apos;s accurate. But it&apos;s the easy part.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s the part nobody writes down: at Senior level in India, for the first time, your design skill is no longer the primary thing being evaluated. What&apos;s being evaluated is whether you can make the people around you - product managers, engineers, business stakeholders - care about what design produces. The McKinsey Business Value of Design research found that fewer than 5% of organisations have senior leadership capable of making objective design decisions. That means in most rooms you&apos;ll ever be in, the people with the budget and the authority don&apos;t speak design. Learning to translate is not optional. It&apos;s the job.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        I&apos;ll say this plainly: the Senior Designers who remain Senior for the next five years are almost always the ones who hit this level with real confidence and mistook that confidence for capability. They know enough to have strong opinions. They&apos;ve seen projects succeed. They feel like they have it figured out. They don&apos;t. And the gap between what they think they know and what the next level actually requires is exactly where careers stall in India - sometimes for years.
      </p>

      <h3 id="senior-requires" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        What Senior actually requires that nobody tells you
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Business awareness, not design theory.</strong> Learn what metrics your product team tracks. What does your PM worry about? What shows up in the quarterly business review? If you can&apos;t answer these questions, you&apos;re operating in a bubble - and in India, designers in bubbles don&apos;t get promoted. They get sidelined. Quietly. With a polite performance review that says nothing specific.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Relationships outside the design team.</strong> Your relationship with your engineering lead matters more than you think. Your ability to walk into a business meeting and speak in terms of revenue, retention, activation, and cost - rather than flows, affordances, and usability - matters more than your ability to make a beautiful interaction. In Indian workplaces, where hierarchy drives access, the designers who get into the rooms where decisions are made are the ones who&apos;ve already built trust with the people in those rooms.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Comfort with ambiguity - before you&apos;re asked for it.</strong> At junior and mid level, someone defines the problem for you. At Senior, you&apos;re expected to help define it. The brief that lands on your desk is often incomplete, politically shaped, and wrong in at least one important way. If you wait for a perfectly scoped brief, you&apos;ll wait forever. The designers who advance are the ones who walk into ambiguity, structure it themselves, and propose a direction with a clear rationale before anyone asked them to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Related reading:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li><Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where designers get stuck:</strong> Staying in your comfort zone because the comfort finally arrived. You&apos;re good now. You can deliver consistently. The feedback is positive. This feeling - after years of uncertainty - is genuinely earned. It is also the most dangerous moment in an Indian design career. The next level requires entirely different muscles. If you don&apos;t start building them now, you won&apos;t have them when the opportunity appears. And the opportunity does not wait for you to feel ready.
      </p>

      <h2 id="year-5-7" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Year 5-7: Lead Designer - the Most Misunderstood Title in Indian Design
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Let me say this plainly, because almost every Indian organisation gets it wrong: Lead does not mean you manage a team. Lead means you lead the work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You&apos;re responsible for the design direction of a project - the strategic decisions, the quality bar, the coherence of the full experience. To achieve that, you might work alongside researchers, interaction designers, visual designers, motion designers, content writers. You are not managing their careers or their performance reviews. You are aligning their work toward a shared outcome.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This distinction matters because a large number of Indian organisations treat Lead as a junior management position. They give you the title, expect you to handle resourcing and timelines, and give you none of the strategic authority that should come with it. You become a project coordinator with a design label. You&apos;re responsible for delivery without the power to shape direction.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If that&apos;s happening to you - name it clearly. You are not in a Lead role. You are in an execution management role with a Lead title. Those are different jobs with different futures attached to them.
      </p>

      <h3 id="lead-actually-does" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        What a real Lead Designer actually does
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You shape the design approach before anyone opens Figma. You decide which problems are worth solving and which are distractions. You create the framework within which the team designs. You&apos;re the one who says: we&apos;re not designing five features, we&apos;re solving one problem, and here&apos;s the lens we&apos;re using.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You also become the bridge - translating business goals into design strategy for your team, and translating design rationale into business language for stakeholders. This is a full-time communication job layered on top of a full-time design job.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The specific capability Lead requires that Senior didn&apos;t: making decisions with incomplete information and defending them clearly.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>At Senior, you can hold a decision until you have more data.</li>
        <li>At Lead, the team is waiting on you. The stakeholders are waiting. The business has a timeline that doesn&apos;t care about your uncertainty.</li>
        <li>You make the call. You explain the reasoning. You stay open to being wrong. You move.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where designers get stuck:</strong> Staying hands-on with everything because letting go feels dangerous. At Lead level, if you&apos;re still personally designing every major screen, you&apos;re not leading - you&apos;re doing Senior work with a Lead title. The hardest transition at this level is trusting other designers to carry the craft while you focus on direction.
      </p>

      <h2 id="the-fork" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Year 6-8: The Fork - The Decision Most Indian Designers Never Actually Make
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most critical juncture in the Indian UX career. Two paths diverge, and most designers stumble into one without ever consciously choosing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve watched this play out more times than I can count. The designer stays in a vaguely lead-ish role - half-managing, half-designing, fully frustrated - for two or three years without committing to either direction. They&apos;re not building the strategic depth a strong IC needs. They&apos;re not building the people skills a good manager needs. They&apos;re doing a diluted version of both, and wondering why they feel stuck.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The fork is a decision. Make it deliberately.
      </p>

      <h3 id="path-a-ic" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Path A: Individual Contributor - Staff Designer and Principal Designer
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        First, the assumption that needs to be challenged directly: the idea that staying an IC means you&apos;ve stopped growing - or hit a ceiling - is not a career truth. It&apos;s an organisational maturity failure that gets mistaken for one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At mature design organisations globally, IC tracks are explicitly designed to be as prestigious, impactful, and well-compensated as management tracks. Google, Meta, Netflix, Airbnb, and Intercom all have documented IC design paths that go from Senior to Staff to Principal - with increasing scope, influence, and compensation - without requiring anyone to manage a single direct report.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Intercom&apos;s published career framework shows Principal Designers working at the group level, partnering with cross-functional group leaders, driving product vision, and acting as force multipliers for the entire group - while their only management responsibility is influencing work, not reviewing performance.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The assumption &apos;not managing people = stopped growing&apos; is an organisational maturity problem, not a career ceiling problem. At a company that has built the infrastructure for IC growth, a Principal Designer can have the same organisational influence as a VP of Design - without managing a single person. If your current organisation has no IC path above Senior, that is a signal about the organisation. Not about the validity of the IC path.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Staff Designer.</strong> You&apos;re responsible for design culture within the organisation. Design systems, knowledge sharing, how design decisions get made and documented across teams - not on any single project but across all of them. You maintain the operational backbone of the design practice. You typically need seven to eight years of experience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Principal Designer.</strong> Your allocation is distributed across multiple projects simultaneously. You&apos;re not going deep on one product - you&apos;re providing senior design judgment across several. This requires the ability to context-switch at a strategic level.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Where designers get stuck:</strong> Choosing the IC path but staying at an organisation that has no IC infrastructure above Senior. The decision then is: fight for three years to create the role, or find an organisation where the path already exists. Both are legitimate. But you need to know which situation you&apos;re in.
      </p>

      <h3 id="path-b-leadership" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Path B: People Leadership - Manager, Director, VP, CXO
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the path most Indian designers default into. It&apos;s more visible, the salary tends to be higher at transition, and Indian work culture treats management as the natural signal of seniority.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Design Manager (Year 7-9).</strong> You have a team. Designers who report to you. You&apos;re responsible for their project allocations, their growth, and in most organisations, their performance reviews. Here&apos;s what nobody tells you about this transition: the job is completely different from everything you&apos;ve been doing for the last seven years. Everything that made you a great designer - attention to detail, strong opinions about craft, the drive to get things right personally - can actively work against you as a manager.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you can&apos;t let go of the Figma file, you&apos;ll micromanage. If you can&apos;t give honest feedback without making it a confrontation, you&apos;ll either avoid hard conversations or handle them badly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Director of Design / AVP Design (Year 9-12).</strong> You&apos;re no longer managing individual designers day to day. You&apos;re managing managers, or owning design direction across an entire product line or business unit. Your conversations are mostly with other directors - product, engineering, marketing - and your job is to ensure design has a seat where strategic decisions are made. In Indian organisations, this is where the political navigation becomes the job.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>VP of Design / Head of Design (Year 12+).</strong> You own design across the organisation. You set the vision, build the team, define the culture, represent design to the C-suite. These roles in India are almost never filled through job boards. They&apos;re filled through networks.
      </p>

      <h3 id="cxo-level" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        CXO Level: Chief Design Officer and Chief Experience Officer
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These positions exist at companies where design is a strategic function, not a service function. The Chief Design Officer owns design as a competitive capability. The Chief Experience Officer owns the end-to-end experience across all customer and product touchpoints.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In India, these roles are still uncommon. When they exist, they&apos;re at large, forward-thinking organisations or at companies where the founder has a design background.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Nobody arrives here by being the best designer in the room. They arrive by being the person who made design impossible to ignore at an organisational level, for long enough that the right people noticed.
      </p>

      <h2 id="where-stuck" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Where Indian Designers Actually Get Stuck - The Honest Version
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Stuck at Senior, Year 3-6.</strong> The most common plateau. The designer has the craft but not the communication. They can design well but can&apos;t explain why their work matters in business terms. The bottleneck has not been skills for two years. The bottleneck is positioning and language, and nobody told them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;12L vs &#x20B9;30L gap is almost always this gap: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Stuck at the fork, Year 6-8.</strong> The designer doesn&apos;t choose IC or management, so they do neither. They stay in a vaguely lead-ish role - half-managing, half-designing, fully frustrated - for two or three years.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Stuck at Manager, Year 8-12.</strong> The designer was promoted into management without being trained for it. They&apos;re struggling with delegation, honest feedback, and stakeholder influence.
      </p>

      <h2 id="what-to-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What to Do With This
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Year 0-3:</strong> protect your learning window. Don&apos;t rush toward titles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Year 3-5:</strong> stop adding skills and start building influence. Learn how your business works. Build one strong relationship outside the design team.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Year 5-8, at the fork:</strong> make the choice. IC or leadership - both are legitimate, both require specific muscles.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Manager and above:</strong> the skills that got you here will not get you further. Craft got you to Lead. Influence got you to Manager. Organisational design, strategic thinking, and deliberate leadership development are what take you from here.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Wherever you are on this ladder, the worst thing you can do is assume the next step will happen naturally. In India, it won&apos;t. The system doesn&apos;t reward patience. It rewards clarity, positioning, and the ability to make your value impossible to ignore. Those are learnable. But only if you start before you need them.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Not sure which level you&apos;re actually at - or what&apos;s specifically blocking you? <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a free 45-minute strategy call</a>. We&apos;ll tell you honestly where you are, what the actual gap is, and what to work on first - whether you join us or not.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li>IxDF - Product Design and UX Design Roles: Unveiling the Differences. Product Designer focuses on the full product lifecycle. UX Designer focuses primarily on the user experience.</li>
        <li>LogRocket - Product Designer vs UX Designer. Most companies don&apos;t get the distinction right.</li>
        <li>McKinsey - The Business Value of Design (2018). Fewer than 5% of organisations have senior leaders who can make objective design decisions.</li>
        <li>Intercom - Leadership Without Management: Expanding our Product Design Career Path. Documented parallel IC and management tracks.</li>
        <li>Fundament Design - Does every designer ultimately have to manage people? (2026). IC path allows designers to grow without moving into management.</li>
        <li>Rosenfeld Media - What&apos;s Next for ICs: Exploring Staff and Principal Designer Roles (2024). IC design leadership paths are less formalised and often self-defined.</li>
        <li>Xperience Wave - Direct observation. Career transition patterns from 13+ years of design leadership and mentoring 140+ designers.</li>
      </ul>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The companion piece - why the ladder is broken in India: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If AI is reshaping what depth means: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Isn&apos;t Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>The salary gap: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>Getting ghosted after Round 2: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link></li>
        <li>Getting upstream into strategy: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>What hiring managers look for: <Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Look for When Hiring Senior UX Designers</Link></li>
        <li>Explore the programme: <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Xperience Wave Current</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX mentorship and education company based in Bangalore. He has 13+ years of design leadership experience across India, Japan, Singapore, Dubai, Australia, and the US, and has worked directly with 3,000+ designers across the country. He holds a Masters in Industrial Psychology.
      </p>

      <FreeTrainingCTA text="Want a personalized plan to move up the ladder? Watch our free 28-min training" />
    </>
  ),
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
  'design-team-plateau-10-people': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You have 10 designers and 200 developers. You never asked for that ratio. Nobody planned it. And now you cannot explain why you need an eleventh designer - because you never built the case for the first ten.
      </p>

      <h2 id="how-you-got-to-10" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How You Got to 10 Without a Plan
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody sat down and said: we need a design team of 10 people, here is why, here is the structure, here are the roles, here is the maturity plan. That conversation never happened.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What happened was this: product needed screens. Someone hired a designer. Then another project started and they needed another designer. Then the team grew because demand grew. Engineering hired strategically - with job families, levels, capacity plans, and budget justifications. Design hired reactively - because a project was bottlenecked and someone needed to make the mockups.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The first 10 designers were not hired by the design leader. They were allocated. The decision about how many designers the company needs was made by someone who does not directly manage designers, does not understand design capacity, and does not know the difference between a visual designer and a UX researcher. They made a headcount decision the same way they would allocate any other resource: how many do we need to keep the projects moving?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And the design leader accepted it. Not because they agreed with the number, but because they were never asked to have a different conversation. They were asked to deliver, so they delivered. The budget conversation never started, because the design leader was never in the room where budgets were discussed. They were in the room where deadlines were discussed.
      </p>

      <h2 id="why-stops-at-10" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why It Stops at 10
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The first 10 happened because of project demand. When demand stops growing - or when leadership decides the current demand is covered - the team size freezes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here is the part that hurts: the design leader starts believing it too. After years of managing delivery, fielding requests, and keeping projects moving with whatever headcount they were given, they internalise the cap. The internal monologue shifts from &quot;I need more people&quot; to &quot;I genuinely do not know what I would do with more people.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is not a headcount problem. That is a vision problem. The design leader has been in delivery mode so long that they cannot imagine what a design practice looks like beyond delivery. They have never built a research function. They have never hired a design ops person. They have never created a content design capability or a service design layer. They think design equals UI, because that is what the organisation has told them design is. And they believe it now.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Meanwhile, on the other side of the office, there are 200 developers. Engineering has capacity plans, growth roadmaps, tech leads who own architecture, engineering managers who own people development, and a VP who fights for budget every quarter. Nobody in engineering looks at their team of 200 and thinks: this is probably enough.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the design leader looks at 10 and thinks exactly that. Because they were never taught to think differently.
      </p>

      <h2 id="what-goes-wrong" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Goes Wrong at 10
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Ten people is the exact size where ad hoc management stops working and the absence of systems becomes visible. Everything that worked at 3-5 designers breaks.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The leader becomes a project manager.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At 3 designers, the lead could review everyone&apos;s work, maintain quality, and still do their own design work. At 10, they are routing requests, managing dependencies, sitting in alignment meetings, and resolving conflicts between product managers who all think their project is the priority. They have become a traffic controller for the team, not a leader of the practice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nielsen Norman Group&apos;s research found that only 13% of design teams have formal DesignOps leads or managers. The other 87% distribute operational work across design leads and managers who are already overloaded. As the team approaches 6-7 designers, NNG recommends introducing a design manager to handle day-to-day support so the lead can focus on vision. At 10, without this split, the lead has no time for vision at all.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Design becomes invisible to leadership.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When design was 3 people, the founder or VP knew every designer by name. At 10, design is a department - and departments are evaluated by what they produce, not by what they could produce if given the right infrastructure. Nobody in the leadership meeting asks &quot;what does design think?&quot; They ask &quot;is design done with the screens?&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey&apos;s research found that fewer than 5% of company leaders could make objective design decisions. The problem is not that leaders do not care about design. It is that nobody has educated them on what design at a mature level looks like - and the design leader, who is buried in delivery, has not had time to do that education. Design is invisible because the design leader is invisible. And the design leader is invisible because they are managing projects instead of managing the practice.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The team has no culture beyond delivery.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At 10 people, a design team without intentional culture has no rituals that are not project-related. No design all-hands. No shared vision for what design should become. No regular knowledge-sharing sessions. No team identity beyond &quot;the people who make the screens.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The team exists as a resource pool, not a practice. Designers are assigned to products. They interact with their product teams more than with each other. There is no shared learning, no peer critique, no collective ambition. Each designer&apos;s growth depends entirely on whatever their product team exposes them to - which is usually &quot;more of the same work they did last quarter.&quot; (This is the garnish problem at the team level - present, visible, but not shaping anything.)
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The team becomes easy to replace.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the consequence that should terrify every design leader. When design operates as a service function with no unique strategic contribution, the organisation starts to believe it can be replaced. By a smaller team. By an agency. By AI tools. By developers who &quot;also do design.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And the tragic part is: they are not entirely wrong. If the design team&apos;s only contribution is producing screens to spec, that contribution can be replicated by cheaper alternatives. What cannot be replicated is a design practice that shapes product strategy, conducts original research, builds design systems, develops designers into leaders, and creates compounding value over time. But that practice was never built - because the leader was too busy delivering screens.
      </p>

      <h2 id="breaking-through" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Breaking Through Actually Requires
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Breaking through the 10-person plateau is not about getting budget for an eleventh designer. It is about transforming how design operates within the organisation. This requires the design leader to stop being a delivery manager and start being a practice architect.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Own the budget conversation.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Engineering leaders present budget proposals every quarter. They justify headcount with capacity data, project roadmaps, and tech debt calculations. Design leaders need to do the same - and most have never done it because they were never asked to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Start by mapping design capacity against demand. How many products are you supporting? How many designers per product? What is the ratio of design requests to design capacity? What work is not getting done because there are not enough people? What is the cost of that undone work - in delayed launches, poor user experience, increased support tickets, or lost revenue?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When you present a budget request with this data, you are speaking the language that VPs and founders understand. You are not asking for more designers because you are overwhelmed. You are showing a business case for investment in design capacity.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Define what you need before you hire.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most design leaders at 10 people think the next hire should be &quot;another UI designer.&quot; Because that is all they know. The team has 10 generalists who all do the same type of work at varying levels of quality.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The breakthrough requires hiring for capabilities the team does not have. A UX researcher who builds an original research practice. A design ops lead who handles tooling, process, and team operations. A content designer or UX writer. A service designer who maps end-to-end experiences. A design systems specialist who creates the shared language that prevents inconsistency.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        NNG found that only 10% of organisations have reached the highest level of DesignOps maturity. The organisations that break through the plateau are the ones that stop hiring more of the same and start hiring for the capabilities that transform design from a production function into a strategic practice.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Separate practice leadership from project delivery.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the structural change that matters most. At 10 people, the design leader cannot do both. If they are managing project delivery, they are not building the practice. If they are building the practice, someone else needs to manage project delivery. (The <Link href="/resources/blogs/ic-to-manager-trap-designers" className="text-accent hover:underline font-medium">IC-to-Manager blog</Link> covers why this split is critical for individual designers. The same principle applies to the leader of the team.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The practice leader&apos;s job is: Define the design vision. Build the maturity roadmap. Own the budget. Develop the team. Educate leadership on design&apos;s value. Create the systems (reviews, stakeholder integration, role clarity, growth frameworks) that <Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Blog 11 identified as missing</Link> in most teams.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The delivery manager&apos;s job is: Route work. Manage timelines. Coordinate with product and engineering. Ensure quality on active projects. These are different jobs. At 10 people, they cannot be done by the same person.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Build design culture before you need it.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A design all-hands. A monthly show-and-tell. A quarterly design strategy presentation to the executive team. A learning session where designers share something new. A team charter that articulates what the design team stands for and where it is going.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        None of these require budget. All of them require the design leader to stop thinking of the team as a resource pool and start thinking of it as a practice. A practice has rituals, values, a shared language, and a trajectory. A resource pool has a backlog.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        InVision&apos;s research found that 81% of companies that invest in DesignOps report better alignment between design, product, and engineering. NNG found that organisations with mature design operations see a 228% higher ROI compared to those with low design maturity. The investment is not in tools or headcount - it is in the systems and culture that allow the tools and headcount to produce compounding value.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. Make design&apos;s impact visible to people who control the budget.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The single biggest reason design teams plateau is that leadership does not see design&apos;s value beyond screen production. And the single biggest reason leadership does not see that value is that nobody has shown them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design leaders need to present design impact in business terms. Not &quot;we redesigned the onboarding flow.&quot; But: &quot;The redesigned onboarding flow increased activation from 23% to 41%. That represents &#x20B9;X in additional annual revenue.&quot; The first statement is a design update. The second is a business case for investing more in design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey&apos;s MDI research found that companies where design leaders set quantified targets for design performance were in the top quartile. Only 14% of companies were doing this. The design leaders who break through the plateau are the ones who learn to translate design outcomes into the metrics that leadership already tracks.
      </p>

      <h2 id="honest-assessment" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Start With an Honest Assessment
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you ask for budget, before you restructure, before you hire - assess where your team&apos;s systems actually are. The Design Team Systems Audit scores your team across five dimensions (review cadence, stakeholder integration, role clarity, design maturity, feedback and growth). 20 questions. 10 minutes. Free.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The audit will tell you which systems are missing. That diagnosis is the foundation for every conversation that follows - with your VP, your founder, your engineering counterpart, and your own team.
      </p>
      <SystemsAuditGate />

      <h2 id="budget-kit" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Get the Budget Conversation Prep Kit
      </h2>
      <BudgetPrepKitGate />

      <h2 id="if-this-is-your-team" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        If This Is Your Team
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are a design leader at 10 people and recognise yourself in this blog - the plateau is not permanent. But breaking through requires a different kind of work than what got you to 10. Delivery management got you here. Practice architecture gets you to the next level.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Our <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">corporate training programme</Link> is built to help design leaders make this transition. Not generic management training - design-specific systems building: budget conversations, maturity roadmaps, team structure, stakeholder integration, and the leadership skills that transform a team of 10 into a practice that scales.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We also offer <Link href="/for-business/ux-design-services" className="text-accent hover:underline font-medium">UX design services</Link> for organisations that need to augment capacity while building internal capability.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a team training call</a> and we will assess where your team is stuck and what it takes to break through.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>McKinsey - &quot;The Business Value of Design,&quot; 2018. 300 companies, 5 years. Top-quartile: +32% revenue, +56% TRS. &lt;5% design-competent leadership. Only 14% set quantified design targets.</li>
        <li>McKinsey - &quot;Are You Asking Enough from Your Design Leaders?&quot; 2020. 90% not reaching full potential. 60% of design decisions made in isolation. Only 10% at highest maturity.</li>
        <li>Nielsen Norman Group - DesignOps research. Only 10% broad DesignOps understanding. Only 13% have formal DesignOps leads. At 6-7 designers, introduce a design manager.</li>
        <li>Nielsen Norman Group - Organisations with mature DesignOps see 228% higher ROI vs low maturity.</li>
        <li>InVision - Design Maturity Report 2020. 81% of companies with DesignOps investment report better alignment between design, product, and engineering.</li>
        <li>Deloitte - 2025 Global Human Capital Trends. 93% say flexible structures important vs 19% ready.</li>
        <li>Xperience Wave - direct observation from corporate training engagements with design teams at product companies across India.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of design leadership experience across fintech, healthtech, and industrial technology. The scaling patterns in this blog come from direct work with design teams at product companies across India - from early-stage startups to 500-person enterprises - through XW&apos;s mentorship and corporate training programmes.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>On the five systems most design teams are missing: <Link href="/resources/blogs/design-team-systems-problem" className="text-accent hover:underline font-medium">Your Design Team Doesn&apos;t Have a Skills Problem - They Have a Systems Problem.</Link></li>
        <li>On the IC-to-manager transition that breaks most design teams: <Link href="/resources/blogs/ic-to-manager-trap-designers" className="text-accent hover:underline font-medium">The IC-to-Manager Trap.</Link></li>
        <li>On the hidden cost of promoting without preparation: <Link href="/resources/blogs/hidden-cost-promoting-ic-designer-manager" className="text-accent hover:underline font-medium">The Hidden Cost of Promoting Your Best IC Designer to Manager.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Co-founder &amp; Head of Design, Xperience Wave
      </p>

      <FreeTrainingCTA text="AI changes the game, but only if you're playing the right one. Watch the training" />
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

      <FreeTrainingCTA text="If courses failed you, here's what actually works" />
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
        Here&apos;s the thing. Being under NDA doesn&apos;t mean you can&apos;t show your work at all. It means you need to be smarter about how you tell the story. Sanitise the data. Use percentages instead of absolute numbers. Change the brand name if you have to. Show the thinking, the decisions, the impact, without leaking proprietary information. We wrote an entire piece on <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">how your NDA isn&apos;t the real problem</Link> with five specific approaches that work.
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
        A portfolio full of pretty screens tells a recruiter you can execute. It doesn&apos;t tell them you can think. And at the senior level, thinking is the job. This is exactly why <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">designers get ghosted after Round 2 interviews</Link> - the portfolio looked great but the narrative was hollow.
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
        Instead, show them how you navigated constraints. How you influenced without authority. How you adapted when the textbook process wasn&apos;t possible. That&apos;s what senior designers do. If this sounds familiar, our piece on <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">moving from delivery person to design leader</Link> covers the PIE Model for exactly this shift.
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
        If you&apos;ve been stuck, applying, interviewing, getting rejected, and you haven&apos;t seriously restructured your portfolio, this is probably where the problem lives. We&apos;ve seen it too many times. The work is there. The story isn&apos;t. If you&apos;re not even getting interview calls, the issue might start <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">before your portfolio</Link> - it could be how you&apos;re thinking about the entire process.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re curious about the other reasons mid-level designers stay stuck, we wrote about <Link href="/resources/blogs/why-courses-dont-work" className="text-accent hover:underline font-medium">why UX design courses don&apos;t get you senior roles</Link>, and what the designers who actually break through do differently. Worth reading alongside this one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And if you want to understand where the industry is heading for senior designers specifically, our piece on <Link href="/resources/blogs/ai-first-design-senior-ux" className="text-accent hover:underline font-medium">AI-first design and what senior UX designers need</Link> covers the skills that are separating candidates right now. You might also want to read about <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">the type of designer that&apos;s actually replacing others</Link> in the AI era - it&apos;s not the tool, it&apos;s the mindset.
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
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call</a>
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
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your free strategy call</a>
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
        If you are not sure which of the three patterns in this piece describes you - or whether you are somewhere between them - the clearest next step is a <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">free 45-minute strategy call</a>. We will map where you actually are, what is working, and what to focus on first. No sales pitch. Walk away with clarity either way.
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
  'nda-work-ux-portfolio': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        The first time I spoke with Krishna, I spent most of the call nodding slowly and understanding about 60% of what he was saying.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He was describing his work on a SaaS product built around military-grade encryption technology - the kind of data security infrastructure used by organisations where a breach isn&apos;t embarrassing, it&apos;s catastrophic. He walked me through the problem space, the user constraints, the architectural decisions that shaped the design direction. It was some of the most technically complex and strategically layered design work I had heard from a designer at his level.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Then he stopped himself mid-sentence. &quot;I probably shouldn&apos;t be telling you any of this.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He was right. He had signed a tight NDA. By the time he registered what he had done, he had already described things his employer would not have wanted shared with anyone.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Then came the part I hear more often than I should: &quot;I&apos;ve basically decided to leave this project out of my portfolio entirely.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That decision - the one that feels responsible, even principled - was actually the bigger problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        We review portfolios every week. Across our team, that&apos;s easily 20 or more a week at any given time. And the NDA issue comes up in almost every cohort - not as an edge case, but as a pattern. Designers sitting on their strongest work because they don&apos;t know what they&apos;re actually allowed to show. This piece is about the third path between those two mistakes - sharing too much without realising it, or sharing nothing and letting genuinely strong work disappear.
      </p>

      <h2 id="not-niche-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        This Is Not a Niche Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Researchers estimate that somewhere between one-third and over half of all workers in professional roles are constrained by an NDA or an equivalent confidentiality mechanism. There is no UX-specific number - no survey has nailed it - but you don&apos;t need one. Think about where mid-level designers with three to six years of experience actually work: fintech, enterprise SaaS, healthcare, government, defence, large-scale e-commerce with competitive pricing models. These are exactly the industries where NDA density is highest.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have been in this field for more than two years and you have not worked under some form of confidentiality constraint, you are the exception. Most designers have. Many are holding back significant work because of it. And if your portfolio is not generating calls despite having strong experience, this is often a major contributing factor - we cover the full picture in <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">why you&apos;re not getting UX interview calls</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The problem is not that the agreements exist. The problem is that they are almost never explained to the people who sign them. You get a document, you sign it, and then years later you are sitting in front of your portfolio trying to figure out what you are actually allowed to say.
      </p>

      <h2 id="what-nda-covers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What an NDA Actually Covers - and What It Doesn&apos;t
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers treat an NDA as a blanket instruction to say nothing. It isn&apos;t. It is a specific legal contract that defines categories of protected information. The problem is those categories are written in legal language, and nobody at the company ever translates them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What is almost always protected:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Proprietary technology, architecture, or methodology - the specific how behind what the product does</li>
        <li>Exact performance metrics - the specific conversion rate, the exact user numbers, the actual revenue figures</li>
        <li>Unreleased features, roadmap, or product strategy</li>
        <li>Client or user data, including research findings tied to identifiable groups</li>
        <li>Competitive intelligence - anything that would materially help a competitor understand the company&apos;s position</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What is usually not protected:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The general domain or industry the product operates in</li>
        <li>Your role, your process, and the design decisions you made</li>
        <li>The methods you used - research approach, ideation process, testing, iteration</li>
        <li>The constraints you navigated - regulatory, technical, organisational, business</li>
        <li>Your reasoning, your tradeoffs, the thinking that led to the final direction</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>What designers mistakenly hide:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Process artefacts - journey maps, frameworks, research protocols, decision trees</li>
        <li>The problem framing - often treated as confidential when it&apos;s generic to the domain</li>
        <li>Outcomes stated in relative terms - &apos;significantly reduced drop-off&apos; reveals nothing proprietary</li>
        <li>The constraints themselves - &apos;designing for zero-tolerance error states in a regulated context&apos; is not a secret</li>
      </ul>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The NDA protects the company&apos;s secrets. It does not own your thinking. What you noticed, how you framed the problem, what you chose to explore and what you decided against - that belongs to you.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When Krishna went back and read his agreement with this framing, he found that it covered the technology architecture, the client names, and specific performance data. It did not cover the fact that he was designing for a security-critical enterprise context, the process he ran, or the thinking behind the direction. That was more than enough.
      </p>

      <h2 id="breach-you-dont-see" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Breach Most Designers Don&apos;t See Coming
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most NDA breaches in portfolios don&apos;t happen because someone decided to leak confidential information. They happen because the designer didn&apos;t know what qualified as confidential.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer includes a case study about improving a fintech app&apos;s onboarding flow. In the before/after comparison, they include: &apos;Increased completion rate by 47% by redesigning the risk assessment flow.&apos; They also show the step-by-step logic of how risk profiles are calculated in the UI. Their intent was to demonstrate impact. What they revealed was a proprietary conversion metric and the company&apos;s risk assessment methodology. Neither required them to show a single screen.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The sensitive information was not in the visuals. It was in the number and the methodology. Designers fixate on whether they can show the screens because screens are visible. But what actually matters to a company is usually in the specifics underneath - the what and the how that a competitor would find valuable.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        There is a level of abstraction at which everything is safe to share. &apos;I led a redesign of a complex onboarding flow for a regulated industry, reducing drop-off at the highest friction point by a meaningful margin.&apos; That sentence contains nothing proprietary. It tells a hiring manager what they need to know.
      </blockquote>

      <h2 id="fear-nobody-names" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Fear Nobody Names: What If Asking Signals I&apos;m Leaving?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the question that stops most designers from doing anything at all. Before they even get to &apos;what can I show,&apos; they get stuck on: if I go to my manager and ask about my NDA and mention my portfolio, won&apos;t they immediately know I&apos;m looking?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Maybe. But the framing of the conversation determines almost everything. &apos;Can I put this project in my portfolio?&apos; sounds like a resignation conversation dressed in polite language. &apos;I&apos;m building out my professional portfolio for career development&apos; is a different conversation entirely.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The script that tends to work:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;I&apos;ve been working on building out a professional portfolio - something I want to keep current regardless of where my career goes. I&apos;d love your guidance on what I can include from [project]. I&apos;m not planning to show anything sensitive - happy to share a draft with you first and get your sign-off before anything goes anywhere.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Three things this framing does: it anchors the conversation in professional development rather than job hunting, it offers the manager visibility and control before they have to ask for it, and it makes &apos;no&apos; harder to say reflexively because you&apos;ve already removed the thing they were going to object to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>When the manager just says no - and won&apos;t explain why</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        When this happens, you have three realistic options:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Go narrower.</strong> Don&apos;t ask to include the project. Ask a more specific question: &apos;Would it be okay to describe the type of problem I was solving without naming the product or client?&apos; A narrower request is harder to refuse with a blanket no.</li>
        <li><strong>Go to legal or HR directly.</strong> Your manager is not the legal authority on the NDA - the legal or HR team is. A polite email to HR often gets a more considered response. They are used to this question.</li>
        <li><strong>Work around the restriction entirely.</strong> Your process artefacts - frameworks you built, research protocols you designed, decision matrices you developed - are your intellectual work product. A process-only case study that never shows product-specific visuals or data does not require sign-off.</li>
      </ul>

      <h2 id="five-approaches" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Five Approaches - Ordered by What You Actually Need Access To
      </h2>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>1. Process-only case study - the one that works when nothing else does</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is what we built with Krishna. No product visuals. No metrics. No client name. What it had instead was a clear articulation of a genuinely hard problem, a documented process of navigating constraints that most designers never encounter, and evidence of a designer who could hold security requirements, compliance constraints, user experience, and business outcomes in the same conversation at the same time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Where specific detail was protected, the case study said so directly and visibly. Not vaguely omitted - explicitly labelled: <em>[Redacted - specific performance metrics protected by confidentiality agreement]</em>. This matters more than most designers realise. Unexplained gaps read as sloppy work. Labelled redactions read as professional discretion. One says you ran out of material. The other says you know exactly what you are doing with sensitive information - which, at a senior level, is a hiring signal in its own right.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That case study landed Krishna three roles. In each conversation, the hiring manager commented on how clearly they could see his thinking. Not despite the absence of screens. Partly because of it. This is the same principle behind <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">building a business-driven portfolio</Link> - when you lead with thinking and impact rather than screens, the signal is stronger.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <em>Best for: Highly restricted industries - defence, fintech, healthcare, government. Strongest signal for senior and leadership roles. No sign-off required.</em>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>2. Sanitised case study - modified visuals with a visible disclaimer</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your NDA covers identifying information but not the existence of the work, you can often modify the visuals to remove what is protected while keeping what is relevant. Replace the company logo and branding with a fictional brand. Change UI text that reveals identity. Replace specific data with relative placeholders.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The disclaimer is non-negotiable and it goes at the top: &quot;Branding, naming, and specific data in this project have been modified to protect client confidentiality. The design process, decisions, and structural outcome shown accurately represent the work.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Do not modify the work quietly and hope no one notices. Transparent modification is professional. Silent modification is dishonesty.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <em>Best for: Work where visual output matters for the role you&apos;re applying to, and where the confidential element is primarily identity-based.</em>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>3. Password protection - selective access without public exposure</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some companies are not comfortable with work being publicly accessible but have no issue with it being shared selectively. In your portfolio entry: &apos;This project is under NDA. I&apos;m happy to share the full case study with potential employers - please request access.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One thing to be clear on: sharing a password does not transfer legal responsibility. The work you protect with it should still be appropriately sanitised.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <em>Best for: Agency designers and freelancers whose clients want controlled access. Also works for enterprise designers whose companies are comfortable with selective sharing.</em>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>4. Written permission - the option most designers never attempt</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The most reliable approach, and the one most designers never try, is to ask for written confirmation of what you can show. Most companies, when approached properly with a clear explanation of exactly what you want to include and exactly what you will exclude, will say yes. The key is specificity.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &apos;Can I put this project in my portfolio&apos; is easy to reject. &apos;I&apos;d like to include the process documentation - journey maps, the research protocol, and the decision framework - with no product visuals, no metrics, and no client identification. Can you confirm in writing that this is acceptable?&apos; is much harder to say no to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Written confirmation eliminates legal risk entirely. Krishna got his manager to confirm in writing. Every interview conversation about that project was then clean. And when you get to that interview, knowing how to talk about NDA work with precision is a skill in itself - we cover that in detail in the <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Round 2 interview piece</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <em>Best for: Any situation where you want to include significant detail or visuals. If you can get it, this is always the right move.</em>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>5. Rebuild with a fictional brand</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If the NDA is ironclad and you cannot get permission, but the problem-solving capability you demonstrated is something you need to show, you can rebuild the project using a fictional brand and scenario that mirrors the actual constraints you navigated.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not fabrication. You are applying genuine thinking - a process you actually ran, constraints you actually navigated - to a fictional context in order to demonstrate real capability. But the disclaimer must be prominent and unambiguous: &quot;This is a redesign exercise using a fictional brand to demonstrate capability developed on a confidential project.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Done honestly, this produces legitimate portfolio work. Done quietly, it is a career-ending misrepresentation. The fictional brand must be clearly fictional. The disclaimer must be at the top, not at the bottom in small text.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <em>Best for: Situations where you need to demonstrate a specific capability and cannot show the original in any form.</em>
      </p>

      <h2 id="process-proves-something" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        If I Only Show Process, How Does Anyone Know I Solved Anything?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the sharpest objection to the process-only approach, and it deserves a real answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is what we see in portfolio reviews week after week: portfolios that show beautiful final screens, impressive metrics, and case studies built around outcomes - and say almost nothing about what the designer actually contributed to any of it. A 40% improvement in task completion is a compelling number. But if I cannot tell from your case study whether you drove that outcome or whether it happened despite your involvement, the number is noise.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The process-only case study does not prove you shipped the solution. It proves something more durable: that you can frame a problem correctly, navigate constraints intelligently, make and defend design decisions, and understand why what you shipped was the right response to the actual problem. Those capabilities transfer. A specific metric does not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        That said, a process-only case study still needs to show directional outcome:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Weak:</strong> &apos;The project was completed and launched successfully.&apos;</li>
        <li><strong>Strong:</strong> &apos;The final direction reduced the number of steps in the critical path by consolidating three decision points into one, addressing the core drop-off pattern we identified in research. The constraint was making this work within existing compliance guardrails.&apos;</li>
      </ul>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        A case study that shows your thinking clearly is more valuable to a senior hiring manager than a case study that shows a beautiful final screen and a metric with no explanation of how you got there. We see beautiful screens all day. Thinking is harder to fake.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your portfolio isn&apos;t generating calls despite having strong work, the issue may go beyond NDA constraints. We break down the full picture in <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">why you&apos;re not getting UX interview calls</Link>. And if you want to rebuild your portfolio around business impact rather than just screens, the <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">business-driven portfolio guide</Link> covers that end to end.
      </p>

      <h2 id="case-study-length" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How Long Should a Case Study Actually Be?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Designers who can&apos;t show visuals often compensate by writing more. A lot more. That is almost always the wrong move.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is what actually happens when a hiring manager opens a portfolio. The first three to five seconds are visual. If nothing stops them, they are already moving to the next candidate. If something does stop them, they read one paragraph. If that paragraph does not give them a clear problem, a clear role, and a signal that something interesting happened, they skim.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The problem and context should be one to two paragraphs</li>
        <li>The process section should be documented in artefacts and decisions - not prose summaries of each research method</li>
        <li>The outcome section should be two to three sentences</li>
        <li>Total reading time for a case study should be under six minutes</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For NDA work specifically: the absence of screens is not an invitation to fill the space with prose. A process-only case study should be tighter than a case study with full visual access, not longer. The artefacts do the work. The writing frames them. And in the current landscape, where <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI is reshaping what design hiring looks for</Link>, demonstrating thinking depth matters more than ever.
      </p>

      <h2 id="interview-nda" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What to Say in the Interview About NDA Projects
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The portfolio gets you to the conversation. The conversation is where the NDA comes up again, and where most designers either give away too much or shut down in a way that makes them look like they have nothing to say.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The wrong move is treating the NDA as an impenetrable wall. &apos;I can&apos;t talk about that&apos; with no follow-up tells a hiring manager one of two things: you have nothing interesting to say, or you don&apos;t know how to navigate professional constraints.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The right move is precision:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;I can walk you through the full process on this - problem framing, research approach, the key decision points. What I&apos;ll stay high-level on is the specific metrics and the technology architecture, which are covered by the agreement.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        &quot;The company would prefer I don&apos;t identify them, so I&apos;ll refer to the context rather than the name - but the design challenge and what I did with it are fully discussable.&quot;
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;My manager confirmed in writing what I can share, so I&apos;m comfortable walking through the full case study as it appears in my portfolio.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What you are demonstrating in these responses is not just design knowledge. You are demonstrating professional integrity, clarity under constraint, and the ability to handle sensitive information - which is precisely what a senior hire at any serious company needs to be trusted with.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you&apos;re getting to interviews but stalling after that, the issue may be in how you&apos;re showing up in conversation more broadly. We cover that in detail in the piece on <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">moving from delivery person to strategic contributor</Link>.
      </p>

      <h2 id="one-question" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        One Question Before Your Next Application Goes Out
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Is there work sitting somewhere - work you are proud of, work that reflects your actual level - that has never made it into your portfolio because of an NDA?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If yes, it is not gone. It is waiting for a clearer frame. The question is not &apos;can I show this?&apos; The question is &apos;what layer of this can I show?&apos; And almost always, the answer is: more than you think.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Three things to do this week:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Pull out the actual NDA for your most protected project and read the specific definition of &apos;confidential information.&apos; It is more precise than you remember.</li>
        <li>Write two lists: what is genuinely protected, and what you have been avoiding out of general caution. The second list is usually longer.</li>
        <li>Draft the opening paragraph of a process-only case study for that project - just the problem and the constraints. No visuals, no metrics. See what is actually there.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers who do this find they have significantly more to work with than they thought.
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link></li>
        <li><Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls (It&apos;s Not Your Portfolio)</Link></li>
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">You&apos;re a Senior Designer in Title. You&apos;re Still Being Treated Like a Delivery Person.</Link></li>
        <li><Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Isn&apos;t Taking Your Job. But This Type of Designer Will.</Link></li>
      </ul>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have NDA work sitting unused - or a portfolio that is not converting into interview calls - both are fixable problems with a specific approach. The <Link href="/programs" className="text-accent hover:underline font-medium">Current programme</Link> works through portfolio strategy as part of building designers from execution-layer contribution to strategic influence.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a free 45-minute strategy call</a> - walk away with clarity on where to focus first.
      </p>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Co-founder &amp; Head of Design, Xperience Wave
      </p>
    </>
  ),
  'ghosted-after-round-2-ux-interview': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You got the call. You cleared the first round. Maybe you even completed an assignment. You sent a follow-up. You waited.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nothing. Not a rejection with feedback. Not a call with results. Just automated silence, or a template email that tells you nothing about what actually happened. You are left wondering - was it the portfolio? The assignment? Something you said? Something you didn&apos;t say?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is not an unusual story. We hear versions of it almost every week. Designers who are getting calls, clearing Round 1, sometimes submitting assignments that took them days to complete, and then disappearing into a void. I want to tell you what&apos;s actually happening in that silence. Not the polite version. The real one.
      </p>

      <h2 id="what-round-1-is" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        First, Understand What Round 1 Actually Is
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Round 1 is not an interview. Not in any meaningful sense. It is a vocabulary filter.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A recruiter or hiring manager gets on a call with you for 20 to 45 minutes. They are checking three things: does this person use words that match the job description, do they fall within the budget range, and do they seem human enough to put in front of someone more senior. That is the entire scope of Round 1 for most organisations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Almost anyone who has been working in design for two or more years can pass one. You know the language. You have done the projects. You can answer &apos;walk me through your process&apos; well enough to get to the next stage.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Round 1 is designed to filter out the obviously wrong candidates. Round 2 is designed to find the right one. These are fundamentally different problems.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Round 2 is where someone starts asking questions that cannot be answered with vocabulary alone. Why did you make this decision? What did you consider and reject? How did you handle the constraint? What would you do differently? What happened when the PM pushed back? That is a different conversation entirely. And most designers are not prepared for it - because they prepared for Round 1 again.
      </p>

      <h2 id="funnel-nobody-told" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Funnel Nobody Told You About
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The interview process is a funnel. This is not a metaphor. It is a literal conversion problem, and most designers are treating it like a presentation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your resume gets someone to look at your portfolio. Your portfolio gets someone to call you. Your Round 1 performance gets you to Round 2. Each stage has a different audience, different evaluation criteria, and a different version of the question it is trying to answer. What works at one stage will not necessarily work at the next.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is where it breaks down. Designers spend enormous amounts of time on the top of the funnel. Resumes are polished. Portfolios are carefully crafted. And then the call comes, and they treat it exactly like the portfolio - as a monologue, a showcase, a performance of competence.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The portfolio is a vehicle. It opens the door. What you say when that door opens is a completely different skill, and most designers have spent almost no time developing it. If the top of your funnel isn&apos;t working at all, we cover that separately in <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">why you&apos;re not getting UX interview calls</Link>.
      </p>

      <h2 id="you-are-a-salesperson" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Nobody Told You That You Are a Salesperson
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is going to sound uncomfortable. I am saying it anyway.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When you are in an interview, you are selling your services. You are the product. The hiring organisation is the buyer. And whether you know it or not, every signal you send in that conversation is either moving the sale forward or killing it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is what that looks like in practice. A recruiter calls. Before the recruiter has had a chance to explain the role, the designer is telling them their salary number. Not exploring the opportunity. Not asking questions. Declaring a position. &apos;I am not open to negotiating. I want X in hand, fixed, and anything above that is fine.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I understand where this comes from. Designers have been undervalued. They have been overworked and underpaid. That frustration is legitimate. But what is being communicated in that opening exchange is not confidence. It is resistance. And a buyer who encounters resistance before they have even made a case for why they want to buy will walk away.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Chris Voss - former FBI hostage negotiator and author of Never Split the Difference - is direct about salary conversations: never state your number first. Whoever anchors first loses leverage. Treat every compensation conversation as a discovery exercise: understand what the role is actually worth to the organisation before you price yourself against it.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The cocky opener is one failure mode. The opposite is also common - the designer who is so eager to please that they answer every question with what they think the interviewer wants to hear, contradict themselves twice in the same call, and leave no impression of any distinctive point of view. Neither version sells well.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Selling your services well means knowing your value, being able to articulate it clearly and specifically, asking good questions to understand what the organisation actually needs, and timing your positioning so it lands when it can actually be received.
      </p>

      <h2 id="mouth-broke-everything" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Portfolio Went In Fine. The Mouth Broke Everything.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Building a portfolio has never been easier. Templates are accessible, references are abundant, AI can help with everything from copy to case study structure. A designer with two years of experience can produce a portfolio that looks like five years of work if they know what they are doing with the tools available.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What it means is that the portfolio is no longer a reliable signal of depth. It has become a signal of effort and presentation skill. The interview - the actual live conversation - is now where depth gets tested. And that is exactly where the performance breaks down.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nielsen Norman Group&apos;s research on UX hiring makes this gap explicit. Newer designers tend to define craft as visual impressiveness - the extra detail, the polished finish, the Figma precision. Experienced hiring managers define craft as the invisible things: the decisions that were made, the constraints that were navigated, the thinking that informed the outcome. Two completely different definitions of quality.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A hiring manager asks: &apos;Why did you choose this approach over the alternatives?&apos; The designer who built the portfolio as a skin - who made the screens beautiful without deeply understanding the decisions behind them - has nowhere to go with that question. When pressed, the answer becomes vague. Then longer. Then defensive.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not about designers being dishonest. Most of them are genuinely proud of their work. The problem is that building something and being able to explain the intellectual process behind it are two different skills. Many designers have only trained one of them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your portfolio itself needs rebuilding around business impact rather than just screens, start with the <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">business-driven portfolio guide</Link>. If your best work is locked behind an NDA, we cover five specific strategies for that in the <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">NDA portfolio piece</Link>.
      </p>

      <h2 id="deflection-patterns" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Deflection Patterns That End Careers in Interviews
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When a designer cannot answer a question about their own work, something interesting happens. They do not say &apos;I do not know.&apos; They explain why the work was not their fault.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>&apos;My PM did not allow it.&apos;</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most frequent. A hiring manager asks why the designer did not do usability testing, or why there is no evidence of research. There is a version of this answer that shows maturity: &apos;The PM had a different priority, so I had to find ways to bring in user insight without a formal research budget - here is what I did instead.&apos; And there is a version that is a display of helplessness: &apos;That was not my call to make.&apos; The difference is everything.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>&apos;We did not have the budget.&apos;</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Budget constraints are real. But &apos;we did not have the budget&apos; as an explanation for why nothing meaningful happened is not a constraint - it is an exit. What did you do when the budget was not there? What did you propose? What low-cost approach did you find?
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>&apos;Ours is a service organisation.&apos;</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This one is shorthand for: we do not have the luxury of doing things properly. That may be true. It is also true of most design environments to varying degrees. The question is what you did within that reality - how you pushed back, how you carved out space, how you influenced direction even when the structure did not invite it.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Every excuse is a display of who is behind the facade. When a designer describes their constraints instead of their responses to constraints, they are telling you exactly what level they are operating at - and it is not senior.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This gap between having the title and having the influence is exactly what we explore in the <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">piece on moving from delivery person to strategic contributor</Link>.
      </p>

      <h2 id="whiteboard-reveals" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Whiteboard Actually Reveals
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Collaborative exercises - whiteboarding sessions, live design challenges, real-time problem-solving with a team - are the most revealing thing in the entire funnel. Not because they test whether you can design under pressure. Because they test who you actually are when the script runs out.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Two things happen in a whiteboard session that do not happen anywhere else:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>You find out if the designer can collaborate or if they can only perform.</strong> Some designers turn it into a solo presentation. They take over the conversation. They generate ideas rapidly and fill the space. They do not ask questions of the other people in the room. Design at a senior level is almost entirely collaborative. The designer who cannot share a problem - who cannot hold space for another perspective - is not a senior designer. They are a solo operator.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>You find out how the designer handles not knowing something.</strong> In a whiteboard session, gaps in knowledge surface immediately. Do they acknowledge the gap and propose a way forward? Or do they paper over it with confident-sounding language that turns out to be empty? A whiteboard session is the only point in the interview process where you cannot prepare a portfolio entry for it. What comes out is what is actually there. This is also where the gap between <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">surface-level AI tool usage and genuine depth</Link> becomes impossible to hide.
      </p>

      <h2 id="round-2-measuring" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Round 2 Is Actually Measuring
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Let me be direct about what Round 2 interviewers are actually trying to understand. It is almost always some version of these four questions:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Can this person think, or can they only execute?</li>
        <li>Can this person operate in a real environment - with constraints, ambiguity, and people who disagree with them?</li>
        <li>Is the depth behind the portfolio real, or was the portfolio the entire performance?</li>
        <li>Is this a person we will want to work with closely, or is working with them going to be expensive?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Notice that none of these are about whether the work looks good. The work looking good was established in Round 1. Round 2 is about everything underneath the work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer who understands this prepares for Round 2 completely differently. Instead of reviewing the portfolio and practising the walkthrough again, they ask harder questions of themselves. Why did I make each major decision? What did I consider and reject, and why? What would I do differently? How did I work with the people in the room? What happened when the project went wrong?
      </p>

      <h2 id="what-to-do-differently" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What to Do Differently - Specifically
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Before the call: research the organisation as a buyer, not as a job seeker.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is a difference between researching a company to answer &apos;what do you know about us&apos; and researching a company to understand what they actually need from a designer. What problems are they solving? What is the design maturity of the organisation? What constraints are they likely operating under? When you walk into a conversation having done that kind of research, your questions are better, your answers are more relevant, and you demonstrate something no amount of portfolio polish can demonstrate: that you thought about them, not just about yourself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>In the conversation: stop presenting and start selling.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Ask questions early. Find out what the interviewer is actually looking for. Then position your experience against that specific problem. If a recruiter asks about salary before you have had a chance to understand the full scope of the role, it is completely acceptable to say: &apos;I want to make sure we are looking at the same thing before we talk numbers - can you help me understand what this role is responsible for and what success looks like in the first six months?&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>On your portfolio: know the decisions, not just the deliverables.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For every case study, you should be able to answer three questions with specificity and without hesitation: What was the core design problem? Why did I choose this approach over the realistic alternatives? What happened when it was challenged - by data, by stakeholders, by the reality of implementation? If your strongest work is under NDA, that does not excuse you from this - the <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">NDA portfolio strategies</Link> we cover show exactly how to present this depth without violating anything.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>On constraints: make them the context, not the excuse.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When constraints come up - and they will - your answer should follow a consistent structure: here is the constraint, here is what it meant for the project, here is how I worked within it or around it, here is what I learned from doing so. Four beats. Every time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>On collaboration: show up to exercises as a participant, not a performer.</strong>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In any collaborative session, your job is not to be the most impressive person in the room. Your job is to be the most useful person in the room. Ask questions. Build on what others say. Identify what the group does not yet know before you start proposing solutions. The hiring managers watching are not scoring how many ideas you generated. They are watching how you treat other people&apos;s thinking.
      </p>

      <h2 id="silence-is-information" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Silence Is Not Rejection. It Is Information.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When the ghost comes - and it may - the most useful thing you can do is resist the urge to take it personally and instead read it as data.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You cleared Round 1, which means something about your surface presentation worked. Something about your vocabulary, your portfolio, your initial impression was enough to move forward. That is not nothing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What the silence is telling you is that somewhere between Round 1 and the end of Round 2, the picture the organisation formed of you became inconsistent. The work said one thing. The conversation said something else. And when they had to choose, they chose the person whose work and words were aligned.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>That is fixable. Entirely and specifically fixable.</strong> But it requires understanding that the interview is a funnel - not a presentation - and that your job at every stage is to convert the person in front of you, not to perform for the idea of a hiring manager in your head.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You are not being ghosted because your work is not good enough. You are being ghosted because your ability to sell that work has not kept pace with your ability to do it.
      </p>

      <h2 id="brief-diagnostic" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Before Your Next Application - A Brief Diagnostic
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Read these questions honestly. Not the version of them you would answer in an interview. The actual honest version.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Can I explain the three most important design decisions in my lead case study - the decision, the alternatives I rejected, and why - in under two minutes?</li>
        <li>In my last interview, did I ask at least as many questions as I answered?</li>
        <li>When was the last time I was asked a question in an interview that I could not answer - and what did I do with it?</li>
        <li>When I talk about projects where things went wrong, do I talk about what I did, or do I talk about what was done to me?</li>
        <li>In a collaborative session, have I ever been the person who dominated the conversation without noticing it?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If any of these landed, that is where the work is. And if you are starting to see that the issue might be deeper than interview technique - that it is about how you are positioned in the market entirely - the <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">PIE model for design influence</Link> is the framework we use to address it.
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers we work with in the <Link href="/programs" className="text-accent hover:underline font-medium">Current programme</Link> - 2 to 6 years of experience, getting calls but not converting - work through exactly this. Not just portfolio strategy. The full interview funnel: how to present, how to position, how to answer the hard questions, and how to read what is actually happening at each stage.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are further along - senior and moving into leadership - the Tide programme is where that work happens.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a free 45-minute strategy call</a> - walk away with a clear read on where you are in the process and what specifically needs to change.
      </p>

      <hr className="my-10 border-g200" />

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls (It&apos;s Not Your Portfolio)</Link></li>
        <li><Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">You&apos;re a Senior Designer in Title. You&apos;re Still Being Treated Like a Delivery Person.</Link></li>
        <li><Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Isn&apos;t Taking Your Job. But This Type of Designer Will.</Link></li>
        <li><Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">Your NDA Isn&apos;t the Problem. Your Portfolio Strategy Is.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas Tasneem, Co-founder, Xperience Wave
      </p>
    </>
  ),
  '12l-vs-30l-ux-designer-difference': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Before you read any further, I know what some of you are already thinking.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &quot;Money isn&apos;t everything. I care about the work. I care about growth. I&apos;m not in this for the pay.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Fine. Keep thinking that.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But let me tell you what I&apos;ve watched happen to the designers who actually believe it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They do good work. Genuinely good work. They care about the craft, the user, the outcome. They show up, deliver, and don&apos;t complain. And then, every year, they sit across from their manager and accept 8 to 10%. Which, after inflation and rising cost of living in Bangalore, means they&apos;re standing still. And they tell themselves it&apos;s okay because they&apos;re not in it for the money.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Five years later, someone they trained, someone with less experience, is earning double. And suddenly they&apos;re very much in it for the money. They just don&apos;t know how they got left behind.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The salary conversation isn&apos;t about greed. It&apos;s about whether the organisation believes you are replaceable. A &#x20B9;12L salary doesn&apos;t mean you&apos;re doing bad work. It means the organisation thinks they can find someone else to do your work without it being expensive. That&apos;s the only thing it means.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        So when I say &quot;the difference between a &#x20B9;12L and &#x20B9;30L designer isn&apos;t skills&quot;, I&apos;m not giving you permission to stop caring about your craft. I&apos;m telling you that craft alone has never been how this conversation gets won. Not once. Not for anyone I&apos;ve ever placed.
      </p>

      <h2 id="visibility-trap" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Visibility Trap
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is the thing I want you to sit with.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;30L designer is not 2.5 times better than the &#x20B9;12L designer. In most cases, the gap in raw ability, the quality of their thinking, their research rigour, their visual craft, is nowhere near that large.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What the &#x20B9;30L designer has is legibility.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The organisation can read their value. It&apos;s visible. It shows up in meetings, in outcomes, in the way other teams talk about them. When someone with budget authority asks &quot;what would we lose if we lost this person?&quot; they have a specific, expensive answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;12L designer is often doing comparable work. But their value is invisible. It lives in the files they delivered, the screens they shipped, the tickets they closed. When someone asks what would be lost, the answer is: we&apos;d have to hire someone else to do those screens.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The &#x20B9;30L designer isn&apos;t paid more because they do better work. They&apos;re paid more because their work is legible as valuable to people who don&apos;t speak design.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is the trap. And most designers don&apos;t know they&apos;re in it. They keep improving the work, taking courses, refining the craft, building the portfolio, and they can&apos;t understand why nothing changes. They&apos;re solving the wrong problem. The work is fine. What&apos;s broken is everything around how the work is perceived.
      </p>

      <h2 id="market-pay" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Market Actually Pays, and What the Range Tells You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to use real numbers here, because the salary conversation in design happens entirely in whispers. Nobody talks about what they make. Nobody knows if they&apos;re behind. So let me be direct.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        These are approximate ranges for Bangalore&apos;s product design market, cross-referenced across Glassdoor India, AmbitionBox, Codezion&apos;s 2025 industry report, and what we see in actual offers our mentees receive and negotiate.
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li><strong>Associate Designer (0-2 YOE):</strong> &#x20B9;5-8L average. Top-tier product companies can start at &#x20B9;15L+.</li>
        <li><strong>Senior Designer (3-5 YOE):</strong> &#x20B9;11-17L average. Glassdoor Bangalore average: &#x20B9;11.5L; Senior average: &#x20B9;17.2L.</li>
        <li><strong>Design Lead (6-8 YOE):</strong> &#x20B9;17-28L average. The widest range at any level.</li>
        <li><strong>Head of Design / People Manager (9+ YOE):</strong> &#x20B9;25-45L+. Documented cases at top fintechs: &#x20B9;36L+ total comp.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 text-g500 italic">
        Source note: Platform averages compress the range. The real spread at each level is significantly wider, determined by company type, funding stage, and the factors this blog is about. A product designer at a Series B Bangalore startup with 3 YOE and a strong research portfolio accepted &#x20B9;12L. The same profile at a funded fintech: &#x20B9;18-22L. The difference isn&apos;t credentials.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Look at those ranges. At Senior level alone, the gap between the low and high end is &#x20B9;6L. At Lead level, it&apos;s over &#x20B9;10L. That is not noise. That is not company size or industry. That is the gap between a designer whose value is legible and one whose value is invisible.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Two designers. Same YOE. Same domain. Same city. One at &#x20B9;12L, one at &#x20B9;22L. The difference is almost never their ability. It&apos;s almost always their legibility.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here&apos;s the thing nobody tells you: there&apos;s a third variable beyond skills and legibility. Designation. Your title determines which salary band you&apos;re eligible for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every organisation structures salaries around bands, a defined minimum and maximum for each job level. A Senior Designer at a company that defines &quot;Senior&quot; as 3 YOE with a &#x20B9;14L ceiling is not competing in the same band as a Senior Designer at a company that defines &quot;Senior&quot; as strategic contribution and bands up to &#x20B9;25L. The same title. Completely different ceiling.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is how salary structures work across all professional organisations: each job grade has a band, and moving into a higher band requires moving into a higher grade. Annual increments of 8-10% (the Indian market average in 2025-26, per IBEF data) keep you inside your current band. Designation change is what moves you to the next one.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Chasing salary without managing designation is running on a treadmill. The increment comes. You stay inside the same band. Nothing structurally changes. Designation is the lever. Most designers don&apos;t know it exists.
      </blockquote>

      <h2 id="legibility-factors" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Makes a Designer Legible as Valuable
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        I&apos;m going to go through six things. Not as a checklist of virtues. As a diagnosis. For each one, I want you to be honest about which version you recognise in yourself.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Whether you shape the problem or just solve it
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers wait for the brief. The PM writes the problem statement, the business owner defines the scope, the engineering lead sets the constraints. The designer picks it up from there.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I understand why this happens. It&apos;s the path of least resistance. Nobody gets into trouble for delivering what was asked.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But it also means you are invisible to every conversation that happened before the brief landed on your desk. Which is exactly where the decisions that matter actually get made.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;30L designer is in that earlier conversation. Not because they forced their way in, because they made themselves useful in it. They asked the question nobody else asked. They reframed the problem in a way that saved two weeks of work. They pointed out the assumption that would have killed the feature in month three.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        You cannot be seen as strategically valuable if you only show up after the strategy is set. This is not about being pushy. It is about making the brief better before you respond to it. Every time.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Whether you can see the second-order effects
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Changing a button colour is not a simple task. I say this to designers all the time and I watch them smile politely like I&apos;m being dramatic.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;m not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A button colour change touches the semantic meaning of that colour across the product. It touches every state: hover, disabled, loading, error. It touches brand consistency. It touches accessibility. It touches user expectation that was built over months of interaction. It touches the design system and every component that inherits from it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        A designer who treats a button colour change as a button colour change is working at the resolution of someone executing instructions. That person gets paid to execute instructions. A designer who sees it as a system decision, who maps the second-order effects before touching the file, is working at the resolution of someone who understands the product. That person gets paid differently. Because their value is legible in a way the first person&apos;s isn&apos;t.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Whether your work speaks to the room, or only to other designers
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the one that makes designers uncomfortable, so I&apos;ll say it plainly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The people who decide what you get paid are almost never designers. They are product managers optimising for velocity. Engineering leads managing debt. Finance partners watching headcount cost. Business heads looking at margin.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        None of them care about your design thinking in the language you use to describe it. They care about what your design thinking does to the numbers they&apos;re responsible for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;12L designer presents work to stakeholders and gets overridden. Then blames the culture. The org doesn&apos;t value design, the PM has too much power, nobody listens.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some of that is true. But the &#x20B9;30L designer operates in the same culture and doesn&apos;t get overridden nearly as often. Not because they&apos;re louder. Because they&apos;ve learned to translate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &quot;This onboarding redesign reduced drop-off at step 3 from 67% to 41%.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is not a design argument. That is a retention argument in design&apos;s clothing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Learn the difference. It will change every room you walk into.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        We built a whole framework around this. It&apos;s in: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Whether you have an edge or just have experience
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Something happens to a lot of designers around year four or five. They get good. They get recognised for being good. And then, quietly, they start optimising for not being wrong.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The willingness to propose something unexpected, to push on the brief in a way that makes the room uncomfortable, gets smoothed off. Being interesting is risky. Being reliable is safe. So they become reliable. And they plateau.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;30L designer still has an edge. Not because they&apos;re contrarian. Because they&apos;re more interested in solving the problem well than in being accepted for solving it predictably.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        I&apos;m not saying blow up your credibility with every brief. I&apos;m saying: when was the last time you said something in a meeting that genuinely surprised the room? When was the last time you proposed a direction nobody had considered? If you can&apos;t remember, that&apos;s the answer.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. Whether your process has evolved or just accumulated
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;ve met designers with eight years of experience who have been running the same process for six of them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Stakeholder interview. Affinity map. User journey. Wireframe. Test with five users. Iterate. Repeat.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Regardless of whether the problem needs a two-week research sprint or a two-day design sprint. Regardless of whether the user base is large and quantitative or small and qualitative. Regardless of the actual context. The process runs because it has always run.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That&apos;s not methodology. That&apos;s a comfort blanket described in UX vocabulary. The &#x20B9;30L designer reads the context first. They choose the right approach for this problem, not the familiar one. They question their own process, including the parts of it that have worked, because the context is always changing and the process should change with it.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        6. Whether you own outcomes or just deliver outputs
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the one that determines compensation more than anything else on this list.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Ownership is not a title. It is a track record. It is evidence, built over time, that when you are responsible for something, it moves. And when it doesn&apos;t move, you say so clearly and propose what needs to change.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;12L designer delivers the output and moves to the next ticket. The &#x20B9;30L designer stays attached to the outcome. They track what happened after the thing shipped. They know if it worked. They have an opinion about why it did or didn&apos;t. They bring that back into the next conversation.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        The organisations that pay &#x20B9;30L aren&apos;t paying for better screens. They&apos;re paying for someone whose departure would be genuinely expensive. You become that person by owning outcomes, not by delivering outputs.
      </blockquote>

      <h2 id="negotiation" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        And Then There&apos;s the Negotiation, Which Most Designers Lose Before It Starts
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Everything above creates the conditions for a higher salary. None of it guarantees one if you walk into the conversation wrong.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The wrong way: &quot;I&apos;ve been here for two years. The market average for my level is X. I feel I deserve more.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s a fairness argument. And fairness arguments are the weakest negotiating position you can take. Because the person across from you can always say: we pay what we pay, here&apos;s 8%, take it or take a job offer elsewhere.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They&apos;re not wrong. They&apos;re just not motivated. You gave them no reason to be.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The right way: &quot;Here&apos;s what I&apos;ve owned this year. Here&apos;s what changed as a result. Here&apos;s what I&apos;m being trusted with next, and here&apos;s what that kind of contribution is worth in the market.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s a value argument. It is much harder to dismiss. Because you&apos;re not asking for fairness, you&apos;re presenting a business case. And you&apos;re the one who built the evidence for it over the last twelve months.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;30L designer has been building that case long before the conversation happens. They&apos;ve been making their outcomes visible, not just to their manager, but to the people in the room whose opinion shapes what the manager can actually offer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This exact dynamic plays out in interviews too, not just appraisals. If you&apos;re getting to the final round and disappearing: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link>.
      </p>

      <h2 id="what-to-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What I Want You to Do With This
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I&apos;m not asking you to care more about money. I&apos;m asking you to stop pretending you don&apos;t care about it while quietly wondering why your salary hasn&apos;t moved.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The &#x20B9;30L designer isn&apos;t more passionate about UX. They&apos;re not working harder. They haven&apos;t cracked some hidden cheat code that only comes with connections or luck.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They made their value legible. To the right people. In the right language. Before anyone asked them to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That&apos;s it. That&apos;s the whole thing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Now: which of the six things I listed is the specific gap for you? Not in general, for you, this week, in the role you&apos;re in right now. Because if you can name it specifically, you can close it specifically. And if you&apos;re not sure, that&apos;s a conversation worth having with someone who can look at your full picture.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Not sure where your specific gap is?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a free 45-minute strategy call</a> with Xperience Wave. We&apos;ll look at your positioning, your compensation situation, and what specifically is keeping you in the wrong band. We work 1:1, no group sessions, no generic advice.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you&apos;re not getting calls despite the experience: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls</Link></li>
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If AI is the conversation you&apos;ve been avoiding: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Isn&apos;t Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>If you&apos;re clearing Round 1 and disappearing after: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2</Link></li>
        <li>Explore the programme: <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">Xperience Wave Current</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Sources &amp; References</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><a href="https://www.glassdoor.co.in/Salaries/bangalore-ux-designer-salary-SRCH_IL.0,9_IM1091_KO10,21.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Glassdoor India, UX Designer Salary, Bangalore (March 2026)</a></li>
        <li><a href="https://codezion.com/blog/ui-ux-designer-salary" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Codezion, UI/UX Designer Salary India 2025</a></li>
        <li><a href="https://academy.keka.com/blog/salary-structure" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">IBEF / Keka Salary Structure Report 2026</a></li>
        <li><a href="https://ca.indeed.com/hire/c/info/guide-to-job-grades-and-salary-bands" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Indeed, Guide to Job Grades and Salary Bands</a></li>
        <li><a href="https://www.qandle.com/glossary-salary-bands-vs-grades" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Qandle, Salary Bands vs Job Grades</a></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas Tasneem, Co-founder, Xperience Wave
      </p>
    </>
  ),
  'conversations-senior-designers-have': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        I have sat in a lot of sprint meetings with a lot of design teams over the years.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And I have noticed a specific thing that happens in some of them. The designers are happy. Genuinely happy. They are laughing, engaged, moving quickly through the agenda. The energy is good. The velocity is high.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I dig a little deeper into what is actually happening in those teams, I almost always find the same thing: these designers have stopped being designers. They have become the garnish.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The garnish is on every plate. It makes things look complete. It arrives after every decision has been made, about what goes on the plate, how it is prepared, what it costs. Nobody consults the garnish. It just shows up at the end and makes it presentable. These designers receive decisions, make those decisions look good, and ship them. The brief arrives. They execute. Everyone is pleased. Life is easy.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here is the part that stays with me: when I tell them this, they are surprised. They were not being lazy. They were not cutting corners on purpose. They genuinely believed they were doing good work. Nobody told them they were not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This blog is me telling you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The gap between a mid-level designer and a senior designer is not years of experience. It is not the size of your portfolio or how deep your tool knowledge runs. It is five specific conversations, questions that senior designers ask themselves before they walk into any room, before they open Figma, before they accept any brief.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Mid-level designers do not have these conversations. Not because they are not smart enough. Because nobody showed them the questions exist.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Junior designers ask: what do I need to design?<br />
        Mid-level designers ask: how should I approach this problem?<br />
        Senior designers ask: should this problem exist at all?
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://uxbeginner.com/design-levels-junior-vs-mid-level-vs-senior-ux-designer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UX Beginner, understanding design levels</a>)</span>
      </blockquote>

      <h2 id="conversation-1" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Conversation 1: &quot;Is This Worth Solving, or Am I Just Making Someone Comfortable?&quot;
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the conversation that happens before every brief is accepted. Before the first sticky note. Before the first wireframe.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A mid-level designer receives a brief and starts designing. A senior designer receives a brief and interrogates it first. Not out of insubordination, out of professional obligation. Because the most expensive thing a design team can do is build the right solution to the wrong problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The questions that make up this conversation:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Is this a real problem or a comfort request?</strong> Someone powerful felt uncomfortable about something. The discomfort got turned into a brief. Now it is on your desk. Before you touch it: is there a user who has this problem? Is there data that says this matters? Or are you about to spend three weeks making a VP feel better about a feature that real users do not care about?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Am I on a business priority project?</strong> Or am I working on something that occupies design time without moving anything that matters? Senior designers know which projects are connected to the metrics the organisation actually tracks, and they fight to be on those projects, not the ones that look busy but do not move numbers.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Am I satisfying my own ego by following a process?</strong> This one is uncomfortable. It is the mad scientist question. There are designers who run twelve weeks of research for a decision that needed to be made in two. Not because the research was required, because research feels like good design. It is not good design if it is not connected to a decision the business is actually going to make. Process is a tool, not a virtue.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The garnish never asks any of these questions. It receives the brief and makes it look good. The designer who is actually doing senior work asks all three, before they open a single file.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The business language gap is the specific thing that keeps senior designers stuck: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>.
      </p>

      <h2 id="conversation-2" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Conversation 2: &quot;Where Is the Money, and Who Owns It?&quot;
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a cynical question. It is an orientation question. And it is the question that separates designers who influence product direction from designers who receive it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every product decision is connected to a business bet. Someone has decided that this feature, this redesign, this research sprint is worth the organisation&apos;s resources. Who made that decision? What number were they trying to move? What does success look like, not in design terms, but in the terms your CFO or your VP of Growth would recognise?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Senior designers know the answers before the project starts. Not because they are business consultants, because you cannot make good design decisions without understanding the business context the design is operating inside.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Where is the money in this?</strong> Which metric does this project connect to? Retention? Activation? Revenue per user? Cost reduction? If you cannot answer this, you do not know what success looks like. Which means you do not know what you are designing for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Who owns that metric?</strong> This is the person whose opinion about your work actually matters beyond aesthetics. They are the one who, when they say &apos;this does not feel right,&apos; can stop the project. They are also the one who, when they say &apos;this is exactly what we needed,&apos; can open every door. Senior designers find this person early and build the relationship before they need it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Is this a priority, for whom?</strong> Something can be a priority for the design team and irrelevant to the business. Something can be a priority for the business and logistically impossible for technology. Something can be a priority for technology and a terrible experience for the customer. Senior designers understand the hierarchy of priorities across business, technology, organisational capability, and customer, and they know which one is actually driving this project right now.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <a href="https://blog.logrocket.com/ux-design/the-truth-about-design-titles" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">LogRocket&apos;s research</a> on senior vs mid-level designers confirms it directly: senior designers advocate for initiatives that can lead to significant business or user value. Mid-level designers are assigned tickets to work on, which are usually defined for them.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The difference is not talent. It is whether you know which question to ask first.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        On getting into the rooms where these business decisions are made: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link>.
      </p>

      <h2 id="conversation-3" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Conversation 3: &quot;How Much Proof Does This Decision Actually Need?&quot;
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the research maturity conversation. And it is the one that the mad scientist and the pure intuition believer both fail at, from opposite ends.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The mad scientist</strong> believes that more research is always better. More interviews, more usability tests, more data, more time. They use scientific rigour as a shield: if the research is not done properly, the findings are not valid, the decisions should not be made. This designer is often respected for their process and consistently behind on delivery. And here is the part nobody says directly: the research they run is frequently not connected to decisions the business was actually going to change. It is research for the sake of research.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The pure intuition believer</strong> goes the other way. They have done this before. They know what works. Their gut is good. They ship fast, they learn fast, they do not waste time on research that will just confirm what they already know. This designer moves quickly and has an impressive hit rate. They also occasionally catastrophically misread a context they thought was familiar.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The senior designer lives in the middle, but it is a specific, calibrated middle. The question they ask is not &apos;should I do research&apos; but &apos;what is the cost of being wrong on this decision, and does that cost justify the time required to be more certain?&apos;
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>High cost of being wrong + reversible decision</strong> = lightweight validation before you commit</li>
        <li><strong>High cost of being wrong + irreversible decision</strong> = proper research before you commit</li>
        <li><strong>Low cost of being wrong + reversible decision</strong> = build it, measure it, iterate</li>
        <li><strong>Low cost of being wrong + irreversible decision</strong> = rare, but worth a beat to think about</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Do I need this research, or can I fairly assume and evaluate accuracy later?</strong> This is not a lazy question. It is a resource allocation question. Not every design decision warrants six weeks of discovery. Some decisions warrant two hours of assumption mapping. Senior designers know the difference and can articulate why.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Who can help me get answers I do not have?</strong> Senior designers do not put everything on the PM&apos;s desk and wait for the brief to get better. They identify who in the organisation knows things they need to know, customer success, data analytics, engineering, business development, and they go get those answers themselves. Research is not just a methodology. It is a mindset about where information lives and who has it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>How will I validate after?</strong> Not every assumption gets validated before shipping. But senior designers make their assumptions explicit, they write them down, they articulate what would prove them right or wrong, and they watch for the signal after launch. This is what turns delivery into learning. And it is what builds the track record that makes senior designers trusted.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The specific difference between designers who own outcomes and those who just deliver outputs: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link>.
      </p>

      <h2 id="conversation-4" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Conversation 4: &quot;Who Actually Matters in This Room, and What Do They Need From Me?&quot;
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every design presentation, every stakeholder meeting, every sprint review is a political landscape. Not political in the pejorative sense, political in the accurate sense. There are people in those rooms with different mandates, different incentives, different fears, and different definitions of success.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Mid-level designers walk into these rooms with their work and hope the work speaks for itself. It does not. Work speaks to people who already believe in what you are trying to do. Everyone else hears a story they need to be persuaded by.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Senior designers map the room before they enter it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Who is the real decision-maker?</strong> Not the most senior person, the person whose opinion will actually determine what happens next. Sometimes these are the same. Often they are not. The VP who attends the review may have strong opinions, but the engineering lead who has to build the thing is the one who can stop it. Senior designers know the difference.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Who is the customer&apos;s genuine ally, and who thinks they are but is not?</strong> Every room has someone who will advocate for the user when it is comfortable and fold when it is costly. Senior designers know which person is which. They build alliances with genuine allies and do not waste time trying to convert the performative ones.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>How do I storyboard this so I do not sound like a designer?</strong> The question is not how to dumb things down. It is how to translate. The PM in the room cares about velocity. The engineering lead cares about feasibility and debt. The business head cares about margin and market position. The same design decision needs to be framed differently for each of them, not because you are being manipulative, but because the same outcome genuinely means different things to different people. Senior designers learn to speak all of these languages without losing their own.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>How do I make my manager successful?</strong> This is the question that most designers never think to ask. Your manager is accountable for outcomes above your individual contribution. When you walk into a meeting, you are not just representing your work, you are representing your manager&apos;s bet on you. Senior designers understand this relationship and actively make their manager look good. Not through flattery. Through the quality of their thinking and the clarity of their communication in rooms their manager cares about.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The garnish is comfortable because it removes this conversation entirely. You never have to map the room if your job is just to make things look good after the decisions are already made. The cost is that you never get invited to the room where the decisions happen.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        On what hiring managers are actually evaluating when they see how you present work: <Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Look for When Hiring Senior UX Designers</Link>.
      </p>

      <h2 id="conversation-5" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Conversation 5: &quot;Am I Still Attached to This After It Ships?&quot;
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the ownership conversation. And it is the one that, once you start having it, makes being the garnish genuinely impossible.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Mid-level designers measure success at delivery. The thing shipped. It went through review. Stakeholders approved it. Job done. Next ticket.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Senior designers stay attached to what happens after. Not because they are anxious or controlling, because they understand that delivery is not impact. Delivery is the beginning of impact. What matters is whether the thing that shipped actually moved the thing it was supposed to move.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Did users understand the new flow? Did activation improve? Did the thing we hypothesised would happen, happen? Did it happen for the reasons we thought, or for different reasons that tell us something we need to know going forward?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>If it did not work, do I know why?</strong> This is a harder question than it looks. Most designers do not follow up after launch because the information is uncomfortable. If the feature underperformed, there is a temptation to attribute it to implementation, or marketing, or timing, anything except the design. Senior designers follow up specifically because the discomfort is where the learning is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What do I carry into the next conversation?</strong> Every project produces something beyond the deliverable, a better understanding of where users struggle, which stakeholder frames are most effective, what the organisation&apos;s real constraints are versus the stated ones. Senior designers extract this systematically and bring it back. Their next project starts richer because of what happened on the last one.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        <a href="https://uxbeginner.com/design-levels-junior-vs-mid-level-vs-senior-ux-designer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UX Beginner&apos;s research on design levels</a> states it directly: senior designers can propose and advocate the need for research. They do not just execute it. They measure impact. They understand outcomes qualitatively and quantitatively.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is the difference between a portfolio of pretty screens and a track record of decisions. The companion piece on what each level of the ladder actually demands: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India. Here&apos;s the Path That Actually Works.</Link>
      </p>

      <h2 id="question-that-changes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Question That Changes Everything
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I started this blog with the designers in the sprint meetings. Happy. Moving fast. Being the garnish without knowing it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to be clear about something: I do not blame them. The system rewards the garnish. It is easier to manage, easier to measure, easier to approve. It produces fewer uncomfortable conversations. If nobody in the room is asking the hard questions, the hard questions do not get asked, and everyone goes home on time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But here is what is lost when design becomes decoration: the user. The actual human being whose experience was supposed to be the whole point. When designers stop interrogating briefs and start executing them without question, the user stops having a genuine advocate in the room. They just have someone who makes the decisions look good.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The five conversations I have described are not about being difficult. They are not about challenging for the sake of challenging. They are about doing the actual job, which is to make sure that what gets built is worth building, and that what gets shipped actually works for the people it was supposed to serve.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The designers who stay at mid-level are not less talented than the ones who move forward. They just have not started having these conversations yet. The moment you start asking them, you cannot go back to being the garnish. Not because it becomes harder, because it becomes impossible to unsee.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Start with one. The next time a brief lands on your desk, before you open Figma, before the first sketch, ask: is this worth solving? Or am I just making someone comfortable? That question alone will change how you show up.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Recognising Yourself in the Mid-Level Pattern?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we work 1:1 with designers who are ready to stop executing and start influencing. Book a free 45-minute strategy call. We will tell you honestly where the gaps are and what to work on first.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://uxbeginner.com/design-levels-junior-vs-mid-level-vs-senior-ux-designer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UX Beginner</a> — Understanding design levels: Junior vs Mid-level vs Senior UX Designer. The progression of questions by seniority: juniors ask &apos;what&apos;, mid-level asks &apos;how&apos;, seniors ask &apos;why&apos;. Senior designers seek holistic views, propose and advocate for research, and measure qualitative and quantitative outcomes.</li>
        <li><a href="https://blog.logrocket.com/ux-design/the-truth-about-design-titles" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">LogRocket (2025)</a> — Why some designers stay stuck at mid-level. Mid-level designers are assigned tickets defined for them. Senior designers advocate for initiatives that drive significant business or user value.</li>
        <li>Xperience Wave — direct observation. The garnish pattern, sprint meeting dynamics, and the five conversations are drawn from 13+ years of working with design teams across India and internationally, and from mentoring 140+ designers through career transitions.</li>
      </ul>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you have the senior title but still feel like a delivery person: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If the salary gap is what is bothering you: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>If you are ready to get into the rooms where strategy gets made: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>Why the UX career ladder is broken in India: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>What hiring managers are actually looking for at senior level: <Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Look for When Hiring Senior UX Designers</Link></li>
        <li>Explore the programme built for this transition: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>
      <p className="text-base md:text-lg text-g500 italic mt-6">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX mentorship and education company based in Bangalore. He has 13+ years of design leadership experience across India, Japan, Singapore, Dubai, Australia, and the US, and has worked directly with 3,000+ designers.
      </p>
    </>
  ),
  'what-design-managers-look-for-senior-ux-hiring': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You do UX research. You know how to understand what users actually want, how they actually make decisions, and how to design for them specifically, not for a generalised idea of who they might be.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        So let me ask you something uncomfortable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Have you ever applied that same thinking to your own job search?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Have you ever actually tried to understand the recruiter as a user, their journey, their constraints, what they are scanning for at each stage, what makes them stop and what makes them move on?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Almost no designer has. And it is one of the most expensive blind spots in the entire job search process.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is the reframe: in a job application, you are the product. The recruiter is the user. Your resume, your portfolio, your interview performance, these are the touchpoints in their experience of you. And you have been designing those touchpoints without doing any research on the person who is actually moving through them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This blog is that research. Written from the side of the table most designers never sit at.
      </p>

      <h2 id="recruiter-journey" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Recruiter&apos;s Journey: What Is Actually Happening Before You Get the Call
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers think the hiring process starts when they submit an application. It does not. By the time your resume lands in a queue, the organisation has already made a set of decisions that will shape everything that follows.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A hiring manager identifies the need and gets budget approved. That request goes to HR or a recruiting team, who will source candidates from multiple places simultaneously: internal referrals, LinkedIn outreach, job platforms, sometimes specialised design recruiters. The pool that comes in from all of these gets reviewed by a human, usually very quickly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        What is actually true about ATS, and why the popular version of this story is both wrong and right:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The widely cited &apos;75% of resumes are auto-rejected by ATS before a human sees them&apos; originated from a 2012 sales pitch by a defunct resume service called Preptel. No methodology was ever published. The claim has been recycled without a source ever since.
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://blog.theinterviewguys.com/ats-resume-rejection-myth" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Interview Guys, 2025</a>)</span>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What IS true: ATS systems are primarily organisational tools, not auto-rejection machines. <a href="https://enhancv.com/blog/does-ats-reject-resumes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Enhancv&apos;s 2025 study</a> of 25 recruiters across Workday, Greenhouse, and Bullhorn found that 92% do not configure content-based auto-rejection. The software organises applications; humans make the calls.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But here is where the advice to prepare ATS-friendly resumes remains completely correct: <a href="https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Harvard Business School&apos;s Hidden Workers study</a> found that 88% of employers acknowledge their ATS configuration screens out qualified candidates, through human-set filters like employment gaps, keyword mismatches, and years-of-experience thresholds. EDLIGO&apos;s analysis of 1,000 rejected resumes found 43% failed due to formatting and parsing errors, not skill gaps.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The mechanism is different from the myth. The result for a poorly formatted resume is the same: a human never gets to read it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The practical implication: your resume needs to be ATS-friendly, clean formatting, keyword-aligned, no complex layouts or graphics that break parsing. Not because a bot will auto-delete it. Because a poorly structured resume gets deprioritised in a pile of 200 that a recruiter has four seconds each to sort through. The outcome is identical. The cause is different.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After the initial screen, the process at design-mature organisations typically moves through: a pre-discovery call to check fit and bracket, then a portfolio walkthrough or assignment, then sometimes a live whiteboard or collaborative session, then cross-functional conversations with a PM or engineering lead, then a cultural fit discussion, then negotiation and offer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Each stage is evaluating something different. And the biggest mistake designers make is showing up to every stage with the same presentation of themselves, the same story, the same framing, the same level of depth. That is not how good products are designed. Different users, different contexts, different needs at each touchpoint.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you are clearing early stages and losing it later, that is a specific problem with a specific fix. We covered what is actually happening in Round 2 here: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link>.
      </p>

      <h2 id="what-senior-means" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What &apos;Senior&apos; Actually Means, and the Gap Between What You Think It Is and What They Are Testing For
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In the Bangalore market, 3 to 5 years of experience typically qualifies someone for a senior UX designer title. But the title is the easy part. What the hiring manager is actually trying to determine is something much harder to prove from a portfolio.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Senior is not &apos;does more design&apos;. Senior is &apos;operates differently&apos;.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A senior designer is expected to handle end-to-end flows, not just detailed components, but full user journeys and structural architecture. They own the design delivery for a defined scope, not just execute what someone else has scoped. They run research and connect it to decisions, not just produce research artefacts. They collaborate with product managers, engineering leads, and business stakeholders, not just other designers. And they do all of this with a confidence that comes from having navigated ambiguity before, not from having a checklist.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        The four questions a hiring manager is actually asking about a senior designer candidate:
      </p>
      <ol className="list-decimal pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Can they operate at structure level, or are they still thinking at the detail level?</li>
        <li>Do they own their work, or do they wait for direction at every step?</li>
        <li>Can they connect their design decisions to outcomes the business cares about?</li>
        <li>Will working with them be a contribution or a coordination cost?</li>
      </ol>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Notice what is not on that list: Figma proficiency. Tool stack breadth. The visual polish of their case studies.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <a href="https://blog.uxfol.io/ux-design-skills" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UXfolio&apos;s 2025 hiring research</a> found the same shift: &apos;Design leads and recruiters no longer want to see endless tool stacks or pixel-perfect UIs. They are looking for signals that you can navigate complexity, communicate strategy, and connect work to business outcomes.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The specialisation point is also widely misunderstood. At senior level, you are not expected to be a full generalist, someone who does research, interaction, visual, content, and strategy at equal depth. That is unrealistic and not what the role requires. What is expected is that you have gone deep on two or three disciplines, can contribute meaningfully beyond them, and know clearly what you do and do not do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        A senior designer who says &apos;I do everything&apos; is usually someone who does nothing at the depth the role actually needs. On what depth actually looks like vs the surface-expander pattern: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Is Not Taking Your Job. But This Type of Designer Will.</Link>
      </p>

      <h2 id="signals-that-kill" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Signals That Kill Candidacies: What a Hiring Manager Notices and Does Not Say
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The rejection almost never comes with honest feedback. But the patterns that cause it are consistent enough that after reviewing hundreds of designer profiles at Xperience Wave, they are predictable.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The tools trap
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designer who leads with tools is flagging something they do not know they are flagging. &apos;I am proficient in Figma, Maze, Miro, Hotjar, and Adobe XD&apos;, this says nothing about how they think, what they own, or what they have produced that mattered. It says they know how to use software.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At senior level, tools are assumed. Nobody asks a surgeon which scalpel they prefer. If the tool conversation is taking up real estate in your resume or your portfolio or your opening presentation of yourself, you are optimising for the wrong audience.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The silo worker
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design that happens in a vacuum and gets presented as finished work is a senior-level red flag. A hiring manager is not just evaluating the output, they are trying to understand how you work. Did you make assumptions that a PM would have caught? Did you design something engineering cannot build? Did you validate with users or just with your own judgment?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Working in opacity and &apos;revealing&apos; the work is the pattern of someone who is afraid of in-process feedback. That fear is expensive at senior level, because senior designers need to be able to operate in the open, sharing early thinking, incorporating input, adjusting direction before the full solution is complete.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The constraint blamer
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        &apos;I did not have enough time for proper research.&apos; &apos;The PM did not allow it.&apos; &apos;The org does not value UX.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We covered these exact patterns in a blog specifically about Round 2 interviews, they are the phrases that end candidacies. At senior level, constraints are not explanations. They are the context within which you demonstrated what you could do. The hiring manager wants to know what you actually did within them, not what they prevented. <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link>.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The language mismatch
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A senior designer who can only present work in design language is a designer who will only ever influence other designers. If you cannot say, clearly, without jargon, what the business problem was, what your solution changed about it, and what the measurable result looked like, you are not yet speaking senior.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This does not mean abandoning design thinking. It means translating it. The hiring manager across the table is often a design director or a product leader who is trying to answer the question: will this person be able to operate credibly with our PM team, our engineering leads, our business stakeholders? The portfolio walkthrough is where they test that.
      </p>

      <h2 id="signals-that-win" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Signals That Win Candidacies: What &apos;Yes&apos; Actually Looks Like
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The positive signals are less about impressing the room and more about making the hiring manager&apos;s decision easy. They need to be able to go back to their team and say: this person can do what we need, and here is the evidence.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        They own outcomes, not just deliverables
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designer who can tell you specifically what changed after the thing shipped, a conversion number, a drop in support tickets, a user behaviour metric, is demonstrating something that a polished portfolio cannot. That they stayed attached to the outcome, not just the output. That they tracked what happened. That they have an opinion about why it worked or did not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not about having big impact numbers on every project. Some projects do not have clean metrics. But the ability to frame impact, even qualitatively, is the difference between a case study and a resume entry. On why the &#x20B9;30L designer stays attached to outcomes while the &#x20B9;12L designer moves to the next ticket: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link>.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        They can hold ground without making it a fight
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Anna Rowe, Senior UX Director at Indeed, describes what she is looking for in portfolio presentations: practice telling your story to someone who is not familiar with the work. &apos;Your goal: they understand it in minutes, and they are excited.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That requires the ability to read the room, to know when to go deeper and when to zoom out, to know when to hold on a decision and when to fold gracefully. A senior designer who can defend a decision under questioning without becoming defensive is showing something rare: that they are confident enough in their thinking to subject it to scrutiny.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        They validate and communicate risk
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A senior designer who can say &apos;here is what I do not know yet, here is the assumption I am making, here is the risk if that assumption is wrong&apos; is more valuable than one who presents everything as solved. The hiring manager has worked with enough designers to know that everything is not solved. The designer who pretends otherwise is the one they do not trust.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Highlighting risk early, communicating it clearly, and having a hypothesis about how to test it, this is what senior design judgment looks like in practice.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        They make the collaboration feel easy
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The cross-functional conversation that happens in most senior hiring processes, with a PM or engineering lead, is not a formality. It is a check on whether the person sitting across from them will create coordination problems or reduce them. The signal they are looking for is not charisma. It is: does this person ask good questions? Do they listen before they position? Do they seem interested in what we are building, or only in presenting themselves? A designer who shows genuine curiosity about the product, the team, and the constraints is a designer who will be useful to work with.
      </p>

      <h2 id="five-mistakes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Five Things Designers Get Wrong About Senior UX Hiring
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        1. &apos;They want a full generalist who can do everything.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        No. They want someone who has gone deep on two or three disciplines and can contribute meaningfully across adjacent ones. A senior designer who does research, interaction, visual, content, strategy, and systems design with equal depth does not exist. What does exist, and what gets hired, is someone who is genuinely strong in their core area, credibly functional in adjacent areas, and honest about where they stop.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        2. &apos;The portfolio is the job application.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The portfolio is the door. What happens after you walk through it is determined by everything else: how you present the thinking, how you respond to questions, how you handle the moment when the interviewer challenges a decision you made. A beautiful portfolio from a designer who cannot defend their own work is a liability. It raises expectations that the conversation then fails to meet.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        3. &apos;I will drive design decisions at a vision level.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At senior level, you influence decisions. You do not drive them. The people who set product vision and philosophy are almost always above you in the structure, a Head of Design, a CPO, a founder. Your job is to make those decisions better through the quality of your thinking and the strength of your relationships. Misunderstanding this is one of the fastest ways to arrive in a new role expecting authority you were never going to have.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        4. &apos;A fancy designed resume will show my design skills.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The resume is read by an ATS system and then by a human who has 200 others on their list. A complex, graphically rich resume is frequently the one that parses badly, displays oddly, or gets skimmed past because the signal-to-noise ratio is too low. Use a clean, readable format. Put the outcomes front and centre. Design the resume for the person reading it, not for you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        5. &apos;I will get full authority to do proper research.&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Research happens when you make the case for it and the organisation agrees to the cost. At senior level, that is your job, not to assume research time will be given, but to build the argument for why this specific research, for this specific decision, is worth the investment. Designers who wait for permission to do research get less of it. Designers who show why it matters get more.
      </p>

      <h2 id="how-to-prepare" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        So How Do You Actually Prepare For This?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        Run user research on your own hiring process.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Talk to someone who has hired at the level you are targeting. Not to get tips, to understand what the job looks like from their side. What are they actually afraid of when they are making this hire? What went wrong with the last person in this role? What does success look like for them in six months?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That information changes how you present yourself completely. Because instead of telling your story, you are telling the part of your story that answers what they actually need to hear.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The hiring manager is not looking for the best designer in the pool.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        They are looking for the designer who makes their specific problem easiest to solve.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The more you understand their problem, the easier it is to show that you are that person.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        Map your portfolio to their questions, not to your journey.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most portfolio presentations walk through projects chronologically, or in order of personal pride. The better move: identify the two or three capabilities the role most needs, and lead with the evidence for each. The hiring manager&apos;s job is to answer four questions about you. Make those answers obvious before they have to search for them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        Know your two or three pillars deeply.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not everything at shallow depth. The most common interview collapse at senior level is the moment when the questioning goes below the surface of a case study and the designer has no depth to offer. If you cannot explain, in two minutes, to someone who does not speak design, why you made a specific decision, what you considered and rejected, and what you would do differently, you are not ready to present that project. On defending your thinking in Round 2, the specific questions that expose hollow portfolios: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Empower your design manager.</strong> The last thing: understand that the hiring manager is not your evaluator only. They are going to be your collaborator, your sponsor, your translator to the business. Going into an interview trying to impress them misses the point. Going in trying to understand them, what they are building, what they need, how you can make their job better, is a different conversation entirely. And it is the conversation that converts.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Ready to Map Your Candidacy From the Hiring Manager&apos;s Perspective?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we review portfolios and interview readiness 1:1, not with generic feedback, but with the specific diagnosis of where your candidacy is losing people and what to change. Book a free 45-minute strategy call.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you are not getting calls despite the experience: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You Are Not Getting UX Interview Calls</Link></li>
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If AI is reshaping what depth means for hiring: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Is Not Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>If your best work is hidden behind NDAs: <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">Your NDA Is Not the Problem. Your Portfolio Strategy Is.</Link></li>
        <li>If you are clearing Round 1 and disappearing after: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link></li>
        <li>If the salary gap is what is confusing you: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>If you are ready to get upstream into strategy: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>If you want the full India career context: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>Explore the programme: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>
      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://enhancv.com/blog/does-ats-reject-resumes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Enhancv / HR Gazette (2025)</a> — Does the ATS Reject Your Resume? 25 structured interviews across industries covering 10 ATS platforms. Finding: 92% of recruiters do not configure content-based auto-rejection.</li>
        <li><a href="https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Harvard Business School / Accenture (2021)</a> — Hidden Workers: Untapped Talent. Global study surveying 8,720 employers. Finding: 88% acknowledge their ATS configuration screens out qualified candidates through human-set filters.</li>
        <li><a href="https://edligo.net/job-search-tips/i-analyzed-1000-rejected-resumes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">EDLIGO (2025)</a> — Analysis of 1,000 rejected resumes across Workday, Taleo, and Greenhouse. Finding: 43% of rejections were due to formatting, parsing, or arbitrary filter failures, not qualification gaps.</li>
        <li><a href="https://blog.theinterviewguys.com/ats-resume-rejection-myth" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Interview Guys (2025)</a> — Investigation tracing the &apos;75% auto-rejection&apos; claim to a 2012 sales pitch by Preptel. No methodology was ever published.</li>
        <li><a href="https://blog.uxfol.io/ux-design-skills" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">UXfolio (2025)</a> — UX Designer Skills: What Hiring Managers Actually Look For. Design leads and recruiters no longer prioritise tool stacks or pixel-perfect UIs.</li>
        <li><a href="https://indeed.design/article/ux-interview-advice-from-hiring-managers" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Indeed Design</a> — UX Interview Advice from Hiring Managers at Indeed, Facebook, and Google.</li>
        <li><a href="https://thegrowthuxstudio.com/interview-process-for-a-senior-ux-designer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Growth UX Studio (2025)</a> — Interview Process for a Senior UX Designer. Key insight: &apos;Mid-levels seek direction. Seniors create direction.&apos;</li>
        <li><a href="https://hackajob.com/talent/technical-assessment/ui-ux-designer-interview" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">hackajob (2025)</a> — UI/UX Designer Interview Preparation Guide. Strategic thinking separates executional from senior/leadership-ready candidates.</li>
        <li>Xperience Wave — direct observation. Portfolio review patterns and candidacy failure patterns drawn from reviewing hundreds of designer profiles and mentoring 140+ designers.</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Almas Tasneem is Co-founder at Xperience Wave, where she leads sales, strategy, and client success. She has personally reviewed hundreds of designer profiles, salary situations, and interview processes, and has sat on both sides of the hiring conversation across the Bangalore product design ecosystem.
      </p>
    </>
  ),
  'how-to-evaluate-ux-mentorship-program': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        &#x20B9;50,000 is not a small number.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For most designers in India - especially the ones at the 3 to 6 year mark who are stuck between mid-level and senior, trying to figure out why their career has stopped moving - &#x20B9;50K is a real decision. It&apos;s two months of savings. It&apos;s a conversation with your family. It&apos;s a number that requires you to be certain before you commit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The UX mentorship market in India is not helping you be certain. There are cohort programs, bootcamps, 1:1 mentorships, offline workshops, online courses, hybrid models. The marketing all looks similar. The promises are all the same: senior role, higher salary, better portfolio, career transformation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most of them will not deliver what they promise. Not because the people running them are dishonest - though some are - but because most programs are built around what is easy to deliver, not what actually changes careers.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This blog gives you a framework to evaluate any program before you spend. Six categories, a 100-point scoring tool, and the specific questions to ask before you hand over money to anyone.
      </p>

      <h2 id="three-failures" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Most Programs Don&apos;t Work - The Three Failures to Know First
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Tool-based training vs thinking-shifting training.</strong> This is the most important distinction in design education and the one most programs hope you won&apos;t ask about directly. Tool-based training teaches Figma workflows, prototyping techniques, research methods. You can see what you learned on day one. Thinking-shifting training changes how you interrogate a brief, how you decide what&apos;s worth designing, how you walk into a room full of people who don&apos;t speak design and make your work land. You cannot demonstrate thinking on day one. It shows up six months later, in a room you&apos;ve never been in before, when you know what to do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Group programs vs individual direction.</strong> Cohorts are economically efficient for the program provider. You spread one instructor&apos;s time across 30 to 50 students. Your career problem, however, is not a group problem. Why you&apos;re not getting senior interviews, what&apos;s missing in your portfolio, why you&apos;re strong in execution but invisible in strategy conversations - these are individual. Group programs give you general knowledge. 1:1 programs give you specific direction. These are not equivalent, and they should not be priced as if they are.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Practitioners vs educators.</strong> Someone who has spent ten years teaching design knows pedagogy. Someone who has spent ten years doing design knows the reality of Indian product teams, the politics of a stakeholder room, what a hiring manager actually looks for, and what separates a &#x20B9;12L designer from a &#x20B9;30L designer. The best programs have both. Most have one or the other. And some have people who teach design because they couldn&apos;t sustain a career doing it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; On the &#x20B9;12L vs &#x20B9;30L gap - what&apos;s actually different between them: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link>
      </p>

      <h2 id="six-categories" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The 6 Categories - What to Evaluate and Why
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Every category below is weighted based on how much it actually determines whether you get a return on your investment. Read the reasoning before you score.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. How You Learn - 20 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This gets the highest weight because it determines whether the knowledge transfers. You can have the world&apos;s best mentor and learn nothing if the learning method doesn&apos;t match how you retain and apply things.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The difference between watching someone design and designing yourself is enormous. Between simulating on a dummy project nobody will ever use and working on a real brief with real constraints and real consequences. Between a structured week-by-week path and a content library that you will deprioritise the moment work gets busy.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Programs that produce consistent outcomes force application. Not content consumption. Not recordings. Not reading frameworks. Doing - with someone watching, correcting, and pushing you past the point where you would have stopped yourself.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Ask any program: show me what a student&apos;s week actually looks like. Not the curriculum PDF. The actual week. What is due on Friday? Who reviews it? Within what timeframe? If they can&apos;t answer this with specifics - the structure doesn&apos;t exist.
      </blockquote>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Curriculum Depth - 20 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most design curricula cover core UX: research, interaction design, prototyping, usability. That is the floor, not the ceiling. If a programme&apos;s curriculum stops at core skills, it is preparing you for a mid-level role - not a senior one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The curriculum that changes careers builds three things beyond core skills. <strong>Systemic mastery:</strong> design systems thinking, the ability to make decisions that scale across a product, understanding how your work connects to the platform level. <strong>Relational mastery:</strong> how to navigate stakeholder rooms, how to present work to people who don&apos;t speak design, how to build the alliances that get design into strategy conversations. And <strong>personal brand:</strong> how to make your value visible both inside your organisation and in the market.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        AI belongs in the curriculum - not as a separate tools module but as an integrated thinking layer. How do you plan, research, design, and build with AI as a genuine collaborator? Programs that haven&apos;t answered this question are already behind the industry they claim to prepare you for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; What each career level actually demands: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link>
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Accountability and Drive - 15 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most designers who invest in a program and don&apos;t see results will say the program was bad. Often the program was adequate and accountability was missing. Transformation requires someone to push you past the point where you would have stopped on your own.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        1:1 conversations are the primary mechanism. Not group calls where you get three minutes if you&apos;re lucky - individual time where someone who knows your situation tells you specifically what you&apos;re avoiding and what needs to change.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Group clinics and peer sessions are a different but equally important mechanism. Presenting your work in front of other learners, watching how they present, getting feedback from peers who are working through similar problems - this builds the communication muscle that 1:1 conversations alone don&apos;t develop. Three to four structured group sessions per week is a meaningful cadence. One group call per month is not accountability.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Career Outcome Support - 15 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This answers the question: does the programme end when the curriculum ends, or does it end when you have what you came for?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Portfolio review is not career support. Resume feedback is not career support. Real career support means someone actively helping you position yourself in the market - building your personal brand, helping you articulate your value in language hiring managers actually use, and connecting you to the people who create the opportunities you&apos;re looking for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; What design managers actually look for when hiring: <Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Look for When Hiring Senior UX Designers</Link>
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. Mentor Quality - 15 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Mentor quality matters - but it matters less than how you learn and what you learn. A great mentor delivering the wrong curriculum in the wrong format produces mediocre outcomes. This is why mentor quality sits at 15, not 25.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The specific questions: are the mentors active practitioners or former practitioners turned educators? How many years of relevant experience, and in what kinds of organisations? How many students is each mentor personally handling - because 30 students per mentor is not mentorship, it&apos;s a webinar with a personalised label. And through what medium is the mentor actually available - do you talk to the person, or to a support layer that filters access?
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        6. Certification Rigour - 15 Points
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A participation certificate says you paid and you attended. It says nothing about what you know or can do. Most Indian design programs issue participation certificates. This has quietly devalued the concept of program credentials to the point where many hiring managers ignore them entirely.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        An exam-graded certification with a real pass threshold is a different thing. It says someone other than the program you paid for assessed your knowledge and you met a standard. That is worth something - especially when the standard is backed by practitioners who have worked with certified designers and can speak to what the credential actually means.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The question that tells you everything: what happens if I fail your assessment?
        <br /><br />
        If the answer is &apos;we don&apos;t have an assessment&apos; - that&apos;s your answer.<br />
        If the answer is &apos;everyone passes&apos; - that&apos;s also your answer.<br />
        If the answer is &apos;you resit it&apos; - that&apos;s a program that believes its own standard.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        To give you a concrete example of what external validation looks like: the XW certification standard is backed by Rishik Jha (Design Consultant) and Fatima Sultana (Product &amp; Leadership Advisor) - both listed as advisors on the <Link href="/about" className="text-accent hover:underline font-medium">Xperience Wave about page</Link> and both verifiable independently. Separately, designers who earned the XW certification were placed at organisations including Tech Mahindra, Bob, Salesforce, Synduct, and Infosys within 3 to 6 months of completing the programme. That is not a logo. That is a record.
      </p>

      <h2 id="evaluator" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Evaluator - Score Any Program Out of 100
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Use the calculator below to evaluate any UX mentorship program. Answer 20 specific sub-questions across the six categories. It totals automatically and tells you where the program stands.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>The scoring bands:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-g600 mb-6">
        <li><strong>85-100:</strong> Strong program. Scrutinise the specifics but the structure is right.</li>
        <li><strong>70-84:</strong> Good with gaps. Know what you&apos;re not getting before you commit.</li>
        <li><strong>55-69:</strong> Partial fit. Will help with specific things but unlikely to change your trajectory.</li>
        <li><strong>40-54:</strong> Weak program. Marketing is doing more work than the structure.</li>
        <li><strong>Below 40:</strong> Walk away. The money is better spent elsewhere.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The calculator is honest enough that you can score any program - including ours. If Xperience Wave scores poorly on what matters to you specifically, that is worth knowing before you commit.
      </p>

      <EvaluatorGate />

      <h2 id="questions-to-ask" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Questions to Ask Before You Pay
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every program will send a brochure. Every program has testimonials. Ask the questions the brochure doesn&apos;t answer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">About learning:</p>
      <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-g600 mb-6">
        <li>Walk me through what a student&apos;s actual week looks like - not the curriculum, the week.</li>
        <li>Who reviews my work, how specifically, and within what timeframe?</li>
        <li>If I fall behind, who notices and what do they do?</li>
        <li>Are the projects real briefs or dummy setups?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">About the mentor:</p>
      <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-g600 mb-6">
        <li>Where are you working right now? What have you shipped in the last 12 months?</li>
        <li>If I&apos;m stuck on something on a Tuesday afternoon, how do I reach you?</li>
        <li>How many students are you personally mentoring right now?</li>
        <li>What is something you&apos;ve been genuinely wrong about in your design career?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">About outcomes:</p>
      <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-g600 mb-6">
        <li>What percentage of students got a role change or salary increase within 6 months of completing?</li>
        <li>Can I speak to someone who didn&apos;t get what they wanted from the program?</li>
        <li>What does career support look like after the curriculum ends?</li>
        <li>Have students been hired by people directly in your network?</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">About certification:</p>
      <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-g600 mb-8">
        <li>What happens if I fail the assessment?</li>
        <li>Can you show me a sample question?</li>
        <li>Who outside the program has put their name to the standard - and can I look them up?</li>
        <li>What percentage of students don&apos;t pass on the first attempt?</li>
      </ul>

      <h2 id="which-format" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Which Format Is Right for You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Format matters less than quality of structure - but it does affect fit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Online 1:1 mentorship</strong> - highest individual attention, highest flexibility. The risk: requires self-motivation. The best online 1:1 programs build external accountability into their structure so momentum doesn&apos;t depend on you alone.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Cohorts</strong> - peer learning is real. Seeing how others work through similar problems helps. The risk: general direction rather than specific. A curriculum built for 30 designers at different stages is built for the average - which may not be you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Bootcamps</strong> - intensive, fast, useful for specific skills. Not designed for career transformation. A 3-week bootcamp changes what you know. It does not change how you think. These are different things with different shelf lives.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Offline / hybrid</strong> - proximity changes the learning dynamic for some people. The risk: geography limits access. Don&apos;t trade mentor quality for the comfort of being in a room.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        The honest question to ask yourself before choosing a format: When have I actually followed through on self-directed learning? If the honest answer is rarely - you need external accountability built into the structure. Discipline you&apos;re hoping to find is less reliable than structure you don&apos;t have to choose.
      </blockquote>

      <h2 id="honest-limitation" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        One Honest Limitation Before You Decide Anything
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every program has a specific kind of person it is not right for. Knowing this matters as much as knowing who it is right for.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A structured, intensive 1:1 mentorship - the kind that pushes you, tracks your progress, and expects you to show up - is not right for someone who needs full flexibility to go at their own pace with no external pressure. That&apos;s not a criticism of the person. It&apos;s a mismatch of what the program delivers and what the person needs. A mismatch at &#x20B9;50K is expensive.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Before you evaluate any program on the six categories, evaluate your own working style first. Are you self-directed enough to show up when no one is checking? Or do you need someone to check? The honest answer to that question should come before the scorecard.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Want to Walk Through the Scorecard Together?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Book a free 45-minute strategy call. We&apos;ll apply this framework to Xperience Wave with you - honestly - and tell you whether we&apos;re the right fit for where you are right now. If we&apos;re not, we&apos;ll tell you that too.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Or explore our programmes: <Link href="/programs" className="text-accent hover:underline font-medium">xperiencewave.com/programs &rarr;</Link>
      </p>
      <p className="text-base md:text-lg text-g500 italic mb-8">
        A note on transparency: Xperience Wave runs a UX mentorship programme. This framework reflects the values that shaped how we built it. Apply it to us - we should score well on what we say matters, and we should be honest about the categories where we are not the right fit for everyone.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you&apos;re not getting interview calls despite applying: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls</Link></li>
        <li>If salary is the specific gap you&apos;re trying to close: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>Why the UX career ladder in India works differently: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>Explore the programme: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li>Xperience Wave - direct observation. The six-category framework, the three failure patterns, the scoring weights, and the questions to ask are drawn from 13+ years of experience running and evaluating design programmes, and working with 3,000+ designers across India and internationally. The certification validation examples (Rishik Jha, Fatima Sultana, placement organisations) are verifiable on the Xperience Wave about page.</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX mentorship and education company based in Bangalore. He has 13+ years of design leadership experience and has worked directly with 3,000+ designers across India and internationally.
      </p>
    </>
  ),
  'ic-to-manager-trap-designers': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You were the best individual contributor on the team. Then they made you a manager. And everything that used to work stopped working.
      </p>

      <h2 id="three-weeks" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Weeks
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I was sitting across a designer with eleven years of experience. That is not a junior profile. Eleven years means he had shipped products, survived reorgs, probably trained at least a few people informally. The kind of person you would expect to be leading a design function.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He told me, very clearly: I cannot manage. I am really bad at it. I want to stay as an individual contributor.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That statement, on its own, is perfectly valid. The IC track is a real career path. Some of the most impactful designers in the world never managed a single person. There is nothing inherently wrong with choosing depth over breadth.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But I have had this conversation enough times to hear the difference between a genuine career preference and a wound talking. So I pushed.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He circled. He deflected. Then, eventually: I was forced into a manager role once. It was the worst three weeks of my career. I wanted to quit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Three weeks. That is how long it took for a designer with over a decade of experience to conclude, permanently, that he was not built for leadership.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He is not an outlier. I hear this story constantly - from designers with seven, nine, twelve years of experience. The details change. The conclusion is always the same: I tried management, it was terrible, I am not cut for it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        They are almost always wrong. They were not unfit for leadership. They were unprepared for it. And that distinction - between being unfit and being unprepared - is the one that determines whether they spend the rest of their career stuck at a ceiling or break through it.
      </p>

      <h2 id="the-data" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        This Is Not Just a Design Problem. The Data Is Ugly.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you assume this is a personal failing - a weakness specific to designers or to India - look at what the research actually says.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>60% of new managers fail within their first 24 months.</strong> That is not a design industry number. That is across all industries, all functions, globally. The research, originally published by CEB (now Gartner), has been replicated and cited for over a decade. Six out of ten people promoted into management for the first time do not survive the role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>82% of managers enter their role without any formal management or leadership training.</strong> The Chartered Management Institute (CMI) surveyed over 4,500 employees in the UK and found that the overwhelming majority of managers are what they call &apos;accidental managers&apos; - promoted because they were good at their previous job, not because they were prepared for the next one. The result: 28% of employees left organisations specifically because of a negative relationship with their manager.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>The better you are as an individual contributor, the worse you tend to perform as a manager.</strong> Researchers at Yale, MIT, and the University of Minnesota studied nearly 40,000 sales workers across 131 firms (Benson, Li, and Shue, published in the Quarterly Journal of Economics, 2019). They found that companies systematically promote their best individual performers - and that these top performers, once promoted, are associated with a 7.5% decline in the performance of the people they manage. The Peter Principle is not a joke. It is a measurable, costly organisational pattern.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Read those numbers again. This is not about individual weakness. This is a systemic failure in how organisations promote people. And design teams are hit especially hard, because the gap between what makes someone a great IC designer and what makes someone a functional design manager is wider than in almost any other discipline.
      </p>

      <h2 id="why-ics-thrive" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Individual Contributors Thrive - and Why That Becomes the Trap
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        To understand why the transition breaks so violently, you need to understand what made them successful in the first place.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Individual contributors earn everything under their own name. They set up strategy by themselves. They conducted research. They built insights. They delivered solutions. They got reviewed, adjusted, shipped. And when appraisals came, the recognition was clearly, specifically, personally theirs.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Over years, this builds a very specific identity: I am the person who delivers. I am reliable because of what I personally produce. And the organisation reinforces this at every step. Performance reviews reward individual output. Praise is directed at individual contribution. Promotions - at least in the early and mid years - are tied to what you personally shipped.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        None of this is wrong. But it is a completely different skill set from the one you will need as a leader. And nobody frames the transition honestly. It is not a promotion. It is a career change. The skills that made you the best player on the field are not the same skills required to make every player on the field better than they would have been alone. These two jobs are often in direct conflict.
      </p>

      <h2 id="what-happens" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Actually Happens When an IC Becomes a Manager
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When you move into a leadership position, you become like a father to a family. That sounds like a metaphor, but it is operationally accurate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Simple decisions you used to make for yourself now impact the entire team. Every choice ripples through other people&apos;s work, their timelines, their morale. You are no longer accountable only for your output - you are accountable for the output, growth, and emotional state of every person reporting to you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You do not just fight your own fights anymore. You have to sit with someone else and help them understand how to fight theirs. And the uncomfortable reality is that your team is not sitting there waiting for your wisdom. They have their own opinions, their own frustrations, their own pace. Some of them think you are wrong. Some of them think they should have your job.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here is the part nobody tells you: no matter what you do, the labels are waiting.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Too involved? Micromanager.</li>
        <li>Too much space? Absent. Checked out. Does not care.</li>
        <li>Push for quality? Unreasonable expectations.</li>
        <li>Accept what&apos;s delivered? Has no standards.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is no position you can take that will not be criticised by someone on the team. This is the fundamental nature of management, and it shocks people who spent their careers being praised for individual excellence.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the real damage is not the labels. The real damage is the internal monologue that starts running inside the new manager&apos;s head:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 text-base md:text-lg text-g600 mb-8">
        <p className="italic mb-4">&apos;Why do they even involve me when they are not clear about what they want?&apos;</p>
        <p className="not-italic text-sm text-g500 mb-4">(You were supposed to bring that clarity. That is literally your job now.)</p>
        <p className="italic mb-4">&apos;I do not know why they cannot work at my pace.&apos;</p>
        <p className="not-italic text-sm text-g500 mb-4">(They are not you. They will never be you. That is not a flaw - it is the nature of a team.)</p>
        <p className="italic mb-4">&apos;How can they be so stupid?&apos;</p>
        <p className="not-italic text-sm text-g500">(They are not stupid. They have different experience levels, different contexts, different priorities. Your job is to close those gaps, not resent them.)</p>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Every one of these thoughts is a sign that the person is still operating with an IC&apos;s mindset in a manager&apos;s role. They are measuring the team against themselves - their speed, their standards, their instincts. And the team will never match that benchmark, because a team is not a collection of clones. It is a collection of people with different strengths, different ceilings, and different speeds. Learning to work with that reality, rather than being frustrated by it, is the actual skill of leadership.
      </p>

      <h2 id="two-failure-modes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Two Failure Modes (I Have Seen Both Destroy Teams)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When a strong IC gets pushed into management without preparation, they almost always fall into one of two patterns. Both feel like survival strategies. Both break the team.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The Conveyor Belt
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the manager who becomes a pass-through. Leadership hands down decisions - they relay them to the team. The team produces work - they carry it back up. They do not add perspective. They do not push back. They do not shape strategy. They are a human email forward.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This happens because they never learned how to sit at the leadership table and contribute. They do not know how to challenge a product decision in business language. They do not know how to frame a design recommendation in terms a VP cares about. So they defer. They pass. They become invisible - and the team notices immediately.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I have watched this happen in real time. A design team that was functioning well under an experienced lead lost that lead and got a promoted IC as their new manager. Within two months, the team&apos;s confidence was gone. The feeling was: our manager has no power. Nothing we say through them will matter. We are on our own. Strategy conversations happened without design in the room. Not because design was excluded - because the new manager did not know how to claim the seat. (If this pattern sounds familiar, the blog on <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">getting a seat at the product strategy table</Link> goes deeper into the werewolf skills required to survive those rooms.)
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The One-Person Army
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the opposite failure, and it is more common among strong ex-ICs. When they do not deliver personally, they feel like they have done nothing. So they pick one part of the project - usually the most interesting design problem - and go deep. They design. They prototype. They solve.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And while they are heads-down on that one piece, everything else they are responsible for falls apart. The strategy that should be driving business alignment - ignored. Stakeholder relationships that need maintaining - neglected. Team performance and motivation - unmanaged. Resource allocation across the project - overlooked. Quality of deliverables outside their personal focus - unchecked.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And the worst irony: despite doing excellent individual work on that one thing, they will still be called out. Leadership will say they are warming the seat. Not getting their hands dirty. Not understanding the ground reality. Because the ground is the entire project, not the corner they chose to occupy.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Both failure modes end in the same place. The designer concludes that management is not for them. But the failure was not in the person. It was in the preparation - or rather, the complete absence of it.
      </p>

      <h2 id="sprint-meeting" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Sprint Meeting That Made Me Understand the Real Cost
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I have sat in sprint meetings where the design team is giggling and laughing. Comfortable. Relaxed. And I remember thinking: how are they this happy? What are they doing that I am clearly missing?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I dug deeper, the answer was almost always the same: they were following instructions word for word. Product gave a brief. They executed exactly what was asked. No pushback. No questioning. No &apos;is this the right problem?&apos; No &apos;what if we approached this differently?&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It was easy. It was comfortable. It was rewarding - because nobody argues with you when you give them exactly what they asked for. You get praised, you get positive reviews, you go home on time.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And the entire representation of design in that organisation went to the gutters.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is what happens when designers choose permanent comfort over growth. They become the garnish on someone else&apos;s plate - present, visible, but not essential. (I wrote about this pattern in detail in <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">5 Conversations Senior Designers Have That Mid-Level Designers Don&apos;t</Link> - the garnish concept is one of the most uncomfortable ideas in that blog, and one of the most true.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Why does this matter in a blog about the IC-to-manager transition? Because this is where many ICs end up if they never make the jump. Not stuck at a ceiling in the abstract sense. Stuck in a sprint meeting, following instructions, filling colours, getting praised for compliance, and slowly watching design&apos;s influence in the organisation disappear. The IC ceiling is not just a salary cap. It is a relevance cap.
      </p>

      <h2 id="stuck-zone" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Stuck Zone: Too Senior for IC, Too Scarred for Leadership
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Remember the designer with eleven years of experience? Here is what his career looks like now.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He knows he is supposed to grow. He knows his salary has a ceiling as an IC. He knows the market increasingly expects senior designers to lead. But he also knows that the one time he tried, it was the worst experience of his career. So he is stuck.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Designers in this position usually try to resolve the tension in one of two ways:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Path A: Half-hearted leadership.</strong> The organisation pushes them toward a lead role. They accept, but without conviction. They attend leadership meetings but do not speak. They carry the title but not the behaviour. Everyone - the team, the stakeholders, the designer - knows it is not working.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Path B: Doubling down on craft.</strong> They decide to become the best possible IC. They learn new tools, new specialisations, go deeper on visual or interaction or research. But this has diminishing returns. After a certain seniority level, the market does not pay significantly more for deeper craft alone. (The blog on <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">the difference between a &#x20B9;12L and &#x20B9;30L designer</Link> breaks down exactly where this ceiling sits and why it exists.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Both paths lead to the same feeling: stuck. Not growing. Not earning what they could. Not enjoying the work. And the tragedy is that the problem was never capability. The eleven-year designer was not unfit to lead. He was thrown into a pool before anyone taught him to swim, and now he is afraid of water. The fear is real. But the conclusion - that he cannot swim - is not.
      </p>

      <h2 id="how-to-prepare" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How to Actually Prepare (Before You Get the Title)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The transition from IC to leader is not an event. It is a multi-year process that most designers skip entirely because nobody tells them it exists. Here is what the preparation actually looks like - not as theory, but as specific things you can start doing now.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Years 1-3: Build a Core Identity
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you can lead anyone, you need to know what you stand for as a designer. Pick your specialisation. Not a shallow familiarity with everything - genuine depth in an area you can own. This is the credibility that leadership will later run on. Without it, your team will not trust your judgment. And they should not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are in this phase right now, the <a href="https://xperiencewave.com/resources/tools" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">10D Capability Assessment</a> can help you identify where your core gaps are and what to build first.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Years 3-5: Stop Solving Problems Alone
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where most ICs stop growing. They keep solving problems individually - and they get very good at it. But they never learn the muscle that leadership actually requires: solving problems through other people.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is a concrete move you can make this week. The next time you identify a good problem to solve, do not solve it yourself. Bring people together. Run a workshop. Moderate a focused discussion. Let the group arrive at possible solutions. What you are doing is subtle but critical: you are still contributing, but you are also learning to direct outcomes without personally producing every output. That is the first muscle of leadership, and it only develops through deliberate practice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        From here, go deeper. Try to understand the individual roles of everyone you work with - product, engineering, marketing, business, sales. Not just their function. Their objectives, their incentives, their constraints. We think of this as BTSM collaboration - Business, Technology, Sales, and Marketing. You need to understand these functions well enough that you could do part of their job. Not because you will, but because you cannot lead cross-functional conversations if you cannot speak cross-functional language.
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Years 5-7: Learn to Navigate, Not Just Design
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this stage, growth is no longer about design skill. It is about organisational navigation. You need to understand design maturity not as a theoretical model but as a practical constraint. If your organisation expects you to deliver good-looking screens and nothing more, no amount of craft improvement will change your ceiling. You need to learn how to <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">get a seat at the product strategy table</Link> - the werewolf skills: speaking business, holding your ground, translating design value into terms that move budget decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is also where you learn stakeholder management as a survival skill, not a soft skill. How to work with people who are unnecessarily bossy. How to collaborate with stakeholders who do not understand or respect design. When to hold your ground and when to let things go. (The <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">delivery person blog</Link> goes deeper on this exact dynamic.)
      </p>
      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Before You Step In: Build Your Brand
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This one surprises people. Before you take a leadership role, your personal brand needs to already signal leadership. Not through titles - through how people experience working with you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Do people come to you for advice outside your immediate scope? Do stakeholders outside your team know your name? When a cross-functional decision is being made, does anyone think to include you?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If the answer is no, you are not ready - not because you lack the skills, but because the organisation does not see you that way yet. Walking into a leadership role without that perception already in place means you will spend your first months just trying to prove you belong, on top of learning how to actually do the job. Prepare the axe before you go cut the tree. A lot of people see a shining axe and fall in line. Make sure you build a presence that people would genuinely respect before you step into the role. Because if you arrive unprepared, you will conclude prematurely that you are not cut for it - just like the eleven-year designer did.
      </p>

      <h2 id="ic-skills-end" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Individual Contributor Skills End at You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        For better or worse, IC skills are yours - your pace, your quality, your standards, your deliverables.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design leaders are responsible for the team&apos;s success. And teams are not you. Some people are slow at things you find easy. Some are fast at things you struggle with. Some feel laid back when you want urgency. Some want urgency when you need patience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you thought everybody works at the same pace as you do - you are going to go crazy. That is not a flaw in the team. That is the nature of teams. And learning to work with that, rather than fighting it or retreating from it, is the actual skill of leadership.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The research says 60% of new managers fail. The CMI says 82% of them were never trained. The Benson study says the better you were individually, the harder the transition will be. None of this means you cannot lead. All of it means that the system is not designed to prepare you, and you need to prepare yourself.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The eleven-year designer who quit in three weeks? If he had spent two years building the muscles described in this blog - moderating workshops, navigating stakeholders, understanding cross-functional language, building a brand that signalled leadership before he carried the title - those three weeks would have gone very differently. Not perfectly. But differently enough that he would still be growing instead of stuck. He was not unfit. He was unprepared. And now you know the difference.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What to Do From Here
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are a senior IC hesitating about leadership because of a bad experience - or because you have watched others fail at it - the hesitation makes sense. But the conclusion that you are not built for it probably does not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The transition from IC to leader requires specific, sequenced preparation. Not reading about it. Not attending a one-off workshop. But deliberately practising delegation, stakeholder navigation, team moderation, and strategic communication over months before you carry the title.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is what our 1:1 mentorship programme is designed for. We work with designers who have the experience and the skill but not the preparation, and we close that gap before the title arrives. Not management theory. Specific muscles for a specific transition.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If that sounds like where you are: <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">book a strategy call</a>. No sales pitch. Just an honest conversation about whether you are ready, what is missing, and what the path forward looks like.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>On the real difference between mid-level and senior pay: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>How to enter the strategy conversations that determine your ceiling: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>On the career phases that Indian organisations don&apos;t explain: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>The conversations that separate senior designers from everyone else: <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">5 Conversations Senior Designers Have That Mid-Level Designers Don&apos;t</Link></li>
        <li>Explore the programme: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://www.gartner.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">CEB/Gartner</a> - New manager failure rate research: 60% of new managers fail within their first 24 months. Multiple replications cited across PRADCO, Inc. Magazine, and Fast Company.</li>
        <li><a href="https://www.managers.org.uk/knowledge-and-insights/research/better-managed-britain" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Chartered Management Institute (CMI) - Better Managed Britain Report, 2023</a> - Survey of 4,500+ employees. 82% of managers enter their role without formal training. 28% of employees left organisations because of a negative relationship with their manager.</li>
        <li><a href="https://academic.oup.com/qje/article/134/4/2085/5550760" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Benson, Li, Shue - &apos;Promotions and the Peter Principle,&apos; Quarterly Journal of Economics, 2019</a> - Study of 39,000+ sales workers across 131 firms. Top individual performers, once promoted, are associated with a 7.5% decline in the performance of the people they manage.</li>
        <li>Peter, L.J. and Hull, R. - The Peter Principle: Why Things Always Go Wrong. William Morrow, 1969.</li>
        <li>Xperience Wave - direct observation. The eleven-year designer story, the conveyor belt and one-person army failure modes, the sprint meeting observation, and the preparation framework come from 13+ years of direct experience and hundreds of conversations with designers navigating this transition.</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX mentorship and education company based in Bangalore. He has 13+ years of design leadership experience across India, Japan, Singapore, Dubai, Australia, and the US, and has worked directly with 3,000+ designers across the country. He holds a Masters in Industrial Psychology.
      </p>

      <FreeTrainingCTA text="Thinking about the move to management? Start here" />
    </>
  ),
  'career-switch-to-ux-india-timeline': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You&apos;ve been reading about UX design for weeks. Maybe months. You&apos;ve watched the YouTube videos, gone through the forums, talked to a few designers. And somewhere between all of it you&apos;ve found a timeline that someone swears by - 3 months, 6 months, 12 months, take your pick.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every number feels both too fast and too slow. Too fast because you don&apos;t know how anyone could actually learn this in 90 days. Too slow because you&apos;re sitting on years of professional experience that feels like it should count for something - and nobody is telling you whether it does or doesn&apos;t.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s what&apos;s actually happening: you&apos;re reading advice written for someone else. Most career switch content is written for freshers - people starting from nothing. You are not starting from nothing. You are starting from somewhere. And where you&apos;re starting from changes the timeline, the approach, and what you need to build that most guides are telling you to build from scratch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This blog gives you the honest version. Not what takes the longest. Not what sounds safest to promise. What actually works for someone who already has professional experience and wants to move into UX without starting over.
      </p>

      <h2 id="the-numbers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        First - The Numbers
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The UX design field draws more career switchers than almost any other design discipline. An Indeed survey found that nearly half of the workforce has made a dramatic career switch at some point in their working life. UX specifically has always attracted people from non-traditional backgrounds - psychology, engineering, architecture, sales, development - because the discipline sits at the intersection of user behaviour, business logic, and technology. You don&apos;t have to have studied design to think about how people experience things.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The honest timeline for a committed career switcher in a structured programme: 6 to 9 months to a first job offer. Some faster - one of our mentees, Divya, came from interior design with no digital product experience and had a UX offer in 5 months. Some take 12. The variance is almost never about intelligence or design talent. It&apos;s about three things: how much relevant prior experience you&apos;re building from, whether you have structure and accountability, and whether you&apos;re spending your time on the right things.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That last point is where most people lose 3 to 6 months.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Structured programme graduates land UX roles up to 40% faster than self-taught career switchers. Not because they learn more - because they waste less time figuring out what to learn next.
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://www.interaction-design.org/literature/article/how-to-change-your-career-to-ux-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">2024 industry study, career change research data via IxDF</a>)</span>
      </blockquote>

      <h2 id="first-mistake" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Mistake Almost Everyone Makes First
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They start with the portfolio.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not because the portfolio isn&apos;t important - it is. But because the portfolio is supposed to document the work, not precede it. When you build the portfolio before you&apos;ve done the work, you get a portfolio full of app redesigns, fictional briefs, and Dribbble-inspired screens that look like you spent three weeks learning Figma and called it UX. Any experienced hiring manager will close it in five minutes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The advice to &apos;build a portfolio&apos; gets given so freely and so early that most career switchers spend their first three months optimising for something that&apos;s useless without the thinking behind it. It is the gown before the surgery. Wearing it correctly does not make you a surgeon.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The second mistake is treating previous experience as a liability to explain away. If you&apos;re a developer, you spend half your cover letter apologising for not having design experience. If you&apos;re an architect, you preface everything with &apos;I know I&apos;m not a traditional UX designer but...&apos; Stop. Your previous experience is not a gap to bridge. It is a shifting skill - a specific advantage that, if you understand it and position it correctly, makes you more valuable in certain product contexts than someone who went straight from a design degree into UX.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Developers who switch to UX build solutions that engineering teams can actually implement.<br />
        Architects who switch think in systems and constraints before they think in screens.<br />
        Sales and customer support people know what users actually complain about - not what they say in a usability test.
        <br /><br />
        None of these are weaknesses that need to be overcome. They are starting points that need to be positioned correctly.
      </blockquote>

      <h2 id="phase-1" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The 3+3+3 Framework - Phase 1: Learn to Think, Not Just to Do (Months 1 to 3)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a course structure. It&apos;s a pattern observed across every career switch that has worked - and every one that stalled. The people who land roles consistently do three things in roughly this sequence. The ones who don&apos;t are almost always doing them out of order.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The foundation is not Figma. The foundation is how a UX designer thinks - how they interrogate a brief before accepting it, how they decide what to design before designing anything, how they connect a user&apos;s behaviour to a business decision and make that connection legible to people who don&apos;t speak design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most people skip this phase or compress it badly. They do a crash course, learn the five-stage design process by name, produce one wireframe, and declare themselves ready to build a portfolio. They are not ready. They have learned the vocabulary of design thinking without the underlying logic. When a hiring manager asks them why they made a specific design decision, they describe the process they followed rather than the reasoning behind the choice. That&apos;s the tell.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What Phase 1 actually requires: core UX capability - research, interaction design, information architecture, wireframing, usability testing - at a functional level. Not expert level. You are not trying to be a senior UX designer yet. You are trying to be able to run a research session, map a user flow, and wireframe a feature end to end with a reason for every decision.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It also requires something most guides don&apos;t mention: building your shifting skill inventory. Sit down and write out what you specifically know from your previous field. Not a generic list. Specific things. The developer knows what makes a handoff clean and what makes a developer want to redesign your feature in their head. The architect knows how to navigate constraints without losing the intent of the design. The sales person knows the three objections users raise that never appear in research reports. These are real competitive advantages. Identify them before Phase 2, because you need them in your portfolio narrative.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        The trap in Phase 1: mistaking tool speed for design depth. Figma speed is praised in most junior environments. It feels like progress. You can show people something. But Figma skill without thinking skill is decoration. It impresses people who don&apos;t hire UX designers. It does not impress the people who do.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; On what the salary gap is actually driven by - not tools: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link>
      </p>

      <h2 id="phase-2" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Phase 2: Build the Evidence (Months 4 to 6)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where most career switchers stall. They have done Phase 1 - more or less. They know the theory. They have done one or two practice exercises. And they don&apos;t know what to do next, so they either start applying too early with too thin a portfolio, or they go back to watching more content instead of producing more work.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Phase 2 is not about more learning. It is about proving - through real work - that you can think like a UX designer in an actual organisational context.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Divya was in this phase when she came to us. Five years of interior design experience. Understood constraints, clients, and the gap between concept and execution. What she didn&apos;t have was digital product work. We didn&apos;t ask her to start from scratch. We asked her to bring her spatial thinking into a digital context - a project where that constraint navigation actually mattered. Three weeks in, the case study looked nothing like an app redesign. It looked like a designer who already knew how to think. Five months after starting, she had a role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What Phase 2 requires: two to three case studies that show the full process - not the output. Problem identification, research, synthesis, design decision with reasoning, what happened when you tested it. The narrative matters as much as the screens. A case study without thinking visible in it is just a portfolio of pictures.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It also requires building your personal brand - not your portfolio website, your positioning. You are not transitioning from something else into UX. You are a UX designer with a background in X. The difference is not cosmetic. It is the difference between a candidate who is explaining their past and one who is presenting their value.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And it requires presentation practice - in front of people, not in your room. The ability to present work and defend your decisions under push-back is a skill that does not develop in isolation. Group clinics, peer critique sessions, presenting to people who don&apos;t already believe in your work - this is what builds the confidence that makes interviews survivable.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        The test for whether you&apos;re ready to move to Phase 3: Can you explain a project in 10 minutes - what the problem was, what you did, why you made the decisions you made, and what you learned? Not just show the screens. Not just describe the stages you went through. Explain the reasoning. If you can do that for two projects, you are ready to apply.
      </blockquote>

      <h2 id="phase-3" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Phase 3: Target the Right Role (Months 7 to 9)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The switch phase is where strategy matters as much as skill. Most career switchers apply to every UX role they can find with the same portfolio and the same story. Three months later they have a hundred rejections and no idea what went wrong.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What went wrong is targeting. They applied to roles that required something they didn&apos;t have, ignored roles where their background was genuinely competitive, and wrote cover letters that apologised for their previous experience instead of leveraging it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        Target by total experience, not UX experience:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have five years of professional experience as a developer or an architect, you should not be applying for internships. You should be targeting UX roles where your previous background is an advantage - product companies in your industry, teams where you&apos;d talk to engineers every day, organisations building products with complex technical or spatial constraints. The designer who has spent five years doing something relevant is more valuable in that specific context than someone with two years of pure UX experience.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        Realistic first roles by background:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Parallel digital designers (graphic, motion, UI):</strong> UX Designer, &#x20B9;5-8 LPA. Visual skill is an advantage. Research and systems thinking needs explicit demonstration in the portfolio.</li>
        <li><strong>Non-digital designers (architecture, interior):</strong> UX Designer, &#x20B9;4-7 LPA. Systems and constraint thinking transfers well. Digital product context needs to be built in Phase 2 work.</li>
        <li><strong>Developers and engineers:</strong> UX Designer with noted technical background, &#x20B9;5-9 LPA. Practical thinking is rare and valued. Don&apos;t undersell it.</li>
        <li><strong>Non-design, non-tech backgrounds (sales, support, operations):</strong> Associate UX Designer or UX Researcher, &#x20B9;3.5-6 LPA. User proximity is the shifting skill. Research-heavy roles play to this strength.</li>
        <li><strong>Fresh graduates and design school students:</strong> Associate UX Designer or internship-to-hire. The market is competitive at this level. Live project work in the transition period is the differentiator.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        UX interviews work differently:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You will be assessed on how you think under ambiguity. How you ask clarifying questions before jumping to solutions. How you handle constraints. The designers who fail UX interviews almost always fail because they can&apos;t explain their thinking, or they jump to solutions before they&apos;ve understood the problem. Neither of these is a talent problem. Both are fixable with practice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        The network matters more than applications:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        In the Indian design ecosystem, senior roles are almost never filled through job board applications. They&apos;re filled through referrals, introductions, and direct conversations. For career switchers specifically, being known in the community before you start applying dramatically changes the conversion rate. A community like WaveMakers Connect - where you&apos;re in the room with hiring managers and design heads - is worth more than 200 applications to roles you found on LinkedIn.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; What design managers actually look for before you send anything: <Link href="/resources/blogs/what-design-managers-look-for-senior-ux-hiring" className="text-accent hover:underline font-medium">What Design Managers Look for When Hiring Senior UX Designers</Link>
      </p>

      <h2 id="three-traps" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Three Traps That Cost Most People Months
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Learning instead of building.</strong> After Phase 1, you do not need more theory. You need more work. The career switchers who take 12 months instead of 6 almost always spend months 4 to 9 consuming content rather than producing case studies. Another course, another framework to internalise. This feels like progress. It is not progress. Progress at this stage means work that can be shown to a hiring manager.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Targeting the wrong level.</strong> Coming from five years of professional experience and applying for internships because you have no UX experience is a waste of your leverage. Coming from no design background and applying for senior UX roles because the job description sounds interesting is a waste of time. Know where you are genuinely competitive. Apply there.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Staying in the transition identity too long.</strong> There&apos;s a stage many career switchers get stuck in - they know they&apos;re changing, but they haven&apos;t fully committed to the new identity. They still introduce themselves as &apos;transitioning from architecture to UX.&apos; They hedge their portfolio. They haven&apos;t stopped being an architect yet. At some point, the switch has to happen in how you present yourself before it happens in the job title. The people who land fastest are the ones who make that commitment in their own head first.
      </p>

      <h2 id="what-this-requires" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What This Actually Requires
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A career switch to UX is not a side project. It is a professional repositioning that requires consistent, committed effort over 6 to 9 months. The people who do it successfully are not exceptional. They are structured. They have someone pushing them when they slow down. They build from what they already have. And they do not mistake consuming content for making progress.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you&apos;ve read this and you know which phase you&apos;re in - the next step is not more research. It is a conversation about what your specific path looks like.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Know Which Phase You&apos;re In? Want to Map the Specific Path?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Book a free 45-minute strategy call. We&apos;ll tell you which phase you&apos;re in, what your shifting skills are, and what to build next. Whether you join us or not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Or explore the career transition programme: <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Xperience Wave Career Transition Programme &rarr;</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Common questions answered: <Link href="/resources/faq" className="text-accent hover:underline font-medium">xperiencewave.com/resources/faq &rarr;</Link>
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>On the salary gap you&apos;re trying to close: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>Why the career ladder in India works differently: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India</Link></li>
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>Explore the programme: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://www.interaction-design.org/literature/article/how-to-change-your-career-to-ux-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">IxDF - How to Change Your Career to UX Design</a> - 49% of the workforce has made a dramatic career switch (Indeed survey). Structured programme graduates land roles up to 40% faster than self-taught career switchers.</li>
        <li><a href="https://www.ambitionbox.com/salaries/ux-designer-salary" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">AmbitionBox / Codezion (2025)</a> - Entry-level UX designer salary India: average &#x20B9;4-6 LPA at entry level. Salary bands by background and experience level.</li>
        <li>Xperience Wave - direct observation. The 3+3+3 framework, the shifting skills concept, career switcher profiles, and the three traps are drawn from working with career switchers across all backgrounds within the Indian design ecosystem. Divya&apos;s story is a real mentee case study (name used with permission).</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Almas Tasneem is Co-founder at Xperience Wave, where she leads sales, strategy, and client success. She has worked directly with career switchers across all backgrounds and has reviewed hundreds of career transition journeys within the Indian design ecosystem.
      </p>
    </>
  ),
  'design-thinking-vs-design-strategy': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Ask any designer - from someone two months into their first role to someone ten years deep - what the Design Thinking process is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They&apos;ll tell you. Empathise, Define, Ideate, Prototype, Test. EDIPT. Clean stages. Usually delivered with just enough confidence to suggest they&apos;ve done it, and just enough vagueness to suggest they haven&apos;t done it the way the textbook describes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And here&apos;s the thing: they&apos;re not wrong. Design Thinking is a real framework with a real origin and real moments where it has produced real outcomes. IDEO built it. Stanford&apos;s d.school formalised it. Some genuinely important products have been shaped by it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But somewhere between David Kelley&apos;s whiteboard at Stanford and the Post-it covered walls of every corporate innovation workshop in 2015, something went badly wrong. The process became a product. The thinking became a template. And a framework that was built to help non-designers think more like designers ended up being sold back to designers as the thing they were supposed to do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        That is the sentence I want you to sit with. Design Thinking was built to help non-designers think more like designers. It was never built to be how designers actually design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Understanding that distinction - and understanding what Design Strategy is, and why it moves in a completely different direction - is the difference between a designer who gets treated like a delivery function and one who gets treated like a strategic partner.
      </p>

      <h2 id="what-design-thinking-was" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Design Thinking Actually Was - Before It Became a Workshop Format
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Thinking has a genuinely interesting origin. The ideas go back to the 1960s at Stanford, through researchers who were studying how designers think - what makes design cognition different from scientific or engineering thinking. The work was grounded in psychology and creativity research. It was rigorous. It was built by people who deeply understood design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        IDEO, founded in the early 1990s, took those ideas and turned them into a consulting methodology. Their version of the process - understand, observe, visualise, evaluate, implement - was designed for a specific context: helping large organisations innovate in areas where the people making decisions were not designers and did not have a design-trained understanding of how to approach a problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That was the problem Design Thinking was actually solving. Not &apos;how do designers design better.&apos; It was &apos;how do we get a room full of MBAs, product managers, and business heads to think about users at all.&apos;
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Design Thinking focuses on training business leaders to &apos;think like a designer.&apos; Strategic design embeds designers in strategic parts of the business.
        <br /><br />
        One moves toward the business. The other puts design inside it.
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://thefountaininstitute.com/blog/what-is-strategic-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Fountain Institute, What Is Strategic Design?</a>)</span>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the point that gets lost in almost every conversation about Design Thinking. It was a translation tool. It was designed to bridge the gap between how designers think and how organisations were structured to make decisions. When it worked, it worked because it gave non-designers a language and a process for engaging with user problems they would have otherwise ignored.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The question is whether the translation tool should also be the designer&apos;s primary methodology. And the answer is clearly no.
      </p>

      <h2 id="workshop-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why the Workshop Became the Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The five-day design sprint. The Post-it wall. The empathy map drawn by twelve people who have never done user research in their lives. The brainstorming session where the loudest person in the room drives the output, regardless of whether their idea is good, because deferred judgment is a rule of the process.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is what happened when Design Thinking became a packaged product. And the product was very successfully sold - to schools, to government departments, to corporate innovation labs, to HR teams running culture initiatives, to organisations that wanted the feeling of innovation without the cost and uncertainty of doing something actually new.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Jake Knapp, who ran Design Thinking workshops at Google, followed up on what actually happened after his sessions. His finding: the brainstorming and Post-it work rarely led to built products or solutions. Decisions kept happening the old way - a few people working separately and then selling their ideas to decision-makers. The workshops produced excitement. They produced alignment theatre. They didn&apos;t reliably produce outcomes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There are two specific reasons the group workshop format fails that I want to name directly, because they&apos;re not talked about clearly enough.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>First: group dynamics replace design thinking.</strong> When you bring a room of people together to ideate, the output is shaped by the social dynamics of that room - not by the quality of the ideas. The person with the most seniority or the most confidence drives the direction. The designer in the corner who actually knows how to solve the problem thinks better alone and presents poorly. The business head &apos;builds on&apos; ideas in ways that move them away from user needs and toward what they already wanted to do. You call it democratic. It is actually just unstructured.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Second: the process prioritises participation over expertise.</strong> Design Thinking&apos;s appeal to organisations was that anyone could do it. You don&apos;t need design training - here&apos;s a Post-it, here&apos;s a Sharpie, here&apos;s a framework. That democratisation was the selling point. It was also the failure mode. Because the moment you design a methodology so that anyone can participate without training, you have also designed a methodology where expert judgment gets averaged out. The designer&apos;s years of experience navigating user problems, business constraints, and interaction patterns gets treated as one vote among many.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        &apos;Innovation theater&apos; is the term that has emerged for what this produces: checking a series of boxes without implementing meaningful shifts. Everyone leaves the workshop with their ideas heard, their Post-its on the wall, and their sense of contribution intact. The product remains unchanged.
      </blockquote>

      <h2 id="design-strategy-different" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Design Thinking Said &apos;Let Us Teach You to Think Like Us.&apos; Design Strategy Says Something Different.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is the connection that most writing on this topic misses.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Thinking was a response to a specific problem: organisations were making decisions without thinking about users, and designers had no way into those conversations. The solution Design Thinking offered was: let us teach the people making decisions to think a little more like designers. Come to our workshop. Use our process. Think about empathy.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That solution had a fundamental flaw. It put the burden of the problem on designers teaching everyone else to be a bit more like them. It did not change where designers sat in the organisation. It did not change whether design had a voice in strategy. It gave non-designers a taste of design thinking and sent them back to their seats - where they continued making decisions in the same way, now with a Post-it aesthetic.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Strategy moves in the opposite direction entirely.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Strategy doesn&apos;t ask non-designers to think like designers. It puts design inside the decision-making process itself. It&apos;s not about running a better workshop. It&apos;s about ensuring that before any significant product decision is made - before the brief is written, before resources are allocated, before the build starts - design thinking is embedded in how the question is framed and what counts as success.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is why Design Strategy is what gets you promoted. Not because it&apos;s a more sophisticated methodology. Because it requires the designer to operate at the level where businesses actually make consequential decisions - and that is the level where design influence compounds into career advancement.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; On what it actually takes to get into those rooms: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link>
      </p>

      <h2 id="what-design-strategy-is" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Design Strategy Actually Is - Not the Definition, the Practice
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Strategy, in any domain, is an action plan that structures effort toward specific outcomes. It names the goal, identifies the resources, anticipates the risks, and defines what success looks like before the work begins. Strategy is not execution. It is the thinking that makes execution coherent.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Strategy is strategy in which design sits at the centre - not as a delivery function, but as the function that connects user understanding to business outcomes.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In practice this means: before a product team starts building anything significant, a design strategist has been in conversations with the business about what they&apos;re trying to achieve commercially. With sales and marketing about what they&apos;re telling the market. With technology about what&apos;s feasible and what&apos;s accumulating debt. And - this is the part that everyone else in those conversations hasn&apos;t done - with users about what the experience actually needs to deliver in order to work for a real human being.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Strategy produces a plan. Not a design plan - a business plan with design at its centre. It says: here is what we are trying to achieve, here is what we know and what we don&apos;t, here is where the research needs to happen and where it doesn&apos;t, here is what the experience needs to do to deliver the business outcome, and here is how we will know if it worked.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        Design Strategy is the nexus between corporate strategy and design thinking. It is not a design process. It is a business process that design drives.
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://toptal.com/designers/product-design/design-strategy-guide" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Toptal, Design Strategy - A Guide to Tactical Thinking in Design</a>)</span>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The difference from Design Thinking is structural. Design Thinking positions design as a method others can borrow. Design Strategy positions design as the function that owns the thinking at the beginning - before anyone else has defined what the problem is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; On how the strategic conversation actually starts inside an organisation: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>
      </p>

      <h2 id="how-to-set-up" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How to Actually Set Up a Design Strategy - And What Will Go Wrong
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The practical reality of building a Design Strategy is that it requires you to work upstream of where you currently are. Most designers receive a brief and design within it. Design Strategy requires you to be in the room before the brief is written.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is not a small ask in most Indian organisations. The hierarchy, the political structure, the default assumption that design is a delivery function - all of these work against it. I&apos;m not going to pretend otherwise.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But here is what actually works:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Start with business goals, not design goals.</strong> The first conversation in a Design Strategy is not &apos;what should we design.&apos; It&apos;s &apos;what is this project supposed to achieve commercially.&apos; Revenue? Retention? Market expansion? Churn reduction? Get specific. Get numbers. If nobody in the room has a number attached to success, the project doesn&apos;t have a strategy yet - it has an idea.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Talk to everyone who has already formed an opinion.</strong> Sales teams have been talking to customers. Marketing has a positioning. Technology has constraints that product hasn&apos;t fully accounted for. Before a single design decision is made, a design strategist has talked to all of these people and synthesised what they&apos;ve said into a picture of what the organisation actually believes, what it knows for certain, and where its assumptions are untested.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Identify the user knowledge gap - specifically.</strong> Not &apos;we need to do research.&apos; The specific question: what do we not know about this user&apos;s experience that, if we&apos;re wrong about it, makes this whole project fail? That is the research that&apos;s worth running. Everything else is either assumed correctly or discovered post-launch.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Produce a plan, not a document.</strong> A Design Strategy is not a strategy deck. It&apos;s a working plan: what we are trying to achieve, what we know, what we&apos;re assuming, what research we need, what the design will need to deliver, who needs to agree on what, and when we will know if it worked. It should take a week to produce, not a month. If it takes longer, you&apos;ve turned strategy into execution.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Expect resistance from product teams.</strong> The most common pushback against Design Strategy is that it looks like design is trying to take over product. Address this directly and early. Design Strategy is not trying to own the roadmap. It&apos;s trying to ensure that the decisions already being made are made with user reality in its input. Make that distinction clearly, often, and without defensiveness.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-8">
        The designer who can walk into a business conversation, understand what the organisation is trying to achieve, connect it to what users actually need, and produce a plan that makes the connection between those two things legible - that designer is not a delivery function. They are a strategic partner. And they get treated accordingly.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        &rarr; The five questions senior designers ask before they walk into any of these rooms: <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">The 5 Conversations Senior Designers Have That Mid-Level Designers Don&apos;t</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you want a tool that helps you build a Design Strategy document for your next project - asking you the questions a strategist would ask, not letting you give vague answers - we&apos;ve built one and it&apos;s available here: <a href="https://xperiencewave.com/resources/tools" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">xperiencewave.com/resources/tools</a> &rarr; Your email is required to access it.
      </p>

      <h2 id="real-shift" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Real Shift
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to come back to where I started.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Thinking was built to solve a real problem: designers were invisible in the rooms where decisions were made. The solution it offered was to make everyone a bit of a designer. Teach them the process. Give them the framework. Hope that the empathy sticks.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That solution reached its limit. Not because the ideas were wrong - human-centred thinking is still correct. But because the method of delivering those ideas - the workshop, the Post-it wall, the five-day sprint - didn&apos;t change where designers sat in the organisation. It gave non-designers a taste of design thinking and left designers exactly where they were: waiting for the brief.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Strategy is the answer to that limit. Not a replacement for design craft - but the thing that ensures design craft gets applied to the right problems, in the right context, with the right organisational backing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who understand this distinction don&apos;t wait for the brief. They&apos;re in the conversation where the brief is being written. They know what the business is trying to achieve before anyone has drafted a scope. They&apos;ve already talked to the user.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design Thinking asked how to get organisations to care about users. Design Strategy asks how to ensure that what the organisation builds is shaped by user reality from the beginning. One is a cultural aspiration that requires everyone to temporarily borrow the designer&apos;s mindset. The other is a functional position that puts the designer inside the decisions that matter.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8 font-semibold">
        Only one of them gets you a seat at the table. And you already know which one.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Want to Understand How Design Strategy Applies to Your Role?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Book a free 45-minute strategy call. We&apos;ll map the gap between where design sits in your organisation and where it should sit - and tell you what it takes to close it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If you are ready to get into the rooms where strategy is made: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>The five conversations senior designers have before any of these rooms: <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">The 5 Conversations Senior Designers Have That Mid-Level Designers Don&apos;t</Link></li>
        <li>If the salary conversation has been confusing: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>If AI is reshaping what depth means for your career: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Is Not Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>Explore the programme: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://www.technologyreview.com/2023/02/09/1067821/design-thinking-retrospective-what-went-wrong" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MIT Technology Review (2023)</a> - Design thinking was supposed to fix the world. Where did it go wrong? Jake Knapp, who ran Design Thinking workshops at Google, found brainstorming sessions rarely led to built products. Decisions kept happening &apos;in the old way.&apos; Multiple social-impact initiatives struggled to move beyond pilot projects. The term &apos;innovation theater&apos; emerged to describe the pattern.</li>
        <li><a href="https://thefountaininstitute.com/blog/what-is-strategic-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Fountain Institute - What Is Strategic Design?</a> - Design Thinking focuses on training business leaders to &apos;think like a designer.&apos; Strategic design embeds designers in strategic parts of the business. Design Thinking workshops amount to &apos;high-priced executive play dates&apos; - at best, they earn designers a nod from executives on their way out of the room.</li>
        <li><a href="https://toptal.com/designers/product-design/design-strategy-guide" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Toptal - Design Strategy: A Guide to Tactical Thinking in Design</a> - Design Strategy is the nexus between corporate strategy and design thinking. It requires strategic thinking - understanding business objectives and translating them into design decisions that serve both user goals and business outcomes.</li>
        <li><a href="https://onlinelibrary.wiley.com/doi/10.1111/jpim.12594" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Stanford / IDEO - Origin of Design Thinking</a> - Design Thinking was developed at Stanford&apos;s Joint Product Design program and formalised by IDEO in the 1990s. The original intent: bring human-centred thinking into organisations where non-designers were making product decisions. The framework was designed as a bridge, not as a replacement for design expertise.</li>
        <li><a href="https://xperiencewave.com/resources/tools" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Xperience Wave - direct observation and Design Strategy GPT</a> - The design strategy framework, the critique of workshop formats in Indian organisations, and the practical build process are drawn from working with design teams across Indian product companies. The Design Strategy GPT tool is available at xperiencewave.com/resources/tools (email required to access).</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Almas Tasneem is Co-founder at Xperience Wave, where she leads sales, strategy, and client success. She has reviewed hundreds of designer profiles, portfolio presentations, and organisational design structures across the Bangalore product ecosystem.
      </p>
    </>
  ),
  'ux-career-ladder-india': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Let me tell you something that most UX design blogs will not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The career advice you have been reading, the frameworks, the &apos;just build your skills&apos; playbooks, the neatly illustrated career ladders from Associate to VP, they are written for a different workplace. A different culture. A different set of rules.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They are written for the West.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I have spent 13+ years working with design teams, not just in India, but in Japan, Singapore, Dubai, Australia, and the US. I have worked with over 3,000 designers across Bangalore, Mumbai, Pune, Hyderabad, and Chennai, and mentored 140+ through career transitions. The pattern is always the same: talented designers who do everything right, learn the tools, follow the process, deliver good work, and still get stuck.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not because they lack skills. Because the ladder they are climbing was never built for the ground they are standing on.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This piece is the honest version of what that ground looks like, and what actually moves you forward on it.
      </p>

      <h2 id="ladder-doesnt-work" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Ladder Everyone Follows, and Why It Does Not Work Here
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        If you Google &apos;UX career path&apos;, you will find some version of this:
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Associate Designer &rarr; UX Designer &rarr; Senior Designer &rarr; Lead Designer &rarr; Design Manager &rarr; Director &rarr; VP &rarr; CXO
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Clean. Linear. Logical. It assumes that promotions are merit-based. That good work gets recognised. That there is a clear difference between each level. That your title reflects what you actually do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In many Indian organisations, none of this is true.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What actually happens is messier. You get promoted because someone left and the seat needed filling. You get a &apos;Lead&apos; title but no one reports to you. You are called a &apos;Design Manager&apos; but you are still pushing pixels on the same project you were on two years ago. Or worse, you get the title, the responsibility, and zero authority to make decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I once spoke with a designer, sixteen years of experience, &apos;UX Manager&apos; title at a large Indian IT services company. On paper, he had a team of three. In practice? He could not decide which projects they worked on. He had no say in performance reviews. His actual job was to take whatever the delivery head decided, pass it down to his team, and make sure designs shipped on time. His biggest managerial power was approving leave requests.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He was not a manager. He was a relay station.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And he is not unusual. He is the norm. The gap between title and actual influence is exactly what we unpacked here: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>.
      </p>

      <h2 id="indian-design-culture" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Nobody Says Out Loud About Indian Design Culture
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In Indian workplaces, hierarchy is not just an org structure. It is a cultural operating system. It runs on seniority, deference, and the unspoken expectation that you respect the chain of command regardless of whether the chain makes any sense.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not anecdotal. Geert Hofstede&apos;s cross-cultural research, one of the most cited frameworks in organisational psychology, gives India a Power Distance Index score of 77, significantly above the global average of 56. In high power-distance cultures, hierarchies are strictly followed, decisions are centralised at the top, and criticism from subordinates is often perceived as arrogance rather than contribution. Employees do what they are asked. They do not initiate.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Hofstede&apos;s research on India&apos;s workplace culture: &apos;Little delegation, therefore be patient because decisions are made at the highest level of the hierarchy. Criticism from subordinates are considered arrogant. Employees do only what they are asked to do.&apos;
        <br /><br />
        <span className="not-italic text-sm text-g500">(Source: <a href="https://www.hofstede-insights.com/country/india" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hofstede Cultural Dimensions - India</a>, Power Distance Index score: 77 vs world average 56)</span>
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Now map that onto the design profession, a discipline that literally requires you to challenge assumptions, question decisions, and push back on bad ideas. These two forces collide every day in design teams across India. And designers are almost always the ones who lose.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        The &apos;VP said so&apos; problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A VP or business head walks into a room and says &apos;I need this redesigned by tomorrow.&apos; No brief. No research. No understanding of user needs. The instruction flows downward. In cultures that reward individual thinking, a senior designer would say &apos;let me understand the problem first.&apos; In many Indian teams, that designer is seen as difficult.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        The conveyor belt manager.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design managers who have perfected the art of looking busy while doing nothing original. They receive instructions from above, repackage them for the team below, and call it leadership. They tell their teams &apos;I do not micromanage&apos;, what they really mean is &apos;I do not understand what you do well enough to have an opinion.&apos; When things go wrong, they are nowhere to be found. When things go right, they are in the review meeting taking credit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        The micromanager who gave up on you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        On the other side: managers who jump into every Figma file, redo your work, and say things like &apos;you are too slow.&apos; They never learned to delegate because no one taught them that managing design is different from doing design.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        The skill ceiling.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        For the first three or four years, your core design skills matter. After that, in most Indian organisations, the skills that matter shift entirely. Suddenly it is about navigating relationships. Managing up. Making your boss look good. Knowing which battles to fight and which to quietly lose. The designers who thrive are not necessarily the most talented. They are the ones who figured out the politics fastest. None of this is written in any job description. But every designer working in India knows it is true.
      </p>

      <h2 id="bad-advice" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why &apos;Just Build More Skills&apos; Is Bad Advice
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The standard advice: learn a new tool. Get a certification. Add another case study to your portfolio. Do a side project.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Skills matter. Especially in your first three years. If you do not build strong foundations in research, interaction design, and systems thinking early on, you will never get them back. That window closes fast.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But after that? Adding more hard skills when your actual problem is positioning, communication, and influence is like practising free throws when you are not even getting picked for the team.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers I have seen break through, the ones who jump from 8 LPA to 20, from &apos;Senior Designer&apos; to &apos;Design Lead&apos; at a design-mature company, from feeling invisible to actually shaping product decisions, they did not do it by completing another Coursera course.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        They changed three things:
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-g600 mb-6">
        <li><strong>How they talk about their work.</strong> Not what they designed, but what problem they solved and what it was worth to the business. This is the difference between a portfolio and a business case, and most designers have never built the second one.</li>
        <li><strong>Where they position themselves.</strong> Not chasing any open role, but targeting organisations where design actually has a seat at the table, where the conversation about what to build includes design before the brief is written.</li>
        <li><strong>How they navigate people.</strong> Not playing politics, but understanding that influence is a skill, and one that nobody teaches in design school.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The salary gap between designers is not skills. It is legibility and positioning. We broke this down here: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer (It&apos;s Not Skills)</Link>.
      </p>

      <h2 id="real-career-map" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Real Career Map for Indian Designers
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        So if the standard ladder does not work, what does? Here is what 13 years across Indian, Japanese, Singaporean, Australian, and US design teams, and 140+ mentorship conversations, have taught me about how careers actually move in India.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Year 0 to 3: Build your foundation. No shortcuts.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is your only window to get the fundamentals right. User research. Data comprehension models. Interaction patterns. Visual systems. Prototyping. If you skip this phase or rush through it, everything you build later will be shaky.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Do not get distracted by titles during this phase. Whether you are called a &apos;UX Designer&apos; or &apos;Product Designer&apos; or &apos;Experience Designer&apos;, the work is largely the same. You are learning to understand users, create usable systems, and validate your decisions.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The trap in this phase: thinking that mastering Figma is the same as mastering design. Figma is a delivery tool. Design is a thinking discipline. They are not the same thing. The execution specialist trap, and where it leads, is covered here: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Is Not Taking Your Job. But This Type of Designer Will.</Link>
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Year 3 to 5: Learn how the business actually works.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where most Indian designers plateau. They have got the craft. They can deliver. But they cannot articulate why their work matters in business terms.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Start here: learn what metrics your product team tracks. Understand what your PM cares about. Figure out how decisions actually get made in your organisation, not the org chart version, but the real version. Who influences whom? Where does budget come from? What does your VP&apos;s VP care about?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not selling out. This is becoming dangerous in the best way, a designer who can connect pixels to revenue. Translating design thinking into business language is the core of the PIE model we built here: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And if you are getting into interviews at this stage but not converting them: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link>.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Year 5 to 7: Make the fork decision. And make it consciously.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Two paths open up here, and most designers stumble into one without choosing.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Path A: Individual Contributor.</strong> Staff Designer. Principal Designer. You go deep on craft, work across multiple projects, shape design systems, set quality standards. You do not manage people. You manage impact. This is a legitimate, respected, well-compensated path, but only at organisations mature enough to have it. At most Indian companies under 500 people, this path does not exist. Know that before you choose it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Path B: People Leadership.</strong> Design Manager. Design Director. You move from doing the work to enabling others to do it. This requires an entirely different skill set: facilitation, feedback, stakeholder influence, team health. If nobody trains you for this transition, you will become one of the two manager archetypes I described earlier: the conveyor belt or the micromanager. Both are career traps.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The mistake I see most often: designers choosing Path B because it seems like the &apos;natural next step&apos; or because the salary is higher, without realising they need to develop a completely different set of capabilities to succeed in it. Getting a seat in the rooms where product direction is decided, which is what Path B ultimately requires, is what we covered in: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table as a UX Designer</Link>.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Year 7+: Your reputation becomes your career strategy.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At this level, jobs do not come from job boards. They come from people who know your work, respect your thinking, and trust your judgment. Your personal brand, how you show up on LinkedIn, what you write, who knows you, what you are known for, matters more than your resume.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is especially true in India, where hiring at the Director+ level is almost entirely relationship-driven. Hofstede&apos;s research on India specifically notes that hiring and promotional decisions at senior levels are often based on relationships rather than purely on merit. The VP of Design at a SaaS company is not posting on Naukri. They are asking their network: &apos;Do you know anyone good?&apos;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If no one in those conversations knows your name, you are invisible. Not because you lack talent. Because you never made your work visible. The hidden job market, LinkedIn visibility, and what a genuinely activated profile looks like: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You Are Not Getting UX Interview Calls (It&apos;s Not Your Portfolio)</Link>.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And if your best work is sitting hidden behind NDAs, preventing you from building that visibility: <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">Your NDA Is Not the Problem. Your Portfolio Strategy Is.</Link>
      </p>

      <h2 id="three-things" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Things You Can Do This Week
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Not vague inspiration. Three concrete moves.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        1. Audit your current role honestly.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Does your title match your actual responsibilities and authority? If there is a gap, if you are a &apos;Manager&apos; doing IC work, or a &apos;Lead&apos; with no decision-making power, acknowledge it. Not to complain about it, but to be clear-eyed about where you actually are. You cannot navigate if you do not know your starting point.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        2. Rewrite one piece of work as a business case.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Take a project you shipped. Instead of describing what you designed, write 200 words on: what the problem was, what it cost the business, what you changed, and what improved. If you cannot do this for any of your work, that is the gap to close first. Not a new Figma plugin. Not another course. This.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        3. Have one conversation you have been avoiding.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        With your manager about your growth path. With a peer at a company you admire. With someone who is two levels above where you are now. Indian workplace culture teaches us to wait for permission, wait for the right time, wait for someone to notice us. The designers who move fastest are the ones who stop waiting.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If that conversation is a salary negotiation you have been avoiding: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer (It&apos;s Not Skills)</Link>.
      </p>

      <h2 id="uncomfortable-truth" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Uncomfortable Truth
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The UX career ladder in India is not broken because Indian designers are not skilled enough.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        It is broken because the system, the hierarchy, the politics, the gap between titles and reality, was never designed with design careers in mind. And the playbook written for designers in San Francisco does not account for a Power Distance Index of 77.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who move fastest in India are not the ones who fight the system or the ones who accept it. They are the ones who see it clearly, who understand the hierarchy without being captured by it, who learn the political language without losing their design thinking, who build their visibility before they need it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is a specific skill. It can be built. But not by taking another Figma course.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You are not behind because you are not good enough.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You are behind because the rules of this game were never explained to you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        They should have been. They were not. So here they are.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Want to Know Exactly Where You Are on This Map?
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Book a free 45-minute strategy call with Xperience Wave. We will tell you honestly where you stand and what is actually blocking you, whether you join us or not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call &rarr;</a>
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you are not getting interview calls despite the experience: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You Are Not Getting UX Interview Calls</Link></li>
        <li>If you have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If AI is reshaping what depth means for your career: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Is Not Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>If your best work is hidden behind NDAs: <Link href="/resources/blogs/nda-work-ux-portfolio" className="text-accent hover:underline font-medium">Your NDA Is Not the Problem. Your Portfolio Strategy Is.</Link></li>
        <li>If you are getting to Round 2 and disappearing: <Link href="/resources/blogs/ghosted-after-round-2-ux-interview" className="text-accent hover:underline font-medium">Why UX Designers Get Ghosted After Round 2 Interviews</Link></li>
        <li>If the salary conversation has been confusing: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer</Link></li>
        <li>If you are ready to get upstream into strategy: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table</Link></li>
        <li>Explore the programme built for this transition: <Link href="/programs" className="text-accent hover:underline font-medium">Xperience Wave Current &rarr;</Link></li>
      </ul>
      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><a href="https://www.hofstede-insights.com/country/india" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hofstede&apos;s Cultural Dimensions — India</a> — Power Distance Index score: 77 (world average: 56). Hierarchies are strongly accepted, decisions are centralised, criticism from subordinates is considered inappropriate, and employees do only what they are explicitly asked to do. Hiring and promotional decisions at senior levels are often relationship-based.</li>
        <li>Xperience Wave — direct observation. Observations on India-specific design career patterns, title-vs-authority gaps, and the fork decision at Year 5 to 7 are drawn from 13+ years of direct experience and 140+ mentorship conversations.</li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX mentorship and education company based in Bangalore. He has 13+ years of design leadership experience across India, Japan, Singapore, Dubai, Australia, and the US, and has worked directly with 3,000+ designers across the country. He holds a Masters in Industrial Psychology.
      </p>
    </>
  ),
  'ux-designer-product-strategy-table': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Before we get into the how, I need to clear three things out of the way. Three reasons designers use to not engage with this topic at all. I&apos;ve heard all of them. None of them hold.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        &quot;We work remotely. There&apos;s no table.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You&apos;re right. There&apos;s no table.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There&apos;s just a Slack thread where three people decided what your next six weeks look like. There&apos;s a Google Doc that became a roadmap before you knew it existed. There&apos;s a recurring call between the CPO, the engineering head, and a business lead, forty-five minutes, every two weeks, that you have never been invited to and nobody told you about.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The table isn&apos;t furniture. It&apos;s wherever the decisions happen without you. Call it whatever you want. The outcome is the same: you find out about the direction after it&apos;s been set, and then you execute it.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        &quot;Our organisation doesn&apos;t really do strategy. We move too fast for that.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Moving fast is a strategy. Deciding not to decide is a strategy. Piling feature on top of feature without asking whether the thing you&apos;re building is still the right thing, that is absolutely a strategy. It just happens to be a bad one. And at some point, someone will have to clean it up. Usually design.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4 font-semibold">
        &quot;Product strategy isn&apos;t really my area, is it?&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is the one I want to spend time on. Because it&apos;s the most common, and it does the most damage. Yes. It is your area. Here&apos;s why.
      </p>

      <h2 id="what-the-table-is" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Table Actually Is, and Why Products That Skip It Die
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The product strategy table is where decisions about a product&apos;s direction get made. Not the design decisions. Not the feature decisions. The direction decisions: what problem are we solving, for whom, and why does solving it matter to the business?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody calls it the product strategy table. It happens inside quarterly planning meetings, annual OKR sessions, board reviews, investor updates, leadership offsites. The agenda is usually framed around growth, market position, or technology. Design is almost never on it by default.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is why this matters to you specifically.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Customer expectations change. Technology changes. The cultural context that made your product relevant shifts. What worked three years ago, the interaction model, the user mental model, the navigation architecture, is now friction. Not because the design got worse. Because the world moved and the product didn&apos;t.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        What doesn&apos;t evolve, stops surviving.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Every product that has ever died at the height of its apparent success died because the people running it believed they had built something so good it no longer needed to change.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Now: who is deciding what the product evolves into? Someone is making those calls. In most organisations, it&apos;s product management and engineering leadership. In some, it&apos;s the CEO. In others, the ones where design has been historically undervalued, it&apos;s whoever can get the most time in the right rooms.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The question is not whether you care about product strategy. The question is whether you&apos;re in the room where it&apos;s being decided. Because if you&apos;re not, the decisions get made without you, and then handed to you to execute. And you already know what that feels like.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here&apos;s the scale of the problem. <a href="https://www.mckinsey.com/capabilities/mckinsey-design/our-insights/the-business-value-of-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">McKinsey&apos;s Business Value of Design research</a>, across more than 300 publicly listed companies, found that fewer than 5% of organisations had senior leaders who could make objective design decisions. Over 40% of companies weren&apos;t even talking to their end users during development. Design was present. It was just not in the room where direction was set.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The same McKinsey research found that top-quartile design companies generated 32% more revenue and 56% more in total returns to shareholders than industry peers over five years. The business case for design at the strategy table is not philosophical. It is financial.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you&apos;re a senior designer experiencing this right now, the execution-only dynamic, this is the same culture problem we covered here: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link>.
      </p>

      <h2 id="fintech-story" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What It Actually Took: A Story From Inside a Fintech Organisation
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I joined a fintech organisation at around eight to nine years of experience, I had a role and I had a team. Neither of those things opened the door.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The culture I walked into had been shaped by the designers and leaders who came before me. Design&apos;s job, in that organisation&apos;s understanding, was to receive a brief from product, give it visual shape, and deliver it. The relationship between design and product strategy was the same as the relationship between a printer and an author. You don&apos;t ask the printer what the book should say.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I understood the logic from their side. Design had never demonstrated anything beyond that capability. So why would the conversation include us?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There were two ways I could have responded. The first was to argue for design&apos;s value, to make the case in theory, using case studies from other companies, talking about the strategic role design plays at Apple or Airbnb. This is the approach most designers take. It almost never works. Because the organisation has no reason to believe the argument applies to them, to their team, to this specific situation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The second was to make the argument in the only language that actually lands: proof.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        You cannot argue your way to the product strategy table. You earn your way in. And the currency is evidence, not persuasion.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This isn&apos;t just my experience. <a href="https://douglaspowell1.medium.com/designers-as-leaders-now-that-we-have-a-seat-at-the-table-how-do-we-prove-we-belong" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Doug Powell</a>, a design leader at IBM who spoke at the IXDA international conference, described what it takes to communicate design to business leadership: they are data-driven, opinionated, competitive, and have a finely-tuned no-bullshit meter. They will not respond to warm-and-fuzzy stories. They respond to clear evidence and quantifiable data. The framing matters more than most designers want to admit.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And then I delivered. On one project, we doubled the conversion percentage. Not in six months. In the shortest timeline the team had seen for an initiative of that scope. That result, specific, measurable, undeniable, was the thing that opened the first door.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After that, I was included in the annual planning. Then the half-yearly planning. Then the quarterly. The OKRs, which had always sat under product and technology, began to shift. Design started being upstream, talking directly to business about what kind of experience needed to be generated, and then delivering to that. Technology came after.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to be honest about where this story ends, because most people who write about this topic skip the hard part.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        After two years of this, we still weren&apos;t fully there. Design was in the room. But OKRs still weren&apos;t owned by design. The perception that design can own strategic outcomes, not just contribute to them, is a harder cultural shift than getting invited to the meeting. I was getting a seat. I was not yet running the table.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        Getting a seat at the strategy table is not a destination. It&apos;s a position you have to hold, re-earn, and defend. Sometimes in the same organisation. Sometimes indefinitely.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Anyone who tells you otherwise has not actually done it.
      </p>

      <h2 id="the-werewolf" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Werewolf: Why Most Designers Fail at This Even When They Get In the Room
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to give you a mental model for the kind of designer who survives, and thrives, in product strategy conversations. I call it the werewolf.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not because it&apos;s dramatic. Because it&apos;s accurate.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A werewolf knows exactly when to fight. When the conversation is going somewhere that would damage the product or the user, and you have the evidence to say so clearly, you fight. You don&apos;t politely suggest. You make the case, you hold the ground, you are willing to be uncomfortable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A werewolf knows when to retreat. When the decision has been made and the political cost of continuing to push outweighs the benefit, you let it go. You note your objection, you make it legible, and then you support the direction that was chosen. Because being the person who can&apos;t stop relitigating lost decisions is the fastest way to lose the seat you just earned.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A werewolf knows when to show confidence. Not performance confidence, the kind that sounds impressive in a meeting and evaporates under questioning. Real confidence, which is built from knowing your domain deeply and being able to defend your thinking at multiple altitudes simultaneously: the thirty-thousand-foot view of where the product needs to go, and the ground-level specifics of how you&apos;d get there.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And a werewolf makes friends. Not networking. Not relationship-building as a career strategy. Genuine understanding of the other people in the room: what they are responsible for, what constraints they operate under, what they&apos;re afraid of, what they need. Because the strategy table is not a design critique. It is a negotiation between people with different mandates, and you cannot negotiate with people you haven&apos;t taken the time to understand.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        The designer who gets a permanent seat at the strategy table is not the smartest in the room. They are the most useful. They know when to push, when to yield, and when to simply make everyone else&apos;s job easier. That combination is rarer than intelligence.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The designers who fail at this, and I have watched many fail at it, almost always do so in one of two ways. The first: they push too hard, too consistently, on too many things. They fight every battle. They make design feel like resistance rather than contribution. The room starts working around them. The second: they yield too much, too quickly. They attend the meetings but don&apos;t change anything. They are present but not useful. The room stops including them because their presence makes no difference.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The werewolf does neither.
      </p>

      <h2 id="eight-things" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Eight Things That Actually Get You In and Keep You There
      </h2>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Get involved before the brief exists
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The single most important move is also the least glamorous. Find out where priorities are being formed, before they become tasks, before they become tickets, before they land in your queue as a brief to execute. That might be a monthly leadership sync you&apos;re not currently in. A product-business conversation that happens over a call you&apos;ve never been invited to. A document that gets written before the planning cycle officially starts.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Get close to that moment. Not by forcing your way in, but by making yourself useful to the people who are already in it. Ask questions. Contribute early thinking. Offer a perspective on what the user needs that nobody else in that conversation can offer. If you can&apos;t get in early, get close to someone who is. Know what is being prioritised. Know why. Know what assumptions are being made before they become decisions. That knowledge is how you show up informed, not reactive.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Speak business first, design second
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a suggestion to stop being a designer. It is a suggestion to wear the right hat at the right moment.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At the strategy table, the conversation is about growth, margin, market position, risk, and capability. If you enter that conversation talking about user journeys, affordance, or information architecture, you will be heard as a specialist with a narrow view. You will be listened to politely and then the conversation will move on without you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The same thinking, reframed: &quot;This feature is introducing friction in an already-complex onboarding flow, and we&apos;re seeing dropout at the exact point where activation matters most. Here&apos;s what that costs us in monthly revenue.&quot; That lands. That contributes to the conversation that&apos;s already happening.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Design thinking is a capability. Business language is how you make that capability legible to the room. You need both. Most designers only bring one. This is exactly the kind of reframing we explored in <Link href="/resources/blogs/business-driven-ux-portfolio" className="text-accent hover:underline font-medium">building a business-driven UX portfolio</Link>.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Be predictive, not just reactive
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer who shows up with solutions is useful. A designer who shows up with a view of what&apos;s coming, before anyone else has named it, is irreplaceable.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Being predictive means reading the signals that others in the room are too close to their own responsibilities to see. Customer behaviour shifting. A technology change that will affect the interaction model in two product cycles. A competitive move that your current product architecture isn&apos;t equipped to respond to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        It also means being honest about risk. Not performing confidence about a direction when you have genuine doubts. The people at the strategy table are making bets. They need to know the odds. A designer who can say &quot;here is what this hypothesis gets right, here is where it could fail, and here is the signal we&apos;d watch for&quot; is contributing to the quality of the bet, not just executing on it.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Know the other people&apos;s constraints, not just their positions
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The product manager is not trying to undermine design. They are under pressure to ship. The engineering lead is not being obstructive. They are managing debt and realistic timelines. The finance partner is not anti-user. They are accountable for a number that the organisation has committed to.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        When you understand what someone is actually constrained by, not just what position they hold, you stop experiencing conflict as personal and start engaging with it as structural. And structural conflicts are solvable. Personal conflicts are exhausting. The werewolf makes friends by understanding what the room is actually under pressure about. That understanding is what allows you to contribute to their problem, not just push your own agenda.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        5. Operate at thirty thousand feet and at ground level simultaneously
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One of the fastest ways to lose credibility at the strategy table is to get lost in detail at the wrong moment. One of the fastest ways to lose it permanently is to never be able to back up a strategic view with specifics.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The designers who hold the seat are the ones who can switch altitude without warning. They can articulate the product direction at the level of a board conversation, and then immediately go to: here&apos;s what that means for the next sprint, here&apos;s the specific interaction problem we&apos;d have to solve, here&apos;s what we&apos;d need to validate before committing. Both directions. No lag. That combination signals that you are not just a thinker or just an executor. You are someone who can hold the whole picture.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        6. Speak in &quot;we&quot;, not &quot;I&quot;
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Nobody gets a strategy executed alone. The designers who understand this speak differently in these rooms. Not &quot;I would approach this by...&quot; but &quot;here&apos;s how we&apos;d bring this to life: the research we&apos;d need, the engineering alignment required, the timeline that makes this viable.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That language signals that you are thinking about implementation, not just ideas. That you understand what it takes to actually move something from a strategic direction into a shipped experience. That you are not going to create more coordination problems than you solve. It is also, practically, how you start getting budget and resources allocated. You cannot resource an individual. You can resource a plan.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        7. Hold your ground without making it a fight
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There will be moments where the direction being taken is wrong. You know it. You have the evidence. You need to say so.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The mistake most designers make here is one of two: they say nothing, or they make it a confrontation. The first makes you irrelevant. The second makes you a problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The move is to name your concern specifically, attach it to a consequence the room cares about, and make it easy for the room to engage with it. &quot;I want to flag something before we commit to this direction. The assumption here is that users understand the new flow without guidance, and our research from the last release suggests that&apos;s not a safe assumption. Here&apos;s what we saw.&quot; That is not a fight. That is a contribution. Say it once, clearly. If the room hears it and still proceeds, note your concern and move with the direction. You have done your job. You have not made an enemy. You have left a record.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        8. Display leadership through what you enable, not what you produce
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The closer you get to the strategy table, the less the conversation is about your own design output. It is about what you enable across a team, across a function, across the organisation.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the hardest shift for designers to make, because we have been trained to measure our contribution in deliverables. Case studies. Screens. Research reports. Those remain relevant. But the designer who holds a permanent seat at the strategy table is also the one who made their team better, who helped a product manager make a more informed decision, who showed a junior designer what it looks like to operate in a room that doesn&apos;t speak your language and still be heard.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Leadership is not about being the smartest in the room. It is about making the room smarter. When you can do that consistently, not just deliver well, but elevate the quality of the decisions being made around you, you stop being a contributor to the strategy and start being part of it.
      </p>

      <h2 id="honest-ending" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Honest Version of How This Ends
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I told you the story of the fintech organisation. Two years of proof-building, culture-shifting, result-delivering. Getting into the annual plan, the half-year plan, the quarterly. Watching OKRs start to include design&apos;s perspective rather than just receive it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        And I told you it still wasn&apos;t fully there after two years.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I want to sit with that for a moment, because this is the part that most writing on this topic skips.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Getting a seat at the product strategy table is not a problem you solve once. It is a position you build, earn, lose partially, rebuild, and hold onto through a combination of consistent evidence, sustained relationships, and the kind of political fluency that nobody teaches in a design curriculum.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Some organisations will meet you halfway. Some will resist no matter what you deliver, because the culture around design&apos;s role was calcified long before you arrived and will outlast any single person&apos;s effort to change it. Knowing which situation you&apos;re in, and deciding accordingly whether to keep investing or to take what you&apos;ve learned somewhere it will compound faster, is itself a strategic decision.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        You are not fighting for a seat at someone else&apos;s table. You are fighting to change what the table looks like. That is a longer fight. It is also the only one worth having.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Start with one room. One conversation. One piece of evidence that you were not just a designer in that meeting, you were the person who changed the quality of the decision. That is how it begins. One room at a time.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6 font-semibold">
        Working on getting into the room, or trying to hold the seat you already have?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we work 1:1 with mid-to-senior designers on exactly this: building the positioning, the language, and the evidence base to operate at the level the title requires. <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a free 45-minute strategy call.</a>
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Read Next</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>If you have the title but not the influence yet: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">Senior Designer Still Treated Like a Delivery Person</Link></li>
        <li>If AI is reshaping what strategy even means for design: <Link href="/resources/blogs/ai-job-designer-type" className="text-accent hover:underline font-medium">AI Isn&apos;t Taking Your Job. But This Type of Designer Will.</Link></li>
        <li>If you&apos;re asking why the salary doesn&apos;t reflect the contribution: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer (It&apos;s Not Skills)</Link></li>
        <li>Explore the programme built for this transition: <Link href="/programs/senior-ux-designer-mentorship" className="text-accent hover:underline font-medium">Xperience Wave Current</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>Sources &amp; References</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><a href="https://www.mckinsey.com/capabilities/mckinsey-design/our-insights/the-business-value-of-design" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">McKinsey &amp; Company, The Business Value of Design (2018)</a></li>
        <li><a href="https://douglaspowell1.medium.com/designers-as-leaders-now-that-we-have-a-seat-at-the-table-how-do-we-prove-we-belong" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Doug Powell, Designers As Leaders (IXDA Interaction 20, 2020)</a></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Co-founder &amp; Head of Design, Xperience Wave
      </p>
    </>
  ),

  'salary-negotiation-ux-designers-india': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Vaibhav was laid off at &#x20B9;17 lakhs. One month later, he had two offers: &#x20B9;21L and &#x20B9;24L. Same designer. Same four years of experience. The only thing that changed was how he walked into the room.
      </p>

      <h2 id="what-changed" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Changed Between &#x20B9;17L and &#x20B9;24L Was Not Skill. It Was Negotiation.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Vaibhav had four years of experience and was based in Pune. His company laid him off. Within a month, he had three interviews lined up. And his head was exactly where yours would be: anything I can secure is good. I have a family to take care of.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I told him one thing: imagine all three offered you. Go in with that confidence. Not cocky. Confident. The confidence of someone who has options - because he did.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He went from a company that had valued him at &#x20B9;17L to two offers: one at &#x20B9;21L, another at &#x20B9;24L. Four years of experience. Pune - not Bangalore. No new skills learned in that one month. No additional certifications. No change in his portfolio.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The only thing that changed was the energy he brought to the negotiation. He stopped thinking &quot;I need this job&quot; and started thinking &quot;They need what I can do.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That shift - from desperation to confidence - is the difference between accepting the first number and shaping the final one. And it is a shift that most designers never make, because nobody teaches them that negotiation is part of the job.
      </p>

      <h2 id="selling-a-service" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        You Are Not Asking for a Favour. You Are Selling a Service.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the mindset shift that needs to happen before any tactical advice matters.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When you are looking for a job, you are selling a service. The employer is the customer. Think about that framing for a moment. You have skills. You have experience. You have the ability to solve a specific set of problems. The employer needs those problems solved. This is a transaction between two parties, not a favour being granted.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Would a service provider accept whatever the customer offers without understanding the market rate? Would they say &quot;I do not care about the fee, just give me the project&quot;? Would they price their work based on what they charged a different customer three years ago, in a different city, for a different scope?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is exactly what most designers do with their salary. And the data shows how much it costs them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        People who negotiate earn an average of 18.83% more than those who accept the first offer. A 2024-2025 meta-review of every major salary negotiation study found this consistently - across industries, geographies, and seniority levels.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In India, 68% of professionals never negotiate their first offer. Seven out of ten people walk away from money that was available to them because they did not ask.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A starting salary difference of even &#x20B9;5,000/month compounds to over &#x20B9;63 lakhs in lost earnings over a career (assuming 5% annual raises). Harvard&apos;s Program on Negotiation published this calculation. Your starting number is not just this year&apos;s salary. It is the baseline for every raise, every appraisal, every job change for the rest of your career.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Imagine you were going to buy a car. The salesperson gives you the first price. You do not ask for clarity. You do not ask about discounts. You do not ask what offers are available. You either say yes or walk away. In both cases, you did not even try to understand what a good number looks like.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Unlike a car, this purchase compounds. Every year. For decades.
      </p>

      <h2 id="salary-data" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What UX Designers Actually Earn in India (Verified Data, 2025-2026)
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before you negotiate, you need to know the market. Not what your friend earns. Not what a recruiter told you once. Verified data.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Sources:</strong> Glassdoor (813+ salary submissions, Bangalore, Feb 2026), Coursera/Glassdoor salary guide (Sep 2025), AmbitionBox, PayScale, GeeksforGeeks, SalaryInHand.in.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse text-base md:text-lg text-g600">
          <thead>
            <tr className="border-b-2 border-g200">
              <th className="py-3 pr-4 font-bold text-carbon">Experience</th>
              <th className="py-3 pr-4 font-bold text-carbon">Typical Role</th>
              <th className="py-3 pr-4 font-bold text-carbon">Avg CTC (Bangalore)</th>
              <th className="py-3 pr-4 font-bold text-carbon">Range</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">0-1 yrs</td>
              <td className="py-3 pr-4">Associate / Junior</td>
              <td className="py-3 pr-4">&#x20B9;4-6.5L</td>
              <td className="py-3 pr-4">&#x20B9;2.5L - &#x20B9;10L</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">1-3 yrs</td>
              <td className="py-3 pr-4">Designer (L1-L2)</td>
              <td className="py-3 pr-4">&#x20B9;7-12L</td>
              <td className="py-3 pr-4">&#x20B9;5L - &#x20B9;16.5L</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">3-5 yrs</td>
              <td className="py-3 pr-4">Senior Designer</td>
              <td className="py-3 pr-4">&#x20B9;12-18L</td>
              <td className="py-3 pr-4">&#x20B9;8.5L - &#x20B9;25L</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">5-8 yrs</td>
              <td className="py-3 pr-4">Lead Designer</td>
              <td className="py-3 pr-4">&#x20B9;18-25L</td>
              <td className="py-3 pr-4">&#x20B9;11L - &#x20B9;35L</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">8-12 yrs</td>
              <td className="py-3 pr-4">Design Manager / Head</td>
              <td className="py-3 pr-4">&#x20B9;25-40L</td>
              <td className="py-3 pr-4">&#x20B9;18L - &#x20B9;55L</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4">12+ yrs</td>
              <td className="py-3 pr-4">Director / VP Design</td>
              <td className="py-3 pr-4">&#x20B9;35-55L+</td>
              <td className="py-3 pr-4">&#x20B9;25L - &#x20B9;80L+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>City Adjustments:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li><strong>Bangalore:</strong> +19.8% above national average. The benchmark city.</li>
        <li><strong>Gurgaon/Delhi NCR:</strong> +12-16.6%.</li>
        <li><strong>Mumbai:</strong> +2-7%. Higher living costs, similar pay.</li>
        <li><strong>Pune:</strong> +7%. (Vaibhav&apos;s &#x20B9;24L at 4 YOE was above this average - that is the negotiation premium.)</li>
        <li><strong>Chennai:</strong> -8 to 9.8%. Consistently lowest-paying metro for UX.</li>
        <li><strong>Hyderabad:</strong> -4.5%.</li>
        <li><strong>Product companies</strong> pay 30-40% more than service/agency companies for the same experience level. This is often a bigger variable than city.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        For a deeper breakdown of what separates a &#x20B9;12L designer from a &#x20B9;30L designer beyond negotiation: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">that blog covers it</Link>.
      </p>

      <h2 id="river-framework" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The RIVER Framework: How We Coach Designers to Negotiate
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        At Xperience Wave, we have coached hundreds of designers through salary negotiations. Vaibhav used this approach. So did every designer in our mentorship programme who has successfully negotiated above their initial offer.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        We call it RIVER. Five steps that cover what happens before, during, and after the negotiation.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        R - Research
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Know the market before anyone asks you a number. Use Glassdoor, AmbitionBox, PayScale. Talk to people in similar roles. Cross-reference at least two sources. Know the range for your role, your city, your experience level.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        I - Identity Shift
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is where most designers fail before the conversation even starts. You are not a grateful applicant hoping for a chance. You are a service provider with a specific skill set, and the employer is the customer who needs that skill set. Your previous salary is what you charged the last customer - it is not relevant to this one. The next customer comes after more experience, a bigger role, different demands. The old number is not a valid anchor.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When I asked Bharat - a fresh engineering graduate who had completed a UX programme - why he was willing to accept no money for his first year, his answer was: &quot;I just want the designation.&quot; I asked him: are you doubting that you can actually do this role? Is that why? And that triggered something. He started asking: well, what can I ask for?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That is the identity shift. From &quot;I should be grateful for anything&quot; to &quot;What is the fair price for the service I am providing?&quot; Once a designer makes this shift, the negotiation changes completely - because the employer is the customer, and a good service provider does not let the customer set the price without understanding the market.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        V - Value Articulation
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Know what you bring and say it in one sentence. Not &quot;I am a hard worker.&quot; Specific. Measurable. Connected to what this organisation needs.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is where career switchers get it wrong most often. A designer came to me with eight years of professional experience - content writing for most of it, then switched to UX. She started as an intern at &#x20B9;4L because she felt her previous experience did not count. Three years later, she was at &#x20B9;7L when she should have been at &#x20B9;14-18L. The gap was not skill. It was that she never articulated the value of her transferable experience - stakeholder management, corporate communication, cross-functional collaboration. All of it relevant. None of it priced in.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        E - Exchange, Not Surrender
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Negotiation is a two-way exchange, not a plea. Present a researched range. Position yourself at the higher end. If base salary is fixed, negotiate ESOPs, signing bonus, paid breaks, a structured review at 6 months.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is exactly what Rahul did. He was offered &#x20B9;12L for a senior design role. Instead of accepting, he did his research, knew the market range, and asked about budget flexibility. He did not argue - he presented data. The final package: &#x20B9;18L, including ESOPs and a joining bonus. Same company, same role. &#x20B9;6L more - because he had one conversation that most designers skip.
      </p>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        R - Resolve
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Commit to your decision and move forward. Someone will always say you could have asked for more. Only you know the reality of the room. You know who you talked to. You know how the HR treated you. Make the call and stand by it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        And remember: if an organisation is not open to negotiation at all, they are telling you something about how they will treat you after you join.
      </p>

      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Want to practise these steps with a coach that never sleeps? Our free Salary Negotiation GPT walks you through the RIVER framework, generates personalised scripts, and even simulates an HR negotiation so you can practise before the real conversation.
      </p>
      <SalaryNegotiationGPTGate />

      <h2 id="scripts" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Scripts That Changed Real Outcomes
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        All five scripts plus a live negotiation simulator are available in our free Salary Negotiation GPT.
      </p>

      <h3 id="script-current-ctc" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Script 1 - When HR Asks &quot;What Is Your Current CTC?&quot;
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the most common trap in Indian hiring. &quot;What is your current CTC?&quot; is designed to anchor the offer against your existing salary, not your market value.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Think of it like this: you are a service provider. How much you charged the previous customer is not relevant to the next one. The next engagement comes after more experience. It could be a bigger scope. A different city. The old price is not valid.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>If your current salary is in a good range and anchoring against it will not hurt:</strong>
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;I am happy to share my full salary details once we both feel confident we want to work together. Right now, I think it is more productive to discuss the role and see if there is a mutual fit first.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>If you are pushed and the system requires a number:</strong>
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;My current CTC is &#x20B9;[X]. I want to be transparent. But anchoring my next offer against this number would not be appropriate - I have done market research for this role, this city, and this experience level, and the data says the range is &#x20B9;[Y] to &#x20B9;[Z]. I am looking at the higher end.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Why this works:</strong> You are honest about the number while immediately reframing the conversation from &quot;current + percentage&quot; to &quot;market value.&quot; HR respects this because it shows preparation, not entitlement.
      </p>

      <h3 id="script-low-offer" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Script 2 - When the Offer Comes in Below Your Researched Range
      </h3>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;Thank you for the offer. I am genuinely excited about this role. Based on my market research for [role] in [city] at [X years], I was expecting the base closer to &#x20B9;[Y]. Is there room to revisit?&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        <strong>If they say base is fixed:</strong>
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;I understand. Could we look at other ways to bridge the gap? I am open to ESOPs, a signing bonus, paid breaks, or a structured review at 6 months with a defined salary correction. I want to make this work.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is Rahul&apos;s playbook. Base at &#x20B9;12L, would not move. By asking about ESOPs and joining bonus, he turned the total package into &#x20B9;18L. Most organisations have more flexibility on benefits than base salary. If you do not ask, the answer is always no.
      </p>

      <h3 id="script-career-switcher" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Script 3 - When You Are a Career Switcher With a Low Current Salary
      </h3>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        &quot;My current compensation reflects my previous role in [content writing / development / marketing], which is a different function. This role requires UX-specific skills I have built through [programme / projects], plus [X years] of transferable professional experience in stakeholder management, cross-functional collaboration, and corporate communication. The market rate for this role in [city] is &#x20B9;[A] to &#x20B9;[B], and I believe that is a fair range.&quot;
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Why this works:</strong> You are not pretending the gap does not exist. You are explaining it and redirecting to transferable skills. The designer with eight years in content writing was not a beginner. She was a professional with a decade of corporate experience who had never learned to price it correctly. This script does the pricing for you.
      </p>

      <h2 id="what-not-to-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Not to Do
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><strong>Do not benchmark against a friend.</strong> &quot;My friend earns &#x20B9;12L so I should earn at least &#x20B9;12L&quot; is not a strategy. Your friend may be in a different city, industry, role. You are a service provider - your rate is set by the market and the value you bring, not by what someone else charges.</li>
        <li><strong>Do not use the 20-30% hike as your only anchor.</strong> If you are at &#x20B9;4L because of a career switch, 20% of &#x20B9;4L is &#x20B9;4.8L. That is still dramatically below market. Your next employer&apos;s offer should reflect the value of the role, not a percentage on a broken baseline.</li>
        <li><strong>Do not overdo it.</strong> You are going to work with these people after you join. Establish a good rapport. Know when to stretch and when to accept. If they genuinely cannot meet your number after a real conversation, that is okay. Sometimes businesses cannot reach good terms. Be okay letting go.</li>
        <li><strong>Do not accept without trying.</strong> Bharat was ready to work for free &quot;for the designation.&quot; The eight-year career-switcher accepted &#x20B9;4L because she was &quot;grateful for the opportunity.&quot; In both cases, the employer was the customer - and the service provider set the price at zero before the customer even made an offer. That is not humility. That is underpricing. And the market will hold you to it for years.</li>
        <li><strong>Do not doubt the outcome after.</strong> Someone will always say you could have asked for more. Only you know the reality. Make your decision and do not be fickle about it.</li>
      </ul>

      <h2 id="practise-tool" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Practise Before the Real Conversation
      </h2>
      <SalaryNegotiationGPTGate />

      <h2 id="what-to-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What to Do From Here
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your salary is below market and you have a job change or appraisal coming up, the single most valuable thing you can do is research your number before the conversation starts. Use the table above. Cross-reference Glassdoor and AmbitionBox. Talk to people in similar roles. Know your range before anyone asks.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        If you want help beyond negotiation - positioning yourself for the right role, not just the right number - that is what our 1:1 mentorship programme is designed for. Salary is one part. The bigger question is: what kind of designer are you, and what should you be earning for the value you bring? If that is where you are: <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">book a strategy call</a>.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li>Interview Guys / Harvard / NBER - 2024-2025 meta-review: 18.83% avg increase for those who negotiate.</li>
        <li>TheIndiaJobs.com - 68% of Indian professionals do not negotiate first offer; negotiators earn 7-12% more.</li>
        <li>Harvard PON (Marks &amp; Harold, 2009) - Starting salary difference compounds 10-15x over career at 5% annual raises.</li>
        <li>Glassdoor India - UX Designer Bangalore avg &#x20B9;10.3L (813 submissions, Feb 2026). Senior UX avg &#x20B9;15L. Lead UX avg &#x20B9;20L.</li>
        <li>Coursera/Glassdoor Salary Guide, Sep 2025 - UX Designer India avg &#x20B9;8L. Bangalore &#x20B9;10L. Mumbai &#x20B9;7L. Pune &#x20B9;8L.</li>
        <li>PayScale - Bangalore +19.8% above national avg. Gurgaon +16.6%. Delhi +12%. Chennai -9.8%. Hyderabad -4.5%.</li>
        <li>GeeksforGeeks/AmbitionBox - Lead/Senior UX: &#x20B9;8.9-35L avg &#x20B9;17L. Director UX: &#x20B9;18-55L avg &#x20B9;35L.</li>
        <li>SalaryInHand.in - Mid-level avg &#x20B9;13L. Senior at top companies &#x20B9;35-55L. Product cos pay 30-40% more than agencies.</li>
        <li>BATNA/ZOPA - Fisher &amp; Ury, &quot;Getting to Yes,&quot; 1981. Standard negotiation theory.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of design leadership experience and works directly with mid-senior designers through the mentorship programme. The RIVER framework and the negotiation scripts in this blog come from real coaching conversations with designers like Vaibhav, Rahul, and hundreds of others navigating job changes and appraisals in the Indian market. Names used with permission.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>On what separates a &#x20B9;12L designer from a &#x20B9;30L designer: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer Is Not Skill.</Link></li>
        <li>On the career phases that determine your ceiling: <Link href="/resources/blogs/ux-career-ladder-india" className="text-accent hover:underline font-medium">The UX Career Ladder Is Broken in India.</Link></li>
        <li>If you are not getting interview calls at all: <Link href="/resources/blogs/why-no-ux-interview-calls" className="text-accent hover:underline font-medium">Why You&apos;re Not Getting UX Interview Calls.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Murad, Co-founder &amp; Head of Design, Xperience Wave
      </p>

      <FreeTrainingCTA text="Before you negotiate, make sure you're positioned for the right role. Watch the training" />
    </>
  ),

  'inside-look-1-1-ux-mentorship': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        Sheetal became a Design Lead in 2 months. Shreekanth landed a Senior UX role at Wipro in 5 weeks. Kritika landed a Lead Designer role at a German company in 3 months. This is not what they learned. This is how they were taught.
      </p>

      <h2 id="we-say-no" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Before Anything: We Say No More Often Than You Think
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Not everyone who comes to us gets in. And not everyone should.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you cannot communicate professionally in English, we cannot prepare you for roles that require it. If your situation needs clinical support before career support, we will say so. If we assess that you are not in a position where mentorship will make a measurable difference right now, we will tell you that too.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We are not a course that takes your money and hopes you figure it out. We are a mentorship that takes responsibility for your outcome. And that means we need to believe we can actually help you before we start.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When we do believe it - you are locked in. You cannot escape the success you deserve anymore.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        What does &quot;help&quot; look like? It depends entirely on you. You want to earn more - we work on that. You want to shift into UX from another field - we build that transition. You want to become a design leader, manage a team, set up a design practice in your organisation, work outside India, navigate a difficult manager, get your work recognised, find more time for your family by getting more effective at work - we have mentors with 10-15 years of practitioner experience who have done this with hundreds of designers. At a 1:1 level. Not a classroom. Not a batch. You.
      </p>

      <h2 id="why-this-works" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why This Works When Courses Do Not
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most UX education in India follows the same model: pre-recorded content, generic assignments, a batch of 50-200 students, and a certificate at the end. The assumption is that if you consume enough content, you will be ready.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That assumption is wrong. And the proof is in every designer who has finished 3-5 courses and still cannot crack a senior role.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Our approach is built on how adults actually learn - not how content is conveniently delivered. Every principle below is grounded in established learning science. We did not invent these ideas. We applied them to UX career development in a way nobody else in India has.
      </p>

      <h3 id="principle-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 1: Diagnostic Before Prescription
      </h3>
      <p className="text-base md:text-lg text-g500 italic mb-4">
        (In learning science, this is called diagnostic assessment - understanding where the learner is before designing the path.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Before any teaching happens, your mentor sits with you and maps everything. Your career history. Your goals - short-term and long-term. Your blockers. Your strengths. Your weaknesses. Your available schedule. Your family commitments. Your current organisation&apos;s design maturity. The specific frustrations that made you seek help in the first place.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A designer came to us recently with 6+ years of experience, including 3 in graphic design. She had self-diagnosed her problems: imposter syndrome about leadership, low research exposure, gaps in storytelling, weak business thinking. Her list was accurate. But her conclusion about what to do next was wrong.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Her mentor pushed back. He looked at her career trajectory and told her that the path she was planning - while it could bring higher designations - would not attract the kind of organisations she actually wanted. That one conversation, before any &quot;teaching&quot; happened, changed her entire plan.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        No course does this. No cohort does this. A course delivers content. A mentor reads the person.
      </p>

      <h3 id="principle-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 2: Your Real Work Is the Learning Material
      </h3>
      <p className="text-base md:text-lg text-g500 italic mb-4">
        (This is situated learning - first described by Lave and Wenger in 1991. Learning that happens in the context where it will be applied transfers far more effectively than learning in artificial environments.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We do not give you fictional projects. If you are working at an organisation right now, your current project becomes the learning material. Your real stakeholders. Your real constraints. Your real users. Your real deadlines.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Why? Because the gap between &quot;I learned this in a course&quot; and &quot;I can do this at work&quot; is the gap that keeps designers stuck. When you learn research methods by conducting real interviews for your actual product, the skill sticks. When you learn stakeholder communication by navigating your actual manager, the learning is permanent.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Can you bring your current project into the sessions? Yes. That is actually preferred. That is where the reality of people, culture, and organisational constraints gets tested against what you are learning.
      </p>

      <h3 id="principle-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 3: Tools Are Learned Through the Work, Not Taught Separately
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We do not teach tools. Figma tutorials are the easiest thing to find on the internet. What we do is embed tools into activities so that you learn them by using them for something real.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In one session, you might set up Hotjar and explore how user behaviour data is captured and visualised. In another, you might use Claude or ChatGPT to build a custom agent that behaves like your user and answers questions about your product. In another, you might use HeyGen to document interaction patterns that feel distinctive.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The tool is learned because the activity requires it. Not because there is a tutorial on the syllabus. This is the difference between knowing a tool and knowing when and why to use it.
      </p>

      <h3 id="principle-4" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 4: The Mentor Adapts to How You Learn
      </h3>
      <p className="text-base md:text-lg text-g500 italic mb-4">
        (This is differentiated instruction combined with scaffolding - the mentor adjusts support based on the learner&apos;s pace and gradually removes it as competence grows.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Your activities are not the same as everyone else&apos;s. Your mentor is learning every passing day how you absorb information, where you struggle, and what makes things click for you.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The plan built in the first session is not rigid. If you are absorbing research methods faster than expected, the mentor accelerates. If stakeholder communication is harder than anticipated, the mentor spends more time there. If your organisation&apos;s culture creates a constraint that was not visible at the start, the plan adapts.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The sequence is calibrated so that you do not feel pushed hard enough to snap, and you do not feel like you are coasting. This calibration is something only a practitioner with 10+ years of experience can do. Someone who has managed teams, navigated organisational politics, coached hundreds of people, and can pattern-match your situation to outcomes they have seen before.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        That is why our mentors have 10-15 years of experience. Not for credentials on the website. Because a mentor who has never faced the challenge you are dealing with cannot coach you through it.
      </p>

      <h3 id="principle-5" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 5: You Are Never Alone Between Sessions
      </h3>
      <p className="text-base md:text-lg text-g500 italic mb-4">
        (This is social constructivism - Vygotsky&apos;s principle that learning is strengthened through interaction with peers at similar developmental stages.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The 1:1 sessions are the backbone. But the programme does not disappear between them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you are stuck, you are a chat or phone call away. When you have made progress on your activities, you can jump on a call and get clarity without waiting for the next scheduled session.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Weekly clinics.</strong> Live group sessions where you present your work, see what designers at your level are working on, and get feedback from peers and mentors. These are not webinars. They are working sessions - reviews, critiques, and exposure to how other people are solving similar problems. Mentees consistently tell us these are some of the most valuable hours in the programme.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <strong>Wave Academy.</strong> All reference materials, articles, lessons, assessments, and videos are available on our LMS platform. This is your library - it stays accessible throughout and after the programme.
      </p>

      <h3 id="principle-6" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Principle 6: The Programme Does Not End Until You Achieve Your Goal
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the one that separates us from everything else.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Courses end when the content ends. Cohorts end when the batch ends. Our programmes end when you achieve your stated goal. That is the conditional support guarantee.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Ripple</Link> (career transition) includes 1 month of conditional support beyond the 3-month programme. <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">Tide</Link> (design leadership) includes 3 months of conditional support. <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Current</Link> (mid-level to senior) is 3 months with continued support until your goal is met.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        80% of our mentees achieve their stated goal. Not a single metric like placement or salary hike - because goals are personal. Some want MAANG. Some want a product company. Some want to build their own practice. Some want to lead a team. Success means you achieved what you came for.
      </p>

      <h2 id="proof" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Proof: Real People, Real Timelines
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These are not hypothetical outcomes. These are designers who went through the programme and came out the other side with measurable results.
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><strong>Sheetal Pimparwar</strong> - Design Lead at CX100. 2 months.</li>
        <li><strong>Kritika Singh</strong> - Lead UX Designer at Synduct, Germany. 3 months.</li>
        <li><strong>Shreekanth</strong> - Sr. UX Designer at Wipro. 5 weeks.</li>
        <li><strong>Jerin John</strong> - Sr. Product Designer at CGI. 1.5 months.</li>
        <li><strong>Jonah Immanuel</strong> - Sr. Lead Designer at Infosys. 2 months.</li>
        <li><strong>Maulin Rajput</strong> - Sr. UX Designer at Augmented.AI. 90 days.</li>
        <li><strong>Radhakrishna A</strong> - Lead Designer to Principal Designer at Informatica. 4 months.</li>
        <li><strong>Pavitra Suji</strong> - Sr. Designer at McKinsey &amp; Company.</li>
        <li><strong>Vignesh</strong> - Sr. UX Designer at Siemens.</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every one of these designers went through the same philosophy: diagnostic assessment, real-work learning, adaptive mentoring, peer clinics, and support until the goal was achieved. The content of their programmes was different - because their situations were different. But the approach was the same.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Our mentees now work at JP Morgan, McKinsey, Intel, Deloitte, Accenture, Siemens, Bosch, Infosys, and more. The average salary hike across mentees whose goal included a compensation outcome is 38%.
      </p>

      <h2 id="programmes" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Three Programmes. Which One Fits You.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We run three mentorship programmes. Each is built for a different career stage. The philosophy is the same. The depth, focus, and support duration adapt to where you are.
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-base md:text-lg text-g600">
          <thead>
            <tr className="border-b-2 border-g200">
              <th className="text-left py-3 pr-4 font-bold text-carbon"></th>
              <th className="text-left py-3 pr-4 font-bold text-carbon"><Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline">Ripple</Link></th>
              <th className="text-left py-3 pr-4 font-bold text-carbon"><Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline">Current</Link> (Most Popular)</th>
              <th className="text-left py-3 pr-4 font-bold text-carbon"><Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline">Tide</Link></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4 font-bold text-carbon">For</td>
              <td className="py-3 pr-4">Fresh graduates or career switchers from any background</td>
              <td className="py-3 pr-4">Mid-level designers with 2+ years who want senior/leadership roles</td>
              <td className="py-3 pr-4">Designers ready to lead teams, manage, and drive strategic influence</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4 font-bold text-carbon">Duration</td>
              <td className="py-3 pr-4">3 months + 1 month support</td>
              <td className="py-3 pr-4">3 months + support until goal achieved</td>
              <td className="py-3 pr-4">3 months + 3 months support</td>
            </tr>
            <tr className="border-b border-g200">
              <td className="py-3 pr-4 font-bold text-carbon">Outcome</td>
              <td className="py-3 pr-4">First UX job. Portfolio + interview prep</td>
              <td className="py-3 pr-4">Senior/lead role. Better company. Salary hike. Portfolio + interview + negotiation</td>
              <td className="py-3 pr-4">Leadership role. Team management. Design practice setup. Evidence library + pipeline</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        ~80% of our mentees are on <Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Current</Link> - mid-level designers who know they are capable of more but have not been able to break through to senior roles. If that sounds like you, that is probably your programme.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Not sure? Book a free <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">strategy call</a> - 45 minutes, no obligations. We assess where you are, understand your goals, and recommend the right path. You walk away with clarity either way.
      </p>

      <h2 id="honesty" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What We Will Not Tell You
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We will not tell you that everyone succeeds. 80% do. That means 20% do not - and the reasons vary. Some do not put in the hours. Some face life situations that take priority. Some realise mid-programme that their goal has changed and need to restart the process. We are honest about this because pretending otherwise would be dishonest.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We will not tell you it is easy. The programme demands 5-8 hours per week of real work - not passive video watching, but activities, research, interviews, case studies, and presentations. If you are looking for something you can do in the background while watching Netflix, this is not it.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We will not tell you the mentor will do the work for you. The mentor provides the diagnosis, the plan, the activities, the review, the direction, and the push. You provide the effort. That is the deal.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        But if you show up and do the work - the system works. Sheetal did it in 2 months. Shreekanth in 5 weeks. Kritika landed a Lead role at a German startup. Radhakrishna went from Lead to Principal at Informatica. The system works when you work it.
      </p>

      <h2 id="strategy-call" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Happens Next
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You have read the blogs. You have seen the success stories. You have read the inside look. Now you know the philosophy, the principles, and the proof.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The next step is a conversation. The strategy call is 45 minutes. Free. No obligations. We assess where you are, understand your goals, identify your gaps, and recommend the right programme. You walk away with clarity - whether you join or not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you have been thinking about this for weeks or months - this is the step.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book your strategy call</a>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-4">
        Or explore the programmes directly:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Current - For mid-level designers ready for senior roles (Most Popular)</Link></li>
        <li><Link href="/programs/career-transition-ux-mentorship" className="text-accent hover:underline font-medium">Ripple - For career transition into UX</Link></li>
        <li><Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">Tide - For design leadership</Link></li>
      </ul>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-8">
        <li><strong>Diagnostic Assessment</strong> - Standard pedagogical practice in adaptive learning design. Understanding the learner&apos;s current state before designing the learning path.</li>
        <li><strong>Situated Learning</strong> - Lave, J. &amp; Wenger, E. (1991). &quot;Situated Learning: Legitimate Peripheral Participation.&quot; Cambridge University Press. Learning in the context where it will be applied transfers more effectively than abstract instruction.</li>
        <li><strong>Differentiated Instruction + Scaffolding</strong> - Vygotsky, L.S. (1978). &quot;Mind in Society.&quot; Zone of Proximal Development. Support calibrated to the learner&apos;s level and gradually removed as competence grows.</li>
        <li><strong>Social Constructivism</strong> - Vygotsky, L.S. (1978). Learning strengthened through interaction with peers at similar developmental stages. The theoretical basis for the weekly clinic model.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Almas Tasneem is Co-founder and CEO at Xperience Wave, a UX design career development company based in Bangalore. She leads sales, strategy, client success, and the mentorship programme operations. The principles and outcomes described in this blog come from direct work with 140+ designers across the Ripple, Current, and Tide programmes. 3,000+ designers consulted. 80% of mentees achieved their stated goals.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>On what separates a &#x20B9;12L designer from a &#x20B9;30L designer: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer Is Not Skill.</Link></li>
        <li>On preparing for the IC-to-manager transition: <Link href="/resources/blogs/ic-to-manager-trap-designers" className="text-accent hover:underline font-medium">The IC-to-Manager Trap: Why Great Designers Fail as Design Leaders.</Link></li>
        <li>On negotiating your salary with data and scripts: <Link href="/resources/blogs/salary-negotiation-ux-designers-india" className="text-accent hover:underline font-medium">Salary Negotiation for UX Designers: Scripts, Data, and What Actually Works in India.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas, Co-founder &amp; CEO, Xperience Wave
      </p>
    </>
  ),

  'hidden-cost-promoting-ic-designer-manager': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-8">
        You did not just get a bad manager. You lost your best designer. That is two losses in one decision.
      </p>

      <h2 id="promotion-breaks" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Promotion That Breaks Two Things at Once
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A design leader we work with described the moment he knew the promotion was a mistake. Not for himself - for the entire team.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        He had been the strongest individual contributor on the team. Fastest delivery. Highest quality. Best stakeholder feedback scores. The obvious choice for the open manager role. So the organisation promoted him.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Within six weeks, two things happened simultaneously. The project he had been carrying as an IC - the one that was on track specifically because of his personal output - started slipping. Nobody on the team could produce at the level he had been producing. And the team he was now supposed to manage started losing direction. He did not know how to delegate. He did not know how to run a strategy conversation in business language. He did not know how to develop the people reporting to him.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The organisation lost its best contributor and gained an untrained manager. Two losses in one decision. And it took six months to see the full cost.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is not an unusual story. We see this pattern across every organisation we work with - from 20-person startups to 500-person product companies. It is the single most expensive people decision design teams make, and most organisations do not even recognise it as a cost.
      </p>

      <h2 id="the-numbers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Numbers That Should Concern Every Design Leader
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is not a soft problem. It is a measurable, expensive one.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Managers account for 70% of the variance in team engagement.</strong> That is Gallup&apos;s number, from the State of the Global Workplace report, replicated across thousands of business units worldwide. When a manager is disengaged or ineffective, the team&apos;s engagement collapses - and engagement is directly tied to productivity, quality, and retention.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>50% of employees have quit a job specifically because of a bad manager.</strong> Gallup surveyed over 7,000 professionals and found that half of them had resigned - put in notice and walked out - because of their direct manager. Not because of the company. Not because of the work. Because of the person managing them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Employees under ineffective managers are 37% more likely to leave.</strong> DecisionWise research found that negative perception of a manager is the single strongest predictor of voluntary turnover - stronger than compensation, benefits, or career path.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Replacing a manager-level employee costs 1-2x their annual salary.</strong> SHRM estimates that the total cost of losing a managerial employee - recruiting, onboarding, ramp-up, lost productivity - runs between 90% and 200% of their annual compensation. For a design manager earning &#x20B9;25-40L, that is &#x20B9;22L to &#x20B9;80L per failed transition.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Global employee engagement fell to 21% in 2024.</strong> Gallup&apos;s 2025 report found that manager engagement specifically dropped from 30% to 27%, and that this decline is the primary driver of overall engagement collapse. The estimated cost: $438 billion in lost productivity globally.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        When you promote your best IC designer to manager without preparation, you are not just risking one person&apos;s career. You are risking the engagement, retention, and output of every person on their team.
      </p>

      <h2 id="why-mistake" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Why Organisations Keep Making This Mistake
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The logic seems sound. Your best designer understands the work better than anyone. They have the respect of the team. They deliver consistently. They seem like the natural choice.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        But the logic is based on a flawed assumption: that the skills that make someone excellent at producing design work are the same skills needed to lead a design team. They are not. In most cases, they are in direct conflict.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-4">
        An IC&apos;s job: Assess a situation, adapt, and deliver the best possible output individually.
      </blockquote>
      <blockquote className="border-l-4 border-accent pl-5 italic text-base md:text-lg text-g600 mb-6">
        A manager&apos;s job: Enable a team of people with different speeds, skills, and motivations to deliver collective output that exceeds what any one of them could produce alone.
      </blockquote>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These are fundamentally different competencies. And the Benson, Li, and Shue study across 131 firms and nearly 40,000 workers proved it empirically: the best individual performers, once promoted, were associated with a 7.5% decline in the performance of the people they managed. The better the IC, the worse the manager - when the transition is untrained.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The Chartered Management Institute calls this the &quot;accidental manager&quot; problem. Their research found that 82% of managers enter their roles without any formal management or leadership training. They are promoted because they were good at the previous job, available, or popular - not because they were prepared for the next job.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        In design teams, this problem is amplified. Design leadership requires a specific combination of skills that are rarely developed through IC work alone: stakeholder translation, strategic communication in business language, team motivation, delegation, and cross-functional navigation. None of these appear in the job description of an individual contributor.
      </p>

      <h2 id="failed-transition-cost" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the Failed Transition Actually Costs Your Organisation
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When the promotion goes wrong, it does not fail quietly. It fails in two specific patterns, and both have measurable organisational costs.
      </p>

      <h3 id="pattern-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Pattern 1: The Pass-Through Manager
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The new manager becomes a relay between leadership and the design team. Leadership decisions go down. Team output goes up. The manager adds no perspective, no pushback, no strategic value. They are a human forwarding address.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The organisational cost: Design loses its seat at the strategy table. Not because design was excluded - because no one is representing it. Product and engineering decisions get made without design input. The design team&apos;s work becomes reactive - executing briefs rather than shaping direction. Over two to three quarters, the organisation&apos;s design maturity regresses visibly. Stakeholders start bypassing the design team entirely because the output has become predictable and unchallenging.
      </p>

      <h3 id="pattern-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Pattern 2: The Manager Who Keeps Delivering
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The promoted IC cannot stop producing. They pick the most interesting problem and go deep - designing, prototyping, solving. They are doing excellent individual work. But they are doing it at the cost of everything a manager is supposed to do.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The organisational cost: Strategy alignment with business stakeholders - neglected. Team performance management - absent. Resource allocation across projects - overlooked. Quality control on deliverables outside their personal focus - unchecked. The team starts operating as a collection of individuals rather than a coordinated function. Junior designers stall because nobody is developing them. Senior designers leave because they see no leadership worth following.
      </p>

      <h3 id="compounding-cost" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        The compounding cost
      </h3>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The promoted IC is unhappy (they miss the recognition and clarity of IC work).</li>
        <li>The team is disengaged (70% of their engagement was determined by this one person).</li>
        <li>The best people on the team start interviewing elsewhere (37% higher turnover probability).</li>
        <li>The organisation spends 1-2x annual salary to replace each person who leaves.</li>
        <li>Design&apos;s credibility with leadership erodes. Budget conversations become harder. The next hire is positioned as &quot;the person who will fix design.&quot;</li>
      </ul>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        This is the cascade. It does not happen overnight. It happens over two to three quarters, and by the time it is visible, the damage is structural.
      </p>

      <h2 id="loss-nobody-counts" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Loss Nobody Counts: The IC Who Will Never Lead Again
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        There is a third cost that does not appear on any balance sheet. The promoted designer - the one who failed in the transition - does not just go back to being an IC. They go back as someone who has concluded, permanently, that they are not built for leadership.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        We see this in our mentorship work constantly. Designers with seven, nine, twelve years of experience who tell us they want to stay as individual contributors. When we push deeper, the story is almost always the same: they were thrown into a manager role once, without preparation. It went badly. They decided it is not for them.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That conclusion is wrong. They were not unfit. They were unprepared. But the scar is real, and for many of them, it is permanent. The organisation that promoted them prematurely did not just lose a manager. They permanently removed a future leader from the pipeline.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        (We wrote about this in detail from the designer&apos;s perspective: <Link href="/resources/blogs/ic-to-manager-trap-designers" className="text-accent hover:underline font-medium">The IC-to-Manager Trap: Why Great Designers Fail as Design Leaders</Link>. If you manage a design team, reading both perspectives will give you the full picture.)
      </p>

      <h2 id="what-to-do" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What Organisations Should Do Instead
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The answer is not to stop promoting ICs into leadership. The answer is to stop promoting them unprepared.
      </p>

      <h3 id="step-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        1. Separate the Promotion Decision from the Readiness Decision
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Being the best IC on the team is not evidence of readiness for management. It is evidence of IC excellence. Treat them as two different assessments. Evaluate the candidate specifically for delegation skill, strategic communication, team development capability, and cross-functional navigation - not output quality.
      </p>

      <h3 id="step-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        2. Invest in Transition Training Before the Title
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        The CMI research is clear: organisations that invest in formal management training see a 23% increase in organisational performance and a 32% increase in employee engagement and productivity. The training needs to happen before the promotion, not after it. Once someone is in the seat and struggling, the damage to their confidence and the team&apos;s trust is already underway.
      </p>

      <h3 id="step-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        3. Build Design Leadership Skills Systematically
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design leadership is not generic management. It requires specific skills: translating design value into business language, navigating stakeholders who do not understand or respect design, building and maintaining design maturity in an organisation that was not built for it, and developing a team of people with very different skill profiles and career aspirations.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        These are trainable skills. But they require structured intervention - not a two-hour workshop, not a book recommendation, not &quot;observe how the current manager does it.&quot;
      </p>

      <h3 id="step-4" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        4. Create an IC Leadership Track That Is Not a Consolation Prize
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Many organisations offer an IC track as an alternative to management. But it is often a dead-end path with no real progression, no strategic influence, and no salary growth beyond a ceiling. If your IC track is a consolation prize, your best people will either leave or reluctantly accept a management role they are not ready for. Neither outcome serves the organisation.
      </p>

      <h2 id="training-problem" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        This Is a Training Problem, Not a Hiring Problem
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most organisations try to solve this by hiring external design managers. That works sometimes. But it does not solve the systemic issue: your internal pipeline of future design leaders remains empty. Every time you promote from within, the same failure pattern repeats.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The fix is training. Structured, design-specific leadership development that prepares your ICs for the transition before they step into the role. Not generic management courses. Not mentoring programmes that depend on the quality of whoever happens to be senior. A deliberate curriculum that builds the specific muscles design leaders need.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        That is what our corporate training programme is built for. We work with design teams at funded SMEs - typically 5 to 50 designers - and close the gap between IC excellence and leadership readiness. The programme is built on real patterns from our work with hundreds of designers, not on management theory.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If your design team has a promotion decision coming up and you want to make sure it does not become the two-loss scenario described in this blog: <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">book a training call</Link>. We will assess your team&apos;s current state and tell you honestly whether training can close the gap or whether the timeline requires a different approach.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        <Link href="/programs/ux-leadership-mentorship" className="text-accent hover:underline font-medium">Explore the Tide leadership mentorship programme</Link>
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>Gallup - State of the Global Workplace 2025 Report. Managers account for 70% of variance in team engagement. Manager engagement dropped from 30% to 27% in 2024. $438B global productivity cost.</li>
        <li>Gallup - Survey of 7,272 professionals: 50% quit because of a bad manager. 52% of voluntary exits say the manager could have prevented their departure.</li>
        <li>DecisionWise - Employees with negative perception of their manager are 37% more likely to leave.</li>
        <li>SHRM - Replacement cost for managerial employees: 90-200% of annual salary. Average cost per hire: $4,700. Average time to fill: 42 days.</li>
        <li>CMI - Better Managed Britain Report, 2023: 82% of managers enter role without formal training. Organisations investing in management development see 23% increase in performance, 32% increase in engagement.</li>
        <li>Benson, Li, Shue - &quot;Promotions and the Peter Principle,&quot; QJE, 2019. 39,000+ workers across 131 firms. Top IC performers associated with 7.5% decline in subordinate performance post-promotion.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Almas Tasneem is Co-founder and CEO at Xperience Wave, a UX design career development company based in Bangalore. She leads sales, strategy, client success, and the corporate training programme. The patterns in this blog come from direct work with design teams at product companies across India - from funded startups to mid-sized enterprises. When a design team&apos;s growth stalls, the cause is almost always traceable to one of the patterns described here.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>The designer&apos;s perspective on this exact transition: <Link href="/resources/blogs/ic-to-manager-trap-designers" className="text-accent hover:underline font-medium">The IC-to-Manager Trap: Why Great Designers Fail as Design Leaders.</Link></li>
        <li>When senior designers have the title but not the influence: <Link href="/resources/blogs/senior-ux-designer-delivery-person" className="text-accent hover:underline font-medium">You&apos;re a Senior Designer in Title. You&apos;re Still Being Treated Like a Delivery Person.</Link></li>
        <li>On the real difference between mid-level and senior compensation: <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">The Difference Between a &#x20B9;12L and &#x20B9;30L UX Designer Is Not Skill.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
        - Almas, Co-founder &amp; CEO, Xperience Wave
      </p>
    </>
  ),

  'design-team-systems-problem': (
    <>
      <p className="text-lg md:text-xl text-g600 leading-relaxed mb-6">
        You hired good designers. They went through a rigorous interview process. They demonstrated strategic thinking. Then they joined your organisation and stopped being strategic. The problem is not what you think it is.
      </p>

      <h2 id="three-complaints" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Three Complaints I Hear Every Time
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When a design leader, a VP of product, or a founder comes to us about their design team, the complaint is almost always one of these three. Sometimes all three.
      </p>

      <h3 id="complaint-1" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Complaint 1: &quot;My designers are not strategic enough.&quot;
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        They keep delivering screens instead of thinking about the problem. They wait for briefs instead of shaping direction. They never push back on product. They produce what is asked, on time, to spec - and that is exactly the problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I have sat in sprint meetings where the design team was giggling and comfortable. When I dug deeper, the reason was always the same: they were following instructions word for word. Product gave a brief. They executed. Nobody argued. Everyone was praised. The system rewarded compliance. So the team complied.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey&apos;s Design Index research across 300 companies found that 60% of design-and-development decisions in large organisations are made by a small number of employees in isolation - meaning designers are excluded from the very decisions they are then asked to execute. When you exclude someone from the thinking and then blame them for not thinking, that is not a skills problem. That is a systems problem.
      </p>

      <h3 id="complaint-2" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Complaint 2: &quot;Our design quality is inconsistent.&quot;
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        One project looks polished. Another looks like a different company made it. There is no shared design language, no consistent interaction patterns, no standard for what &quot;done&quot; looks like. The output feels like it was produced by five separate freelancers rather than a team.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        In engineering, this does not happen. Why? Because code reviews are non-negotiable. Every piece of code gets reviewed against standards before it ships. There is a process, a cadence, a definition of quality.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most design teams have nothing equivalent. Designs go from one person&apos;s screen to a Jira ticket without a structured review. No peer critique. No quality checkpoint. No shared criteria. Every designer operates as an island. The inconsistency is not because some designers are better than others. It is because no system exists to calibrate quality across the team.
      </p>

      <h3 id="complaint-3" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        Complaint 3: &quot;We cannot retain senior designers.&quot;
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        You hire good people. They perform well for 12&ndash;18 months. Then they leave. You assume it is compensation or a better offer. It rarely is.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Gallup&apos;s research on team performance found that clarity of expectations is the single most basic employee need. When designers do not know what growth looks like, do not have a career progression framework, do not receive structured development feedback, and cannot see a path from where they are to where they want to be - they leave. Not because they found a better salary. Because they found a system that develops them. (The blog on <Link href="/resources/blogs/12l-vs-30l-ux-designer-difference" className="text-accent hover:underline font-medium">the difference between a &#x20B9;12L and &#x20B9;30L designer</Link> is partly about this - the gap is often not skill, but the system that develops or fails to develop that skill.)
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When a senior designer leaves, the cost is 1&ndash;2x their annual salary in replacement, onboarding, and ramp-up time (SHRM). But the real cost is invisible: the institutional knowledge they take with them, the relationships they built with stakeholders, and the 6&ndash;12 months before their replacement produces equivalent output.
      </p>

      <h2 id="same-designers" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        The Same Designers. The Same Skills. Completely Different Output.
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Here is the test that proves whether you have a skills problem or a systems problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Think about the designers on your team. Now imagine them at a design-mature organisation - one with structured design reviews, a seat at the strategy table, clear role definitions, an established research practice, and a leadership team that understands design&apos;s value. Would those same designers produce better work there?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If the answer is yes - and it almost always is - your problem is not the designers. It is the system they operate within.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        McKinsey confirmed this at scale. They tracked 300 companies over five years and found that top-quartile design companies grew revenue 32% faster and total shareholder returns 56% faster than their peers. The difference was not that these companies hired better individual designers. It was that they built better systems for design: executive-level design leadership, cross-functional integration, continuous user research, and iterative processes. The McKinsey Design Index measures the system, not the people. And the system is what determines the output.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Deloitte&apos;s 2025 Global Human Capital Trends research puts a number on the gap: 93% of leaders say moving from rigid structures to flexible, skill-based systems is important to their success. Only 19% say their organisation is actually ready for it. That 74-percentage-point gap between knowing and doing is where most design teams are stuck.
      </p>

      <h2 id="what-system-missing" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        What the System Is Actually Missing
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Every complaint traces back to one or more of these five missing systems. These are not theoretical frameworks. These are the specific infrastructure gaps I see when I work with design teams at product companies - from 20-person startups to 500-person enterprises.
      </p>

      <h3 id="missing-review" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If the symptom is inconsistent quality &rarr; You are missing a design review cadence.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        A design review is not &quot;show your work and get compliments.&quot; It is a structured, recurring session where design work is evaluated against explicit criteria: Does this solve the stated problem? Is the interaction pattern consistent with the design system? What does the research say? What trade-offs were made, and why?
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Without this cadence, quality is determined by the individual designer&apos;s judgment and the preferences of whichever stakeholder happens to be in the room. Some designers are stronger than others - but without a shared standard, even the strongest designer&apos;s work drifts.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What a functioning system looks like:</strong> A 30&ndash;45 minute weekly review. Rotating presenters. Specific feedback criteria documented and shared. Attendance from at least one lead or manager who maintains the quality bar. Non-negotiable cadence - not cancelled when the sprint gets busy, because that is exactly when quality slips most.
      </p>

      <h3 id="missing-stakeholder" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If the symptom is &quot;designers are not strategic&quot; &rarr; You are missing a stakeholder integration protocol.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design cannot be strategic if it enters the process after the strategy is already decided. In most organisations, product defines the problem, engineering scopes the solution, and design receives a ticket. By the time the designer sees the work, the strategic decisions have been made. There is nothing left to be strategic about.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is the printer-not-author pattern. Design&apos;s job is to give the brief visual shape and deliver. Not to question whether the brief is right. Not to challenge the problem definition. Not to propose a different approach. The system has defined design&apos;s role as execution, and then leadership is surprised when the execution is not strategic.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Fewer than 5% of the companies McKinsey surveyed had leaders who could make objective design decisions. If the people approving design work cannot evaluate design thinking, the feedback loop incentivises visual polish over strategic depth. Designers learn very quickly what gets praised and what gets ignored. If the system praises compliance, it gets compliance.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What a functioning system looks like:</strong> Design enters before the brief is finalised - ideally at the problem definition stage. There is a defined moment where design contributes to scoping, not just execution. Joint reviews between design and engineering happen before handoff, not after. Design has documented authority to question the brief and propose alternatives. This is not about giving design veto power. It is about giving design a voice before the decisions are locked.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        On getting design into the room where strategy happens: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table as a UX Designer.</Link>
      </p>

      <h3 id="missing-role-clarity" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If the symptom is role confusion &rarr; You are missing role clarity between IC, Lead, and Manager.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Ask five people on a design team who is responsible for what, and you will get five different answers. The IC is doing lead work without the title or the pay. The lead is doing IC work because they enjoy it and nobody told them to stop. The manager is a pass-through - relaying decisions from leadership to the team and output from the team to leadership, adding no strategic value in either direction.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        These are the conveyor belt and one-person army patterns - and they are systems failures, not individual failures. The organisation never defined what each role owns. So everyone defaults to what is comfortable. Comfort does not produce growth, and ambiguity does not produce accountability.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What a functioning system looks like:</strong> Written role definitions. What does an IC own (individual project delivery, craft quality, personal skill development)? What does a lead own (design direction for a product area, cross-project consistency, mentoring ICs)? What does a manager own (team performance, stakeholder relationships, hiring, career development, process design)? Where do responsibilities overlap, and who has the final call? These definitions should be documented, shared with the team, and referenced in performance reviews.
      </p>

      <h3 id="missing-maturity" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If the symptom is design not being taken seriously &rarr; You are missing a design maturity roadmap.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Most organisations do not know what design maturity means. They hired designers. They gave them projects. They expected the quality of design to improve automatically. It did not.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Design maturity is not a designer&apos;s individual skill. It is an organisational capability. It requires investment in research infrastructure, stakeholder education, process definition, and leadership alignment. Without a roadmap, the design team operates at whatever maturity level the organisation defaults to - which is usually somewhere between &quot;make it look good&quot; and &quot;we trust design to handle the visuals.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        I have worked with design teams at organisations where UX was introduced two and a half years ago into a company with legacy products. The team exists, but design maturity is thin. Research is evaluative, not exploratory - the team validates decisions already made rather than informing decisions yet to be made. Product delivers information in chunks and does not treat design as an equal partner. The culture is not hostile to design. It just has no system for integrating design at a strategic level. That is a maturity gap, not a talent gap.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What a functioning system looks like:</strong> An honest assessment of where your organisation sits on a design maturity model (Nielsen Norman Group&apos;s is a good starting point). A 6- and 12-month roadmap that identifies the specific gaps: Is it research infrastructure? Stakeholder buy-in? Process definition? Executive understanding of what design contributes beyond visuals? The roadmap addresses the organisation, not just the team - because design maturity is an org-level problem that cannot be solved by training designers alone.
      </p>

      <h3 id="missing-growth" className="font-heading text-xl md:text-2xl font-bold text-carbon mt-8 mb-3">
        If the symptom is losing senior designers &rarr; You are missing a feedback and growth system.
      </h3>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        When designers do not know what &quot;good&quot; looks like at the next level, do not receive structured development feedback, and cannot see a career path - they leave. The departure looks like a retention problem. It is actually a development system problem.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Only 20% of C-suite leaders strongly agree that their HR function and workforce practices improve worker performance (Deloitte, 2025). That means in 80% of organisations, the systems that are supposed to develop people are not working. Designers experience this as stagnation: they are doing the work, getting decent reviews, but not growing. The organisation has no mechanism to close the gap between current performance and next-level readiness.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This is also where the IC-to-manager transition breaks. The organisation promotes a strong IC into management without preparation, the transition fails, and the designer concludes they are not built for leadership. The hidden cost of that pattern is two losses in one decision: you lose your best IC and gain an untrained manager. Both losses are systems failures. On what happens when that promotion goes wrong: <Link href="/resources/blogs/hidden-cost-promoting-ic-designer-manager" className="text-accent hover:underline font-medium">The Hidden Cost of Promoting Your Best IC Designer to Manager.</Link>
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>What a functioning system looks like:</strong> A defined competency framework for each level (IC, lead, manager). Quarterly development conversations that are about growth, not status updates. A career ladder that is documented, shared, and connected to real progression criteria - not just years of experience. Recognition structures that make designers feel seen. If you do not have a system for developing people, the people you develop will be developed by someone else.
      </p>

      <h2 id="audit" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Audit Your Design Team&apos;s Systems
      </h2>
      <SystemsAuditGate />

      <h2 id="how-to-fix" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        How to Fix the System Without Replacing the Team
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The instinct when design output is underwhelming is to fire and rehire. Get better people. Find designers who are &quot;more strategic.&quot;
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        This almost never works. The new designers enter the same system, face the same incentives, produce the same output within six months. You have spent the replacement cost (1&ndash;2x annual salary per person, per SHRM) and changed nothing. The cycle repeats.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Instead, approach it the way you would any other business system that is underperforming:
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Diagnose before you prescribe.</strong> Use the audit above. Identify which of the five systems are missing or broken. Be honest - most organisations are missing at least three.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Fix one system first.</strong> You do not need to transform everything at once. Pick the system causing the most visible damage. Usually it is stakeholder integration (design is excluded from decisions) or review cadence (quality is inconsistent). Fix one. Let the team experience what a functioning system feels like. The impact is visible within one quarter.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Invest in systems training, not just skills training.</strong> The gap is rarely that your designers cannot use Figma or run a usability test. The gap is that nobody in the organisation knows how to set up the infrastructure where design can function at its full potential. That is a leadership and organisational design challenge - not a &quot;send them to a workshop&quot; challenge.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        <strong>Measure the system, not just the output.</strong> Track whether design enters the process before or after scoping. Track whether design reviews happen weekly. Track whether career development conversations are scheduled quarterly. Track whether role definitions exist. If you only measure what the team produces, you will keep blaming the team. If you measure the system, you can fix the system.
      </p>

      <h2 id="if-this-is-your-team" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        If This Sounds Like Your Team
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        If you recognised your organisation in two or more of the symptoms above, the problem is diagnosable and fixable. It does not require replacing your team. It requires building the systems your team needs to operate at full capacity.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        Our <Link href="/for-business/training-for-teams" className="text-accent hover:underline font-medium">corporate training programme</Link> is built for exactly this. We work with design teams at funded product companies and help them build design-specific systems: review cadences, stakeholder integration protocols, role definitions, maturity roadmaps, and leadership development for the people managing the team. Not generic management training. Systems that make your existing designers more effective.
      </p>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-6">
        The conversation starts with a systems audit. <a href="https://app.xperiencewave.com/book/dc-strategy-call" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Book a training call</a> and we will assess which systems are missing and what it takes to build them.
      </p>

      <h2 id="sources-references" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Sources &amp; References
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>McKinsey &amp; Company - &quot;The Business Value of Design,&quot; October 2018. 300 companies, 5 years, 2M+ data points. Top-quartile design: +32% revenue, +56% TRS. &lt;5% of leaders can make objective design decisions. 60% of design decisions made in isolation.</li>
        <li>McKinsey - &quot;Are You Asking Enough from Your Design Leaders?&quot; February 2020. 200 design leaders + 100 executives. 90% not reaching design&apos;s full potential. Only 10% at highest maturity. Only 14% set quantified design targets.</li>
        <li>Deloitte - 2025 Global Human Capital Trends. 93% say flexible structures important vs 19% ready. Only 20% of C-suite strongly agree HR practices improve performance.</li>
        <li>Gallup - &quot;State of the American Manager.&quot; Clarity of expectations is most basic employee need. 70% of team engagement variance attributable to the manager.</li>
        <li>SHRM - Managerial replacement cost: 90&ndash;200% of annual salary.</li>
        <li>Xperience Wave - direct observation from corporate training engagements with design teams at product companies across India.</li>
      </ul>

      <h2 id="about-author" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        About the Author
      </h2>
      <p className="text-base md:text-lg text-g600 leading-relaxed mb-8">
        Murad is Co-founder and Head of Design at Xperience Wave, a UX design career development company based in Bangalore. He has 13+ years of design leadership experience across fintech, healthtech, and industrial technology. The systems patterns in this blog come from direct work with design teams at product companies across India through XW&apos;s mentorship and corporate training programmes.
      </p>

      <h2 id="read-next" className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-10 mb-4">
        Read Next
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-g600 mb-6">
        <li>On what happens when you promote your best IC without preparation: <Link href="/resources/blogs/hidden-cost-promoting-ic-designer-manager" className="text-accent hover:underline font-medium">The Hidden Cost of Promoting Your Best IC Designer to Manager.</Link></li>
        <li>On getting design a seat at the strategy table: <Link href="/resources/blogs/ux-designer-product-strategy-table" className="text-accent hover:underline font-medium">How to Get a Seat at the Product Strategy Table as a UX Designer.</Link></li>
        <li>On the conversations that separate senior designers from the rest: <Link href="/resources/blogs/conversations-senior-designers-have" className="text-accent hover:underline font-medium">5 Conversations Senior Designers Have That Junior Designers Don&apos;t.</Link></li>
      </ul>

      <p className="text-base md:text-lg text-g500 italic mt-6">
       - Murad, Co-founder &amp; Head of Design, Xperience Wave
      </p>
    </>
  ),
};

// Table of contents for each blog post
const blogTableOfContents: Record<string, { id: string; title: string }[]> = {
  'personal-ai-workflow-designer': [
    { id: 'deliverable-vs-outcome', title: 'The Filter: Deliverable vs Outcome' },
    { id: 'building-the-workflow', title: 'Building the Workflow: Activity by Activity' },
    { id: 'three-principles', title: 'Three Principles That Keep It Coherent' },
    { id: 'realistic-week', title: 'What a Realistic Week Looks Like' },
    { id: 'start-here', title: 'Start Here' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'what-should-design-team-look-like-2026': [
    { id: 'question-nobody-asking', title: 'The Question Nobody Is Asking Honestly' },
    { id: 'not-everything-about-ai', title: 'Not Everything Is About AI' },
    { id: 'four-functions', title: 'The Four Functions Every Design Team Needs' },
    { id: 'specialist-question', title: 'The Specialist Question: Who Is at Risk?' },
    { id: 'team-size-structure', title: 'Team Size and Structure' },
    { id: 'three-mistakes', title: 'Three Mistakes Leaders Are Making' },
    { id: 'team-that-survives', title: 'The Team That Survives' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'evaluating-ai-tools-design-leaders-framework': [
    { id: 'speed-first-problem', title: 'The Problem With Speed-First Evaluation' },
    { id: 'purpose-first-framework', title: 'The Purpose-First Framework' },
    { id: 'evaluation-checklist', title: 'The Evaluation Checklist' },
    { id: 'download-directory', title: 'AI Tools Directory + Scorecard' },
    { id: 'capability-erosion', title: 'The Capability Erosion Risk' },
    { id: 'uncomfortable-truth', title: 'The Uncomfortable Truth' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'hiring-senior-designers-immature-design-org': [
    { id: 'not-rare-problem', title: 'This Is Not a Rare Problem' },
    { id: 'why-orgs-mistake', title: 'Why Organisations Make This Mistake' },
    { id: 'five-things-wrong', title: 'The Five Things That Go Wrong' },
    { id: 'what-leaders-should-do', title: 'What Leaders Should Do Instead' },
    { id: 'what-designers-should-do', title: 'What Designers Should Do' },
    { id: 'cost-is-real', title: 'The Cost Is Real - For Both Sides' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'ux-research-never-makes-it-into-roadmap': [
    { id: 'core-problem', title: 'The Core Problem: Process vs Purpose' },
    { id: 'isolation-trap', title: 'Why This Keeps Happening: The Isolation Trap' },
    { id: 'what-data-says', title: 'What the Data Says' },
    { id: 'five-reasons', title: 'Five Reasons Research Dies' },
    { id: 'blueprint', title: 'The 5-Step Research Integration Blueprint' },
    { id: 'shift', title: 'The Shift That Changes Everything' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'stakeholder-management-for-designers': [
    { id: 'why-not-optional', title: 'Why Stakeholder Management Is Not Optional' },
    { id: 'know-your-audience', title: 'Know Who You Are Talking To' },
    { id: 'five-scenarios', title: 'The Five Scenarios That Break Designers' },
    { id: 'you-are-stakeholder', title: 'The Flip Side: You Are a Stakeholder Too' },
    { id: 'challenging-stakeholders', title: 'Handling Challenging Stakeholders' },
    { id: 'communication-rhythm', title: 'Building a Communication Rhythm' },
    { id: 'best-designers', title: 'What the Best Designers Do Differently' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'related-reading', title: 'Related Reading' },
  ],
  'ux-career-ladder-levels-india': [
    { id: 'year-0-2', title: 'Year 0-2: Associate / Junior' },
    { id: 'year-2-3', title: 'Year 2-3: UX Designer' },
    { id: 'year-3-5', title: 'Year 3-5: Senior UX Designer' },
    { id: 'year-5-7', title: 'Year 5-7: Lead Designer' },
    { id: 'the-fork', title: 'Year 6-8: The Fork' },
    { id: 'where-stuck', title: 'Where Indian Designers Get Stuck' },
    { id: 'what-to-do', title: 'What to Do With This' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
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
  'design-team-plateau-10-people': [
    { id: 'how-you-got-to-10', title: 'How You Got to 10 Without a Plan' },
    { id: 'why-stops-at-10', title: 'Why It Stops at 10' },
    { id: 'what-goes-wrong', title: 'What Actually Goes Wrong at 10' },
    { id: 'breaking-through', title: 'What Breaking Through Requires' },
    { id: 'honest-assessment', title: 'Start With an Honest Assessment' },
    { id: 'budget-kit', title: 'Budget Conversation Prep Kit' },
    { id: 'if-this-is-your-team', title: 'If This Is Your Team' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
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
  'nda-work-ux-portfolio': [
    { id: 'not-niche-problem', title: 'This Is Not a Niche Problem' },
    { id: 'what-nda-covers', title: 'What an NDA Actually Covers' },
    { id: 'breach-you-dont-see', title: 'The Breach Most Designers Don\'t See Coming' },
    { id: 'fear-nobody-names', title: 'The Fear Nobody Names' },
    { id: 'five-approaches', title: 'Five Approaches That Work' },
    { id: 'process-proves-something', title: 'Does Process-Only Prove Anything?' },
    { id: 'case-study-length', title: 'How Long Should a Case Study Be?' },
    { id: 'interview-nda', title: 'What to Say in the Interview' },
    { id: 'one-question', title: 'One Question Before Your Next Application' },
  ],
  '12l-vs-30l-ux-designer-difference': [
    { id: 'visibility-trap', title: 'The Visibility Trap' },
    { id: 'market-pay', title: 'What the Market Actually Pays' },
    { id: 'legibility-factors', title: 'What Makes a Designer Legible as Valuable' },
    { id: 'negotiation', title: 'The Negotiation' },
    { id: 'what-to-do', title: 'What I Want You to Do With This' },
  ],
  'conversations-senior-designers-have': [
    { id: 'conversation-1', title: 'Is This Worth Solving?' },
    { id: 'conversation-2', title: 'Where Is the Money?' },
    { id: 'conversation-3', title: 'How Much Proof Does This Need?' },
    { id: 'conversation-4', title: 'Who Actually Matters in This Room?' },
    { id: 'conversation-5', title: 'Am I Still Attached After It Ships?' },
    { id: 'question-that-changes', title: 'The Question That Changes Everything' },
    { id: 'strategy-call', title: 'Recognising the Mid-Level Pattern?' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'what-design-managers-look-for-senior-ux-hiring': [
    { id: 'recruiter-journey', title: 'The Recruiter\'s Journey' },
    { id: 'what-senior-means', title: 'What \'Senior\' Actually Means' },
    { id: 'signals-that-kill', title: 'The Signals That Kill Candidacies' },
    { id: 'signals-that-win', title: 'The Signals That Win Candidacies' },
    { id: 'five-mistakes', title: 'Five Things Designers Get Wrong' },
    { id: 'how-to-prepare', title: 'How to Actually Prepare' },
    { id: 'strategy-call', title: 'Map Your Candidacy' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'how-to-evaluate-ux-mentorship-program': [
    { id: 'three-failures', title: 'The Three Failures to Know First' },
    { id: 'six-categories', title: 'The 6 Categories' },
    { id: 'evaluator', title: 'The Evaluator - Score Any Program' },
    { id: 'questions-to-ask', title: 'The Questions to Ask Before You Pay' },
    { id: 'which-format', title: 'Which Format Is Right for You' },
    { id: 'honest-limitation', title: 'One Honest Limitation' },
    { id: 'strategy-call', title: 'Walk Through the Scorecard Together' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'ic-to-manager-trap-designers': [
    { id: 'three-weeks', title: 'Three Weeks' },
    { id: 'the-data', title: 'The Data Is Ugly' },
    { id: 'why-ics-thrive', title: 'Why ICs Thrive - and Why That Becomes the Trap' },
    { id: 'what-happens', title: 'What Actually Happens When an IC Becomes a Manager' },
    { id: 'two-failure-modes', title: 'The Two Failure Modes' },
    { id: 'sprint-meeting', title: 'The Sprint Meeting That Made Me Understand' },
    { id: 'stuck-zone', title: 'The Stuck Zone' },
    { id: 'how-to-prepare', title: 'How to Actually Prepare' },
    { id: 'ic-skills-end', title: 'Individual Contributor Skills End at You' },
    { id: 'strategy-call', title: 'What to Do From Here' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'career-switch-to-ux-india-timeline': [
    { id: 'the-numbers', title: 'First - The Numbers' },
    { id: 'first-mistake', title: 'The Mistake Almost Everyone Makes First' },
    { id: 'phase-1', title: 'Phase 1: Learn to Think (Months 1-3)' },
    { id: 'phase-2', title: 'Phase 2: Build the Evidence (Months 4-6)' },
    { id: 'phase-3', title: 'Phase 3: Target the Right Role (Months 7-9)' },
    { id: 'three-traps', title: 'The Three Traps That Cost Most People Months' },
    { id: 'what-this-requires', title: 'What This Actually Requires' },
    { id: 'strategy-call', title: 'Map Your Path' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'design-thinking-vs-design-strategy': [
    { id: 'what-design-thinking-was', title: 'What Design Thinking Actually Was' },
    { id: 'workshop-problem', title: 'Why the Workshop Became the Problem' },
    { id: 'design-strategy-different', title: 'Design Strategy Says Something Different' },
    { id: 'what-design-strategy-is', title: 'What Design Strategy Actually Is' },
    { id: 'how-to-set-up', title: 'How to Actually Set Up a Design Strategy' },
    { id: 'real-shift', title: 'The Real Shift' },
    { id: 'strategy-call', title: 'Want to Understand How Design Strategy Applies?' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'ux-career-ladder-india': [
    { id: 'ladder-doesnt-work', title: 'The Ladder Everyone Follows, and Why It Does Not Work' },
    { id: 'indian-design-culture', title: 'What Nobody Says Out Loud About Indian Design Culture' },
    { id: 'bad-advice', title: 'Why \'Just Build More Skills\' Is Bad Advice' },
    { id: 'real-career-map', title: 'The Real Career Map for Indian Designers' },
    { id: 'three-things', title: 'Three Things You Can Do This Week' },
    { id: 'uncomfortable-truth', title: 'The Uncomfortable Truth' },
    { id: 'strategy-call', title: 'Want to Know Where You Are on This Map?' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'ux-designer-product-strategy-table': [
    { id: 'what-the-table-is', title: 'What the Table Actually Is' },
    { id: 'fintech-story', title: 'What It Actually Took: A Fintech Story' },
    { id: 'the-werewolf', title: 'The Werewolf' },
    { id: 'eight-things', title: 'Eight Things That Get You In and Keep You There' },
    { id: 'honest-ending', title: 'The Honest Version of How This Ends' },
  ],
  'ghosted-after-round-2-ux-interview': [
    { id: 'what-round-1-is', title: 'What Round 1 Actually Is' },
    { id: 'funnel-nobody-told', title: 'The Funnel Nobody Told You About' },
    { id: 'you-are-a-salesperson', title: 'Nobody Told You That You Are a Salesperson' },
    { id: 'mouth-broke-everything', title: 'The Portfolio Went In Fine. The Mouth Broke Everything.' },
    { id: 'deflection-patterns', title: 'The Deflection Patterns That End Careers' },
    { id: 'whiteboard-reveals', title: 'What the Whiteboard Actually Reveals' },
    { id: 'round-2-measuring', title: 'What Round 2 Is Actually Measuring' },
    { id: 'what-to-do-differently', title: 'What to Do Differently' },
    { id: 'silence-is-information', title: 'The Silence Is Not Rejection. It Is Information.' },
    { id: 'brief-diagnostic', title: 'A Brief Diagnostic' },
  ],
  'salary-negotiation-ux-designers-india': [
    { id: 'what-changed', title: 'What Changed Between \u20B917L and \u20B924L' },
    { id: 'selling-a-service', title: 'You Are Not Asking for a Favour' },
    { id: 'salary-data', title: 'What UX Designers Actually Earn in India' },
    { id: 'river-framework', title: 'The RIVER Framework' },
    { id: 'scripts', title: 'Three Scripts That Changed Real Outcomes' },
    { id: 'what-not-to-do', title: 'What Not to Do' },
    { id: 'practise-tool', title: 'Practise Before the Real Conversation' },
    { id: 'what-to-do', title: 'What to Do From Here' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'inside-look-1-1-ux-mentorship': [
    { id: 'we-say-no', title: 'We Say No More Often Than You Think' },
    { id: 'why-this-works', title: 'Why This Works When Courses Do Not' },
    { id: 'proof', title: 'The Proof: Real People, Real Timelines' },
    { id: 'programmes', title: 'Three Programmes - Which One Fits You' },
    { id: 'honesty', title: 'What We Will Not Tell You' },
    { id: 'strategy-call', title: 'What Happens Next' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'hidden-cost-promoting-ic-designer-manager': [
    { id: 'promotion-breaks', title: 'The Promotion That Breaks Two Things' },
    { id: 'the-numbers', title: 'The Numbers That Should Concern Every Design Leader' },
    { id: 'why-mistake', title: 'Why Organisations Keep Making This Mistake' },
    { id: 'failed-transition-cost', title: 'What the Failed Transition Costs' },
    { id: 'loss-nobody-counts', title: 'The Loss Nobody Counts' },
    { id: 'what-to-do', title: 'What Organisations Should Do Instead' },
    { id: 'training-problem', title: 'This Is a Training Problem' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
  ],
  'design-team-systems-problem': [
    { id: 'three-complaints', title: 'The Three Complaints I Hear Every Time' },
    { id: 'same-designers', title: 'Same Designers, Different Output' },
    { id: 'what-system-missing', title: 'What the System Is Actually Missing' },
    { id: 'audit', title: 'Audit Your Design Team\'s Systems' },
    { id: 'how-to-fix', title: 'How to Fix the System' },
    { id: 'if-this-is-your-team', title: 'If This Sounds Like Your Team' },
    { id: 'sources-references', title: 'Sources & References' },
    { id: 'read-next', title: 'Read Next' },
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
  'personal-ai-workflow-designer': {
    title: 'How to Build Your Personal AI Workflow as a Designer | Xperience Wave',
    description: 'Your AI usage is chaotic. Most designers use AI the same way for everything without a system. The deliverable-vs-outcome filter gives you clarity on where AI belongs in your design work and where it does not.',
    keywords: ['AI workflow for designers', 'personal AI design workflow', 'how to use AI in design', 'AI integration design process', 'designer AI system', 'AI-native design workflow 2026', 'AI tools for designers', 'design productivity', 'deliverable vs outcome design', 'AI augmented design'],
  },
  'what-should-design-team-look-like-2026': {
    title: 'What Should a Design Team Look Like in 2026? | Xperience Wave',
    description: 'AI is collapsing the lanes between design roles. The answer is not fewer people - it is a fundamentally different structure built around four functions: orchestration, strategy, governance, and practice.',
    keywords: ['design team structure 2026', 'AI impact design teams', 'design team headcount', 'design leadership AI', 'design team roles 2026', 'restructuring design teams', 'design team functions', 'design org structure', 'design maturity', 'AI workforce', 'design operations', 'design team functions'],
  },
  'evaluating-ai-tools-design-leaders-framework': {
    title: 'A Design Leader\'s Framework for Evaluating AI Tools (Without Losing What Makes Design Work) | Xperience Wave',
    description: 'The default evaluation criteria for AI tools miss the most important question. A purpose-first framework for design leaders to evaluate AI adoption without undermining team capability.',
    keywords: ['AI tools for design', 'design leadership', 'AI evaluation framework', 'design team AI adoption', 'AI in UX research', 'design maturity', 'AI design tools 2026', 'design operations', 'evaluating AI tools for design teams', 'AI design tools framework', 'design leader AI adoption', 'purpose vs deliverable AI'],
  },
  'hiring-senior-designers-immature-design-org': {
    title: 'What Happens When You Hire Senior Designers Into an Immature Design Org | Xperience Wave',
    description: 'A company decides it needs better design and hires a senior designer - but the org has no design function to elevate. The mismatch damages both sides. Here is what leaders and designers should do instead.',
    keywords: ['hiring senior designers immature org', 'design maturity hiring', 'senior UX designer mismatch', 'building design teams', 'design org readiness', 'senior designer wrong company', 'design maturity', 'design leadership', 'UX org maturity', 'design team building', 'design hiring mistakes', 'design culture', 'design infrastructure'],
  },
  'ux-research-never-makes-it-into-roadmap': {
    title: 'Why Your UX Research Never Makes It Into the Roadmap | Xperience Wave',
    description: 'Your research is not getting ignored because the organisation is immature. It is getting ignored because you positioned it as a design activity instead of a business input. The 5-Step Research Integration Blueprint that changes that.',
    keywords: ['UX research roadmap', 'why UX research gets ignored', 'research to product decisions', 'design research influence', 'presenting research findings', 'research stakeholder buy-in', 'research integration framework', 'UX research strategy', 'research operations', 'design maturity'],
  },
  'stakeholder-management-for-designers': {
    title: 'Stakeholder Management for Designers: Why Your Best Work Gets Ignored | Xperience Wave',
    description: 'Stakeholder management is not a soft skill. It is the skill that determines whether your design work shapes decisions or decorates them. Five real scenarios, scripts, and the communication rhythm that prevents 90% of conflicts.',
    keywords: ['stakeholder management for designers', 'presenting design work to stakeholders', 'stakeholder communication UX', 'design stakeholder buy-in', 'managing challenging stakeholders design', 'stakeholder alignment design process', 'UX stakeholder management', 'cross-functional collaboration design'],
  },
  'ux-career-ladder-levels-india': {
    title: 'Junior to CXO: What Each UX Career Level Actually Demands in India | Xperience Wave',
    description: 'What does each level of the UX career ladder actually demand in India - not on paper, but in practice? Murad, Co-founder at Xperience Wave, walks through every stage from Associate to CXO, including where Indian designers get stuck at each one and what the research actually says about IC vs management paths.',
    keywords: ['UX designer career levels India', 'UX career ladder India', 'senior UX designer India', 'lead designer India', 'design manager India', 'UX career growth India', 'product designer vs UX designer India', 'IC designer career India'],
  },
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
  'design-team-plateau-10-people': {
    title: 'Why Most Design Teams Plateau After 10 People (And How to Break Through) | Xperience Wave',
    description: 'You have 10 designers and 200 developers. Nobody planned that ratio. Here is why design teams plateau at 10 and the five shifts that break through.',
    keywords: ['scaling design team', 'design team growth', 'design org scaling', 'UX team structure', 'design team plateau', 'design leadership scaling', 'DesignOps', 'design team budget'],
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
  'nda-work-ux-portfolio': {
    title: 'NDA Work in Your UX Portfolio: 5 Strategies That Work | Xperience Wave',
    description: 'Almost every designer with meaningful experience has NDA constraints. Murad walks through five specific approaches to showing the work - with Krishna\'s story as proof of concept.',
    keywords: ['how to show NDA work in UX portfolio', 'UX portfolio NDA India', 'confidential work portfolio design', 'UX case study without showing screens', 'NDA portfolio strategy designer'],
  },
  '12l-vs-30l-ux-designer-difference': {
    title: '\u20B912L vs \u20B930L UX Designer: What\u2019s the Real Difference | Xperience Wave',
    description: 'The gap between a \u20B912L and \u20B930L UX designer in India has nothing to do with skills. Almas, Co-founder at Xperience Wave, explains the visibility trap and what actually makes a designer legible as valuable.',
    keywords: ['UX designer salary difference India', 'how to increase UX designer salary India', 'UX designer salary Bangalore 2026', 'senior UX designer salary India', 'UX designer career growth', 'UX designer salary bands India'],
  },
  'conversations-senior-designers-have': {
    title: 'The 5 Conversations Senior Designers Have That Mid-Level Designers Don\'t | Xperience Wave',
    description: 'The gap between mid-level and senior UX designers is not experience or tools. It is five specific conversations, questions senior designers ask before walking into any room. Murad, Co-founder at Xperience Wave, breaks them down.',
    keywords: ['senior UX designer skills', 'senior vs mid level designer', 'senior designer vs junior', 'how to become senior UX designer', 'UX designer strategic thinking', 'design career growth India'],
  },
  'what-design-managers-look-for-senior-ux-hiring': {
    title: 'What Design Managers Look for When Hiring Senior UX Designers | Xperience Wave',
    description: 'In a job application, you are the product and the recruiter is the user. Almas, Co-founder at Xperience Wave, breaks down what design managers are actually evaluating at every stage of the senior UX hiring process and the signals that win and lose candidacies.',
    keywords: ['what design managers look for senior UX designer', 'senior UX designer hiring India', 'UX designer interview tips', 'UX portfolio hiring manager', 'senior UX designer skills 2026', 'UX job interview India'],
  },
  'how-to-evaluate-ux-mentorship-program': {
    title: 'How to Evaluate a UX Mentorship Program (Before You Waste \u20B950K) | Xperience Wave',
    description: 'A 100-point framework for evaluating any UX mentorship program before you invest \u20B950K. Six categories, an interactive scoring tool, and the exact questions to ask - from Murad, Co-founder at Xperience Wave.',
    keywords: ['UX mentorship program India', 'best UX mentorship India', 'mentorship vs bootcamp', 'UX training review', 'UX design program India', 'UX career investment'],
  },
  'ic-to-manager-trap-designers': {
    title: 'The IC-to-Manager Trap: Why Great Designers Fail as Design Leaders | Xperience Wave',
    description: '60% of new managers fail within 24 months. 82% were never trained. A designer with 11 years of experience quit in three weeks. Not because he couldn\'t lead - because he was never prepared to. Here is how to prepare before you get the title.',
    keywords: ['UX designer IC to manager transition', 'design leadership failure', 'IC vs manager designer', 'design manager preparation', 'individual contributor ceiling', 'UX leadership skills India', 'accidental manager design', 'first time design manager'],
  },
  'career-switch-to-ux-india-timeline': {
    title: 'The Honest Career Switcher Timeline: From Zero to UX Job Offer in India | Xperience Wave',
    description: 'Most career switchers land a UX role in 6-9 months with the right structure. Almas, Co-founder at Xperience Wave, gives the honest timeline - the 3+3+3 framework, the shifting skills concept, and the three traps that cost most people months.',
    keywords: ['career switch to UX India', 'how long to become UX designer', 'UX career change timeline', 'how to switch to UX design India', 'UX career transition India', 'career switch UX portfolio', 'UX designer salary India entry level'],
  },
  'design-thinking-vs-design-strategy': {
    title: 'Design Thinking Was Never For Designers. Design Strategy Is. | Xperience Wave',
    description: 'Design Thinking was built to teach non-designers to think like designers. It was never built to be how designers actually design. Almas, Co-founder at Xperience Wave, explains what Design Thinking actually solved, why the workshop format failed, and what Design Strategy does differently.',
    keywords: ['design strategy vs design thinking', 'what is design strategy', 'design thinking criticism', 'design strategy for UX designers', 'UX designer career strategy', 'design thinking dead', 'EDIPT process problems'],
  },
  'ux-career-ladder-india': {
    title: 'The UX Career Ladder Is Broken in India - Here\'s What Actually Works | Xperience Wave',
    description: 'The standard UX career ladder was written for the West. Murad, Co-founder at Xperience Wave, breaks down what actually moves designers forward in Indian workplaces - the hierarchy, the politics, and the real career map from 0 to 10+ years.',
    keywords: ['UX designer career growth India', 'UX career path India', 'UX designer ladder India', 'senior UX designer India stuck', 'product design career India', 'design leadership India', 'UX career map India', 'UX designer salary growth India'],
  },
  'ux-designer-product-strategy-table': {
    title: 'How UX Designers Get a Seat at the Product Strategy Table | Xperience Wave',
    description: 'Most UX designers are handed strategy as a brief, not a conversation. Murad, Co-founder at Xperience Wave, breaks down what the product strategy table actually is and the eight specific moves that get you in and keep you there.',
    keywords: ['UX designer product strategy', 'how UX designers influence product decisions', 'design at the strategy table', 'UX design leadership India', 'senior UX designer career growth', 'product strategy for designers'],
  },
  'ghosted-after-round-2-ux-interview': {
    title: 'Why UX Designers Get Ghosted After Round 2 | Xperience Wave',
    description: 'You cleared Round 1. Then nothing. Almas breaks down the two specific reasons UX designers get ghosted after Round 2 - the bad salesman problem and the hollow portfolio - and what to do about both.',
    keywords: ['why UX designers get ghosted after round 2 interview', 'UX interview round 2 tips', 'design interview ghosted', 'UX job interview India 2026', 'how to pass second round design interview', 'UX portfolio interview depth'],
  },
  'salary-negotiation-ux-designers-india': {
    title: 'Salary Negotiation for UX Designers: Scripts, Data, and What Actually Works in India | Xperience Wave',
    description: 'Vaibhav was laid off at \u20B917L. One month later: \u20B921L and \u20B924L offers. Same skills. Different negotiation. Verified salary data, the RIVER framework, and word-for-word scripts for UX designers in India.',
    keywords: ['UX designer salary negotiation India', 'UX salary India 2026', 'design salary hike', 'salary negotiation scripts UX', 'UX designer salary Bangalore', 'RIVER negotiation framework', 'design career salary India'],
  },
  'inside-look-1-1-ux-mentorship': {
    title: 'What Happens in Week 1-12 of a 1:1 UX Mentorship (An Inside Look) | Xperience Wave',
    description: 'Sheetal became Design Lead in 2 months. Shreekanth landed Wipro in 5 weeks. Kritika landed a Lead role at a German startup in 3 months. This is not what they learned - it is how they were taught. An inside look at 1:1 UX mentorship.',
    keywords: ['1:1 UX mentorship program', 'Xperience Wave mentorship', 'UX mentorship experience', 'inside look mentorship', 'UX career mentorship India', 'design mentorship programme', '1:1 UX coaching India'],
  },
  'hidden-cost-promoting-ic-designer-manager': {
    title: 'The Hidden Cost of Promoting Your Best IC Designer to Manager | Xperience Wave',
    description: 'You promoted your best designer. Now you have a bad manager and a gap where your best IC used to be. The hidden cost of promoting without preparation - and what to do instead.',
    keywords: ['cost of promoting IC designer to manager', 'design manager transition cost', 'IC to manager failure', 'design team leadership training', 'accidental manager design', 'design leadership development corporate', 'UX team management training India'],
  },
  'design-team-systems-problem': {
    title: 'Your Design Team Doesn\'t Have a Skills Problem - They Have a Systems Problem | Xperience Wave',
    description: 'Your designers are capable. Your output is mediocre. McKinsey tracked 300 companies and found the difference is never the talent - it is the system. Five symptoms, five root causes, and a free audit.',
    keywords: ['design team training', 'design systems team', 'UX team scaling', 'design team problems', 'design maturity', 'UX team management', 'design leadership training', 'design operations', 'design review cadence'],
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
