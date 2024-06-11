import { openai } from './openaiApi';
import { OPENAI_MODEL_ENUM } from './openaiModelEnum';

type IOpenaiCompletionsCreateArgs = {
  payload: {
    text: string;
    context?: string;
  };
};

export const openaiCompletionsCreate = async ({
  payload,
}: IOpenaiCompletionsCreateArgs): Promise<string> => {
  const { text, context } = payload;
  const getContext = () => {
    if (context) {
      return [
        {
          role: 'system',
          content: context,
        },
      ];
    }

    return [];
  };

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL_ENUM.GPT_3_5_TURBO,
      messages: [
        ...getContext(),
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

    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error while trying to resume messages';
  }
};
