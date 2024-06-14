import { openaiCompletionsCreate } from 'src/openai/openaiCompletionsCreate';
import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { prompts } from '../openai/prompts';
import GroupModel from './groupModel';
import { messageParseToGpt } from './message/messageParseToGpt';

type IGroupResumeMessagesArgs = {
  payload: {
    groupId: string;
  };
  preparedEvent: PreparedEvent;
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

  const messagesNotResumed = group.messages.filter((msg) => !msg.resumedAt);

  if (!messagesNotResumed.length) {
    return 'No messages to resume';
  }

  const messagesUpdated = messagesNotResumed.map((msg) => ({
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

  const text = `${prompts.resume('ptbr')} \n ${messageParseToGpt(
    messagesNotResumed.map((msg) => ({
      sender: msg.sender,
      message: msg.message,
    })),
  )}`;

  const response = await openaiCompletionsCreate({
    payload: {
      text,
      context: group.gpt?.context,
    },
    preparedEvent: args.preparedEvent,
  });

  return response;
};

export { groupResumeMessages };
