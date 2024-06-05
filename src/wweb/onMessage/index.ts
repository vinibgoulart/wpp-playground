import { client } from '../client';
import drakeMessage from './drakeMessage';
import girlfriendMessage from './girlfriendMessage';
import gptMessage from './gptMessage';
import incrivelMessage from './incrivelMessage';
import quoteMessage from './quoteMessage';
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
      case msg.body.startsWith('!girlfriend'):
        return girlfriendMessage(msg);
      case msg.body.startsWith('!incrivel'):
        return incrivelMessage(msg);
      case msg.body.startsWith('!tiger'):
        return tigerMessage(msg);
    }
  });
};
