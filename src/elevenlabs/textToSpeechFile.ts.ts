import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';
import { config } from '../config';

import { v4 as uuid } from 'uuid';

const ELEVENLABS_API_KEY = config.ELEVENLABS_API_KEY;
export const createAudioFileFromText = async (
  text: string,
): Promise<string> => {
  if (!ELEVENLABS_API_KEY) {
    return Promise.reject('ElevenLabs API key not found.');
  }

  const client = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
  });

  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_multilingual_v2',
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on('finish', () => resolve(fileName)); // Resolve with the fileName
      fileStream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};
