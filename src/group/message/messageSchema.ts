import { Document } from 'mongodb';
import { Schema } from 'mongoose';

export type IMessage = {
  message: string;
  sender: string;
  time: Date;
  resumedAt?: Date;
};

type MessageDocument = Document & IMessage;

const messageSchema = new Schema<MessageDocument>(
  {
    message: {
      type: String,
      required: true,
      description: 'Message',
    },
    sender: {
      type: String,
      required: true,
      description: 'Sender',
    },
    time: {
      type: Date,
      required: false,
      description: 'Time',
    },
    resumedAt: {
      type: Date,
      required: false,
      description: 'Resumed At',
    },
  },
  {
    collection: 'Message',
    timestamps: false,
  },
);

export { messageSchema };
