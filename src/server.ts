import { app } from './app';
import { logger } from './logger';
import { connectDatabase } from './mongo';

export const server = async () => {
  try {
    logger.info('connecting to database...');
    await connectDatabase();
  } catch (err) {
    logger.fatal('Could not connect to database', err);
  }

  app();
};
