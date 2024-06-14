import { Message } from 'whatsapp-web.js';
import audioMessage from './audio/audioMessage';
import transcriptMessage from './audio/transcriptMessage';
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
import { PreparedEvent } from 'src/telemetry/preparedEvent';

enum COMMANDS_TYPES_ENUM {
  GPT_CONFIG_CONTEXT = 'GPT_CONFIG_CONTEXT',
  GPT = 'GPT',
  AUDIO = 'AUDIO',
  TRANSCRIPT = 'TRANSCRIPT',
  AUTHOR = 'AUTHOR',
  QUOTE = 'QUOTE',
  DRAKE = 'DRAKE',
  INCRIVEL = 'INCRIVEL',
  TIGER = 'TIGER',
  TRADE_OFFER = 'TRADE_OFFER',
  INTERESTELAR = 'INTERESTELAR',
  SENHORES = 'SENHORES',
  SUPREMACY = 'SUPREMACY',
  DARKSOULS = 'DARKSOULS',
  RESUME_QTY = 'RESUME_QTY',
  RESUME = 'RESUME',
  INIT = 'INIT',
  START_LISTENING = 'START_LISTENING',
  STOP_LISTENING = 'STOP_LISTENING',
  GROUP_ID = 'GROUP_ID',
  HELP = 'HELP',
  GITHUB = 'GITHUB',
}

type ICommands = {
  [key in COMMANDS_TYPES_ENUM]: {
    name: string;
    description?: string;
    example?: string;
    action: (msg: Message, preparedEvent: PreparedEvent) => void;
    cost: number;
  };
};

const COMMANDS: ICommands = {
  // gpt commands
  [COMMANDS_TYPES_ENUM.GPT_CONFIG_CONTEXT]: {
    name: '!gpt-config-context',
    description: 'Set the context for the GPT',
    example: '!gpt-config-context You are a bot in a marketing group chat',
    action: gptConfigContextMessage,
    cost: 2,
  },
  [COMMANDS_TYPES_ENUM.GPT]: {
    name: '!gpt',
    description: 'Ask to Chat GPT',
    example: '!gpt Hi, how are you?',
    action: gptMessage,
    cost: 5,
  },
  // text to speech commands
  [COMMANDS_TYPES_ENUM.AUDIO]: {
    name: '!audio',
    description: 'Convert text to speech',
    example: '!audio good morning group!',
    action: audioMessage,
    cost: 50,
  },
  [COMMANDS_TYPES_ENUM.TRANSCRIPT]: {
    name: '!transcript',
    description: 'Convert audio from the quoted message to text',
    example: '!transcript',
    action: transcriptMessage,
    cost: 12,
  },
  // memes commands
  [COMMANDS_TYPES_ENUM.AUTHOR]: {
    name: '!author',
    description: 'Get the author of a message in a sticker with the message',
    example: '!author',
    action: authorMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.QUOTE]: {
    name: '!quote',
    description:
      'Create a sticker with the message in a random meme template, or with the image from the quoted message',
    example: '!quote',
    action: quoteMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.DRAKE]: {
    name: '!drake',
    description: 'Create a sticker with Drake meme using the message',
    example: '!drake barcelona - real madrid',
    action: drakeMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.INCRIVEL]: {
    name: '!incrivel',
    description: 'Create a sticker with Mr. Incredible meme using the message',
    example: '!incrivel java - script',
    action: incrivelMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.TIGER]: {
    name: '!tiger',
    description: 'Create a sticker with Tiger meme using the message',
    example: '!tiger cashback pix',
    action: tigerMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.TRADE_OFFER]: {
    name: '!trade-offer',
    description: 'Create a sticker with trade offer meme using the message',
    example: '!trade-offer bean - delicious coffe',
    action: tradeOfferMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.INTERESTELAR]: {
    name: '!interestelar',
    description:
      'Create a sticker with interestelar this little maneuver is gonna cost us 51 years meme',
    example: '!interestelar finish this issue',
    action: interestelarMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.SENHORES]: {
    name: '!senhores',
    description:
      'Create a sticker with Gus Fring meme using the message "Senhores" and the message',
    example: '!senhores good morning',
    action: senhoresMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.SUPREMACY]: {
    name: '!supremacy',
    description:
      'Create a sticker with i believe in ---- supremacy meme using the message',
    example: '!supremacy taylor swift',
    action: supremacyMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.DARKSOULS]: {
    name: '!darksouls',
    description: 'Create a sticker with Dark Souls meme using the message',
    example: '!darksouls jr startup dev - sr faang dev',
    action: darksoulsMessage,
    cost: 0,
  },
  // resume commands
  [COMMANDS_TYPES_ENUM.RESUME_QTY]: {
    name: '!resume-qty',
    description: 'Resume the last specified number of messages',
    example: '!resume-qty <qty>',
    action: resumeMessageQty,
    cost: 10,
  },
  [COMMANDS_TYPES_ENUM.RESUME]: {
    name: '!resume',
    description: 'Resume the last group messages',
    example: '!resume',
    action: resumeMessage,
    cost: 10,
  },
  // bot commands
  [COMMANDS_TYPES_ENUM.INIT]: {
    name: '!init',
    action: initMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.START_LISTENING]: {
    name: '!start-listening',
    description: 'Start to listening messages',
    example: '!start-listening',
    action: startListeningMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.STOP_LISTENING]: {
    name: '!stop-listening',
    description: 'Stop to listening messages',
    example: '!stop-listening',
    action: stopListeningMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.GROUP_ID]: {
    name: '!group-id',
    description: 'Get the group id',
    example: '!group-id',
    action: groupIdMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.HELP]: {
    name: '!help',
    description: 'Show all available commands',
    example: '!help',
    action: helpMessage,
    cost: 0,
  },
  [COMMANDS_TYPES_ENUM.GITHUB]: {
    name: '!github',
    description: 'Get the github repository link',
    example: '!github',
    action: githubMessage,
    cost: 0,
  },
};

export const COMMANDS_NAMES = Object.keys(COMMANDS).reduce(
  (acc, key) => {
    acc[key] = COMMANDS[key].name;
    return acc;
  },
  {} as Record<COMMANDS_TYPES_ENUM, string>,
);

export default COMMANDS;
