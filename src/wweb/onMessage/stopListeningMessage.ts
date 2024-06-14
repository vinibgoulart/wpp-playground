import GroupModel from '../../group/groupModel';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';

const stopListeningMessage = async (msg: Message) => {
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
  cost: COMMANDS.STOP_LISTENING.cost,
  isListening: true,
});
