// this defines the types for the requests module
import type { RequestStatus } from '@prisma/client';

// this is a single request item input on creation
export interface CreateRequestItemInput {
  productId: string;
  quantity: number;
}

// this is the payload shape for creating a request
export interface CreateRequestInput {
  items: CreateRequestItemInput[];
}

// this is the payload shape for reviewing (approve/reject) a request
export interface ReviewRequestInput {
  status: 'APPROVED' | 'REJECTED';
  reviewNote?: string;
}

// this is the full request shape returned to clients
export interface RequestResponse {
  id: string;
  status: RequestStatus;
  salesUser: {
    id: string;
    name: string;
    email: string;
  };
  distributor: {
    id: string;
    name: string;
    email: string;
  };
  reviewNote: string | null;
  reviewedAt: Date | null;
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      sku: string | null;
      unit: string | null;
    };
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
