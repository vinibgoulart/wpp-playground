import { Message } from 'whatsapp-web.js';

import COMMANDS from '../onMessage/commands';
import GroupModel from '../../group/groupModel';

const getCreditsDiscountPerCommand = (command: string): number => {
  if (command === COMMANDS.GPT.name) {
    return 8;
  }

  if (command === COMMANDS.RESUME.name) {
    return 10;
  }

  return 2;
};

export const consumerCredits = async (msg: Message): Promise<void> => {
  const groupId = msg.id.remote;
  const command = msg.body;
  const ignoreCommands = [COMMANDS.INIT.name, COMMANDS.HELP.name];

  if (ignoreCommands.includes(msg.body)) {
    return;
  }

  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
    isListening: true,
  });

  if (!group) {
    console.log('Group not found');

    return;
  }

  const creditsUpdated = group.credits - getCreditsDiscountPerCommand(command);

  const groupUpdated = await GroupModel.findOneAndUpdate(
    {
      groupId,
      removedAt: null,
      isListening: true,
    },
    {
      $set: {
        credits: creditsUpdated,
      },
    },
    {
      new: true,
    },
  );

  if (!groupUpdated) {
    console.log('Group not found');

    return;
  }

  console.log(
    `Group ${groupUpdated.groupId} has ${groupUpdated.credits} credits`,
  );
};
