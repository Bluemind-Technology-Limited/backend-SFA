// this defines the routes for the distributors module
import { Router } from 'express';
import { distributorController } from './distributor.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/authorize.middleware.js';
import { validateParams } from '../../middleware/validation.middleware.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { distributorIdParamSchema } from './distributor.validation.js';

// this creates the distributors router
const router = Router();

/**
 * @openapi
 * /api/distributors:
 *   get:
 *     summary: List all distributors
 *     description: Lists all distributors with their assigned sales users. Super admin only.
 *     tags:
 *       - Distributors
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Distributors retrieved
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
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', authenticate, authorize('SUPER_ADMIN'), asyncHandler(distributorController.list));

/**
 * @openapi
 * /api/distributors/{id}:
 *   get:
 *     summary: Get a single distributor
 *     description: Returns a distributor with their sales team. Super admin only.
 *     tags:
 *       - Distributors
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The distributor id
 *     responses:
 *       200:
 *         description: Distributor retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Distributor not found
 */
router.get('/:id', authenticate, authorize('SUPER_ADMIN'), validateParams(distributorIdParamSchema), asyncHandler(distributorController.get));

/**
 * @openapi
 * /api/distributors/{id}/sales-users:
 *   get:
 *     summary: List a distributor's sales users
 *     description: Lists the sales users assigned to a distributor. Super admin only.
 *     tags:
 *       - Distributors
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The distributor id
 *     responses:
 *       200:
 *         description: Sales users retrieved
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
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Distributor not found
 */
router.get('/:id/sales-users', authenticate, authorize('SUPER_ADMIN'), validateParams(distributorIdParamSchema), asyncHandler(distributorController.salesUsers));

export const distributorRoutes = router;
