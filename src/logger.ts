import os from 'os';
import pino from 'pino';
import { config } from './config';

const options: pino.LoggerOptions = {
  base: {
    pid: process.pid,
    host: os.hostname(),
    application: 'bot',
    env: config.NODE_ENV,
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
};

switch (config.NODE_ENV) {
  case 'production':
    options.level = 'info';
    options.transport = {
      target: '@axiomhq/pino',
      options: {
        dataset: 'bot',
        token: config.AXIOM_TOKEN,
      },
    };
    break;
  default:
    options.level = 'debug';
    options.transport = {
      target: 'pino-pretty',
    };
}

export const logger = pino(options);
