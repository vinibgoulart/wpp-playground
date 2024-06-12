import { server } from './server';
import subscribeToLogs from './utils/logs';

(async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    subscribeToLogs();
  }

  await server();

  process.on('uncaughtException', (err) => {
    console.error(err);
  });
})()