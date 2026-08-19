// this defines the business logic for the dashboard module
import { dashboardRepository } from './dashboard.repository.js';

// this is the dashboard service
export const dashboardService = {
  // this returns stats based on the caller's role
  async getDashboard(user: { role: string; dbUserId: string; distributorId: string | null }) {
    // this returns admin stats for the super admin
    if (user.role === 'SUPER_ADMIN') {
      return dashboardRepository.adminStats();
    }

    // this returns distributor stats
    if (user.role === 'DISTRIBUTOR') {
      return dashboardRepository.distributorStats(user.dbUserId);
    }

    // this returns sales user stats
    return dashboardRepository.salesStats(user.dbUserId);
  },
};
