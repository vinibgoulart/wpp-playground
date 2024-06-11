import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';

const startListeningMessage = async (msg: Message) => {
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

export default middleware(startListeningMessage);
