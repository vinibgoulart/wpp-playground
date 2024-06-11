import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';
import GroupModel from 'src/group/groupModel';

const gptConfigContextMessage = async (msg: Message) => {
  const context = msg.body.replace('!gpt-config-context', '').trim();

  if (!context) {
    return msg.reply(`Usage: !gpt-config-context <context>`);
  }

  await GroupModel.findOneAndUpdate(
    {
      groupId: msg.id.remote,
      removedAt: null,
    },
    {
      $set: {
        gpt: {
          context,
        },
      },
    },
  );

  msg.react('✅');
};

export default middleware(gptConfigContextMessage);
