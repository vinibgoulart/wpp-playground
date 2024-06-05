import { client } from '../client';
import defaultMessage from './defaultMessage';
import drakeMessage from './drakeMessage';
import gptMessage from './gptMessage';
import incrivelMessage from './incrivelMessage';
import quoteMessage from './quoteMessage';
import resumeMessage from './resumeMessage';
import startMessage from './startMessage';
import stopMessage from './stopMessage';
import tigerMessage from './tigerMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    switch (true) {
      case msg.body.startsWith('!gpt'):
        return gptMessage(msg);
      case msg.body.startsWith('!quote'):
        return quoteMessage(msg);
      case msg.body.startsWith('!drake'):
        return drakeMessage(msg);
      case msg.body.startsWith('!incrivel'):
        return incrivelMessage(msg);
      case msg.body.startsWith('!tiger'):
        return tigerMessage(msg);
      case msg.body === '!start':
        return startMessage(msg);
      case msg.body === '!resume':
        return resumeMessage(msg);
      case msg.body === '!stop':
        return stopMessage(msg);
      default:
        return defaultMessage(msg);
    }
  });
};
