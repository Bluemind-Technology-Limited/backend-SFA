// this defines the business logic for the auth module
import { authRepository } from './auth.repository.js';
import { HttpError } from '../../utils/http-error.js';

// this is the auth service with business logic
export const authService = {
  // this returns the authenticated user's full profile
  async getMe(dbUserId: string) {
    const user = await authRepository.findById(dbUserId);

    // this throws if the user no longer exists
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }

    return user;
  },
};
