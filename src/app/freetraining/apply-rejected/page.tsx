'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackConversionAPI } from '@/lib/freetraining/track';
import { getStorageJSON } from '@/lib/freetraining/storage';
import { ftPath } from '@/lib/freetraining/constants';

export default function ApplyRejectedPage() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [rejectionReason, setRejectionReason] = useState<{ category?: string; reason?: string }>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const formData = getStorageJSON<{ name: string; email?: string }>("lead_form_data");
    if (formData) { setUserName(formData.name || ''); setUserEmail(formData.email || ''); }

    const qualification = getStorageJSON<{ category: string; reason: string }>("apply_qualification");
    if (qualification) { setRejectionReason({ category: qualification.category, reason: qualification.reason }); }

    const leadData = getStorageJSON<{ email: string }>("lead_data");
    const email = leadData?.email || '';
    if (email) {
      trackConversionAPI('ApplicationRejected', email, undefined, { rejection_category: qualification?.category, rejection_reason: qualification?.reason });
      updateSheetStatus(email, qualification?.category, qualification?.reason);
    }
  }, []);

  const updateSheetStatus = async (email: string, category?: string, reason?: string) => {
    try {
      await fetch('/freetraining/api/sheets/append', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', data: { email, stage: 'apply_rejected', applyQualified: false, applyQualificationReason: reason || category || 'not_qualified' } }),
      });
    } catch (error) { console.error('Error updating sheet:', error); }
  };

  const getMessage = () => {
    if (rejectionReason.category === 'both') return "Based on your responses, this program may not be the right fit at this time. We recommend reconsidering when you're ready to invest and can commit to a 90-day timeline.";
    if (rejectionReason.category === 'investment') return "Our program requires investment readiness. We recommend exploring free resources first and returning when you're ready to invest in your career growth.";
    if (rejectionReason.category === 'timeline') return "Our program is designed for designers who can commit to a 90-day intensive process. We recommend exploring self-paced resources that better fit your timeline.";
    return "Based on your responses, this program may not be the right fit at this time.";
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center leading-tight">Thank you for your interest{userName ? `, ${userName}` : ''}</h1>
          <div className="mb-8">
            <div className="bg-amber-900/30 border-l-4 border-amber-400 p-4 md:p-6 rounded-r-lg mb-6"><p className="text-base md:text-lg text-gray-200">{getMessage()}</p></div>
            <p className="text-base md:text-lg text-gray-300 mb-4">While you may not be the right fit for our intensive Pi-Design Career System at this moment, we still want to support your design career journey.</p>
          </div>
          <div className="border-t border-gray-700 my-8"></div>
          <div className="bg-ft-purple/10 rounded-xl p-6 md:p-8 mb-8 border border-ft-purple/30">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Free Resources to Help You Grow</h2>
            <p className="text-base md:text-lg text-gray-300 mb-6">We&apos;ve curated some resources that can help you prepare for the next step in your career.{userEmail && <span className="font-medium text-ft-purple"> We&apos;ll send these to {userEmail}:</span>}</p>
            <div className="space-y-3">
              {["Weekly design career tips and industry insights delivered to your inbox", "Free guides on building your design portfolio and personal brand", "Priority notification when we launch programs suited to your profile"].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <p className="text-sm md:text-base text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 mb-6 border border-gray-700">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">When might this program be right for you?</h3>
            <div className="space-y-3">
              {(rejectionReason.category === 'investment' || rejectionReason.category === 'both') && (
                <div className="flex items-start gap-3"><svg className="w-5 h-5 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg><p className="text-sm md:text-base text-gray-300">When you&apos;re ready to invest ₹60-80K in your career transformation</p></div>
              )}
              {(rejectionReason.category === 'timeline' || rejectionReason.category === 'both') && (
                <div className="flex items-start gap-3"><svg className="w-5 h-5 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg><p className="text-sm md:text-base text-gray-300">When you can commit to a 90-day intensive transformation process</p></div>
              )}
              <div className="flex items-start gap-3"><svg className="w-5 h-5 text-ft-purple mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg><p className="text-sm md:text-base text-gray-300">Feel free to reapply once your situation changes</p></div>
            </div>
          </div>
          <div className="text-center"><Link href={ftPath("/")} className="inline-block bg-ft-red hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm md:text-base shadow-lg">Return to Home</Link></div>
          <div className="mt-8 text-center"><p className="text-base md:text-lg text-gray-300 font-medium">— Team Xperience Wave</p></div>
        </div>
        <div className="mt-8 text-center"><p className="text-sm text-gray-600">Have questions? <a href="mailto:team@xperiencewave.com" className="text-ft-purple hover:text-purple-700 font-medium">Contact our team</a></p></div>
      </div>
    </div>
  );
}
