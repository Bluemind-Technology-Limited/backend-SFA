// this is the server entry point that starts the HTTP server
import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

// this starts the server on the configured port
const server = app.listen(env.port, () => {
  logger.info(`SFA backend running on port ${env.port} in ${env.nodeEnv} mode.`);
});

// this handles graceful shutdown on SIGINT and SIGTERM
const shutdown = () => {
  logger.info('Shutting down server...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
