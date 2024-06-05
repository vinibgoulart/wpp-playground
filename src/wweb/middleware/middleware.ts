import { Message } from 'whatsapp-web.js';
import { isListening as _isListening } from './isListening';

type MiddlewareOptions = {
  isListening?: boolean;
  onlyOwner?: boolean;
};

export const middleware = (
  next: (msg: Message) => unknown,
  { isListening = false, onlyOwner = false }: MiddlewareOptions,
) => {
  return async (msg: Message) => {
    if (onlyOwner) {
      if (!msg.fromMe) {
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
