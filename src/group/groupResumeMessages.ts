import { OPENAI_MODEL_ENUM } from '../openai/openaiModelEnum';
import { openai } from '../openai/openaiApi';
import GroupModel from './groupModel';
import { prompts } from '../openai/prompts';

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
        lastResume: new Date(),
        messages: [...messagesNotUpdated, ...messagesUpdated],
      },
      $inc: {
        resumesQty: 1,
      },
    },
  );

  const parseMessages = () => {
    return notResumedMessages
      .map((msg) => msg.sender && `${msg.sender.split(' ')[0]}: ${msg.message}`)
      .join('\n');
  };

  const text = `${prompts.resume('ptbr')} \n ${parseMessages()}`;

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL_ENUM.GPT_3_5_TURBO,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);

    return 'Error while trying to resume messages';
  }
};

export { groupResumeMessages };
