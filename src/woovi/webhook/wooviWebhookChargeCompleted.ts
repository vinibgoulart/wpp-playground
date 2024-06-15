import { Request, Response } from 'express';
import { groupCreditsAdd } from 'src/group/groupCreditsAdd';
import { logger } from 'src/telemetry/logger';

type IWooviWebhookChargeCompleted = {
  event: 'OPENPIX:CHARGE_COMPLETED';
  charge: {
    value: string;
    identifier: string;
    correlationID: string;
    paymentLinkID: string;
    transactionID: string;
    status: string;
    additionalInfo: Record<string, unknown>[];
    fee: number;
    discount: number;
    valueWithDiscount: string;
    expiresDate: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    paidAt: string;
    brCode: string;
    expiresIn: number;
    pixKey: string;
    paymentLinkUrl: string;
    qrCodeImage: string;
    globalID: string;
  };
};

export const wooviWebhookChargeCompleted = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as IWooviWebhookChargeCompleted;

  console.log({ req });
  console.log({ bd: req.body });

  if (body.event !== 'OPENPIX:CHARGE_COMPLETED') {
    res.status(200).json({ message: 'Webhook received' });
    logger.error(`Invalid event charge woovi: ${body.event}`);
    return;
  }

  if (body.charge.status !== 'COMPLETED') {
    res.status(200).json({ message: 'Webhook received' });
    logger.error(`Invalid status charge woovi: ${body.charge.status}`);
    return;
  }

  const groupId = body.charge.additionalInfo.find(
    (info) => info.key === 'groupId',
  );

  if (!groupId) {
    res.status(200).json({ message: 'Webhook received' });
    logger.error('Group ID not found in charge woovi');
    return;
  }

  await groupCreditsAdd({
    groupId: groupId?.value as string,
    credits: Number(body.charge.value),
    messageId: body.charge.correlationID,
    providerChargeId: body.charge.identifier,
  });

  res.status(200).json({ message: 'Webhook received' });
};
