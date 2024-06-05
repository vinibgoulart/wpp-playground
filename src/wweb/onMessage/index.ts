import { client } from '../client';
import authorMessage from './meme/authorMessage';
import drakeMessage from './meme/drakeMessage';
import gptMessage from './gpt/gptMessage';
import incrivelMessage from './meme/incrivelMessage';
import quoteMessage from './meme/quoteMessage';
import defaultMessage from './defaultMessage';
import resumeMessage from './gpt/resumeMessage';
import resumeStartMessage from './gpt/resumeStartMessage';
import resumeStopMessage from './gpt/resumeStopMessage';
import tigerMessage from './meme/tigerMessage';
import helpMemeMessage from './help/helpMemeMessage';
import helpGptMessage from './help/helpGptMessage';

export const onMessage = () => {
  client.on('message_create', async (msg) => {
    switch (true) {
      // help commands
      case msg.body === '!help-meme':
        return helpMemeMessage(msg);
      case msg.body === '!help-gpt':
        return helpGptMessage(msg);
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
