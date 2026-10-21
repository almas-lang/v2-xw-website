// ============================================
// JOB POSTINGS
// ============================================
//
// Each job carries its own description sections AND its own application
// form, so two roles can ask completely different questions. To post a new
// role, add an entry to `jobs` and deploy. To close one, set `closed: true`.
//
// Submissions land in the "Applications – <job title>" tab of the
// WaveMakers Connect Submissions sheet (one tab per role, so columns stay
// aligned), plus an email to the team and an auto-reply to the candidate.

export type JobTeam = 'Sales' | 'Design' | 'Engineering' | 'Marketing' | 'Operations';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

/** A single question on a job's application form. `id` becomes the column name key. */
export type FormField =
  | {
      type: 'text' | 'email' | 'tel' | 'url';
      id: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      /** Render side by side with the next field on desktop. */
      half?: boolean;
    }
  | {
      type: 'textarea';
      id: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      maxLength?: number;
      rows?: number;
    }
  | {
      type: 'select' | 'radio';
      id: string;
      label: string;
      options: string[];
      required?: boolean;
      half?: boolean;
      /** When the candidate picks this option, show a text box to explain. */
      otherOption?: string;
    }
  | {
      type: 'file';
      id: string;
      label: string;
      /** File extensions without the dot. */
      accept: string[];
      maxSizeMb: number;
      required?: boolean;
      hint?: string;
    }
  | {
      type: 'voice';
      id: string;
      label: string;
      /** The scenario the candidate records a response to. */
      prompt: string;
      maxSeconds: number;
      required?: boolean;
    };

export interface JobSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Job {
  slug: string;
  title: string;
  team: JobTeam;
  location: string;
  type: JobType;
  /** Short line shown next to the type, e.g. "Up to 17 hours a week". */
  hours?: string;
  /** Pay line shown in the summary bar and card. */
  pay?: string;
  /** One-liner for the listing card and meta description (<= 155 chars). */
  summary: string;
  /** Opening paragraphs shown above the sections. */
  intro: string[];
  sections: JobSection[];
  form: {
    /** Short note shown above the form. */
    intro?: string;
    fields: FormField[];
  };
  /** ISO date. Used for the sitemap and the JobPosting schema. */
  postedAt: string;
  /** Hides the role from the listing and returns 404 for its pages. */
  closed?: boolean;
}

/** Fields every role asks for. Spread these at the top of a job's form. */
export const baseFields: FormField[] = [
  { type: 'text', id: 'name', label: 'Full name', placeholder: 'Your name', required: true, half: true },
  { type: 'email', id: 'email', label: 'Email', placeholder: 'you@example.com', required: true, half: true },
  { type: 'tel', id: 'phone', label: 'Phone', placeholder: '+91 98765 43210', required: true, half: true },
  { type: 'text', id: 'city', label: 'City', placeholder: 'Bangalore', required: true, half: true },
  { type: 'url', id: 'linkedin', label: 'LinkedIn profile', placeholder: 'https://linkedin.com/in/yourname', required: true },
];

export const jobs: Job[] = [
  {
    slug: 'appointment-setter',
    title: 'Appointment Setter',
    team: 'Sales',
    location: 'Remote, India',
    type: 'Contract',
    hours: 'Part-time, up to 17 hours a week',
    pay: '₹35,000 to ₹50,000 a month, performance based',
    summary:
      'Talk to designers who reach out to us, understand what they need, and book them a conversation with our senior team. Remote, part-time, paid monthly.',
    intro: [
      "Xperience Wave helps designers grow into senior and leadership roles. We've trained and mentored 3,000+ designers.",
      "We're looking for someone to talk to the designers who reach out to us and help them take the next step.",
    ],
    sections: [
      {
        heading: "What you'll do",
        items: [
          "Call people who've shown interest in our programs",
          'Understand where they are and what they\'re looking for',
          'Schedule them for a conversation with our senior team',
          'Keep clear notes and follow up on time',
        ],
      },
      {
        heading: "You'll fit well if you",
        items: [
          'Have 2+ years in appointment setting, inside sales, admissions counselling or a similar calling role',
          'Speak clear, confident English',
          'Listen well and ask good questions',
          "Own your numbers and don't need chasing",
          'Can work fixed daily calling hours, Monday to Saturday, from a laptop with a headset and steady internet',
        ],
      },
      {
        heading: 'Pay',
        paragraphs: ['Performance based, with earning potential of ₹35,000 to ₹50,000 a month. Paid monthly.'],
      },
      {
        heading: 'What you get',
        items: [
          'Full training, no design background needed',
          'A weekly one-on-one with a founder',
          'Room to grow into a bigger sales role',
        ],
      },
      {
        heading: 'How to apply',
        paragraphs: ['Fill in the short form. It includes a 60-second voice note, so find a quiet spot before you start.'],
      },
    ],
    form: {
      intro: 'Takes about five minutes. The voice note at the end is the part we listen to first.',
      fields: [
        ...baseFields,
        {
          type: 'select',
          id: 'experience',
          label: 'Years of calling experience',
          options: ['Under 1 year', '1 to 2 years', '2 to 4 years', '4+ years'],
          required: true,
          half: true,
        },
        {
          type: 'select',
          id: 'callingType',
          label: 'What kind of calling?',
          options: ['Appointment setting', 'Inside sales', 'Admissions counselling', 'Customer support', 'Other'],
          otherOption: 'Other',
          required: true,
          half: true,
        },
        {
          type: 'textarea',
          id: 'callStats',
          label: 'In your last role, how many calls did you make a day, and what share turned into a booked meeting or sale?',
          required: true,
          maxLength: 500,
          rows: 3,
        },
        {
          type: 'textarea',
          id: 'currentWork',
          label: 'Are you working right now? If yes, how will these hours fit around it?',
          placeholder: 'Be specific about the hours you can commit',
          required: true,
          maxLength: 500,
          rows: 3,
        },
        {
          type: 'radio',
          id: 'fixedBlocks',
          label: 'Can you take fixed calling blocks Monday to Saturday?',
          options: ['Yes', 'No', 'Some days'],
          required: true,
        },
        {
          type: 'radio',
          id: 'setup',
          label: 'Do you have a laptop, a headset and steady internet?',
          options: ['Yes', 'No'],
          required: true,
        },
        {
          type: 'text',
          id: 'languages',
          label: 'Languages you can speak comfortably besides English',
          placeholder: 'e.g. Hindi, Kannada, Telugu',
          required: true,
        },
        {
          type: 'file',
          id: 'resume',
          label: 'Resume',
          accept: ['pdf', 'docx'],
          maxSizeMb: 10,
          hint: 'Optional. PDF or DOCX, up to 10MB.',
        },
        {
          type: 'voice',
          id: 'voiceNote',
          label: 'Voice note, 60 seconds',
          prompt:
            "You're calling someone who filled in an enquiry form on our website yesterday. Record what you'd say in the first 30 seconds.",
          maxSeconds: 60,
          required: true,
        },
      ],
    },
    postedAt: '2026-10-21',
  },
];

export function getOpenJobs(): Job[] {
  return jobs.filter((job) => !job.closed);
}

export function getJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug && !job.closed);
}
