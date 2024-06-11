import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';
import { openaiCompletionsCreate } from 'src/openai/openaiCompletionsCreate';
import GroupModel from 'src/group/groupModel';

const gptMessage = async (msg: Message) => {
  const groupId = msg.id.remote;
  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
  });

  const response = await openaiCompletionsCreate({
    payload: { text: msg.body, context: group?.gpt?.context },
  });

  msg.reply(response);
};

export default middleware(gptMessage);
