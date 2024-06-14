import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
import { config } from './config';
import { logger } from './telemetry/logger';

const connectMongo = (options: ConnectOptions) =>
  new Promise<void>((resolve, reject) => {
    mongoose.connection
      // Reject if an error ocurred when trying to connect to MongoDB
      .on('error', async (error) => {
        // eslint-disable-next-line
        logger.error('Connection to MongoDB failed: ', error);
        reject(error);
      })
      // Exit Process if there is no longer a Database Connection
      .on('close', () => {
        // eslint-disable-next-line
        logger.fatal('Connection to MongoDB lost');
        process.exit(1);
      })
      // Connected to DB
      .once('open', () => {
        // Display connection information
        const infos = mongoose.connections;
        // eslint-disable-next-line
        infos.map((info) =>
          // eslint-disable-next-line
          logger.info(`Connected to ${info.host}:${info.port}/${info.name}`),
        );
        // Return sucessfull promisse
        resolve();
      });

    mongoose.connect(config.MONGO_URI!, options);
  });

const mongooseOptions = {
  // autoIndex: true,
};

export const connectDatabase = () => connectMongo(mongooseOptions);
