// this defines the controller for the users module
import type { Request, Response } from 'express';
import { userService } from './user.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the users controller
export const userController = {
  // this lists all users (super admin only)
  async list(req: Request, res: Response) {
    const role = req.query.role as string | undefined;
    const users = await userService.list(role);
    sendSuccess(res, users, 'Users retrieved.');
  },

  // this returns a single user
  async get(req: Request, res: Response) {
    const user = await userService.get(String(req.params.id));
    sendSuccess(res, user, 'User retrieved.');
  },

  // this creates a new user
  async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    sendSuccess(res, user, 'User created.', 201);
  },

  // this updates an existing user
  async update(req: Request, res: Response) {
    const user = await userService.update(String(req.params.id), req.body);
    sendSuccess(res, user, 'User updated.');
  },

  // this deactivates a user
  async deactivate(req: Request, res: Response) {
    const user = await userService.deactivate(String(req.params.id));
    sendSuccess(res, user, 'User deactivated.');
  },
};
