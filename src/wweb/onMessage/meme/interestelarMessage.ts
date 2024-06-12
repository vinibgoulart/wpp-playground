import { Message, MessageMedia } from 'whatsapp-web.js';
import { imgflipCaption } from '../../../imgflip/imgflipCaption';
import imageToBase64 from 'image-to-base64';
import { middleware } from '../../middleware/middleware';

const interestelarMessage = async (msg: Message) => {
    const text0 = msg.body.replace('!interestelar', '').trim();

    if (!text0) {
        return;
    }

    const imgFlipCaptionResult = await imgflipCaption({
        randomTemplatedId: '219674435',
        text0,
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

export default middleware(interestelarMessage);
