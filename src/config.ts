import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const { MONGO_URI, OPENAI_API_KEY, IMGFLIP_USERNAME, IMGFLIP_PASSWORD } =
  process.env;

export const config = {
  MONGO_URI,
  OPENAI_API_KEY,
  IMGFLIP_USERNAME,
  IMGFLIP_PASSWORD,
};
