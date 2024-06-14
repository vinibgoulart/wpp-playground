import { PreparedEvent } from 'src/telemetry/prepared-event';
import { client } from '../client';
import COMMANDS from './commands';
import defaultMessage from './defaultMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    const command = Object.values(COMMANDS).find((command) =>
      msg.body.split(' ')[0].startsWith(command.name),
    );

    const chat = await msg.getChat();

    const preparedEvent = new PreparedEvent({
      kind: 'on_message_command',
      payload: {
        command: command?.name ?? 'default',
      },
      chatId: chat.id._serialized,
    });

    if (!!command) {
      const res = await command.action(msg, preparedEvent);
      preparedEvent.flush();
      return res;
    }

    return defaultMessage(msg, preparedEvent);
  });
};
