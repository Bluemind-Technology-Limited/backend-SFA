// this defines the controller for the distributors module
import type { Request, Response } from 'express';
import { distributorService } from './distributor.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the distributors controller
export const distributorController = {
  // this lists all distributors (super admin only)
  async list(_req: Request, res: Response) {
    const distributors = await distributorService.list();
    sendSuccess(res, distributors, 'Distributors retrieved.');
  },

  // this returns a single distributor with their sales team (super admin only)
  async get(req: Request, res: Response) {
    const distributor = await distributorService.get(String(req.params.id));
    sendSuccess(res, distributor, 'Distributor retrieved.');
  },

  // this lists the sales users of a distributor
  async salesUsers(req: Request, res: Response) {
    const users = await distributorService.getSalesUsers(String(req.params.id));
    sendSuccess(res, users, 'Sales users retrieved.');
  },
};
