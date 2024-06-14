import { createServer } from 'http';
import { app } from './app';
import { connectDatabase } from './mongo';
import { logger } from './telemetry/logger';
import { config } from './config';
import http from './http';

export const server = async () => {
  try {
    logger.info('connecting to database...');
    await connectDatabase();
  } catch (err) {
    logger.fatal('Could not connect to database', err);
  }

  app();

  const httpServer = createServer(http);

  httpServer.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`);
  });
};
