import { logger } from 'src/logger';
import { client } from './client';

export const onAuthFailure = () => {
  client.on('auth_failure', (msg) => {
    // Fired if session restore was unsuccessful
    logger.error('AUTHENTICATION FAILURE', msg);
  });
};
