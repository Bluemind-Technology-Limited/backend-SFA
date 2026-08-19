// this re-exports all shared types for the backend
export type { Role, RequestStatus } from '@prisma/client';

// this is the authenticated request object attached by auth middleware
export interface AuthUser {
  // this is the Supabase auth user id (matches User.authId)
  id: string;
  // this is the email from Supabase auth
  email: string;
  // this is our database user record id
  dbUserId: string;
  // this is the role from our database
  role: 'SALES' | 'DISTRIBUTOR' | 'SUPER_ADMIN';
  // this is the distributor id for a sales user (null for other roles)
  distributorId: string | null;
}

// this is the pagination query parameters
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

// this is the standard paginated response shape
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
