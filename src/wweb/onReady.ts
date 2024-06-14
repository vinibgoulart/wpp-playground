import { logger } from 'src/telemetry/logger';
import { client } from './client';

export const onReady = () => {
  client.on('ready', () => {
    logger.info('Client is ready!');
  });
};
