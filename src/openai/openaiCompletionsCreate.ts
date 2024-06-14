import { logger } from 'src/telemetry/logger';
import { PreparedEvent } from 'src/telemetry/prepared-event';
import { openai } from './openaiApi';
import { OPENAI_MODEL_ENUM } from './openaiModelEnum';

type IOpenaiCompletionsCreateArgs = {
  payload: {
    text: string;
    context?: string;
  };
  preparedEvent: PreparedEvent;
};

export const openaiCompletionsCreate = async ({
  payload,
  preparedEvent,
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

    preparedEvent.patchMetadata({
      promptSizeInChars: (context?.length || 0) + text.length,
      model: OPENAI_MODEL_ENUM.GPT_3_5_TURBO,
      promptSizeInTokens: response.usage?.prompt_tokens,
      completionSizeInTokens: response.usage?.completion_tokens,
      totalTokens: response.usage?.total_tokens,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    logger.error('Error while trying to resume messages:', error);
    return 'Error while trying to resume messages';
  }
};
