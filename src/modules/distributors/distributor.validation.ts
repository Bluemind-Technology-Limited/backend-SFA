// this defines the validation schemas for the distributors module
import { z } from 'zod';

// this validates the distributor id param
export const distributorIdParamSchema = z.object({
  id: z.string().min(1),
});
