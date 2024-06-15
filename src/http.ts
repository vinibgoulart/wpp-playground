import express from 'express';
import { wooviWebhookChargeCompleted } from './woovi/webhook/wooviWebhookChargeCompleted';

const http = express();
http.use(express.json());

http.post('/api/webhook/woovi/charge', wooviWebhookChargeCompleted);

export default http;
