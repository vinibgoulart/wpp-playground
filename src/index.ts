import './config';
import { server } from './server';
import { logger } from './telemetry/logger';

(async (): Promise<void> => {
  await server();

  process.on('uncaughtException', (err) => {
    logger.error(err);
  });
})();
