import getGroupID from './debug/getGroupID';
import logsMessage from './debug/logs';
import gptMessage from './gpt/gptMessage';
import resumeMessage from './gpt/resumeMessage';
import resumeStartMessage from './gpt/resumeStartMessage';
import resumeStopMessage from './gpt/resumeStopMessage';
import helpMessage from './helpMessage';
import initMessage from './initMessage';
import authorMessage from './meme/authorMessage';
import drakeMessage from './meme/drakeMessage';
import incrivelMessage from './meme/incrivelMessage';
import quoteMessage from './meme/quoteMessage';
import tigerMessage from './meme/tigerMessage';
import tradeOfferMessage from './meme/tradeOfferMessage';

const COMMANDS = {
  // gpt commands
  GPT: {
    name: '!gpt',
    description: 'Ask to Chat GPT',
    example: '!gpt Hi, how are you?',
    action: gptMessage,
  },
  // memes commands
  AUTHOR: {
    name: '!author',
    description: 'Get the author of a message in a sticker with the message',
    example: '!author',
    action: authorMessage,
  },
  QUOTE: {
    name: '!quote',
    description:
      'Create a sticker with the message in a random meme template, or with the image from the quoted message',
    example: '!quote',
    action: quoteMessage,
  },
  DRAKE: {
    name: '!drake',
    description: 'Create a sticker with Drake meme using the message',
    example: '!drake barcelona - real madrid',
    action: drakeMessage,
  },
  INCRIVEL: {
    name: '!incrivel',
    description: 'Create a sticker with Mr. Incredible meme using the message',
    example: '!incrivel java - script',
    action: incrivelMessage,
  },
  TIGER: {
    name: '!tiger',
    description: 'Create a sticker with Tiger meme using the message',
    example: '!tiger cashback pix',
    action: tigerMessage,
  },
  TRADE_OFFER: {
    name: '!trade-offer',
    description: 'Create a sticker with trade offer meme using the message',
    example: '!trade-offer bean - delicious coffe',
    action: tradeOfferMessage,
  },
  // resume commands
  RESUME_START: {
    name: '!resume-start',
    description: 'Start to listening messages to resume them later',
    example: '!resume-start',
    action: resumeStartMessage,
  },
  RESUME: {
    name: '!resume',
    description: 'Resume the last group messages',
    example: '!resume',
    action: resumeMessage,
  },
  RESUME_STOP: {
    name: '!resume-stop',
    description: 'Stop to listening messages',
    example: '!resume-stop',
    action: resumeStopMessage,
  },
  LOGS: {
    name: '!logs',
    action: logsMessage,
  },
  // translate commands
  TRANSLATE_START: {
    name: '!translate-start',
    action: () => {},
  },
  // bot commands
  INIT: {
    name: '!init',
    action: initMessage,
  },
  GROUP_ID: {
    name: '!group-id',
    description: 'Get the group id',
    example: '!group-id',
    action: getGroupID,
  },
  HELP: {
    name: '!help',
    description: 'Show all available commands',
    example: '!help',
    action: helpMessage,
  },
};

export default COMMANDS;
