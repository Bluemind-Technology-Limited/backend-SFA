// this defines the validation schemas for the users module
import { z } from 'zod';

// this validates the role enum
const roleEnum = z.enum(['SALES', 'DISTRIBUTOR', 'SUPER_ADMIN']);

// this validates the create user body
export const createUserSchema = z.object({
  authId: z.string().min(1, 'authId is required.'),
  email: z.string().email('A valid email is required.'),
  name: z.string().min(1, 'Name is required.'),
  role: roleEnum,
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional().nullable(),
  distributorId: z.string().optional().nullable(),
});

// this validates the update user body
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  phone: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  distributorId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

// this validates the list users query
export const listUsersQuerySchema = z.object({
  role: roleEnum.optional(),
});

// this validates the user id param
export const userIdParamSchema = z.object({
  id: z.string().min(1),
});
