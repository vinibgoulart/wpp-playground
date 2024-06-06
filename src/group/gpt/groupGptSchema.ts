import { Document } from 'mongodb';
import { Schema } from 'mongoose';

export type IGroupGpt = {
  context: string;
};

type GroupGptDocument = Document & IGroupGpt;

const groupGptSchema = new Schema<GroupGptDocument>(
  {
    context: {
      type: String,
      required: false,
      description: 'GroupGpt context',
    },
  },
  {
    collection: 'GroupGpt',
    timestamps: false,
  },
);

export { groupGptSchema };
