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
};

const SUPPORTED_FORMATS = ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm'];

const handleQuotedAudioMessage = async ({
  quotedMsg,
  msg,
  callback,
  retries = 0,
}: HandleQuotedAudioMessageOptions): Promise<string> => {
  if (quotedMsg.type !== 'ptt' && quotedMsg.type !== 'audio') {
    console.log(`Unsupported quoted message type: ${quotedMsg.type}`);
    return 'Unsupported quoted message type.';
  }

  const media = await quotedMsg.downloadMedia();
  if (!media) {
    console.log('Failed to download media.');
    return 'Failed to download media.';
  }

  const extension = media.mimetype.split('/')[1].split(';')[0];
  if (!SUPPORTED_FORMATS.includes(extension)) {
    console.error(`Unsupported file format: ${extension}`);
    return 'Unsupported file format.';
  }

  const downloadDir = createDownloadDir();
  const mediaPath = saveMediaToFile(media, downloadDir, extension);
  console.log('Media downloaded and saved at:', mediaPath);

  return await callback({ filePath: mediaPath, retries, msg });
};

export { handleQuotedAudioMessage };
