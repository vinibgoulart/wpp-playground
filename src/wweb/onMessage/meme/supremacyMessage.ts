import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';
import { middleware } from '../../middleware/middleware';

const supremacyMessage = async (msg: Message) => {
  const text1 = msg.body.replace('!supremacy', '').trim();

  if (!text1) {
    console.log('No text1');
    return;
  }

  const imgFlipCaptionResult = await imgflipCaption({
    templateId: '275700505',
    text1,
  });

  if (!imgFlipCaptionResult.success) {
    console.log('No success', imgFlipCaptionResult.error);

    return msg.reply(imgFlipCaptionResult.error);
  }

  const base64 = await imageToBase64(imgFlipCaptionResult.url);

  const replyMedia = new MessageMedia('image/png', base64);

  msg.reply(replyMedia, undefined, {
    sendMediaAsSticker: true,
  });

  console.log('Success');
};

export default middleware(supremacyMessage);
