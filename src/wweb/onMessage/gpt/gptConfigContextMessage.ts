import GroupModel from 'src/group/groupModel';
import { PreparedEvent } from 'src/telemetry/prepared-event';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';

const gptConfigContextMessage = async (
  msg: Message,
  preparedEvent: PreparedEvent,
) => {
  const context = msg.body.replace('!gpt-config-context', '').trim();

  if (!context) {
    return msg.reply(`Usage: !gpt-config-context <context>`);
  }

  preparedEvent.patchMetadata({ size: context.length });

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
