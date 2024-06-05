import { Message } from 'whatsapp-web.js';
import { groupResumeMessages } from '../../../group/groupResumeMessages';
import { middleware } from '../../middleware/middleware';

const resumeMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const groupId = msg.id.remote;

  const payload = {
    groupId,
  };

  const resume = await groupResumeMessages({ payload });

  if (!resume) {
    return msg.reply('No messages to resume');
  }

  msg.reply(`Resuming messages:\n\n${resume}`);
};

export default middleware(resumeMessage, {
  isListening: true,
});
