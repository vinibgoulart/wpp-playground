import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { Message } from 'whatsapp-web.js';
import { groupResumeMessages } from '../../../group/groupResumeMessages';
import { middleware } from '../../middleware/middleware';
import COMMANDS from '../commands';

const resumeMessage = async (msg: Message, preparedEvent: PreparedEvent) => {
  const groupId = msg.id.remote;

  const payload = {
    groupId,
  };

  const resume = await groupResumeMessages({ payload, preparedEvent });

  if (!resume) {
    return msg.reply('No messages to resume');
  }

  msg.reply(`Resuming messages:\n\n${resume}`);
};

export default middleware(resumeMessage, {
  isListening: true,
  cost: COMMANDS.RESUME.cost,
});
