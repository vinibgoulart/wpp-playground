import { Message } from 'whatsapp-web.js';
import { pop } from '../../../utils/logs';
const logsMessage = async (msg: Message) => {
  try {
    const lines = pop();
    let message = '```';
    for (const line of lines) {
      message += `[${line.kind}]: ${line.chunk}\n`;
    }
    message += '```';

    return msg.reply(message);
  } catch (error) {
    return msg.reply((error as Error).message);
  }
};

export default logsMessage;
