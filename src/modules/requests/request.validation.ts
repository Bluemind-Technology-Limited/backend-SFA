// this defines the validation schemas for the requests module
import { z } from 'zod';

// this validates a single request item
const requestItemSchema = z.object({
  productId: z.string().min(1, 'Product id is required.'),
  quantity: z.number().int().positive('Quantity must be a positive integer.'),
});

// this validates the create request body
export const createRequestSchema = z.object({
  items: z.array(requestItemSchema).min(1, 'At least one item is required.'),
});

// this validates the review request body
export const reviewRequestSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reviewNote: z.string().optional(),
});

// this validates the request id param
export const requestIdParamSchema = z.object({
  id: z.string().min(1),
});

// this validates the list requests query
export const listRequestsQuerySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});
