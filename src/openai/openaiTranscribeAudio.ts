import { ReadStream } from 'fs';
import { logger } from 'src/telemetry/logger';
import { openai } from './openaiApi';

const openaiTranscribeAudio = async (file: ReadStream): Promise<string> => {
  try {
    const response = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'pt',
    });

    if (response.text) {
      return response.text;
    }
    logger.error('No transcription text returned by OpenAI.');
    return 'Failed to transcribe audio: no text returned.';
  } catch (error) {
    logger.error(`Error during transcription: ${error}`);
    return 'Failed to transcribe audio due to an error.';
  }
};

export { openaiTranscribeAudio };
