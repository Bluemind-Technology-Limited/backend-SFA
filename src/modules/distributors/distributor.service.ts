// this defines the business logic for the distributors module
import { distributorRepository } from './distributor.repository.js';
import { HttpError } from '../../utils/http-error.js';

// this is the distributors service
export const distributorService = {
  // this lists all distributors
  async list() {
    return distributorRepository.findAll();
  },

  // this returns a single distributor
  async get(id: string) {
    const distributor = await distributorRepository.findById(id);
    if (!distributor) {
      throw new HttpError(404, 'Distributor not found.');
    }
    return distributor;
  },

  // this lists the sales users assigned to a distributor
  async getSalesUsers(distributorId: string) {
    const distributor = await distributorRepository.findById(distributorId);
    if (!distributor) {
      throw new HttpError(404, 'Distributor not found.');
    }
    return distributorRepository.findSalesUsers(distributorId);
  },
};
