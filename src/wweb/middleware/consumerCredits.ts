import { Message } from 'whatsapp-web.js';

import { PreparedEvent } from 'src/telemetry/preparedEvent';
import GroupModel from '../../group/groupModel';
import { GROUP_CREDITS_TYPE_ENUM } from 'src/group/credits/groupCreditsTypeEnum';

type IConsumerCreditsArgs = {
  msg: Message;
  preparedEvent: PreparedEvent;
  cost: number;
};

export const consumerCredits = async ({
  msg,
  preparedEvent,
  cost,
}: IConsumerCreditsArgs): Promise<{ error: string | null }> => {
  const groupId = msg.id.remote;

  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
    isListening: true,
  });

  if (!group) {
    return {
      error: 'Group not found',
    };
  }

  const hasEntry = group.creditsHistory.some(
    (entry) =>
      entry.messageId === msg.id.id &&
      entry.type === GROUP_CREDITS_TYPE_ENUM.DEBIT,
  );

  if (hasEntry) {
    return {
      error: 'Group already debited for this message',
    };
  }

  preparedEvent.patchMetadata({ cost });
  preparedEvent.patchMetadata({ groupCredits: group.credits });
  if (group.credits < cost) {
    return {
      error: `Insufficient credit, current: ${group.credits} needed: ${cost}. Run !charge <value> to add credits.`,
    };
  }

  const creditsUpdated = group.credits - cost;

  const groupUpdated = await GroupModel.findOneAndUpdate(
    {
      _id: group._id,
    },
    {
      $set: {
        credits: creditsUpdated,
      },
      $push: {
        creditsHistory: {
          type: GROUP_CREDITS_TYPE_ENUM.DEBIT,
          value: cost,
          messageId: msg.id.id,
        },
      },
    },
    {
      new: true,
    },
  );

  if (!groupUpdated) {
    return {
      error: 'Group not found',
    };
  }

  return {
    error: null,
  };
};
