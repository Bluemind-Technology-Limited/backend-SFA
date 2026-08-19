// this defines the data access layer for the users module
import { prisma } from '../../config/prisma.js';
import type { CreateUserInput, UpdateUserInput } from './user.types.js';

// this is the users repository
export const userRepository = {
  // this lists all users with optional role filter
  async findAll(role?: string) {
    return prisma.user.findMany({
      where: role ? { role: role as never } : undefined,
      include: { distributor: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  // this finds a single user by id
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { distributor: true, salesUsers: true },
    });
  },

  // this creates a new user
  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        authId: data.authId,
        email: data.email,
        name: data.name,
        role: data.role,
        phone: data.phone,
        avatarUrl: data.avatarUrl,
        distributorId: data.distributorId,
      },
    });
  },

  // this updates an existing user
  async update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  // this soft deactivates a user instead of deleting them
  async deactivate(id: string) {
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
