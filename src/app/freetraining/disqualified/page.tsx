'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStorageJSON } from '@/lib/freetraining/storage';
import { ftContent } from '@/lib/freetraining/content';
import { ftPath } from '@/lib/freetraining/constants';

export default function DisqualifiedPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const formData = getStorageJSON<{ name: string }>("lead_form_data");
    if (formData?.name) setUserName(formData.name);
  }, []);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center leading-tight">Thanks for your interest, but this program isn&apos;t the right fit for you right now.</h1>
          <div className="mb-8 text-left">
            <p className="text-lg md:text-xl text-gray-200 mb-6">Hi {userName ? <span className="font-semibold text-ft-purple">{userName}</span> : 'there'},</p>
            <p className="text-base md:text-lg text-gray-300 mb-4">Our <span className="font-semibold text-white">Pi-Design Career System</span> is specifically designed for:</p>
            <ul className="space-y-2 mb-6 ml-4">
              <li className="flex items-start gap-3 text-base md:text-lg text-gray-300">
                <svg className="w-6 h-6 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Currently employed UX/UI/Product designers with 2+ years of experience</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-gray-200 mb-2 font-semibold">Based on your responses, you don&apos;t meet these criteria yet.</p>
            <p className="text-base md:text-lg font-semibold text-ft-purple">But we want to help you get there.</p>
          </div>
          <div className="border-t border-gray-700 my-8"></div>
          <div className="bg-ft-purple/10 rounded-xl p-6 md:p-8 mb-8 border border-ft-purple/30">
            <p className="text-base md:text-lg text-gray-200 mb-6">Download our free &quot;Designers Current Capability Assessment&quot;</p>
            <a href={ftContent.disqualified.designerCapabilityAssessmentUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-ft-red hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm md:text-base shadow-lg">Download Free Assessment</a>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">What happens next?</h3>
            <p className="text-base md:text-lg text-gray-300 mb-4">We&apos;ll also send you free resources via email to help you build toward senior roles.</p>
            <div className="space-y-3">
              {["Free career growth resources tailored to your current stage", "Priority notification when we launch programs suited to your profile", "Weekly design career tips and industry insights"].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <p className="text-sm md:text-base text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8"><Link href={ftPath("/")} className="inline-block bg-ft-red hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm md:text-base shadow-lg">Return to Home</Link></div>
          <div className="mt-8 text-center"><p className="text-base md:text-lg text-gray-300 font-medium">— Team Xperience Wave</p></div>
        </div>
        <div className="mt-8 text-center"><p className="text-sm text-gray-600">Have questions? <a href="mailto:team@xperiencewave.com" className="text-ft-purple hover:text-purple-700 font-medium">Contact our team</a></p></div>
      </div>
    </div>
  );
}
