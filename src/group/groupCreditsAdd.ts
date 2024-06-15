import { GROUP_CREDITS_TYPE_ENUM } from './credits/groupCreditsTypeEnum';
import GroupModel from './groupModel';

type IGroupCreditsAddArgs = {
  groupId: string;
  credits: number;
  providerChargeId?: string;
  messageId: string;
};

export const groupCreditsAdd = async (args: IGroupCreditsAddArgs) => {
  const group = await GroupModel.findOne({ groupId: args.groupId });

  if (!group) {
    return {
      success: false,
      error: 'Group not found',
    };
  }

  const hasEntry = group.creditsHistory.some(
    (entry) =>
      entry.messageId === args.messageId &&
      entry.providerChargeId === args.providerChargeId &&
      entry.type === GROUP_CREDITS_TYPE_ENUM.CREDIT,
  );

  if (hasEntry) {
    return {
      success: false,
      error: 'Group already credited for this message',
    };
  }

  const newCredits = group.credits + args.credits;

  const groupUpdated = await GroupModel.findOneAndUpdate(
    { groupId: args.groupId },
    {
      $set: {
        credits: newCredits,
      },
      $push: {
        creditsHistory: {
          type: GROUP_CREDITS_TYPE_ENUM.CREDIT,
          value: args.credits,
          providerChargeId: args.providerChargeId,
          messageId: args.messageId,
        },
      },
    },
    { new: true },
  );

  return {
    success: true,
    group: groupUpdated,
  };
};
