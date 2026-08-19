// this defines the data access layer for the requests module
import { prisma } from '../../config/prisma.js';
import type { CreateRequestInput, ReviewRequestInput } from './request.types.js';

// this is the shared include for request queries
const requestInclude = {
  salesUser: {
    select: { id: true, name: true, email: true },
  },
  distributor: {
    select: { id: true, name: true, email: true },
  },
  items: {
    include: {
      product: {
        select: { id: true, name: true, sku: true, unit: true },
      },
    },
  },
};

// this is the requests repository
export const requestRepository = {
  // this lists all requests (super admin only)
  async findAll() {
    return prisma.request.findMany({
      include: requestInclude,
      orderBy: { createdAt: 'desc' },
    });
  },

  // this lists requests submitted by a specific sales user
  async findBySalesUser(salesUserId: string) {
    return prisma.request.findMany({
      where: { salesUserId },
      include: requestInclude,
      orderBy: { createdAt: 'desc' },
    });
  },

  // this lists requests received by a specific distributor
  async findByDistributor(distributorId: string) {
    return prisma.request.findMany({
      where: { distributorId },
      include: requestInclude,
      orderBy: { createdAt: 'desc' },
    });
  },

  // this finds a single request with all relations
  async findById(id: string) {
    return prisma.request.findUnique({
      where: { id },
      include: requestInclude,
    });
  },

  // this creates a request with its line items in one transaction
  async create(salesUserId: string, distributorId: string, input: CreateRequestInput) {
    return prisma.request.create({
      data: {
        salesUserId,
        distributorId,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: requestInclude,
    });
  },

  // this updates a request status during review
  async review(id: string, input: ReviewRequestInput) {
    return prisma.request.update({
      where: { id },
      data: {
        status: input.status,
        reviewNote: input.reviewNote,
        reviewedAt: new Date(),
      },
      include: requestInclude,
    });
  },
};
