import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';

const helpMessage = async (msg: Message) => {
  let reply = '*Here are all the commands available:* \n\n';
  Object.values(COMMANDS).forEach((command) => {
    if (command?.description) {
      reply += `*Command*: ${command.name}\n`;
      reply += `*Description*: ${command.description}\n`;
      reply += `*Example*: ${command.example}\n\n`;
    }
  });
  return msg.reply(reply);
};

export default middleware(helpMessage, { consumeCredits: false });
