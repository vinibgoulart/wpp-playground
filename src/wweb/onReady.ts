import { logger } from 'src/logger';
import { client } from './client';

export const onReady = () => {
  client.on('ready', () => {
    logger.info('Client is ready!');
  });
};
