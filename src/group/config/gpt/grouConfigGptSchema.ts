import { Document } from 'mongodb';
import { Schema } from 'mongoose';

export type IGroupConfigGpt = {
  resumeLimit: number;
  resumeDailySigned: boolean;
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
    resumeDailySigned: {
      type: Boolean,
      required: true,
      default: false,
      description: 'GroupConfigGpt resumeDailySigned',
    },
  },
  {
    collection: 'GroupConfigGpt',
    timestamps: false,
  },
);

export { groupConfigGptSchema };
