import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import COMMANDS from './commands';
import { COMMANDS_COST } from './commandsCost';
import { COMMANDS_FEATURE_ENUM } from './commandsFeatureEnum';
import { COMMANDS_TYPES_ENUM } from './commandsTypeEnum';

const helpMessage = async (msg: Message) => {
  let reply =
    'We are a bot that can help you with some commands. Some commands require credits to be used. You can check your balance with the command `!credits`.\n\n*Here are all the commands available:* \n\n';

  Object.values(COMMANDS_FEATURE_ENUM).forEach((feature) => {
    reply += '--------------------------------\n\n';
    reply += `*Feature ${feature}:*\n\n`;

    Object.keys(COMMANDS).forEach((commandKey) => {
      const command = COMMANDS[commandKey];

      if (command.feature === feature) {
        reply += `*Command*: ${command.name}\n`;
        reply += `*Description*: ${command.description}\n`;
        reply += `*Cost*: ${COMMANDS_COST[commandKey as COMMANDS_TYPES_ENUM]} credits\n`;
        reply += `*Example*: ${command.example}\n\n`;
      }
    });
  });

  return msg.reply(reply);
};

export default middleware(helpMessage, {
  cost: COMMANDS_COST.HELP,
});
