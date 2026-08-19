// this is the server entry point for local development only
// on Vercel, the app is exported from api/index.ts and served as a serverless function
import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

// this starts the HTTP server when running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(env.port, () => {
    logger.info(`SFA backend running on port ${env.port} in ${env.nodeEnv} mode.`);
  });
}

// this still allows the file to be imported as a module on Vercel
export default app;
