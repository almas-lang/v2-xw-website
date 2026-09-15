import { initBotId } from 'botid/client/core';

// Routes protected by Vercel BotID. Requests to these routes are classified
// as human or bot in the browser before they reach the server; the route
// handlers reject bot-classified requests via checkBotId().
initBotId({
  protect: [
    { path: '/api/newsletter', method: 'POST' },
    { path: '/api/contact', method: 'POST' },
    { path: '/api/evaluator-score', method: 'POST' },
    { path: '/api/event-register', method: 'POST' },
    { path: '/api/guide-download', method: 'POST' },
    { path: '/api/hiring-guide', method: 'POST' },
    { path: '/api/hiring-requirements', method: 'POST' },
    { path: '/api/lead-capture', method: 'POST' },
    { path: '/api/podcast-guest', method: 'POST' },
    { path: '/api/podcast-sponsor', method: 'POST' },
    { path: '/api/services-lead', method: 'POST' },
    { path: '/api/speaker-apply', method: 'POST' },
    { path: '/api/sponsor-inquiry', method: 'POST' },
    { path: '/ai-design-webinar/api/register', method: 'POST' },
  ],
});
