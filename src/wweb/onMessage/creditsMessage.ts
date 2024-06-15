import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';
import { COMMANDS_COST } from './commandsCost';

const creditsMessage = async (msg: Message) => {
  const group = await GroupModel.findOne({
    groupId: msg.id.remote,
    removedAt: null,
  });

  if (!group) {
    return msg.reply('Group not found, run !init');
  }

  msg.reply(`${group.credits}`);
};

export default middleware(creditsMessage, {
  cost: COMMANDS_COST.CREDITS,
});
