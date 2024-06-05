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
  });

  console.log({ group });

  if (!group) {
    return null;
  }

  if (!group.messages.length) {
    return 'No messages to resume';
  }

  await GroupModel.findOneAndUpdate(
    {
      groupId: payload.groupId,
    },
    {
      $set: {
        messages: [],
        lastResume: new Date(),
      },
    },
  );

  const parseMessages = () => {
    return group.messages
      .map((msg) => `${msg.sender.split(' ')[0]}: ${msg.message}`)
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
