// this defines the types for the auth module
import type { Role } from '@prisma/client';

// this is the response shape for the current user
export interface MeResponse {
  id: string;
  authId: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  avatarUrl: string | null;
  distributorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
