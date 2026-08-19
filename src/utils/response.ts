// this provides helper functions for consistent API responses
import type { Response } from 'express';

// this sends a success response with an optional data payload
export function sendSuccess(res: Response, data: unknown, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

// this sends a paginated response with metadata
export function sendPaginated<T>(res: Response, data: T[], total: number, page: number, limit: number) {
  return res.status(200).json({
    success: true,
    message: 'Success',
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
