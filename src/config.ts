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
} = process.env;

const MONGO_URI = `${MONGO_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export const config = {
  MONGO_URI,
  OPENAI_API_KEY,
  IMGFLIP_USERNAME,
  IMGFLIP_PASSWORD,
};
