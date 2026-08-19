// this defines the controller for the dashboard module
import type { Request, Response } from 'express';
import { dashboardService } from './dashboard.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the dashboard controller
export const dashboardController = {
  // this returns the role-specific dashboard stats
  async stats(req: Request, res: Response) {
    const stats = await dashboardService.getDashboard(req.user!);
    sendSuccess(res, stats, 'Dashboard stats retrieved.');
  },
};
