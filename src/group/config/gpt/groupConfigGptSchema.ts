import { Document } from 'mongodb';
import { Schema } from 'mongoose';

export type IGroupConfigGpt = {
  resumeLimit: number;
};

type GroupConfigGptDocument = Document & IGroupConfigGpt;

const groupConfigGptSchema = new Schema<GroupConfigGptDocument>(
  {
    resumeLimit: {
      type: Number,
      required: true,
      default: 5,
      description: 'GroupConfigGpt resumeLimit',
    },
  },
  {
    collection: 'GroupConfigGpt',
    timestamps: false,
  },
);

export { groupConfigGptSchema };
