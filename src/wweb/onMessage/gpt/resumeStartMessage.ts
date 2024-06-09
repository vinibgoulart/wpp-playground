import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';
import GroupModel from 'src/group/groupModel';

const resumeStartMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const groupId = msg.id.remote;

  await GroupModel.findOneAndUpdate(
    {
      groupId,
      removedAt: null,
    },
    {
      $set: {
        isListening: true,
      },
    },
  );

  msg.react('✅');
};

export default middleware(resumeStartMessage);
