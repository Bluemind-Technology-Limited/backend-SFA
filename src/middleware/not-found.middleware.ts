// this middleware catches 404 requests to unknown routes
import type { Request, Response } from 'express';
import { HttpError } from '../utils/http-error.js';

// this returns a 404 for any unmatched route
export const notFoundHandler = (_req: Request, _res: Response) => {
  throw new HttpError(404, 'Route not found.');
};
