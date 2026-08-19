// this defines the business logic for the requests module
import { requestRepository } from './request.repository.js';
import { prisma } from '../../config/prisma.js';
import { HttpError } from '../../utils/http-error.js';
import type { CreateRequestInput, ReviewRequestInput } from './request.types.js';

// this is the requests service
export const requestService = {
  // this lists requests based on the caller's role
  async list(user: { role: string; dbUserId: string; distributorId: string | null }) {
    // this returns all requests for the super admin
    if (user.role === 'SUPER_ADMIN') {
      return requestRepository.findAll();
    }

    // this returns only the distributor's received requests
    if (user.role === 'DISTRIBUTOR') {
      return requestRepository.findByDistributor(user.dbUserId);
    }

    // this returns only the sales user's own submitted requests
    return requestRepository.findBySalesUser(user.dbUserId);
  },

  // this returns a single request with access control
  async get(id: string, user: { role: string; dbUserId: string; distributorId: string | null }) {
    const request = await requestRepository.findById(id);
    if (!request) {
      throw new HttpError(404, 'Request not found.');
    }

    // this allows the super admin to view any request
    if (user.role === 'SUPER_ADMIN') {
      return request;
    }

    // this restricts a sales user to their own requests
    if (user.role === 'SALES' && request.salesUserId !== user.dbUserId) {
      throw new HttpError(403, 'You can only view your own requests.');
    }

    // this restricts a distributor to their received requests
    if (user.role === 'DISTRIBUTOR' && request.distributorId !== user.dbUserId) {
      throw new HttpError(403, 'You can only view requests from your sales team.');
    }

    return request;
  },

  // this creates a new request for the authenticated sales user
  async create(user: { dbUserId: string; distributorId: string | null }, input: CreateRequestInput) {
    // this rejects an empty request
    if (!input.items.length) {
      throw new HttpError(400, 'A request must contain at least one product.');
    }

    // this ensures the sales user has a distributor assigned
    if (!user.distributorId) {
      throw new HttpError(400, 'You are not assigned to a distributor.');
    }

    // this validates that all products exist and are active
    const productIds = input.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    // this rejects requests that include missing or inactive products
    if (products.length !== productIds.length) {
      throw new HttpError(400, 'One or more products are invalid or inactive.');
    }

    // this validates that quantities are positive
    for (const item of input.items) {
      if (item.quantity <= 0) {
        throw new HttpError(400, 'Quantity must be greater than zero.');
      }
    }

    return requestRepository.create(user.dbUserId, user.distributorId, input);
  },

  // this reviews (approves/rejects) a request by the responsible distributor
  async review(id: string, input: ReviewRequestInput, user: { role: string; dbUserId: string }) {
    const request = await requestRepository.findById(id);
    if (!request) {
      throw new HttpError(404, 'Request not found.');
    }

    // this only allows the responsible distributor (or super admin) to review
    const isResponsibleDistributor = user.dbUserId === request.distributorId;
    if (user.role !== 'SUPER_ADMIN' && !isResponsibleDistributor) {
      throw new HttpError(403, 'You can only review requests from your assigned sales team.');
    }

    // this prevents reviewing a request that is already resolved
    if (request.status !== 'PENDING') {
      throw new HttpError(400, 'This request has already been reviewed.');
    }

    return requestRepository.review(id, input);
  },
};
