import GroupModel from '../groupModel';
import { IMessage } from './messageSchema';

type IMessageCreateArgs = {
  payload: IMessage;
  groupId: string;
};

const messageCreate = async (args: IMessageCreateArgs) => {
  const { payload, groupId } = args;

  const group = await GroupModel.findOne({
    groupId,
    removedAt: null,
    isListening: true,
  });

  if (!group) {
    return null;
  }

  const groupUpdated = await GroupModel.findOneAndUpdate(
    {
      groupId,
      removedAt: null,
      isListening: true,
    },
    {
      $push: {
        messages: payload,
      },
    },
    {
      new: true,
    },
  );

  return groupUpdated;
};

export { messageCreate };
