import { Message } from 'whatsapp-web.js';

import COMMANDS from '../onMessage/commands';
import GroupModel from '../../group/groupModel';

const getCreditsDiscountPerCommand = (command: string): number => {
  if (command === COMMANDS.GPT.name) {
    return 8;
  }

  if (command === COMMANDS.RESUME.name) {
    return 10;
  }

  return 2;
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

  const creditsDiscount = getCreditsDiscountPerCommand(command);

  if (group.credits < creditsDiscount) {
    return {
      error: 'Insufficient credits',
    };
  }

  const creditsUpdated = group.credits - creditsDiscount;

  const groupUpdated = await GroupModel.findOneAndUpdate(
    {
      groupId,
      removedAt: null,
      isListening: true,
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
