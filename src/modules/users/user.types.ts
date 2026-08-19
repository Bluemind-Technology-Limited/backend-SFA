// this defines the types for the users module
import type { Role } from '@prisma/client';

// this is the payload shape for creating a user by the super admin
export interface CreateUserInput {
  authId: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
  distributorId?: string | null;
}

// this is the payload shape for updating a user
export interface UpdateUserInput {
  email?: string;
  name?: string;
  phone?: string;
  avatarUrl?: string;
  distributorId?: string | null;
  isActive?: boolean;
}
