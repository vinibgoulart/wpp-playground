import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';

const tigerMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const text1 = msg.body.replace('!tiger', '').trim();

  if (!text1) {
    return;
  }

  const imgFlipCaptionResult = await imgflipCaption({
    randomTemplatedId: '517345772',
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

export default tigerMessage;
