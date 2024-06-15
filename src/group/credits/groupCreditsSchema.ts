import { Document } from 'mongodb';
import { Schema } from 'mongoose';
import { GROUP_CREDITS_TYPE_ENUM } from './groupCreditsTypeEnum';

export type IGroupCredits = {
  messageId: string;
  value: number;
  type: GROUP_CREDITS_TYPE_ENUM;
  providerChargeId?: string;
};

type GroupCreditsDocument = Document & IGroupCredits;

const groupCreditsSchema = new Schema<GroupCreditsDocument>(
  {
    messageId: {
      type: String,
      required: true,
      description: 'GroupCredits messageId',
    },
    value: {
      type: Number,
      required: true,
      description: 'GroupCredits credits',
    },
    type: {
      type: String,
      enum: GROUP_CREDITS_TYPE_ENUM,
      required: true,
      description: 'GroupCredits type',
    },
    providerChargeId: {
      type: String,
      required: false,
      description: 'GroupCredits providerChargeId',
    },
  },
  {
    collection: 'GroupCredits',
    timestamps: true,
  },
);

export { groupCreditsSchema };
