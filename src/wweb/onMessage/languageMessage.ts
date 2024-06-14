import { Message } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';
import { GROUP_LANGUAGE_ENUM } from 'src/group/groupLanguageEnum';
import { COMMANDS_COST } from './commandsCost';

const languageMessage = async (msg: Message) => {
  const language = msg.body.replace('!language', '').trim();

  if (!language) {
    return;
  }

  if (
    !Object.values(GROUP_LANGUAGE_ENUM).includes(
      language as GROUP_LANGUAGE_ENUM,
    )
  ) {
    return msg.reply(
      `Usage: !language <${Object.values(GROUP_LANGUAGE_ENUM).join(' | ')}>`,
    );
  }

  await GroupModel.findOneAndUpdate(
    {
      groupId: msg.id.remote,
      removedAt: null,
    },
    {
      $set: {
        lng: language,
      },
    },
  );

  msg.react('✅');
};

export default middleware(languageMessage, {
  cost: COMMANDS_COST.LANGUAGE,
});
