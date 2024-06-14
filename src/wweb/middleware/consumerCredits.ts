import { Message } from 'whatsapp-web.js';

import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { groupCommandCost } from '../../group/groupCommandCost';
import GroupModel from '../../group/groupModel';

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

  preparedEvent.patchMetadata({ cost });
  preparedEvent.patchMetadata({ groupCredits: group.credits });
  if (group.credits < cost) {
    return {
      error: 'Insufficient credits',
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
