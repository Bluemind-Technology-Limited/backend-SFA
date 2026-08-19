// this is the server entry point that starts the HTTP server
// it always listens regardless of environment so it works on both local dev
// and long-running hosts like Render (unlike serverless Vercel)
import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

// this starts the server on the configured port
const port = process.env.PORT ? Number(process.env.PORT) : env.port;

app.listen(port, () => {
  logger.info(`SFA backend running on port ${port} in ${env.nodeEnv} mode.`);
});

// this still allows the file to be imported as a module when needed
export default app;
