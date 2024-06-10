import { client } from '../client';
import logsMessage from './debug/logs';
import defaultMessage from './defaultMessage';
import gptMessage from './gpt/gptMessage';
import resumeMessage from './gpt/resumeMessage';
import resumeStartMessage from './gpt/resumeStartMessage';
import resumeStopMessage from './gpt/resumeStopMessage';
import initMessage from './initMessage';
import authorMessage from './meme/authorMessage';
import drakeMessage from './meme/drakeMessage';
import incrivelMessage from './meme/incrivelMessage';
import quoteMessage from './meme/quoteMessage';
import tigerMessage from './meme/tigerMessage';
import tradeOfferMessage from './meme/tradeOfferMessage';
export const onMessage = () => {
  client.on('message_create', async (msg) => {
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
      case msg.body.startsWith('!trade-offer'):
        return tradeOfferMessage(msg);
      // resume commands
      case msg.body === '!resume-start':
        return resumeStartMessage(msg);
      case msg.body === '!resume':
        return resumeMessage(msg);
      case msg.body === '!resume-stop':
        return resumeStopMessage(msg);
      case msg.body === '!logs':
        return logsMessage(msg);
      // trasnlate commands
      case msg.body.startsWith('!translate-start'):
        return;
      // bot commands
      case msg.body === '!init':
        return initMessage(msg);
      default:
        return defaultMessage(msg);
    }
  });
};
