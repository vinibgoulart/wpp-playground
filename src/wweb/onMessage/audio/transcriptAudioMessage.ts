import { Message, MessageMedia } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';
import { writeFileSync, createReadStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { openai } from '../../../openai/openaiApi';
import { v4 as uuidv4 } from 'uuid';
import { tmpdir } from 'os';
import { join } from 'path';

const MAX_RETRIES = 5;
const SUPPORTED_FORMATS = ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm'];

const createDownloadDir = (): string => {
  const dir = join(tmpdir(), uuidv4());
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  return dir;
};

const saveMediaToFile = (media: MessageMedia, dir: string, extension: string): string => {
  const filePath = join(dir, `${uuidv4()}.${extension}`);
  writeFileSync(filePath, media.data, { encoding: 'base64' });
  return filePath;
};

const transcribeAudio = async (filePath: string, retries: number = 0, msg: Message): Promise<void> => {
  try {
    console.log(`Transcribing file: ${filePath}`);
    const file = createReadStream(filePath);
    const response = await openai.audio.transcriptions.create({ file, model: 'whisper-1', language: 'pt' });
    msg.reply(response.text);

    unlinkSync(filePath);
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.error(`Error during transcription (attempt ${retries + 1}):`, error);

    if (retries < MAX_RETRIES) {
      console.log(`Retrying transcription... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return transcribeAudio(filePath, retries + 1, msg);
    }
    console.error('Failed to transcribe audio after multiple attempts:', error);
  }
};

const handleQuotedAudioMessage = async (quotedMsg: Message, msg: Message): Promise<void> => {
  if (quotedMsg.type !== 'ptt') {
    return;
  }

  const media = await quotedMsg.downloadMedia();
  if (!media) {
    console.log('Failed to download media.');
    return;
  }

  const extension = media.mimetype.split('/')[1].split(';')[0];
  if (!SUPPORTED_FORMATS.includes(extension)) {
    console.error(`Unsupported file format: ${extension}`);
    return;
  }

  const downloadDir = createDownloadDir();
  const mediaPath = saveMediaToFile(media, downloadDir, extension);
  console.log('Media downloaded and saved at:', mediaPath);
  transcribeAudio(mediaPath, 0, msg);
};

const transcriptAudioMessage = async (msg: Message): Promise<void> => {
  if (!msg.hasQuotedMsg) {
    return;
  }

  const quotedMsg = await msg.getQuotedMessage();
  handleQuotedAudioMessage(quotedMsg, msg);
};

export default middleware(transcriptAudioMessage);
