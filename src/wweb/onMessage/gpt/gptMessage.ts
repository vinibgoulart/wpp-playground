import GroupModel from 'src/group/groupModel';
import { openaiCompletionsCreate } from 'src/openai/openaiCompletionsCreate';
import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';
import COMMANDS from '../commands';

const gptMessage = async (msg: Message, preparedEvent: PreparedEvent) => {
  const groupId = msg.id.remote;
  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
  });

  const response = await openaiCompletionsCreate({
    payload: { text: msg.body, context: group?.gpt?.context },
    preparedEvent,
  });

  msg.reply(response);
};

export default middleware(gptMessage, { cost: COMMANDS.GPT.cost });
