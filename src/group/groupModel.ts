import { Document } from 'mongodb';
import { model, Schema } from 'mongoose';
import { IMessage, messageSchema } from './message/messageSchema';

type IGroup = {
  groupId: string;
  isListening: boolean;
  lastResume: Date;
  messages: IMessage[];
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
    lastResume: {
      type: Date,
      required: false,
      description: 'Group lastResume',
    },
    messages: {
      type: [messageSchema],
      required: false,
      description: 'Group messages',
      default: [],
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
