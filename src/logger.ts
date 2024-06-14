import pino from 'pino';

export const logger = pino(
  { level: 'info' },
  pino.transport({
    target: '@axiomhq/pino',
    options: {
      dataset: 'bot',
      token: process.env.AXIOM_TOKEN,
    },
  }),
);
