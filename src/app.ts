// this creates and configures the Express application
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRoutes } from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import { swaggerSpec } from './config/swagger.js';

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
// the Content Security Policy is relaxed for the Swagger API docs so it can load
// the Swagger UI assets from the CDN and run its inline init script
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "connect-src": ["'self'", "https://cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
      },
    },
  })
);

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
// this uses a fully custom HTML page with CDN assets, avoiding serverless
// static-file issues with the swagger-ui-express serve middleware
const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SFA Backend API Documentation</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
  <style>
    body { margin: 0; }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function () {
      const spec = ${JSON.stringify(swaggerSpec)};
      window.ui = SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: 'StandaloneLayout'
      });
    };
  </script>
</body>
</html>`;

// this serves the custom Swagger UI HTML page
app.get('/api-docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(swaggerHtml);
});

// this mounts all API routes under /api
app.use('/api', apiRoutes);

// this handles 404 for unknown routes
app.use(notFoundHandler);

// this handles all errors centrally
app.use(errorHandler);

export default app;
