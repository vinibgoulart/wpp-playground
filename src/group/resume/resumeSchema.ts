import { Document } from 'mongodb';
import { Schema } from 'mongoose';

export type IGroupResume = {
  lastResume?: Date;
  qty?: number;
  dailySigned: boolean;
};

type GroupResumeDocument = Document & IGroupResume;

const groupResumeSchema = new Schema<GroupResumeDocument>(
  {
    lastResume: {
      type: Date,
      required: false,
      description: 'Group lastResume',
    },
    qty: {
      type: Number,
      required: false,
      description: 'Group resumesQty',
      default: 0,
    },
    dailySigned: {
      type: Boolean,
      required: true,
      default: false,
      description: 'GroupConfigGpt resumeDailySigned',
    },
  },
  {
    collection: 'Message',
    timestamps: false,
  },
);

export { groupResumeSchema };
