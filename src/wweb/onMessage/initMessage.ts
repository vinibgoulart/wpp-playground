import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import { groupCreate } from '../../group/groupCreate';

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

export default middleware(initMessage);
