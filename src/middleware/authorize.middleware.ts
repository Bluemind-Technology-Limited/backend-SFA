// this middleware restricts access to one or more roles
import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/http-error.js';

// this returns a middleware that allows only the given roles
export const authorize = (...roles: Array<'SALES' | 'DISTRIBUTOR' | 'SUPER_ADMIN'>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    // this ensures the user is authenticated first
    if (!req.user) {
      throw new HttpError(401, 'Authentication required.');
    }

    // this checks if the user role is allowed
    if (!roles.includes(req.user.role)) {
      throw new HttpError(403, 'You do not have permission to perform this action.');
    }

    next();
  };
};
