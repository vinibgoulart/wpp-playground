type MessageParseToGptArgs = {
  sender: string;
  message: string;
};

export const messageParseToGpt = (messages: MessageParseToGptArgs[]) => {
  const sanitized = messages.filter((msg) => {
    return !msg.message.startsWith('!');
  });

  return sanitized
    .map((msg) => msg.sender && `${msg.sender.split(' ')[0]}: ${msg.message}`)
    .join('\n');
};
