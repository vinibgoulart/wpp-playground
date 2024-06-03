import { client } from './client';

export const onReady = () => {
  client.on('ready', () => {
    console.log('Client is ready!');
  });
};
