import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | WaveMakers Connect',
  description: 'Terms of Use for WaveMakers Connect community events and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
        <div className="max-w-[800px] mx-auto px-5 pt-28 md:pt-32 pb-12 md:pb-16">
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <Link href="/community" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Community
            </Link>
            <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-neutral-900 font-medium">Terms of Use</span>
          </nav>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Terms of Use
          </h1>
          <p className="text-neutral-600">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-5 py-12 md:py-16">
        <div className="prose prose-neutral max-w-none">

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Welcome to WaveMakers Connect, a community initiative by Xperience Wave. By registering for our events,
              applying to speak, submitting sponsorship inquiries, or joining our WhatsApp community, you agree to
              these Terms of Use.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              WaveMakers Connect organizes free in-person meetups for designers, engineers, founders, and tech
              enthusiasts in Bangalore. These terms govern your participation in our events and community.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              2. Event Registration
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              When you register for a WaveMakers Connect event:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>You must provide accurate and complete information</li>
              <li>Registration is on a first-come, first-served basis with limited seats</li>
              <li>We reserve the right to refuse or cancel registrations at our discretion</li>
              <li>Events are free to attend; no payment is required</li>
              <li>You agree to arrive on time and follow venue guidelines</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              3. Data Collection & Privacy
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We collect personal information to organize events and build our community. This includes:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li><strong>Contact Information:</strong> Name, email, phone number</li>
              <li><strong>Professional Details:</strong> Profession, company, LinkedIn profile</li>
              <li><strong>Event Preferences:</strong> Topics of interest, how you heard about us</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mb-4">
              <strong>How we use your data:</strong>
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>To send event confirmations and updates</li>
              <li>To add you to our WhatsApp community for event coordination</li>
              <li>To send occasional newsletters about upcoming events (you can unsubscribe anytime)</li>
              <li>To improve our events based on attendee feedback</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              We do not sell or share your personal information with third parties for marketing purposes.
              Your data is stored securely using industry-standard practices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              4. WhatsApp Community Guidelines
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              By joining the WaveMakers Connect WhatsApp community, you agree to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>Be respectful and professional in all interactions</li>
              <li>Avoid spam, self-promotion, or unsolicited marketing</li>
              <li>Keep discussions relevant to design, tech, and community topics</li>
              <li>Not share inappropriate, offensive, or illegal content</li>
              <li>Respect the privacy of other community members</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              We reserve the right to remove members who violate these guidelines without prior notice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              5. Photo & Video Consent
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              By attending WaveMakers Connect events, you consent to being photographed and/or recorded.
              These photos and videos may be used for:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>Social media posts and event recaps</li>
              <li>Website content and promotional materials</li>
              <li>Community newsletters and updates</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              If you do not wish to be photographed, please inform the event organizers upon arrival.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              6. Code of Conduct
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              WaveMakers Connect is committed to providing a welcoming and inclusive environment for everyone.
              All attendees, speakers, sponsors, and volunteers are expected to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>Treat all participants with respect and consideration</li>
              <li>Refrain from discriminatory, harassing, or offensive behavior</li>
              <li>Respect the venue and its property</li>
              <li>Follow any instructions from event organizers</li>
              <li>Report any concerns or incidents to the organizers</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              Violations may result in removal from the event and ban from future events.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              7. Speaker & Sponsor Applications
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              <strong>Speakers:</strong> By applying to speak, you grant us permission to use your name,
              photo, bio, and presentation materials for event promotion. Speaker selection is at our
              sole discretion.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              <strong>Sponsors:</strong> Sponsorship inquiries are subject to separate agreements.
              Submitting an inquiry does not guarantee a partnership.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              8. Cancellation & Changes
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-4">
              <li>Cancel or reschedule events due to unforeseen circumstances</li>
              <li>Change venue, timing, or speakers without prior notice</li>
              <li>Limit attendance or close registration at any time</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              We will make reasonable efforts to notify registered attendees of any changes via email
              and WhatsApp.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              WaveMakers Connect events are provided &ldquo;as is.&rdquo; Xperience Wave and its organizers
              are not liable for any loss, injury, or damage arising from event attendance. Attendees
              participate at their own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              10. Changes to These Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We may update these Terms of Use from time to time. Continued participation in our events
              or community after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <ul className="list-none text-neutral-600 space-y-2">
              <li><strong>Email:</strong> team@xperiencewave.com</li>
              <li><strong>Instagram:</strong> <a href="https://instagram.com/xperience_wave" className="text-indigo-600 hover:text-indigo-500">@xperience_wave</a></li>
            </ul>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Community
          </Link>
        </div>
      </div>
    </main>
  );
}
