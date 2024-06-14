import { Message, MessageMedia } from 'whatsapp-web.js';
import { middleware } from '../middleware/middleware';
import GroupModel from 'src/group/groupModel';
import { COMMANDS_COST } from './commandsCost';
import { wooviChargeCreate } from 'src/woovi/wooviChargeCreate';
import imageToBase64 from 'image-to-base64';

const chargeMessage = async (msg: Message) => {
  const qty = msg.body.replace('!charge', '').trim();

  if (!qty) {
    return;
  }

  if (isNaN(Number(qty))) {
    return msg.reply('Invalid value');
  }

  if (Number(qty) < 100) {
    return msg.reply('Invalid value, minimum is 100');
  }

  const groupId = msg.id.remote;

  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
  });

  if (!group) {
    return msg.reply('Group not found, run !init');
  }

  const wooviCharge = await wooviChargeCreate({
    payload: {
      correlationID: msg.id.id,
      value: Number(qty),
    },
    groupId,
  });

  if (!wooviCharge.success) {
    return msg.reply(wooviCharge.error);
  }

  const base64 = await imageToBase64(wooviCharge.qrCodeImage);

  const qrCodeMedia = new MessageMedia('image/png', base64);

  msg.reply(qrCodeMedia, undefined, {
    caption: `Scan the QR code to pay or use the pix copy paste: \n${wooviCharge.brCode}\n\nAlso you can access the payment link: ${wooviCharge.paymentLinkUrl}`,
  });
};

export default middleware(chargeMessage, {
  cost: COMMANDS_COST.CHARGE,
});
