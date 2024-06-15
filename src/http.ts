import express from 'express';
import { wooviWebhookChargeCompleted } from './woovi/webhook/wooviWebhookChargeCompleted';

const http = express();

http.get('/webhook/woovi/charge', wooviWebhookChargeCompleted);

export default http;
