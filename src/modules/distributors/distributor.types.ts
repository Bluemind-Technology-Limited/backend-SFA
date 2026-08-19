// this defines the types for the distributors module
import type { Role } from '@prisma/client';

// this is a summary of a sales user assigned to a distributor
export interface AssignedSalesUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
}

// this is the full distributor shape with assigned sales users
export interface DistributorDetail {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  salesUsers: AssignedSalesUser[];
}
