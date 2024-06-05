import { client } from '../client';
import authorMessage from './meme/authorMessage';
import drakeMessage from './meme/drakeMessage';
import gptMessage from './gpt/gptMessage';
import incrivelMessage from './meme/incrivelMessage';
import quoteMessage from './meme/quoteMessage';
import defaultMessage from './gpt/defaultMessage';
import resumeMessage from './gpt/resumeMessage';
import resumeStartMessage from './gpt/resumeStartMessage';
import resumeStopMessage from './gpt/resumeStopMessage';
import tigerMessage from './meme/tigerMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    if (msg.fromMe) {
      return;
    }

    switch (true) {
      // gpt commands
      case msg.body.startsWith('!gpt'):
        return gptMessage(msg);
      // memes commands
      case msg.body.startsWith('!author'):
        return authorMessage(msg);
      case msg.body.startsWith('!quote'):
        return quoteMessage(msg);
      case msg.body.startsWith('!drake'):
        return drakeMessage(msg);
      case msg.body.startsWith('!incrivel'):
        return incrivelMessage(msg);
      case msg.body.startsWith('!tiger'):
        return tigerMessage(msg);
      // resume commands
      case msg.body === '!resume-start':
        return resumeStartMessage(msg);
      case msg.body === '!resume':
        return resumeMessage(msg);
      case msg.body === '!resume-stop':
        return resumeStopMessage(msg);
      default:
        return defaultMessage(msg);
    }
  });
};
