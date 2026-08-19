// this defines the data access layer for the dashboard module
import { prisma } from '../../config/prisma.js';

// this is the dashboard repository
export const dashboardRepository = {
  // this returns the super admin dashboard stats
  async adminStats() {
    const [totalDistributors, totalSalesUsers, totalProducts, statusCounts] = await Promise.all([
      prisma.user.count({ where: { role: 'DISTRIBUTOR' } }),
      prisma.user.count({ where: { role: 'SALES' } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.request.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    // this maps status counts to a lookup object
    const counts = statusCounts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {});

    return {
      totalDistributors,
      totalSalesUsers,
      totalProducts,
      pendingRequests: counts.PENDING ?? 0,
      approvedRequests: counts.APPROVED ?? 0,
      rejectedRequests: counts.REJECTED ?? 0,
    };
  },

  // this returns the distributor dashboard stats
  async distributorStats(distributorId: string) {
    const [totalSalesUsers, statusCounts] = await Promise.all([
      prisma.user.count({ where: { distributorId, role: 'SALES' } }),
      prisma.request.groupBy({
        by: ['status'],
        where: { distributorId },
        _count: { status: true },
      }),
    ]);

    // this maps status counts to a lookup object
    const counts = statusCounts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {});

    return {
      totalSalesUsers,
      pendingRequests: counts.PENDING ?? 0,
      approvedRequests: counts.APPROVED ?? 0,
      rejectedRequests: counts.REJECTED ?? 0,
    };
  },

  // this returns the sales user dashboard stats
  async salesStats(salesUserId: string) {
    const [totalRequests, statusCounts] = await Promise.all([
      prisma.request.count({ where: { salesUserId } }),
      prisma.request.groupBy({
        by: ['status'],
        where: { salesUserId },
        _count: { status: true },
      }),
    ]);

    // this maps status counts to a lookup object
    const counts = statusCounts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {});

    return {
      totalRequests,
      pendingRequests: counts.PENDING ?? 0,
      approvedRequests: counts.APPROVED ?? 0,
      rejectedRequests: counts.REJECTED ?? 0,
    };
  },
};
