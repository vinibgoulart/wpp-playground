import imageToBase64 from 'image-to-base64';
import Jimp from 'jimp';
import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../../imgflip/imgflipCaption';
import { quoteExamples } from '../../../imgflip/quote/quoteExamples';
import { getBase64 } from '../../../jimp/getBase64';
import { splitTextIntoLines } from '../../../jimp/strings';
import { middleware } from '../../middleware/middleware';
import COMMANDS from '../commands';
import { COMMANDS_COST } from '../commandsCost';

const getRandomTemplate = () =>
  quoteExamples[Math.floor(Math.random() * quoteExamples.length)];

const quoteMessage = async (msg: Message, preparedEvent: PreparedEvent) => {
  const quote = await msg.getQuotedMessage();
  if (quote.fromMe) {
    return msg.reply('You cannot quote the bot');
  }
  const text0 = quote.body ?? '';
  const text1 = msg.body.replace('!quote', '').trim();

  if (!quote.hasMedia) {
    const templateId = getRandomTemplate();
    const imgFlipCaptionResult = await imgflipCaption({
      templateId,
      text0,
      text1,
    });
    if (!imgFlipCaptionResult.success) {
      return msg.reply(imgFlipCaptionResult.error);
    }

    const base64 = await imageToBase64(imgFlipCaptionResult.url);
    const replyMedia = new MessageMedia('image/png', base64);
    return msg.reply(replyMedia, undefined, {
      sendMediaAsSticker: true,
    });
  }

  const media = await quote.downloadMedia();
  if (!media) {
    return msg.reply('Could not download media');
  }
  if (!media.mimetype.startsWith('image') || media.mimetype.includes('webp')) {
    return msg.reply('Only images are supported for this command.');
  }

  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  const image = await Jimp.read(Buffer.from(media.data, 'base64'));
  const textHeight = Jimp.measureTextHeight(font, 'M', image.bitmap.width);

  const text0Lines = splitTextIntoLines(text0, font, image.bitmap.width);
  let text0Y = 10;
  text0Lines.forEach((line) => {
    const lineWidth = Jimp.measureText(font, line);
    const x = (image.bitmap.width - lineWidth) / 2;
    image.print(font, x, text0Y, line);
    text0Y += textHeight;
  });

  const text1Lines = splitTextIntoLines(text1, font, image.bitmap.width);
  let text1Y = image.bitmap.height - text1Lines.length * textHeight - 10;
  text1Lines.forEach((line) => {
    const lineWidth = Jimp.measureText(font, line);
    const x = (image.bitmap.width - lineWidth) / 2;
    image.print(font, x, text1Y, line);
    text1Y += textHeight;
  });

  const base64 = await getBase64(Jimp.MIME_JPEG, image);

  preparedEvent.patchMetadata({
    width: image.bitmap.width,
    height: image.bitmap.height,
    textSize: text0.length + text1.length,
    lines: text0Lines.length + text1Lines.length,
  });
  msg.reply(new MessageMedia('image/jpeg', base64), undefined, {
    sendMediaAsSticker: true,
  });
};

export default middleware(quoteMessage, {
  cost: COMMANDS_COST.QUOTE,
});
