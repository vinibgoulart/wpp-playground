import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';
import { middleware } from '../../middleware/middleware';
import COMMANDS from '../commands';

const senhoresMessage = async (msg: Message) => {
  const text1 = msg.body.replace('!senhores', '').trim();

  if (!text1) {
    return;
  }

  const imgFlipCaptionResult = await imgflipCaption({
    templateId: '342785297',
    text0: 'senhores',
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

export default middleware(senhoresMessage, {
  cost: COMMANDS.SENHORES.cost,
});
