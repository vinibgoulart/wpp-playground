import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';
import { COMMANDS_COST } from './commandsCost';

const configMessage = async (msg: Message) => {
  const group = await GroupModel.findOne({
    groupId: msg.id.remote,
    removedAt: null,
  });

  if (!group) {
    return msg.reply('Group not found, run !init');
  }

  const config = {
    language: group.lng,
    credits: group.credits,
    gptContext: group.gpt?.context,
  };

  msg.reply(JSON.stringify(config, null, 2));
};

export default middleware(configMessage, {
  cost: COMMANDS_COST.CONFIG,
});
