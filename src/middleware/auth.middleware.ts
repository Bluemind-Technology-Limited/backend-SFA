// this middleware verifies the Supabase JWT and attaches the DB user to the request
import type { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { prisma } from '../config/prisma.js';
import { HttpError } from '../utils/http-error.js';
import { asyncHandler } from '../utils/async-handler.js';

// this is the auth middleware that extracts and verifies the bearer token
export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  // this extracts the bearer token from the authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  // this rejects requests without a token
  if (!token) {
    throw new HttpError(401, 'Authentication required. Provide a Bearer token.');
  }

  // this verifies the token using Supabase auth
  const { data, error } = await supabase.auth.getUser(token);

  // this rejects invalid or expired tokens
  if (error || !data.user) {
    throw new HttpError(401, 'Invalid or expired token.');
  }

  // this loads our database user matching the Supabase auth id
  const dbUser = await prisma.user.findUnique({
    where: { authId: data.user.id },
  });

  // this rejects authenticated Supabase users that do not exist in our database
  if (!dbUser) {
    throw new HttpError(403, 'Your account is not registered in the system yet.');
  }

  // this rejects inactive users
  if (!dbUser.isActive) {
    throw new HttpError(403, 'Your account is deactivated.');
  }

  // this attaches the authenticated user to the request
  req.user = {
    id: data.user.id,
    email: data.user.email ?? '',
    dbUserId: dbUser.id,
    role: dbUser.role,
    distributorId: dbUser.distributorId,
  };

  next();
});
