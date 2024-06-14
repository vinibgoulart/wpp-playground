import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';
import COMMANDS from './commands';
import { COMMANDS_COST } from './commandsCost';

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

export default middleware(startListeningMessage, {
  cost: COMMANDS_COST.START_LISTENING,
});
