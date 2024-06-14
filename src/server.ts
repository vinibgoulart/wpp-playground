import { app } from './app';
import { connectDatabase } from './mongo';
import { logger } from './telemetry/logger';

export const server = async () => {
  try {
    logger.info('connecting to database...');
    await connectDatabase();
  } catch (err) {
    logger.fatal('Could not connect to database', err);
  }

  app();
};
