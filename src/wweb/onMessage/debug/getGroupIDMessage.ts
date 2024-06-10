import { code } from 'src/utils/textComposer';
import { Message } from 'whatsapp-web.js';
const getGroupID = async (msg: Message) => {
  try {
    return msg.reply(msg.id.remote);
  } catch (error) {
    return msg.reply((error as Error).message);
  }
};

export default getGroupID;
