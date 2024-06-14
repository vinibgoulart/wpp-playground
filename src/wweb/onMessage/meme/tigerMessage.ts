import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';
import { middleware } from '../../middleware/middleware';
import COMMANDS from '../commands';

const tigerMessage = async (msg: Message) => {
  const text1 = msg.body.replace('!tiger', '').trim();

  if (!text1) {
    return;
  }

  const imgFlipCaptionResult = await imgflipCaption({
    templateId: '517345772',
    text1,
  });

  if (!imgFlipCaptionResult.success) {
    return msg.reply(imgFlipCaptionResult.error);
  }

  const base64 = await imageToBase64(imgFlipCaptionResult.url);

  const replyMedia = new MessageMedia('image/png', base64);

  msg.reply(replyMedia, undefined, {
    sendMediaAsSticker: true,
  });
};

export default middleware(tigerMessage, {
  cost: COMMANDS.TIGER.cost,
});
