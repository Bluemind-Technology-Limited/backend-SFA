// this defines the business logic for the users module
import { userRepository } from './user.repository.js';
import { HttpError } from '../../utils/http-error.js';
import type { CreateUserInput, UpdateUserInput } from './user.types.js';

// this is the users service
export const userService = {
  // this lists all users, optionally filtered by role
  async list(role?: string) {
    return userRepository.findAll(role);
  },

  // this returns a single user by id
  async get(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    return user;
  },

  // this creates a new user
  async create(input: CreateUserInput) {
    // this validates that a sales user has a distributor assigned
    if (input.role === 'SALES' && !input.distributorId) {
      throw new HttpError(400, 'A sales user must be assigned to a distributor.');
    }

    // this validates that a non-sales user does not have a distributor
    if (input.role !== 'SALES' && input.distributorId) {
      throw new HttpError(400, 'Only sales users can be assigned to a distributor.');
    }

    // this validates that the distributor exists and has the correct role
    if (input.distributorId) {
      const distributor = await userRepository.findById(input.distributorId);
      if (!distributor || distributor.role !== 'DISTRIBUTOR') {
        throw new HttpError(400, 'Assigned distributor does not exist or is not a distributor.');
      }
    }

    return userRepository.create(input);
  },

  // this updates an existing user
  async update(id: string, input: UpdateUserInput) {
    const existing = await userRepository.findById(id);
    if (!existing) {
      throw new HttpError(404, 'User not found.');
    }

    // this validates the distributor assignment if provided
    if (input.distributorId) {
      const distributor = await userRepository.findById(input.distributorId);
      if (!distributor || distributor.role !== 'DISTRIBUTOR') {
        throw new HttpError(400, 'Assigned distributor does not exist or is not a distributor.');
      }
    }

    return userRepository.update(id, input);
  },

  // this deactivates a user
  async deactivate(id: string) {
    const existing = await userRepository.findById(id);
    if (!existing) {
      throw new HttpError(404, 'User not found.');
    }
    return userRepository.deactivate(id);
  },
};
