import { code } from 'src/utils/templates';
import { Message } from 'whatsapp-web.js';
const getGroupID = async (msg: Message) => {
  try {
    return msg.reply(code`${msg.id.remote}`);
  } catch (error) {
    return msg.reply((error as Error).message);
  }
};

export default getGroupID;
