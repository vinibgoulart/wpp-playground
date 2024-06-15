import { Message } from 'whatsapp-web.js';

import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { consumerCredits } from './consumerCredits';
import { isListening as _isListening } from './isListening';
import { config } from 'src/config';

type MiddlewareOptions = {
  isListening?: boolean;
  cost?: number;
  onlyOwner?: boolean;
};

export const middleware = (
  next: (msg: Message, preparedEvent: PreparedEvent) => unknown,
  { isListening = false, cost = 0, onlyOwner = false }: MiddlewareOptions = {},
) => {
  return async (msg: Message, preparedEvent: PreparedEvent) => {
    // if onlyOwner is true, the message will only be processed if it is sent by the owner,
    // otherwise it will only be processed if it is not sent by the owner

    const isDevelopment = config.NODE_ENV === 'development';

    if (onlyOwner) {
      if (!msg.fromMe) return;
    } else {
      if (msg.fromMe && !isDevelopment) return;
    }

    if (cost) {
      const { error } = await consumerCredits({ msg, preparedEvent, cost });

      if (error) {
        msg.reply(error);

        if (!isDevelopment) {
          return;
        }
      }
    }

    if (isListening) {
      const listening = await _isListening(msg);

      if (!listening) {
        return;
      }

      return next(msg, preparedEvent);
    }

    return next(msg, preparedEvent);
  };
};
