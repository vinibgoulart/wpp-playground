import { client } from '../client';
import COMMANDS from './commands';
import defaultMessage from './defaultMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    console.log({ msg });
    const command = Object.values(COMMANDS).find((command) =>
      msg.body.split(' ')[0].startsWith(command.name),
    );

    console.log({ command });

    if (!!command) {
      return command.action(msg);
    }

    return defaultMessage(msg);
  });
};
