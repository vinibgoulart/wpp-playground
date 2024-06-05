import GroupModel from './groupModel';

type IGroupCreateArgs = {
  payload: {
    groupId: string;
  };
};

const groupCreate = async (args: IGroupCreateArgs) => {
  const { payload } = args;

  const groupExists = await GroupModel.findOne({
    groupId: payload.groupId,
    removedAt: null,
  });

  if (groupExists) {
    return groupExists;
  }

  const group = await new GroupModel(payload).save();

  return group;
};

export { groupCreate };
