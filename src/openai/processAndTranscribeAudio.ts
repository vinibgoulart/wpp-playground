import { createReadStream, unlinkSync } from 'fs';
import { logger } from 'src/telemetry/logger';
import { Message } from 'whatsapp-web.js';
import { openaiTranscribeAudio } from './openaiTranscribeAudio';

const MAX_RETRIES = 5;

const processAndTranscribeAudio = async ({
  filePath,
  retries = 0,
  msg,
}: {
  filePath: string;
  msg: Message;
  retries?: number;
}): Promise<string> => {
  logger.info(`Transcribing file: ${filePath}`);

  const file = createReadStream(filePath);

  try {
    const responseText = await openaiTranscribeAudio(file);

    unlinkSync(filePath);
    logger.error(`File deleted: ${filePath}`);

    if (responseText) {
      return responseText;
    }

    logger.error('No transcription text returned by OpenAI.');
    return 'Failed to transcribe audio: no text returned.';
  } catch (error) {
    logger.error(
      `Error during transcription handling (attempt ${retries + 1}):`,
      error,
    );

    if (retries >= MAX_RETRIES) {
      return 'Failed to transcribe audio after multiple attempts.';
    }

    logger.info(`Retrying transcription... (${retries + 1}/${MAX_RETRIES})`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return processAndTranscribeAudio({ filePath, retries: retries + 1, msg });
  }
};

export { processAndTranscribeAudio };
