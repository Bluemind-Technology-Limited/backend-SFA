// this defines the data access layer for the distributors module
import { prisma } from '../../config/prisma.js';

// this is the distributors repository
export const distributorRepository = {
  // this lists all distributors with their sales users count
  async findAll() {
    return prisma.user.findMany({
      where: { role: 'DISTRIBUTOR' },
      include: {
        salesUsers: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isActive: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  // this finds a single distributor by id with their full sales team
  async findById(id: string) {
    return prisma.user.findFirst({
      where: { id, role: 'DISTRIBUTOR' },
      include: {
        salesUsers: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isActive: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  // this lists the sales users assigned to a distributor
  async findSalesUsers(distributorId: string) {
    return prisma.user.findMany({
      where: { distributorId, role: 'SALES' },
      orderBy: { createdAt: 'desc' },
    });
  },
};
