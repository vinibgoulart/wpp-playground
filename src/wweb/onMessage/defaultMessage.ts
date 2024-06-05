import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import { messageCreate } from '../../group/message/messageCreate';

const defaultMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  if (msg.body.startsWith('Resuming messages:')) {
    return;
  }

  const groupId = msg.id.remote;

  const payload = {
    message: msg.body,
    sender: msg._data.notifyName,
    time: new Date(msg.timestamp * 1000),
  };

  await messageCreate({
    groupId,
    payload,
  });
};

export default middleware(defaultMessage, { isListening: true });
