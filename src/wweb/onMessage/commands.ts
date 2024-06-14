import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { Message } from 'whatsapp-web.js';
import textToSpeechMessage from './audio/textToSpeechMessage';
import transcriptAudioMessage from './audio/transcriptAudioMessage';
import groupIdMessage from './debug/groupIdMessage';
import githubMessage from './githubMessage';
import gptConfigContextMessage from './gpt/gptConfigContextMessage';
import gptMessage from './gpt/gptMessage';
import resumeMessage from './gpt/resumeMessage';
import resumeMessageQty from './gpt/resumeMessageQty';
import helpMessage from './helpMessage';
import initMessage from './initMessage';
import authorMessage from './meme/authorMessage';
import darksoulsMessage from './meme/darksoulsMessage';
import drakeMessage from './meme/drakeMessage';
import incrivelMessage from './meme/incrivelMessage';
import interestelarMessage from './meme/interestelarMessage';
import quoteMessage from './meme/quoteMessage';
import senhoresMessage from './meme/senhoresMessage';
import supremacyMessage from './meme/supremacyMessage';
import tigerMessage from './meme/tigerMessage';
import tradeOfferMessage from './meme/tradeOfferMessage';
import startListeningMessage from './startListeningMessage';
import stopListeningMessage from './stopListeningMessage';
type Commands = Record<
  string,
  {
    name: string;
    description?: string;
    example?: string;
    action: (msg: Message, preparedEvent: PreparedEvent) => unknown;
  }
>;

const COMMANDS: Commands = {
  // gpt commands
  GPT_CONFIG_CONTEXT: {
    name: '!gpt-config-context',
    description: 'Set the context for the GPT',
    example: '!gpt-config-context You are a bot in a marketing group chat',
    action: gptConfigContextMessage,
  },
  GPT: {
    name: '!gpt',
    description: 'Ask to Chat GPT',
    example: '!gpt Hi, how are you?',
    action: gptMessage,
  },
  // text to speech commands
  AUDIO: {
    name: '!audio',
    description: 'Convert text to speech',
    example: '!audio good morning group!',
    action: textToSpeechMessage,
  },
  TRANSCRIPT: {
    name: '!transcript',
    description: 'Convert audio from the quoted message to text',
    example: '!transcript',
    action: transcriptAudioMessage,
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
  INTERESTELAR: {
    name: '!interestelar',
    description:
      'Create a sticker with interestelar this little maneuver is gonna cost us 51 years meme',
    example: '!interestelar finish this issue',
    action: interestelarMessage,
  },
  SENHORES: {
    name: '!senhores',
    description:
      'Create a sticker with Gus Fring meme using the message "Senhores" and the message',
    example: '!senhores good morning',
    action: senhoresMessage,
  },
  SUPREMACY: {
    name: '!supremacy',
    description:
      'Create a sticker with i believe in ---- supremacy meme using the message',
    example: '!supremacy taylor swift',
    action: supremacyMessage,
  },
  DARKSOULS: {
    name: '!darksouls',
    description: 'Create a sticker with Dark Souls meme using the message',
    example: '!darksouls jr startup dev - sr faang dev',
    action: darksoulsMessage,
  },
  // resume commands
  RESUME_QTY: {
    name: '!resume-qty',
    description: 'Resume the last specified number of messages',
    example: '!resume-qty <qty>',
    action: resumeMessageQty,
  },
  RESUME: {
    name: '!resume',
    description: 'Resume the last group messages',
    example: '!resume',
    action: resumeMessage,
  },
  // bot commands
  INIT: {
    name: '!init',
    action: initMessage,
  },
  START_LISTENING: {
    name: '!start-listening',
    description: 'Start to listening messages',
    example: '!start-listening',
    action: startListeningMessage,
  },
  STOP_LISTENING: {
    name: '!stop-listening',
    description: 'Stop to listening messages',
    example: '!stop-listening',
    action: stopListeningMessage,
  },
  GROUP_ID: {
    name: '!group-id',
    description: 'Get the group id',
    example: '!group-id',
    action: groupIdMessage,
  },
  HELP: {
    name: '!help',
    description: 'Show all available commands',
    example: '!help',
    action: helpMessage,
  },
  GITHUB: {
    name: '!github',
    description: 'Get the github repository link',
    example: '!github',
    action: githubMessage,
  },
};

export default COMMANDS;
