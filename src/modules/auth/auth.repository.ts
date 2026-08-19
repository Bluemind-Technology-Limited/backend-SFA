// this defines the data access layer for the auth module
import { prisma } from '../../config/prisma.js';

// this loads the full user record by database id
export const authRepository = {
  // this finds a user by their database id
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
