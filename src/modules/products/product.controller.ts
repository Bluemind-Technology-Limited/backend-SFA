// this defines the controller for the products module
import type { Request, Response } from 'express';
import { productService } from './product.service.js';
import { sendSuccess } from '../../utils/response.js';

// this is the products controller
export const productController = {
  // this lists products (sales users see active, super admin can see all)
  async list(req: Request, res: Response) {
    const includeInactive = req.query.includeInactive === 'true';
    const products = await productService.list(includeInactive);
    sendSuccess(res, products, 'Products retrieved.');
  },

  // this returns a single product
  async get(req: Request, res: Response) {
    const product = await productService.get(String(req.params.id));
    sendSuccess(res, product, 'Product retrieved.');
  },

  // this creates a new product (super admin only)
  async create(req: Request, res: Response) {
    const product = await productService.create(req.body);
    sendSuccess(res, product, 'Product created.', 201);
  },

  // this updates an existing product (super admin only)
  async update(req: Request, res: Response) {
    const product = await productService.update(String(req.params.id), req.body);
    sendSuccess(res, product, 'Product updated.');
  },

  // this deactivates a product (super admin only)
  async deactivate(req: Request, res: Response) {
    const product = await productService.deactivate(String(req.params.id));
    sendSuccess(res, product, 'Product deactivated.');
  },
};
