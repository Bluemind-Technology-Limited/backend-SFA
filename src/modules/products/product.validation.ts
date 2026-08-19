// this defines the validation schemas for the products module
import { z } from 'zod';

// this validates the create product body
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  sku: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
});

// this validates the update product body
export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

// this validates the product id param
export const productIdParamSchema = z.object({
  id: z.string().min(1),
});

// this validates the list products query
export const listProductsQuerySchema = z.object({
  includeInactive: z.string().optional(),
});
