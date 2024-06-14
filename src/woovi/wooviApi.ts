import { logger } from 'src/telemetry/logger';
import { config } from '../config';

export const wooviApi = (uri: string, options: RequestInit) => {
  if (!config.WOOVI_API_KEY) {
    return;
  }

  const url = `https://api.woovi.com/api${uri}`;

  if (process.env.DEBUG === 'true') {
    logger.info({ url, options });
  }

  const headers = {
    ...options.headers,
    Authorization: `${config.WOOVI_API_KEY}`,
  };

  const optionsWithHeaders = {
    ...options,
    headers,
  };

  return fetch(url, optionsWithHeaders);
};
