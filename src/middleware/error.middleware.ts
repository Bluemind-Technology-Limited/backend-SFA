// this is the central error handling middleware
import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/http-error.js';
import { logger } from '../utils/logger.js';

// this handler catches all errors and returns a consistent JSON response
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // this handles our custom HttpError
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  // this logs unexpected errors
  logger.error('Unhandled error', err);

  // this returns a generic 500 for unexpected errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
};
