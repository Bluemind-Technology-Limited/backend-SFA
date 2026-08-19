// this provides the Swagger spec for the API documentation UI
// it uses a pre-generated static JSON file (committed and bundled at build time)
import swaggerJsdoc from 'swagger-jsdoc';
import type { Options } from 'swagger-jsdoc';
import { env } from './env.js';
import swaggerJson from '../swagger.json' with { type: 'json' };

// this is the Swagger options object for dynamic generation
// it is exported so the build-time generate script can reuse it
export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SFA Backend API',
      version: '1.0.0',
      description: 'Sales Force Automation backend API documentation. All protected routes require a Supabase JWT.',
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Local development server',
      },
    ],
    components: {
      // this defines the Bearer token security scheme (Supabase JWT)
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your Supabase access token (JWT).',
        },
      },
      // this defines reusable schemas referenced across routes
      schemas: {
        // this is the user schema
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cm1234567890' },
            authId: { type: 'string', example: 'supabase-auth-uuid' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', enum: ['SALES', 'DISTRIBUTOR', 'SUPER_ADMIN'] },
            phone: { type: 'string', nullable: true, example: '08012345678' },
            distributorId: { type: 'string', nullable: true, example: 'cm0987654321' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // this is the create user input schema
        CreateUserInput: {
          type: 'object',
          required: ['authId', 'email', 'name', 'role'],
          properties: {
            authId: { type: 'string', example: 'supabase-auth-uuid' },
            email: { type: 'string', example: 'sales@example.com' },
            name: { type: 'string', example: 'Sales User' },
            role: { type: 'string', enum: ['SALES', 'DISTRIBUTOR', 'SUPER_ADMIN'] },
            phone: { type: 'string', example: '08012345678' },
            avatarUrl: { type: 'string', nullable: true },
            distributorId: { type: 'string', nullable: true, example: 'cm0987654321' },
          },
        },
        // this is the update user input schema
        UpdateUserInput: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string', nullable: true },
            avatarUrl: { type: 'string', nullable: true },
            distributorId: { type: 'string', nullable: true },
            isActive: { type: 'boolean' },
          },
        },
        // this is the product schema
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cm1234567890' },
            name: { type: 'string', example: 'Product A' },
            sku: { type: 'string', nullable: true, example: 'SKU-A' },
            description: { type: 'string', nullable: true },
            unit: { type: 'string', nullable: true, example: 'pcs' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // this is the create product input schema
        CreateProductInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Product A' },
            sku: { type: 'string', example: 'SKU-A' },
            description: { type: 'string' },
            unit: { type: 'string', example: 'pcs' },
          },
        },
        // this is the update product input schema
        UpdateProductInput: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            sku: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true },
            unit: { type: 'string', nullable: true },
            isActive: { type: 'boolean' },
          },
        },
        // this is a single request item input
        RequestItemInput: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string', example: 'cm1234567890' },
            quantity: { type: 'integer', example: 5 },
          },
        },
        // this is the create request input schema
        CreateRequestInput: {
          type: 'object',
          required: ['items'],
          properties: {
            items: {
              type: 'array',
              minItems: 1,
              items: { $ref: '#/components/schemas/RequestItemInput' },
            },
          },
        },
        // this is the review request input schema
        ReviewRequestInput: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['APPROVED', 'REJECTED'] },
            reviewNote: { type: 'string', example: 'All items available.' },
          },
        },
        // this is the request response schema
        Request: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cm1234567890' },
            status: { type: 'string', enum: ['PENDING', 'APPROVED', 'REJECTED'] },
            salesUser: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
            distributor: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  product: { type: 'object' },
                  quantity: { type: 'integer' },
                },
              },
            },
            reviewNote: { type: 'string', nullable: true },
            reviewedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // this is the standard error response schema
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            code: { type: 'string', example: 'ERROR' },
          },
        },
      },
    },
  },
  // this points to files containing the Swagger JSDoc annotations
  apis: [
    './src/app.ts',
    './src/modules/**/*.routes.ts',
  ],
};

// this uses the pre-generated static spec (bundled at build time)
// the JSON is statically imported so Vercel's bundler includes it
// and there is no runtime file-globbing dependency
export const swaggerSpec = swaggerJson as Record<string, unknown>;
