import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MessageMedia } from 'whatsapp-web.js';

const saveMediaToFile = (media: MessageMedia, dir: string, extension: string) => {
  const filePath = join(dir, `${uuidv4()}.${extension}`);
  writeFileSync(filePath, media.data, { encoding: 'base64' });
  return filePath;
};

export { saveMediaToFile }