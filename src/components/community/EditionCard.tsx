'use client';

interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  type: 'registration' | 'keynote' | 'panel' | 'workshop' | 'networking' | 'lightning' | 'break';
}

interface EditionCardProps {
  editionNumber: number;
  theme?: string;
  date: string;
  venue: string;
  attendeeCount: string;
  schedule: ScheduleItem[];
}

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  registration: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  keynote: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  panel: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  workshop: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  networking: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  lightning: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  break: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
};

export default function EditionCard({
  editionNumber,
  theme,
  date,
  venue,
  attendeeCount,
  schedule,
}: EditionCardProps) {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 hover:border-indigo-300 transition-all duration-500 shadow-sm hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          {/* Edition number */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-carbon">
              Edition #{editionNumber}
            </span>
            {theme && (
              <span className="px-3 py-1 text-xs font-medium bg-violet-100 text-violet-600 border border-violet-200 rounded-full">
                {theme}
              </span>
            )}
          </div>

          {/* Date & venue */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-g500 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{venue}</span>
            </div>
          </div>
        </div>

        {/* Attendee count */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-carbon font-heading font-semibold">{attendeeCount}</span>
          <span className="text-g500 text-sm">attendees</span>
        </div>
      </div>

      {/* Schedule timeline */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-g400 mb-4">
          Full Day Schedule
        </h4>

        {schedule.map((item, index) => {
          const colors = typeColors[item.type];
          return (
            <div
              key={index}
              className="flex gap-4 items-start"
            >
              {/* Time */}
              <div className="w-16 sm:w-20 flex-shrink-0 text-right">
                <span className="text-xs sm:text-sm font-mono text-g500">
                  {item.time}
                </span>
              </div>

              {/* Timeline dot */}
              <div className="relative flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full ${colors.bg} border ${colors.border}`} />
                {index < schedule.length - 1 && (
                  <div className="w-px h-full absolute top-3 bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className={`inline-block px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {item.title}
                  </span>
                  {item.speaker && (
                    <span className="text-g500 text-sm ml-2">
                      — {item.speaker}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
