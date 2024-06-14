import { Axiom } from '@axiomhq/js';
import { config } from '../config';
import { Event } from './types';

const DATASET = 'bot-logs';
const axiom = new Axiom({
  token: config.AXIOM_TOKEN!,
});

export const sendEvent = (event: Event) =>
  axiom.ingest(
    DATASET,
    { ...event, timestamp: new Date().getTime() },
    { timestampField: 'timestamp' },
  );
