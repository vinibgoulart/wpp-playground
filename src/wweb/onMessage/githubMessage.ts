import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';
import { COMMANDS_COST } from './commandsCost';

const URL = 'https://github.com/vinibgoulart/wpp-playground';

const githubMessage = async (msg: Message) => {
  const reply = `*GitHub Repository*: ${URL}`;

  return msg.reply(reply);
};

export default middleware(githubMessage, {
  cost: COMMANDS_COST.GITHUB,
});
