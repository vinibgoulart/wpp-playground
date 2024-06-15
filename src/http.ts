import express from 'express';
import { wooviWebhookChargeCompleted } from './woovi/webhook/wooviWebhookChargeCompleted';

const http = express();

http.post('/webhook/woovi/charge', wooviWebhookChargeCompleted);

http.use(express.json());
export default http;
