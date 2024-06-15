import { Message } from 'whatsapp-web.js';

import { PreparedEvent } from 'src/telemetry/preparedEvent';
import { consumerCredits } from './consumerCredits';
import { isListening as _isListening } from './isListening';
import { config } from 'src/config';

type MiddlewareOptions = {
  isListening?: boolean;
  cost?: number;
  costByCaractere?: boolean;
  command?: string;
  onlyOwner?: boolean;
};

export const middleware = (
  next: (msg: Message, preparedEvent: PreparedEvent) => unknown,
  options: MiddlewareOptions = {},
) => {
  const { isListening, cost, command, costByCaractere, onlyOwner } = options;

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
      const getCost = () => {
        if (costByCaractere) {
          const body = msg.body.replace(`${command}`, '').trim();
          return cost * body.length;
        }

        return cost;
      };

      const { error } = await consumerCredits({
        msg,
        preparedEvent,
        cost: getCost(),
      });

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
