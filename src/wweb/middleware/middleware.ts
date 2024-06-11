import { Message } from 'whatsapp-web.js';

import { isListening as _isListening } from './isListening';
import { consumerCredits } from './consumerCredits';

type MiddlewareOptions = {
  isListening?: boolean;
  consumeCredits?: boolean;
  onlyOwner?: boolean;
};

export const middleware = (
  next: (msg: Message) => unknown,
  {
    isListening = false,
    consumeCredits = true,
    onlyOwner = false,
  }: MiddlewareOptions = {},
) => {
  return async (msg: Message) => {
    // if onlyOwner is true, the message will only be processed if it is sent by the owner,
    // otherwise it will only be processed if it is not sent by the owner
    if (onlyOwner) {
      if (!msg.fromMe) {
        return;
      }
    } else {
      if (msg.fromMe) {
        return;
      }
    }

    if (consumeCredits) {
      const { error } = await consumerCredits(msg);

      if (error) {
        // Reply with the error message
        msg.reply(error);

        return;
      }
    }

    if (isListening) {
      const listening = await _isListening(msg);

      if (!listening) {
        return;
      }

      return next(msg);
    }

    return next(msg);
  };
};
