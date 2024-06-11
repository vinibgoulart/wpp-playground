import GroupModel from './groupModel';
import { prompts } from '../openai/prompts';
import { openaiCompletionsCreate } from 'src/openai/openaiCompletionsCreate';

type IGroupResumeMessagesArgs = {
  payload: {
    groupId: string;
  };
};

const groupResumeMessages = async (args: IGroupResumeMessagesArgs) => {
  const { payload } = args;

  const group = await GroupModel.findOne({
    groupId: payload.groupId,
    removedAt: null,
    isListening: true,
  }).lean();

  if (!group) {
    return null;
  }

  const notResumedMessages = group.messages.filter((msg) => !msg.resumedAt);

  if (!notResumedMessages.length) {
    return 'No messages to resume';
  }

  const messagesUpdated = notResumedMessages.map((msg) => ({
    ...msg,
    resumedAt: new Date(),
  }));

  const messagesNotUpdated = group.messages.filter((msg) => msg.resumedAt);

  await GroupModel.findOneAndUpdate(
    {
      groupId: payload.groupId,
      removedAt: null,
      isListening: true,
    },
    {
      $set: {
        'resume.lastResume': new Date(),
        messages: [...messagesNotUpdated, ...messagesUpdated],
      },
      $inc: {
        'resume.qty': 1,
      },
    },
  );

  const parseMessages = () => {
    return notResumedMessages
      .map((msg) => msg.sender && `${msg.sender.split(' ')[0]}: ${msg.message}`)
      .join('\n');
  };

  const text = `${prompts.resume('ptbr')} \n ${parseMessages()}`;

  const response = await openaiCompletionsCreate({
    payload: {
      text,
      context: group.gpt?.context,
    },
  });

  return response;
};

export { groupResumeMessages };
