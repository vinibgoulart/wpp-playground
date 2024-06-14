import { Message } from 'whatsapp-web.js';
import { groupCreate } from '../../group/groupCreate';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';
import { COMMANDS_COST } from './commandsCost';

const initMessage = async (msg: Message) => {
  const groupId = msg.id.remote;

  const payload = {
    groupId,
  };

  await groupCreate({
    payload,
  });

  msg.react('✅');
};

export default middleware(initMessage, {
  cost: COMMANDS_COST.INIT,
});
