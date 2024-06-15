import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const {
  MONGO_PROTOCOL,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  OPENAI_API_KEY,
  IMGFLIP_USERNAME,
  IMGFLIP_PASSWORD,
  AXIOM_TOKEN,
  ELEVENLABS_API_KEY,
  NODE_ENV,
  PORT,
  WOOVI_API_KEY,
  WOOVI_AUTHORIZATION_WEBHOOK,
} = process.env;

const getMongoUri = () => {
  const getPort = () => {
    if (MONGO_PORT) {
      return `:${MONGO_PORT}`;
    }

    return '';
  };

  if (MONGO_USERNAME && MONGO_PASSWORD) {
    return `${MONGO_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}${getPort()}/${MONGO_DATABASE}`;
  }

  return `${MONGO_PROTOCOL}://${MONGO_HOST}${getPort()}/${MONGO_DATABASE}`;
};

const MONGO_URI = getMongoUri();

export const config = {
  MONGO_URI,
  OPENAI_API_KEY,
  IMGFLIP_USERNAME,
  IMGFLIP_PASSWORD,
  AXIOM_TOKEN,
  ELEVENLABS_API_KEY,
  NODE_ENV,
  PORT,
  WOOVI_API_KEY,
  WOOVI_AUTHORIZATION_WEBHOOK,
};
