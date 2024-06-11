import { Message } from 'whatsapp-web.js';

import GroupModel from '../../group/groupModel';
import { groupCommandCost } from '../../group/groupCommandCost';

const getCreditsDiscountPerCommand = (command: string): number => {
  // @ts-ignore
  const customCommandCost = groupCommandCost[command];

  return customCommandCost || 2;
};

export const consumerCredits = async (
  msg: Message,
): Promise<{ error: string | null }> => {
  const groupId = msg.id.remote;
  const command = msg.body;

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

  const commandCost = getCreditsDiscountPerCommand(command);

  if (group.credits < commandCost) {
    return {
      error: 'Insufficient credits',
    };
  }

  const creditsUpdated = group.credits - commandCost;

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
