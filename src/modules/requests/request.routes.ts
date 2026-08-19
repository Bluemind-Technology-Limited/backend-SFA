// this defines the routes for the requests module
import { Router } from 'express';
import { requestController } from './request.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/authorize.middleware.js';
import { validateBody, validateParams } from '../../middleware/validation.middleware.js';
import { asyncHandler } from '../../utils/async-handler.js';
import {
  createRequestSchema,
  reviewRequestSchema,
  requestIdParamSchema,
} from './request.validation.js';

// this creates the requests router
const router = Router();

/**
 * @openapi
 * /api/requests:
 *   get:
 *     summary: List requests
 *     description: Lists requests filtered by the caller's role. Sales users see their own, distributors see their team's, super admin sees all.
 *     tags:
 *       - Requests
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Requests retrieved
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
 *                     $ref: '#/components/schemas/Request'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, authorize('SALES', 'DISTRIBUTOR', 'SUPER_ADMIN'), asyncHandler(requestController.list));

/**
 * @openapi
 * /api/requests/{id}:
 *   get:
 *     summary: Get a single request
 *     description: Returns a request by id with access control based on role.
 *     tags:
 *       - Requests
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request id
 *     responses:
 *       200:
 *         description: Request retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Request'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Request not found
 */
router.get('/:id', authenticate, authorize('SALES', 'DISTRIBUTOR', 'SUPER_ADMIN'), validateParams(requestIdParamSchema), asyncHandler(requestController.get));

/**
 * @openapi
 * /api/requests:
 *   post:
 *     summary: Create a request
 *     description: Submits a new product request. Sales users only.
 *     tags:
 *       - Requests
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRequestInput'
 *     responses:
 *       201:
 *         description: Request submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Request'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('SALES'), validateBody(createRequestSchema), asyncHandler(requestController.create));

/**
 * @openapi
 * /api/requests/{id}/review:
 *   patch:
 *     summary: Review a request
 *     description: Approves or rejects a request. Distributor or super admin only.
 *     tags:
 *       - Requests
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewRequestInput'
 *     responses:
 *       200:
 *         description: Request reviewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Request'
 *       400:
 *         description: Validation error or already reviewed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Request not found
 */
router.patch('/:id/review', authenticate, authorize('DISTRIBUTOR', 'SUPER_ADMIN'), validateParams(requestIdParamSchema), validateBody(reviewRequestSchema), asyncHandler(requestController.review));

export const requestRoutes = router;
