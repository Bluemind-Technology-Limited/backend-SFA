// this defines the types for the dashboard module

// this is the super admin dashboard stats
export interface AdminDashboardStats {
  totalDistributors: number;
  totalSalesUsers: number;
  totalProducts: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

// this is the distributor dashboard stats
export interface DistributorDashboardStats {
  totalSalesUsers: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

// this is the sales user dashboard stats
export interface SalesDashboardStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}
