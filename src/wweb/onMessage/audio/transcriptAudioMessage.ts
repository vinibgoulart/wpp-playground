import { Message } from 'whatsapp-web.js';
import { handleQuotedAudioMessage } from '../../../utils/handleQuotedAudioMessage';
import { processAndTranscribeAudio } from '../../../openai/processAndTranscribeAudio';
import { middleware } from 'src/wweb/middleware/middleware';

const transcriptAudioMessage = async (msg: Message) => {
  if (!msg.hasQuotedMsg) {
    msg.reply('No quoted message found.');
    return;
  }

  const quotedMsg = await msg.getQuotedMessage();
  const responseMessage = await handleQuotedAudioMessage({
    quotedMsg,
    msg,
    callback: processAndTranscribeAudio,
  });
  msg.reply(responseMessage);
};

export default middleware(transcriptAudioMessage);
