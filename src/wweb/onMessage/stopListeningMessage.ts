import GroupModel from '../../group/groupModel';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';
import { COMMANDS_COST } from './commandsCost';

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
  cost: COMMANDS_COST.STOP_LISTENING,
  isListening: true,
});
