// this defines the data access layer for the products module
import { prisma } from '../../config/prisma.js';
import type { CreateProductInput, UpdateProductInput } from './product.types.js';

// this is the products repository
export const productRepository = {
  // this lists all active products
  async findAllActive() {
    return prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  // this lists all products including inactive ones (super admin)
  async findAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  // this finds a single product by id
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  // this creates a new product
  async create(data: CreateProductInput) {
    return prisma.product.create({
      data,
    });
  },

  // this updates an existing product
  async update(id: string, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  // this soft deactivates a product instead of deleting it
  async deactivate(id: string) {
    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
