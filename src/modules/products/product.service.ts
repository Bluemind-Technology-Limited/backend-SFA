// this defines the business logic for the products module
import { productRepository } from './product.repository.js';
import { HttpError } from '../../utils/http-error.js';
import type { CreateProductInput, UpdateProductInput } from './product.types.js';

// this is the products service
export const productService = {
  // this lists active products (visible to sales users) or all products (super admin)
  async list(includeInactive = false) {
    return includeInactive ? productRepository.findAll() : productRepository.findAllActive();
  },

  // this returns a single product
  async get(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found.');
    }
    return product;
  },

  // this creates a new product
  async create(input: CreateProductInput) {
    return productRepository.create(input);
  },

  // this updates an existing product
  async update(id: string, input: UpdateProductInput) {
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new HttpError(404, 'Product not found.');
    }
    return productRepository.update(id, input);
  },

  // this deactivates a product
  async deactivate(id: string) {
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new HttpError(404, 'Product not found.');
    }
    return productRepository.deactivate(id);
  },
};
