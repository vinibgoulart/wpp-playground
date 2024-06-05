import Jimp from 'jimp';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { getBase64 } from '../../../jimp/getBase64';
import { splitTextIntoLines } from '../../../jimp/strings';
import { middleware } from '../../middleware/middleware';

const authorMessage = async (msg: Message) => {
  try {
    const quote = await msg.getQuotedMessage();
    if (quote.fromMe) {
      return msg.reply('You cannot quote yourself');
    }

    const contact = await (quote || msg).getContact();
    const profilePic = await contact.getProfilePicUrl();
    const image = await Jimp.read(profilePic);

    let text = msg.body.replace('!author', '').trim();
    // Checks if the message contains any body text to be sent along with the author image. If it has, then the text will be used.
    // If not, then the text from the quoted message will be used.
    // If the quoted message doesn't have any text, then the author image will be sent as a sticker. And the function will be short-circuited.
    if (!text) {
      if (!quote?.body) {
        const base64 = await getBase64(Jimp.MIME_JPEG, image);
        return msg.reply(new MessageMedia('image/jpeg', base64), undefined, {
          sendMediaAsSticker: true,
        });
      }
      text = quote?.body.replace('!author', '').trim() || '';
    }

    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const lines = splitTextIntoLines(text, font, image.bitmap.width);
    const textHeight = Jimp.measureTextHeight(font, 'M', image.bitmap.width);

    // Define the initial y coordinate for the first line of text
    let y =
      image.bitmap.height -
      lines.length * textHeight - // Height of all lines of text. Using "M" as reference character.
      10; // 10 is margin from bottom

    // Print each line of text on the image
    lines.forEach((line) => {
      const lineWidth = Jimp.measureText(font, line);
      const x = (image.bitmap.width - lineWidth) / 2;
      image.print(font, x, y, line);
      y += textHeight;
    });

    const base64 = await getBase64(Jimp.MIME_JPEG, image);
    msg.reply(new MessageMedia('image/jpeg', base64), undefined, {
      sendMediaAsSticker: true,
    });
  } catch (error) {
    console.error(error);
    // @ts-expect-error: error is unknown
    msg.reply('An error occured while processing the image. ', error?.message);
  }
};

export default middleware(authorMessage);
