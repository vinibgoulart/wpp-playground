import GroupModel from '../../group/groupModel';
import { Message } from 'whatsapp-web.js';

export const isListening = async (msg: Message) => {
  const groupId = msg.id.remote;

  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
    isListening: true,
  });

  if (!group) {
    return false;
  }

  return true;
};
