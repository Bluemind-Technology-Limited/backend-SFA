// this defines the validation schemas for the auth module
// auth itself is handled by Supabase on the client, so no login/register here
import { z } from 'zod';

// this is a placeholder schema kept for consistency (no request body needed for /me)
export const emptySchema = z.object({}).optional();
