// this creates and configures the Express application
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import { dirname } from 'path';
import { apiRoutes } from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import { swaggerSpec } from './config/swagger.js';

// this creates a require function to resolve node_modules paths in ESM context
const require = createRequire(import.meta.url);

// this resolves the directory of the swagger-ui-dist package (contains the JS/CSS assets)
const swaggerUiDistDir = dirname(require.resolve('swagger-ui-dist/package.json'));

// this creates the Express app instance
const app = express();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API health
 *     description: Returns a simple health check response.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: SFA backend is running.
 */

/**
 * @openapi
 * /:
 *   get:
 *     summary: API root
 *     description: Returns basic API information and useful links.
 *     tags:
 *       - Root
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: SFA Backend API
 *                 docs:
 *                   type: string
 *                   example: /api-docs
 *                 health:
 *                   type: string
 *                   example: /health
 */

// this adds security headers
app.use(helmet());

// this enables CORS for the web and mobile clients
app.use(cors());

// this parses JSON request bodies
app.use(express.json());

// this logs HTTP requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// this is the root route for the base URL
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'SFA Backend API',
    version: '1.0.0',
    docs: '/api-docs',
    health: '/health',
  });
});

// this is a health check endpoint
app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'SFA backend is running.' });
});

// this serves the Swagger documentation UI
// swaggerUi.serve mounts the static assets and the swagger-ui-init.js handler
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// this explicitly serves the Swagger UI static assets with correct MIME types
// this fixes the Vercel issue where the catch-all route returns text/html for assets
app.use(
  '/api-docs',
  express.static(swaggerUiDistDir, {
    index: false,
    setHeaders: (res, filePath) => {
      // this sets the correct content type for JavaScript and CSS files
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=UTF-8');
      }
    },
  })
);

// this mounts all API routes under /api
app.use('/api', apiRoutes);

// this handles 404 for unknown routes
app.use(notFoundHandler);

// this handles all errors centrally
app.use(errorHandler);

export default app;
