import { code } from 'src/utils/templates';
import { middleware } from 'src/wweb/middleware/middleware';
import { Message } from 'whatsapp-web.js';
import COMMANDS from '../commands';
import { COMMANDS_COST } from '../commandsCost';

const groupIdMessage = async (msg: Message) => {
  try {
    return msg.reply(code`${msg.id.remote}`);
  } catch (error) {
    return msg.reply((error as Error).message);
  }
};

export default middleware(groupIdMessage, {
  cost: COMMANDS_COST.GROUP_ID,
});
