import { logger } from 'src/telemetry/logger';
import { config } from '../config';
import { objToUrlEncoded } from '../utils/objToUrlEncoded';
import { imgflipApi } from './imgflipApi';

type IImgflipCaptionArgs = {
  templateId: string;
  text0?: string;
  text1?: string;
};

type IImgflipCaptionResponse = {
  success: boolean;
  data: {
    url: string;
    page_url: string;
  };
};

type IImgflipCaptionResult =
  | {
      success: true;
      url: string;
    }
  | {
      success: false;
      error: string;
    };

const imgflipCaption = async (
  args: IImgflipCaptionArgs,
): Promise<IImgflipCaptionResult> => {
  try {
    const getText0 = () => {
      if (args.text0) {
        return { text0: args.text0 };
      }

      return {};
    };

    const getText1 = () => {
      if (args.text1) {
        return { text1: args.text1 };
      }

      return {};
    };

    const response = await imgflipApi('/caption_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: objToUrlEncoded({
        template_id: args.templateId,
        username: config.IMGFLIP_USERNAME,
        password: config.IMGFLIP_PASSWORD,
        ...getText0(),
        ...getText1(),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to generate quote',
      };
    }

    const json = (await response.json()) as IImgflipCaptionResponse;

    if (!json.success) {
      return {
        success: false,
        error: 'Failed to generate quote',
      };
    }

    return {
      success: true,
      url: json.data.url,
    };
  } catch (error) {
    logger.error({ error });
    return {
      success: false,
      error: 'Failed to generate quote',
    };
  }
};

export { imgflipCaption };
