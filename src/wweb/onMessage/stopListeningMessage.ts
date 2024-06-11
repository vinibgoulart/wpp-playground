import GroupModel from '../../group/groupModel';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';

const stopListeningMessage = async (msg: Message) => {
  console.log({ msg });
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
        isListening: false,
      },
    },
  );

  msg.react('✅');
};

export default middleware(stopListeningMessage, {
  isListening: true,
});
