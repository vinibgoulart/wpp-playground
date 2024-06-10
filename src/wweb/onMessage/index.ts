import { client } from '../client';
import COMMANDS from './commands';
import defaultMessage from './defaultMessage';
import helpMessage from './helpMessage';
import initMessage from './initMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    const command = Object.values(COMMANDS).find((command) =>
      msg.body.split(' ')[0].startsWith(command.name),
    );

    if (!!command) {
      return command.action(msg);
    }

    if (msg.body === '!help') {
      return helpMessage(msg);
    }

    if (msg.body === '!init') {
      return initMessage(msg);
    }

    return defaultMessage(msg);
  });
};
