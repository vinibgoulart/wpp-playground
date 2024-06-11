import { Document } from 'mongodb';
import { model, Schema } from 'mongoose';
import { IMessage, messageSchema } from './message/messageSchema';
import { groupGptSchema, IGroupGpt } from './gpt/groupGptSchema';
import { groupResumeSchema, IGroupResume } from './resume/resumeSchema';

type IGroup = {
  groupId: string;
  isListening: boolean;
  messages: IMessage[];
  resume: IGroupResume;
  gpt: IGroupGpt;
  lng: string;
  credits: number;
};

export type GroupDocument = Document & IGroup;

const GroupSchema = new Schema<GroupDocument>(
  {
    groupId: {
      type: String,
      required: true,
      index: true,
      description: 'Group groupId',
    },
    isListening: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
      description: 'Group isListening',
    },
    messages: {
      type: [messageSchema],
      required: false,
      description: 'Group messages',
      default: [],
    },
    resume: {
      type: groupResumeSchema,
      required: false,
      description: 'GroupResume',
    },
    gpt: {
      type: groupGptSchema,
      required: false,
      description: 'GroupConfigGpt',
    },
    lng: {
      type: String,
      required: false,
      description: 'GroupConfig lng',
      default: 'ptbr',
    },
    credits: {
      type: Number,
      default: 200,
    },
    removedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Group',
    timestamps: true,
  },
);

export const GroupModel = model<GroupDocument>('Group', GroupSchema);

export default GroupModel;
