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
import languageMessage from './languageMessage';
import { COMMANDS_TYPES_ENUM } from './commandsTypeEnum';
import configMessage from './configMessage';

type ICommands = {
  [key in COMMANDS_TYPES_ENUM]: {
    name: string;
    description?: string;
    example?: string;
    action: (msg: Message, preparedEvent: PreparedEvent) => void;
  };
};

const COMMANDS: ICommands = {
  // gpt commands
  [COMMANDS_TYPES_ENUM.GPT_CONFIG_CONTEXT]: {
    name: '!gpt-config-context',
    description: 'Set the context for the GPT',
    example: '!gpt-config-context You are a bot in a marketing group chat',
    action: gptConfigContextMessage,
  },
  [COMMANDS_TYPES_ENUM.GPT]: {
    name: '!gpt',
    description: 'Ask to Chat GPT',
    example: '!gpt Hi, how are you?',
    action: gptMessage,
  },
  // text to speech commands
  [COMMANDS_TYPES_ENUM.AUDIO]: {
    name: '!audio',
    description: 'Convert text to speech',
    example: '!audio good morning group!',
    action: audioMessage,
  },
  [COMMANDS_TYPES_ENUM.TRANSCRIPT]: {
    name: '!transcript',
    description: 'Convert audio from the quoted message to text',
    example: '!transcript',
    action: transcriptMessage,
  },
  // memes commands
  [COMMANDS_TYPES_ENUM.AUTHOR]: {
    name: '!author',
    description: 'Get the author of a message in a sticker with the message',
    example: '!author',
    action: authorMessage,
  },
  [COMMANDS_TYPES_ENUM.QUOTE]: {
    name: '!quote',
    description:
      'Create a sticker with the message in a random meme template, or with the image from the quoted message',
    example: '!quote',
    action: quoteMessage,
  },
  [COMMANDS_TYPES_ENUM.DRAKE]: {
    name: '!drake',
    description: 'Create a sticker with Drake meme using the message',
    example: '!drake barcelona - real madrid',
    action: drakeMessage,
  },
  [COMMANDS_TYPES_ENUM.INCRIVEL]: {
    name: '!incrivel',
    description: 'Create a sticker with Mr. Incredible meme using the message',
    example: '!incrivel java - script',
    action: incrivelMessage,
  },
  [COMMANDS_TYPES_ENUM.TIGER]: {
    name: '!tiger',
    description: 'Create a sticker with Tiger meme using the message',
    example: '!tiger cashback pix',
    action: tigerMessage,
  },
  [COMMANDS_TYPES_ENUM.TRADE_OFFER]: {
    name: '!trade-offer',
    description: 'Create a sticker with trade offer meme using the message',
    example: '!trade-offer bean - delicious coffe',
    action: tradeOfferMessage,
  },
  [COMMANDS_TYPES_ENUM.INTERESTELAR]: {
    name: '!interestelar',
    description:
      'Create a sticker with interestelar this little maneuver is gonna cost us 51 years meme',
    example: '!interestelar finish this issue',
    action: interestelarMessage,
  },
  [COMMANDS_TYPES_ENUM.SENHORES]: {
    name: '!senhores',
    description:
      'Create a sticker with Gus Fring meme using the message "Senhores" and the message',
    example: '!senhores good morning',
    action: senhoresMessage,
  },
  [COMMANDS_TYPES_ENUM.SUPREMACY]: {
    name: '!supremacy',
    description:
      'Create a sticker with i believe in ---- supremacy meme using the message',
    example: '!supremacy taylor swift',
    action: supremacyMessage,
  },
  [COMMANDS_TYPES_ENUM.DARKSOULS]: {
    name: '!darksouls',
    description: 'Create a sticker with Dark Souls meme using the message',
    example: '!darksouls jr startup dev - sr faang dev',
    action: darksoulsMessage,
  },
  // resume commands
  [COMMANDS_TYPES_ENUM.RESUME_QTY]: {
    name: '!resume-qty',
    description: 'Resume the last specified number of messages',
    example: '!resume-qty <qty>',
    action: resumeMessageQty,
  },
  [COMMANDS_TYPES_ENUM.RESUME]: {
    name: '!resume',
    description: 'Resume the last group messages',
    example: '!resume',
    action: resumeMessage,
  },
  // bot commands
  [COMMANDS_TYPES_ENUM.INIT]: {
    name: '!init',
    action: initMessage,
  },
  [COMMANDS_TYPES_ENUM.START_LISTENING]: {
    name: '!start-listening',
    description: 'Start to listening messages',
    example: '!start-listening',
    action: startListeningMessage,
  },
  [COMMANDS_TYPES_ENUM.STOP_LISTENING]: {
    name: '!stop-listening',
    description: 'Stop to listening messages',
    example: '!stop-listening',
    action: stopListeningMessage,
  },
  [COMMANDS_TYPES_ENUM.GROUP_ID]: {
    name: '!group-id',
    description: 'Get the group id',
    example: '!group-id',
    action: groupIdMessage,
  },
  [COMMANDS_TYPES_ENUM.HELP]: {
    name: '!help',
    description: 'Show all available commands',
    example: '!help',
    action: helpMessage,
  },
  [COMMANDS_TYPES_ENUM.GITHUB]: {
    name: '!github',
    description: 'Get the github repository link',
    example: '!github',
    action: githubMessage,
  },
  [COMMANDS_TYPES_ENUM.LANGUAGE]: {
    name: '!language',
    description: 'Set the language of the bot',
    example: '!language <ptbr | en>',
    action: languageMessage,
  },
  [COMMANDS_TYPES_ENUM.CONFIG]: {
    name: '!config',
    description: 'See the bot configuration',
    example: '!config',
    action: configMessage,
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
