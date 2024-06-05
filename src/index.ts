import { server } from './server';
import subscribeToLogs from './utils/logs';

if (process.env.NODE_ENV === 'production') {
  subscribeToLogs();
}
server();
process.on('uncaughtException', (err) => {
  console.error(err);
});
