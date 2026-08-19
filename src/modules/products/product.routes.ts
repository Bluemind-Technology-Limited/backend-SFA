// this defines the routes for the products module
import { Router } from 'express';
import { productController } from './product.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/authorize.middleware.js';
import { validateBody, validateQuery, validateParams } from '../../middleware/validation.middleware.js';
import { asyncHandler } from '../../utils/async-handler.js';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  listProductsQuerySchema,
} from './product.validation.js';

// this creates the products router
const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: List products
 *     description: Lists active products. All authenticated roles can access.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: includeInactive
 *         schema:
 *           type: string
 *         required: false
 *         description: Set to 'true' to include inactive products (super admin)
 *     responses:
 *       200:
 *         description: Products retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, authorize('SALES', 'SUPER_ADMIN', 'DISTRIBUTOR'), validateQuery(listProductsQuerySchema), asyncHandler(productController.list));

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Returns a product by id. All authenticated roles can access.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get('/:id', authenticate, authorize('SALES', 'SUPER_ADMIN', 'DISTRIBUTOR'), validateParams(productIdParamSchema), asyncHandler(productController.get));

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a product
 *     description: Creates a new product. Super admin only.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('SUPER_ADMIN'), validateBody(createProductSchema), asyncHandler(productController.create));

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product. Super admin only.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), validateParams(productIdParamSchema), validateBody(updateProductSchema), asyncHandler(productController.update));

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Deactivate a product
 *     description: Soft deactivates a product. Super admin only.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), validateParams(productIdParamSchema), asyncHandler(productController.deactivate));

export const productRoutes = router;
