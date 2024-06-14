import { openai } from './openaiApi';
import { ReadStream } from 'fs';

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
    console.error('No transcription text returned by OpenAI.');
    return 'Failed to transcribe audio: no text returned.';

  } catch (error) {
    console.error(`Error during transcription: ${error}`);
    return 'Failed to transcribe audio due to an error.';
  }
};

export { openaiTranscribeAudio }