import { Chat } from "whatsapp-web.js";

type SetSheetsInDescriptionOptions = {
  sheetsUrl: string;
};

export const setSheetsInDescription = (
  chat: Chat,
  options: SetSheetsInDescriptionOptions
) => {
  if (
    chat.groupMetadata.desc &&
    chat.groupMetadata.desc.includes("*Sheet Details*")
  ) {
    const descriptionWithoutLabel =
      chat.groupMetadata.desc.split("*Sheet Details*")[0];

    chat.setDescription(
      `${descriptionWithoutLabel}*Sheet Details*
      *URL*: ${options.sheetsUrl}`
    );

    return;
  }

  chat.setDescription(
    `${chat.groupMetadata.desc}
    *Sheet Details*
    *URL*: ${options.sheetsUrl}`
  );
};
