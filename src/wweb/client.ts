import { logger } from 'src/telemetry/logger';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { onAuthFailure } from './onAuthFailure';
import { onMessage } from './onMessage/onMessage';
import { onQrCode } from './onQrCode';
import { onReady } from './onReady';

export const client = new Client({
  authStrategy: new LocalAuth(),
  authTimeoutMs: 15 * 1000,
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

export const connectClient = () => {
  logger.info('Connecting to WhatsApp Web...');
  client.initialize();

  onQrCode();

  onReady();

  onAuthFailure();

  onMessage();
};
