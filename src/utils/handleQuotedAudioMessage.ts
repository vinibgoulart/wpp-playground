import { logger } from 'src/telemetry/logger';
import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { createDownloadDir } from 'src/utils/createDownloadDir';
import { saveMediaToFile } from 'src/utils/saveMediaToFile';
import { Message } from 'whatsapp-web.js';

type HandleQuotedAudioMessageOptions = {
  quotedMsg: Message;
  msg: Message;
  callback: (args: {
    filePath: string;
    msg: Message;
    retries?: number;
  }) => Promise<string>;
  retries?: number;
  preparedEvent: PreparedEvent;
};

const SUPPORTED_FORMATS = [
  'flac',
  'm4a',
  'mp3',
  'mp4',
  'mpeg',
  'mpga',
  'oga',
  'ogg',
  'wav',
  'webm',
];

const handleQuotedAudioMessage = async ({
  quotedMsg,
  msg,
  callback,
  retries = 0,
  preparedEvent,
}: HandleQuotedAudioMessageOptions): Promise<string> => {
  if (quotedMsg.type !== 'ptt' && quotedMsg.type !== 'audio') {
    logger.info(`Unsupported quoted message type: ${quotedMsg.type}`);
    return 'Unsupported quoted message type.';
  }

  const media = await quotedMsg.downloadMedia();
  if (!media) {
    logger.error('Failed to download media.');
    return 'Failed to download media.';
  }
  preparedEvent.patchMetadata({
    size: media.filesize,
  });

  const extension = media.mimetype.split('/')[1].split(';')[0];
  if (!SUPPORTED_FORMATS.includes(extension)) {
    logger.error(`Unsupported file format: ${extension}`);
    return 'Unsupported file format.';
  }
  preparedEvent.patchMetadata({
    format: extension,
  });

  const downloadDir = createDownloadDir();
  const mediaPath = saveMediaToFile(media, downloadDir, extension);
  logger.info('Media downloaded and saved at:', mediaPath);

  return await callback({ filePath: mediaPath, retries, msg });
};

export { handleQuotedAudioMessage };
