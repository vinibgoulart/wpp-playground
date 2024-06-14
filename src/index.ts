import './config';
import { logger } from './logger';
import { server } from './server';

(async (): Promise<void> => {
  await server();

  process.on('uncaughtException', (err) => {
    logger.error(err);
  });
})();
