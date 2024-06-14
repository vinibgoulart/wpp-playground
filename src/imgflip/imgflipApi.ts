import { logger } from 'src/logger';

const imgflipApi = (uri: string, options: RequestInit) => {
  const url = `https://api.imgflip.com${uri}`;

  if (process.env.DEBUG === 'true') {
    logger.info({ url, options });
  }

  return fetch(url, options);
};

export { imgflipApi };
