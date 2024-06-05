const prompts = {
  resume: (lng: string) =>
    `I have a chat group on Whatsapp and I want to summarize the conversation, use continuous text to summarize this chat conversation for me. You can be brief and only provide relevant, to-the-point information. Do it as if you were writing a TLDR. Use the full name of the senders. Summarize in language ${lng}`,
};

export { prompts };
