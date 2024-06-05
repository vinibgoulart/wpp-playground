import { Document } from 'mongodb';
import { Schema } from 'mongoose';
import {
  groupConfigGptSchema,
  IGroupConfigGpt,
} from './gpt/grouConfigGptSchema';

export type IGroupConfig = {
  gpt: IGroupConfigGpt;
};

type GroupConfigDocument = Document & IGroupConfig;

const groupConfigSchema = new Schema<GroupConfigDocument>(
  {
    gpt: {
      type: groupConfigGptSchema,
      required: true,
      description: 'GroupConfigGpt',
    },
  },
  {
    collection: 'GroupConfig',
    timestamps: false,
  },
);

export { groupConfigSchema };
