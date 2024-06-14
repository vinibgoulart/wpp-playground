import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { middleware } from 'src/wweb/middleware/middleware';
import { Message } from 'whatsapp-web.js';
import { processAndTranscribeAudio } from '../../../openai/processAndTranscribeAudio';
import { handleQuotedAudioMessage } from '../../../utils/handleQuotedAudioMessage';
import { COMMANDS_COST } from '../commandsCost';

const transcriptMessage = async (
  msg: Message,
  preparedEvent: PreparedEvent,
) => {
  if (!msg.hasQuotedMsg) {
    msg.reply('No quoted message found.');
    return;
  }

  const quotedMsg = await msg.getQuotedMessage();
  const responseMessage = await handleQuotedAudioMessage({
    quotedMsg,
    msg,
    callback: processAndTranscribeAudio,
    preparedEvent,
  });
  msg.reply(responseMessage);
};

export default middleware(transcriptMessage, {
  cost: COMMANDS_COST.TRANSCRIPT,
});
