// this initializes the QStash client for asynchronous background jobs
import { Client } from '@upstash/qstash';
import { env } from './env.js';

// this creates the QStash client used to publish background jobs
export const qstash = new Client({
  token: env.qstashToken,
});

// this is the base URL of the deployed app (used for callbacks)
// in production QStash calls back to this URL, in development it is localhost
export const appUrl = env.nodeEnv === 'production'
  ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4000')
  : `http://localhost:${env.port}`;
