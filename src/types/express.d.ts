// this augments the Express Request interface to carry the auth user
import type { AuthUser } from './index.js';

declare global {
  namespace Express {
    interface Request {
      // this is the authenticated user set by the auth middleware
      user?: AuthUser;
    }
  }
}

export {};
