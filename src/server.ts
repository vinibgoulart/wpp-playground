import { app } from './app';
import { connectDatabase } from './mongo';

export const server = async () => {
  try {
    console.log('connecting to database...');
    await connectDatabase();
  } catch (err) {
    console.log('Could not connect to database', { err });
    throw err;
  }

  app();
};
