import { FlattenMaps } from 'mongoose';
import { IMessage } from './messageSchema';

export const messageParseToGpt = (messages: FlattenMaps<IMessage>[]) => {
  return messages
    .map((msg) => msg.sender && `${msg.sender.split(' ')[0]}: ${msg.message}`)
    .join('\n');
};
