import { tmpdir } from 'os';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const createDownloadDir = () => {
  const dir = join(tmpdir(), uuidv4());
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  return dir;
};

export { createDownloadDir };