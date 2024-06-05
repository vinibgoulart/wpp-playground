import imageToBase64 from 'image-to-base64';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../imgflip/imgflipCaption';
import { quoteExamples } from '../../imgflip/quote/quoteExamples';

const quoteMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const quote = await msg.getQuotedMessage();

  if (!quote.body) {
    return;
  }

  const randomTemplatedId =
    quoteExamples[Math.floor(Math.random() * quoteExamples.length)];

  const text1 = msg.body.replace('!quote', '').trim();

  const imgFlipCaptionResult = await imgflipCaption({
    randomTemplatedId,
    text0: quote.body,
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

export default quoteMessage;
