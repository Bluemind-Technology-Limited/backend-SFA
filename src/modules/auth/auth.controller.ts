// this defines the controller for the auth module
import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the auth controller
export const authController = {
  // this returns the authenticated user's profile
  async me(req: Request, res: Response) {
    const user = await authService.getMe(req.user!.dbUserId);
    sendSuccess(res, user, 'User profile retrieved.');
  },
};
