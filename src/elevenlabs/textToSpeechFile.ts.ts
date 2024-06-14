import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';

import { v4 as uuid } from 'uuid';

import * as dotenv from 'dotenv';

dotenv.config();

export const createAudioFileFromText = async (
  text: string,
): Promise<string> => {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

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
