import { initBotId } from 'botid/client/core';

// Routes protected by Vercel BotID. Requests to these routes are classified
// as human or bot in the browser before they reach the server; the route
// handlers reject bot-classified requests via checkBotId().
initBotId({
  protect: [
    {
      path: '/api/newsletter',
      method: 'POST',
    },
  ],
});
