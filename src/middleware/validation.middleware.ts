// this middleware validates request body/query/params using a Zod schema
import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { HttpError } from '../utils/http-error.js';

// this returns a middleware that validates the request body
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
      return next(new HttpError(400, message));
    }
    req.body = result.data;
    next();
  };
};

// this returns a middleware that validates the request query
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const message = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
      return next(new HttpError(400, message));
    }
    // this assigns the validated data back to the query object
    Object.assign(req.query, result.data);
    next();
  };
};

// this returns a middleware that validates the request params
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      const message = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
      return next(new HttpError(400, message));
    }
    req.params = result.data;
    next();
  };
};
